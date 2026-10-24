
import React from 'react';

interface RibbonSectionProps {
  title: string;
  children: React.ReactNode;
}

export const RibbonSection: React.FC<RibbonSectionProps> = ({ title, children }) => (
  <div 
    className="flex items-center h-full px-2.5 relative border-r border-slate-200/80 dark:border-slate-800/90 last:border-r-0 flex-shrink-0"
    title={title}
  >
    <div className="flex items-center gap-1 min-h-0 flex-nowrap">
      {children}
    </div>
  </div>
);
