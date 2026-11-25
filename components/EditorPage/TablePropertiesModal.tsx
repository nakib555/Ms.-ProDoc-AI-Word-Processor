import React from 'react';
import { createPortal } from 'react-dom';
import { LayoutGrid } from 'lucide-react';
import { SmartSelect } from '../ui/SmartSelect';
import { SmartToggle } from '../ui/SmartToggle';

interface TablePropertiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertiesTable: HTMLTableElement | null;
  applyProperties: () => void;
  
  tableWidth: string;
  setTableWidth: (val: string) => void;
  
  tableAlign: string;
  setTableAlign: (val: string) => void;
  
  textWrapping: 'none' | 'around';
  setTextWrapping: (val: 'none' | 'around') => void;
  
  customCellPadding: boolean;
  setCustomCellPadding: (val: boolean) => void;
  cellPadding: string;
  setCellPadding: (val: string) => void;
  
  padTopBottom: number;
  setPadTopBottom: (val: number) => void;
  padLeftRight: number;
  setPadLeftRight: (val: number) => void;
  
  verticalAlign: 'top' | 'middle' | 'bottom';
  setVerticalAlign: (val: 'top' | 'middle' | 'bottom') => void;
  
  specifyRowHeight: boolean;
  setSpecifyRowHeight: (val: boolean) => void;
  rowHeightVal: number;
  setRowHeightVal: (val: number) => void;
  rowHeightMode: 'atLeast' | 'exactly';
  setRowHeightMode: (val: 'atLeast' | 'exactly') => void;
  
  specifyColWidth: boolean;
  setSpecifyColWidth: (val: boolean) => void;
  colWidthVal: number;
  setColWidthVal: (val: number) => void;
  colWidthUnit: 'px' | '%';
  setColWidthUnit: (val: 'px' | '%') => void;
  
  headerColor: string;
  setHeaderColor: (val: string) => void;
  
  borderColor: string;
  setBorderColor: (val: string) => void;
  borderWidth: string;
  setBorderWidth: (val: string) => void;
  
  zebraStriping: boolean;
  setZebraStriping: (val: boolean) => void;
  
  cantSplit: boolean;
  setCantSplit: (val: boolean) => void;
  
  repeatHeader: boolean;
  setRepeatHeader: (val: boolean) => void;
  
  keepTogether: boolean;
  setKeepTogether: (val: boolean) => void;
}

export const TablePropertiesModal: React.FC<TablePropertiesModalProps> = ({
  isOpen,
  onClose,
  propertiesTable,
  applyProperties,
  
  tableWidth,
  setTableWidth,
  tableAlign,
  setTableAlign,
  textWrapping,
  setTextWrapping,
  
  customCellPadding,
  setCustomCellPadding,
  cellPadding,
  setCellPadding,
  
  padTopBottom,
  setPadTopBottom,
  padLeftRight,
  setPadLeftRight,
  
  verticalAlign,
  setVerticalAlign,
  
  specifyRowHeight,
  setSpecifyRowHeight,
  rowHeightVal,
  setRowHeightVal,
  rowHeightMode,
  setRowHeightMode,
  
  specifyColWidth,
  setSpecifyColWidth,
  colWidthVal,
  setColWidthVal,
  colWidthUnit,
  setColWidthUnit,
  
  headerColor,
  setHeaderColor,
  
  borderColor,
  setBorderColor,
  borderWidth,
  setBorderWidth,
  
  zebraStriping,
  setZebraStriping,
  
  cantSplit,
  setCantSplit,
  
  repeatHeader,
  setRepeatHeader,
  
  keepTogether,
  setKeepTogether,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 overscroll-contain"
      role="dialog"
      aria-modal="true"
      data-modal-backdrop="true"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col p-6 border border-slate-200 dark:border-slate-700 transform scale-100 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5 border-b border-slate-100 dark:border-slate-700 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Table Properties</h2>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4 flex-1 min-h-0 max-h-[450px] overflow-y-auto overscroll-contain pr-1">
          {/* Table Information */}
          {propertiesTable && (
            <div className="text-xs font-mono bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-150 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 flex justify-around">
              <div><span className="text-slate-400">Rows:</span> {propertiesTable.rows.length}</div>
              <div><span className="text-slate-400">Columns:</span> {propertiesTable.rows[0]?.cells.length || 0}</div>
            </div>
          )}

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
                    onClick={() => setTableAlign(opt.value)}
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

          {/* Text Wrapping */}
          <div>
            <SmartSelect
              id="table-properties-text-wrapping"
              label="Text Wrapping"
              value={textWrapping}
              onChange={(val) => setTextWrapping(val as 'none' | 'around')}
              size="sm"
              options={[
                { value: 'none', label: 'None (Block Layout)' },
                { value: 'around', label: 'Around (Float Text wrapping)' },
              ]}
            />
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
                  onClick={() => setVerticalAlign(opt.value as 'top' | 'middle' | 'bottom')}
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

          {/* Size restrictions (Row height & Column width) */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-700/50 pt-3">
            {/* Row Height */}
            <div className="space-y-1.5">
              <SmartToggle
                label="Specify Row Height"
                checked={specifyRowHeight}
                onChange={setSpecifyRowHeight}
                className="w-full"
              />
              
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
                  <SmartSelect
                    ariaLabel="Row height mode"
                    value={rowHeightMode}
                    onChange={(val) => setRowHeightMode(val as 'atLeast' | 'exactly')}
                    size="xs"
                    options={[
                      { value: 'atLeast', label: 'At least' },
                      { value: 'exactly', label: 'Exactly' },
                    ]}
                  />
                </div>
              )}
            </div>

            {/* Column Width */}
            <div className="space-y-1.5">
              <SmartToggle
                label="Preferred Col Width"
                checked={specifyColWidth}
                onChange={setSpecifyColWidth}
                className="w-full"
              />

              {specifyColWidth && (
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/40 p-2 rounded-lg border border-slate-150 dark:border-slate-700/50">
                  <input
                    type="number"
                    value={colWidthVal}
                    onChange={(e) => setColWidthVal(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded py-1 px-1.5 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-indigo-500"
                    min="1"
                  />
                  <div className="w-16">
                    <SmartSelect
                      ariaLabel="Column width unit"
                      value={colWidthUnit}
                      onChange={(val) => setColWidthUnit(val as 'px' | '%')}
                      size="xs"
                      menuWidth={80}
                      options={[
                        { value: 'px', label: 'px' },
                        { value: '%', label: '%' },
                      ]}
                    />
                  </div>
                </div>
              )}
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
                  type="button"
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
            <SmartSelect
              label="Border Color"
              value={borderColor}
              onChange={setBorderColor}
              size="sm"
              options={[
                { value: '#000000', label: 'Black', colorSwatch: '#000000' },
                { value: '#cbd5e1', label: 'Slate Gray', colorSwatch: '#cbd5e1' },
                { value: '#3b82f6', label: 'Ocean Blue', colorSwatch: '#3b82f6' },
                { value: '#ef4444', label: 'Coral Red', colorSwatch: '#ef4444' },
                { value: '#22c55e', label: 'Emerald Green', colorSwatch: '#22c55e' },
                { value: 'none', label: 'No Borders', colorSwatch: 'none' },
              ]}
            />
            <SmartSelect
              label="Border Width"
              value={borderWidth}
              disabled={borderColor === 'none'}
              onChange={setBorderWidth}
              size="sm"
              options={[
                { value: '1px', label: 'Thin (1px)' },
                { value: '2px', label: 'Thick (2px)' },
              ]}
            />
          </div>

          <div className="space-y-1 border-t border-slate-100 dark:border-slate-700/50 pt-2">
            <SmartToggle
              label="Alternating Zebra Striping"
              checked={zebraStriping}
              onChange={setZebraStriping}
              size="md"
              className="w-full py-1.5"
            />
            <SmartToggle
              label="Prevent Row Splitting Across Pages"
              description="Prevents row content from breaking mid-paragraph across margins"
              checked={cantSplit}
              onChange={setCantSplit}
              size="md"
              className="w-full py-1.5 border-t border-slate-100 dark:border-slate-700/50"
            />
            <SmartToggle
              label="Repeat Header Row on Every Page"
              description="Repeats first row of table at top of subsequent pages"
              checked={repeatHeader}
              onChange={setRepeatHeader}
              size="md"
              className="w-full py-1.5 border-t border-slate-100 dark:border-slate-700/50"
            />
            <SmartToggle
              label="Keep Entire Table on Single Page"
              description="Forces entire table to next page if it doesn't fit"
              checked={keepTogether}
              onChange={setKeepTogether}
              size="md"
              className="w-full py-1.5 border-t border-slate-100 dark:border-slate-700/50"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6 border-t border-slate-100 dark:border-slate-700 pt-3 shrink-0">
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
            Apply Properties
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
