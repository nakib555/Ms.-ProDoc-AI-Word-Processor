import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  compact?: boolean;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  compact = false,
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center text-center select-none ${
        compact ? 'py-6 px-4' : 'py-12 px-6'
      } ${className}`}
    >
      {Icon && (
        <div
          className={`flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 mb-3.5 transition-colors ${
            compact ? 'w-10 h-10' : 'w-14 h-14'
          }`}
          aria-hidden="true"
        >
          <Icon className={compact ? 'w-5 h-5' : 'w-7 h-7'} />
        </div>
      )}

      <h3
        className={`font-semibold text-slate-800 dark:text-slate-200 tracking-tight ${
          compact ? 'text-sm' : 'text-base'
        }`}
      >
        {title}
      </h3>

      {description && (
        <p
          className={`mt-1.5 max-w-sm text-slate-500 dark:text-slate-400 leading-relaxed ${
            compact ? 'text-xs' : 'text-sm'
          }`}
        >
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={`inline-flex items-center gap-1.5 rounded-lg font-medium text-xs px-3.5 py-2 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer ${
                action.variant === 'secondary'
                  ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 focus:ring-slate-400'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white focus:ring-indigo-500'
              }`}
            >
              {action.icon && <action.icon className="w-3.5 h-3.5" aria-hidden="true" />}
              <span>{action.label}</span>
            </button>
          )}

          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="inline-flex items-center gap-1.5 rounded-lg font-medium text-xs px-3 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
            >
              {secondaryAction.icon && (
                <secondaryAction.icon className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>{secondaryAction.label}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
