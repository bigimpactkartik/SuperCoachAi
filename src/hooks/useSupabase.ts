import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Course, Student, SuperCoach, Conversation, Coach, CourseVersion, Module, Task, StudentCourseEnrollment, TaskAssignment, StudentPromise } from '../types';

// Transform database rows to application types
const transformCourse = (row: any, versions: CourseVersion[] = [], modules: Module[] = []): Course => {
  const currentVersion = versions.find(v => v.courseId === row.id && v.isCurrent) || { versionNumber: 1 };
  
  return {
    id: row.id,
    title: row.title,
    description: '', // Default
    status: row.is_active ? 'live' : 'draft',
    version: currentVersion.versionNumber,
    modules: modules.filter(m => m.courseId === row.id),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    enrolledStudents: 0, // Will be calculated
    completionRate: 0, // Will be calculated
    superCoachId: row.coaches,
    baseId: row.id,
    isCurrentVersion: true,
    isActive: row.is_active
  };
};

const transformCourseVersion = (row: any): CourseVersion => ({
  id: row.id,
  courseId: row.course_id,
  versionNumber: row.version_number,
  updatedAt: row.updated_at,
  isActive: row.is_active,
  isCurrent: row.is_current
});

const transformModule = (row: any, tasks: Task[] = []): Module => ({
  id: row.id,
  courseId: row.course_id,
  title: row.title,
  description: '', // Default
  tasks: tasks.filter(t => t.moduleId === row.id),
  order: row.order_id,
  courseVersion: row.course_version,
  isActive: row.is_active,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

const transformTask = (row: any): Task => ({
  id: row.id,
  courseId: row.course_id,
  title: row.title,
  description: '', // Default
  type: 'video', // Default
  moduleId: row.module_id,
  timeToComplete: row.timetocomplete,
  courseVersion: row.course_version,
  orderIndex: row.order_index,
  isActive: row.is_active,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

const transformStudent = (row: any, enrollments: StudentCourseEnrollment[] = []): Student => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone_number,
  telegram_id: row.telegram_id,
  about: row.about,
  avatar: undefined,
  status: 'new', // Default
  enrolledCourses: enrollments.filter(e => e.studentId === row.id),
  progress: [], // Will be calculated from task_assignments
  joinedAt: new Date().toISOString(), // Default
  lastActivity: 'Recently active'
});

const transformEnrollment = (row: any): StudentCourseEnrollment => ({
  id: row.id,
  studentId: row.student_id,
  courseId: row.course_id,
  enrolledAt: row.enrolled_at,
  courseVersionId: row.course_version_id,
  status: row.status
});

const transformPromise = (row: any): StudentPromise => ({
  id: row.id,
  studentId: row.student_id,
  taskId: row.task_id,
  promiseDatetime: row.promise_datetime,
  dueDate: row.due_date,
  checked: row.checked,
  createdAt: row.created_at
});

const transformSuperCoach = (row: any): SuperCoach => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone
});

const transformConversation = (row: any): Conversation => ({
  id: row.id,
  studentId: row.student_id,
  superCoachId: 1, // Default
  courseId: 1, // Default
  courseVersion: 1, // Default
  messages: [{
    id: row.id,
    senderId: row.student_id,
    senderType: row.role === 'user' ? 'student' : 'supercoach',
    content: row.message,
    timestamp: row.timestamp,
    type: 'text'
  }],
  startedAt: row.timestamp,
  lastMessageAt: row.timestamp
});

export const useSupabase = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [superCoaches, setSuperCoaches] = useState<SuperCoach[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [promises, setPromises] = useState<StudentPromise[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentCoach, setCurrentCoach] = useState<Coach | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data with proper relationships
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all related data
      const [
        coursesRes,
        courseVersionsRes,
        modulesRes,
        tasksRes,
        studentsRes,
        enrollmentsRes,
        coachesRes,
        conversationsRes,
        taskAssignmentsRes,
        promisesRes
      ] = await Promise.all([
        supabase.from('courses').select('*').order('id', { ascending: false }),
        supabase.from('course_versions').select('*'),
        supabase.from('modules').select('*'),
        supabase.from('tasks').select('*'),
        supabase.from('students').select('*').order('id', { ascending: false }),
        supabase.from('enrollments').select('*'),
        supabase.from('coaches').select('*').order('id', { ascending: false }),
        supabase.from('conversations').select('*').order('timestamp', { ascending: false }),
        supabase.from('task_assignments').select('*'),
        supabase.from('promises').select('*').order('created_at', { ascending: false })
      ]);

      if (coursesRes.error) throw coursesRes.error;
      if (courseVersionsRes.error) throw courseVersionsRes.error;
      if (modulesRes.error) throw modulesRes.error;
      if (tasksRes.error) throw tasksRes.error;
      if (studentsRes.error) throw studentsRes.error;
      if (enrollmentsRes.error) throw enrollmentsRes.error;
      if (coachesRes.error) throw coachesRes.error;
      if (conversationsRes.error) throw conversationsRes.error;
      if (taskAssignmentsRes.error) throw taskAssignmentsRes.error;
      if (promisesRes.error) throw promisesRes.error;

      // Transform data with relationships
      const courseVersions = courseVersionsRes.data.map(transformCourseVersion);
      const tasks = tasksRes.data.map(transformTask);
      const modules = modulesRes.data.map(row => transformModule(row, tasks));
      const enrollments = enrollmentsRes.data.map(transformEnrollment);

      setCourses(coursesRes.data.map(row => transformCourse(row, courseVersions, modules)));
      setStudents(studentsRes.data.map(row => transformStudent(row, enrollments)));
      setSuperCoaches(coachesRes.data.map(transformSuperCoach));
      setConversations(conversationsRes.data.map(transformConversation));
      setPromises(promisesRes.data.map(transformPromise));
      setTasks(tasks);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Authentication function - updated to use name and phone for sign in
  const authenticateCoach = async (name: string, email: string, phone?: string) => {
    try {
      // For sign in, use name and phone to find coach
      const { data: coach, error } = await supabase
        .from('coaches')
        .select('*')
        .eq('name', name)
        .eq('phone', phone || '')
        .single();

      if (error || !coach) {
        throw new Error('Invalid credentials - coach not found');
      }

      setCurrentCoach(coach);
      return coach;
    } catch (err) {
      console.error('Authentication error:', err);
      throw err;
    }
  };

  // Update current coach profile
  const updateCoachProfile = async (coachData: Partial<Coach>) => {
    if (!currentCoach) throw new Error('No authenticated coach');

    try {
      const { data, error } = await supabase
        .from('coaches')
        .update({
          name: coachData.name,
          email: coachData.email,
          phone: coachData.phone || null
        })
        .eq('id', currentCoach.id)
        .select()
        .single();

      if (error) throw error;
      
      setCurrentCoach(data);
      return data;
    } catch (err) {
      console.error('Error updating coach profile:', err);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentCoach(null);
  };

  // Course operations
  const createCourse = async (courseData: Partial<Course>) => {
    try {
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert({
          title: courseData.title!,
          coaches: courseData.superCoachId || null,
          is_active: true
        })
        .select()
        .single();

      if (courseError) throw courseError;

      // Create initial version
      const { error: versionError } = await supabase
        .from('course_versions')
        .insert({
          course_id: course.id,
          version_number: 1,
          is_active: true,
          is_current: true
        });

      if (versionError) throw versionError;
      
      await fetchData(); // Refresh data
      return course;
    } catch (err) {
      console.error('Error creating course:', err);
      throw err;
    }
  };

  const updateCourse = async (courseId: number, courseData: Partial<Course>) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .update({
          title: courseData.title,
          coaches: courseData.superCoachId || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', courseId)
        .select()
        .single();

      if (error) throw error;
      
      await fetchData(); // Refresh data
      return data;
    } catch (err) {
      console.error('Error updating course:', err);
      throw err;
    }
  };

  const createCourseVersion = async (courseId: number) => {
    try {
      // Get current version number
      const { data: versions } = await supabase
        .from('course_versions')
        .select('version_number')
        .eq('course_id', courseId)
        .order('version_number', { ascending: false })
        .limit(1);

      const nextVersion = versions && versions.length > 0 ? versions[0].version_number + 1 : 1;

      // Mark current version as not current
      await supabase
        .from('course_versions')
        .update({ is_current: false })
        .eq('course_id', courseId);

      // Create new version
      const { data, error } = await supabase
        .from('course_versions')
        .insert({
          course_id: courseId,
          version_number: nextVersion,
          is_active: true,
          is_current: true
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchData(); // Refresh data
      return data;
    } catch (err) {
      console.error('Error creating course version:', err);
      throw err;
    }
  };

  const makeCourseeLive = async (courseId: number) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .update({ is_active: true })
        .eq('id', courseId)
        .select()
        .single();

      if (error) throw error;
      
      await fetchData(); // Refresh data
      return data;
    } catch (err) {
      console.error('Error making course live:', err);
      throw err;
    }
  };

  // Student operations
  const createStudent = async (studentData: Partial<Student>, courseId?: number) => {
    try {
      const { data: student, error: studentError } = await supabase
        .from('students')
        .insert({
          name: studentData.name!,
          telegram_id: studentData.telegram_id || null,
          phone_number: studentData.phone || null,
          about: studentData.about || null,
          email: studentData.email || null
        })
        .select()
        .single();

      if (studentError) throw studentError;

      // If courseId provided, create enrollment
      if (courseId) {
        // Get current course version
        const { data: version } = await supabase
          .from('course_versions')
          .select('id')
          .eq('course_id', courseId)
          .eq('is_current', true)
          .single();

        if (version) {
          await supabase
            .from('enrollments')
            .insert({
              student_id: student.id,
              course_id: courseId,
              course_version_id: version.id,
              status: 'active'
            });
        }
      }
      
      await fetchData(); // Refresh data
      return student;
    } catch (err) {
      console.error('Error creating student:', err);
      throw err;
    }
  };

  const updateStudent = async (studentId: number, studentData: Partial<Student>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .update({
          name: studentData.name,
          email: studentData.email,
          phone_number: studentData.phone || null,
          telegram_id: studentData.telegram_id || null,
          about: studentData.about || null
        })
        .eq('id', studentId)
        .select()
        .single();

      if (error) throw error;
      
      await fetchData(); // Refresh data
      return data;
    } catch (err) {
      console.error('Error updating student:', err);
      throw err;
    }
  };

  // SuperCoach operations
  const createSuperCoach = async (superCoachData: Partial<SuperCoach>) => {
    try {
      const { data, error } = await supabase
        .from('coaches')
        .insert({
          name: superCoachData.name!,
          email: superCoachData.email || `${superCoachData.name?.toLowerCase().replace(/\s+/g, '.')}@supercoach.ai`,
          phone: superCoachData.phone || null
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchData(); // Refresh data
      return data;
    } catch (err) {
      console.error('Error creating super coach:', err);
      throw err;
    }
  };

  const updateSuperCoach = async (superCoachId: number, superCoachData: Partial<SuperCoach>) => {
    try {
      const { data, error } = await supabase
        .from('coaches')
        .update({
          name: superCoachData.name,
          email: superCoachData.email,
          phone: superCoachData.phone || null
        })
        .eq('id', superCoachId)
        .select()
        .single();

      if (error) throw error;
      
      await fetchData(); // Refresh data
      return data;
    } catch (err) {
      console.error('Error updating super coach:', err);
      throw err;
    }
  };

  const deleteSuperCoach = async (superCoachId: number) => {
    try {
      const { error } = await supabase
        .from('coaches')
        .delete()
        .eq('id', superCoachId);

      if (error) throw error;
      
      await fetchData(); // Refresh data
    } catch (err) {
      console.error('Error deleting super coach:', err);
      throw err;
    }
  };

  // Initialize data on mount
  useEffect(() => {
    fetchData();
  }, []);

  return {
    courses,
    students,
    superCoaches,
    conversations,
    promises,
    tasks,
    currentCoach,
    loading,
    error,
    refetch: fetchData,
    authenticateCoach,
    updateCoachProfile,
    logout,
    createCourse,
    updateCourse,
    createCourseVersion,
    makeCourseeLive,
    createStudent,
    updateStudent,
    createSuperCoach,
    updateSuperCoach,
    deleteSuperCoach
  };
};