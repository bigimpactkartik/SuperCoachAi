import React, { useState } from 'react';
import { X, BookOpen, Plus, Trash2 } from 'lucide-react';
import { Course, Module, Task } from '../types';

interface CreateCourseModalProps {
  onClose: () => void;
  onSubmit: (courseData: Partial<Course>) => void;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    modules: [] as Module[]
  });

  const addModule = () => {
    const newModule: Module = {
      id: Date.now(),
      title: '',
      description: '',
      tasks: [],
      order: formData.modules.length + 1
    };
    setFormData({
      ...formData,
      modules: [...formData.modules, newModule]
    });
  };

  const updateModule = (moduleId: number, field: keyof Module, value: any) => {
    setFormData({
      ...formData,
      modules: formData.modules.map(module =>
        module.id === moduleId ? { ...module, [field]: value } : module
      )
    });
  };

  const removeModule = (moduleId: number) => {
    setFormData({
      ...formData,
      modules: formData.modules.filter(module => module.id !== moduleId)
    });
  };

  const addTask = (moduleId: number) => {
    const module = formData.modules.find(m => m.id === moduleId);
    if (!module) return;

    const newTask: Task = {
      id: Date.now(),
      title: '',
      description: '',
      type: 'video',
      order: module.tasks.length + 1,
      estimatedTime: 30
    };

    updateModule(moduleId, 'tasks', [...module.tasks, newTask]);
  };

  const updateTask = (moduleId: number, taskId: number, field: keyof Task, value: any) => {
    const module = formData.modules.find(m => m.id === moduleId);
    if (!module) return;

    const updatedTasks = module.tasks.map(task =>
      task.id === taskId ? { ...task, [field]: value } : task
    );

    updateModule(moduleId, 'tasks', updatedTasks);
  };

  const removeTask = (moduleId: number, taskId: number) => {
    const module = formData.modules.find(m => m.id === moduleId);
    if (!module) return;

    const updatedTasks = module.tasks.filter(task => task.id !== taskId);
    updateModule(moduleId, 'tasks', updatedTasks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="glass rounded-2xl p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto transform animate-slideUp shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <BookOpen className="text-white" size={20} />
            </div>
            <h3 className="text-2xl font-bold gradient-text">Create New Course</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white/80 backdrop-blur-sm" 
                placeholder="e.g., Advanced Digital Marketing"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 h-24 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                placeholder="Describe your course objectives and content..."
                required
              />
            </div>
          </div>

          {/* Modules */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-gray-700">Course Modules</label>
              <button 
                type="button"
                onClick={addModule}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
              >
                <Plus size={16} />
                Add Module
              </button>
            </div>

            <div className="space-y-4">
              {formData.modules.map((module, moduleIndex) => (
                <div key={module.id} className="border border-gray-200 rounded-xl p-4 bg-white/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Module {moduleIndex + 1}</h4>
                    <button 
                      type="button"
                      onClick={() => removeModule(module.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mb-4">
                    <input 
                      type="text" 
                      value={module.title}
                      onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                      placeholder="Module title"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    />
                    <textarea 
                      value={module.description}
                      onChange={(e) => updateModule(module.id, 'description', e.target.value)}
                      placeholder="Module description"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 h-16 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Tasks */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Tasks</span>
                      <button 
                        type="button"
                        onClick={() => addTask(module.id)}
                        className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <Plus size={12} />
                        Add Task
                      </button>
                    </div>

                    <div className="space-y-2">
                      {module.tasks.map((task, taskIndex) => (
                        <div key={task.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <input 
                            type="text" 
                            value={task.title}
                            onChange={(e) => updateTask(module.id, task.id, 'title', e.target.value)}
                            placeholder={`Task ${taskIndex + 1}`}
                            className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500"
                          />
                          <select 
                            value={task.type}
                            onChange={(e) => updateTask(module.id, task.id, 'type', e.target.value)}
                            className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500"
                          >
                            <option value="video">Video</option>
                            <option value="reading">Reading</option>
                            <option value="quiz">Quiz</option>
                            <option value="assignment">Assignment</option>
                          </select>
                          <input 
                            type="number" 
                            value={task.estimatedTime}
                            onChange={(e) => updateTask(module.id, task.id, 'estimatedTime', parseInt(e.target.value))}
                            placeholder="30"
                            className="w-16 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500"
                          />
                          <span className="text-xs text-gray-500">min</span>
                          <button 
                            type="button"
                            onClick={() => removeTask(module.id, task.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;