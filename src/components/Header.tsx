import React, { useState } from 'react';
import { Target, Bell, Settings, User, LogOut } from 'lucide-react';
import ProfileModal from './ProfileModal';
import { useSupabase } from '../hooks/useSupabase';

const Header = () => {
  const { currentCoach, updateCoachProfile, logout } = useSupabase();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleUpdateProfile = async (coachData: any) => {
    await updateCoachProfile(coachData);
  };

  const handleLogout = () => {
    logout();
  };

  // Get the first letter of the coach's name for the avatar
  const getInitial = (name: string) => {
    if (name.toLowerCase().includes('merlin')) {
      return 'M';
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <header className="glass sticky top-0 z-40 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-glow-blue transition-all duration-300 transform hover:scale-110 animate-float">
                  <Target className="text-white" size={22} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">SuperCoach AI</h1>
                <p className="text-xs text-gray-500 -mt-1">Your AI-Powered Learning Companion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-3 text-gray-600 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm rounded-xl transition-all duration-200 transform hover:scale-110 group">
                <Bell size={20} className="group-hover:animate-bounce-gentle" />
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  3
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 p-2 hover:bg-white/50 backdrop-blur-sm rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-glow-green">
                      {getInitial(currentCoach?.name || 'Coach')}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 text-center max-w-20 truncate">
                      {currentCoach?.email || 'coach@supercoach.ai'}
                    </div>
                  </div>
                  <Settings size={16} className="text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-64 glass rounded-xl p-4 shadow-2xl border border-white/20 z-50 animate-slideDown">
                    <div className="text-center mb-4 pb-4 border-b border-white/30">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 shadow-lg">
                        {getInitial(currentCoach?.name || 'Coach')}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{currentCoach?.name || 'Coach'}</div>
                      <div className="text-xs text-gray-600">{currentCoach?.email || 'coach@supercoach.ai'}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setShowProfileModal(true);
                          setShowDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                      >
                        <User size={16} />
                        Manage Profile
                      </button>
                      
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <LogOut size={16} />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfileModal && currentCoach && (
        <ProfileModal
          coach={currentCoach}
          onClose={() => setShowProfileModal(false)}
          onUpdateProfile={handleUpdateProfile}
          onLogout={handleLogout}
        />
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </>
  );
};

export default Header;