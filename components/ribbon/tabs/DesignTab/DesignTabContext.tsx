
import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

interface DesignTabContextType {
  activeMenu: string | null;
  menuPos: { top: number; left: number };
  triggerElement: HTMLElement | null;
  toggleMenu: (id: string) => void;
  closeMenu: () => void;
  registerTrigger: (id: string, el: HTMLButtonElement | null) => void;
}

const DesignTabContext = createContext<DesignTabContextType | undefined>(undefined);

export const DesignTabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const triggerRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const registerTrigger = useCallback((id: string, el: HTMLButtonElement | null) => {
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
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DesignTabContext.Provider value={{ 
        activeMenu, menuPos, triggerElement, toggleMenu, closeMenu, registerTrigger
    }}>
      {children}
    </DesignTabContext.Provider>
  );
};

export const useDesignTab = () => {
  const context = useContext(DesignTabContext);
  if (!context) {
    throw new Error('useDesignTab must be used within a DesignTabProvider');
  }
  return context;
};
