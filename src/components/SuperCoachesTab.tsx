import React from 'react';
import { Plus, Search, Bot, Edit, Trash2, Users, MessageCircle } from 'lucide-react';
import { SuperCoach, Course } from '../types';

interface SuperCoachesTabProps {
  superCoaches: SuperCoach[];
  courses: Course[];
  onCreateSuperCoach: () => void;
  onEditSuperCoach: (superCoach: SuperCoach) => void;
  onDeleteSuperCoach: (superCoachId: number) => void;
}

const SuperCoachesTab: React.FC<SuperCoachesTabProps> = ({ 
  superCoaches, 
  courses, 
  onCreateSuperCoach, 
  onEditSuperCoach, 
  onDeleteSuperCoach 
}) => {
  const getPersonalityColor = (type: string) => {
    switch (type) {
      case 'friendly': return 'from-emerald-500 to-teal-600';
      case 'professional': return 'from-blue-500 to-indigo-600';
      case 'motivational': return 'from-orange-500 to-red-500';
      case 'supportive': return 'from-purple-500 to-violet-600';
      case 'direct': return 'from-gray-500 to-slate-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">SuperCoach Management</h2>
          <p className="text-gray-600">Create and manage AI coaches for your courses</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search coaches..." 
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 bg-white/80 backdrop-blur-sm min-w-64"
            />
          </div>
          
          <button 
            onClick={onCreateSuperCoach}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
          >
            <Plus size={20} />
            Create SuperCoach
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{superCoaches.length}</p>
              <p className="text-sm font-medium text-gray-600">Total Coaches</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">{superCoaches.filter(sc => sc.isActive).length}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">Active</p>
              <p className="text-sm font-medium text-gray-600">Currently Working</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Users className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{superCoaches.reduce((acc, sc) => acc + sc.coursesAssigned.length, 0)}</p>
              <p className="text-sm font-medium text-gray-600">Course Assignments</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">1.2k</p>
              <p className="text-sm font-medium text-gray-600">Messages Sent</p>
            </div>
          </div>
        </div>
      </div>

      {/* SuperCoaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {superCoaches.map(superCoach => (
          <div key={superCoach.id} className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden">
            {/* Background Pattern */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getPersonalityColor(superCoach.personalityType)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${getPersonalityColor(superCoach.personalityType)} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {superCoach.avatar ? (
                    <img src={superCoach.avatar} alt={superCoach.name} className="w-full h-full rounded-2xl object-cover" />
                  ) : (
                    <Bot size={24} />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {superCoach.name}
                  </h3>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getPersonalityColor(superCoach.personalityType)}`}>
                    <span className="capitalize">{superCoach.personalityType}</span>
                  </div>
                </div>
                
                <div className={`w-3 h-3 rounded-full ${superCoach.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{superCoach.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl">
                  <div className="text-lg font-bold text-blue-600">{superCoach.coursesAssigned.length}</div>
                  <div className="text-xs text-gray-600">Courses</div>
                </div>
                <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl">
                  <div className="text-lg font-bold text-emerald-600">
                    {superCoach.coursesAssigned.reduce((acc, courseId) => {
                      const course = courses.find(c => c.id === courseId);
                      return acc + (course?.enrolledStudents || 0);
                    }, 0)}
                  </div>
                  <div className="text-xs text-gray-600">Students</div>
                </div>
              </div>

              {/* Assigned Courses */}
              {superCoach.coursesAssigned.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Assigned Courses</p>
                  <div className="flex flex-wrap gap-1">
                    {superCoach.coursesAssigned.slice(0, 2).map(courseId => {
                      const course = courses.find(c => c.id === courseId);
                      return course ? (
                        <span key={courseId} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {course.title}
                        </span>
                      ) : null;
                    })}
                    {superCoach.coursesAssigned.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{superCoach.coursesAssigned.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => onEditSuperCoach(superCoach)}
                  className={`flex-1 bg-gradient-to-r ${getPersonalityColor(superCoach.personalityType)} text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all duration-200 text-sm font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
                >
                  <Edit size={14} />
                  Edit
                </button>
                
                <button 
                  onClick={() => onDeleteSuperCoach(superCoach.id)}
                  className="px-4 py-2 border-2 border-red-200 hover:border-red-300 text-red-700 hover:text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 text-sm font-semibold transform hover:scale-105"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {superCoaches.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Bot size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No SuperCoaches yet</h3>
          <p className="text-gray-600 mb-6">Create your first AI coach to get started</p>
          <button 
            onClick={onCreateSuperCoach}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 flex items-center gap-2 mx-auto transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
          >
            <Plus size={20} />
            Create SuperCoach
          </button>
        </div>
      )}
    </div>
  );
};

export default SuperCoachesTab;