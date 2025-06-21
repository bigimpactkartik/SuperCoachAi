/*
  # Initial Schema for SuperCoach AI Dashboard

  1. New Tables
    - `courses`
      - `id` (bigint, primary key)
      - `title` (text)
      - `description` (text)
      - `status` (text, check constraint)
      - `version` (integer, default 1)
      - `modules` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `enrolled_students` (integer, default 0)
      - `completion_rate` (integer, default 0)
      - `super_coach_id` (bigint, foreign key)
      - `base_id` (bigint, self-reference for versioning)
      - `is_current_version` (boolean, default true)

    - `students`
      - `id` (bigint, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `avatar` (text, nullable)
      - `status` (text, check constraint)
      - `enrolled_courses` (jsonb)
      - `progress` (jsonb)
      - `joined_at` (timestamptz)
      - `last_activity` (text)

    - `super_coaches`
      - `id` (bigint, primary key)
      - `name` (text)
      - `personality_type` (text, check constraint)
      - `description` (text)
      - `avatar` (text)
      - `courses_assigned` (jsonb)
      - `created_at` (timestamptz)
      - `is_active` (boolean, default true)

    - `conversations`
      - `id` (bigint, primary key)
      - `student_id` (bigint, foreign key)
      - `super_coach_id` (bigint, foreign key)
      - `course_id` (bigint, foreign key)
      - `course_version` (integer)
      - `messages` (jsonb)
      - `started_at` (timestamptz)
      - `last_message_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'live', 'archived')),
  version integer NOT NULL DEFAULT 1,
  modules jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  enrolled_students integer DEFAULT 0,
  completion_rate integer DEFAULT 0,
  super_coach_id bigint,
  base_id bigint,
  is_current_version boolean DEFAULT true
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'stuck', 'completed')),
  enrolled_courses jsonb NOT NULL DEFAULT '[]',
  progress jsonb NOT NULL DEFAULT '[]',
  joined_at timestamptz DEFAULT now(),
  last_activity text DEFAULT 'Just joined'
);

-- Create super_coaches table
CREATE TABLE IF NOT EXISTS super_coaches (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  personality_type text NOT NULL CHECK (personality_type IN ('friendly', 'professional', 'motivational', 'supportive', 'direct')),
  description text NOT NULL,
  avatar text DEFAULT '',
  courses_assigned jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  student_id bigint NOT NULL,
  super_coach_id bigint NOT NULL,
  course_id bigint NOT NULL,
  course_version integer NOT NULL DEFAULT 1,
  messages jsonb NOT NULL DEFAULT '[]',
  started_at timestamptz DEFAULT now(),
  last_message_at timestamptz DEFAULT now()
);

-- Add foreign key constraints
ALTER TABLE courses ADD CONSTRAINT fk_courses_super_coach 
  FOREIGN KEY (super_coach_id) REFERENCES super_coaches(id);

ALTER TABLE courses ADD CONSTRAINT fk_courses_base 
  FOREIGN KEY (base_id) REFERENCES courses(id);

ALTER TABLE conversations ADD CONSTRAINT fk_conversations_student 
  FOREIGN KEY (student_id) REFERENCES students(id);

ALTER TABLE conversations ADD CONSTRAINT fk_conversations_super_coach 
  FOREIGN KEY (super_coach_id) REFERENCES super_coaches(id);

ALTER TABLE conversations ADD CONSTRAINT fk_conversations_course 
  FOREIGN KEY (course_id) REFERENCES courses(id);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE super_coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Create policies for courses
CREATE POLICY "Allow all operations on courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for students
CREATE POLICY "Allow all operations on students"
  ON students
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for super_coaches
CREATE POLICY "Allow all operations on super_coaches"
  ON super_coaches
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for conversations
CREATE POLICY "Allow all operations on conversations"
  ON conversations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_base_id ON courses(base_id);
CREATE INDEX IF NOT EXISTS idx_courses_is_current_version ON courses(is_current_version);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
CREATE INDEX IF NOT EXISTS idx_conversations_student_id ON conversations(student_id);
CREATE INDEX IF NOT EXISTS idx_conversations_super_coach_id ON conversations(super_coach_id);
CREATE INDEX IF NOT EXISTS idx_conversations_course_id ON conversations(course_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for courses updated_at
CREATE TRIGGER update_courses_updated_at 
  BEFORE UPDATE ON courses 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();