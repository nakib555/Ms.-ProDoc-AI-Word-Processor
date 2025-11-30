
import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Link2 } from 'lucide-react';
import { RibbonSection } from '../../../common/RibbonSection';
import { RibbonButton } from '../../../common/RibbonButton';
import { SmallRibbonButton } from '../../ViewTab/common/ViewTools';
import { useEditor } from '../../../../../../contexts/EditorContext';

export const NavigationGroup: React.FC = () => {
  const { setActiveEditingArea, activeEditingArea } = useEditor();

  return (
    <RibbonSection title="Navigation">
        <div className="flex h-full gap-1 items-center">
            <RibbonButton 
                icon={ArrowUp} 
                label="Go to Header" 
                onClick={() => setActiveEditingArea('header')} 
                className={activeEditingArea === 'header' ? 'bg-slate-100 text-blue-700' : ''}
                disabled={activeEditingArea === 'header'}
            />
            <RibbonButton 
                icon={ArrowDown} 
                label="Go to Footer" 
                onClick={() => setActiveEditingArea('footer')}
                className={activeEditingArea === 'footer' ? 'bg-slate-100 text-blue-700' : ''}
                disabled={activeEditingArea === 'footer'}
            />
            
            <div className="flex flex-col h-full justify-center gap-0.5 px-1 min-w-[100px]">
                <SmallRibbonButton icon={ArrowLeft} label="Previous" onClick={() => {}} />
                <SmallRibbonButton icon={ArrowRight} label="Next" onClick={() => {}} />
                <SmallRibbonButton icon={Link2} label="Link to Previous" onClick={() => {}} />
            </div>
        </div>
    </RibbonSection>
  );
};
