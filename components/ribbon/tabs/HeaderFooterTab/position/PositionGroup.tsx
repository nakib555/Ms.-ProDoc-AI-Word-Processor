
import React from 'react';
import { PanelTop, PanelBottom, ArrowRightToLine, ChevronUp, ChevronDown } from 'lucide-react';
import { RibbonSection } from '../../../common/RibbonSection';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../../contexts/EditorContext';

const PositionInput: React.FC<{ label: string; value: number; onChange: (val: number) => void; icon: any }> = ({ label, value, onChange, icon: Icon }) => (
    <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 w-[110px] justify-end">
            <Icon size={14} className="text-slate-400"/>
            <span className="text-[10px] text-slate-600 font-medium truncate">{label}:</span>
        </div>
        <div className="flex items-center bg-white border border-slate-300 rounded-sm w-16 h-6 hover:border-blue-400 focus-within:border-blue-500 transition-colors relative group">
            <input 
                type="number" 
                step="0.1" 
                value={value} 
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-full text-xs px-1.5 outline-none text-slate-700 bg-transparent"
            />
            <div className="flex flex-col border-l border-slate-200 w-4 h-full absolute right-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onChange(Number((value + 0.1).toFixed(1)))} className="flex-1 flex items-center justify-center hover:bg-blue-100 text-slate-500 hover:text-blue-600 transition-colors border-b border-slate-200">
                    <ChevronUp size={6} strokeWidth={3} />
                </button>
                <button onClick={() => onChange(Number((Math.max(0, value - 0.1)).toFixed(1)))} className="flex-1 flex items-center justify-center hover:bg-blue-100 text-slate-500 hover:text-blue-600 transition-colors">
                    <ChevronDown size={6} strokeWidth={3} />
                </button>
            </div>
            <span className="absolute right-5 text-[10px] text-slate-400 pointer-events-none">"</span>
        </div>
    </div>
);

export const PositionGroup: React.FC = () => {
  const { pageConfig, setPageConfig } = useEditor();

  return (
    <RibbonSection title="Position">
        <div className="flex h-full gap-2 items-center px-1">
            <div className="flex flex-col gap-1 justify-center h-full">
                <PositionInput 
                    label="Header from Top" 
                    value={pageConfig.headerDistance || 0.5} 
                    onChange={(v) => setPageConfig(prev => ({...prev, headerDistance: v}))}
                    icon={PanelTop}
                />
                <PositionInput 
                    label="Footer from Bottom" 
                    value={pageConfig.footerDistance || 0.5} 
                    onChange={(v) => setPageConfig(prev => ({...prev, footerDistance: v}))}
                    icon={PanelBottom}
                />
            </div>
            <div className="h-full border-l border-slate-200 mx-1"></div>
            <RibbonButton 
                icon={ArrowRightToLine} 
                label="Insert Alignment Tab" 
                onClick={() => {}} 
                className="w-16"
            />
        </div>
    </RibbonSection>
  );
};
