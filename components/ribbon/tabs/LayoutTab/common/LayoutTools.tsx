
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLayoutTab } from '../LayoutTabContext';

interface DropdownButtonProps {
  id: string;
  icon: any;
  label: string;
  disabled?: boolean;
  hasArrow?: boolean;
  iconClassName?: string;
}

export const DropdownButton: React.FC<DropdownButtonProps> = React.memo(({ 
  id, icon: Icon, label, disabled = false, hasArrow = true, iconClassName
}) => {
   const { activeMenu, toggleMenu, registerTrigger } = useLayoutTab();

   return (
      <div 
          ref={(el) => registerTrigger(id, el)}
          className={`relative h-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
          <button
              onClick={(e) => { e.stopPropagation(); if (!disabled) toggleMenu(id); }}
              onMouseDown={(e) => e.preventDefault()}
              className={`flex flex-col items-center justify-center px-1.5 sm:px-2 py-1 min-w-[52px] sm:min-w-[60px] lg:min-w-[68px] h-full rounded-lg transition-all duration-200 group relative text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 ${activeMenu === id ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white shadow-inner ring-1 ring-slate-300 dark:ring-slate-600' : ''}`}
          >
              <div className="p-1 sm:p-1.5 rounded-md transition-all mb-0.5 sm:mb-1">
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${iconClassName || 'text-slate-500 dark:text-slate-400'} ${activeMenu === id ? 'text-slate-900 dark:text-white' : 'group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} strokeWidth={1.5} />
              </div>
              <div className="flex items-center justify-center w-full px-0.5">
                  <span className="text-[10px] sm:text-[11px] lg:text-xs font-medium leading-tight text-center group-hover:text-slate-900 dark:group-hover:text-white whitespace-nowrap">{label}</span>
                  {hasArrow && <ChevronDown size={12} className={`ml-0.5 ${activeMenu === id ? 'rotate-180' : ''} transition-transform text-slate-400 group-hover:text-slate-600 shrink-0`} />}
              </div>
          </button>
      </div>
   );
});

export const ParagraphInput: React.FC<{
  label: string;
  value: string;
  icon: any;
  step?: number;
  unit?: string;
  min?: number;
  onChange?: (val: string) => void;
}> = React.memo(({ label, value, icon: Icon, step = 1, unit, min = 0, onChange }) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const commitValue = (raw: string) => {
        if (onChange) onChange(raw);
    };

    const handleStep = (direction: 1 | -1) => {
        const parsed = parseFloat(localValue);
        const base = Number.isNaN(parsed) ? 0 : parsed;
        const next = Math.max(min, Math.round((base + direction * step) * 10) / 10);
        const inferredUnit = unit ?? (localValue.match(/[a-z%]+$/i)?.[0] || '');
        const formatted = inferredUnit ? `${next} ${inferredUnit}` : `${next}`;
        setLocalValue(formatted);
        commitValue(formatted);
    };

    return (
        <div className="flex items-center gap-1.5 sm:gap-2 h-6 sm:h-7">
            <div className="flex items-center justify-end w-[54px] sm:w-[64px] gap-1 sm:gap-1.5 opacity-90">
                 <Icon size={13} className="text-slate-500 dark:text-slate-400 stroke-[1.5] shrink-0" />
                 <span className="text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">{label}:</span>
            </div>
            <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:border-slate-400 dark:hover:border-slate-600 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all h-6 sm:h-7 w-[72px] sm:w-20 relative overflow-hidden group shadow-sm">
                <input 
                    type="text" 
                    aria-label={label}
                    className="w-full h-full text-[10px] sm:text-[11px] font-medium text-slate-800 dark:text-slate-200 outline-none bg-transparent pl-2 pr-6 tabular-nums" 
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            commitValue(localValue);
                            e.currentTarget.blur();
                        } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            handleStep(1);
                        } else if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            handleStep(-1);
                        }
                    }}
                    onBlur={(e) => commitValue(e.target.value)}
                />
                <div className="flex flex-col border-l border-slate-200 dark:border-slate-700 w-5 h-full absolute right-0 bg-slate-50 dark:bg-slate-800 opacity-85 group-hover:opacity-100 transition-opacity">
                    <button
                        type="button"
                        aria-label={`Increase ${label}`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleStep(1)}
                        className="flex-1 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors border-b border-slate-200 dark:border-slate-700"
                    >
                        <ChevronUp size={8} strokeWidth={2.5} />
                    </button>
                    <button
                        type="button"
                        aria-label={`Decrease ${label}`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleStep(-1)}
                        className="flex-1 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                        <ChevronDown size={8} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
});
