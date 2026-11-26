import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { RibbonTab } from '../types';
import { RibbonTabBar } from './ribbon/RibbonTabBar';
import { LoadingSpinner } from '@/components/LoadingSpinner';

import { TableDesignTab } from './ribbon/tabs/InsertTab/tables/tabledesign_subTab/tabledesign';
import { TableLayoutTab } from './ribbon/tabs/InsertTab/tables/tablelayout_subTab/tablelayout';
import { EquationTab } from './ribbon/tabs/InsertTab/symbols/equation_subTab/EquationTab';
import { HeaderFooterTab } from './ribbon/tabs/HeaderFooterTab/HeaderFooterTab';
import { isAnyModalOpen, isEventInsideModal } from '../utils/modalScroll';

// Helper for resilient safe lazy loading with retry
const safeLazy = (importFactory: () => Promise<Record<string, React.ComponentType<any>>>, name: string) => 
    React.lazy(async () => {
        let lastError = null;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const m = await importFactory();
                const Comp = m[name] || (m as any).default;
                if (Comp) return { default: Comp };
            } catch (err) {
                lastError = err;
                console.warn(`Failed attempt ${attempt} loading ${name}, retrying...`, err);
                await new Promise(res => setTimeout(res, 200 * attempt));
            }
        }
        console.error(`Final failure loading ${name}:`, lastError);
        return { 
            default: () => (
                <div className="flex items-center gap-2 p-3 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 rounded border border-amber-200 dark:border-amber-800">
                    <span>Unable to load {name} tools right now.</span>
                    <button onClick={() => window.location.reload()} className="underline font-semibold">Reload</button>
                </div>
            ) 
        };
    });

// Lazy Load primary Tabs
const HomeTab = safeLazy(() => import('./ribbon/tabs/HomeTab/HomeTab'), 'HomeTab');
const InsertTab = safeLazy(() => import('./ribbon/tabs/InsertTab/InsertTab'), 'InsertTab');
const ViewTab = safeLazy(() => import('./ribbon/tabs/ViewTab/ViewTab'), 'ViewTab');
const FileTab = safeLazy(() => import('./ribbon/tabs/FileTab/FileTab'), 'FileTab');
const LayoutTab = safeLazy(() => import('./ribbon/tabs/LayoutTab/LayoutTab'), 'LayoutTab');
const ReferencesTab = safeLazy(() => import('./ribbon/tabs/ReferencesTab/ReferencesTab'), 'ReferencesTab');
const MailingsTab = safeLazy(() => import('./ribbon/tabs/MailingsTab/MailingsTab'), 'MailingsTab');
const DrawTab = safeLazy(() => import('./ribbon/tabs/DrawTab/DrawTab'), 'DrawTab');
const DesignTab = safeLazy(() => import('./ribbon/tabs/DesignTab/DesignTab'), 'DesignTab');
const ReviewTab = safeLazy(() => import('./ribbon/tabs/ReviewTab/ReviewTab'), 'ReviewTab');

interface RibbonProps {
  activeTab: RibbonTab | null;
  onTabChange: (tab: RibbonTab) => void;
  placement?: 'top' | 'bottom';
}

const TabLoading = () => (
  <div className="flex items-center justify-center h-20 w-full text-slate-400 gap-3">
    <LoadingSpinner className="w-5 h-5" />
    <span className="text-xs">Loading tools...</span>
  </div>
);

export const Ribbon: React.FC<RibbonProps> = ({ 
  activeTab, 
  onTabChange,
  placement = 'top'
}) => {

  const [height, setHeight] = useState<number>(108);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getResponsiveMinFloor = () => {
    if (typeof window === 'undefined') return 112;
    if (window.innerWidth < 768) return 86;
    if (window.innerWidth < 1024) return 98;
    return 112;
  };

  useEffect(() => {
    if (!activeTab) {
      setHeight(0);
      return;
    }

    const measure = () => {
      if (!contentRef.current) return;
      const contentHeight = Math.ceil(contentRef.current.scrollHeight);
      setHeight(Math.max(contentHeight, getResponsiveMinFloor()));
    };

    measure();
    const rafId = requestAnimationFrame(measure);
    const el = contentRef.current;
    let observer: ResizeObserver | null = null;
    if (el && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure);
      observer.observe(el);
    }
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [activeTab]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (isEventInsideModal(e.target) || isAnyModalOpen()) return;
        if (e.deltaY === 0) return;
        if (el.scrollWidth > el.clientWidth) {
           e.preventDefault();
           el.scrollLeft += e.deltaY;
        }
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, [activeTab]); 

  const tabContent = useMemo(() => {
    return (
      <Suspense fallback={<TabLoading />}>
        {(() => {
          switch (activeTab) {
            case RibbonTab.HOME: return <HomeTab />;
            case RibbonTab.INSERT: return <InsertTab />;
            case RibbonTab.DRAW: return <DrawTab />;
            case RibbonTab.DESIGN: return <DesignTab />;
            case RibbonTab.LAYOUT: return <LayoutTab />;
            case RibbonTab.REFERENCES: return <ReferencesTab />;
            case RibbonTab.MAILINGS: return <MailingsTab />;
            case RibbonTab.REVIEW: return <ReviewTab />;
            case RibbonTab.VIEW: return <ViewTab />;
            case RibbonTab.FILE: return <FileTab />;
            case RibbonTab.TABLE_DESIGN: return <TableDesignTab />;
            case RibbonTab.TABLE_LAYOUT: return <TableLayoutTab />;
            case RibbonTab.EQUATION: return <EquationTab />;
            case RibbonTab.HEADER_FOOTER: return <HeaderFooterTab />;
            default: return activeTab ? <HomeTab /> : null;
          }
        })()}
      </Suspense>
    );
  }, [activeTab]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) {
      return;
    }
    e.preventDefault();
  };

  const isBottom = placement === 'bottom';

  return (
    <div 
      onMouseDown={handleMouseDown}
      className={`flex z-20 no-print relative bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-300 ${
        isBottom ? 'flex-col-reverse shadow-[0_-4px_16px_rgba(15,23,42,0.06)]' : 'flex-col shadow-[0_1px_3px_rgba(15,23,42,0.05)]'
      }`}
    >
      <RibbonTabBar activeTab={activeTab} onTabChange={onTabChange} />

      <div 
        className={`bg-white dark:bg-[#1e293b] ${isBottom ? 'border-t' : 'border-b'} border-slate-200/90 dark:border-slate-700/80 relative z-10 transition-[height,opacity] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${activeTab ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          height: activeTab ? `${Math.max(height, getResponsiveMinFloor())}px` : '0px'
        }}
      >
         <div 
            ref={scrollContainerRef}
            className="h-full w-full overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x"
         >
            <div 
                ref={contentRef}
                style={{ minHeight: `${getResponsiveMinFloor() - 4}px` }}
                className={`flex min-h-[108px] min-w-max items-stretch gap-1 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 animate-in ${isBottom ? 'slide-in-from-bottom-2' : 'slide-in-from-top-2'} duration-300 fill-mode-forwards`}
            >
                {activeTab && tabContent}
            </div>
         </div>
         
         <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-[#1e293b] to-transparent pointer-events-none md:hidden"></div>
      </div>
    </div>
  );
};

export default React.memo(Ribbon);

