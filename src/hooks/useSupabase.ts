import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Course, Student, SuperCoach, Conversation } from '../types';

// Transform database row to application type
const transformCourse = (row: any): Course => ({
  id: row.id,
  title: row.title,
  description: row.description,
  status: row.status,
  version: row.version,
  modules: row.modules || [],
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  enrolledStudents: row.enrolled_students,
  completionRate: row.completion_rate,
  superCoachId: row.super_coach_id,
  baseId: row.base_id,
  isCurrentVersion: row.is_current_version
});

const transformStudent = (row: any): Student => ({
  id: row.id,
  name: row.name,
  email: row.email,
  avatar: row.avatar,
  status: row.status,
  enrolledCourses: row.enrolled_courses || [],
  progress: row.progress || [],
  joinedAt: row.joined_at,
  lastActivity: row.last_activity
});

const transformSuperCoach = (row: any): SuperCoach => ({
  id: row.id,
  name: row.name,
  personalityType: row.personality_type,
  description: row.description,
  avatar: row.avatar || '',
  coursesAssigned: row.courses_assigned || [],
  createdAt: row.created_at,
  isActive: row.is_active
});

const transformConversation = (row: any): Conversation => ({
  id: row.id,
  studentId: row.student_id,
  superCoachId: row.super_coach_id,
  courseId: row.course_id,
  courseVersion: row.course_version,
  messages: row.messages || [],
  startedAt: row.started_at,
  lastMessageAt: row.last_message_at
});

export const useSupabase = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [superCoaches, setSuperCoaches] = useState<SuperCoach[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [coursesRes, studentsRes, superCoachesRes, conversationsRes] = await Promise.all([
        supabase.from('courses').select('*').order('created_at', { ascending: false }),
        supabase.from('students').select('*').order('joined_at', { ascending: false }),
        supabase.from('super_coaches').select('*').order('created_at', { ascending: false }),
        supabase.from('conversations').select('*').order('last_message_at', { ascending: false })
      ]);

      if (coursesRes.error) throw coursesRes.error;
      if (studentsRes.error) throw studentsRes.error;
      if (superCoachesRes.error) throw superCoachesRes.error;
      if (conversationsRes.error) throw conversationsRes.error;

      setCourses(coursesRes.data.map(transformCourse));
      setStudents(studentsRes.data.map(transformStudent));
      setSuperCoaches(superCoachesRes.data.map(transformSuperCoach));
      setConversations(conversationsRes.data.map(transformConversation));
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Course operations
  const createCourse = async (courseData: Partial<Course>) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert({
          title: courseData.title!,
          description: courseData.description!,
          modules: courseData.modules || [],
          base_id: Date.now() // New base ID for new course
        })
        .select()
        .single();

      if (error) throw error;
      
      const newCourse = transformCourse(data);
      setCourses(prev => [newCourse, ...prev]);
      return newCourse;
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
          description: courseData.description,
          modules: courseData.modules,
          status: courseData.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', courseId)
        .select()
        .single();

      if (error) throw error;
      
      const updatedCourse = transformCourse(data);
      setCourses(prev => prev.map(c => c.id === courseId ? updatedCourse : c));
      return updatedCourse;
    } catch (err) {
      console.error('Error updating course:', err);
      throw err;
    }
  };

  const createCourseVersion = async (courseId: number) => {
    try {
      const course = courses.find(c => c.id === courseId);
      if (!course) throw new Error('Course not found');

      // Mark current version as not current
      await supabase
        .from('courses')
        .update({ is_current_version: false })
        .eq('base_id', course.baseId || course.id);

      const { data, error } = await supabase
        .from('courses')
        .insert({
          title: course.title,
          description: course.description,
          modules: course.modules,
          version: course.version + 1,
          base_id: course.baseId || course.id,
          is_current_version: true
        })
        .select()
        .single();

      if (error) throw error;
      
      const newVersion = transformCourse(data);
      setCourses(prev => prev.map(c => 
        (c.baseId === course.baseId || c.id === course.baseId) 
          ? { ...c, isCurrentVersion: false } 
          : c
      ).concat(newVersion));
      
      return newVersion;
    } catch (err) {
      console.error('Error creating course version:', err);
      throw err;
    }
  };

  const makeCourseeLive = async (courseId: number) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .update({ status: 'live' })
        .eq('id', courseId)
        .select()
        .single();

      if (error) throw error;
      
      const updatedCourse = transformCourse(data);
      setCourses(prev => prev.map(c => c.id === courseId ? updatedCourse : c));
      return updatedCourse;
    } catch (err) {
      console.error('Error making course live:', err);
      throw err;
    }
  };

  // Student operations
  const createStudent = async (studentData: Partial<Student>, courseId?: number) => {
    try {
      let enrolledCourses = studentData.enrolledCourses || [];
      
      if (courseId) {
        const course = courses.find(c => c.id === courseId);
        if (course) {
          enrolledCourses = [{
            courseId: course.id,
            courseVersion: course.version,
            enrolledAt: new Date().toISOString(),
            baseId: course.baseId || course.id
          }];
        }
      }

      const { data, error } = await supabase
        .from('students')
        .insert({
          name: studentData.name!,
          email: studentData.email!,
          enrolled_courses: enrolledCourses,
          progress: studentData.progress || []
        })
        .select()
        .single();

      if (error) throw error;
      
      const newStudent = transformStudent(data);
      setStudents(prev => [newStudent, ...prev]);

      // Update course enrollment count if enrolled
      if (courseId) {
        await supabase
          .from('courses')
          .update({ enrolled_students: supabase.raw('enrolled_students + 1') })
          .eq('id', courseId);
        
        setCourses(prev => prev.map(c => 
          c.id === courseId 
            ? { ...c, enrolledStudents: c.enrolledStudents + 1 }
            : c
        ));
      }
      
      return newStudent;
    } catch (err) {
      console.error('Error creating student:', err);
      throw err;
    }
  };

  // SuperCoach operations
  const createSuperCoach = async (superCoachData: Partial<SuperCoach>) => {
    try {
      const { data, error } = await supabase
        .from('super_coaches')
        .insert({
          name: superCoachData.name!,
          personality_type: superCoachData.personalityType!,
          description: superCoachData.description!,
          avatar: superCoachData.avatar || ''
        })
        .select()
        .single();

      if (error) throw error;
      
      const newSuperCoach = transformSuperCoach(data);
      setSuperCoaches(prev => [newSuperCoach, ...prev]);
      return newSuperCoach;
    } catch (err) {
      console.error('Error creating super coach:', err);
      throw err;
    }
  };

  const updateSuperCoach = async (superCoachId: number, superCoachData: Partial<SuperCoach>) => {
    try {
      const { data, error } = await supabase
        .from('super_coaches')
        .update({
          name: superCoachData.name,
          personality_type: superCoachData.personalityType,
          description: superCoachData.description,
          avatar: superCoachData.avatar
        })
        .eq('id', superCoachId)
        .select()
        .single();

      if (error) throw error;
      
      const updatedSuperCoach = transformSuperCoach(data);
      setSuperCoaches(prev => prev.map(sc => sc.id === superCoachId ? updatedSuperCoach : sc));
      return updatedSuperCoach;
    } catch (err) {
      console.error('Error updating super coach:', err);
      throw err;
    }
  };

  const deleteSuperCoach = async (superCoachId: number) => {
    try {
      const { error } = await supabase
        .from('super_coaches')
        .delete()
        .eq('id', superCoachId);

      if (error) throw error;
      
      setSuperCoaches(prev => prev.filter(sc => sc.id !== superCoachId));
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
    loading,
    error,
    refetch: fetchData,
    createCourse,
    updateCourse,
    createCourseVersion,
    makeCourseeLive,
    createStudent,
    createSuperCoach,
    updateSuperCoach,
    deleteSuperCoach
  };
};