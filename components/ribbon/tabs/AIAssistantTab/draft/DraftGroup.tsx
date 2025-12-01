
import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { ContinueWritingTool } from './ContinueWritingTool';
import { QuickPromptTool } from './QuickPromptTool';
import { WriteWithAITool } from './WriteWithAITool';

export const DraftGroup: React.FC = () => {
  return (
    <RibbonSection title="Compose">
       {/* Primary AI writing button */}
       <WriteWithAITool />
       
       <div className="w-[1px] bg-slate-200 dark:bg-slate-700 h-4/5 my-auto mx-1"></div>

       {/* Quick prompt inline input */}
       <QuickPromptTool />
       
       <div className="w-[1px] bg-slate-200 dark:bg-slate-700 h-4/5 my-auto mx-1"></div>
       
       <ContinueWritingTool />
    </RibbonSection>
  );
};
