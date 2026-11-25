
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useDesignTab } from '../DesignTabContext';
import { useEditor } from '../../../../../contexts/EditorContext';
import { DropdownRibbonButton } from '../common/DesignTools';
import { MenuPortal } from '../../../common/MenuPortal';

export const ParagraphSpacingTool: React.FC = () => {
  const { activeMenu, menuPos, triggerElement, closeMenu } = useDesignTab();
  const { applyBlockStyle } = useEditor();
  const menuId = 'para_spacing';

  const applyPreset = (marginBottom: string, lineHeight: string) => {
    applyBlockStyle({ marginTop: '0pt', marginBottom, lineHeight });
    closeMenu();
  };

  return (
    <>
        <DropdownRibbonButton 
            id={menuId} 
            icon={ArrowDown} 
            label="Paragraph Spacing" 
        />
        <MenuPortal id={menuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={180}>
             <div className="p-1">
                 <button onClick={() => applyPreset('8pt', '1.15')} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200">Default</button>
                 <button onClick={() => applyPreset('0pt', '1.0')} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200">No Paragraph Space</button>
                 <button onClick={() => applyPreset('4pt', '1.0')} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200">Compact</button>
                 <button onClick={() => applyPreset('6pt', '1.15')} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200">Tight</button>
                 <button onClick={() => applyPreset('10pt', '1.15')} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200">Open</button>
                 <button onClick={() => applyPreset('12pt', '1.5')} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200">Relaxed</button>
                 <button onClick={() => applyPreset('8pt', '2.0')} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200">Double</button>
             </div>
        </MenuPortal>
    </>
  );
};
