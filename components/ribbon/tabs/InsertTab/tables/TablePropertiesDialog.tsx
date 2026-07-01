/* eslint-disable react-hooks/immutability, @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { LayoutGrid } from 'lucide-react';

interface TablePropertiesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  table: HTMLTableElement | null;
}

export const TablePropertiesDialog: React.FC<TablePropertiesDialogProps> = ({
  isOpen,
  onClose,
  table
}) => {
  // Advanced Table Properties States
  const [tableWidth, setTableWidth] = useState('100%');
  const [tableAlign, setTableAlign] = useState<'left' | 'center' | 'right'>('left');
  const [textWrapping, setTextWrapping] = useState<'none' | 'around'>('none');
  
  const [cellPadding, setCellPadding] = useState<'small' | 'medium' | 'large'>('medium');
  const [customCellPadding, setCustomCellPadding] = useState(false);
  const [padTopBottom, setPadTopBottom] = useState(8);
  const [padLeftRight, setPadLeftRight] = useState(12);
  const [verticalAlign, setVerticalAlign] = useState<'top' | 'middle' | 'bottom'>('top');
  
  const [borderColor, setBorderColor] = useState('#cbd5e1');
  const [borderWidth, setBorderWidth] = useState('1px');
  
  const [specifyRowHeight, setSpecifyRowHeight] = useState(false);
  const [rowHeightVal, setRowHeightVal] = useState(30);
  const [rowHeightMode, setRowHeightMode] = useState<'atLeast' | 'exactly'>('atLeast');
  
  const [specifyColWidth, setSpecifyColWidth] = useState(false);
  const [colWidthVal, setColWidthVal] = useState(100);
  const [colWidthUnit, setColWidthUnit] = useState<'px' | '%'>('px');
  
  const [headerColor, setHeaderColor] = useState('transparent');
  const [zebraStriping, setZebraStriping] = useState(false);
  
  const [cantSplit, setCantSplit] = useState(true);
  const [repeatHeader, setRepeatHeader] = useState(false);
  const [keepTogether, setKeepTogether] = useState(false);

  // Load properties from selected table when dialog opens
  useEffect(() => {
    if (isOpen && table) {
      const currentWidth = table.style.width || '100%';
      setTableWidth(currentWidth);

      const marginL = table.style.marginLeft;
      const marginR = table.style.marginRight;
      if (marginL === 'auto' && marginR === 'auto') {
        setTableAlign('center');
      } else if (marginL === 'auto') {
        setTableAlign('right');
      } else {
        setTableAlign('left');
      }

      const firstCell = table.querySelector('td, th') as HTMLTableCellElement | null;
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

      const firstRow = table.rows[0];
      if (firstRow) {
        // Prevent split detection
        const rowCantSplit = firstRow.style.pageBreakInside === 'avoid' || firstRow.getAttribute('data-cant-split') === 'true' || firstRow.classList.contains('table-row-keep-together');
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
      const isFloating = table.style.float && table.style.float !== 'none';
      setTextWrapping(isFloating ? 'around' : 'none');

      let hasZebra = false;
      if (table.rows.length > 2) {
        const secondRowBg = table.rows[2]?.style.backgroundColor;
        if (secondRowBg && (secondRowBg.includes('f8fafc') || secondRowBg.includes('rgb(248, 250, 252)'))) {
          hasZebra = true;
        }
      }
      setZebraStriping(hasZebra);

      const repHeader = table.getAttribute('data-repeat-header') === 'true';
      setRepeatHeader(repHeader);

      const keepTog = table.getAttribute('data-keep-together') === 'true';
      setKeepTogether(keepTog);
    }
  }, [isOpen, table]);

  if (!isOpen || !table) return null;

  const applyProperties = () => {
    if (!table) return;
    const tbl = table;

    // Apply Table Width
    tbl.style.width = tableWidth;

    // Apply Text Wrapping & Alignment
    if (textWrapping === 'around') {
      tbl.style.float = tableAlign === 'right' ? 'right' : 'left';
      tbl.style.clear = 'none';
      tbl.style.display = 'table';
      if (tableAlign === 'right') {
        tbl.style.marginLeft = '16px';
        tbl.style.marginRight = '0';
      } else {
        tbl.style.marginRight = '16px';
        tbl.style.marginLeft = '0';
      }
      tbl.style.marginTop = '8px';
      tbl.style.marginBottom = '8px';
    } else {
      tbl.style.float = 'none';
      tbl.style.clear = 'both';
      if (tableAlign === 'center') {
        tbl.style.marginLeft = 'auto';
        tbl.style.marginRight = 'auto';
      } else if (tableAlign === 'right') {
        tbl.style.marginLeft = 'auto';
        tbl.style.marginRight = '0';
      } else {
        tbl.style.marginLeft = '0';
        tbl.style.marginRight = 'auto';
      }
      tbl.style.marginTop = '';
      tbl.style.marginBottom = '';
    }

    // Apply cell styles (padding, borders, widths, alignments)
    const cells = Array.from(tbl.querySelectorAll('td, th')) as HTMLTableCellElement[];
    cells.forEach((cell) => {
      // Cell padding
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
        if (cellPadding === 'small') {
          cell.style.padding = '4px 8px';
        } else if (cellPadding === 'large') {
          cell.style.padding = '12px 16px';
        } else {
          cell.style.padding = '8px 12px';
        }
      }

      // Vertical align
      cell.style.verticalAlign = verticalAlign;

      // Borders
      if (borderColor === 'none') {
        cell.style.border = 'none';
      } else {
        cell.style.border = `${borderWidth} solid ${borderColor}`;
      }

      // Column Width Restricts
      if (specifyColWidth) {
        cell.style.width = `${colWidthVal}${colWidthUnit}`;
      } else {
        cell.style.width = '';
      }
    });

    // Apply row height & prevent splitting (keep-together class)
    const rows = Array.from(tbl.rows);
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

      // Prevent Row splitting
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

    // Prevent Table splitting class (adds extra level of support for PDF/Print engines)
    if (cantSplit) {
      tbl.classList.add('table-row-keep-together');
    } else {
      tbl.classList.remove('table-row-keep-together');
    }

    // Header Color
    const firstRow = tbl.rows[0];
    if (firstRow) {
      Array.from(firstRow.cells).forEach((cell: any) => {
        cell.style.backgroundColor = headerColor;
      });
    }

    // Zebra striping
    for (let i = 1; i < tbl.rows.length; i++) {
      const row = tbl.rows[i];
      const isEven = i % 2 === 0;
      Array.from(row.cells).forEach((cell: any) => {
        if (zebraStriping && isEven) {
          cell.style.backgroundColor = '#f8fafc';
        } else {
          cell.style.backgroundColor = '';
        }
      });
    }

    // Data attributes
    if (repeatHeader) {
      tbl.setAttribute('data-repeat-header', 'true');
    } else {
      tbl.removeAttribute('data-repeat-header');
    }

    if (keepTogether) {
      tbl.setAttribute('data-keep-together', 'true');
    } else {
      tbl.removeAttribute('data-keep-together');
    }

    // Fire input event to trigger editor's state sync and re-pagination
    const editor = document.querySelector('.prodoc-editor') || document.querySelector('.ProseMirror');
    if (editor) {
      const event = new Event('input', { bubbles: true });
      editor.dispatchEvent(event);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg p-6 border border-slate-200 dark:border-slate-700 transform scale-100 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5 border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Table Properties</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
          {/* Table Information */}
          <div className="text-xs font-mono bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-150 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 flex justify-around">
            <div><span className="text-slate-400">Rows:</span> {table.rows.length}</div>
            <div><span className="text-slate-400">Columns:</span> {table.rows[0]?.cells.length || 0}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Table Width */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Table Width
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Full', value: '100%' },
                  { label: '75%', value: '75%' },
                  { label: '50%', value: '50%' },
                  { label: 'Auto', value: 'auto' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTableWidth(opt.value)}
                    className={`py-1.5 px-2 rounded-lg text-xs border font-medium transition-all text-center ${
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
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: 'Left', value: 'left' },
                  { label: 'Center', value: 'center' },
                  { label: 'Right', value: 'right' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTableAlign(opt.value as any)}
                    className={`py-1.5 px-1.5 rounded-lg text-xs border font-medium transition-all text-center ${
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
          </div>

          {/* Text Wrapping Option */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Text Wrapping
            </label>
            <select
              value={textWrapping}
              onChange={(e) => setTextWrapping(e.target.value as 'none' | 'around')}
              className="w-full text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-650 rounded-lg py-1.5 px-3 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="none">None (Block Layout)</option>
              <option value="around">Around (Float Text wrapping)</option>
            </select>
          </div>

          {/* Cell Padding */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Cell Padding & Margins
              </label>
              <button
                type="button"
                onClick={() => setCustomCellPadding(!customCellPadding)}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                {customCellPadding ? 'Use Presets' : 'Specify Custom'}
              </button>
            </div>
            {!customCellPadding ? (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Small', value: 'small' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Large', value: 'large' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setCellPadding(opt.value as any)}
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
            ) : (
              <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-lg border border-slate-150 dark:border-slate-700/50">
                <div>
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Top & Bottom (px)</span>
                  <input
                    type="number"
                    value={padTopBottom}
                    onChange={(e) => setPadTopBottom(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1 px-2 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-indigo-500"
                    min="0"
                    max="50"
                  />
                </div>
                <div>
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Left & Right (px)</span>
                  <input
                    type="number"
                    value={padLeftRight}
                    onChange={(e) => setPadLeftRight(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1 px-2 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-indigo-500"
                    min="0"
                    max="50"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Vertical Alignment */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Vertical Cell Alignment
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Top', value: 'top' },
                { label: 'Center', value: 'middle' },
                { label: 'Bottom', value: 'bottom' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setVerticalAlign(opt.value as any)}
                  className={`py-1.5 px-3 rounded-lg text-sm border font-medium transition-all ${
                    verticalAlign === opt.value
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-650 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size restrictions */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-700/50 pt-3">
            {/* Row Height */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer">
                <input
                  type="checkbox"
                  checked={specifyRowHeight}
                  onChange={(e) => setSpecifyRowHeight(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer"
                />
                <span>Specify Row Height</span>
              </label>
              
              {specifyRowHeight && (
                <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/40 p-2 rounded-lg border border-slate-150 dark:border-slate-700/50">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={rowHeightVal}
                      onChange={(e) => setRowHeightVal(Math.max(10, parseInt(e.target.value) || 10))}
                      className="w-16 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded py-1 px-1.5 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-indigo-500"
                      min="10"
                    />
                    <span className="text-xs text-slate-400">px</span>
                  </div>
                  <select
                    value={rowHeightMode}
                    onChange={(e) => setRowHeightMode(e.target.value as 'atLeast' | 'exactly')}
                    className="w-full text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded py-0.5 px-1 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="atLeast">At least</option>
                    <option value="exactly">Exactly</option>
                  </select>
                </div>
              )}
            </div>

            {/* Column Width */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer">
                <input
                  type="checkbox"
                  checked={specifyColWidth}
                  onChange={(e) => setSpecifyColWidth(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer"
                />
                <span>Preferred Col Width</span>
              </label>

              {specifyColWidth && (
                <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900/40 p-2 rounded-lg border border-slate-150 dark:border-slate-700/50">
                  <input
                    type="number"
                    value={colWidthVal}
                    onChange={(e) => setColWidthVal(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded py-1 px-1.5 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-indigo-500"
                    min="1"
                  />
                  <select
                    value={colWidthUnit}
                    onChange={(e) => setColWidthUnit(e.target.value as 'px' | '%')}
                    className="text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded py-0.5 px-1 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="px">px</option>
                    <option value="%">%</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Borders & Colors */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-700/50 pt-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Header Row Fill
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { label: 'None', value: 'transparent' },
                  { label: 'Gray', value: '#f1f5f9' },
                  { label: 'Blue', value: '#eff6ff' },
                  { label: 'Red', value: '#fee2e2' },
                  { label: 'Green', value: '#f0fdf4' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setHeaderColor(opt.value)}
                    className={`py-1 px-1 rounded text-[10px] border transition-all truncate font-medium ${
                      headerColor === opt.value
                        ? 'bg-indigo-600 border-indigo-600 text-white font-semibold'
                        : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-650 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Table Border Color
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'No Border', value: 'none' },
                  { label: 'Default', value: '#cbd5e1' },
                  { label: 'Blue Accent', value: '#3b82f6' },
                  { label: 'Red Danger', value: '#ef4444' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setBorderColor(opt.value)}
                    className={`py-1 px-1 rounded text-[10px] border transition-all truncate font-medium ${
                      borderColor === opt.value
                        ? 'bg-indigo-600 border-indigo-600 text-white font-semibold'
                        : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-650 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-2 border-t border-slate-100 dark:border-slate-700/50 pt-3">
            {/* Alternating zebra */}
            <div className="flex items-center justify-between py-1.5">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Alternating Zebra Striping
              </span>
              <button
                type="button"
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

            {/* Row splitting / Keep-Together */}
            <div className="flex items-center justify-between py-1.5 border-t border-slate-100 dark:border-slate-700/50">
              <div className="pr-4">
                <span className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Prevent Row Splitting Across Pages (Row Keep-Together)
                </span>
                <span className="block text-xs text-slate-400">
                  Adds the <code className="text-indigo-600 dark:text-indigo-400 font-mono font-semibold">table-row-keep-together</code> class to keep row content intact
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCantSplit(!cantSplit)}
                className={`w-10 h-6 flex shrink-0 items-center rounded-full p-1 cursor-pointer transition-colors ${
                  cantSplit ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    cantSplit ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Repeat Header */}
            <div className="flex items-center justify-between py-1.5 border-t border-slate-100 dark:border-slate-700/50">
              <div className="pr-4">
                <span className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Repeat Header Row on Every Page
                </span>
                <span className="block text-xs text-slate-400">
                  Repeats first row of table at top of subsequent pages
                </span>
              </div>
              <button
                type="button"
                onClick={() => setRepeatHeader(!repeatHeader)}
                className={`w-10 h-6 flex shrink-0 items-center rounded-full p-1 cursor-pointer transition-colors ${
                  repeatHeader ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    repeatHeader ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Keep Table together */}
            <div className="flex items-center justify-between py-1.5 border-t border-slate-100 dark:border-slate-700/50">
              <div className="pr-4">
                <span className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Keep Entire Table on Single Page
                </span>
                <span className="block text-xs text-slate-400">
                  Forces entire table to next page if it doesn't fit
                </span>
              </div>
              <button
                type="button"
                onClick={() => setKeepTogether(!keepTogether)}
                className={`w-10 h-6 flex shrink-0 items-center rounded-full p-1 cursor-pointer transition-colors ${
                  keepTogether ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    keepTogether ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6 border-t border-slate-100 dark:border-slate-700 pt-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={applyProperties}
            className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-colors"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};
