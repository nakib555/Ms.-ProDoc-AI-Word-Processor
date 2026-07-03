import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { ShareTool } from './ShareTool';

export const ShareGroup: React.FC = () => {
  return (
    <RibbonSection title="Share">
      <ShareTool />
    </RibbonSection>
  );
};