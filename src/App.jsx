import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { UserCheck, Shield, Sparkles, KeyRound, Lock, ArrowLeft, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null); // null | 'business' | 'director'
  const [selectedRole, setSelectedRole] = useState(null); // Step 1: role selected ('business' | 'director')
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Step 2: Handle Final Login after Password Submission
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg('Please enter a password to proceed!');
      return;
    }
    setErrorMsg('');
    setCurrentUser(selectedRole); // Log in to selected role
  };

  // Reset Step back to Role Selection
  const handleBackToRoles = () => {
    setSelectedRole(null);
    setPassword('');
    setErrorMsg('');
  };

  if (!currentUser) {
    return (
      <div className="flex h-screen bg-[#0b0f19] items-center justify-center p-4 text-slate-100 font-sans">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full text-center space-y-6 shadow-2xl transition-all">
          
          {/* Header Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              TechBridge Portal Access
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {!selectedRole 
                ? "Select your role environment to proceed" 
                : `Authentication required for ${selectedRole === 'business' ? 'Business User' : 'Technical Director'}`
              }
            </p>
          </div>

          {/* STEP 1: Select Role Buttons */}
          {!selectedRole ? (
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedRole('business')}
                className="w-full flex items-center justify-between bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-xl font-medium text-sm transition shadow-lg cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4" />
                  <span>Business User Login</span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('director')}
                className="w-full flex items-center justify-between bg-amber-600 hover:bg-amber-500 text-white p-3.5 rounded-xl font-medium text-sm transition shadow-lg cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4" />
                  <span>Technical Director Login</span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            /* STEP 2: Password Authentication Form (Appears after clicking Role Button) */
            <form onSubmit={handleFinalSubmit} className="space-y-4 pt-1 text-left animate-in fade-in zoom-in-95 duration-200">
              
              {/* Selected Role Badge */}
              <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Selected Role:</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${
                  selectedRole === 'business' 
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                }`}>
                  {selectedRole === 'business' ? 'Business Analyst' : 'Technical Director'}
                </span>
              </div>

              {/* Password Input Field */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Enter Password
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type="password"
                    autoFocus
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Enter password (any value permitted)..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition shadow-inner"
                  />
                </div>
                {errorMsg && (
                  <p className="text-[11px] text-red-400 mt-1">{errorMsg}</p>
                )}
                <p className="text-[10px] text-slate-500 italic mt-1">
                  * Demo Authentication: Enter any passcode to enter.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleBackToRoles}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>

                <button
                  type="submit"
                  className={`flex-[2] text-white py-3 rounded-xl text-xs font-semibold transition shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                    selectedRole === 'business'
                      ? 'bg-indigo-600 hover:bg-indigo-500'
                      : 'bg-amber-600 hover:bg-amber-500'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authenticate Access</span>
                </button>
              </div>
            </form>
          )}

          <div className="border-t border-slate-800/80 pt-3 text-[10px] text-slate-500">
            Enterprise Security Governance • Multi-Role Access Control
          </div>

        </div>
      </div>
    );
  }

  return (
    <ChatInterface 
      userRole={currentUser} 
      onLogout={() => {
        setCurrentUser(null);
        setSelectedRole(null);
        setPassword('');
      }} 
    />
  );
}