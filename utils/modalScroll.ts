/**
 * Shared utilities for isolating mouse wheel scrolling inside open modal dialogs
 * and preventing background viewport / ribbon wheel hijacking.
 */

const MODAL_SELECTOR = '[data-modal-backdrop="true"], [role="dialog"][aria-modal="true"]';

export function isAnyModalOpen(): boolean {
  if (typeof document === 'undefined') return false;
  return Boolean(document.querySelector(MODAL_SELECTOR));
}

export function isEventInsideModal(target: EventTarget | null): boolean {
  if (typeof Element === 'undefined' || !(target instanceof Element)) return false;
  return Boolean(target.closest(MODAL_SELECTOR));
}

function getTopmostModalBackdrop(): Element | null {
  if (typeof document === 'undefined') return null;
  const modals = document.querySelectorAll(MODAL_SELECTOR);
  if (!modals.length) return null;
  return modals[modals.length - 1];
}

function canScrollElementInDirection(
  el: Element,
  deltaX: number,
  deltaY: number
): boolean {
  if (typeof window === 'undefined') return false;
  const style = window.getComputedStyle(el);

  const isVertical = Math.abs(deltaY) >= Math.abs(deltaX);
  if (isVertical && deltaY !== 0) {
    const oy = style.overflowY;
    if ((oy === 'auto' || oy === 'scroll' || oy === 'overlay') && el.scrollHeight > el.clientHeight + 1) {
      if (deltaY < 0 && el.scrollTop > 0) return true;
      if (deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
    }
  }

  if (!isVertical && deltaX !== 0) {
    const ox = style.overflowX;
    if ((ox === 'auto' || ox === 'scroll' || ox === 'overlay') && el.scrollWidth > el.clientWidth + 1) {
      if (deltaX < 0 && el.scrollLeft > 0) return true;
      if (deltaX > 0 && el.scrollLeft + el.clientWidth < el.scrollWidth - 1) return true;
    }
  }

  return false;
}

/**
 * Capture-phase window wheel handler:
 * - While any modal dialog is open, allows native smooth wheel scrolling
 *   for scrollable containers INSIDE the topmost modal.
 * - Blocks wheel events over backdrops, non-scrollable modal areas, or past
 *   modal scroll boundaries so the underlying document/ribbon never scrolls.
 */
export function handleGlobalModalWheel(e: WheelEvent): void {
  const topmostModal = getTopmostModalBackdrop();
  if (!topmostModal) return;

  const target = e.target instanceof Element ? e.target : null;

  // If wheel event is outside the topmost modal (e.g. page behind overlay), block it
  if (!target || !topmostModal.contains(target)) {
    if (e.cancelable) e.preventDefault();
    return;
  }

  // Allow pinch-to-zoom inside preview if explicitly handled? No, when modal is open block Ctrl+wheel browser zoom
  // Check scrollable ancestors inside the topmost modal up to (and including) the modal element
  let curr: Element | null = target;
  while (curr) {
    if (canScrollElementInDirection(curr, e.deltaX, e.deltaY)) {
      // Allow native wheel scroll inside this modal container
      return;
    }
    if (curr === topmostModal) break;
    curr = curr.parentElement;
  }

  // No scrollable container inside modal can scroll further in this direction -> prevent background scroll-chaining
  if (e.cancelable) {
    e.preventDefault();
  }
}
