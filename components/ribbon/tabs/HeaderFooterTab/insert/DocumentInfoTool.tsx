
import React from 'react';
import { FileText, User, File } from 'lucide-react';
import { DropdownButton } from '../../InsertTab/common/InsertTools';
import { MenuPortal } from '../../../common/MenuPortal';
import { useInsertTab } from '../../InsertTab/InsertTabContext';
import { useEditor } from '../../../../../../contexts/EditorContext';

export const DocumentInfoTool: React.FC = () => {
  const { executeCommand, documentTitle } = useEditor();
  const { activeMenu, menuPos, closeMenu } = useInsertTab();
  const menuId = 'doc_info';

  const insert = (text: string) => {
      executeCommand('insertText', text);
      closeMenu();
  };

  return (
    <>
         <DropdownButton 
             id={menuId} 
             icon={FileText} 
             label="Document Info" 
         />
         <MenuPortal id={menuId} activeMenu={activeMenu} menuPos={menuPos} closeMenu={closeMenu} width={180}>
             <div className="p-1">
                 <button onClick={() => insert('Author Name')} className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md text-xs font-medium text-slate-700 flex items-center gap-2">
                    <User size={14} className="text-slate-400"/> Author
                 </button>
                 <button onClick={() => insert(documentTitle)} className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md text-xs font-medium text-slate-700 flex items-center gap-2">
                    <File size={14} className="text-slate-400"/> File Name
                 </button>
                 <button onClick={() => insert(`/users/docs/${documentTitle}.html`)} className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md text-xs font-medium text-slate-700 flex items-center gap-2">
                    <FileText size={14} className="text-slate-400"/> File Path
                 </button>
                 <button onClick={() => insert(documentTitle)} className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-md text-xs font-medium text-slate-700 flex items-center gap-2">
                    <FileText size={14} className="text-slate-400"/> Document Title
                 </button>
             </div>
         </MenuPortal>
    </>
  );
};
