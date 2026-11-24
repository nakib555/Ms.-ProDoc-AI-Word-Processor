import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  DocumentHistoryEngine,
  DocumentSnapshot,
  clonePageConfig,
} from '../../utils/historyManager';
import { PageConfig } from '../../types';

const makePageConfig = (overrides: Partial<PageConfig> = {}): PageConfig => ({
  size: 'Letter',
  orientation: 'portrait',
  marginPreset: 'compactReport',
  margins: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75, gutter: 0 },
  background: 'none',
  headerDistance: 0.4,
  footerDistance: 0.4,
  verticalAlign: 'top',
  sectionStart: 'newpage',
  differentOddEven: false,
  differentFirstPage: false,
  gutterPosition: 'left',
  multiplePages: 'normal',
  applyTo: 'wholeDocument',
  sheetsPerBooklet: 'all',
  ...overrides,
});

const makeSnapshot = (overrides: Partial<DocumentSnapshot> = {}): DocumentSnapshot => ({
  content: '<p>Initial content</p>',
  pageConfig: makePageConfig(),
  headerContent: '',
  footerContent: '',
  firstHeaderContent: '',
  firstFooterContent: '',
  ...overrides,
});

describe('DocumentHistoryEngine (Absolute Independent Undo/Redo)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with canUndo=false and canRedo=false', () => {
    const engine = new DocumentHistoryEngine(makeSnapshot());
    expect(engine.canUndo()).toBe(false);
    expect(engine.canRedo()).toBe(false);
    expect(engine.undo()).toBeNull();
    expect(engine.redo()).toBeNull();
  });

  it('coalesces rapid debounced typing within debounce window and restores whole burst on single undo', () => {
    const engine = new DocumentHistoryEngine(makeSnapshot({ content: '<p>Hi</p>' }), { debounceMs: 450 });

    engine.commit(makeSnapshot({ content: '<p>Hi t</p>' }), 'debounced');
    vi.advanceTimersByTime(100);
    engine.commit(makeSnapshot({ content: '<p>Hi th</p>' }), 'debounced');
    vi.advanceTimersByTime(100);
    engine.commit(makeSnapshot({ content: '<p>Hi there</p>' }), 'debounced');

    expect(engine.getStats().pastCount).toBe(1);
    expect(engine.canUndo()).toBe(true);

    const undone = engine.undo();
    expect(undone?.snapshot.content).toBe('<p>Hi</p>');
    expect(engine.canUndo()).toBe(false);
    expect(engine.canRedo()).toBe(true);

    const redone = engine.redo();
    expect(redone?.snapshot.content).toBe('<p>Hi there</p>');
    expect(engine.canRedo()).toBe(false);
  });

  it('starts a new undo step after debounce window expires', () => {
    const engine = new DocumentHistoryEngine(makeSnapshot({ content: '<p>Start</p>' }), { debounceMs: 450 });

    engine.commit(makeSnapshot({ content: '<p>Start one</p>' }), 'debounced');
    vi.advanceTimersByTime(500);
    engine.commit(makeSnapshot({ content: '<p>Start one two</p>' }), 'debounced');

    expect(engine.getStats().pastCount).toBe(2);
    expect(engine.undo()?.snapshot.content).toBe('<p>Start one</p>');
    expect(engine.undo()?.snapshot.content).toBe('<p>Start</p>');
  });

  it('seals active typing burst when flush() or immediate formatting edit occurs', () => {
    const engine = new DocumentHistoryEngine(makeSnapshot({ content: '<p>Hello</p>' }), { debounceMs: 450 });

    engine.commit(makeSnapshot({ content: '<p>Hello world</p>' }), 'debounced');
    // Immediate formatting change before debounce finishes
    engine.commit(makeSnapshot({ content: '<p>Hello <b>world</b></p>' }), 'immediate');

    expect(engine.getStats().pastCount).toBe(2);
    expect(engine.undo()?.snapshot.content).toBe('<p>Hello world</p>');
    expect(engine.undo()?.snapshot.content).toBe('<p>Hello</p>');
  });

  it('undoes and redoes multi-page content edits cleanly across pages', () => {
    const page1And2 = '<p>Page 1 text</p><div class="prodoc-page-break"></div><p>Page 2 text</p>';
    const page1And2Edited = '<p>Page 1 text</p><div class="prodoc-page-break"></div><p>Page 2 edited!</p>';

    const engine = new DocumentHistoryEngine(makeSnapshot({ content: page1And2 }));
    engine.commit(makeSnapshot({ content: page1And2Edited }), 'immediate');

    expect(engine.undo()?.snapshot.content).toBe(page1And2);
    expect(engine.redo()?.snapshot.content).toBe(page1And2Edited);
  });

  it('undoes and redoes pageConfig changes (orientation, margins, watermark) with deep isolation', () => {
    const initialCfg = makePageConfig({ orientation: 'portrait', watermark: undefined });
    const landscapeCfg = makePageConfig({
      orientation: 'landscape',
      watermark: 'CONFIDENTIAL',
      margins: { top: 1.5, bottom: 1.5, left: 1.5, right: 1.5, gutter: 0 },
    });

    const engine = new DocumentHistoryEngine(makeSnapshot({ pageConfig: initialCfg }));
    engine.commit(makeSnapshot({ pageConfig: landscapeCfg }), 'immediate');

    // Mutate external object to prove snapshot isolation
    landscapeCfg.margins.top = 99;

    const undone = engine.undo();
    expect(undone?.snapshot.pageConfig.orientation).toBe('portrait');
    expect(undone?.snapshot.pageConfig.watermark).toBeUndefined();
    expect(undone?.snapshot.pageConfig.margins.top).toBe(0.75);

    const redone = engine.redo();
    expect(redone?.snapshot.pageConfig.orientation).toBe('landscape');
    expect(redone?.snapshot.pageConfig.watermark).toBe('CONFIDENTIAL');
    expect(redone?.snapshot.pageConfig.margins.top).toBe(1.5);
  });

  it('undoes and redoes header, footer, and first-page header/footer changes', () => {
    const engine = new DocumentHistoryEngine(makeSnapshot());

    engine.commit(makeSnapshot({ headerContent: '<p>Draft Header</p>' }), 'immediate');
    engine.commit(
      makeSnapshot({ headerContent: '<p>Draft Header</p>', footerContent: '<p>Page [Page 1]</p>' }),
      'immediate'
    );

    const afterFirstUndo = engine.undo();
    expect(afterFirstUndo?.snapshot.headerContent).toBe('<p>Draft Header</p>');
    expect(afterFirstUndo?.snapshot.footerContent).toBe('');

    const afterSecondUndo = engine.undo();
    expect(afterSecondUndo?.snapshot.headerContent).toBe('');
  });

  it('clears redo stack when a new edit occurs after undo and caps maxEntries', () => {
    const engine = new DocumentHistoryEngine(makeSnapshot({ content: '<p>0</p>' }), { maxEntries: 3 });

    engine.commit(makeSnapshot({ content: '<p>1</p>' }), 'immediate');
    engine.commit(makeSnapshot({ content: '<p>2</p>' }), 'immediate');
    engine.commit(makeSnapshot({ content: '<p>3</p>' }), 'immediate');
    engine.commit(makeSnapshot({ content: '<p>4</p>' }), 'immediate');

    // Capped at 3 past entries (1, 2, 3)
    expect(engine.getStats().pastCount).toBe(3);

    expect(engine.undo()?.snapshot.content).toBe('<p>3</p>');
    expect(engine.canRedo()).toBe(true);

    // New edit wipes future
    engine.commit(makeSnapshot({ content: '<p>3-alt</p>' }), 'immediate');
    expect(engine.canRedo()).toBe(false);
    expect(engine.redo()).toBeNull();
  });

  it('ignores duplicate snapshots and mode="none"', () => {
    const base = makeSnapshot({ content: '<p>Same</p>' });
    const engine = new DocumentHistoryEngine(base);

    expect(engine.commit(makeSnapshot({ content: '<p>Same</p>' }), 'immediate')).toBe(false);
    expect(engine.canUndo()).toBe(false);

    expect(engine.commit(makeSnapshot({ content: '<p>Internal</p>' }), 'none')).toBe(false);
    expect(engine.getPresent().snapshot.content).toBe('<p>Internal</p>');
    expect(engine.canUndo()).toBe(false);

    const cfgClone = clonePageConfig(base.pageConfig);
    cfgClone.margins.left = 2;
    expect(cfgClone.margins.left).toBe(2);
    expect(base.pageConfig.margins.left).toBe(0.75);
  });
});
