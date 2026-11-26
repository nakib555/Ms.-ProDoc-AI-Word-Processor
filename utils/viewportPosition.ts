export interface AnchoredPopoverOptions {
  align?: 'left' | 'right';
  preferredWidth?: number;
  fallbackHeight?: number;
  idealMaxHeight?: number;
  gap?: number;
  margin?: number;
}

export interface AnchoredPopoverPosition {
  top: number;
  left: number;
  width?: number;
  maxWidth: string;
  maxHeight: string;
  placement: 'bottom' | 'top';
}

export function getViewportDimensions(): { vw: number; vh: number } {
  if (typeof window === 'undefined') {
    return { vw: 1024, vh: 768 };
  }
  const vv = window.visualViewport;
  const vw = Math.round(vv?.width || window.innerWidth || document.documentElement.clientWidth || 1024);
  const vh = Math.round(vv?.height || window.innerHeight || document.documentElement.clientHeight || 768);
  return { vw, vh };
}

export function computeAnchoredPopover(
  triggerRect: DOMRect,
  menuEl: HTMLElement | null,
  options: AnchoredPopoverOptions = {}
): AnchoredPopoverPosition {
  const { vw, vh } = getViewportDimensions();
  const margin = options.margin ?? (vw < 640 ? 8 : 10);
  const gap = options.gap ?? 4;
  const maxAllowedWidth = Math.max(120, vw - margin * 2);
  const maxAllowedHeight = Math.max(80, vh - margin * 2);

  const measuredRect = menuEl?.getBoundingClientRect();
  const rawWidth = measuredRect?.width || menuEl?.offsetWidth || options.preferredWidth || triggerRect.width || 220;
  const resolvedWidth = Math.min(maxAllowedWidth, rawWidth);
  const measuredHeight =
    measuredRect?.height ||
    menuEl?.offsetHeight ||
    options.fallbackHeight ||
    240;

  let left = options.align === 'right' ? triggerRect.right - resolvedWidth : triggerRect.left;
  if (left + resolvedWidth > vw - margin) {
    if (options.align !== 'right') {
      left = triggerRect.right - resolvedWidth;
    }
    if (left + resolvedWidth > vw - margin) {
      left = vw - resolvedWidth - margin;
    }
  }
  if (left < margin) {
    left = margin;
  }

  const spaceBelow = Math.max(0, vh - triggerRect.bottom - gap - margin);
  const spaceAbove = Math.max(0, triggerRect.top - gap - margin);
  const capHeight = options.idealMaxHeight ? Math.min(options.idealMaxHeight, maxAllowedHeight) : maxAllowedHeight;

  let placement: 'bottom' | 'top' = 'bottom';
  let top = triggerRect.bottom + gap;
  let availableHeight = Math.min(capHeight, spaceBelow);

  if (spaceBelow < measuredHeight && spaceAbove > spaceBelow) {
    placement = 'top';
    availableHeight = Math.min(capHeight, spaceAbove);
    const renderedH = Math.min(measuredHeight, availableHeight);
    top = Math.max(margin, triggerRect.top - gap - renderedH);
  } else {
    top = Math.max(margin, Math.min(top, vh - margin - Math.min(measuredHeight, Math.max(60, spaceBelow))));
    availableHeight = Math.min(capHeight, Math.max(60, vh - top - margin));
  }

  return {
    top: Math.round(top),
    left: Math.round(left),
    width: options.preferredWidth ? Math.min(maxAllowedWidth, options.preferredWidth) : undefined,
    maxWidth: `${maxAllowedWidth}px`,
    maxHeight: `${Math.max(80, Math.floor(availableHeight))}px`,
    placement,
  };
}

export function clampPointBox(
  anchorX: number,
  anchorY: number,
  menuEl: HTMLElement | null,
  options: { fallbackWidth?: number; fallbackHeight?: number; margin?: number; flipOnOverflow?: boolean } = {}
): { left: number; top: number; maxWidth: number; maxHeight: number } {
  const { vw, vh } = getViewportDimensions();
  const margin = options.margin ?? (vw < 640 ? 8 : 12);
  const maxWidth = Math.max(120, vw - margin * 2);
  const maxHeight = Math.max(80, vh - margin * 2);

  const rect = menuEl?.getBoundingClientRect();
  const actualW = Math.min(maxWidth, rect?.width || menuEl?.offsetWidth || options.fallbackWidth || 240);
  const actualH = Math.min(maxHeight, rect?.height || menuEl?.offsetHeight || options.fallbackHeight || 280);

  let left = anchorX;
  let top = anchorY;

  if (options.flipOnOverflow !== false) {
    if (left + actualW + margin > vw) {
      left = left - actualW;
    }
    if (top + actualH + margin > vh) {
      top = top - actualH;
    }
  }

  left = Math.max(margin, Math.min(left, vw - actualW - margin));
  top = Math.max(margin, Math.min(top, vh - actualH - margin));

  return {
    left: Math.round(left),
    top: Math.round(top),
    maxWidth,
    maxHeight,
  };
}
