
import React, { useState, useRef, useEffect } from 'react';

export const TableGridPicker: React.FC<{ onInsert: (r: number, c: number) => void }> = ({ onInsert }) => {
    const [hover, setHover] = useState({ r: 0, c: 0 });
    const gridRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const maxRows = 10;
    const maxCols = 10;

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        if (!gridRef.current) return;
        
        // Find the element under the pointer
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el && el.hasAttribute('data-row') && el.hasAttribute('data-col')) {
            const r = parseInt(el.getAttribute('data-row') || '0', 10);
            const c = parseInt(el.getAttribute('data-col') || '0', 10);
            setHover({ r, c });
        }
    };

    const handlePointerUp = () => {
        if (isDragging && hover.r > 0 && hover.c > 0) {
            onInsert(hover.r, hover.c);
            setHover({ r: 0, c: 0 });
        }
        setIsDragging(false);
    };

    useEffect(() => {
        const handleGlobalPointerUp = () => {
            setIsDragging(false);
        };
        window.addEventListener('pointerup', handleGlobalPointerUp);
        return () => window.removeEventListener('pointerup', handleGlobalPointerUp);
    }, []);

    return (
        <div className="p-3 flex flex-col items-center select-none touch-none">
            <div className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-full px-0.5">Insert Table</div>
            <div 
              ref={gridRef}
              className={`grid grid-cols-10 gap-0.5 p-1 bg-white dark:bg-[#1e293b] rounded border border-slate-200 dark:border-slate-700 shadow-sm cursor-crosshair touch-none`}
              onPointerLeave={() => { if (!isDragging) setHover({ r: 0, c: 0 }); }}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
                {[...Array(maxRows)].map((_, r) => (
                    [...Array(maxCols)].map((_, c) => {
                        const active = r < hover.r && c < hover.c;
                        return (
                            <div
                                key={`${r}-${c}`}
                                data-row={r + 1}
                                data-col={c + 1}
                                className={`w-6 h-6 sm:w-5 sm:h-5 border rounded-[1px] transition-all duration-75 ${active ? 'bg-blue-100 border-blue-500 dark:bg-blue-900/50 dark:border-blue-400' : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-600'}`}
                                onPointerEnter={() => {
                                    if (!isDragging) setHover({ r: r + 1, c: c + 1 });
                                }}
                                onPointerDown={(e) => {
                                    e.preventDefault(); // Prevent scrolling/text selection
                                    (e.target as HTMLElement).releasePointerCapture(e.pointerId); // Allow pointer events to go to other elements
                                    setIsDragging(true);
                                    setHover({ r: r + 1, c: c + 1 });
                                }}
                                onClick={() => {
                                    if (!isDragging) onInsert(r + 1, c + 1);
                                }}
                            />
                        );
                    })
                ))}
            </div>
            <div className="text-center text-xs font-medium text-slate-700 dark:text-slate-300 h-4 mt-2">
                {hover.r > 0 ? `${hover.c} x ${hover.r} Table` : 'Hover or drag to select size'}
            </div>
        </div>
    );
};
