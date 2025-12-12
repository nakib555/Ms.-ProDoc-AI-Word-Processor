
import React from 'react';
import { X } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReviewTools';

export const RejectTool: React.FC = () => (
    <SmallRibbonButton icon={X} label="Reject" onClick={() => {}} hasArrow className="group-hover:text-red-600" />
);
