
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FileText } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';
import { PageConfig } from '../../../../../types';
import { Ruler } from '../../../../Ruler';
import { EditorPage } from '../../../../EditorPage';
import { paginateContent } from '../../../../../utils/layoutEngine';
import { PAGE_SIZES } from '../../../../../constants';
import { FixedSizeList as List } from 'react-window';

// Define props interface locally as it might not be exported in some versions
interface ListChildComponentProps {
  index: number;
  style: React.CSSProperties;
  data: any;
}

export const PrintLayoutTool: React.FC = () => {
  const { viewMode, setViewMode } = useEditor();
  return (
    <RibbonButton 
        icon={FileText} 
        label="Print Layout" 
        onClick={() => setViewMode('print')} 
        className={viewMode === 'print' ? 'bg-slate-100 text-blue-700' : ''}
    />
  );
};

interface PrintLayoutViewProps {
  width: number;
  height: number;
  content: string;
  setContent: (content: string) => void;
  pageConfig: PageConfig;
  zoom: number;
  showRuler: boolean;
  showFormattingMarks: boolean;
  containerRef: (node: HTMLDivElement | null) => void;
}

// Separate component for Row to prevent unnecessary re-renders of the list itself
const PageRow = React.memo(({ index, style, data }: ListChildComponentProps) => {
  const { pages, pageConfig, zoom, showFormattingMarks, handlePageUpdate, handlePageFocus, pageWidth } = data;
  const pageContent = pages[index];
  
  // Calculate padding to center the page if the viewport is wider than the page
  // Note: react-window manages 'style' for positioning. We add inner centering.
  
  return (
    <div style={style} className="flex justify-center w-full">
       <div className="py-4 box-border"> {/* Vertical Gap padding */}
          <EditorPage
              pageNumber={index + 1}
              totalPages={pages.length}
              content={pageContent}
              config={pageConfig}
              zoom={zoom}
              showFormattingMarks={showFormattingMarks}
              onContentChange={handlePageUpdate}
              onFocus={() => handlePageFocus(index)}
          />
       </div>
    </div>
  );
});

export const PrintLayoutView: React.FC<PrintLayoutViewProps> = React.memo(({
  width,
  height,
  content,
  setContent,
  pageConfig,
  zoom,
  showRuler,
  showFormattingMarks,
  containerRef
}) => {
  const { setTotalPages, setCurrentPage } = useEditor();
  const [pages, setPages] = useState<string[]>(() => paginateContent(content, pageConfig).pages);
  const rulerContainerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<List>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  // Pagination Effect - Debounced for performance
  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
        if (!isMounted) return;
        const result = paginateContent(content, pageConfig);
        setPages(result.pages);
        setTotalPages(result.pages.length);
    }, 150); // Debounce delay

    return () => { 
        isMounted = false; 
        clearTimeout(timer);
    };
  }, [content, pageConfig, setTotalPages]);

  // Reset list cache when zoom or page config changes to recalculate heights
  useEffect(() => {
      // FixedSizeList doesn't usually need reset unless itemSize prop changes, 
      // but if we were using VariableSizeList we would need resetAfterIndex.
      // For FixedSizeList, reacting to itemSize prop change is handled internally by the component.
  }, [zoom, pageConfig]);

  // Calculate Page Dimensions in px
  const pageDimensions = useMemo(() => {
      let w, h;
      if (pageConfig.size === 'Custom' && pageConfig.customWidth && pageConfig.customHeight) {
          w = pageConfig.orientation === 'portrait' ? pageConfig.customWidth : pageConfig.customHeight;
          h = pageConfig.orientation === 'portrait' ? pageConfig.customHeight : pageConfig.customWidth;
      } else {
          const base = PAGE_SIZES[pageConfig.size as string] || PAGE_SIZES['Letter'];
          w = (pageConfig.orientation === 'portrait' ? base.width : base.height) / 96; // back to inches for calc if needed, but here we use base values usually
          // Re-derive px
          w = pageConfig.orientation === 'portrait' ? base.width : base.height;
          h = pageConfig.orientation === 'portrait' ? base.height : base.width;
      }
      return { width: w, height: h };
  }, [pageConfig]);

  // Item Size Calculation (Height + Vertical Gap) - Number for FixedSizeList
  const itemSize = useMemo(() => {
      const scale = zoom / 100;
      // 32px is the vertical gap (py-4 = 1rem top + 1rem bottom = 32px roughly)
      return (pageDimensions.height * scale) + 32;
  }, [pageDimensions.height, zoom]);

  const handlePageUpdate = useCallback((newHtml: string, pageIndex: number) => {
    setPages(currentPages => {
        const updatedPages = [...currentPages];
        if (updatedPages[pageIndex] !== newHtml) {
            updatedPages[pageIndex] = newHtml;
            // Debounce the full content update to avoid rapid re-pagination triggers
            // We use a simple join here, but the context debounces the save.
            const fullContent = updatedPages.join('');
            // Use setTimeout to push this to end of event loop, reducing input lag
            setTimeout(() => setContent(fullContent), 0);
            return updatedPages;
        }
        return currentPages;
    });
  }, [setContent]);

  const handlePageFocus = useCallback((index: number) => {
      setCurrentPage(index + 1);
  }, [setCurrentPage]);

  // Handle Scroll: Sync Page Number and Ruler
  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      
      // Update Page Number
      const scrollOffset = target.scrollTop;
      
      // Add slight offset (height/3) to trigger change when page is mostly visible
      const pageIndex = Math.floor((scrollOffset + (height / 3)) / itemSize);
      const newPage = Math.min(pages.length, Math.max(1, pageIndex + 1));
      
      // Update Context (Debounce this if it causes lag, though setCurrentPage is usually fast)
      setCurrentPage(newPage);
      
      // Update Ruler Horizontal Scroll
      if (rulerContainerRef.current) {
          rulerContainerRef.current.scrollLeft = target.scrollLeft;
      }
  }, [height, itemSize, pages.length, setCurrentPage]);

  // Attach native scroll listener to outerRef for smoother updates than react-window onScroll prop
  useEffect(() => {
      const el = outerRef.current;
      if (el) {
          containerRef(el); // Register with parent Editor
          
          const handleNativeScroll = (e: Event) => {
             // Cast to React.UIEvent-like object for the callback
             onScroll(e as unknown as React.UIEvent<HTMLDivElement>);
          };

          el.addEventListener('scroll', handleNativeScroll, { passive: true });
          return () => el.removeEventListener('scroll', handleNativeScroll);
      }
  }, [onScroll, containerRef]);

  // Data to pass to rows
  const itemData = useMemo(() => ({
      pages,
      pageConfig,
      zoom,
      showFormattingMarks,
      handlePageUpdate,
      handlePageFocus,
      pageWidth: pageDimensions.width
  }), [pages, pageConfig, zoom, showFormattingMarks, handlePageUpdate, handlePageFocus, pageDimensions.width]);

  return (
    <div className="w-full h-full flex flex-col relative bg-[#F8F9FA] dark:bg-slate-950">
       {/* Sticky Ruler Container */}
       {showRuler && (
         <div 
            ref={rulerContainerRef}
            className="w-full overflow-hidden bg-[#f1f5f9] border-b border-slate-200 z-20 shrink-0 flex justify-center"
            style={{ height: '25px' }}
            onMouseDown={(e) => e.preventDefault()}
         >
             <div style={{ transformOrigin: 'top left', display: 'inline-block' }}>
                <Ruler pageConfig={pageConfig} zoom={zoom} />
             </div>
         </div>
       )}

       {/* Virtualized Page Container */}
       <div className="flex-1 relative">
           <List
              ref={listRef}
              height={showRuler ? height - 25 : height}
              width={width}
              itemCount={pages.length}
              itemSize={itemSize}
              itemData={itemData}
              outerRef={outerRef}
              className="scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent"
              style={{ overflowX: 'auto', overflowY: 'auto' }}
           >
              {PageRow}
           </List>
       </div>
    </div>
  );
});
