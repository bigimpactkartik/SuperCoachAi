export interface Database {
  public: {
    Tables: {
      coaches: {
        Row: {
          id: number;
          name: string;
          email: string;
          phone: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          email: string;
          phone?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          email?: string;
          phone?: string | null;
        };
      };
      conversations: {
        Row: {
          id: number;
          student_id: number;
          role: string;
          message: string;
          timestamp: string;
        };
        Insert: {
          id?: number;
          student_id: number;
          role: string;
          message: string;
          timestamp?: string;
        };
        Update: {
          id?: number;
          student_id?: number;
          role?: string;
          message?: string;
          timestamp?: string;
        };
      };
      course_versions: {
        Row: {
          id: number;
          course_id: number;
          version_number: number;
          updated_at: string;
          is_active: boolean;
          is_current: boolean;
        };
        Insert: {
          id?: number;
          course_id: number;
          version_number: number;
          updated_at?: string;
          is_active?: boolean;
          is_current?: boolean;
        };
        Update: {
          id?: number;
          course_id?: number;
          version_number?: number;
          updated_at?: string;
          is_active?: boolean;
          is_current?: boolean;
        };
      };
      courses: {
        Row: {
          id: number;
          title: string;
          coaches: number | null;
          created_at: string;
          updated_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: number;
          title: string;
          coaches?: number | null;
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
        };
        Update: {
          id?: number;
          title?: string;
          coaches?: number | null;
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
        };
      };
      enrollments: {
        Row: {
          id: number;
          student_id: number;
          course_id: number;
          enrolled_at: string;
          course_version_id: number;
          status: 'active' | 'completed' | 'dropped' | null;
        };
        Insert: {
          id?: number;
          student_id: number;
          course_id: number;
          enrolled_at?: string;
          course_version_id: number;
          status?: 'active' | 'completed' | 'dropped' | null;
        };
        Update: {
          id?: number;
          student_id?: number;
          course_id?: number;
          enrolled_at?: string;
          course_version_id?: number;
          status?: 'active' | 'completed' | 'dropped' | null;
        };
      };
      modules: {
        Row: {
          id: number;
          course_id: number;
          title: string;
          course_version: number;
          order_id: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          course_id: number;
          title: string;
          course_version: number;
          order_id: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          course_id?: number;
          title?: string;
          course_version?: number;
          order_id?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      promises: {
        Row: {
          id: number;
          student_id: number;
          task_id: number;
          promise_datetime: string;
          due_date: string;
          checked: boolean;
          created_at: string;
        };
        Insert: {
          id?: number;
          student_id: number;
          task_id: number;
          promise_datetime: string;
          due_date: string;
          checked?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          student_id?: number;
          task_id?: number;
          promise_datetime?: string;
          due_date?: string;
          checked?: boolean;
          created_at?: string;
        };
      };
      students: {
        Row: {
          id: number;
          name: string;
          telegram_id: string | null;
          phone_number: string | null;
          about: string | null;
          email: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          telegram_id?: string | null;
          phone_number?: string | null;
          about?: string | null;
          email?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          telegram_id?: string | null;
          phone_number?: string | null;
          about?: string | null;
          email?: string | null;
        };
      };
      task_assignments: {
        Row: {
          id: number;
          student_id: number;
          task_id: number;
          status: 'pending' | 'in_progress' | 'completed' | null;
          updated_at: string;
          due_date: string;
          completed_at: string | null;
          course_version: number;
        };
        Insert: {
          id?: number;
          student_id: number;
          task_id: number;
          status?: 'pending' | 'in_progress' | 'completed' | null;
          updated_at?: string;
          due_date: string;
          completed_at?: string | null;
          course_version: number;
        };
        Update: {
          id?: number;
          student_id?: number;
          task_id?: number;
          status?: 'pending' | 'in_progress' | 'completed' | null;
          updated_at?: string;
          due_date?: string;
          completed_at?: string | null;
          course_version?: number;
        };
      };
      tasks: {
        Row: {
          id: number;
          course_id: number;
          title: string;
          module_id: number;
          timetocomplete: number | null;
          course_version: number;
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          course_id: number;
          title: string;
          module_id: number;
          timetocomplete?: number | null;
          course_version: number;
          order_index: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          course_id?: number;
          title?: string;
          module_id?: number;
          timetocomplete?: number | null;
          course_version?: number;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}