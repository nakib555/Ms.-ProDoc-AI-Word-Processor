import React, { useState, useMemo, useEffect } from 'react';
import { StudioTab } from '../../types';
import { StudioHeader } from './StudioHeader';
import { StudioTabBar } from './StudioTabBar';
import { FormatTray } from './trays/FormatTray';
import { InsertTray } from './trays/InsertTray';
import { CanvasTray } from './trays/CanvasTray';
import { StructureTray } from './trays/StructureTray';
import { CollaborateTray } from './trays/CollaborateTray';
import { TemplatesTray } from './trays/TemplatesTray';
import { WorkspaceTray } from './trays/WorkspaceTray';
import { TableStudioTray } from './trays/TableStudioTray';
import { EquationStudioTray } from './trays/EquationStudioTray';
import { HeaderFooterTray } from './trays/HeaderFooterTray';

interface StudioCommandBarProps {
  activeTab: StudioTab | null;
  onTabChange: (tab: StudioTab) => void;
}

export const StudioCommandBar: React.FC<StudioCommandBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const [isTrayCollapsed, setIsTrayCollapsed] = useState(false);

  // Keyboard shortcut Ctrl+F1 to toggle collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'F1') {
        e.preventDefault();
        setIsTrayCollapsed(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const trayContent = useMemo(() => {
    if (!activeTab || isTrayCollapsed) return null;

    switch (activeTab) {
      case StudioTab.FORMAT:
        return <FormatTray />;
      case StudioTab.INSERT:
        return <InsertTray />;
      case StudioTab.CANVAS:
        return <CanvasTray />;
      case StudioTab.STRUCTURE:
        return <StructureTray />;
      case StudioTab.COLLABORATE:
        return <CollaborateTray />;
      case StudioTab.TEMPLATES:
        return <TemplatesTray />;
      case StudioTab.VIEW:
        return <WorkspaceTray />;
      case StudioTab.TABLE_DESIGN:
      case StudioTab.TABLE_LAYOUT:
        return <TableStudioTray />;
      case StudioTab.EQUATION:
        return <EquationStudioTray />;
      case StudioTab.HEADER_FOOTER:
        return <HeaderFooterTray />;
      default:
        return <FormatTray />;
    }
  }, [activeTab, isTrayCollapsed]);

  return (
    <div className="flex flex-col w-full bg-white dark:bg-[#090d16] border-b border-slate-200 dark:border-slate-800 shadow-xs z-30 transition-all select-none">
      {/* Level 1: Studio Top Header with Document Menu, Title, Undo/Redo, Stats & Zoom */}
      <StudioHeader />

      {/* Level 2: Modern Studio Navigation Tab Bar */}
      <StudioTabBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (activeTab === tab && !isTrayCollapsed) {
            // Clicking active tab toggles tray collapse (like modern apps)
            setIsTrayCollapsed(true);
          } else {
            setIsTrayCollapsed(false);
            onTabChange(tab);
          }
        }}
        isTrayCollapsed={isTrayCollapsed}
        onToggleCollapse={() => setIsTrayCollapsed(prev => !prev)}
      />

      {/* Level 3: Studio Command Tool Tray (compact, horizontal, anti-ribbon) */}
      {!isTrayCollapsed && (
        <div className="h-10 md:h-11 flex items-center bg-slate-50/70 dark:bg-[#0c1322]/80 border-t border-slate-100 dark:border-slate-800/60 overflow-hidden">
          {trayContent}
        </div>
      )}
    </div>
  );
};
