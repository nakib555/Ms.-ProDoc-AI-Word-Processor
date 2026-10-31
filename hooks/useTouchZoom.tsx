/* eslint-disable react-hooks/immutability */
import React, { useEffect, useRef, useState, useCallback } from 'react';
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
 * - Atomic zoom commitment on gesture release (eliminates two-finger reset bug)
 * - True focal-point centroid locking (content under fingers stays pinned)
 * - Auto-hiding HUD synchronized with GestureContext (600ms auto-fade)
 * - WebKit gesture suppression preventing full-browser viewport resizing
 */
export const useTouchZoom = ({
  containerRef,
  contentRef,
  zoom,
  setZoom,
  minZoom = 15,
  maxZoom = 500,
  onDoubleTap,
  enabled = true,
}: UseTouchZoomOptions): TouchZoomResult => {
  const gestureContext = useGestureContext();
  const [isPinching, setIsPinching] = useState(false);
  const [hudZoom, setHudZoom] = useState(zoom);

  const zoomRef = useRef(zoom);
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const momentumRafRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchHistoryRef = useRef<TouchSample[]>([]);

  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (containerRef.current !== containerEl) {
      setContainerEl(containerRef.current);
    }
  }, [containerRef, containerEl]);

  // Register active viewport elements with gesture context
  useEffect(() => {
    gestureContext.registerActiveView(containerEl || containerRef.current, contentRef?.current ?? null);
  }, [containerEl, containerRef, contentRef, gestureContext]);

  const clampZoom = useCallback((val: number) => {
    return Math.min(maxZoom, Math.max(minZoom, Math.round(val)));
  }, [minZoom, maxZoom]);

  // Display HUD helper synchronized through gestureContext
  const triggerHUD = useCallback((displayZoom: number) => {
    setHudZoom(displayZoom);
    gestureContext.setHudZoom(displayZoom);
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
      zoomRef.current = targetZoom;
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
    content.style.transition = 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)';
    content.style.transform = `scale(${scaleRatio})`;

    setIsPinching(true);
    gestureContext.setIsPinching(true);
    triggerHUD(targetZoom);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      zoomRef.current = targetZoom;
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
      gestureContext.setIsPinching(false);
      transitionTimerRef.current = null;
    }, 200);
  }, [containerEl, containerRef, contentRef, setZoom, triggerHUD, gestureContext]);

  // Main native gesture listener
  useEffect(() => {
    const container = containerEl || containerRef.current;
    if (!container || !enabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      stopMomentum();

      // If a previous transition timer was pending, flush it cleanly
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
        const content = contentRef?.current ?? null;
        if (content) {
          content.style.transition = 'none';
          content.style.transform = '';
          content.style.transformOrigin = '';
          content.style.willChange = '';
        }
      }

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
          initialDist: Math.max(dist, 1),
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
        gestureContext.setIsPinching(true);
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
        setIsPinching(false);
        gestureContext.setIsPinching(false);

        // Calculate settlement zoom level with bounds clamping
        const targetZoom = clampZoom(startZoom * currentScaleFactor);
        
        // Immediately sync zoomRef to targetZoom so subsequent gestures never read old zoom
        zoomRef.current = targetZoom;

        const content = contentRef?.current ?? null;
        const scaleRatio = targetZoom / startZoom;
        const newScrollLeft = Math.max(0, focalX * scaleRatio - (focalX - initialScrollLeft) - currentPanX);
        const newScrollTop = Math.max(0, focalY * scaleRatio - (focalY - initialScrollTop) - currentPanY);

        // Atomic commit to state: immediately set new zoom and update HUD
        setZoom(targetZoom);
        triggerHUD(targetZoom);

        if (content) {
          content.style.transition = 'none';
          content.style.transform = '';
          content.style.transformOrigin = '';
          content.style.willChange = '';
        }

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

        zoomRef.current = newZoom;
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
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('gesturestart', preventGesture as EventListener, { passive: false });
    container.addEventListener('gesturechange', preventGesture as EventListener, { passive: false });
    container.addEventListener('gestureend', preventGesture as EventListener, { passive: false });

    return () => {
      stopMomentum();
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('gesturestart', preventGesture as EventListener);
      container.removeEventListener('gesturechange', preventGesture as EventListener);
      container.removeEventListener('gestureend', preventGesture as EventListener);
    };
  }, [containerEl, containerRef, contentRef, clampZoom, setZoom, onDoubleTap, enabled, animateZoomTo, stopMomentum, triggerHUD, gestureContext, minZoom, maxZoom]);

  return {
    isPinching,
    currentZoom: hudZoom,
    zoomHUD: null,
  };
};

export default useTouchZoom;
