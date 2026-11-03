
import React, { useState, useRef, useEffect, useCallback, useLayoutEffect, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FileText } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';
import { PageConfig } from '../../../../../types';
import { Ruler } from '../../../../Ruler';
import { EditorPage } from '../../../../EditorPage';
import { GhostPage } from '../../../../ui/GhostPage';
import { paginateContent } from '../../../../../utils/layoutEngine';
import { PAGE_SIZES } from '../../../../../constants';
import { getPhysicalDimensions } from '../../../../../utils/measurement';
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
    goToPage,
    pageJumpTarget,
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
  const { triggerGestureLock } = useGestureContext();
  
  const [pagesData, setPagesData] = useState<{ html: string, config: PageConfig }[]>(() => paginateContent(content, pageConfig).pages);
  const rulerContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  
  const cursorRestorationRef = useRef<number | null>(null);
  const isUserScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastReportedPageRef = useRef(currentPage);
  const lastProcessedJumpSeqRef = useRef<number>(0);

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
    onPinchStart: () => {
      if (zoomMode !== 'custom') {
        setZoomMode('custom');
      }
    },
    minZoom: 15,
    maxZoom: 500,
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
      const phys = getPhysicalDimensions(
        activePageConfig.size as string,
        activePageConfig.orientation,
        activePageConfig.customWidth,
        activePageConfig.customHeight
      );
      const pageWidth = phys.widthPx;
      const pageHeight = phys.heightPx;

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
      lastReportedPageRef.current = index + 1;
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

  const GAP = 32;

  // Prefix sums for vertical top positions (used for measurement and ruler compatibility)
  const { pageTops, totalVirtualHeight } = useMemo(() => {
    const tops: number[] = [];
    let currentY = 32;
    for (let i = 0; i < pageGeometries.length; i++) {
      tops.push(currentY);
      currentY += pageGeometries[i].scaledHeight + GAP;
    }
    const total = currentY + 64;
    return { pageTops: tops, totalVirtualHeight: total };
  }, [pageGeometries]);

  const maxPageWidth = useMemo(() => {
      let max = 0;
      pageGeometries.forEach(g => {
        if (g.scaledWidth > max) max = g.scaledWidth;
      });
      return Math.max(width, max + 64);
  }, [pageGeometries, width]);

  // Multi-column side-by-side calculation
  const isSideToSide = pageMovement === 'sideToSide';
  const basePageWidth = pageGeometries[0]?.scaledWidth || 800;
  const maxPossibleColumns = Math.max(1, Math.floor((width - 48) / (basePageWidth + GAP)));
  const columnCount = isSideToSide 
    ? Math.max(1, Math.min(4, maxPossibleColumns))
    : (actualZoom <= 75 && maxPossibleColumns >= 2 ? Math.min(3, maxPossibleColumns) : 1);

  const totalPagesCount = pagesData.length;
  const rowCount = Math.max(1, Math.ceil(totalPagesCount / columnCount));

  // Compute maximum height for each virtual row
  const rowHeights = useMemo(() => {
    const heights: number[] = [];
    for (let r = 0; r < rowCount; r++) {
      let maxH = 0;
      for (let c = 0; c < columnCount; c++) {
        const pIdx = r * columnCount + c;
        if (pIdx < pageGeometries.length) {
          maxH = Math.max(maxH, pageGeometries[pIdx]?.scaledHeight || 1056);
        }
      }
      heights.push(maxH || 1056);
    }
    return heights;
  }, [rowCount, columnCount, pageGeometries]);

  // Headless TanStack Virtualizer
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: (index) => rowHeights[index] || 1056,
    gap: GAP,
    overscan: 2,
  });

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const newScrollTop = container.scrollTop;

    // Mark active user scrolling with auto-reset timer
    isUserScrollingRef.current = true;
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
    }
    scrollEndTimerRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 250);

    // Auto-lock editing during scroll with 400ms auto-unlock to prevent mobile keyboard popups & layout misalignment
    triggerGestureLock(400);

    if (rulerContainerRef.current) {
        rulerContainerRef.current.scrollLeft = container.scrollLeft;
    }

    if (scrollAnimFrameRef.current !== null) {
      cancelAnimationFrame(scrollAnimFrameRef.current);
    }

    scrollAnimFrameRef.current = requestAnimationFrame(() => {
      setScrollTop(newScrollTop);

      // Fast binary search page indicator tracking based on scroll position
      const centerY = newScrollTop + (container.clientHeight / 2);
      const closestPage = findClosestPageIndex(pageTops, pageGeometries, centerY);

      if (closestPage !== currentPage && closestPage <= totalPagesCount) {
        lastReportedPageRef.current = closestPage;
        setCurrentPage(closestPage);
      }
    });
  }, [currentPage, setCurrentPage, pageTops, pageGeometries, totalPagesCount, triggerGestureLock]);

  const setRefs = useCallback((node: HTMLDivElement | null) => {
      scrollContainerRef.current = node;
      containerRef(node);
  }, [containerRef]);

  // Handle explicit page jump requests from goToPage (e.g., status bar, bookmarks, navigation)
  // MS Word behavior:
  // - When user scrolls naturally with wheel/touchpad: DO NOT scroll or snap to page! Let scrolling flow naturally.
  // - When user explicitly jumps to a page: Smoothly glide/scroll to the target page with comfortable top margin.
  useEffect(() => {
    if (!pageJumpTarget || pageJumpTarget.seq === lastProcessedJumpSeqRef.current) return;
    lastProcessedJumpSeqRef.current = pageJumpTarget.seq;

    const targetIndex = pageJumpTarget.page - 1;
    if (targetIndex >= 0 && targetIndex < totalPagesCount && scrollContainerRef.current) {
      lastReportedPageRef.current = pageJumpTarget.page;
      const container = scrollContainerRef.current;
      const behavior = pageJumpTarget.behavior || 'smooth';

      if (columnCount === 1) {
        // Continuous vertical layout: smoothly glide to page top with 16px padding
        const targetTop = Math.max(0, (pageTops[targetIndex] ?? 0) - 16);
        container.scrollTo({
          top: targetTop,
          behavior
        });
      } else {
        // Multi-column side-to-side view: use virtualizer row scroll with smooth behavior
        const targetRow = Math.floor(targetIndex / columnCount);
        if (targetRow >= 0 && targetRow < rowCount) {
          rowVirtualizer.scrollToIndex(targetRow, { align: 'start', behavior });
        }
      }
    }
  }, [pageJumpTarget, columnCount, rowCount, totalPagesCount, pageTops, rowVirtualizer]);

  // Fallback for external direct setCurrentPage calls (e.g. tests or legacy hooks)
  useEffect(() => {
    // If the currentPage change was caused by natural user scrolling or clicking inside a page,
    // DO NOT reposition or snap the scroll container!
    if (isUserScrollingRef.current || currentPage === lastReportedPageRef.current) {
      return;
    }

    lastReportedPageRef.current = currentPage;
    const targetIndex = currentPage - 1;

    if (targetIndex >= 0 && targetIndex < totalPagesCount && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      if (columnCount === 1) {
        const targetTop = Math.max(0, (pageTops[targetIndex] ?? 0) - 16);
        container.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      } else {
        const targetRow = Math.floor(targetIndex / columnCount);
        if (targetRow >= 0 && targetRow < rowCount) {
          rowVirtualizer.scrollToIndex(targetRow, { align: 'start', behavior: 'smooth' });
        }
      }
    }
  }, [currentPage, columnCount, rowCount, totalPagesCount, pageTops, rowVirtualizer]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      if (scrollAnimFrameRef.current) cancelAnimationFrame(scrollAnimFrameRef.current);
    };
  }, []);

  // Active focused page index (0-based)
  const activePageIndex = currentPage - 1;
  const activeRowIndex = Math.floor(activePageIndex / columnCount);

  // Virtual items from TanStack Virtual
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalContainerHeight = rowVirtualizer.getTotalSize();

  return (
    <div 
      className="print-layout-mode w-full h-full flex flex-col relative bg-[#eef2f6] dark:bg-[#0b1120] transition-colors duration-300"
    >
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
       >
           <div 
                ref={contentWrapperRef}
                className="min-w-full min-h-full w-fit relative transform-gpu will-change-transform"
                style={{ 
                  height: `${Math.max(totalContainerHeight + 64, totalVirtualHeight)}px`,
                  minWidth: columnCount > 1 ? `${(basePageWidth + GAP) * columnCount + 64}px` : '100%'
                }}
                onClick={(e) => {
                    if (e.target === e.currentTarget && activeEditingArea !== 'body') {
                        setActiveEditingArea('body');
                    }
                }}
           >
                {/* TanStack Virtual Rows */}
                {virtualRows.map((virtualRow) => {
                  const rowIndex = virtualRow.index;
                  const rowStartPage = rowIndex * columnCount;
                  const isNearActiveRow = Math.abs(rowIndex - activeRowIndex) <= 1;

                  // Collect pages belonging to this row
                  const rowPageIndices: number[] = [];
                  for (let c = 0; c < columnCount; c++) {
                    const pIdx = rowStartPage + c;
                    if (pIdx < totalPagesCount) {
                      rowPageIndices.push(pIdx);
                    }
                  }

                  return (
                    <div
                      key={virtualRow.key}
                      data-index={virtualRow.index}
                      ref={rowVirtualizer.measureElement}
                      className="absolute top-0 left-0 w-full flex justify-center items-start gap-8 box-border"
                      style={{
                        transform: `translateY(${virtualRow.start + 32}px)`,
                      }}
                    >
                      {rowPageIndices.map((pIdx) => {
                        const pageData = pagesData[pIdx];
                        const geo = pageGeometries[pIdx];
                        const scaledHeight = geo ? geo.scaledHeight : 1000;
                        const isFocusedPage = pIdx === activePageIndex;

                        // Hybrid dispatch: active or near viewport renders live EditorPage, buffer renders GhostPage
                        const shouldRenderLive = isNearActiveRow || isFocusedPage;

                        if (!shouldRenderLive || !pageData) {
                          return (
                            <div
                              key={`ghost-${pIdx}`}
                              className="prodoc-page-wrapper box-border shrink-0 relative transition-opacity duration-300"
                              data-page-index={pIdx}
                              data-is-ghost="true"
                              style={{ height: `${scaledHeight}px` }}
                            >
                              <GhostPage
                                pageNumber={pIdx + 1}
                                totalPages={totalPagesCount || 1}
                                config={pageData?.config || pageConfig}
                                zoom={actualZoom}
                                headerText={headerContent}
                                footerText={footerContent}
                              />
                            </div>
                          );
                        }

                        return (
                          <div 
                            key={pIdx} 
                            className="prodoc-page-wrapper box-border shrink-0 relative group"
                            data-page-index={pIdx}
                            style={{ 
                              height: `${scaledHeight}px`
                            }}
                          >
                            <EditorPage
                              pageNumber={pIdx + 1}
                              totalPages={totalPagesCount}
                              content={pageData.html}
                              config={pageData.config}
                              zoom={actualZoom}
                              showFormattingMarks={showFormattingMarks}
                              onContentChange={handlePageUpdate}
                              onFocus={(e) => handlePageFocus(pIdx, e)}
                              isActivePage={currentPage === pIdx + 1}
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
                    </div>
                  );
                })}
           </div>
       </div>
    </div>
  );
});

export default PrintLayoutView;
