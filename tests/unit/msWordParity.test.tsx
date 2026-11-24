import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  PHYSICAL_PAPER_SIZES,
  DEFAULT_DPI,
  inchesToUnit,
  unitToInches,
  formatUnitNumber,
  formatUnitValue,
  getCalibrationScale,
  getEffectiveDpi,
  setScreenCalibration,
  saveDefaultPageConfig,
  loadDefaultPageConfig,
  getPhysicalDimensions,
} from '../../utils/measurement';
import { PAGE_SIZES, TABS } from '../../constants';
import { PageConfig, RibbonTab } from '../../types';
import { EditorContext } from '../../contexts/EditorContext';
import { PageSetupDialog } from '../../components/ribbon/tabs/LayoutTab/page_setup/Margins/CustomMargin/PageSetupDialog';
import { WordCountDialog } from '../../components/WordCountDialog';
import { StyleGallery } from '../../components/ribbon/tabs/HomeTab/styles/StyleGallery';
import { paginateContent } from '../../utils/layoutEngine';

const BASE_PAGE_CONFIG: PageConfig = {
  size: 'Letter',
  orientation: 'portrait',
  margins: { top: 1, bottom: 1, left: 1, right: 1, gutter: 0 },
  marginPreset: 'normal',
  background: 'none',
  headerDistance: 0.5,
  footerDistance: 0.5,
  verticalAlign: 'top',
  columns: 1,
  columnGap: 0.5,
};

describe('MS Word Physical Fidelity & Parity Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    setScreenCalibration({ enabled: false, physicalDpi: DEFAULT_DPI });
  });

  it('derives PAGE_SIZES from all 79 PHYSICAL_PAPER_SIZES entries', () => {
    const physicalKeys = Object.keys(PHYSICAL_PAPER_SIZES);
    expect(physicalKeys.length).toBeGreaterThanOrEqual(79);
    for (const key of physicalKeys) {
      expect(PAGE_SIZES[key]).toBeDefined();
      expect(PAGE_SIZES[key].width).toBeCloseTo(PHYSICAL_PAPER_SIZES[key].widthPx, 2);
      expect(PAGE_SIZES[key].height).toBeCloseTo(PHYSICAL_PAPER_SIZES[key].heightPx, 2);
    }
  });

  it('uses RibbonTab.LAYOUT in TABS instead of undefined RibbonTab.CANVAS', () => {
    expect(TABS).toContain(RibbonTab.LAYOUT);
    expect(TABS.every((t) => typeof t === 'string' && t.length > 0)).toBe(true);
  });

  it('converts inches <-> cm <-> mm accurately without drift', () => {
    expect(inchesToUnit(1, 'in')).toBe(1);
    expect(inchesToUnit(1, 'cm')).toBeCloseTo(2.54, 4);
    expect(inchesToUnit(1, 'mm')).toBeCloseTo(25.4, 4);

    expect(unitToInches(2.54, 'cm')).toBeCloseTo(1, 5);
    expect(unitToInches(25.4, 'mm')).toBeCloseTo(1, 5);
    expect(unitToInches(8.5, 'in')).toBe(8.5);

    expect(formatUnitNumber(1, 'mm')).toBe(25.4);
    expect(formatUnitNumber(1, 'cm')).toBe(2.54);
    expect(formatUnitValue(1, 'mm')).toBe('25.4mm');
    expect(formatUnitValue(1, 'cm')).toBe('2.54cm');
  });

  it('computes calibrated physical screen DPI scale accurately', () => {
    expect(getCalibrationScale({ enabled: false, physicalDpi: 120 })).toBe(1);
    expect(getEffectiveDpi(false)).toBe(DEFAULT_DPI);

    setScreenCalibration({ enabled: true, physicalDpi: 144 });
    expect(getCalibrationScale({ enabled: true, physicalDpi: 144 })).toBeCloseTo(144 / 96, 4);
    expect(getEffectiveDpi(true)).toBe(144);

    // Fits two Letter pages side-by-side at Multiple Pages zoom when calibrated
    const letter = getPhysicalDimensions('Letter', 'portrait');
    const calScale = getCalibrationScale({ enabled: true, physicalDpi: 120 });
    const twoPageTotalWidth = letter.widthPx * calScale * 2;
    expect(twoPageTotalWidth).toBeCloseTo(816 * 1.25 * 2, 1);
  });

  it('persists and loads default PageConfig cleanly', () => {
    const a4Landscape: PageConfig = {
      ...BASE_PAGE_CONFIG,
      size: 'A4',
      orientation: 'landscape',
      margins: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75, gutter: 0 },
    };
    saveDefaultPageConfig(a4Landscape);
    const loaded = loadDefaultPageConfig();
    expect(loaded).not.toBeNull();
    expect(loaded?.size).toBe('A4');
    expect(loaded?.orientation).toBe('landscape');
    expect(loaded?.margins?.top).toBe(0.75);
  });

  it('preserves named paper size (A4) when switching orientation inside PageSetupDialog', () => {
    const onSaveMock = vi.fn();
    const showToastMock = vi.fn();
    const initialA4: PageConfig = { ...BASE_PAGE_CONFIG, size: 'A4', orientation: 'portrait' };

    render(
      <EditorContext.Provider
        value={
          {
            pageConfig: initialA4,
            setPageConfig: onSaveMock,
            measurementUnit: 'in',
            setMeasurementUnit: vi.fn(),
            showToast: showToastMock,
          } as unknown as React.ContextType<typeof EditorContext>
        }
      >
        <PageSetupDialog
          isOpen={true}
          onClose={vi.fn()}
          config={initialA4}
          onSave={onSaveMock}
          initialTab="margins"
        />
      </EditorContext.Provider>
    );

    const orientationSubTab = screen.getByRole('button', { name: /^orientation$/i });
    fireEvent.click(orientationSubTab);

    const landscapeBtn = screen.getByRole('button', { name: /landscape/i });
    fireEvent.click(landscapeBtn);

    const okBtn = screen.getByRole('button', { name: /^ok$/i });
    fireEvent.click(okBtn);

    expect(onSaveMock).toHaveBeenCalledTimes(1);
    const saved = onSaveMock.mock.calls[0][0] as PageConfig;
    expect(saved.size).toBe('A4');
    expect(saved.orientation).toBe('landscape');
  });

  it('persists defaults via Set As Default in PageSetupDialog without alerts', () => {
    const showToastMock = vi.fn();
    const initialA4: PageConfig = { ...BASE_PAGE_CONFIG, size: 'A4' };
    render(
      <EditorContext.Provider
        value={
          {
            pageConfig: initialA4,
            setPageConfig: vi.fn(),
            measurementUnit: 'cm',
            setMeasurementUnit: vi.fn(),
            showToast: showToastMock,
          } as unknown as React.ContextType<typeof EditorContext>
        }
      >
        <PageSetupDialog
          isOpen={true}
          onClose={vi.fn()}
          config={initialA4}
          onSave={vi.fn()}
          initialTab="paper"
        />
      </EditorContext.Provider>
    );

    const setDefaultBtn = screen.getByRole('button', { name: /set as default/i });
    fireEvent.click(setDefaultBtn);

    expect(loadDefaultPageConfig()?.size).toBe('A4');
    expect(showToastMock).toHaveBeenCalled();
  });

  it('computes detailed Word Count statistics accurately in WordCountDialog', () => {
    render(
      <EditorContext.Provider
        value={
          {
            content: '<p>Hello world</p><p>Second line here</p>',
            wordCount: 5,
            charCount: 28,
            headerContent: '<p>Header words</p>',
            footerContent: '<p>Footer</p>',
            firstHeaderContent: '',
            firstFooterContent: '',
            footnotes: [],
            endnotes: [],
            totalPages: 2,
          } as unknown as React.ContextType<typeof EditorContext>
        }
      >
        <WordCountDialog isOpen={true} onClose={vi.fn()} />
      </EditorContext.Provider>
    );

    expect(screen.getByText('Word Count')).toBeDefined();
    // 5 body words + 2 header words ("Header words") + 1 footer word ("Footer") = 8 total words with checkbox on
    expect(screen.getByText('8')).toBeDefined();
  });

  it('applies valid italic & advanced styles for Emphasis in StyleGallery without formatBlock(EM)', () => {
    const executeCommandMock = vi.fn();
    const applyBlockStyleMock = vi.fn();
    const applyAdvancedStyleMock = vi.fn();

    render(
      <EditorContext.Provider
        value={
          {
            executeCommand: executeCommandMock,
            applyBlockStyle: applyBlockStyleMock,
            applyAdvancedStyle: applyAdvancedStyleMock,
            customStyles: [],
            applyCustomStyle: vi.fn(),
          } as unknown as React.ContextType<typeof EditorContext>
        }
      >
        <StyleGallery />
      </EditorContext.Provider>
    );

    fireEvent.click(screen.getByText('Emphasis'));
    expect(executeCommandMock).toHaveBeenCalledWith('italic');
    expect(executeCommandMock).not.toHaveBeenCalledWith('formatBlock', 'EM');
    expect(applyAdvancedStyleMock).toHaveBeenCalledWith(
      expect.objectContaining({ fontStyle: 'italic' })
    );
  });

  it('handles explicit column breaks across single-column and multi-column layouts in PaginationLoop', () => {
    const htmlWithBreak =
      '<p>First block</p><div class="prodoc-column-break" data-type="column-break"><hr></div><p>Second block</p>';

    // Single column: column break splits onto page 2
    const singleResult = paginateContent(htmlWithBreak, BASE_PAGE_CONFIG);
    expect(singleResult.pages.length).toBe(2);

    // Multi column (2 columns): column break advances into column 2 on the same page
    const twoColConfig: PageConfig = { ...BASE_PAGE_CONFIG, columns: 2 };
    const multiResult = paginateContent(htmlWithBreak, twoColConfig);
    expect(multiResult.pages.length).toBe(1);
    expect(multiResult.pages[0].html).toContain('prodoc-column-break');
  });
});
