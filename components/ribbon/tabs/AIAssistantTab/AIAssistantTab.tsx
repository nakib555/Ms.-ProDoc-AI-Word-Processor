
import React from 'react';
import { RibbonSeparator } from '../../common/RibbonSeparator';
import { AIAssistantTabProvider } from './AIAssistantTabContext';

// Groups
import { RefineGroup } from './refine/RefineGroup';
import { DraftGroup } from './draft/DraftGroup';
import { TranslateGroup } from './translate/TranslateGroup';
import { ImageGroup } from './image/ImageGroup';
import { SettingsGroup } from './settings/SettingsGroup';

export const AIAssistantTab: React.FC = () => {
  return (
    <AIAssistantTabProvider>
       <DraftGroup />
       <RibbonSeparator />
       <RefineGroup />
       <RibbonSeparator />
       <TranslateGroup />
       <RibbonSeparator />
       <ImageGroup />
       <RibbonSeparator />
       <SettingsGroup />
    </AIAssistantTabProvider>
  );
};
