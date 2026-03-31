
import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface MenuPortalProps {
  id: string;
  activeMenu: string | null;
  triggerElement?: HTMLElement | null;
  menuPos?: { top: number; left: number };
  closeMenu: () => void;
  width?: number | string;
  children: React.ReactNode;
}

export const MenuPortal: React.FC<MenuPortalProps> = ({ 
  id,
  activeMenu,
  triggerElement,
  menuPos,
  closeMenu, 
  width = 200, 
  children 
}) => {
  const isOpen = activeMenu === id;
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{top: number, left: number, maxHeight?: string, maxWidth?: string} | null>(null);

  // Helper to calculate position ensuring it stays on screen
  const calculatePosition = React.useCallback(() => {
    if (!isOpen) return;

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
  }, [isOpen, triggerElement, menuPos]);

  if (!isOpen && position !== null) {
      setPosition(null);
  }

  // Use layout effect to measure and position before paint to avoid flickering
  useLayoutEffect(() => {
    if (isOpen) {
       calculatePosition();
    }
  }, [isOpen, calculatePosition, width, children]);

  // Handle Resize and Scroll
  useEffect(() => {
     if (!isOpen) return;
     
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
  }, [isOpen, calculatePosition]);

  if (!isOpen) return null;

  const style: React.CSSProperties = {
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
      transition: 'opacity 0.1s ease-out'
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
          style={style}
          onClick={(e) => e.stopPropagation()}
      >
          {children}
      </div>
    </>,
    document.body
  );
};
