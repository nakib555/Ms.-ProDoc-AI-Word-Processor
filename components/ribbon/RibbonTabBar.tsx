
import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import { RibbonTab } from '../../types';
import { useEditor } from '../../contexts/EditorContext';
import { 
  ChevronLeft, ChevronRight,
  FileText, Edit3, PlusCircle, PenTool, Palette,
  Columns, BookOpen, Mail, CheckSquare,
  Eye, Table, PaintBucket, Sigma, LayoutPanelTop, FolderDown
} from 'lucide-react';

interface RibbonTabBarProps {
  activeTab: RibbonTab | null;
  onTabChange: (tab: RibbonTab) => void;
}

const TAB_CONFIG: Record<string, { icon: React.ElementType, label: string, color: string }> = {
  [RibbonTab.HOME]: { icon: Edit3, label: 'Compose', color: 'text-indigo-500' },
  [RibbonTab.INSERT]: { icon: PlusCircle, label: 'Insert', color: 'text-blue-500' },
  [RibbonTab.LAYOUT]: { icon: Columns, label: 'Page Setup', color: 'text-cyan-500' },
  [RibbonTab.DESIGN]: { icon: Palette, label: 'Styles & Theme', color: 'text-purple-500' },
  [RibbonTab.DRAW]: { icon: PenTool, label: 'Ink & Canvas', color: 'text-pink-500' },
  [RibbonTab.REFERENCES]: { icon: BookOpen, label: 'References', color: 'text-amber-500' },
  [RibbonTab.MAILINGS]: { icon: Mail, label: 'Automations', color: 'text-teal-500' },
  [RibbonTab.REVIEW]: { icon: CheckSquare, label: 'Review & Audit', color: 'text-emerald-500' },
  [RibbonTab.VIEW]: { icon: Eye, label: 'Display', color: 'text-sky-500' },
  [RibbonTab.FILE]: { icon: FolderDown, label: 'Project', color: 'text-slate-500' },
};

interface TabButtonProps {
    tabId: string;
    icon: any;
    label: string;
    isActive: boolean;
    onClick: () => void;
    isContextual?: boolean;
    colorClass?: string;
}

const TabButton = memo(({ tabId, icon: Icon, label, isActive, onClick, isContextual, colorClass }: TabButtonProps) => {
    const configColor = TAB_CONFIG[tabId]?.color || 'text-slate-500';
    const baseColor = isContextual 
      ? 'text-amber-700 dark:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-950/40' 
      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100';

    return (
        <button
            type="button"
            onClick={onClick}
            onMouseDown={(e) => e.preventDefault()}
            className={`
              px-2.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 mx-0.5 select-none
              ${isActive 
                ? `bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold shadow-sm border border-slate-900 dark:border-white` 
                : `${baseColor} hover:bg-slate-200/60 dark:hover:bg-slate-800/60 border border-transparent`}
              ${isContextual && !isActive ? 'border-dashed border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20' : ''}
            `}
        >
            {Icon && (
              <Icon 
                size={14} 
                className={`transition-colors duration-150 ${isActive ? 'text-current' : isContextual ? 'text-amber-600 dark:text-amber-400' : configColor}`}
                strokeWidth={isActive ? 2.25 : 1.75}
              />
            )}
            <span className="tracking-tight">{label}</span>
        </button>
    );
});

export const RibbonTabBar: React.FC<RibbonTabBarProps> = React.memo(({ activeTab, onTabChange }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const { activeElementType, viewMode, activeEditingArea } = useEditor();
  const prevElementTypeRef = useRef(activeElementType);
  const prevEditingAreaRef = useRef(activeEditingArea);

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    if (activeTab && scrollContainerRef.current) {
      const buttons = Array.from(scrollContainerRef.current.children) as HTMLElement[];
      const labelToFind = TAB_CONFIG[activeTab]?.label || activeTab;
      const activeButton = buttons.find(btn => btn.textContent?.includes(labelToFind));
      
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  useEffect(() => {
      let timeoutId: ReturnType<typeof setTimeout>;
      const prevType = prevElementTypeRef.current;
      const prevArea = prevEditingAreaRef.current;

      if ((activeEditingArea === 'header' || activeEditingArea === 'footer') && (prevArea !== 'header' && prevArea !== 'footer')) {
          onTabChange(RibbonTab.HEADER_FOOTER);
      } else if ((prevArea === 'header' || prevArea === 'footer') && (activeEditingArea !== 'header' && activeEditingArea !== 'footer')) {
          onTabChange(RibbonTab.HOME);
      }
      else if (activeElementType === 'equation' && prevType !== 'equation') {
          onTabChange(RibbonTab.EQUATION);
      } 
      else if (activeElementType === 'table' && prevType !== 'table') {
          onTabChange(RibbonTab.TABLE_DESIGN);
      } 
      else {
          if (activeTab === RibbonTab.EQUATION && activeElementType !== 'equation') {
              timeoutId = setTimeout(() => onTabChange(RibbonTab.HOME), 200);
          }
          else if ((activeTab === RibbonTab.TABLE_DESIGN || activeTab === RibbonTab.TABLE_LAYOUT) && activeElementType !== 'table') {
              timeoutId = setTimeout(() => onTabChange(RibbonTab.HOME), 200);
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

  const isHeaderFooterMode = activeEditingArea === 'header' || activeEditingArea === 'footer';

  return (
    <div className="relative flex items-center bg-slate-100/90 dark:bg-[#090d16] px-2 py-1.5 flex-shrink-0 z-20 w-full group select-none border-b border-slate-200 dark:border-slate-800">
       <div 
          className={`absolute left-0 top-0 bottom-0 z-30 flex items-center pl-1 pr-6 bg-gradient-to-r from-slate-100 dark:from-[#090d16] via-slate-100/90 dark:via-[#090d16]/90 to-transparent transition-opacity duration-200 ${showLeftArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
       >
           <button 
              type="button"
              onClick={() => scroll('left')}
              onMouseDown={(e) => e.preventDefault()}
              className="p-1 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95 transition-all"
              aria-label="Scroll left"
           >
              <ChevronLeft size={14} strokeWidth={2.5} />
           </button>
       </div>

      <div 
        ref={scrollContainerRef}
        className="flex px-1 overflow-x-auto overflow-y-hidden no-scrollbar w-full items-center gap-1 scroll-smooth touch-pan-x"
      >
        {Object.keys(TAB_CONFIG).map((key) => {
          const tab = key as RibbonTab;
          const config = TAB_CONFIG[tab];
          return (
            <TabButton 
                key={tab}
                tabId={tab}
                icon={config.icon}
                label={config.label || tab}
                isActive={activeTab === tab}
                onClick={() => onTabChange(tab)}
            />
          );
        })}
        
        { isHeaderFooterMode && (
            <>
                <div className="w-[1px] h-6 bg-slate-700 mx-1 mb-2"></div>
                <TabButton tabId={RibbonTab.HEADER_FOOTER} icon={LayoutPanelTop} label="Header & Footer" isActive={activeTab === RibbonTab.HEADER_FOOTER} onClick={() => onTabChange(RibbonTab.HEADER_FOOTER)} isContextual colorClass="text-emerald-500" />
            </>
        )}

        {activeElementType === 'table' && (
            <>
                <div className="w-[1px] h-6 bg-slate-700 mx-1 mb-2"></div>
                <TabButton tabId={RibbonTab.TABLE_DESIGN} icon={PaintBucket} label="Table Design" isActive={activeTab === RibbonTab.TABLE_DESIGN} onClick={() => onTabChange(RibbonTab.TABLE_DESIGN)} isContextual colorClass="text-yellow-500" />
                <TabButton tabId={RibbonTab.TABLE_LAYOUT} icon={Table} label="Table Layout" isActive={activeTab === RibbonTab.TABLE_LAYOUT} onClick={() => onTabChange(RibbonTab.TABLE_LAYOUT)} isContextual colorClass="text-yellow-500" />
            </>
        )}

        {activeElementType === 'equation' && (
            <>
                <div className="w-[1px] h-6 bg-slate-700 mx-1 mb-2"></div>
                <TabButton tabId={RibbonTab.EQUATION} icon={Sigma} label="Equation" isActive={activeTab === RibbonTab.EQUATION} onClick={() => onTabChange(RibbonTab.EQUATION)} isContextual colorClass="text-blue-500" />
            </>
        )}

        <div className="w-8 flex-shrink-0 h-1"></div> 
      </div>

       <div 
          className={`absolute right-0 top-0 bottom-0 z-30 flex items-center pr-1 pl-8 bg-gradient-to-l from-slate-50 dark:from-[#0f172a] via-slate-50/90 dark:via-[#0f172a]/90 to-transparent transition-opacity duration-200 ${showRightArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
       >
           <button 
              onClick={() => scroll('right')}
              onMouseDown={(e) => e.preventDefault()}
              className="p-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95 transition-all"
              aria-label="Scroll right"
           >
              <ChevronRight size={16} strokeWidth={2.5} />
           </button>
       </div>
    </div>
  );
});
