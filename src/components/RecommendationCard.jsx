import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Zap, Layers } from 'lucide-react';

export const RecommendationCard = ({ recommendation }) => {
  const { product, fitScore, reasons } = recommendation || {};

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 border border-indigo-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md max-w-xl my-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600/20 rounded-lg border border-indigo-500/40 text-indigo-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide">{product || 'DBPair'}</h3>
            <p className="text-xs text-slate-400">Enterprise Product Match</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>{fitScore || 94}% Fit Score</span>
        </div>
      </div>

      {/* Capabilities Highlights */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-indigo-400" /> Key Features & Capabilities
        </p>
        <ul className="space-y-2">
          {(reasons || [
            "Supports high-volume reconciliation",
            "Front Office vs Back Office file matching",
            "Automated exception & break management"
          ]).map((reason, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA Button */}
      <button className="w-full mt-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group">
        <span>Request Product Onboarding</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};