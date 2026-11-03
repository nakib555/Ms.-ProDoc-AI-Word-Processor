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

  it('triggers zoom reset on double-clicking the zoom percentage bar', () => {
    const setZoomMock = vi.fn();
    const setZoomModeMock = vi.fn();
    const mockEditor = createMockEditorContext({
      zoom: 150,
      setZoom: setZoomMock,
      setZoomMode: setZoomModeMock,
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

    // Double click the zoom percentage bar to trigger handleZoomBarReset
    fireEvent.doubleClick(zoomPercentageEl);

    expect(setZoomMock).toHaveBeenCalledTimes(1);
    const updater = setZoomMock.mock.calls[0][0];
    expect(typeof updater).toBe('function');
    expect(updater(150)).toBe(100);
    expect(updater(100)).toBe(150);
    expect(setZoomModeMock).toHaveBeenCalledWith('custom');
  });

  it('triggers double tap zoom reset via touch events on the zoom bar', () => {
    const setZoomMock = vi.fn();
    const setZoomModeMock = vi.fn();
    const mockEditor = createMockEditorContext({
      zoom: 150,
      setZoom: setZoomMock,
      setZoomMode: setZoomModeMock,
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

    // Simulate two rapid touch ends
    fireEvent.touchEnd(zoomPercentageEl);
    fireEvent.touchEnd(zoomPercentageEl);

    expect(setZoomMock).toHaveBeenCalledTimes(1);
    const updater = setZoomMock.mock.calls[0][0];
    expect(typeof updater).toBe('function');
    expect(updater(150)).toBe(100);
  });
});
