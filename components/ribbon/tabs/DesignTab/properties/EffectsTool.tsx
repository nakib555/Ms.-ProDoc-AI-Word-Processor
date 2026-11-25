import React from 'react';
import { Paintbrush } from 'lucide-react';
import { DropdownRibbonButton } from '../common/DesignTools';
import { useDesignTab } from '../DesignTabContext';
import { useEditor } from '../../../../../contexts/EditorContext';
import { MenuPortal } from '../../../common/MenuPortal';

const EFFECT_PRESETS = [
  { name: 'Office', desc: 'Clean crisp lines', style: { textShadow: 'none', borderRadius: '0px' } },
  { name: 'Subtle Shadow', desc: 'Soft elevation', style: { textShadow: '0 1px 2px rgba(15, 23, 42, 0.15)' } },
  { name: 'Editorial Contrast', desc: 'Sharp dark emphasis', style: { letterSpacing: '0.01em', textShadow: 'none' } },
  { name: 'Soft Glow', desc: 'Subtle blue aura', style: { textShadow: '0 0 8px rgba(59, 130, 246, 0.25)' } },
  { name: 'Reset Effects', desc: 'Clear custom effects', style: { textShadow: 'none', letterSpacing: 'normal' } },
];

export const EffectsTool: React.FC = () => {
  const { activeMenu, menuPos, triggerElement, closeMenu } = useDesignTab();
  const { applyAdvancedStyle, showToast } = useEditor();
  const menuId = 'theme_effects';

  const applyEffect = (preset: typeof EFFECT_PRESETS[number]) => {
    applyAdvancedStyle(preset.style as React.CSSProperties);
    showToast(`Applied "${preset.name}" effect preset.`, 'success');
    closeMenu();
  };

  return (
    <>
      <DropdownRibbonButton 
          id={menuId} 
          icon={Paintbrush} 
          label="Effects" 
      />
      <MenuPortal id={menuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={210}>
        <div className="p-2 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 pb-1">Theme Effects</div>
          {EFFECT_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyEffect(preset)}
              className="w-full text-left px-2.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-md transition-colors"
            >
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">{preset.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{preset.desc}</div>
            </button>
          ))}
        </div>
      </MenuPortal>
    </>
  );
};
