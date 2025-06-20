import React, { useState } from 'react';
import { Search, Filter, Users, TrendingUp, AlertTriangle, Plus, UserPlus } from 'lucide-react';
import { Student, Course } from '../types';
import StudentRow from './StudentRow';

interface StudentsTabProps {
  students: Student[];
  courses: Course[];
  onViewDetails: (student: Student) => void;
  onAddToCourse: (studentId: number, courseId: number) => void;
  onRemoveFromCourse: (studentId: number, courseId: number) => void;
}

const StudentsTab: React.FC<StudentsTabProps> = ({ 
  students, 
  courses, 
  onViewDetails, 
  onAddToCourse, 
  onRemoveFromCourse 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = !selectedCourse || student.enrolledCourses.includes(parseInt(selectedCourse));
    const matchesStatus = !selectedStatus || student.status === selectedStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const statusCounts = {
    new: students.filter(s => s.status === 'new').length,
    'in-progress': students.filter(s => s.status === 'in-progress').length,
    stuck: students.filter(s => s.status === 'stuck').length,
    completed: students.filter(s => s.status === 'completed').length
  };

  const avgProgress = Math.round(students.reduce((acc, s) => {
    const progress = s.progress.length > 0 
      ? (s.progress.filter(p => p.status === 'completed').length / s.progress.length) * 100 
      : 0;
    return acc + progress;
  }, 0) / students.length) || 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Student Management</h2>
          <p className="text-gray-600">Monitor and engage with your students' learning journey</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search students..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-white/80 backdrop-blur-sm min-w-64"
              />
            </div>
            
            <select 
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            >
              <option value="">All Courses</option>
              {courses.filter(c => c.status === 'live').map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
            
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="stuck">Stuck</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="glass rounded-xl p-6 hover:shadow-glow-blue transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-900">{students.length}</span>
          </div>
          <p className="text-sm font-semibold text-gray-600">Total Students</p>
        </div>
        
        <div className="glass rounded-xl p-6 hover:shadow-glow-green transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-emerald-600">{statusCounts['in-progress']}</span>
          </div>
          <p className="text-sm font-semibold text-gray-600">In Progress</p>
        </div>
        
        <div className="glass rounded-xl p-6 hover:shadow-glow-purple transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <AlertTriangle className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-orange-600">{statusCounts.stuck}</span>
          </div>
          <p className="text-sm font-semibold text-gray-600">Need Help</p>
        </div>
        
        <div className="glass rounded-xl p-6 hover:shadow-glow-green transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">{statusCounts.completed}</span>
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600">Completed</p>
        </div>
        
        <div className="glass rounded-xl p-6 hover:shadow-glow-purple transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">{avgProgress}%</span>
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600">Avg Progress</p>
        </div>
      </div>

      {/* Students List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {filteredStudents.length} Student{filteredStudents.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCourse && ` in ${courses.find(c => c.id === parseInt(selectedCourse))?.title}`}
            {selectedStatus && ` with status "${selectedStatus.replace('-', ' ')}"`}
          </h3>
        </div>
        
        <div className="space-y-4">
          {filteredStudents.map(student => (
            <StudentRow 
              key={student.id} 
              student={student} 
              courses={courses}
              onViewDetails={() => onViewDetails(student)}
              onAddToCourse={onAddToCourse}
              onRemoveFromCourse={onRemoveFromCourse}
            />
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Users size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsTab;