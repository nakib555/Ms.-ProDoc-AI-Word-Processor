import { 
  FileText, Globe, BookOpen, 
  ZoomIn, RotateCcw, Pilcrow
} from 'lucide-react';
import { useEditor } from '../../../contexts/EditorContext';
import { StudioButton } from '../common/StudioButton';
import { StudioButtonGroup } from '../common/StudioButtonGroup';
import { StudioDivider } from '../common/StudioDivider';
import { StudioDropdown, StudioDropdownItem } from '../common/StudioDropdown';

export const WorkspaceTray: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    showFormattingMarks, 
    setShowFormattingMarks, 
    zoom, 
    setZoom,
    setZoomMode
  } = useEditor();

  const zoomPresets: StudioDropdownItem[] = [
    { id: '50', label: '50%', onClick: () => { setZoom(0.5); setZoomMode('custom'); } },
    { id: '75', label: '75%', onClick: () => { setZoom(0.75); setZoomMode('custom'); } },
    { id: '100', label: '100% (Normal)', onClick: () => { setZoom(1.0); setZoomMode('custom'); } },
    { id: '125', label: '125%', onClick: () => { setZoom(1.25); setZoomMode('custom'); } },
    { id: '150', label: '150%', onClick: () => { setZoom(1.5); setZoomMode('custom'); } },
    { id: '200', label: '200%', onClick: () => { setZoom(2.0); setZoomMode('custom'); } },
    { id: 'div', label: '', divider: true },
    { id: 'fit-width', label: 'Fit to Window Width', onClick: () => setZoomMode('fit-width') },
    { id: 'fit-page', label: 'Fit Entire Page', onClick: () => setZoomMode('fit-page') },
  ];

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 overflow-x-auto no-scrollbar w-full">
      {/* View Mode Segmented Group */}
      <StudioButtonGroup ariaLabel="Document View Mode">
        <StudioButton
          icon={FileText}
          label="Print Layout"
          onClick={() => setViewMode('print')}
          active={viewMode === 'print'}
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Globe}
          label="Continuous Web"
          onClick={() => setViewMode('web')}
          active={viewMode === 'web'}
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={BookOpen}
          label="Reading Mode"
          onClick={() => setViewMode('read')}
          active={viewMode === 'read'}
          size="sm"
          variant="segmented"
        />
      </StudioButtonGroup>

      <StudioDivider />

      {/* Formatting Marks (Pilcrow) Toggle */}
      <StudioButton
        icon={Pilcrow}
        label="Formatting Marks"
        onClick={() => setShowFormattingMarks(prev => !prev)}
        active={showFormattingMarks}
        title="Show non-printing characters (spaces, paragraph marks)"
        size="sm"
      />

      <StudioDivider />

      {/* Zoom Presets Dropdown */}
      <StudioDropdown
        icon={ZoomIn}
        label={`Zoom: ${Math.round(zoom * 100)}%`}
        items={zoomPresets}
        size="sm"
        title="Zoom Level"
        triggerClassName="border border-slate-200 dark:border-slate-800"
      />

      {/* 100% Zoom Reset */}
      <StudioButton
        icon={RotateCcw}
        label="Reset (100%)"
        onClick={() => { setZoom(1.0); setZoomMode('custom'); }}
        title="Reset zoom to 100%"
        size="sm"
      />
    </div>
  );
};
