import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, CheckCircle, AlertCircle, User, Target } from 'lucide-react';
import { Promise, Student, Task } from '../types';

interface PromisesTabProps {
  promises: Promise[];
  students: Student[];
  tasks: Task[];
}

const PromisesTab: React.FC<PromisesTabProps> = ({ promises, students, tasks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredPromises = promises.filter(promise => {
    const student = students.find(s => s.id === promise.studentId);
    const task = tasks.find(t => t.id === promise.taskId);
    
    const matchesSearch = student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task?.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !selectedStatus || 
                         (selectedStatus === 'checked' && promise.checked) ||
                         (selectedStatus === 'unchecked' && !promise.checked) ||
                         (selectedStatus === 'overdue' && new Date(promise.dueDate) < new Date() && !promise.checked);
    
    return matchesSearch && matchesStatus;
  });

  const getTimeSince = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const isOverdue = (dueDate: string, checked: boolean) => {
    return new Date(dueDate) < new Date() && !checked;
  };

  const statusCounts = {
    total: promises.length,
    checked: promises.filter(p => p.checked).length,
    unchecked: promises.filter(p => !p.checked).length,
    overdue: promises.filter(p => isOverdue(p.dueDate, p.checked)).length
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Student Promises</h2>
          <p className="text-gray-600">Track student commitments and task completion promises</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search promises..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 bg-white/80 backdrop-blur-sm min-w-64"
            />
          </div>
          
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          >
            <option value="">All Promises</option>
            <option value="checked">Completed</option>
            <option value="unchecked">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
              <Calendar className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
              <p className="text-sm font-medium text-gray-600">Total Promises</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">{statusCounts.checked}</p>
              <p className="text-sm font-medium text-gray-600">Completed</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{statusCounts.unchecked}</p>
              <p className="text-sm font-medium text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
              <AlertCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{statusCounts.overdue}</p>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Promises List */}
      <div className="glass rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Promises</h3>
        
        <div className="space-y-4">
          {filteredPromises.map(promise => {
            const student = students.find(s => s.id === promise.studentId);
            const task = tasks.find(t => t.id === promise.taskId);
            const overdue = isOverdue(promise.dueDate, promise.checked);
            
            if (!student || !task) return null;

            return (
              <div 
                key={promise.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer group ${
                  promise.checked 
                    ? 'bg-emerald-50 border border-emerald-200' 
                    : overdue 
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-white/60 backdrop-blur-sm hover:bg-white/80'
                }`}
              >
                {/* Student Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                  {student.avatar ? (
                    <img src={student.avatar} alt={student.name} className="w-full h-full rounded-xl object-cover" />
                  ) : (
                    student.name.charAt(0).toUpperCase()
                  )}
                </div>

                {/* Promise Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {student.name}
                    </h4>
                    <span className="text-gray-400">→</span>
                    <span className="text-sm font-medium text-gray-600">{task.title}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Promise: {new Date(promise.promiseDatetime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target size={14} />
                      <span>Due: {new Date(promise.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>Created {getTimeSince(promise.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="text-right">
                  {promise.checked ? (
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle size={20} />
                      <span className="font-medium">Completed</span>
                    </div>
                  ) : overdue ? (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle size={20} />
                      <span className="font-medium">Overdue</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-blue-600">
                      <Clock size={20} />
                      <span className="font-medium">Pending</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredPromises.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No promises found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromisesTab;