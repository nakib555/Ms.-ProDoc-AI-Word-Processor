
import React, { useState } from 'react';
import { Table, TableProperties, PenLine } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useInsertTab } from '../InsertTabContext';
import { DropdownButton } from '../common/InsertTools';
import { MenuPortal } from '../../../common/MenuPortal';
import { TableGridPicker } from './TableGridPicker';
import { InsertTableDialog } from './InsertTableDialog';

export const TableTool: React.FC = () => {
  const { executeCommand } = useEditor();
  const { activeMenu, closeMenu, getTriggerElement } = useInsertTab();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTableInsert = (rows: number, cols: number) => {
    if(rows > 0 && cols > 0) {
        closeMenu();
        setTimeout(() => {
            let html = '<table style="width:100%; border-collapse: collapse;"><tbody>';
            for (let i = 0; i < rows; i++) {
                html += '<tr>';
                for (let j = 0; j < cols; j++) {
                    html += '<td style="border: 1px solid #000000; padding: 8px; min-width: 50px;"><br></td>';
                }
                html += '</tr>';
            }
            html += '</tbody></table><p><br></p>';
            executeCommand('insertHTML', html);
        }, 10);
    } else {
        closeMenu();
    }
  };

  return (
    <>
         <DropdownButton 
             id="table_menu" 
             icon={Table} 
             label="Table" 
             iconClassName="text-blue-600"
         />
         <MenuPortal id="table_menu" activeMenu={activeMenu} triggerElement={getTriggerElement("table_menu")} closeMenu={closeMenu} width="auto">
             <TableGridPicker onInsert={handleTableInsert} />
             <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
                 <button className="w-full text-left px-3 py-3 sm:py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm sm:text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 group" onClick={() => { setIsDialogOpen(true); closeMenu(); }}>
                    <TableProperties className="w-4 h-4 sm:w-[14px] sm:h-[14px] text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"/> Insert Table...
                 </button>
                 <button className="w-full text-left px-3 py-3 sm:py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm sm:text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 group" onClick={() => { alert("Draw Table is not supported yet."); closeMenu(); }}>
                    <PenLine className="w-4 h-4 sm:w-[14px] sm:h-[14px] text-slate-500 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400"/> Draw Table
                 </button>
             </div>
         </MenuPortal>
         <InsertTableDialog 
             isOpen={isDialogOpen} 
             onClose={() => setIsDialogOpen(false)} 
             onInsert={handleTableInsert} 
         />
    </>
  );
};
