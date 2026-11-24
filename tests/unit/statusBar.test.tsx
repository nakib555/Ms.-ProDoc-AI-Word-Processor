import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StatusBar } from '../../components/StatusBar';
import { EditorContext } from '../../contexts/EditorContext';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { GestureProvider } from '../../contexts/GestureContext';

const createMockEditorContext = (overrides = {}): any => ({
  content: '<p>Document content testing status bar</p>',
  setContent: vi.fn(),
  undo: vi.fn(),
  redo: vi.fn(),
  canUndo: false,
  canRedo: false,
  historyApplySeq: 0,
  title: 'Test Document',
  setTitle: vi.fn(),
  viewMode: 'print',
  setViewMode: vi.fn(),
  pageConfig: { size: 'Letter', orientation: 'portrait', margins: { top: 72, right: 72, bottom: 72, left: 72 } },
  setPageConfig: vi.fn(),
  zoom: 100,
  setZoom: vi.fn(),
  zoomMode: 'custom',
  setZoomMode: vi.fn(),
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
  currentPage: 1,
  setCurrentPage: vi.fn(),
  goToPage: vi.fn(),
  pageJumpTarget: null,
  totalPages: 5,
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
  wordCount: 42,
  isKeyboardLocked: false,
  setIsKeyboardLocked: vi.fn(),
  isTableResizerEnabled: false,
  setIsTableResizerEnabled: vi.fn(),
  selectionMode: 'text',
  setSelectionMode: vi.fn(),
  ...overrides,
});

describe('StatusBar Component', () => {
  it('renders StatusBar and its zoom controls without runtime errors', () => {
    const mockEditor = createMockEditorContext();

    render(
      <ThemeProvider>
        <GestureProvider>
          <EditorContext.Provider value={mockEditor}>
            <StatusBar position="bottom" />
          </EditorContext.Provider>
        </GestureProvider>
      </ThemeProvider>
    );

    // Verify page counter and zoom percentage
    expect(screen.getByText(/Page 1 of 5/i)).toBeDefined();
    expect(screen.getByText('100%')).toBeDefined();
  });

  it('triggers auto-fit screen on double-clicking the zoom percentage number', () => {
    const setZoomModeMock = vi.fn();
    const setZoomLayoutMock = vi.fn();
    const setPageMovementMock = vi.fn();
    const mockEditor = createMockEditorContext({
      zoom: 150,
      setZoomMode: setZoomModeMock,
      setZoomLayout: setZoomLayoutMock,
      setPageMovement: setPageMovementMock,
    });

    render(
      <ThemeProvider>
        <GestureProvider>
          <EditorContext.Provider value={mockEditor}>
            <StatusBar position="bottom" />
          </EditorContext.Provider>
        </GestureProvider>
      </ThemeProvider>
    );

    const zoomPercentageEl = screen.getByText('150%');
    expect(zoomPercentageEl).toBeDefined();

    // Double click the zoom percentage number to return to auto-fit screen
    fireEvent.doubleClick(zoomPercentageEl);

    expect(setPageMovementMock).toHaveBeenCalledWith('vertical');
    expect(setZoomLayoutMock).toHaveBeenCalledWith('single');
    expect(setZoomModeMock).toHaveBeenCalledWith('fit-width');
  });

  it('triggers double tap auto-fit screen via touch events on the zoom percentage number', () => {
    const setZoomModeMock = vi.fn();
    const setZoomLayoutMock = vi.fn();
    const setPageMovementMock = vi.fn();
    const mockEditor = createMockEditorContext({
      zoom: 150,
      setZoomMode: setZoomModeMock,
      setZoomLayout: setZoomLayoutMock,
      setPageMovement: setPageMovementMock,
    });

    render(
      <ThemeProvider>
        <GestureProvider>
          <EditorContext.Provider value={mockEditor}>
            <StatusBar position="bottom" />
          </EditorContext.Provider>
        </GestureProvider>
      </ThemeProvider>
    );

    const zoomPercentageEl = screen.getByText('150%');

    // Simulate two rapid touch ends on the zoom percentage number
    fireEvent.touchEnd(zoomPercentageEl);
    fireEvent.touchEnd(zoomPercentageEl);

    expect(setPageMovementMock).toHaveBeenCalledWith('vertical');
    expect(setZoomLayoutMock).toHaveBeenCalledWith('single');
    expect(setZoomModeMock).toHaveBeenCalledWith('fit-width');
  });
});
