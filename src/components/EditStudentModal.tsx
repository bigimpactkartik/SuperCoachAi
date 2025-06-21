import React, { useState } from 'react';
import { X, User, Mail, Phone, Save } from 'lucide-react';
import { Student } from '../types';

interface EditStudentModalProps {
  student: Student;
  onClose: () => void;
  onSubmit: (studentData: Partial<Student>) => void;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ student, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    phone: '', // Will be populated from database when available
    telegram_id: '', // Will be populated from database when available
    about: '' // Will be populated from database when available
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
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

    if (formData.phone && !validatePhone(formData.phone)) {
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
    
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Failed to update student:', err);
    } finally {
      setIsLoading(false);
    }
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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
            <h3 className="text-2xl font-bold gradient-text">Edit Student</h3>
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
                    : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
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
                    : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
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
              Phone Number (Optional)
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
                    : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
                placeholder="Enter student's phone number"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Telegram ID Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Telegram ID (Optional)
            </label>
            <input
              type="text"
              value={formData.telegram_id}
              onChange={(e) => handleInputChange('telegram_id', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
              placeholder="@username or telegram ID"
            />
          </div>

          {/* About Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              About (Optional)
            </label>
            <textarea
              value={formData.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
              rows={3}
              placeholder="Additional information about the student..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 mt-8">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Update Student
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;