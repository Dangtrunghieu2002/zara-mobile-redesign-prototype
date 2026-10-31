import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { X, Mic } from 'lucide-react';

export const OriginalSearchTyping = () => {
  const { handleLeftAction } = useFlow();

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative overflow-hidden font-sans">
      {/* Top Header */}
      <div className="px-4 pt-3 flex items-center justify-between text-xs tracking-wider">
        <button
          onClick={() => handleLeftAction('back')}
          className="text-neutral-400 hover:text-white"
          title="Back"
        >
          CANCEL
        </button>
      </div>

      {/* Tabs */}
      <div className="px-5 pt-3 flex gap-6 text-xs font-semibold tracking-wider text-neutral-400">
        <span className="text-white border-b-2 border-white pb-1">WOMAN</span>
        <span>MAN</span>
        <span>KIDS</span>
      </div>

      {/* Search Input */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-1 text-sm font-light">
          <span>bead</span>
          <span className="w-0.5 h-4 bg-white animate-pulse" />
        </div>
        <X className="w-4 h-4 text-neutral-400 cursor-pointer" />
      </div>

      {/* Overlapping Autocomplete Flaw (Problem #8, 10) */}
      <div className="relative flex-1 px-5 pt-3 overflow-hidden">
        <AnnotationBadge
          id="search_autocomplete"
          number="1"
          className="top-8 right-6"
          variant="red"
        />

        {/* Awkwardly spaced / overlapping text elements mimicking image21.jpeg */}
        <div className="border border-red-500/80 p-2 bg-red-950/20 rounded relative">
          <div className="text-[10px] text-red-400 font-mono font-bold mb-1">
            ⚠ OVERLAPPING AUTOCOMPLETE COLLISION
          </div>

          <div
            onClick={() => handleLeftAction('navigate', 'search_results')}
            className="text-xs tracking-widest text-neutral-300 py-1 cursor-pointer hover:text-white font-mono"
          >
            BEADED
          </div>
          <div
            onClick={() => handleLeftAction('navigate', 'search_results')}
            className="text-xs tracking-widest text-neutral-300 py-1 cursor-pointer hover:text-white font-mono"
          >
            BEADED TOP
          </div>

          {/* Direct collision: 'YOU MIGHT BE INTERESTED IN' colliding with 'BEADED BAG' */}
          <div className="relative mt-2">
            <div className="text-[11px] font-bold tracking-widest text-neutral-400">
              YOU MIGHT BE INTERESTED IN
            </div>
            <div
              onClick={() => handleLeftAction('navigate', 'search_results')}
              className="absolute -top-1 left-28 text-xs font-bold text-white tracking-widest bg-black/60 px-1 cursor-pointer"
            >
              BEADED BAG
            </div>
          </div>

          {/* Clipped suggestions colliding with product cards */}
          <div className="text-[11px] text-neutral-500 font-mono -mt-1 ml-40">
            ED DRESS
          </div>
        </div>

        {/* Product Cards behind keyboard */}
        <div className="grid grid-cols-2 gap-2 mt-3 opacity-90">
          <div
            onClick={() => handleLeftAction('viewProduct', 'beaded_top')}
            className="bg-neutral-900 p-2 border border-neutral-800 cursor-pointer hover:border-neutral-500 rounded transition-colors"
          >
            <div className="h-20 bg-neutral-800 flex items-center justify-center text-xs overflow-hidden rounded">
              <img src="./products/real_beaded_top.jpg" alt="Beaded Top" className="w-full h-full object-cover" />
            </div>
            <div className="text-[11px] font-bold uppercase text-neutral-200 mt-1">Beaded Top</div>
            <div className="text-[10px] text-neutral-400 font-mono">$ 65.95</div>
          </div>
          <div
            onClick={() => handleLeftAction('viewProduct', 'beaded_bag')}
            className="bg-neutral-900 p-2 border border-neutral-800 cursor-pointer hover:border-neutral-500 rounded transition-colors"
          >
            <div className="h-20 bg-neutral-800 flex items-center justify-center text-xs overflow-hidden rounded">
              <img src="./products/real_beaded_bag.jpg" alt="Beaded Bag" className="w-full h-full object-cover" />
            </div>
            <div className="text-[11px] font-bold uppercase text-neutral-200 mt-1">Beaded Bag</div>
            <div className="text-[10px] text-neutral-400 font-mono">$ 139.00</div>
          </div>
        </div>
      </div>

      {/* Simulated Mobile Keyboard */}
      <div className="bg-[#1c1c1e] p-2 border-t border-neutral-800 text-white select-none">
        <div className="flex justify-between text-xs px-3 py-1 text-neutral-400">
          <span>"bead"</span>
          <span>beadsteak</span>
          <span>beaded</span>
        </div>
        <div className="space-y-1 text-center font-sans text-xs">
          <div className="flex justify-center gap-1">
            {'qwertyuiop'.split('').map((k) => (
              <span key={k} className="bg-[#3a3a3c] px-2 py-1.5 rounded text-[11px] uppercase font-medium">{k}</span>
            ))}
          </div>
          <div className="flex justify-center gap-1">
            {'asdfghjkl'.split('').map((k) => (
              <span key={k} className="bg-[#3a3a3c] px-2.5 py-1.5 rounded text-[11px] uppercase font-medium">{k}</span>
            ))}
          </div>
          <div className="flex justify-center gap-1">
            {'zxcvbnm'.split('').map((k) => (
              <span key={k} className="bg-[#3a3a3c] px-2.5 py-1.5 rounded text-[11px] uppercase font-medium">{k}</span>
            ))}
          </div>
          <div className="flex justify-between items-center px-4 pt-1">
            <span className="text-[10px] bg-[#3a3a3c] px-3 py-1.5 rounded">123</span>
            <button
              onClick={() => handleLeftAction('navigate', 'search_results')}
              className="bg-blue-600 px-4 py-1.5 rounded text-xs font-semibold hover:bg-blue-500"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
