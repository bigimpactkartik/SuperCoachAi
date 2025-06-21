import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Course, Student, SuperCoach, Conversation } from '../types';

// Transform database row to application type
const transformCourse = (row: any): Course => ({
  id: row.id,
  title: row.title,
  description: '', // Default since not in database
  status: 'draft', // Default since not in database
  version: 1, // Default since not in database
  modules: [], // Default since not in database
  createdAt: new Date().toISOString(), // Default since not in database
  updatedAt: new Date().toISOString(), // Default since not in database
  enrolledStudents: 0, // Default since not in database
  completionRate: 0, // Default since not in database
  superCoachId: row.coach_id,
  baseId: row.id, // Use id as baseId
  isCurrentVersion: true // Default since not in database
});

const transformStudent = (row: any): Student => ({
  id: row.id,
  name: row.name,
  email: row.email || '',
  avatar: undefined, // Not in database
  status: 'new', // Default since not in database
  enrolledCourses: [], // Default since not in database
  progress: [], // Default since not in database
  joinedAt: new Date().toISOString(), // Default since not in database
  lastActivity: 'Recently active' // Default since not in database
});

const transformSuperCoach = (row: any): SuperCoach => ({
  id: row.id,
  name: row.name,
  personalityType: 'friendly', // Default since not in database
  description: '', // Default since not in database
  avatar: '', // Default since not in database
  coursesAssigned: [], // Default since not in database
  createdAt: new Date().toISOString(), // Default since not in database
  isActive: true // Default since not in database
});

const transformConversation = (row: any): Conversation => ({
  id: row.id,
  studentId: row.student_id,
  superCoachId: 1, // Default coach ID since not in database
  courseId: 1, // Default course ID since not in database
  courseVersion: 1, // Default version since not in database
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

  // Course operations
  const createCourse = async (courseData: Partial<Course>) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert({
          title: courseData.title!,
          coach_id: courseData.superCoachId
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
          coach_id: courseData.superCoachId
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
          coach_id: course.superCoachId
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
      // Since status is not in the database, we'll just update the course
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

  // Student operations
  const createStudent = async (studentData: Partial<Student>, courseId?: number) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert({
          name: studentData.name!,
          email: studentData.email!,
          telegram_id: null,
          phone_number: null,
          about: null
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
            course_id: courseId
          });
      }
      
      return newStudent;
    } catch (err) {
      console.error('Error creating student:', err);
      throw err;
    }
  };

  // SuperCoach operations (using coaches table)
  const createSuperCoach = async (superCoachData: Partial<SuperCoach>) => {
    try {
      const { data, error } = await supabase
        .from('coaches')
        .insert({
          name: superCoachData.name!,
          email: `${superCoachData.name?.toLowerCase().replace(/\s+/g, '.')}@supercoach.ai`,
          phone: null
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
          email: superCoachData.name ? `${superCoachData.name.toLowerCase().replace(/\s+/g, '.')}@supercoach.ai` : undefined
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