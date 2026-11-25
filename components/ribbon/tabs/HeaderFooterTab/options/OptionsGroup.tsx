
import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { CheckboxItem } from '../../ViewTab/common/ViewTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const OptionsGroup: React.FC = () => {
  const { pageConfig, setPageConfig, showDocumentText, setShowDocumentText } = useEditor();

  return (
    <RibbonSection title="Options">
        <div className="flex flex-col justify-center h-full gap-1.5 px-1.5 py-0.5 min-w-[160px]">
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
                checked={showDocumentText} 
                onChange={() => setShowDocumentText(prev => !prev)} 
            />
        </div>
    </RibbonSection>
  );
};
