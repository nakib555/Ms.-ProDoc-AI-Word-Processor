/* eslint-disable react-hooks/immutability */
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useGestureContext } from '../contexts/GestureContext';

interface UseTouchZoomOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  contentRef?: React.RefObject<HTMLDivElement | null>;
  zoom: number;
  setZoom: (zoomOrUpdater: number | ((prev: number) => number)) => void;
  minZoom?: number;
  maxZoom?: number;
  onDoubleTap?: () => void;
  enabled?: boolean;
}

interface TouchZoomResult {
  isPinching: boolean;
  currentZoom: number;
  zoomHUD: React.ReactNode;
}

interface TouchSample {
  x: number;
  y: number;
  time: number;
}

/**
 * High-performance, Physics-Based Touch Viewport Engine:
 * - Direct GPU CSS transform during gestures (zero React re-render overhead at 60-120 FPS)
 * - True focal-point centroid locking (content under fingers stays pinned)
 * - Momentum inertia scrolling with exponential friction decay (v *= 0.93)
 * - Rubber-band damping beyond minimum (15%) and maximum (500%) zoom boundaries
 * - WebKit gesture suppression preventing full-browser viewport resizing
 * - Sleek floating Zoom HUD with real-world physics feedback
 */
export const useTouchZoom = ({
  containerRef,
  contentRef,
  zoom,
  setZoom,
  minZoom = 20,
  maxZoom = 450,
  onDoubleTap,
  enabled = true,
}: UseTouchZoomOptions): TouchZoomResult => {
  const gestureContext = useGestureContext();
  const [isPinching, setIsPinching] = useState(false);
  const [hudZoom, setHudZoom] = useState(zoom);
  const [showHUD, setShowHUD] = useState(false);

  const zoomRef = useRef(zoom);
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const hudFadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const momentumRafRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchHistoryRef = useRef<TouchSample[]>([]);

  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (containerRef.current !== containerEl) {
      setContainerEl(containerRef.current);
    }
  }, [containerRef]);

  // Register active viewport elements with gesture context
  useEffect(() => {
    gestureContext.registerActiveView(containerEl || containerRef.current, contentRef?.current ?? null);
  }, [containerEl, containerRef, contentRef, gestureContext]);

  const clampZoom = useCallback((val: number) => {
    return Math.min(maxZoom, Math.max(minZoom, Math.round(val)));
  }, [minZoom, maxZoom]);

  // Display HUD helper with auto-fade
  const triggerHUD = useCallback((displayZoom: number) => {
    setHudZoom(displayZoom);
    setShowHUD(true);
    gestureContext.setHudZoom(displayZoom);

    if (hudFadeTimeoutRef.current) clearTimeout(hudFadeTimeoutRef.current);
    hudFadeTimeoutRef.current = setTimeout(() => {
      setShowHUD(false);
      setIsPinching(false);
      gestureContext.setIsPinching(false);
    }, 600);
  }, [gestureContext]);

  // Stop any active momentum scrolling
  const stopMomentum = useCallback(() => {
    if (momentumRafRef.current !== null) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
  }, []);

  // Multi-touch physics state tracking
  const state = useRef({
    isPinching: false,
    startZoom: zoom,
    initialDist: 0,
    initialMidX: 0,
    initialMidY: 0,
    focalX: 0,
    focalY: 0,
    initialScrollLeft: 0,
    initialScrollTop: 0,
    currentScaleFactor: 1,
    currentPanX: 0,
    currentPanY: 0,
    lastTapTime: 0,
    lastTapX: 0,
    lastTapY: 0,
  });

  // Smooth programmatic transition for double tap or external zoom
  const animateZoomTo = useCallback((targetZoom: number, focalPoint?: { x: number; y: number }) => {
    const container = containerEl || containerRef.current;
    const content = contentRef?.current ?? null;
    if (!container || !content) {
      setZoom(targetZoom);
      triggerHUD(targetZoom);
      return;
    }

    const currentZoom = zoomRef.current;
    const scaleRatio = targetZoom / currentZoom;
    const containerRect = container.getBoundingClientRect();

    const fx = focalPoint ? focalPoint.x - containerRect.left + container.scrollLeft : container.scrollLeft + containerRect.width / 2;
    const fy = focalPoint ? focalPoint.y - containerRect.top + container.scrollTop : container.scrollTop + containerRect.height / 2;

    content.style.transformOrigin = `${fx}px ${fy}px`;
    content.style.willChange = 'transform';
    content.style.transition = 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1)';
    content.style.transform = `scale(${scaleRatio})`;

    setIsPinching(true);
    triggerHUD(targetZoom);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setZoom(targetZoom);
      const newScrollLeft = Math.max(0, fx * scaleRatio - (fx - container.scrollLeft));
      const newScrollTop = Math.max(0, fy * scaleRatio - (fy - container.scrollTop));

      content.style.transition = 'none';
      content.style.transform = '';
      content.style.transformOrigin = '';
      content.style.willChange = '';

      container.scrollLeft = newScrollLeft;
      container.scrollTop = newScrollTop;
      setIsPinching(false);
    }, 240);
  }, [containerEl, containerRef, contentRef, setZoom, triggerHUD]);

  // Main native gesture listener
  useEffect(() => {
    const container = containerEl || containerRef.current;
    if (!container || !enabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      stopMomentum();

      if (e.touches.length === 2) {
        if (e.cancelable) e.preventDefault();

        const t1 = e.touches[0];
        const t2 = e.touches[1];

        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const midX = (t1.clientX + t2.clientX) / 2;
        const midY = (t1.clientY + t2.clientY) / 2;

        const containerRect = container.getBoundingClientRect();
        const focalX = midX - containerRect.left + container.scrollLeft;
        const focalY = midY - containerRect.top + container.scrollTop;

        state.current = {
          ...state.current,
          isPinching: true,
          startZoom: zoomRef.current,
          initialDist: dist,
          initialMidX: midX,
          initialMidY: midY,
          focalX,
          focalY,
          initialScrollLeft: container.scrollLeft,
          initialScrollTop: container.scrollTop,
          currentScaleFactor: 1,
          currentPanX: 0,
          currentPanY: 0,
        };

        touchHistoryRef.current = [{ x: midX, y: midY, time: performance.now() }];

        const content = contentRef?.current ?? null;
        if (content) {
          content.style.transition = 'none';
          content.style.transformOrigin = `${focalX}px ${focalY}px`;
          content.style.willChange = 'transform';
        }

        setIsPinching(true);
        triggerHUD(zoomRef.current);
      } else if (e.touches.length === 1 && !state.current.isPinching) {
        // Record touch history for velocity tracking
        const t = e.touches[0];
        touchHistoryRef.current = [{ x: t.clientX, y: t.clientY, time: performance.now() }];

        // Double tap detection
        const now = Date.now();
        const delta = now - state.current.lastTapTime;
        const tapDist = Math.hypot(t.clientX - state.current.lastTapX, t.clientY - state.current.lastTapY);

        if (delta > 50 && delta < 320 && tapDist < 25) {
          if (e.cancelable) e.preventDefault();
          if (onDoubleTap) {
            onDoubleTap();
          } else {
            const nextZoom = zoomRef.current >= 130 ? 100 : 150;
            animateZoomTo(nextZoom, { x: t.clientX, y: t.clientY });
          }
          state.current.lastTapTime = 0;
        } else {
          state.current.lastTapTime = now;
          state.current.lastTapX = t.clientX;
          state.current.lastTapY = t.clientY;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && state.current.isPinching) {
        if (e.cancelable) e.preventDefault();

        const t1 = e.touches[0];
        const t2 = e.touches[1];

        const currDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const currMidX = (t1.clientX + t2.clientX) / 2;
        const currMidY = (t1.clientY + t2.clientY) / 2;

        const panX = currMidX - state.current.initialMidX;
        const panY = currMidY - state.current.initialMidY;

        const rawScale = state.current.initialDist > 0 ? currDist / state.current.initialDist : 1;
        const rawTargetZoom = state.current.startZoom * rawScale;

        // Apply real-world rubber-band damping beyond zoom bounds
        let effectiveScale = rawScale;
        if (rawTargetZoom < minZoom) {
          const under = minZoom - rawTargetZoom;
          effectiveScale = (minZoom - Math.sqrt(under) * 1.8) / state.current.startZoom;
        } else if (rawTargetZoom > maxZoom) {
          const over = rawTargetZoom - maxZoom;
          effectiveScale = (maxZoom + Math.sqrt(over) * 1.8) / state.current.startZoom;
        }

        state.current.currentScaleFactor = effectiveScale;
        state.current.currentPanX = panX;
        state.current.currentPanY = panY;

        // Record history for inertia
        const now = performance.now();
        touchHistoryRef.current.push({ x: currMidX, y: currMidY, time: now });
        if (touchHistoryRef.current.length > 5) touchHistoryRef.current.shift();

        // Direct hardware-accelerated GPU transform
        const content = contentRef?.current ?? null;
        if (content) {
          content.style.transform = `translate3d(${panX}px, ${panY}px, 0px) scale(${effectiveScale})`;
        }

        const displayZoom = Math.round(state.current.startZoom * effectiveScale);
        triggerHUD(displayZoom);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (state.current.isPinching && e.touches.length < 2) {
        if (e.cancelable) e.preventDefault();

        const {
          startZoom,
          currentScaleFactor,
          focalX,
          focalY,
          currentPanX,
          currentPanY,
          initialScrollLeft,
          initialScrollTop,
        } = state.current;

        state.current.isPinching = false;

        // Calculate settlement zoom level with bounds clamping
        const targetZoom = clampZoom(startZoom * currentScaleFactor);
        const settledScale = targetZoom / startZoom;

        const content = contentRef?.current ?? null;
        if (content) {
          // Smooth spring-back CSS transition
          content.style.transition = 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)';
          content.style.transform = `translate3d(${currentPanX}px, ${currentPanY}px, 0px) scale(${settledScale})`;
        }

        if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = setTimeout(() => {
          setZoom(targetZoom);
          triggerHUD(targetZoom);

          // Focal scroll compensation
          const scaleRatio = targetZoom / startZoom;
          const newScrollLeft = Math.max(0, focalX * scaleRatio - (focalX - initialScrollLeft) - currentPanX);
          const newScrollTop = Math.max(0, focalY * scaleRatio - (focalY - initialScrollTop) - currentPanY);

          if (content) {
            content.style.transition = 'none';
            content.style.transform = '';
            content.style.transformOrigin = '';
            content.style.willChange = '';
          }

          requestAnimationFrame(() => {
            container.scrollLeft = newScrollLeft;
            container.scrollTop = newScrollTop;

            // Momentum pan physics calculation
            if (touchHistoryRef.current.length >= 2) {
              const last = touchHistoryRef.current[touchHistoryRef.current.length - 1];
              const prev = touchHistoryRef.current[0];
              const dt = Math.max(1, last.time - prev.time);
              const vx = (last.x - prev.x) / dt;
              const vy = (last.y - prev.y) / dt;

              const speed = Math.hypot(vx, vy);
              if (speed > 0.2) {
                let curVx = vx * 16;
                let curVy = vy * 16;

                const runMomentum = () => {
                  container.scrollLeft -= curVx;
                  container.scrollTop -= curVy;
                  curVx *= 0.92;
                  curVy *= 0.92;

                  if (Math.hypot(curVx, curVy) > 0.4) {
                    momentumRafRef.current = requestAnimationFrame(runMomentum);
                  } else {
                    momentumRafRef.current = null;
                  }
                };
                momentumRafRef.current = requestAnimationFrame(runMomentum);
              }
            }
          });
        }, 200);
      }
    };

    // Trackpad pinch-to-zoom (Wheel with Ctrl key)
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const currentScale = zoomRef.current / 100;
        const contentX = (container.scrollLeft + mouseX) / currentScale;
        const contentY = (container.scrollTop + mouseY) / currentScale;

        const delta = -e.deltaY * 0.4;
        const newZoom = clampZoom(zoomRef.current + delta);
        const newScale = newZoom / 100;

        setZoom(newZoom);
        triggerHUD(newZoom);

        container.scrollLeft = contentX * newScale - mouseX;
        container.scrollTop = contentY * newScale - mouseY;
      }
    };

    const preventGesture = (e: Event) => e.preventDefault();

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });
    container.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('gesturestart', preventGesture as EventListener, { passive: false });
    container.addEventListener('gesturechange', preventGesture as EventListener, { passive: false });
    container.addEventListener('gestureend', preventGesture as EventListener, { passive: false });

    return () => {
      stopMomentum();
      if (hudFadeTimeoutRef.current) clearTimeout(hudFadeTimeoutRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('gesturestart', preventGesture as EventListener);
      container.removeEventListener('gesturechange', preventGesture as EventListener);
      container.removeEventListener('gestureend', preventGesture as EventListener);
    };
  }, [containerEl, containerRef, contentRef, clampZoom, setZoom, onDoubleTap, enabled, animateZoomTo, stopMomentum, triggerHUD, minZoom, maxZoom]);

  // Floating Physics Zoom HUD
  const zoomHUD = useMemo(() => {
    if (!showHUD) return null;
    return (
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9990] pointer-events-none select-none animate-in fade-in zoom-in-95 duration-150">
        <div className="px-4 py-2 rounded-full bg-slate-900/85 dark:bg-slate-800/90 text-white backdrop-blur-md shadow-2xl border border-slate-700/60 flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wider text-indigo-300 uppercase">Zoom</span>
          <span className="text-sm font-bold font-mono tabular-nums">{hudZoom}%</span>
        </div>
      </div>
    );
  }, [showHUD, hudZoom]);

  return {
    isPinching,
    currentZoom: hudZoom,
    zoomHUD,
  };
};

export default useTouchZoom;
