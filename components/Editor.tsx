
import React, { useRef, useEffect, useLayoutEffect, useCallback, Suspense } from 'react';
import { useEditor } from '../contexts/EditorContext';
import * as AutoSizerPkg from 'react-virtualized-auto-sizer';
import { Loader2 } from 'lucide-react';

// Safely resolve AutoSizer from the package (handles ESM/CJS interop on CDNs)
const AutoSizer = (AutoSizerPkg as any).default || AutoSizerPkg;

// Lazy Load Views with safety check
const PrintLayoutView = React.lazy(() => 
  import('./ribbon/tabs/ViewTab/views/PrintLayoutView')
    .then(m => ({ default: m.PrintLayoutView }))
    .catch(err => {
      console.error("Failed to load PrintLayoutView", err);
      return { default: () => <div className="p-4 text-red-500">Error loading Print Layout. Please refresh.</div> };
    })
);

const WebLayoutView = React.lazy(() => 
  import('./ribbon/tabs/ViewTab/views/WebLayoutTool')
    .then(m => ({ default: m.WebLayoutView }))
    .catch(err => {
      console.error("Failed to load WebLayoutView", err);
      return { default: () => <div className="p-4 text-red-500">Error loading Web Layout. Please refresh.</div> };
    })
);

const ReadLayoutView = React.lazy(() => 
  import('./ribbon/tabs/ViewTab/views/ReadLayoutView')
    .then(m => ({ default: m.ReadLayoutView }))
    .catch(err => {
      console.error("Failed to load ReadLayoutView", err);
      return { default: () => <div className="p-4 text-red-500">Error loading Read Mode. Please refresh.</div> };
    })
);

const ViewLoading = () => (
  <div className="flex flex-col items-center justify-center h-full w-full text-slate-400 gap-3">
    <Loader2 className="animate-spin text-blue-500" size={32} />
    <span className="text-sm font-medium">Loading document view...</span>
  </div>
);

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
  // Store point relative to content for stable zooming
  const pendingScrollRef = useRef<{ pointX: number, pointY: number, mouseX: number, mouseY: number } | null>(null);
  const prevZoomRef = useRef<number>(zoom);

  // Stable callback for ref registration
  // We pass this to the specific view which will attach it to the scrollable element
  const handleRegister = useCallback((node: HTMLDivElement | null) => {
      containerRef.current = node;
      registerContainer(node);
  }, [registerContainer]);

  // Zoom-to-Cursor Logic (Mouse Wheel)
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
              
              // Find content start offset (to handle centered layouts like Print View)
              let contentOffsetLeft = 0;
              let contentOffsetTop = 0;
              
              const firstPage = container.querySelector('.prodoc-page-wrapper') as HTMLElement;
              if (firstPage) {
                  contentOffsetLeft = firstPage.offsetLeft;
                  contentOffsetTop = firstPage.offsetTop;
              }
              
              // Calculate the point on the content (unscaled coordinates) under the mouse
              const pointX = (container.scrollLeft + mouseX - contentOffsetLeft) / scaleOld;
              const pointY = (container.scrollTop + mouseY - contentOffsetTop) / scaleOld;
              
              // Determine Zoom Direction and Step
              const direction = e.deltaY > 0 ? -1 : 1; 
              const zoomStep = 10; // 10% increments
              
              let nextZoom = zoom + (direction * zoomStep);
              nextZoom = Math.max(10, Math.min(500, nextZoom));

              if (nextZoom !== zoom) {
                  // Store the target point and mouse position to restore after render
                  pendingScrollRef.current = { pointX, pointY, mouseX, mouseY };
                  setZoom(nextZoom);
              }
          }
      };

      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
  }, [zoom, setZoom]);

  // Apply pending scroll adjustment after layout update (Zoom Logic)
  useLayoutEffect(() => {
      const container = containerRef.current;
      if (!container) {
          prevZoomRef.current = zoom;
          return;
      }

      const rect = container.getBoundingClientRect();
      const viewportW = rect.width;
      const viewportH = rect.height;

      const firstPage = container.querySelector('.prodoc-page-wrapper') as HTMLElement;
      let newContentOffsetLeft = 0;
      let newContentOffsetTop = 0;
      let newContentWidth = 0;
      
      if (firstPage) {
          newContentOffsetLeft = firstPage.offsetLeft;
          newContentOffsetTop = firstPage.offsetTop;
          newContentWidth = firstPage.offsetWidth;
      }

      if (pendingScrollRef.current) {
          // Case 1: Zoom to Mouse (Wheel)
          const { pointX, pointY, mouseX, mouseY } = pendingScrollRef.current;
          const scaleNew = zoom / 100;
          
          container.scrollLeft = (pointX * scaleNew) + newContentOffsetLeft - mouseX;
          container.scrollTop = (pointY * scaleNew) + newContentOffsetTop - mouseY;
          
          pendingScrollRef.current = null;
      } else if (prevZoomRef.current !== zoom) {
          // Case 2: Zoom to Center or Caret (Button/Shortcut)
          
          const oldScale = prevZoomRef.current / 100;
          const newScale = zoom / 100;
          
          // Check for selection to "Go towards cursor"
          const sel = window.getSelection();
          let hasValidSelection = false;
          
          // Only prioritize cursor if it's inside the editor
          if (sel && sel.rangeCount > 0 && editorRef.current && editorRef.current.contains(sel.anchorNode)) {
               const range = sel.getRangeAt(0);
               const rangeRect = range.getBoundingClientRect();
               
               // Ensure rect is valid (not 0 size if collapsed, sometimes collapsed rects are tricky but usually have pos)
               if (rangeRect.top !== 0 || rangeRect.left !== 0) {
                   // Calculate how far the cursor is from the viewport center
                   const caretX = rangeRect.left - rect.left;
                   const caretY = rangeRect.top - rect.top;
                   
                   // Shift scroll to bring cursor to center
                   const shiftX = caretX - (viewportW / 2);
                   const shiftY = caretY - (viewportH / 2);
                   
                   container.scrollLeft += shiftX;
                   container.scrollTop += shiftY;
                   
                   hasValidSelection = true;
               }
          }
          
          if (!hasValidSelection) {
             // Default: Preserve Center of Viewport (Transform Origin: Center)
             
             // We attempt to map the previous center point to the new center point.
             // OldContentWidth estimate
             const baseWidth = newContentWidth / newScale;
             const oldContentWidth = baseWidth * oldScale;
             
             // Estimate Old Offset based on flex centering logic
             const oldOffsetLeft = Math.max(0, (viewportW - oldContentWidth) / 2);
             // Assume Top Offset is relatively stable (padding) or assume vertical scroll continuity
             // Simple centering is usually sufficient:
             const oldOffsetTop = newContentOffsetTop; 
             
             const oldScrollLeft = container.scrollLeft;
             const oldScrollTop = container.scrollTop;
             
             // Point P (Unscaled) at Center of Viewport
             const pointX = (oldScrollLeft + (viewportW / 2) - oldOffsetLeft) / oldScale;
             const pointY = (oldScrollTop + (viewportH / 2) - oldOffsetTop) / oldScale;

             // Apply New Scroll to put P at Center
             const targetVisX = (pointX * newScale) + newContentOffsetLeft;
             const targetVisY = (pointY * newScale) + newContentOffsetTop;
             
             container.scrollLeft = targetVisX - (viewportW / 2);
             container.scrollTop = targetVisY - (viewportH / 2);
          }
      }
      
      prevZoomRef.current = zoom;
  }, [zoom]);

  // Read Mode Route
  if (viewMode === 'read') {
      return (
        <Suspense fallback={<ViewLoading />}>
            <ReadLayoutView />
        </Suspense>
      );
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
    <div className={`flex-1 flex flex-col relative transition-colors duration-500 overflow-hidden ${isPrint ? 'bg-[#f1f5f9] dark:bg-[#020617]' : 'bg-white dark:bg-slate-900'}`}
         style={!isPrint ? { backgroundColor: pageConfig.pageColor } : undefined}>
      
      <AutoSizer>
        {({ height, width }) => (
            <div style={{ height, width }} className="relative">
                <Suspense fallback={<ViewLoading />}>
                    {isPrint ? (
                        /* Print Layout: Vertical stack of Pages with Virtualization */
                        <PrintLayoutView 
                            width={width}
                            height={height}
                            content={content}
                            setContent={setContent}
                            pageConfig={pageConfig}
                            zoom={zoom}
                            showRuler={showRuler}
                            showFormattingMarks={showFormattingMarks}
                            containerRef={handleRegister}
                        />
                    ) : (
                        /* Web Layout: Fluid View */
                        <div 
                            ref={handleRegister}
                            className="w-full h-full overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent"
                        >
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
                        </div>
                    )}
                </Suspense>
            </div>
        )}
      </AutoSizer>
    </div>
  );
};

export default Editor;
