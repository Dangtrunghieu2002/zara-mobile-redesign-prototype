import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { Search, X, Plus } from 'lucide-react';

export const EnhancedSearchTyping = () => {
  const { handleRightAction } = useFlow();

  const suggestions = [
    'beaded',
    'beaded top',
    'beaded bag',
    'beaded dress',
    'beaded accessories',
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative overflow-hidden font-sans select-none">
      {/* Top Header */}
      <div className="px-4 pt-3 flex items-center justify-between text-xs tracking-wider">
        <button
          onClick={() => handleRightAction('back')}
          className="text-neutral-400 hover:text-white"
          title="Back"
        >
          CANCEL
        </button>
      </div>

      {/* Categories */}
      <div className="px-5 pt-2 flex gap-6 text-xs font-semibold tracking-wider text-neutral-400">
        <span className="text-white border-b-2 border-white pb-1">WOMAN</span>
        <span className="hover:text-white cursor-pointer">MAN</span>
        <span className="hover:text-white cursor-pointer">KIDS</span>
      </div>

      {/* Rounded Search Bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="bg-[#1c1c1e] rounded-full px-4 py-2 flex items-center justify-between border border-neutral-700/80">
          <div className="flex items-center gap-2 text-xs">
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-white">bead</span>
            <span className="w-0.5 h-3.5 bg-blue-500 animate-pulse" />
          </div>
          <X className="w-3.5 h-3.5 text-neutral-400 cursor-pointer" />
        </div>
      </div>

      {/* Clear Suggestions List (Problem #10 Redesign) */}
      <div className="relative flex-1 px-5 pt-2 overflow-y-auto device-scroll">
        <AnnotationBadge
          id="search_autocomplete"
          number="1"
          className="top-2 right-4"
          variant="emerald"
        />

        <div className="space-y-2 border-b border-neutral-800 pb-3">
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleRightAction('navigate', 'search_results')}
              className="flex items-center gap-2.5 text-xs text-neutral-300 hover:text-white cursor-pointer py-0.5 group"
            >
              <Search className="w-3 h-3 text-neutral-500 group-hover:text-white" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* You Might Be Interested In (Separated below) */}
        <div className="pt-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              YOU MIGHT BE INTERESTED IN
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div
              onClick={() => handleRightAction('viewProduct', 'beaded_top')}
              className="bg-[#141416] p-2 rounded-lg border border-neutral-800 cursor-pointer hover:border-neutral-600 transition-colors"
            >
              <div className="h-16 bg-neutral-900 rounded mb-1.5 overflow-hidden flex items-center justify-center">
                <img
                  src="/products/real_beaded_top.jpg"
                  alt="Beaded Top"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-tight text-neutral-200">
                    BEADED TOP
                  </p>
                  <p className="text-[10px] text-neutral-400 font-mono">$ 65.95</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRightAction('addToBag', { product: 'beaded_top' });
                  }}
                  className="p-1 rounded bg-neutral-800 hover:bg-white hover:text-black transition-colors"
                  title="Quick add to bag"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div
              onClick={() => handleRightAction('viewProduct', 'beaded_bag')}
              className="bg-[#141416] p-2 rounded-lg border border-neutral-800 cursor-pointer hover:border-neutral-600 transition-colors"
            >
              <div className="h-16 bg-neutral-900 rounded mb-1.5 overflow-hidden flex items-center justify-center">
                <img
                  src="/products/real_beaded_bag.jpg"
                  alt="Beaded Shoulder Bag"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-tight text-neutral-200">
                    BEADED SHOULDER BAG
                  </p>
                  <p className="text-[10px] text-neutral-400 font-mono">$ 139.00</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRightAction('addToBag', { product: 'beaded_bag' });
                  }}
                  className="p-1 rounded bg-neutral-800 hover:bg-white hover:text-black transition-colors"
                  title="Quick add to bag"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Keyboard */}
      <div className="bg-[#1c1c1e] p-2 border-t border-neutral-800 text-white select-none">
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
              onClick={() => handleRightAction('navigate', 'search_results')}
              className="bg-white text-black px-4 py-1.5 rounded text-xs font-bold hover:bg-neutral-200"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
