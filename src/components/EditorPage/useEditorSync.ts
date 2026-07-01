import { useLayoutEffect } from 'react';

export const getTextLength = (node: Node): number => {
  if (node.nodeType === Node.TEXT_NODE) return (node.nodeValue || "").length;
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as HTMLElement;
    if (el.tagName === 'MATH-FIELD' || el.classList.contains('prodoc-page-break') || el.tagName === 'BR') return 1;
  }
  let len = 0;
  node.childNodes.forEach((c) => (len += getTextLength(c)));
  return len;
};

export const getCaretCharacterOffsetWithin = (element: HTMLElement) => {
  let caretOffset = 0;
  const doc = element.ownerDocument || document;
  const win = doc.defaultView || window;
  const sel = win.getSelection();
  if (sel && sel.rangeCount > 0) {
    try {
      const range = sel.getRangeAt(0);
      if (element.contains(range.startContainer)) {
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } catch (_e) {
      // ignore
    }
  }
  return caretOffset;
};

export const setCaretPosition = (element: HTMLElement, offset: number): boolean => {
  let charIndex = 0;
  const range = document.createRange();
  range.setStart(element, 0);
  range.collapse(true);
  const nodeStack: Node[] = [element];
  let node: Node | undefined;
  let found = false;

  while (!found && (node = nodeStack.pop())) {
    if (node.nodeType === 3) {
      const nextCharIndex = charIndex + (node.nodeValue || "").length;
      if (offset >= charIndex && offset <= nextCharIndex) {
        range.setStart(node, offset - charIndex);
        range.collapse(true);
        found = true;
      }
      charIndex = nextCharIndex;
    } else {
      let i = node.childNodes.length;
      while (i--) nodeStack.push(node.childNodes[i]);
    }
  }

  if (found) {
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
  return found;
};

interface UseEditorSyncProps {
  content: string;
  editorRef: React.RefObject<HTMLDivElement | null>;
  pageNumber: number;
  totalPages: number;
  selectedImage: HTMLElement | null;
}

export const useEditorSync = ({
  content,
  editorRef,
  pageNumber,
  totalPages,
  selectedImage,
}: UseEditorSyncProps) => {
  useLayoutEffect(() => {
    if (editorRef.current) {
      const activeEl = document.activeElement;
      const isMathFieldFocused = activeEl && activeEl.tagName.toLowerCase() === 'math-field' && editorRef.current.contains(activeEl);
      if (isMathFieldFocused) return;
      if (selectedImage) return;

      if (editorRef.current.innerHTML !== content) {
        const isFocused = document.activeElement === editorRef.current || editorRef.current.contains(document.activeElement);
        let savedOffset = 0;
        if (isFocused) savedOffset = getCaretCharacterOffsetWithin(editorRef.current);

        editorRef.current.innerHTML = content;

        if (isFocused) {
          const newContentLength = getTextLength(editorRef.current);
          if (savedOffset <= newContentLength) {
            editorRef.current.focus();
            try {
              setCaretPosition(editorRef.current, savedOffset);
            } catch (_e) {
              /* ignore */
            }
          }
        }
      }
    }
  }, [content, pageNumber, totalPages, selectedImage, editorRef]);
};
