
import React from 'react';
import { ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { FormattingCard } from '../common/DesignTools';

export const StyleGalleryTool: React.FC = () => {
  const { executeCommand } = useEditor();

  const applyTheme = (fontHead: string, fontBody: string) => {
      executeCommand('fontName', fontBody);
      // Mock theme application
  };

  return (
     <div className="flex items-center gap-1 h-full px-1 border-x border-slate-200 mx-1 bg-slate-50/50 rounded overflow-hidden">
         <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-[300px] px-1 py-1">
            <FormattingCard title="Basic" fontHead="Inter" fontBody="Inter" color="#1e293b" onClick={() => applyTheme('Inter', 'Inter')} />
            <FormattingCard title="Modern" fontHead="Roboto" fontBody="Roboto" color="#3b82f6" onClick={() => applyTheme('Roboto', 'Roboto')} />
            <FormattingCard title="Elegant" fontHead="Merriweather" fontBody="Open Sans" color="#7e22ce" onClick={() => applyTheme('Merriweather', 'Open Sans')} />
            <FormattingCard title="Formal" fontHead="Playfair Display" fontBody="Lora" color="#0f172a" onClick={() => applyTheme('Playfair Display', 'Lora')} />
            <FormattingCard title="Draft" fontHead="Courier New" fontBody="Courier New" color="#475569" onClick={() => applyTheme('Courier New', 'Courier New')} />
            
            <FormattingCard title="Simple" fontHead="Nunito" fontBody="Nunito" color="#64748b" onClick={() => applyTheme('Nunito', 'Nunito')} />
            <FormattingCard title="Distinct" fontHead="Oswald" fontBody="Lato" color="#0d9488" onClick={() => applyTheme('Oswald', 'Lato')} />
            <FormattingCard title="Traditional" fontHead="PT Serif" fontBody="PT Sans" color="#78350f" onClick={() => applyTheme('PT Serif', 'PT Sans')} />
            <FormattingCard title="Strong" fontHead="Montserrat" fontBody="Open Sans" color="#111827" onClick={() => applyTheme('Montserrat', 'Open Sans')} />
            <FormattingCard title="News" fontHead="Playfair Display" fontBody="Roboto" color="#dc2626" onClick={() => applyTheme('Playfair Display', 'Roboto')} />
         </div>
         <div className="flex flex-col h-full justify-center border-l border-slate-200 pl-1">
             <button className="p-0.5 hover:bg-slate-200 rounded text-slate-500"><ArrowUp size={10} /></button>
             <button className="p-0.5 hover:bg-slate-200 rounded text-slate-500"><ArrowDown size={10} /></button>
             <button 
                className="p-0.5 hover:bg-slate-200 rounded text-slate-500"
                title="More Styles"
                onClick={() => alert("Show full gallery")}
             >
                 <ChevronDown size={10} />
             </button>
         </div>
     </div>
  );
};
