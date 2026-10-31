import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { X, ChevronDown, ChevronRight, Check } from 'lucide-react';

export const EnhancedFilter = () => {
  const { handleRightAction } = useFlow();
  const [openSection, setOpenSection] = useState('collection'); // 'sort', 'collection', 'colour', 'size'
  const [activeChips, setActiveChips] = useState(['Price: Low to High', 'Knitwear', 'Animal print']);

  const removeChip = (chip) => {
    setActiveChips(activeChips.filter(c => c !== chip));
  };

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative font-sans text-xs">
      {/* Top Header */}
      <div className="px-4 pt-3 flex items-center justify-between border-b border-neutral-800 pb-2.5">
        <button
          onClick={() => handleRightAction('navigate', 'search_results')}
          className="text-neutral-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-white">Filters</span>
        <button
          onClick={() => setActiveChips([])}
          className="text-[11px] text-neutral-400 hover:text-white"
        >
          Clear all
        </button>
      </div>

      {/* Selected Filter Summary (Chips) */}
      <div className="relative px-4 py-2.5 border-b border-neutral-800 bg-[#141416]">
        <AnnotationBadge
          id="smart_filter"
          number="1"
          className="-top-2 right-4"
          variant="emerald"
        />

        <div className="flex flex-wrap gap-1.5 items-center">
          {activeChips.map((chip) => (
            <span
              key={chip}
              onClick={() => removeChip(chip)}
              className="bg-[#242426] hover:bg-[#323234] text-neutral-200 text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-neutral-700 cursor-pointer transition-colors"
            >
              <span>{chip}</span>
              <X className="w-2.5 h-2.5 text-neutral-400" />
            </span>
          ))}
          {activeChips.length > 0 && (
            <span className="text-[10px] text-neutral-400 font-mono pl-1">
              {activeChips.length} filters selected
            </span>
          )}
        </div>
      </div>

      {/* Accordion Filter Sections */}
      <div className="relative flex-1 overflow-y-auto px-4 py-2 device-scroll space-y-2">
        <AnnotationBadge
          id="smart_filter"
          number="2"
          className="top-8 right-6"
          variant="emerald"
        />

        {/* Section: Sort by */}
        <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#121214]">
          <button
            onClick={() => setOpenSection(openSection === 'sort' ? '' : 'sort')}
            className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-semibold hover:bg-neutral-900 transition-colors"
          >
            <span>Sort by</span>
            {openSection === 'sort' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {openSection === 'sort' && (
            <div className="px-3 pb-3 space-y-2 border-t border-neutral-800 pt-2 text-neutral-300">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name="sort" defaultChecked className="accent-white" />
                <span>Ascending price</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name="sort" className="accent-white" />
                <span>Descending price</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name="sort" className="accent-white" />
                <span>New</span>
              </label>
            </div>
          )}
        </div>

        {/* Section: Collection */}
        <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#121214]">
          <button
            onClick={() => setOpenSection(openSection === 'collection' ? '' : 'collection')}
            className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-semibold hover:bg-neutral-900 transition-colors"
          >
            <span>Collection</span>
            {openSection === 'collection' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {openSection === 'collection' && (
            <div className="px-3 pb-3 space-y-2 border-t border-neutral-800 pt-2 text-neutral-300">
              {['Basic', 'CRLR', 'Knitwear', 'Lingerie', 'SRPLS', 'TRF', 'Woman'].map((item) => (
                <label key={item} className="flex items-center gap-2.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    defaultChecked={item === 'Knitwear'}
                    className="accent-white rounded"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Section: Colour */}
        <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#121214]">
          <button
            onClick={() => setOpenSection(openSection === 'colour' ? '' : 'colour')}
            className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-semibold hover:bg-neutral-900 transition-colors"
          >
            <span>Colour</span>
            {openSection === 'colour' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {openSection === 'colour' && (
            <div className="px-3 pb-3 space-y-2 border-t border-neutral-800 pt-2 text-neutral-300">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-white rounded" />
                <span className="w-3.5 h-3.5 bg-amber-700 rounded-sm inline-block" />
                <span>Animal print</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" className="accent-white rounded" />
                <span className="w-3.5 h-3.5 bg-[#e8d8c8] rounded-sm inline-block" />
                <span>Beige</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" className="accent-white rounded" />
                <span className="w-3.5 h-3.5 bg-black border border-neutral-700 rounded-sm inline-block" />
                <span>Black</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" className="accent-white rounded" />
                <span className="w-3.5 h-3.5 bg-blue-700 rounded-sm inline-block" />
                <span>Blue</span>
              </label>
            </div>
          )}
        </div>

        {/* Section: Size (Collapsed) */}
        <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#121214]">
          <button
            onClick={() => setOpenSection(openSection === 'size' ? '' : 'size')}
            className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-semibold hover:bg-neutral-900 transition-colors"
          >
            <span>Size</span>
            <ChevronRight className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
      </div>

      {/* Bottom CTA with Dynamic Result Count */}
      <div className="relative border-t border-neutral-800 bg-black p-4">
        <AnnotationBadge
          id="smart_filter"
          number="3"
          className="-top-3 right-8"
          variant="emerald"
        />

        <button
          onClick={() => handleRightAction('navigate', 'search_results')}
          className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-wider rounded shadow-md hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
        >
          <span>VIEW 125 RESULTS</span>
        </button>
      </div>
    </div>
  );
};
