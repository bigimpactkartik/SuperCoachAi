import React, { useState } from 'react';
import { X, User, Mail, Phone, UserPlus } from 'lucide-react';
import { Student, Course } from '../types';

interface CreateStudentModalProps {
  onClose: () => void;
  onSubmit: (studentData: Partial<Student>, courseId?: number) => void;
  liveCourses: Course[];
}

const CreateStudentModal: React.FC<CreateStudentModalProps> = ({ onClose, onSubmit, liveCourses }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedCourse: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const studentData: Partial<Student> = {
      name: formData.name,
      email: formData.email,
      status: 'new',
      enrolledCourses: formData.selectedCourse ? [parseInt(formData.selectedCourse)] : [],
      progress: [],
      joinedAt: new Date().toISOString(),
      lastActivity: 'Just joined'
    };

    onSubmit(studentData, formData.selectedCourse ? parseInt(formData.selectedCourse) : undefined);
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="glass rounded-2xl p-8 w-full max-w-2xl mx-4 transform animate-slideUp shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <UserPlus className="text-white" size={20} />
            </div>
            <h3 className="text-2xl font-bold gradient-text">Add New Student</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                  errors.name 
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
                    : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500'
                }`}
                placeholder="Enter student's full name"
                required
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                  errors.email 
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
                    : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500'
                }`}
                placeholder="Enter student's email address"
                required
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                  errors.phone 
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
                    : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500'
                }`}
                placeholder="Enter student's phone number"
                required
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enroll in Course (Optional)
            </label>
            <select
              value={formData.selectedCourse}
              onChange={(e) => handleInputChange('selectedCourse', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            >
              <option value="">Select a course (optional)</option>
              {liveCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title} ({course.enrolledStudents} students enrolled)
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              You can enroll the student in a course now or add them later from the Students tab
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Student...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Add Student
              </>
            )}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Student Enrollment</h4>
              <p className="text-sm text-blue-800">
                New students can only be enrolled in live courses. Draft courses must be published first before students can join.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudentModal;