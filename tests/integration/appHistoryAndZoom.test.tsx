import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React, { useRef } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { EditorProvider, useEditor } from '../../contexts/EditorContext';
import { GestureProvider } from '../../contexts/GestureContext';
import { StatusBar } from '../../components/StatusBar';
import { WebLayoutView } from '../../components/ribbon/tabs/ViewTab/views/WebLayoutView';
import PrintLayoutView from '../../components/ribbon/tabs/ViewTab/views/PrintLayoutView';

// Provide a clean ResizeObserver stub for JSDOM
class MockResizeObserver {
  private cb: ResizeObserverCallback;
  constructor(cb: ResizeObserverCallback) {
    this.cb = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

const HistoryAndZoomHarness: React.FC<{ view?: 'web' | 'print' }> = ({ view = 'web' }) => {
  const {
    content,
    setContent,
    undo,
    redo,
    canUndo,
    canRedo,
    historyApplySeq,
    pageConfig,
    setPageConfig,
    headerContent,
    setHeaderContent,
    footerContent,
    setFooterContent,
    zoom,
    setZoom,
    zoomMode,
    showRuler,
    showFormattingMarks,
    viewMode,
    setViewMode,
    registerContainer,
  } = useEditor();

  const webEditorRef = useRef<HTMLDivElement | null>(null);

  return (
    <div style={{ width: 800, height: 600, display: 'flex', flexDirection: 'column' }}>
      <div data-testid="state-probe">
        <span data-testid="can-undo">{String(canUndo)}</span>
        <span data-testid="can-redo">{String(canRedo)}</span>
        <span data-testid="history-seq">{historyApplySeq}</span>
        <span data-testid="orientation">{pageConfig.orientation}</span>
        <span data-testid="header-val">{headerContent}</span>
        <span data-testid="footer-val">{footerContent}</span>
        <span data-testid="zoom-val">{zoom}</span>
        <span data-testid="zoom-mode">{zoomMode}</span>
        <span data-testid="view-mode">{viewMode}</span>
        <div data-testid="content-val">{content}</div>
      </div>

      <button
        data-testid="btn-type"
        onClick={() => setContent('<p>Typed paragraph</p>', false, { historyMode: 'debounced' })}
      >
        Type
      </button>
      <button
        data-testid="btn-format"
        onClick={() => setContent('<p><strong>Typed paragraph</strong></p>', true, { historyMode: 'immediate' })}
      >
        Bold
      </button>
      <button
        data-testid="btn-landscape"
        onClick={() => setPageConfig(prev => ({ ...prev, orientation: 'landscape' }))}
      >
        Landscape
      </button>
      <button
        data-testid="btn-header"
        onClick={() => setHeaderContent('<p>Confidential Header</p>')}
      >
        Set Header
      </button>
      <button
        data-testid="btn-footer"
        onClick={() => setFooterContent('<p>Page Footer</p>')}
      >
        Set Footer
      </button>
      <button data-testid="btn-undo" onClick={() => undo()}>
        Undo
      </button>
      <button data-testid="btn-redo" onClick={() => redo()}>
        Redo
      </button>
      <button data-testid="btn-zoom-300" onClick={() => setZoom(300)}>
        Zoom 300
      </button>
      <button data-testid="btn-switch-web" onClick={() => setViewMode('web')}>
        Switch Web
      </button>

      {view === 'web' ? (
        <WebLayoutView
          editorRef={webEditorRef}
          content={content}
          onInput={(e) => setContent((e.currentTarget as HTMLDivElement).innerHTML, false, { historyMode: 'debounced' })}
          onPaste={() => {}}
          onPageClick={() => {}}
          pageConfig={pageConfig}
          zoom={zoom}
          showFormattingMarks={showFormattingMarks}
          backgroundStyle={{}}
        />
      ) : (
        <PrintLayoutView
          width={800}
          height={600}
          content={content}
          setContent={setContent}
          pageConfig={pageConfig}
          zoom={zoom}
          showRuler={showRuler}
          showFormattingMarks={showFormattingMarks}
          containerRef={registerContainer}
        />
      )}

      <StatusBar position="bottom" />
    </div>
  );
};

describe('App History, GestureProvider Stability, & Zoomed Overflow Integration', () => {
  const originalResizeObserver = globalThis.ResizeObserver;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    localStorage.clear();
    globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    globalThis.ResizeObserver = originalResizeObserver;
  });

  it('performs multi-step undo/redo across content, formatting, pageConfig, and headers without GestureProvider render errors', async () => {
    render(
      <ThemeProvider>
        <EditorProvider>
          <GestureProvider>
            <HistoryAndZoomHarness view="web" />
          </GestureProvider>
        </EditorProvider>
      </ThemeProvider>
    );

    const initialContent = screen.getByTestId('content-val').textContent;
    expect(screen.getByTestId('can-undo').textContent).toBe('false');
    expect(screen.getByTestId('can-redo').textContent).toBe('false');

    // Step 1: Debounced typing followed by immediate formatting (must flush typing first)
    act(() => {
      fireEvent.click(screen.getByTestId('btn-type'));
    });
    act(() => {
      fireEvent.click(screen.getByTestId('btn-format'));
    });

    expect(screen.getByTestId('content-val').textContent).toContain('<strong>Typed paragraph</strong>');
    expect(screen.getByTestId('can-undo').textContent).toBe('true');

    // Step 2: Change pageConfig orientation
    act(() => {
      fireEvent.click(screen.getByTestId('btn-landscape'));
    });
    expect(screen.getByTestId('orientation').textContent).toBe('landscape');

    // Step 3: Change header & footer
    act(() => {
      fireEvent.click(screen.getByTestId('btn-header'));
    });
    act(() => {
      fireEvent.click(screen.getByTestId('btn-footer'));
    });
    expect(screen.getByTestId('header-val').textContent).toBe('<p>Confidential Header</p>');
    expect(screen.getByTestId('footer-val').textContent).toBe('<p>Page Footer</p>');

    // Undo footer
    act(() => {
      fireEvent.click(screen.getByTestId('btn-undo'));
    });
    expect(screen.getByTestId('footer-val').textContent).toBe('');
    expect(screen.getByTestId('can-redo').textContent).toBe('true');

    // Undo header
    act(() => {
      fireEvent.click(screen.getByTestId('btn-undo'));
    });
    expect(screen.getByTestId('header-val').textContent).toBe('');

    // Undo landscape -> back to portrait
    act(() => {
      fireEvent.click(screen.getByTestId('btn-undo'));
    });
    expect(screen.getByTestId('orientation').textContent).toBe('portrait');

    // Undo bold format -> back to typed paragraph
    act(() => {
      fireEvent.click(screen.getByTestId('btn-undo'));
    });
    expect(screen.getByTestId('content-val').textContent).toBe('<p>Typed paragraph</p>');

    // Undo typing -> back to initial content
    act(() => {
      fireEvent.click(screen.getByTestId('btn-undo'));
    });
    expect(screen.getByTestId('content-val').textContent).toBe(initialContent);
    expect(screen.getByTestId('can-undo').textContent).toBe('false');

    // Redo step by step back to bold and landscape
    act(() => {
      fireEvent.click(screen.getByTestId('btn-redo'));
      fireEvent.click(screen.getByTestId('btn-redo'));
      fireEvent.click(screen.getByTestId('btn-redo'));
    });
    expect(screen.getByTestId('content-val').textContent).toContain('<strong>Typed paragraph</strong>');
    expect(screen.getByTestId('orientation').textContent).toBe('landscape');

    // Also trigger StatusBar zoom double-click while GestureProvider is mounted -> auto-fit screen
    const zoomText = screen.getByText('100%');
    act(() => {
      fireEvent.doubleClick(zoomText);
    });
    expect(screen.getByTestId('zoom-mode').textContent).toBe('fit-width');

    // Assert zero React setState-in-render or ResizeObserver errors
    const loggedErrors = consoleErrorSpy.mock.calls.map((args) => args.join(' '));
    const renderPhaseErrors = loggedErrors.filter((msg) =>
      msg.includes('Cannot update a component') ||
      msg.includes('ResizeObserver loop') ||
      msg.includes('GestureProvider')
    );
    expect(renderPhaseErrors).toEqual([]);
  });

  it('maintains overflow:auto and scaled wrapper bounds with padding in WebLayoutView when zoomed to 300%', () => {
    const { container } = render(
      <ThemeProvider>
        <EditorProvider>
          <GestureProvider>
            <HistoryAndZoomHarness view="web" />
          </GestureProvider>
        </EditorProvider>
      </ThemeProvider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('btn-zoom-300'));
    });

    expect(screen.getByTestId('zoom-val').textContent).toBe('300');

    // Find the overflow-auto scroll container in WebLayoutView
    const scrollEl = container.querySelector('.overflow-auto') as HTMLElement | null;
    expect(scrollEl).not.toBeNull();
    expect(scrollEl!.style.overflow).toBe('auto');

    // Inner padded wrapper preserves 32px clearance on all 4 sides
    const paddedWrapper = scrollEl!.firstElementChild as HTMLElement | null;
    expect(paddedWrapper).not.toBeNull();
    expect(paddedWrapper!.style.padding).toBe('32px');
    expect(paddedWrapper!.style.width).toBe('max-content');

    // Scaled spacer inside paddedWrapper uses 3x basePageWidth (default fallback 896 * 3 = 2688)
    const scaledSpacer = paddedWrapper!.firstElementChild as HTMLElement | null;
    expect(scaledSpacer).not.toBeNull();
    expect(parseInt(scaledSpacer!.style.width, 10)).toBeGreaterThanOrEqual(2400);
    expect(parseInt(scaledSpacer!.style.height, 10)).toBeGreaterThanOrEqual(1200);

    const loggedErrors = consoleErrorSpy.mock.calls.map((args) => args.join(' '));
    expect(loggedErrors.filter((m) => m.includes('Cannot update a component') || m.includes('ResizeObserver loop'))).toEqual([]);
  });

  it('maintains overflow:auto and explicit zoomed canvas bounds with padding in PrintLayoutView at 300%', () => {
    const { container } = render(
      <ThemeProvider>
        <EditorProvider>
          <GestureProvider>
            <HistoryAndZoomHarness view="print" />
          </GestureProvider>
        </EditorProvider>
      </ThemeProvider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('btn-zoom-300'));
    });

    const printRoot = container.querySelector('.print-layout-mode') as HTMLElement | null;
    expect(printRoot).not.toBeNull();

    const scrollContainer = printRoot!.querySelector('.overflow-auto') as HTMLElement | null;
    expect(scrollContainer).not.toBeNull();
    expect(scrollContainer!.style.overflow).toBe('auto');

    const canvasWrapper = scrollContainer!.firstElementChild as HTMLElement | null;
    expect(canvasWrapper).not.toBeNull();
    expect(canvasWrapper!.style.padding).toBe('32px');
    // At 300% zoom, Letter portrait (8.5in * 96dpi * 3 = 2448px) + 64px padding = 2512px
    expect(parseInt(canvasWrapper!.style.width, 10)).toBeGreaterThanOrEqual(2500);
    // At 300% zoom, height >= 11in * 96dpi * 3 + 64 = 3232px
    expect(parseInt(canvasWrapper!.style.height, 10)).toBeGreaterThanOrEqual(3200);

    const loggedErrors = consoleErrorSpy.mock.calls.map((args) => args.join(' '));
    expect(loggedErrors.filter((m) => m.includes('Cannot update a component') || m.includes('ResizeObserver loop'))).toEqual([]);
  });
});
