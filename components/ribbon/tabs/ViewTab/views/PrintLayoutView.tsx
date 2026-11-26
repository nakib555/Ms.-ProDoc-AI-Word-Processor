
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
import { getPhysicalDimensions } from '../../../../../utils/measurement';
import { HistoryCommitMode } from '../../../../../utils/historyManager';
import { useTouchZoom } from '../../../../../hooks/useTouchZoom';
import { useGestureContext } from '../../../../../contexts/GestureContext';
import { isAnyModalOpen } from '../../../../../utils/modalScroll';

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
  setContent: (content: string, emitUpdate?: boolean, options?: { historyMode?: HistoryCommitMode }) => void;
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

interface TableCellCursorAnchor {
    logicalTableIndex: number;
    logicalRowIndex: number;
    cellIndex: number;
    textOffsetInCell: number;
}

interface CursorSnapshot {
    globalOffset: number;
    tableAnchor: TableCellCursorAnchor | null;
}

let scratchTableContainer: HTMLDivElement | null = null;
const getPageElementFromSource = (pageNum: number, pagesHtml?: { html: string }[]): HTMLElement | null => {
    const domEl = document.getElementById(`prodoc-editor-${pageNum}`);
    if (domEl) return domEl;
    const pageHtml = pagesHtml?.[pageNum - 1]?.html;
    if (!pageHtml || typeof document === 'undefined') return null;
    if (!scratchTableContainer) {
        scratchTableContainer = document.createElement('div');
    }
    scratchTableContainer.innerHTML = pageHtml;
    return scratchTableContainer;
};

const getPageTablesFromSource = (pageNum: number, pagesHtml?: { html: string }[]): HTMLTableElement[] => {
    const el = getPageElementFromSource(pageNum, pagesHtml);
    if (!el) return [];
    return Array.from(el.querySelectorAll('table')) as HTMLTableElement[];
};

const getNodeTextLength = (node: Node): number => {
    if (node.nodeType === Node.TEXT_NODE) {
        return (node.nodeValue || "").length;
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName === 'TR' && el.getAttribute('data-repeated-header-row') === 'true') {
            return 0;
        }
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
             if (el.tagName === 'TR' && el.getAttribute('data-repeated-header-row') === 'true') {
                 return;
             }
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

const getCursorSnapshot = (pagesHtml: { html: string }[]): CursorSnapshot | null => {
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
        const pEl = getPageElementFromSource(i, pagesHtml);
        if (pEl) {
            globalOffset += getNodeTextLength(pEl);
        }
    }
    globalOffset += getOffsetInNode(pageElement, range.startContainer, range.startOffset);

    let tableAnchor: TableCellCursorAnchor | null = null;
    const startEl = range.startContainer.nodeType === Node.ELEMENT_NODE
        ? (range.startContainer as HTMLElement)
        : range.startContainer.parentElement;
    const cell = startEl?.closest('td, th') as HTMLTableCellElement | null;
    const row = cell?.closest('tr') as HTMLTableRowElement | null;
    const table = row?.closest('table') as HTMLTableElement | null;

    if (cell && row && table && pageElement.contains(table)) {
        let logicalTableIdx = -1;
        let currentLogicalRowCount = 0;
        let foundTarget = false;

        for (let p = 1; p <= pageIndex && !foundTarget; p++) {
            const tables = getPageTablesFromSource(p, pagesHtml);
            for (const tbl of tables) {
                const isContinuation = tbl.getAttribute('data-continuation') === 'true';
                if (!isContinuation || logicalTableIdx === -1) {
                    logicalTableIdx++;
                    currentLogicalRowCount = 0;
                }
                const validRows = Array.from(tbl.rows).filter(
                    (r) => r.getAttribute('data-repeated-header-row') !== 'true'
                );
                if (p === pageIndex && tbl === table) {
                    const rowInTbl = validRows.indexOf(row);
                    const cellIndex = Array.from(row.cells).indexOf(cell);
                    if (rowInTbl >= 0 && cellIndex >= 0) {
                        tableAnchor = {
                            logicalTableIndex: logicalTableIdx,
                            logicalRowIndex: currentLogicalRowCount + rowInTbl,
                            cellIndex,
                            textOffsetInCell: getOffsetInNode(cell, range.startContainer, range.startOffset),
                        };
                    }
                    foundTarget = true;
                    break;
                }
                currentLogicalRowCount += validRows.length;
            }
        }
    }

    return { globalOffset, tableAnchor };
};

const findTargetPageForTableAnchor = (
    pages: { html: string }[],
    anchor: TableCellCursorAnchor
): number | null => {
    if (typeof document === 'undefined') return null;
    if (!scratchTableContainer) {
        scratchTableContainer = document.createElement('div');
    }
    let logicalTableIdx = -1;
    let currentRowOffset = 0;

    for (let pIdx = 0; pIdx < pages.length; pIdx++) {
        scratchTableContainer.innerHTML = pages[pIdx].html;
        const tables = Array.from(scratchTableContainer.querySelectorAll('table')) as HTMLTableElement[];
        for (const tbl of tables) {
            const isContinuation = tbl.getAttribute('data-continuation') === 'true';
            if (!isContinuation || logicalTableIdx === -1) {
                logicalTableIdx++;
                currentRowOffset = 0;
            }
            const validRows = Array.from(tbl.rows).filter(
                (r) => r.getAttribute('data-repeated-header-row') !== 'true'
            );
            if (
                logicalTableIdx === anchor.logicalTableIndex &&
                anchor.logicalRowIndex >= currentRowOffset &&
                anchor.logicalRowIndex < currentRowOffset + validRows.length
            ) {
                return pIdx + 1;
            }
            currentRowOffset += validRows.length;
        }
    }
    return null;
};

const findTargetPageForSnapshot = (
    pages: { html: string }[],
    snapshot: CursorSnapshot
): number | null => {
    if (snapshot.tableAnchor) {
        const tablePage = findTargetPageForTableAnchor(pages, snapshot.tableAnchor);
        if (tablePage !== null) return tablePage;
    }
    let currentTotal = 0;
    let remainingOffset = snapshot.globalOffset;
    for (let i = 1; i <= pages.length; i++) {
        const el = getPageElementFromSource(i, pages);
        if (!el) continue;
        const pageLen = getNodeTextLength(el);
        const contentLen = isBlock(el) ? Math.max(0, pageLen - 1) : pageLen;
        if (remainingOffset < currentTotal + contentLen || (remainingOffset === currentTotal + contentLen && i === pages.length)) {
            return i;
        }
        if (remainingOffset === currentTotal + contentLen) {
            remainingOffset += 1;
        }
        currentTotal += pageLen;
    }
    return pages.length > 0 ? pages.length : null;
};

const scrollRangeIntoContainerView = (range: Range, scrollContainer: HTMLElement | null) => {
    if (!scrollContainer) return;
    const containerRect = scrollContainer.getBoundingClientRect();
    if (containerRect.height <= 0) return;

    let rect = range.getBoundingClientRect();
    if (rect.top === 0 && rect.height === 0) {
        const el = range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.parentElement
            : (range.startContainer as HTMLElement);
        if (el) {
            rect = el.getBoundingClientRect();
        }
    }
    if (rect.top === 0 && rect.height === 0) return;

    const topPad = 24;
    const bottomPad = 48;
    if (rect.top < containerRect.top + topPad) {
        scrollContainer.scrollBy({
            top: rect.top - (containerRect.top + topPad),
            behavior: 'smooth',
        });
    } else if (rect.bottom > containerRect.bottom - bottomPad) {
        scrollContainer.scrollBy({
            top: rect.bottom - (containerRect.bottom - bottomPad),
            behavior: 'smooth',
        });
    }
};

const setCursorInNode = (
    root: HTMLElement,
    offset: number,
    focusContainer?: HTMLElement,
    scrollContainer?: HTMLElement | null
) => {
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
            if (el.tagName === 'TR' && el.getAttribute('data-repeated-header-row') === 'true') {
                return;
            }
            if (el.tagName === 'MATH-FIELD' || el.classList.contains('prodoc-page-break') || el.tagName === 'BR' || el.classList.contains('prodoc-section-break')) {
                if (el.tagName === 'BR' && currentCount === offset) {
                    const parent = el.parentNode;
                    if (parent) {
                        const idx = Array.prototype.indexOf.call(parent.childNodes, el);
                        range.setStart(parent, Math.max(0, idx));
                        range.collapse(true);
                        found = true;
                        return;
                    }
                }
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

    if (offset <= 0) {
        range.setStart(root, 0);
        range.collapse(true);
        found = true;
    } else {
        walk(root);
    }

    (focusContainer || root).focus({ preventScroll: true });
    const sel = window.getSelection();
    if (!sel) return;

    if (found) {
        sel.removeAllRanges();
        sel.addRange(range);
        if (scrollContainer) {
            scrollRangeIntoContainerView(range, scrollContainer);
        } else {
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
        const fallbackRange = document.createRange();
        fallbackRange.selectNodeContents(root);
        fallbackRange.collapse(false);
        sel.removeAllRanges();
        sel.addRange(fallbackRange);
        if (scrollContainer) {
            scrollRangeIntoContainerView(fallbackRange, scrollContainer);
        }
    }
};

const restoreCursorSnapshot = (
    snapshot: CursorSnapshot,
    pagesHtml: { html: string }[],
    scrollContainer?: HTMLElement | null
): { pageNum: number; restored: boolean } | null => {
    if (snapshot.tableAnchor) {
        const { logicalTableIndex, logicalRowIndex, cellIndex, textOffsetInCell } = snapshot.tableAnchor;
        let currentLogicalTable = -1;
        let currentRowOffset = 0;

        for (let pIdx = 0; pIdx < pagesHtml.length; pIdx++) {
            const pageNum = pIdx + 1;
            const pageEl = document.getElementById(`prodoc-editor-${pageNum}`);
            const tables = getPageTablesFromSource(pageNum, pagesHtml);
            for (const tbl of tables) {
                const isContinuation = tbl.getAttribute('data-continuation') === 'true';
                if (!isContinuation || currentLogicalTable === -1) {
                    currentLogicalTable++;
                    currentRowOffset = 0;
                }
                const validRows = Array.from(tbl.rows).filter(
                    (r) => r.getAttribute('data-repeated-header-row') !== 'true'
                );
                if (
                    currentLogicalTable === logicalTableIndex &&
                    logicalRowIndex >= currentRowOffset &&
                    logicalRowIndex < currentRowOffset + validRows.length
                ) {
                    if (pageEl) {
                        const targetRow = validRows[logicalRowIndex - currentRowOffset];
                        const targetCell = targetRow?.cells[Math.min(cellIndex, Math.max(0, (targetRow?.cells.length || 1) - 1))];
                        if (targetCell) {
                            setCursorInNode(targetCell, textOffsetInCell, pageEl, scrollContainer);
                            return { pageNum, restored: true };
                        }
                    }
                    return { pageNum, restored: false };
                }
                currentRowOffset += validRows.length;
            }
        }
    }

    let currentTotal = 0;
    let remainingOffset = snapshot.globalOffset;
    const totalPages = pagesHtml.length;

    for (let i = 1; i <= totalPages; i++) {
        const domEl = document.getElementById(`prodoc-editor-${i}`);
        const el = domEl || getPageElementFromSource(i, pagesHtml);
        if (!el) continue;

        const pageLen = getNodeTextLength(el);
        const contentLen = isBlock(el) ? Math.max(0, pageLen - 1) : pageLen;

        if (remainingOffset < currentTotal + contentLen) {
            if (!domEl) {
                return { pageNum: i, restored: false };
            }
            const localOffset = Math.max(0, remainingOffset - currentTotal);
            setCursorInNode(domEl, localOffset, domEl, scrollContainer);
            return { pageNum: i, restored: true };
        }

        if (remainingOffset === currentTotal + contentLen) {
            if (i === totalPages) {
                if (!domEl) {
                    return { pageNum: i, restored: false };
                }
                setCursorInNode(domEl, contentLen, domEl, scrollContainer);
                return { pageNum: i, restored: true };
            }
            remainingOffset += 1;
        }

        currentTotal += pageLen;
    }

    if (totalPages > 0) {
        const lastPage = document.getElementById(`prodoc-editor-${totalPages}`);
        if (lastPage) {
            const lastLen = getNodeTextLength(lastPage);
            const contentLen = isBlock(lastPage) ? Math.max(0, lastLen - 1) : lastLen;
            setCursorInNode(lastPage, contentLen, lastPage, scrollContainer);
            return { pageNum: totalPages, restored: true };
        }
        return { pageNum: totalPages, restored: false };
    }
    return null;
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
    firstHeaderContent,
    setFirstHeaderContent,
    firstFooterContent,
    setFirstFooterContent,
    editorRef,
    setZoom,
    zoomMode,
    setZoomMode,
    zoomLayout,
    calibrationScale,
    measurementUnit,
    setMeasurementUnit,
    setPageConfig,
    openPageSetup,
    isTableResizing,
    historyApplySeq,
  } = useEditor();
  const { triggerGestureLock } = useGestureContext();
  
  const [pagesData, setPagesData] = useState<{ html: string, config: PageConfig }[]>(() => paginateContent(content, pageConfig).pages);
  const pagesDataRef = useRef(pagesData);
  pagesDataRef.current = pagesData;

  const rulerContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  
  const cursorRestorationRef = useRef<CursorSnapshot | null>(null);
  const cursorRetryCountRef = useRef(0);
  const isUserScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastReportedPageRef = useRef(currentPage);
  const lastProcessedJumpSeqRef = useRef<number>(0);
  const lastSelfSyncedContentRef = useRef<string | null>(null);
  const pendingImmediatePaginationRef = useRef(false);
  const lastProcessedHistorySeqRef = useRef<number>(historyApplySeq);

  // High-performance focal-centered pinch to zoom & double-tap to toggle fit
  useTouchZoom({
    containerRef: scrollContainerRef,
    contentRef: contentWrapperRef,
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
    minZoom: 15,
    maxZoom: 500,
  });

  const lastAppliedFitZoomRef = useRef<number | null>(null);

  // Dynamic Zoom Logic (accounts for calibrationScale and Multiple Pages 2-up layout)
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
      const pageWidth = phys.widthPx * calibrationScale;
      const pageHeight = phys.heightPx * calibrationScale;

      const padding = width < 640 ? 24 : width < 768 ? 40 : 64; // responsive padding on each side
      const availableWidth = Math.max(100, width - padding);
      const availableHeight = Math.max(100, height - padding);

      const effectiveWidthPerPage = zoomMode === 'fit-page' && zoomLayout === 'multiple'
        ? Math.max(120, (availableWidth - 32) / 2)
        : availableWidth;

      const zoomW = (effectiveWidthPerPage / pageWidth) * 100;
      const zoomH = (availableHeight / pageHeight) * 100;
      const fitPageZoom = Math.max(15, Math.round(Math.min(zoomW, zoomH)));
      const fitWidthZoom = Math.max(15, Math.round(zoomW));

      const targetZoom = zoomMode === 'fit-page' ? fitPageZoom : fitWidthZoom;

      if (Math.abs(zoom - targetZoom) >= 1 && lastAppliedFitZoomRef.current !== targetZoom) {
          lastAppliedFitZoomRef.current = targetZoom;
          setZoom(targetZoom);
      }
  }, [width, height, pageConfig, currentPage, pagesData, zoomMode, zoomLayout, calibrationScale, zoom, setZoom]);

  // Actual scale used for rendering
  const actualZoom = zoom;

  useEffect(() => {
    if (isTableResizing) return;
    let isMounted = true;

    const isHistoryRestore = historyApplySeq !== lastProcessedHistorySeqRef.current;
    const isExternalContentChange = lastSelfSyncedContentRef.current !== content;
    const isImmediateEdit = pendingImmediatePaginationRef.current;
    pendingImmediatePaginationRef.current = false;

    if (isHistoryRestore) {
      lastProcessedHistorySeqRef.current = historyApplySeq;
    }

    const runPagination = () => {
      if (!isMounted) return;
      const currentCursor = getCursorSnapshot(pagesDataRef.current);

      requestAnimationFrame(() => {
        if (!isMounted) return;
        const result = paginateContent(content, pageConfig);
        pagesDataRef.current = result.pages;
        setPagesData(result.pages);
        setTotalPages(result.pages.length);

        if (currentCursor) {
          cursorRestorationRef.current = currentCursor;
          cursorRetryCountRef.current = 0;
          const targetPageNum = findTargetPageForSnapshot(result.pages, currentCursor);
          if (targetPageNum && targetPageNum !== lastReportedPageRef.current) {
            setCurrentPage(targetPageNum);
          }
        }
      });
    };

    if (isHistoryRestore || isExternalContentChange || isImmediateEdit) {
      lastSelfSyncedContentRef.current = content;
      runPagination();
      return () => {
        isMounted = false;
      };
    }

    const timer = setTimeout(runPagination, 200);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [content, pageConfig, setTotalPages, setCurrentPage, isTableResizing, historyApplySeq]);

  useLayoutEffect(() => {
      if (cursorRestorationRef.current === null) return;
      const attemptRestore = () => {
          const snapshot = cursorRestorationRef.current;
          if (!snapshot) return;
          const result = restoreCursorSnapshot(snapshot, pagesDataRef.current, scrollContainerRef.current);
          if (result?.restored) {
              cursorRestorationRef.current = null;
              cursorRetryCountRef.current = 0;
              if (result.pageNum !== lastReportedPageRef.current) {
                  lastReportedPageRef.current = result.pageNum;
                  setCurrentPage(result.pageNum);
              }
          } else if (result && !result.restored && cursorRetryCountRef.current < 6) {
              cursorRetryCountRef.current += 1;
              if (result.pageNum !== lastReportedPageRef.current) {
                  setCurrentPage(result.pageNum);
              }
              requestAnimationFrame(attemptRestore);
          } else {
              cursorRestorationRef.current = null;
              cursorRetryCountRef.current = 0;
          }
      };
      attemptRestore();
  }, [pagesData, setCurrentPage]);

  useEffect(() => {
      const activePageEl = document.getElementById(`prodoc-editor-${currentPage}`);
      if (activePageEl && editorRef) {
           
          editorRef.current = activePageEl as HTMLDivElement;
      }
  }, [currentPage, editorRef, pagesData]);

  const [scrollTop, setScrollTop] = useState(0);
  const scrollAnimFrameRef = useRef<number | null>(null);

  const handlePageUpdate = useCallback((
    newHtml: string,
    pageIndex: number,
    historyMode: HistoryCommitMode = 'debounced',
    options?: { immediateRepaginate?: boolean }
  ) => {
    const currentPages = pagesDataRef.current;
    const targetPage = currentPages[pageIndex];
    if (!targetPage || targetPage.html === newHtml) return;

    const updatedPages = [...currentPages];
    updatedPages[pageIndex] = { ...targetPage, html: newHtml };
    pagesDataRef.current = updatedPages;
    setPagesData(updatedPages);

    const fullContent = updatedPages.map(p => p.html).join('');
    lastSelfSyncedContentRef.current = fullContent;
    if (historyMode === 'immediate' || options?.immediateRepaginate) {
      pendingImmediatePaginationRef.current = true;
    }
    setContent(fullContent, false, { historyMode });
  }, [setContent]);

  const handlePageFocus = useCallback((index: number, e: React.FocusEvent<HTMLDivElement>) => {
      lastReportedPageRef.current = index + 1;
      setCurrentPage(index + 1);
      if (editorRef) {
          editorRef.current = e.currentTarget;
      }
  }, [setCurrentPage, editorRef]);

  const activePageConfig = pagesData[currentPage - 1]?.config || pageConfig;

  // Geometry calculation for all pages using exact physical dimensions and calibrationScale
  const pageGeometries = useMemo(() => {
    const renderScale = (actualZoom / 100) * calibrationScale;
    return pagesData.map(p => {
      const cfg = p.config;
      const phys = getPhysicalDimensions(
        (cfg.size as string) || 'Letter',
        cfg.orientation || 'portrait',
        cfg.customWidth,
        cfg.customHeight
      );
      return {
        scaledWidth: Math.round(phys.widthPx * renderScale),
        scaledHeight: Math.round(phys.heightPx * renderScale)
      };
    });
  }, [pagesData, actualZoom, calibrationScale]);

  const GAP = width > 0 && width < 640 ? 16 : width > 0 && width < 768 ? 24 : 32;
  const CANVAS_PAD = width > 0 && width < 640 ? 12 : width > 0 && width < 768 ? 20 : 32;

  // Prefix sums for vertical top positions (used for measurement and ruler compatibility)
  const { pageTops, totalVirtualHeight } = useMemo(() => {
    const tops: number[] = [];
    let currentY = CANVAS_PAD;
    for (let i = 0; i < pageGeometries.length; i++) {
      tops.push(currentY);
      currentY += pageGeometries[i].scaledHeight + GAP;
    }
    const total = currentY + CANVAS_PAD;
    return { pageTops: tops, totalVirtualHeight: total };
  }, [pageGeometries, CANVAS_PAD, GAP]);

  const maxSinglePageWidth = useMemo(() => {
      let max = 0;
      pageGeometries.forEach(g => {
        if (g.scaledWidth > max) max = g.scaledWidth;
      });
      return max;
  }, [pageGeometries]);

  // Multi-column side-by-side calculation
  const isSideToSide = pageMovement === 'side-to-side';
  const basePageWidth = pageGeometries[0]?.scaledWidth || 800;
  const maxPossibleColumns = Math.max(1, Math.floor((width - 48) / (basePageWidth + GAP)));
  const columnCount = (isSideToSide || zoomLayout === 'multiple')
    ? Math.max(1, Math.min(4, maxPossibleColumns))
    : (actualZoom <= 75 && maxPossibleColumns >= 2 ? Math.min(3, maxPossibleColumns) : 1);

  const totalPagesCount = pagesData.length;
  const rowCount = Math.max(1, Math.ceil(totalPagesCount / columnCount));

  const maxRowWidth = useMemo(() => {
    if (pageGeometries.length === 0) return 0;
    if (columnCount === 1) return maxSinglePageWidth;
    let maxW = 0;
    for (let r = 0; r < rowCount; r++) {
      let rowW = 0;
      let countInRow = 0;
      for (let c = 0; c < columnCount; c++) {
        const pIdx = r * columnCount + c;
        if (pIdx < pageGeometries.length) {
          rowW += pageGeometries[pIdx].scaledWidth;
          countInRow++;
        }
      }
      if (countInRow > 1) {
        rowW += (countInRow - 1) * GAP;
      }
      if (rowW > maxW) maxW = rowW;
    }
    return maxW;
  }, [pageGeometries, columnCount, rowCount, maxSinglePageWidth, GAP]);

  const contentTotalWidth = Math.max(width, maxRowWidth + CANVAS_PAD * 2);

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

  // Re-measure virtual rows whenever zoom or column layout changes so pages never overlap or clip
  useEffect(() => {
    rowVirtualizer.measure();
  }, [actualZoom, columnCount, rowHeights, rowVirtualizer]);

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
    if (!isAnyModalOpen()) {
      triggerGestureLock(400);
    }

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
  const contentTotalHeight = Math.max(height, totalContainerHeight + CANVAS_PAD * 2, totalVirtualHeight);

  return (
    <div 
      className="print-layout-mode w-full h-full min-w-0 min-h-0 flex flex-col relative bg-[#eef2f6] dark:bg-[#0b1120] transition-colors duration-300"
    >
       {showRuler && width >= 768 && (
         <div 
            ref={rulerContainerRef}
            className="w-full overflow-hidden bg-[#f8fafc] dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700 z-20 shrink-0 sticky top-0 shadow-sm no-print hidden md:block"
            style={{ height: '25px' }}
            onMouseDown={(e) => e.preventDefault()}
         >
             <div style={{ width: `${contentTotalWidth}px`, minWidth: '100%', display: 'flex', justifyContent: 'center' }}>
                 <Ruler
                   pageConfig={activePageConfig}
                   zoom={actualZoom}
                   calibrationScale={calibrationScale}
                   unit={measurementUnit}
                   onUnitChange={setMeasurementUnit}
                   onPageConfigChange={setPageConfig}
                   onDoubleClick={() => openPageSetup('margins')}
                 />
             </div>
         </div>
       )}

       <div 
          ref={setRefs}
          className="flex-1 min-h-0 min-w-0 relative overflow-auto scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent touch-pan-x touch-pan-y"
          style={{ overflow: 'auto' }}
          onScroll={handleScroll}
          onDoubleClick={() => setActiveEditingArea('body')}
       >
           <div 
                ref={contentWrapperRef}
                className="relative box-border"
                style={{ 
                  width: `${contentTotalWidth}px`,
                  minWidth: '100%',
                  height: `${contentTotalHeight}px`,
                  minHeight: '100%',
                  padding: `${CANVAS_PAD}px`,
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
                      className="absolute left-0 w-full flex justify-center items-start gap-3 px-3 sm:gap-5 sm:px-5 md:gap-8 md:px-8 box-border"
                      style={{
                        top: `${Math.round(virtualRow.start + CANVAS_PAD)}px`,
                      }}
                    >
                      {rowPageIndices.map((pIdx) => {
                        const pageData = pagesData[pIdx];
                        const geo = pageGeometries[pIdx];
                        const scaledWidth = geo ? geo.scaledWidth : 816;
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
                              style={{ width: `${scaledWidth}px`, height: `${scaledHeight}px` }}
                            >
                              <GhostPage
                                pageNumber={pIdx + 1}
                                totalPages={totalPagesCount || 1}
                                config={pageData?.config || pageConfig}
                                zoom={actualZoom}
                                calibrationScale={calibrationScale}
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
                              width: `${scaledWidth}px`,
                              height: `${scaledHeight}px`
                            }}
                          >
                            <EditorPage
                              pageNumber={pIdx + 1}
                              totalPages={totalPagesCount}
                              content={pageData.html}
                              config={pageData.config}
                              zoom={actualZoom}
                              calibrationScale={calibrationScale}
                              showFormattingMarks={showFormattingMarks}
                              onContentChange={handlePageUpdate}
                              onFocus={(e) => handlePageFocus(pIdx, e)}
                              isActivePage={currentPage === pIdx + 1}
                              historyApplySeq={historyApplySeq}
                              activeEditingArea={activeEditingArea}
                              setActiveEditingArea={setActiveEditingArea}
                              headerContent={headerContent}
                              setHeaderContent={setHeaderContent}
                              footerContent={footerContent}
                              setFooterContent={setFooterContent}
                              firstHeaderContent={firstHeaderContent}
                              setFirstHeaderContent={setFirstHeaderContent}
                              firstFooterContent={firstFooterContent}
                              setFirstFooterContent={setFirstFooterContent}
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
