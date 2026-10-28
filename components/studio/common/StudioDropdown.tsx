import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface StudioDropdownItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  shortcut?: string;
  badge?: string;
  danger?: boolean;
  divider?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface StudioDropdownProps {
  label?: string;
  icon?: React.ElementType;
  items?: StudioDropdownItem[];
  customContent?: (close: () => void) => React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  align?: 'left' | 'right';
  variant?: 'ghost' | 'segmented' | 'primary' | 'subtle';
  size?: 'sm' | 'md';
}

export const StudioDropdown: React.FC<StudioDropdownProps> = ({
  label,
  icon: Icon,
  items,
  customContent,
  active = false,
  disabled = false,
  title,
  className = '',
  triggerClassName = '',
  menuClassName = '',
  align = 'left',
  variant = 'ghost',
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as HTMLElement)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const sizeClasses = size === 'sm'
    ? 'h-7 px-2 text-xs gap-1.5'
    : 'h-8 px-2.5 text-xs font-medium gap-1.5';

  const variantClasses = {
    ghost: (active || isOpen)
      ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 font-semibold'
      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100',
    segmented: (active || isOpen)
      ? 'bg-white text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 font-semibold shadow-xs'
      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200',
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 font-medium',
    subtle: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
  }[variant];

  return (
    <div ref={containerRef} className={`relative inline-block text-left flex-shrink-0 ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onMouseDown={(e) => e.preventDefault()}
        disabled={disabled}
        title={title || label}
        className={`
          inline-flex items-center justify-center rounded-md transition-all duration-150 select-none cursor-pointer
          ${sizeClasses}
          ${variantClasses}
          ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
          ${triggerClassName}
        `}
      >
        {Icon && <Icon size={15} strokeWidth={1.8} className="flex-shrink-0" />}
        {label && <span className="whitespace-nowrap tracking-tight">{label}</span>}
        <ChevronDown size={12} className={`opacity-60 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`
            absolute top-full mt-1 z-50 min-w-[200px] rounded-lg bg-white dark:bg-slate-900 
            border border-slate-200 dark:border-slate-800 shadow-xl py-1 focus:outline-none animate-in fade-in zoom-in-95
            ${align === 'right' ? 'right-0' : 'left-0'}
            ${menuClassName}
          `}
        >
          {customContent ? (
            customContent(() => setIsOpen(false))
          ) : (
            <div className="py-1">
              {items?.map((item) => {
                if (item.divider) {
                  return <div key={item.id} className="h-[1px] bg-slate-100 dark:bg-slate-800 my-1" />;
                }
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={item.disabled}
                    onClick={() => {
                      if (!item.disabled) {
                        item.onClick?.();
                        setIsOpen(false);
                      }
                    }}
                    className={`
                      w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors
                      ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                      ${item.danger
                        ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {ItemIcon && <ItemIcon size={14} className="opacity-70 flex-shrink-0" />}
                      <span className="font-normal">{item.label}</span>
                    </div>
                    {item.shortcut && (
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono ml-4">
                        {item.shortcut}
                      </span>
                    )}
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
