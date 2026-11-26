/* eslint-disable react-hooks/immutability, @typescript-eslint/no-explicit-any */
import React, { useRef, useLayoutEffect, useEffect, useState, useMemo, useCallback } from 'react';

import { createPortal } from 'react-dom';
import { PageConfig, EditingArea, RibbonTab } from '../../types';
import { HistoryCommitMode } from '../../utils/historyManager';
import { PAGE_SIZES } from '../../constants';
import { getPhysicalDimensions } from '../../utils/measurement';
import { useMathLive } from '../../hooks/useMathLive';
import { useEditor } from '../../contexts/EditorContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useGestureContext } from '../../contexts/GestureContext';
import { ResizerOverlay } from './ResizerOverlay';
import { TableResizerOverlay } from './TableResizerOverlay';
import { TableContextMenu } from './TableContextMenu';
import { TablePropertiesModal } from './TablePropertiesModal';
import { SortModal } from './SortModal';
import { EditorEmptyState } from '../editor/EditorEmptyState';
import {
  clearSelectedCellHighlights,
  deleteTableColumn,
  deleteTableRow,
  ensureEditorHasBlock,
  focusTableCellLikeWord,
  getSelectedTableCells,
  insertTableColumn,
  insertTableRow,
  mergeTableCells,
  normalizeBorderColorValue,
  selectTableCellsRect,
  splitTableCell,
} from '../../utils/tableUtils';
import { latexToLinearUnicode, saveCustomEquation } from '../../utils/equationPresets';
import {
  EquationJustification,
  insertEquationBox,
  MathFieldEl,
  setLastActiveMathField,
} from '../ribbon/tabs/InsertTab/symbols/equation_subTab/common/mathUtils';

interface EditorPageProps {
  content: string;
  pageNumber: number;
  totalPages: number;
  config: PageConfig;
  zoom: number;
  calibrationScale?: number;
  readOnly?: boolean;
  onContentChange?: (
    html: string,
    pageIndex: number,
    historyMode?: HistoryCommitMode,
    options?: { immediateRepaginate?: boolean }
  ) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  showFormattingMarks: boolean;
  historyApplySeq?: number;
  
  // Header/Footer Props
  activeEditingArea?: EditingArea;
  setActiveEditingArea?: (area: EditingArea) => void;
  headerContent?: string;
  setHeaderContent?: (html: string) => void;
  footerContent?: string;
  setFooterContent?: (html: string) => void;
  
  // Different First Page Support
  firstHeaderContent?: string;
  setFirstHeaderContent?: (html: string) => void;
  firstFooterContent?: string;
  setFirstFooterContent?: (html: string) => void;
  isActivePage?: boolean;
}


const getTextLength = (node: Node): number => {
  if (node.nodeType === Node.TEXT_NODE) return (node.nodeValue || "").length;
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as HTMLElement;
    if (el.tagName === 'MATH-FIELD' || el.classList.contains('prodoc-page-break') || el.tagName === 'BR') return 1;
  }
  let len = 0;
  node.childNodes.forEach((c) => (len += getTextLength(c)));
  return len;
};

const EditorPageComponent: React.FC<EditorPageProps> = ({
  content,
  pageNumber,
  totalPages,
  config,
  zoom,
  calibrationScale = 1,
  readOnly,
  onContentChange,
  onFocus,
  showFormattingMarks,
  activeEditingArea = 'body',
  setActiveEditingArea,
  headerContent = '',
  setHeaderContent,
  footerContent = '',
  setFooterContent,
  firstHeaderContent = '',
  setFirstHeaderContent,
  firstFooterContent = '',
  setFirstFooterContent,
  isActivePage = false,
  historyApplySeq = 0,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorElement, setEditorElement] = useState<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const scale = (zoom / 100) * calibrationScale;
  const { 
    isKeyboardLocked, 
    isTableResizerEnabled, 
    selectionMode, 
    formatPainterStyles,
    applyFormatPainterToSelection,
    undo, 
    redo, 
    setActiveElementType,
    footnotes,
    updateFootnote,
    removeFootnote,
    endnotes,
    updateEndnote,
    removeEndnote
  } = useEditor();

  const { isGestureLocked } = useGestureContext();

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || theme === 'ocean';
  const defaultPaperBg = isDarkMode 
    ? (theme === 'ocean' ? '#001a3d' : '#0f172a') 
    : '#ffffff';
  const defaultPaperInk = isDarkMode 
    ? (theme === 'ocean' ? '#f0fdff' : '#f8fafc') 
    : '#000000';

  const pageFootnoteIds = useMemo(() => {
    if (!content) return [];
    const regex = /class="[^"]*prodoc-footnote-ref[^"]*"[^>]*data-note-id="([^"]+)"/g;
    const ids: string[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (match[1] && !ids.includes(match[1])) {
        ids.push(match[1]);
      }
    }
    return ids;
  }, [content]);

  const pageFootnotes = useMemo(() => {
    if (!footnotes) return [];
    return footnotes.filter(f => pageFootnoteIds.includes(f.id));
  }, [footnotes, pageFootnoteIds]);

  const isLastPage = pageNumber === totalPages;

  const [selectedImage, setSelectedImage] = useState<HTMLElement | null>(null);
  const [selectedTable, setSelectedTable] = useState<HTMLTableElement | null>(null);
  const [tables, setTables] = useState<HTMLTableElement[]>([]);
  const lastSelectedCellRef = useRef<HTMLTableCellElement | null>(null);

  // Equation Options Popover State
  const [equationMenu, setEquationMenu] = useState<{
    wrapper: HTMLElement;
    mathField: MathFieldEl;
    x: number;
    y: number;
  } | null>(null);
  const [saveEqDraft, setSaveEqDraft] = useState<{ title: string } | null>(null);
  const equationMenuRef = useRef<HTMLDivElement>(null);

  // Custom Table Context Menu State
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    cell: HTMLTableCellElement | null;
    table: HTMLTableElement | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    cell: null,
    table: null,
  });

  // Keyboard navigation for context menu
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // Table Column Sort States
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [sortColIndex, setSortColIndex] = useState(0);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortExcludeHeader, setSortExcludeHeader] = useState(true);
  const [sortType, setSortType] = useState<'auto' | 'text' | 'number'>('auto');

  // Table Properties Modal States
  const [isTablePropertiesOpen, setIsTablePropertiesOpen] = useState(false);
  const [propertiesTable, setPropertiesTable] = useState<HTMLTableElement | null>(null);
  const [tableWidth, setTableWidth] = useState('100%');
  const [cellPadding, setCellPadding] = useState('medium');
  const [tableAlign, setTableAlign] = useState('left');
  const [borderColor, setBorderColor] = useState('#cbd5e1');
  const [borderWidth, setBorderWidth] = useState('1px');
  const [zebraStriping, setZebraStriping] = useState(false);
  const [headerColor, setHeaderColor] = useState('transparent');
  const [repeatHeader, setRepeatHeader] = useState(false);
  const [keepTogether, setKeepTogether] = useState(false);

  // Advanced Table Properties States
  const [cantSplit, setCantSplit] = useState(true);
  const [customCellPadding, setCustomCellPadding] = useState(false);
  const [padTopBottom, setPadTopBottom] = useState(8);
  const [padLeftRight, setPadLeftRight] = useState(12);
  const [verticalAlign, setVerticalAlign] = useState<'top' | 'middle' | 'bottom'>('top');
  const [specifyRowHeight, setSpecifyRowHeight] = useState(false);
  const [rowHeightVal, setRowHeightVal] = useState(30);
  const [rowHeightMode, setRowHeightMode] = useState<'atLeast' | 'exactly'>('atLeast');
  const [specifyColWidth, setSpecifyColWidth] = useState(false);
  const [colWidthVal, setColWidthVal] = useState(100);
  const [colWidthUnit, setColWidthUnit] = useState<'px' | '%'>('px');
  const [textWrapping, setTextWrapping] = useState<'none' | 'around'>('none');

  useEffect(() => {
    if (propertiesTable) {
      const currentWidth = propertiesTable.style.width || '100%';
      setTableWidth(currentWidth);

      const marginL = propertiesTable.style.marginLeft;
      const marginR = propertiesTable.style.marginRight;
      if (marginL === 'auto' && marginR === 'auto') {
        setTableAlign('center');
      } else if (marginL === 'auto') {
        setTableAlign('right');
      } else {
        setTableAlign('left');
      }

      const firstCell = propertiesTable.querySelector('td, th') as HTMLTableCellElement | null;
      if (firstCell) {
        // Standard or custom cell padding detection
        const padTop = firstCell.style.paddingTop;
        const padBottom = firstCell.style.paddingBottom;
        const padLeft = firstCell.style.paddingLeft;
        const padRight = firstCell.style.paddingRight;
        if (padTop || padBottom || padLeft || padRight) {
          setCustomCellPadding(true);
          setPadTopBottom(parseInt(padTop) || 8);
          setPadLeftRight(parseInt(padLeft) || 12);
        } else {
          setCustomCellPadding(false);
          const pad = firstCell.style.padding || '';
          if (pad.includes('4px') || pad === '4px 8px') {
            setCellPadding('small');
            setPadTopBottom(4);
            setPadLeftRight(8);
          } else if (pad.includes('12px') || pad === '12px 16px') {
            setCellPadding('large');
            setPadTopBottom(12);
            setPadLeftRight(16);
          } else {
            setCellPadding('medium');
            setPadTopBottom(8);
            setPadLeftRight(12);
          }
        }

        // Vertical Alignment detection
        const vAlign = firstCell.style.verticalAlign || 'top';
        setVerticalAlign(vAlign as 'top' | 'middle' | 'bottom');

        // Border detection
        const border = firstCell.style.border;
        if (border) {
          if (border.includes('2px')) setBorderWidth('2px');
          else setBorderWidth('1px');

          setBorderColor(normalizeBorderColorValue(border));
        }

        // Column width detection
        const wVal = firstCell.style.width;
        if (wVal) {
          setSpecifyColWidth(true);
          setColWidthVal(parseInt(wVal) || 100);
          setColWidthUnit(wVal.includes('%') ? '%' : 'px');
        } else {
          setSpecifyColWidth(false);
          setColWidthVal(100);
          setColWidthUnit('px');
        }
      }

      const firstRow = propertiesTable.rows[0];
      if (firstRow) {
        // Prevent split detection
        const rowCantSplit = firstRow.style.pageBreakInside === 'avoid' || firstRow.getAttribute('data-cant-split') === 'true';
        setCantSplit(rowCantSplit);

        // Row height detection
        const hVal = firstRow.style.height || firstRow.style.minHeight;
        if (hVal) {
          setSpecifyRowHeight(true);
          setRowHeightVal(parseInt(hVal) || 30);
          setRowHeightMode(firstRow.style.height ? 'exactly' : 'atLeast');
        } else {
          setSpecifyRowHeight(false);
          setRowHeightVal(30);
          setRowHeightMode('atLeast');
        }

        if (firstRow.cells.length > 0) {
          const bg = firstRow.cells[0].style.backgroundColor;
          if (bg && bg !== 'transparent') {
            if (bg.includes('f1f5f9') || bg.includes('rgb(241, 245, 249)')) setHeaderColor('#f1f5f9');
            else if (bg.includes('eff6ff') || bg.includes('rgb(239, 246, 255)')) setHeaderColor('#eff6ff');
            else if (bg.includes('fee2e2') || bg.includes('rgb(254, 226, 226)')) setHeaderColor('#fee2e2');
            else if (bg.includes('f0fdf4') || bg.includes('rgb(240, 253, 244)')) setHeaderColor('#f0fdf4');
            else setHeaderColor(bg);
          } else {
            setHeaderColor('transparent');
          }
        }
      }

      // Text wrapping detection
      const isFloating = propertiesTable.style.float && propertiesTable.style.float !== 'none';
      setTextWrapping(isFloating ? 'around' : 'none');

      let hasZebra = false;
      if (propertiesTable.rows.length > 2) {
        const secondRowBg = propertiesTable.rows[2]?.style.backgroundColor;
        if (secondRowBg && (secondRowBg.includes('f8fafc') || secondRowBg.includes('rgb(248, 250, 252)'))) {
          hasZebra = true;
        }
      }
      setZebraStriping(hasZebra);

      const repHeader = propertiesTable.getAttribute('data-repeat-header') === 'true';
      setRepeatHeader(repHeader);

      const keepTog = propertiesTable.getAttribute('data-keep-together') === 'true';
      setKeepTogether(keepTog);
    }
  }, [propertiesTable]);

  useEffect(() => {
    const handleClose = (e: Event) => {
      // Prevent closing if the scroll event is originating from inside the context menu itself
      if (e.type === 'scroll' && contextMenuRef.current && contextMenuRef.current.contains(e.target as Node)) {
        return;
      }
      setContextMenu((prev) => (prev.visible ? { ...prev, visible: false } : prev));
    };
    window.addEventListener('click', handleClose);
    window.addEventListener('scroll', handleClose, true);
    return () => {
      window.removeEventListener('click', handleClose);
      window.removeEventListener('scroll', handleClose, true);
    };
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const updateTables = () => {
        setTables(Array.from(editorRef.current!.querySelectorAll('table')));
      };
      updateTables();
      const observer = new MutationObserver(updateTables);
      observer.observe(editorRef.current, { childList: true, subtree: true });
      return () => observer.disconnect();
    }
  }, [content]);

  // --- Table Actions & Context Menu Handlers ---
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const cell = target.closest('td, th') as HTMLTableCellElement | null;
    if (cell) {
      e.preventDefault();
      const table = cell.closest('table') as HTMLTableElement | null;
      
      // Estimate the dimensions of the context menu to prevent overflowing edges
      const menuWidth = 220;
      const menuHeight = 430; // Highly accurate estimate of context menu height
      
      let clickX = e.clientX;
      let clickY = e.clientY;
      
      const viewportPadding = window.innerWidth < 640 ? 8 : 16;
      
      // Detect horizontal overflow and flip left if necessary
      if (clickX + menuWidth + viewportPadding > window.innerWidth) {
        clickX = clickX - menuWidth;
      }
      
      // Detect vertical overflow and flip upward if necessary
      if (clickY + menuHeight + viewportPadding > window.innerHeight) {
        clickY = clickY - menuHeight;
      }
      
      // Ensure it stays safely inside screen boundaries (safety clamp)
      const safeX = Math.max(viewportPadding, Math.min(clickX, window.innerWidth - menuWidth - viewportPadding));
      const safeY = Math.max(viewportPadding, Math.min(clickY, window.innerHeight - menuHeight - viewportPadding));
      
      setContextMenu({
        visible: true,
        x: safeX,
        y: safeY,
        cell,
        table,
      });
    }
  };

  // Focus & Click outside for context menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (contextMenu.visible && contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setContextMenu((prev) => ({ ...prev, visible: false }));
      }
    };
    
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!contextMenu.visible) return;
      
      if (e.key === 'Escape') {
        e.preventDefault();
        setContextMenu((prev) => ({ ...prev, visible: false }));
        editorRef.current?.focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        // Prevent browser window from scrolling when context menu is active
        e.preventDefault();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [contextMenu.visible]);

  // Maintain focus and set initial item focus
  useEffect(() => {
    if (contextMenu.visible && contextMenuRef.current) {
      const timer = setTimeout(() => {
        contextMenuRef.current?.focus();
        const buttons = contextMenuRef.current?.querySelectorAll('button');
        if (buttons && buttons.length > 0) {
          setFocusedIndex(0);
          (buttons[0] as HTMLButtonElement).focus();
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setFocusedIndex(-1);
    }
  }, [contextMenu.visible]);

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!contextMenu.visible || !contextMenuRef.current) return;
    
    const buttons = Array.from(contextMenuRef.current.querySelectorAll('button')) as HTMLButtonElement[];
    if (buttons.length === 0) return;

    const activeEl = document.activeElement as HTMLButtonElement;
    const currentActiveIndex = buttons.indexOf(activeEl);
    const activeIndex = currentActiveIndex >= 0 ? currentActiveIndex : (focusedIndex >= 0 ? focusedIndex : 0);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      const nextIndex = (activeIndex + 1) % buttons.length;
      setFocusedIndex(nextIndex);
      buttons[nextIndex]?.focus();
      buttons[nextIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      const prevIndex = (activeIndex - 1 + buttons.length) % buttons.length;
      setFocusedIndex(prevIndex);
      buttons[prevIndex]?.focus();
      buttons[prevIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else if (e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation();
      const nextIndex = e.shiftKey
        ? (activeIndex - 1 + buttons.length) % buttons.length
        : (activeIndex + 1) % buttons.length;
      setFocusedIndex(nextIndex);
      buttons[nextIndex]?.focus();
      buttons[nextIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  };

  const handleSortColumn = () => {
    const cell = contextMenu.cell;
    const table = contextMenu.table;
    if (!cell || !table) return;
    
    setSortColIndex(cell.cellIndex);
    setIsSortModalOpen(true);
  };

  const applySortColumn = () => {
    const table = contextMenu.table;
    if (!table) return;

    table.classList.add('is-resizing');

    // Convert rows to array
    const allRows = Array.from(table.rows);
    
    // Separate rows to sort vs. keep
    const headerOffset = sortExcludeHeader ? 1 : 0;
    const keepRows = allRows.slice(0, headerOffset);
    const rowsToSort = allRows.slice(headerOffset);

    rowsToSort.sort((rowA, rowB) => {
      const cellA = rowA.cells[sortColIndex];
      const cellB = rowB.cells[sortColIndex];
      const textA = cellA ? cellA.textContent?.trim() || '' : '';
      const textB = cellB ? cellB.textContent?.trim() || '' : '';

      if (sortType === 'number' || (sortType === 'auto' && !isNaN(parseFloat(textA)) && !isNaN(parseFloat(textB)))) {
        const numA = parseFloat(textA);
        const numB = parseFloat(textB);
        if (!isNaN(numA) && !isNaN(numB)) {
          return sortDirection === 'asc' ? numA - numB : numB - numA;
        }
      }

      // Otherwise sort as text
      return sortDirection === 'asc'
        ? textA.localeCompare(textB, undefined, { numeric: true, sensitivity: 'base' })
        : textB.localeCompare(textA, undefined, { numeric: true, sensitivity: 'base' });
    });

    // Re-append rows in sorted order
    const firstSortRow = rowsToSort[0] || keepRows[0];
    const parent = firstSortRow ? firstSortRow.parentNode : table;
    if (parent) {
      // Clear sorted region from DOM
      rowsToSort.forEach((row) => row.remove());
      // Then append the sorted rows back
      rowsToSort.forEach((row) => parent.appendChild(row));
    }

    setTimeout(() => {
      table.classList.remove('is-resizing');
    }, 300);

    setIsSortModalOpen(false);

    if (onContentChange && editorRef.current) {
      onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
    }
  };

  const insertRow = (where: 'above' | 'below') => {
    const cell = contextMenu.cell;
    const table = contextMenu.table;
    if (!cell || !table) return;
    table.classList.add('is-resizing');
    const newRow = insertTableRow(table, cell, where);
    if (newRow) {
      newRow.classList.remove('is-deleting');
      requestAnimationFrame(() => {
        newRow.classList.add('is-inserted');
      });
      newRow.addEventListener('animationend', () => {
        newRow.classList.remove('is-inserted');
      }, { once: true });
    }
    setTimeout(() => {
      table.classList.remove('is-resizing');
    }, 300);
    if (onContentChange && editorRef.current) {
      onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
    }
  };

  const insertCol = (where: 'left' | 'right') => {
    const cell = contextMenu.cell;
    const table = contextMenu.table;
    if (!cell || !table) return;
    table.classList.add('is-resizing');
    insertTableColumn(table, cell, where);
    setTimeout(() => {
      table.classList.remove('is-resizing');
    }, 300);
    if (onContentChange && editorRef.current) {
      onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
    }
  };

  const mergeCells = () => {
    const cell = contextMenu.cell;
    const table = contextMenu.table;
    if (!cell || !table) return;
    if (mergeTableCells(table, cell)) {
      if (onContentChange && editorRef.current) {
        onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
      }
    }
  };

  const splitCells = () => {
    const cell = contextMenu.cell;
    const table = contextMenu.table;
    if (!cell || !table) return;
    if (splitTableCell(table, cell)) {
      if (onContentChange && editorRef.current) {
        onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
      }
    }
  };

  const deleteRow = () => {
    const cell = contextMenu.cell;
    const table = contextMenu.table;
    if (!cell || !table) return;
    deleteTableRow(table, cell);
    if (onContentChange && editorRef.current) {
      onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
    }
  };

  const deleteCol = () => {
    const cell = contextMenu.cell;
    const table = contextMenu.table;
    if (!cell || !table) return;
    deleteTableColumn(table, cell);
    if (onContentChange && editorRef.current) {
      onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
    }
  };

  const deleteTable = () => {
    const table = contextMenu.table;
    if (table) {
      clearSelectedCellHighlights(table);
      table.remove();
      ensureEditorHasBlock(editorRef.current);
      if (onContentChange && editorRef.current) {
        onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
      }
    }
  };

  const showProperties = () => {
    if (contextMenu.table) {
      setPropertiesTable(contextMenu.table);
      setIsTablePropertiesOpen(true);
    }
  };

  const handleContextAction = (action: string) => {
    setContextMenu((prev) => ({ ...prev, visible: false }));
    switch (action) {
      case 'insertRowAbove':
        insertRow('above');
        break;
      case 'insertRowBelow':
        insertRow('below');
        break;
      case 'insertColLeft':
        insertCol('left');
        break;
      case 'insertColRight':
        insertCol('right');
        break;
      case 'mergeCells':
        mergeCells();
        break;
      case 'splitCells':
        splitCells();
        break;
      case 'deleteRow':
        deleteRow();
        break;
      case 'deleteCol':
        deleteCol();
        break;
      case 'deleteTable':
        deleteTable();
        break;
      case 'properties':
        showProperties();
        break;
      case 'toggleKeepTogether': {
        const tbl = contextMenu.table;
        if (tbl) {
          const isCurrentlyKeepTogether = tbl.classList.contains('table-row-keep-together') || tbl.rows[0]?.getAttribute('data-cant-split') === 'true';
          const newValue = !isCurrentlyKeepTogether;

          if (newValue) {
            tbl.classList.add('table-row-keep-together');
          } else {
            tbl.classList.remove('table-row-keep-together');
          }

          Array.from(tbl.rows).forEach((row) => {
            if (newValue) {
              row.style.pageBreakInside = 'avoid';
              row.style.breakInside = 'avoid';
              row.setAttribute('data-cant-split', 'true');
              row.classList.add('table-row-keep-together');
            } else {
              row.style.pageBreakInside = 'auto';
              row.style.breakInside = 'auto';
              row.removeAttribute('data-cant-split');
              row.classList.remove('table-row-keep-together');
            }
          });

          if (onContentChange && editorRef.current) {
            onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
          }
        }
        break;
      }
      case 'sortColumn':
        handleSortColumn();
        break;
      default:
        break;
    }
  };

  const applyProperties = () => {
    if (!propertiesTable) return;

    propertiesTable.style.width = tableWidth;

    // Feature 10: Text wrapping around Table ("Around" vs "None")
    if (textWrapping === 'around') {
      propertiesTable.style.float = tableAlign === 'right' ? 'right' : 'left';
      propertiesTable.style.clear = 'none';
      propertiesTable.style.display = 'table';
      if (tableAlign === 'right') {
        propertiesTable.style.marginLeft = '16px';
        propertiesTable.style.marginRight = '0';
      } else {
        propertiesTable.style.marginRight = '16px';
        propertiesTable.style.marginLeft = '0';
      }
      propertiesTable.style.marginTop = '8px';
      propertiesTable.style.marginBottom = '8px';
    } else {
      propertiesTable.style.float = 'none';
      propertiesTable.style.clear = 'both';
      if (tableAlign === 'center') {
        propertiesTable.style.marginLeft = 'auto';
        propertiesTable.style.marginRight = 'auto';
      } else if (tableAlign === 'right') {
        propertiesTable.style.marginLeft = 'auto';
        propertiesTable.style.marginRight = '0';
      } else {
        propertiesTable.style.marginLeft = '0';
        propertiesTable.style.marginRight = 'auto';
      }
      // Reset custom margins used for wrapping if wrapping is none
      propertiesTable.style.marginTop = '';
      propertiesTable.style.marginBottom = '';
    }

    const cells = Array.from(propertiesTable.querySelectorAll('td, th')) as HTMLTableCellElement[];
    cells.forEach((cell) => {
      // Feature 7: Cell Padding / Cell Margins
      if (customCellPadding) {
        cell.style.padding = ''; // Reset shorthand padding
        cell.style.paddingTop = `${padTopBottom}px`;
        cell.style.paddingBottom = `${padTopBottom}px`;
        cell.style.paddingLeft = `${padLeftRight}px`;
        cell.style.paddingRight = `${padLeftRight}px`;
      } else {
        cell.style.paddingTop = '';
        cell.style.paddingBottom = '';
        cell.style.paddingLeft = '';
        cell.style.paddingRight = '';
        if (cellPadding === 'small') {
          cell.style.padding = '4px 8px';
        } else if (cellPadding === 'large') {
          cell.style.padding = '12px 16px';
        } else {
          cell.style.padding = '8px 12px';
        }
      }

      // Feature 8: Vertical Cell Alignment (Top, Center, Bottom)
      cell.style.verticalAlign = verticalAlign;

      if (borderColor === 'none') {
        cell.style.border = 'none';
      } else {
        cell.style.border = `${borderWidth} solid ${borderColor}`;
      }

      // Feature 9: Column Width Restrictions
      if (specifyColWidth) {
        cell.style.width = `${colWidthVal}${colWidthUnit}`;
      } else {
        cell.style.width = '';
      }
    });

    // Feature 9: Row Height Restrictions
    const rows = Array.from(propertiesTable.rows);
    rows.forEach((row) => {
      if (specifyRowHeight) {
        if (rowHeightMode === 'exactly') {
          row.style.height = `${rowHeightVal}px`;
          row.style.minHeight = '';
          Array.from(row.cells).forEach((cell: any) => {
            cell.style.height = `${rowHeightVal}px`;
            cell.style.minHeight = '';
          });
        } else {
          row.style.minHeight = `${rowHeightVal}px`;
          row.style.height = '';
          Array.from(row.cells).forEach((cell: any) => {
            cell.style.minHeight = `${rowHeightVal}px`;
            cell.style.height = '';
          });
        }
      } else {
        row.style.height = '';
        row.style.minHeight = '';
        Array.from(row.cells).forEach((cell: any) => {
          cell.style.height = '';
          cell.style.minHeight = '';
        });
      }

      // Feature 6: Prevent Row from Splitting Across Pages (Row Keep-Together)
      if (cantSplit) {
        row.style.pageBreakInside = 'avoid';
        row.style.breakInside = 'avoid';
        row.setAttribute('data-cant-split', 'true');
        row.classList.add('table-row-keep-together');
      } else {
        row.style.pageBreakInside = 'auto';
        row.style.breakInside = 'auto';
        row.removeAttribute('data-cant-split');
        row.classList.remove('table-row-keep-together');
      }
    });

    if (cantSplit) {
      propertiesTable.classList.add('table-row-keep-together');
    } else {
      propertiesTable.classList.remove('table-row-keep-together');
    }

    const firstRow = propertiesTable.rows[0];
    if (firstRow) {
      Array.from(firstRow.cells).forEach((cell: any) => {
        cell.style.backgroundColor = headerColor;
      });
    }

    for (let i = 1; i < propertiesTable.rows.length; i++) {
      const row = propertiesTable.rows[i];
      const isEven = i % 2 === 0;
      Array.from(row.cells).forEach((cell: any) => {
        if (zebraStriping && isEven) {
          cell.style.backgroundColor = '#f8fafc';
        } else if (zebraStriping) {
          cell.style.backgroundColor = 'transparent';
        } else {
          if (cell.style.backgroundColor === 'rgb(248, 250, 252)' || cell.style.backgroundColor === '#f8fafc') {
            cell.style.backgroundColor = 'transparent';
          }
        }
      });
    }

    if (repeatHeader) {
      propertiesTable.setAttribute('data-repeat-header', 'true');
    } else {
      propertiesTable.removeAttribute('data-repeat-header');
    }

    if (keepTogether) {
      propertiesTable.setAttribute('data-keep-together', 'true');
    } else {
      propertiesTable.removeAttribute('data-keep-together');
    }

    setIsTablePropertiesOpen(false);

    if (onContentChange && editorRef.current) {
      onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
    }
  };

  // Smart Selection Refs
  const wordPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const superLongPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const smartSelectionTriggeredRef = useRef(false);

  const isHeaderFooterMode = activeEditingArea === 'header' || activeEditingArea === 'footer';
  const isFirstPage = pageNumber === 1;
  const useDifferentFirstPage = config.differentFirstPage;

  const isContentEmpty = useMemo(() => {
    if (!content) return true;
    const stripped = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    const hasMedia = /<(img|table|math-field|hr|svg|iframe)/i.test(content);
    return stripped === '' && !hasMedia;
  }, [content]);

  const showEmptyState = pageNumber === 1 && totalPages === 1 && isContentEmpty && !isHeaderFooterMode && !readOnly;

  const handleStartWriting = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const handleInsertOutline = () => {
    const outlineHtml = `<h1>Project Proposal</h1><p>A concise overview of the background, target audience, and primary objectives of this document.</p><h2>1. Executive Summary</h2><p>Summary of key requirements, deliverables, and projected timelines.</p><h2>2. Objectives &amp; Scope</h2><p>Detailed outline of core milestones and anticipated achievements.</p><h2>3. Implementation Plan</h2><p>Step-by-step phased approach, resource allocation, and key deliverables.</p><h2>4. Conclusion &amp; Next Steps</h2><p>Action items and final sign-off criteria.</p>`;
    if (editorRef.current) {
      editorRef.current.innerHTML = outlineHtml;
      editorRef.current.focus();
    }
    if (onContentChange) {
      onContentChange(outlineHtml, pageNumber - 1, 'immediate');
    }
  };

  const handleOpenDocument = () => {
    window.dispatchEvent(new CustomEvent('prodoc:switchTab', { detail: RibbonTab.FILE }));
  };

  // Determine active header/footer content based on page number and config
  const activeHeaderContent = useDifferentFirstPage && isFirstPage ? firstHeaderContent : headerContent;
  const activeFooterContent = useDifferentFirstPage && isFirstPage ? firstFooterContent : footerContent;
  
  // Determine setter for header/footer
  const handleHeaderInput = (e: React.FormEvent<HTMLDivElement>) => {
    const val = e.currentTarget.innerHTML;
    if (useDifferentFirstPage && isFirstPage) {
      if (setFirstHeaderContent) setFirstHeaderContent(val);
    } else {
      if (setHeaderContent) setHeaderContent(val);
    }
  };

  const handleFooterInput = (e: React.FormEvent<HTMLDivElement>) => {
    const val = e.currentTarget.innerHTML;
    if (useDifferentFirstPage && isFirstPage) {
      if (setFirstFooterContent) setFirstFooterContent(val);
    } else {
      if (setFooterContent) setFooterContent(val);
    }
  };
  
  // Dimensions in Inches derived from exact physical paper definition
  const phys = getPhysicalDimensions(
    config.size as string,
    config.orientation,
    config.customWidth,
    config.customHeight
  );
  const widthIn = phys.widthInches;
  const heightIn = phys.heightInches;

  // Minimum body gap (approx 2 inches) used for safe header/footer max height calculation
  const MIN_BODY_GAP_IN = 2; 

  useMathLive(content, editorRef);

  // Listen for Equation Options dropdown (▼) clicks when this page is active
  useEffect(() => {
    if (!isActivePage) {
      setEquationMenu(null);
      return;
    }

    const handleOpenEquationMenu = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        wrapper?: HTMLElement;
        mathField?: MathFieldEl;
        rect?: DOMRect;
      } | undefined;
      if (!detail?.wrapper || !detail?.mathField || !editorRef.current?.contains(detail.wrapper)) return;

      const menuW = 240;
      const menuH = 310;
      const pad = 12;
      const rect = detail.rect || detail.wrapper.getBoundingClientRect();
      const x = Math.max(pad, Math.min(rect.left, window.innerWidth - menuW - pad));
      const y =
        rect.bottom + 6 + menuH > window.innerHeight - pad
          ? Math.max(pad, rect.top - menuH - 6)
          : rect.bottom + 6;

      setActiveElementType('equation');
      setSaveEqDraft(null);
      setEquationMenu({
        wrapper: detail.wrapper,
        mathField: detail.mathField,
        x,
        y,
      });
    };

    const handleDismiss = (e: Event) => {
      if (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Escape') return;
      if (
        e.type === 'mousedown' &&
        equationMenuRef.current &&
        equationMenuRef.current.contains(e.target as Node)
      ) {
        return;
      }
      setEquationMenu(null);
    };

    window.addEventListener('prodoc:equation-menu', handleOpenEquationMenu);
    document.addEventListener('mousedown', handleDismiss);
    window.addEventListener('keydown', handleDismiss);
    return () => {
      window.removeEventListener('prodoc:equation-menu', handleOpenEquationMenu);
      document.removeEventListener('mousedown', handleDismiss);
      window.removeEventListener('keydown', handleDismiss);
    };
  }, [isActivePage]);

  // --- Image & Table Click Handling ---
  const handleEditorClick = (e: React.MouseEvent) => {
    if (selectionMode) handleSmartClick(e);
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      setSelectedImage(target);
      e.stopPropagation();
    } else {
      setSelectedImage(null);
    }

    const table = target.closest('table') as HTMLTableElement | null;
    const clickedCell = target.closest('td, th') as HTMLTableCellElement | null;
    if (table) {
      setSelectedTable(table);
      if (clickedCell && e.shiftKey && lastSelectedCellRef.current && table.contains(lastSelectedCellRef.current)) {
        e.preventDefault();
        selectTableCellsRect(table, lastSelectedCellRef.current, clickedCell);
      } else if (clickedCell) {
        clearSelectedCellHighlights(editorRef.current || undefined);
        lastSelectedCellRef.current = clickedCell;
      }
    } else {
      setSelectedTable(null);
      clearSelectedCellHighlights(editorRef.current || undefined);
      lastSelectedCellRef.current = null;
    }
  };

  const handleImageUpdate = () => {
    if (editorRef.current && onContentChange) {
      onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
    }
  };

  const getCaretCharacterOffsetWithin = (element: HTMLElement) => {
    let caretOffset = 0;
    const doc = element.ownerDocument || document;
    const win = doc.defaultView || window;
    const sel = win.getSelection();
    if (sel && sel.rangeCount > 0) {
      try {
        const range = sel.getRangeAt(0);
        if (element.contains(range.startContainer)) {
          const preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(element);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          caretOffset = preCaretRange.toString().length;
        }
      } catch (_e) {
        // ignore
      }
    }
    return caretOffset;
  };

  const setCaretPosition = (element: HTMLElement, offset: number): boolean => {
    let charIndex = 0;
    const range = document.createRange();
    range.setStart(element, 0);
    range.collapse(true);
    const nodeStack: Node[] = [element];
    let node: Node | undefined;
    let found = false;

    while (!found && (node = nodeStack.pop())) {
      if (node.nodeType === 3) {
        const nextCharIndex = charIndex + (node.nodeValue || "").length;
        if (offset >= charIndex && offset <= nextCharIndex) {
          range.setStart(node, offset - charIndex);
          range.collapse(true);
          found = true;
        }
        charIndex = nextCharIndex;
      } else {
        let i = node.childNodes.length;
        while (i--) nodeStack.push(node.childNodes[i]);
      }
    }

    if (found) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
    return found;
  };

  // Clear stale selections on history restore
  useEffect(() => {
    setSelectedImage(null);
    setSelectedTable(null);
  }, [historyApplySeq]);

  // Sync content to editable div
  useLayoutEffect(() => {
    if (editorRef.current) {
      const activeEl = document.activeElement;
      const isMathFieldFocused = activeEl && activeEl.tagName.toLowerCase() === 'math-field' && editorRef.current.contains(activeEl);
      if (isMathFieldFocused) return;
      if (selectedImage && editorRef.current.contains(selectedImage)) return;

      if (editorRef.current.innerHTML !== content) {
        const isFocused = document.activeElement === editorRef.current || editorRef.current.contains(document.activeElement);
        let savedOffset = 0;
        if (isFocused) savedOffset = getCaretCharacterOffsetWithin(editorRef.current);

        editorRef.current.innerHTML = content;

        if (isFocused) {
          const newContentLength = getTextLength(editorRef.current);
          if (savedOffset <= newContentLength) {
            editorRef.current.focus();
            try {
              setCaretPosition(editorRef.current, savedOffset);
            } catch (_e) {
              /* ignore */
            }
          }
        }
      }
    }
  }, [content, pageNumber, totalPages, selectedImage, historyApplySeq]);

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
      
      // Only process if the selection is inside THIS page's editor
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
    
    // Also listen for focusin/focusout to catch math-field focus which might not trigger selectionchange
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
  }, [setActiveElementType]);

  // Sync Header
  useEffect(() => {
    if (headerRef.current) {
      const isFocused = document.activeElement === headerRef.current;
      if (!isFocused && headerRef.current.innerHTML !== activeHeaderContent) {
        headerRef.current.innerHTML = activeHeaderContent;
      }
    }
  }, [activeHeaderContent]);

  // Sync Footer
  useEffect(() => {
    if (footerRef.current) {
      const displayHtml = activeFooterContent
        .replace(/\[Page \d+\]/g, `[Page ${pageNumber}]`)
        .replace(/<span class="page-number-placeholder">\d+<\/span>/g, `<span class="page-number-placeholder">${pageNumber}</span>`);
      
      const isFocused = document.activeElement === footerRef.current;
      if (!isFocused && footerRef.current.innerHTML !== displayHtml) {
        footerRef.current.innerHTML = displayHtml;
      }
    }
  }, [activeFooterContent, pageNumber]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const isImmediate = e.currentTarget.dataset.commitImmediate === 'true';
    if (isImmediate) {
      delete e.currentTarget.dataset.commitImmediate;
    }
    const wrapper = e.currentTarget.parentElement;
    const isOverflowing =
      columnCount === 1 &&
      Boolean(wrapper) &&
      e.currentTarget.scrollHeight > (wrapper?.clientHeight || 0) - 4;
    if (onContentChange) {
      onContentChange(
        e.currentTarget.innerHTML,
        pageNumber - 1,
        isImmediate ? 'immediate' : 'debounced',
        { immediateRepaginate: isImmediate || isOverflowing }
      );
    }
  };

  const handleTableNavigation = (e: React.KeyboardEvent): boolean => {
    if (e.key !== 'Tab') return false;
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return false;
    let node: Node | null = sel.anchorNode;
    let cell: HTMLTableCellElement | null = null;
    while (node && node !== editorRef.current) {
      if (node.nodeName === 'TD' || node.nodeName === 'TH') {
        cell = node as HTMLTableCellElement;
        break;
      }
      node = node.parentNode;
    }
    if (!cell) return false;
    e.preventDefault();
    const row = cell.closest('tr') as HTMLTableRowElement | null;
    const table = row?.closest('table') as HTMLTableElement | null;
    if (!table || !row) return true;

    clearSelectedCellHighlights(table);
    const validRows = Array.from(table.rows).filter(
      (r) => r.getAttribute('data-repeated-header-row') !== 'true' && r.cells.length > 0
    );
    const currentRowIndex = validRows.indexOf(row);
    const rowCells = Array.from(row.cells);
    const currentCellIndex = rowCells.indexOf(cell);

    if (!e.shiftKey) {
      if (currentCellIndex >= 0 && currentCellIndex < rowCells.length - 1) {
        focusTableCellLikeWord(rowCells[currentCellIndex + 1]);
      } else if (currentRowIndex >= 0 && currentRowIndex < validRows.length - 1) {
        const nextRow = validRows[currentRowIndex + 1];
        if (nextRow.cells.length > 0) focusTableCellLikeWord(nextRow.cells[0]);
      } else if (table.getAttribute('data-split-bottom') === 'true' && pageNumber < totalPages) {
        const nextEditor = document.getElementById(`prodoc-editor-${pageNumber + 1}`);
        const contTable = nextEditor?.querySelector('table[data-continuation="true"]') as HTMLTableElement | null;
        const contRows = contTable
          ? Array.from(contTable.rows).filter((r) => r.getAttribute('data-repeated-header-row') !== 'true' && r.cells.length > 0)
          : [];
        if (contRows.length > 0 && contRows[0].cells.length > 0) {
          nextEditor?.focus();
          focusTableCellLikeWord(contRows[0].cells[0]);
        }
      } else {
        const newRow = insertTableRow(table, cell, 'below');
        if (newRow?.cells[0]) {
          focusTableCellLikeWord(newRow.cells[0]);
        }
        if (onContentChange && editorRef.current) {
          onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
        }
      }
    } else {
      if (currentCellIndex > 0) {
        focusTableCellLikeWord(rowCells[currentCellIndex - 1]);
      } else if (currentRowIndex > 0) {
        const prevRow = validRows[currentRowIndex - 1];
        if (prevRow.cells.length > 0) focusTableCellLikeWord(prevRow.cells[prevRow.cells.length - 1]);
      } else if (table.getAttribute('data-continuation') === 'true' && pageNumber > 1) {
        const prevEditor = document.getElementById(`prodoc-editor-${pageNumber - 1}`);
        const prevTables = prevEditor ? Array.from(prevEditor.querySelectorAll('table[data-split-bottom="true"]')) as HTMLTableElement[] : [];
        const splitTop = prevTables[prevTables.length - 1];
        const prevRows = splitTop
          ? Array.from(splitTop.rows).filter((r) => r.getAttribute('data-repeated-header-row') !== 'true' && r.cells.length > 0)
          : [];
        const lastPrevRow = prevRows[prevRows.length - 1];
        if (lastPrevRow && lastPrevRow.cells.length > 0) {
          prevEditor?.focus();
          focusTableCellLikeWord(lastPrevRow.cells[lastPrevRow.cells.length - 1]);
        }
      }
    }
    return true;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly) return;
    if (e.altKey && !e.ctrlKey && !e.metaKey && (e.key === '=' || e.code === 'Equal')) {
      e.preventDefault();
      insertEquationBox();
      return;
    }
    if (handleTableNavigation(e)) return;
    if (
      isKeyboardLocked &&
      !selectionMode &&
      !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key) &&
      !(e.ctrlKey || e.metaKey)
    ) {
      e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && !e.altKey) {
      if (e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
        return;
      }
      if (e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
        return;
      }
    }
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || !editorRef.current) return;
    const range = selection.getRangeAt(0);

    // Clear selected table cell contents on Backspace/Delete without removing table structure
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const anchorEl =
        range.anchorContainer instanceof Element
          ? range.anchorContainer
          : range.anchorContainer?.parentElement;
      const activeTable =
        (anchorEl?.closest('table') as HTMLTableElement | null) ||
        (editorRef.current.querySelector('table:has(.selectedCell)') as HTMLTableElement | null);
      if (activeTable) {
        const selectedCells = getSelectedTableCells(activeTable);
        if (selectedCells.length > 1) {
          e.preventDefault();
          selectedCells.forEach((c) => {
            c.innerHTML = '<br>';
          });
          clearSelectedCellHighlights(activeTable);
          focusTableCellLikeWord(selectedCells[0], false);
          if (onContentChange) {
            onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
          }
          return;
        }
      }
    }

    if (e.key === 'ArrowDown') {
      const anchorEl =
        range.anchorContainer instanceof Element
          ? range.anchorContainer
          : range.anchorContainer?.parentElement;
      const currentCell = anchorEl?.closest('td, th') as HTMLTableCellElement | null;
      const currentTable = currentCell?.closest('table') as HTMLTableElement | null;
      const currentRow = currentCell?.closest('tr') as HTMLTableRowElement | null;

      if (currentTable && currentRow && editorRef.current.contains(currentTable)) {
        const validRows = Array.from(currentTable.rows).filter(
          (r) => r.getAttribute('data-repeated-header-row') !== 'true' && r.cells.length > 0
        );
        const isLastValidRow = validRows[validRows.length - 1] === currentRow;
        if (
          isLastValidRow &&
          currentTable.getAttribute('data-split-bottom') === 'true' &&
          pageNumber < totalPages
        ) {
          const nextPage = document.getElementById(`prodoc-editor-${pageNumber + 1}`);
          const contTable = nextPage?.querySelector('table[data-continuation="true"]') as HTMLTableElement | null;
          const contRows = contTable
            ? Array.from(contTable.rows).filter(
                (r) => r.getAttribute('data-repeated-header-row') !== 'true' && r.cells.length > 0
              )
            : [];
          if (contRows.length > 0 && nextPage) {
            e.preventDefault();
            const colIdx = currentCell ? Array.from(currentRow.cells).indexOf(currentCell) : 0;
            const targetCell = contRows[0].cells[Math.min(Math.max(0, colIdx), contRows[0].cells.length - 1)];
            if (targetCell) {
              nextPage.focus();
              focusTableCellLikeWord(targetCell, false);
              targetCell.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
              return;
            }
          }
        }
        if (isLastValidRow && !currentTable.nextElementSibling && pageNumber === totalPages) {
          e.preventDefault();
          const p = document.createElement('p');
          p.innerHTML = '<br>';
          currentTable.after(p);
          const nextRange = document.createRange();
          nextRange.setStart(p, 0);
          nextRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(nextRange);
          if (onContentChange) {
            onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
          }
          return;
        }
      }

      const editorRect = editorRef.current.getBoundingClientRect();
      const rangeRect = range.getBoundingClientRect();
      const cursorBottom = rangeRect.bottom !== 0 ? rangeRect.bottom : editorRect.bottom;
      if (editorRect.bottom - cursorBottom < 40) {
        if (pageNumber < totalPages) {
          e.preventDefault();
          const nextPage = document.getElementById(`prodoc-editor-${pageNumber + 1}`);
          if (nextPage) {
            nextPage.focus();
            const firstBodyTable = nextPage.firstElementChild as HTMLElement | null;
            if (firstBodyTable?.tagName === 'TABLE') {
              const firstValidRow = Array.from((firstBodyTable as HTMLTableElement).rows).find(
                (r) => r.getAttribute('data-repeated-header-row') !== 'true' && r.cells.length > 0
              );
              if (firstValidRow?.cells[0]) {
                focusTableCellLikeWord(firstValidRow.cells[0], false);
                return;
              }
            }
            const r = document.createRange();
            r.selectNodeContents(nextPage);
            r.collapse(true);
            selection.removeAllRanges();
            selection.addRange(r);
            nextPage.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
          }
        }
      }
    }
    if (e.key === 'ArrowUp') {
      const anchorEl =
        range.anchorContainer instanceof Element
          ? range.anchorContainer
          : range.anchorContainer?.parentElement;
      const currentCell = anchorEl?.closest('td, th') as HTMLTableCellElement | null;
      const currentTable = currentCell?.closest('table') as HTMLTableElement | null;
      const currentRow = currentCell?.closest('tr') as HTMLTableRowElement | null;

      if (
        currentTable &&
        currentRow &&
        currentTable.getAttribute('data-continuation') === 'true' &&
        pageNumber > 1 &&
        editorRef.current.contains(currentTable)
      ) {
        const validRows = Array.from(currentTable.rows).filter(
          (r) => r.getAttribute('data-repeated-header-row') !== 'true' && r.cells.length > 0
        );
        if (validRows[0] === currentRow) {
          const prevPage = document.getElementById(`prodoc-editor-${pageNumber - 1}`);
          const prevTables = prevPage
            ? (Array.from(prevPage.querySelectorAll('table[data-split-bottom="true"]')) as HTMLTableElement[])
            : [];
          const splitTop = prevTables[prevTables.length - 1];
          const prevRows = splitTop
            ? Array.from(splitTop.rows).filter(
                (r) => r.getAttribute('data-repeated-header-row') !== 'true' && r.cells.length > 0
              )
            : [];
          const lastPrevRow = prevRows[prevRows.length - 1];
          if (lastPrevRow && prevPage) {
            e.preventDefault();
            const colIdx = currentCell ? Array.from(currentRow.cells).indexOf(currentCell) : 0;
            const targetCell = lastPrevRow.cells[Math.min(Math.max(0, colIdx), lastPrevRow.cells.length - 1)];
            if (targetCell) {
              prevPage.focus();
              focusTableCellLikeWord(targetCell, false);
              targetCell.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
              return;
            }
          }
        }
      }

      const editorRect = editorRef.current.getBoundingClientRect();
      const rangeRect = range.getBoundingClientRect();
      const cursorTop = rangeRect.top !== 0 ? rangeRect.top : editorRect.top;
      if (cursorTop - editorRect.top < 40) {
        if (pageNumber > 1) {
          e.preventDefault();
          const prevPage = document.getElementById(`prodoc-editor-${pageNumber - 1}`);
          if (prevPage) {
            prevPage.focus();
            const r = document.createRange();
            r.selectNodeContents(prevPage);
            r.collapse(false);
            selection.removeAllRanges();
            selection.addRange(r);
            prevPage.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
          }
        }
      }
    }
  };

  const selectWord = () => {
    const sel = window.getSelection();
    if (sel?.modify) {
      sel.modify('move', 'backward', 'word');
      sel.modify('extend', 'forward', 'word');
    }
  };
  const selectSentence = () => {
    const sel = window.getSelection();
    if (sel?.modify) {
      try {
        sel.modify('move', 'backward', 'sentence');
        sel.modify('extend', 'forward', 'sentence');
      } catch (e) {
        sel.modify('move', 'backward', 'line');
        sel.modify('extend', 'forward', 'line');
      }
    }
  };
  const selectParagraph = (target: EventTarget | null) => {
    const sel = window.getSelection();
    if (!sel) return;
    let node = target as Node | null;
    if (node?.nodeType === Node.TEXT_NODE) node = node.parentNode;
    while (node && node !== editorRef.current && (node as HTMLElement).tagName) {
      const el = node as HTMLElement;
      if (['P', 'H1', 'H2', 'H3', 'LI', 'DIV'].includes(el.tagName)) {
        const range = document.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
        return;
      }
      node = node.parentNode;
    }
    if (sel.modify) {
      sel.modify('move', 'backward', 'paragraph');
      sel.modify('extend', 'forward', 'paragraph');
    }
  };
  const selectPage = () => {
    if (editorRef.current) {
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
  };

  const handleSmartPointerDown = (e: React.PointerEvent) => {
    if (!selectionMode) return;
    smartSelectionTriggeredRef.current = false;
    if (!isHeaderFooterMode && document.caretRangeFromPoint) {
      const range = document.caretRangeFromPoint(e.clientX, e.clientY);
      if (range && editorRef.current?.contains(range.startContainer)) {
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
    }
    pointerStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    if (wordPressTimerRef.current) clearTimeout(wordPressTimerRef.current);
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    if (superLongPressTimerRef.current) clearTimeout(superLongPressTimerRef.current);
    const target = e.target as HTMLElement;
    
    // Check if we tapped on a table cell for mobile context menu
    const cell = target.closest('td, th') as HTMLTableCellElement | null;
    const table = target.closest('table') as HTMLTableElement | null;

    if (cell && table && e.pointerType !== 'mouse') {
      longPressTimerRef.current = setTimeout(() => {
        // Trigger table context menu on mobile long press
        const mockEvent = {
          preventDefault: () => {},
          clientX: e.clientX,
          clientY: e.clientY,
          target: e.target
        } as unknown as React.MouseEvent<HTMLDivElement>;
        handleContextMenu(mockEvent);
        smartSelectionTriggeredRef.current = true;
        if (navigator.vibrate) navigator.vibrate(300);
      }, 500);
      return;
    }

    wordPressTimerRef.current = setTimeout(() => {
      selectWord();
      smartSelectionTriggeredRef.current = true;
      if (navigator.vibrate) navigator.vibrate(20);
    }, 1000);
    longPressTimerRef.current = setTimeout(() => {
      selectParagraph(target);
      smartSelectionTriggeredRef.current = true;
      if (navigator.vibrate) navigator.vibrate(300);
    }, 2000);
    superLongPressTimerRef.current = setTimeout(() => {
      selectPage();
      smartSelectionTriggeredRef.current = true;
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    }, 3000);
  };

  const handleSmartPointerMove = (e: React.PointerEvent) => {
    if (!selectionMode || !pointerStartRef.current) return;
    if (Math.hypot(e.clientX - pointerStartRef.current.x, e.clientY - pointerStartRef.current.y) > 10) {
      if (wordPressTimerRef.current) clearTimeout(wordPressTimerRef.current);
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      if (superLongPressTimerRef.current) clearTimeout(superLongPressTimerRef.current);
      pointerStartRef.current = null;
    }
  };

  const handleSmartPointerUp = () => {
    if (!selectionMode) return;
    if (wordPressTimerRef.current) clearTimeout(wordPressTimerRef.current);
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    if (superLongPressTimerRef.current) clearTimeout(superLongPressTimerRef.current);
    pointerStartRef.current = null;
  };

  const handleEditorPointerUp = () => {
    handleSmartPointerUp();
    if (formatPainterStyles) {
      applyFormatPainterToSelection();
    }
  };

  const handleSmartClick = (e: React.MouseEvent) => {
    if (!selectionMode) return;
    if (smartSelectionTriggeredRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (e.detail === 2) {
      selectSentence();
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handlePageClick = (e: React.MouseEvent) => {
    if (e.target !== selectedImage) setSelectedImage(null);
    if (!(e.target as HTMLElement).closest('table')) setSelectedTable(null);
    if (selectionMode) return;
    if (isHeaderFooterMode) {
      if (setActiveEditingArea) setActiveEditingArea('body');
      if (editorRef.current) {
        editorRef.current.focus();
      }
      return;
    }
    if (editorRef.current && !editorRef.current.contains(e.target as Node)) {
      editorRef.current.focus();
      const rect = editorRef.current.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      range.collapse(e.clientY > rect.bottom ? false : true);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
  };


  const getMarginsInches = () => {
    const m = config.margins;
    let top = m.top;
    const bottom = m.bottom;
    let left = m.left;
    let right = m.right;
    const gutter = m.gutter || 0;
    const isMirroredOrBookFold = ['mirrorMargins', 'bookFold'].includes(config.multiplePages || '');
    if (isMirroredOrBookFold) {
      const inside = m.left;
      const outside = m.right;
      const isOdd = pageNumber % 2 !== 0; 
      if (isOdd) {
        left = inside + (config.gutterPosition === 'left' ? gutter : 0);
        right = outside;
      } else {
        left = outside;
        right = inside + (config.gutterPosition === 'left' ? gutter : 0);
      }
    } else {
      if (config.gutterPosition === 'top') top += gutter;
      else left += gutter;
    }
    return { top, right, bottom, left };
  };
  const margins = getMarginsInches();

  const defaultHeaderDist = config.headerDistance || 0.5;
  const effectiveHeaderDist = Math.min(defaultHeaderDist, margins.top / 2);

  const defaultFooterDist = config.footerDistance || 0.5;
  const effectiveFooterDist = Math.min(defaultFooterDist, margins.bottom / 2);

  const getBackgroundStyle = (): React.CSSProperties => {
    const baseColor = config.pageColor || defaultPaperBg;
    const base: React.CSSProperties = { backgroundColor: baseColor };
    const gridColor = isDarkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0';
    if (config.background === 'ruled') {
      return { ...base, backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px)`, backgroundSize: '100% 0.33in' };
    } else if (config.background === 'grid') {
      return { ...base, backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, backgroundSize: '0.2in 0.2in' };
    }
    return base;
  };

  const getVerticalAlignStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = { display: 'flex', flexDirection: 'column' };
    let justifyContent: 'center' | 'flex-end' | 'space-between' | 'flex-start' = 'flex-start';
    if (config.verticalAlign === 'center') justifyContent = 'center';
    else if (config.verticalAlign === 'bottom') justifyContent = 'flex-end';
    else if (config.verticalAlign === 'justify') justifyContent = 'space-between';
    return { ...style, justifyContent };
  };

  const onHeaderDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setActiveEditingArea && !isKeyboardLocked && !selectionMode) {
      setActiveEditingArea('header');
      setTimeout(() => {
        if (headerRef.current) {
          headerRef.current.focus();
          document.execCommand('selectAll', false, '');
        }
      }, 10);
    }
  };

  const onFooterDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setActiveEditingArea && !isKeyboardLocked && !selectionMode) {
      setActiveEditingArea('footer');
      setTimeout(() => {
        if (footerRef.current) {
          footerRef.current.focus();
          document.execCommand('selectAll', false, '');
        }
      }, 10);
    }
  };

  const exitHeaderFooterToBody = useCallback((clientX?: number, clientY?: number) => {
    if (activeEditingArea !== 'body' && setActiveEditingArea && !isKeyboardLocked && !selectionMode) {
      setActiveEditingArea('body');
      requestAnimationFrame(() => {
        if (editorRef.current) {
          editorRef.current.focus();
          if (clientX !== undefined && clientY !== undefined && document.caretRangeFromPoint) {
            const range = document.caretRangeFromPoint(clientX, clientY);
            if (range && editorRef.current.contains(range.startContainer)) {
              const sel = window.getSelection();
              sel?.removeAllRanges();
              sel?.addRange(range);
              return;
            }
          }
          const sel = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
      });
    }
  }, [activeEditingArea, setActiveEditingArea, isKeyboardLocked, selectionMode]);

  useEffect(() => {
    if (!isHeaderFooterMode) return;
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        exitHeaderFooterToBody();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isHeaderFooterMode, exitHeaderFooterToBody]);

  const onBodyDoubleClick = (e: React.MouseEvent) => {
    if (activeEditingArea !== 'body' && setActiveEditingArea && !isKeyboardLocked && !selectionMode) {
      e.stopPropagation();
      exitHeaderFooterToBody(e.clientX, e.clientY);
    }
  };

  const safeMaxHeaderHeight = (heightIn - MIN_BODY_GAP_IN) / 2;
  const safeMaxFooterHeight = (heightIn - MIN_BODY_GAP_IN) / 2;
  const isBodyEditable = !readOnly && !isKeyboardLocked && !isGestureLocked && !selectionMode; 
  const isHeaderFooterEditable = isHeaderFooterMode && !readOnly && !isKeyboardLocked && !isGestureLocked && !selectionMode;
  let cursorStyle = 'cursor-text';
  if (selectionMode || formatPainterStyles) cursorStyle = 'cursor-crosshair';
  else if (isKeyboardLocked || isGestureLocked) cursorStyle = 'cursor-default';

  const columnCount = config.columns || 1;
  const bodyHeightIn = Math.max(1, heightIn - margins.top - margins.bottom);

  const [lineNumberRows, setLineNumberRows] = useState<{ topPx: number; num: number; visible: boolean }[]>([]);
  const lineNumbersEnabled = Boolean(config.lineNumbers?.enabled);
  const lineStartAt = Math.max(1, config.lineNumbers?.startAt ?? 1);
  const lineCountBy = Math.max(1, config.lineNumbers?.countBy ?? 1);
  const lineRestartEachPage = config.lineNumbers?.restartEachPage ?? true;

  useLayoutEffect(() => {
    if (!lineNumbersEnabled || !editorRef.current) {
      setLineNumberRows([]);
      return;
    }
    const ed = editorRef.current;
    const edRect = ed.getBoundingClientRect();
    const safeScale = scale || 1;
    const startNumber = lineRestartEachPage
      ? lineStartAt
      : lineStartAt + (pageNumber - 1) * 40;

    const rows: { topPx: number; num: number; visible: boolean }[] = [];
    const blocks = Array.from(
      ed.querySelectorAll<HTMLElement>('p, h1, h2, h3, h4, h5, h6, li, blockquote, pre')
    );

    let lineIdx = 0;
    const pushLine = (screenTop: number) => {
      const topPx = (screenTop - edRect.top) / safeScale;
      const num = startNumber + lineIdx;
      rows.push({
        topPx,
        num,
        visible: lineIdx % lineCountBy === 0,
      });
      lineIdx++;
    };

    for (const block of blocks) {
      if (
        block.classList.contains('prodoc-page-break') ||
        block.classList.contains('prodoc-column-break') ||
        block.classList.contains('prodoc-section-break')
      ) {
        continue;
      }
      const bRect = block.getBoundingClientRect();
      if (bRect.height <= 0) continue;

      let lineTops: number[] = [];
      try {
        const range = document.createRange();
        range.selectNodeContents(block);
        const rects = Array.from(range.getClientRects()).filter((r) => r.height > 2 && r.width > 0.5);
        for (const r of rects) {
          const lastTop = lineTops[lineTops.length - 1];
          if (lastTop === undefined || Math.abs(r.top - lastTop) > 4 * safeScale) {
            lineTops.push(r.top);
          }
        }
      } catch {
        lineTops = [];
      }

      if (lineTops.length === 0) {
        pushLine(bRect.top);
      } else {
        for (const t of lineTops) {
          pushLine(t);
        }
      }
    }

    setLineNumberRows(rows);
  }, [
    lineNumbersEnabled,
    lineStartAt,
    lineCountBy,
    lineRestartEachPage,
    pageNumber,
    content,
    scale,
    margins.left,
    margins.right,
    margins.top,
    margins.bottom,
    columnCount,
    config.size,
    config.orientation,
  ]);

  const pageBorder = config.pageBorder;
  const hasPageBorder = Boolean(pageBorder && pageBorder.style !== 'none');
  const pageBorderSides = pageBorder?.sides || { top: true, right: true, bottom: true, left: true };
  const pageBorderMarginPt = pageBorder?.marginPt ?? 24;
  const pageBorderWidthPt =
    pageBorder?.lineStyle === 'double'
      ? Math.max(3, pageBorder?.widthPt || 1)
      : Math.max(0.5, pageBorder?.widthPt || 1);
  const pageBorderLineStyle = pageBorder?.lineStyle || 'solid';
  const pageBorderColor = pageBorder?.color || '#1e293b';
  const lineNumberDistIn = Math.min(
    config.lineNumbers?.distanceFromText ?? 0.25,
    Math.max(0.1, margins.left - 0.15)
  );


  return (
    <div 
      ref={containerRef}
      className="prodoc-page-container relative group mx-auto origin-top"
      style={{ width: `${widthIn * scale}in`, height: `${heightIn * scale}in` }}
    >
      <div 
        className={`prodoc-page-sheet absolute top-0 left-0 overflow-clip ${cursorStyle} ${selectionMode ? 'smart-selection-active' : ''}`}
        style={{
          zoom: scale,
          width: `${widthIn}in`,
          height: `${heightIn}in`,
          boxShadow: isDarkMode 
            ? '0 10px 30px -5px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)' 
            : '0 4px 24px -2px rgba(15,23,42,0.09), 0 2px 6px -1px rgba(15,23,42,0.04), 0 0 0 1px rgba(15,23,42,0.06)',
          paddingTop: `${margins.top}in`,
          paddingBottom: `${margins.bottom}in`,
          paddingLeft: `${margins.left}in`,
          paddingRight: `${margins.right}in`,
          boxSizing: 'border-box',
          ...getBackgroundStyle(),
        }}
        onMouseDown={handlePageClick}
      >
        {/* Header Area */}
        <div 
          className={`absolute left-0 right-0 z-30 ${isHeaderFooterMode ? 'z-50' : ''}`}
          style={{
            top: 0,
            height: `${margins.top}in`,
            maxHeight: `${safeMaxHeaderHeight}in`,
            paddingTop: `${effectiveHeaderDist}in`,
            paddingLeft: `${margins.left}in`,
            paddingRight: `${margins.right}in`,
          }}
          onDoubleClick={onHeaderDoubleClick}
          onMouseDown={(e) => e.stopPropagation()} 
        >
          <div className={`w-full h-full relative ${isHeaderFooterMode ? 'border-b-2 border-dashed border-indigo-500 print:border-none' : isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/50'}`}>
            {isHeaderFooterMode && (
              <div className="header-footer-label bg-indigo-600 text-white print:hidden" style={{ left: 0, bottom: -2, transform: 'translateY(100%)' }}>
                {isFirstPage && useDifferentFirstPage ? "First Page Header" : "Header"}
              </div>
            )}
            <div 
              ref={headerRef}
              className={`prodoc-header w-full min-h-full outline-none ${isHeaderFooterEditable ? 'cursor-text pointer-events-auto' : 'cursor-default pointer-events-none'}`}
              contentEditable={isHeaderFooterEditable}
              inputMode={isKeyboardLocked || isGestureLocked || selectionMode ? "none" : "text"}
              suppressContentEditableWarning
              onInput={handleHeaderInput}
              onFocus={() => setActiveEditingArea && setActiveEditingArea('header')}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault();
                  exitHeaderFooterToBody();
                }
              }}
              style={{ minHeight: '1em', color: config.pageColor ? '#000000' : defaultPaperInk }}
            />
          </div>
        </div>

        {config.watermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-clip z-0">
            <div className="transform -rotate-45 font-bold text-[8rem] whitespace-nowrap select-none" style={{ color: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
              {config.watermark}
            </div>
          </div>
        )}

        {hasPageBorder && (
          <div
            className="prodoc-page-border-frame pointer-events-none absolute z-20"
            style={{
              top: `${pageBorderMarginPt}pt`,
              right: `${pageBorderMarginPt}pt`,
              bottom: `${pageBorderMarginPt}pt`,
              left: `${pageBorderMarginPt}pt`,
              borderTop: pageBorderSides.top ? `${pageBorderWidthPt}pt ${pageBorderLineStyle} ${pageBorderColor}` : 'none',
              borderRight: pageBorderSides.right ? `${pageBorderWidthPt}pt ${pageBorderLineStyle} ${pageBorderColor}` : 'none',
              borderBottom: pageBorderSides.bottom ? `${pageBorderWidthPt}pt ${pageBorderLineStyle} ${pageBorderColor}` : 'none',
              borderLeft: pageBorderSides.left ? `${pageBorderWidthPt}pt ${pageBorderLineStyle} ${pageBorderColor}` : 'none',
              boxShadow:
                pageBorder?.style === 'shadow'
                  ? `3pt 3pt 0 0 ${pageBorderColor}55`
                  : pageBorder?.style === '3d'
                  ? 'inset 1.5pt 1.5pt 0 rgba(255,255,255,0.65), inset -1.5pt -1.5pt 0 rgba(15,23,42,0.28)'
                  : undefined,
            }}
          />
        )}

        {lineNumbersEnabled && lineNumberRows.length > 0 && (
          <div
            className="prodoc-line-numbers pointer-events-none select-none absolute z-20"
            style={{
              top: `${margins.top}in`,
              left: 0,
              width: `calc(${margins.left}in - ${lineNumberDistIn}in)`,
              height: `${bodyHeightIn}in`,
            }}
            aria-hidden="true"
          >
            {lineNumberRows.map(
              (row) =>
                row.visible && (
                  <span
                    key={row.num}
                    className="absolute right-0 text-[8.5pt] leading-none font-mono text-slate-400 dark:text-slate-500"
                    style={{ top: `${row.topPx + 2}px` }}
                  >
                    {row.num}
                  </span>
                )
            )}
          </div>
        )}

        {/* Body */}
        <div 
          className={`relative w-full h-full overflow-clip transition-opacity duration-300 ${isHeaderFooterMode ? 'opacity-60 cursor-pointer' : 'opacity-100'}`}
          style={{ ...getVerticalAlignStyle() }}
          onDoubleClick={onBodyDoubleClick}
          onMouseDown={(e) => {
            if (isHeaderFooterMode) {
              e.stopPropagation();
              exitHeaderFooterToBody(e.clientX, e.clientY);
            } else {
              e.stopPropagation();
            }
          }}
          onClick={(e) => {
            if (isHeaderFooterMode) {
              e.stopPropagation();
              exitHeaderFooterToBody(e.clientX, e.clientY);
            }
          }}
        >
          <div
            id={`prodoc-editor-${pageNumber}`}
            ref={(el) => {
              editorRef.current = el;
              if (el && el !== editorElement) {
                setEditorElement(el);
              }
            }}
            className={`prodoc-editor w-full outline-none break-words z-10 ${showFormattingMarks ? 'show-formatting-marks' : ''} ${isHeaderFooterMode || isGestureLocked ? 'pointer-events-none select-none' : ''}`}
            contentEditable={!isHeaderFooterMode && isBodyEditable}

            inputMode={isKeyboardLocked || isGestureLocked || selectionMode ? "none" : "text"}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            onClick={handleEditorClick}
            onContextMenu={handleContextMenu}
            onPointerDown={handleSmartPointerDown}
            onPointerMove={handleSmartPointerMove}
            onPointerUp={handleEditorPointerUp}
            onPointerCancel={handleSmartPointerUp}
            suppressContentEditableWarning={true}
            style={{ 
              fontFamily: 'Calibri, Inter, sans-serif', 
              fontSize: '11pt',
              lineHeight: '1.35',
              color: config.pageColor ? '#000000' : defaultPaperInk, 
              flex: config.verticalAlign === 'justify' ? '1 1 auto' : undefined, 
              minHeight: columnCount > 1 ? undefined : '100%',
              height: columnCount > 1 ? `${bodyHeightIn}in` : undefined,
              maxHeight: columnCount > 1 ? `${bodyHeightIn}in` : undefined,
              columnCount,
              columnGap: `${config.columnGap || 0.5}in`,
              columnFill: 'auto',
              hyphens: config.hyphenation ? 'auto' : 'none',
              WebkitHyphens: config.hyphenation ? 'auto' : 'none',
            }}
          />
          {showEmptyState && (
            <EditorEmptyState
              onStartWriting={handleStartWriting}
              onInsertOutline={handleInsertOutline}
              onOpenDocument={handleOpenDocument}
            />
          )}
          {selectedImage && editorElement && (
            <ResizerOverlay target={selectedImage} container={editorElement} scale={scale} onUpdate={handleImageUpdate} onClear={() => setSelectedImage(null)} />
          )}
          {!isTableResizerEnabled && editorElement && tables.map((t, i) => (
            <TableResizerOverlay key={`table-resizer-${i}`} target={t} container={editorElement} scale={scale} onUpdate={handleImageUpdate} />
          ))}

          {/* Footnotes Section at Bottom of Body */}
          {pageFootnotes && pageFootnotes.length > 0 && (
            <div className="mt-auto pt-2 border-t border-slate-300 select-none z-20 print:border-slate-400 w-full" contentEditable={false}>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Footnotes</div>
              <div className="space-y-1">
                {pageFootnotes.map((fn, idx) => (
                  <div key={fn.id} className="text-xs flex items-start gap-1.5 group/fn py-0.5">
                    <span className="font-bold text-indigo-600 shrink-0 select-none bg-indigo-50 dark:bg-indigo-950/40 px-1 rounded text-[10px]">
                      {idx + 1}
                    </span>
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateFootnote(fn.id, e.currentTarget.textContent || '')}
                      className="flex-1 outline-none focus:bg-indigo-50/50 dark:focus:bg-indigo-900/10 rounded px-1 min-h-[1.2em] transition-colors cursor-text text-slate-800 dark:text-slate-200"
                    >
                      {fn.content}
                    </div>
                    <button
                      onClick={() => removeFootnote(fn.id)}
                      className="opacity-0 group-hover/fn:opacity-100 text-rose-500 hover:text-rose-700 p-0.5 rounded transition-all text-[10px] uppercase font-bold shrink-0 self-center cursor-pointer"
                      title="Delete footnote"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Endnotes Section at Bottom of Last Page */}
          {isLastPage && endnotes && endnotes.length > 0 && (
            <div className="mt-4 pt-3 border-t-2 border-double border-slate-400 select-none z-20 w-full" contentEditable={false}>
              <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wider">Endnotes</div>
              <div className="space-y-1">
                {endnotes.map((en, idx) => (
                  <div key={en.id} className="text-xs flex items-start gap-1.5 group/en py-0.5">
                    <span className="font-bold text-emerald-600 shrink-0 select-none bg-emerald-50 dark:bg-emerald-950/40 px-1 rounded text-[10px]">
                      {String.fromCharCode(idx + 97)}
                    </span>
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateEndnote(en.id, e.currentTarget.textContent || '')}
                      className="flex-1 outline-none focus:bg-emerald-50/50 dark:focus:bg-emerald-900/10 rounded px-1 min-h-[1.2em] transition-colors cursor-text text-slate-800 dark:text-slate-200"
                    >
                      {en.content}
                    </div>
                    <button
                      onClick={() => removeEndnote(en.id)}
                      className="opacity-0 group-hover/en:opacity-100 text-rose-500 hover:text-rose-700 p-0.5 rounded transition-all text-[10px] uppercase font-bold shrink-0 self-center cursor-pointer"
                      title="Delete endnote"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Area */}
        <div 
          className={`absolute left-0 right-0 z-30 ${isHeaderFooterMode ? 'z-50' : ''}`}
          style={{
            bottom: 0,
            height: `${margins.bottom}in`,
            maxHeight: `${safeMaxFooterHeight}in`,
            paddingBottom: `${effectiveFooterDist}in`,
            paddingLeft: `${margins.left}in`,
            paddingRight: `${margins.right}in`,
          }}
          onDoubleClick={onFooterDoubleClick}
          onMouseDown={(e) => e.stopPropagation()} 
        >
          <div className={`w-full h-full relative flex flex-col justify-end ${isHeaderFooterMode ? 'border-t-2 border-dashed border-indigo-500 print:border-none' : 'hover:bg-slate-50/50'}`}>
            {isHeaderFooterMode && (
              <div className="header-footer-label footer-tag bg-indigo-600 text-white print:hidden" style={{ left: 0, top: -2, transform: 'translateY(-100%)' }}>
                {isFirstPage && useDifferentFirstPage ? "First Page Footer" : "Footer"}
              </div>
            )}
            <div 
              ref={footerRef}
              className={`prodoc-footer w-full min-h-full outline-none ${isHeaderFooterEditable ? 'cursor-text pointer-events-auto' : 'cursor-default pointer-events-none'}`}
              contentEditable={isHeaderFooterEditable}
              inputMode={isKeyboardLocked || isGestureLocked || selectionMode ? "none" : "text"}
              suppressContentEditableWarning
              onInput={handleFooterInput}
              onFocus={() => setActiveEditingArea && setActiveEditingArea('footer')}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault();
                  exitHeaderFooterToBody();
                }
              }}
              style={{ minHeight: '1em', color: config.pageColor ? '#000000' : defaultPaperInk }}

            />
          </div>
        </div>
      </div>
      
      {/* Context Menu Overlay & Modals (Mounted only for active page) */}
      {isActivePage && (
        <>
          <TableContextMenu
            visible={contextMenu.visible}
            x={contextMenu.x}
            y={contextMenu.y}
            cell={contextMenu.cell}
            table={contextMenu.table}
            contextMenuRef={contextMenuRef}
            onClose={() => setContextMenu((prev) => ({ ...prev, visible: false }))}
            onAction={handleContextAction}
            onKeyDown={handleMenuKeyDown}
          />

          {/* Beautiful Table Properties Dialog Modal */}
          <TablePropertiesModal
            isOpen={isTablePropertiesOpen}
            onClose={() => setIsTablePropertiesOpen(false)}
            propertiesTable={propertiesTable}
            applyProperties={applyProperties}
            tableWidth={tableWidth}
            setTableWidth={setTableWidth}
            tableAlign={tableAlign}
            setTableAlign={setTableAlign}
            textWrapping={textWrapping}
            setTextWrapping={setTextWrapping}
            customCellPadding={customCellPadding}
            setCustomCellPadding={setCustomCellPadding}
            cellPadding={cellPadding}
            setCellPadding={setCellPadding}
            padTopBottom={padTopBottom}
            setPadTopBottom={setPadTopBottom}
            padLeftRight={padLeftRight}
            setPadLeftRight={setPadLeftRight}
            verticalAlign={verticalAlign}
            setVerticalAlign={setVerticalAlign}
            specifyRowHeight={specifyRowHeight}
            setSpecifyRowHeight={setSpecifyRowHeight}
            rowHeightVal={rowHeightVal}
            setRowHeightVal={setRowHeightVal}
            rowHeightMode={rowHeightMode}
            setRowHeightMode={setRowHeightMode}
            specifyColWidth={specifyColWidth}
            setSpecifyColWidth={setSpecifyColWidth}
            colWidthVal={colWidthVal}
            setColWidthVal={setColWidthVal}
            colWidthUnit={colWidthUnit}
            setColWidthUnit={setColWidthUnit}
            headerColor={headerColor}
            setHeaderColor={setHeaderColor}
            borderColor={borderColor}
            setBorderColor={setBorderColor}
            borderWidth={borderWidth}
            setBorderWidth={setBorderWidth}
            zebraStriping={zebraStriping}
            setZebraStriping={setZebraStriping}
            cantSplit={cantSplit}
            setCantSplit={setCantSplit}
            repeatHeader={repeatHeader}
            setRepeatHeader={setRepeatHeader}
            keepTogether={keepTogether}
            setKeepTogether={setKeepTogether}
          />

          {/* Beautiful Table Column Sort Modal */}
          <SortModal
            isOpen={isSortModalOpen}
            sortColIndex={sortColIndex}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            sortExcludeHeader={sortExcludeHeader}
            setSortExcludeHeader={setSortExcludeHeader}
            sortType={sortType}
            setSortType={setSortType}
            onClose={() => setIsSortModalOpen(false)}
            onApply={applySortColumn}
          />

          {/* Floating Equation Options Popover (triggered by ▼ handle) */}
          {equationMenu && createPortal(
            <div
              ref={equationMenuRef}
              className="fixed z-[9999] w-60 max-w-[calc(100vw-16px)] max-h-[calc(100dvh-16px)] overflow-y-auto rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl py-1.5 text-xs text-slate-700 dark:text-slate-200 print:hidden overscroll-contain"
              style={{
                left: Math.max(8, Math.min(equationMenu.x, (typeof window !== 'undefined' ? window.innerWidth : 1024) - 248)),
                top: Math.max(8, Math.min(equationMenu.y, (typeof window !== 'undefined' ? window.innerHeight : 768) - 280)),
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Equation Options
              </div>
              {saveEqDraft ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const raw = equationMenu.mathField.value ?? equationMenu.mathField.getAttribute('value') ?? '';
                    saveCustomEquation(saveEqDraft.title, raw);
                    setSaveEqDraft(null);
                    setEquationMenu(null);
                  }}
                  className="p-2.5 space-y-2"
                >
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                    Save as New Equation
                  </label>
                  <input
                    type="text"
                    value={saveEqDraft.title}
                    onChange={(e) => setSaveEqDraft({ title: e.target.value })}
                    placeholder="Equation name"
                    autoFocus
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSaveEqDraft(null)}
                      className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      const isBlock = equationMenu.wrapper.getAttribute('data-display') === 'block';
                      const next = isBlock ? 'inline' : 'block';
                      equationMenu.wrapper.setAttribute('data-display', next);
                      if (next === 'block' && !equationMenu.wrapper.getAttribute('data-justification')) {
                        equationMenu.wrapper.setAttribute('data-justification', 'center');
                      } else if (next === 'inline') {
                        equationMenu.wrapper.removeAttribute('data-justification');
                      }
                      if (onContentChange && editorRef.current) {
                        onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
                      }
                      setEquationMenu(null);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 flex items-center justify-between transition-colors"
                  >
                    <span>
                      {equationMenu.wrapper.getAttribute('data-display') === 'block'
                        ? 'Change to Inline'
                        : 'Change to Display'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {equationMenu.wrapper.getAttribute('data-display') === 'block' ? 'Inline' : 'Block'}
                    </span>
                  </button>
                  <div className="px-3 py-1.5 flex items-center justify-between gap-2 border-y border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Justification</span>
                    <div className="flex items-center gap-1">
                      {(['left', 'center', 'right'] as EquationJustification[]).map((just) => {
                        const isBlock = equationMenu.wrapper.getAttribute('data-display') === 'block';
                        const currentJust = equationMenu.wrapper.getAttribute('data-justification') || 'center';
                        const active = isBlock && currentJust === just;
                        return (
                          <button
                            key={just}
                            type="button"
                            onClick={() => {
                              equationMenu.wrapper.setAttribute('data-display', 'block');
                              equationMenu.wrapper.setAttribute('data-justification', just);
                              if (onContentChange && editorRef.current) {
                                onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
                              }
                              setEquationMenu(null);
                            }}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-medium capitalize transition-colors ${
                              active
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                            }`}
                          >
                            {just}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const raw = equationMenu.mathField.value ?? equationMenu.mathField.getAttribute('value') ?? '';
                      setSaveEqDraft({ title: latexToLinearUnicode(raw).slice(0, 32) || 'Custom Equation' });
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                  >
                    Save as New Equation...
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const raw = equationMenu.mathField.value ?? equationMenu.mathField.getAttribute('value') ?? '';
                      navigator.clipboard?.writeText(raw).catch(() => {});
                      setEquationMenu(null);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                  >
                    Copy LaTeX Source
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const raw = equationMenu.mathField.value ?? equationMenu.mathField.getAttribute('value') ?? '';
                      navigator.clipboard?.writeText(latexToLinearUnicode(raw)).catch(() => {});
                      setEquationMenu(null);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                  >
                    Copy Linear Text
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const raw = equationMenu.mathField.value ?? equationMenu.mathField.getAttribute('value') ?? '';
                      const span = document.createElement('span');
                      span.className = 'prodoc-linear-eq';
                      span.dataset.rawLatex = raw;
                      span.textContent = latexToLinearUnicode(raw);
                      equationMenu.wrapper.replaceWith(span);
                      setLastActiveMathField(null);
                      if (onContentChange && editorRef.current) {
                        onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
                      }
                      setEquationMenu(null);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                  >
                    Linear (Convert to Text)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveElementType('equation');
                      window.dispatchEvent(new CustomEvent('prodoc:switchTab', { detail: RibbonTab.EQUATION }));
                      equationMenu.mathField.focus();
                      setEquationMenu(null);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                  >
                    Equation Tools Tab
                  </button>
                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                  <button
                    type="button"
                    onClick={() => {
                      equationMenu.wrapper.remove();
                      setLastActiveMathField(null);
                      if (onContentChange && editorRef.current) {
                        onContentChange(editorRef.current.innerHTML, pageNumber - 1, 'immediate');
                      }
                      setEquationMenu(null);
                    }}
                    className="w-full text-left px-3 py-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    Delete Equation
                  </button>
                </>
              )}
            </div>,
            document.body
          )}
        </>
      )}
    </div>
  );
};

const arePropsEqual = (prev: EditorPageProps, next: EditorPageProps) => {
  return (
    prev.isActivePage === next.isActivePage &&
    prev.historyApplySeq === next.historyApplySeq &&
    prev.content === next.content &&
    prev.pageNumber === next.pageNumber &&
    prev.totalPages === next.totalPages &&
    prev.zoom === next.zoom &&
    prev.calibrationScale === next.calibrationScale &&
    prev.readOnly === next.readOnly &&
    prev.showFormattingMarks === next.showFormattingMarks &&
    prev.activeEditingArea === next.activeEditingArea &&
    prev.headerContent === next.headerContent &&
    prev.footerContent === next.footerContent &&
    prev.firstHeaderContent === next.firstHeaderContent &&
    prev.firstFooterContent === next.firstFooterContent &&
    prev.config.size === next.config.size &&
    prev.config.orientation === next.config.orientation &&
    prev.config.customWidth === next.config.customWidth &&
    prev.config.customHeight === next.config.customHeight &&
    prev.config.verticalAlign === next.config.verticalAlign &&
    prev.config.margins.top === next.config.margins.top &&
    prev.config.margins.bottom === next.config.margins.bottom &&
    prev.config.margins.left === next.config.margins.left &&
    prev.config.margins.right === next.config.margins.right &&
    prev.config.margins.gutter === next.config.margins.gutter &&
    prev.config.differentFirstPage === next.config.differentFirstPage &&
    prev.config.headerDistance === next.config.headerDistance &&
    prev.config.footerDistance === next.config.footerDistance &&
    prev.config.pageColor === next.config.pageColor &&
    prev.config.watermark === next.config.watermark &&
    prev.config.background === next.config.background &&
    prev.config.columns === next.config.columns &&
    prev.config.columnGap === next.config.columnGap &&
    prev.config.hyphenation === next.config.hyphenation &&
    JSON.stringify(prev.config.lineNumbers) === JSON.stringify(next.config.lineNumbers) &&
    JSON.stringify(prev.config.pageBorder) === JSON.stringify(next.config.pageBorder)
  );
};


export const EditorPage = React.memo(EditorPageComponent, arePropsEqual);
