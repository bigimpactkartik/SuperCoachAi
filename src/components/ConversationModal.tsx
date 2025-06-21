import React from 'react';
import { X, MessageCircle, Bot, User, Clock } from 'lucide-react';
import { Conversation, Student, SuperCoach } from '../types';

interface ConversationModalProps {
  conversation: Conversation;
  student?: Student;
  superCoach?: SuperCoach;
  onClose: () => void;
}

const ConversationModal: React.FC<ConversationModalProps> = ({ 
  conversation, 
  student, 
  superCoach, 
  onClose 
}) => {
  const getTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="glass rounded-2xl p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden transform animate-slideUp shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {/* Student Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                {student?.avatar ? (
                  <img src={student.avatar} alt={student.name} className="w-full h-full rounded-xl object-cover" />
                ) : (
                  student?.name.charAt(0).toUpperCase() || 'S'
                )}
              </div>
              
              <span className="text-gray-400">↔</span>
              
              {/* SuperCoach Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white">
                <Bot size={20} />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold gradient-text">
                {student?.name || 'Student'} & {superCoach?.name || 'SuperCoach'}
              </h3>
              <p className="text-gray-600 text-sm">
                {conversation.messages.length} messages • Started {new Date(conversation.startedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto space-y-4 mb-6 pr-2">
          {conversation.messages.map(message => {
            const isStudent = message.senderType === 'student';
            
            return (
              <div key={message.id} className={`flex gap-3 ${isStudent ? 'justify-start' : 'justify-end'}`}>
                {isStudent && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {student?.avatar ? (
                      <img src={student.avatar} alt={student.name} className="w-full h-full rounded-lg object-cover" />
                    ) : (
                      student?.name.charAt(0).toUpperCase() || 'S'
                    )}
                  </div>
                )}
                
                <div className={`max-w-xs lg:max-w-md ${isStudent ? 'order-2' : 'order-1'}`}>
                  <div className={`p-3 rounded-2xl ${
                    isStudent 
                      ? 'bg-blue-100 text-blue-900' 
                      : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${isStudent ? 'justify-start' : 'justify-end'}`}>
                    <Clock size={10} />
                    <span>{getTimestamp(message.timestamp)}</span>
                  </div>
                </div>
                
                {!isStudent && (
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    <Bot size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Conversation Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-dark rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <MessageCircle className="text-white" size={16} />
            </div>
            <div className="text-lg font-bold text-gray-900">{conversation.messages.length}</div>
            <div className="text-xs text-gray-600">Total Messages</div>
          </div>

          <div className="glass-dark rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <User className="text-white" size={16} />
            </div>
            <div className="text-lg font-bold text-emerald-600">
              {conversation.messages.filter(m => m.senderType === 'student').length}
            </div>
            <div className="text-xs text-gray-600">Student Messages</div>
          </div>

          <div className="glass-dark rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Bot className="text-white" size={16} />
            </div>
            <div className="text-lg font-bold text-orange-600">
              {conversation.messages.filter(m => m.senderType === 'supercoach').length}
            </div>
            <div className="text-xs text-gray-600">Coach Messages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationModal;