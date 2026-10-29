import React, { useState } from 'react';
import { Download, Printer } from 'lucide-react';
import { RibbonSection } from '../../../common/RibbonSection';
import { RibbonButton } from '../../../common/RibbonButton';
import { useFileTab } from '../FileTabContext';
import { useEditor } from '../../../../../contexts/EditorContext';
import { downloadDocumentPdf } from '../../../../../utils/pdfExportEngine';

export const OutputGroup: React.FC = () => {
  const { setActiveModal } = useFileTab();
  const { content, documentTitle, pageConfig, headerContent, footerContent } = useEditor();
  const [isExporting, setIsExporting] = useState(false);

  const handleQuickPdfExport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      await downloadDocumentPdf(content, documentTitle || 'document', {
        config: pageConfig,
        headerContent,
        footerContent,
        range: 'all'
      });
    } catch (e) {
      console.error('Quick PDF export error:', e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <RibbonSection title="Output">
      <RibbonButton 
        icon={Download} 
        label={isExporting ? "Exporting..." : "Export PDF"} 
        title="Download high-quality PDF directly"
        onClick={handleQuickPdfExport} 
      />
      <RibbonButton 
        icon={Printer} 
        label="Print & Export" 
        title="Open Print & Export Studio"
        onClick={() => setActiveModal('print')} 
      />
    </RibbonSection>
  );
};
