import React, { useMemo, useState, useRef, useEffect } from 'react';
import { MeasurementUnit, PageConfig } from '../types';
import {
  DEFAULT_DPI,
  CM_PER_INCH,
  getPhysicalDimensions,
  formatUnitValue,
} from '../utils/measurement';

interface RulerProps {
  pageConfig: PageConfig;
  zoom: number;
  calibrationScale?: number;
  unit?: MeasurementUnit;
  onUnitChange?: (unit: MeasurementUnit) => void;
  onPageConfigChange?: React.Dispatch<React.SetStateAction<PageConfig>>;
  onDoubleClick?: () => void;
}

type DragTarget = 'left-margin' | 'right-margin' | null;

export const Ruler: React.FC<RulerProps> = React.memo(({
  pageConfig,
  zoom,
  calibrationScale = 1,
  unit = 'in',
  onUnitChange,
  onPageConfigChange,
  onDoubleClick,
}) => {
  const phys = useMemo(() => {
    return getPhysicalDimensions(
      pageConfig.size as string,
      pageConfig.orientation,
      pageConfig.customWidth,
      pageConfig.customHeight
    );
  }, [pageConfig.size, pageConfig.orientation, pageConfig.customWidth, pageConfig.customHeight]);

  const scale = (zoom / 100) * calibrationScale;
  const baseWidthPx = phys.widthPx;
  const renderedWidthPx = Math.max(120, Math.round(baseWidthPx * scale));

  const [dragState, setDragState] = useState<{
    target: DragTarget;
    previewLeftIn: number;
    previewRightIn: number;
  } | null>(null);

  const dragMetaRef = useRef<{
    target: DragTarget;
    startX: number;
    startLeftIn: number;
    startRightIn: number;
    gutterIn: number;
  } | null>(null);

  const activeLeftIn = dragState ? dragState.previewLeftIn : (pageConfig.margins.left + (pageConfig.margins.gutter || 0));
  const activeRightIn = dragState ? dragState.previewRightIn : pageConfig.margins.right;

  const leftMarginPx = activeLeftIn * DEFAULT_DPI * scale;
  const rightMarginPx = activeRightIn * DEFAULT_DPI * scale;

  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (e: MouseEvent) => {
      const meta = dragMetaRef.current;
      if (!meta || !meta.target) return;
      const deltaPx = e.clientX - meta.startX;
      const deltaInches = deltaPx / (DEFAULT_DPI * Math.max(0.1, scale));
      const minMargin = 0.2;
      const minBodyWidth = 1.5;

      if (meta.target === 'left-margin') {
        const maxLeft = phys.widthInches - meta.startRightIn - minBodyWidth;
        const nextTotalLeft = Math.max(minMargin, Math.min(maxLeft, meta.startLeftIn + deltaInches));
        setDragState({
          target: 'left-margin',
          previewLeftIn: Math.round(nextTotalLeft * 20) / 20,
          previewRightIn: meta.startRightIn,
        });
      } else if (meta.target === 'right-margin') {
        const maxRight = phys.widthInches - meta.startLeftIn - minBodyWidth;
        const nextRight = Math.max(minMargin, Math.min(maxRight, meta.startRightIn - deltaInches));
        setDragState({
          target: 'right-margin',
          previewLeftIn: meta.startLeftIn,
          previewRightIn: Math.round(nextRight * 20) / 20,
        });
      }
    };

    const handlePointerUp = () => {
      const meta = dragMetaRef.current;
      if (meta && dragState && onPageConfigChange) {
        if (meta.target === 'left-margin') {
          const nextLeftOnly = Math.max(0.1, Math.round((dragState.previewLeftIn - meta.gutterIn) * 100) / 100);
          onPageConfigChange((prev) => ({
            ...prev,
            marginPreset: 'custom',
            margins: { ...prev.margins, left: nextLeftOnly },
          }));
        } else if (meta.target === 'right-margin') {
          const nextRight = Math.max(0.1, Math.round(dragState.previewRightIn * 100) / 100);
          onPageConfigChange((prev) => ({
            ...prev,
            marginPreset: 'custom',
            margins: { ...prev.margins, right: nextRight },
          }));
        }
      }
      dragMetaRef.current = null;
      setDragState(null);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
    };
  }, [dragState, onPageConfigChange, phys.widthInches, scale]);

  const startMarginDrag = (target: 'left-margin' | 'right-margin', e: React.MouseEvent) => {
    if (!onPageConfigChange) return;
    e.preventDefault();
    e.stopPropagation();
    const gutterIn = pageConfig.margins.gutter || 0;
    const totalLeftIn = pageConfig.margins.left + gutterIn;
    const rightIn = pageConfig.margins.right;

    dragMetaRef.current = {
      target,
      startX: e.clientX,
      startLeftIn: totalLeftIn,
      startRightIn: rightIn,
      gutterIn,
    };
    setDragState({
      target,
      previewLeftIn: totalLeftIn,
      previewRightIn: rightIn,
    });
  };

  const ticks = useMemo(() => {
    const stepPerUnit = unit === 'in' ? 8 : 4; // 1/8 in OR 0.25 cm (= 2.5mm)
    const majorDivisor = stepPerUnit;
    const halfDivisor = stepPerUnit / 2;

    const unitWidth =
      unit === 'in'
        ? phys.widthInches
        : unit === 'cm'
        ? phys.widthInches * CM_PER_INCH
        : phys.widthInches * CM_PER_INCH; // mm uses cm ticks labeled in multiples of 10mm

    const pxPerStep =
      unit === 'in'
        ? (DEFAULT_DPI * scale) / stepPerUnit
        : ((DEFAULT_DPI / CM_PER_INCH) * scale) / stepPerUnit;

    const totalSteps = Math.floor(unitWidth * stepPerUnit);
    const items: React.ReactNode[] = [];

    for (let i = 0; i <= totalSteps; i++) {
      const pos = i * pxPerStep;
      if (pos > renderedWidthPx) break;

      const isMajor = i % majorDivisor === 0;
      const isHalf = i % halfDivisor === 0;

      let heightClass = 'h-1';
      if (isMajor) heightClass = 'h-2.5';
      else if (isHalf) heightClass = 'h-1.5';

      const majorIndex = Math.round(i / majorDivisor);
      const label = unit === 'mm' ? majorIndex * 10 : majorIndex;
      const showLabel = isMajor && i > 0 && pxPerStep * majorDivisor >= 20;

      items.push(
        <div
          key={i}
          className={`absolute top-0 border-l border-slate-500/80 dark:border-slate-400/70 ${heightClass}`}
          style={{ left: `${pos}px` }}
        >
          {showLabel && (
            <span className="absolute top-2.5 -translate-x-1/2 text-[9px] font-semibold font-mono tabular-nums text-slate-600 dark:text-slate-300 select-none">
              {label}
            </span>
          )}
        </div>
      );
    }
    return items;
  }, [unit, phys.widthInches, scale, renderedWidthPx]);

  const cycleUnit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onUnitChange) return;
    const order: MeasurementUnit[] = ['in', 'cm', 'mm'];
    const next = order[(order.indexOf(unit) + 1) % order.length];
    onUnitChange(next);
  };

  return (
    <div className="flex items-center relative select-none no-print">
      {onUnitChange && (
        <button
          type="button"
          onClick={cycleUnit}
          onMouseDown={(e) => e.stopPropagation()}
          className="h-6 px-1.5 mr-1 rounded text-[9px] font-bold font-mono uppercase bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-slate-300 dark:border-slate-600 transition-colors"
          title="Click to cycle ruler units (in / cm / mm)"
        >
          {unit}
        </button>
      )}
      <div
        onDoubleClick={onDoubleClick}
        className="h-6 bg-[#cbd5e1] dark:bg-slate-700 border-b border-slate-300 dark:border-slate-600 flex items-end relative select-none z-10 shadow-sm cursor-default"
        title="Double-click to open Page Setup"
        style={{
          width: `${renderedWidthPx}px`,
        }}
      >
        {/* White writable area representation */}
        <div
          className="absolute top-0 bottom-0 bg-white dark:bg-slate-800 border-x border-slate-300 dark:border-slate-600 h-full z-0 pointer-events-none"
          style={{
            left: `${Math.max(0, leftMarginPx)}px`,
            right: `${Math.max(0, rightMarginPx)}px`,
          }}
        />

        {/* Ticks Container */}
        <div className="w-full h-full bg-transparent relative overflow-hidden z-10 pointer-events-none">
          {ticks}

          {/* Left Margin / Indent Marker */}
          <div
            data-handle="left-margin"
            onMouseDown={(e) => startMarginDrag('left-margin', e)}
            onDoubleClick={(e) => {
              e.stopPropagation();
              onDoubleClick?.();
            }}
            className="absolute top-0 h-full w-3 cursor-ew-resize group z-20 pointer-events-auto"
            style={{ left: `${Math.max(0, leftMarginPx) - 5}px` }}
            title={`Left Margin: ${formatUnitValue(activeLeftIn, unit)} (Drag to resize or double-click for Page Setup)`}
          >
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-600 dark:border-t-slate-200 absolute top-0 left-0" />
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-slate-600 dark:border-b-slate-200 absolute top-[8px] left-0" />
            <div className="w-[10px] h-[5px] bg-slate-600 dark:bg-slate-200 absolute top-[14px] left-0" />
          </div>

          {/* Right Margin / Indent Marker */}
          <div
            data-handle="right-margin"
            onMouseDown={(e) => startMarginDrag('right-margin', e)}
            onDoubleClick={(e) => {
              e.stopPropagation();
              onDoubleClick?.();
            }}
            className="absolute top-0 h-full w-3 cursor-ew-resize group z-20 pointer-events-auto"
            style={{ left: `${Math.max(0, renderedWidthPx - rightMarginPx - 5)}px` }}
            title={`Right Margin: ${formatUnitValue(activeRightIn, unit)} (Drag to resize or double-click for Page Setup)`}
          >
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-slate-600 dark:border-b-slate-200 absolute top-[11px] left-0" />
          </div>
        </div>

        {/* Live drag readout tooltip */}
        {dragState && (
          <div
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[120] px-2.5 py-1 rounded bg-slate-900 text-white text-[11px] font-mono tabular-nums shadow-lg pointer-events-none"
          >
            {dragState.target === 'left-margin'
              ? `Left Margin: ${formatUnitValue(dragState.previewLeftIn, unit)}`
              : `Right Margin: ${formatUnitValue(dragState.previewRightIn, unit)}`}
          </div>
        )}
      </div>
    </div>
  );
});
