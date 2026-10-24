import React from 'react';
import { Grid, Sliders } from 'lucide-react';
import { useEditor } from '../../../contexts/EditorContext';
import { StudioButton } from '../common/StudioButton';
import { StudioButtonGroup } from '../common/StudioButtonGroup';
import { StudioDivider } from '../common/StudioDivider';
import { StudioDropdown, StudioDropdownItem } from '../common/StudioDropdown';
import { MARGIN_PRESETS } from '../../../constants';
import { PageOrientation, PageSize, MarginPreset, PageBackground } from '../../../types';

export const CanvasTray: React.FC = () => {
  const { pageConfig, setPageConfig, setShowPageSetup } = useEditor();

  const handleOrientationChange = (orientation: PageOrientation) => {
    setPageConfig(prev => ({ ...prev, orientation }));
  };

  const handleSizeChange = (size: PageSize) => {
    setPageConfig(prev => ({ ...prev, size }));
  };

  const handleMarginChange = (preset: MarginPreset) => {
    const margins = MARGIN_PRESETS[preset] || MARGIN_PRESETS.normal;
    setPageConfig(prev => ({ ...prev, marginPreset: preset, margins }));
  };

  const handleBackgroundChange = (background: PageBackground) => {
    setPageConfig(prev => ({ ...prev, background }));
  };

  const sizeItems: StudioDropdownItem[] = [
    { id: 'Letter', label: 'Letter (8.5" × 11")', onClick: () => handleSizeChange('Letter') },
    { id: 'A4', label: 'A4 (210 × 297 mm)', onClick: () => handleSizeChange('A4') },
    { id: 'Legal', label: 'Legal (8.5" × 14")', onClick: () => handleSizeChange('Legal') },
    { id: 'Executive', label: 'Executive (7.25" × 10.5")', onClick: () => handleSizeChange('Executive') },
    { id: 'A3', label: 'A3 (297 × 420 mm)', onClick: () => handleSizeChange('A3') },
    { id: 'A5', label: 'A5 (148 × 210 mm)', onClick: () => handleSizeChange('A5') },
  ];

  const marginItems: StudioDropdownItem[] = [
    { id: 'normal', label: 'Normal (1" all sides)', onClick: () => handleMarginChange('normal') },
    { id: 'narrow', label: 'Narrow (0.5" all sides)', onClick: () => handleMarginChange('narrow') },
    { id: 'moderate', label: 'Moderate (1" top/bot, 0.75" sides)', onClick: () => handleMarginChange('moderate') },
    { id: 'wide', label: 'Wide (1" top/bot, 2" sides)', onClick: () => handleMarginChange('wide') },
    { id: 'div', label: '', divider: true },
    { id: 'custom', label: 'Custom Margins & Setup...', icon: Sliders, onClick: () => setShowPageSetup(true) },
  ];

  const backgroundItems: StudioDropdownItem[] = [
    { id: 'none', label: 'Clean Paper (None)', onClick: () => handleBackgroundChange('none') },
    { id: 'ruled', label: 'Ruled Lines (Notebook)', onClick: () => handleBackgroundChange('ruled') },
    { id: 'grid', label: 'Grid / Graph Paper', onClick: () => handleBackgroundChange('grid') },
  ];

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 overflow-x-auto no-scrollbar w-full">
      {/* Orientation Toggle */}
      <StudioButtonGroup ariaLabel="Page Orientation">
        <StudioButton
          label="Portrait"
          onClick={() => handleOrientationChange('portrait')}
          active={pageConfig.orientation === 'portrait'}
          size="sm"
          variant="segmented"
        />
        <StudioButton
          label="Landscape"
          onClick={() => handleOrientationChange('landscape')}
          active={pageConfig.orientation === 'landscape'}
          size="sm"
          variant="segmented"
        />
      </StudioButtonGroup>

      <StudioDivider />

      {/* Paper Size */}
      <StudioDropdown
        label={`Size: ${pageConfig.size}`}
        items={sizeItems}
        size="sm"
        title="Page Size"
        triggerClassName="border border-slate-200 dark:border-slate-800"
      />

      {/* Margins */}
      <StudioDropdown
        label={`Margins: ${pageConfig.marginPreset}`}
        items={marginItems}
        size="sm"
        title="Page Margins"
        triggerClassName="border border-slate-200 dark:border-slate-800"
      />

      {/* Page Background Texture */}
      <StudioDropdown
        icon={Grid}
        label={`Pattern: ${pageConfig.background}`}
        items={backgroundItems}
        size="sm"
        title="Page Background Pattern"
        triggerClassName="border border-slate-200 dark:border-slate-800"
      />

      <StudioDivider />

      {/* Page Setup Advanced Dialog */}
      <StudioButton
        icon={Sliders}
        label="Page Setup..."
        onClick={() => setShowPageSetup(true)}
        title="Advanced Page & Print Setup"
        size="sm"
      />
    </div>
  );
};
