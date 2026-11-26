import { describe, it, expect, vi, afterEach } from 'vitest';
import React, { useRef, useState } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { GestureProvider, useGestureContext, isEditableElementActive } from '../../contexts/GestureContext';
import { useTouchZoom } from '../../hooks/useTouchZoom';
import { EditorContext } from '../../contexts/EditorContext';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { WebLayoutView } from '../../components/ribbon/tabs/ViewTab/views/WebLayoutView';
import { PrintLayoutView } from '../../components/ribbon/tabs/ViewTab/views/PrintLayoutView';
import { PageConfig } from '../../types';

vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: ({ count }: { count: number }) => ({
    getVirtualItems: () =>
      Array.from({ length: count }, (_, index) => ({
        index,
        key: index,
        start: index * 1088,
        size: 1056,
      })),
    getTotalSize: () => count * 1088,
    measureElement: vi.fn(),
    measure: vi.fn(),
    scrollToIndex: vi.fn(),
  }),
}));

const TEST_PAGE_CONFIG: PageConfig = {
  size: 'Letter',
  orientation: 'portrait',
  margins: { top: 1, bottom: 1, left: 1, right: 1, gutter: 0 },
  headerDistance: 0.5,
  footerDistance: 0.5,
  columns: 1,
  columnGap: 0.5,
};

const createMockEditorContext = (overrides: Record<string, any> = {}): any => ({
  content: '<p>Hello world</p>',
  setContent: vi.fn(),
  undo: vi.fn(),
  redo: vi.fn(),
  canUndo: false,
  canRedo: false,
  historyApplySeq: 0,
  title: 'Mobile Keyboard Test',
  setTitle: vi.fn(),
  viewMode: 'print',
  setViewMode: vi.fn(),
  pageConfig: TEST_PAGE_CONFIG,
  setPageConfig: vi.fn(),
  zoom: 100,
  setZoom: vi.fn(),
  zoomMode: 'custom',
  setZoomMode: vi.fn(),
  zoomLayout: 'single',
  setZoomLayout: vi.fn(),
  calibrationScale: 1,
  measurementUnit: 'inches',
  setMeasurementUnit: vi.fn(),
  openPageSetup: vi.fn(),
  theme: 'light',
  setTheme: vi.fn(),
  isTableResizing: false,
  activeEditingArea: 'body',
  setActiveEditingArea: vi.fn(),
  saveStatus: 'saved',
  headerContent: '',
  setHeaderContent: vi.fn(),
  footerContent: '',
  setFooterContent: vi.fn(),
  firstHeaderContent: '',
  setFirstHeaderContent: vi.fn(),
  firstFooterContent: '',
  setFirstFooterContent: vi.fn(),
  currentPage: 1,
  setCurrentPage: vi.fn(),
  goToPage: vi.fn(),
  pageJumpTarget: null,
  totalPages: 1,
  setTotalPages: vi.fn(),
  pageMovement: 'vertical',
  setPageMovement: vi.fn(),
  showRuler: false,
  setShowRuler: vi.fn(),
  showFormattingMarks: false,
  setShowFormattingMarks: vi.fn(),
  showPageSetup: false,
  setShowPageSetup: vi.fn(),
  isFullScreen: false,
  setIsFullScreen: vi.fn(),
  wordCount: 2,
  isKeyboardLocked: false,
  setIsKeyboardLocked: vi.fn(),
  isTableResizerEnabled: false,
  setIsTableResizerEnabled: vi.fn(),
  selectionMode: false,
  setSelectionMode: vi.fn(),
  setActiveElementType: vi.fn(),
  editorRef: { current: null },
  footnotes: [],
  endnotes: [],
  updateFootnote: vi.fn(),
  removeFootnote: vi.fn(),
  updateEndnote: vi.fn(),
  removeEndnote: vi.fn(),
  applyFormatPainterToSelection: vi.fn(),
  formatPainterStyles: null,
  ...overrides,
});

const GestureHarness: React.FC = () => {
  const { isGestureLocked, triggerGestureLock } = useGestureContext();
  return (
    <div>
      <div
        data-testid="editable"
        className="prodoc-editor"
        contentEditable={!isGestureLocked}
        inputMode={isGestureLocked ? 'none' : 'text'}
        tabIndex={0}
        suppressContentEditableWarning
      >
        Typing
      </div>
      <div data-testid="lock-state">{String(isGestureLocked)}</div>
      <button
        type="button"
        data-testid="soft-lock"
        onClick={() => triggerGestureLock(400, { blurActive: false, skipIfEditing: true })}
      >
        Soft Lock
      </button>
      <button
        type="button"
        data-testid="pinch-lock"
        onClick={() => triggerGestureLock(400, { blurActive: true, skipIfEditing: false })}
      >
        Pinch Lock
      </button>
    </div>
  );
};

const TouchZoomHarness: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { isGestureLocked } = useGestureContext();
  useTouchZoom({
    containerRef,
    contentRef,
    zoom: 100,
    setZoom: vi.fn(),
  });

  return (
    <div ref={containerRef} data-testid="touch-container">
      <div
        ref={contentRef}
        data-testid="touch-editor"
        className="prodoc-editor"
        contentEditable={!isGestureLocked}
        inputMode={isGestureLocked ? 'none' : 'text'}
        tabIndex={0}
        suppressContentEditableWarning
      >
        Hello mobile
      </div>
      <div data-testid="touch-lock-state">{String(isGestureLocked)}</div>
    </div>
  );
};

describe('Mobile Keyboard Stability', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('skipIfEditing prevents blurring or locking when editor is actively focused', () => {
    const { getByTestId } = render(
      <GestureProvider>
        <GestureHarness />
      </GestureProvider>
    );

    const editable = getByTestId('editable');
    act(() => {
      editable.focus();
    });

    expect(document.activeElement).toBe(editable);
    expect(isEditableElementActive()).toBe(true);

    fireEvent.click(getByTestId('soft-lock'));
    expect(getByTestId('lock-state').textContent).toBe('false');
    expect(editable.getAttribute('contenteditable')).toBe('true');
    expect(editable.getAttribute('inputmode')).toBe('text');
    expect(document.activeElement).toBe(editable);

    fireEvent.click(getByTestId('pinch-lock'));
    expect(getByTestId('lock-state').textContent).toBe('true');
    expect(document.activeElement).not.toBe(editable);
  });

  it('does not lock or blur focused editor on 1-finger touch move, but locks on 2-finger pinch', () => {
    const { getByTestId } = render(
      <GestureProvider>
        <TouchZoomHarness />
      </GestureProvider>
    );

    const container = getByTestId('touch-container');
    const editor = getByTestId('touch-editor');

    act(() => {
      editor.focus();
    });
    expect(document.activeElement).toBe(editor);

    // 1-finger move (> 14px) while actively editing should keep focus and unlocked keyboard
    fireEvent.touchStart(container, {
      touches: [{ clientX: 100, clientY: 100 }],
    });
    fireEvent.touchMove(container, {
      touches: [{ clientX: 100, clientY: 140 }],
    });

    expect(getByTestId('touch-lock-state').textContent).toBe('false');
    expect(document.activeElement).toBe(editor);
    expect(editor.getAttribute('inputmode')).toBe('text');

    // 2-finger pinch DOES intentionally engage gesture lock
    fireEvent.touchStart(container, {
      touches: [
        { clientX: 100, clientY: 100 },
        { clientX: 200, clientY: 100 },
      ],
    });
    expect(getByTestId('touch-lock-state').textContent).toBe('true');
    expect(document.activeElement).not.toBe(editor);
  });

  it('keeps contentEditable and focus intact when WebLayoutView scrolls and during IME composition', () => {
    const editorRef = React.createRef<HTMLDivElement | null>();

    const WebHarness: React.FC = () => {
      const [html, setHtml] = useState('<p>Initial line</p>');
      const mockCtx = createMockEditorContext({ content: html, setContent: setHtml });
      return (
        <ThemeProvider>
          <GestureProvider>
            <EditorContext.Provider value={mockCtx}>
              <button
                type="button"
                data-testid="external-update"
                onClick={() => setHtml('<p>External overwrite</p>')}
              >
                Update
              </button>
              <WebLayoutView
                editorRef={editorRef}
                content={html}
                onInput={(e) => setHtml(e.currentTarget.innerHTML)}
                onPaste={vi.fn()}
                onPageClick={vi.fn()}
                pageConfig={TEST_PAGE_CONFIG}
                zoom={100}
                showFormattingMarks={false}
                backgroundStyle={{}}
              />
            </EditorContext.Provider>
          </GestureProvider>
        </ThemeProvider>
      );
    };

    const { getByTestId } = render(<WebHarness />);
    const editableEl = editorRef.current!;
    expect(editableEl).toBeTruthy();

    act(() => {
      editableEl.focus();
    });
    expect(document.activeElement).toBe(editableEl);

    const scrollContainer = editableEl.closest('.overflow-auto') as HTMLElement;
    expect(scrollContainer).toBeTruthy();
    fireEvent.scroll(scrollContainer);

    // Scrolling must NEVER blur or switch inputMode="none"
    expect(document.activeElement).toBe(editableEl);
    expect(editableEl.getAttribute('contenteditable')).toBe('true');
    expect(editableEl.getAttribute('inputmode')).toBe('text');

    // Active IME composition must not get wiped by external content re-sync
    fireEvent.compositionStart(editableEl);
    editableEl.innerHTML = '<p>Typing composing</p>';
    fireEvent.click(getByTestId('external-update'));
    expect(editableEl.innerHTML).toBe('<p>Typing composing</p>');

    fireEvent.compositionEnd(editableEl);
    expect(editableEl.getAttribute('contenteditable')).toBe('true');
    expect(document.activeElement).toBe(editableEl);
  });

  it('keeps PrintLayoutView focused, editable, and preserves live DOM when scrolling or pressing Enter', () => {
    const PrintHarness: React.FC = () => {
      const [html, setHtml] = useState('<p>Line one</p>');
      const mockCtx = createMockEditorContext({
        content: html,
        setContent: (next: string) => setHtml(next),
      });
      return (
        <ThemeProvider>
          <GestureProvider>
            <EditorContext.Provider value={mockCtx}>
              <PrintLayoutView
                width={390}
                height={700}
                content={html}
                setContent={(next) => setHtml(next)}
                pageConfig={TEST_PAGE_CONFIG}
                zoom={100}
                showRuler={false}
                showFormattingMarks={false}
                containerRef={vi.fn()}
              />
            </EditorContext.Provider>
          </GestureProvider>
        </ThemeProvider>
      );
    };

    const { container } = render(<PrintHarness />);
    const pageEditor = container.querySelector('#prodoc-editor-1') as HTMLDivElement;
    expect(pageEditor).toBeTruthy();

    act(() => {
      pageEditor.focus();
    });
    expect(document.activeElement).toBe(pageEditor);
    expect(pageEditor.getAttribute('contenteditable')).toBe('true');
    expect(pageEditor.getAttribute('inputmode')).toBe('text');

    // Simulate container scroll triggered when virtual keyboard opens or Enter scrolls view
    const scrollViewport = container.querySelector('.overflow-auto') as HTMLElement;
    fireEvent.scroll(scrollViewport);

    expect(document.activeElement).toBe(pageEditor);
    expect(pageEditor.getAttribute('contenteditable')).toBe('true');
    expect(pageEditor.getAttribute('inputmode')).toBe('text');

    // Simulate pressing Enter in mobile contentEditable (inserting a new paragraph/line)
    fireEvent.keyDown(pageEditor, { key: 'Enter', code: 'Enter' });
    pageEditor.innerHTML = '<p>Line one</p><div><br></div>';
    fireEvent.input(pageEditor);

    expect(document.activeElement).toBe(pageEditor);
    expect(pageEditor.getAttribute('contenteditable')).toBe('true');
    expect(pageEditor.getAttribute('inputmode')).toBe('text');
  });
});
