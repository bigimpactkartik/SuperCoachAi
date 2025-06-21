import { Course, Student, SuperCoach, Conversation, Module, Task, StudentProgress, Message, StudentCourseEnrollment } from '../types';

// Mock Modules and Tasks
const mockModules: Module[] = [
  {
    id: 1,
    title: "Introduction to Digital Marketing",
    description: "Learn the fundamentals of digital marketing",
    order: 1,
    tasks: [
      {
        id: 1,
        title: "What is Digital Marketing?",
        description: "Overview of digital marketing concepts",
        type: "video",
        order: 1,
        estimatedTime: 30
      },
      {
        id: 2,
        title: "Digital Marketing Channels",
        description: "Understanding different marketing channels",
        type: "reading",
        order: 2,
        estimatedTime: 45
      },
      {
        id: 3,
        title: "Quiz: Marketing Basics",
        description: "Test your understanding of basic concepts",
        type: "quiz",
        order: 3,
        estimatedTime: 15
      }
    ]
  },
  {
    id: 2,
    title: "Social Media Marketing",
    description: "Master social media platforms for marketing",
    order: 2,
    tasks: [
      {
        id: 4,
        title: "Facebook Marketing Strategy",
        description: "Learn to create effective Facebook campaigns",
        type: "video",
        order: 1,
        estimatedTime: 60
      },
      {
        id: 5,
        title: "Instagram for Business",
        description: "Leverage Instagram for brand growth",
        type: "video",
        order: 2,
        estimatedTime: 45
      },
      {
        id: 6,
        title: "Create a Social Media Plan",
        description: "Develop your own social media strategy",
        type: "assignment",
        order: 3,
        estimatedTime: 120
      }
    ]
  }
];

const mockLeadershipModules: Module[] = [
  {
    id: 3,
    title: "Leadership Fundamentals",
    description: "Core principles of effective leadership",
    order: 1,
    tasks: [
      {
        id: 7,
        title: "What Makes a Great Leader?",
        description: "Explore leadership qualities and traits",
        type: "video",
        order: 1,
        estimatedTime: 40
      },
      {
        id: 8,
        title: "Leadership Styles",
        description: "Understanding different leadership approaches",
        type: "reading",
        order: 2,
        estimatedTime: 30
      }
    ]
  },
  {
    id: 4,
    title: "Team Management",
    description: "Building and managing high-performing teams",
    order: 2,
    tasks: [
      {
        id: 9,
        title: "Team Building Strategies",
        description: "Learn effective team building techniques",
        type: "video",
        order: 1,
        estimatedTime: 50
      },
      {
        id: 10,
        title: "Conflict Resolution",
        description: "Handle team conflicts professionally",
        type: "assignment",
        order: 2,
        estimatedTime: 90
      }
    ]
  }
];

// Mock Courses with versioning
export const mockCourses: Course[] = [
  {
    id: 1,
    title: "Digital Marketing Mastery",
    description: "Comprehensive course covering all aspects of digital marketing from social media to SEO and paid advertising.",
    status: "live",
    version: 2,
    modules: mockModules,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-02-01T14:30:00Z",
    enrolledStudents: 45,
    completionRate: 68,
    superCoachId: 1,
    baseId: 1,
    isCurrentVersion: true
  },
  {
    id: 2,
    title: "Leadership Excellence",
    description: "Develop essential leadership skills and learn to inspire and manage teams effectively.",
    status: "live",
    version: 1,
    modules: mockLeadershipModules,
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-15T16:45:00Z",
    enrolledStudents: 32,
    completionRate: 85,
    superCoachId: 2,
    baseId: 2,
    isCurrentVersion: true
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description: "Comprehensive course covering all aspects of digital marketing from social media to SEO and paid advertising.",
    status: "draft",
    version: 3,
    modules: [...mockModules, {
      id: 11,
      title: "Advanced Analytics",
      description: "Deep dive into marketing analytics and data interpretation",
      order: 3,
      tasks: [
        {
          id: 11,
          title: "Google Analytics Setup",
          description: "Learn to set up and configure Google Analytics",
          type: "video",
          order: 1,
          estimatedTime: 45
        }
      ]
    }],
    createdAt: "2024-02-20T11:00:00Z",
    updatedAt: "2024-02-25T10:15:00Z",
    enrolledStudents: 0,
    completionRate: 0,
    superCoachId: null,
    baseId: 1,
    isCurrentVersion: false
  },
  // Previous version (v1) of Digital Marketing course
  {
    id: 4,
    title: "Digital Marketing Mastery",
    description: "Comprehensive course covering all aspects of digital marketing from social media to SEO and paid advertising.",
    status: "archived",
    version: 1,
    modules: mockModules.slice(0, 1), // Only first module in v1
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    enrolledStudents: 15,
    completionRate: 85,
    superCoachId: 1,
    baseId: 1,
    isCurrentVersion: false
  }
];

// Mock Student Enrollments with versioning
const mockStudentEnrollments: StudentCourseEnrollment[] = [
  // Sarah enrolled in v2 of Digital Marketing
  { courseId: 1, courseVersion: 2, enrolledAt: "2024-02-01T10:00:00Z", baseId: 1 },
  
  // Mike enrolled in v1 of Digital Marketing (earlier enrollment)
  { courseId: 4, courseVersion: 1, enrolledAt: "2024-01-25T10:30:00Z", baseId: 1 },
  
  // Emma enrolled in v1 of Leadership
  { courseId: 2, courseVersion: 1, enrolledAt: "2024-02-05T14:15:00Z", baseId: 2 },
  
  // David enrolled in both courses (latest versions)
  { courseId: 1, courseVersion: 2, enrolledAt: "2024-02-28T16:45:00Z", baseId: 1 },
  { courseId: 2, courseVersion: 1, enrolledAt: "2024-02-28T16:45:00Z", baseId: 2 },
  
  // Lisa completed v1 of Leadership
  { courseId: 2, courseVersion: 1, enrolledAt: "2024-01-10T12:00:00Z", baseId: 2 },
  
  // Alex enrolled in v1 of Digital Marketing
  { courseId: 4, courseVersion: 1, enrolledAt: "2024-02-10T09:30:00Z", baseId: 1 }
];

// Mock Student Progress with versioning
const mockStudentProgress: StudentProgress[] = [
  // Sarah's progress (v2)
  { courseId: 1, courseVersion: 2, moduleId: 1, taskId: 1, status: "completed", completedAt: "2024-02-01T10:00:00Z", timeSpent: 35 },
  { courseId: 1, courseVersion: 2, moduleId: 1, taskId: 2, status: "completed", completedAt: "2024-02-01T11:00:00Z", timeSpent: 50 },
  { courseId: 1, courseVersion: 2, moduleId: 1, taskId: 3, status: "completed", completedAt: "2024-02-01T12:00:00Z", timeSpent: 20 },
  { courseId: 1, courseVersion: 2, moduleId: 2, taskId: 4, status: "in-progress", timeSpent: 30 },
  { courseId: 1, courseVersion: 2, moduleId: 2, taskId: 5, status: "not-started", timeSpent: 0 },
  { courseId: 1, courseVersion: 2, moduleId: 2, taskId: 6, status: "not-started", timeSpent: 0 },
  
  // Mike's progress (v1 - only has first module)
  { courseId: 4, courseVersion: 1, moduleId: 1, taskId: 1, status: "completed", completedAt: "2024-01-28T14:00:00Z", timeSpent: 40 },
  { courseId: 4, courseVersion: 1, moduleId: 1, taskId: 2, status: "in-progress", timeSpent: 25 },
  { courseId: 4, courseVersion: 1, moduleId: 1, taskId: 3, status: "not-started", timeSpent: 0 },
  
  // Emma's progress (Leadership v1)
  { courseId: 2, courseVersion: 1, moduleId: 3, taskId: 7, status: "completed", completedAt: "2024-02-10T09:00:00Z", timeSpent: 45 },
  { courseId: 2, courseVersion: 1, moduleId: 3, taskId: 8, status: "completed", completedAt: "2024-02-10T10:00:00Z", timeSpent: 35 },
  { courseId: 2, courseVersion: 1, moduleId: 4, taskId: 9, status: "completed", completedAt: "2024-02-12T11:00:00Z", timeSpent: 55 },
  { courseId: 2, courseVersion: 1, moduleId: 4, taskId: 10, status: "in-progress", timeSpent: 60 },
  
  // Lisa's completed progress (Leadership v1)
  { courseId: 2, courseVersion: 1, moduleId: 3, taskId: 7, status: "completed", completedAt: "2024-01-15T09:00:00Z", timeSpent: 45 },
  { courseId: 2, courseVersion: 1, moduleId: 3, taskId: 8, status: "completed", completedAt: "2024-01-15T10:00:00Z", timeSpent: 35 },
  { courseId: 2, courseVersion: 1, moduleId: 4, taskId: 9, status: "completed", completedAt: "2024-01-18T11:00:00Z", timeSpent: 55 },
  { courseId: 2, courseVersion: 1, moduleId: 4, taskId: 10, status: "completed", completedAt: "2024-01-20T14:00:00Z", timeSpent: 95 },
  
  // Alex's progress (v1)
  { courseId: 4, courseVersion: 1, moduleId: 1, taskId: 1, status: "completed", completedAt: "2024-02-15T10:00:00Z", timeSpent: 35 },
  { courseId: 4, courseVersion: 1, moduleId: 1, taskId: 2, status: "in-progress", timeSpent: 15 }
];

// Mock Students with versioned enrollments
export const mockStudents: Student[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    status: "in-progress",
    enrolledCourses: [mockStudentEnrollments[0]], // v2 of Digital Marketing
    progress: mockStudentProgress.filter(p => p.courseId === 1 && p.courseVersion === 2),
    joinedAt: "2024-01-20T08:00:00Z",
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    status: "stuck",
    enrolledCourses: [mockStudentEnrollments[1]], // v1 of Digital Marketing
    progress: mockStudentProgress.filter(p => p.courseId === 4 && p.courseVersion === 1),
    joinedAt: "2024-01-25T10:30:00Z",
    lastActivity: "3 days ago"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    email: "emma.rodriguez@email.com",
    status: "in-progress",
    enrolledCourses: [mockStudentEnrollments[2]], // v1 of Leadership
    progress: mockStudentProgress.filter(p => p.courseId === 2 && p.courseVersion === 1 && [7, 8, 9, 10].includes(p.taskId)),
    joinedAt: "2024-02-05T14:15:00Z",
    lastActivity: "1 hour ago"
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    status: "new",
    enrolledCourses: [mockStudentEnrollments[3], mockStudentEnrollments[4]], // Latest versions
    progress: [],
    joinedAt: "2024-02-28T16:45:00Z",
    lastActivity: "5 minutes ago"
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    status: "completed",
    enrolledCourses: [mockStudentEnrollments[5]], // v1 of Leadership
    progress: mockStudentProgress.filter(p => p.courseId === 2 && p.courseVersion === 1 && p.status === 'completed'),
    joinedAt: "2024-01-10T12:00:00Z",
    lastActivity: "1 week ago"
  },
  {
    id: 6,
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    status: "stuck",
    enrolledCourses: [mockStudentEnrollments[6]], // v1 of Digital Marketing
    progress: mockStudentProgress.filter(p => p.courseId === 4 && p.courseVersion === 1 && [1, 2].includes(p.taskId)),
    joinedAt: "2024-02-10T09:30:00Z",
    lastActivity: "4 days ago"
  }
];

// Mock SuperCoaches - simplified to match database schema
export const mockSuperCoaches: SuperCoach[] = [
  {
    id: 1,
    name: "Coach Maya",
    email: "coach.maya@supercoach.ai",
    phone: "+1 (555) 123-4567"
  },
  {
    id: 2,
    name: "Coach Alexander",
    email: "coach.alexander@supercoach.ai",
    phone: "+1 (555) 234-5678"
  },
  {
    id: 3,
    name: "Coach Zara",
    email: "coach.zara@supercoach.ai",
    phone: null
  },
  {
    id: 4,
    name: "Coach Sam",
    email: "coach.sam@supercoach.ai",
    phone: "+1 (555) 345-6789"
  }
];

// Mock Messages
const mockMessages: Message[] = [
  {
    id: 1,
    senderId: 1,
    senderType: "student",
    content: "Hi Coach Maya! I'm having trouble understanding the Facebook advertising module. Could you help me?",
    timestamp: "2024-02-25T10:00:00Z",
    type: "text"
  },
  {
    id: 2,
    senderId: 1,
    senderType: "supercoach",
    content: "Hi Sarah! I'd be happy to help you with Facebook advertising. What specific part are you finding challenging? Is it the audience targeting or the ad creation process?",
    timestamp: "2024-02-25T10:15:00Z",
    type: "text"
  },
  {
    id: 3,
    senderId: 1,
    senderType: "student",
    content: "I'm confused about how to set up custom audiences. The interface seems different from what's shown in the video.",
    timestamp: "2024-02-25T10:30:00Z",
    type: "text"
  },
  {
    id: 4,
    senderId: 1,
    senderType: "supercoach",
    content: "That's a great question! Facebook does update their interface regularly. Let me walk you through the current process step by step. First, go to your Ads Manager and click on 'Audiences' in the main menu...",
    timestamp: "2024-02-25T10:45:00Z",
    type: "text"
  },
  {
    id: 5,
    senderId: 1,
    senderType: "student",
    content: "Thank you so much! That makes it much clearer. I'll try it now and let you know how it goes.",
    timestamp: "2024-02-25T11:00:00Z",
    type: "text"
  }
];

const mockMessages2: Message[] = [
  {
    id: 6,
    senderId: 3,
    senderType: "student",
    content: "Coach Alexander, I've completed the team building module and I'm really excited to apply these concepts in my workplace!",
    timestamp: "2024-02-24T14:00:00Z",
    type: "text"
  },
  {
    id: 7,
    senderId: 2,
    senderType: "supercoach",
    content: "Excellent work, Emma! Your enthusiasm is wonderful to see. How do you plan to implement the team building strategies we discussed?",
    timestamp: "2024-02-24T14:30:00Z",
    type: "text"
  },
  {
    id: 8,
    senderId: 3,
    senderType: "student",
    content: "I'm thinking of starting with the trust-building exercises during our weekly team meetings. Do you think that's a good approach?",
    timestamp: "2024-02-24T15:00:00Z",
    type: "text"
  },
  {
    id: 9,
    senderId: 2,
    senderType: "supercoach",
    content: "That's a strategic approach! Starting with trust-building is foundational. Remember to be consistent and patient - trust develops over time. Keep me updated on your progress!",
    timestamp: "2024-02-24T15:15:00Z",
    type: "text"
  }
];

const mockMessages3: Message[] = [
  {
    id: 10,
    senderId: 2,
    senderType: "supercoach",
    content: "Hi Mike! I noticed you haven't been active in the course for a few days. Is everything okay? I'm here to help if you're facing any challenges.",
    timestamp: "2024-02-23T09:00:00Z",
    type: "text"
  },
  {
    id: 11,
    senderId: 2,
    senderType: "student",
    content: "Hi Coach Maya, sorry for the delay. I've been really busy at work and finding it hard to keep up with the course material.",
    timestamp: "2024-02-26T18:30:00Z",
    type: "text"
  },
  {
    id: 12,
    senderId: 1,
    senderType: "supercoach",
    content: "I completely understand! Work-life balance can be challenging. Would it help if we created a more flexible study schedule that works with your work commitments?",
    timestamp: "2024-02-26T19:00:00Z",
    type: "text"
  }
];

// Mock Conversations with versioning
export const mockConversations: Conversation[] = [
  {
    id: 1,
    studentId: 1,
    superCoachId: 1,
    courseId: 1,
    courseVersion: 2,
    messages: mockMessages,
    startedAt: "2024-02-25T10:00:00Z",
    lastMessageAt: "2024-02-25T11:00:00Z"
  },
  {
    id: 2,
    studentId: 3,
    superCoachId: 2,
    courseId: 2,
    courseVersion: 1,
    messages: mockMessages2,
    startedAt: "2024-02-24T14:00:00Z",
    lastMessageAt: "2024-02-24T15:15:00Z"
  },
  {
    id: 3,
    studentId: 2,
    superCoachId: 1,
    courseId: 4,
    courseVersion: 1,
    messages: mockMessages3,
    startedAt: "2024-02-23T09:00:00Z",
    lastMessageAt: "2024-02-26T19:00:00Z"
  }
];

// Helper function to get recent activity with versioning context
export const recentActivity = [
  {
    type: 'completion',
    message: 'Sarah Johnson completed Module 1 in Digital Marketing v2',
    course: 'Digital Marketing Mastery v2',
    time: '2 hours ago'
  },
  {
    type: 'followup',
    message: 'AI sent follow-up message to Mike Chen (Digital Marketing v1)',
    course: 'Digital Marketing Mastery v1',
    time: '4 hours ago'
  },
  {
    type: 'completion',
    message: 'Emma Rodriguez completed Team Building task in Leadership v1',
    course: 'Leadership Excellence v1',
    time: '1 day ago'
  },
  {
    type: 'enrollment',
    message: 'David Kim enrolled in Digital Marketing v2 and Leadership v1',
    course: 'Multiple Courses',
    time: '2 days ago'
  }
];