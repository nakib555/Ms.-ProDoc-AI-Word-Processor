
import React from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { RulerCheckTool } from './RulerCheckTool';
import { GridlinesCheckTool } from './GridlinesCheckTool';
import { NavPaneCheckTool } from './NavPaneCheckTool';
import { JsonInspectorCheckTool } from './JsonInspectorCheckTool';
import { BenchmarkTool } from './BenchmarkTool';

export const ShowGroup: React.FC = () => {
  return (
    <RibbonSection title="Show">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 px-1.5 py-0.5 items-center">
           <RulerCheckTool />
           <GridlinesCheckTool />
           <NavPaneCheckTool />
           <JsonInspectorCheckTool />
           <BenchmarkTool />
        </div>
    </RibbonSection>
  );
};

