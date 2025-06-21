import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Course, Student, SuperCoach, Conversation } from '../types';

// Transform database row to application type with minimal defaults
const transformCourse = (row: any): Course => ({
  id: row.id,
  title: row.title,
  description: '', // Not in database - default
  status: 'draft', // Not in database - default
  version: 1, // Not in database - default
  modules: [], // Not in database - default
  createdAt: new Date().toISOString(), // Not in database - default
  updatedAt: new Date().toISOString(), // Not in database - default
  enrolledStudents: 0, // Not in database - default
  completionRate: 0, // Not in database - default
  superCoachId: row.coach_id,
  baseId: row.id,
  isCurrentVersion: true // Not in database - default
});

const transformStudent = (row: any): Student => ({
  id: row.id,
  name: row.name,
  email: row.email || '',
  avatar: undefined, // Not in database
  status: 'new', // Not in database - default
  enrolledCourses: [], // Not in database - default
  progress: [], // Not in database - default
  joinedAt: new Date().toISOString(), // Not in database - default
  lastActivity: 'Recently active' // Not in database - default
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
  superCoachId: 1, // Not in database - default
  courseId: 1, // Not in database - default
  courseVersion: 1, // Not in database - default
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [coursesRes, studentsRes, coachesRes, conversationsRes] = await Promise.all([
        supabase.from('courses').select('*').order('id', { ascending: false }),
        supabase.from('students').select('*').order('id', { ascending: false }),
        supabase.from('coaches').select('*').order('id', { ascending: false }),
        supabase.from('conversations').select('*').order('timestamp', { ascending: false })
      ]);

      if (coursesRes.error) throw coursesRes.error;
      if (studentsRes.error) throw studentsRes.error;
      if (coachesRes.error) throw coachesRes.error;
      if (conversationsRes.error) throw conversationsRes.error;

      setCourses(coursesRes.data.map(transformCourse));
      setStudents(studentsRes.data.map(transformStudent));
      setSuperCoaches(coachesRes.data.map(transformSuperCoach));
      setConversations(conversationsRes.data.map(transformConversation));
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Authentication function
  const authenticateCoach = async (email: string, password: string) => {
    try {
      // Check if coach exists in coaches table
      const { data: coach, error } = await supabase
        .from('coaches')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !coach) {
        throw new Error('Invalid credentials');
      }

      // For now, we'll use a simple password check
      // In production, you'd want proper password hashing
      if (password === 'coach123') { // Default password for demo
        return coach;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      throw err;
    }
  };

  // Course operations - ONLY using fields that exist in database
  const createCourse = async (courseData: Partial<Course>) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert({
          title: courseData.title!,
          coach_id: courseData.superCoachId || null
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
          coach_id: courseData.superCoachId || null
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

      const { data, error } = await supabase
        .from('courses')
        .insert({
          title: `${course.title} (v${course.version + 1})`,
          coach_id: course.superCoachId || null
        })
        .select()
        .single();

      if (error) throw error;
      
      const newVersion = transformCourse(data);
      setCourses(prev => [...prev, newVersion]);
      
      return newVersion;
    } catch (err) {
      console.error('Error creating course version:', err);
      throw err;
    }
  };

  const makeCourseeLive = async (courseId: number) => {
    try {
      // Since status is not in the database, we'll just update locally
      const course = courses.find(c => c.id === courseId);
      if (!course) throw new Error('Course not found');
      
      const updatedCourse = { ...course, status: 'live' as const };
      setCourses(prev => prev.map(c => c.id === courseId ? updatedCourse : c));
      return updatedCourse;
    } catch (err) {
      console.error('Error making course live:', err);
      throw err;
    }
  };

  // Student operations - ONLY using fields that exist in database
  const createStudent = async (studentData: Partial<Student>, courseId?: number) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert({
          name: studentData.name!,
          telegram_id: null,
          phone_number: null,
          about: null,
          email: studentData.email || null
        })
        .select()
        .single();

      if (error) throw error;
      
      const newStudent = transformStudent(data);
      setStudents(prev => [newStudent, ...prev]);

      // If courseId provided, create enrollment
      if (courseId) {
        await supabase
          .from('enrollments')
          .insert({
            student_id: data.id,
            course_id: courseId,
            enrolled_at: new Date().toISOString()
          });
      }
      
      return newStudent;
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
      
      const updatedStudent = transformStudent(data);
      setStudents(prev => prev.map(s => s.id === studentId ? updatedStudent : s));
      return updatedStudent;
    } catch (err) {
      console.error('Error updating student:', err);
      throw err;
    }
  };

  // SuperCoach operations - ONLY using fields that exist in coaches table
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
        .from('coaches')
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
    authenticateCoach,
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