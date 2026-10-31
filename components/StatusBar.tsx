
import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Minus, Plus, FileText, Globe, Type, Layout, Sun, Moon, Lock, Unlock, ScanText, Droplets } from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';
import { useTheme } from '../contexts/ThemeContext';
import { useGestureContext } from '../contexts/GestureContext';
import { getDocumentStats } from '../utils/textUtils';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const WordCountDialog = React.lazy(() => import('./WordCountDialog').then(m => ({ default: m.WordCountDialog })));

interface StatusBarProps {
  position?: 'top' | 'bottom';
}

const StatusBar: React.FC<StatusBarProps> = ({ position = 'bottom' }) => {

  const { wordCount, zoom, viewMode, setViewMode, content, currentPage, setCurrentPage, totalPages, setZoom, isKeyboardLocked, setIsKeyboardLocked, isTableResizerEnabled, setIsTableResizerEnabled, selectionMode, setSelectionMode, zoomMode, setZoomMode } = useEditor();
  const { theme, toggleTheme } = useTheme();
  const { setHudZoom } = useGestureContext();
  const zoomControlsRef = useRef<HTMLDivElement>(null);
  const [showWordCountDialog, setShowWordCountDialog] = useState(false);
  const [showMobileTools, setShowMobileTools] = useState(false);
  const [showJumpDialog, setShowJumpDialog] = useState(false);
  const [jumpPageInput, setJumpPageInput] = useState('');

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(jumpPageInput, 10);
    if (!isNaN(target) && target >= 1 && target <= totalPages) {
      setCurrentPage(target);
      setShowJumpDialog(false);
      setJumpPageInput('');
    }
  };

  // Calculate stats only when necessary (when dialog is open or about to open)
  const detailedStats = useMemo(() => {
      if (!showWordCountDialog) return null;
      return getDocumentStats(content);
  }, [content, showWordCountDialog]);


  useEffect(() => {
    const el = zoomControlsRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (zoomMode !== 'custom') setZoomMode('custom');
      const direction = e.deltaY > 0 ? -1 : 1;
      setZoom(prev => {
        const next = Math.min(500, Math.max(10, prev + (direction * 5)));
        setHudZoom(next);
        return next;
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [viewMode, setZoom, zoomMode, setZoomMode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) {
      return;
    }
    e.preventDefault();
  };

  return (
    <>
        <div 
          onMouseDown={handleMouseDown}
          className={`h-9 sm:h-auto min-h-[2.25rem] bg-[#f1f5f9] dark:bg-[#0f172a] text-slate-700 dark:text-slate-300 flex items-center justify-between px-2 sm:px-4 text-xs sm:text-sm select-none z-30 no-print flex-shrink-0 transition-colors duration-300 box-content ${
            position === 'top'
              ? 'border-b border-slate-300/80 dark:border-slate-800 shadow-[0_1px_3px_rgba(15,23,42,0.05)]'
              : 'border-t border-slate-300/80 dark:border-slate-800 shadow-[0_-1px_3px_rgba(15,23,42,0.05)]'
          }`}
          style={position === 'top' ? { paddingTop: 'env(safe-area-inset-top)' } : { paddingBottom: 'env(safe-area-inset-bottom)' }}
        >

          <div className="flex items-center gap-3 sm:gap-6 font-medium shrink-0 h-full">
            <div 
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800 px-2 py-0.5 rounded cursor-pointer transition-colors whitespace-nowrap active:bg-slate-300 dark:active:bg-slate-700" 
                title="Click to jump to page"
                onClick={() => setShowJumpDialog(true)}
            >
                <Layout size={14} className="shrink-0 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">{viewMode === 'print' ? `Page ${currentPage} of ${totalPages}` : 'Web Layout'}</span>
                <span className="sm:hidden text-[10px] font-semibold">{viewMode === 'print' ? `${currentPage} / ${totalPages}` : 'Web'}</span>
            </div>

            
            <div 
                className="flex items-center gap-1.5 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-all px-2 py-0.5 rounded active:bg-slate-300 dark:active:bg-slate-700 whitespace-nowrap" 
                title="Click for detailed statistics"
                onClick={() => setShowWordCountDialog(true)}
            >
                <Type size={14} className="shrink-0" />
                <span className="hidden sm:inline">{wordCount} words</span>
                <span className="sm:hidden text-[10px] font-semibold">{wordCount} w</span>
            </div>
            
            <span className="hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer transition-colors hidden md:inline whitespace-nowrap">English (US)</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-auto pl-2">
            
            {/* Smart Selection Toggle (Mobile Helper) - Only visible on mobile */}
            <button 
                onClick={() => {
                    const newState = !selectionMode;
                    setSelectionMode(newState);
                    setIsKeyboardLocked(newState);
                }}
                className={`md:hidden p-1.5 rounded transition-all flex items-center gap-1 ${selectionMode ? 'text-indigo-400 bg-indigo-900/20 ring-1 ring-indigo-500/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                title={selectionMode ? "Disable Smart Select Mode" : "Enable Smart Select Mode (Tap to Extend Selection)"}
            >
                <ScanText size={14} />
                <span className="hidden sm:inline text-[10px] font-medium">{selectionMode ? 'Selecting' : 'Select'}</span>
            </button>

            {/* Keyboard Lock - Only visible on mobile */}
            <div className="relative md:hidden flex items-center">
              {showMobileTools && (
                <div className="absolute bottom-full right-0 mb-2 p-1.5 bg-slate-800 rounded-lg border border-slate-700 shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 whitespace-nowrap">
                  <button
                    onClick={() => { setIsKeyboardLocked(!isKeyboardLocked); setShowMobileTools(false); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all active:scale-95 ${isKeyboardLocked ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
                  >
                    {isKeyboardLocked ? <Lock size={12} /> : <Unlock size={12} />}
                    kboard
                  </button>
                  <button
                    onClick={() => { setIsTableResizerEnabled(!isTableResizerEnabled); setShowMobileTools(false); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all active:scale-95 ${isTableResizerEnabled ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
                  >
                    {isTableResizerEnabled ? <Lock size={12} /> : <Unlock size={12} />}
                    table resizer
                  </button>
                </div>
              )}
              <button 
                  onClick={() => setShowMobileTools(!showMobileTools)}
                  className={`p-1.5 rounded transition-all flex items-center gap-1 ${showMobileTools || isKeyboardLocked || isTableResizerEnabled ? 'text-blue-400 bg-blue-900/20 ring-1 ring-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  title="Mobile Tools"
              >
                  {(isKeyboardLocked || isTableResizerEnabled) ? <Lock size={14} /> : <Unlock size={14} />}
              </button>
            </div>

            <button 
                onClick={toggleTheme}
                className={`transition-colors p-1 ${theme === 'ocean' ? 'text-blue-500 hover:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-yellow-400'}`}
                title={theme === 'light' ? "Switch to Dark Mode" : theme === 'dark' ? "Switch to Ocean Mode" : "Switch to Light Mode"}
            >
                {theme === 'light' ? <Moon size={14} /> : theme === 'dark' ? <Droplets size={14} /> : <Sun size={14} />}
            </button>

            {/* View Modes - Desktop (Grouped) */}
            <div className="hidden sm:flex items-center bg-slate-200/80 dark:bg-slate-800 rounded-md p-0.5 border border-slate-300/80 dark:border-slate-700">
                 <button 
                    onClick={() => setViewMode('print')} 
                    className={`p-1 rounded flex items-center justify-center transition-all ${viewMode === 'print' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    title="Print Layout"
                 >
                    <FileText size={14} />
                 </button>
                 <button 
                    onClick={() => setViewMode('web')} 
                    className={`p-1 rounded flex items-center justify-center transition-all ${viewMode === 'web' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    title="Web Layout"
                 >
                    <Globe size={14} />
                 </button>
            </div>

            {/* View Mode Toggle - Mobile (Single Button) */}
            <button 
                onClick={() => setViewMode(prev => prev === 'print' ? 'web' : 'print')}
                className={`sm:hidden p-1.5 rounded transition-all flex items-center justify-center ${viewMode === 'web' ? 'text-blue-600 dark:text-blue-400 bg-blue-100/60 dark:bg-blue-900/20 ring-1 ring-blue-500/30' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800'}`}
                title={viewMode === 'print' ? "Switch to Web Layout" : "Switch to Print Layout"}
            >
                {viewMode === 'print' ? <FileText size={14} /> : <Globe size={14} />}
            </button>

            {/* Zoom Controls - Optimized for Mobile */}
            <div 
                ref={zoomControlsRef}
                className="flex items-center gap-0.5 sm:gap-3 cursor-ew-resize hover:bg-slate-200/70 dark:hover:bg-slate-800/50 rounded-lg px-1 transition-colors"
                title="Scroll to Zoom"
            >
                <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700 mx-1 hidden sm:block"></div>
                <button 
                    onClick={() => {
                        if (zoomMode !== 'custom') setZoomMode('custom');
                        setZoom(z => {
                            const next = Math.max(10, z - 10);
                            setHudZoom(next);
                            return next;
                        });
                    }} 
                    className="hover:bg-slate-200 dark:hover:bg-slate-800 p-1 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" 
                    title="Zoom Out"
                >
                    <Minus size={14} />
                </button>
                
                <div className="items-center gap-2 group relative hidden md:flex">
                    <input 
                        type="range" 
                        min="10" 
                        max="500" 
                        value={zoom} 
                        onChange={(e) => {
                            if (zoomMode !== 'custom') setZoomMode('custom');
                            const next = Number(e.target.value);
                            setZoom(next);
                            setHudZoom(next);
                        }}
                        className="w-16 sm:w-24 h-1 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
                        title="Zoom Level"
                    />
                </div>
                
                <button 
                    onClick={() => {
                        // Cycle zoom modes on click
                        if (zoomMode === 'custom') setZoomMode('fit-width');
                        else if (zoomMode === 'fit-width') setZoomMode('fit-page');
                        else setZoomMode('custom');
                    }}
                    className="w-12 sm:w-20 text-right font-semibold tabular-nums text-slate-800 dark:text-slate-200 text-[10px] sm:text-xs hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center justify-end gap-1"
                    title={`Current: ${zoomMode === 'custom' ? 'Custom' : zoomMode === 'fit-width' ? 'Fit Width' : 'Fit Page'} (Click to cycle)`}
                >
                    <span className="text-slate-500 dark:text-slate-400 font-semibold text-[9px] uppercase tracking-tighter hidden sm:inline">
                        {zoomMode === 'fit-width' ? 'Width' : zoomMode === 'fit-page' ? 'Page' : ''}
                    </span>
                    <span>{Number(zoom).toFixed(0)}%</span>
                </button>
                
                <button 
                    onClick={() => {
                        if (zoomMode !== 'custom') setZoomMode('custom');
                        setZoom(z => {
                            const next = Math.min(500, z + 10);
                            setHudZoom(next);
                            return next;
                        });
                    }} 
                    className="hover:bg-slate-200 dark:hover:bg-slate-800 p-1 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" 
                    title="Zoom In"
                >
                    <Plus size={14} />
                </button>
            </div>
          </div>
        </div>

        {showWordCountDialog && detailedStats && (
            <Suspense fallback={<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/5"><div className="bg-white p-4 rounded shadow"><LoadingSpinner className="w-8 h-8" /></div></div>}>
                <WordCountDialog 
                    isOpen={showWordCountDialog}
                    onClose={() => setShowWordCountDialog(false)}
                    stats={detailedStats}
                />
            </Suspense>
        )}

        {showJumpDialog && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xl max-w-xs w-full text-slate-900 dark:text-slate-100">
              <h4 className="text-sm font-bold mb-1">Go to Page</h4>
              <p className="text-xs text-slate-500 mb-3">Enter page number (1 to {totalPages}):</p>
              <form onSubmit={handleJumpSubmit} className="flex flex-col gap-3">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  autoFocus
                  value={jumpPageInput}
                  onChange={(e) => setJumpPageInput(e.target.value)}
                  placeholder={`1 - ${totalPages}`}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => { setShowJumpDialog(false); setJumpPageInput(''); }}
                    className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm"
                  >
                    Jump
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </>
  );
};


export default React.memo(StatusBar);
