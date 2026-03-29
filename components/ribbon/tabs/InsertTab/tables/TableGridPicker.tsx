
import React, { useState, useRef } from 'react';

export const TableGridPicker: React.FC<{ onInsert: (r: number, c: number) => void }> = ({ onInsert }) => {
    const [hover, setHover] = useState({ r: 0, c: 0 });
    const gridRef = useRef<HTMLDivElement>(null);

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!gridRef.current) return;
        const touch = e.touches[0];
        
        // Find the element under the touch point
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        if (el && el.hasAttribute('data-row') && el.hasAttribute('data-col')) {
            const r = parseInt(el.getAttribute('data-row') || '0', 10);
            const c = parseInt(el.getAttribute('data-col') || '0', 10);
            setHover({ r, c });
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (hover.r > 0 && hover.c > 0) {
            onInsert(hover.r, hover.c);
            setHover({ r: 0, c: 0 });
        }
    };

    return (
        <div className="p-3 bg-slate-50/50 flex flex-col items-center select-none touch-none">
            <div className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider w-full px-0.5">Insert Table</div>
            <div 
              ref={gridRef}
              className="grid grid-cols-10 gap-0.5 p-1 bg-white rounded border border-slate-200 shadow-sm cursor-crosshair touch-none"
              onMouseLeave={() => setHover({ r: 0, c: 0 })}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
                {[...Array(10)].map((_, r) => (
                    [...Array(10)].map((_, c) => {
                        const active = r < hover.r && c < hover.c;
                        return (
                            <div
                                key={`${r}-${c}`}
                                data-row={r + 1}
                                data-col={c + 1}
                                className={`w-5 h-5 sm:w-5 sm:h-5 border rounded-[1px] transition-all duration-75 ${active ? 'bg-blue-100 border-blue-500' : 'bg-white border-slate-200'}`}
                                onMouseEnter={() => setHover({ r: r + 1, c: c + 1 })}
                                onClick={() => onInsert(r + 1, c + 1)}
                                onTouchStart={(e) => {
                                    e.preventDefault(); // Prevent scrolling while dragging
                                    setHover({ r: r + 1, c: c + 1 });
                                }}
                            />
                        );
                    })
                ))}
            </div>
            <div className="text-center text-xs font-medium text-slate-700 h-4 mt-2">
                {hover.r > 0 ? `${hover.c} x ${hover.r} Table` : 'Hover or drag to select size'}
            </div>
        </div>
    );
};
