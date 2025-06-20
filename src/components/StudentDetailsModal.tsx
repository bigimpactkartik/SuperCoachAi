import React from 'react';
import { X, User, BookOpen, Clock, Trophy, TrendingUp, Calendar, GitBranch } from 'lucide-react';
import { Student, Course } from '../types';

interface StudentDetailsModalProps {
  student: Student;
  courses: Course[];
  onClose: () => void;
}

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ student, courses, onClose }) => {
  // Get courses the student is enrolled in with their specific versions
  const enrolledCoursesWithVersions = student.enrolledCourses.map(enrollment => {
    const course = courses.find(c => c.id === enrollment.courseId && c.version === enrollment.courseVersion);
    return course ? { ...course, enrollment } : null;
  }).filter(Boolean) as (Course & { enrollment: any })[];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'from-blue-500 to-indigo-600';
      case 'in-progress': return 'from-orange-500 to-amber-600';
      case 'stuck': return 'from-red-500 to-pink-600';
      case 'completed': return 'from-emerald-500 to-teal-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  const overallProgress = student.progress.length > 0 
    ? Math.round((student.progress.filter(p => p.status === 'completed').length / student.progress.length) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="glass rounded-2xl p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto transform animate-slideUp shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${getStatusColor(student.status)} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
              {student.avatar ? (
                <img src={student.avatar} alt={student.name} className="w-full h-full rounded-2xl object-cover" />
              ) : (
                student.name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold gradient-text">{student.name}</h3>
              <p className="text-gray-600">{student.email}</p>
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getStatusColor(student.status)} mt-2`}>
                <span className="capitalize">{student.status.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-dark rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-2">
              <BookOpen className="text-white" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{enrolledCoursesWithVersions.length}</div>
            <div className="text-sm text-gray-600">Enrolled Courses</div>
          </div>

          <div className="glass-dark rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div className="text-2xl font-bold text-emerald-600">{overallProgress}%</div>
            <div className="text-sm text-gray-600">Overall Progress</div>
          </div>

          <div className="glass-dark rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Trophy className="text-white" size={20} />
            </div>
            <div className="text-2xl font-bold text-purple-600">{student.progress.filter(p => p.status === 'completed').length}</div>
            <div className="text-sm text-gray-600">Tasks Completed</div>
          </div>

          <div className="glass-dark rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Clock className="text-white" size={20} />
            </div>
            <div className="text-2xl font-bold text-orange-600">{student.progress.reduce((acc, p) => acc + p.timeSpent, 0)}</div>
            <div className="text-sm text-gray-600">Minutes Studied</div>
          </div>
        </div>

        {/* Course Progress with Versioning */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-gray-900">Course Progress (Version-Specific)</h4>
          
          {enrolledCoursesWithVersions.map(courseWithEnrollment => {
            const course = courseWithEnrollment;
            const enrollment = courseWithEnrollment.enrollment;
            const courseProgress = student.progress.filter(p => 
              p.courseId === course.id && p.courseVersion === course.version
            );
            const completedTasks = courseProgress.filter(p => p.status === 'completed').length;
            const totalTasks = course.modules.reduce((acc, module) => acc + module.tasks.length, 0);
            const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            // Check if this is the current version
            const isCurrentVersion = course.isCurrentVersion;
            const currentVersionCourse = courses.find(c => c.baseId === course.baseId && c.isCurrentVersion);

            return (
              <div key={`${course.id}-${course.version}`} className="glass-dark rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="text-lg font-bold text-gray-900">{course.title}</h5>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          isCurrentVersion 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          <GitBranch size={12} />
                          v{course.version}
                          {isCurrentVersion && ' (Current)'}
                        </span>
                        {!isCurrentVersion && currentVersionCourse && (
                          <span className="text-xs text-gray-500">
                            (Latest: v{currentVersionCourse.version})
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                    <div className="text-xs text-gray-500">
                      Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{progressPercentage}%</div>
                    <div className="text-sm text-gray-600">{completedTasks}/{totalTasks} tasks</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>

                {/* Module Progress */}
                <div className="space-y-3">
                  {course.modules.map(module => {
                    const moduleProgress = courseProgress.filter(p => p.moduleId === module.id);
                    const moduleCompleted = moduleProgress.filter(p => p.status === 'completed').length;
                    const moduleTotal = module.tasks.length;
                    const modulePercentage = moduleTotal > 0 ? Math.round((moduleCompleted / moduleTotal) * 100) : 0;

                    return (
                      <div key={module.id} className="flex items-center justify-between p-3 bg-white/30 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-900">{module.title}</span>
                          <div className="text-xs text-gray-600">{moduleCompleted}/{moduleTotal} tasks completed</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              style={{ width: `${modulePercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 w-10">{modulePercentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Version Notice */}
                {!isCurrentVersion && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-2 text-blue-700">
                      <GitBranch size={14} />
                      <span className="text-xs font-medium">
                        This student is enrolled in version {course.version}. They will continue to access this version's content even if newer versions are available.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {enrolledCoursesWithVersions.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <BookOpen size={48} className="mx-auto" />
              </div>
              <p className="text-gray-600">Student is not enrolled in any courses yet</p>
            </div>
          )}
        </div>

        {/* Student Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-dark rounded-xl p-4">
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Calendar size={16} />
              Timeline
            </h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Joined:</span>
                <span className="font-medium">{new Date(student.joinedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Activity:</span>
                <span className="font-medium">{student.lastActivity}</span>
              </div>
            </div>
          </div>

          <div className="glass-dark rounded-xl p-4">
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <User size={16} />
              Contact Info
            </h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{student.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium capitalize ${
                  student.status === 'completed' ? 'text-emerald-600' : 
                  student.status === 'stuck' ? 'text-orange-600' : 
                  'text-blue-600'
                }`}>
                  {student.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;