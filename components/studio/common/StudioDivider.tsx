import React from 'react';

export const StudioDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div 
    role="separator" 
    aria-orientation="vertical"
    className={`h-5 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 flex-shrink-0 self-center ${className}`} 
  />
);
