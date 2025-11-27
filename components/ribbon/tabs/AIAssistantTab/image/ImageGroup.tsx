
import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { GenerateImageTool } from './GenerateImageTool';

export const ImageGroup: React.FC = () => {
  return (
    <RibbonSection title="Image">
       <GenerateImageTool />
    </RibbonSection>
  );
};
