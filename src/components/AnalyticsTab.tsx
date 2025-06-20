import React from 'react';
import { BarChart3, TrendingUp, Users, Award, Calendar, Target } from 'lucide-react';

const AnalyticsTab = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Analytics & Insights</h2>
          <p className="text-gray-600">Comprehensive performance metrics and learning analytics</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
            <Calendar size={20} />
            Custom Range
          </button>
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
            <Target size={20} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6 hover:shadow-glow-blue transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="text-white" size={24} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">+23%</div>
              <div className="text-sm text-emerald-600 font-medium">↑ vs last month</div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-600 mb-1">Student Engagement</h3>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" style={{width: '78%'}}></div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 hover:shadow-glow-green transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Award className="text-white" size={24} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">+15%</div>
              <div className="text-sm text-emerald-600 font-medium">↑ vs last month</div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-600 mb-1">Completion Rate</h3>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full" style={{width: '85%'}}></div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 hover:shadow-glow-purple transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">+31%</div>
              <div className="text-sm text-emerald-600 font-medium">↑ vs last month</div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-600 mb-1">Learning Velocity</h3>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-violet-600 h-2 rounded-full" style={{width: '92%'}}></div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 hover:shadow-glow-blue transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Target className="text-white" size={24} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">94%</div>
              <div className="text-sm text-emerald-600 font-medium">↑ Satisfaction</div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-600 mb-1">Success Rate</h3>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{width: '94%'}}></div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="text-blue-600" size={24} />
              Completion Trends
            </h3>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-float">
                  <BarChart3 size={48} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">Interactive Analytics Coming Soon</p>
                  <p className="text-gray-600">Advanced charts and visualizations in development</p>
                </div>
                <div className="flex justify-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="text-emerald-600" size={24} />
              Student Engagement
            </h3>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto animate-float" style={{animationDelay: '1s'}}>
                  <TrendingUp size={48} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">Real-time Engagement Tracking</p>
                  <p className="text-gray-600">Student activity and participation metrics</p>
                </div>
                <div className="flex justify-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="glass rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">AI-Powered Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-900 mb-2">📈 Peak Engagement Times</h4>
            <p className="text-blue-800">Students are most active between 7-9 PM. Consider scheduling live sessions during these hours.</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border-l-4 border-emerald-500">
            <h4 className="font-bold text-emerald-900 mb-2">🎯 Module Performance</h4>
            <p className="text-emerald-800">Module 3 has the highest completion rate (94%). Students find practical exercises most engaging.</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border-l-4 border-purple-500">
            <h4 className="font-bold text-purple-900 mb-2">⚡ Intervention Opportunities</h4>
            <p className="text-purple-800">7 students are at risk of dropping out. AI recommends personalized follow-up messages.</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-500">
            <h4 className="font-bold text-orange-900 mb-2">🏆 Success Patterns</h4>
            <p className="text-orange-800">Students who complete assessments within 24 hours have 89% higher success rates.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;