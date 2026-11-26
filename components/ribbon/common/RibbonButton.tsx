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
  active?: boolean;
}

export const RibbonButton: React.FC<RibbonButtonProps> = React.memo(({
  icon: Icon,
  label,
  onClick,
  className,
  iconClassName,
  title,
  hasArrow,
  disabled,
  active
}) => (
  <button
    type="button"
    className={`flex flex-col items-center justify-center px-1.5 sm:px-2 lg:px-2.5 py-1 sm:py-1.5 min-w-[52px] sm:min-w-[60px] lg:min-w-[70px] h-[66px] sm:h-[74px] lg:h-[82px] rounded-lg transition-all duration-150 group relative flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${className || ''} ${
      disabled
        ? 'opacity-40 cursor-not-allowed text-slate-700 dark:text-slate-200'
        : active
        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 ring-1 ring-blue-300 dark:ring-blue-700 shadow-xs'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white active:bg-slate-200 dark:active:bg-slate-700'
    }`}
    onClick={disabled ? undefined : onClick}
    onMouseDown={(e) => e.preventDefault()}
    title={title || label}
    aria-pressed={active !== undefined ? active : undefined}
    aria-haspopup={hasArrow ? 'menu' : undefined}
    disabled={disabled}
  >
    <div className={`p-1 sm:p-1.5 rounded-md transition-all mb-0.5 sm:mb-1 ${disabled ? '' : 'group-active:scale-95'}`}>
      <Icon
        className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-[22px] lg:h-[22px] transition-colors ${iconClassName || (active ? 'text-blue-600 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300')} ${disabled ? '' : 'group-hover:text-slate-900 dark:group-hover:text-white'}`}
        strokeWidth={1.65}
      />
    </div>
    <div className="flex items-center justify-center w-full gap-0.5 px-0.5">
      <span className={`text-[10px] sm:text-[11px] lg:text-xs font-medium leading-tight text-center whitespace-nowrap ${disabled ? '' : 'group-hover:text-slate-900 dark:group-hover:text-white'}`}>
        {label}
      </span>
      {hasArrow && (
        <ChevronDown
          size={11}
          className={`opacity-75 shrink-0 ${disabled ? '' : 'group-hover:text-slate-900 dark:group-hover:text-white'}`}
        />
      )}
    </div>
  </button>
));
