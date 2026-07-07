/* eslint-disable react-hooks/immutability, @typescript-eslint/no-explicit-any */
import React, { useRef, useLayoutEffect, useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { PageConfig, EditingArea } from '../../types';
import { PAGE_SIZES } from '../../constants';
import { useMathLive } from '../../hooks/useMathLive';
import { useEditor } from '../../contexts/EditorContext';
import { ResizerOverlay } from './ResizerOverlay';
import { TableResizerOverlay } from './TableResizerOverlay';
import { TableContextMenu } from './TableContextMenu';
import { TablePropertiesModal } from './TablePropertiesModal';
import { SortModal } from './SortModal';

interface EditorPageProps {
  content: string;
  pageNumber: number;
  totalPages: number;
  config: PageConfig;
  zoom: number;
  readOnly?: boolean;
  onContentChange?: (html: string, pageIndex: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  showFormattingMarks: boolean;
  
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
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorElement, setEditorElement] = useState<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const scale = zoom / 100;
  const { 
    isKeyboardLocked, 
    isTableResizerEnabled, 
    selectionMode, 
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

          if (border.includes('rgb') || border.includes('#')) {
            if (border.includes('3b82f6') || border.includes('rgb(59, 130, 246)')) setBorderColor('#3b82f6');
            else if (border.includes('ef4444') || border.includes('rgb(239, 68, 68)')) setBorderColor('#ef4444');
            else if (border.includes('22c55e') || border.includes('rgb(34, 197, 94)')) setBorderColor('#22c55e');
            else setBorderColor('#cbd5e1');
          }
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
      onContentChange(editorRef.current.innerHTML, pageNumber - 1);
    }
  };

  const insertRow = (where: 'above' | 'below') => {
    const cell = contextMenu.cell;
    const table = contextMenu.table;
    if (!cell || !table) return;
    const row = cell.parentNode as HTMLTableRowElement;
    if (row) {
      table.classList.add('is-resizing');
      const newRow = row.parentNode!.insertBefore(row.cloneNode(true), where === 'above' ? row : row.nextSibling);
      Array.from(newRow.childNodes).forEach((c: any) => (c.innerHTML = '<br>'));
      setTimeout(() => {
        table.classList.remove('is-resizing');
      }, 300);
      if (onContentChange && editorRef.current) {
        onContentChange(editorRef.current.innerHTML, pageNumber - 1);
      }
    }
  };

  const insertCol = (where: 'left' | 'right') => {
    const cell = contextMenu.cell;
    const table = contextMenu.table;
    if (!cell || !table) return;
    table.classList.add('is-resizing');
    const index = cell.cellIndex;
    for (let i = 0; i < table.rows.length; i++) {
      const row = table.rows[i];
      const targetIndex = where === 'left' ? index : index + 1;
      if (targetIndex <= row.cells.length) {
        const newCell = row.insertCell(targetIndex);
        newCell.innerHTML = '<br>';
        const neighbor = row.cells[index];
        if (neighbor) {
          newCell.style.border = neighbor.style.border;
          newCell.style.padding = neighbor.style.padding;
          newCell.style.backgroundColor = neighbor.style.backgroundColor;
        }
      }
    }
    setTimeout(() => {
      table.classList.remove('is-resizing');
    }, 300);
    if (onContentChange && editorRef.current) {
      onContentChange(editorRef.current.innerHTML, pageNumber - 1);
    }
  };

  const mergeCells = () => {
    const cell = contextMenu.cell;
    if (!cell) return;
    const nextSibling = cell.nextElementSibling as HTMLTableCellElement;
    if (nextSibling) {
      const currentColSpan = cell.colSpan || 1;
      const nextColSpan = nextSibling.colSpan || 1;
      cell.colSpan = currentColSpan + nextColSpan;
      if (nextSibling.innerText.trim()) {
        cell.innerHTML += " " + nextSibling.innerHTML;
      }
      nextSibling.remove();
      if (onContentChange && editorRef.current) {
        onContentChange(editorRef.current.innerHTML, pageNumber - 1);
      }
    }
  };

  const splitCells = () => {
    const cell = contextMenu.cell;
    if (!cell) return;
    const colspan = cell.colSpan;
    if (colspan > 1) {
      cell.colSpan = Math.floor(colspan / 2);
      const newCell = cell.cloneNode(true) as HTMLTableCellElement;
      newCell.colSpan = Math.ceil(colspan / 2);
      newCell.innerHTML = "<br>";
      cell.parentNode?.insertBefore(newCell, cell.nextSibling);
    } else {
      const newCell = cell.cloneNode(true) as HTMLTableCellElement;
      newCell.innerHTML = "<br>";
      cell.parentNode?.insertBefore(newCell, cell.nextSibling);
    }
    if (onContentChange && editorRef.current) {
      onContentChange(editorRef.current.innerHTML, pageNumber - 1);
    }
  };

  const deleteRow = () => {
    const cell = contextMenu.cell;
    const table = contextMenu.table;
    if (!cell || !table) return;
    const row = cell.parentNode as HTMLTableRowElement;
    if (row) {
      table.classList.add('is-resizing');
      row.classList.add('is-deleting');
      setTimeout(() => {
        row.remove();
        table.classList.remove('is-resizing');
        if (onContentChange && editorRef.current) {
          onContentChange(editorRef.current.innerHTML, pageNumber - 1);
        }
      }, 300);
    }
  };

  const deleteCol = () => {
    const cell = contextMenu.cell;
    const table = contextMenu.table;
    if (!cell || !table) return;
    table.classList.add('is-resizing');
    const index = cell.cellIndex;
    for (let i = 0; i < table.rows.length; i++) {
      if (table.rows[i].cells[index]) table.rows[i].deleteCell(index);
    }
    setTimeout(() => {
      table.classList.remove('is-resizing');
    }, 300);
    if (onContentChange && editorRef.current) {
      onContentChange(editorRef.current.innerHTML, pageNumber - 1);
    }
  };

  const deleteTable = () => {
    const table = contextMenu.table;
    if (table) {
      table.remove();
      if (onContentChange && editorRef.current) {
        onContentChange(editorRef.current.innerHTML, pageNumber - 1);
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
            onContentChange(editorRef.current.innerHTML, pageNumber - 1);
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
      onContentChange(editorRef.current.innerHTML, pageNumber - 1);
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
  
  // Dimensions in Inches
  let widthIn = 0;
  let heightIn = 0;
  
  if (config.size === 'Custom' && config.customWidth && config.customHeight) {
    widthIn = config.customWidth;
    heightIn = config.customHeight;
  } else {
    const base = PAGE_SIZES[config.size as keyof typeof PAGE_SIZES] || PAGE_SIZES['Letter'];
    widthIn = config.orientation === 'portrait' ? base.width / 96 : base.height / 96;
    heightIn = config.orientation === 'portrait' ? base.height / 96 : base.width / 96;
  }

  // Minimum body gap (approx 2 inches) used for safe header/footer max height calculation
  const MIN_BODY_GAP_IN = 2; 

  useMathLive(content, editorRef);

  // --- Image Handling ---
  const handleEditorClick = (e: React.MouseEvent) => {
    if (selectionMode) handleSmartClick(e);
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      setSelectedImage(target);
      e.stopPropagation();
    } else {
      setSelectedImage(null);
    }
    
    const table = target.closest('table');
    if (table) {
      setSelectedTable(table as HTMLTableElement);
    } else {
      setSelectedTable(null);
    }
  };

  const handleImageUpdate = () => {
    if (editorRef.current && onContentChange) {
      onContentChange(editorRef.current.innerHTML, pageNumber - 1);
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

  // Sync content to editable div
  useLayoutEffect(() => {
    if (editorRef.current) {
      const activeEl = document.activeElement;
      const isMathFieldFocused = activeEl && activeEl.tagName.toLowerCase() === 'math-field' && editorRef.current.contains(activeEl);
      if (isMathFieldFocused) return;
      if (selectedImage) return;

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
  }, [content, pageNumber, totalPages, selectedImage]);

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
      } else if (element.closest('math-field') || element.closest('.math-inline') || element.closest('.math-display')) {
        setActiveElementType('equation');
      } else {
        setActiveElementType('text');
      }
    };
    
    document.addEventListener('selectionchange', handleSelectionChange);
    
    // Also listen for focusin/focusout to catch math-field focus which might not trigger selectionchange
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName && target.tagName.toLowerCase() === 'math-field' && editorRef.current?.contains(target)) {
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
    if (onContentChange) onContentChange(e.currentTarget.innerHTML, pageNumber - 1);
  };

  const selectCellContent = (cell: HTMLTableCellElement) => {
    const range = document.createRange();
    range.selectNodeContents(cell);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    cell.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleTableNavigation = (e: React.KeyboardEvent): boolean => {
    if (e.key !== 'Tab') return false;
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return false;
    let node = sel.anchorNode;
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
    const row = cell.parentElement as HTMLTableRowElement;
    const table = row.parentElement?.closest('table') as HTMLTableElement;
    if (!table || !row) return true;
    const allRows = Array.from(table.rows);
    const currentRowIndex = allRows.indexOf(row);
    const cells = Array.from(row.cells);
    const currentCellIndex = cell.cellIndex;

    if (!e.shiftKey) {
      if (currentCellIndex < cells.length - 1) selectCellContent(cells[currentCellIndex + 1]);
      else if (currentRowIndex < allRows.length - 1) {
        const nextRow = allRows[currentRowIndex + 1];
        if (nextRow.cells.length > 0) selectCellContent(nextRow.cells[0]);
      } else {
        const newRow = row.cloneNode(true) as HTMLTableRowElement;
        Array.from(newRow.cells).forEach((c) => (c.innerHTML = '<br>'));
        row.parentElement?.appendChild(newRow);
        selectCellContent(newRow.cells[0]);
        if (onContentChange && editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
      }
    } else {
      if (currentCellIndex > 0) selectCellContent(cells[currentCellIndex - 1]);
      else if (currentRowIndex > 0) {
        const prevRow = allRows[currentRowIndex - 1];
        if (prevRow.cells.length > 0) selectCellContent(prevRow.cells[prevRow.cells.length - 1]);
      }
    }
    return true;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly) return;
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

    if (e.key === 'ArrowDown') {
      const editorRect = editorRef.current.getBoundingClientRect();
      const rangeRect = range.getBoundingClientRect();
      const cursorBottom = rangeRect.bottom !== 0 ? rangeRect.bottom : editorRect.bottom;
      if (editorRect.bottom - cursorBottom < 40) {
        if (pageNumber < totalPages) {
          e.preventDefault();
          const nextPage = document.getElementById(`prodoc-editor-${pageNumber + 1}`);
          if (nextPage) {
            nextPage.focus();
            const r = document.createRange();
            r.selectNodeContents(nextPage);
            r.collapse(true);
            selection.removeAllRanges();
            selection.addRange(r);
            nextPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    }
    if (e.key === 'ArrowUp') {
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
    if (editorRef.current && !editorRef.current.contains(e.target as Node) && !isHeaderFooterMode) {
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
    const base: React.CSSProperties = { backgroundColor: config.pageColor || '#ffffff' };
    if (config.background === 'ruled') {
      return { ...base, backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '100% 0.33in' };
    } else if (config.background === 'grid') {
      return { ...base, backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '0.2in 0.2in' };
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

  const onBodyDoubleClick = (e: React.MouseEvent) => {
    if (activeEditingArea !== 'body' && setActiveEditingArea && !isKeyboardLocked && !selectionMode) {
      e.stopPropagation();
      setActiveEditingArea('body');
      setTimeout(() => {
        if (editorRef.current) editorRef.current.focus();
      }, 10);
    }
  };

  const safeMaxHeaderHeight = (heightIn - MIN_BODY_GAP_IN) / 2;
  const safeMaxFooterHeight = (heightIn - MIN_BODY_GAP_IN) / 2;
  const isBodyEditable = true; 
  const isHeaderFooterEditable = true;
  let cursorStyle = 'cursor-text';
  if (selectionMode) cursorStyle = 'cursor-crosshair';
  else if (isKeyboardLocked) cursorStyle = 'cursor-default';

  return (
    <div 
      ref={containerRef}
      className="prodoc-page-container relative group mx-auto origin-top"
      style={{ width: `${widthIn * scale}in`, height: `${heightIn * scale}in` }}
    >
      <div 
        className={`prodoc-page-sheet absolute inset-0 bg-white overflow-clip ${cursorStyle} ${selectionMode ? 'smart-selection-active' : ''}`}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${widthIn}in`,
          height: `${heightIn}in`,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)',
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
          <div className={`w-full h-full relative ${isHeaderFooterMode ? 'border-b-2 border-dashed border-indigo-500 print:border-none' : 'hover:bg-slate-50/50'}`}>
            {isHeaderFooterMode && (
              <div className="header-footer-label bg-indigo-600 text-white print:hidden" style={{ left: 0, bottom: -2, transform: 'translateY(100%)' }}>
                {isFirstPage && useDifferentFirstPage ? "First Page Header" : "Header"}
              </div>
            )}
            <div 
              ref={headerRef}
              className={`prodoc-header w-full min-h-full outline-none ${isHeaderFooterEditable ? 'cursor-text pointer-events-auto' : 'cursor-default pointer-events-none'}`}
              contentEditable={isHeaderFooterEditable}
              inputMode={isKeyboardLocked || selectionMode ? "none" : "text"}
              suppressContentEditableWarning
              onInput={handleHeaderInput}
              onFocus={() => setActiveEditingArea && setActiveEditingArea('header')}
              style={{ minHeight: '1em' }}
            />
          </div>
        </div>

        {config.watermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-clip z-0">
            <div className="transform -rotate-45 text-slate-300/40 font-bold text-[8rem] whitespace-nowrap select-none" style={{ color: 'rgba(0,0,0,0.08)' }}>
              {config.watermark}
            </div>
          </div>
        )}

        {/* Body */}
        <div 
          className={`relative w-full h-full overflow-clip transition-opacity duration-300 ${isHeaderFooterMode ? 'opacity-50' : 'opacity-100'}`}
          style={{ ...getVerticalAlignStyle() }}
          onDoubleClick={onBodyDoubleClick}
          onMouseDown={(e) => e.stopPropagation()} 
        >
          <div
            id={`prodoc-editor-${pageNumber}`}
            ref={(el) => {
              editorRef.current = el;
              if (el && el !== editorElement) {
                setEditorElement(el);
              }
            }}
            className={`prodoc-editor w-full outline-none text-lg leading-loose break-words z-10 ${showFormattingMarks ? 'show-formatting-marks' : ''} ${isHeaderFooterMode ? 'pointer-events-none select-none' : ''}`}
            contentEditable={isBodyEditable}
            inputMode={isKeyboardLocked || selectionMode ? "none" : "text"}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            onClick={handleEditorClick}
            onContextMenu={handleContextMenu}
            onPointerDown={handleSmartPointerDown}
            onPointerMove={handleSmartPointerMove}
            onPointerUp={handleSmartPointerUp}
            onPointerCancel={handleSmartPointerUp}
            suppressContentEditableWarning={true}
            style={{ 
              fontFamily: 'Calibri, Inter, sans-serif', 
              color: '#000000', 
              flex: config.verticalAlign === 'justify' ? '1 1 auto' : undefined, 
              minHeight: '100%',
              columnCount: config.columns || 1,
              columnGap: `${config.columnGap || 0.5}in`,
              columnFill: 'auto',
              hyphens: config.hyphenation ? 'auto' : 'none',
              WebkitHyphens: config.hyphenation ? 'auto' : 'none',
            }}
          />
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
              inputMode={isKeyboardLocked || selectionMode ? "none" : "text"}
              suppressContentEditableWarning
              onInput={handleFooterInput}
              onFocus={() => setActiveEditingArea && setActiveEditingArea('footer')}
              style={{ minHeight: '1em' }}
            />
          </div>
        </div>
      </div>
      
      {/* Context Menu Overlay */}
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
    </div>
  );
};

const arePropsEqual = (prev: EditorPageProps, next: EditorPageProps) => {
  return (
    prev.content === next.content &&
    prev.pageNumber === next.pageNumber &&
    prev.totalPages === next.totalPages &&
    prev.zoom === next.zoom &&
    prev.readOnly === next.readOnly &&
    prev.showFormattingMarks === next.showFormattingMarks &&
    prev.activeEditingArea === next.activeEditingArea &&
    prev.headerContent === next.headerContent &&
    prev.footerContent === next.footerContent &&
    prev.firstHeaderContent === next.firstHeaderContent &&
    prev.firstFooterContent === next.firstFooterContent &&
    prev.config.size === next.config.size &&
    prev.config.orientation === next.config.orientation &&
    prev.config.margins.top === next.config.margins.top &&
    prev.config.margins.bottom === next.config.margins.bottom &&
    prev.config.margins.left === next.config.margins.left &&
    prev.config.margins.right === next.config.margins.right &&
    prev.config.differentFirstPage === next.config.differentFirstPage &&
    prev.config.headerDistance === next.config.headerDistance &&
    prev.config.footerDistance === next.config.footerDistance &&
    prev.config.pageColor === next.config.pageColor &&
    prev.config.watermark === next.config.watermark &&
    prev.config.background === next.config.background &&
    prev.config.columns === next.config.columns &&
    prev.config.columnGap === next.config.columnGap &&
    prev.config.hyphenation === next.config.hyphenation
  );
};

export const EditorPage = React.memo(EditorPageComponent, arePropsEqual);
