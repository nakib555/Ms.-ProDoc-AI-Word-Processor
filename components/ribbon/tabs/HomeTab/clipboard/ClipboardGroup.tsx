import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { PasteTool } from './PasteTool';
import { CutCopyTools } from './CutCopyTools';

export const ClipboardGroup: React.FC = () => {
  return (
    <RibbonSection title="Clipboard">
        <div className="flex h-full items-start gap-1 relative py-1">
            <PasteTool />
            <CutCopyTools />
        </div>
    </RibbonSection>
  );
};