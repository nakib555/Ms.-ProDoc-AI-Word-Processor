import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface StudioButtonProps {
  icon?: React.ElementType;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  shortcut?: string;
  hasDropdown?: boolean;
  variant?: 'ghost' | 'segmented' | 'primary' | 'subtle';
  size?: 'sm' | 'md';
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
}

export const StudioButton = React.forwardRef<HTMLButtonElement, StudioButtonProps>(({
  icon: Icon,
  label,
  onClick,
  active = false,
  disabled = false,
  title,
  shortcut,
  hasDropdown = false,
  variant = 'ghost',
  size = 'md',
  className = '',
  iconClassName = '',
  children,
}, ref) => {
  const sizeClasses = size === 'sm'
    ? 'h-7 px-2 text-xs gap-1.5'
    : 'h-8 px-2.5 text-xs font-medium gap-1.5';

  const variantClasses = {
    ghost: active
      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 font-semibold shadow-xs ring-1 ring-indigo-200 dark:ring-indigo-800/60'
      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white',
    segmented: active
      ? 'bg-white text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 font-semibold shadow-xs'
      : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60',
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-xs shadow-indigo-500/20 active:scale-[0.98]',
    subtle: active
      ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white',
  }[variant];

  const fullTooltip = [title || label, shortcut ? `(${shortcut})` : ''].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type="button"
      onClick={disabled ? undefined : onClick}
      onMouseDown={(e) => {
        // Prevent stealing focus from the rich-text editor when clicking tools
        if ((e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'SELECT') {
          e.preventDefault();
        }
      }}
      disabled={disabled}
      title={fullTooltip}
      aria-label={fullTooltip}
      className={`
        inline-flex items-center justify-center rounded-md transition-all duration-150 select-none flex-shrink-0 cursor-pointer
        ${sizeClasses}
        ${variantClasses}
        ${disabled ? 'opacity-40 cursor-not-allowed hover:bg-transparent pointer-events-none' : 'active:scale-[0.98]'}
        ${className}
      `}
    >
      {Icon && (
        <Icon 
          size={15} 
          className={`flex-shrink-0 transition-colors ${iconClassName || ''}`} 
          strokeWidth={active ? 2.2 : 1.8}
        />
      )}
      {label && <span className="whitespace-nowrap tracking-tight">{label}</span>}
      {children}
      {hasDropdown && (
        <ChevronDown size={12} className="opacity-60 -mr-0.5 flex-shrink-0" />
      )}
    </button>
  );
});

StudioButton.displayName = 'StudioButton';
