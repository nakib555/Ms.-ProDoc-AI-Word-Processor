import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { OutputTool } from './OutputTool';

export const OutputGroup: React.FC = () => {
  return (
    <RibbonSection title="Output">
      <OutputTool />
    </RibbonSection>
  );
};
