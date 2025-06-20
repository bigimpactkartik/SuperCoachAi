import React from 'react';
import { Clock, BookOpen, TrendingUp, AlertCircle, CheckCircle, User, GitBranch } from 'lucide-react';
import { Student, Course } from '../types';

interface StudentCardProps {
  student: Student;
  courses: Course[];
  onClick: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, courses, onClick }) => {
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
      case 'in-progress': return <TrendingUp size={16} />;
      case 'stuck': return <AlertCircle size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      default: return <User size={16} />;
    }
  };

  // Get enrolled courses with their versions
  const enrolledCoursesWithVersions = student.enrolledCourses.map(enrollment => {
    const course = courses.find(c => c.id === enrollment.courseId && c.version === enrollment.courseVersion);
    return course ? { ...course, enrollment } : null;
  }).filter(Boolean) as (Course & { enrollment: any })[];

  const overallProgress = student.progress.length > 0 
    ? Math.round((student.progress.filter(p => p.status === 'completed').length / student.progress.length) * 100)
    : 0;

  return (
    <div 
      onClick={onClick}
      className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(student.status)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${getStatusColor(student.status)} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {student.avatar ? (
              <img src={student.avatar} alt={student.name} className="w-full h-full rounded-xl object-cover" />
            ) : (
              student.name.charAt(0).toUpperCase()
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {student.name}
            </h3>
            <p className="text-sm text-gray-600">{student.email}</p>
          </div>
          
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getStatusColor(student.status)}`}>
            {getStatusIcon(student.status)}
            <span className="capitalize">{student.status.replace('-', ' ')}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Overall Progress</span>
            <span className="text-sm font-bold text-gray-900">{overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-full bg-gradient-to-r ${getStatusColor(student.status)} rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Course Info with Versioning */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BookOpen size={14} />
            <span>{student.enrolledCourses.length} course{student.enrolledCourses.length !== 1 ? 's' : ''} enrolled</span>
          </div>
          {enrolledCoursesWithVersions.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {enrolledCoursesWithVersions.slice(0, 2).map((courseWithEnrollment, index) => {
                const course = courseWithEnrollment;
                const isCurrentVersion = course.isCurrentVersion;
                return (
                  <div key={index} className="flex items-center gap-1">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {course.title}
                    </span>
                    <span className={`text-xs px-1 py-0.5 rounded text-white ${
                      isCurrentVersion ? 'bg-emerald-500' : 'bg-gray-500'
                    }`}>
                      v{course.version}
                    </span>
                  </div>
                );
              })}
              {enrolledCoursesWithVersions.length > 2 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  +{enrolledCoursesWithVersions.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Version Status Indicator */}
        {enrolledCoursesWithVersions.some(c => !c.isCurrentVersion) && (
          <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700">
              <GitBranch size={12} />
              <span className="text-xs font-medium">
                Enrolled in specific course version{enrolledCoursesWithVersions.filter(c => !c.isCurrentVersion).length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        {/* Last Activity */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock size={12} />
          <span>Last active: {student.lastActivity}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;