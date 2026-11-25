
import React from 'react';
import { TableOfContents } from 'lucide-react';
import { DropdownRibbonButton } from '../common/ReferencesTools';
import { MenuPortal } from '../../../common/MenuPortal';
import { useReferencesTab } from '../ReferencesTabContext';
import { useEditor } from '../../../../../contexts/EditorContext';
import { globalTocEngine } from '../../../../../utils/tocEngine';

export const TableOfContentsTool: React.FC = () => {
  const { activeMenu, menuPos, triggerElement, closeMenu } = useReferencesTab();
  const { executeCommand, content, setContent, showToast } = useEditor();
  const menuId = 'toc';

  const generateTOC = () => {
      const items = globalTocEngine.scanHeadings(content);
      
      if (items.length === 0) {
          showToast('No headings (Heading 1/2/3) found to generate Table of Contents.', 'warning');
          closeMenu();
          return;
      }

      // Generate the enterprise-grade TOC HTML
      const tocHtml = globalTocEngine.generateTocHtml(items);

      // Insert
      executeCommand('insertHTML', tocHtml + '<p><br/></p>');
      closeMenu();
  };

  const removeTOC = () => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = content || '';
      const tocNodes = wrapper.querySelectorAll('.toc-container, .prodoc-toc, [data-toc], [data-type="toc"]');
      if (tocNodes.length === 0) {
          showToast('No Table of Contents found in document.', 'info');
      } else {
          tocNodes.forEach(node => node.remove());
          setContent(wrapper.innerHTML, true, { historyMode: 'immediate' });
          showToast('Table of Contents removed.', 'success');
      }
      closeMenu();
  };

  return (
    <>
        <DropdownRibbonButton 
            id={menuId} 
            icon={TableOfContents} 
            label="Table of Contents" 
        />
        <MenuPortal id={menuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={240}>
             <div className="p-2">
                 <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Automatic</div>
                 <button onClick={generateTOC} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200 mb-1 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all">
                     <div className="font-bold text-slate-800 dark:text-slate-100 mb-1">Automatic Table 1</div>
                     <div className="space-y-1 opacity-60">
                         <div className="h-1 bg-slate-400 w-3/4 rounded-full"></div>
                         <div className="h-1 bg-slate-300 dark:bg-slate-600 w-1/2 rounded-full ml-2"></div>
                         <div className="h-1 bg-slate-300 dark:bg-slate-600 w-1/2 rounded-full ml-2"></div>
                     </div>
                 </button>
                 <button onClick={generateTOC} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all">
                     <div className="font-bold text-slate-800 dark:text-slate-100 mb-1">Automatic Table 2</div>
                     <div className="space-y-1 opacity-60">
                         <div className="h-1 bg-slate-400 w-2/3 rounded-full"></div>
                         <div className="h-1 bg-slate-300 dark:bg-slate-600 w-1/2 rounded-full ml-2"></div>
                     </div>
                 </button>
                 <div className="border-t border-slate-100 dark:border-slate-700 my-2"></div>
                 <button onClick={removeTOC} className="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md text-xs text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">Remove Table of Contents</button>
             </div>
        </MenuPortal>
    </>
  );
};
