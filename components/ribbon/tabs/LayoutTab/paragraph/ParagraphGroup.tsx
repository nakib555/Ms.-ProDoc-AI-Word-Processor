
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { RibbonSection } from '../../../common/RibbonSection';
import { IndentTools } from './IndentTools';
import { SpacingTools } from './SpacingTools';
import { Settings, X } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { SmartSelect } from '../../../../ui/SmartSelect';

export const ParagraphGroup: React.FC = () => {
  const { applyBlockStyle } = useEditor();
  const [showDialog, setShowDialog] = useState(false);
  const [align, setAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [indentLeft, setIndentLeft] = useState('0');
  const [indentRight, setIndentRight] = useState('0');
  const [spaceBefore, setSpaceBefore] = useState('0');
  const [spaceAfter, setSpaceAfter] = useState('8');
  const [lineHeight, setLineHeight] = useState('1.15');

  const openDialog = () => {
    const sel = window.getSelection();
    let node: Node | null = sel && sel.rangeCount > 0 ? sel.anchorNode : null;
    if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
    const block = node instanceof HTMLElement ? (node.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote') as HTMLElement | null) : null;
    if (block) {
      const comp = window.getComputedStyle(block);
      const ta = (block.style.textAlign || comp.textAlign || 'left') as any;
      setAlign(['left', 'center', 'right', 'justify'].includes(ta) ? ta : 'left');
      setIndentLeft(String(Math.round(((parseFloat(block.style.marginLeft || '0') || 0) / 37.8) * 10) / 10));
      setIndentRight(String(Math.round(((parseFloat(block.style.marginRight || '0') || 0) / 37.8) * 10) / 10));
      setSpaceBefore(String(Math.round((parseFloat(block.style.marginTop || '0') || 0) / 1.33)));
      setSpaceAfter(String(Math.round((parseFloat(block.style.marginBottom || '0') || 0) / 1.33)));
      setLineHeight(block.style.lineHeight || '1.15');
    }
    setShowDialog(true);
  };

  const handleApply = () => {
    const leftPx = Math.round(Math.max(0, parseFloat(indentLeft) || 0) * 37.8 * 10) / 10;
    const rightPx = Math.round(Math.max(0, parseFloat(indentRight) || 0) * 37.8 * 10) / 10;
    const beforePx = Math.round(Math.max(0, parseFloat(spaceBefore) || 0) * 1.33 * 10) / 10;
    const afterPx = Math.round(Math.max(0, parseFloat(spaceAfter) || 0) * 1.33 * 10) / 10;
    applyBlockStyle({
      textAlign: align,
      marginLeft: `${leftPx}px`,
      marginRight: `${rightPx}px`,
      marginTop: `${beforePx}px`,
      marginBottom: `${afterPx}px`,
      lineHeight: lineHeight || '1.15',
    });
    setShowDialog(false);
  };

  return (
    <RibbonSection title="Paragraph">
        <div className="flex h-full gap-4 px-2">
             <IndentTools />
             <div className="w-[1px] bg-slate-200 dark:bg-slate-700 h-full"></div>
             <SpacingTools />
        </div>
        {/* Launcher */}
        <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={openDialog}
            title="Paragraph Settings"
            aria-label="Paragraph Settings"
            className="p-0.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-sm self-end mb-0.5 transition-colors"
        >
            <Settings size={11} />
        </button>

        {showDialog && createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in overscroll-contain"
            role="dialog"
            aria-modal="true"
            data-modal-backdrop="true"
            onClick={() => setShowDialog(false)}
          >
            <div
              className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-sm max-h-[90dvh] flex flex-col overflow-hidden animate-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5 pb-2.5 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Paragraph Settings</h3>
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="p-4 sm:p-5 space-y-4 text-xs flex-1 min-h-0 overflow-y-auto overscroll-contain">
                <div>
                  <SmartSelect
                    label="Alignment"
                    value={align}
                    onChange={(val) => setAlign(val as any)}
                    size="sm"
                    options={[
                      { value: 'left', label: 'Left' },
                      { value: 'center', label: 'Centered' },
                      { value: 'right', label: 'Right' },
                      { value: 'justify', label: 'Justified' },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">Left Indent (cm)</label>
                    <input
                      type="number"
                      step="0.2"
                      min="0"
                      value={indentLeft}
                      onChange={(e) => setIndentLeft(e.target.value)}
                      className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">Right Indent (cm)</label>
                    <input
                      type="number"
                      step="0.2"
                      min="0"
                      value={indentRight}
                      onChange={(e) => setIndentRight(e.target.value)}
                      className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">Before (pt)</label>
                    <input
                      type="number"
                      step="2"
                      min="0"
                      value={spaceBefore}
                      onChange={(e) => setSpaceBefore(e.target.value)}
                      className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">After (pt)</label>
                    <input
                      type="number"
                      step="2"
                      min="0"
                      value={spaceAfter}
                      onChange={(e) => setSpaceAfter(e.target.value)}
                      className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <SmartSelect
                      label="Line Spacing"
                      value={lineHeight}
                      onChange={setLineHeight}
                      size="sm"
                      options={[
                        { value: '1', label: '1.0' },
                        { value: '1.15', label: '1.15' },
                        { value: '1.5', label: '1.5' },
                        { value: '2', label: 'Double (2.0)' },
                        { value: '2.5', label: '2.5' },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 px-4 sm:px-5 py-3 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="px-3.5 py-1.5 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                >
                  OK
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </RibbonSection>
  );
};
