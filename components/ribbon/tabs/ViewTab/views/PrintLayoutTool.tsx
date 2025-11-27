
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
  const { setTotalPages, setCurrentPage } = useEditor();
  const [pages, setPages] = useState<string[]>(() => paginateContent(content, pageConfig).pages);
  const rulerContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Pagination Effect
  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
        if (!isMounted) return;
        const result = paginateContent(content, pageConfig);
        setPages(result.pages);
        setTotalPages(result.pages.length);
    }, 150);

    return () => { 
        isMounted = false; 
        clearTimeout(timer);
    };
  }, [content, pageConfig, setTotalPages]);

  const pageDimensions = useMemo(() => {
      let w, h;
      if (pageConfig.size === 'Custom' && pageConfig.customWidth && pageConfig.customHeight) {
          w = pageConfig.orientation === 'portrait' ? pageConfig.customWidth : pageConfig.customHeight;
          h = pageConfig.orientation === 'portrait' ? pageConfig.customHeight : pageConfig.customWidth;
      } else {
          const base = PAGE_SIZES[pageConfig.size as string] || PAGE_SIZES['Letter'];
          w = pageConfig.orientation === 'portrait' ? base.width : base.height;
          h = pageConfig.orientation === 'portrait' ? base.height : base.width;
      }
      return { width: w, height: h };
  }, [pageConfig]);

  const itemSize = useMemo(() => {
      const scale = zoom / 100;
      return (pageDimensions.height * scale) + 32; // + vertical padding
  }, [pageDimensions.height, zoom]);

  const handlePageUpdate = useCallback((newHtml: string, pageIndex: number) => {
    setPages(currentPages => {
        const updatedPages = [...currentPages];
        if (updatedPages[pageIndex] !== newHtml) {
            updatedPages[pageIndex] = newHtml;
            const fullContent = updatedPages.join('');
            setTimeout(() => setContent(fullContent), 0);
            return updatedPages;
        }
        return currentPages;
    });
  }, [setContent]);

  const handlePageFocus = useCallback((index: number) => {
      setCurrentPage(index + 1);
  }, [setCurrentPage]);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const scrollOffset = target.scrollTop;
      const pageIndex = Math.floor((scrollOffset + (height / 3)) / itemSize);
      const newPage = Math.min(pages.length, Math.max(1, pageIndex + 1));
      setCurrentPage(newPage);

      if (rulerContainerRef.current) {
          rulerContainerRef.current.scrollLeft = target.scrollLeft;
      }
  }, [height, itemSize, pages.length, setCurrentPage]);

  const setRefs = useCallback((node: HTMLDivElement | null) => {
      scrollContainerRef.current = node;
      containerRef(node);
  }, [containerRef]);

  return (
    <div className="w-full h-full flex flex-col relative bg-[#F8F9FA] dark:bg-slate-950">
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

       <div 
          ref={setRefs}
          className="flex-1 relative overflow-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent flex flex-col items-center"
          onScroll={onScroll}
       >
           {pages.map((pageContent, index) => (
                <div key={index} className="py-4 box-border">
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
           ))}
           <div className="h-16 shrink-0" />
       </div>
    </div>
  );
});
