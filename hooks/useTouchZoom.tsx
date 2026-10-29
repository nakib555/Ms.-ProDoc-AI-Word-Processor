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

interface TransformOptions {
  transform?: string;
  transformOrigin?: string;
  transition?: string;
  willChange?: string;
}

function updateElementTransform(el: HTMLDivElement | null, options: TransformOptions) {
  if (!el) return;
  if (options.transform !== undefined) el.style.transform = options.transform;
  if (options.transformOrigin !== undefined) el.style.transformOrigin = options.transformOrigin;
  if (options.transition !== undefined) el.style.transition = options.transition;
  if (options.willChange !== undefined) el.style.willChange = options.willChange;
}

/**
 * Industry-grade, 60-120 FPS multi-touch gesture engine for mobile pinch-to-zoom and pan:
 * 1. Non-passive native event listeners preventing whole-page browser zoom on iOS Safari & Chrome
 * 2. Real-time geometric centroid (midpoint) tracking for jitter-free focal locking
 * 3. Direct GPU hardware transforms during active touches with zero React layout thrashing
 * 4. Atomic settlement on touch release with smooth CSS transition and focal scroll compensation
 * 5. Concurrent 2-finger panning and rubber-band boundary damping
 * 6. Single-finger preservation for natural vertical scrolling and text editing
 * 7. Trackpad pinch-to-zoom (Ctrl+Wheel) and double-tap zoom animation support
 */
export const useTouchZoom = ({
  containerRef,
  contentRef,
  zoom,
  setZoom,
  minZoom = 15,
  maxZoom = 450,
  onDoubleTap,
  enabled = true,
}: UseTouchZoomOptions): TouchZoomResult => {
  const gestureContext = useGestureContext();
  const [isPinching, setIsPinching] = useState(false);
  const [hudZoom, setHudZoom] = useState(zoom);

  const zoomRef = useRef(zoom);
  const hudTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current !== containerEl) {
      setContainerEl(containerRef.current);
    }
  }, [containerRef]);

  // Register active viewport elements with global gesture context
  useEffect(() => {
    gestureContext.registerActiveView(containerEl || containerRef.current, contentRef?.current ?? null);
  }, [containerEl, containerRef, contentRef, gestureContext]);

  const clampZoom = useCallback((val: number) => {
    return Math.min(maxZoom, Math.max(minZoom, Math.round(val)));
  }, [minZoom, maxZoom]);


  // Gesture tracking state across touch lifecycles
  const gestureState = useRef({
    isPinching: false,
    startZoom: zoom,
    initialDistance: 0,
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

  // Smoothly animate zoom level with CSS transform transition
  const animateZoomWithTransition = useCallback((targetZoom: number, focalPoint?: { x: number; y: number }) => {
    const container = containerEl || containerRef.current;
    const content = contentRef?.current ?? null;
    if (!container || !content) {
      setZoom(targetZoom);
      setHudZoom(targetZoom);
      gestureContext.setHudZoom(targetZoom);
      return;
    }

    const currentZoomVal = zoomRef.current;
    const scaleRatio = targetZoom / currentZoomVal;
    const containerRect = container.getBoundingClientRect();

    const fx = focalPoint ? focalPoint.x - containerRect.left + container.scrollLeft : container.scrollLeft + containerRect.width / 2;
    const fy = focalPoint ? focalPoint.y - containerRect.top + container.scrollTop : container.scrollTop + containerRect.height / 2;

    // Apply focal origin and smooth CSS transition on transform property
    updateElementTransform(content, {
      transformOrigin: `${fx}px ${fy}px`,
      willChange: 'transform',
      transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
      transform: `scale(${scaleRatio})`,
    });

    setIsPinching(true);
    setHudZoom(targetZoom);
    gestureContext.setIsPinching(true);
    gestureContext.setHudZoom(targetZoom);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      // Commit state atomically
      setZoom(targetZoom);

      // Focal scroll compensation
      const newScrollLeft = Math.max(0, fx * scaleRatio - (fx - container.scrollLeft));
      const newScrollTop = Math.max(0, fy * scaleRatio - (fy - container.scrollTop));

      updateElementTransform(content, {
        transition: 'none',
        transform: '',
        transformOrigin: '',
        willChange: '',
      });

      container.scrollLeft = newScrollLeft;
      container.scrollTop = newScrollTop;

      if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
      hudTimerRef.current = setTimeout(() => {
        setIsPinching(false);
        gestureContext.setIsPinching(false);
      }, 400);
    }, 260);
  }, [containerEl, containerRef, contentRef, setZoom, gestureContext]);

  // Multi-Touch Pinch & Pan Engine
  useEffect(() => {
    const container = containerEl || containerRef.current;
    if (!container || !enabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Multi-touch pinch initiated - block browser viewport scaling
        if (e.cancelable) e.preventDefault();

        const t1 = e.touches[0];
        const t2 = e.touches[1];

        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const midX = (t1.clientX + t2.clientX) / 2;
        const midY = (t1.clientY + t2.clientY) / 2;

        const containerRect = container.getBoundingClientRect();
        const focalX = midX - containerRect.left + container.scrollLeft;
        const focalY = midY - containerRect.top + container.scrollTop;

        gestureState.current = {
          ...gestureState.current,
          isPinching: true,
          startZoom: zoomRef.current,
          initialDistance: dist,
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

        const content = contentRef?.current ?? null;
        if (content) {
          updateElementTransform(content, {
            transition: 'none',
            transformOrigin: `${focalX}px ${focalY}px`,
            willChange: 'transform',
          });
        }

        setIsPinching(true);
        setHudZoom(zoomRef.current);
        gestureContext.setIsPinching(true);
        gestureContext.setHudZoom(zoomRef.current);
        gestureContext.updateGestureState({
          isPinching: true,
          focalPoint: { x: focalX, y: focalY },
          scale: 1,
        });
      } else if (e.touches.length === 1 && !gestureState.current.isPinching) {
        // Fast double-tap detection for quick zoom toggle
        const touch = e.touches[0];
        const now = Date.now();
        const delta = now - gestureState.current.lastTapTime;
        const dist = Math.hypot(
          touch.clientX - gestureState.current.lastTapX,
          touch.clientY - gestureState.current.lastTapY
        );

        if (delta > 40 && delta < 320 && dist < 30) {
          if (e.cancelable) e.preventDefault();
          if (onDoubleTap) {
            onDoubleTap();
          } else {
            const target = zoomRef.current >= 130 ? 100 : 150;
            animateZoomWithTransition(target, { x: touch.clientX, y: touch.clientY });
          }
          gestureState.current.lastTapTime = 0;
        } else {
          gestureState.current.lastTapTime = now;
          gestureState.current.lastTapX = touch.clientX;
          gestureState.current.lastTapY = touch.clientY;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && gestureState.current.isPinching) {
        // Crucial: Prevent default to stop mobile Safari & Chrome whole-page viewport scaling
        if (e.cancelable) e.preventDefault();

        const t1 = e.touches[0];
        const t2 = e.touches[1];

        const currDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const currMidX = (t1.clientX + t2.clientX) / 2;
        const currMidY = (t1.clientY + t2.clientY) / 2;

        const panX = currMidX - gestureState.current.initialMidX;
        const panY = currMidY - gestureState.current.initialMidY;

        const scale = gestureState.current.initialDistance > 0 
          ? currDist / gestureState.current.initialDistance 
          : 1;

        // Apply natural rubber-band resistance damping beyond bounds
        const rawTargetZoom = gestureState.current.startZoom * scale;
        let effectiveScale = scale;
        if (rawTargetZoom < minZoom) {
          const overflow = minZoom - rawTargetZoom;
          effectiveScale = (minZoom - Math.sqrt(overflow) * 1.5) / gestureState.current.startZoom;
        } else if (rawTargetZoom > maxZoom) {
          const overflow = rawTargetZoom - maxZoom;
          effectiveScale = (maxZoom + Math.sqrt(overflow) * 1.5) / gestureState.current.startZoom;
        }

        gestureState.current.currentScaleFactor = effectiveScale;
        gestureState.current.currentPanX = panX;
        gestureState.current.currentPanY = panY;

        // 60-120 FPS hardware-accelerated direct GPU transform
        const content = contentRef?.current ?? null;
        if (content) {
          updateElementTransform(content, {
            transition: 'none',
            transform: `translate3d(${panX}px, ${panY}px, 0px) scale(${effectiveScale})`,
          });
        }

        const displayZoom = Math.round(gestureState.current.startZoom * effectiveScale);
        setHudZoom(displayZoom);
        gestureContext.setHudZoom(displayZoom);
        gestureContext.updateGestureState({
          scale: effectiveScale,
          panX,
          panY,
          isPinching: true,
        });
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (gestureState.current.isPinching && e.touches.length < 2) {
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
        } = gestureState.current;

        gestureState.current.isPinching = false;

        const targetZoom = clampZoom(startZoom * currentScaleFactor);
        const settledScale = targetZoom / startZoom;

        const content = contentRef?.current ?? null;
        if (content) {
          // Smooth CSS transition to the settled zoom state
          updateElementTransform(content, {
            transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
            transform: `translate3d(${currentPanX}px, ${currentPanY}px, 0px) scale(${settledScale})`,
          });
        }

        if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = setTimeout(() => {
          // Commit final state to React
          setZoom(targetZoom);
          setHudZoom(targetZoom);
          gestureContext.setHudZoom(targetZoom);

          // Calculate focal scroll compensation with pan displacement
          const scaleRatio = targetZoom / startZoom;
          const newScrollLeft = Math.max(0, focalX * scaleRatio - (focalX - initialScrollLeft) - currentPanX);
          const newScrollTop = Math.max(0, focalY * scaleRatio - (focalY - initialScrollTop) - currentPanY);

          if (content) {
            updateElementTransform(content, {
              transition: 'none',
              transform: '',
              transformOrigin: '',
              willChange: '',
            });
          }

          requestAnimationFrame(() => {
            container.scrollLeft = newScrollLeft;
            container.scrollTop = newScrollTop;
          });

          if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
          hudTimerRef.current = setTimeout(() => {
            setIsPinching(false);
            gestureContext.setIsPinching(false);
            gestureContext.updateGestureState({
              isPinching: false,
              scale: 1,
              panX: 0,
              panY: 0,
            });
          }, 400);
        }, 200);
      }
    };

    // Trackpad pinch-to-zoom (Wheel with Ctrl key) with smooth focal transform
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const currentScale = zoomRef.current / 100;
        const contentX = (container.scrollLeft + mouseX) / currentScale;
        const contentY = (container.scrollTop + mouseY) / currentScale;

        const delta = -e.deltaY * 0.5;
        const newZoom = clampZoom(zoomRef.current + delta);
        const newScale = newZoom / 100;

        setZoom(newZoom);
        setHudZoom(newZoom);
        gestureContext.setHudZoom(newZoom);
        setIsPinching(true);
        gestureContext.setIsPinching(true);

        container.scrollLeft = contentX * newScale - mouseX;
        container.scrollTop = contentY * newScale - mouseY;

        if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
        hudTimerRef.current = setTimeout(() => {
          setIsPinching(false);
          gestureContext.setIsPinching(false);
        }, 500);
      }
    };

    // WebKit-specific gesture cancellation (prevent iOS Safari full viewport scaling)
    const preventGesture = (e: Event) => {
      e.preventDefault();
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });
    container.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('gesturestart', preventGesture as EventListener, { passive: false });
    container.addEventListener('gesturechange', preventGesture as EventListener, { passive: false });
    container.addEventListener('gestureend', preventGesture as EventListener, { passive: false });

    return () => {
      if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      setIsPinching(false);
      gestureContext.setIsPinching(false);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('gesturestart', preventGesture as EventListener);
      container.removeEventListener('gesturechange', preventGesture as EventListener);
      container.removeEventListener('gestureend', preventGesture as EventListener);
    };
  }, [containerEl, containerRef, contentRef, clampZoom, setZoom, onDoubleTap, enabled, animateZoomWithTransition, gestureContext, minZoom, maxZoom]);

  return {
    isPinching,
    currentZoom: hudZoom,
    zoomHUD: null,
  };
};
