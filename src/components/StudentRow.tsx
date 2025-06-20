import React, { useState } from 'react';
import { CheckCircle, AlertCircle, MessageCircle, User, Clock, Trophy, Eye, UserPlus, UserMinus, MoreVertical } from 'lucide-react';
import { Student, Course } from '../types';

interface StudentRowProps {
  student: Student;
  courses: Course[];
  onViewDetails: () => void;
  onAddToCourse: (studentId: number, courseId: number) => void;
  onRemoveFromCourse: (studentId: number, courseId: number) => void;
}

const StudentRow: React.FC<StudentRowProps> = ({ 
  student, 
  courses, 
  onViewDetails, 
  onAddToCourse, 
  onRemoveFromCourse 
}) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'from-blue-500 to-indigo-600';
      case 'in-progress': return 'from-orange-500 to-amber-600';
      case 'stuck': return 'from-red-500 to-pink-600';
      case 'completed': return 'from-emerald-500 to-teal-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <User size={16} />;
      case 'in-progress': return <Clock size={16} />;
      case 'stuck': return <AlertCircle size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      default: return <User size={16} />;
    }
  };

  const enrolledCourses = courses.filter(course => student.enrolledCourses.includes(course.id));
  const availableCourses = courses.filter(course => 
    course.status === 'live' && !student.enrolledCourses.includes(course.id)
  );

  const overallProgress = student.progress.length > 0 
    ? Math.round((student.progress.filter(p => p.status === 'completed').length / student.progress.length) * 100)
    : 0;

  return (
    <div className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${getStatusColor(student.status)}`}></div>
      
      <div className="relative z-10 flex items-center justify-between">
        {/* Student Info */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className={`w-16 h-16 bg-gradient-to-br ${getStatusColor(student.status)} rounded-2xl flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:scale-110 transition-all duration-200 shadow-lg`}>
              {student.avatar ? (
                <img src={student.avatar} alt={student.name} className="w-full h-full rounded-2xl object-cover" />
              ) : (
                student.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${getStatusColor(student.status).replace('from-', 'bg-').split(' ')[0]}`}>
              {getStatusIcon(student.status)}
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {student.name}
            </h4>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <User size={14} />
              {student.email}
            </p>
            <div className="flex flex-wrap gap-1">
              {enrolledCourses.slice(0, 2).map(course => (
                <span key={course.id} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {course.title}
                </span>
              ))}
              {enrolledCourses.length > 2 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  +{enrolledCourses.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Progress Section */}
        <div className="flex items-center gap-8">
          {/* Circular Progress */}
          <div className="relative">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke={student.status === 'completed' ? '#10b981' : student.status === 'stuck' ? '#f59e0b' : '#3b82f6'}
                strokeWidth="3"
                strokeDasharray={`${overallProgress * 1.01} 100`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-lg font-bold text-gray-900">{overallProgress}%</span>
              </div>
            </div>
          </div>
          
          {/* Status & Timeline */}
          <div className="text-right space-y-2">
            <div className={`flex items-center gap-2 font-semibold text-sm ${
              student.status === 'completed' ? 'text-emerald-600' : 
              student.status === 'stuck' ? 'text-orange-600' : 
              student.status === 'in-progress' ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {student.status === 'completed' ? (
                <>
                  <Trophy size={16} />
                  <span>Completed</span>
                </>
              ) : student.status === 'stuck' ? (
                <>
                  <AlertCircle size={16} />
                  <span>Needs Help</span>
                </>
              ) : student.status === 'in-progress' ? (
                <>
                  <Clock size={16} />
                  <span>In Progress</span>
                </>
              ) : (
                <>
                  <User size={16} />
                  <span>New Student</span>
                </>
              )}
            </div>
            <p className="text-sm font-medium text-gray-700">{enrolledCourses.length} course{enrolledCourses.length !== 1 ? 's' : ''}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={12} />
              Last active: {student.lastActivity}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={onViewDetails}
              className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-glow-blue group/btn"
            >
              <Eye size={18} className="group-hover/btn:animate-bounce-gentle" />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowActions(!showActions)}
                className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-glow-purple group/btn"
              >
                <MoreVertical size={18} className="group-hover/btn:animate-bounce-gentle" />
              </button>
              
              {showActions && (
                <div className="absolute right-0 top-full mt-2 w-48 glass rounded-xl p-2 shadow-lg z-10">
                  {availableCourses.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-gray-600 px-2 py-1">Add to Course</p>
                      {availableCourses.slice(0, 3).map(course => (
                        <button
                          key={course.id}
                          onClick={() => {
                            onAddToCourse(student.id, course.id);
                            setShowActions(false);
                          }}
                          className="w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded flex items-center gap-2"
                        >
                          <UserPlus size={14} />
                          {course.title}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {enrolledCourses.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-600 px-2 py-1">Remove from Course</p>
                      {enrolledCourses.slice(0, 3).map(course => (
                        <button
                          key={course.id}
                          onClick={() => {
                            onRemoveFromCourse(student.id, course.id);
                            setShowActions(false);
                          }}
                          className="w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded flex items-center gap-2"
                        >
                          <UserMinus size={14} />
                          {course.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRow;