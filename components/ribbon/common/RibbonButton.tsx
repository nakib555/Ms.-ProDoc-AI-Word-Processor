
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface RibbonButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
  title?: string;
  command?: string; 
  hasArrow?: boolean;
  disabled?: boolean;
}

export const RibbonButton: React.FC<RibbonButtonProps> = React.memo(({
  icon: Icon,
  label,
  onClick,
  className,
  iconClassName,
  title,
  hasArrow,
  disabled
}) => (
  <button
    type="button"
    className={`group relative flex flex-col items-center justify-center px-2 py-1.5 min-w-[56px] md:min-w-[62px] h-[72px] rounded-lg transition-all duration-150 border border-transparent text-slate-700 dark:text-slate-300 flex-shrink-0 select-none ${className || ''} ${
      disabled 
        ? 'opacity-40 cursor-not-allowed pointer-events-none' 
        : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700/80 hover:text-slate-950 dark:hover:text-white active:bg-slate-200 dark:active:bg-slate-700 active:scale-[0.97]'
    }`}
    onClick={disabled ? undefined : onClick}
    onMouseDown={(e) => e.preventDefault()}
    title={title || label}
    disabled={disabled}
  >
    <div className={`p-1 rounded-md transition-colors ${disabled ? '' : 'group-hover:bg-slate-200/50 dark:group-hover:bg-slate-700/50'}`}>
      <Icon 
        className={`w-5 h-5 transition-colors duration-150 ${iconClassName || 'text-slate-600 dark:text-slate-300'} ${disabled ? '' : 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`} 
        strokeWidth={1.75} 
      />
    </div>
    <div className="flex items-center justify-center w-full px-0.5 mt-0.5">
      <span className="text-[11px] font-medium leading-tight text-center truncate max-w-[64px] tracking-tight">
        {label}
      </span>
      {hasArrow && (
        <ChevronDown size={11} className="ml-0.5 opacity-60 shrink-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  </button>
));
