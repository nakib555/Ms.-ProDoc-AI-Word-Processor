
import React from 'react';
import { TableOfContents } from 'lucide-react';
import { DropdownRibbonButton } from '../common/ReferencesTools';
import { MenuPortal } from '../../../common/MenuPortal';
import { useReferencesTab } from '../ReferencesTabContext';
import { useEditor } from '../../../../../contexts/EditorContext';
import { globalTocEngine } from '../../../../../utils/tocEngine';

export const TableOfContentsTool: React.FC = () => {
  const { activeMenu, menuPos, closeMenu } = useReferencesTab();
  const { executeCommand, content } = useEditor();
  const menuId = 'toc';

  const generateTOC = () => {
      const items = globalTocEngine.scanHeadings(content);
      
      if (items.length === 0) {
          alert("No headings found to generate Table of Contents.");
          closeMenu();
          return;
      }

      // Generate the enterprise-grade TOC HTML
      const tocHtml = globalTocEngine.generateTocHtml(items);

      // Insert
      executeCommand('insertHTML', tocHtml + '<p><br/></p>');
      closeMenu();
  };

  return (
    <>
        <DropdownRibbonButton 
            id={menuId} 
            icon={TableOfContents} 
            label="Table of Contents" 
        />
        <MenuPortal id={menuId} activeMenu={activeMenu} menuPos={menuPos} closeMenu={closeMenu} width={240}>
             <div className="p-2">
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Automatic</div>
                 <button onClick={generateTOC} className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md text-xs font-medium text-slate-700 mb-1 border border-transparent hover:border-slate-200 transition-all">
                     <div className="font-bold text-slate-800 mb-1">Automatic Table 1</div>
                     <div className="space-y-1 opacity-60">
                         <div className="h-1 bg-slate-400 w-3/4 rounded-full"></div>
                         <div className="h-1 bg-slate-300 w-1/2 rounded-full ml-2"></div>
                         <div className="h-1 bg-slate-300 w-1/2 rounded-full ml-2"></div>
                     </div>
                 </button>
                 <button onClick={generateTOC} className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md text-xs font-medium text-slate-700 border border-transparent hover:border-slate-200 transition-all">
                     <div className="font-bold text-slate-800 mb-1">Automatic Table 2</div>
                     <div className="space-y-1 opacity-60">
                         <div className="h-1 bg-slate-400 w-2/3 rounded-full"></div>
                         <div className="h-1 bg-slate-300 w-1/2 rounded-full ml-2"></div>
                     </div>
                 </button>
                 <div className="border-t border-slate-100 my-2"></div>
                 <button className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md text-xs text-slate-600">Remove Table of Contents</button>
             </div>
        </MenuPortal>
    </>
  );
};
