
import React, { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Minus, Plus, FileText, Globe, Type, Layout, Sun, Moon, Lock, Unlock, ScanText, Droplets } from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';
import { useTheme } from '../contexts/ThemeContext';
import { useGestureContext } from '../contexts/GestureContext';
import { isAnyModalOpen, isEventInsideModal } from '../utils/modalScroll';
import { computeAnchoredPopover } from '../utils/viewportPosition';

interface StatusBarProps {
  position?: 'top' | 'bottom';
}

const StatusBar: React.FC<StatusBarProps> = ({ position = 'bottom' }) => {

  const {
    wordCount,
    zoom,
    viewMode,
    setViewMode,
    currentPage,
    goToPage,
    totalPages,
    setZoom,
    isKeyboardLocked,
    setIsKeyboardLocked,
    isTableResizerEnabled,
    setIsTableResizerEnabled,
    selectionMode,
    setSelectionMode,
    zoomMode,
    setZoomMode,
    setZoomLayout,
    setPageMovement,
    setShowWordCountDialog,
  } = useEditor();
  const { theme, toggleTheme } = useTheme();
  const { setHudZoom, triggerGestureLock } = useGestureContext();
  const zoomControlsRef = useRef<HTMLDivElement>(null);
  const mobileToolsBtnRef = useRef<HTMLButtonElement>(null);
  const mobileToolsMenuRef = useRef<HTMLDivElement>(null);
  const [showMobileTools, setShowMobileTools] = useState(false);
  const [mobileToolsCoords, setMobileToolsCoords] = useState<{ top: number; left: number; maxHeight: number } | null>(null);
  const [showJumpDialog, setShowJumpDialog] = useState(false);
  const [jumpPageInput, setJumpPageInput] = useState('');

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(jumpPageInput, 10);
    if (!isNaN(target) && target >= 1 && target <= totalPages) {
      goToPage(target, { behavior: 'smooth' });
      setShowJumpDialog(false);
      setJumpPageInput('');
    }
  };

  // Double-tap / double-click zoom number to auto-fit page to screen
  const lastZoomTapRef = useRef<number>(0);
  const handleZoomAutoFit = useCallback((e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    triggerGestureLock(350);
    setPageMovement?.('vertical');
    setZoomLayout?.('single');
    setZoomMode('fit-width');
  }, [triggerGestureLock, setPageMovement, setZoomLayout, setZoomMode]);

  const handleZoomTouchEnd = useCallback((e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastZoomTapRef.current < 320) {
      handleZoomAutoFit(e);
      lastZoomTapRef.current = 0;
    } else {
      lastZoomTapRef.current = now;
    }
  }, [handleZoomAutoFit]);


  useEffect(() => {
    const el = zoomControlsRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (isEventInsideModal(e.target) || isAnyModalOpen()) return;
      e.preventDefault();
      triggerGestureLock(350);
      if (zoomMode !== 'custom') setZoomMode('custom');
      const direction = e.deltaY > 0 ? -1 : 1;
      const next = Math.min(500, Math.max(10, zoom + (direction * 5)));
      setZoom(next);
      setHudZoom(next);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [viewMode, setZoom, zoomMode, setZoomMode, zoom, triggerGestureLock, setHudZoom]);

  const updateMobileToolsCoords = useCallback(() => {
    if (!mobileToolsBtnRef.current) return;
    const rect = mobileToolsBtnRef.current.getBoundingClientRect();
    setMobileToolsCoords(
      computeAnchoredPopover(rect, mobileToolsMenuRef.current, {
        preferredSide: position === 'top' || rect.top < 80 ? 'bottom' : 'top',
        align: 'end',
        margin: 8,
        offset: 8,
        maxWidthPadding: 16,
      })
    );
  }, [position]);

  useLayoutEffect(() => {
    if (!showMobileTools) {
      setMobileToolsCoords(null);
      return;
    }
    updateMobileToolsCoords();
    const menuEl = mobileToolsMenuRef.current;
    if (!menuEl || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => updateMobileToolsCoords());
    observer.observe(menuEl);
    return () => observer.disconnect();
  }, [showMobileTools, updateMobileToolsCoords]);

  useEffect(() => {
    if (!showMobileTools) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowMobileTools(false);
    };
    const handleViewportChange = () => setShowMobileTools(false);
    document.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleViewportChange);
    window.visualViewport?.addEventListener('resize', updateMobileToolsCoords);
    window.addEventListener('scroll', handleViewportChange, true);
    return () => {
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleViewportChange);
      window.visualViewport?.removeEventListener('resize', updateMobileToolsCoords);
      window.removeEventListener('scroll', handleViewportChange, true);
    };
  }, [showMobileTools, updateMobileToolsCoords]);

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
          className={`min-h-[2rem] sm:min-h-[2.25rem] lg:min-h-[2.5rem] bg-[#f1f5f9] dark:bg-[#0f172a] text-slate-700 dark:text-slate-300 flex items-center justify-between px-2 sm:px-3.5 lg:px-4 text-[11px] sm:text-xs lg:text-[13px] select-none z-30 no-print flex-shrink-0 transition-colors duration-300 box-content ${
            position === 'top'
              ? 'border-b border-slate-300/80 dark:border-slate-800 shadow-[0_1px_3px_rgba(15,23,42,0.05)]'
              : 'border-t border-slate-300/80 dark:border-slate-800 shadow-[0_-1px_3px_rgba(15,23,42,0.05)]'
          }`}
          style={position === 'top' ? { paddingTop: 'env(safe-area-inset-top)' } : { paddingBottom: 'env(safe-area-inset-bottom)' }}
        >

          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 font-medium shrink-0 h-full">
            <div 
                className="flex items-center gap-1 sm:gap-1.5 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800 px-1.5 sm:px-2 py-0.5 rounded cursor-pointer transition-colors whitespace-nowrap active:bg-slate-300 dark:active:bg-slate-700" 
                title="Click to jump to page"
                onClick={() => setShowJumpDialog(true)}
            >
                <Layout className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline tabular-nums">{viewMode === 'print' ? `Page ${currentPage} of ${totalPages}` : 'Web Layout'}</span>
                <span className="sm:hidden text-[10px] font-semibold tabular-nums">{viewMode === 'print' ? `${currentPage} / ${totalPages}` : 'Web'}</span>
            </div>

            
            <div 
                className="flex items-center gap-1 sm:gap-1.5 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-all px-1.5 sm:px-2 py-0.5 rounded active:bg-slate-300 dark:active:bg-slate-700 whitespace-nowrap" 
                title="Click for detailed statistics"
                onClick={() => setShowWordCountDialog?.(true)}
            >
                <Type className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" />
                <span className="hidden sm:inline tabular-nums">{wordCount} words</span>
                <span className="sm:hidden text-[10px] font-semibold tabular-nums">{wordCount} w</span>
            </div>
            
            <span className="hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer transition-colors hidden md:inline whitespace-nowrap">English (US)</span>
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 flex-shrink-0 ml-auto pl-2">
            
            {/* Smart Selection Toggle (Mobile Helper) - Only visible on mobile */}
            <button 
                type="button"
                aria-pressed={selectionMode}
                aria-label={selectionMode ? "Disable Smart Select Mode" : "Enable Smart Select Mode"}
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
              <button
                  ref={mobileToolsBtnRef}
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={showMobileTools}
                  aria-label="Mobile Tools"
                  onClick={() => setShowMobileTools(prev => !prev)}
                  className={`p-1.5 rounded transition-all flex items-center gap-1 ${showMobileTools || isKeyboardLocked || isTableResizerEnabled ? 'text-blue-500 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-900/20 ring-1 ring-blue-500/30' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                  title="Mobile Tools"
              >
                  {(isKeyboardLocked || isTableResizerEnabled) ? <Lock size={14} /> : <Unlock size={14} />}
              </button>
              {showMobileTools && createPortal(
                <>
                  <div className="fixed inset-0 z-[9998]" onClick={() => setShowMobileTools(false)} />
                  <div
                    ref={mobileToolsMenuRef}
                    role="menu"
                    aria-label="Mobile Tools"
                    className="fixed z-[9999] p-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-1.5 sm:gap-2 whitespace-nowrap max-w-[calc(100vw-16px)] overflow-x-auto animate-in fade-in duration-150"
                    style={{
                      top: mobileToolsCoords?.top ?? 0,
                      left: mobileToolsCoords?.left ?? 8,
                      maxHeight: mobileToolsCoords?.maxHeight ?? '60dvh',
                      opacity: mobileToolsCoords ? 1 : 0,
                    }}
                  >
                    <button
                      type="button"
                      role="menuitemcheckbox"
                      aria-checked={isKeyboardLocked}
                      onClick={() => { setIsKeyboardLocked(!isKeyboardLocked); setShowMobileTools(false); }}
                      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all active:scale-95 shrink-0 ${isKeyboardLocked ? 'bg-red-500/20 text-red-600 dark:text-red-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                    >
                      {isKeyboardLocked ? <Lock size={12} /> : <Unlock size={12} />}
                      Keyboard
                    </button>
                    <button
                      type="button"
                      role="menuitemcheckbox"
                      aria-checked={isTableResizerEnabled}
                      onClick={() => { setIsTableResizerEnabled(!isTableResizerEnabled); setShowMobileTools(false); }}
                      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all active:scale-95 shrink-0 ${isTableResizerEnabled ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                    >
                      {isTableResizerEnabled ? <Lock size={12} /> : <Unlock size={12} />}
                      Table Resizer
                    </button>
                  </div>
                </>,
                document.body
              )}
            </div>

            <button 
                type="button"
                aria-label={theme === 'light' ? "Switch to Dark Mode" : theme === 'dark' ? "Switch to Ocean Mode" : "Switch to Light Mode"}
                onClick={toggleTheme}
                className={`transition-colors p-1 ${theme === 'ocean' ? 'text-blue-500 hover:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-yellow-400'}`}
                title={theme === 'light' ? "Switch to Dark Mode" : theme === 'dark' ? "Switch to Ocean Mode" : "Switch to Light Mode"}
            >
                {theme === 'light' ? <Moon size={14} /> : theme === 'dark' ? <Droplets size={14} /> : <Sun size={14} />}
            </button>

            {/* View Modes - Desktop (Grouped) */}
            <div className="hidden sm:flex items-center bg-slate-200/80 dark:bg-slate-800 rounded-md p-0.5 border border-slate-300/80 dark:border-slate-700" role="group" aria-label="View Mode">
                 <button 
                    type="button"
                    aria-pressed={viewMode === 'print'}
                    aria-label="Print Layout"
                    onClick={() => setViewMode('print')} 
                    className={`p-1 rounded flex items-center justify-center transition-all ${viewMode === 'print' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    title="Print Layout"
                 >
                    <FileText size={14} />
                 </button>
                 <button 
                    type="button"
                    aria-pressed={viewMode === 'web'}
                    aria-label="Web Layout"
                    onClick={() => setViewMode('web')} 
                    className={`p-1 rounded flex items-center justify-center transition-all ${viewMode === 'web' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    title="Web Layout"
                 >
                    <Globe size={14} />
                 </button>
            </div>

            {/* View Mode Toggle - Mobile (Single Button) */}
            <button 
                type="button"
                aria-pressed={viewMode === 'web'}
                aria-label={viewMode === 'print' ? "Switch to Web Layout" : "Switch to Print Layout"}
                onClick={() => setViewMode(prev => prev === 'print' ? 'web' : 'print')}
                className={`sm:hidden p-1.5 rounded transition-all flex items-center justify-center ${viewMode === 'web' ? 'text-blue-600 dark:text-blue-400 bg-blue-100/60 dark:bg-blue-900/20 ring-1 ring-blue-500/30' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800'}`}
                title={viewMode === 'print' ? "Switch to Web Layout" : "Switch to Print Layout"}
            >
                {viewMode === 'print' ? <FileText size={14} /> : <Globe size={14} />}
            </button>

            {/* Zoom Controls - Optimized for Mobile */}
            <div 
                ref={zoomControlsRef}
                className="flex items-center gap-0.5 sm:gap-2 lg:gap-3 cursor-ew-resize hover:bg-slate-200/70 dark:hover:bg-slate-800/50 rounded-lg px-1 transition-colors select-none"
                title="Scroll to Zoom · Double-click zoom percentage to auto-fit screen"
            >
                <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700 mx-1 hidden sm:block"></div>
                <button 
                    type="button"
                    aria-label="Zoom Out"
                    onClick={() => {
                        triggerGestureLock(350);
                        if (zoomMode !== 'custom') setZoomMode('custom');
                        const next = Math.max(10, zoom - 10);
                        setZoom(next);
                        setHudZoom(next);
                    }} 
                    className="hover:bg-slate-200 dark:hover:bg-slate-800 p-1 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" 
                    title="Zoom Out"
                >
                    <Minus className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </button>
                
                <div className="items-center gap-2 group relative hidden md:flex">
                    <input 
                        type="range" 
                        min="10" 
                        max="500" 
                        value={zoom} 
                        aria-label="Zoom Level"
                        onChange={(e) => {
                            triggerGestureLock(350);
                            if (zoomMode !== 'custom') setZoomMode('custom');
                            const next = Number(e.target.value);
                            setZoom(next);
                            setHudZoom(next);
                        }}
                        className="w-16 lg:w-24 h-1 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
                        title="Zoom Level"
                    />
                </div>
                
                <button 
                    type="button"
                    onDoubleClick={handleZoomAutoFit}
                    onTouchEnd={handleZoomTouchEnd}
                    aria-label="Zoom percentage, double-click to auto-fit page width"
                    className="w-12 sm:w-20 lg:w-24 text-right font-semibold tabular-nums text-slate-800 dark:text-slate-200 text-[10px] sm:text-xs lg:text-[13px] hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center justify-end gap-1 cursor-pointer"
                    title="Double-click zoom percentage to auto-fit screen"
                >
                    <span className="text-slate-500 dark:text-slate-400 font-semibold text-[9px] uppercase tracking-tighter hidden sm:inline">
                        {zoomMode === 'fit-width' ? 'Fit' : zoomMode === 'fit-page' ? 'Page' : ''}
                    </span>
                    <span>{Number(zoom).toFixed(0)}%</span>
                </button>
                
                <button 
                    type="button"
                    aria-label="Zoom In"
                    onClick={() => {
                        triggerGestureLock(350);
                        if (zoomMode !== 'custom') setZoomMode('custom');
                        const next = Math.min(500, zoom + 10);
                        setZoom(next);
                        setHudZoom(next);
                    }} 
                    className="hover:bg-slate-200 dark:hover:bg-slate-800 p-1 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" 
                    title="Zoom In"
                >
                    <Plus className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </button>
            </div>
          </div>
        </div>

        {showJumpDialog && createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-3 sm:p-4 animate-in fade-in duration-150 overscroll-contain"
            role="dialog"
            aria-modal="true"
            data-modal-backdrop="true"
            onClick={() => { setShowJumpDialog(false); setJumpPageInput(''); }}
          >
            <div
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl max-w-xs w-full max-h-[90dvh] overflow-y-auto text-slate-900 dark:text-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
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
          </div>,
          document.body
        )}
    </>
  );
};


export { StatusBar };
export default React.memo(StatusBar);
