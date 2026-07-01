
import React from 'react';
import { RibbonSection } from '../../common/RibbonSection';
import { HeaderTool } from '../InsertTab/headerfooter/HeaderTool';
import { FooterTool } from '../InsertTab/headerfooter/FooterTool';
import { PageNumberTool } from '../InsertTab/headerfooter/PageNumberTool';
import { RibbonButton } from '../../common/RibbonButton';
import { X } from 'lucide-react';
import { useEditor } from '../../../../contexts/EditorContext';
import { InsertTabProvider } from '../InsertTab/InsertTabContext';

// Groups
import { InsertGroup } from './insert/InsertGroup';
import { NavigationGroup } from './navigation/NavigationGroup';
import { OptionsGroup } from './options/OptionsGroup';
import { PositionGroup } from './position/PositionGroup';

export const HeaderFooterTab: React.FC = () => {
    const { setActiveEditingArea } = useEditor();

  return (
    <InsertTabProvider>
      <RibbonSection title="Header & Footer">
        <HeaderTool />
        <FooterTool />
        <PageNumberTool />
      </RibbonSection>
      
      <InsertGroup />
      <NavigationGroup />
      <OptionsGroup />
      <PositionGroup />

      <RibbonSection title="Close">
        <RibbonButton 
            icon={X} 
            label="Close Header and Footer" 
            onClick={() => setActiveEditingArea('body')}
            className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-900/30"
        />
      </RibbonSection>
    </InsertTabProvider>
  );
};
