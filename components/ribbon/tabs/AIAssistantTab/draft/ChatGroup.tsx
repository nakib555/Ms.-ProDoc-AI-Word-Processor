import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { AssistantSidebarTool } from './AssistantSidebarTool';

export const ChatGroup: React.FC = () => {
  return (
    <RibbonSection title="Chat">
       <AssistantSidebarTool />
    </RibbonSection>
  );
};
