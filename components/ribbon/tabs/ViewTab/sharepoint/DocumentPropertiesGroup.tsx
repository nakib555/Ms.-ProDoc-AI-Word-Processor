
import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { PropertiesTool } from './PropertiesTool';

export const DocumentPropertiesGroup: React.FC = () => {
  return (
    <RibbonSection title="Document">
        <PropertiesTool />
    </RibbonSection>
  );
};
