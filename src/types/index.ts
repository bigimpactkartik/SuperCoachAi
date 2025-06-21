export interface Course {
  id: number;
  title: string;
  description: string;
  status: 'draft' | 'live' | 'archived';
  version: number;
  modules: Module[];
  createdAt: string;
  updatedAt: string;
  enrolledStudents: number;
  completionRate: number;
  superCoachId: number | null;
  baseId?: number; // Links all versions of the same course
  isCurrentVersion?: boolean; // Marks the latest version
}

export interface Module {
  id: number;
  title: string;
  description: string;
  tasks: Task[];
  order: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  order: number;
  estimatedTime: number; // in minutes
}

export interface Student {
  id: number;
  name: string;
  email: string;
  phone?: string;
  telegram_id?: string;
  about?: string;
  avatar?: string;
  status: 'new' | 'in-progress' | 'stuck' | 'completed';
  enrolledCourses: StudentCourseEnrollment[];
  progress: StudentProgress[];
  joinedAt: string;
  lastActivity: string;
}

export interface StudentCourseEnrollment {
  courseId: number;
  courseVersion: number;
  enrolledAt: string;
  baseId: number; // Links to the base course
}

export interface StudentProgress {
  courseId: number;
  courseVersion: number;
  moduleId: number;
  taskId: number;
  status: 'not-started' | 'in-progress' | 'completed';
  completedAt?: string;
  timeSpent: number; // in minutes
}

export interface SuperCoach {
  id: number;
  name: string;
  email: string;
  phone: string | null;
}

export interface Conversation {
  id: number;
  studentId: number;
  superCoachId: number;
  courseId: number;
  courseVersion: number;
  messages: Message[];
  startedAt: string;
  lastMessageAt: string;
}

export interface Message {
  id: number;
  senderId: number;
  senderType: 'student' | 'supercoach';
  content: string;
  timestamp: string;
  type: 'text' | 'voice' | 'file';
}