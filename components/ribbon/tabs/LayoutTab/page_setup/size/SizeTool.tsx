
import React, { useState, Suspense } from 'react';
import { FileText, Mail, StickyNote, File, Files, Check } from 'lucide-react';
import { useEditor } from '../../../../../../contexts/EditorContext';
import { useLayoutTab } from '../../LayoutTabContext';
import { DropdownButton } from '../../common/LayoutTools';
import { MenuPortal } from '../../../../common/MenuPortal';
import { PageSize, PageConfig } from '../../../../../../types';
import { PAPER_FORMATS } from '../../../../../../constants';

export const SizeTool: React.FC = () => {
  const { pageConfig, setPageConfig, setShowPageSetup } = useEditor();
  const { activeMenu, menuPos, closeMenu } = useLayoutTab();
  const menuId = 'size';

  const handleSizeChange = (size: PageSize) => {
      setPageConfig(prev => ({ ...prev, size }));
      closeMenu();
  };

  const getIcon = (id: string) => {
      if (id.includes('Envelope')) return Mail;
      if (id === 'Statement' || id === 'Note') return StickyNote;
      if (id === 'A3' || id === 'Tabloid') return Files;
      if (['A4', 'A5', 'B4 (JIS)', 'B5 (JIS)'].includes(id)) return File;
      return FileText;
  };

  const getColor = (id: string) => {
      if (id.includes('Envelope')) return "text-orange-500";
      if (id === 'Statement' || id === 'Note') return "text-yellow-500";
      if (id === 'A3' || id === 'Tabloid') return "text-purple-500";
      return "text-blue-500";
  };

  return (
    <>
         <DropdownButton 
             id={menuId} 
             icon={FileText} 
             label="Size" 
             iconClassName="text-cyan-600 dark:text-cyan-500"
         />
         <MenuPortal id={menuId} activeMenu={activeMenu} menuPos={menuPos} closeMenu={closeMenu} width={280} title="Paper Size">
             <div 
                className="p-1 space-y-1 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 overscroll-contain"
             >
                 {PAPER_FORMATS.map((item) => {
                     const Icon = getIcon(item.id);
                     const iconColor = getColor(item.id);
                     const isSelected = pageConfig.size === item.id;
                     return (
                         <button 
                            key={item.id} 
                            onClick={() => handleSizeChange(item.id as PageSize)}
                            onMouseDown={(e) => e.preventDefault()}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-3 group transition-all active:scale-[0.99] ${
                              isSelected 
                                ? 'bg-indigo-50/90 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-500/30 border border-indigo-200 dark:border-indigo-800 shadow-xs' 
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                            }`}
                         >
                             <Icon size={18} className={`flex-shrink-0 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : `text-slate-400 group-hover:${iconColor}`}`} strokeWidth={1.75} />
                             <div className="flex-1 min-w-0">
                                 <div className={`font-semibold text-xs truncate ${isSelected ? 'text-indigo-950 dark:text-indigo-100' : 'text-slate-800 dark:text-slate-200'}`}>{item.label}</div>
                                 <div className={`text-[10px] ${isSelected ? 'text-indigo-600/80 dark:text-indigo-300/80' : 'text-slate-400 dark:text-slate-500'}`}>{item.width} x {item.height}</div>
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
                    className="w-full text-left px-3.5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-xl transition-all active:scale-[0.99]"
                    onClick={() => { closeMenu(); setShowPageSetup(true); }}
                    onMouseDown={(e) => e.preventDefault()}
                 >
                    More Paper Sizes...
                 </button>
             </div>
         </MenuPortal>
    </>
  );
};
