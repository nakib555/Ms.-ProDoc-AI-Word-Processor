
import React from 'react';
import { Type } from 'lucide-react';
import { SmallRibbonButton } from '../../../../../ViewTab/common/ViewTools';
import { wrapSelectionAsAbcText } from '../../common/mathUtils';

export const abcTextTool: React.FC = () => (
  <SmallRibbonButton
    icon={Type}
    label="abc Text"
    onClick={() => wrapSelectionAsAbcText()}
    title="Insert Normal Non-Math Text Inside Equation"
  />
);
