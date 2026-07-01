import React from 'react';
import { RibbonSection } from '../../common/RibbonSection';
import { AssistantSidebarTool } from '../AIAssistantTab/draft/AssistantSidebarTool';

export const AssistantGroup: React.FC = () => {
  return (
    <RibbonSection title="Assistant">
         <div className="flex h-full items-center gap-1 px-1">
            <AssistantSidebarTool />
         </div>
    </RibbonSection>
  );
};
