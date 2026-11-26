import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PageConfig } from '../../../../../types';
import { useMathLive } from '../../../../../hooks/useMathLive';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useTouchZoom } from '../../../../../hooks/useTouchZoom';
import { useGestureContext } from '../../../../../contexts/GestureContext';
import { insertEquationBox } from '../../InsertTab/symbols/equation_subTab/common/mathUtils';

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
  const { isGestureLocked } = useGestureContext();

  const [viewportWidth, setViewportWidth] = useState(0);
  const [unscaledHeight, setUnscaledHeight] = useState(800);
  const isComposingRef = useRef(false);
  const pendingExternalSyncRef = useRef(false);

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
  
  // Sync content immediately on initial mount, external changes, and Undo/Redo (never mid-IME composition)
  useEffect(() => {
    if (!editorRef.current) return;
    if (isComposingRef.current) {
      pendingExternalSyncRef.current = true;
      return;
    }
    if (editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content, editorRef, historyApplySeq]);

  useMathLive(content, editorRef);

  // Keep active caret scrolled into view when soft keyboard resizes visualViewport
  useEffect(() => {
    const vv = typeof window !== 'undefined' ? window.visualViewport : null;
    if (!vv) return;
    let prevHeight = vv.height;

    const handleViewportResize = () => {
      const nextHeight = vv.height;
      const shrank = nextHeight < prevHeight - 40;
      prevHeight = nextHeight;
      if (!shrank) return;

      const editorEl = editorRef.current;
      const container = containerRef.current;
      if (!editorEl || !container) return;
      const activeEl = document.activeElement as HTMLElement | null;
      if (!activeEl || (activeEl !== editorEl && !editorEl.contains(activeEl))) return;

      requestAnimationFrame(() => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        const range = sel.getRangeAt(0);
        if (!editorEl.contains(range.startContainer)) return;
        const containerRect = container.getBoundingClientRect();
        let rect = range.getBoundingClientRect();
        if (rect.top === 0 && rect.height === 0) {
          const el = range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.parentElement
            : (range.startContainer as HTMLElement);
          if (el) rect = el.getBoundingClientRect();
        }
        if (rect.height > 0 && rect.bottom > containerRect.bottom - 32) {
          container.scrollBy({
            top: rect.bottom - (containerRect.bottom - 32),
            behavior: 'auto',
          });
        }
      });
    };

    vv.addEventListener('resize', handleViewportResize);
    return () => vv.removeEventListener('resize', handleViewportResize);
  }, [editorRef]);

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
    if (e.altKey && !e.ctrlKey && !e.metaKey && (e.key === '=' || e.code === 'Equal')) {
      e.preventDefault();
      insertEquationBox();
      return;
    }
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
  const pad = viewportWidth > 0 && viewportWidth < 640 ? 12 : viewportWidth > 0 && viewportWidth < 768 ? 20 : 32;
  const basePageWidth = viewportWidth > 64 ? Math.min(1024, Math.max(280, viewportWidth - pad * 2)) : 896;
  const scaledWidth = Math.round(basePageWidth * scale);
  const scaledHeight = Math.round(Math.max(400, unscaledHeight) * scale);

  const lastAppliedFitZoomRef = useRef<number | null>(null);
  useEffect(() => {
    if (viewportWidth <= 0) return;
    if (zoomMode !== 'fit-width' && zoomMode !== 'fit-page') {
      lastAppliedFitZoomRef.current = null;
      return;
    }
    const availableWidth = Math.max(100, viewportWidth - pad * 2);
    const targetZoom = Math.max(20, Math.round((availableWidth / (basePageWidth * calibrationScale)) * 100));
    if (Math.abs(zoom - targetZoom) >= 1 && lastAppliedFitZoomRef.current !== targetZoom) {
      lastAppliedFitZoomRef.current = targetZoom;
      setZoom(targetZoom);
    }
  }, [viewportWidth, pad, basePageWidth, calibrationScale, zoomMode, zoom, setZoom]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 w-full h-full min-w-0 min-h-0 overflow-auto bg-slate-100 dark:bg-slate-900 relative touch-pan-x touch-pan-y"
      onClick={onPageClick}
      style={{ overflow: 'auto' }}
    >
      <div
        className="box-border"
        style={{
          padding: `${pad}px`,
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
            onCompositionStart={(e) => {
              isComposingRef.current = true;
              e.currentTarget.dataset.composing = 'true';
            }}
            onCompositionEnd={(e) => {
              isComposingRef.current = false;
              delete e.currentTarget.dataset.composing;
              pendingExternalSyncRef.current = false;
              onInput(e as unknown as React.FormEvent<HTMLDivElement>);
            }}
            onInput={onInput}
            onKeyDown={handleKeyDown}
            onPaste={onPaste}
            onMouseUp={() => {
              if (formatPainterStyles) {
                applyFormatPainterToSelection();
              }
            }}
            className={`bg-white dark:bg-slate-800 shadow-xl outline-none p-4 xs:p-6 sm:p-8 lg:p-12 min-h-screen prose dark:prose-invert ${showFormattingMarks ? 'show-formatting-marks' : ''} ${isGestureLocked ? 'pointer-events-none select-none' : ''} ${formatPainterStyles ? 'cursor-crosshair' : ''}`}
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
