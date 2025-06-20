import React, { useState } from 'react';
import { Search, Filter, MessageCircle, Bot, User, Clock } from 'lucide-react';
import { Conversation, Student, SuperCoach } from '../types';

interface ConversationsTabProps {
  conversations: Conversation[];
  students: Student[];
  superCoaches: SuperCoach[];
  onViewConversation: (conversation: Conversation) => void;
}

const ConversationsTab: React.FC<ConversationsTabProps> = ({ 
  conversations, 
  students, 
  superCoaches, 
  onViewConversation 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSuperCoach, setSelectedSuperCoach] = useState('');

  const filteredConversations = conversations.filter(conversation => {
    const student = students.find(s => s.id === conversation.studentId);
    const superCoach = superCoaches.find(sc => sc.id === conversation.superCoachId);
    
    const matchesSearch = student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         superCoach?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSuperCoach = !selectedSuperCoach || conversation.superCoachId === parseInt(selectedSuperCoach);
    
    return matchesSearch && matchesSuperCoach;
  });

  const getTimeSince = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Conversation History</h2>
          <p className="text-gray-600">View and manage conversations between students and SuperCoaches</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 bg-white/80 backdrop-blur-sm min-w-64"
            />
          </div>
          
          <select 
            value={selectedSuperCoach}
            onChange={(e) => setSelectedSuperCoach(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          >
            <option value="">All SuperCoaches</option>
            {superCoaches.map(superCoach => (
              <option key={superCoach.id} value={superCoach.id}>{superCoach.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{conversations.length}</p>
              <p className="text-sm font-medium text-gray-600">Total Conversations</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{superCoaches.filter(sc => sc.isActive).length}</p>
              <p className="text-sm font-medium text-gray-600">Active Coaches</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">{new Set(conversations.map(c => c.studentId)).size}</p>
              <p className="text-sm font-medium text-gray-600">Students Engaged</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">{conversations.reduce((acc, c) => acc + c.messages.length, 0)}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">Messages</p>
              <p className="text-sm font-medium text-gray-600">Total Exchanged</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="glass rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Conversations</h3>
        
        <div className="space-y-4">
          {filteredConversations.map(conversation => {
            const student = students.find(s => s.id === conversation.studentId);
            const superCoach = superCoaches.find(sc => sc.id === conversation.superCoachId);
            const lastMessage = conversation.messages[conversation.messages.length - 1];
            
            if (!student || !superCoach) return null;

            return (
              <div 
                key={conversation.id}
                onClick={() => onViewConversation(conversation)}
                className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 cursor-pointer group"
              >
                {/* Student Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                  {student.avatar ? (
                    <img src={student.avatar} alt={student.name} className="w-full h-full rounded-xl object-cover" />
                  ) : (
                    student.name.charAt(0).toUpperCase()
                  )}
                </div>

                {/* Conversation Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {student.name}
                    </h4>
                    <span className="text-gray-400">↔</span>
                    <span className="text-sm font-medium text-gray-600">{superCoach.name}</span>
                  </div>
                  
                  {lastMessage && (
                    <p className="text-sm text-gray-600 line-clamp-1">
                      <span className="font-medium">
                        {lastMessage.senderType === 'student' ? student.name : superCoach.name}:
                      </span>
                      {' '}{lastMessage.content}
                    </p>
                  )}
                </div>

                {/* Message Count & Time */}
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageCircle size={14} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">{conversation.messages.length}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>{getTimeSince(conversation.lastMessageAt)}</span>
                  </div>
                </div>

                {/* SuperCoach Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white">
                  {superCoach.avatar ? (
                    <img src={superCoach.avatar} alt={superCoach.name} className="w-full h-full rounded-lg object-cover" />
                  ) : (
                    <Bot size={16} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredConversations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MessageCircle size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No conversations found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationsTab;