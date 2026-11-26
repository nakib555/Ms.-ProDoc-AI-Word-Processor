import React from 'react';

interface RibbonSectionProps {
  title: string;
  children: React.ReactNode;
}

export const RibbonSection: React.FC<RibbonSectionProps> = ({ title, children }) => (
  <div
    className="prodoc-ribbon-section flex items-center min-h-[74px] sm:min-h-[84px] lg:min-h-[92px] h-full px-2 sm:px-2.5 lg:px-3 py-1 relative flex-shrink-0"
    title={title}
    aria-label={title}
  >
    <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 h-full min-h-0 flex-nowrap">
      {children}
    </div>
  </div>
);
