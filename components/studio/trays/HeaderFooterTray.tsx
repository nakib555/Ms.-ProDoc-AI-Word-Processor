import { LayoutPanelTop, X, Calendar, Hash } from 'lucide-react';
import { useEditor } from '../../../contexts/EditorContext';
import { StudioButton } from '../common/StudioButton';
import { StudioDivider } from '../common/StudioDivider';

export const HeaderFooterTray: React.FC = () => {
  const { 
    pageConfig, 
    setPageConfig, 
    setActiveEditingArea, 
    executeCommand 
  } = useEditor();

  const handleHeaderDistance = (delta: number) => {
    setPageConfig(prev => ({
      ...prev,
      headerDistance: Math.max(0.1, Math.min(3.0, (prev.headerDistance || 0.5) + delta))
    }));
  };

  const handleFooterDistance = (delta: number) => {
    setPageConfig(prev => ({
      ...prev,
      footerDistance: Math.max(0.1, Math.min(3.0, (prev.footerDistance || 0.5) + delta))
    }));
  };

  const handleInsertPageNumber = () => {
    executeCommand('insertHTML', '<span class="page-number-placeholder" style="font-weight:600;">1</span>&nbsp;');
  };

  const handleInsertDate = () => {
    executeCommand('insertText', new Date().toLocaleDateString());
  };

  const toggleFirstPage = () => {
    setPageConfig(prev => ({ ...prev, differentFirstPage: !prev.differentFirstPage }));
  };

  const toggleOddEven = () => {
    setPageConfig(prev => ({ ...prev, differentOddEven: !prev.differentOddEven }));
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 overflow-x-auto no-scrollbar w-full bg-emerald-50/20 dark:bg-emerald-950/10">
      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mr-1 flex-shrink-0">
        <LayoutPanelTop size={14} />
        <span>Header & Footer:</span>
      </div>

      {/* Header Distance Stepper */}
      <div className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-300 flex-shrink-0">
        <span className="text-[11px] text-slate-500">Header Top:</span>
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800">
          <button 
            type="button" 
            onClick={() => handleHeaderDistance(-0.1)} 
            className="px-1.5 py-0.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            -
          </button>
          <span className="px-1 text-[11px] font-mono">{(pageConfig.headerDistance || 0.5).toFixed(1)}"</span>
          <button 
            type="button" 
            onClick={() => handleHeaderDistance(0.1)} 
            className="px-1.5 py-0.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            +
          </button>
        </div>
      </div>

      {/* Footer Distance Stepper */}
      <div className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-300 flex-shrink-0">
        <span className="text-[11px] text-slate-500">Footer Bot:</span>
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800">
          <button 
            type="button" 
            onClick={() => handleFooterDistance(-0.1)} 
            className="px-1.5 py-0.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            -
          </button>
          <span className="px-1 text-[11px] font-mono">{(pageConfig.footerDistance || 0.5).toFixed(1)}"</span>
          <button 
            type="button" 
            onClick={() => handleFooterDistance(0.1)} 
            className="px-1.5 py-0.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            +
          </button>
        </div>
      </div>

      <StudioDivider />

      {/* Insert Page Number & Date */}
      <StudioButton
        icon={Hash}
        label="Page Number"
        onClick={handleInsertPageNumber}
        title="Insert Page Number Field"
        size="sm"
      />
      <StudioButton
        icon={Calendar}
        label="Date"
        onClick={handleInsertDate}
        title="Insert Current Date"
        size="sm"
      />

      <StudioDivider />

      {/* Options: Different First Page & Odd/Even */}
      <StudioButton
        label="Different First Page"
        onClick={toggleFirstPage}
        active={pageConfig.differentFirstPage}
        title="Unique Header/Footer for First Page"
        size="sm"
        variant="subtle"
      />
      <StudioButton
        label="Different Odd & Even"
        onClick={toggleOddEven}
        active={pageConfig.differentOddEven}
        title="Separate Headers/Footers for Odd & Even Pages"
        size="sm"
        variant="subtle"
      />

      <StudioDivider />

      {/* Close Header & Footer */}
      <StudioButton
        icon={X}
        label="Close"
        onClick={() => setActiveEditingArea('body')}
        title="Exit Header & Footer Editing"
        size="sm"
        className="text-emerald-700 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-950/60 hover:bg-emerald-200"
      />
    </div>
  );
};
