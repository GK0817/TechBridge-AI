import React from 'react';
import { CheckCircle2, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

export const RecommendationCard = ({ recommendation }) => {
  if (!recommendation) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200 space-y-4 shadow-2xl max-w-xl">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">
              {recommendation.product || 'Pair Enterprise Platform'}
            </h3>
            <span className="text-xs text-indigo-400 font-medium">Enterprise Product Match</span>
          </div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {recommendation.fitScore || 98}% Fit Score
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-2">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Key Features & Capabilities
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-300">
          {recommendation.reasons && recommendation.reasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔥 NEW SECTION: OTHER EVALUATED PRODUCTS WITH MATCH PERCENTAGES */}
      <div className="pt-2 border-t border-slate-800/80">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Other Evaluated Products
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between">
            <span className="text-slate-300 font-medium">DUCO Engine</span>
            <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono px-2 py-0.5 rounded-md font-bold">
              50% Match
            </span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between">
            <span className="text-slate-300 font-medium">TLM Platform</span>
            <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono px-2 py-0.5 rounded-md font-bold">
              68% Match
            </span>
          </div>
        </div>
      </div>

      {/* Contact Box */}
      <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl space-y-2 text-xs">
        <p className="text-slate-400 font-medium">
          To onboard this product or schedule a technical demo, please get in touch with:
        </p>
        <div className="text-slate-300">
          <p className="font-semibold text-white">
            Neha Baglkot <span className="text-indigo-400 font-normal">(Director)</span>
          </p>
          <p className="text-slate-400">Phone: +91 98765 43210</p>
          <p className="text-slate-400">Email: neha.baglkot@techbridge.com</p>
        </div>
        <a
          href="msteams://teams.microsoft.com/l/chat/0/0?users=neha.baglkot@techbridge.com"
          className="inline-flex items-center gap-2 bg-[#5B5FC7] hover:bg-[#4F52B2] text-white px-3.5 py-2 rounded-xl text-xs font-medium transition shadow-md mt-1"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Chat on Microsoft Teams
        </a>
      </div>
    </div>
  );
};