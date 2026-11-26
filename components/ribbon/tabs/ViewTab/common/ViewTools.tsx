import React from 'react';
import { Check, ChevronDown } from 'lucide-react';

export const SmallRibbonButton: React.FC<{
  icon: any;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  hasArrow?: boolean;
  iconClassName?: string;
  title?: string;
}> = ({ icon: Icon, label, onClick, disabled, active, className, hasArrow, iconClassName, title }) => (
  <button
    type="button"
    onClick={onClick}
    onMouseDown={(e) => e.preventDefault()}
    disabled={disabled}
    aria-pressed={active !== undefined ? active : undefined}
    aria-haspopup={hasArrow ? 'menu' : undefined}
    className={`flex items-center gap-2 w-full px-2 py-1 text-left rounded-md group transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 ${
      active
        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800'
        : 'hover:bg-slate-100 dark:hover:bg-slate-700/60'
    } ${className || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    title={title || label}
  >
    <Icon
      size={14}
      className={`${
        active ? 'text-blue-600 dark:text-blue-300' : iconClassName || 'text-slate-500 dark:text-slate-400'
      } group-hover:text-slate-700 dark:group-hover:text-slate-200 shrink-0 transition-colors`}
    />
    <span
      className={`text-[11px] font-medium truncate leading-tight flex-1 ${
        active
          ? 'text-blue-700 dark:text-blue-200 font-semibold'
          : 'text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
      }`}
    >
      {label}
    </span>
    {hasArrow && (
      <ChevronDown size={9} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 shrink-0 ml-1" />
    )}
  </button>
);

export const CheckboxItem: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  title?: string;
}> = ({ label, checked, onChange, disabled, title }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    title={title || `${label}: ${checked ? 'On' : 'Off'}`}
    onClick={disabled ? undefined : onChange}
    onMouseDown={(e) => e.preventDefault()}
    className={`flex items-center gap-2 px-2 py-1 w-full rounded-md group transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer'
    }`}
  >
    <div
      className={`w-3.5 h-3.5 rounded-[4px] border flex items-center justify-center transition-all shrink-0 ${
        checked
          ? 'bg-blue-600 border-blue-600 shadow-xs'
          : 'bg-white dark:bg-slate-900 border-slate-400 dark:border-slate-500 group-hover:border-blue-500 dark:group-hover:border-blue-400'
      }`}
    >
      {checked && <Check size={10} className="text-white" strokeWidth={3} />}
    </div>
    <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white leading-tight select-none whitespace-nowrap">
      {label}
    </span>
  </button>
);
