import React from 'react';
import { PageSetupDialog as UnifiedPageSetupDialog, PageSetupDialogProps } from '../../Margins/CustomMargin/PageSetupDialog';

export const PageSetupDialog: React.FC<PageSetupDialogProps> = (props) => (
  <UnifiedPageSetupDialog {...props} initialTab={props.initialTab || 'layout'} />
);
