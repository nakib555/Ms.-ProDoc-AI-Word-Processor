
import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import { RibbonTab } from '../../types';
import { useEditor } from '../../contexts/EditorContext';
import { 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  PenLine, Plus, Layout, Palette,
  CheckCircle2, Eye, FolderKanban,
  Table, PaintBucket, Sigma, LayoutPanelTop
} from 'lucide-react';

interface RibbonTabBarProps {
  activeTab: RibbonTab | null;
  onTabChange: (tab: RibbonTab) => void;
}

interface PrimaryTabConfig {
  tab: RibbonTab;
  label: string;
  icon: React.ElementType;
  iconColor: string;
}

const PRIMARY_TABS: PrimaryTabConfig[] = [
  { 
    tab: RibbonTab.HOME, 
    label: 'Compose', 
    icon: PenLine, 
    iconColor: 'text-indigo-600 dark:text-indigo-400' 
  },
  { 
    tab: RibbonTab.INSERT, 
    label: 'Insert', 
    icon: Plus, 
    iconColor: 'text-cyan-600 dark:text-cyan-400' 
  },
  { 
    tab: RibbonTab.LAYOUT, 
    label: 'Page Setup', 
    icon: Layout, 
    iconColor: 'text-emerald-600 dark:text-emerald-400' 
  },
  { 
    tab: RibbonTab.DESIGN, 
    label: 'Styles & Themes', 
    icon: Palette, 
    iconColor: 'text-fuchsia-600 dark:text-fuchsia-400' 
  },
  { 
    tab: RibbonTab.REVIEW, 
    label: 'Review & Audit', 
    icon: CheckCircle2, 
    iconColor: 'text-teal-600 dark:text-teal-400' 
  },
  { 
    tab: RibbonTab.VIEW, 
    label: 'Display', 
    icon: Eye, 
    iconColor: 'text-sky-600 dark:text-sky-400' 
  },
  { 
    tab: RibbonTab.FILE, 
    label: 'Project', 
    icon: FolderKanban, 
    iconColor: 'text-amber-600 dark:text-amber-400' 
  }
];

interface TabButtonProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
  iconColorClass?: string;
  isContextual?: boolean;
}

const TabButton = memo(({ icon: Icon, label, isActive, onClick, iconColorClass, isContextual }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      className={`
        px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-150 whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 select-none
        ${isActive 
          ? 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white shadow-sm font-semibold ring-1 ring-slate-300 dark:ring-slate-600 scale-[1.02]' 
          : isContextual
            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 hover:bg-white dark:hover:bg-amber-900/40 shadow-xs'
            : 'bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-750 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 shadow-xs'
        }
      `}
    >
      {Icon && (
        <Icon 
          size={15} 
          className={`transition-colors duration-150 flex-shrink-0 ${
            isActive 
              ? 'text-indigo-600 dark:text-indigo-400' 
              : iconColorClass || 'text-slate-500'
          }`}
          strokeWidth={isActive ? 2.5 : 2}
        />
      )}
      <span>{label}</span>
    </button>
  );
});

export const RibbonTabBar: React.FC<RibbonTabBarProps> = React.memo(({ activeTab, onTabChange }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const lastActiveTabRef = useRef<RibbonTab>(RibbonTab.HOME);
  const { activeElementType, activeEditingArea } = useEditor();
  const prevElementTypeRef = useRef(activeElementType);
  const prevEditingAreaRef = useRef(activeEditingArea);

  // Store last active tab for collapse/expand restore
  useEffect(() => {
    if (activeTab) {
      lastActiveTabRef.current = activeTab;
    }
  }, [activeTab]);

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 4);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 4);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 220;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    if (activeTab && scrollContainerRef.current) {
      const buttons = Array.from(scrollContainerRef.current.children) as HTMLElement[];
      const activeConfig = PRIMARY_TABS.find(t => t.tab === activeTab);
      const labelToFind = activeConfig ? activeConfig.label : activeTab;
      const activeButton = buttons.find(btn => btn.textContent?.includes(labelToFind));
      
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const prevType = prevElementTypeRef.current;
    const prevArea = prevEditingAreaRef.current;

    if ((activeEditingArea === 'header' || activeEditingArea === 'footer') && (prevArea !== 'header' && prevArea !== 'footer')) {
      if (activeTab !== RibbonTab.HEADER_FOOTER) onTabChange(RibbonTab.HEADER_FOOTER);
    } else if ((prevArea === 'header' || prevArea === 'footer') && (activeEditingArea !== 'header' && activeEditingArea !== 'footer')) {
      if (activeTab !== RibbonTab.HOME) onTabChange(RibbonTab.HOME);
    }
    else if (activeElementType === 'equation' && prevType !== 'equation') {
      if (activeTab !== RibbonTab.EQUATION) onTabChange(RibbonTab.EQUATION);
    } 
    else if (activeElementType === 'table' && prevType !== 'table') {
      if (activeTab !== RibbonTab.TABLE_DESIGN && activeTab !== RibbonTab.TABLE_LAYOUT) {
        onTabChange(RibbonTab.TABLE_DESIGN);
      }
    } 
    else {
      if (activeTab === RibbonTab.EQUATION && activeElementType !== 'equation') {
        timeoutId = setTimeout(() => {
          if (activeTabRef.current !== RibbonTab.HOME) onTabChange(RibbonTab.HOME);
        }, 200);
      }
      else if ((activeTab === RibbonTab.TABLE_DESIGN || activeTab === RibbonTab.TABLE_LAYOUT) && activeElementType !== 'table') {
        timeoutId = setTimeout(() => {
          if (activeTabRef.current !== RibbonTab.HOME) onTabChange(RibbonTab.HOME);
        }, 200);
      }
    }

    prevElementTypeRef.current = activeElementType;
    prevEditingAreaRef.current = activeEditingArea;
    
    return () => clearTimeout(timeoutId);
  }, [activeElementType, activeEditingArea, activeTab, onTabChange]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        if (el.scrollWidth > el.clientWidth) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      };
      
      const onScroll = () => checkScroll();

      el.addEventListener('wheel', onWheel, { passive: false });
      el.addEventListener('scroll', onScroll);
      setTimeout(checkScroll, 50);

      return () => {
        el.removeEventListener('wheel', onWheel);
        el.removeEventListener('scroll', onScroll);
      };
    }
  }, [activeElementType, activeEditingArea, checkScroll]);

  const toggleRibbonCollapse = useCallback(() => {
    if (activeTab) {
      onTabChange(activeTab); // Will toggle to null via App.tsx handleTabChange
    } else {
      onTabChange(lastActiveTabRef.current || RibbonTab.HOME);
    }
  }, [activeTab, onTabChange]);

  const isHeaderFooterMode = activeEditingArea === 'header' || activeEditingArea === 'footer';

  return (
    <div className="relative flex items-center bg-[#f1f5f9] dark:bg-[#0b1324] px-2 py-1.5 flex-shrink-0 z-20 w-full group select-none border-b border-slate-200/90 dark:border-slate-800 transition-colors">
      
      {/* Collapse / Expand Button on the Left */}
      <div className="flex-shrink-0 mr-1.5">
        <button
          onClick={toggleRibbonCollapse}
          onMouseDown={(e) => e.preventDefault()}
          title={activeTab ? "Collapse ribbon toolbar" : "Expand ribbon toolbar"}
          aria-label={activeTab ? "Collapse ribbon toolbar" : "Expand ribbon toolbar"}
          className="w-7 h-7 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-center justify-center transition-all active:scale-95"
        >
          {activeTab ? (
            <ChevronUp size={15} strokeWidth={2.5} />
          ) : (
            <ChevronDown size={15} strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* Overflow Left Arrow */}
      {showLeftArrow && (
        <div className="absolute left-10 top-0 bottom-0 z-30 flex items-center pl-1 pr-6 bg-gradient-to-r from-[#f1f5f9] dark:from-[#0b1324] via-[#f1f5f9]/90 dark:via-[#0b1324]/90 to-transparent">
          <button 
            onClick={() => scroll('left')}
            onMouseDown={(e) => e.preventDefault()}
            className="p-1 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs active:scale-95 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={14} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* Main Tab Pills Track */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto overflow-y-hidden no-scrollbar w-full items-center gap-1.5 scroll-smooth touch-pan-x py-0.5"
      >
        {PRIMARY_TABS.map((item) => (
          <TabButton 
            key={item.tab}
            icon={item.icon}
            label={item.label}
            iconColorClass={item.iconColor}
            isActive={activeTab === item.tab}
            onClick={() => onTabChange(item.tab)}
          />
        ))}
        
        {/* Contextual Header & Footer Tab */}
        {isHeaderFooterMode && (
          <>
            <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1 flex-shrink-0" />
            <TabButton 
              icon={LayoutPanelTop} 
              label="Header & Footer" 
              isActive={activeTab === RibbonTab.HEADER_FOOTER} 
              onClick={() => onTabChange(RibbonTab.HEADER_FOOTER)} 
              isContextual 
              iconColorClass="text-emerald-600 dark:text-emerald-400" 
            />
          </>
        )}

        {/* Contextual Table Tabs */}
        {activeElementType === 'table' && (
          <>
            <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1 flex-shrink-0" />
            <TabButton 
              icon={PaintBucket} 
              label="Table Design" 
              isActive={activeTab === RibbonTab.TABLE_DESIGN} 
              onClick={() => onTabChange(RibbonTab.TABLE_DESIGN)} 
              isContextual 
              iconColorClass="text-amber-600 dark:text-amber-400" 
            />
            <TabButton 
              icon={Table} 
              label="Table Layout" 
              isActive={activeTab === RibbonTab.TABLE_LAYOUT} 
              onClick={() => onTabChange(RibbonTab.TABLE_LAYOUT)} 
              isContextual 
              iconColorClass="text-amber-600 dark:text-amber-400" 
            />
          </>
        )}

        {/* Contextual Equation Tab */}
        {activeElementType === 'equation' && (
          <>
            <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1 flex-shrink-0" />
            <TabButton 
              icon={Sigma} 
              label="Equation" 
              isActive={activeTab === RibbonTab.EQUATION} 
              onClick={() => onTabChange(RibbonTab.EQUATION)} 
              isContextual 
              iconColorClass="text-blue-600 dark:text-blue-400" 
            />
          </>
        )}

        <div className="w-4 flex-shrink-0 h-1" />
      </div>

      {/* Overflow Right Arrow */}
      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 z-30 flex items-center pr-1 pl-6 bg-gradient-to-l from-[#f1f5f9] dark:from-[#0b1324] via-[#f1f5f9]/90 dark:via-[#0b1324]/90 to-transparent">
          <button 
            onClick={() => scroll('right')}
            onMouseDown={(e) => e.preventDefault()}
            className="p-1 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs active:scale-95 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
});
