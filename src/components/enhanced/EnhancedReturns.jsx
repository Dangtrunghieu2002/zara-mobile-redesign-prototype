import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { AnnotationBadge } from '../AnnotationBadge';
import { ArrowLeft, Check, MapPin, QrCode, Clock, Navigation } from 'lucide-react';

export const EnhancedReturns = () => {
  const { handleRightAction } = useFlow();
  const [currentStep, setCurrentStep] = useState(3); // 1, 2, 3, 4

  return (
    <div className="flex flex-col h-full bg-black text-white justify-between relative font-sans text-xs">
      {/* Top Header with 30-Day Countdown Badge */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-neutral-800">
        <button
          onClick={() => handleRightAction('back')}
          className="flex items-center gap-1.5 text-neutral-300 hover:text-white"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[11px] font-bold uppercase tracking-wider font-mono">RETURNS WIZARD</span>
        </button>

        <span className="flex items-center gap-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
          <Clock className="w-3 h-3" /> 24 DAYS LEFT
        </span>
      </div>

      {/* Main Returns Wizard Body */}
      <div className="relative flex-1 px-4 py-3 overflow-y-auto device-scroll space-y-3.5">
        {/* 4-Step Stepper (Problem #26 Redesign) */}
        <div className="relative bg-neutral-900/90 border border-neutral-800 p-2.5 rounded-xl">
          <AnnotationBadge
            id="returns_stepper"
            number="1"
            className="-top-2 right-4"
            variant="emerald"
          />

          <div className="flex items-center justify-between text-[10px] font-mono">
            <span
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-1 text-emerald-400 cursor-pointer"
            >
              <Check className="w-3 h-3" /> 1. Items
            </span>
            <span className="text-neutral-600">›</span>
            <span
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-1 text-emerald-400 cursor-pointer"
            >
              <Check className="w-3 h-3" /> 2. Reason
            </span>
            <span className="text-neutral-600">›</span>
            <span
              onClick={() => setCurrentStep(3)}
              className={`font-bold px-1.5 py-0.5 rounded cursor-pointer ${
                currentStep === 3 ? 'bg-white text-black' : 'text-neutral-400'
              }`}
            >
              3. Drop-off
            </span>
            <span className="text-neutral-600">›</span>
            <span
              onClick={() => setCurrentStep(4)}
              className={`cursor-pointer ${currentStep === 4 ? 'bg-white text-black px-1.5 py-0.5 rounded font-bold' : 'text-neutral-500'}`}
            >
              4. QR Code
            </span>
          </div>
        </div>

        {/* Selected Return Item Card */}
        <div className="bg-[#121214] border border-neutral-800 rounded-xl p-3 flex items-center gap-3">
          <div className="w-12 h-14 bg-neutral-900 rounded overflow-hidden shrink-0 border border-neutral-700">
            <img
              src="/products/real_wool_coat.jpg"
              alt="Wool Blend Coat"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase text-white">
                WOOL BLEND COAT · SIZE M
              </span>
              <span className="text-[8px] bg-emerald-950 text-emerald-400 px-1 rounded font-mono">SELECTED</span>
            </div>
            <p className="text-[10px] text-neutral-400 font-sans mt-0.5">
              Reason: Size too large · Full refund to card
            </p>
          </div>
          <span className="text-[10px] text-neutral-400 font-mono font-bold">99.99 GBP</span>
        </div>

        {currentStep === 4 ? (
          /* Step 4: Digital Return QR Code (No Printer Needed) */
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 text-center space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              RETURN QR CODE READY
            </h3>
            <div className="w-36 h-36 bg-white p-2 rounded-xl mx-auto flex items-center justify-center shadow-lg">
              <QrCode className="w-32 h-32 text-black" />
            </div>
            <p className="text-[11px] font-mono font-bold text-neutral-200">
              REF #ZR-RET-2026-9904
            </p>
            <p className="text-[10px] text-neutral-400 font-sans">
              Show this QR code at Zara Vincom Dong Khoi counter. No printer or paperwork needed!
            </p>
          </div>
        ) : (
          /* Step 3: Select Drop-Off Store or Courier (Problem #2) */
          <div className="relative bg-[#121214] border border-neutral-800 rounded-xl p-3.5 space-y-2.5">
            <AnnotationBadge
              id="returns_stepper"
              number="2"
              className="-top-2 right-4"
              variant="emerald"
            />

            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                STEP 3 · SELECT DROP-OFF LOCATION
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                <Navigation className="w-2.5 h-2.5" /> 1.2 KM AWAY
              </span>
            </div>

            {/* Store Card with Map Pin */}
            <div className="border border-emerald-500/80 bg-emerald-950/20 rounded-lg p-3 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <h4 className="text-xs font-bold uppercase text-white">
                  ZARA VINCOM DONG KHOI
                </h4>
              </div>
              <p className="text-[10px] text-neutral-300 pl-6 font-sans">
                72 Le Thanh Ton, Dist. 1, Ho Chi Minh City
              </p>
              <div className="pl-6 pt-1">
                <span className="text-[9px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded font-mono">
                  ✓ Instant QR Drop-off Counter Available
                </span>
              </div>
            </div>

            <div className="text-[10px] text-neutral-400 font-sans flex items-center justify-between pt-1">
              <span>Next: Instant Return QR Code</span>
              <span className="text-neutral-300 font-mono font-bold">[QR]</span>
            </div>
          </div>
        )}

        {/* Generous 48dp Account Rows Sample */}
        <div className="border-t border-neutral-800 pt-3">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5 flex justify-between">
            <span>Normalized 48dp Touch Boundaries</span>
            <span className="text-emerald-400 font-mono">WCAG 2.2 AA</span>
          </div>
          <div className="space-y-1">
            <div className="h-11 px-3 bg-neutral-900 rounded-lg flex items-center justify-between text-xs hover:bg-neutral-800 cursor-pointer">
              <span>| 01 | PURCHASES</span>
              <span className="text-neutral-500 font-mono">›</span>
            </div>
            <div className="h-11 px-3 bg-neutral-800 text-white rounded-lg flex items-center justify-between text-xs font-bold border border-neutral-700">
              <span className="flex items-center gap-2">
                <span>| 02 | RETURNS</span>
                <span className="text-[9px] bg-emerald-900 text-emerald-300 px-1.5 py-0.2 rounded font-mono">1 ACTIVE</span>
              </span>
              <span className="text-white font-mono">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* Normalized 48px Action Buttons (Problem #28) */}
      <div className="relative border-t border-neutral-800 bg-black p-4 space-y-2">
        <AnnotationBadge
          id="returns_stepper"
          number="3"
          className="-top-3 right-8"
          variant="emerald"
        />

        <button
          onClick={() => setCurrentStep(currentStep === 4 ? 3 : 4)}
          className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-neutral-200 transition-colors shadow-md flex items-center justify-center gap-2"
        >
          {currentStep === 4 ? (
            <span>PRINT / SAVE QR CODE (48PX)</span>
          ) : (
            <span>GENERATE RETURN QR CODE (48PX)</span>
          )}
        </button>

        <button
          onClick={() => alert('Home pickup courier requested. DHL will arrive tomorrow.')}
          className="w-full h-12 border border-neutral-700 text-neutral-300 font-bold uppercase tracking-widest text-xs rounded hover:border-white hover:text-white transition-colors"
        >
          SWITCH TO HOME PICKUP (48PX)
        </button>
      </div>
    </div>
  );
};
