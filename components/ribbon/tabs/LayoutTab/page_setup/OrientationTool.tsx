
import React from 'react';
import { RotateCw, FileText, Check } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useLayoutTab } from '../LayoutTabContext';
import { DropdownButton } from '../common/LayoutTools';
import { MenuPortal } from '../../../common/MenuPortal';

export const OrientationTool: React.FC = () => {
  const { pageConfig, setPageConfig } = useEditor();
  const { activeMenu, menuPos, closeMenu } = useLayoutTab();
  const menuId = 'orientation';

  const handleOrientationChange = (orientation: any) => {
      setPageConfig(prev => ({ ...prev, orientation }));
      closeMenu();
  };

  const isPortrait = pageConfig.orientation === 'portrait';
  const isLandscape = pageConfig.orientation === 'landscape';

  return (
    <>
         <DropdownButton 
             id={menuId} 
             icon={RotateCw} 
             label="Orientation" 
             iconClassName="text-cyan-600 dark:text-cyan-500"
         />
         <MenuPortal id={menuId} activeMenu={activeMenu} menuPos={menuPos} closeMenu={closeMenu} width={180} title="Page Orientation">
             <div className="p-1.5 space-y-1">
                 <button 
                   onClick={() => handleOrientationChange('portrait')} 
                   className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold group transition-all active:scale-[0.99] ${
                     isPortrait 
                       ? 'bg-indigo-50/90 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-500/30 border border-indigo-200 dark:border-indigo-800 shadow-xs' 
                       : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                   }`}
                 >
                     <div className="flex items-center gap-2.5">
                       <FileText size={16} className={isPortrait ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-indigo-500'} />
                       <span>Portrait</span>
                     </div>
                     {isPortrait && (
                       <div className="w-5 h-5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs animate-in zoom-in-75">
                         <Check size={12} strokeWidth={3} />
                       </div>
                     )}
                 </button>
                 <button 
                   onClick={() => handleOrientationChange('landscape')} 
                   className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold group transition-all active:scale-[0.99] ${
                     isLandscape 
                       ? 'bg-indigo-50/90 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-500/30 border border-indigo-200 dark:border-indigo-800 shadow-xs' 
                       : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                   }`}
                 >
                     <div className="flex items-center gap-2.5">
                       <FileText size={16} className={`rotate-90 ${isLandscape ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-indigo-500'}`} />
                       <span>Landscape</span>
                     </div>
                     {isLandscape && (
                       <div className="w-5 h-5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs animate-in zoom-in-75">
                         <Check size={12} strokeWidth={3} />
                       </div>
                     )}
                 </button>
             </div>
         </MenuPortal>
    </>
  );
};

