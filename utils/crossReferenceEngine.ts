// utils/crossReferenceEngine.ts

export type CrossReferenceTargetType = 'heading' | 'bookmark' | 'figure' | 'table' | 'equation';

export interface Bookmark {
  id: string; // bookmark name/id
  displayName: string;
  targetElementId: string; // The HTML DOM or virtual element node ID
  pageIndex?: number; // Last known page index
  textContext?: string; // Text captured at the bookmark site
}

export interface CrossReferenceSource {
  id: string;
  sourceElementId: string; // The referencing node
  targetId: string; // The Bookmark ID or Heading ID referenced
  referenceType: 'page' | 'text' | 'number'; // Page Number ("See page 5") vs. Text content ("See introduction")
}

/**
 * Enterprise-grade Cross Reference Engine.
 * Manages the bookmark registry, cross-reference links, figure and table captions,
 * and maintains target alignment when pagination triggers.
 */
export class CrossReferenceEngine {
  private bookmarks = new Map<string, Bookmark>();
  private references = new Map<string, CrossReferenceSource[]>();

  /**
   * Registers a new bookmark.
   */
  public addBookmark(bookmark: Bookmark): void {
    this.bookmarks.set(bookmark.id, bookmark);
  }

  /**
   * Retrieves a bookmark by ID.
   */
  public getBookmark(id: string): Bookmark | undefined {
    return this.bookmarks.get(id);
  }

  /**
   * Removes a bookmark.
   */
  public removeBookmark(id: string): boolean {
    return this.bookmarks.delete(id);
  }

  public getBookmarks(): Bookmark[] {
    return Array.from(this.bookmarks.values());
  }

  /**
   * Adds a cross reference source.
   */
  public addReference(ref: CrossReferenceSource): void {
    const list = this.references.get(ref.targetId) || [];
    list.push(ref);
    this.references.set(ref.targetId, list);
  }

  /**
   * Resolves a reference target to its dynamic content.
   * If referencing page, it returns "page X" (or simply "X"). If referencing text, it returns display text.
   */
  public resolveReference(targetId: string, type: 'page' | 'text' | 'number', defaultPageVal: string = '??'): string {
    const bookmark = this.bookmarks.get(targetId);
    if (!bookmark) {
      // If bookmark is missing, maybe it's an element ID directly
      return `[Missing Bookmark: ${targetId}]`;
    }

    switch (type) {
      case 'page': {
        const page = bookmark.pageIndex !== undefined ? bookmark.pageIndex + 1 : undefined;
        return page !== undefined ? page.toString() : defaultPageVal;
      }
      case 'text':
        return bookmark.textContext || bookmark.displayName;
      case 'number': {
        // Returns sequence number (e.g. "Figure 2" -> "2")
        const numMatch = (bookmark.textContext || '').match(/\d+/);
        return numMatch ? numMatch[0] : '1';
      }
      default:
        return bookmark.displayName;
    }
  }

  /**
   * Updates coordinates of registered bookmarks (e.g., during layout passes).
   */
  public updateBookmarkCoordinates(bookmarkId: string, pageIndex: number, textContext?: string): void {
    const bookmark = this.bookmarks.get(bookmarkId);
    if (bookmark) {
      bookmark.pageIndex = pageIndex;
      if (textContext !== undefined) {
        bookmark.textContext = textContext;
      }
      this.bookmarks.set(bookmarkId, bookmark);
    }
  }

  /**
   * Clears all references and bookmarks.
   */
  public clear(): void {
    this.bookmarks.clear();
    this.references.clear();
  }
}

export const globalCrossReferenceEngine = new CrossReferenceEngine();
