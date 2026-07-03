/* eslint-disable react-hooks/immutability, @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useEditor } from '../../contexts/EditorContext';

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
    const updateHandles = () => {
      const parentEl = container.parentElement;
      if (!parentEl) return;
      const containerRect = parentEl.getBoundingClientRect();
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
            cell,
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
          row,
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

    const firstRow = target.rows[0];
    if (!firstRow) return;
    const { logicalTableIndex } = getLogicalTableAndRowIndex(target, firstRow);
    if (logicalTableIndex === -1) return;

    setIsResizing(true);
    setIsTableResizing(true);
    setActiveHandle({ type: 'col', index });
    document.body.style.cursor = 'col-resize';
    
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore
    }
    
    target.classList.add('is-dragging');
    target.style.tableLayout = 'fixed';
    if (!target.style.width) {
      target.style.width = `${target.offsetWidth}px`;
    }
    
    const startX = e.clientX;
    const startWidth = cell.offsetWidth;
    const nextCell = cell.parentElement?.children[index + 1] as HTMLTableCellElement | null;
    const nextStartWidth = nextCell ? nextCell.offsetWidth : 0;
    const tableStartWidth = target.offsetWidth;
    const initialContent = content;

    const handlePointerMove = (ev: PointerEvent) => {
      const deltaX = (ev.clientX - startX) / scale;
      
      let actualWidth = startWidth;
      let newNextWidth = nextStartWidth;
      let newTableWidth = tableStartWidth;
      let actualNewWidth = startWidth;

      if (nextCell) {
        const newWidth = Math.max(20, startWidth + deltaX);
        newNextWidth = Math.max(20, nextStartWidth - (newWidth - startWidth));
        actualWidth = startWidth + (nextStartWidth - newNextWidth);
        
        for (let i = 0; i < target.rows.length; i++) {
          const r = target.rows[i];
          if (r.cells[index]) r.cells[index].style.width = `${actualWidth}px`;
          if (r.cells[index + 1]) r.cells[index + 1].style.width = `${newNextWidth}px`;
        }
      } else {
        const newWidth = Math.max(20, startWidth + deltaX);
        const maxTableWidth = container.offsetWidth;
        newTableWidth = tableStartWidth + (newWidth - startWidth);
        if (newTableWidth > maxTableWidth) {
          newTableWidth = maxTableWidth;
        }
        actualNewWidth = newTableWidth - tableStartWidth + startWidth;

        target.style.width = `${newTableWidth}px`;
        for (let i = 0; i < target.rows.length; i++) {
          const r = target.rows[i];
          if (r.cells[index]) r.cells[index].style.width = `${actualNewWidth}px`;
        }
      }

      // Update global HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(initialContent, 'text/html');
      const body = doc.body;

      const splitTables = Array.from(body.querySelectorAll('table[data-continuation="true"]'));
      splitTables.forEach(splitTable => {
          const repeatedHeaders = Array.from(splitTable.querySelectorAll('tr[data-repeated-header-row="true"]'));
          repeatedHeaders.forEach(rh => rh.remove());
          
          const prev = splitTable.previousElementSibling;
          if (prev && prev.tagName === 'TABLE' && prev.getAttribute('data-split-bottom') === 'true') {
              while (splitTable.firstChild) prev.appendChild(splitTable.firstChild);
              prev.removeAttribute('data-split-bottom');
              splitTable.remove();
          } else {
              splitTable.removeAttribute('data-continuation');
          }
      });

      const tables = Array.from(body.querySelectorAll('table'));
      const tbl = tables[logicalTableIndex];
      if (tbl) {
          if (nextCell) {
              for (let i = 0; i < tbl.rows.length; i++) {
                  const r = tbl.rows[i];
                  if (r.cells[index]) r.cells[index].style.width = `${actualWidth}px`;
                  if (r.cells[index + 1]) r.cells[index + 1].style.width = `${newNextWidth}px`;
              }
          } else {
              tbl.style.width = `${newTableWidth}px`;
              for (let i = 0; i < tbl.rows.length; i++) {
                  const r = tbl.rows[i];
                  if (r.cells[index]) r.cells[index].style.width = `${actualNewWidth}px`;
              }
          }
          const updatedContent = body.innerHTML;
          setContent(updatedContent);
      }
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      setIsTableResizing(false);
      setActiveHandle(null);
      document.body.style.cursor = '';
      target.classList.remove('is-dragging');
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
    
    const { logicalTableIndex, logicalRowIndex } = getLogicalTableAndRowIndex(target, row);
    if (logicalTableIndex === -1 || logicalRowIndex === -1) return;

    setIsResizing(true);
    setIsTableResizing(true);
    setActiveHandle({ type: 'row', index });
    document.body.style.cursor = 'row-resize';
    
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore
    }
    
    target.classList.add('is-dragging');
    const startY = e.clientY;
    const startHeight = row.offsetHeight;
    const initialContent = content;

    const handlePointerMove = (ev: PointerEvent) => {
      const deltaY = (ev.clientY - startY) / scale;
      const newHeight = Math.max(20, startHeight + deltaY);
      row.style.height = `${newHeight}px`;

      // Parse the initial content, merge split tables, set row height, and update global content
      const parser = new DOMParser();
      const doc = parser.parseFromString(initialContent, 'text/html');
      const body = doc.body;

      const splitTables = Array.from(body.querySelectorAll('table[data-continuation="true"]'));
      splitTables.forEach(splitTable => {
          const repeatedHeaders = Array.from(splitTable.querySelectorAll('tr[data-repeated-header-row="true"]'));
          repeatedHeaders.forEach(rh => rh.remove());
          
          const prev = splitTable.previousElementSibling;
          if (prev && prev.tagName === 'TABLE' && prev.getAttribute('data-split-bottom') === 'true') {
              while (splitTable.firstChild) prev.appendChild(splitTable.firstChild);
              prev.removeAttribute('data-split-bottom');
              splitTable.remove();
          } else {
              splitTable.removeAttribute('data-continuation');
          }
      });

      const tables = Array.from(body.querySelectorAll('table'));
      const tbl = tables[logicalTableIndex];
      if (tbl && tbl.rows[logicalRowIndex]) {
          tbl.rows[logicalRowIndex].style.height = `${newHeight}px`;
          const updatedContent = body.innerHTML;
          setContent(updatedContent);
      }
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      setIsTableResizing(false);
      setActiveHandle(null);
      document.body.style.cursor = '';
      target.classList.remove('is-dragging');
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
