
import React, { useState, Suspense, useMemo } from 'react';
import { LayoutTemplate, Columns, ArrowLeftRight, MoveVertical, ArrowRightLeft, Monitor, Settings2, Check } from 'lucide-react';
import { useEditor } from '../../../../../../contexts/EditorContext';
import { useLayoutTab } from '../../LayoutTabContext';
import { DropdownButton } from '../../common/LayoutTools';
import { MenuPortal } from '../../../../common/MenuPortal';
import { MARGIN_PRESETS } from '../../../../../../constants';
import { MarginPreset, MarginValues } from '../../../../../../types';

export const MarginsTool: React.FC = () => {
  const { setPageConfig, pageConfig, setShowPageSetup } = useEditor();
  const { activeMenu, menuPos, closeMenu } = useLayoutTab();
  const menuId = 'margins';

  const handleMarginChange = (preset: MarginPreset) => {
      if (preset !== 'custom') {
          const isMirrored = preset === 'mirrored';
          setPageConfig(prev => ({ 
              ...prev, 
              marginPreset: preset,
              margins: MARGIN_PRESETS[preset as string],
              mirrorMargins: isMirrored
          }));
      }
      closeMenu();
  };

  const openCustomDialog = () => {
      closeMenu();
      setShowPageSetup(true);
  };

  const formatLabel = (key: string) => {
      if (key === 'classic') return 'Classic Default';
      if (key === 'apa') return 'APA';
      if (key === 'mla') return 'MLA';
      if (key === 'chicago') return 'Chicago';
      
      const result = key.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const marginOptions = useMemo(() => (Object.entries(MARGIN_PRESETS) as [string, MarginValues][]).map(([key, val]) => {
      let icon = LayoutTemplate;
      let colorClass = "text-slate-400";
      
      if (key === 'normal') { colorClass = "text-blue-500"; }
      if (key === 'narrow') { icon = Columns; colorClass = "text-emerald-500"; }
      if (key === 'moderate') { icon = MoveVertical; colorClass = "text-orange-500"; }
      if (key === 'wide') { icon = ArrowLeftRight; colorClass = "text-purple-500"; }
      if (key === 'mirrored') { icon = ArrowRightLeft; colorClass = "text-indigo-500"; }
      if (key === 'classic') { icon = Monitor; colorClass = "text-sky-500"; }

      return {
        id: key,
        label: formatLabel(key),
        desc: `Top ${val.top}" Bottom ${val.bottom}" Left ${val.left}" Right ${val.right}"`,
        icon,
        colorClass
      };
  }), []);

  return (
    <>
         <DropdownButton 
             id={menuId} 
             icon={LayoutTemplate} 
             label="Margins" 
             iconClassName="text-cyan-600 dark:text-cyan-500"
         />
         <MenuPortal id={menuId} activeMenu={activeMenu} menuPos={menuPos} closeMenu={closeMenu} width={280} title="Margin Presets">
             <div className="p-1 space-y-1 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                 {marginOptions.map((option) => {
                     const isSelected = pageConfig.marginPreset === option.id;
                     return (
                         <button 
                            key={option.id}
                            onClick={() => handleMarginChange(option.id as MarginPreset)}
                            onMouseDown={(e) => e.preventDefault()}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-3 group transition-all active:scale-[0.99] ${
                              isSelected 
                                ? 'bg-indigo-50/90 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-500/30 border border-indigo-200 dark:border-indigo-800 shadow-xs' 
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                            }`}
                         >
                             <option.icon size={18} className={`flex-shrink-0 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : option.colorClass}`} strokeWidth={1.75} />
                             <div className="flex-1 min-w-0">
                                <div className={`text-xs font-semibold truncate ${isSelected ? 'text-indigo-950 dark:text-indigo-100' : 'text-slate-800 dark:text-slate-200'}`}>{option.label}</div>
                                <div className={`text-[10px] truncate ${isSelected ? 'text-indigo-600/80 dark:text-indigo-300/80' : 'text-slate-400 dark:text-slate-500'}`}>{option.desc}</div>
                             </div>
                             {isSelected && (
                                 <div className="w-5 h-5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs ml-2 animate-in zoom-in-75">
                                   <Check size={12} strokeWidth={3} />
                                 </div>
                             )}
                         </button>
                     );
                 })}
                 
                 <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                 
                 <button 
                    className="w-full text-left px-3.5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-xl flex items-center gap-3 group transition-all active:scale-[0.99]" 
                    onClick={openCustomDialog}
                    onMouseDown={(e) => e.preventDefault()}
                 >
                    <Settings2 size={18} className="text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" strokeWidth={1.75} />
                    <span>Custom Margins...</span>
                 </button>
             </div>
         </MenuPortal>
    </>
  );
};
