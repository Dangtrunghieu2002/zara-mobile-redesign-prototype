import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { ArrowLeft, X, Plus, ChevronDown, SlidersHorizontal, Home, Menu, Search, Bookmark, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS, getProductsByDepartment, getSaleProducts } from '../../data/products';

export const EnhancedSearchResults = () => {
  const {
    handleRightAction,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
  } = useFlow();
  const [viewCols, setViewCols] = useState(2); // 1, 2, or 3
  const [sortOption, setSortOption] = useState('relevance'); // relevance | price_asc | price_desc
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Derive products list based on department and search query
  let items = [];
  if (selectedDepartment === 'sale') {
    items = getSaleProducts();
  } else {
    items = getProductsByDepartment(selectedDepartment);
  }

  // Filter by query if query exists and is not just "bead" default when looking at other depts
  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    const queryMatches = items.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.color.toLowerCase().includes(q)
    );
    if (queryMatches.length > 0) {
      items = queryMatches;
    } else {
      // If none match in current dept, check all products
      const globalMatches = Object.values(PRODUCTS).filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
      if (globalMatches.length > 0) {
        items = globalMatches;
      }
    }
  }

  // Sort
  if (sortOption === 'price_asc') {
    items = [...items].sort((a, b) => a.priceNum - b.priceNum);
  } else if (sortOption === 'price_desc') {
    items = [...items].sort((a, b) => b.priceNum - a.priceNum);
  }

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between select-none font-sans relative">
      {/* Top Header with Separate Sort and Filter Buttons */}
      <div className="px-4 pt-2 flex items-center justify-between border-b border-neutral-800 pb-2">
        <button
          onClick={() => handleRightAction('back')}
          className="text-neutral-300 hover:text-white"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 relative">
          <AnnotationBadge
            id="search_ranking"
            number="1"
            className="-top-1 -left-5"
            variant="emerald"
          />

          {/* Sort Dropdown Button */}
          <button
            onClick={() => setShowSortMenu(prev => !prev)}
            className="flex items-center gap-1 bg-[#1c1c1e] text-[11px] font-mono px-3 py-1 rounded-full text-neutral-200 border border-neutral-700 hover:border-neutral-500"
          >
            <span>SORT</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {showSortMenu && (
            <div className="absolute top-8 right-16 bg-[#1c1c1e] border border-neutral-700 rounded-lg shadow-2xl py-1 z-50 w-36 text-xs font-mono">
              <button
                onClick={() => { setSortOption('relevance'); setShowSortMenu(false); }}
                className={`w-full px-3 py-1.5 text-left flex justify-between items-center hover:bg-neutral-800 ${sortOption === 'relevance' ? 'text-white font-bold' : 'text-neutral-400'}`}
              >
                <span>Phù hợp nhất</span>
                {sortOption === 'relevance' && <Check className="w-3 h-3 text-white" />}
              </button>
              <button
                onClick={() => { setSortOption('price_asc'); setShowSortMenu(false); }}
                className={`w-full px-3 py-1.5 text-left flex justify-between items-center hover:bg-neutral-800 ${sortOption === 'price_asc' ? 'text-white font-bold' : 'text-neutral-400'}`}
              >
                <span>Giá tăng dần</span>
                {sortOption === 'price_asc' && <Check className="w-3 h-3 text-white" />}
              </button>
              <button
                onClick={() => { setSortOption('price_desc'); setShowSortMenu(false); }}
                className={`w-full px-3 py-1.5 text-left flex justify-between items-center hover:bg-neutral-800 ${sortOption === 'price_desc' ? 'text-white font-bold' : 'text-neutral-400'}`}
              >
                <span>Giá giảm dần</span>
                {sortOption === 'price_desc' && <Check className="w-3 h-3 text-white" />}
              </button>
            </div>
          )}

          <button
            onClick={() => handleRightAction('navigate', 'filter')}
            className="flex items-center gap-1 bg-[#1c1c1e] text-[11px] font-mono px-3 py-1 rounded-full text-neutral-200 border border-neutral-700 hover:border-neutral-500"
          >
            <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
            <span>FILTERS</span>
          </button>
        </div>
      </div>

      {/* Interactive Search Input Bar */}
      <div className="px-4 pt-2 pb-2 flex items-center justify-between border-b border-neutral-800">
        <div
          onClick={() => handleRightAction('navigate', 'search_typing')}
          className="flex items-center gap-2 text-xs font-mono cursor-pointer flex-1"
        >
          <Search className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-white font-bold tracking-wider">
            {searchQuery ? searchQuery.toUpperCase() : 'ALL PRODUCTS'}
          </span>
        </div>
        <button
          onClick={() => {
            setSearchQuery('');
            handleRightAction('navigate', 'search_typing');
          }}
          className="p-1 text-neutral-400 hover:text-white"
          title="Chỉnh sửa tìm kiếm"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Categories Switcher Chips Bar */}
      <div className="px-4 py-1.5 flex items-center justify-between border-b border-neutral-900 bg-neutral-950/80">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'woman', label: 'WOMAN' },
            { id: 'man', label: 'MAN' },
            { id: 'kids', label: 'KIDS' },
            { id: 'sale', label: 'SALE %' },
          ].map(dept => {
            const isActive = selectedDepartment === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => handleRightAction('selectDepartment', dept.id)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? dept.id === 'sale'
                      ? 'bg-amber-400 text-black font-black'
                      : 'bg-white text-black font-bold'
                    : dept.id === 'sale'
                    ? 'bg-amber-950/40 text-amber-300 border border-amber-800/60'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {dept.label}
              </button>
            );
          })}
        </div>

        {/* View Switcher: 1-col, 2-col, 3-col */}
        <div className="flex items-center bg-[#1c1c1e] rounded-lg p-0.5 border border-neutral-800 shrink-0 ml-2">
          <button
            onClick={() => setViewCols(1)}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${viewCols === 1 ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500'}`}
          >
            1
          </button>
          <button
            onClick={() => setViewCols(2)}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${viewCols === 2 ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500'}`}
          >
            2
          </button>
          <button
            onClick={() => setViewCols(3)}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${viewCols === 3 ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500'}`}
          >
            3
          </button>
        </div>
      </div>

      {/* Relevant Products Grid */}
      <div className="relative flex-1 overflow-y-auto p-3 device-scroll">
        <div className="flex justify-between items-center mb-2 px-1 text-[10px] font-mono text-neutral-400">
          <span>{items.length} SẢN PHẨM ({selectedDepartment.toUpperCase()})</span>
          <span className="text-emerald-400 font-bold">✓ Tên khớp chính xác</span>
        </div>

        <div className={`grid gap-2.5 ${viewCols === 1 ? 'grid-cols-1' : viewCols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {items.map((p) => (
            <div
              key={p.id}
              onClick={() => handleRightAction('viewProduct', p.id)}
              className="flex flex-col cursor-pointer bg-[#141416] p-1.5 rounded-lg border border-neutral-800 hover:border-neutral-600 transition-all group"
            >
              <div className={`relative bg-neutral-900 overflow-hidden mb-1.5 rounded ${viewCols === 1 ? 'h-64' : viewCols === 3 ? 'h-32' : 'h-44'}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                {p.onSale ? (
                  <span className="absolute top-1 left-1 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded font-mono shadow-md">
                    -{p.discountPercent}%
                  </span>
                ) : (
                  <span className="absolute top-1 left-1 bg-black/60 backdrop-blur-sm text-neutral-300 text-[8px] px-1 py-0.5 rounded font-mono border border-white/10">
                    {p.availableColors ? `${p.availableColors.length} màu` : '1 màu'}
                  </span>
                )}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-tight text-neutral-200 leading-tight truncate">
                {p.name}
              </p>
              <div className="flex justify-between items-center mt-1">
                <div>
                  <span className="text-[10px] font-mono text-white font-bold block">
                    {p.priceForeign || p.priceVnd}
                  </span>
                  {p.onSale && (
                    <span className="text-[9px] font-mono text-neutral-500 line-through">
                      {p.originalPriceForeign || p.originalPriceVnd}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRightAction('addToBag', { product: p.id });
                  }}
                  className="p-1 rounded bg-neutral-800 hover:bg-white hover:text-black transition-colors"
                  title="Thêm nhanh vào giỏ"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom 5-Tab Bar */}
      <div className="bg-black border-t border-neutral-900 px-3 py-2 flex items-center justify-around text-neutral-500">
        <button
          onClick={() => handleRightAction('navigate', 'home')}
          className="flex flex-col items-center gap-0.5 hover:text-white"
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-mono">Home</span>
        </button>
        <button
          onClick={() => handleRightAction('navigate', 'menu')}
          className="flex flex-col items-center gap-0.5 hover:text-white"
        >
          <Menu className="w-4 h-4" />
          <span className="text-[9px] font-mono">Menu</span>
        </button>
        <button
          onClick={() => handleRightAction('navigate', 'search_typing')}
          className="flex flex-col items-center gap-0.5 text-white"
        >
          <Search className="w-4 h-4" />
          <span className="text-[9px] font-mono font-bold">Search</span>
        </button>
        <button
          onClick={() => handleRightAction('navigate', 'lookbook')}
          className="flex flex-col items-center gap-0.5 hover:text-white"
        >
          <Bookmark className="w-4 h-4" />
          <span className="text-[9px] font-mono">Saved</span>
        </button>
        <button
          onClick={() => handleRightAction('navigate', 'bag')}
          className="flex flex-col items-center gap-0.5 hover:text-white"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-[9px] font-mono">Bag</span>
        </button>
      </div>
    </div>
  );
};
