import React, { createContext, useContext, useState, useRef, useCallback, useMemo } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

export interface GestureState {
  isPinching: boolean;
  isPanning: boolean;
  scale: number;
  panX: number;
  panY: number;
  focalPoint: { x: number; y: number } | null;
  hudZoom: number;
  showHud: boolean;
  sheetDragY: number;
  isDraggingSheet: boolean;
}

export interface GestureContextType {
  gestureState: GestureState;
  isPinching: boolean;
  isPanning: boolean;
  hudZoom: number;
  showHud: boolean;
  sheetDragY: number;
  isDraggingSheet: boolean;
  activeContainerRef: React.RefObject<HTMLDivElement | null>;
  activeContentRef: React.RefObject<HTMLDivElement | null>;
  setHudZoom: (val: number) => void;
  setIsPinching: (val: boolean) => void;
  setIsPanning: (val: boolean) => void;
  setShowHud: (val: boolean) => void;
  setSheetDragY: (val: number) => void;
  setIsDraggingSheet: (val: boolean) => void;
  updateGestureState: (patch: Partial<GestureState>) => void;
  registerActiveView: (container: HTMLDivElement | null, content: HTMLDivElement | null) => void;
  zoomHUD: React.ReactNode;
}

const defaultGestureState: GestureState = {
  isPinching: false,
  isPanning: false,
  scale: 1,
  panX: 0,
  panY: 0,
  focalPoint: null,
  hudZoom: 100,
  showHud: false,
  sheetDragY: 0,
  isDraggingSheet: false,
};

const GestureContext = createContext<GestureContextType | null>(null);

export const GestureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gestureState, setGestureState] = useState<GestureState>(defaultGestureState);
  const activeContainerRef = useRef<HTMLDivElement | null>(null);
  const activeContentRef = useRef<HTMLDivElement | null>(null);
  const hudTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setHudZoom = useCallback((val: number) => {
    setGestureState(prev => ({ ...prev, hudZoom: Math.round(val), showHud: true }));
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    hudTimerRef.current = setTimeout(() => {
      setGestureState(prev => ({ ...prev, showHud: false, isPinching: false }));
    }, 600);
  }, []);

  const setIsPinching = useCallback((val: boolean) => {
    setGestureState(prev => ({
      ...prev,
      isPinching: val,
      showHud: val ? true : prev.showHud,
    }));
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    if (!val) {
      hudTimerRef.current = setTimeout(() => {
        setGestureState(prev => ({ ...prev, showHud: false, isPinching: false }));
      }, 400);
    } else {
      // Safety auto-dismiss guard so HUD never remains stuck if touchend is interrupted
      hudTimerRef.current = setTimeout(() => {
        setGestureState(prev => ({ ...prev, showHud: false, isPinching: false }));
      }, 2500);
    }
  }, []);

  const setIsPanning = useCallback((val: boolean) => {
    setGestureState(prev => (prev.isPanning === val ? prev : { ...prev, isPanning: val }));
  }, []);

  const setShowHud = useCallback((val: boolean) => {
    setGestureState(prev => (prev.showHud === val ? prev : { ...prev, showHud: val }));
  }, []);

  const setSheetDragY = useCallback((val: number) => {
    setGestureState(prev => (prev.sheetDragY === val ? prev : { ...prev, sheetDragY: val }));
  }, []);

  const setIsDraggingSheet = useCallback((val: boolean) => {
    setGestureState(prev => (prev.isDraggingSheet === val ? prev : { ...prev, isDraggingSheet: val }));
  }, []);

  const updateGestureState = useCallback((patch: Partial<GestureState>) => {
    setGestureState(prev => {
      let changed = false;
      for (const key of Object.keys(patch) as (keyof GestureState)[]) {
        if (prev[key] !== patch[key]) {
          changed = true;
          break;
        }
      }
      return changed ? { ...prev, ...patch } : prev;
    });
  }, []);

  const registerActiveView = useCallback((container: HTMLDivElement | null, content: HTMLDivElement | null) => {
    activeContainerRef.current = container;
    activeContentRef.current = content;
  }, []);

  const zoomHUD = useMemo(() => {
    if (!gestureState.showHud && !gestureState.isPinching) return null;
    return (
      <div
        className="fixed top-16 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none transition-all duration-150 ease-out animate-in fade-in zoom-in-95"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 dark:bg-slate-100/90 text-white dark:text-slate-900 shadow-2xl backdrop-blur-md border border-white/20 dark:border-black/10 text-xs font-semibold tracking-wide">
          {gestureState.hudZoom >= 100 ? (
            <ZoomIn className="w-3.5 h-3.5 text-indigo-400 dark:text-indigo-600 animate-pulse" />
          ) : (
            <ZoomOut className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600 animate-pulse" />
          )}
          <span className="font-mono">{gestureState.hudZoom}%</span>
        </div>
      </div>
    );
  }, [gestureState.showHud, gestureState.isPinching, gestureState.hudZoom]);

  const contextValue = useMemo<GestureContextType>(() => ({
    gestureState,
    isPinching: gestureState.isPinching,
    isPanning: gestureState.isPanning,
    hudZoom: gestureState.hudZoom,
    showHud: gestureState.showHud,
    sheetDragY: gestureState.sheetDragY,
    isDraggingSheet: gestureState.isDraggingSheet,
    activeContainerRef,
    activeContentRef,
    setHudZoom,
    setIsPinching,
    setIsPanning,
    setShowHud,
    setSheetDragY,
    setIsDraggingSheet,
    updateGestureState,
    registerActiveView,
    zoomHUD,
  }), [
    gestureState,
    setHudZoom,
    setIsPinching,
    setIsPanning,
    setShowHud,
    setSheetDragY,
    setIsDraggingSheet,
    updateGestureState,
    registerActiveView,
    zoomHUD,
  ]);

  return (
    <GestureContext.Provider value={contextValue}>
      {children}
      {zoomHUD}
    </GestureContext.Provider>
  );
};

const fallbackContextValue: GestureContextType = {
  gestureState: defaultGestureState,
  isPinching: false,
  isPanning: false,
  hudZoom: 100,
  showHud: false,
  sheetDragY: 0,
  isDraggingSheet: false,
  activeContainerRef: { current: null },
  activeContentRef: { current: null },
  setHudZoom: () => {},
  setIsPinching: () => {},
  setIsPanning: () => {},
  setShowHud: () => {},
  setSheetDragY: () => {},
  setIsDraggingSheet: () => {},
  updateGestureState: () => {},
  registerActiveView: () => {},
  zoomHUD: null,
};

export const useGestureContext = (): GestureContextType => {
  const context = useContext(GestureContext);
  return context || fallbackContextValue;
};

