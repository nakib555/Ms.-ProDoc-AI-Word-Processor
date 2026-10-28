
import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Link2 } from 'lucide-react';
import { RibbonSection } from '../../../common/RibbonSection';
import { RibbonButton } from '../../../common/RibbonButton';
import { SmallRibbonButton } from '../../ViewTab/common/ViewTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const NavigationGroup: React.FC = () => {
  const { 
    setActiveEditingArea, 
    activeEditingArea,
    currentPage,
    setCurrentPage,
    totalPages,
    pageConfig,
    setPageConfig
  } = useEditor();

  const handlePrevious = () => {
    if (currentPage > 1) {
      const targetPage = currentPage - 1;
      setCurrentPage(targetPage);
      const targetEl = document.querySelector(`[data-page-index="${targetPage - 1}"] .prodoc-${activeEditingArea === 'footer' ? 'footer' : 'header'}`);
      (targetEl as HTMLElement)?.focus();
      (targetEl as HTMLElement)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const targetPage = currentPage + 1;
      setCurrentPage(targetPage);
      const targetEl = document.querySelector(`[data-page-index="${targetPage - 1}"] .prodoc-${activeEditingArea === 'footer' ? 'footer' : 'header'}`);
      (targetEl as HTMLElement)?.focus();
      (targetEl as HTMLElement)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const isLinked = !pageConfig.differentFirstPage;

  const handleToggleLink = () => {
    setPageConfig(prev => ({
      ...prev,
      differentFirstPage: !prev.differentFirstPage
    }));
  };

  return (
    <RibbonSection title="Navigation">
        <div className="flex h-full gap-1 items-center">
            <RibbonButton 
                icon={ArrowUp} 
                label="Go to Header" 
                onClick={() => setActiveEditingArea('header')} 
                className={activeEditingArea === 'header' ? 'bg-slate-100 text-blue-700' : ''}
                disabled={activeEditingArea === 'header'}
            />
            <RibbonButton 
                icon={ArrowDown} 
                label="Go to Footer" 
                onClick={() => setActiveEditingArea('footer')}
                className={activeEditingArea === 'footer' ? 'bg-slate-100 text-blue-700' : ''}
                disabled={activeEditingArea === 'footer'}
            />
            
            <div className="flex flex-col h-full justify-center gap-0.5 px-1 min-w-[100px]">
                <SmallRibbonButton 
                  icon={ArrowLeft} 
                  label="Previous" 
                  onClick={handlePrevious} 
                  disabled={currentPage <= 1}
                />
                <SmallRibbonButton 
                  icon={ArrowRight} 
                  label="Next" 
                  onClick={handleNext} 
                  disabled={currentPage >= totalPages}
                />
                <SmallRibbonButton 
                  icon={Link2} 
                  label={isLinked ? "Unlink Section" : "Link to Previous"} 
                  onClick={handleToggleLink} 
                  className={isLinked ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold" : ""}
                />
            </div>
        </div>
    </RibbonSection>
  );
};

