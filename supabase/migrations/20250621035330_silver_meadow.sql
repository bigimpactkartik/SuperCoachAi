/*
  # Complete SuperCoach AI Database Schema and Initial Data

  1. New Tables
    - `coaches` - AI coaches with personality types and assignments
    - `courses` - Training courses with versioning support
    - `course_versions` - Version tracking for courses
    - `modules` - Course modules containing tasks
    - `tasks` - Individual learning tasks within modules
    - `students` - Student profiles and enrollment data
    - `enrollments` - Student course enrollments with version tracking
    - `task_assignments` - Individual task assignments to students
    - `promises` - Student commitments and deadlines
    - `conversations` - Chat conversations between students and coaches

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users

  3. Initial Data
    - Sample coaches, courses, students, and conversations
    - Proper versioning relationships
*/

-- Create custom types
CREATE TYPE task_status AS ENUM ('pending', 'completed');

-- Create coaches table
CREATE TABLE IF NOT EXISTS coaches (
  id integer PRIMARY KEY DEFAULT nextval('coaches_id_seq'::regclass),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text
);

-- Create sequence for coaches if it doesn't exist
DO $$ BEGIN
  CREATE SEQUENCE IF NOT EXISTS coaches_id_seq;
EXCEPTION WHEN duplicate_table THEN
  -- Sequence already exists, do nothing
END $$;

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id integer PRIMARY KEY DEFAULT nextval('courses_id_seq'::regclass),
  title text NOT NULL,
  coach_id integer REFERENCES coaches(id) ON DELETE CASCADE
);

-- Create sequence for courses if it doesn't exist
DO $$ BEGIN
  CREATE SEQUENCE IF NOT EXISTS courses_id_seq;
EXCEPTION WHEN duplicate_table THEN
  -- Sequence already exists, do nothing
END $$;

-- Create course_versions table
CREATE TABLE IF NOT EXISTS course_versions (
  id integer PRIMARY KEY DEFAULT nextval('course_versions_id_seq'::regclass),
  course_id integer REFERENCES courses(id) ON DELETE CASCADE,
  version_number integer NOT NULL,
  updated_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Create sequence for course_versions if it doesn't exist
DO $$ BEGIN
  CREATE SEQUENCE IF NOT EXISTS course_versions_id_seq;
EXCEPTION WHEN duplicate_table THEN
  -- Sequence already exists, do nothing
END $$;

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
  id integer PRIMARY KEY DEFAULT nextval('modules_id_seq'::regclass),
  course_id integer REFERENCES courses(id),
  title text
);

-- Create sequence for modules if it doesn't exist
DO $$ BEGIN
  CREATE SEQUENCE IF NOT EXISTS modules_id_seq;
EXCEPTION WHEN duplicate_table THEN
  -- Sequence already exists, do nothing
END $$;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id bigint PRIMARY KEY,
  course_id integer NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  deadline date NOT NULL,
  module_id integer NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  timetocomplete bigint
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id integer PRIMARY KEY DEFAULT nextval('students_id_seq'::regclass),
  name text NOT NULL,
  telegram_id text UNIQUE,
  phone_number text,
  about text,
  email text
);

-- Create sequence for students if it doesn't exist
DO $$ BEGIN
  CREATE SEQUENCE IF NOT EXISTS students_id_seq;
EXCEPTION WHEN duplicate_table THEN
  -- Sequence already exists, do nothing
END $$;

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id integer PRIMARY KEY DEFAULT nextval('enrollments_id_seq'::regclass),
  student_id integer REFERENCES students(id) ON DELETE CASCADE,
  course_id integer REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, course_id)
);

-- Create sequence for enrollments if it doesn't exist
DO $$ BEGIN
  CREATE SEQUENCE IF NOT EXISTS enrollments_id_seq;
EXCEPTION WHEN duplicate_table THEN
  -- Sequence already exists, do nothing
END $$;

-- Create task_assignments table
CREATE TABLE IF NOT EXISTS task_assignments (
  id integer PRIMARY KEY DEFAULT nextval('task_assignments_id_seq'::regclass),
  student_id integer REFERENCES students(id) ON DELETE CASCADE,
  task_id integer REFERENCES tasks(id) ON DELETE CASCADE,
  status task_status DEFAULT 'pending',
  updated_at timestamptz,
  due_date date NOT NULL,
  UNIQUE(student_id, task_id)
);

-- Create sequence for task_assignments if it doesn't exist
DO $$ BEGIN
  CREATE SEQUENCE IF NOT EXISTS task_assignments_id_seq;
EXCEPTION WHEN duplicate_table THEN
  -- Sequence already exists, do nothing
END $$;

-- Create promises table
CREATE TABLE IF NOT EXISTS promises (
  id integer PRIMARY KEY DEFAULT nextval('promises_id_seq'::regclass),
  student_id integer REFERENCES students(id),
  task_id integer REFERENCES tasks(id),
  promise_datetime timestamp,
  due_date date,
  checked boolean DEFAULT false,
  created_at timestamp DEFAULT now()
);

-- Create sequence for promises if it doesn't exist
DO $$ BEGIN
  CREATE SEQUENCE IF NOT EXISTS promises_id_seq;
EXCEPTION WHEN duplicate_table THEN
  -- Sequence already exists, do nothing
END $$;

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id bigint PRIMARY KEY DEFAULT nextval('conversations_id_seq'::regclass),
  student_id bigint REFERENCES students(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role = ANY (ARRAY['user'::text, 'agent'::text])),
  message text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Create sequence for conversations if it doesn't exist
DO $$ BEGIN
  CREATE SEQUENCE IF NOT EXISTS conversations_id_seq;
EXCEPTION WHEN duplicate_table THEN
  -- Sequence already exists, do nothing
END $$;

-- Enable Row Level Security on all tables
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE promises ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (allowing all operations for now)
CREATE POLICY "Allow all operations for authenticated users" ON coaches FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON courses FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON course_versions FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON modules FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON tasks FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON students FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON enrollments FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON task_assignments FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON promises FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON conversations FOR ALL TO authenticated USING (true);

-- Insert sample coaches
INSERT INTO coaches (name, email, phone) VALUES
('Coach Maya', 'maya@supercoach.ai', '+1-555-0101'),
('Coach Alexander', 'alexander@supercoach.ai', '+1-555-0102'),
('Coach Zara', 'zara@supercoach.ai', '+1-555-0103'),
('Coach Sam', 'sam@supercoach.ai', '+1-555-0104');

-- Insert sample courses
INSERT INTO courses (title, coach_id) VALUES
('Digital Marketing Mastery', 1),
('Leadership Excellence', 2),
('Advanced Analytics', 1);

-- Insert course versions
INSERT INTO course_versions (course_id, version_number, is_active) VALUES
(1, 1, false), -- Digital Marketing v1 (archived)
(1, 2, true),  -- Digital Marketing v2 (current)
(1, 3, false), -- Digital Marketing v3 (draft)
(2, 1, true),  -- Leadership v1 (current)
(3, 1, true);  -- Analytics v1 (current)

-- Insert sample modules
INSERT INTO modules (course_id, title) VALUES
(1, 'Introduction to Digital Marketing'),
(1, 'Social Media Marketing'),
(1, 'Advanced Analytics'),
(2, 'Leadership Fundamentals'),
(2, 'Team Management'),
(3, 'Data Analysis Basics');

-- Insert sample tasks
INSERT INTO tasks (id, course_id, title, deadline, module_id, timetocomplete) VALUES
(1, 1, 'What is Digital Marketing?', '2024-03-15', 1, 30),
(2, 1, 'Digital Marketing Channels', '2024-03-16', 1, 45),
(3, 1, 'Quiz: Marketing Basics', '2024-03-17', 1, 15),
(4, 1, 'Facebook Marketing Strategy', '2024-03-20', 2, 60),
(5, 1, 'Instagram for Business', '2024-03-21', 2, 45),
(6, 1, 'Create a Social Media Plan', '2024-03-25', 2, 120),
(7, 2, 'What Makes a Great Leader?', '2024-03-18', 4, 40),
(8, 2, 'Leadership Styles', '2024-03-19', 4, 30),
(9, 2, 'Team Building Strategies', '2024-03-22', 5, 50),
(10, 2, 'Conflict Resolution', '2024-03-26', 5, 90),
(11, 3, 'Introduction to Analytics', '2024-03-20', 6, 45),
(12, 3, 'Google Analytics Setup', '2024-03-23', 6, 60);

-- Insert sample students
INSERT INTO students (name, email, telegram_id, phone_number, about) VALUES
('Sarah Johnson', 'sarah.johnson@email.com', '@sarah_j', '+1-555-1001', 'Marketing professional looking to advance skills'),
('Mike Chen', 'mike.chen@email.com', '@mike_c', '+1-555-1002', 'Small business owner interested in digital marketing'),
('Emma Rodriguez', 'emma.rodriguez@email.com', '@emma_r', '+1-555-1003', 'Team lead seeking leadership development'),
('David Kim', 'david.kim@email.com', '@david_k', '+1-555-1004', 'Recent graduate exploring career options'),
('Lisa Wang', 'lisa.wang@email.com', '@lisa_w', '+1-555-1005', 'Experienced manager looking to improve leadership skills'),
('Alex Thompson', 'alex.thompson@email.com', '@alex_t', '+1-555-1006', 'Freelancer wanting to expand marketing knowledge');

-- Insert sample enrollments
INSERT INTO enrollments (student_id, course_id, enrolled_at) VALUES
(1, 1, '2024-02-01T10:00:00Z'), -- Sarah in Digital Marketing
(2, 1, '2024-01-25T10:30:00Z'), -- Mike in Digital Marketing
(3, 2, '2024-02-05T14:15:00Z'), -- Emma in Leadership
(4, 1, '2024-02-28T16:45:00Z'), -- David in Digital Marketing
(4, 2, '2024-02-28T16:45:00Z'), -- David in Leadership
(5, 2, '2024-01-10T12:00:00Z'), -- Lisa in Leadership
(6, 1, '2024-02-10T09:30:00Z'); -- Alex in Digital Marketing

-- Insert sample task assignments
INSERT INTO task_assignments (student_id, task_id, status, due_date, updated_at) VALUES
(1, 1, 'completed', '2024-03-15', '2024-02-01T10:00:00Z'),
(1, 2, 'completed', '2024-03-16', '2024-02-01T11:00:00Z'),
(1, 3, 'completed', '2024-03-17', '2024-02-01T12:00:00Z'),
(1, 4, 'pending', '2024-03-20', '2024-02-01T13:00:00Z'),
(2, 1, 'completed', '2024-03-15', '2024-01-28T14:00:00Z'),
(2, 2, 'pending', '2024-03-16', '2024-01-28T15:00:00Z'),
(3, 7, 'completed', '2024-03-18', '2024-02-10T09:00:00Z'),
(3, 8, 'completed', '2024-03-19', '2024-02-10T10:00:00Z'),
(3, 9, 'completed', '2024-03-22', '2024-02-12T11:00:00Z'),
(3, 10, 'pending', '2024-03-26', '2024-02-12T12:00:00Z'),
(5, 7, 'completed', '2024-03-18', '2024-01-15T09:00:00Z'),
(5, 8, 'completed', '2024-03-19', '2024-01-15T10:00:00Z'),
(5, 9, 'completed', '2024-03-22', '2024-01-18T11:00:00Z'),
(5, 10, 'completed', '2024-03-26', '2024-01-20T14:00:00Z'),
(6, 1, 'completed', '2024-03-15', '2024-02-15T10:00:00Z'),
(6, 2, 'pending', '2024-03-16', '2024-02-15T11:00:00Z');

-- Insert sample promises
INSERT INTO promises (student_id, task_id, promise_datetime, due_date, checked) VALUES
(1, 4, '2024-03-19T10:00:00Z', '2024-03-20', false),
(2, 2, '2024-03-15T14:00:00Z', '2024-03-16', false),
(3, 10, '2024-03-25T09:00:00Z', '2024-03-26', false),
(6, 2, '2024-03-15T16:00:00Z', '2024-03-16', false);

-- Insert sample conversations
INSERT INTO conversations (student_id, role, message, timestamp) VALUES
(1, 'user', 'Hi Coach Maya! I''m having trouble understanding the Facebook advertising module. Could you help me?', '2024-02-25T10:00:00Z'),
(1, 'agent', 'Hi Sarah! I''d be happy to help you with Facebook advertising. What specific part are you finding challenging? Is it the audience targeting or the ad creation process?', '2024-02-25T10:15:00Z'),
(1, 'user', 'I''m confused about how to set up custom audiences. The interface seems different from what''s shown in the video.', '2024-02-25T10:30:00Z'),
(1, 'agent', 'That''s a great question! Facebook does update their interface regularly. Let me walk you through the current process step by step.', '2024-02-25T10:45:00Z'),
(3, 'user', 'Coach Alexander, I''ve completed the team building module and I''m really excited to apply these concepts in my workplace!', '2024-02-24T14:00:00Z'),
(3, 'agent', 'Excellent work, Emma! Your enthusiasm is wonderful to see. How do you plan to implement the team building strategies we discussed?', '2024-02-24T14:30:00Z'),
(3, 'user', 'I''m thinking of starting with the trust-building exercises during our weekly team meetings. Do you think that''s a good approach?', '2024-02-24T15:00:00Z'),
(3, 'agent', 'That''s a strategic approach! Starting with trust-building is foundational. Remember to be consistent and patient - trust develops over time.', '2024-02-24T15:15:00Z'),
(2, 'agent', 'Hi Mike! I noticed you haven''t been active in the course for a few days. Is everything okay? I''m here to help if you''re facing any challenges.', '2024-02-23T09:00:00Z'),
(2, 'user', 'Hi Coach Maya, sorry for the delay. I''ve been really busy at work and finding it hard to keep up with the course material.', '2024-02-26T18:30:00Z'),
(2, 'agent', 'I completely understand! Work-life balance can be challenging. Would it help if we created a more flexible study schedule that works with your work commitments?', '2024-02-26T19:00:00Z');