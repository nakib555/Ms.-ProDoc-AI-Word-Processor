import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { SaveTool } from './SaveTool';

export const SaveGroup: React.FC = () => {
  return (
    <RibbonSection title="Save">
      <SaveTool />
    </RibbonSection>
  );
};