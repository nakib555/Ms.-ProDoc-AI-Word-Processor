import React, { useRef, useEffect } from 'react';
import { 
  Type, PlusCircle, LayoutTemplate, BookOpen, MessageSquare, 
  Layers, Eye, Table as TableIcon, Sigma, LayoutPanelTop, 
  ChevronUp, ChevronDown
} from 'lucide-react';
import { StudioTab } from '../../types';
import { useEditor } from '../../contexts/EditorContext';

interface StudioTabBarProps {
  activeTab: StudioTab | null;
  onTabChange: (tab: StudioTab) => void;
  isTrayCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface TabDef {
  id: StudioTab;
  label: string;
  icon: React.ElementType;
}

const PRIMARY_TABS: TabDef[] = [
  { id: StudioTab.FORMAT, label: 'Format & Style', icon: Type },
  { id: StudioTab.INSERT, label: 'Insert', icon: PlusCircle },
  { id: StudioTab.CANVAS, label: 'Canvas & Page', icon: LayoutTemplate },
  { id: StudioTab.STRUCTURE, label: 'Citations & Structure', icon: BookOpen },
  { id: StudioTab.COLLABORATE, label: 'Collaborate & Review', icon: MessageSquare },
  { id: StudioTab.TEMPLATES, label: 'Templates & Merge', icon: Layers },
  { id: StudioTab.VIEW, label: 'Workspace View', icon: Eye },
];

export const StudioTabBar: React.FC<StudioTabBarProps> = ({
  activeTab,
  onTabChange,
  isTrayCollapsed,
  onToggleCollapse,
}) => {
  const { activeElementType, activeEditingArea } = useEditor();
  const prevElementTypeRef = useRef(activeElementType);
  const prevEditingAreaRef = useRef(activeEditingArea);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-switch contextual tabs based on editor selection
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const prevType = prevElementTypeRef.current;
    const prevArea = prevEditingAreaRef.current;

    if ((activeEditingArea === 'header' || activeEditingArea === 'footer') && (prevArea !== 'header' && prevArea !== 'footer')) {
      onTabChange(StudioTab.HEADER_FOOTER);
    } else if ((prevArea === 'header' || prevArea === 'footer') && (activeEditingArea !== 'header' && activeEditingArea !== 'footer')) {
      onTabChange(StudioTab.FORMAT);
    } else if (activeElementType === 'equation' && prevType !== 'equation') {
      onTabChange(StudioTab.EQUATION);
    } else if (activeElementType === 'table' && prevType !== 'table') {
      onTabChange(StudioTab.TABLE_DESIGN);
    } else {
      if (activeTab === StudioTab.EQUATION && activeElementType !== 'equation') {
        timeoutId = setTimeout(() => onTabChange(StudioTab.FORMAT), 150);
      } else if (activeTab === StudioTab.TABLE_DESIGN && activeElementType !== 'table') {
        timeoutId = setTimeout(() => onTabChange(StudioTab.FORMAT), 150);
      }
    }

    prevElementTypeRef.current = activeElementType;
    prevEditingAreaRef.current = activeEditingArea;

    return () => clearTimeout(timeoutId);
  }, [activeElementType, activeEditingArea, activeTab, onTabChange]);

  const isHeaderFooter = activeEditingArea === 'header' || activeEditingArea === 'footer';
  const isTableActive = activeElementType === 'table';
  const isEquationActive = activeElementType === 'equation';

  return (
    <nav 
      aria-label="Studio Command Bar Navigation"
      className="flex items-center justify-between px-3 bg-white dark:bg-[#090d16] border-b border-slate-200/90 dark:border-slate-800/90 select-none flex-shrink-0 z-20"
    >
      {/* Scrollable Tab Strip */}
      <div 
        ref={scrollContainerRef}
        className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1"
      >
        {PRIMARY_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              onMouseDown={(e) => e.preventDefault()}
              className={`
                relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 flex-shrink-0 cursor-pointer
                ${isActive
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 font-semibold shadow-xs'
                  : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }
              `}
            >
              <Icon 
                size={14} 
                className={`transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-300'}`} 
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span>{tab.label}</span>
              {isActive && (
                <div className="absolute -bottom-1 left-2 right-2 h-[2px] bg-indigo-600 dark:bg-indigo-400 rounded-full" />
              )}
            </button>
          );
        })}

        {/* Contextual Header & Footer Tab */}
        {isHeaderFooter && (
          <>
            <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800 mx-1 flex-shrink-0" />
            <button
              type="button"
              onClick={() => onTabChange(StudioTab.HEADER_FOOTER)}
              onMouseDown={(e) => e.preventDefault()}
              className={`
                relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 flex-shrink-0 cursor-pointer
                ${activeTab === StudioTab.HEADER_FOOTER
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-300 dark:ring-emerald-700'
                  : 'text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-100/50'
                }
              `}
            >
              <LayoutPanelTop size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>Header & Footer</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">Active</span>
            </button>
          </>
        )}

        {/* Contextual Table Studio Tab */}
        {isTableActive && (
          <>
            <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800 mx-1 flex-shrink-0" />
            <button
              type="button"
              onClick={() => onTabChange(StudioTab.TABLE_DESIGN)}
              onMouseDown={(e) => e.preventDefault()}
              className={`
                relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 flex-shrink-0 cursor-pointer
                ${activeTab === StudioTab.TABLE_DESIGN
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 ring-1 ring-amber-300 dark:ring-amber-700'
                  : 'text-amber-700 dark:text-amber-400 bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-100/50'
                }
              `}
            >
              <TableIcon size={14} className="text-amber-600 dark:text-amber-400" />
              <span>Table Studio</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">Active</span>
            </button>
          </>
        )}

        {/* Contextual Equation Studio Tab */}
        {isEquationActive && (
          <>
            <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800 mx-1 flex-shrink-0" />
            <button
              type="button"
              onClick={() => onTabChange(StudioTab.EQUATION)}
              onMouseDown={(e) => e.preventDefault()}
              className={`
                relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 flex-shrink-0 cursor-pointer
                ${activeTab === StudioTab.EQUATION
                  ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 ring-1 ring-sky-300 dark:ring-sky-700'
                  : 'text-sky-700 dark:text-sky-400 bg-sky-50/40 dark:bg-sky-950/20 hover:bg-sky-100/50'
                }
              `}
            >
              <Sigma size={14} className="text-sky-600 dark:text-sky-400" />
              <span>Equation Studio</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300">Active</span>
            </button>
          </>
        )}
      </div>

      {/* Right: Collapse / Expand Tray toggle */}
      <div className="flex items-center flex-shrink-0 ml-2">
        <button
          type="button"
          onClick={onToggleCollapse}
          onMouseDown={(e) => e.preventDefault()}
          title={isTrayCollapsed ? "Expand command bar (Ctrl+F1)" : "Collapse command bar (Ctrl+F1)"}
          className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {isTrayCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </div>
    </nav>
  );
};
