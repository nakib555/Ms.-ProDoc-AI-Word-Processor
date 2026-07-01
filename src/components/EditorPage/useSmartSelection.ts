import { useRef } from 'react';

interface UseSmartSelectionProps {
  selectionMode: boolean;
  isHeaderFooterMode: boolean;
  editorRef: React.RefObject<HTMLDivElement | null>;
  handleContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const useSmartSelection = ({
  selectionMode,
  isHeaderFooterMode,
  editorRef,
  handleContextMenu,
}: UseSmartSelectionProps) => {
  const wordPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const superLongPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const smartSelectionTriggeredRef = useRef(false);

  const selectWord = () => {
    const sel = window.getSelection();
    if (sel?.modify) {
      sel.modify('move', 'backward', 'word');
      sel.modify('extend', 'forward', 'word');
    }
  };

  const selectSentence = () => {
    const sel = window.getSelection();
    if (sel?.modify) {
      try {
        sel.modify('move', 'backward', 'sentence');
        sel.modify('extend', 'forward', 'sentence');
      } catch (e) {
        sel.modify('move', 'backward', 'line');
        sel.modify('extend', 'forward', 'line');
      }
    }
  };

  const selectParagraph = (target: EventTarget | null) => {
    const sel = window.getSelection();
    if (!sel) return;
    let node = target as Node | null;
    if (node?.nodeType === Node.TEXT_NODE) node = node.parentNode;
    while (node && node !== editorRef.current && (node as HTMLElement).tagName) {
      const el = node as HTMLElement;
      if (['P', 'H1', 'H2', 'H3', 'LI', 'DIV'].includes(el.tagName)) {
        const range = document.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
        return;
      }
      node = node.parentNode;
    }
    if (sel.modify) {
      sel.modify('move', 'backward', 'paragraph');
      sel.modify('extend', 'forward', 'paragraph');
    }
  };

  const selectPage = () => {
    if (editorRef.current) {
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
  };

  const handleSmartPointerDown = (e: React.PointerEvent) => {
    if (!selectionMode) return;
    smartSelectionTriggeredRef.current = false;
    if (!isHeaderFooterMode && document.caretRangeFromPoint) {
      const range = document.caretRangeFromPoint(e.clientX, e.clientY);
      if (range && editorRef.current?.contains(range.startContainer)) {
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
    }
    pointerStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    if (wordPressTimerRef.current) clearTimeout(wordPressTimerRef.current);
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    if (superLongPressTimerRef.current) clearTimeout(superLongPressTimerRef.current);
    const target = e.target as HTMLElement;
    
    const cell = target.closest('td, th') as HTMLTableCellElement | null;
    const table = target.closest('table') as HTMLTableElement | null;

    if (cell && table && e.pointerType !== 'mouse') {
      longPressTimerRef.current = setTimeout(() => {
        const mockEvent = {
          preventDefault: () => {},
          clientX: e.clientX,
          clientY: e.clientY,
          target: e.target
        } as unknown as React.MouseEvent<HTMLDivElement>;
        handleContextMenu(mockEvent);
        smartSelectionTriggeredRef.current = true;
        if (navigator.vibrate) navigator.vibrate(50);
      }, 500);
      return;
    }

    wordPressTimerRef.current = setTimeout(() => {
      selectWord();
      smartSelectionTriggeredRef.current = true;
      if (navigator.vibrate) navigator.vibrate(20);
    }, 1000);
    longPressTimerRef.current = setTimeout(() => {
      selectParagraph(target);
      smartSelectionTriggeredRef.current = true;
      if (navigator.vibrate) navigator.vibrate(50);
    }, 2000);
    superLongPressTimerRef.current = setTimeout(() => {
      selectPage();
      smartSelectionTriggeredRef.current = true;
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    }, 3000);
  };

  const handleSmartPointerMove = (e: React.PointerEvent) => {
    if (!selectionMode || !pointerStartRef.current) return;
    if (Math.hypot(e.clientX - pointerStartRef.current.x, e.clientY - pointerStartRef.current.y) > 10) {
      if (wordPressTimerRef.current) clearTimeout(wordPressTimerRef.current);
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      if (superLongPressTimerRef.current) clearTimeout(superLongPressTimerRef.current);
      pointerStartRef.current = null;
    }
  };

  const handleSmartPointerUp = () => {
    if (!selectionMode) return;
    if (wordPressTimerRef.current) clearTimeout(wordPressTimerRef.current);
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    if (superLongPressTimerRef.current) clearTimeout(superLongPressTimerRef.current);
    pointerStartRef.current = null;
  };

  const handleSmartClick = (e: React.MouseEvent) => {
    if (!selectionMode) return;
    if (smartSelectionTriggeredRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (e.detail === 2) {
      selectSentence();
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return {
    handleSmartPointerDown,
    handleSmartPointerMove,
    handleSmartPointerUp,
    handleSmartClick,
  };
};
