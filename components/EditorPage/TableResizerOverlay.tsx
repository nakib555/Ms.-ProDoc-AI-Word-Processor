/* eslint-disable react-hooks/immutability, @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useEditor } from '../../contexts/EditorContext';
import { buildTableGrid, getCellsInLogicalColumn, mergeContinuationTables } from '../../utils/tableUtils';

interface TableResizerOverlayProps {
  target: HTMLTableElement;
  container: HTMLElement;
  scale: number;
  onUpdate: () => void;
}

const getLogicalTableAndRowIndex = (targetTable: HTMLTableElement, targetRow: HTMLTableRowElement) => {
  const allPageTables = Array.from(document.querySelectorAll('.prodoc-page-wrapper table'));
  
  let logicalTableIndex = -1;
  let logicalRowIndex = -1;
  
  let currentLogicalTableIndex = -1;
  let currentRowCountInLogicalTable = 0;
  
  for (let t = 0; t < allPageTables.length; t++) {
    const tbl = allPageTables[t] as HTMLTableElement;
    const isContinuation = tbl.getAttribute('data-continuation') === 'true';
    
    if (!isContinuation) {
      currentLogicalTableIndex++;
      currentRowCountInLogicalTable = 0;
    }
    
    if (tbl === targetTable) {
      logicalTableIndex = currentLogicalTableIndex;
      const rows = Array.from(tbl.rows);
      let localRowIndex = 0;
      for (let r = 0; r < rows.length; r++) {
        if (rows[r] === targetRow) {
          logicalRowIndex = currentRowCountInLogicalTable + localRowIndex;
          break;
        }
        if (rows[r].getAttribute('data-repeated-header-row') !== 'true') {
          localRowIndex++;
        }
      }
      break;
    }
    
    const rows = Array.from(tbl.rows);
    let validRowsCount = 0;
    for (let r = 0; r < rows.length; r++) {
      if (rows[r].getAttribute('data-repeated-header-row') !== 'true') {
        validRowsCount++;
      }
    }
    currentRowCountInLogicalTable += validRowsCount;
  }
  
  return { logicalTableIndex, logicalRowIndex };
};

export const TableResizerOverlay: React.FC<TableResizerOverlayProps> = ({
  target,
  container,
  scale,
  onUpdate,
}) => {
  const [handles, setHandles] = useState<{ cols: any[]; rows: any[] }>({ cols: [], rows: [] });
  const [isResizing, setIsResizing] = useState(false);
  const [activeHandle, setActiveHandle] = useState<{ type: 'col' | 'row'; index: number } | null>(null);
  
  const { content, setContent, setIsTableResizing } = useEditor();
  
  useEffect(() => {
    return () => {
      document.body.classList.remove('is-table-resizing');
    };
  }, []);

  useEffect(() => {
    const updateHandles = () => {
      const parentEl = container.parentElement;
      if (!parentEl) return;
      const containerRect = parentEl.getBoundingClientRect();
      const tableRect = target.getBoundingClientRect();
      const safeScale = scale || 1;
      
      const cols = [];
      const grid = buildTableGrid(target);
      for (let colIdx = 0; colIdx < grid.colCount; colIdx++) {
        let repCell: HTMLTableCellElement | null = null;
        for (let r = 0; r < grid.matrix.length; r++) {
          const slot = grid.matrix[r][colIdx];
          if (slot && slot.originCol + slot.colSpan - 1 === colIdx && slot.colSpan === 1) {
            repCell = slot.cell;
            break;
          }
        }
        if (!repCell) {
          for (let r = 0; r < grid.matrix.length; r++) {
            const slot = grid.matrix[r][colIdx];
            if (slot && slot.originCol + slot.colSpan - 1 === colIdx) {
              repCell = slot.cell;
              break;
            }
          }
        }
        if (repCell) {
          const cellRect = repCell.getBoundingClientRect();
          cols.push({
            index: colIdx,
            left: (cellRect.right - containerRect.left) / safeScale,
            top: (tableRect.top - containerRect.top) / safeScale,
            height: tableRect.height / safeScale,
            cell: repCell,
          });
        }
      }

      const rows = [];
      for (let i = 0; i < target.rows.length; i++) {
        const row = target.rows[i];
        const rowRect = row.getBoundingClientRect();
        rows.push({
          index: i,
          left: (tableRect.left - containerRect.left) / safeScale,
          top: (rowRect.bottom - containerRect.top) / safeScale,
          width: tableRect.width / safeScale,
          row,
        });
      }
      
      setHandles({ cols, rows });
    };
    
    let rafId: number | null = null;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleUpdateHandles = () => {
      if (debounceTimer !== null) clearTimeout(debounceTimer);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      debounceTimer = setTimeout(() => {
        debounceTimer = null;
        rafId = requestAnimationFrame(() => {
          rafId = null;
          updateHandles();
        });
      }, 32);
    };

    updateHandles();
    
    const observer = new MutationObserver(scheduleUpdateHandles);
    observer.observe(target, { attributes: true, childList: true, subtree: true, characterData: true });
    
    const resizeObserver = new ResizeObserver(scheduleUpdateHandles);
    resizeObserver.observe(target);
    
    window.addEventListener('resize', scheduleUpdateHandles);
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleUpdateHandles);
      if (debounceTimer !== null) clearTimeout(debounceTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [target, container, scale, isResizing]);

  const handleColPointerDown = (e: React.PointerEvent<HTMLDivElement>, cell: HTMLTableCellElement, colIndex: number) => {
    e.preventDefault();
    e.stopPropagation();

    const firstRow = target.rows[0];
    if (!firstRow) return;
    const { logicalTableIndex } = getLogicalTableAndRowIndex(target, firstRow);
    if (logicalTableIndex === -1) return;

    const grid = buildTableGrid(target);
    if (colIndex < 0 || colIndex >= grid.colCount) return;

    const leftColCells = getCellsInLogicalColumn(target, colIndex);
    const hasNextCol = colIndex + 1 < grid.colCount;
    const rightColCells = hasNextCol ? getCellsInLogicalColumn(target, colIndex + 1) : [];

    // Find 1-span representative cells for reliable initial widths
    const leftRepCell = leftColCells.find((c) => (c.colSpan || 1) === 1) || cell;
    const rightRepCell = hasNextCol
      ? (rightColCells.find((c) => (c.colSpan || 1) === 1) || rightColCells[0] || null)
      : null;

    setIsResizing(true);
    setIsTableResizing(true);
    setActiveHandle({ type: 'col', index: colIndex });
    document.body.style.cursor = 'col-resize';
    document.body.classList.add('is-table-resizing');
    
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    
    target.classList.add('is-dragging');
    target.style.tableLayout = 'fixed';

    // Lock all column widths cleanly and clear minWidth so dragging can shrink as well as grow
    for (let c = 0; c < grid.colCount; c++) {
      const colCells = getCellsInLogicalColumn(target, c);
      const singleSpan = colCells.find((cl) => (cl.colSpan || 1) === 1);
      if (singleSpan && !singleSpan.style.width) {
        const measuredW = singleSpan.offsetWidth;
        colCells.forEach((cl) => {
          if ((cl.colSpan || 1) === 1) {
            cl.style.width = `${measuredW}px`;
            cl.style.minWidth = '';
          }
        });
      } else {
        colCells.forEach((cl) => {
          cl.style.minWidth = '';
        });
      }
    }

    if (!target.style.width) {
      target.style.width = `${target.offsetWidth}px`;
    }

    const handleEl = e.currentTarget as HTMLDivElement;
    const parentEl = container.parentElement;
    const containerRect = parentEl ? parentEl.getBoundingClientRect() : { left: 0 };
    const safeScale = scale || 1;
    const cellRect = leftRepCell.getBoundingClientRect();
    const startLeft = (cellRect.right - containerRect.left) / safeScale - 7 / safeScale;
    
    const startX = e.clientX;
    const startWidth = leftRepCell.offsetWidth;
    const nextStartWidth = rightRepCell ? rightRepCell.offsetWidth : 0;
    const tableStartWidth = target.offsetWidth;
    const initialContent = content;

    let latestActualWidth = startWidth;
    let latestNewNextWidth = nextStartWidth;
    let latestNewTableWidth = tableStartWidth;
    let latestActualNewWidth = startWidth;

    const handlePointerMove = (ev: PointerEvent) => {
      const deltaX = (ev.clientX - startX) / safeScale;
      
      if (handleEl) {
        handleEl.style.left = `${startLeft + deltaX}px`;
      }
      
      if (rightRepCell) {
        const newWidth = Math.max(20, startWidth + deltaX);
        latestNewNextWidth = Math.max(20, nextStartWidth - (newWidth - startWidth));
        latestActualWidth = startWidth + (nextStartWidth - latestNewNextWidth);
        
        leftColCells.forEach((c) => {
          if ((c.colSpan || 1) === 1) {
            c.style.width = `${latestActualWidth}px`;
            c.style.minWidth = '';
          }
        });
        rightColCells.forEach((c) => {
          if ((c.colSpan || 1) === 1) {
            c.style.width = `${latestNewNextWidth}px`;
            c.style.minWidth = '';
          }
        });
      } else {
        const newWidth = Math.max(20, startWidth + deltaX);
        const maxTableWidth = container.offsetWidth;
        latestNewTableWidth = tableStartWidth + (newWidth - startWidth);
        if (latestNewTableWidth > maxTableWidth) {
          latestNewTableWidth = maxTableWidth;
        }
        latestActualNewWidth = latestNewTableWidth - tableStartWidth + startWidth;

        target.style.width = `${latestNewTableWidth}px`;
        leftColCells.forEach((c) => {
          if ((c.colSpan || 1) === 1) {
            c.style.width = `${latestActualNewWidth}px`;
            c.style.minWidth = '';
          }
        });
      }
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      setIsTableResizing(false);
      setActiveHandle(null);
      document.body.style.cursor = '';
      document.body.classList.remove('is-table-resizing');
      target.classList.remove('is-dragging');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      // Apply final column widths to canonical content HTML ONCE on release
      const parser = new DOMParser();
      const doc = parser.parseFromString(initialContent, 'text/html');
      const body = doc.body;
      mergeContinuationTables(body);

      const tables = Array.from(body.querySelectorAll('table')) as HTMLTableElement[];
      const tbl = tables[logicalTableIndex];
      if (tbl) {
          tbl.style.tableLayout = 'fixed';
          const tblLeftCells = getCellsInLogicalColumn(tbl, colIndex);
          if (rightRepCell) {
              const tblRightCells = getCellsInLogicalColumn(tbl, colIndex + 1);
              tblLeftCells.forEach((c) => {
                if ((c.colSpan || 1) === 1) {
                  c.style.width = `${latestActualWidth}px`;
                  c.style.minWidth = '';
                }
              });
              tblRightCells.forEach((c) => {
                if ((c.colSpan || 1) === 1) {
                  c.style.width = `${latestNewNextWidth}px`;
                  c.style.minWidth = '';
                }
              });
          } else {
              tbl.style.width = `${latestNewTableWidth}px`;
              tblLeftCells.forEach((c) => {
                if ((c.colSpan || 1) === 1) {
                  c.style.width = `${latestActualNewWidth}px`;
                  c.style.minWidth = '';
                }
              });
          }
          setContent(body.innerHTML, true, { historyMode: 'immediate' });
      } else {
          onUpdate();
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handleRowPointerDown = (e: React.PointerEvent<HTMLDivElement>, row: HTMLTableRowElement, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const { logicalTableIndex, logicalRowIndex } = getLogicalTableAndRowIndex(target, row);
    if (logicalTableIndex === -1 || logicalRowIndex === -1) return;

    setIsResizing(true);
    setIsTableResizing(true);
    setActiveHandle({ type: 'row', index });
    document.body.style.cursor = 'row-resize';
    document.body.classList.add('is-table-resizing');
    
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    
    target.classList.add('is-dragging');

    const handleEl = e.currentTarget as HTMLDivElement;
    const parentEl = container.parentElement;
    const containerRect = parentEl ? parentEl.getBoundingClientRect() : { top: 0 };
    const safeScale = scale || 1;
    const rowRect = row.getBoundingClientRect();
    const startTop = (rowRect.bottom - containerRect.top) / safeScale - 7 / safeScale;

    const startY = e.clientY;
    const startHeight = row.offsetHeight;
    const initialContent = content;
    let latestNewHeight = startHeight;

    const handlePointerMove = (ev: PointerEvent) => {
      const deltaY = (ev.clientY - startY) / safeScale;
      if (handleEl) {
        handleEl.style.top = `${startTop + deltaY}px`;
      }
      latestNewHeight = Math.max(20, startHeight + deltaY);
      row.style.height = `${latestNewHeight}px`;
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      setIsTableResizing(false);
      setActiveHandle(null);
      document.body.style.cursor = '';
      document.body.classList.remove('is-table-resizing');
      target.classList.remove('is-dragging');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      const parser = new DOMParser();
      const doc = parser.parseFromString(initialContent, 'text/html');
      const body = doc.body;
      mergeContinuationTables(body);

      const tables = Array.from(body.querySelectorAll('table')) as HTMLTableElement[];
      const tbl = tables[logicalTableIndex];
      if (tbl && tbl.rows[logicalRowIndex]) {
          tbl.rows[logicalRowIndex].style.height = `${latestNewHeight}px`;
          setContent(body.innerHTML, true, { historyMode: 'immediate' });
      } else {
          onUpdate();
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <div className="absolute z-50 pointer-events-none" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
      {handles.cols.map((col, i) => (
        <div
          key={`col-${i}`}
          className={`absolute bg-blue-500 pointer-events-auto transition-opacity ${
            activeHandle?.type === 'col' && activeHandle.index === col.index ? 'opacity-50' : 'opacity-0 hover:opacity-50'
          }`}
          style={{
            left: col.left - 7 / scale,
            top: col.top,
            width: Math.max(10, 15 / scale),
            height: col.height,
            cursor: 'col-resize',
            touchAction: 'none',
          }}
          onPointerDown={(e) => handleColPointerDown(e, col.cell, col.index)}
        />
      ))}
      {handles.rows.map((row, i) => (
        <div
          key={`row-${i}`}
          className={`absolute bg-blue-500 pointer-events-auto transition-opacity ${
            activeHandle?.type === 'row' && activeHandle.index === row.index ? 'opacity-50' : 'opacity-0 hover:opacity-50'
          }`}
          style={{
            left: row.left,
            top: row.top - 7 / scale,
            width: row.width,
            height: Math.max(10, 15 / scale),
            cursor: 'row-resize',
            touchAction: 'none',
          }}
          onPointerDown={(e) => handleRowPointerDown(e, row.row, row.index)}
        />
      ))}
    </div>
  );
};
