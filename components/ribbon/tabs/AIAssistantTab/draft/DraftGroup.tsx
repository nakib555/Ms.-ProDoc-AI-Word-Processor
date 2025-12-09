
import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { SmartDocTemplateTool } from './SmartDocTemplate/SmartDocTemplate';
import { QuickPromptTool } from './QuickPromptTool';

export const DraftGroup: React.FC = () => {
  return (
    <RibbonSection title="Compose">
       {/* Quick prompt inline input is now the primary AI writing tool */}
       <QuickPromptTool />
       
       <div className="w-[1px] bg-slate-200 dark:bg-slate-700 h-4/5 my-auto mx-1"></div>
       
       <SmartDocTemplateTool />
    </RibbonSection>
  );
};
