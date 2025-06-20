import React from 'react';
import { Plus, Search, Filter, Edit, Copy, Play, Archive, Lock, UserPlus } from 'lucide-react';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface CoursesTabProps {
  courses: Course[];
  onCreateCourse: () => void;
  onEditCourse: (course: Course) => void;
  onCreateVersion: (courseId: number) => void;
  onMakeLive: (courseId: number) => void;
  onCreateStudent: () => void;
}

const CoursesTab: React.FC<CoursesTabProps> = ({ 
  courses, 
  onCreateCourse, 
  onEditCourse, 
  onCreateVersion, 
  onMakeLive,
  onCreateStudent
}) => {
  const liveCourses = courses.filter(c => c.status === 'live');
  const draftCourses = courses.filter(c => c.status === 'draft');
  const archivedCourses = courses.filter(c => c.status === 'archived');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Course Management</h2>
          <p className="text-gray-600">Create, manage, and monitor your training courses</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm min-w-64"
              />
            </div>
            <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 bg-white/80 backdrop-blur-sm">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={onCreateStudent}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
            >
              <UserPlus size={20} />
              Add Student
            </button>
            
            <button 
              onClick={onCreateCourse}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
            >
              <Plus size={20} />
              Create Course
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">{liveCourses.length}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Live Courses</p>
              <p className="text-lg font-bold text-gray-900">Active Programs</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">{draftCourses.length}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Draft Courses</p>
              <p className="text-lg font-bold text-gray-900">In Development</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">{courses.reduce((acc, course) => acc + course.enrolledStudents, 0)}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p className="text-lg font-bold text-gray-900">All Courses</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">{Math.round(courses.reduce((acc, course) => acc + course.completionRate, 0) / courses.length) || 0}%</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Completion</p>
              <p className="text-lg font-bold text-gray-900">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Courses */}
      {liveCourses.length > 0 && (
        <div className="glass rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Play className="text-emerald-600" size={24} />
              Live Courses
            </h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={onCreateStudent}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all duration-200"
              >
                <UserPlus size={16} />
                Add Student to Live Course
              </button>
              <div className="flex items-center gap-2 text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                <Lock size={14} />
                Protected from editing
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEdit={() => onEditCourse(course)}
                onCreateVersion={() => onCreateVersion(course.id)}
                onMakeLive={() => onMakeLive(course.id)}
                isLocked={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Draft Courses */}
      {draftCourses.length > 0 && (
        <div className="glass rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Edit className="text-blue-600" size={24} />
            Draft Courses
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {draftCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEdit={() => onEditCourse(course)}
                onCreateVersion={() => onCreateVersion(course.id)}
                onMakeLive={() => onMakeLive(course.id)}
                isLocked={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Archived Courses */}
      {archivedCourses.length > 0 && (
        <div className="glass rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Archive className="text-gray-600" size={24} />
            Archived Courses
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {archivedCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEdit={() => onEditCourse(course)}
                onCreateVersion={() => onCreateVersion(course.id)}
                onMakeLive={() => onMakeLive(course.id)}
                isLocked={true}
              />
            ))}
          </div>
        </div>
      )}

      {courses.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Plus size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
          <p className="text-gray-600 mb-6">Create your first course to get started</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={onCreateStudent}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
            >
              <UserPlus size={20} />
              Add Student
            </button>
            <button 
              onClick={onCreateCourse}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
            >
              <Plus size={20} />
              Create Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesTab;