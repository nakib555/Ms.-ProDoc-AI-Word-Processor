import React from 'react';

export interface StudioButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const StudioButtonGroup: React.FC<StudioButtonGroupProps> = ({
  children,
  className = '',
  ariaLabel,
}) => {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`
        inline-flex items-center rounded-md border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-0.5 gap-0.5 flex-shrink-0
        ${className}
      `}
    >
      {children}
    </div>
  );
};
