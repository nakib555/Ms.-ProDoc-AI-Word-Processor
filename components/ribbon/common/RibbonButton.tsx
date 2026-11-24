
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
    className={`flex flex-col items-center justify-center px-2 py-1 min-w-[60px] md:min-w-[68px] h-full rounded-lg transition-all duration-200 group relative flex-shrink-0 ${className || ''} ${
      disabled
        ? 'opacity-40 cursor-not-allowed text-slate-700 dark:text-slate-200'
        : active
        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 ring-1 ring-blue-300 dark:ring-blue-700'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white active:bg-slate-200 dark:active:bg-slate-700'
    }`}
    onClick={disabled ? undefined : onClick}
    onMouseDown={(e) => e.preventDefault()}
    title={title || label}
    disabled={disabled}
  >
    <div className={`p-1.5 rounded-md transition-all mb-1 ${disabled ? '' : 'group-active:scale-95'}`}>
        <Icon className={`w-6 h-6 transition-colors ${iconClassName || (active ? 'text-blue-600 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300')} ${disabled ? '' : 'group-hover:text-slate-900 dark:group-hover:text-white'}`} strokeWidth={1.5} />
    </div>
    <div className="flex items-center justify-center w-full px-0.5">
        <span className={`text-xs font-medium leading-tight text-center ${disabled ? '' : 'group-hover:text-slate-900 dark:group-hover:text-white'}`}>{label}</span>
        {hasArrow && <ChevronDown size={12} className={`ml-0.5 opacity-80 shrink-0 ${disabled ? '' : 'group-hover:text-slate-900 dark:group-hover:text-white'}`} />}
    </div>
  </button>
));
