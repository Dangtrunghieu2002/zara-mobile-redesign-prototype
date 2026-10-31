import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { Home, Menu, Search, Bookmark, ShoppingBag, LayoutGrid } from 'lucide-react';

export const EnhancedHome = () => {
  const { handleRightAction } = useFlow();

  return (
    <div className="relative flex flex-col h-full bg-black text-white justify-between select-none">
      {/* Clean Campaign Editorial Background without any phone frame */}
      <div className="absolute inset-0 z-0">
        <img
          src="/products/real_home_campaign.jpg"
          alt="Zara AW 2026 Collection"
          className="w-full h-full object-cover object-center brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50" />
      </div>

      {/* Top Header with Zara Brand Wordmark & Grid Switcher */}
      <div className="relative px-5 pt-2 flex items-center justify-between z-20">
        <span className="zara-logo text-3xl font-black tracking-tighter text-white">
          ZARA
        </span>
        <button
          onClick={() => handleRightAction('navigate', 'lookbook')}
          className="p-1 rounded hover:bg-white/10 transition-colors"
          title="Grid view"
        >
          <LayoutGrid className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Middle Hero Title */}
      <div
        onClick={() => handleRightAction('navigate', 'lookbook')}
        className="relative px-5 z-20 mt-auto mb-6 text-center cursor-pointer hover:opacity-90 transition-opacity"
        title="Chạm để khám phá Lookbook"
      >
        <p className="text-[10px] uppercase font-mono tracking-[0.25em] text-neutral-300 mb-1">
          AW 2026 STUDIO COLLECTION
        </p>
        <h2 className="text-xl font-serif tracking-widest text-white uppercase font-light">
          NOW AVAILABLE
        </h2>
      </div>

      {/* Bottom Area: Floating Category Quick-Pills + 5-Tab Bar */}
      <div className="relative z-20 flex flex-col gap-2.5">
        {/* Quick-Pills (Tran Thi Bao Khuong's Redesign #1) */}
        <div className="relative px-4">
          <AnnotationBadge
            id="home_pills"
            number="1"
            className="-top-3 right-6"
            variant="emerald"
          />

          <div className="bg-black/60 backdrop-blur-md border border-white/25 rounded-full p-1 flex items-center justify-between shadow-2xl">
            <button
              onClick={() => handleRightAction('navigate', 'search_results')}
              className="flex-1 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              WOMAN
            </button>
            <button
              onClick={() => handleRightAction('navigate', 'search_results')}
              className="flex-1 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider bg-white text-black rounded-full shadow-md transition-all"
            >
              MAN
            </button>
            <button
              onClick={() => handleRightAction('navigate', 'search_results')}
              className="flex-1 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              KIDS
            </button>
            <button
              onClick={() => handleRightAction('navigate', 'search_results')}
              className="flex-1 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-amber-300 hover:text-amber-200 hover:bg-white/10 rounded-full transition-all"
            >
              SALE %
            </button>
          </div>
          <p className="text-[9px] text-center text-neutral-400 mt-1">
            Tap directly to explore department in 1-tap
          </p>
        </div>

        {/* 5-Tab Standardized Navigation Bar (Apple HIG #2) */}
        <div className="relative bg-black/95 border-t border-neutral-800/90 px-3 py-2">
          <AnnotationBadge
            id="home_navbar"
            number="2"
            className="-top-3 left-1/2 -translate-x-1/2"
            variant="emerald"
          />

          <div className="flex items-center justify-around text-neutral-400">
            <button
              onClick={() => handleRightAction('navigate', 'home')}
              className="flex flex-col items-center gap-0.5 text-white"
            >
              <Home className="w-4 h-4 text-white" />
              <span className="text-[10px] font-medium">Home</span>
            </button>

            <button
              onClick={() => handleRightAction('navigate', 'menu')}
              className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span className="text-[10px] font-medium">Menu</span>
            </button>

            <button
              onClick={() => handleRightAction('navigate', 'search_typing')}
              className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="text-[10px] font-medium">Search</span>
            </button>

            <button
              onClick={() => handleRightAction('navigate', 'lookbook')}
              className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              <span className="text-[10px] font-medium">Saved</span>
            </button>

            <button
              onClick={() => handleRightAction('navigate', 'bag')}
              className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[10px] font-medium">Bag (1)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
