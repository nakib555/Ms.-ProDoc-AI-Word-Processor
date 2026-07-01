
/* eslint-disable react-hooks/immutability */
import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { PageConfig, EditingArea } from '../types';
import { PAGE_SIZES } from '../constants';
import { useMathLive } from '../hooks/useMathLive';
import { useEditor } from '../contexts/EditorContext';
import { 
  ArrowUpToLine, ArrowDownToLine, ArrowLeftToLine, ArrowRightToLine,
  Trash2, Settings, Merge, Split, LayoutGrid, ArrowUpDown
} from 'lucide-react';

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

// ... (ResizerOverlay remains same as original)
const ResizerOverlay: React.FC<{
    target: HTMLElement;
    container: HTMLElement;
    scale: number;
    onUpdate: () => void;
    onClear: () => void;
}> = ({ target, container, scale, onUpdate, onClear }) => {
    const [rect, setRect] = useState(target.getBoundingClientRect());
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        const updateRect = () => {
            const containerRect = container.parentElement!.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            
            setRect({
                top: (targetRect.top - containerRect.top) / scale,
                left: (targetRect.left - containerRect.left) / scale,
                width: targetRect.width / scale,
                height: targetRect.height / scale,
                bottom: 0, right: 0, x: 0, y: 0, toJSON: () => {}
            });
        };
        updateRect();
        window.addEventListener('resize', updateRect);
        return () => window.removeEventListener('resize', updateRect);
    }, [target, container, scale, isResizing]);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, direction: string) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch (err) {
            // ignore
        }
        
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = target.clientWidth;
        const startHeight = target.clientHeight;
        const aspectRatio = startWidth / startHeight;

        const handlePointerMove = (ev: PointerEvent) => {
            const deltaX = (ev.clientX - startX) / scale;
            const deltaY = (ev.clientY - startY) / scale;

            let newWidth = startWidth;
            let newHeight = startHeight;

            if (direction.includes('e')) newWidth = startWidth + deltaX;
            if (direction.includes('w')) newWidth = startWidth - deltaX;
            if (direction.includes('s')) newHeight = startHeight + deltaY;
            if (direction.includes('n')) newHeight = startHeight - deltaY;

            if (direction.length === 2) { 
                 if (Math.abs(deltaX) > Math.abs(deltaY)) {
                     newHeight = newWidth / aspectRatio;
                 } else {
                     newWidth = newHeight * aspectRatio;
                 }
            }

            target.style.width = `${Math.max(20, newWidth)}px`;
            target.style.height = `${Math.max(20, newHeight)}px`;
            setRect(prev => ({ ...prev, width: Math.max(20, newWidth), height: Math.max(20, newHeight) }));
        };

        const handlePointerUp = () => {
            setIsResizing(false);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            onUpdate();
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    return (
        <div 
            className="absolute border-2 border-blue-500 z-50 pointer-events-none"
            style={{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            }}
        >
            {['nw', 'ne', 'sw', 'se'].map(dir => (
                <div 
                    key={dir}
                    onPointerDown={(e) => handlePointerDown(e, dir)}
                    className="absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full pointer-events-auto"
                    style={{
                        top: dir.includes('n') ? -8 : 'auto',
                        bottom: dir.includes('s') ? -8 : 'auto',
                        left: dir.includes('w') ? -8 : 'auto',
                        right: dir.includes('e') ? -8 : 'auto',
                        cursor: `${dir}-resize`,
                        touchAction: 'none'
                    }}
                />
            ))}
        </div>
    );
};

const TableResizerOverlay: React.FC<{
    target: HTMLTableElement;
    container: HTMLElement;
    scale: number;
    onUpdate: () => void;
}> = ({ target, container, scale, onUpdate }) => {
    const [handles, setHandles] = useState<{cols: any[], rows: any[]}>({ cols: [], rows: [] });
    const [isResizing, setIsResizing] = useState(false);
    const [activeHandle, setActiveHandle] = useState<{type: 'col'|'row', index: number} | null>(null);

    useEffect(() => {
        const updateHandles = () => {
             const containerRect = container.parentElement!.getBoundingClientRect();
             const tableRect = target.getBoundingClientRect();
             
             const cols = [];
             if (target.rows.length > 0) {
                 const firstRow = target.rows[0];
                 for (let i = 0; i < firstRow.cells.length; i++) {
                     const cell = firstRow.cells[i];
                     const cellRect = cell.getBoundingClientRect();
                     cols.push({
                         index: i,
                         left: (cellRect.right - containerRect.left) / scale,
                         top: (tableRect.top - containerRect.top) / scale,
                         height: tableRect.height / scale,
                         cell
                     });
                 }
             }

             const rows = [];
             for (let i = 0; i < target.rows.length; i++) {
                 const row = target.rows[i];
                 const rowRect = row.getBoundingClientRect();
                 rows.push({
                     index: i,
                     left: (tableRect.left - containerRect.left) / scale,
                     top: (rowRect.bottom - containerRect.top) / scale,
                     width: tableRect.width / scale,
                     row
                 });
             }
             
             setHandles({ cols, rows });
        };
        
        updateHandles();
        
        const observer = new MutationObserver(updateHandles);
        observer.observe(target, { attributes: true, childList: true, subtree: true, characterData: true });
        
        const resizeObserver = new ResizeObserver(updateHandles);
        resizeObserver.observe(target);
        
        window.addEventListener('resize', updateHandles);
        return () => {
            observer.disconnect();
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateHandles);
        };
    }, [target, container, scale, isResizing]);

    const handleColPointerDown = (e: React.PointerEvent<HTMLDivElement>, cell: HTMLTableCellElement, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        setActiveHandle({ type: 'col', index });
        // eslint-disable-next-line react-hooks/immutability
        document.body.style.cursor = 'col-resize';
        
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch (err) {
            // ignore
        }
        
        // eslint-disable-next-line react-hooks/immutability
        target.style.tableLayout = 'fixed';
        if (!target.style.width) {
            // eslint-disable-next-line react-hooks/immutability
            target.style.width = `${target.offsetWidth}px`;
        }
        
        const startX = e.clientX;
        const startWidth = cell.offsetWidth;
        const nextCell = cell.parentElement?.children[index + 1] as HTMLTableCellElement | null;
        const nextStartWidth = nextCell ? nextCell.offsetWidth : 0;
        const tableStartWidth = target.offsetWidth;

        const handlePointerMove = (ev: PointerEvent) => {
            const deltaX = (ev.clientX - startX) / scale;
            
            if (nextCell) {
                const newWidth = Math.max(20, startWidth + deltaX);
                const newNextWidth = Math.max(20, nextStartWidth - (newWidth - startWidth));
                const actualWidth = startWidth + (nextStartWidth - newNextWidth);
                
                for (let i = 0; i < target.rows.length; i++) {
                    const row = target.rows[i];
                    if (row.cells[index]) row.cells[index].style.width = `${actualWidth}px`;
                    if (row.cells[index + 1]) row.cells[index + 1].style.width = `${newNextWidth}px`;
                }
            } else {
                const newWidth = Math.max(20, startWidth + deltaX);
                const maxTableWidth = container.offsetWidth;
                let newTableWidth = tableStartWidth + (newWidth - startWidth);
                if (newTableWidth > maxTableWidth) {
                    newTableWidth = maxTableWidth;
                }
                const actualNewWidth = newTableWidth - tableStartWidth + startWidth;

                target.style.width = `${newTableWidth}px`;
                for (let i = 0; i < target.rows.length; i++) {
                    const row = target.rows[i];
                    if (row.cells[index]) row.cells[index].style.width = `${actualNewWidth}px`;
                }
            }
        };

        const handlePointerUp = () => {
            setIsResizing(false);
            setActiveHandle(null);
            // eslint-disable-next-line react-hooks/immutability
            document.body.style.cursor = '';
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            onUpdate();
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    const handleRowPointerDown = (e: React.PointerEvent<HTMLDivElement>, row: HTMLTableRowElement, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        setActiveHandle({ type: 'row', index });
        // eslint-disable-next-line react-hooks/immutability
        document.body.style.cursor = 'row-resize';
        
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch (err) {
            // ignore
        }
        
        const startY = e.clientY;
        const startHeight = row.offsetHeight;

        const handlePointerMove = (ev: PointerEvent) => {
            const deltaY = (ev.clientY - startY) / scale;
            const newHeight = Math.max(20, startHeight + deltaY);
            row.style.height = `${newHeight}px`;
        };

        const handlePointerUp = () => {
            setIsResizing(false);
            setActiveHandle(null);
            // eslint-disable-next-line react-hooks/immutability
            document.body.style.cursor = '';
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            onUpdate();
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    return (
        <div className="absolute z-50 pointer-events-none" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            {handles.cols.map((col, i) => (
                <div
                    key={`col-${i}`}
                    className={`absolute bg-blue-500 pointer-events-auto transition-opacity ${activeHandle?.type === 'col' && activeHandle.index === col.index ? 'opacity-50' : 'opacity-0 hover:opacity-50'}`}
                    style={{
                        left: col.left - (7 / scale),
                        top: col.top,
                        width: Math.max(10, 15 / scale),
                        height: col.height,
                        cursor: 'col-resize',
                        touchAction: 'none'
                    }}
                    onPointerDown={(e) => handleColPointerDown(e, col.cell, col.index)}
                />
            ))}
            {handles.rows.map((row, i) => (
                <div
                    key={`row-${i}`}
                    className={`absolute bg-blue-500 pointer-events-auto transition-opacity ${activeHandle?.type === 'row' && activeHandle.index === row.index ? 'opacity-50' : 'opacity-0 hover:opacity-50'}`}
                    style={{
                        left: row.left,
                        top: row.top - (7 / scale),
                        width: row.width,
                        height: Math.max(10, 15 / scale),
                        cursor: 'row-resize',
                        touchAction: 'none'
                    }}
                    onPointerDown={(e) => handleRowPointerDown(e, row.row, row.index)}
                />
            ))}
        </div>
    );
};

const getTextLength = (node: Node): number => {
    if (node.nodeType === Node.TEXT_NODE) return (node.nodeValue || "").length;
    if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName === 'MATH-FIELD' || el.classList.contains('prodoc-page-break') || el.tagName === 'BR') return 1;
    }
    let len = 0;
    node.childNodes.forEach(c => len += getTextLength(c));
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
  setFirstFooterContent
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorElement, setEditorElement] = useState<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const scale = zoom / 100;
  const { isKeyboardLocked, selectionMode, undo, redo, setActiveElementType } = useEditor();

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
      table: null
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
              const pad = firstCell.style.padding;
              if (pad.includes('4px') || pad === '4px 8px') setCellPadding('small');
              else if (pad.includes('12px') || pad === '12px 16px') setCellPadding('large');
              else setCellPadding('medium');

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
          }

          const firstRow = propertiesTable.rows[0];
          if (firstRow && firstRow.cells.length > 0) {
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

          let hasZebra = false;
          if (propertiesTable.rows.length > 2) {
              const secondRowBg = propertiesTable.rows[2]?.style.backgroundColor;
              if (secondRowBg && (secondRowBg.includes('f8fafc') || secondRowBg.includes('rgb(248, 250, 252)'))) {
                  hasZebra = true;
              }
          }
          setZebraStriping(hasZebra);
      }
  }, [propertiesTable]);

  useEffect(() => {
      const handleClose = () => {
          setContextMenu(prev => prev.visible ? { ...prev, visible: false } : prev);
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
          const menuHeight = 440; // Max height estimate with options
          
          let clickX = e.clientX;
          let clickY = e.clientY;
          
          // Adjust for viewport screen boundaries (safe scroll & viewport prevention)
          const viewportPadding = window.innerWidth < 640 ? 8 : 16;
          
          if (clickX + menuWidth + viewportPadding > window.innerWidth) {
              clickX = window.innerWidth - menuWidth - viewportPadding;
          }
          if (clickY + menuHeight + viewportPadding > window.innerHeight) {
              clickY = window.innerHeight - menuHeight - viewportPadding;
          }
          
          setContextMenu({
              visible: true,
              x: Math.max(viewportPadding, clickX),
              y: Math.max(viewportPadding, clickY),
              cell,
              table
          });
      }
  };

  // Focus & Click outside for context menu
  useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
          if (contextMenu.visible && contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
              setContextMenu(prev => ({ ...prev, visible: false }));
          }
      };
      
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
          if (!contextMenu.visible) return;
          
          if (e.key === 'Escape') {
              e.preventDefault();
              setContextMenu(prev => ({ ...prev, visible: false }));
              editorRef.current?.focus();
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

      if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (focusedIndex + 1) % buttons.length;
          setFocusedIndex(nextIndex);
          buttons[nextIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (focusedIndex - 1 + buttons.length) % buttons.length;
          setFocusedIndex(prevIndex);
          buttons[prevIndex]?.focus();
      } else if (e.key === 'Tab') {
          e.preventDefault();
          const nextIndex = e.shiftKey
              ? (focusedIndex - 1 + buttons.length) % buttons.length
              : (focusedIndex + 1) % buttons.length;
          setFocusedIndex(nextIndex);
          buttons[nextIndex]?.focus();
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
          rowsToSort.forEach(row => row.remove());
          // Then append the sorted rows back
          rowsToSort.forEach(row => parent.appendChild(row));
      }

      setTimeout(() => {
          table.classList.remove('is-resizing');
      }, 50);

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
          Array.from(newRow.childNodes).forEach((c: any) => c.innerHTML = '<br>');
          setTimeout(() => {
              table.classList.remove('is-resizing');
          }, 50);
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
      }, 50);
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
          row.remove();
          setTimeout(() => {
              table.classList.remove('is-resizing');
          }, 50);
          if (onContentChange && editorRef.current) {
              onContentChange(editorRef.current.innerHTML, pageNumber - 1);
          }
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
      }, 50);
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
      setContextMenu(prev => ({ ...prev, visible: false }));
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

      const cells = Array.from(propertiesTable.querySelectorAll('td, th')) as HTMLTableCellElement[];
      cells.forEach((cell) => {
          if (cellPadding === 'small') {
              cell.style.padding = '4px 8px';
          } else if (cellPadding === 'large') {
              cell.style.padding = '12px 16px';
          } else {
              cell.style.padding = '8px 12px';
          }

          if (borderColor === 'none') {
              cell.style.border = 'none';
          } else {
              cell.style.border = `${borderWidth} solid ${borderColor}`;
          }
      });

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

      setIsTablePropertiesOpen(false);

      if (onContentChange && editorRef.current) {
          onContentChange(editorRef.current.innerHTML, pageNumber - 1);
      }
  };

  // Smart Selection Refs
  const wordPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const superLongPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerStartRef = useRef<{ x: number, y: number, time: number } | null>(null);
  const smartSelectionTriggeredRef = useRef(false);

  const isHeaderFooterMode = activeEditingArea === 'header' || activeEditingArea === 'footer';
  const isFirstPage = pageNumber === 1;
  const useDifferentFirstPage = config.differentFirstPage;

  // Determine active header/footer content based on page number and config
  const activeHeaderContent = (useDifferentFirstPage && isFirstPage) ? firstHeaderContent : headerContent;
  const activeFooterContent = (useDifferentFirstPage && isFirstPage) ? firstFooterContent : footerContent;
  
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

  // ... (Cursor helpers: getCaretCharacterOffsetWithin, setCaretPosition remain same)
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
                try { setCaretPosition(editorRef.current, savedOffset); } catch (_e) { /* ignore */ }
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
          const displayHtml = activeFooterContent.replace(/\[Page \d+\]/g, `[Page ${pageNumber}]`)
                                                 .replace(/<span class="page-number-placeholder">\d+<\/span>/g, `<span class="page-number-placeholder">${pageNumber}</span>`);
          
          const isFocused = document.activeElement === footerRef.current;
          if (!isFocused && footerRef.current.innerHTML !== displayHtml) {
              footerRef.current.innerHTML = displayHtml;
          }
      }
  }, [activeFooterContent, pageNumber]);

  // Observer for main content - Removed to prevent double updates with onInput
  // useEffect(() => {
  //   if (!editorRef.current || readOnly || !onContentChange || selectedImage) return;
  //   const observer = new MutationObserver(() => {
  //       if (editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
  //   });
  //   observer.observe(editorRef.current, { characterData: true, childList: true, subtree: true, attributes: true });
  //   return () => observer.disconnect();
  // }, [onContentChange, pageNumber, readOnly, selectedImage]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (onContentChange) onContentChange(e.currentTarget.innerHTML, pageNumber - 1);
  };

  // ... (Table Nav, Keyboard, Smart Selection Logic - Keeping as is, simplified for brevity in XML if possible, but including full block for correctness)
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
          if (node.nodeName === 'TD' || node.nodeName === 'TH') { cell = node as HTMLTableCellElement; break; }
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
              Array.from(newRow.cells).forEach(c => c.innerHTML = '<br>');
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
    if (isKeyboardLocked && !selectionMode && !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key) && !(e.ctrlKey || e.metaKey)) {
         e.preventDefault(); return;
    }
    if ((e.ctrlKey || e.metaKey) && !e.altKey) {
        if (e.key.toLowerCase() === 'z') { e.preventDefault(); if (e.shiftKey) { redo(); } else { undo(); } return; }
        if (e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); return; }
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

  // Smart Selection Logic (Simplified for brevity but functional)
  const selectWord = () => { const sel = window.getSelection(); if (sel?.modify) { sel.modify('move', 'backward', 'word'); sel.modify('extend', 'forward', 'word'); } };
  const selectSentence = () => { const sel = window.getSelection(); if (sel?.modify) try { sel.modify('move', 'backward', 'sentence'); sel.modify('extend', 'forward', 'sentence'); } catch(e) { sel.modify('move', 'backward', 'line'); sel.modify('extend', 'forward', 'line'); } };
  const selectParagraph = (target: EventTarget | null) => {
      const sel = window.getSelection(); if (!sel) return;
      let node = target as Node | null;
      if (node?.nodeType === Node.TEXT_NODE) node = node.parentNode;
      while (node && node !== editorRef.current && (node as HTMLElement).tagName) {
          const el = node as HTMLElement;
          if (['P', 'H1', 'H2', 'H3', 'LI', 'DIV'].includes(el.tagName)) {
              const range = document.createRange(); range.selectNodeContents(el); sel.removeAllRanges(); sel.addRange(range); return;
          }
          node = node.parentNode;
      }
      if (sel.modify) { sel.modify('move', 'backward', 'paragraph'); sel.modify('extend', 'forward', 'paragraph'); }
  };
  const selectPage = () => { if (editorRef.current) { const range = document.createRange(); range.selectNodeContents(editorRef.current); window.getSelection()?.removeAllRanges(); window.getSelection()?.addRange(range); } };

  const handleSmartPointerDown = (e: React.PointerEvent) => {
      if (!selectionMode) return;
      smartSelectionTriggeredRef.current = false;
      if (!isHeaderFooterMode && document.caretRangeFromPoint) {
          const range = document.caretRangeFromPoint(e.clientX, e.clientY);
          if (range && editorRef.current?.contains(range.startContainer)) { window.getSelection()?.removeAllRanges(); window.getSelection()?.addRange(range); }
      }
      pointerStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
      if (wordPressTimerRef.current) clearTimeout(wordPressTimerRef.current);
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      if (superLongPressTimerRef.current) clearTimeout(superLongPressTimerRef.current);
      const target = e.target;
      wordPressTimerRef.current = setTimeout(() => { selectWord(); smartSelectionTriggeredRef.current = true; if (navigator.vibrate) navigator.vibrate(20); }, 1000);
      longPressTimerRef.current = setTimeout(() => { selectParagraph(target); smartSelectionTriggeredRef.current = true; if (navigator.vibrate) navigator.vibrate(50); }, 2000);
      superLongPressTimerRef.current = setTimeout(() => { selectPage(); smartSelectionTriggeredRef.current = true; if (navigator.vibrate) navigator.vibrate([50, 50, 50]); }, 3000);
  };
  const handleSmartPointerMove = (e: React.PointerEvent) => { if (!selectionMode || !pointerStartRef.current) return; if (Math.hypot(e.clientX - pointerStartRef.current.x, e.clientY - pointerStartRef.current.y) > 10) { if (wordPressTimerRef.current) clearTimeout(wordPressTimerRef.current); if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current); if (superLongPressTimerRef.current) clearTimeout(superLongPressTimerRef.current); pointerStartRef.current = null; } };
  const handleSmartPointerUp = (e: React.PointerEvent) => { if (!selectionMode) return; if (wordPressTimerRef.current) clearTimeout(wordPressTimerRef.current); if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current); if (superLongPressTimerRef.current) clearTimeout(superLongPressTimerRef.current); pointerStartRef.current = null; };
  const handleSmartClick = (e: React.MouseEvent) => { if (!selectionMode) return; if (smartSelectionTriggeredRef.current) { e.preventDefault(); e.stopPropagation(); return; } if (e.detail === 2) { selectSentence(); e.preventDefault(); e.stopPropagation(); } };

  const handlePageClick = (e: React.MouseEvent) => {
      if (e.target !== selectedImage) setSelectedImage(null);
      if (!((e.target as HTMLElement).closest('table'))) setSelectedTable(null);
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

  // Margins & Styles
  const getMarginsInches = () => {
    const m = config.margins;
    // Removed Math.max constraint to allow dynamic adjustment
    let top = m.top;
    const bottom = m.bottom;
    let left = m.left;
    let right = m.right;
    const gutter = m.gutter || 0;
    const isMirroredOrBookFold = ['mirrorMargins', 'bookFold'].includes(config.multiplePages || '');
    if (isMirroredOrBookFold) {
       const inside = m.left; const outside = m.right;
       const isOdd = pageNumber % 2 !== 0; 
       if (isOdd) { left = inside + (config.gutterPosition === 'left' ? gutter : 0); right = outside; } 
       else { left = outside; right = inside + (config.gutterPosition === 'left' ? gutter : 0); }
    } else {
        if (config.gutterPosition === 'top') top += gutter; else left += gutter;
    }
    return { top, right, bottom, left };
  };
  const margins = getMarginsInches();

  // Dynamic Header/Footer Distance Calculation
  // Scales down the distance if the margin is too small to accommodate the default distance
  const defaultHeaderDist = config.headerDistance || 0.5;
  const effectiveHeaderDist = Math.min(defaultHeaderDist, margins.top / 2);

  const defaultFooterDist = config.footerDistance || 0.5;
  const effectiveFooterDist = Math.min(defaultFooterDist, margins.bottom / 2);

  const getBackgroundStyle = (): React.CSSProperties => {
      const base: React.CSSProperties = { backgroundColor: config.pageColor || '#ffffff' };
      if (config.background === 'ruled') return { ...base, backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '100% 0.33in' };
      else if (config.background === 'grid') return { ...base, backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '0.2in 0.2in' };
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
          setTimeout(() => { if (headerRef.current) { headerRef.current.focus(); document.execCommand('selectAll', false, ''); } }, 10);
      }
  };
  const onFooterDoubleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (setActiveEditingArea && !isKeyboardLocked && !selectionMode) {
          setActiveEditingArea('footer');
          setTimeout(() => { if (footerRef.current) { footerRef.current.focus(); document.execCommand('selectAll', false, ''); } }, 10);
      }
  };
  const onBodyDoubleClick = (e: React.MouseEvent) => {
      if (activeEditingArea !== 'body' && setActiveEditingArea && !isKeyboardLocked && !selectionMode) {
          e.stopPropagation();
          setActiveEditingArea('body');
          setTimeout(() => { if (editorRef.current) editorRef.current.focus(); }, 10);
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
                transform: `scale(${scale})`, transformOrigin: 'top left',
                width: `${widthIn}in`, height: `${heightIn}in`,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)',
                paddingTop: `${margins.top}in`, paddingBottom: `${margins.bottom}in`,
                paddingLeft: `${margins.left}in`, paddingRight: `${margins.right}in`,
                boxSizing: 'border-box', ...getBackgroundStyle()
            }}
            onMouseDown={handlePageClick}
        >
            {/* Header Area */}
            <div 
                className={`absolute left-0 right-0 z-30 ${isHeaderFooterMode ? 'z-50' : ''}`}
                style={{ top: 0, height: `${margins.top}in`, maxHeight: `${safeMaxHeaderHeight}in`, paddingTop: `${effectiveHeaderDist}in`, paddingLeft: `${margins.left}in`, paddingRight: `${margins.right}in` }}
                onDoubleClick={onHeaderDoubleClick} onMouseDown={(e) => e.stopPropagation()} 
            >
                <div className={`w-full h-full relative ${isHeaderFooterMode ? 'border-b-2 border-dashed border-indigo-500 print:border-none' : 'hover:bg-slate-50/50'}`}>
                    {isHeaderFooterMode && <div className="header-footer-label bg-indigo-600 text-white print:hidden" style={{ left: 0, bottom: -2, transform: 'translateY(100%)' }}>{isFirstPage && useDifferentFirstPage ? "First Page Header" : "Header"}</div>}
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
                     <div className="transform -rotate-45 text-slate-300/40 font-bold text-[8rem] whitespace-nowrap select-none" style={{ color: 'rgba(0,0,0,0.08)' }}>{config.watermark}</div>
                 </div>
            )}

            {/* Body */}
            <div 
                className={`relative w-full h-full overflow-clip transition-opacity duration-300 ${isHeaderFooterMode ? 'opacity-50' : 'opacity-100'}`}
                style={{ ...getVerticalAlignStyle() }}
                onDoubleClick={onBodyDoubleClick} onMouseDown={(e) => e.stopPropagation()} 
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
                    onInput={handleInput} onKeyDown={handleKeyDown} onFocus={onFocus} onClick={handleEditorClick}
                    onContextMenu={handleContextMenu}
                    onPointerDown={handleSmartPointerDown} onPointerMove={handleSmartPointerMove} onPointerUp={handleSmartPointerUp} onPointerCancel={handleSmartPointerUp}
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
                {editorElement && tables.map((t, i) => (
                    <TableResizerOverlay key={`table-resizer-${i}`} target={t} container={editorElement} scale={scale} onUpdate={handleImageUpdate} />
                ))}
            </div>

            {/* Footer Area */}
            <div 
                className={`absolute left-0 right-0 z-30 ${isHeaderFooterMode ? 'z-50' : ''}`}
                style={{ bottom: 0, height: `${margins.bottom}in`, maxHeight: `${safeMaxFooterHeight}in`, paddingBottom: `${effectiveFooterDist}in`, paddingLeft: `${margins.left}in`, paddingRight: `${margins.right}in` }}
                onDoubleClick={onFooterDoubleClick} onMouseDown={(e) => e.stopPropagation()} 
            >
                 <div className={`w-full h-full relative flex flex-col justify-end ${isHeaderFooterMode ? 'border-t-2 border-dashed border-indigo-500 print:border-none' : 'hover:bg-slate-50/50'}`}>
                    {isHeaderFooterMode && <div className="header-footer-label footer-tag bg-indigo-600 text-white print:hidden" style={{ left: 0, top: -2, transform: 'translateY(-100%)' }}>{isFirstPage && useDifferentFirstPage ? "First Page Footer" : "Footer"}</div>}
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
        <div 
            ref={contextMenuRef}
            tabIndex={-1}
            id="table-context-menu"
            className={`fixed z-[9999] bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 min-w-[200px] text-sm max-h-[80vh] overflow-y-auto outline-none transition-all duration-200 ease-out origin-top-left ${
                contextMenu.visible 
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                    : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
            }`}
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
            onKeyDown={handleMenuKeyDown}
        >
            <div id="table-context-menu-title" className="px-3 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none border-b border-slate-100 dark:border-slate-700/50 mb-1">
                Table Actions
            </div>
            
            <button 
                id="tcm-btn-insert-row-above"
                onClick={() => handleContextAction('insertRowAbove')}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
            >
                <ArrowUpToLine size={15} className="text-slate-400" />
                <span>Insert Row Above</span>
            </button>
            <button 
                id="tcm-btn-insert-row-below"
                onClick={() => handleContextAction('insertRowBelow')}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
            >
                <ArrowDownToLine size={15} className="text-slate-400" />
                <span>Insert Row Below</span>
            </button>
            <button 
                id="tcm-btn-insert-col-left"
                onClick={() => handleContextAction('insertColLeft')}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
            >
                <ArrowLeftToLine size={15} className="text-slate-400" />
                <span>Insert Column Left</span>
            </button>
            <button 
                id="tcm-btn-insert-col-right"
                onClick={() => handleContextAction('insertColRight')}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
            >
                <ArrowRightToLine size={15} className="text-slate-400" />
                <span>Insert Column Right</span>
            </button>
            
            <div className="border-t border-slate-100 dark:border-slate-700/50 my-1" />
            
            <button 
                id="tcm-btn-merge-cells"
                onClick={() => handleContextAction('mergeCells')}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
            >
                <Merge size={15} className="text-slate-400" />
                <span>Merge Cells (Right)</span>
            </button>
            <button 
                id="tcm-btn-split-cells"
                onClick={() => handleContextAction('splitCells')}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
            >
                <Split size={15} className="text-slate-400" />
                <span>Split Cells</span>
            </button>
            
            <div className="border-t border-slate-100 dark:border-slate-700/50 my-1" />
            
            <button 
                id="tcm-btn-delete-row"
                onClick={() => handleContextAction('deleteRow')}
                className="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 text-red-600 dark:text-red-400"
            >
                <Trash2 size={15} className="text-red-400" />
                <span>Delete Row</span>
            </button>
            <button 
                id="tcm-btn-delete-col"
                onClick={() => handleContextAction('deleteCol')}
                className="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 text-red-600 dark:text-red-400"
            >
                <Trash2 size={15} className="text-red-400" />
                <span>Delete Column</span>
            </button>
            <button 
                id="tcm-btn-delete-table"
                onClick={() => handleContextAction('deleteTable')}
                className="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 text-red-600 dark:text-red-400"
            >
                <Trash2 size={15} className="text-red-400" />
                <span>Delete Table</span>
            </button>
            
            <div className="border-t border-slate-100 dark:border-slate-700/50 my-1" />

            <button 
                id="tcm-btn-sort-col"
                onClick={() => handleContextAction('sortColumn')}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
            >
                <ArrowUpDown size={15} className="text-slate-400" />
                <span>Sort Column</span>
            </button>
            
            <button 
                id="tcm-btn-properties"
                onClick={() => handleContextAction('properties')}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
            >
                <Settings size={15} className="text-slate-400" />
                <span>Table Properties</span>
            </button>
        </div>

        {/* Beautiful Table Properties Dialog Modal */}
        {isTablePropertiesOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                <div 
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-700 transform scale-100 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-5 border-b border-slate-100 dark:border-slate-700 pb-3">
                        <div className="flex items-center gap-2">
                            <LayoutGrid className="w-5 h-5 text-indigo-600" />
                            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Table Properties</h2>
                        </div>
                        <button 
                            onClick={() => setIsTablePropertiesOpen(false)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                        {/* Table Information */}
                        {propertiesTable && (
                            <div className="text-xs font-mono bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-150 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 flex justify-around">
                                <div><span className="text-slate-400">Rows:</span> {propertiesTable.rows.length}</div>
                                <div><span className="text-slate-400">Columns:</span> {propertiesTable.rows[0]?.cells.length || 0}</div>
                            </div>
                        )}

                        {/* Table Width */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Table Width
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {[
                                    { label: 'Full', value: '100%' },
                                    { label: '75%', value: '75%' },
                                    { label: '50%', value: '50%' },
                                    { label: 'Auto', value: 'auto' }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setTableWidth(opt.value)}
                                        className={`py-1.5 px-3 rounded-lg text-sm border font-medium transition-all ${
                                            tableWidth === opt.value
                                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                                : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-650 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Alignment */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Alignment
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Left', value: 'left' },
                                    { label: 'Center', value: 'center' },
                                    { label: 'Right', value: 'right' }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setTableAlign(opt.value)}
                                        className={`py-1.5 px-3 rounded-lg text-sm border font-medium transition-all ${
                                            tableAlign === opt.value
                                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                                : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-650 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cell Padding */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Cell Padding
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Small', value: 'small' },
                                    { label: 'Medium', value: 'medium' },
                                    { label: 'Large', value: 'large' }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setCellPadding(opt.value)}
                                        className={`py-1.5 px-3 rounded-lg text-sm border font-medium transition-all ${
                                            cellPadding === opt.value
                                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                                : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-650 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Header Background Color */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Header Row Background
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {[
                                    { label: 'None', value: 'transparent' },
                                    { label: 'Slate', value: '#f1f5f9' },
                                    { label: 'Blue', value: '#eff6ff' },
                                    { label: 'Red', value: '#fee2e2' },
                                    { label: 'Green', value: '#f0fdf4' }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setHeaderColor(opt.value)}
                                        className={`py-1 px-1 rounded-lg text-xs border transition-all truncate font-medium ${
                                            headerColor === opt.value
                                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                                : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-650 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Borders */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Border Color
                                </label>
                                <select
                                    value={borderColor}
                                    onChange={(e) => setBorderColor(e.target.value)}
                                    className="w-full text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg py-1.5 px-2 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="#cbd5e1">Slate Gray</option>
                                    <option value="#3b82f6">Ocean Blue</option>
                                    <option value="#ef4444">Coral Red</option>
                                    <option value="#22c55e">Emerald Green</option>
                                    <option value="none">No Borders</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Border Width
                                </label>
                                <select
                                    value={borderWidth}
                                    disabled={borderColor === 'none'}
                                    onChange={(e) => setBorderWidth(e.target.value)}
                                    className="w-full text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg py-1.5 px-2 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    <option value="1px">Thin (1px)</option>
                                    <option value="2px">Thick (2px)</option>
                                </select>
                            </div>
                        </div>

                        {/* Zebra Striping toggle */}
                        <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-700/50 mt-2">
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                                Alternating Zebra Striping
                            </span>
                            <button
                                onClick={() => setZebraStriping(!zebraStriping)}
                                className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                                    zebraStriping ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
                                }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                                        zebraStriping ? 'translate-x-4' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-6 border-t border-slate-100 dark:border-slate-700 pt-3">
                        <button 
                            onClick={() => setIsTablePropertiesOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={applyProperties}
                            className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-colors"
                        >
                            Apply Properties
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Beautiful Table Column Sort Modal */}
        {isSortModalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                <div 
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-700 transform scale-100 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-5 border-b border-slate-100 dark:border-slate-700 pb-3">
                        <div className="flex items-center gap-2">
                            <ArrowUpDown className="w-5 h-5 text-indigo-600" />
                            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Sort Column</h2>
                        </div>
                        <button 
                            onClick={() => setIsSortModalOpen(false)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="text-xs font-mono bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-150 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 flex justify-around">
                            <div><span className="text-slate-400">Sorting Column:</span> #{sortColIndex + 1}</div>
                        </div>

                        {/* Sort Direction */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Sort Order
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { label: 'Ascending (A-Z, 1-9)', value: 'asc' },
                                    { label: 'Descending (Z-A, 9-1)', value: 'desc' }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setSortDirection(opt.value as 'asc' | 'desc')}
                                        className={`py-2 px-3 rounded-lg text-sm border font-medium transition-all text-center ${
                                            sortDirection === opt.value
                                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                                : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-650 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Data Type Selection */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Data Type
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Auto', value: 'auto' },
                                    { label: 'Text', value: 'text' },
                                    { label: 'Number', value: 'number' }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setSortType(opt.value as 'auto' | 'text' | 'number')}
                                        className={`py-1.5 px-3 rounded-lg text-sm border font-medium transition-all ${
                                            sortType === opt.value
                                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                                : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-650 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Exclude Header Row */}
                        <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-700/50 mt-2">
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                                Exclude First Row (Header Row)
                            </span>
                            <button
                                onClick={() => setSortExcludeHeader(!sortExcludeHeader)}
                                className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                                    sortExcludeHeader ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
                                }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                                        sortExcludeHeader ? 'translate-x-4' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-6 border-t border-slate-100 dark:border-slate-700 pt-3">
                        <button 
                            onClick={() => setIsSortModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={applySortColumn}
                            className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-colors"
                        >
                            Sort
                        </button>
                    </div>
                </div>
            </div>
        )}
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
