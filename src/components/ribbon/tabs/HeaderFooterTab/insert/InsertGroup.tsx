
import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { DateTimeTool } from '../../InsertTab/text/DateTimeTool';
import { DocumentInfoTool } from './DocumentInfoTool';
import { QuickPartsTool } from '../../InsertTab/text/QuickPartsTool';
import { PicturesTool } from '../../InsertTab/illustrations/PicturesTool';

export const InsertGroup: React.FC = () => {
  return (
    <RibbonSection title="Insert">
        <div className="flex h-full gap-0.5 items-center px-1">
            <DateTimeTool />
            <DocumentInfoTool />
            <QuickPartsTool />
            <PicturesTool />
            {/* Online Pictures is included in PicturesTool dropdown or separate depending on implementation, simplified here */}
        </div>
    </RibbonSection>
  );
};
