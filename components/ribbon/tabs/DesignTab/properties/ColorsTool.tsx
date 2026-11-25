
import React from 'react';
import { Palette } from 'lucide-react';
import { useDesignTab } from '../DesignTabContext';
import { useEditor } from '../../../../../contexts/EditorContext';
import { DropdownRibbonButton } from '../common/DesignTools';
import { MenuPortal } from '../../../common/MenuPortal';

const PALETTES = [
  { name: 'Standard', gradient: 'from-blue-500 to-cyan-400', accent: '#2563eb' },
  { name: 'Grayscale', gradient: 'from-slate-500 to-slate-700', accent: '#334155' },
  { name: 'Blue Warm', gradient: 'from-sky-500 to-indigo-500', accent: '#0284c7' },
  { name: 'Blue Green', gradient: 'from-teal-500 to-emerald-500', accent: '#0d9488' },
  { name: 'Violet II', gradient: 'from-violet-500 to-purple-600', accent: '#7c3aed' },
  { name: 'Red Orange', gradient: 'from-orange-500 to-red-500', accent: '#ea580c' },
];

export const ColorsTool: React.FC = () => {
  const { activeMenu, menuPos, triggerElement, closeMenu } = useDesignTab();
  const { applyAdvancedStyle, showToast } = useEditor();
  const menuId = 'theme_colors';

  return (
    <>
        <DropdownRibbonButton 
            id={menuId} 
            icon={Palette} 
            label="Colors" 
        />
        <MenuPortal id={menuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={180}>
             <div className="p-1">
                 {PALETTES.map((c) => (
                     <button
                       key={c.name}
                       onClick={() => {
                         applyAdvancedStyle({ color: c.accent });
                         showToast(`Applied "${c.name}" accent palette.`, 'success');
                         closeMenu();
                       }}
                       className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2"
                     >
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${c.gradient}`}></div> {c.name}
                     </button>
                 ))}
             </div>
        </MenuPortal>
    </>
  );
};
