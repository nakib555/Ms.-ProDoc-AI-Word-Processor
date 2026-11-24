import { PageConfig } from '../types';

export interface DocumentSnapshot {
  content: string;
  pageConfig: PageConfig;
  headerContent: string;
  footerContent: string;
  firstHeaderContent: string;
  firstFooterContent: string;
}

export interface HistoryCursorMeta {
  activePage?: number;
  cursorOffset?: number | null;
}

export interface HistoryEntry {
  snapshot: DocumentSnapshot;
  meta?: HistoryCursorMeta;
}

export type HistoryCommitMode = 'debounced' | 'immediate' | 'none';

export const clonePageConfig = (cfg: PageConfig): PageConfig => ({
  ...cfg,
  margins: cfg.margins ? { ...cfg.margins } : { top: 1, bottom: 1, left: 1, right: 1, gutter: 0 },
  lineNumbers: cfg.lineNumbers ? { ...cfg.lineNumbers } : undefined,
});

export const cloneSnapshot = (snapshot: DocumentSnapshot): DocumentSnapshot => ({
  content: snapshot.content,
  pageConfig: clonePageConfig(snapshot.pageConfig),
  headerContent: snapshot.headerContent,
  footerContent: snapshot.footerContent,
  firstHeaderContent: snapshot.firstHeaderContent,
  firstFooterContent: snapshot.firstFooterContent,
});

export const cloneHistoryEntry = (entry: HistoryEntry): HistoryEntry => ({
  snapshot: cloneSnapshot(entry.snapshot),
  meta: entry.meta ? { ...entry.meta } : undefined,
});

export const areSnapshotsEqual = (a: DocumentSnapshot, b: DocumentSnapshot): boolean => {
  if (a === b) return true;
  if (
    a.content !== b.content ||
    a.headerContent !== b.headerContent ||
    a.footerContent !== b.footerContent ||
    a.firstHeaderContent !== b.firstHeaderContent ||
    a.firstFooterContent !== b.firstFooterContent
  ) {
    return false;
  }
  return JSON.stringify(a.pageConfig) === JSON.stringify(b.pageConfig);
};

export class DocumentHistoryEngine {
  private past: HistoryEntry[] = [];
  private present: HistoryEntry;
  private future: HistoryEntry[] = [];
  private maxEntries: number;
  private debounceMs: number;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;
  private isInTypingBurst = false;
  private activeBurstKey: string | null = null;

  constructor(
    initialSnapshot: DocumentSnapshot,
    options?: { maxEntries?: number; debounceMs?: number }
  ) {
    this.present = { snapshot: cloneSnapshot(initialSnapshot) };
    this.maxEntries = options?.maxEntries ?? 150;
    this.debounceMs = options?.debounceMs ?? 450;
  }

  public getPresent(): HistoryEntry {
    return cloneHistoryEntry(this.present);
  }

  public canUndo(): boolean {
    return this.past.length > 0;
  }

  public canRedo(): boolean {
    return this.future.length > 0;
  }

  public getStats() {
    return {
      pastCount: this.past.length,
      futureCount: this.future.length,
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
    };
  }

  private pushPast(entry: HistoryEntry) {
    this.past.push(cloneHistoryEntry(entry));
    if (this.past.length > this.maxEntries) {
      this.past.shift();
    }
  }

  public flush(): void {
    if (this.typingTimer !== null) {
      clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }
    this.isInTypingBurst = false;
    this.activeBurstKey = null;
  }

  public commit(
    nextSnapshot: DocumentSnapshot,
    mode: HistoryCommitMode = 'immediate',
    meta?: HistoryCursorMeta,
    burstKey = 'content'
  ): boolean {
    if (mode === 'none') {
      this.present = { snapshot: cloneSnapshot(nextSnapshot), meta };
      return false;
    }

    if (areSnapshotsEqual(this.present.snapshot, nextSnapshot)) {
      return false;
    }

    if (mode === 'debounced') {
      if (this.isInTypingBurst && this.activeBurstKey !== null && this.activeBurstKey !== burstKey) {
        this.flush();
      }
      if (!this.isInTypingBurst) {
        this.pushPast(this.present);
        this.isInTypingBurst = true;
        this.activeBurstKey = burstKey;
      }
      this.future = [];
      this.present = { snapshot: cloneSnapshot(nextSnapshot), meta };

      if (this.typingTimer !== null) {
        clearTimeout(this.typingTimer);
      }
      this.typingTimer = setTimeout(() => {
        this.typingTimer = null;
        this.isInTypingBurst = false;
        this.activeBurstKey = null;
      }, this.debounceMs);

      return true;
    }

    // Immediate mode: seal any active burst and record a distinct step
    this.flush();
    this.pushPast(this.present);
    this.future = [];
    this.present = { snapshot: cloneSnapshot(nextSnapshot), meta };
    return true;
  }

  public undo(): HistoryEntry | null {
    if (this.past.length === 0) return null;
    this.flush();

    const previous = this.past.pop()!;
    this.future.unshift(cloneHistoryEntry(this.present));
    if (this.future.length > this.maxEntries) {
      this.future.pop();
    }
    this.present = cloneHistoryEntry(previous);
    return cloneHistoryEntry(this.present);
  }

  public redo(): HistoryEntry | null {
    if (this.future.length === 0) return null;
    this.flush();

    const next = this.future.shift()!;
    this.pushPast(this.present);
    this.present = cloneHistoryEntry(next);
    return cloneHistoryEntry(this.present);
  }

  public reset(snapshot: DocumentSnapshot): void {
    this.flush();
    this.past = [];
    this.future = [];
    this.present = { snapshot: cloneSnapshot(snapshot) };
  }

  public dispose(): void {
    this.flush();
  }
}
