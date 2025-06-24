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
  baseId?: number;
  isCurrentVersion?: boolean;
  isActive: boolean;
}

export interface CourseVersion {
  id: number;
  courseId: number;
  versionNumber: number;
  updatedAt: string;
  isActive: boolean;
  isCurrent: boolean;
}

export interface Module {
  id: number;
  courseId: number;
  title: string;
  description: string;
  tasks: Task[];
  order: number;
  courseVersion: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  courseId: number;
  title: string;
  description: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  moduleId: number;
  timeToComplete: number | null;
  courseVersion: number;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: number;
  name: string;
  email: string | null;
  phone?: string | null;
  telegram_id?: string | null;
  about?: string | null;
  avatar?: string;
  status: 'new' | 'in-progress' | 'stuck' | 'completed';
  enrolledCourses: StudentCourseEnrollment[];
  progress: StudentProgress[];
  joinedAt: string;
  lastActivity: string;
}

export interface StudentCourseEnrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrolledAt: string;
  courseVersionId: number;
  status: 'active' | 'completed' | 'dropped' | null;
}

export interface StudentProgress {
  courseId: number;
  courseVersion: number;
  moduleId: number;
  taskId: number;
  status: 'not-started' | 'in-progress' | 'completed';
  completedAt?: string;
  timeSpent: number;
}

export interface TaskAssignment {
  id: number;
  studentId: number;
  taskId: number;
  status: 'pending' | 'in_progress' | 'completed' | null;
  updatedAt: string;
  dueDate: string;
  completedAt: string | null;
  courseVersion: number;
}

export interface Promise {
  id: number;
  studentId: number;
  taskId: number;
  promiseDatetime: string;
  dueDate: string;
  checked: boolean;
  createdAt: string;
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

export interface Coach {
  id: number;
  name: string;
  email: string;
  phone: string | null;
}

export interface Theme {
  name: string;
  value: 'light' | 'dark' | 'auto';
}