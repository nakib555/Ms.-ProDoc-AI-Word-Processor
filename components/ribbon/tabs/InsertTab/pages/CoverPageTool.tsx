import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { LayoutTemplate } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useInsertTab } from '../InsertTabContext';
import { DropdownButton } from '../common/InsertTools';
import { MenuPortal } from '../../../common/MenuPortal';

const COVERS: { [key: string]: string } = {
  modern: `
      <div class="cover-page" style="padding: 4rem 2rem; text-align: center; border: 1px solid #e2e8f0; margin-bottom: 2rem; background: linear-gradient(to bottom right, #f8fafc, #e2e8f0); page-break-after: always;">
          <h1 style="font-size: 3.5rem; color: #1e293b; margin-bottom: 0.5rem; font-weight: 800; letter-spacing: -0.025em;">PROJECT PRO</h1>
          <h3 style="font-size: 1.5rem; color: #64748b; margin-bottom: 4rem; font-weight: 300;">Annual Report 2025</h3>
          <div style="height: 6px; background: #3b82f6; width: 100px; margin: 0 auto 4rem; border-radius: 3px;"></div>
          <p style="font-size: 1.2rem; font-weight: 600; color: #0f172a;">Prepared By Author</p>
          <p style="color: #94a3b8;">${new Date().toLocaleDateString()}</p>
      </div><p><br/></p>`,
  creative: `
      <div class="cover-page" style="padding: 4rem; background: #1e293b; color: white; page-break-after: always; margin-bottom: 2rem;">
          <div style="border: 2px solid rgba(255,255,255,0.2); padding: 2rem; height: 100%;">
              <h1 style="font-size: 3rem; font-weight: 700; color: white; margin-bottom: 1rem;">THE BLUEPRINT</h1>
              <p style="font-size: 1.25rem; color: #94a3b8; margin-bottom: 2rem;">Innovative Strategies for Growth</p>
              <div style="margin-top: 6rem; text-align: right;">
                  <p style="font-size: 1.1rem; font-weight: 500;">Studio Design</p>
                  <p style="opacity: 0.7;">May 2025</p>
              </div>
          </div>
      </div><p><br/></p>`,
  minimal: `
      <div class="cover-page" style="padding: 6rem 3rem; text-align: left; page-break-after: always; margin-bottom: 2rem;">
          <h1 style="font-size: 4rem; font-weight: 900; line-height: 1; color: #000; margin-bottom: 1rem;">Document<br/>Title.</h1>
          <p style="font-size: 1.5rem; color: #666; margin-left: 4px;">Subtitle or Description</p>
          <div style="margin-top: 8rem; border-top: 4px solid #000; padding-top: 1rem; display: inline-block; padding-right: 4rem;">
              <strong>Author Name</strong><br/>Organization
          </div>
      </div><p><br/></p>`
};

export const CoverPageTool: React.FC = () => {
  const { setContent, content, showToast } = useEditor();
  const { activeMenu, menuPos, triggerElement, closeMenu } = useInsertTab();
  const [pendingType, setPendingType] = useState<string | null>(null);

  const requestInsertCover = (type: string) => {
    setPendingType(type);
    closeMenu();
  };

  const confirmInsertCover = () => {
    if (pendingType && COVERS[pendingType]) {
      setContent(COVERS[pendingType] + content, true, { historyMode: 'immediate' });
      showToast('Cover page inserted at the start of document.', 'success');
    }
    setPendingType(null);
  };

  return (
    <>
         <DropdownButton 
             id="cover_page" 
             icon={LayoutTemplate} 
             label="Cover Page" 
             variant="small"
             iconClassName="text-indigo-600 dark:text-indigo-400"
         />
         <MenuPortal id="cover_page" activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={220}>
             <div className="px-3 py-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/70 border-b border-slate-100 dark:border-slate-700">Built-in</div>
             <button onClick={() => requestInsertCover('modern')} className="w-full text-left px-3 py-2 hover:bg-blue-50 dark:hover:bg-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center gap-3 group transition-colors">
                 <div className="w-8 h-10 bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-sm group-hover:border-blue-300 transition-colors shadow-sm relative overflow-hidden shrink-0">
                     <div className="h-2 w-full bg-blue-500 absolute top-0"></div>
                 </div>
                 <div>
                     <div className="font-semibold text-blue-900 dark:text-blue-300">Modern</div>
                     <div className="text-[10px] text-slate-400 dark:text-slate-400">Clean and professional</div>
                 </div>
             </button>
             <button onClick={() => requestInsertCover('creative')} className="w-full text-left px-3 py-2 hover:bg-blue-50 dark:hover:bg-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center gap-3 group transition-colors">
                 <div className="w-8 h-10 bg-slate-800 border border-slate-600 rounded-sm group-hover:border-blue-300 shadow-sm relative shrink-0">
                     <div className="w-2 h-2 bg-purple-500 rounded-full absolute bottom-2 right-2"></div>
                 </div>
                 <div>
                     <div className="font-semibold text-purple-900 dark:text-purple-300">Creative</div>
                     <div className="text-[10px] text-slate-400 dark:text-slate-400">Bold and dark</div>
                 </div>
             </button>
             <button onClick={() => requestInsertCover('minimal')} className="w-full text-left px-3 py-2 hover:bg-blue-50 dark:hover:bg-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center gap-3 group transition-colors">
                 <div className="w-8 h-10 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm group-hover:border-blue-300 shadow-sm flex items-center justify-center shrink-0">
                     <div className="w-4 h-[1px] bg-black dark:bg-slate-200"></div>
                 </div>
                 <div>
                     <div className="font-semibold text-slate-900 dark:text-slate-100">Minimal</div>
                     <div className="text-[10px] text-slate-400 dark:text-slate-400">Simple text based</div>
                 </div>
             </button>
         </MenuPortal>

         {pendingType && createPortal(
           <div
             className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in"
             role="dialog"
             aria-modal="true"
             data-modal-backdrop="true"
             onClick={() => setPendingType(null)}
           >
             <div
               className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl p-5 w-80"
               onClick={(e) => e.stopPropagation()}
             >
               <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">Insert Cover Page</h3>
               <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                 Insert the <span className="font-semibold capitalize">{pendingType}</span> cover page at the beginning of the document?
               </p>
               <div className="flex justify-end gap-2">
                 <button type="button" onClick={() => setPendingType(null)} className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                   Cancel
                 </button>
                 <button type="button" onClick={confirmInsertCover} className="px-3 py-1.5 text-xs bg-indigo-600 text-white hover:bg-indigo-700 rounded-md font-medium">
                   Insert
                 </button>
               </div>
             </div>
           </div>,
           document.body
         )}
    </>
  );
};
