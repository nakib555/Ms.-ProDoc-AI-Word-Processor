
import React, { useState, useEffect } from 'react';
import { RibbonSection } from '../../../../common/RibbonSection';
import { RibbonButton } from '../../../../common/RibbonButton';
import { 
  MousePointer2, Grid, Settings, Eraser, PenLine, Trash2, 
  ArrowUpToLine, ArrowDownToLine, ArrowLeftToLine, ArrowRightToLine,
  Merge, Split, Scaling, AlignLeft, AlignCenter, AlignRight,
  AlignJustify, ArrowDownAZ, Type, Calculator, TableProperties,
  Maximize, Minimize, Sparkles, ChevronUp, ChevronDown
} from 'lucide-react';
import { useEditor } from '../../../../../../contexts/EditorContext';
import { TablePropertiesDialog } from '../TablePropertiesDialog';
import { TableFormulaDialog } from '../TableFormulaDialog';
import { BorderTool } from './BorderTool';

export const TableLayoutTab: React.FC = () => {
  const { executeCommand } = useEditor();
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const [isAutoFitOpen, setIsAutoFitOpen] = useState(false);
  const [activeTable, setActiveTable] = useState<HTMLTableElement | null>(null);
  const [activeCell, setActiveCell] = useState<HTMLTableCellElement | null>(null);

  // MS Word-style Cell Size Steppers
  const [rowHeight, setRowHeight] = useState<number>(32);
  const [colWidth, setColWidth] = useState<number>(120);
  const [resizeScope, setResizeScope] = useState<'column' | 'cell'>('column');

  // --- Helper Functions ---
  const runOnCell = (fn: (cell: HTMLTableCellElement) => void) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      let node = selection.anchorNode as HTMLElement;
      while(node && node.nodeName !== 'TD' && node.nodeName !== 'TH') {
          node = node.parentNode as HTMLElement;
          if (!node || node.nodeName === 'BODY') return;
      }
      if (node) {
          const editorEl = node.closest('.prodoc-editor');
          fn(node as HTMLTableCellElement);
          if (editorEl) {
              editorEl.dispatchEvent(new Event('input', { bubbles: true }));
          }
      }
  };

  const runOnRow = (fn: (row: HTMLTableRowElement) => void) => {
      runOnCell((cell) => {
          const row = cell.parentNode as HTMLTableRowElement;
          if (row) fn(row);
      });
  };

  const runOnTable = (fn: (table: HTMLTableElement) => void) => {
      runOnCell((cell) => {
          const table = cell.closest('table');
          if (table) fn(table);
      });
  };

  // Detect cell dimensions live when cursor changes position
  useEffect(() => {
    const handleSelectionChange = () => {
      runOnCell((cell) => {
        if (cell) {
          const rect = cell.getBoundingClientRect();
          if (rect.width > 0) setColWidth(Math.round(rect.width));
          if (rect.height > 0) setRowHeight(Math.round(rect.height));
        }
      });
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  // --- Actions ---

  const withResizeTransition = (fn: (table: HTMLTableElement) => void) => {
      runOnTable((table) => {
          table.classList.add('is-resizing');
          fn(table);
          setTimeout(() => {
              table.classList.remove('is-resizing');
          }, 300);
      });
  };

  const deleteRow = () => {
      runOnTable((table) => {
          const selection = window.getSelection();
          if (!selection || selection.rangeCount === 0) return;
          let node = selection.anchorNode as HTMLElement;
          while(node && node.nodeName !== 'TR') {
              node = node.parentNode as HTMLElement;
              if (!node || node.nodeName === 'BODY') return;
          }
          if (node && node.nodeName === 'TR') {
              table.classList.add('is-resizing');
              node.classList.remove('is-inserted');
              node.classList.add('is-deleting');
              node.addEventListener('animationend', () => {
                  node.remove();
                  table.classList.remove('is-resizing');
                  const editorEl = table.closest('.prodoc-editor');
                  if (editorEl) {
                      editorEl.dispatchEvent(new Event('input', { bubbles: true }));
                  }
              }, { once: true });
          }
      });
  };
  
  const deleteCol = () => withResizeTransition((table) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      let node = selection.anchorNode as HTMLElement;
      while(node && node.nodeName !== 'TD' && node.nodeName !== 'TH') {
          node = node.parentNode as HTMLElement;
          if (!node || node.nodeName === 'BODY') return;
      }
      if (node) {
          const index = (node as HTMLTableCellElement).cellIndex;
          for (let i = 0; i < table.rows.length; i++) {
              if (table.rows[i].cells[index]) table.rows[i].deleteCell(index);
          }
      }
  });

  const deleteTable = () => runOnTable((table) => table.remove());

  const insertRow = (where: 'above' | 'below') => runOnTable((table) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      let node = selection.anchorNode as HTMLElement;
      while(node && node.nodeName !== 'TR') {
          node = node.parentNode as HTMLElement;
          if (!node || node.nodeName === 'BODY') return;
      }
      if (node && node.nodeName === 'TR') {
          table.classList.add('is-resizing');
          const row = node as HTMLTableRowElement;
          const newRow = row.parentNode!.insertBefore(row.cloneNode(true), where === 'above' ? row : row.nextSibling);
          Array.from(newRow.childNodes).forEach((c: any) => c.innerHTML = '<br>');

          newRow.classList.remove('is-deleting');
          requestAnimationFrame(() => {
              newRow.classList.add('is-inserted');
          });

          newRow.addEventListener('animationend', () => {
              newRow.classList.remove('is-inserted');
              table.classList.remove('is-resizing');
          }, { once: true });
      }
  });

  const insertCol = (where: 'left' | 'right') => withResizeTransition((table) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      let node = selection.anchorNode as HTMLElement;
      while(node && node.nodeName !== 'TD' && node.nodeName !== 'TH') {
          node = node.parentNode as HTMLElement;
          if (!node || node.nodeName === 'BODY') return;
      }
      if (node) {
          const cell = node as HTMLTableCellElement;
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
      }
  });

  const mergeCells = () => runOnCell((cell) => {
      const nextSibling = cell.nextElementSibling as HTMLTableCellElement;
      if (nextSibling) {
          const currentColSpan = cell.colSpan || 1;
          const nextColSpan = nextSibling.colSpan || 1;
          cell.colSpan = currentColSpan + nextColSpan;
          
          // Merge content
          if (nextSibling.innerText.trim()) {
              cell.innerHTML += " " + nextSibling.innerHTML;
          }
          nextSibling.remove();
      }
  });

  const splitCells = () => runOnCell((cell) => {
      const colspan = cell.colSpan;
      if (colspan > 1) {
          // If currently spanned, reduce span and insert new cell
          cell.colSpan = Math.floor(colspan / 2);
          const newCell = cell.cloneNode(true) as HTMLTableCellElement;
          newCell.colSpan = Math.ceil(colspan / 2);
          newCell.innerHTML = "<br>"; 
          cell.parentNode?.insertBefore(newCell, cell.nextSibling);
      } else {
          // Split a standard cell: This forces a table structure change or insert
          // Simple approach: Insert a new cell next to it.
          const newCell = cell.cloneNode(true) as HTMLTableCellElement;
          newCell.innerHTML = "<br>";
          cell.parentNode?.insertBefore(newCell, cell.nextSibling);
      }
  });

  const splitTable = () => runOnRow((row) => {
      const table = row.closest('table');
      if (!table) return;
      
      const rowIndex = row.rowIndex;
      if (rowIndex === 0) return; // Can't split at top

      const newTable = table.cloneNode(false) as HTMLTableElement; // Clone structure/styles only
      
      // Move rows to new table
      const rows = Array.from(table.rows);
      for (let i = rowIndex; i < rows.length; i++) {
          newTable.appendChild(rows[i]);
      }

      // Insert spacing and new table
      const spacer = document.createElement('p');
      spacer.innerHTML = '<br>';
      table.parentNode?.insertBefore(spacer, table.nextSibling);
      table.parentNode?.insertBefore(newTable, spacer.nextSibling);
  });

  const setAlign = (vertical: string, horizontal: string) => runOnCell((cell) => {
      cell.style.verticalAlign = vertical;
      cell.style.textAlign = horizontal;
  });

  const setTextDirection = () => runOnCell((cell) => {
      const current = cell.style.writingMode;
      if (current === 'vertical-rl') {
          cell.style.writingMode = 'horizontal-tb';
          cell.style.transform = 'none';
      } else {
          cell.style.writingMode = 'vertical-rl';
          cell.style.transform = 'rotate(180deg)';
      }
  });

  const autoFit = (mode: 'contents' | 'window' | 'fixed') => runOnTable((table) => {
      table.classList.add('is-resizing');
      if (mode === 'window') {
          table.style.width = '100%';
          table.style.tableLayout = 'fixed';
          for (let i = 0; i < table.rows.length; i++) {
              const row = table.rows[i];
              for (let j = 0; j < row.cells.length; j++) {
                  row.cells[j].style.width = '';
              }
          }
      } else if (mode === 'contents') {
          table.style.width = 'auto';
          table.style.tableLayout = 'auto';
          for (let i = 0; i < table.rows.length; i++) {
              const row = table.rows[i];
              for (let j = 0; j < row.cells.length; j++) {
                  row.cells[j].style.width = '';
              }
          }
      } else if (mode === 'fixed') {
          table.style.tableLayout = 'fixed';
          // Lock current width of columns
          for (let i = 0; i < table.rows.length; i++) {
              const row = table.rows[i];
              for (let j = 0; j < row.cells.length; j++) {
                  const cell = row.cells[j];
                  if (!cell.style.width) {
                      cell.style.width = `${cell.offsetWidth}px`;
                  }
              }
          }
      }
      setTimeout(() => {
          table.classList.remove('is-resizing');
      }, 300);
  });

  const distributeRows = () => runOnTable((table) => {
      table.classList.add('is-resizing');
      const rows = Array.from(table.rows);
      // Calculate max height
      let maxH = 0;
      rows.forEach(r => maxH = Math.max(maxH, r.getBoundingClientRect().height));
      // Apply to all
      rows.forEach(r => r.style.height = `${maxH}px`);
      setTimeout(() => {
          table.classList.remove('is-resizing');
      }, 300);
  });

  const distributeCols = () => runOnTable((table) => {
      table.classList.add('is-resizing');
      // Simple equal distribution for first row cells
      if (table.rows.length > 0) {
          const cells = Array.from(table.rows[0].cells);
          const pct = 100 / cells.length;
          cells.forEach(c => c.style.width = `${pct}%`);
      }
      setTimeout(() => {
          table.classList.remove('is-resizing');
      }, 300);
  });

  const openProperties = () => {
      runOnTable((table) => {
          setActiveTable(table);
          setIsPropertiesOpen(true);
      });
  };

  const applyHeaderShading = (color: string) => runOnTable((table) => {
      const rows = Array.from(table.rows);
      if (rows.length > 0) {
          const firstRow = rows[0];
          Array.from(firstRow.cells).forEach((c) => {
              const cell = c as HTMLTableCellElement;
              cell.style.backgroundColor = color;
              if (color && color !== 'transparent') {
                  // If dark header, make text white, otherwise default text color
                  if (color === '#1e293b' || color === '#1e3a8a' || color === '#115e59') {
                      cell.style.color = '#ffffff';
                      cell.style.fontWeight = 'bold';
                  } else {
                      cell.style.color = '#1e293b';
                      cell.style.fontWeight = 'bold';
                  }
              } else {
                  cell.style.color = '';
              }
          });
      }
  });

  const applyAlternatingShading = (color: string) => runOnTable((table) => {
      const rows = Array.from(table.rows);
      rows.forEach((row, rowIndex) => {
          if (rowIndex === 0) return; // Skip header row to avoid conflict
          const cells = Array.from(row.cells);
          cells.forEach((c) => {
              const cell = c as HTMLTableCellElement;
              if (rowIndex % 2 === 1) { // Alternated lines
                  cell.style.backgroundColor = color;
              } else {
                  cell.style.backgroundColor = '';
              }
          });
      });
  });

  const clearTableShading = () => runOnTable((table) => {
      const cells = table.querySelectorAll('td, th');
      cells.forEach((c) => {
          const cell = c as HTMLTableCellElement;
          cell.style.backgroundColor = '';
          cell.style.color = '';
      });
  });

  const autoFormatTable = () => runOnTable((table) => {
      const rows = Array.from(table.rows);
      if (rows.length === 0) return;

      let totalCells = 0;
      let numericCells = 0;
      let filledCells = 0;
      let totalLength = 0;

      // Matches numbers, percentages, currency, and scientific notation
      const numericRegex = /^\s*[-+]?\$?\s*?\(?\s*?\d{1,3}(,\d{3})*(\.\d+)?\s*?%?\s*?\)?\s*$/;

      rows.forEach((row) => {
          const cells = Array.from(row.cells);
          cells.forEach((cell) => {
              totalCells++;
              const text = cell.textContent?.trim() || '';
              if (text) {
                  filledCells++;
                  totalLength += text.length;
                  if (numericRegex.test(text)) {
                      numericCells++;
                  }
              }
          });
      });

      const numericRatio = filledCells > 0 ? numericCells / filledCells : 0;
      const density = totalCells > 0 ? totalLength / totalCells : 0;

      // Clear previous styles to avoid overlays
      const allCells = table.querySelectorAll('td, th');
      allCells.forEach((c) => {
          const cell = c as HTMLTableCellElement;
          cell.style.backgroundColor = '';
          cell.style.color = '';
          cell.style.fontWeight = '';
          cell.style.textAlign = '';
          cell.style.border = '1px solid #cbd5e1';
          cell.style.padding = '6px 10px';
      });

      if (numericRatio >= 0.35) {
          // Quantitative/Financial dense style
          const firstRow = rows[0];
          if (firstRow) {
              Array.from(firstRow.cells).forEach((c) => {
                  const cell = c as HTMLTableCellElement;
                  cell.style.backgroundColor = '#1e3a8a'; // Deep Navy Blue
                  cell.style.color = '#ffffff';
                  cell.style.fontWeight = 'bold';
              });
          }

          rows.forEach((row, rowIndex) => {
              if (rowIndex === 0) return;
              const zebraColor = rowIndex % 2 === 1 ? '#f8fafc' : '';
              const isLastRow = rowIndex === rows.length - 1;
              const rowText = row.textContent?.toLowerCase() || '';
              const isTotalsRow = isLastRow && (rowText.includes('total') || rowText.includes('sum') || rowText.includes('average'));

              Array.from(row.cells).forEach((c) => {
                  const cell = c as HTMLTableCellElement;
                  if (zebraColor) {
                      cell.style.backgroundColor = zebraColor;
                  }
                  
                  const cellText = cell.textContent?.trim() || '';
                  if (numericRegex.test(cellText)) {
                      cell.style.textAlign = 'right';
                  } else {
                      cell.style.textAlign = 'left';
                  }

                  if (isTotalsRow) {
                      cell.style.fontWeight = 'bold';
                      cell.style.borderTop = '2px double #475569';
                      cell.style.borderBottom = '2px double #475569';
                      cell.style.backgroundColor = '#f1f5f9';
                  }
              });
          });
      } else if (density > 15) {
          // Editorial/Text Specification layout style
          const firstRow = rows[0];
          if (firstRow) {
              Array.from(firstRow.cells).forEach((c) => {
                  const cell = c as HTMLTableCellElement;
                  cell.style.backgroundColor = '#0f766e'; // Dark Teal
                  cell.style.color = '#ffffff';
                  cell.style.fontWeight = 'bold';
              });
          }

          rows.forEach((row, rowIndex) => {
              if (rowIndex === 0) return;
              const zebraColor = rowIndex % 2 === 1 ? '#f0fdfa' : '';
              Array.from(row.cells).forEach((c) => {
                  const cell = c as HTMLTableCellElement;
                  if (zebraColor) {
                      cell.style.backgroundColor = zebraColor;
                  }
                  cell.style.textAlign = 'left';
                  cell.style.padding = '8px 12px';
              });
          });
      } else {
          // Clean Simple layout style
          const firstRow = rows[0];
          if (firstRow) {
              Array.from(firstRow.cells).forEach((c) => {
                  const cell = c as HTMLTableCellElement;
                  cell.style.backgroundColor = '#f1f5f9';
                  cell.style.color = '#0f172a';
                  cell.style.fontWeight = 'bold';
              });
          }

          rows.forEach((row, rowIndex) => {
              if (rowIndex === 0) return;
              const zebraColor = rowIndex % 2 === 1 ? '#f8fafc' : '';
              Array.from(row.cells).forEach((c) => {
                  const cell = c as HTMLTableCellElement;
                  if (zebraColor) {
                      cell.style.backgroundColor = zebraColor;
                  }
                  cell.style.textAlign = 'center';
              });
          });
      }
  });

  return (
    <div className="flex h-full items-center gap-2 px-1 py-0.5">
      {/* 1. Table Management Section */}
      <RibbonSection title="Table">
        <div className="flex items-center h-full gap-1 p-1 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
          <RibbonButton 
            icon={MousePointer2} 
            label="Select" 
            title="Select Table" 
            onClick={() => executeCommand('selectAll')} 
          />
          <RibbonButton 
            icon={Grid} 
            label="Gridlines" 
            title="Toggle Table Gridlines" 
            onClick={() => {}} 
          />
          <RibbonButton 
            icon={TableProperties} 
            label="Properties" 
            title="Table Properties" 
            onClick={openProperties} 
          />
        </div>
      </RibbonSection>

      {/* 2. Rows & Columns Section */}
      <RibbonSection title="Rows & Columns">
        <div className="flex items-center h-full gap-1.5 p-1 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
          {/* Insert Controls */}
          <div className="flex flex-col gap-1 pr-1.5 border-r border-slate-200 dark:border-slate-700">
            <button
              onMouseDown={(e) => e.preventDefault()}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
              onClick={() => insertRow('above')}
              title="Insert Row Above"
            >
              <ArrowUpToLine size={13} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Above</span>
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
              onClick={() => insertRow('below')}
              title="Insert Row Below"
            >
              <ArrowDownToLine size={13} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Below</span>
            </button>
          </div>

          <div className="flex flex-col gap-1 pr-1.5 border-r border-slate-200 dark:border-slate-700">
            <button
              onMouseDown={(e) => e.preventDefault()}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
              onClick={() => insertCol('left')}
              title="Insert Column Left"
            >
              <ArrowLeftToLine size={13} className="text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
              <span>Left</span>
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
              onClick={() => insertCol('right')}
              title="Insert Column Right"
            >
              <ArrowRightToLine size={13} className="text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
              <span>Right</span>
            </button>
          </div>

          {/* Delete Controls */}
          <div className="flex flex-col gap-1">
            <button
              onMouseDown={(e) => e.preventDefault()}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              onClick={deleteRow}
              title="Delete Current Row"
            >
              <Trash2 size={13} className="flex-shrink-0" />
              <span>Del Row</span>
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              onClick={deleteCol}
              title="Delete Current Column"
            >
              <Trash2 size={13} className="flex-shrink-0" />
              <span>Del Col</span>
            </button>
          </div>
        </div>
      </RibbonSection>

      {/* 3. Merge & Split Section */}
      <RibbonSection title="Merge & Split">
        <div className="flex flex-col justify-center h-full gap-1 p-1 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs min-w-[90px]">
          <button
            onMouseDown={(e) => e.preventDefault()}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
            onClick={mergeCells}
            title="Merge Selected Cells Right"
          >
            <Merge size={13} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <span>Merge Right</span>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
            onClick={splitCells}
            title="Split Current Cell"
          >
            <Split size={13} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <span>Split Cells</span>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
            onClick={splitTable}
            title="Split Table into Two"
          >
            <Split size={13} className="rotate-90 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <span>Split Table</span>
          </button>
        </div>
      </RibbonSection>

      {/* 4. Cell Size Section (MS Word Parity: Row Height, Column Width & Scope) */}
      <RibbonSection title="Cell Size">
        <div className="flex items-center h-full gap-2 p-1.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
          
          {/* Row Height & Column Width Controls */}
          <div className="flex flex-col gap-1">
            {/* Height Stepper */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase w-6">H</span>
              <input
                type="text"
                value={`${rowHeight}px`}
                onChange={(e) => {
                  const val = parseInt(e.target.value.replace(/\D/g, ''), 10);
                  if (!isNaN(val) && val >= 15) {
                    setRowHeight(val);
                    runOnRow((row) => {
                      row.style.height = `${val}px`;
                      Array.from(row.cells).forEach(c => { c.style.height = `${val}px`; });
                    });
                  }
                }}
                className="w-11 text-center text-xs font-semibold text-slate-800 dark:text-slate-100 bg-transparent outline-none"
              />
              <div className="flex flex-col -space-y-0.5">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    const next = rowHeight + 2;
                    setRowHeight(next);
                    runOnRow((row) => {
                      row.style.height = `${next}px`;
                      Array.from(row.cells).forEach(c => { c.style.height = `${next}px`; });
                    });
                  }}
                  className="p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 hover:text-indigo-600 transition-colors"
                  title="Increase Row Height"
                >
                  <ChevronUp size={11} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    const next = Math.max(16, rowHeight - 2);
                    setRowHeight(next);
                    runOnRow((row) => {
                      row.style.height = `${next}px`;
                      Array.from(row.cells).forEach(c => { c.style.height = `${next}px`; });
                    });
                  }}
                  className="p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 hover:text-indigo-600 transition-colors"
                  title="Decrease Row Height"
                >
                  <ChevronDown size={11} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Width Stepper */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase w-6">W</span>
              <input
                type="text"
                value={`${colWidth}px`}
                onChange={(e) => {
                  const val = parseInt(e.target.value.replace(/\D/g, ''), 10);
                  if (!isNaN(val) && val >= 25) {
                    setColWidth(val);
                    runOnCell((cell) => {
                      if (resizeScope === 'cell') {
                        cell.style.width = `${val}px`;
                        cell.style.minWidth = `${val}px`;
                      } else {
                        const table = cell.closest('table');
                        if (!table) return;
                        const idx = cell.cellIndex;
                        Array.from(table.rows).forEach(r => {
                          if (r.cells[idx]) {
                            r.cells[idx].style.width = `${val}px`;
                            r.cells[idx].style.minWidth = `${val}px`;
                          }
                        });
                      }
                    });
                  }
                }}
                className="w-11 text-center text-xs font-semibold text-slate-800 dark:text-slate-100 bg-transparent outline-none"
              />
              <div className="flex flex-col -space-y-0.5">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    const next = colWidth + 5;
                    setColWidth(next);
                    runOnCell((cell) => {
                      if (resizeScope === 'cell') {
                        cell.style.width = `${next}px`;
                        cell.style.minWidth = `${next}px`;
                      } else {
                        const table = cell.closest('table');
                        if (!table) return;
                        const idx = cell.cellIndex;
                        Array.from(table.rows).forEach(r => {
                          if (r.cells[idx]) {
                            r.cells[idx].style.width = `${next}px`;
                            r.cells[idx].style.minWidth = `${next}px`;
                          }
                        });
                      }
                    });
                  }}
                  className="p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 hover:text-indigo-600 transition-colors"
                  title="Increase Width"
                >
                  <ChevronUp size={11} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    const next = Math.max(25, colWidth - 5);
                    setColWidth(next);
                    runOnCell((cell) => {
                      if (resizeScope === 'cell') {
                        cell.style.width = `${next}px`;
                        cell.style.minWidth = `${next}px`;
                      } else {
                        const table = cell.closest('table');
                        if (!table) return;
                        const idx = cell.cellIndex;
                        Array.from(table.rows).forEach(r => {
                          if (r.cells[idx]) {
                            r.cells[idx].style.width = `${next}px`;
                            r.cells[idx].style.minWidth = `${next}px`;
                          }
                        });
                      }
                    });
                  }}
                  className="p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 hover:text-indigo-600 transition-colors"
                  title="Decrease Width"
                >
                  <ChevronDown size={11} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Scope Selector: Entire Column vs Selected Cell (Word Parity) */}
          <div className="flex flex-col gap-1 border-l border-slate-200 dark:border-slate-700 pl-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Scope</span>
            <div className="flex flex-col bg-slate-200/70 dark:bg-slate-700/60 p-0.5 rounded-lg gap-0.5">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setResizeScope('column')}
                className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md transition-all ${
                  resizeScope === 'column'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Apply Width to Entire Column"
              >
                Col
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setResizeScope('cell')}
                className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md transition-all ${
                  resizeScope === 'cell'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Apply Width to Selected Cell Only"
              >
                Cell
              </button>
            </div>
          </div>

          <div className="w-px h-7 bg-slate-200 dark:bg-slate-700 mx-0.5" />

          {/* AutoFit Menu */}
          <div className="relative flex items-center h-full">
            <RibbonButton 
              icon={TableProperties} 
              label="AutoFit" 
              hasArrow 
              title="AutoFit Column Widths"
              onClick={() => setIsAutoFitOpen(!isAutoFitOpen)} 
            />
            {isAutoFitOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsAutoFitOpen(false)}
                />
                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button 
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 transition-colors"
                    onClick={() => {
                      autoFit('contents');
                      setIsAutoFitOpen(false);
                    }}
                  >
                    <Minimize size={14} className="text-slate-500 dark:text-slate-400" />
                    <span className="font-medium">AutoFit Contents</span>
                  </button>
                  <button 
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 transition-colors"
                    onClick={() => {
                      autoFit('window');
                      setIsAutoFitOpen(false);
                    }}
                  >
                    <Maximize size={14} className="text-slate-500 dark:text-slate-400" />
                    <span className="font-medium">AutoFit Window</span>
                  </button>
                  <button 
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 transition-colors"
                    onClick={() => {
                      autoFit('fixed');
                      setIsAutoFitOpen(false);
                    }}
                  >
                    <Grid size={14} className="text-slate-500 dark:text-slate-400" />
                    <span className="font-medium">Fixed Column Width</span>
                  </button>
                </div>
              </>
            )}
          </div>
          
          <div className="w-px h-7 bg-slate-200 dark:bg-slate-700 mx-0.5" />

          {/* Distribute Rows and Columns */}
          <div className="flex flex-col gap-1">
            <button 
              onMouseDown={(e) => e.preventDefault()} 
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors" 
              onClick={distributeRows}
              title="Distribute Rows Evenly"
            >
              <Scaling size={13} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span>Distribute Rows</span>
            </button>
            <button 
              onMouseDown={(e) => e.preventDefault()} 
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors" 
              onClick={distributeCols}
              title="Distribute Columns Evenly"
            >
              <Scaling size={13} className="rotate-90 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span>Distribute Cols</span>
            </button>
          </div>
        </div>
      </RibbonSection>

      {/* 5. Table Styles & Shading Section */}
      <RibbonSection title="Table Styles">
        <div className="flex items-center h-full gap-2 p-1.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
          <RibbonButton 
            icon={Sparkles} 
            label="Auto-Style" 
            title="Apply Smart Auto-Format Style"
            onClick={autoFormatTable}
          />
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
          <div className="flex flex-col justify-center gap-1 text-[10px]">
            {/* Header Shading Row */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-medium w-11 leading-tight">Header:</span>
              <div className="flex items-center gap-1">
                <button 
                  onMouseDown={(e) => e.preventDefault()} 
                  className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-slate-800 hover:scale-110 transition-transform" 
                  title="Dark Slate Header"
                  onClick={() => applyHeaderShading('#1e293b')} 
                />
                <button 
                  onMouseDown={(e) => e.preventDefault()} 
                  className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-blue-900 hover:scale-110 transition-transform" 
                  title="Navy Header"
                  onClick={() => applyHeaderShading('#1e3a8a')} 
                />
                <button 
                  onMouseDown={(e) => e.preventDefault()} 
                  className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-slate-100 hover:scale-110 transition-transform" 
                  title="Light Grey Header"
                  onClick={() => applyHeaderShading('#f1f5f9')} 
                />
                <button 
                  onMouseDown={(e) => e.preventDefault()} 
                  className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-teal-800 hover:scale-110 transition-transform" 
                  title="Teal Header"
                  onClick={() => applyHeaderShading('#115e59')} 
                />
              </div>
            </div>

            {/* Alternating Shading Row */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-medium w-11 leading-tight">Zebra:</span>
              <div className="flex items-center gap-1">
                <button 
                  onMouseDown={(e) => e.preventDefault()} 
                  className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-slate-300 hover:scale-110 transition-transform" 
                  title="Zebra Light Grey"
                  onClick={() => applyAlternatingShading('#f8fafc')} 
                />
                <button 
                  onMouseDown={(e) => e.preventDefault()} 
                  className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-blue-300 hover:scale-110 transition-transform" 
                  title="Zebra Soft Blue"
                  onClick={() => applyAlternatingShading('#eff6ff')} 
                />
                <button 
                  onMouseDown={(e) => e.preventDefault()} 
                  className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-emerald-300 hover:scale-110 transition-transform" 
                  title="Zebra Soft Green"
                  onClick={() => applyAlternatingShading('#ecfdf5')} 
                />
                <button 
                  onMouseDown={(e) => e.preventDefault()} 
                  className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-amber-300 hover:scale-110 transition-transform" 
                  title="Zebra Soft Amber"
                  onClick={() => applyAlternatingShading('#fffbeb')} 
                />
              </div>
            </div>

            {/* Reset Option */}
            <button 
              onMouseDown={(e) => e.preventDefault()} 
              className="text-[10px] text-red-600 dark:text-red-400 hover:underline text-left font-medium"
              onClick={clearTableShading}
            >
              Clear Shading
            </button>
          </div>
        </div>
      </RibbonSection>

      {/* 6. Borders Section */}
      <RibbonSection title="Borders">
        <div className="flex items-center h-full p-1 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
          <BorderTool />
        </div>
      </RibbonSection>

      {/* 7. Alignment & Data Section */}
      <RibbonSection title="Alignment & Data">
        <div className="flex items-center h-full gap-2 p-1.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
          {/* 3x3 Micro Alignment Matrix */}
          <div className="grid grid-cols-3 gap-0.5 p-1 border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-2xs">
            <button onMouseDown={(e) => e.preventDefault()} className="p-1 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" onClick={() => setAlign('top', 'left')} title="Top Left"><AlignLeft size={10} className="rotate-45"/></button>
            <button onMouseDown={(e) => e.preventDefault()} className="p-1 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" onClick={() => setAlign('top', 'center')} title="Top Center"><AlignCenter size={10} className="-rotate-45"/></button>
            <button onMouseDown={(e) => e.preventDefault()} className="p-1 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" onClick={() => setAlign('top', 'right')} title="Top Right"><AlignRight size={10} className="rotate-45"/></button>
            
            <button onMouseDown={(e) => e.preventDefault()} className="p-1 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" onClick={() => setAlign('middle', 'left')} title="Center Left"><AlignLeft size={10}/></button>
            <button onMouseDown={(e) => e.preventDefault()} className="p-1 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" onClick={() => setAlign('middle', 'center')} title="Center"><AlignCenter size={10}/></button>
            <button onMouseDown={(e) => e.preventDefault()} className="p-1 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" onClick={() => setAlign('middle', 'right')} title="Center Right"><AlignRight size={10}/></button>
            
            <button onMouseDown={(e) => e.preventDefault()} className="p-1 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" onClick={() => setAlign('bottom', 'left')} title="Bottom Left"><AlignLeft size={10} className="-rotate-45"/></button>
            <button onMouseDown={(e) => e.preventDefault()} className="p-1 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" onClick={() => setAlign('bottom', 'center')} title="Bottom Center"><AlignCenter size={10} className="rotate-45"/></button>
            <button onMouseDown={(e) => e.preventDefault()} className="p-1 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" onClick={() => setAlign('bottom', 'right')} title="Bottom Right"><AlignRight size={10} className="-rotate-45"/></button>
          </div>

          <div className="flex flex-col gap-1 text-[11px] min-w-[76px]">
            <button 
              onMouseDown={(e) => e.preventDefault()} 
              className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 font-medium transition-colors" 
              onClick={setTextDirection}
              title="Toggle Text Direction"
            >
              <Type size={12} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span>Text Dir</span>
            </button>
            <button 
              onMouseDown={(e) => e.preventDefault()} 
              className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 font-medium transition-colors" 
              onClick={() => runOnCell(c => c.style.padding = "8px")}
              title="Set Standard Cell Margins"
            >
              <Settings size={12} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
              <span>Margins</span>
            </button>
          </div>

          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />

          {/* Data Tools */}
          <div className="flex flex-col gap-1 text-[11px]">
            <button 
              onMouseDown={(e) => e.preventDefault()} 
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 font-medium transition-colors" 
              onClick={() => {
                runOnTable((table) => {
                  runOnCell((cell) => {
                    setActiveTable(table);
                    setActiveCell(cell);
                    setIsFormulaOpen(true);
                  });
                });
              }}
              title="Insert Table Formula"
            >
              <Calculator size={13} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Formula</span>
            </button>
            <button 
              onMouseDown={(e) => e.preventDefault()} 
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 font-medium transition-colors" 
              onClick={deleteTable}
              title="Delete Entire Table"
            >
              <Trash2 size={13} className="flex-shrink-0" />
              <span>Delete Table</span>
            </button>
          </div>
        </div>
      </RibbonSection>

      <TablePropertiesDialog 
        isOpen={isPropertiesOpen} 
        onClose={() => {
          setIsPropertiesOpen(false);
          setActiveTable(null);
        }} 
        table={activeTable} 
      />

      <TableFormulaDialog
        isOpen={isFormulaOpen}
        onClose={() => {
          setIsFormulaOpen(false);
          setActiveTable(null);
          setActiveCell(null);
        }}
        table={activeTable}
        activeCell={activeCell}
      />
    </div>
  );
};
