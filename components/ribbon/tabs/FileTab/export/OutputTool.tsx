import React from 'react';
import { Share, Download, Printer, ArrowUpRight, LogOut } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useFileTab } from '../FileTabContext';

export const OutputTool: React.FC = () => {
  const { setActiveModal } = useFileTab();

  return <RibbonButton icon={Printer} label="Print & Export" onClick={() => setActiveModal('print')} />;
};
