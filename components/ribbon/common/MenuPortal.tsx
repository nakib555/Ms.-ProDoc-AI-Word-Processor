
import React, { useLayoutEffect, useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { useGestureContext } from '../../../contexts/GestureContext';

interface MenuPortalProps {
  id: string;
  activeMenu: string | null;
  triggerElement?: HTMLElement | null;
  menuPos?: { top: number; left: number };
  closeMenu: () => void;
  width?: number | string;
  title?: string;
  children: React.ReactNode;
}

export const MenuPortal: React.FC<MenuPortalProps> = ({ 
  id,
  activeMenu,
  triggerElement,
  menuPos,
  closeMenu, 
  width = 200, 
  title,
  children 
}) => {
  const isOpen = activeMenu === id;
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{top: number, left: number, maxHeight?: string, maxWidth?: string} | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  
  // Connect with GestureContext
  const { setSheetDragY, setIsDraggingSheet } = useGestureContext();

  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const lastTouchY = useRef<number>(0);
  const lastTouchTime = useRef<number>(0);

  // Two-stage lifecycle to support true smooth slide-up and slide-down exit animations
  const isFirstMount = useRef(true);
  const [isRendered, setIsRendered] = useState<boolean>(isOpen);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      if (!isOpen) return;
    }

    let animTimer: number | null = null;
    let unmountTimer: number | null = null;

    if (isOpen) {
      setIsRendered(true);
      animTimer = window.setTimeout(() => {
        setIsVisible(true);
      }, 20);
    } else {
      setIsVisible(false);
      setPosition(null);
      setDragOffset(0);
      touchStartY.current = null;
      unmountTimer = window.setTimeout(() => {
        setIsRendered(false);
      }, 280);
    }

    return () => {
      if (animTimer) clearTimeout(animTimer);
      if (unmountTimer) clearTimeout(unmountTimer);
    };
  }, [isOpen]);

  // Monitor viewport width to smoothly switch between desktop popover and mobile bottom sheet
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard accessibility: dismiss on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  // Desktop floating position calculation
  const calculatePosition = useCallback(() => {
    if (!isOpen || isMobile) return;

    let top = 0;
    let left = 0;
    let triggerHeight = 0;
    
    // 1. Determine anchor point
    if (triggerElement) {
        const triggerRect = triggerElement.getBoundingClientRect();
        top = triggerRect.bottom + 4;
        left = triggerRect.left;
        triggerHeight = triggerRect.height;
    } else if (menuPos) {
        top = menuPos.top;
        left = menuPos.left;
        triggerHeight = 60; // Approximate height of ribbon buttons
    } else {
        return; // No anchor
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let maxHeightStr = '80vh';
    const maxWidthStr = `${viewportWidth - 20}px`;

    // 2. Adjust for viewport boundaries
    if (menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();
        let menuWidth = menuRect.width;
        const menuHeight = menuRect.height;
        
        if (menuWidth > viewportWidth - 20) {
            menuWidth = viewportWidth - 20;
        }

        // Horizontal Constraint (Right Edge)
        if (left + menuWidth > viewportWidth - 10) {
            if (triggerElement) {
                const triggerRect = triggerElement.getBoundingClientRect();
                left = triggerRect.right - menuWidth;
            }
            
            // If it STILL overflows (or if no triggerElement), force it to viewport edge
            if (left + menuWidth > viewportWidth - 10) {
                left = viewportWidth - menuWidth - 10;
            }
        }
        
        // Horizontal Constraint (Left Edge)
        if (left < 10) left = 10;

        // Vertical Constraint
        const spaceBelow = viewportHeight - top - 10;
        const spaceAbove = top - triggerHeight - 20;

        if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
            // Place above
            top = top - triggerHeight - menuHeight - 8;
            if (top < 10) {
                top = 10;
                maxHeightStr = `${spaceAbove}px`;
            } else {
                maxHeightStr = `min(80vh, ${spaceAbove}px)`;
            }
        } else {
            // Place below
            if (spaceBelow < 150) {
                maxHeightStr = `${Math.max(150, spaceBelow)}px`;
            } else {
                maxHeightStr = `min(80vh, ${spaceBelow}px)`;
            }
        }
    }
    
    setPosition(prev => {
        if (prev && prev.top === top && prev.left === left && prev.maxHeight === maxHeightStr && prev.maxWidth === maxWidthStr) return prev;
        return { top, left, maxHeight: maxHeightStr, maxWidth: maxWidthStr };
    });
  }, [isOpen, isMobile, triggerElement, menuPos]);

  // Use layout effect to measure and position before paint on desktop
  useLayoutEffect(() => {
    if (isOpen && !isMobile) {
       calculatePosition();
    }
  }, [isOpen, isMobile, calculatePosition, width, children]);

  // Handle Resize and Scroll on desktop
  useEffect(() => {
     if (!isOpen || isMobile) return;
     
     const handleEvent = (e: Event) => {
         if (e.type === 'scroll' && menuRef.current && menuRef.current.contains(e.target as Node)) {
             return;
         }
         requestAnimationFrame(calculatePosition);
     };

     window.addEventListener('resize', handleEvent);
     window.addEventListener('scroll', handleEvent, true);

     return () => {
         window.removeEventListener('resize', handleEvent);
         window.removeEventListener('scroll', handleEvent, true);
     };
  }, [isOpen, isMobile, calculatePosition]);

  if (!isRendered) return null;

  // Touch gesture handlers for mobile bottom sheet with velocity calculation & rubber-band physics
  const handleTouchStart = (e: React.TouchEvent) => {
    const clientY = e.touches[0].clientY;
    const now = Date.now();
    touchStartY.current = clientY;
    touchStartTime.current = now;
    lastTouchY.current = clientY;
    lastTouchTime.current = now;
    setIsDraggingSheet(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const now = Date.now();
    const rawDelta = currentY - touchStartY.current;

    // Apply smooth rubber-band resistance when dragged upward
    const deltaY = rawDelta < 0 ? rawDelta * 0.25 : rawDelta;
    
    setDragOffset(deltaY);
    setSheetDragY(deltaY);

    lastTouchY.current = currentY;
    lastTouchTime.current = now;
  };

  const handleTouchEnd = () => {
    if (touchStartY.current !== null) {
      const now = Date.now();
      const dt = Math.max(1, now - lastTouchTime.current);
      const dy = lastTouchY.current - touchStartY.current;
      const velocity = dy / dt; // downward px/ms

      // Dismiss if pulled past threshold or flicked downward with velocity
      if (dragOffset > 70 || (velocity > 0.45 && dragOffset > 20)) {
        closeMenu();
      }
    }
    
    setDragOffset(0);
    setSheetDragY(0);
    setIsDraggingSheet(false);
    touchStartY.current = null;
  };

  // Derive human-readable header title
  const displayTitle = title || (id 
    ? id.replace(/_menu$/, '')
        .replace(/[_-]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase()) 
    : 'Options');

  // --- Mobile Bottom Sheet Presentation ---
  if (isMobile) {
    return ReactDOM.createPortal(
      <div 
        className="fixed inset-0 z-[9999] flex flex-col justify-end pointer-events-none select-none"
        role="dialog"
        aria-modal="true"
        aria-label={displayTitle}
      >
        {/* Backdrop Overlay with Smooth Fade and Blur */}
        <div 
          className="fixed inset-0 bg-slate-950/45 dark:bg-black/65 backdrop-blur-[3px] pointer-events-auto transition-opacity"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 280ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'opacity'
          }}
          onClick={(e) => {
            e.stopPropagation();
            closeMenu();
          }}
          aria-hidden="true"
        />

        {/* Bottom Sheet Drawer with Smooth Spring/Deceleration Slide-Up & Exit */}
        <div 
          ref={menuRef}
          className="relative z-10 w-full max-h-[85vh] flex flex-col bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md rounded-t-[28px] shadow-[0_-12px_40px_rgba(0,0,0,0.25)] border-t border-slate-200/80 dark:border-slate-800/80 pointer-events-auto overflow-hidden"
          style={{
            transform: dragOffset !== 0 
              ? `translate3d(0, ${dragOffset}px, 0)` 
              : isVisible 
                ? 'translate3d(0, 0, 0)' 
                : 'translate3d(0, 100%, 0)',
            transition: dragOffset !== 0 
              ? 'none' 
              : 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar with Tactile Drag Handle & Quick Close */}
          <div 
            className="w-full pt-3 pb-2.5 px-5 flex flex-col items-center border-b border-slate-100 dark:border-slate-800/80 cursor-grab active:cursor-grabbing touch-none select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Pill Grab Indicator */}
            <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 transition-colors hover:bg-slate-400 mb-2.5" />
            
            <div className="w-full flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                {displayTitle}
              </span>
              <button
                type="button"
                onClick={closeMenu}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-all active:scale-95"
                aria-label="Close"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Scrollable Content Container with Safe-Area Padding */}
          <div 
            className="flex-1 overflow-y-auto px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] overscroll-contain text-slate-900 dark:text-slate-100"
          >
            {children}
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // --- Desktop Anchored Floating Popover ---
  if (!isOpen) return null;

  const desktopStyle: React.CSSProperties = {
      position: 'fixed',
      width: typeof width === 'number' ? `${width}px` : width,
      maxWidth: position?.maxWidth || `calc(100vw - 20px)`,
      maxHeight: position?.maxHeight || '80vh',
      overflowY: 'auto',
      overflowX: 'auto',
      zIndex: 9999,
      top: position ? position.top : 0,
      left: position ? position.left : 0,
      opacity: position ? 1 : 0, 
      pointerEvents: position ? 'auto' : 'none',
      transition: 'opacity 0.15s ease-out'
  };

  return ReactDOM.createPortal(
    <>
      <div 
          className="fixed inset-0 z-[9998]" 
          onClick={(e) => { e.stopPropagation(); closeMenu(); }}
      />
      <div 
          ref={menuRef}
          className="bg-white dark:bg-[#1e293b] rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col py-1.5 animate-in fade-in zoom-in-95 duration-100 dark:text-slate-200"
          style={desktopStyle}
          onClick={(e) => e.stopPropagation()}
      >
          {children}
      </div>
    </>,
    document.body
  );
};



