import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import CoursesTab from './components/CoursesTab';
import StudentsTab from './components/StudentsTab';
import SuperCoachesTab from './components/SuperCoachesTab';
import ConversationsTab from './components/ConversationsTab';
import CreateCourseModal from './components/CreateCourseModal';
import EditCourseModal from './components/EditCourseModal';
import CreateSuperCoachModal from './components/CreateSuperCoachModal';
import EditSuperCoachModal from './components/EditSuperCoachModal';
import StudentDetailsModal from './components/StudentDetailsModal';
import ConversationModal from './components/ConversationModal';
import CreateStudentModal from './components/CreateStudentModal';
import AuthPage from './components/AuthPage';
import { Course, Student, SuperCoach, Conversation, StudentCourseEnrollment } from './types';
import { mockCourses, mockStudents, mockSuperCoaches, mockConversations } from './data/mockData';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [superCoaches, setSuperCoaches] = useState<SuperCoach[]>(mockSuperCoaches);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  
  // Modal states
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [showCreateSuperCoach, setShowCreateSuperCoach] = useState(false);
  const [showEditSuperCoach, setShowEditSuperCoach] = useState(false);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [showConversation, setShowConversation] = useState(false);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  
  // Selected items
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedSuperCoach, setSelectedSuperCoach] = useState<SuperCoach | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  // Helper function to get the current version of a course by baseId
  const getCurrentCourseVersion = (baseId: number): Course | null => {
    return courses.find(c => c.baseId === baseId && c.isCurrentVersion) || null;
  };

  // Helper function to get course by ID and version
  const getCourseByIdAndVersion = (courseId: number, version: number): Course | null => {
    return courses.find(c => c.id === courseId && c.version === version) || null;
  };

  const handleCreateCourse = (courseData: Partial<Course>) => {
    const newCourse: Course = {
      id: Date.now(),
      title: courseData.title || '',
      description: courseData.description || '',
      status: 'draft',
      version: 1,
      modules: courseData.modules || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      enrolledStudents: 0,
      completionRate: 0,
      superCoachId: null,
      baseId: Date.now(), // New base ID for new course
      isCurrentVersion: true
    };
    setCourses([...courses, newCourse]);
    setShowCreateCourse(false);
  };

  const handleEditCourse = (courseData: Partial<Course>) => {
    if (!selectedCourse) return;
    
    // Prevent editing live courses
    if (selectedCourse.status === 'live') {
      alert('Live courses cannot be edited to maintain data integrity for enrolled students. Create a new version instead.');
      return;
    }
    
    const updatedCourse = {
      ...selectedCourse,
      ...courseData,
      updatedAt: new Date().toISOString()
    };
    
    setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
    setShowEditCourse(false);
    setSelectedCourse(null);
  };

  const handleCreateVersion = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Mark current version as not current
    setCourses(prevCourses => prevCourses.map(c => 
      c.baseId === course.baseId ? { ...c, isCurrentVersion: false } : c
    ));

    const newVersion: Course = {
      ...course,
      id: Date.now(),
      version: course.version + 1,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      enrolledStudents: 0,
      completionRate: 0,
      isCurrentVersion: true
    };
    
    setCourses(prevCourses => [...prevCourses, newVersion]);
  };

  const handleMakeLive = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Only allow draft courses to go live
    if (course.status !== 'draft') {
      alert('Only draft courses can be made live.');
      return;
    }

    // Validate course has content before going live
    if (course.modules.length === 0) {
      alert('Course must have at least one module before going live.');
      return;
    }

    const hasTasksInModules = course.modules.some(module => module.tasks.length > 0);
    if (!hasTasksInModules) {
      alert('Course modules must have tasks before going live.');
      return;
    }

    setCourses(courses.map(c => 
      c.id === courseId 
        ? { ...c, status: 'live', updatedAt: new Date().toISOString() }
        : c
    ));
  };

  const handleCreateStudent = (studentData: Partial<Student>, courseId?: number) => {
    const newStudent: Student = {
      id: Date.now(),
      name: studentData.name || '',
      email: studentData.email || '',
      status: 'new',
      enrolledCourses: [],
      progress: [],
      joinedAt: new Date().toISOString(),
      lastActivity: 'Just joined'
    };

    // If a course was selected, enroll student in the current version
    if (courseId) {
      const course = courses.find(c => c.id === courseId);
      if (course) {
        const enrollment: StudentCourseEnrollment = {
          courseId: course.id,
          courseVersion: course.version,
          enrolledAt: new Date().toISOString(),
          baseId: course.baseId || course.id
        };
        newStudent.enrolledCourses = [enrollment];

        // Update course enrollment count
        setCourses(courses.map(c => 
          c.id === courseId 
            ? { ...c, enrolledStudents: c.enrolledStudents + 1 }
            : c
        ));
      }
    }

    setStudents([...students, newStudent]);
    setShowCreateStudent(false);
  };

  const handleCreateSuperCoach = (superCoachData: Partial<SuperCoach>) => {
    const newSuperCoach: SuperCoach = {
      id: Date.now(),
      name: superCoachData.name || '',
      personalityType: superCoachData.personalityType || 'friendly',
      description: superCoachData.description || '',
      avatar: superCoachData.avatar || '',
      coursesAssigned: [],
      createdAt: new Date().toISOString(),
      isActive: true
    };
    setSuperCoaches([...superCoaches, newSuperCoach]);
    setShowCreateSuperCoach(false);
  };

  const handleEditSuperCoach = (superCoachData: Partial<SuperCoach>) => {
    if (!selectedSuperCoach) return;
    
    const updatedSuperCoach = {
      ...selectedSuperCoach,
      ...superCoachData
    };
    
    setSuperCoaches(superCoaches.map(sc => sc.id === selectedSuperCoach.id ? updatedSuperCoach : sc));
    setShowEditSuperCoach(false);
    setSelectedSuperCoach(null);
  };

  const handleDeleteSuperCoach = (superCoachId: number) => {
    const superCoach = superCoaches.find(sc => sc.id === superCoachId);
    if (!superCoach) return;

    // Check if SuperCoach is assigned to any courses
    if (superCoach.coursesAssigned.length > 0) {
      alert('Cannot delete SuperCoach that is assigned to courses. Please unassign from courses first.');
      return;
    }

    if (confirm('Are you sure you want to delete this SuperCoach? This action cannot be undone.')) {
      setSuperCoaches(superCoaches.filter(sc => sc.id !== superCoachId));
    }
  };

  const handleAddStudentToCourse = (studentId: number, courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    const student = students.find(s => s.id === studentId);
    if (!course || !student) return;

    // Only allow adding students to live courses
    if (course.status !== 'live') {
      alert('Students can only be enrolled in live courses.');
      return;
    }

    // Check if student is already enrolled in this course (any version)
    const isAlreadyEnrolled = student.enrolledCourses.some(enrollment => 
      enrollment.baseId === (course.baseId || course.id)
    );

    if (isAlreadyEnrolled) {
      alert('Student is already enrolled in this course.');
      return;
    }

    const enrollment: StudentCourseEnrollment = {
      courseId: course.id,
      courseVersion: course.version,
      enrolledAt: new Date().toISOString(),
      baseId: course.baseId || course.id
    };

    setStudents(students.map(s => 
      s.id === studentId 
        ? { ...s, enrolledCourses: [...s.enrolledCourses, enrollment] }
        : s
    ));
    
    setCourses(courses.map(c => 
      c.id === courseId 
        ? { ...c, enrolledStudents: c.enrolledStudents + 1 }
        : c
    ));
  };

  const handleRemoveStudentFromCourse = (studentId: number, courseId: number) => {
    const student = students.find(s => s.id === studentId);
    const course = courses.find(c => c.id === courseId);
    if (!student || !course) return;

    if (confirm('Are you sure you want to remove this student from the course? Their progress will be preserved.')) {
      // Find the enrollment to remove
      const enrollmentToRemove = student.enrolledCourses.find(enrollment => 
        enrollment.baseId === (course.baseId || course.id)
      );

      if (enrollmentToRemove) {
        setStudents(students.map(s => 
          s.id === studentId 
            ? { 
                ...s, 
                enrolledCourses: s.enrolledCourses.filter(enrollment => 
                  enrollment.baseId !== (course.baseId || course.id)
                )
              }
            : s
        ));
        
        // Find the actual course the student was enrolled in and update its count
        const enrolledCourse = courses.find(c => c.id === enrollmentToRemove.courseId);
        if (enrolledCourse) {
          setCourses(courses.map(c => 
            c.id === enrolledCourse.id 
              ? { ...c, enrolledStudents: Math.max(0, c.enrolledStudents - 1) }
              : c
          ));
        }
      }
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage 
            students={students}
            courses={courses}
            onViewStudentDetails={(student) => {
              setSelectedStudent(student);
              setShowStudentDetails(true);
            }}
          />
        );
      case 'courses':
        return (
          <CoursesTab 
            courses={courses}
            onCreateCourse={() => setShowCreateCourse(true)}
            onEditCourse={(course) => {
              setSelectedCourse(course);
              setShowEditCourse(true);
            }}
            onCreateVersion={handleCreateVersion}
            onMakeLive={handleMakeLive}
            onCreateStudent={() => setShowCreateStudent(true)}
          />
        );
      case 'students':
        return (
          <StudentsTab 
            students={students}
            courses={courses}
            onViewDetails={(student) => {
              setSelectedStudent(student);
              setShowStudentDetails(true);
            }}
            onAddToCourse={handleAddStudentToCourse}
            onRemoveFromCourse={handleRemoveStudentFromCourse}
          />
        );
      case 'supercoaches':
        return (
          <SuperCoachesTab 
            superCoaches={superCoaches}
            courses={courses}
            onCreateSuperCoach={() => setShowCreateSuperCoach(true)}
            onEditSuperCoach={(superCoach) => {
              setSelectedSuperCoach(superCoach);
              setShowEditSuperCoach(true);
            }}
            onDeleteSuperCoach={handleDeleteSuperCoach}
          />
        );
      case 'conversations':
        return (
          <ConversationsTab 
            conversations={conversations}
            students={students}
            superCoaches={superCoaches}
            onViewConversation={(conversation) => {
              setSelectedConversation(conversation);
              setShowConversation(true);
            }}
          />
        );
      default:
        return <HomePage students={students} courses={courses} onViewStudentDetails={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-8">
          {renderActiveTab()}
        </div>
      </div>

      {/* Modals */}
      {showCreateCourse && (
        <CreateCourseModal 
          onClose={() => setShowCreateCourse(false)}
          onSubmit={handleCreateCourse}
        />
      )}
      
      {showEditCourse && selectedCourse && (
        <EditCourseModal 
          course={selectedCourse}
          onClose={() => {
            setShowEditCourse(false);
            setSelectedCourse(null);
          }}
          onSubmit={handleEditCourse}
        />
      )}

      {showCreateSuperCoach && (
        <CreateSuperCoachModal 
          onClose={() => setShowCreateSuperCoach(false)}
          onSubmit={handleCreateSuperCoach}
        />
      )}
      
      {showEditSuperCoach && selectedSuperCoach && (
        <EditSuperCoachModal 
          superCoach={selectedSuperCoach}
          onClose={() => {
            setShowEditSuperCoach(false);
            setSelectedSuperCoach(null);
          }}
          onSubmit={handleEditSuperCoach}
        />
      )}

      {showStudentDetails && selectedStudent && (
        <StudentDetailsModal 
          student={selectedStudent}
          courses={courses}
          onClose={() => {
            setShowStudentDetails(false);
            setSelectedStudent(null);
          }}
        />
      )}

      {showConversation && selectedConversation && (
        <ConversationModal 
          conversation={selectedConversation}
          student={students.find(s => s.id === selectedConversation.studentId)}
          superCoach={superCoaches.find(sc => sc.id === selectedConversation.superCoachId)}
          onClose={() => {
            setShowConversation(false);
            setSelectedConversation(null);
          }}
        />
      )}

      {showCreateStudent && (
        <CreateStudentModal 
          onClose={() => setShowCreateStudent(false)}
          onSubmit={handleCreateStudent}
          liveCourses={courses.filter(c => c.status === 'live')}
        />
      )}
    </div>
  );
}

export default App;