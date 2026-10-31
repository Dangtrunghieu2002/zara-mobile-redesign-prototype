import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { ArrowLeft, X, Plus } from 'lucide-react';

export const OriginalSearchResults = () => {
  const { handleLeftAction } = useFlow();

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between select-none font-sans">
      {/* Top Header */}
      <div className="px-4 pt-2 flex items-center justify-between border-b border-neutral-900 pb-2">
        <button
          onClick={() => handleLeftAction('back')}
          className="text-neutral-300 hover:text-white"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Cryptic combined pill */}
        <button
          onClick={() => handleLeftAction('navigate', 'filter')}
          className="bg-neutral-800 text-[10px] font-mono px-3 py-1 rounded-full text-neutral-300 border border-neutral-700"
        >
          VIEW 1 &nbsp;|&nbsp; FILTERS
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-neutral-900">
        <span className="text-xs font-mono tracking-widest text-white">BEAD</span>
        <X className="w-3.5 h-3.5 text-neutral-500 cursor-pointer" />
      </div>

      {/* Tabs */}
      <div className="px-5 pt-2 flex gap-6 text-[11px] font-semibold tracking-wider text-neutral-400">
        <span className="text-white border-b-2 border-white pb-1">WOMAN</span>
        <span>MAN</span>
        <span>KIDS</span>
      </div>

      {/* Product Results Grid: Irrelevance Flaw (Problem #11) */}
      <div className="relative flex-1 overflow-y-auto p-3 device-scroll">
        <AnnotationBadge
          id="search_ranking"
          number="1"
          className="top-6 left-28"
          variant="red"
        />

        <div className="grid grid-cols-2 gap-3">
          {/* Product 1: Irrelevant First Result */}
          <div
            onClick={() => handleLeftAction('viewProduct', 'embroidered_top')}
            className="flex flex-col cursor-pointer border border-red-500/80 p-1 bg-red-950/20 rounded"
          >
            <div className="relative h-44 bg-neutral-900 overflow-hidden mb-1.5 rounded-sm">
              <img
                src="/products/real_embroidered_top.jpg"
                alt="Embroidered Top"
                className="w-full h-full object-contain bg-white"
              />
              <span className="absolute top-1 left-1 bg-red-600 text-white text-[8px] px-1 font-mono font-bold">
                NO "BEAD" MATCH
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-tight text-neutral-300 leading-tight">
              EMBROIDERED LINEN TOP
            </p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[10px] font-mono text-neutral-400">$ 65.95</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLeftAction('addToBag', { product: 'embroidered_top' });
                }}
                className="p-1 hover:text-white"
              >
                <Plus className="w-3 h-3 text-neutral-500" />
              </button>
            </div>
          </div>

          {/* Product 2 */}
          <div
            onClick={() => handleLeftAction('viewProduct', 'beaded_bag')}
            className="flex flex-col cursor-pointer bg-neutral-950 p-1 hover:bg-neutral-900/50 rounded transition-colors"
          >
            <div className="h-44 bg-neutral-900 overflow-hidden mb-1.5 rounded-sm">
              <img
                src="/products/real_beaded_bag.jpg"
                alt="Beaded Shoulder Bag"
                className="w-full h-full object-contain bg-neutral-100"
              />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-tight text-neutral-300 leading-tight">
              BEADED SHOULDER BAG
            </p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[10px] font-mono text-neutral-400">$ 139.00</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLeftAction('addToBag', { product: 'beaded_bag' });
                }}
                className="p-1 hover:text-white"
              >
                <Plus className="w-3 h-3 text-neutral-500" />
              </button>
            </div>
          </div>

          {/* Product 3 */}
          <div
            onClick={() => handleLeftAction('viewProduct', 'beaded_top')}
            className="flex flex-col cursor-pointer bg-neutral-950 p-1 hover:bg-neutral-900/50 rounded transition-colors"
          >
            <div className="h-44 bg-neutral-900 overflow-hidden mb-1.5 rounded-sm">
              <img
                src="/products/real_beaded_top.jpg"
                alt="Beaded Ribbed Top"
                className="w-full h-full object-contain bg-white"
              />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-tight text-neutral-300 leading-tight">
              BEADED RIBBED TOP
            </p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[10px] font-mono text-neutral-400">$ 59.95</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLeftAction('addToBag', { product: 'beaded_top' });
                }}
                className="p-1 hover:text-white"
              >
                <Plus className="w-3 h-3 text-neutral-500" />
              </button>
            </div>
          </div>

          {/* Product 4 */}
          <div
            onClick={() => handleLeftAction('viewProduct', 'beaded_dress')}
            className="flex flex-col cursor-pointer bg-neutral-950 p-1 hover:bg-neutral-900/50 rounded transition-colors"
          >
            <div className="h-44 bg-neutral-900 overflow-hidden mb-1.5 rounded-sm">
              <img
                src="/products/real_beaded_dress.jpg"
                alt="Beaded Bandeau Dress"
                className="w-full h-full object-contain bg-white"
              />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-tight text-neutral-300 leading-tight">
              BEADED BANDEAU DRESS
            </p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[10px] font-mono text-neutral-400">$ 185.00</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLeftAction('addToBag', { product: 'beaded_dress' });
                }}
                className="p-1 hover:text-white"
              >
                <Plus className="w-3 h-3 text-neutral-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Original 3-item navigation */}
      <div className="border-t border-neutral-900 bg-black px-6 py-2.5">
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-neutral-400">
          <button
            onClick={() => handleLeftAction('navigate', 'menu')}
            className="hover:text-white transition-colors"
          >
            DANH MỤC
          </button>
          <button
            onClick={() => handleLeftAction('navigate', 'account')}
            className="hover:text-white transition-colors"
          >
            TÀI KHOẢN
          </button>
          <button
            onClick={() => handleLeftAction('navigate', 'bag')}
            className="hover:text-white transition-colors"
          >
            | 0 |
          </button>
        </div>
      </div>
    </div>
  );
};
