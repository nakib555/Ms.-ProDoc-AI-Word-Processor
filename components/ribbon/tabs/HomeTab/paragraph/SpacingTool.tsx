import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpDown, Check } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useHomeTab } from '../HomeTabContext';
import { MenuPortal } from '../../../common/MenuPortal';
import { DropdownToolBtn } from '../common/HomeTools';

const LINE_SPACING_VALUES = [1.0, 1.15, 1.5, 2.0, 2.5, 3.0];

export const SpacingTool: React.FC = () => {
  const { applyBlockStyle } = useEditor();
  const { activeMenu, closeMenu, menuPos, triggerElement } = useHomeTab();
  const [activeSpacing, setActiveSpacing] = useState<string>('1.15');
  const menuId = 'line_spacing';

  const detectSpacing = useCallback(() => {
    const sel = typeof window !== 'undefined' ? window.getSelection() : null;
    if (!sel || sel.rangeCount === 0) return;
    let node: Node | null = sel.anchorNode;
    if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
    const block = node instanceof HTMLElement
      ? (node.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote, td, th') as HTMLElement | null)
      : null;
    if (block) {
      const explicit = block.style.lineHeight;
      if (explicit) {
        setActiveSpacing(String(parseFloat(explicit) || explicit));
      } else {
        const comp = window.getComputedStyle(block);
        const lh = parseFloat(comp.lineHeight);
        const fs = parseFloat(comp.fontSize);
        if (!isNaN(lh) && !isNaN(fs) && fs > 0) {
          const ratio = lh / fs;
          const closest = LINE_SPACING_VALUES.reduce((best, curr) =>
            Math.abs(curr - ratio) < Math.abs(best - ratio) ? curr : best
          , LINE_SPACING_VALUES[1]);
          setActiveSpacing(String(closest));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (activeMenu === menuId) detectSpacing();
  }, [activeMenu, detectSpacing]);

  return (
    <>
      <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700 mx-0.5" />
      <DropdownToolBtn
        id={menuId}
        icon={ArrowUpDown}
        title="Line & Paragraph Spacing"
      />
      <MenuPortal id={menuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={132} title="Line Spacing">
        <div className="p-1 space-y-0.5">
          {LINE_SPACING_VALUES.map((val) => {
            const isSelected = parseFloat(activeSpacing) === val;
            return (
              <button
                key={val}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => {
                  applyBlockStyle({ lineHeight: val.toString() });
                  setActiveSpacing(val.toString());
                  closeMenu();
                }}
                onMouseDown={(e) => e.preventDefault()}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs tabular-nums rounded-md transition-colors ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                <span>{val.toFixed(val % 1 === 0 ? 1 : 2)}</span>
                {isSelected && <Check size={12} className="text-blue-600 dark:text-blue-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </MenuPortal>
    </>
  );
};
