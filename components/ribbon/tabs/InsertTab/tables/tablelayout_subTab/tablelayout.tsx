
import React, { useState } from 'react';
import { RibbonSection } from '../../../../common/RibbonSection';
import { RibbonButton } from '../../../../common/RibbonButton';
import { 
  MousePointer2, Grid, Settings, Eraser, PenLine, Trash2, 
  ArrowUpToLine, ArrowDownToLine, ArrowLeftToLine, ArrowRightToLine,
  Merge, Split, Scaling, AlignLeft, AlignCenter, AlignRight,
  AlignJustify, ArrowDownAZ, Type, Calculator, TableProperties,
  Maximize, Minimize, Sparkles
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
    <>
      <RibbonSection title="Table">
          <div className="flex h-full items-center">
              <RibbonButton icon={MousePointer2} label="Select" onClick={() => executeCommand('selectAll')} />
              <RibbonButton icon={Grid} label="View Gridlines" onClick={() => {}} />
              <RibbonButton icon={TableProperties} label="Properties" onClick={openProperties} />
          </div>
      </RibbonSection>

      <RibbonSection title="Table Styles">
          <div className="flex h-full items-center gap-1">
              <RibbonButton 
                  icon={Sparkles} 
                  label="Auto-Format" 
                  onClick={autoFormatTable}
              />
              <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-700 mx-1" />
              <div className="flex flex-col gap-1 px-1 h-full justify-center min-w-[1300px]">
                  {/* Header Shading Row */}
              <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-3000 font-medium w-[45px] leading-tight">Header:</span>
                  <div className="flex items-center gap-1">
                      <button 
                          onMouseDown={(e) => e.preventDefault()} 
                          className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-slate-800" 
                          title="Dark Slate Header"
                          onClick={() => applyHeaderShading('#1e293b')} 
                      />
                      <button 
                          onMouseDown={(e) => e.preventDefault()} 
                          className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-blue-900" 
                          title="Navy Header"
                          onClick={() => applyHeaderShading('#1e3a8a')} 
                      />
                      <button 
                          onMouseDown={(e) => e.preventDefault()} 
                          className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-slate-100" 
                          title="Light Grey Header"
                          onClick={() => applyHeaderShading('#f1f5f9')} 
                      />
                      <button 
                          onMouseDown={(e) => e.preventDefault()} 
                          className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-teal-800" 
                          title="Teal Header"
                          onClick={() => applyHeaderShading('#115e59')} 
                      />
                  </div>
              </div>

              {/* Alternating Shading Row */}
              <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-3000 font-medium w-[45px] leading-tight">Zebra:</span>
                  <div className="flex items-center gap-1">
                      <button 
                          onMouseDown={(e) => e.preventDefault()} 
                          className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-slate-300" 
                          title="Zebra Light Grey"
                          onClick={() => applyAlternatingShading('#f8fafc')} 
                      />
                      <button 
                          onMouseDown={(e) => e.preventDefault()} 
                          className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-blue-300" 
                          title="Zebra Soft Blue"
                          onClick={() => applyAlternatingShading('#eff6ff')} 
                      />
                      <button 
                          onMouseDown={(e) => e.preventDefault()} 
                          className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-emerald-300" 
                          title="Zebra Soft Green"
                          onClick={() => applyAlternatingShading('#ecfdf5')} 
                      />
                      <button 
                          onMouseDown={(e) => e.preventDefault()} 
                          className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-amber-300" 
                          title="Zebra Soft Amber"
                          onClick={() => applyAlternatingShading('#fffbeb')} 
                      />
                  </div>
              </div>

              {/* Reset Option */}
              <button 
                  onMouseDown={(e) => e.preventDefault()} 
                  className="text-[9px] text-red-600 dark:text-red-400 hover:underline text-left font-medium"
                  onClick={clearTableShading}
              >
                  Clear Shading
              </button>
          </div>
          </div>
      </RibbonSection>

      <RibbonSection title="Rows & Columns">
          <div className="flex h-full items-center gap-1">
              <div className="flex flex-col h-full justify-center gap-0.5 border-r border-slate-200 dark:border-slate-700 pr-1 mr-1">
                 <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-1 hover:bg-red-300 dark:hover:bg-transparent text-red-600 rounded text-[10px] font-medium" onClick={deleteRow}>
                     <Trash2 size={12}/> Delete Row
                 </button>
                 <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-1 hover:bg-red-300 dark:hover:bg-transparent text-red-600 rounded text-[10px] font-medium" onClick={deleteCol}>
                     <Trash2 size={12}/> Delete Column
                 </button>
              </div>

              <div className="flex flex-col gap-0.5">
                  <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-transparent rounded text-[10px] dark:text-slate-300" onClick={() => insertRow('above')}>
                      <ArrowUpToLine size={14}/> Insert Above
                  </button>
                  <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-transparent rounded text-[10px] dark:text-slate-300" onClick={() => insertRow('below')}>
                      <ArrowDownToLine size={14}/> Insert Below
                  </button>
              </div>
              <div className="flex flex-col gap-0.5">
                  <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-transparent rounded text-[10px] dark:text-slate-300" onClick={() => insertCol('left')}>
                      <ArrowLeftToLine size={14}/> Insert Left
                  </button>
                  <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-transparent rounded text-[10px] dark:text-slate-300" onClick={() => insertCol('right')}>
                      <ArrowRightToLine size={14}/> Insert Right
                  </button>
              </div>
          </div>
      </RibbonSection>

      <RibbonSection title="Merge">
          <div className="flex flex-col h-full justify-center gap-0.5 min-w-[80px]">
              <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-transparent rounded text-[10px] dark:text-slate-300" onClick={mergeCells}>
                  <Merge size={14}/> Merge Right
              </button>
              <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-transparent rounded text-[10px] dark:text-slate-300" onClick={splitCells}>
                  <Split size={14}/> Split Cells
              </button>
              <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-transparent rounded text-[10px] dark:text-slate-300" onClick={splitTable}>
                  <Split size={14} className="rotate-90"/> Split Table
              </button>
          </div>
      </RibbonSection>

      <RibbonSection title="Cell Size">
          <div className="flex h-full items-center gap-2 px-1">
              <div className="relative flex items-center h-full">
                  <RibbonButton 
                      icon={TableProperties} 
                      label="AutoFit" 
                      hasArrow 
                      onClick={() => setIsAutoFitOpen(!isAutoFitOpen)} 
                  />
                  {isAutoFitOpen && (
                      <>
                          <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => setIsAutoFitOpen(false)}
                          />
                          <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl py-1.5 z-300 animate-in fade-in slide-in-from-top-1 duration-150">
                              <button 
                                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700/300 text-xs text-slate-700 dark:text-slate-300 transition-colors"
                                  onClick={() => {
                                      autoFit('contents');
                                      setIsAutoFitOpen(false);
                                  }}
                              >
                                  <Minimize size={14} className="text-slate-3000 dark:text-slate-400" />
                                  <span className="font-medium">AutoFit Contents</span>
                              </button>
                              <button 
                                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700/300 text-xs text-slate-700 dark:text-slate-300 transition-colors"
                                  onClick={() => {
                                      autoFit('window');
                                      setIsAutoFitOpen(false);
                                  }}
                              >
                                  <Maximize size={14} className="text-slate-3000 dark:text-slate-400" />
                                  <span className="font-medium">AutoFit Window</span>
                              </button>
                              <button 
                                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700/300 text-xs text-slate-700 dark:text-slate-300 transition-colors"
                                  onClick={() => {
                                      autoFit('fixed');
                                      setIsAutoFitOpen(false);
                                  }}
                              >
                                  <Grid size={14} className="text-slate-3000 dark:text-slate-400" />
                                  <span className="font-medium">Fixed Column Width</span>
                              </button>
                          </div>
                      </>
                  )}
              </div>
              
              <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-700 mx-0.5"></div>

              <div className="flex flex-col gap-1">
                <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-transparent rounded text-[10px] dark:text-slate-300" onClick={distributeRows}>
                    <Scaling size={14}/> Distribute Rows
                </button>
                <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-transparent rounded text-[10px] dark:text-slate-300" onClick={distributeCols}>
                    <Scaling size={14} className="rotate-90"/> Distribute Cols
                </button>
              </div>
          </div>
      </RibbonSection>

      <RibbonSection title="Borders">
          <BorderTool />
      </RibbonSection>

      <RibbonSection title="Alignment">
          <div className="flex h-full items-center gap-2 px-1">
              {/* 3x3 Grid for Alignment */}
              <div className="grid grid-cols-3 gap-0.5 p-0.5 border rounded bg-white dark:bg-slate-800 dark:border-slate-700 shadow-sm">
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 dark:hover:bg-transparent rounded dark:text-slate-300" onClick={() => setAlign('top', 'left')} title="Top Left"><AlignLeft size={10} className="rotate-45"/></button>
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 dark:hover:bg-transparent rounded dark:text-slate-300" onClick={() => setAlign('top', 'center')} title="Top Center"><AlignCenter size={10} className="-rotate-45"/></button>
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 dark:hover:bg-transparent rounded dark:text-slate-300" onClick={() => setAlign('top', 'right')} title="Top Right"><AlignRight size={10} className="rotate-45"/></button>
                  
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 dark:hover:bg-transparent rounded dark:text-slate-300" onClick={() => setAlign('middle', 'left')} title="Center Left"><AlignLeft size={10}/></button>
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 dark:hover:bg-transparent rounded dark:text-slate-300" onClick={() => setAlign('middle', 'center')} title="Center"><AlignCenter size={10}/></button>
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 dark:hover:bg-transparent rounded dark:text-slate-300" onClick={() => setAlign('middle', 'right')} title="Center Right"><AlignRight size={10}/></button>
                  
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 dark:hover:bg-transparent rounded dark:text-slate-300" onClick={() => setAlign('bottom', 'left')} title="Bottom Left"><AlignLeft size={10} className="-rotate-45"/></button>
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 dark:hover:bg-transparent rounded dark:text-slate-300" onClick={() => setAlign('bottom', 'center')} title="Bottom Center"><AlignCenter size={10} className="rotate-45"/></button>
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 dark:hover:bg-transparent rounded dark:text-slate-300" onClick={() => setAlign('bottom', 'right')} title="Bottom Right"><AlignRight size={10} className="-rotate-45"/></button>
              </div>
              <div className="flex flex-col gap-0.5 text-[10px] min-w-[70px]">
                  <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-1.5 px-1 py-1 hover:bg-slate-100 dark:hover:bg-transparent rounded dark:text-slate-300" onClick={setTextDirection}><Type size={12}/> Text Dir</button>
                  <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-1.5 px-1 py-1 hover:bg-slate-100 dark:hover:bg-transparent rounded dark:text-slate-300" onClick={() => runOnCell(c => c.style.padding = "8px")}><Settings size={12}/> Margins</button>
              </div>
          </div>
      </RibbonSection>

      <RibbonSection title="Data">
          <div className="flex flex-col h-full justify-center gap-0.5 px-1">
              <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-transparent rounded text-[10px] dark:text-slate-300" onClick={() => alert("Sort Dialog")}>
                  <ArrowDownAZ size={14}/> Sort
              </button>
              <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-transparent rounded text-[10px] dark:text-slate-300" onClick={() => {}}>
                  <Type size={14}/> Convert to Text
              </button>
              <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-transparent rounded text-[10px] dark:text-slate-300" onClick={() => {
                  runOnTable((table) => {
                      runOnCell((cell) => {
                          setActiveTable(table);
                          setActiveCell(cell);
                          setIsFormulaOpen(true);
                      });
                  });
              }}>
                  <Calculator size={14}/> Formula
              </button>
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
    </>
  );
};
