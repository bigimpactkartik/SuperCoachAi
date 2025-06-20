import React, { useState } from 'react';
import { Users, BookOpen, MessageCircle, TrendingUp, Filter, Search } from 'lucide-react';
import { Student, Course } from '../types';
import StudentCard from './StudentCard';

interface HomePageProps {
  students: Student[];
  courses: Course[];
  onViewStudentDetails: (student: Student) => void;
}

const HomePage: React.FC<HomePageProps> = ({ students, courses, onViewStudentDetails }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statusCounts = {
    all: students.length,
    new: students.filter(s => s.status === 'new').length,
    'in-progress': students.filter(s => s.status === 'in-progress').length,
    stuck: students.filter(s => s.status === 'stuck').length,
    completed: students.filter(s => s.status === 'completed').length
  };

  const filteredStudents = students.filter(student => {
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
      case 'new': return Users;
      case 'in-progress': return TrendingUp;
      case 'stuck': return MessageCircle;
      case 'completed': return BookOpen;
      default: return Users;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-8 translate-x-8"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold gradient-text mb-4">SuperCoach AI Dashboard</h1>
          <p className="text-gray-600 text-lg mb-6">Monitor student progress and manage your coaching programs</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{courses.filter(c => c.status === 'live').length}</div>
              <div className="text-sm text-gray-600">Live Courses</div>
            </div>
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-2xl font-bold text-emerald-600">{students.length}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-2xl font-bold text-purple-600">{Math.round(students.reduce((acc, s) => acc + (s.progress.length > 0 ? s.progress.filter(p => p.status === 'completed').length / s.progress.length * 100 : 0), 0) / students.length)}%</div>
              <div className="text-sm text-gray-600">Avg Progress</div>
            </div>
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-2xl font-bold text-orange-600">{statusCounts.stuck}</div>
              <div className="text-sm text-gray-600">Need Help</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Status Overview</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => {
            const Icon = getStatusIcon(status);
            const isActive = selectedStatus === status;
            
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? `bg-gradient-to-r ${getStatusColor(status)} text-white shadow-lg` 
                    : 'bg-white/60 hover:bg-white/80 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <Icon size={24} />
                </div>
                <div className="text-2xl font-bold mb-1">{count}</div>
                <div className="text-sm capitalize">{status.replace('-', ' ')}</div>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => (
            <StudentCard 
              key={student.id} 
              student={student} 
              courses={courses}
              onClick={() => onViewStudentDetails(student)}
            />
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users size={48} className="mx-auto" />
            </div>
            <p className="text-gray-600">No students found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;