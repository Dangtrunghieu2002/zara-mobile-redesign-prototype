import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import {
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BarChart3,
  RotateCcw,
  Smartphone,
  Award,
  AlertCircle
} from 'lucide-react';

export const EvaluationSurveyView = () => {
  const {
    EVALUATION_GROUPS,
    EVALUATION_ITEMS,
    surveyRatings,
    setFeatureRating,
    submitCurrentUserSurvey,
    resetSurveyRatings,
    setAppViewMode,
    navigateTo,
  } = useFlow();

  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  // Calculate completion percentage
  const totalCount = EVALUATION_ITEMS.length;
  const completedCount = EVALUATION_ITEMS.filter(item => {
    const r = surveyRatings[item.id];
    return r && r.o && r.n && r.p;
  }).length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const activeGroup = EVALUATION_GROUPS[activeGroupIndex] || EVALUATION_GROUPS[0];

  const handleJumpToFlow = (flowId) => {
    navigateTo(flowId, 'nav');
    setAppViewMode('prototype');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Top Banner & Instructions */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 border border-neutral-700/80 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                Master BIS · Usability Evaluation
              </span>
              <span className="text-xs text-neutral-400 font-mono">17 Tested Heuristics</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Zara Mobile Redesign · Usability Assessment
            </h1>
            <p className="text-xs md:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
              Score each redesigned feature based on Jakob Nielsen’s 10 Heuristics and Apple HIG guidelines. You can tap <strong>"View on Phone"</strong> on any item to instantly test it on the interactive dual prototype.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="bg-black/60 border border-neutral-700 p-4 rounded-xl shrink-0 flex flex-col items-center justify-center min-w-[170px]">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">Progress</span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">{completedCount}</span>
              <span className="text-neutral-500 font-mono text-sm">/ {totalCount}</span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-400 font-mono mt-1">{progressPct}% Completed</span>
          </div>
        </div>
      </div>

      {/* Group Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {EVALUATION_GROUPS.map((group, idx) => {
          const groupCompleted = group.items.every(it => {
            const r = surveyRatings[it.id];
            return r && r.o && r.n && r.p;
          });
          const isActive = activeGroupIndex === idx;

          return (
            <button
              key={group.id}
              onClick={() => setActiveGroupIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border cursor-pointer ${
                isActive
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-neutral-900/90 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
              }`}
            >
              {groupCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
              <span>{group.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  isActive ? 'bg-neutral-200 text-neutral-900' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {group.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feature Questionnaire Cards */}
      <div className="space-y-4">
        {activeGroup.items.map((item, index) => {
          const rating = surveyRatings[item.id] || {};
          const isComplete = rating.o && rating.n && rating.p;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 transition-all duration-200 ${
                isComplete
                  ? 'bg-neutral-900/80 border-emerald-500/40 shadow-sm'
                  : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-neutral-800 pb-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700 font-bold">
                      #{index + 1}
                    </span>
                    <span className="text-xs font-bold text-white">{item.title}</span>
                    {isComplete && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[11px] font-mono">{item.heuristic}</span>
                  </div>
                </div>

                {/* View on Phone Shortcut */}
                <button
                  onClick={() => handleJumpToFlow(item.flowId)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-medium border border-neutral-700 transition-colors shrink-0 self-start cursor-pointer"
                  title="Open this screen on the interactive phone simulator"
                >
                  <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                  <span>View on Phone</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </button>
              </div>

              {/* Problem vs Solution Comparison Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5 text-xs">
                {/* Original Flaw */}
                <div className="bg-red-950/20 border border-red-900/40 rounded-xl p-3 flex flex-col justify-between">
                  <div>
                    <span className="text-red-400 font-bold font-mono text-[10px] uppercase block mb-1">
                      Original Baseline (Before)
                    </span>
                    <p className="text-neutral-300 leading-relaxed text-[11px]">{item.oldDesc}</p>
                  </div>
                </div>

                {/* Redesigned Solution */}
                <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3 flex flex-col justify-between">
                  <div>
                    <span className="text-emerald-400 font-bold font-mono text-[10px] uppercase block mb-1">
                      Redesigned Solution (After)
                    </span>
                    <p className="text-neutral-300 leading-relaxed text-[11px]">{item.newDesc}</p>
                  </div>
                </div>
              </div>

              {/* Interactive Scoring Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 bg-black/40 border border-neutral-800/80 rounded-xl p-3.5">
                {/* 1. Score Old Version (1 to 5) */}
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-2 font-medium">
                    1. Score Original (Old):
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map(num => {
                      const isSelected = rating.o === num;
                      return (
                        <button
                          key={num}
                          onClick={() => setFeatureRating(item.id, 'o', num)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-red-500 text-white shadow-md ring-2 ring-red-400/50'
                              : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white border border-neutral-700'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-[9px] text-neutral-500 font-mono mt-1 block">1 = Poor · 5 = Great</span>
                </div>

                {/* 2. Score New Version (1 to 5) */}
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-2 font-medium">
                    2. Score Redesign (New):
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map(num => {
                      const isSelected = rating.n === num;
                      return (
                        <button
                          key={num}
                          onClick={() => setFeatureRating(item.id, 'n', num)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-500 text-black shadow-md ring-2 ring-emerald-400/50'
                              : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white border border-neutral-700'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-[9px] text-neutral-500 font-mono mt-1 block">1 = Poor · 5 = Great</span>
                </div>

                {/* 3. Preferred Version Choice */}
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-2 font-medium">
                    3. Your Preference:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'old', label: 'Old' },
                      { id: 'same', label: 'Same' },
                      { id: 'new', label: 'New' }
                    ].map(opt => {
                      const isSelected = rating.p === opt.id;
                      let activeStyle = '';
                      if (isSelected) {
                        if (opt.id === 'new') activeStyle = 'bg-emerald-500 text-black font-bold';
                        else if (opt.id === 'old') activeStyle = 'bg-red-500 text-white font-bold';
                        else activeStyle = 'bg-neutral-300 text-black font-bold';
                      } else {
                        activeStyle = 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white border border-neutral-700';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => setFeatureRating(item.id, 'p', opt.id)}
                          className={`py-1.5 rounded-lg text-xs font-medium transition-all text-center cursor-pointer ${activeStyle}`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-[9px] text-neutral-500 font-mono mt-1 block">Which UX feels better?</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-neutral-900/95 backdrop-blur-md border border-neutral-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 sticky bottom-4 z-40 shadow-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={resetSurveyRatings}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-red-400 hover:bg-red-950/30 transition-all border border-neutral-800 cursor-pointer"
            title="Clear all my ratings"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset My Answers</span>
          </button>
          <span className="text-xs text-neutral-400 hidden sm:inline">
            Answers are auto-saved locally on your browser.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAppViewMode('results')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold border border-neutral-700 transition-all cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>View Results Dashboard</span>
          </button>

          <button
            onClick={submitCurrentUserSurvey}
            disabled={completedCount === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-900/30 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Submit Evaluation ({completedCount}/{totalCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
