import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { X, MessageSquare, Bookmark, ChevronDown, Check } from 'lucide-react';

export const EnhancedBag = () => {
  const { handleRightAction, bagState, PRODUCTS } = useFlow();
  const currentItem = (bagState?.items && bagState.items.length > 0) ? bagState.items[0] : {
    name: 'LEATHER EFFECT JACKET',
    price: '2,599,000 VND',
    size: 'M',
    color: 'BLACK',
    image: '/products/real_leather_jacket.jpg',
  };
  const [selectedSize, setSelectedSize] = useState(currentItem.size || 'M');
  const [tempSize, setTempSize] = useState(currentItem.size || 'M');
  const [isSizeSheetOpen, setIsSizeSheetOpen] = useState(false);

  React.useEffect(() => {
    if (currentItem?.size) {
      setSelectedSize(currentItem.size);
      setTempSize(currentItem.size);
    }
  }, [currentItem?.size, currentItem?.name]);

  const handleUpdateSize = () => {
    setSelectedSize(tempSize);
    setIsSizeSheetOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-white text-black justify-between relative font-sans text-xs select-none">
      {/* Top Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-neutral-100">
        <button
          onClick={() => handleRightAction('back')}
          className="text-neutral-700 hover:text-black p-1"
          title="Back"
        >
          <X className="w-5 h-5" />
        </button>
        <MessageSquare className="w-4 h-4 text-neutral-600 cursor-pointer" />
      </div>

      {/* Bag Tabs */}
      <div className="px-5 pt-3 pb-2 flex gap-6 text-xs font-mono font-bold tracking-widest border-b border-neutral-100">
        <span className="text-black border-b-2 border-black pb-1">SHOPPING BAG | {bagState?.items?.length || 1} |</span>
        <span className="text-neutral-400 hover:text-black cursor-pointer">FAVOURITES</span>
      </div>

      {/* Main Bag Item Body */}
      <div className="relative flex-1 overflow-y-auto px-5 py-4 device-scroll">
        {/* Product Card: Clean isolated product image */}
        <div className="flex gap-4 border-b border-neutral-200 pb-5">
          <div className="w-24 h-32 bg-neutral-50 shrink-0 overflow-hidden rounded border border-neutral-200 flex items-center justify-center p-1">
            <img
              src={currentItem.image || "/products/real_leather_jacket.jpg"}
              alt={currentItem.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between py-0.5">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold">
                {currentItem.name}
              </h3>

              {/* 1-Tap Inline Size Button with Chevron (Problem #17, 22 Redesign) */}
              <div className="relative flex items-center gap-2 mt-2">
                <AnnotationBadge
                  id="bag_edit_size"
                  number="1"
                  className="-top-2.5 -right-3"
                  variant="emerald"
                />

                <span className="text-[11px] font-mono text-neutral-600 uppercase">{currentItem.color || 'BLACK'}</span>

                <button
                  onClick={() => setIsSizeSheetOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-neutral-800 bg-neutral-100 hover:bg-black hover:text-white transition-all font-mono font-bold text-[11px] shadow-sm"
                  title="Change size in 1-tap"
                >
                  <span>SIZE: {selectedSize}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs font-bold font-mono text-neutral-900 mt-2">
                {currentItem.price || '2,599,000 VND'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2.5 font-mono text-xs border border-neutral-300 rounded px-2 py-0.5">
                <button className="text-neutral-500 hover:text-black">—</button>
                <span className="font-bold">1</span>
                <button className="text-neutral-500 hover:text-black">+</button>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-500">
                <span className="cursor-pointer hover:text-black">DELETE</span>
                <span>|</span>
                <Bookmark className="w-3.5 h-3.5 cursor-pointer hover:text-black" />
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="pt-4">
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 font-bold">
            YOU MAY ALSO LIKE
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'trench_coat', name: 'Faux Trench', price: '1,999,000 VND', img: '/products/real_trench_coat.jpg' },
              { id: 'knit_cardigan', name: 'Knit Cardigan', price: '999,000 VND', img: '/products/real_knit_cardigan.jpg' },
              { id: 'pleated_skirt', name: 'Pleated Skirt', price: '1,299,000 VND', img: '/products/real_pleated_skirt.jpg' },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => handleRightAction('viewProduct', item.id)}
                className="flex flex-col bg-neutral-50 p-1.5 border border-neutral-200 rounded group hover:border-black transition-colors cursor-pointer"
                title="Xem chi tiết sản phẩm"
              >
                <div className="h-20 bg-white mb-1.5 rounded-sm overflow-hidden flex items-center justify-center border border-neutral-100">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-[9px] font-mono text-neutral-800 font-bold truncate">{item.name}</span>
                <span className="text-[8px] font-mono text-neutral-500">{item.price}</span>
                <span className="text-xs text-neutral-400 self-center mt-0.5 group-hover:text-black font-bold">+</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Total & CTA */}
      <div className="border-t border-neutral-200 bg-white p-4">
        <div className="flex justify-between items-baseline mb-3 font-mono">
          <span className="text-xs font-bold uppercase tracking-wider">TOTAL</span>
          <div className="text-right">
            <span className="text-xs font-bold">{currentItem.price || '2,599,000 VND'}</span>
            <span className="block text-[9px] text-neutral-500">* VAT included</span>
          </div>
        </div>

        <button
          onClick={() => handleRightAction('navigate', 'checkout')}
          className="w-full py-3 bg-black text-white text-xs font-mono font-bold uppercase tracking-widest rounded shadow-md hover:bg-neutral-800 transition-colors"
        >
          CONTINUE ({bagState?.items?.length || 1})
        </button>
      </div>

      {/* Interactive Size Change Bottom Sheet (Report 2 Redesign) */}
      {isSizeSheetOpen && (
        <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end backdrop-blur-xs">
          <div className="bg-white p-5 rounded-t-2xl space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Grab Handle */}
            <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto" />

            <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider">SELECT SIZE</span>
              <span className="text-[10px] text-neutral-500 underline cursor-pointer hover:text-black">
                SIZE GUIDE
              </span>
            </div>

            <div className="space-y-1">
              {/* XS - Sold out (Problem #2) */}
              <div className="relative py-2.5 px-3 flex justify-between items-center text-neutral-400 bg-neutral-50 rounded line-through select-none">
                <span className="font-mono text-xs font-bold">XS</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider">SOLD OUT</span>
                  <AnnotationBadge
                    id="bag_edit_size"
                    number="2"
                    className="relative"
                    variant="emerald"
                  />
                </div>
              </div>

              {/* S */}
              <div
                onClick={() => setTempSize('S')}
                className={`py-2.5 px-3 flex justify-between items-center rounded cursor-pointer border transition-all ${
                  tempSize === 'S' ? 'border-black bg-neutral-50 font-bold' : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <span className="font-mono text-xs">S</span>
                {tempSize === 'S' && <Check className="w-4 h-4 text-black" />}
              </div>

              {/* M - Selected */}
              <div
                onClick={() => setTempSize('M')}
                className={`py-2.5 px-3 flex justify-between items-center rounded cursor-pointer border transition-all ${
                  tempSize === 'M' ? 'border-black bg-neutral-50 font-bold' : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <span className="font-mono text-xs">M</span>
                {tempSize === 'M' && <Check className="w-4 h-4 text-black" />}
              </div>

              {/* L - Only 2 left (Problem #3) */}
              <div
                onClick={() => setTempSize('L')}
                className={`relative py-2.5 px-3 flex justify-between items-center rounded cursor-pointer border transition-all ${
                  tempSize === 'L' ? 'border-black bg-neutral-50 font-bold' : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <span className="font-mono text-xs">L</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-amber-600 font-bold uppercase">
                    ONLY 2 LEFT
                  </span>
                  <AnnotationBadge
                    id="bag_edit_size"
                    number="3"
                    className="relative"
                    variant="emerald"
                  />
                  {tempSize === 'L' && <Check className="w-4 h-4 text-black" />}
                </div>
              </div>

              {/* XL */}
              <div
                onClick={() => setTempSize('XL')}
                className={`py-2.5 px-3 flex justify-between items-center rounded cursor-pointer border transition-all ${
                  tempSize === 'XL' ? 'border-black bg-neutral-50 font-bold' : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <span className="font-mono text-xs">XL</span>
                {tempSize === 'XL' && <Check className="w-4 h-4 text-black" />}
              </div>
            </div>

            {/* Update Size Button (Problem #4) */}
            <div className="relative pt-2">
              <AnnotationBadge
                id="bag_edit_size"
                number="4"
                className="-top-1 right-8"
                variant="emerald"
              />

              <button
                onClick={handleUpdateSize}
                className="w-full py-3 bg-black text-white text-xs font-mono font-bold uppercase tracking-widest rounded hover:bg-neutral-800 transition-colors shadow-md"
              >
                UPDATE SIZE ({tempSize})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
