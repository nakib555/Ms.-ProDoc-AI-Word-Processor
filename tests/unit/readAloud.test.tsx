import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReadAloudTool } from '../../components/ribbon/tabs/HomeTab/voice/ReadAloudTool';
import { EditorContext } from '../../contexts/EditorContext';

const mockEditorContextValue = (content = '<p>Hello world from document</p>'): any => ({
  content,
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
  editorRef: { current: null },
  activeElementType: 'text',
  setActiveElementType: vi.fn(),
  importState: null,
  importFile: vi.fn(),
});

describe('ReadAloudTool (BUG-001 Regression & Functionality)', () => {
  it('renders and mounts cleanly without throwing "useEffect is not defined"', () => {
    expect(() => {
      render(
        <EditorContext.Provider value={mockEditorContextValue('Hello world')}>
          <ReadAloudTool />
        </EditorContext.Provider>
      );
    }).not.toThrow();

    const button = screen.getByRole('button', { name: /Read Aloud/i }) as HTMLButtonElement;
    expect(button).toBeDefined();
    expect(button.disabled).toBe(false);
  });

  it('initiates speech synthesis on click and toggles to Stop state', () => {
    render(
      <EditorContext.Provider value={mockEditorContextValue('This is an audio test')}>
        <ReadAloudTool />
      </EditorContext.Provider>
    );

    const button = screen.getByRole('button', { name: /Read Aloud/i });
    fireEvent.click(button);

    expect(window.speechSynthesis.speak).toHaveBeenCalled();
    const stopButton = screen.getByRole('button', { name: /Stop/i });
    expect(stopButton).toBeDefined();

    // Clicking Stop cancels speech synthesis
    fireEvent.click(stopButton);
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });

  it('unmounts cleanly and calls stopAudio in cleanup without error', () => {
    const { unmount } = render(
      <EditorContext.Provider value={mockEditorContextValue('Clean unmount test')}>
        <ReadAloudTool />
      </EditorContext.Provider>
    );

    expect(() => {
      unmount();
    }).not.toThrow();
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });

  it('disables the button when document is completely empty', () => {
    render(
      <EditorContext.Provider value={mockEditorContextValue('')}>
        <ReadAloudTool />
      </EditorContext.Provider>
    );

    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
});
