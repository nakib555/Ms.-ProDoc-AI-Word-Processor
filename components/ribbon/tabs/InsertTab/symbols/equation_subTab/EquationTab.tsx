
import React from 'react';
import { RibbonSection } from '../../../../common/RibbonSection';
import { RibbonButton } from '../../../../common/RibbonButton';
import { SmallRibbonButton } from '../../../ViewTab/common/ViewTools';
import { 
  Sigma, Radical, Divide, X, Hash, ArrowRight, Plus, Minus, Equal, 
  Percent, MoreHorizontal, Settings
} from 'lucide-react';
import { useEditor } from '../../../../../../contexts/EditorContext';

export const EquationTab: React.FC = () => {
  const { executeCommand } = useEditor();

  const insertSymbol = (symbol: string) => {
      executeCommand('insertText', symbol);
  };

  const insertStructure = (html: string) => {
      executeCommand('insertHTML', html);
  };

  return (
    <>
      <RibbonSection title="Tools">
          <RibbonButton icon={Sigma} label="Equation" onClick={() => {}} />
          <div className="flex flex-col justify-center gap-0.5 h-full px-1">
             <SmallRibbonButton icon={Settings} label="Professional" onClick={() => {}} />
             <SmallRibbonButton icon={Hash} label="Linear" onClick={() => {}} />
             <SmallRibbonButton icon={MoreHorizontal} label="Normal Text" onClick={() => {}} />
          </div>
      </RibbonSection>

      <RibbonSection title="Conversions">
          <div className="flex flex-col justify-center gap-0.5 h-full px-1 min-w-[100px]">
             <SmallRibbonButton icon={Sigma} label="Unicode" onClick={() => {}} />
             <SmallRibbonButton icon={X} label="LaTeX" onClick={() => {}} />
             <SmallRibbonButton icon={MoreHorizontal} label="Convert" onClick={() => {}} />
          </div>
      </RibbonSection>

      <RibbonSection title="Symbols">
          <div className="grid grid-cols-4 gap-0.5 h-full px-1 overflow-y-auto no-scrollbar max-h-[70px] w-[140px]">
              {['±', '∞', '=', '≠', '≈', '×', '÷', '∝', '<', '>', '≤', '≥', '∑', '∏', '∫', '√'].map(sym => (
                  <button 
                    key={sym} 
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => insertSymbol(sym)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded text-sm font-serif"
                  >
                      {sym}
                  </button>
              ))}
          </div>
          <div className="flex flex-col justify-center border-l border-slate-200 pl-1 ml-1 h-full">
              <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><ArrowRight size={14} className="rotate-90"/></button>
              <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><ArrowRight size={14} className="-rotate-90"/></button>
          </div>
      </RibbonSection>

      <RibbonSection title="Structures">
          <div className="flex items-center gap-1 h-full px-1">
              <RibbonButton icon={Divide} label="Fraction" onClick={() => insertStructure('<sup>x</sup>&frasl;<sub>y</sub>')} hasArrow />
              <RibbonButton icon={X} label="Script" onClick={() => insertStructure('e<sup>x</sup>')} hasArrow />
              <RibbonButton icon={Radical} label="Radical" onClick={() => insertStructure('√x')} hasArrow />
              <RibbonButton icon={Sigma} label="Large Op" onClick={() => insertStructure('∑')} hasArrow />
              <RibbonButton icon={Equal} label="Bracket" onClick={() => insertStructure('(x)')} hasArrow />
              <RibbonButton icon={Plus} label="Function" onClick={() => insertStructure('sin θ')} hasArrow />
          </div>
      </RibbonSection>
    </>
  );
};
