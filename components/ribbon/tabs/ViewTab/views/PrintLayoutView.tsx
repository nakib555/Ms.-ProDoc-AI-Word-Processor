
import React, { useState, useRef, useEffect, useCallback, useLayoutEffect, useMemo } from 'react';
import { FileText } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';
import { PageConfig } from '../../../../../types';
import { Ruler } from '../../../../Ruler';
import { EditorPage } from '../../../../EditorPage';
import { paginateContent } from '../../../../../utils/layoutEngine';
import { PAGE_SIZES } from '../../../../../constants';
import { useTouchZoom } from '../../../../../hooks/useTouchZoom';
import { useGestureContext } from '../../../../../contexts/GestureContext';

export const PrintLayoutTool: React.FC = () => {
  const { viewMode, setViewMode } = useEditor();
  return (
    <RibbonButton 
        icon={FileText} 
        label="Print Layout" 
        onClick={() => setViewMode('print')} 
        className={viewMode === 'print' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200' : ''}
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

const BLOCK_TAGS = ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'TR', 'BLOCKQUOTE', 'UL', 'OL', 'TABLE'];

const isBlock = (el: HTMLElement) => {
    return BLOCK_TAGS.includes(el.tagName);
};

const getNodeTextLength = (node: Node): number => {
    if (node.nodeType === Node.TEXT_NODE) {
        return (node.nodeValue || "").length;
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName === 'MATH-FIELD' || el.classList.contains('prodoc-page-break') || el.classList.contains('prodoc-section-break')) {
            return 1;
        }
        if (el.tagName === 'BR') {
            return 1;
        }
        
        let len = 0;
        const childNodes = node.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            len += getNodeTextLength(childNodes[i]);
        }
        
        if (isBlock(el)) len += 1;
        
        return len;
    }
    
    return 0;
};

const getGlobalCursorPosition = (): number | null => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return null;
    const range = sel.getRangeAt(0);
    
    let pageElement: HTMLElement | null = null;
    let pageIndex = -1;
    let curr: Node | null = range.startContainer;

    while(curr) {
        if (curr.nodeType === Node.ELEMENT_NODE) {
            const el = curr as HTMLElement;
            if (el.id && el.id.startsWith('prodoc-editor-')) {
                pageElement = el;
                pageIndex = parseInt(el.id.replace('prodoc-editor-', ''), 10);
                break;
            }
        }
        curr = curr.parentNode;
    }

    if (!pageElement || pageIndex === -1) return null;

    let globalOffset = 0;

    for (let i = 1; i < pageIndex; i++) {
        const pEl = document.getElementById(`prodoc-editor-${i}`);
        if (pEl) {
            globalOffset += getNodeTextLength(pEl);
        }
    }

    globalOffset += getOffsetInNode(pageElement, range.startContainer, range.startOffset);

    return globalOffset;
};

const getOffsetInNode = (root: Node, target: Node, targetOffset: number): number => {
    let offset = 0;
    let found = false;

    const walk = (node: Node) => {
        if (found) return;

        if (node === target) {
            if (node.nodeType === Node.TEXT_NODE) {
                offset += targetOffset;
            } else {
                for(let i=0; i<targetOffset; i++) {
                    offset += getNodeTextLength(node.childNodes[i]);
                }
            }
            found = true;
            return;
        }

        if (node.nodeType === Node.TEXT_NODE) {
            offset += (node.nodeValue || "").length;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
             const el = node as HTMLElement;
             if (el.tagName === 'MATH-FIELD' || el.classList.contains('prodoc-page-break') || el.tagName === 'BR' || el.classList.contains('prodoc-section-break')) {
                 offset += 1;
             } else {
                 for (let i = 0; i < node.childNodes.length; i++) {
                    walk(node.childNodes[i]);
                    if (found) return;
                 }
                 if (isBlock(el)) offset += 1;
             }
        }
    };

    if (root === target) {
         for(let i=0; i<targetOffset; i++) {
            offset += getNodeTextLength(root.childNodes[i]);
         }
         return offset;
    }

    for (let i = 0; i < root.childNodes.length; i++) {
        walk(root.childNodes[i]);
        if (found) break;
    }
    
    return offset;
};

const restoreGlobalCursor = (globalOffset: number) => {
    const pages = document.querySelectorAll('[id^="prodoc-editor-"]');
    const totalPages = pages.length;
    
    let currentTotal = 0;
    
    for (let i = 1; i <= totalPages; i++) {
        const el = document.getElementById(`prodoc-editor-${i}`);
        if (!el) continue;
        
        const pageLen = getNodeTextLength(el);
        const contentLen = isBlock(el) ? pageLen - 1 : pageLen;
        
        if (globalOffset < currentTotal + contentLen) {
            const localOffset = Math.max(0, globalOffset - currentTotal);
            setCursorInNode(el, localOffset);
            return;
        }
        
        if (globalOffset === currentTotal + contentLen) {
             if (i === totalPages) {
                 setCursorInNode(el, contentLen);
                 return;
             }
             globalOffset += 1;
        }
        
        currentTotal += pageLen;
    }
    
    if (totalPages > 0) {
        const lastPage = document.getElementById(`prodoc-editor-${totalPages}`);
        if (lastPage) {
             const lastLen = getNodeTextLength(lastPage);
             const contentLen = isBlock(lastPage) ? lastLen - 1 : lastLen;
             setCursorInNode(lastPage, contentLen); 
        }
    }
};

const setCursorInNode = (root: HTMLElement, offset: number) => {
    let currentCount = 0;
    let found = false;
    const range = document.createRange();

    const walk = (node: Node) => {
        if (found) return;

        if (node.nodeType === Node.TEXT_NODE) {
            const len = (node.nodeValue || "").length;
            if (currentCount + len >= offset) {
                const localOffset = offset - currentCount;
                const safeOffset = Math.max(0, Math.min(len, localOffset));
                range.setStart(node, safeOffset);
                range.collapse(true);
                found = true;
                return;
            }
            currentCount += len;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (el.tagName === 'MATH-FIELD' || el.classList.contains('prodoc-page-break') || el.tagName === 'BR' || el.classList.contains('prodoc-section-break')) {
                if (currentCount + 1 >= offset) {
                    range.setStartAfter(node);
                    range.collapse(true);
                    found = true;
                    return;
                }
                currentCount += 1;
            } else {
                for (let i = 0; i < node.childNodes.length; i++) {
                    walk(node.childNodes[i]);
                    if (found) return;
                }
                
                if (isBlock(el)) {
                    currentCount += 1;
                }
            }
        }
    };

    if (offset === 0) {
        range.setStart(root, 0);
        range.collapse(true);
        found = true;
    } else {
        walk(root);
    }

    if (found) {
        root.focus(); 
        const sel = window.getSelection();
        if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
            
            const rect = range.getBoundingClientRect();
            if (rect.top === 0 && rect.height === 0) {
                 const el = range.startContainer.nodeType === Node.TEXT_NODE 
                    ? range.startContainer.parentElement 
                    : range.startContainer as HTMLElement;
                 el?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
            } else if (rect.top < 50 || rect.bottom > window.innerHeight - 50) {
                 const el = range.startContainer.nodeType === Node.TEXT_NODE 
                    ? range.startContainer.parentElement 
                    : range.startContainer as HTMLElement;
                 el?.scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        }
    } else {
        const range = document.createRange();
        range.selectNodeContents(root);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
    }
};

// O(log N) binary search for the first visible page index
const findFirstVisiblePageIndex = (tops: number[], geometries: { scaledHeight: number }[], targetY: number): number => {
  if (tops.length === 0) return 0;
  let low = 0;
  let high = tops.length - 1;
  let ans = 0;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const bottom = tops[mid] + (geometries[mid]?.scaledHeight || 1000);
    if (bottom >= targetY) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
};

// O(log N) binary search for the last visible page index
const findLastVisiblePageIndex = (tops: number[], targetY: number): number => {
  if (tops.length === 0) return 0;
  let low = 0;
  let high = tops.length - 1;
  let ans = tops.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (tops[mid] <= targetY) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return ans;
};

// O(log N) binary search for page whose center is closest to centerY
const findClosestPageIndex = (tops: number[], geometries: { scaledHeight: number }[], centerY: number): number => {
  if (tops.length === 0) return 1;
  let low = 0;
  let high = tops.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const center = tops[mid] + (geometries[mid]?.scaledHeight || 1000) / 2;
    if (center < centerY) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  const i1 = Math.max(0, Math.min(tops.length - 1, high));
  const i2 = Math.max(0, Math.min(tops.length - 1, low));
  const dist1 = Math.abs(tops[i1] + (geometries[i1]?.scaledHeight || 1000) / 2 - centerY);
  const dist2 = Math.abs(tops[i2] + (geometries[i2]?.scaledHeight || 1000) / 2 - centerY);
  return (dist1 <= dist2 ? i1 : i2) + 1;
};

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
  const { 
    setTotalPages, 
    setCurrentPage, 
    currentPage,
    pageMovement,
    activeEditingArea,
    setActiveEditingArea,
    headerContent,
    setHeaderContent,
    footerContent,
    setFooterContent,
    editorRef,
    setZoom,
    zoomMode,
    setZoomMode,
    isTableResizing
  } = useEditor();
  const { triggerScrollHud } = useGestureContext();
  
  const [pagesData, setPagesData] = useState<{ html: string, config: PageConfig }[]>(() => paginateContent(content, pageConfig).pages);
  const rulerContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  
  const cursorRestorationRef = useRef<number | null>(null);

  // High-performance focal-centered pinch to zoom & double-tap to toggle fit
  useTouchZoom({
    containerRef: scrollContainerRef,
    contentRef: contentWrapperRef,
    zoom,
    setZoom: (newZoomOrUpdater) => {
      if (zoomMode !== 'custom') {
        setZoomMode('custom');
      }
      setZoom(newZoomOrUpdater);
    },
    minZoom: 15,
    maxZoom: 500,
    onDoubleTap: () => {
      if (zoomMode === 'fit-width') {
        setZoomMode('custom');
        setZoom(100);
      } else {
        setZoomMode('fit-width');
      }
    },
  });

  const lastAppliedFitZoomRef = useRef<number | null>(null);

  // Dynamic Zoom Logic
  useEffect(() => {
      if (width <= 0 || height <= 0) return;
      if (zoomMode !== 'fit-page' && zoomMode !== 'fit-width') {
          lastAppliedFitZoomRef.current = null;
          return;
      }

      const activePageConfig = pagesData[currentPage - 1]?.config || pageConfig;
      let pageWidth = 0;
      let pageHeight = 0;

      if (activePageConfig.size === 'Custom' && activePageConfig.customWidth && activePageConfig.customHeight) {
          pageWidth = activePageConfig.customWidth * 96;
          pageHeight = activePageConfig.customHeight * 96;
      } else {
          const base = PAGE_SIZES[activePageConfig.size as string] || PAGE_SIZES['Letter'];
          if (activePageConfig.orientation === 'portrait') {
              pageWidth = base.width;
              pageHeight = base.height;
          } else {
              pageWidth = base.height;
              pageHeight = base.width;
          }
      }

      const padding = 64; // 32px padding on each side
      const availableWidth = Math.max(100, width - padding);
      const availableHeight = Math.max(100, height - padding);

      const zoomW = (availableWidth / pageWidth) * 100;
      const zoomH = (availableHeight / pageHeight) * 100;
      const fitPageZoom = Math.round(Math.min(zoomW, zoomH));
      const fitWidthZoom = Math.round(zoomW);

      const targetZoom = zoomMode === 'fit-page' ? fitPageZoom : fitWidthZoom;

      if (Math.abs(zoom - targetZoom) >= 1 && lastAppliedFitZoomRef.current !== targetZoom) {
          lastAppliedFitZoomRef.current = targetZoom;
          setZoom(targetZoom);
      }
  }, [width, height, pageConfig, currentPage, pagesData, zoomMode, zoom, setZoom]);

  // Actual scale used for rendering
  const actualZoom = zoom;

  useEffect(() => {
    if (isTableResizing) return;
    let isMounted = true;
    
    const delay = 200;
    
    const timer = setTimeout(() => {
        if (!isMounted) return;
        
        const currentCursor = getGlobalCursorPosition();
        
        // Use requestAnimationFrame to avoid blocking the main thread immediately
        requestAnimationFrame(() => {
             const result = paginateContent(content, pageConfig);
             
             setPagesData(result.pages);
             setTotalPages(result.pages.length);
             
             if (currentCursor !== null) {
                 cursorRestorationRef.current = currentCursor;
             }
        });
        
    }, delay);

    return () => { 
        isMounted = false; 
        clearTimeout(timer);
    };
  }, [content, pageConfig, setTotalPages, isTableResizing]);

  useLayoutEffect(() => {
      if (cursorRestorationRef.current !== null) {
          restoreGlobalCursor(cursorRestorationRef.current);
          cursorRestorationRef.current = null;
      }
  }, [pagesData]);

  useEffect(() => {
      const activePageEl = document.getElementById(`prodoc-editor-${currentPage}`);
      if (activePageEl && editorRef) {
           
          editorRef.current = activePageEl as HTMLDivElement;
      }
  }, [currentPage, editorRef, pagesData]);

  const [scrollTop, setScrollTop] = useState(0);
  const scrollAnimFrameRef = useRef<number | null>(null);
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePageUpdate = useCallback((newHtml: string, pageIndex: number) => {
    setPagesData(currentPages => {
        const updatedPages = [...currentPages];
        if (updatedPages[pageIndex] && updatedPages[pageIndex].html !== newHtml) {
            updatedPages[pageIndex] = { ...updatedPages[pageIndex], html: newHtml };
            if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
            syncTimeoutRef.current = setTimeout(() => {
                const fullContent = updatedPages.map(p => p.html).join('');
                setContent(fullContent);
            }, 600);
            return updatedPages;
        }
        return currentPages;
    });
  }, [setContent]);

  const handlePageFocus = useCallback((index: number, e: React.FocusEvent<HTMLDivElement>) => {
      setCurrentPage(index + 1);
      if (editorRef) {
          editorRef.current = e.currentTarget;
      }
  }, [setCurrentPage, editorRef]);

  const isVertical = pageMovement === 'vertical';
  const activePageConfig = pagesData[currentPage - 1]?.config || pageConfig;

  // Geometry calculation for all pages
  const pageGeometries = useMemo(() => {
    const scale = actualZoom / 100;
    return pagesData.map(p => {
      const cfg = p.config;
      let w = 0;
      let h = 0;
      if (cfg.size === 'Custom' && cfg.customWidth && cfg.customHeight) {
        w = cfg.customWidth * 96;
        h = cfg.customHeight * 96;
      } else {
        const base = PAGE_SIZES[cfg.size as string] || PAGE_SIZES['Letter'];
        w = cfg.orientation === 'portrait' ? base.width : base.height;
        h = cfg.orientation === 'portrait' ? base.height : base.width;
      }
      return {
        scaledWidth: Math.round(w * scale),
        scaledHeight: Math.round(h * scale)
      };
    });
  }, [pagesData, actualZoom]);

  // Prefix sums for vertical top positions
  const { pageTops, totalVirtualHeight } = useMemo(() => {
    const tops: number[] = [];
    const gap = 32; // gap-8
    let currentY = 32; // pt-8
    for (let i = 0; i < pageGeometries.length; i++) {
      tops.push(currentY);
      currentY += pageGeometries[i].scaledHeight + gap;
    }
    const total = currentY + 64; // pb-24/pb-8
    return { pageTops: tops, totalVirtualHeight: total };
  }, [pageGeometries]);

  const maxPageWidth = useMemo(() => {
      let max = 0;
      pageGeometries.forEach(g => {
        if (g.scaledWidth > max) max = g.scaledWidth;
      });
      return Math.max(width, max + 64);
  }, [pageGeometries, width]);

  // Compute Virtual Window
  const VIRTUAL_BUFFER = 2; // Render 2 pages above and 2 pages below viewport
  const viewportHeight = height > 0 ? height : 900;
  
  const { startIndex, endIndex, topSpacerHeight, bottomSpacerHeight } = useMemo(() => {
    const totalCount = pagesData.length;
    if (totalCount <= 5) {
      return {
        startIndex: 0,
        endIndex: totalCount - 1,
        topSpacerHeight: 0,
        bottomSpacerHeight: 0
      };
    }

    const viewTop = scrollTop;
    const viewBottom = scrollTop + viewportHeight;

    // Fast O(log N) binary search for visible window boundaries
    const firstVis = findFirstVisiblePageIndex(pageTops, pageGeometries, viewTop);
    const lastVis = Math.max(firstVis, findLastVisiblePageIndex(pageTops, viewBottom));

    let start = Math.max(0, firstVis - VIRTUAL_BUFFER);
    let end = Math.min(totalCount - 1, lastVis + VIRTUAL_BUFFER);

    // Keep active page mounted if user has focus
    const activeIdx = currentPage - 1;
    if (activeIdx >= 0 && activeIdx < totalCount) {
      if (activeIdx < start) start = activeIdx;
      if (activeIdx > end) end = activeIdx;
    }

    const topSpacer = start > 0 ? (pageTops[start] - pageTops[0]) : 0;
    const bottomSpacer = end < totalCount - 1 
      ? (pageTops[totalCount - 1] + pageGeometries[totalCount - 1].scaledHeight) - (pageTops[end] + pageGeometries[end].scaledHeight)
      : 0;

    return {
      startIndex: start,
      endIndex: end,
      topSpacerHeight: Math.max(0, topSpacer),
      bottomSpacerHeight: Math.max(0, bottomSpacer)
    };
  }, [pagesData.length, scrollTop, viewportHeight, pageTops, pageGeometries, currentPage]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const newScrollTop = container.scrollTop;

    // Trigger HUD auto-hide after 600ms of scroll/gesture inactivity
    triggerScrollHud();

    if (rulerContainerRef.current) {
        rulerContainerRef.current.scrollLeft = container.scrollLeft;
    }

    if (scrollAnimFrameRef.current !== null) {
      cancelAnimationFrame(scrollAnimFrameRef.current);
    }

    scrollAnimFrameRef.current = requestAnimationFrame(() => {
      setScrollTop(newScrollTop);

      // Fast O(log N) binary search page indicator tracking based on scroll position
      const centerY = newScrollTop + (container.clientHeight / 2);
      const closestPage = findClosestPageIndex(pageTops, pageGeometries, centerY);

      if (closestPage !== currentPage) {
        setCurrentPage(closestPage);
      }
    });
  }, [currentPage, setCurrentPage, pageTops, pageGeometries, triggerScrollHud]);

  const setRefs = useCallback((node: HTMLDivElement | null) => {
      scrollContainerRef.current = node;
      containerRef(node);
  }, [containerRef]);

  // Jump-to-page support when currentPage changed from external UI
  useEffect(() => {
    const targetIdx = currentPage - 1;
    if (targetIdx >= 0 && targetIdx < pageTops.length && scrollContainerRef.current) {
      const targetTop = pageTops[targetIdx];
      const currentScroll = scrollContainerRef.current.scrollTop;
      const viewH = scrollContainerRef.current.clientHeight;
      // Only scroll if active page is not currently in viewport
      if (currentScroll > targetTop + pageGeometries[targetIdx].scaledHeight || currentScroll + viewH < targetTop) {
        scrollContainerRef.current.scrollTo({
          top: targetTop - 32,
          behavior: 'auto'
        });
      }
    }
  }, [currentPage, pageTops, pageGeometries]);

  // Slice visible pages
  const visiblePages = useMemo(() => {
    const pages: { pageData: { html: string; config: PageConfig }; index: number }[] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      if (pagesData[i]) {
        pages.push({ pageData: pagesData[i], index: i });
      }
    }
    return pages;
  }, [pagesData, startIndex, endIndex]);

  return (
    <div 
      className="print-layout-mode w-full h-full flex flex-col relative bg-[#eef2f6] dark:bg-[#0b1120] transition-colors duration-300"
    >
       {/* Global zoom HUD is managed authority-wide in GestureProvider */}

       {showRuler && width >= 768 && (
         <div 
            ref={rulerContainerRef}
            className="w-full overflow-hidden bg-[#f8fafc] dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700 z-20 shrink-0 sticky top-0 shadow-sm no-print hidden md:block"
            style={{ height: '25px' }}
            onMouseDown={(e) => e.preventDefault()}
         >
             <div style={{ width: maxPageWidth, minWidth: '100%', display: 'flex', justifyContent: 'center' }}>
                 <div style={{ transformOrigin: 'top left', display: 'inline-block' }}>
                    <Ruler pageConfig={activePageConfig} zoom={actualZoom} />
                 </div>
             </div>
         </div>
       )}

       <div 
          ref={setRefs}
          className="flex-1 relative overflow-auto scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent touch-pan-x touch-pan-y"
          onScroll={handleScroll}
          onDoubleClick={() => setActiveEditingArea('body')}
          style={{ scrollBehavior: 'auto' }} 
       >
           <div 
                ref={contentWrapperRef}
                className={`min-w-full min-h-full w-fit flex ${isVertical ? 'flex-col items-center' : 'flex-row flex-wrap justify-center content-start'} pt-8 pb-24 md:pb-8 gap-8 transform-gpu will-change-transform`}
                style={{ minHeight: isVertical ? `${totalVirtualHeight}px` : '100%' }}
                onClick={(e) => {
                    if (e.target === e.currentTarget && activeEditingArea !== 'body') {
                        setActiveEditingArea('body');
                    }
                }}
           >
                {/* Top Virtual Spacer */}
                {topSpacerHeight > 0 && (
                  <div 
                    className="prodoc-virtual-spacer-top pointer-events-none select-none w-full"
                    style={{ height: `${topSpacerHeight}px`, flexShrink: 0 }}
                    aria-hidden="true"
                  />
                )}

                {/* Visible Virtual Page Windows */}
                {visiblePages.map(({ pageData, index }) => {
                    const geo = pageGeometries[index];
                    const scaledHeight = geo ? geo.scaledHeight : 1000;

                    return (
                        <div 
                            key={index} 
                            className="prodoc-page-wrapper box-border shrink-0 relative group"
                            data-page-index={index}
                            style={{ 
                                height: `${scaledHeight}px`
                            }}
                        >
                            <EditorPage
                                pageNumber={index + 1}
                                totalPages={pagesData.length}
                                content={pageData.html}
                                config={pageData.config}
                                zoom={actualZoom}
                                showFormattingMarks={showFormattingMarks}
                                onContentChange={handlePageUpdate}
                                onFocus={(e) => handlePageFocus(index, e)}
                                isActivePage={currentPage === index + 1}
                                activeEditingArea={activeEditingArea}
                                setActiveEditingArea={setActiveEditingArea}
                                headerContent={headerContent}
                                setHeaderContent={setHeaderContent}
                                footerContent={footerContent}
                                setFooterContent={setFooterContent}
                            />
                        </div>
                    );
                })}

                {/* Bottom Virtual Spacer */}
                {bottomSpacerHeight > 0 && (
                  <div 
                    className="prodoc-virtual-spacer-bottom pointer-events-none select-none w-full"
                    style={{ height: `${bottomSpacerHeight}px`, flexShrink: 0 }}
                    aria-hidden="true"
                  />
                )}
           </div>
       </div>
    </div>
  );
});

