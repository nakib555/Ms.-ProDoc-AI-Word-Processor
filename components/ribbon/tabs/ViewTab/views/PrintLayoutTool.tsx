
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FileText } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';
import { PageConfig } from '../../../../../types';
import { Ruler } from '../../../../Ruler';
import { EditorPage } from '../../../../EditorPage';
import { paginateContent } from '../../../../../utils/layoutEngine';
import { PAGE_SIZES } from '../../../../../constants';

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
  const { setTotalPages, setCurrentPage, pageMovement } = useEditor();
  const [pages, setPages] = useState<string[]>(() => paginateContent(content, pageConfig).pages);
  const rulerContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Pagination Effect
  // Low latency debounce (40ms) to feel "immediate" when content flows to new page
  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
        if (!isMounted) return;
        const result = paginateContent(content, pageConfig);
        setPages(result.pages);
        setTotalPages(result.pages.length);
    }, 40);

    return () => { 
        isMounted = false; 
        clearTimeout(timer);
    };
  }, [content, pageConfig, setTotalPages]);

  const handlePageUpdate = useCallback((newHtml: string, pageIndex: number) => {
    setPages(currentPages => {
        const updatedPages = [...currentPages];
        // Only update if content actually changed to avoid cycles
        if (updatedPages[pageIndex] !== newHtml) {
            updatedPages[pageIndex] = newHtml;
            const fullContent = updatedPages.join('');
            // Defer the setContent to next tick to allow rendering to complete
            setTimeout(() => setContent(fullContent), 0);
            return updatedPages;
        }
        return currentPages;
    });
  }, [setContent]);

  const handlePageFocus = useCallback((index: number) => {
      setCurrentPage(index + 1);
  }, [setCurrentPage]);

  // Unified scroll handler for both vertical and side-to-side modes
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
      const container = e.currentTarget;
      
      // Sync Ruler
      if (rulerContainerRef.current) {
          rulerContainerRef.current.scrollLeft = container.scrollLeft;
      }

      // Determine active page by finding closest page to viewport center
      const containerRect = container.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;
      const centerX = containerRect.left + containerRect.width / 2;

      const pageWrappers = Array.from(container.getElementsByClassName('prodoc-page-wrapper')) as HTMLElement[];
      
      let closestPage = 1;
      let minDistance = Infinity;

      for (const wrapper of pageWrappers) {
          const rect = wrapper.getBoundingClientRect();
          const wrapperCenterX = rect.left + rect.width / 2;
          const wrapperCenterY = rect.top + rect.height / 2;
          
          const dist = Math.hypot(wrapperCenterX - centerX, wrapperCenterY - centerY);
          
          if (dist < minDistance) {
              minDistance = dist;
              const pageIndex = Number(wrapper.getAttribute('data-page-index'));
              if (!isNaN(pageIndex)) closestPage = pageIndex + 1;
          }
      }
      
      setCurrentPage(closestPage);
  }, [setCurrentPage]);

  const setRefs = useCallback((node: HTMLDivElement | null) => {
      scrollContainerRef.current = node;
      containerRef(node);
  }, [containerRef]);

  // Click on background focuses last page or the nearest page's bottom
  const handleBackgroundClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
          // Default to last page if clicked in void
          const lastPageId = `prodoc-editor-${pages.length}`;
          const lastPage = document.getElementById(lastPageId);
          if (lastPage) {
              lastPage.focus();
              const range = document.createRange();
              range.selectNodeContents(lastPage);
              range.collapse(false); // End of document
              const sel = window.getSelection();
              sel?.removeAllRanges();
              sel?.addRange(range);
          }
      }
  };

  const isVertical = pageMovement === 'vertical';

  return (
    <div className="w-full h-full flex flex-col relative bg-[#E3E5E8] dark:bg-slate-900 transition-colors duration-300">
       {showRuler && (
         <div 
            ref={rulerContainerRef}
            className="w-full overflow-hidden bg-[#F0F0F0] border-b border-slate-300 z-20 shrink-0 flex justify-center sticky top-0 shadow-sm"
            style={{ height: '25px' }}
            onMouseDown={(e) => e.preventDefault()}
         >
             <div style={{ transformOrigin: 'top left', display: 'inline-block' }}>
                <Ruler pageConfig={pageConfig} zoom={zoom} />
             </div>
         </div>
       )}

       <div 
          ref={setRefs}
          className="flex-1 relative overflow-auto scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent"
          onScroll={handleScroll}
       >
           {/* Container for pages - standardized p-8 (2rem) vertical spacing for Word-like gap */}
           <div 
                className={`min-w-full min-h-full w-fit flex ${isVertical ? 'flex-col items-center justify-start py-8 gap-8' : 'flex-row flex-wrap justify-center content-start py-8 gap-8'}`}
                onClick={handleBackgroundClick}
           >
                {pages.map((pageContent, index) => (
                    <div 
                        key={index} 
                        className="prodoc-page-wrapper box-border shrink-0 transition-all duration-300 relative group"
                        data-page-index={index}
                    >
                        {/* Page Content */}
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
                        
                        {/* Visual Gap indicator on hover between pages (optional interaction area) */}
                        {index < pages.length - 1 && isVertical && (
                            <div className="absolute left-0 right-0 -bottom-8 h-8 opacity-0 group-hover:opacity-100 flex items-center justify-center pointer-events-none transition-opacity">
                                <div className="h-[1px] bg-slate-400 w-12"></div>
                            </div>
                        )}
                    </div>
                ))}
           </div>
       </div>
    </div>
  );
});