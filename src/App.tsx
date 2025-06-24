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
import EditStudentModal from './components/EditStudentModal';
import ConversationModal from './components/ConversationModal';
import CreateStudentModal from './components/CreateStudentModal';
import AuthPage from './components/AuthPage';
import { Course, Student, SuperCoach, Conversation } from './types';
import { useSupabase } from './hooks/useSupabase';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  
  const {
    courses,
    students,
    superCoaches,
    conversations,
    currentCoach,
    loading,
    error,
    authenticateCoach,
    createCourse,
    updateCourse,
    createCourseVersion,
    makeCourseeLive,
    createStudent,
    updateStudent,
    createSuperCoach,
    updateSuperCoach,
    deleteSuperCoach
  } = useSupabase();
  
  // Modal states
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [showCreateSuperCoach, setShowCreateSuperCoach] = useState(false);
  const [showEditSuperCoach, setShowEditSuperCoach] = useState(false);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [showConversation, setShowConversation] = useState(false);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  
  // Selected items
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedSuperCoach, setSelectedSuperCoach] = useState<SuperCoach | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Show auth page if not authenticated
  if (!currentCoach) {
    return <AuthPage onAuthenticated={authenticateCoach} />;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SuperCoach AI Dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const handleCreateCourse = async (courseData: Partial<Course>) => {
    try {
      await createCourse(courseData);
      setShowCreateCourse(false);
    } catch (err) {
      console.error('Failed to create course:', err);
      alert('Failed to create course. Please try again.');
    }
  };

  const handleEditCourse = async (courseData: Partial<Course>) => {
    if (!selectedCourse) return;
    
    // Prevent editing live courses
    if (selectedCourse.status === 'live') {
      alert('Live courses cannot be edited to maintain data integrity for enrolled students. Create a new version instead.');
      return;
    }
    
    try {
      await updateCourse(selectedCourse.id, courseData);
      setShowEditCourse(false);
      setSelectedCourse(null);
    } catch (err) {
      console.error('Failed to update course:', err);
      alert('Failed to update course. Please try again.');
    }
  };

  const handleCreateVersion = async (courseId: number) => {
    try {
      await createCourseVersion(courseId);
    } catch (err) {
      console.error('Failed to create course version:', err);
      alert('Failed to create course version. Please try again.');
    }
  };

  const handleMakeLive = async (courseId: number) => {
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

    try {
      await makeCourseeLive(courseId);
    } catch (err) {
      console.error('Failed to make course live:', err);
      alert('Failed to make course live. Please try again.');
    }
  };

  const handleCreateStudent = async (studentData: Partial<Student>, courseId?: number) => {
    try {
      await createStudent(studentData, courseId);
      setShowCreateStudent(false);
    } catch (err) {
      console.error('Failed to create student:', err);
      alert('Failed to create student. Please try again.');
    }
  };

  const handleEditStudent = async (studentData: Partial<Student>) => {
    if (!selectedStudent) return;
    
    try {
      await updateStudent(selectedStudent.id, studentData);
      setShowEditStudent(false);
      setSelectedStudent(null);
    } catch (err) {
      console.error('Failed to update student:', err);
      alert('Failed to update student. Please try again.');
    }
  };

  const handleCreateSuperCoach = async (superCoachData: Partial<SuperCoach>) => {
    try {
      await createSuperCoach(superCoachData);
      setShowCreateSuperCoach(false);
    } catch (err) {
      console.error('Failed to create super coach:', err);
      alert('Failed to create super coach. Please try again.');
    }
  };

  const handleEditSuperCoach = async (superCoachData: Partial<SuperCoach>) => {
    if (!selectedSuperCoach) return;
    
    try {
      await updateSuperCoach(selectedSuperCoach.id, superCoachData);
      setShowEditSuperCoach(false);
      setSelectedSuperCoach(null);
    } catch (err) {
      console.error('Failed to update super coach:', err);
      alert('Failed to update super coach. Please try again.');
    }
  };

  const handleDeleteSuperCoach = async (superCoachId: number) => {
    const superCoach = superCoaches.find(sc => sc.id === superCoachId);
    if (!superCoach) return;

    // Check if SuperCoach is assigned to any courses
    const assignedCourses = courses.filter(c => c.superCoachId === superCoachId);
    if (assignedCourses.length > 0) {
      alert('Cannot delete SuperCoach that is assigned to courses. Please unassign from courses first.');
      return;
    }

    if (confirm('Are you sure you want to delete this SuperCoach? This action cannot be undone.')) {
      try {
        await deleteSuperCoach(superCoachId);
      } catch (err) {
        console.error('Failed to delete super coach:', err);
        alert('Failed to delete super coach. Please try again.');
      }
    }
  };

  // Note: Student enrollment management would need additional API endpoints
  const handleAddStudentToCourse = (studentId: number, courseId: number) => {
    // This would require additional Supabase operations
    console.log('Add student to course:', studentId, courseId);
    alert('Student enrollment management coming soon!');
  };

  const handleRemoveStudentFromCourse = (studentId: number, courseId: number) => {
    // This would require additional Supabase operations
    console.log('Remove student from course:', studentId, courseId);
    alert('Student enrollment management coming soon!');
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
            onEditStudent={(student) => {
              setSelectedStudent(student);
              setShowEditStudent(true);
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

      {showEditStudent && selectedStudent && (
        <EditStudentModal 
          student={selectedStudent}
          onClose={() => {
            setShowEditStudent(false);
            setSelectedStudent(null);
          }}
          onSubmit={handleEditStudent}
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