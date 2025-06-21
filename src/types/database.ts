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
          course_id: number | null;
          version_number: number;
          updated_at: string | null;
          is_active: boolean | null;
        };
        Insert: {
          id?: number;
          course_id?: number | null;
          version_number: number;
          updated_at?: string | null;
          is_active?: boolean | null;
        };
        Update: {
          id?: number;
          course_id?: number | null;
          version_number?: number;
          updated_at?: string | null;
          is_active?: boolean | null;
        };
      };
      courses: {
        Row: {
          id: number;
          title: string;
          coach_id: number | null;
        };
        Insert: {
          id?: number;
          title: string;
          coach_id?: number | null;
        };
        Update: {
          id?: number;
          title?: string;
          coach_id?: number | null;
        };
      };
      enrollments: {
        Row: {
          id: number;
          student_id: number | null;
          course_id: number | null;
          enrolled_at: string | null;
        };
        Insert: {
          id?: number;
          student_id?: number | null;
          course_id?: number | null;
          enrolled_at?: string | null;
        };
        Update: {
          id?: number;
          student_id?: number | null;
          course_id?: number | null;
          enrolled_at?: string | null;
        };
      };
      modules: {
        Row: {
          id: number;
          course_id: number | null;
          title: string | null;
        };
        Insert: {
          id?: number;
          course_id?: number | null;
          title?: string | null;
        };
        Update: {
          id?: number;
          course_id?: number | null;
          title?: string | null;
        };
      };
      promises: {
        Row: {
          id: number;
          student_id: number | null;
          task_id: number | null;
          promise_datetime: string | null;
          due_date: string | null;
          checked: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          student_id?: number | null;
          task_id?: number | null;
          promise_datetime?: string | null;
          due_date?: string | null;
          checked?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          student_id?: number | null;
          task_id?: number | null;
          promise_datetime?: string | null;
          due_date?: string | null;
          checked?: boolean | null;
          created_at?: string | null;
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
          student_id: number | null;
          task_id: number | null;
          status: 'pending' | 'completed' | null;
          updated_at: string | null;
          due_date: string;
        };
        Insert: {
          id?: number;
          student_id?: number | null;
          task_id?: number | null;
          status?: 'pending' | 'completed' | null;
          updated_at?: string | null;
          due_date: string;
        };
        Update: {
          id?: number;
          student_id?: number | null;
          task_id?: number | null;
          status?: 'pending' | 'completed' | null;
          updated_at?: string | null;
          due_date?: string;
        };
      };
      tasks: {
        Row: {
          id: number;
          course_id: number;
          title: string;
          deadline: string;
          module_id: number;
          timetocomplete: number | null;
        };
        Insert: {
          id?: number;
          course_id: number;
          title: string;
          deadline: string;
          module_id: number;
          timetocomplete?: number | null;
        };
        Update: {
          id?: number;
          course_id?: number;
          title?: string;
          deadline?: string;
          module_id?: number;
          timetocomplete?: number | null;
        };
      };
    };
  };
}