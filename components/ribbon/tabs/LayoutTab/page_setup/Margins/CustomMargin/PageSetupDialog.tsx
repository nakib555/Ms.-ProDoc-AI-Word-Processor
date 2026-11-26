import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, LayoutTemplate, Monitor } from 'lucide-react';
import { PageConfig, MeasurementUnit } from '../../../../../../../types';
import { MarginTab } from './PageSetupDialog/margin';
import { PaperTab } from '../../size/MorePageSizes/PageSetupDialog/pager';
import { LayoutTab } from '../../LineNumbers/LineNumberingOptions/PageSetupDialog/layout';
import { getPhysicalDimensions, saveDefaultPageConfig, formatUnitValue } from '../../../../../../../utils/measurement';
import { useEditor } from '../../../../../../../contexts/EditorContext';

export interface PageSetupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  config: PageConfig;
  onSave: (config: PageConfig) => void;
  initialTab?: 'margins' | 'paper' | 'layout';
}

type Tab = 'margins' | 'paper' | 'layout';

export const PageSetupDialog: React.FC<PageSetupDialogProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  initialTab = 'margins',
}) => {
  const { measurementUnit, setMeasurementUnit, showToast } = useEditor();
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [localConfig, setLocalConfig] = useState<PageConfig>(config);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setLocalConfig(JSON.parse(JSON.stringify(config)));
    }
  }, [isOpen, config, initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activePhys = getPhysicalDimensions(
    localConfig.size as string,
    localConfig.orientation,
    localConfig.customWidth,
    localConfig.customHeight
  );

  const handleSetAsDefault = () => {
    const saved = saveDefaultPageConfig(localConfig);
    onSave(localConfig);
    if (saved) {
      showToast(`Saved "${localConfig.size} (${localConfig.orientation})" as default page setup.`, 'success');
    } else {
      showToast('Applied page setup for this session.', 'info');
    }
  };

  const renderPreview = () => {
    const { multiplePages, margins, gutterPosition } = localConfig;
    const isMirroredOrBookFold = ['mirrorMargins', 'bookFold'].includes(multiplePages || '');
    const hasGutter = (margins.gutter || 0) > 0;

    // Fit true paper aspect ratio into max 112px bounding box
    const maxPreviewDim = 104;
    const scaleFactor = maxPreviewDim / Math.max(activePhys.widthInches, activePhys.heightInches);
    const baseWidth = Math.max(28, Math.round(activePhys.widthInches * scaleFactor));
    const baseHeight = Math.max(28, Math.round(activePhys.heightInches * scaleFactor));

    const previewMargins = {
      top: Math.max(2, margins.top * scaleFactor),
      bottom: Math.max(2, margins.bottom * scaleFactor),
      left: Math.max(2, margins.left * scaleFactor),
      right: Math.max(2, margins.right * scaleFactor),
      gutter: (margins.gutter || 0) * scaleFactor
    };

    let effectiveLeft = previewMargins.left;
    const effectiveRight = previewMargins.right;
    let effectiveTop = previewMargins.top;

    if (!isMirroredOrBookFold && hasGutter) {
      if (gutterPosition === 'left') {
        effectiveLeft += previewMargins.gutter;
      } else {
        effectiveTop += previewMargins.gutter;
      }
    }

    const SkeletonContent = () => (
      <div className="w-full h-full flex flex-col gap-[3px] overflow-hidden opacity-60">
        <div className="w-3/4 h-[2px] bg-slate-300 rounded-full mb-[2px]"></div>
        <div className="w-full h-[1px] bg-slate-200 rounded-full"></div>
        <div className="w-full h-[1px] bg-slate-200 rounded-full"></div>
        <div className="w-5/6 h-[1px] bg-slate-200 rounded-full"></div>
        <div className="w-full h-[1px] bg-slate-200 rounded-full mt-[2px]"></div>
        <div className="w-full h-[1px] bg-slate-200 rounded-full"></div>
        <div className="w-4/5 h-[1px] bg-slate-200 rounded-full"></div>
        <div className="w-1/2 h-[1px] bg-slate-200 rounded-full mt-[2px]"></div>
      </div>
    );

    const GutterPattern = () => (
      <div
        className="absolute bg-slate-300/30 z-10 h-full w-full"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #cbd5e1 2px, #cbd5e1 3px)',
        }}
      />
    );

    const PageSheet = ({ children, style }: any) => (
      <div
        className="bg-white relative shadow-[0_4px_12px_-2px_rgba(0,0,0,0.12),0_2px_6px_-1px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out ring-1 ring-black/[0.03]"
        style={{
          ...style,
          borderRadius: '2px'
        }}
      >
        {children}
      </div>
    );

    const SinglePagePreview = (
      <PageSheet style={{ width: `${baseWidth}px`, height: `${baseHeight}px` }}>
        <div
          className="absolute border-[0.5px] border-dashed border-blue-400/70 flex flex-col justify-evenly px-[2px] py-[2px] transition-all duration-200"
          style={{
            top: `${effectiveTop}px`,
            bottom: `${previewMargins.bottom}px`,
            left: `${effectiveLeft}px`,
            right: `${effectiveRight}px`,
            backgroundColor: 'rgba(59, 130, 246, 0.03)'
          }}
        >
          <SkeletonContent />
        </div>

        {hasGutter && gutterPosition === 'left' && !isMirroredOrBookFold && (
          <div className="absolute top-0 bottom-0 left-0" style={{ width: `${previewMargins.gutter}px` }}>
            <GutterPattern />
          </div>
        )}
        {hasGutter && gutterPosition === 'top' && !isMirroredOrBookFold && (
          <div className="absolute left-0 right-0 top-0" style={{ height: `${previewMargins.gutter}px` }}>
            <GutterPattern />
          </div>
        )}
      </PageSheet>
    );

    const TwoPagePreview = (
      <div className="flex items-center justify-center gap-[1px]">
        <PageSheet style={{ width: `${Math.round(baseWidth * 0.85)}px`, height: `${Math.round(baseHeight * 0.85)}px` }}>
          <div
            className="absolute border-[0.5px] border-dashed border-blue-400/70 flex flex-col justify-evenly px-[2px] py-[2px]"
            style={{
              top: `${previewMargins.top * 0.85}px`,
              bottom: `${previewMargins.bottom * 0.85}px`,
              left: `${previewMargins.right * 0.85}px`,
              right: `${(previewMargins.left + (hasGutter && gutterPosition === 'left' ? previewMargins.gutter : 0)) * 0.85}px`,
              backgroundColor: 'rgba(59, 130, 246, 0.03)'
            }}
          >
            <SkeletonContent />
          </div>
        </PageSheet>
        <div className="w-[2px] h-[90%] bg-gradient-to-b from-slate-300 via-slate-400 to-slate-300 shadow-sm z-10 rounded-full"></div>
        <PageSheet style={{ width: `${Math.round(baseWidth * 0.85)}px`, height: `${Math.round(baseHeight * 0.85)}px` }}>
          <div
            className="absolute border-[0.5px] border-dashed border-blue-400/70 flex flex-col justify-evenly px-[2px] py-[2px]"
            style={{
              top: `${previewMargins.top * 0.85}px`,
              bottom: `${previewMargins.bottom * 0.85}px`,
              left: `${(previewMargins.left + (hasGutter && gutterPosition === 'left' ? previewMargins.gutter : 0)) * 0.85}px`,
              right: `${previewMargins.right * 0.85}px`,
              backgroundColor: 'rgba(59, 130, 246, 0.03)'
            }}
          >
            <SkeletonContent />
          </div>
        </PageSheet>
      </div>
    );

    if (['mirrorMargins', 'bookFold', 'twoPagesPerSheet'].includes(multiplePages || '')) {
      return TwoPagePreview;
    }
    return SinglePagePreview;
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-150 overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      data-modal-backdrop="true"
      aria-labelledby="page-setup-dialog-title"
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-[490px] h-auto max-h-[90dvh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden ring-1 ring-black/5"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <h2 id="page-setup-dialog-title" className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 dark:bg-slate-800 rounded-md text-blue-600 dark:text-blue-400">
              <LayoutTemplate size={16} />
            </div>
            Page Setup
          </h2>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-0.5" title="Display Units">
              {(['in', 'cm', 'mm'] as MeasurementUnit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setMeasurementUnit(u)}
                  className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md transition-colors ${
                    measurementUnit === u
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              aria-label="Close Page Setup"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main Tabs */}
        <div className="px-5 pt-3.5 pb-2 bg-white dark:bg-slate-900 shrink-0">
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {(['margins', 'paper', 'layout'] as Tab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wide rounded-lg transition-all duration-150 ${
                  activeTab === tab
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
          {/* Preview Section */}
          <div className="px-5 pt-2 pb-3 shrink-0 relative z-0">
            <div
              className="w-full h-[145px] rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden flex items-center justify-center shadow-inner"
              style={{
                backgroundColor: '#f1f5f9',
                backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              <div className="relative z-10">{renderPreview()}</div>
              <div className="absolute bottom-2 right-3 text-[10px] font-mono tabular-nums font-bold text-slate-600 dark:text-slate-300 bg-white/95 dark:bg-slate-800/95 px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 shadow-xs pointer-events-none">
                {localConfig.size} · {formatUnitValue(activePhys.widthInches, measurementUnit)} × {formatUnitValue(activePhys.heightInches, measurementUnit)}
              </div>
            </div>
          </div>

          {/* Scrollable Settings Area */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 pb-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
            {activeTab === 'margins' && (
              <MarginTab localConfig={localConfig} setLocalConfig={setLocalConfig} />
            )}

            {activeTab === 'paper' && (
              <PaperTab localConfig={localConfig} setLocalConfig={setLocalConfig} />
            )}

            {activeTab === 'layout' && (
              <LayoutTab localConfig={localConfig} setLocalConfig={setLocalConfig} />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <button
            type="button"
            onClick={handleSetAsDefault}
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
          >
            <Monitor size={14} className="group-hover:scale-110 transition-transform" /> Set As Default
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => { onSave(localConfig); onClose(); }}
              className="px-6 py-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-bold rounded-lg shadow-md transition-all active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
