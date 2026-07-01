/* eslint-disable react-hooks/immutability, @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';

interface TableResizerOverlayProps {
  target: HTMLTableElement;
  container: HTMLElement;
  scale: number;
  onUpdate: () => void;
}

export const TableResizerOverlay: React.FC<TableResizerOverlayProps> = ({
  target,
  container,
  scale,
  onUpdate,
}) => {
  const [handles, setHandles] = useState<{ cols: any[]; rows: any[] }>({ cols: [], rows: [] });
  const [isResizing, setIsResizing] = useState(false);
  const [activeHandle, setActiveHandle] = useState<{ type: 'col' | 'row'; index: number } | null>(null);

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
    setIsResizing(true);
    setActiveHandle({ type: 'col', index });
    document.body.style.cursor = 'col-resize';
    
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore
    }
    
    target.style.tableLayout = 'fixed';
    if (!target.style.width) {
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
