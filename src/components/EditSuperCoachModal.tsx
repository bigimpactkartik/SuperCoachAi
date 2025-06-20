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
    personalityType: superCoach.personalityType,
    description: superCoach.description,
    avatar: superCoach.avatar
  });

  const personalityTypes = [
    { value: 'friendly', label: 'Friendly', description: 'Warm, approachable, and encouraging' },
    { value: 'professional', label: 'Professional', description: 'Formal, structured, and business-focused' },
    { value: 'motivational', label: 'Motivational', description: 'Energetic, inspiring, and goal-oriented' },
    { value: 'supportive', label: 'Supportive', description: 'Empathetic, patient, and understanding' },
    { value: 'direct', label: 'Direct', description: 'Straightforward, concise, and results-driven' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getPersonalityColor = (type: string) => {
    switch (type) {
      case 'friendly': return 'from-emerald-500 to-teal-600';
      case 'professional': return 'from-blue-500 to-indigo-600';
      case 'motivational': return 'from-orange-500 to-red-500';
      case 'supportive': return 'from-purple-500 to-violet-600';
      case 'direct': return 'from-gray-500 to-slate-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="glass rounded-2xl p-8 w-full max-w-2xl mx-4 transform animate-slideUp shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${getPersonalityColor(superCoach.personalityType)} rounded-xl flex items-center justify-center`}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Avatar URL (Optional)</label>
              <input 
                type="url" 
                value={formData.avatar}
                onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 bg-white/80 backdrop-blur-sm" 
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 h-24 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Personality Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {personalityTypes.map((type) => (
                <label
                  key={type.value}
                  className={`relative flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    formData.personalityType === type.value
                      ? `border-transparent bg-gradient-to-r ${getPersonalityColor(type.value)} text-white`
                      : 'border-gray-200 hover:border-gray-300 bg-white/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="personalityType"
                    value={type.value}
                    checked={formData.personalityType === type.value}
                    onChange={(e) => setFormData({...formData, personalityType: e.target.value as SuperCoach['personalityType']})}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-semibold mb-1">{type.label}</div>
                    <div className={`text-sm ${formData.personalityType === type.value ? 'text-white/90' : 'text-gray-600'}`}>
                      {type.description}
                    </div>
                  </div>
                  {formData.personalityType === type.value && (
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-current rounded-full"></div>
                    </div>
                  )}
                </label>
              ))}
            </div>
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
              className={`flex-1 bg-gradient-to-r ${getPersonalityColor(superCoach.personalityType)} text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl`}
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