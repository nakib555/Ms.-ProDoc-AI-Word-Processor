import React from 'react';

export interface SmartToggleProps {
  label?: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
}

export const SmartToggle: React.FC<SmartToggleProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  size = 'sm',
  className = '',
  id,
}) => {
  const trackSize = size === 'sm' ? 'w-8 h-[18px]' : 'w-10 h-5';
  const thumbSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const thumbTranslate =
    size === 'sm'
      ? checked
        ? 'translate-x-[15px]'
        : 'translate-x-[2px]'
      : checked
      ? 'translate-x-[21px]'
      : 'translate-x-[2px]';

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => !disabled && onChange(!checked)}
      className={`group inline-flex items-center justify-between gap-2.5 text-left select-none rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      {(label || description) && (
        <span className="flex flex-col min-w-0">
          {label && (
            <span className="text-xs font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white truncate">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
              {description}
            </span>
          )}
        </span>
      )}
      <span
        aria-hidden="true"
        className={`relative inline-flex items-center shrink-0 rounded-full transition-colors duration-200 ${trackSize} ${
          checked
            ? 'bg-indigo-600 dark:bg-indigo-500 shadow-inner'
            : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-slate-400 dark:group-hover:bg-slate-500'
        }`}
      >
        <span
          className={`inline-block rounded-full bg-white shadow-sm transform transition-transform duration-200 ${thumbSize} ${thumbTranslate}`}
        />
      </span>
    </button>
  );
};
