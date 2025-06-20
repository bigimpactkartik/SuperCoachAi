import React from 'react';
import { Plus, Calendar, Users, TrendingUp, Target, Clock } from 'lucide-react';

interface PlansTabProps {
  onCreatePlan: () => void;
}

const PlansTab: React.FC<PlansTabProps> = ({ onCreatePlan }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Completion Plans</h2>
          <p className="text-gray-600">Create and manage structured learning paths for student success</p>
        </div>
        
        <button 
          onClick={onCreatePlan}
          className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
        >
          <Plus size={20} />
          Create Plan
        </button>
      </div>

      {/* Plan Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6 hover:shadow-glow-blue transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Target className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <p className="text-sm font-semibold text-gray-600">Active Plans</p>
        </div>
        
        <div className="glass rounded-xl p-6 hover:shadow-glow-green transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-emerald-600">25</span>
          </div>
          <p className="text-sm font-semibold text-gray-600">Enrolled Students</p>
        </div>
        
        <div className="glass rounded-xl p-6 hover:shadow-glow-purple transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-purple-600">68%</span>
          </div>
          <p className="text-sm font-semibold text-gray-600">Avg Progress</p>
        </div>
        
        <div className="glass rounded-xl p-6 hover:shadow-glow-blue transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Clock className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-orange-600">12</span>
          </div>
          <p className="text-sm font-semibold text-gray-600">Days Remaining</p>
        </div>
      </div>

      {/* Active Plans */}
      <div className="glass rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Active Completion Plans</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200">
            View All
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-full -translate-y-8 translate-x-8"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                      30-Day Marketing Challenge
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">Digital Marketing Mastery • 25 students enrolled</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-orange-500" />
                      <span className="font-medium">Started: March 1, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target size={16} className="text-red-500" />
                      <span className="font-medium">Deadline: March 31, 2024</span>
                    </div>
                  </div>
                </div>
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse-slow shadow-lg">
                  Active
                </span>
              </div>
              
              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-gray-900 mb-1">68%</div>
                  <p className="text-sm text-gray-600 font-medium">Average Progress</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                </div>
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">18</div>
                  <p className="text-sm text-gray-600 font-medium">Students On Track</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-orange-600 mb-1">7</div>
                  <p className="text-sm text-gray-600 font-medium">Need Attention</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold flex items-center justify-center gap-2">
                  <TrendingUp size={18} />
                  View Analytics
                </button>
                <button className="px-6 py-3 border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold flex items-center gap-2">
                  <Users size={18} />
                  Manage Students
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansTab;