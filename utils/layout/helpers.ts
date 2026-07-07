export const isAtomicElement = (node: Node): boolean => {
  if (node.nodeType !== Node.ELEMENT_NODE) return false;
  const el = node as HTMLElement;
  return ['IMG', 'VIDEO', 'IFRAME', 'HR', 'MATH-FIELD'].includes(el.tagName) ||
         el.classList.contains('equation-wrapper') ||
         el.classList.contains('prodoc-page-break') ||
         el.getAttribute('data-type') === 'page-break' ||
         el.classList.contains('prodoc-section-break');
};

export const containsPageBreak = (node: Node): boolean => {
  if (node.nodeType !== Node.ELEMENT_NODE) return false;
  const el = node as HTMLElement;
  if (el.classList.contains('prodoc-page-break') || el.getAttribute('data-type') === 'page-break') return true;
  return !!el.querySelector('.prodoc-page-break, [data-type="page-break"]');
};
