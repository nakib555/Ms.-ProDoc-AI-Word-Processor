/* eslint-disable react-hooks/immutability */
import { useState, useRef, useEffect } from 'react';

interface UseTableInteractionsProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  pageNumber: number;
  onContentChange?: (html: string, pageIndex: number) => void;
}

export const useTableInteractions = ({
  editorRef,
  pageNumber,
  onContentChange,
}: UseTableInteractionsProps) => {
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

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const cell = target.closest('td, th') as HTMLTableCellElement | null;
    if (cell) {
      e.preventDefault();
      const table = cell.closest('table') as HTMLTableElement | null;
      
      const menuWidth = 220;
      const menuHeight = 430;
      
      let clickX = e.clientX;
      let clickY = e.clientY;
      
      const viewportPadding = window.innerWidth < 640 ? 8 : 16;
      
      if (clickX + menuWidth + viewportPadding > window.innerWidth) {
        clickX = clickX - menuWidth;
      }
      if (clickY + menuHeight + viewportPadding > window.innerHeight) {
        clickY = clickY - menuHeight;
      }
      
      const safeX = Math.max(viewportPadding, Math.min(clickX, window.innerWidth - menuWidth - viewportPadding));
      const safeY = Math.max(viewportPadding, Math.min(clickY, window.innerHeight - menuHeight - viewportPadding));
      
      setContextMenu({ visible: true, x: safeX, y: safeY, cell, table });
    }
  };

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
        e.preventDefault();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [contextMenu.visible, editorRef]);

  useEffect(() => {
    if (contextMenu.visible && contextMenuRef.current) {
      const timer = setTimeout(() => {
        contextMenuRef.current?.focus();
        const buttons = contextMenuRef.current?.querySelectorAll('button');
        if (buttons && buttons.length > 0) {
          setFocusedIndex(0);
          (buttons[0] as HTMLButtonElement).focus();
        }
      }, 50);
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
      const nextIndex = e.shiftKey ? (activeIndex - 1 + buttons.length) % buttons.length : (activeIndex + 1) % buttons.length;
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
    const allRows = Array.from(table.rows);
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
      return sortDirection === 'asc'
        ? textA.localeCompare(textB, undefined, { numeric: true, sensitivity: 'base' })
        : textB.localeCompare(textA, undefined, { numeric: true, sensitivity: 'base' });
    });

    const firstSortRow = rowsToSort[0] || keepRows[0];
    const parent = firstSortRow ? firstSortRow.parentNode : table;
    if (parent) {
      rowsToSort.forEach((row) => row.remove());
      rowsToSort.forEach((row) => parent.appendChild(row));
    }
    setTimeout(() => table.classList.remove('is-resizing'), 50);
    setIsSortModalOpen(false);
    if (onContentChange && editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
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
      setTimeout(() => table.classList.remove('is-resizing'), 50);
      if (onContentChange && editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
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
    setTimeout(() => table.classList.remove('is-resizing'), 50);
    if (onContentChange && editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
  };

  const mergeCells = () => {
    const cell = contextMenu.cell;
    if (!cell) return;
    const nextSibling = cell.nextElementSibling as HTMLTableCellElement;
    if (nextSibling) {
      const currentColSpan = cell.colSpan || 1;
      const nextColSpan = nextSibling.colSpan || 1;
      cell.colSpan = currentColSpan + nextColSpan;
      if (nextSibling.innerText.trim()) cell.innerHTML += " " + nextSibling.innerHTML;
      nextSibling.remove();
      if (onContentChange && editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
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
    if (onContentChange && editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
  };

  const deleteRow = () => {
    const cell = contextMenu.cell;
    const table = contextMenu.table;
    if (!cell || !table) return;
    const row = cell.parentNode as HTMLTableRowElement;
    if (row) {
      table.classList.add('is-resizing');
      row.remove();
      setTimeout(() => table.classList.remove('is-resizing'), 50);
      if (onContentChange && editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
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
    setTimeout(() => table.classList.remove('is-resizing'), 50);
    if (onContentChange && editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
  };

  const deleteTable = () => {
    const table = contextMenu.table;
    if (table) {
      table.remove();
      if (onContentChange && editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
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
      case 'insertRowAbove': insertRow('above'); break;
      case 'insertRowBelow': insertRow('below'); break;
      case 'insertColLeft': insertCol('left'); break;
      case 'insertColRight': insertCol('right'); break;
      case 'mergeCells': mergeCells(); break;
      case 'splitCells': splitCells(); break;
      case 'deleteRow': deleteRow(); break;
      case 'deleteCol': deleteCol(); break;
      case 'deleteTable': deleteTable(); break;
      case 'properties': showProperties(); break;
      case 'toggleKeepTogether': {
        const tbl = contextMenu.table;
        if (tbl) {
          const isCurrentlyKeepTogether = tbl.classList.contains('table-row-keep-together') || tbl.rows[0]?.getAttribute('data-cant-split') === 'true';
          const newValue = !isCurrentlyKeepTogether;
          if (newValue) tbl.classList.add('table-row-keep-together');
          else tbl.classList.remove('table-row-keep-together');
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
          if (onContentChange && editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
        }
        break;
      }
      case 'sortColumn': handleSortColumn(); break;
    }
  };

  const applyProperties = () => {
    if (!propertiesTable) return;
    propertiesTable.style.width = tableWidth;
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
      propertiesTable.style.marginTop = '';
      propertiesTable.style.marginBottom = '';
    }

    const cells = Array.from(propertiesTable.querySelectorAll('td, th')) as HTMLTableCellElement[];
    cells.forEach((cell) => {
      if (customCellPadding) {
        cell.style.padding = '';
        cell.style.paddingTop = `${padTopBottom}px`;
        cell.style.paddingBottom = `${padTopBottom}px`;
        cell.style.paddingLeft = `${padLeftRight}px`;
        cell.style.paddingRight = `${padLeftRight}px`;
      } else {
        cell.style.paddingTop = '';
        cell.style.paddingBottom = '';
        cell.style.paddingLeft = '';
        cell.style.paddingRight = '';
        if (cellPadding === 'small') cell.style.padding = '4px 8px';
        else if (cellPadding === 'large') cell.style.padding = '12px 16px';
        else cell.style.padding = '8px 12px';
      }

      cell.style.verticalAlign = verticalAlign;
      if (borderColor === 'none') cell.style.border = 'none';
      else cell.style.border = `${borderWidth} solid ${borderColor}`;
      
      if (specifyColWidth) cell.style.width = `${colWidthVal}${colWidthUnit}`;
      else cell.style.width = '';
    });

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

    if (cantSplit) propertiesTable.classList.add('table-row-keep-together');
    else propertiesTable.classList.remove('table-row-keep-together');

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

    if (repeatHeader) propertiesTable.setAttribute('data-repeat-header', 'true');
    else propertiesTable.removeAttribute('data-repeat-header');

    if (keepTogether) propertiesTable.setAttribute('data-keep-together', 'true');
    else propertiesTable.removeAttribute('data-keep-together');

    setIsTablePropertiesOpen(false);
    if (onContentChange && editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
  };

  return {
    contextMenu,
    contextMenuRef,
    focusedIndex,
    isSortModalOpen,
    sortColIndex,
    sortDirection,
    sortExcludeHeader,
    sortType,
    isTablePropertiesOpen,
    propertiesTable,
    tableWidth,
    cellPadding,
    tableAlign,
    borderColor,
    borderWidth,
    zebraStriping,
    headerColor,
    repeatHeader,
    keepTogether,
    cantSplit,
    customCellPadding,
    padTopBottom,
    padLeftRight,
    verticalAlign,
    specifyRowHeight,
    rowHeightVal,
    rowHeightMode,
    specifyColWidth,
    colWidthVal,
    colWidthUnit,
    textWrapping,

    setContextMenu,
    setIsSortModalOpen,
    setSortColIndex,
    setSortDirection,
    setSortExcludeHeader,
    setSortType,
    setIsTablePropertiesOpen,
    setTableWidth,
    setCellPadding,
    setTableAlign,
    setBorderColor,
    setBorderWidth,
    setZebraStriping,
    setHeaderColor,
    setRepeatHeader,
    setKeepTogether,
    setCantSplit,
    setCustomCellPadding,
    setPadTopBottom,
    setPadLeftRight,
    setVerticalAlign,
    setSpecifyRowHeight,
    setRowHeightVal,
    setRowHeightMode,
    setSpecifyColWidth,
    setColWidthVal,
    setColWidthUnit,
    setTextWrapping,

    handleContextMenu,
    handleMenuKeyDown,
    handleContextAction,
    applyProperties,
    applySortColumn,
  };
};
