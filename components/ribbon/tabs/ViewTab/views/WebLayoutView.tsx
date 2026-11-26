import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PageConfig } from '../../../../../types';
import { useMathLive } from '../../../../../hooks/useMathLive';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useTouchZoom } from '../../../../../hooks/useTouchZoom';
import { useGestureContext } from '../../../../../contexts/GestureContext';
import { isAnyModalOpen } from '../../../../../utils/modalScroll';

interface WebLayoutViewProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  content: string;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onPaste: (e: React.ClipboardEvent) => void;
  onPageClick: (e: React.MouseEvent) => void;
  pageConfig: PageConfig;
  zoom: number;
  showFormattingMarks: boolean;
  backgroundStyle: React.CSSProperties;
}

export const WebLayoutView: React.FC<WebLayoutViewProps> = ({
  editorRef,
  content,
  onInput,
  onPaste,
  onPageClick,
  pageConfig: _pageConfig,
  zoom,
  showFormattingMarks,
  backgroundStyle
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    setActiveElementType,
    setZoom,
    zoomMode,
    setZoomMode,
    undo,
    redo,
    historyApplySeq,
    calibrationScale,
    formatPainterStyles,
    applyFormatPainterToSelection,
  } = useEditor();
  const { isGestureLocked, triggerGestureLock } = useGestureContext();

  const [viewportWidth, setViewportWidth] = useState(0);
  const [unscaledHeight, setUnscaledHeight] = useState(800);

  const { isPinching } = useTouchZoom({
    containerRef,
    contentRef: editorRef,
    zoom,
    calibrationScale,
    setZoom: (newZoomOrUpdater) => {
      if (zoomMode !== 'custom') {
        setZoomMode('custom');
      }
      setZoom(newZoomOrUpdater);
    },
    onPinchStart: () => {
      if (zoomMode !== 'custom') {
        setZoomMode('custom');
      }
    },
    minZoom: 20,
    maxZoom: 400,
  });

  // Debounced ResizeObserver for viewport & unscaled page height
  useLayoutEffect(() => {
    const container = containerRef.current;
    const editorEl = editorRef.current;
    if (!container && !editorEl) return;

    let mounted = true;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let rafId: number | null = null;

    const measure = () => {
      if (!mounted) return;
      if (containerRef.current) {
        const vw = containerRef.current.clientWidth;
        if (vw > 0) {
          setViewportWidth(prev => (Math.abs(prev - vw) < 1 ? prev : vw));
        }
      }
      if (editorRef.current) {
        const h = editorRef.current.offsetHeight;
        if (h > 0) {
          setUnscaledHeight(prev => (Math.abs(prev - h) < 1 ? prev : h));
        }
      }
    };

    measure();

    const scheduleMeasure = () => {
      if (debounceTimer !== null) clearTimeout(debounceTimer);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      debounceTimer = setTimeout(() => {
        debounceTimer = null;
        rafId = requestAnimationFrame(() => {
          rafId = null;
          measure();
        });
      }, 32);
    };

    const observer = new ResizeObserver(scheduleMeasure);
    if (container) observer.observe(container);
    if (editorEl) observer.observe(editorEl);

    return () => {
      mounted = false;
      observer.disconnect();
      if (debounceTimer !== null) clearTimeout(debounceTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [editorRef]);
  
  // Sync content immediately on initial mount, external changes, and Undo/Redo
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content, editorRef, historyApplySeq]);

  useMathLive(content, editorRef);

  // Track selection to update active element type (e.g., for showing Table tabs)
  useEffect(() => {
    const handleSelectionChange = () => {
      if (!editorRef.current) return;
      
      const activeEl = document.activeElement;
      if (activeEl && activeEl.tagName.toLowerCase() === 'math-field' && editorRef.current.contains(activeEl)) {
          setActiveElementType('equation');
          return;
      }

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      
      const node = selection.anchorNode;
      if (!node) return;
      
      // Only process if the selection is inside THIS editor
      if (!editorRef.current.contains(node)) return;
      
      const element = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
      if (!element) return;
      
      if (element.closest('table')) {
          setActiveElementType('table');
      } else if (element.tagName === 'IMG' || element.closest('img')) {
          setActiveElementType('image');
      } else if (element.closest('.equation-wrapper') || element.closest('math-field') || element.closest('.math-inline') || element.closest('.math-display')) {
          setActiveElementType('equation');
      } else {
          setActiveElementType('text');
      }
    };
    
    document.addEventListener('selectionchange', handleSelectionChange);
    
    const handleFocusIn = (e: FocusEvent) => {
        const target = e.target as HTMLElement | null;
        if (target && (target.tagName?.toLowerCase() === 'math-field' || target.closest('.equation-wrapper')) && editorRef.current?.contains(target)) {
            setActiveElementType('equation');
        }
    };
    
    document.addEventListener('focusin', handleFocusIn);
    
    return () => {
        document.removeEventListener('selectionchange', handleSelectionChange);
        document.removeEventListener('focusin', handleFocusIn);
    };
  }, [setActiveElementType, editorRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.ctrlKey || e.metaKey) && !e.altKey) {
      const key = e.key.toLowerCase();
      if (key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
        return;
      }
      if (key === 'y') {
        e.preventDefault();
        redo();
        return;
      }
    }
  };

  const scale = (zoom / 100) * calibrationScale;
  const basePageWidth = viewportWidth > 64 ? Math.min(1024, Math.max(320, viewportWidth - 64)) : 896;
  const scaledWidth = Math.round(basePageWidth * scale);
  const scaledHeight = Math.round(Math.max(400, unscaledHeight) * scale);

  const lastAppliedFitZoomRef = useRef<number | null>(null);
  useEffect(() => {
    if (viewportWidth <= 0) return;
    if (zoomMode !== 'fit-width' && zoomMode !== 'fit-page') {
      lastAppliedFitZoomRef.current = null;
      return;
    }
    const availableWidth = Math.max(100, viewportWidth - 64);
    const targetZoom = Math.max(20, Math.round((availableWidth / (basePageWidth * calibrationScale)) * 100));
    if (Math.abs(zoom - targetZoom) >= 1 && lastAppliedFitZoomRef.current !== targetZoom) {
      lastAppliedFitZoomRef.current = targetZoom;
      setZoom(targetZoom);
    }
  }, [viewportWidth, basePageWidth, calibrationScale, zoomMode, zoom, setZoom]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 w-full h-full min-w-0 min-h-0 overflow-auto bg-slate-100 dark:bg-slate-900 relative touch-pan-x touch-pan-y"
      onClick={onPageClick}
      onScroll={() => {
        if (!isAnyModalOpen()) {
          triggerGestureLock(400);
        }
      }}
      style={{ overflow: 'auto' }}
    >
      <div
        className="box-border"
        style={{
          padding: '32px',
          minWidth: '100%',
          width: 'max-content',
          minHeight: '100%',
        }}
      >
        <div
          className="relative shrink-0"
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
            margin: '0 auto',
          }}
        >
          <div 
            ref={editorRef}
            contentEditable={!isGestureLocked}
            inputMode={isGestureLocked ? "none" : "text"}
            suppressContentEditableWarning
            onInput={onInput}
            onKeyDown={handleKeyDown}
            onPaste={onPaste}
            onMouseUp={() => {
              if (formatPainterStyles) {
                applyFormatPainterToSelection();
              }
            }}
            className={`bg-white dark:bg-slate-800 shadow-xl outline-none p-12 min-h-screen prose dark:prose-invert ${showFormattingMarks ? 'show-formatting-marks' : ''} ${isGestureLocked ? 'pointer-events-none select-none' : ''} ${formatPainterStyles ? 'cursor-crosshair' : ''}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${basePageWidth}px`,
              ...backgroundStyle,
              ...(isPinching ? {} : {
                zoom: scale,
              }),
              fontFamily: 'Calibri, Inter, sans-serif',
              lineHeight: '1.6',
            }}
          />
        </div>
      </div>
    </div>
  );
};
