import React from 'react';
import { Type } from 'lucide-react';
import { DropdownRibbonButton } from '../common/DesignTools';
import { useDesignTab } from '../DesignTabContext';
import { useEditor } from '../../../../../contexts/EditorContext';
import { MenuPortal } from '../../../common/MenuPortal';

const FONT_THEMES = [
  { name: 'Office', heading: 'Calibri', body: 'Calibri' },
  { name: 'Office Classic', heading: 'Arial', body: 'Times New Roman' },
  { name: 'Modern Sans', heading: 'Inter', body: 'Inter' },
  { name: 'Editorial Serif', heading: 'Merriweather', body: 'Georgia' },
  { name: 'Technical', heading: 'Roboto', body: 'Consolas' },
  { name: 'Clean Web', heading: 'Verdana', body: 'Tahoma' },
];

export const FontsTool: React.FC = () => {
  const { activeMenu, menuPos, triggerElement, closeMenu } = useDesignTab();
  const { executeCommand, showToast } = useEditor();
  const menuId = 'theme_fonts';

  const applyFontTheme = (theme: { name: string; heading: string; body: string }) => {
    executeCommand('fontName', theme.body);
    showToast(`Applied font set "${theme.name}" (${theme.heading} / ${theme.body}).`, 'success');
    closeMenu();
  };

  return (
    <>
      <DropdownRibbonButton 
          id={menuId} 
          icon={Type} 
          label="Fonts" 
      />
      <MenuPortal id={menuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={220}>
        <div className="p-2 space-y-1 max-h-[62dvh] overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 pb-1">Theme Font Sets</div>
          {FONT_THEMES.map((theme) => (
            <button
              key={theme.name}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyFontTheme(theme)}
              className="w-full text-left px-2.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-md transition-colors"
            >
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">{theme.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 flex gap-2 mt-0.5">
                <span style={{ fontFamily: theme.heading }}>{theme.heading}</span>
                <span>/</span>
                <span style={{ fontFamily: theme.body }}>{theme.body}</span>
              </div>
            </button>
          ))}
        </div>
      </MenuPortal>
    </>
  );
};
