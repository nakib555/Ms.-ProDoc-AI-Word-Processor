import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PenTool, Eraser, Trash2, X } from 'lucide-react';
import { RibbonButton } from '../../../../../../common/RibbonButton';
import { insertEquationBox } from '../../common/mathUtils';

const MathField = 'math-field' as any;

const QUICK_SNIPPETS = [
  { label: 'a/b', latex: '\\frac{a}{b}' },
  { label: 'x²', latex: 'x^{2}' },
  { label: '√x', latex: '\\sqrt{x}' },
  { label: '∫ f(x)dx', latex: '\\int_{a}^{b} f(x)\\,dx' },
  { label: '∑', latex: '\\sum_{i=1}^{n} x_i' },
  { label: 'lim', latex: '\\lim_{x \\to \\infty} f(x)' },
  { label: '±', latex: '\\pm' },
  { label: 'θ', latex: '\\theta' },
  { label: 'π', latex: '\\pi' },
  { label: 'α', latex: '\\alpha' },
  { label: '→', latex: '\\rightarrow' },
  { label: 'Matrix', latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
];

export const InkEquationTool: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [latex, setLatex] = useState('x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}');
  const [displayMode, setDisplayMode] = useState<'inline' | 'block'>('inline');
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('prodoc:open-equation-scratchpad', handleOpen);
    return () => window.removeEventListener('prodoc:open-equation-scratchpad', handleOpen);
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawingRef.current = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = tool === 'eraser' ? 14 : 2.5;
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.strokeStyle = '#1e293b';
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
  };

  const handleInsert = () => {
    insertEquationBox(latex.trim(), displayMode);
    setIsOpen(false);
  };

  return (
    <>
      <RibbonButton
        icon={PenTool}
        label="Ink Equation"
        onClick={() => setIsOpen(true)}
        className="min-w-[70px]"
        title="Equation Scratchpad & Visual LaTeX Builder"
      />

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Equation Scratchpad"
            data-modal-backdrop="true"
            className="fixed inset-0 z-[10050] flex items-center justify-center bg-slate-900/45 backdrop-blur-sm p-2 sm:p-4 overscroll-contain"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="w-full max-w-2xl max-h-[90dvh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 shrink-0">
                <div className="flex items-center gap-2">
                  <PenTool size={17} className="text-blue-600 dark:text-blue-400" />
                  <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Equation Scratchpad &amp; LaTeX Builder
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200/70 dark:hover:bg-slate-700"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-4">
                {/* Live Math Preview */}
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Live Math Preview
                  </div>
                  <div className="min-h-[68px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 p-3">
                    <MathField
                      value={latex}
                      onInput={(e: any) => setLatex(e.target?.value || '')}
                      className="w-full text-center text-xl"
                    >
                      {latex}
                    </MathField>
                  </div>
                </div>

                {/* Quick Math Snippets */}
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Quick Math Templates
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_SNIPPETS.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setLatex((prev) => (prev ? `${prev} ${s.latex}` : s.latex))}
                        className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Raw LaTeX Source */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    LaTeX Expression
                  </label>
                  <textarea
                    rows={2}
                    value={latex}
                    onChange={(e) => setLatex(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter LaTeX, e.g. \frac{a}{b}"
                  />
                </div>

                {/* Handwriting Scratchpad Canvas */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Sketch Scratchpad
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setTool('pen')}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium ${
                          tool === 'pen'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <PenTool size={12} /> Write
                      </button>
                      <button
                        type="button"
                        onClick={() => setTool('eraser')}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium ${
                          tool === 'eraser'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <Eraser size={12} /> Erase
                      </button>
                      <button
                        type="button"
                        onClick={clearCanvas}
                        className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-red-600 dark:text-red-400 hover:bg-red-50"
                      >
                        <Trash2 size={12} /> Clear
                      </button>
                    </div>
                  </div>
                  <canvas
                    ref={canvasRef}
                    width={580}
                    height={140}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    className="w-full h-36 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 bg-amber-50/40 dark:bg-slate-800 cursor-crosshair touch-none"
                  />
                </div>
              </div>

              <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex flex-wrap items-center justify-between gap-2 shrink-0">
                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={displayMode === 'block'}
                    onChange={(e) => setDisplayMode(e.target.checked ? 'block' : 'inline')}
                    className="rounded border-slate-300 text-blue-600"
                  />
                  <span>Centered Display Equation</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleInsert}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
                  >
                    Insert Equation
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
