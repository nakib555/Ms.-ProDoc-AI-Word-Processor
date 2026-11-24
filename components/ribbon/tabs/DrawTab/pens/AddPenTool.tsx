import React from 'react';
import { Plus } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';

export const AddPenTool: React.FC = () => {
  const { showToast } = useEditor();
  return (
    <div className="h-full flex items-center pl-2">
         <button 
            className="flex flex-col items-center justify-center w-8 h-8 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-full border border-slate-200 hover:border-blue-300 transition-colors shadow-sm"
            title="Add Pen"
            onClick={() => showToast('Select a pen, highlighter, or color preset from the pens tray.', 'info')}
         >
             <Plus size={16} />
         </button>
    </div>
  );
};