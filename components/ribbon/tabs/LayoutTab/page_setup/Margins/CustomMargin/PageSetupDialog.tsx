
import React, { useState, useEffect } from 'react';
import { X, LayoutTemplate, Monitor } from 'lucide-react';
import { PageConfig } from '../../../../../../../types';
import { MarginTab } from './PageSetupDialog/margin';
import { PaperTab } from '../../size/MorePageSizes/PageSetupDialog/pager';
import { LayoutTab } from '../../LineNumbers/LineNumberingOptions/PageSetupDialog/layout';

interface PageSetupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  config: PageConfig;
  onSave: (config: PageConfig) => void;
}

type Tab = 'margins' | 'paper' | 'layout';

export const PageSetupDialog: React.FC<PageSetupDialogProps> = ({
  isOpen,
  onClose,
  config,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('margins');
  const [localConfig, setLocalConfig] = useState<PageConfig>(config);

  useEffect(() => {
    if (isOpen) {
      setLocalConfig(JSON.parse(JSON.stringify(config)));
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const renderPreview = () => {
    const { orientation, multiplePages, margins, gutterPosition } = localConfig;
    const isPortrait = orientation === 'portrait';
    const isMirroredOrBookFold = ['mirrorMargins', 'bookFold'].includes(multiplePages || '');
    const hasGutter = (margins.gutter || 0) > 0;

    const baseWidth = isPortrait ? 80 : 110;
    const baseHeight = isPortrait ? 110 : 80;
    
    const marginScale = 6; 
    const previewMargins = {
      top: margins.top * marginScale,
      bottom: margins.bottom * marginScale,
      left: margins.left * marginScale,
      right: margins.right * marginScale,
      gutter: (margins.gutter || 0) * marginScale
    };

    let effectiveLeft = previewMargins.left;
    let effectiveRight = previewMargins.right;
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
            className="bg-white relative shadow-[0_4px_12px_-2px_rgba(0,0,0,0.12),0_2px_6px_-1px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out ring-1 ring-black/[0.03]"
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
                className="absolute border-[0.5px] border-dashed border-blue-300/60 flex flex-col justify-evenly px-[2px] py-[2px] transition-all duration-300"
                style={{
                    top: `${effectiveTop}px`,
                    bottom: `${previewMargins.bottom}px`,
                    left: `${effectiveLeft}px`,
                    right: `${effectiveRight}px`,
                    backgroundColor: 'rgba(59, 130, 246, 0.02)'
                }}
            >
                <SkeletonContent />
            </div>
            
            {hasGutter && gutterPosition === 'left' && !isMirroredOrBookFold && (
                <div className="absolute top-0 bottom-0 left-0" style={{width: `${previewMargins.gutter}px`}}>
                    <GutterPattern />
                </div>
            )}
            {hasGutter && gutterPosition === 'top' && !isMirroredOrBookFold && (
                <div className="absolute left-0 right-0 top-0" style={{height: `${previewMargins.gutter}px`}}>
                    <GutterPattern />
                </div>
            )}
        </PageSheet>
    );

    const TwoPagePreview = (
        <div className="flex items-center justify-center gap-[1px]">
            {/* Left Page */}
            <PageSheet style={{ width: `${baseWidth}px`, height: `${baseHeight}px` }}>
                <div 
                    className="absolute border-[0.5px] border-dashed border-blue-300/60 flex flex-col justify-evenly px-[2px] py-[2px]"
                    style={{
                        top: `${previewMargins.top}px`,
                        bottom: `${previewMargins.bottom}px`,
                        left: `${previewMargins.right}px`,
                        right: `${previewMargins.left + (hasGutter && gutterPosition === 'left' ? previewMargins.gutter : 0)}px`,
                        backgroundColor: 'rgba(59, 130, 246, 0.02)'
                    }}
                >
                    <SkeletonContent />
                </div>
                 {hasGutter && gutterPosition === 'left' && (
                    <div className="absolute top-0 bottom-0 right-0 border-l border-slate-300/50" style={{width: `${previewMargins.gutter}px`, right: `${previewMargins.left}px`}}>
                        <GutterPattern />
                    </div>
                )}
            </PageSheet>

            {/* Spine/Binding Effect */}
            <div className="w-[2px] h-[95%] bg-gradient-to-b from-slate-300 via-slate-400 to-slate-300 shadow-sm z-10 rounded-full"></div>

            {/* Right Page */}
            <PageSheet style={{ width: `${baseWidth}px`, height: `${baseHeight}px` }}>
                <div 
                    className="absolute border-[0.5px] border-dashed border-blue-300/60 flex flex-col justify-evenly px-[2px] py-[2px]"
                    style={{
                        top: `${previewMargins.top}px`,
                        bottom: `${previewMargins.bottom}px`,
                        left: `${previewMargins.left + (hasGutter && gutterPosition === 'left' ? previewMargins.gutter : 0)}px`,
                        right: `${previewMargins.right}px`,
                        backgroundColor: 'rgba(59, 130, 246, 0.02)'
                    }}
                >
                    <SkeletonContent />
                </div>
                 {hasGutter && gutterPosition === 'left' && (
                    <div className="absolute top-0 bottom-0 left-0 border-r border-slate-300/50" style={{width: `${previewMargins.gutter}px`, left: `${previewMargins.left}px`}}>
                        <GutterPattern />
                    </div>
                )}
            </PageSheet>
        </div>
    );

    if (['mirrorMargins', 'bookFold', 'twoPagesPerSheet'].includes(multiplePages || '')) {
        return TwoPagePreview;
    }
    return SinglePagePreview;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-[95vw] md:w-[50vw] lg:w-[30vw] max-w-[450px] h-[75vh] max-h-[630px] rounded-2xl shadow-2xl border border-white/50 dark:border-slate-700 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-black/5"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 dark:bg-slate-800 rounded-md text-blue-600 dark:text-blue-400">
                    <LayoutTemplate size={16} /> 
                </div>
                Page Setup
            </h2>
            <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
            >
                <X size={18} />
            </button>
        </div>

        {/* Main Tabs */}
        <div className="px-5 pt-4 pb-2 bg-white dark:bg-slate-900 shrink-0">
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {['margins', 'paper', 'layout'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as Tab)}
                        className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wide rounded-lg transition-all duration-300 ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
            
            {/* Beautiful Preview Section */}
            <div className="px-5 pt-2 pb-4 shrink-0 relative z-0">
                 <div className="w-full h-[20vh] min-h-[140px] rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden flex items-center justify-center shadow-inner group"
                      style={{
                          backgroundColor: '#f1f5f9',
                          backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
                          backgroundSize: '20px 20px'
                      }}
                 >
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent pointer-events-none"></div>
                     <div className="relative z-10 transform transition-transform group-hover:scale-[1.02] duration-500 perspective-1000">
                        {renderPreview()}
                     </div>
                     <div className="absolute bottom-2 right-3 text-[10px] font-semibold text-slate-400/80 bg-white/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/50 shadow-sm pointer-events-none">
                        PREVIEW
                     </div>
                 </div>
            </div>

            {/* Scrollable Settings Area */}
            <div className="flex-1 overflow-y-auto px-5 pb-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 hover:scrollbar-thumb-slate-300">
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
        <div className="flex items-center justify-between px-5 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
            <button 
                onClick={() => alert("Defaults not yet implemented.")}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 group"
            >
                <Monitor size={14} className="group-hover:scale-110 transition-transform"/> Set As Default
            </button>
            <div className="flex gap-3">
                <button 
                    onClick={onClose} 
                    className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg transition-all"
                >
                    Cancel
                </button>
                <button 
                    onClick={() => { onSave(localConfig); onClose(); }} 
                    className="px-6 py-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95"
                >
                    OK
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
