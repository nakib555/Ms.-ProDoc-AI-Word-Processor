import React from 'react';
import { StudioTab, RibbonTab } from '../types';
import { StudioCommandBar } from './studio/StudioCommandBar';

interface RibbonProps {
  activeTab: RibbonTab | StudioTab | null;
  onTabChange: (tab: StudioTab | RibbonTab) => void;
}

/**
 * Modern non-infringing ProDoc Studio Command Bar.
 * Completely replaces Microsoft Word Fluent Ribbon trade-dress.
 */
export const Ribbon: React.FC<RibbonProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <StudioCommandBar
      activeTab={activeTab as StudioTab}
      onTabChange={onTabChange}
    />
  );
};

export default Ribbon;
