import React from 'react';
import { useFlow } from '../context/FlowContext';
import { X, CheckCircle2, AlertTriangle, User, Award, ExternalLink } from 'lucide-react';

export const UXInspectorModal = () => {
  const { activeAnnotation, setActiveAnnotationId } = useFlow();

  if (!activeAnnotation) return null;

  return (
    <div className="fixed bottom-6 right-6 max-w-md w-full bg-neutral-900/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-neutral-800 pb-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
              UX Audit Analysis
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              BIS Master Project
            </span>
          </div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            {activeAnnotation.title}
          </h3>
        </div>
        <button
          onClick={() => setActiveAnnotationId(null)}
          className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Author & Heuristic */}
      <div className="space-y-2 mb-3 text-xs">
        <div className="flex items-center gap-2 text-neutral-300">
          <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="font-semibold text-neutral-200">Researcher:</span>
          <span>{activeAnnotation.author}</span>
        </div>
        <div className="flex items-start gap-2 text-neutral-300">
          <Award className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-neutral-200">Heuristic / Standard:</span>
            <p className="text-neutral-400 mt-0.5">{activeAnnotation.heuristic}</p>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-2.5 text-xs">
        <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-red-400 font-semibold mb-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Problem Audited (Report 1):</span>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            {activeAnnotation.problem}
          </p>
        </div>

        <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Redesign Fix (Report 2):</span>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            {activeAnnotation.solution}
          </p>
        </div>
      </div>

      {/* Footer hint */}
      <div className="mt-3 pt-2 text-right">
        <span className="text-[11px] text-neutral-500">Click anywhere outside to dismiss</span>
      </div>
    </div>
  );
};
