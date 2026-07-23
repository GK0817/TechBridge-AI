import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const RecommendationCard = ({ recommendation }) => {
  const contact = {
    name: 'Neha Baglkot',
    role: 'Director',
    phone: '+91 98765 43210',
    email: 'neha.baglkot@techbridge.com'
  };

  return (
    <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-5 max-w-2xl text-slate-200 space-y-4 shadow-2xl animate-in fade-in duration-300">
      
      {/* Product Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              {recommendation.product}
            </h3>
            <span className="text-xs text-indigo-400 font-medium">
              Enterprise Product Match
            </span>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{recommendation.fitScore}% Fit Score</span>
        </div>
      </div>

      {/* Key Reasons / Features */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Key Features & Capabilities
        </h4>
        <ul className="space-y-2 text-xs text-slate-300">
          {recommendation.reasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-2 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact & Onboarding Section with MS Teams Integration */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 space-y-3 text-xs pt-3">
        <p className="text-slate-200 font-medium">
          To onboard this product or schedule a technical demo, please get in touch with:
        </p>

        <div className="space-y-1 text-slate-400">
          <p className="text-white font-semibold text-sm">
            {contact.name} <span className="text-xs font-normal text-indigo-400">({contact.role})</span>
          </p>
          <p>Phone: {contact.phone}</p>
          <p>Email: {contact.email}</p>
        </div>

        <a
          href={`msteams://teams.microsoft.com/l/chat/0/0?users=${contact.email}`}
          className="inline-flex items-center gap-2 bg-[#5B5FC7] hover:bg-[#4F52B2] text-white px-4 py-2.5 rounded-xl text-xs font-medium transition shadow-md mt-1"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm-7 13.5h-5v-1.5h5v1.5zm3-4h-8v-1.5h8v1.5zm0-4h-8V7h8v1.5z" />
          </svg>
          Chat on Microsoft Teams
        </a>
      </div>

    </div>
  );
};