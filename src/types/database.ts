export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: number;
          title: string;
          description: string;
          status: 'draft' | 'live' | 'archived';
          version: number;
          modules: any; // JSON field
          created_at: string;
          updated_at: string;
          enrolled_students: number;
          completion_rate: number;
          super_coach_id: number | null;
          base_id: number | null;
          is_current_version: boolean;
        };
        Insert: {
          id?: number;
          title: string;
          description: string;
          status?: 'draft' | 'live' | 'archived';
          version?: number;
          modules?: any;
          created_at?: string;
          updated_at?: string;
          enrolled_students?: number;
          completion_rate?: number;
          super_coach_id?: number | null;
          base_id?: number | null;
          is_current_version?: boolean;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string;
          status?: 'draft' | 'live' | 'archived';
          version?: number;
          modules?: any;
          created_at?: string;
          updated_at?: string;
          enrolled_students?: number;
          completion_rate?: number;
          super_coach_id?: number | null;
          base_id?: number | null;
          is_current_version?: boolean;
        };
      };
      students: {
        Row: {
          id: number;
          name: string;
          email: string;
          avatar: string | null;
          status: 'new' | 'in-progress' | 'stuck' | 'completed';
          enrolled_courses: any; // JSON field
          progress: any; // JSON field
          joined_at: string;
          last_activity: string;
        };
        Insert: {
          id?: number;
          name: string;
          email: string;
          avatar?: string | null;
          status?: 'new' | 'in-progress' | 'stuck' | 'completed';
          enrolled_courses?: any;
          progress?: any;
          joined_at?: string;
          last_activity?: string;
        };
        Update: {
          id?: number;
          name?: string;
          email?: string;
          avatar?: string | null;
          status?: 'new' | 'in-progress' | 'stuck' | 'completed';
          enrolled_courses?: any;
          progress?: any;
          joined_at?: string;
          last_activity?: string;
        };
      };
      super_coaches: {
        Row: {
          id: number;
          name: string;
          personality_type: 'friendly' | 'professional' | 'motivational' | 'supportive' | 'direct';
          description: string;
          avatar: string;
          courses_assigned: any; // JSON field
          created_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: number;
          name: string;
          personality_type: 'friendly' | 'professional' | 'motivational' | 'supportive' | 'direct';
          description: string;
          avatar?: string;
          courses_assigned?: any;
          created_at?: string;
          is_active?: boolean;
        };
        Update: {
          id?: number;
          name?: string;
          personality_type?: 'friendly' | 'professional' | 'motivational' | 'supportive' | 'direct';
          description?: string;
          avatar?: string;
          courses_assigned?: any;
          created_at?: string;
          is_active?: boolean;
        };
      };
      conversations: {
        Row: {
          id: number;
          student_id: number;
          super_coach_id: number;
          course_id: number;
          course_version: number;
          messages: any; // JSON field
          started_at: string;
          last_message_at: string;
        };
        Insert: {
          id?: number;
          student_id: number;
          super_coach_id: number;
          course_id: number;
          course_version: number;
          messages?: any;
          started_at?: string;
          last_message_at?: string;
        };
        Update: {
          id?: number;
          student_id?: number;
          super_coach_id?: number;
          course_id?: number;
          course_version?: number;
          messages?: any;
          started_at?: string;
          last_message_at?: string;
        };
      };
    };
  };
}