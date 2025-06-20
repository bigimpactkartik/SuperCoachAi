import React from 'react';
import { MessageCircle, Send, Mic, Zap, Target, Heart, Star } from 'lucide-react';

const MessagesTab = () => {
  const messageTypes = [
    { type: 'Follow-up Messages', count: 156, color: 'from-blue-500 to-indigo-600', icon: MessageCircle },
    { type: 'Encouragement', count: 89, color: 'from-emerald-500 to-teal-600', icon: Heart },
    { type: 'Feedback Requests', count: 42, color: 'from-purple-500 to-violet-600', icon: Star },
    { type: 'Testimonial Requests', count: 23, color: 'from-orange-500 to-red-500', icon: Target }
  ];

  const recentMessages = [
    {
      type: 'Follow-up: Mike Chen',
      message: '"Hi Mike! I noticed you haven\'t completed Module 3 yet. Would you like to schedule a quick call to discuss any challenges?"',
      time: '2 hours ago',
      gradient: 'from-blue-500 to-indigo-600',
      tags: ['Text', 'Auto-sent'],
      student: 'MC'
    },
    {
      type: 'Celebration: Sarah Johnson',
      message: '"Congratulations on completing Module 3! Your progress is impressive. Keep up the great work!"',
      time: '1 day ago',
      gradient: 'from-emerald-500 to-teal-600',
      tags: ['Voice', 'Auto-sent'],
      student: 'SJ'
    },
    {
      type: 'Feedback Request: Emma Rodriguez',
      message: '"Hi Emma! How are you finding the Leadership module? Your insights would be valuable for improving the course."',
      time: '3 hours ago',
      gradient: 'from-purple-500 to-violet-600',
      tags: ['Text', 'Scheduled'],
      student: 'ER'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">AI Message Center</h2>
          <p className="text-gray-600">Automated student engagement and communication hub</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
            <Zap size={20} />
            AI Settings
          </button>
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 flex items-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
            <Send size={20} />
            Send Message
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Message Types Sidebar */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="text-blue-600" size={24} />
              Message Analytics
            </h3>
            <div className="space-y-4">
              {messageTypes.map((item, index) => (
                <div key={index} className="group hover:bg-white/60 p-4 rounded-xl transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon size={20} className="text-white" />
                      </div>
                      <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {item.type}
                      </span>
                    </div>
                    <span className={`bg-gradient-to-r ${item.color} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
                      {item.count}
                    </span>
                  </div>
                  <div className="ml-13">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${(item.count / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="lg:col-span-3">
          <div className="glass rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MessageCircle className="text-purple-600" size={24} />
                Recent Messages
              </h3>
              <div className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                AI Active
              </div>
            </div>
            
            <div className="space-y-6">
              {recentMessages.map((msg, index) => (
                <div key={index} className="relative group">
                  <div className="glass-dark rounded-2xl p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                    {/* Gradient border effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${msg.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${msg.gradient} rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {msg.student}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                              {msg.type}
                            </p>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              {msg.time}
                            </span>
                          </div>
                          <p className="text-gray-700 bg-white/60 p-4 rounded-xl backdrop-blur-sm mb-3 italic border-l-4 border-gradient-to-b from-blue-500 to-purple-500">
                            {msg.message}
                          </p>
                          <div className="flex gap-2">
                            {msg.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                tagIndex === 0 ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium">
                          <MessageCircle size={14} />
                          Reply
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors duration-200 text-sm font-medium">
                          <Mic size={14} />
                          Voice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;