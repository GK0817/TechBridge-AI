import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { UserCheck, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null); // null | 'business' | 'director'

  if (!currentUser) {
    return (
      <div className="flex h-screen bg-[#0b0f19] items-center justify-center p-4 text-slate-100">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              TechBridge Portal Access
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Select your role environment to proceed
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setCurrentUser('business')}
              className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-xl font-medium text-sm transition shadow-lg cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              Business User Login
            </button>

            <button
              onClick={() => setCurrentUser('director')}
              className="w-full flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-500 text-white p-3.5 rounded-xl font-medium text-sm transition shadow-lg cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              Technical Director login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ChatInterface 
      userRole={currentUser} 
      onLogout={() => setCurrentUser(null)} 
    />
  );
}