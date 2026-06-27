
import React from 'react';

interface RibbonSectionProps {
  title: string;
  children: React.ReactNode;
}

export const RibbonSection: React.FC<RibbonSectionProps> = ({ title, children }) => (
  <div className="flex flex-col h-full px-2 relative group py-1 after:content-[''] after:absolute after:right-0 after:top-3 after:bottom-3 after:w-[1px] after:bg-slate-200 dark:after:bg-slate-700/50 after:rounded-full last:after:hidden" title={title}>
    <div className="flex flex-1 items-center justify-center gap-1 min-h-0 flex-nowrap">
      {children}
    </div>
  </div>
);
