import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface TablePropertiesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  table: HTMLTableElement | null;
}

export const TablePropertiesDialog: React.FC<TablePropertiesDialogProps> = ({ isOpen, onClose, table }) => {
  const [width, setWidth] = useState('100');
  const [widthUnit, setWidthUnit] = useState('%');
  const [alignment, setAlignment] = useState('left');
  const [borderWidth, setBorderWidth] = useState('1');
  const [borderColor, setBorderColor] = useState('#cbd5e1');
  const [bgColor, setBgColor] = useState('transparent');
  const [cellPadding, setCellPadding] = useState('8');

  useEffect(() => {
    if (isOpen && table) {
      // Parse existing table properties
      const currentWidth = table.style.width || '100%';
      if (currentWidth.endsWith('%')) {
        setWidth(currentWidth.replace('%', ''));
        setWidthUnit('%');
      } else if (currentWidth.endsWith('px')) {
        setWidth(currentWidth.replace('px', ''));
        setWidthUnit('px');
      }

      setAlignment(table.style.marginLeft === 'auto' && table.style.marginRight === 'auto' ? 'center' : 
                   table.style.marginLeft === 'auto' ? 'right' : 'left');
      
      // Try to get border from first cell if table border is not set
      let currentBorder = table.style.borderWidth;
      let currentBorderColor = table.style.borderColor;
      
      if (!currentBorder && table.rows.length > 0 && table.rows[0].cells.length > 0) {
          const cell = table.rows[0].cells[0];
          currentBorder = cell.style.borderWidth;
          currentBorderColor = cell.style.borderColor;
          
          const currentPadding = cell.style.padding;
          if (currentPadding) {
              setCellPadding(currentPadding.replace('px', ''));
          }
      }

      if (currentBorder) setBorderWidth(currentBorder.replace('px', ''));
      if (currentBorderColor) setBorderColor(currentBorderColor);
      
      const currentBg = table.style.backgroundColor;
      if (currentBg && currentBg !== 'rgba(0, 0, 0, 0)') setBgColor(currentBg);
    }
  }, [isOpen, table]);

  if (!isOpen || !table) return null;

  const handleApply = () => {
    // Apply Width
    table.style.width = width ? `${width}${widthUnit}` : 'auto';

    // Apply Alignment
    if (alignment === 'center') {
      table.style.marginLeft = 'auto';
      table.style.marginRight = 'auto';
    } else if (alignment === 'right') {
      table.style.marginLeft = 'auto';
      table.style.marginRight = '0';
    } else {
      table.style.marginLeft = '0';
      table.style.marginRight = 'auto';
    }

    // Apply Background
    table.style.backgroundColor = bgColor;

    // Apply Border and Padding to all cells
    const borderStyle = borderWidth && borderWidth !== '0' ? `${borderWidth}px solid ${borderColor}` : 'none';
    
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            const cell = table.rows[i].cells[j];
            cell.style.border = borderStyle;
            if (cellPadding) {
                cell.style.padding = `${cellPadding}px`;
            }
        }
    }
    
    // Also apply border to table itself if it's not collapsed
    if (table.style.borderCollapse !== 'collapse') {
        table.style.border = borderStyle;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Table Properties</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            <X size={16} />
          </button>
        </div>
        
        <div className="p-4 space-y-6 overflow-y-auto">
          
          {/* Size Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Size</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-1.5">
                <label className="text-xs text-slate-600 dark:text-slate-400">Preferred Width</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 dark:text-slate-200 outline-none focus:border-blue-500"
                  />
                  <select 
                    value={widthUnit}
                    onChange={(e) => setWidthUnit(e.target.value)}
                    className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 dark:text-slate-200 outline-none focus:border-blue-500"
                  >
                    <option value="%">Percent</option>
                    <option value="px">Pixels</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Alignment Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Alignment</h4>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="radio" name="align" value="left" checked={alignment === 'left'} onChange={() => setAlignment('left')} className="text-blue-600" />
                Left
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="radio" name="align" value="center" checked={alignment === 'center'} onChange={() => setAlignment('center')} className="text-blue-600" />
                Center
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="radio" name="align" value="right" checked={alignment === 'right'} onChange={() => setAlignment('right')} className="text-blue-600" />
                Right
              </label>
            </div>
          </div>

          {/* Borders & Shading Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Borders & Shading</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 dark:text-slate-400">Border Width (px)</label>
                <input 
                  type="number" 
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(e.target.value)}
                  min="0"
                  className="w-full px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 dark:text-slate-400">Border Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-xs text-slate-500 font-mono">{borderColor}</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 dark:text-slate-400">Background Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={bgColor === 'transparent' ? '#ffffff' : bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                  />
                  <button 
                    onClick={() => setBgColor('transparent')}
                    className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 dark:text-slate-400">Cell Padding (px)</label>
                <input 
                  type="number" 
                  value={cellPadding}
                  onChange={(e) => setCellPadding(e.target.value)}
                  min="0"
                  className="w-full px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

        </div>
        
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2 shrink-0">
          <button 
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleApply}
            className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
