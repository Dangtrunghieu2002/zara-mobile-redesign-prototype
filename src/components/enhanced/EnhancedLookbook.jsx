import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { Home, Menu, Search, Bookmark, ShoppingBag, SlidersHorizontal, Plus, LayoutGrid } from 'lucide-react';

export const EnhancedLookbook = () => {
  const { handleRightAction } = useFlow();

  return (
    <div className="flex flex-col h-full bg-white text-black justify-between select-none font-sans">
      {/* 44pt Apple Safe Area Header */}
      <div className="relative border-b border-neutral-200 px-4 pt-2 pb-2">
        <AnnotationBadge
          id="header_safe_area"
          number="1"
          className="top-2 left-16"
          variant="emerald"
        />

        {/* Clickable Breadcrumbs */}
        <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-mono mb-1">
          <span className="hover:text-black cursor-pointer" onClick={() => handleRightAction('navigate', 'home')}>Home</span>
          <span>›</span>
          <span className="hover:text-black cursor-pointer">Women</span>
          <span>›</span>
          <span className="text-neutral-700 font-semibold">Lookbook</span>
          <span>›</span>
          <span className="text-black font-semibold">Outerwear</span>
        </div>

        {/* Title & Controls */}
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider font-mono">
            WINTER LOOKBOOK 2026
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRightAction('navigate', 'filter')}
              className="flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded border border-neutral-300 hover:border-black transition-colors"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Bộ lọc (2)</span>
            </button>
            <button className="p-1 rounded hover:bg-neutral-100">
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Lookbook Gallery with Transparent Metadata */}
      <div className="relative flex-1 overflow-y-auto p-3 device-scroll">
        <AnnotationBadge
          id="lookbook_metadata"
          number="1"
          className="top-24 right-4"
          variant="emerald"
        />

        <div className="grid grid-cols-2 gap-3">
          {/* Garment 1 */}
          <div
            onClick={() => handleRightAction('viewProduct', 'lookbook_1')}
            className="flex flex-col bg-white cursor-pointer group"
          >
            <div className="relative overflow-hidden bg-neutral-100 rounded-sm mb-1.5">
              <img
                src="/products/real_lookbook_1.jpg"
                alt="Embroidered Cropped Jacket"
                className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRightAction('addToBag', { product: 'lookbook_1' });
                }}
                className="absolute right-2 bottom-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-white transition-all"
                title="Quick Add to Bag"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <h4 className="text-[10px] font-bold uppercase tracking-tight text-neutral-900 leading-tight">
              EMBROIDERED CROPPED JACKET
            </h4>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-[11px] font-semibold text-neutral-900">2.990.000 đ</span>
              <span className="text-[10px] text-neutral-400 font-mono">($129)</span>
            </div>
            {/* Colorway swatches */}
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-black ring-1 ring-offset-1 ring-neutral-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#8b4513]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#d2b48c]" />
            </div>
          </div>

          {/* Garment 2 */}
          <div
            onClick={() => handleRightAction('viewProduct', 'lookbook_2')}
            className="flex flex-col bg-white cursor-pointer group"
          >
            <div className="relative overflow-hidden bg-neutral-100 rounded-sm mb-1.5">
              <img
                src="/products/real_lookbook_2.jpg"
                alt="Oversized Tweed Coat"
                className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRightAction('addToBag', { product: 'lookbook_2' });
                }}
                className="absolute right-2 bottom-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-white transition-all"
                title="Quick Add to Bag"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <h4 className="text-[10px] font-bold uppercase tracking-tight text-neutral-900 leading-tight">
              OVERSIZED TWEED COAT
            </h4>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-[11px] font-semibold text-neutral-900">3.490.000 đ</span>
              <span className="text-[10px] text-neutral-400 font-mono">($149)</span>
            </div>
            {/* Colorway swatches */}
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2c1d11] ring-1 ring-offset-1 ring-neutral-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#1b2a47]" />
            </div>
          </div>

          {/* Garment 3 */}
          <div
            onClick={() => handleRightAction('viewProduct', 'lookbook_3')}
            className="flex flex-col bg-white cursor-pointer group"
          >
            <div className="relative overflow-hidden bg-neutral-100 rounded-sm mb-1.5">
              <img
                src="/products/real_lookbook_3.jpg"
                alt="Satin Halter Dress"
                className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="text-[10px] font-bold uppercase tracking-tight text-neutral-900 leading-tight">
              SATIN HALTER DRESS
            </h4>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-[11px] font-semibold text-neutral-900">2.290.000 đ</span>
              <span className="text-[10px] text-neutral-400 font-mono">($99)</span>
            </div>
          </div>

          {/* Garment 4 */}
          <div
            onClick={() => handleRightAction('viewProduct', 'lookbook_4')}
            className="flex flex-col bg-white cursor-pointer group"
          >
            <div className="relative overflow-hidden bg-neutral-100 rounded-sm mb-1.5">
              <img
                src="/products/real_lookbook_4.jpg"
                alt="Padded Silk Scarf Jacket"
                className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="text-[10px] font-bold uppercase tracking-tight text-neutral-900 leading-tight">
              PADDED SILK SCARF JACKET
            </h4>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-[11px] font-semibold text-neutral-900">3.190.000 đ</span>
              <span className="text-[10px] text-neutral-400 font-mono">($139)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Tab Standardized Navigation Bar */}
      <div className="bg-black text-neutral-400 border-t border-neutral-800 px-3 py-2">
        <div className="flex items-center justify-around">
          <button
            onClick={() => handleRightAction('navigate', 'home')}
            className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
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
            className="flex flex-col items-center gap-0.5 text-white"
          >
            <Bookmark className="w-4 h-4 text-white" />
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
  );
};
