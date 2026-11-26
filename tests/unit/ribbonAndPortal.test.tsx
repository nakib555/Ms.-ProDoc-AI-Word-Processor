import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../../App';
import { Ribbon } from '../../components/Ribbon';
import { TableDesignTab } from '../../components/ribbon/tabs/InsertTab/tables/tabledesign_subTab/tabledesign';
import { TableLayoutTab } from '../../components/ribbon/tabs/InsertTab/tables/tablelayout_subTab/tablelayout';
import { ShowCommentsTool } from '../../components/ribbon/tabs/ReviewTab/comments/ShowCommentsTool';
import { FormatTray } from '../../components/studio/trays/FormatTray';
import { SmartSelect } from '../../components/ui/SmartSelect';
import { SmartToggle } from '../../components/ui/SmartToggle';
import { RibbonTab } from '../../types';
import { EditorContext } from '../../contexts/EditorContext';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { GestureProvider } from '../../contexts/GestureContext';
import { DocumentModelProvider } from '../../contexts/DocumentModelContext';

const createMockEditorContext = (overrides: Record<string, unknown> = {}): any => ({
  content: '<table><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody></table>',
  setContent: vi.fn(),
  undo: vi.fn(),
  redo: vi.fn(),
  canUndo: false,
  canRedo: false,
  historyApplySeq: 0,
  title: 'Test Document',
  setTitle: vi.fn(),
  documentTitle: 'Test Document',
  setDocumentTitle: vi.fn(),
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
  totalPages: 1,
  setTotalPages: vi.fn(),
  pageMovement: 'vertical',
  setPageMovement: vi.fn(),
  showRuler: false,
  setShowRuler: vi.fn(),
  showFormattingMarks: false,
  setShowFormattingMarks: vi.fn(),
  showComments: false,
  setShowComments: vi.fn(),
  showDocumentText: true,
  setShowDocumentText: vi.fn(),
  showPageSetup: false,
  setShowPageSetup: vi.fn(),
  isFullScreen: false,
  setIsFullScreen: vi.fn(),
  wordCount: 2,
  isKeyboardLocked: false,
  setIsKeyboardLocked: vi.fn(),
  isTableResizerEnabled: false,
  setIsTableResizerEnabled: vi.fn(),
  selectionMode: 'text',
  setSelectionMode: vi.fn(),
  executeCommand: vi.fn(),
  applyAdvancedStyle: vi.fn(),
  applyBlockStyle: vi.fn(),
  showToast: vi.fn(),
  activeTab: RibbonTab.TABLE_DESIGN,
  setActiveTab: vi.fn(),
  activeSubTab: null,
  setActiveSubTab: vi.fn(),
  isInTable: true,
  isInEquation: false,
  isInHeaderFooter: false,
  editor: null,
  customStyles: [],
  addCustomStyle: vi.fn(),
  applyCustomStyle: vi.fn(),
  ...overrides,
});

const Providers: React.FC<{ children: React.ReactNode; contextOverrides?: Record<string, unknown>; mockContext?: any }> = ({
  children,
  contextOverrides,
  mockContext,
}) => {
  const mockEditor = mockContext || createMockEditorContext(contextOverrides);
  return (
    <ThemeProvider>
      <GestureProvider>
        <EditorContext.Provider value={mockEditor}>
          <DocumentModelProvider>
            {children}
          </DocumentModelProvider>
        </EditorContext.Provider>
      </GestureProvider>
    </ThemeProvider>
  );
};

describe('Ribbon & MenuPortal Dropdown Rendering', () => {
  it('renders TableDesignTab dropdowns via fixed MenuPortal into document.body without clipping', () => {
    const { container } = render(
      <Providers>
        <TableDesignTab />
      </Providers>
    );

    const shadingBtn = screen.getByText('Shading').closest('button');
    expect(shadingBtn).toBeTruthy();
    fireEvent.click(shadingBtn!);

    // MenuPortal renders into document.body with fixed positioning, outside the inline container
    const shadingHeading = screen.getByText('Cell Shading');
    expect(shadingHeading).toBeTruthy();
    expect(container.contains(shadingHeading)).toBe(false);

    const portalWrapper = shadingHeading.closest('div.rounded-xl') as HTMLElement | null;
    expect(portalWrapper).toBeTruthy();
    expect(portalWrapper?.style.position).toBe('fixed');
  });

  it('supports one-click switching between MenuPortal triggers, Escape close, and aria-expanded sync', () => {
    render(
      <Providers>
        <TableDesignTab />
      </Providers>
    );

    const shadingBtn = screen.getByText('Shading').closest('button')!;
    const bordersBtn = screen.getByText('Borders').closest('button')!;

    expect(shadingBtn.getAttribute('aria-expanded')).not.toBe('true');

    fireEvent.click(shadingBtn);
    expect(shadingBtn.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Cell Shading')).toBeTruthy();

    // Clicking another trigger directly switches menus in one click (no full-screen overlay interception)
    fireEvent.pointerDown(bordersBtn);
    fireEvent.click(bordersBtn);
    expect(bordersBtn.getAttribute('aria-expanded')).toBe('true');
    expect(shadingBtn.getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByText('All Borders')).toBeTruthy();

    // Pressing Escape dismisses active menu
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(bordersBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders TableLayoutTab Select and AutoFit dropdowns via MenuPortal into document.body', () => {
    const { container } = render(
      <Providers>
        <TableLayoutTab />
      </Providers>
    );

    const selectBtn = screen.getByText('Select').closest('button');
    expect(selectBtn).toBeTruthy();
    fireEvent.click(selectBtn!);

    const selectCellOption = screen.getByText('Select Cell');
    expect(selectCellOption).toBeTruthy();
    expect(container.contains(selectCellOption)).toBe(false);
    const portalWrapper = selectCellOption.closest('div.rounded-xl') as HTMLElement | null;
    expect(portalWrapper).toBeTruthy();
    expect(portalWrapper?.style.position).toBe('fixed');
  });

  it('renders Ribbon with unified height and section dividers for Table Design', () => {
    const { container } = render(
      <Providers>
        <Ribbon activeTab={RibbonTab.TABLE_DESIGN} onTabChange={vi.fn()} />
      </Providers>
    );

    expect(screen.getByTitle('Table Style Options')).toBeTruthy();
    expect(screen.getByTitle('Table Styles')).toBeTruthy();
    expect(screen.getAllByTitle('Borders').length).toBeGreaterThanOrEqual(1);

    const scrollPanel = container.querySelector('.min-h-\\[108px\\]');
    expect(scrollPanel).toBeTruthy();
  });
});

describe('Smart Dropdowns & Toggles', () => {
  it('supports SmartSelect search filtering and keyboard navigation with ArrowDown + Enter', () => {
    const handleChange = vi.fn();
    render(
      <SmartSelect
        ariaLabel="Font Selector"
        value="inter"
        onChange={handleChange}
        searchable
        options={[
          { value: 'inter', label: 'Inter' },
          { value: 'roboto', label: 'Roboto' },
          { value: 'merriweather', label: 'Merriweather' },
        ]}
      />
    );

    const trigger = screen.getByRole('button', { name: 'Font Selector' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    const searchInput = screen.getByPlaceholderText('Filter options...');
    fireEvent.change(searchInput, { target: { value: 'meri' } });
    expect(screen.queryByRole('option', { name: 'Roboto' })).toBeNull();

    // Clear search and test ArrowDown -> Enter on second option (Roboto)
    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith('roboto');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('toggles SmartToggle switch aria-checked state cleanly', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <SmartToggle label="Repeat Header Row" checked={false} onChange={onChange} />
    );

    const toggle = screen.getByRole('switch');
    expect(toggle.getAttribute('aria-checked')).toBe('false');

    fireEvent.click(toggle);
    expect(onChange).toHaveBeenCalledWith(true);

    rerender(<SmartToggle label="Repeat Header Row" checked={true} onChange={onChange} />);
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });

  it('toggles ShowCommentsTool active aria-pressed state via EditorContext', () => {
    const setShowComments = vi.fn();
    const { rerender } = render(
      <Providers contextOverrides={{ showComments: false, setShowComments }}>
        <ShowCommentsTool />
      </Providers>
    );

    const btn = screen.getByText('Show Comments').closest('button')!;
    expect(btn.getAttribute('aria-pressed')).toBe('false');

    fireEvent.click(btn);
    expect(setShowComments).toHaveBeenCalledWith(true);

    rerender(
      <Providers contextOverrides={{ showComments: true, setShowComments }}>
        <ShowCommentsTool />
      </Providers>
    );
    expect(screen.getByText('Show Comments').closest('button')!.getAttribute('aria-pressed')).toBe('true');
  });

  it('applies lineHeight block style when selecting Line Spacing in FormatTray', () => {
    const mockCtx = createMockEditorContext();
    render(
      <Providers mockContext={mockCtx}>
        <FormatTray />
      </Providers>
    );

    const spacingTrigger = screen.getByTitle('Line Spacing');
    fireEvent.click(spacingTrigger);

    const opt15 = screen.getByText('1.5 Spacing');
    fireEvent.click(opt15);

    expect(mockCtx.applyBlockStyle).toHaveBeenCalledWith({ lineHeight: '1.5' });
  });
});

describe('Equation Studio Toolbox & Tab Switching', () => {
  it('renders EquationTab (Tools, Conversions, Symbols, Structures) when activeTab is RibbonTab.EQUATION and never shows coming soon text', () => {
    render(
      <Providers contextOverrides={{ activeElementType: 'equation' }}>
        <Ribbon activeTab={RibbonTab.EQUATION} onTabChange={vi.fn()} />
      </Providers>
    );

    expect(screen.getByTitle('Tools')).toBeTruthy();
    expect(screen.getByTitle('Conversions')).toBeTruthy();
    expect(screen.getByTitle('Symbols')).toBeTruthy();
    expect(screen.getByTitle('Structures')).toBeTruthy();
    expect(screen.queryByText(/Tools coming soon/i)).toBeNull();
  });

  it('auto-switches to RibbonTab.EQUATION when activeElementType becomes equation', () => {
    const onTabChange = vi.fn();
    const { rerender } = render(
      <Providers contextOverrides={{ activeElementType: 'text' }}>
        <Ribbon activeTab={RibbonTab.HOME} onTabChange={onTabChange} />
      </Providers>
    );

    rerender(
      <Providers contextOverrides={{ activeElementType: 'equation' }}>
        <Ribbon activeTab={RibbonTab.HOME} onTabChange={onTabChange} />
      </Providers>
    );

    expect(onTabChange).toHaveBeenCalledWith(RibbonTab.EQUATION);
  });

  it('resolves legacy "equation" and canonical RibbonTab.EQUATION on prodoc:switchTab inside App without showing coming soon text', async () => {
    render(<App />);

    await act(async () => {
      window.dispatchEvent(new CustomEvent('prodoc:switchTab', { detail: 'equation' }));
    });

    expect(screen.getByTitle('Tools')).toBeTruthy();
    expect(screen.getByTitle('Conversions')).toBeTruthy();
    expect(screen.getByTitle('Symbols')).toBeTruthy();
    expect(screen.getByTitle('Structures')).toBeTruthy();
    expect(screen.queryByText(/Tools coming soon/i)).toBeNull();

    await act(async () => {
      window.dispatchEvent(new CustomEvent('prodoc:switchTab', { detail: RibbonTab.HOME }));
      window.dispatchEvent(new CustomEvent('prodoc:switchTab', { detail: RibbonTab.EQUATION }));
    });

    expect(screen.getByTitle('Structures')).toBeTruthy();
    expect(screen.queryByText(/Tools coming soon/i)).toBeNull();
  });
});

