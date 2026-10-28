
import React from 'react';
import { Columns, AlignStartVertical, Check } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useLayoutTab } from '../LayoutTabContext';
import { DropdownButton } from '../common/LayoutTools';
import { MenuPortal } from '../../../common/MenuPortal';

export const ColumnsTool: React.FC = () => {
  const { activeMenu, menuPos, closeMenu } = useLayoutTab();
  const { pageConfig, setPageConfig } = useEditor();
  const menuId = 'columns';

  const handleColumnChange = (cols: number) => {
      setPageConfig(prev => ({ ...prev, columns: cols }));
      closeMenu();
  };

  const currentCols = pageConfig?.columns || 1;

  return (
    <>
         <DropdownButton 
             id={menuId} 
             icon={Columns} 
             label="Columns" 
             iconClassName="text-fuchsia-600 dark:text-fuchsia-400"
         />
         <MenuPortal id={menuId} activeMenu={activeMenu} menuPos={menuPos} closeMenu={closeMenu} width={180} title="Columns Layout">
             <div className="p-1.5 space-y-1">
                 {[
                   { count: 1, label: 'One Column' },
                   { count: 2, label: 'Two Columns' },
                   { count: 3, label: 'Three Columns' }
                 ].map(item => {
                   const isSelected = currentCols === item.count;
                   return (
                     <button 
                       key={item.count}
                       onClick={() => handleColumnChange(item.count)} 
                       className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold group transition-all active:scale-[0.99] ${
                         isSelected 
                           ? 'bg-indigo-50/90 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-500/30 border border-indigo-200 dark:border-indigo-800 shadow-xs' 
                           : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                       }`}
                     >
                       <div className="flex items-center gap-2.5">
                         <Columns size={16} className={isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-fuchsia-500'} />
                         <span>{item.label}</span>
                       </div>
                       {isSelected && (
                         <div className="w-5 h-5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs animate-in zoom-in-75">
                           <Check size={12} strokeWidth={3} />
                         </div>
                       )}
                     </button>
                   );
                 })}
             </div>
         </MenuPortal>
    </>
  );
};

