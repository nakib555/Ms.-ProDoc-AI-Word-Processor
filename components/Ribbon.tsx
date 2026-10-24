
import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { RibbonTab } from '../types';
import { RibbonTabBar } from './ribbon/RibbonTabBar';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Helper for safe lazy loading
const safeLazy = (importPromise: Promise<Record<string, React.ComponentType<any>>>, name: string) => 
    React.lazy(() => importPromise.then(m => ({ default: m[name] || (() => <div className="p-2 text-xs text-red-500">Failed to load {name}</div>) })));

// Lazy Load Tabs
const HomeTab = safeLazy(import('./ribbon/tabs/HomeTab/HomeTab'), 'HomeTab');
const InsertTab = safeLazy(import('./ribbon/tabs/InsertTab/InsertTab'), 'InsertTab');
const ViewTab = safeLazy(import('./ribbon/tabs/ViewTab/ViewTab'), 'ViewTab');
const FileTab = safeLazy(import('./ribbon/tabs/FileTab/FileTab'), 'FileTab');
const LayoutTab = safeLazy(import('./ribbon/tabs/LayoutTab/LayoutTab'), 'LayoutTab');
const ReferencesTab = safeLazy(import('./ribbon/tabs/ReferencesTab/ReferencesTab'), 'ReferencesTab');
const MailingsTab = safeLazy(import('./ribbon/tabs/MailingsTab/MailingsTab'), 'MailingsTab');
const DrawTab = safeLazy(import('./ribbon/tabs/DrawTab/DrawTab'), 'DrawTab');
const DesignTab = safeLazy(import('./ribbon/tabs/DesignTab/DesignTab'), 'DesignTab');
const ReviewTab = safeLazy(import('./ribbon/tabs/ReviewTab/ReviewTab'), 'ReviewTab');
const TableDesignTab = safeLazy(import('./ribbon/tabs/InsertTab/tables/tabledesign_subTab/tabledesign'), 'TableDesignTab');
const TableLayoutTab = safeLazy(import('./ribbon/tabs/InsertTab/tables/tablelayout_subTab/tablelayout'), 'TableLayoutTab');
const EquationTab = safeLazy(import('./ribbon/tabs/InsertTab/symbols/equation_subTab/EquationTab'), 'EquationTab');
const HeaderFooterTab = safeLazy(import('./ribbon/tabs/HeaderFooterTab/HeaderFooterTab'), 'HeaderFooterTab');

import { useEditor } from '../contexts/EditorContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Cloud, Check, Sun, Moon, MessageSquare, 
  Code, ChevronUp, ChevronDown, RotateCcw, RotateCw, FileEdit
} from 'lucide-react';

interface RibbonProps {
  activeTab: RibbonTab | null;
  onTabChange: (tab: RibbonTab) => void;
}

const TabLoading = () => (
  <div className="flex items-center justify-center h-16 w-full text-slate-400 gap-3">
    <LoadingSpinner className="w-4 h-4 text-indigo-500" />
    <span className="text-xs font-medium tracking-tight">Initializing tools...</span>
  </div>
);

const Ribbon: React.FC<RibbonProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { 
    editor, 
    documentTitle, 
    setDocumentTitle, 
    saveStatus, 
    showComments, 
    setShowComments, 
    showJsonInspector, 
    setShowJsonInspector,
    comments 
  } = useEditor();

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
     if (activeTab && contentRef.current) {
        const timer = setTimeout(() => {
            if (contentRef.current) {
                const contentHeight = contentRef.current.scrollHeight;
                setHeight(Math.max(contentHeight, 82));
            }
        }, 40);
        return () => clearTimeout(timer);
     } else {
        setTimeout(() => setHeight(0), 0);
     }
  }, [activeTab]);

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
            default: return activeTab ? <div className="flex items-center justify-center w-full h-full text-slate-400 italic text-xs">Tools ready...</div> : null;
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

  const activeCommentsCount = comments?.filter(c => !c.resolved).length || 0;

  return (
    <header 
      onMouseDown={handleMouseDown}
      className="flex flex-col z-30 no-print relative bg-slate-950 text-slate-100 select-none border-b border-slate-800/80 transition-colors duration-200"
    >
      {/* Studio Top Command Bar */}
      <div className="flex items-center justify-between gap-4 px-3.5 py-2 border-b border-slate-800/60 bg-[#020617] text-slate-200">
        {/* Left Zone: Brand and Document Title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-sm ring-1 ring-white/10">
              <FileEdit size={16} strokeWidth={2.25} />
            </div>
            <span className="font-semibold text-xs tracking-tight text-white whitespace-nowrap hidden sm:inline">
              Doc Writer <span className="text-[10px] uppercase font-mono text-indigo-400 font-normal">Studio</span>
            </span>
          </div>

          <div className="h-4 w-[1px] bg-slate-800 mx-1 shrink-0" aria-hidden="true" />

          {/* Inline Document Name Editor */}
          <div className="flex items-center gap-2">
            <input 
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="bg-transparent hover:bg-slate-900 focus:bg-slate-900 border border-transparent hover:border-slate-800 focus:border-indigo-500/80 rounded px-2 py-0.5 text-xs font-medium text-slate-200 focus:text-white transition-all outline-none w-36 sm:w-48 md:w-60 truncate"
              placeholder="Untitled Document"
              title="Click to rename document"
            />

            {/* Save Status Indicator */}
            <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
              {saveStatus === 'saving' ? (
                <span className="flex items-center gap-1 text-indigo-400">
                  <LoadingSpinner className="w-3 h-3" />
                  <span className="hidden md:inline">Saving</span>
                </span>
              ) : saveStatus === 'unsaved' ? (
                <span className="flex items-center gap-1 text-amber-400" title="Unsaved changes">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="hidden md:inline">Unsaved</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-slate-400 hover:text-slate-300">
                  <Cloud size={13} className="text-slate-500" />
                  <span className="hidden md:inline">Saved</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center Zone: Quick Undo / Redo */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-0.5 rounded-md border border-slate-800">
          <button
            type="button"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw size={13} />
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <RotateCw size={13} />
          </button>
        </div>

        {/* Right Zone: Global Studio Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Comments Sidebar Toggle */}
          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            className={`relative p-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              showComments 
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
            title="Comments & Collaboration"
          >
            <MessageSquare size={14} />
            <span className="hidden xl:inline text-[11px]">Comments</span>
            {activeCommentsCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-mono bg-indigo-500 text-white rounded-full leading-none">
                {activeCommentsCount}
              </span>
            )}
          </button>

          {/* JSON Inspector Toggle */}
          <button
            type="button"
            onClick={() => setShowJsonInspector(!showJsonInspector)}
            className={`p-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              showJsonInspector 
                ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
            title="Document Model Inspector"
          >
            <Code size={14} />
            <span className="hidden xl:inline text-[11px]">Inspector</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent transition-colors"
            title={`Current theme: ${theme}. Click to switch theme`}
          >
            {theme === 'dark' || theme === 'ocean' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <div className="h-4 w-[1px] bg-slate-800 mx-0.5 shrink-0" aria-hidden="true" />

          {/* Collapse/Expand Deck Toggle */}
          <button
            type="button"
            onClick={() => onTabChange(activeTab ? (null as any) : RibbonTab.HOME)}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 transition-colors border border-transparent"
            title={activeTab ? "Collapse Command Deck" : "Expand Command Deck"}
          >
            {activeTab ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Segmented Workspace Switcher */}
      <RibbonTabBar activeTab={activeTab} onTabChange={onTabChange} />

      {/* Contemporary Studio Command Deck */}
      <div 
        className={`bg-white dark:bg-[#020617] border-b border-slate-200 dark:border-slate-800/90 relative z-10 transition-all duration-200 ease-out overflow-hidden ${
          activeTab ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          height: activeTab ? `${Math.max(height, 82)}px` : '0px'
        }}
      >
         <div 
            ref={scrollContainerRef}
            className="h-full w-full overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x"
         >
            <div 
                ref={contentRef}
                className="flex h-full min-w-max items-center px-2 py-1"
            >
                {activeTab && tabContent}
            </div>
         </div>
      </div>
    </header>
  );
};

export default React.memo(Ribbon);
