
import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { CheckboxItem } from '../../ViewTab/common/ViewTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const OptionsGroup: React.FC = () => {
  const { pageConfig, setPageConfig } = useEditor();

  return (
    <RibbonSection title="Options">
        <div className="flex flex-col justify-center h-full gap-1 px-1 min-w-[140px]">
            <CheckboxItem 
                label="Different First Page" 
                checked={pageConfig.differentFirstPage || false} 
                onChange={() => setPageConfig(prev => ({...prev, differentFirstPage: !prev.differentFirstPage}))} 
            />
            <CheckboxItem 
                label="Different Odd & Even Pages" 
                checked={pageConfig.differentOddEven || false} 
                onChange={() => setPageConfig(prev => ({...prev, differentOddEven: !prev.differentOddEven}))} 
            />
            <CheckboxItem 
                label="Show Document Text" 
                checked={true} 
                onChange={() => {}} 
            />
        </div>
    </RibbonSection>
  );
};
