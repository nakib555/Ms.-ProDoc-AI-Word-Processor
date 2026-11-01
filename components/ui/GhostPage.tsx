import React, { memo } from 'react';
import { PageConfig } from '../../types';
import { PAGE_SIZES } from '../../constants';
import { getPhysicalDimensions } from '../../utils/measurement';
import { FileText, Sparkles } from 'lucide-react';

export interface GhostPageProps {
  pageNumber: number;
  totalPages: number;
  config: PageConfig;
  zoom: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GhostPage: React.FC<GhostPageProps> = memo(({
  pageNumber,
  totalPages,
  config,
  zoom,
  className = '',
  style = {}
}) => {
  const scale = zoom / 100;
  const cfg = config || { size: 'A4', orientation: 'portrait', margins: { top: 1, bottom: 1, left: 1, right: 1 } };

  // Resolve exact physical page dimensions
  const phys = getPhysicalDimensions(
    (cfg.size as string) || 'A4',
    cfg.orientation || 'portrait',
    cfg.customWidth,
    cfg.customHeight
  );
  const widthIn = phys.widthInches;
  const heightIn = phys.heightInches;
  const margins = cfg.margins || { top: 1, bottom: 1, left: 1, right: 1 };


  return (
    <div
      className={`prodoc-page-container prodoc-ghost-page relative select-none pointer-events-none mx-auto origin-top transition-opacity duration-200 ${className}`}
      style={{
        width: `${widthIn * scale}in`,
        height: `${heightIn * scale}in`,
        ...style
      }}
      aria-hidden="true"
    >
      {/* Outer Paper Sheet */}
      <div
        className="prodoc-page-sheet absolute inset-0 overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_-2px_rgba(15,23,42,0.08),0_2px_6px_-1px_rgba(15,23,42,0.04)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] box-border"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${widthIn}in`,
          height: `${heightIn}in`,
          paddingTop: `${margins.top}in`,
          paddingBottom: `${margins.bottom}in`,
          paddingLeft: `${margins.left}in`,
          paddingRight: `${margins.right}in`,
        }}
      >
        {/* Document-Accurate Animated Shimmer Wave */}
        <div className="absolute inset-0 ghost-shimmer-sweep pointer-events-none z-10" />

        {/* Top Floating Page Number Badge */}
        <div className="absolute top-3 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold shadow-xs">
          <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Page {pageNumber} of {totalPages}</span>
          <Sparkles className="w-3 h-3 text-amber-500 animate-pulse ml-0.5" />
        </div>

        {/* Header Guide Line */}
        <div className="w-full flex items-center justify-between pb-3 mb-5 border-b border-slate-200/70 dark:border-slate-800/70">
          <div className="h-2.5 w-44 bg-slate-200 dark:bg-slate-800 rounded-sm" />
          <div className="h-2 w-28 bg-slate-100 dark:bg-slate-800/60 rounded-sm" />
        </div>

        {/* Examination Document Skeleton Layout */}
        <div className="w-full space-y-4">
          {/* Official Board Banner Skeleton */}
          <div className="flex flex-col items-center gap-1.5 py-2">
            <div className="h-4 w-3/4 bg-slate-200/90 dark:bg-slate-800 rounded-sm" />
            <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-800/70 rounded-sm" />
            <div className="h-2.5 w-1/3 bg-slate-100 dark:bg-slate-800/50 rounded-sm" />
          </div>

          {/* Candidate Identification Ledger / Table Skeleton */}
          <div className="w-full border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden p-2 grid grid-cols-2 gap-2 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-xs w-5/6" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-xs w-4/6" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded-xs w-3/4" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded-xs w-1/2" />
          </div>

          {/* Section Divider Skeleton */}
          <div className="h-3.5 w-2/5 bg-blue-100 dark:bg-blue-950/60 rounded-sm mt-3" />

          {/* MCQ Question 1 Skeleton */}
          <div className="space-y-2 pt-1">
            <div className="h-3 w-11/12 bg-slate-200 dark:bg-slate-800 rounded-xs" />
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="h-6 border border-slate-200/70 dark:border-slate-800/70 rounded-xs bg-slate-50 dark:bg-slate-800/30 flex items-center px-2">
                <div className="h-2 w-2/3 bg-slate-200 dark:bg-slate-700 rounded-xs" />
              </div>
              <div className="h-6 border border-slate-200/70 dark:border-slate-800/70 rounded-xs bg-slate-50 dark:bg-slate-800/30 flex items-center px-2">
                <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-xs" />
              </div>
              <div className="h-6 border border-slate-200/70 dark:border-slate-800/70 rounded-xs bg-slate-50 dark:bg-slate-800/30 flex items-center px-2">
                <div className="h-2 w-3/5 bg-slate-200 dark:bg-slate-700 rounded-xs" />
              </div>
              <div className="h-6 border border-emerald-200/70 dark:border-emerald-900/40 rounded-xs bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center px-2">
                <div className="h-2 w-4/5 bg-emerald-200 dark:bg-emerald-800/60 rounded-xs" />
              </div>
            </div>
          </div>

          {/* MCQ Question 2 Skeleton */}
          <div className="space-y-2 pt-2">
            <div className="h-3 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-xs" />
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="h-6 border border-slate-200/70 dark:border-slate-800/70 rounded-xs bg-slate-50 dark:bg-slate-800/30 flex items-center px-2">
                <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-xs" />
              </div>
              <div className="h-6 border border-emerald-200/70 dark:border-emerald-900/40 rounded-xs bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center px-2">
                <div className="h-2 w-3/4 bg-emerald-200 dark:bg-emerald-800/60 rounded-xs" />
              </div>
              <div className="h-6 border border-slate-200/70 dark:border-slate-800/70 rounded-xs bg-slate-50 dark:bg-slate-800/30 flex items-center px-2">
                <div className="h-2 w-2/3 bg-slate-200 dark:bg-slate-700 rounded-xs" />
              </div>
              <div className="h-6 border border-slate-200/70 dark:border-slate-800/70 rounded-xs bg-slate-50 dark:bg-slate-800/30 flex items-center px-2">
                <div className="h-2 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-xs" />
              </div>
            </div>
          </div>

          {/* Descriptive Answer Box / Diagnostic Procedure Skeleton */}
          <div className="border-l-4 border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60 p-3 rounded-r-sm space-y-1.5 mt-2">
            <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-xs" />
            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
            <div className="h-2.5 w-5/6 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
            <div className="h-2.5 w-4/6 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
          </div>

          {/* Rubric Matrix Grid Skeleton */}
          <div className="w-full border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden mt-3">
            <div className="h-5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-3 flex items-center">
              <div className="h-2 w-1/4 bg-slate-300 dark:bg-slate-600 rounded-xs" />
            </div>
            <div className="p-2 space-y-1.5">
              <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800/40 rounded-xs" />
              <div className="h-2.5 w-11/12 bg-slate-100 dark:bg-slate-800/40 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Footer Guide Line */}
        <div className="absolute bottom-6 left-0 right-0 px-8 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/60 pt-3">
          <div className="h-2 w-32 bg-slate-100 dark:bg-slate-800/50 rounded-sm" />
          <div className="h-2 w-16 bg-slate-200 dark:bg-slate-800 rounded-sm" />
        </div>
      </div>
    </div>
  );
});

GhostPage.displayName = 'GhostPage';
