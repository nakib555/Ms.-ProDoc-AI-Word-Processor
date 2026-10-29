import React, { useState } from 'react';
import { Search, Check, Maximize2, MoveHorizontal, X } from 'lucide-react';
import { useEditor } from '../../contexts/EditorContext';

interface ZoomDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_ZOOMS = [50, 75, 90, 100, 125, 150, 200];

export const ZoomDialog: React.FC<ZoomDialogProps> = ({ isOpen, onClose }) => {
  const { zoom, setZoom, zoomMode, setZoomMode } = useEditor();
  const [customVal, setCustomVal] = useState<number>(Math.round(zoom));

  if (!isOpen) return null;

  const handleSelectPreset = (value: number) => {
    setZoomMode('custom');
    setZoom(value);
    setCustomVal(value);
    onClose();
  };

  const handleFitWidth = () => {
    setZoomMode('fit-width');
    onClose();
  };

  const handleFitPage = () => {
    setZoomMode('fit-page');
    onClose();
  };

  const handleCustomApply = () => {
    const clamped = Math.max(10, Math.min(500, customVal));
    setZoomMode('custom');
    setZoom(clamped);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <Search size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Zoom & Viewport</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Fit Options */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleFitWidth}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                zoomMode === 'fit-width'
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-600 text-blue-700 dark:text-blue-300 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              <MoveHorizontal size={14} />
              Page Width
            </button>
            <button
              onClick={handleFitPage}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                zoomMode === 'fit-page'
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-600 text-blue-700 dark:text-blue-300 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Maximize2 size={14} />
              Whole Page
            </button>
          </div>

          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pt-1">
            Standard Presets
          </div>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-4 gap-2">
            {PRESET_ZOOMS.map((preset) => {
              const isSelected = zoomMode === 'custom' && Math.round(zoom) === preset;
              return (
                <button
                  key={preset}
                  onClick={() => handleSelectPreset(preset)}
                  className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {isSelected && <Check size={12} strokeWidth={3} />}
                  {preset}%
                </button>
              );
            })}
          </div>

          {/* Custom Zoom Slider & Input */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Custom Zoom:</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={customVal}
                  onChange={(e) => setCustomVal(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-right text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-slate-400">%</span>
              </div>
            </div>

            <input
              type="range"
              min="10"
              max="500"
              value={customVal}
              onChange={(e) => setCustomVal(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCustomApply}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
          >
            Apply Zoom
          </button>
        </div>
      </div>
    </div>
  );
};
