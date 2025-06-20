import React from 'react';
import { Users, Award, BookOpen, MessageCircle, CheckCircle, Star, TrendingUp, Zap } from 'lucide-react';
import { recentActivity } from '../data/mockData';

const OverviewTab = () => {
  const statsCards = [
    {
      title: 'Total Students',
      value: '77',
      change: '+12% this month',
      changeType: 'positive',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
      glowColor: 'shadow-glow-blue'
    },
    {
      title: 'Avg Completion Rate',
      value: '78%',
      change: '+5% this month',
      changeType: 'positive',
      icon: Award,
      gradient: 'from-emerald-500 to-teal-600',
      glowColor: 'shadow-glow-green'
    },
    {
      title: 'Active Courses',
      value: '2',
      change: '2 published',
      changeType: 'neutral',
      icon: BookOpen,
      gradient: 'from-purple-500 to-violet-600',
      glowColor: 'shadow-glow-purple'
    },
    {
      title: 'AI Messages Sent',
      value: '342',
      change: 'Last 30 days',
      changeType: 'info',
      icon: MessageCircle,
      gradient: 'from-orange-500 to-red-500',
      glowColor: 'shadow-glow-blue'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completion':
        return <CheckCircle size={20} />;
      case 'followup':
        return <MessageCircle size={20} />;
      default:
        return <Star size={20} />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'completion':
        return 'from-emerald-500 to-teal-600';
      case 'followup':
        return 'from-blue-500 to-indigo-600';
      default:
        return 'from-yellow-500 to-orange-500';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Section */}
      <div className="glass rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-8 translate-x-8"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold gradient-text mb-2">Welcome back, Coach!</h2>
          <p className="text-gray-600 mb-6">Here's what's happening with your students today.</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
              <TrendingUp size={16} />
              Overall progress up 15%
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              <Zap size={16} />
              3 students completed modules today
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div 
            key={index}
            className={`glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden ${stat.glowColor}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <stat.icon className="text-white" size={28} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-emerald-600' :
                  stat.changeType === 'neutral' ? 'text-gray-500' :
                  'text-blue-600'
                }`}>
                  {stat.change}
                </p>
                <div className="w-8 h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full animate-pulse`} style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/50 to-white/20 backdrop-blur-sm rounded-xl hover:from-white/70 hover:to-white/40 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${getActivityColor(activity.type)} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">{activity.message}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    {activity.course}
                  </span>
                  <span>{activity.time}</span>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-all duration-200">
                  <Star size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;