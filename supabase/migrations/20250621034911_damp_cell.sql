/*
  # Seed Initial Data for SuperCoach AI Dashboard

  1. Insert sample super coaches
  2. Insert sample courses with versioning
  3. Insert sample students
  4. Insert sample conversations
*/

-- Insert Super Coaches
INSERT INTO super_coaches (name, personality_type, description, avatar, courses_assigned, created_at, is_active) VALUES
('Coach Maya', 'friendly', 'A warm and encouraging coach who specializes in digital marketing. Maya helps students overcome challenges with patience and positivity.', '', '[]', '2024-01-10T08:00:00Z', true),
('Coach Alexander', 'professional', 'A structured and results-oriented coach focused on leadership development. Alexander provides clear guidance and actionable feedback.', '', '[]', '2024-01-15T10:00:00Z', true),
('Coach Zara', 'motivational', 'An energetic and inspiring coach who helps students push through barriers and achieve their goals with enthusiasm.', '', '[]', '2024-02-01T12:00:00Z', true),
('Coach Sam', 'supportive', 'A patient and understanding coach who provides emotional support and helps students build confidence in their learning journey.', '', '[]', '2024-02-10T14:30:00Z', false);

-- Insert Courses (with versioning)
-- Digital Marketing v1 (archived)
INSERT INTO courses (title, description, status, version, modules, created_at, updated_at, enrolled_students, completion_rate, super_coach_id, base_id, is_current_version) VALUES
('Digital Marketing Mastery', 'Comprehensive course covering all aspects of digital marketing from social media to SEO and paid advertising.', 'archived', 1, '[
  {
    "id": 1,
    "title": "Introduction to Digital Marketing",
    "description": "Learn the fundamentals of digital marketing",
    "order": 1,
    "tasks": [
      {
        "id": 1,
        "title": "What is Digital Marketing?",
        "description": "Overview of digital marketing concepts",
        "type": "video",
        "order": 1,
        "estimatedTime": 30
      },
      {
        "id": 2,
        "title": "Digital Marketing Channels",
        "description": "Understanding different marketing channels",
        "type": "reading",
        "order": 2,
        "estimatedTime": 45
      },
      {
        "id": 3,
        "title": "Quiz: Marketing Basics",
        "description": "Test your understanding of basic concepts",
        "type": "quiz",
        "order": 3,
        "estimatedTime": 15
      }
    ]
  }
]', '2024-01-01T10:00:00Z', '2024-01-15T10:00:00Z', 15, 85, 1, 1, false);

-- Digital Marketing v2 (current live version)
INSERT INTO courses (title, description, status, version, modules, created_at, updated_at, enrolled_students, completion_rate, super_coach_id, base_id, is_current_version) VALUES
('Digital Marketing Mastery', 'Comprehensive course covering all aspects of digital marketing from social media to SEO and paid advertising.', 'live', 2, '[
  {
    "id": 1,
    "title": "Introduction to Digital Marketing",
    "description": "Learn the fundamentals of digital marketing",
    "order": 1,
    "tasks": [
      {
        "id": 1,
        "title": "What is Digital Marketing?",
        "description": "Overview of digital marketing concepts",
        "type": "video",
        "order": 1,
        "estimatedTime": 30
      },
      {
        "id": 2,
        "title": "Digital Marketing Channels",
        "description": "Understanding different marketing channels",
        "type": "reading",
        "order": 2,
        "estimatedTime": 45
      },
      {
        "id": 3,
        "title": "Quiz: Marketing Basics",
        "description": "Test your understanding of basic concepts",
        "type": "quiz",
        "order": 3,
        "estimatedTime": 15
      }
    ]
  },
  {
    "id": 2,
    "title": "Social Media Marketing",
    "description": "Master social media platforms for marketing",
    "order": 2,
    "tasks": [
      {
        "id": 4,
        "title": "Facebook Marketing Strategy",
        "description": "Learn to create effective Facebook campaigns",
        "type": "video",
        "order": 1,
        "estimatedTime": 60
      },
      {
        "id": 5,
        "title": "Instagram for Business",
        "description": "Leverage Instagram for brand growth",
        "type": "video",
        "order": 2,
        "estimatedTime": 45
      },
      {
        "id": 6,
        "title": "Create a Social Media Plan",
        "description": "Develop your own social media strategy",
        "type": "assignment",
        "order": 3,
        "estimatedTime": 120
      }
    ]
  }
]', '2024-01-15T10:00:00Z', '2024-02-01T14:30:00Z', 45, 68, 1, 1, true);

-- Leadership Excellence v1 (current live version)
INSERT INTO courses (title, description, status, version, modules, created_at, updated_at, enrolled_students, completion_rate, super_coach_id, base_id, is_current_version) VALUES
('Leadership Excellence', 'Develop essential leadership skills and learn to inspire and manage teams effectively.', 'live', 1, '[
  {
    "id": 3,
    "title": "Leadership Fundamentals",
    "description": "Core principles of effective leadership",
    "order": 1,
    "tasks": [
      {
        "id": 7,
        "title": "What Makes a Great Leader?",
        "description": "Explore leadership qualities and traits",
        "type": "video",
        "order": 1,
        "estimatedTime": 40
      },
      {
        "id": 8,
        "title": "Leadership Styles",
        "description": "Understanding different leadership approaches",
        "type": "reading",
        "order": 2,
        "estimatedTime": 30
      }
    ]
  },
  {
    "id": 4,
    "title": "Team Management",
    "description": "Building and managing high-performing teams",
    "order": 2,
    "tasks": [
      {
        "id": 9,
        "title": "Team Building Strategies",
        "description": "Learn effective team building techniques",
        "type": "video",
        "order": 1,
        "estimatedTime": 50
      },
      {
        "id": 10,
        "title": "Conflict Resolution",
        "description": "Handle team conflicts professionally",
        "type": "assignment",
        "order": 2,
        "estimatedTime": 90
      }
    ]
  }
]', '2024-02-01T09:00:00Z', '2024-02-15T16:45:00Z', 32, 85, 2, 3, true);

-- Digital Marketing v3 (draft)
INSERT INTO courses (title, description, status, version, modules, created_at, updated_at, enrolled_students, completion_rate, super_coach_id, base_id, is_current_version) VALUES
('Digital Marketing Mastery', 'Comprehensive course covering all aspects of digital marketing from social media to SEO and paid advertising.', 'draft', 3, '[
  {
    "id": 1,
    "title": "Introduction to Digital Marketing",
    "description": "Learn the fundamentals of digital marketing",
    "order": 1,
    "tasks": [
      {
        "id": 1,
        "title": "What is Digital Marketing?",
        "description": "Overview of digital marketing concepts",
        "type": "video",
        "order": 1,
        "estimatedTime": 30
      },
      {
        "id": 2,
        "title": "Digital Marketing Channels",
        "description": "Understanding different marketing channels",
        "type": "reading",
        "order": 2,
        "estimatedTime": 45
      },
      {
        "id": 3,
        "title": "Quiz: Marketing Basics",
        "description": "Test your understanding of basic concepts",
        "type": "quiz",
        "order": 3,
        "estimatedTime": 15
      }
    ]
  },
  {
    "id": 2,
    "title": "Social Media Marketing",
    "description": "Master social media platforms for marketing",
    "order": 2,
    "tasks": [
      {
        "id": 4,
        "title": "Facebook Marketing Strategy",
        "description": "Learn to create effective Facebook campaigns",
        "type": "video",
        "order": 1,
        "estimatedTime": 60
      },
      {
        "id": 5,
        "title": "Instagram for Business",
        "description": "Leverage Instagram for brand growth",
        "type": "video",
        "order": 2,
        "estimatedTime": 45
      },
      {
        "id": 6,
        "title": "Create a Social Media Plan",
        "description": "Develop your own social media strategy",
        "type": "assignment",
        "order": 3,
        "estimatedTime": 120
      }
    ]
  },
  {
    "id": 11,
    "title": "Advanced Analytics",
    "description": "Deep dive into marketing analytics and data interpretation",
    "order": 3,
    "tasks": [
      {
        "id": 11,
        "title": "Google Analytics Setup",
        "description": "Learn to set up and configure Google Analytics",
        "type": "video",
        "order": 1,
        "estimatedTime": 45
      }
    ]
  }
]', '2024-02-20T11:00:00Z', '2024-02-25T10:15:00Z', 0, 0, null, 1, false);

-- Update super coaches with course assignments
UPDATE super_coaches SET courses_assigned = '[1, 2, 4]' WHERE id = 1; -- Maya assigned to Digital Marketing versions
UPDATE super_coaches SET courses_assigned = '[3]' WHERE id = 2; -- Alexander assigned to Leadership

-- Insert Students
INSERT INTO students (name, email, avatar, status, enrolled_courses, progress, joined_at, last_activity) VALUES
('Sarah Johnson', 'sarah.johnson@email.com', null, 'in-progress', '[
  {
    "courseId": 2,
    "courseVersion": 2,
    "enrolledAt": "2024-02-01T10:00:00Z",
    "baseId": 1
  }
]', '[
  {
    "courseId": 2,
    "courseVersion": 2,
    "moduleId": 1,
    "taskId": 1,
    "status": "completed",
    "completedAt": "2024-02-01T10:00:00Z",
    "timeSpent": 35
  },
  {
    "courseId": 2,
    "courseVersion": 2,
    "moduleId": 1,
    "taskId": 2,
    "status": "completed",
    "completedAt": "2024-02-01T11:00:00Z",
    "timeSpent": 50
  },
  {
    "courseId": 2,
    "courseVersion": 2,
    "moduleId": 1,
    "taskId": 3,
    "status": "completed",
    "completedAt": "2024-02-01T12:00:00Z",
    "timeSpent": 20
  },
  {
    "courseId": 2,
    "courseVersion": 2,
    "moduleId": 2,
    "taskId": 4,
    "status": "in-progress",
    "timeSpent": 30
  }
]', '2024-01-20T08:00:00Z', '2 hours ago'),

('Mike Chen', 'mike.chen@email.com', null, 'stuck', '[
  {
    "courseId": 1,
    "courseVersion": 1,
    "enrolledAt": "2024-01-25T10:30:00Z",
    "baseId": 1
  }
]', '[
  {
    "courseId": 1,
    "courseVersion": 1,
    "moduleId": 1,
    "taskId": 1,
    "status": "completed",
    "completedAt": "2024-01-28T14:00:00Z",
    "timeSpent": 40
  },
  {
    "courseId": 1,
    "courseVersion": 1,
    "moduleId": 1,
    "taskId": 2,
    "status": "in-progress",
    "timeSpent": 25
  }
]', '2024-01-25T10:30:00Z', '3 days ago'),

('Emma Rodriguez', 'emma.rodriguez@email.com', null, 'in-progress', '[
  {
    "courseId": 3,
    "courseVersion": 1,
    "enrolledAt": "2024-02-05T14:15:00Z",
    "baseId": 3
  }
]', '[
  {
    "courseId": 3,
    "courseVersion": 1,
    "moduleId": 3,
    "taskId": 7,
    "status": "completed",
    "completedAt": "2024-02-10T09:00:00Z",
    "timeSpent": 45
  },
  {
    "courseId": 3,
    "courseVersion": 1,
    "moduleId": 3,
    "taskId": 8,
    "status": "completed",
    "completedAt": "2024-02-10T10:00:00Z",
    "timeSpent": 35
  },
  {
    "courseId": 3,
    "courseVersion": 1,
    "moduleId": 4,
    "taskId": 9,
    "status": "completed",
    "completedAt": "2024-02-12T11:00:00Z",
    "timeSpent": 55
  },
  {
    "courseId": 3,
    "courseVersion": 1,
    "moduleId": 4,
    "taskId": 10,
    "status": "in-progress",
    "timeSpent": 60
  }
]', '2024-02-05T14:15:00Z', '1 hour ago'),

('David Kim', 'david.kim@email.com', null, 'new', '[
  {
    "courseId": 2,
    "courseVersion": 2,
    "enrolledAt": "2024-02-28T16:45:00Z",
    "baseId": 1
  },
  {
    "courseId": 3,
    "courseVersion": 1,
    "enrolledAt": "2024-02-28T16:45:00Z",
    "baseId": 3
  }
]', '[]', '2024-02-28T16:45:00Z', '5 minutes ago'),

('Lisa Wang', 'lisa.wang@email.com', null, 'completed', '[
  {
    "courseId": 3,
    "courseVersion": 1,
    "enrolledAt": "2024-01-10T12:00:00Z",
    "baseId": 3
  }
]', '[
  {
    "courseId": 3,
    "courseVersion": 1,
    "moduleId": 3,
    "taskId": 7,
    "status": "completed",
    "completedAt": "2024-01-15T09:00:00Z",
    "timeSpent": 45
  },
  {
    "courseId": 3,
    "courseVersion": 1,
    "moduleId": 3,
    "taskId": 8,
    "status": "completed",
    "completedAt": "2024-01-15T10:00:00Z",
    "timeSpent": 35
  },
  {
    "courseId": 3,
    "courseVersion": 1,
    "moduleId": 4,
    "taskId": 9,
    "status": "completed",
    "completedAt": "2024-01-18T11:00:00Z",
    "timeSpent": 55
  },
  {
    "courseId": 3,
    "courseVersion": 1,
    "moduleId": 4,
    "taskId": 10,
    "status": "completed",
    "completedAt": "2024-01-20T14:00:00Z",
    "timeSpent": 95
  }
]', '2024-01-10T12:00:00Z', '1 week ago'),

('Alex Thompson', 'alex.thompson@email.com', null, 'stuck', '[
  {
    "courseId": 1,
    "courseVersion": 1,
    "enrolledAt": "2024-02-10T09:30:00Z",
    "baseId": 1
  }
]', '[
  {
    "courseId": 1,
    "courseVersion": 1,
    "moduleId": 1,
    "taskId": 1,
    "status": "completed",
    "completedAt": "2024-02-15T10:00:00Z",
    "timeSpent": 35
  },
  {
    "courseId": 1,
    "courseVersion": 1,
    "moduleId": 1,
    "taskId": 2,
    "status": "in-progress",
    "timeSpent": 15
  }
]', '2024-02-10T09:30:00Z', '4 days ago');

-- Insert Conversations
INSERT INTO conversations (student_id, super_coach_id, course_id, course_version, messages, started_at, last_message_at) VALUES
(1, 1, 2, 2, '[
  {
    "id": 1,
    "senderId": 1,
    "senderType": "student",
    "content": "Hi Coach Maya! I''m having trouble understanding the Facebook advertising module. Could you help me?",
    "timestamp": "2024-02-25T10:00:00Z",
    "type": "text"
  },
  {
    "id": 2,
    "senderId": 1,
    "senderType": "supercoach",
    "content": "Hi Sarah! I''d be happy to help you with Facebook advertising. What specific part are you finding challenging?",
    "timestamp": "2024-02-25T10:15:00Z",
    "type": "text"
  }
]', '2024-02-25T10:00:00Z', '2024-02-25T11:00:00Z'),

(3, 2, 3, 1, '[
  {
    "id": 6,
    "senderId": 3,
    "senderType": "student",
    "content": "Coach Alexander, I''ve completed the team building module and I''m really excited to apply these concepts!",
    "timestamp": "2024-02-24T14:00:00Z",
    "type": "text"
  },
  {
    "id": 7,
    "senderId": 2,
    "senderType": "supercoach",
    "content": "Excellent work, Emma! Your enthusiasm is wonderful to see. How do you plan to implement the strategies?",
    "timestamp": "2024-02-24T14:30:00Z",
    "type": "text"
  }
]', '2024-02-24T14:00:00Z', '2024-02-24T15:15:00Z'),

(2, 1, 1, 1, '[
  {
    "id": 10,
    "senderId": 1,
    "senderType": "supercoach",
    "content": "Hi Mike! I noticed you haven''t been active in the course for a few days. Is everything okay?",
    "timestamp": "2024-02-23T09:00:00Z",
    "type": "text"
  },
  {
    "id": 11,
    "senderId": 2,
    "senderType": "student",
    "content": "Hi Coach Maya, sorry for the delay. I''ve been really busy at work.",
    "timestamp": "2024-02-26T18:30:00Z",
    "type": "text"
  }
]', '2024-02-23T09:00:00Z', '2024-02-26T19:00:00Z');