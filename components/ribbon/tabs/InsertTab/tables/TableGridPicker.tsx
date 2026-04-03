
import React, { useState } from 'react';

export const TableGridPicker: React.FC<{ onInsert: (r: number, c: number) => void }> = ({ onInsert }) => {
    const [hover, setHover] = useState({ r: 0, c: 0 });

    const maxRows = 10;
    const maxCols = 10;

    return (
        <div className="p-3 flex flex-col items-center select-none">
            <div className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-full px-0.5">Insert Table</div>
            <div 
              className={`grid grid-cols-10 gap-0.5 p-1 bg-white dark:bg-[#1e293b] rounded border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer`}
              onMouseLeave={() => setHover({ r: 0, c: 0 })}
            >
                {[...Array(maxRows)].map((_, r) => (
                    [...Array(maxCols)].map((_, c) => {
                        const active = r < hover.r && c < hover.c;
                        return (
                            <div
                                key={`${r}-${c}`}
                                className={`w-6 h-6 sm:w-5 sm:h-5 border rounded-[1px] transition-all duration-75 ${active ? 'bg-blue-100 border-blue-500 dark:bg-blue-900/50 dark:border-blue-400' : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-600'}`}
                                onMouseEnter={() => setHover({ r: r + 1, c: c + 1 })}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onInsert(r + 1, c + 1);
                                    setHover({ r: 0, c: 0 });
                                }}
                            />
                        );
                    })
                ))}
            </div>
            <div className="text-center text-xs font-medium text-slate-700 dark:text-slate-300 h-4 mt-2">
                {hover.r > 0 ? `${hover.c} x ${hover.r} Table` : 'Hover to select size'}
            </div>
        </div>
    );
};
