import React, { useState } from 'react';
import { X, Bot } from 'lucide-react';
import { SuperCoach } from '../types';

interface EditSuperCoachModalProps {
  superCoach: SuperCoach;
  onClose: () => void;
  onSubmit: (superCoachData: Partial<SuperCoach>) => void;
}

const EditSuperCoachModal: React.FC<EditSuperCoachModalProps> = ({ superCoach, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: superCoach.name,
    email: superCoach.email,
    phone: superCoach.phone || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="glass rounded-2xl p-8 w-full max-w-2xl mx-4 transform animate-slideUp shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Bot className="text-white" size={20} />
            </div>
            <h3 className="text-2xl font-bold gradient-text">Edit SuperCoach</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Coach Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 bg-white/80 backdrop-blur-sm" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 bg-white/80 backdrop-blur-sm" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (Optional)</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 bg-white/80 backdrop-blur-sm" 
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
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
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
            >
              Update SuperCoach
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSuperCoachModal;