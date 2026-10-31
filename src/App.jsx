import React from 'react';
import { FlowProvider, useFlow, FLOWS } from './context/FlowContext';
import { TopNavBar } from './components/TopNavBar';
import { DeviceFrame } from './components/DeviceFrame';
import { UXInspectorModal } from './components/UXInspectorModal';

// Original Components
import { OriginalCookie } from './components/original/OriginalCookie';
import { OriginalHome } from './components/original/OriginalHome';
import { OriginalMenu } from './components/original/OriginalMenu';
import { OriginalLookbook } from './components/original/OriginalLookbook';
import { OriginalSearchTyping } from './components/original/OriginalSearchTyping';
import { OriginalSearchResults } from './components/original/OriginalSearchResults';
import { OriginalFilter } from './components/original/OriginalFilter';
import { OriginalProductDetail } from './components/original/OriginalProductDetail';
import { OriginalBag } from './components/original/OriginalBag';
import { OriginalCheckout } from './components/original/OriginalCheckout';
import { OriginalPaymentResult } from './components/original/OriginalPaymentResult';
import { OriginalLogin } from './components/original/OriginalLogin';
import { OriginalReturns } from './components/original/OriginalReturns';

// Enhanced Components
import { EnhancedCookie } from './components/enhanced/EnhancedCookie';
import { EnhancedHome } from './components/enhanced/EnhancedHome';
import { EnhancedMenu } from './components/enhanced/EnhancedMenu';
import { EnhancedLookbook } from './components/enhanced/EnhancedLookbook';
import { EnhancedSearchTyping } from './components/enhanced/EnhancedSearchTyping';
import { EnhancedSearchResults } from './components/enhanced/EnhancedSearchResults';
import { EnhancedFilter } from './components/enhanced/EnhancedFilter';
import { EnhancedProductDetail } from './components/enhanced/EnhancedProductDetail';
import { EnhancedBag } from './components/enhanced/EnhancedBag';
import { EnhancedCheckout } from './components/enhanced/EnhancedCheckout';
import { EnhancedPaymentResult } from './components/enhanced/EnhancedPaymentResult';
import { EnhancedLogin } from './components/enhanced/EnhancedLogin';
import { EnhancedReturns } from './components/enhanced/EnhancedReturns';

const getScreenComponent = (flowId, variant) => {
  if (variant === 'original') {
    switch (flowId) {
      case 'cookie': return <OriginalCookie />;
      case 'home': return <OriginalHome />;
      case 'menu': return <OriginalMenu />;
      case 'lookbook': return <OriginalLookbook />;
      case 'search_typing': return <OriginalSearchTyping />;
      case 'search_results': return <OriginalSearchResults />;
      case 'filter': return <OriginalFilter />;
      case 'pdp': return <OriginalProductDetail />;
      case 'bag': return <OriginalBag />;
      case 'checkout': return <OriginalCheckout />;
      case 'payment_result': return <OriginalPaymentResult />;
      case 'account': return <OriginalLogin />;
      case 'returns': return <OriginalReturns />;
      default: return <OriginalHome />;
    }
  } else {
    switch (flowId) {
      case 'cookie': return <EnhancedCookie />;
      case 'home': return <EnhancedHome />;
      case 'menu': return <EnhancedMenu />;
      case 'lookbook': return <EnhancedLookbook />;
      case 'search_typing': return <EnhancedSearchTyping />;
      case 'search_results': return <EnhancedSearchResults />;
      case 'filter': return <EnhancedFilter />;
      case 'pdp': return <EnhancedProductDetail />;
      case 'bag': return <EnhancedBag />;
      case 'checkout': return <EnhancedCheckout />;
      case 'payment_result': return <EnhancedPaymentResult />;
      case 'account': return <EnhancedLogin />;
      case 'returns': return <EnhancedReturns />;
      default: return <EnhancedHome />;
    }
  }
};

const PrototypeCanvas = () => {
  const {
    leftFlow,
    rightFlow,
    deviceType,
    scale,
    currentFlow,
    navigateTo,
    goToNextFlow,
    goToPrevFlow,
  } = useFlow();

  const currentFlowMeta = FLOWS.find(f => f.id === currentFlow) || FLOWS[0];
  const currentIndex = FLOWS.findIndex(f => f.id === currentFlow);

  // Keyboard navigation for presentation: Left/Right Arrow to switch flows
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowRight') {
        goToNextFlow();
      } else if (e.key === 'ArrowLeft') {
        goToPrevFlow();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFlow]);

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 overflow-x-auto min-w-full">
      {/* Side-by-Side Dual Phone Layout */}
      <div
        className="flex items-start justify-center gap-8 md:gap-14 transition-transform duration-200 origin-top pb-12 mt-2"
        style={{ transform: `scale(${scale})` }}
      >
        {/* Left Device: Original (Baseline) */}
        <div className="flex flex-col items-center">
          <DeviceFrame
            variant="original"
            title="Zara Mobile App"
            subtitle="Original Baseline"
            deviceType={deviceType}
          >
            {getScreenComponent(leftFlow, 'original')}
          </DeviceFrame>

          {/* Bottom Card Summary */}
          <div className="mt-4 max-w-[380px] p-3 rounded-xl bg-red-950/20 border border-red-900/40 text-xs text-neutral-400">
            <span className="text-red-400 font-bold block mb-1 uppercase font-mono text-[10px]">
              Baseline Flaws Audited
            </span>
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              This screen reproduces the audited Zara app workflow. Tap any interactive element or the numbered red badges to inspect heuristic friction points.
            </p>
          </div>
        </div>

        {/* Center Mirroring Sync Indicator */}
        <div className="hidden lg:flex flex-col items-center justify-center self-center gap-2 py-8 text-neutral-600">
          <div className="h-28 w-px bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />
          <div className="bg-neutral-900 border border-neutral-700 p-2 rounded-full text-neutral-300 shadow-md">
            ⇄
          </div>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest writing-mode-vertical">
            MIRRORED
          </span>
          <div className="h-28 w-px bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />
        </div>

        {/* Right Device: Enhanced (Redesigned) */}
        <div className="flex flex-col items-center">
          <DeviceFrame
            variant="enhanced"
            title="Zara Redesign"
            subtitle="Report 2 Solution"
            deviceType={deviceType}
          >
            {getScreenComponent(rightFlow, 'enhanced')}
          </DeviceFrame>

          {/* Bottom Card Summary */}
          <div className="mt-4 max-w-[380px] p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-neutral-400">
            <span className="text-emerald-400 font-bold block mb-1 uppercase font-mono text-[10px]">
              Report 2 Enhancements
            </span>
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              Implemented solutions from team research. Tap on the screen to trigger smooth state changes, or tap green badges to view Nielsen Heuristic rationale.
            </p>
          </div>
        </div>
      </div>

      <UXInspectorModal />
    </div>
  );
};

export default function App() {
  return (
    <FlowProvider>
      <div className="min-h-screen bg-[#090a0c] text-neutral-100 flex flex-col font-sans">
        <TopNavBar />
        <PrototypeCanvas />
      </div>
    </FlowProvider>
  );
}
