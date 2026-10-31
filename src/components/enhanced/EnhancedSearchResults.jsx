import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { ArrowLeft, X, Plus, ChevronDown, SlidersHorizontal, Home, Menu, Search, Bookmark, ShoppingBag } from 'lucide-react';

export const EnhancedSearchResults = () => {
  const { handleRightAction } = useFlow();
  const [viewCols, setViewCols] = useState(2); // 1, 2, or 3

  const products = [
    {
      id: 'beaded_bag',
      productId: 'beaded_bag',
      name: 'BEADED SHOULDER BAG',
      price: '$ 139.00',
      matchType: 'Exact Name Match',
      image: './products/real_beaded_bag.jpg',
    },
    {
      id: 'beaded_top',
      productId: 'beaded_top',
      name: 'BEADED RIBBED TOP',
      price: '$ 59.95',
      matchType: 'Exact Name Match',
      image: './products/real_beaded_top.jpg',
    },
    {
      id: 'beaded_dress',
      productId: 'beaded_dress',
      name: 'BEADED BANDEAU DRESS',
      price: '$ 185.00',
      matchType: 'Category Match',
      image: './products/real_beaded_dress.jpg',
    },
    {
      id: 'pleated_skirt',
      productId: 'pleated_skirt',
      name: 'SATIN PLEATED SKIRT',
      price: '$ 89.95',
      matchType: 'Attribute Match',
      image: './products/real_pleated_skirt.jpg',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between select-none font-sans">
      {/* Top Header with Separate Sort and Filter Buttons */}
      <div className="px-4 pt-2 flex items-center justify-between border-b border-neutral-800 pb-2">
        <button
          onClick={() => handleRightAction('back')}
          className="text-neutral-300 hover:text-white"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <AnnotationBadge
            id="search_ranking"
            number="1"
            className="-top-1 -left-5"
            variant="emerald"
          />

          <button
            onClick={() => handleRightAction('navigate', 'filter')}
            className="flex items-center gap-1 bg-[#1c1c1e] text-[11px] font-mono px-3 py-1 rounded-full text-neutral-200 border border-neutral-700 hover:border-neutral-500"
          >
            <span>SORT</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          <button
            onClick={() => handleRightAction('navigate', 'filter')}
            className="flex items-center gap-1 bg-[#1c1c1e] text-[11px] font-mono px-3 py-1 rounded-full text-neutral-200 border border-neutral-700 hover:border-neutral-500"
          >
            <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
            <span>FILTERS</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="px-5 pt-2 pb-2 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Search className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-white font-bold tracking-wider">BEAD</span>
        </div>
        <X
          onClick={() => handleRightAction('navigate', 'search_typing')}
          className="w-3.5 h-3.5 text-neutral-400 cursor-pointer hover:text-white"
        />
      </div>

      {/* Categories & Product Count / View Switcher Bar */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-neutral-900 bg-neutral-950/60">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-neutral-400">236 products</span>
        </div>

        {/* View Switcher: 1-col, 2-col, 3-col */}
        <div className="flex items-center bg-[#1c1c1e] rounded-lg p-0.5 border border-neutral-800">
          <button
            onClick={() => setViewCols(1)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono ${viewCols === 1 ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500'}`}
            title="1 product per row"
          >
            1
          </button>
          <button
            onClick={() => setViewCols(2)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono ${viewCols === 2 ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500'}`}
            title="2 products per row (default)"
          >
            2
          </button>
          <button
            onClick={() => setViewCols(3)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono ${viewCols === 3 ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500'}`}
            title="3 products per row"
          >
            3
          </button>
        </div>
      </div>

      {/* Relevant Products Grid */}
      <div className="relative flex-1 overflow-y-auto p-3 device-scroll">
        <div className={`grid gap-3 ${viewCols === 1 ? 'grid-cols-1' : viewCols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => handleRightAction('viewProduct', p.productId)}
              className="flex flex-col cursor-pointer bg-[#141416] p-1.5 rounded-lg border border-neutral-800 hover:border-neutral-600 transition-all group"
            >
              <div className={`relative bg-neutral-900 overflow-hidden mb-1.5 rounded ${viewCols === 1 ? 'h-64' : viewCols === 3 ? 'h-32' : 'h-44'}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-1 left-1 bg-emerald-950/90 text-emerald-300 text-[8px] px-1 py-0.5 rounded font-mono border border-emerald-800/80">
                  {p.matchType}
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-tight text-neutral-200 leading-tight">
                {p.name}
              </p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] font-mono text-neutral-400">{p.price}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRightAction('addToBag', { product: p.productId });
                  }}
                  className="p-1 rounded bg-neutral-800 hover:bg-white hover:text-black transition-colors"
                  title="Quick add to bag"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Tab Navigation Bar */}
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
            className="flex flex-col items-center gap-0.5 text-white"
          >
            <Search className="w-4 h-4 text-white" />
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
  );
};
