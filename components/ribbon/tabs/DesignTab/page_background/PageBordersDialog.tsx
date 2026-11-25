import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Square } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { PageBorderConfig } from '../../../../../types';
import { SmartSelect } from '../../../../ui/SmartSelect';

interface PageBordersDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_BORDER: PageBorderConfig = {
  style: 'box',
  lineStyle: 'solid',
  color: '#1e293b',
  widthPt: 1,
  sides: { top: true, right: true, bottom: true, left: true },
  marginPt: 24,
};

const BORDER_WIDTH_OPTIONS = [0.5, 1, 1.5, 2.25, 3, 4.5, 6];
const COLOR_PRESETS = ['#1e293b', '#000000', '#2563eb', '#0f766e', '#7c3aed', '#b91c1c', '#b45309', '#475569'];

export const PageBordersDialog: React.FC<PageBordersDialogProps> = ({ isOpen, onClose }) => {
  const { pageConfig, setPageConfig } = useEditor();

  const [draft, setDraft] = useState<PageBorderConfig>(() => ({
    ...DEFAULT_BORDER,
    ...(pageConfig.pageBorder || {}),
    sides: {
      top: true,
      right: true,
      bottom: true,
      left: true,
      ...(pageConfig.pageBorder?.sides || {}),
    },
  }));

  useEffect(() => {
    if (isOpen) {
      setDraft({
        ...DEFAULT_BORDER,
        ...(pageConfig.pageBorder || { style: 'none' }),
        sides: {
          top: true,
          right: true,
          bottom: true,
          left: true,
          ...(pageConfig.pageBorder?.sides || {}),
        },
      });
    }
  }, [isOpen, pageConfig.pageBorder]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sides = draft.sides || { top: true, right: true, bottom: true, left: true };
  const isActive = draft.style !== 'none';

  const cssWidth = isActive ? `${Math.max(1, draft.widthPt)}px` : '0px';
  const cssLineStyle = draft.lineStyle === 'double' ? 'double' : draft.lineStyle;
  const effectiveBorderCss = `${cssWidth} ${cssLineStyle} ${draft.color}`;

  const toggleSide = (side: 'top' | 'right' | 'bottom' | 'left') => {
    const nextSides = { ...sides, [side]: !sides[side] };
    setDraft((prev) => ({
      ...prev,
      style: prev.style === 'none' ? 'box' : prev.style,
      sides: nextSides,
    }));
  };

  const handleSave = () => {
    setPageConfig((prev) => ({
      ...prev,
      pageBorder: {
        ...draft,
        sides: { ...sides },
      },
    }));
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-sm overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      data-modal-backdrop="true"
      aria-labelledby="page-borders-dialog-title"
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Square size={18} />
            </div>
            <div>
              <h2 id="page-borders-dialog-title" className="text-sm font-bold tracking-tight">
                Borders and Shading — Page Border
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure perimeter border around every page in print and PDF output
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close Page Borders dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 min-h-0 max-h-[75vh] overflow-y-auto overscroll-contain">
          {/* Setting */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Setting
            </div>
            {(
              [
                { id: 'none', label: 'None' },
                { id: 'box', label: 'Box' },
                { id: 'shadow', label: 'Shadow' },
                { id: '3d', label: '3-D' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDraft((prev) => ({ ...prev, style: opt.id }))}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                  draft.style === opt.id
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/25 text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Style, Color, Width */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Style
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    { id: 'solid', label: 'Solid' },
                    { id: 'dashed', label: 'Dashed' },
                    { id: 'dotted', label: 'Dotted' },
                    { id: 'double', label: 'Double' },
                  ] as const
                ).map((line) => (
                  <button
                    key={line.id}
                    type="button"
                    onClick={() =>
                      setDraft((prev) => ({
                        ...prev,
                        style: prev.style === 'none' ? 'box' : prev.style,
                        lineStyle: line.id,
                      }))
                    }
                    className={`px-3 py-2 rounded-lg text-xs font-medium border flex flex-col gap-1 items-start transition-colors ${
                      draft.lineStyle === line.id && isActive
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{line.label}</span>
                    <span
                      className="w-full block"
                      style={{
                        borderTop: `${line.id === 'double' ? '3px' : '2px'} ${line.id} ${draft.color}`,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Color
              </label>
              <div className="flex flex-wrap items-center gap-1.5">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setDraft((prev) => ({ ...prev, color: c }))}
                    className={`w-6 h-6 rounded-md border transition-transform ${
                      draft.color.toLowerCase() === c ? 'ring-2 ring-blue-500 scale-110' : 'border-slate-300 dark:border-slate-600'
                    }`}
                    style={{ backgroundColor: c }}
                    aria-label={`Select color ${c}`}
                  />
                ))}
                <input
                  type="color"
                  value={draft.color}
                  onChange={(e) => setDraft((prev) => ({ ...prev, color: e.target.value }))}
                  className="w-7 h-6 rounded cursor-pointer border border-slate-300 dark:border-slate-600 bg-transparent"
                  aria-label="Custom border color"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <SmartSelect
                  label="Width (pt)"
                  value={String(draft.widthPt)}
                  onChange={(val) =>
                    setDraft((prev) => ({
                      ...prev,
                      style: prev.style === 'none' ? 'box' : prev.style,
                      widthPt: Number(val),
                    }))
                  }
                  size="sm"
                  options={BORDER_WIDTH_OPTIONS.map((w) => ({
                    value: String(w),
                    label: `${w} pt`,
                  }))}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Inset (pt)
                </label>
                <input
                  type="number"
                  min={4}
                  max={72}
                  step={2}
                  value={draft.marginPt ?? 24}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      marginPt: Math.max(4, Math.min(72, Number(e.target.value) || 24)),
                    }))
                  }
                  className="w-full px-2.5 py-2 text-xs font-mono tabular-nums rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Interactive Preview */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Preview &amp; Sides
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 flex flex-col items-center gap-3">
              <div className="w-28 h-36 bg-white rounded shadow-sm p-2.5 flex items-center justify-center relative">
                <div
                  className="w-full h-full flex flex-col justify-center gap-1.5 p-2"
                  style={{
                    borderTop: isActive && sides.top ? effectiveBorderCss : 'none',
                    borderRight: isActive && sides.right ? effectiveBorderCss : 'none',
                    borderBottom: isActive && sides.bottom ? effectiveBorderCss : 'none',
                    borderLeft: isActive && sides.left ? effectiveBorderCss : 'none',
                    boxShadow:
                      draft.style === 'shadow'
                        ? '2px 2px 0 rgba(15, 23, 42, 0.35)'
                        : draft.style === '3d'
                        ? 'inset 1px 1px 0 rgba(255,255,255,0.6), 1px 1px 0 rgba(15,23,42,0.25)'
                        : 'none',
                  }}
                >
                  <div className="h-1 bg-slate-200 rounded w-full" />
                  <div className="h-1 bg-slate-200 rounded w-5/6" />
                  <div className="h-1 bg-slate-200 rounded w-4/5" />
                  <div className="h-1 bg-slate-200 rounded w-full" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 w-full">
                {(
                  [
                    { key: 'top', label: 'Top' },
                    { key: 'bottom', label: 'Bottom' },
                    { key: 'left', label: 'Left' },
                    { key: 'right', label: 'Right' },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => toggleSide(s.key)}
                    className={`px-2 py-1 rounded text-[11px] font-semibold border transition-colors ${
                      sides[s.key] && isActive
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
