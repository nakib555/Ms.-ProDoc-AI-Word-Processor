import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { DrawingCanvasTool } from './DrawingCanvasTool';
import { DrawShapesTool } from './DrawShapesTool';

export const InsertGroup: React.FC = () => {
  return (
    <RibbonSection title="Insert">
        <DrawingCanvasTool />
        <DrawShapesTool />
    </RibbonSection>
  );
};