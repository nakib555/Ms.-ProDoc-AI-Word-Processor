
import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

interface LayoutTabContextType {
  activeMenu: string | null;
  menuPos: { top: number; left: number };
  triggerElement: HTMLElement | null;
  toggleMenu: (id: string) => void;
  closeMenu: () => void;
  registerTrigger: (id: string, el: HTMLDivElement | null) => void;
}

const LayoutTabContext = createContext<LayoutTabContextType | undefined>(undefined);

export const LayoutTabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const triggerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const registerTrigger = useCallback((id: string, el: HTMLDivElement | null) => {
    triggerRefs.current[id] = el;
  }, []);

  const toggleMenu = useCallback((menuId: string) => {
    setActiveMenu(prev => {
        if (prev === menuId) {
            setTriggerElement(null);
            return null;
        }
        
        const trigger = triggerRefs.current[menuId];
        if (trigger) {
            const rect = trigger.getBoundingClientRect();
            setMenuPos({ top: rect.bottom, left: rect.left });
            setTriggerElement(trigger);
        }
        return menuId;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setActiveMenu(null);
    setTriggerElement(null);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setActiveMenu(null);
      setTriggerElement(null);
    };
    window.addEventListener('resize', handleResize);
    // Removed scroll listener to allow scrolling inside dropdowns without closing them
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <LayoutTabContext.Provider value={{ 
        activeMenu, menuPos, triggerElement, toggleMenu, closeMenu, registerTrigger
    }}>
      {children}
    </LayoutTabContext.Provider>
  );
};

export const useLayoutTab = () => {
  const context = useContext(LayoutTabContext);
  if (!context) {
    throw new Error('useLayoutTab must be used within a LayoutTabProvider');
  }
  return context;
};
