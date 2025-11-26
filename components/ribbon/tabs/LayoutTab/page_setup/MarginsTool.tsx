
import React, { useState, Suspense } from 'react';
import { LayoutTemplate, Columns, ArrowLeftRight, MoveVertical, ArrowRightLeft, Monitor } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useLayoutTab } from '../LayoutTabContext';
import { DropdownButton } from '../common/LayoutTools';
import { MenuPortal } from '../../../common/MenuPortal';
import { MARGIN_PRESETS } from '../../../../../constants';
import { MarginPreset, PageConfig } from '../../../../../types';

const PageSetupDialog = React.lazy(() => import('../../../../PageSetupDialog').then(m => ({ default: m.PageSetupDialog })));

export const MarginsTool: React.FC = () => {
  const { setPageConfig, pageConfig } = useEditor();
  const { activeMenu, menuPos, closeMenu } = useLayoutTab();
  const [showCustomDialog, setShowCustomDialog] = useState(false);
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
      setShowCustomDialog(true);
  };

  const handleCustomSave = (newConfig: PageConfig) => {
      setPageConfig(newConfig);
      setShowCustomDialog(false);
  };

  const isPresetActive = (preset: string) => pageConfig.marginPreset === preset;

  return (
    <>
         <DropdownButton 
             id={menuId} 
             icon={LayoutTemplate} 
             label="Margins" 
         />
         <MenuPortal id={menuId} activeMenu={activeMenu} menuPos={menuPos} closeMenu={closeMenu} width={260}>
             <div className="p-1 space-y-0.5">
                 <button 
                    onClick={() => handleMarginChange('normal')} 
                    className={`w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md flex items-center gap-3 group ${isPresetActive('normal') ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : ''}`}
                 >
                     <div className={`p-1 border rounded bg-white ${isPresetActive('normal') ? 'border-blue-400' : 'border-slate-300'}`}>
                        <LayoutTemplate size={16} className="text-slate-400"/>
                     </div>
                     <div>
                        <div className="text-xs font-medium text-slate-700">Normal</div>
                        <div className="text-[10px] text-slate-500">Top 1" Bottom 1" Left 1" Right 1"</div>
                     </div>
                 </button>

                 <button 
                    onClick={() => handleMarginChange('narrow')} 
                    className={`w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md flex items-center gap-3 group ${isPresetActive('narrow') ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : ''}`}
                 >
                     <div className={`p-1 border rounded bg-white ${isPresetActive('narrow') ? 'border-blue-400' : 'border-slate-300'}`}>
                        <Columns size={16} className="text-slate-400"/>
                     </div>
                     <div>
                        <div className="text-xs font-medium text-slate-700">Narrow</div>
                        <div className="text-[10px] text-slate-500">Top 0.5" Bottom 0.5" Left 0.5" Right 0.5"</div>
                     </div>
                 </button>

                 <button 
                    onClick={() => handleMarginChange('moderate')} 
                    className={`w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md flex items-center gap-3 group ${isPresetActive('moderate') ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : ''}`}
                 >
                     <div className={`p-1 border rounded bg-white ${isPresetActive('moderate') ? 'border-blue-400' : 'border-slate-300'}`}>
                        <MoveVertical size={16} className="text-slate-400"/>
                     </div>
                     <div>
                        <div className="text-xs font-medium text-slate-700">Moderate</div>
                        <div className="text-[10px] text-slate-500">Top 1" Bottom 1" Left 0.75" Right 0.75"</div>
                     </div>
                 </button>

                 <button 
                    onClick={() => handleMarginChange('wide')} 
                    className={`w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md flex items-center gap-3 group ${isPresetActive('wide') ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : ''}`}
                 >
                     <div className={`p-1 border rounded bg-white ${isPresetActive('wide') ? 'border-blue-400' : 'border-slate-300'}`}>
                        <ArrowLeftRight size={16} className="text-slate-400"/>
                     </div>
                     <div>
                        <div className="text-xs font-medium text-slate-700">Wide</div>
                        <div className="text-[10px] text-slate-500">Top 1" Bottom 1" Left 2" Right 2"</div>
                     </div>
                 </button>

                 <button 
                    onClick={() => handleMarginChange('mirrored')} 
                    className={`w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md flex items-center gap-3 group ${isPresetActive('mirrored') ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : ''}`}
                 >
                     <div className={`p-1 border rounded bg-white ${isPresetActive('mirrored') ? 'border-blue-400' : 'border-slate-300'}`}>
                        <ArrowRightLeft size={16} className="text-slate-400"/>
                     </div>
                     <div>
                        <div className="text-xs font-medium text-slate-700">Mirrored</div>
                        <div className="text-[10px] text-slate-500">Top 1" Bottom 1" Inside 1.25" Outside 1"</div>
                     </div>
                 </button>

                 <button 
                    onClick={() => handleMarginChange('office2003')} 
                    className={`w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md flex items-center gap-3 group ${isPresetActive('office2003') ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : ''}`}
                 >
                     <div className={`p-1 border rounded bg-white ${isPresetActive('office2003') ? 'border-blue-400' : 'border-slate-300'}`}>
                        <Monitor size={16} className="text-slate-400"/>
                     </div>
                     <div>
                        <div className="text-xs font-medium text-slate-700">Office 2003 Default</div>
                        <div className="text-[10px] text-slate-500">Top 1" Bottom 1" Left 1.25" Right 1.25"</div>
                     </div>
                 </button>

             </div>
             <div className="border-t border-slate-100 mt-1 pt-1 p-1">
                 <button 
                    className="w-full text-left px-3 py-2 hover:bg-slate-100 text-xs font-medium text-slate-700 rounded-md" 
                    onClick={openCustomDialog}
                 >
                    Custom Margins...
                 </button>
             </div>
         </MenuPortal>

         {showCustomDialog && (
             <Suspense fallback={null}>
                <PageSetupDialog 
                    isOpen={showCustomDialog}
                    onClose={() => setShowCustomDialog(false)}
                    config={pageConfig}
                    onSave={handleCustomSave}
                />
             </Suspense>
         )}
    </>
  );
};
