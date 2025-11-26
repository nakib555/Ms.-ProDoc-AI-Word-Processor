
import React, { useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { useEditor } from '../contexts/EditorContext';
import { WebLayoutView } from './ribbon/tabs/ViewTab/views/WebLayoutTool';
import { PrintLayoutView } from './ribbon/tabs/ViewTab/views/PrintLayoutTool';
import { ReadLayoutView } from './ribbon/tabs/ViewTab/views/ReadLayoutView';

const Editor: React.FC = () => {
  const { 
    content, 
    setContent, 
    zoom, 
    setZoom,
    viewMode, 
    pageConfig, 
    registerContainer, 
    showRuler, 
    showFormattingMarks,
    editorRef 
  } = useEditor();
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pendingScrollRef = useRef<{left: number, top: number} | null>(null);

  // Stable callback for ref registration
  const handleRegister = useCallback((node: HTMLDivElement | null) => {
      containerRef.current = node;
      registerContainer(node);
  }, [registerContainer]);

  // Zoom-to-Cursor Logic
  useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleWheel = (e: WheelEvent) => {
          // Handle Ctrl+Wheel for Zooming
          if (e.ctrlKey || e.metaKey) {
              e.preventDefault();

              const rect = container.getBoundingClientRect();
              // Calculate mouse position relative to the scrolling viewport
              const mouseX = e.clientX - rect.left;
              const mouseY = e.clientY - rect.top;

              // Current scale
              const scaleOld = zoom / 100;
              
              // Determine Zoom Direction and Step
              const direction = e.deltaY > 0 ? -1 : 1; 
              const zoomStep = 10; // 10% increments
              
              let nextZoom = zoom + (direction * zoomStep);
              nextZoom = Math.max(10, Math.min(500, nextZoom));

              if (nextZoom !== zoom) {
                  const scaleNew = nextZoom / 100;
                  
                  // Current Scroll Positions
                  const scrollLeft = container.scrollLeft;
                  const scrollTop = container.scrollTop;

                  // Calculate the point on the content under the mouse cursor
                  // Formula: ContentPoint = (ScrollPosition + MouseOffset) / OldScale
                  const contentX = (scrollLeft + mouseX) / scaleOld;
                  const contentY = (scrollTop + mouseY) / scaleOld;

                  // Calculate new Scroll Positions to keep ContentPoint under MouseOffset
                  // Formula: NewScroll = (ContentPoint * NewScale) - MouseOffset
                  const newScrollLeft = (contentX * scaleNew) - mouseX;
                  const newScrollTop = (contentY * scaleNew) - mouseY;

                  // Store pending scroll to apply after render
                  pendingScrollRef.current = { left: newScrollLeft, top: newScrollTop };
                  setZoom(nextZoom);
              }
          }
      };

      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
  }, [zoom, setZoom]);

  // Apply pending scroll adjustment after layout update
  useLayoutEffect(() => {
      if (pendingScrollRef.current && containerRef.current) {
          containerRef.current.scrollLeft = pendingScrollRef.current.left;
          containerRef.current.scrollTop = pendingScrollRef.current.top;
          pendingScrollRef.current = null;
      }
  }, [zoom]);

  // Read Mode Route
  if (viewMode === 'read') {
      return <ReadLayoutView />;
  }

  // Web Layout Background
  const getBackgroundStyle = (): React.CSSProperties => {
      const base: React.CSSProperties = {
          backgroundColor: pageConfig.pageColor || '#ffffff',
      };
      if (pageConfig.background === 'ruled') {
          return {
              ...base,
              backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px)',
              backgroundSize: '100% 2rem'
          };
      } else if (pageConfig.background === 'grid') {
          return {
              ...base,
              backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
              backgroundSize: '20px 20px'
          };
      }
      return base;
  };

  const isPrint = viewMode === 'print';

  return (
    <div 
        ref={handleRegister}
        className={`flex-1 overflow-y-auto overflow-x-auto relative flex flex-col scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent overscroll-none transition-colors duration-500 ${isPrint ? 'bg-[#F8F9FA] dark:bg-slate-950' : 'bg-white dark:bg-slate-900'}`}
        style={!isPrint ? { backgroundColor: pageConfig.pageColor } : undefined}
    >
      {isPrint ? (
        /* Print Layout: Vertical stack of Pages */
        <PrintLayoutView 
            content={content}
            setContent={setContent}
            pageConfig={pageConfig}
            zoom={zoom}
            showRuler={showRuler}
            showFormattingMarks={showFormattingMarks}
        />
      ) : (
        /* Web Layout: Fluid View */
        <WebLayoutView 
            editorRef={editorRef}
            content={content}
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            onPaste={() => {}}
            onPageClick={() => {}}
            pageConfig={pageConfig}
            zoom={zoom}
            showFormattingMarks={showFormattingMarks}
            backgroundStyle={getBackgroundStyle()}
        />
      )}
    </div>
  );
};

export default React.memo(Editor);
