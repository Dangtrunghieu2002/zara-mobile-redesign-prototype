import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { ArrowLeft } from 'lucide-react';

export const OriginalFilter = () => {
  const { handleLeftAction } = useFlow();

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative font-mono text-xs">
      {/* Top Header */}
      <div className="px-4 pt-3 flex items-center justify-between border-b border-neutral-900 pb-2">
        <button
          onClick={() => handleLeftAction('navigate', 'search_results')}
          className="text-neutral-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-[10px] text-neutral-400">VIEW 2 &nbsp; FILTERS 3 &nbsp; IN STORE</span>
      </div>

      {/* Filter Body: All Sections Permanently Expanded */}
      <div className="relative flex-1 overflow-y-auto px-5 py-3 device-scroll space-y-6">
        <AnnotationBadge
          id="smart_filter"
          number="1"
          className="top-2 right-4"
          variant="red"
        />

        <div className="border border-red-500/80 p-2.5 bg-red-950/20 rounded">
          <div className="text-[10px] text-red-400 font-bold mb-1">
            ⚠ ALL SECTIONS PERMANENTLY EXPANDED (LONG SCROLL)
          </div>
          <p className="text-[10px] text-neutral-400">
            No active summary chips. Selected options only indicated by subtle bold text.
          </p>
        </div>

        {/* Section 01: Sort By */}
        <div>
          <div className="text-neutral-500 mb-2 font-bold tracking-wider">
            |01| SORT BY
          </div>
          <div className="pl-4 space-y-2 text-neutral-400">
            <div className="text-white font-bold">ASCENDING PRICE</div>
            <div>DESCENDING PRICE</div>
            <div>NEW</div>
          </div>
        </div>

        {/* Section 02: Collection */}
        <div>
          <div className="text-neutral-500 mb-2 font-bold tracking-wider">
            |02| COLLECTION
          </div>
          <div className="pl-4 space-y-2 text-neutral-400">
            <div>BASIC</div>
            <div>CRLR</div>
            <div className="text-white font-bold">KNITWEAR</div>
            <div>LINGERIE</div>
            <div>SRPLS</div>
            <div>TRF</div>
            <div>WOMAN</div>
          </div>
        </div>

        {/* Section 03: Colour */}
        <div>
          <div className="text-neutral-500 mb-2 font-bold tracking-wider">
            |03| COLOUR
          </div>
          <div className="pl-4 space-y-2 text-neutral-400">
            <div className="flex items-center gap-2 text-white font-bold">
              <span className="w-3 h-3 bg-amber-700 inline-block" />
              <span>ANIMAL PRINT</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#e8d8c8] inline-block" />
              <span>BEIGE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-black border border-neutral-700 inline-block" />
              <span>BLACK</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-700 inline-block" />
              <span>BLUE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Area: No Result Count Flaw */}
      <div className="relative border-t border-neutral-800 bg-black p-4 space-y-2">
        <AnnotationBadge
          id="smart_filter"
          number="2"
          className="-top-3 right-6"
          variant="red"
        />

        <button
          onClick={() => handleLeftAction('navigate', 'search_results')}
          className="w-full py-3 border border-neutral-600 text-neutral-200 text-xs font-bold uppercase tracking-widest hover:border-white hover:text-white transition-colors"
        >
          VIEW RESULTS
        </button>

        <button
          onClick={() => handleLeftAction('navigate', 'search_results')}
          className="w-full py-1 text-center text-[10px] text-neutral-500 tracking-wider hover:text-neutral-300"
        >
          CLEAR FILTERS
        </button>
      </div>
    </div>
  );
};
