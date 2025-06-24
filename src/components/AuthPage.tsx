import React, { useState } from 'react';
import { Target, User, Mail, Phone, ArrowRight, Sparkles, Shield, Zap, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthPageProps {
  onAuthenticated: (name: string, email: string, phone?: string) => Promise<void>;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    if (!phone) return !isSignUp; // Phone required for signup, optional for signin
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

    if (isSignUp) {
      // Sign up validation
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required for registration';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    } else {
      // Sign in validation - only name and phone
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required for sign in';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    try {
      // Check if coach already exists
      const { data: existingCoach } = await supabase
        .from('coaches')
        .select('*')
        .eq('email', formData.email)
        .single();

      if (existingCoach) {
        setErrors({ email: 'A coach with this email already exists' });
        return;
      }

      // Create new coach
      const { data: newCoach, error } = await supabase
        .from('coaches')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
        .select()
        .single();

      if (error) throw error;

      // Auto sign in after successful registration
      await onAuthenticated(formData.name, formData.email, formData.phone);
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({ email: 'Registration failed. Please try again.' });
    }
  };

  const handleSignIn = async () => {
    try {
      // Find coach by name and phone
      const { data: coach, error } = await supabase
        .from('coaches')
        .select('*')
        .eq('name', formData.name)
        .eq('phone', formData.phone)
        .single();

      if (error || !coach) {
        throw new Error('Invalid credentials - coach not found');
      }

      await onAuthenticated(coach.name, coach.email, coach.phone);
    } catch (err) {
      console.error('Sign in error:', err);
      setErrors({ phone: 'Invalid credentials. Please check your name and phone number.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      if (isSignUp) {
        await handleSignUp();
      } else {
        await handleSignIn();
      }
    } catch (err) {
      console.error('Authentication error:', err);
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

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: '', email: '', phone: '' });
    setErrors({});
  };

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Learning",
      description: "Personalized coaching with advanced AI technology"
    },
    {
      icon: Shield,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics"
    },
    {
      icon: Sparkles,
      title: "Interactive Content",
      description: "Engaging modules designed for maximum retention"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Target size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">SuperCoach AI</h1>
                <p className="text-white/80">Coach Dashboard</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              {isSignUp ? 'Join SuperCoach AI' : 'Welcome Back to SuperCoach AI'}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {isSignUp 
                ? 'Create your coach account and start managing students with AI-powered insights.'
                : 'Access your coaching dashboard to monitor student progress and provide personalized guidance.'
              }
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                  <feature.icon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Target size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">SuperCoach AI</h1>
              <p className="text-sm text-gray-600">Coach Dashboard</p>
            </div>
          </div>

          <div className="glass rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-2">
                {isSignUp ? 'Create Account' : 'Coach Sign In'}
              </h2>
              <p className="text-gray-600">
                {isSignUp 
                  ? 'Register as a new coach to get started'
                  : 'Enter your credentials to access the dashboard'
                }
              </p>
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
                    placeholder="Enter your full name"
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

              {/* Email Field - Only for Sign Up */}
              {isSignUp && (
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
                      placeholder="coach@supercoach.ai"
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
              )}

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
                        : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                    placeholder="+1 (555) 123-4567"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </>
                ) : (
                  <>
                    {isSignUp ? <UserPlus size={20} /> : <ArrowRight size={20} />}
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </>
                )}
              </button>

              {/* Toggle Mode */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign In' 
                    : "Don't have an account? Sign Up"
                  }
                </button>
              </div>
            </form>

            {/* Demo Info - Only show for Sign In */}
            {!isSignUp && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Demo Access</h4>
                    <p className="text-sm text-blue-800 mb-2">
                      Use any coach name and phone number from the coaches table to sign in.
                    </p>
                    <p className="text-xs text-blue-700">
                      Example: Coach Maya, +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Features */}
          <div className="lg:hidden mt-8 space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 glass rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <feature.icon size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;