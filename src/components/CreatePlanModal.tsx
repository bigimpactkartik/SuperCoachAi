import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface CreatePlanModalProps {
  onClose: () => void;
}

const CreatePlanModal: React.FC<CreatePlanModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    course: '',
    planName: '',
    startDate: '',
    endDate: '',
    milestones: [{ title: '', date: '' }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating plan:', formData);
    onClose();
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { title: '', date: '' }]
    }));
  };

  const updateMilestone = (index: number, field: 'title' | 'date', value: string) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => 
        i === index ? { ...milestone, [field]: value } : milestone
      )
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 w-full max-w-2xl mx-4 transform animate-slideUp shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Completion Plan
          </h3>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Course</label>
              <select 
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                required
              >
                <option value="">Choose a course...</option>
                <option value="digital-marketing">Digital Marketing Mastery</option>
                <option value="leadership">Leadership Excellence</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Plan Name</label>
              <input 
                type="text" 
                value={formData.planName}
                onChange={(e) => setFormData({...formData, planName: e.target.value})}
                placeholder="e.g., 30-Day Completion Challenge"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
              <input 
                type="date" 
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
              <input 
                type="date" 
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Milestones</label>
            <div className="space-y-3">
              {formData.milestones.map((milestone, index) => (
                <div key={index} className="flex gap-3">
                  <input 
                    type="text" 
                    value={milestone.title}
                    onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                    placeholder={`Milestone ${index + 1}`}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  />
                  <input 
                    type="date" 
                    value={milestone.date}
                    onChange={(e) => updateMilestone(index, 'date', e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  />
                </div>
              ))}
              <button 
                type="button"
                onClick={addMilestone}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2 mt-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                <Plus size={16} /> Add Milestone
              </button>
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
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
            >
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanModal;