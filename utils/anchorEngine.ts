// utils/anchorEngine.ts

export type AnchorAffinity = 'forward' | 'backward' | 'inclusive' | 'exclusive';

export interface DocumentAnchor {
  id: string;
  type: 'comment' | 'track_change' | 'bookmark' | 'cursor';
  startNodeId: string;
  startOffset: number;
  endNodeId: string;
  endOffset: number;
  affinity: AnchorAffinity;
}

/**
 * Manages anchored positions within text nodes and resolves their locations
 * when text is inserted or deleted. Ensures that comments, bookmarks, and cursors
 * don't drift incorrectly when surrounding text is edited.
 */
export class AnchorEngine {
  /**
   * Adjusts anchor offsets in response to text insertion.
   * Resolves exact boundary insertions using the anchor's affinity.
   */
  public static handleTextInsertion(anchors: DocumentAnchor[], targetNodeId: string, insertOffset: number, insertLength: number): void {
    anchors.forEach(anchor => {
      // Adjust start boundary
      if (anchor.startNodeId === targetNodeId) {
        if (anchor.startOffset > insertOffset) {
          anchor.startOffset += insertLength;
        } else if (anchor.startOffset === insertOffset) {
          if (anchor.affinity === 'forward' || anchor.affinity === 'inclusive') {
             anchor.startOffset += insertLength;
          }
        }
      }
      
      // Adjust end boundary
      if (anchor.endNodeId === targetNodeId) {
        if (anchor.endOffset > insertOffset) {
          anchor.endOffset += insertLength;
        } else if (anchor.endOffset === insertOffset) {
          if (anchor.affinity === 'forward' || anchor.affinity === 'inclusive') {
             anchor.endOffset += insertLength;
          }
        }
      }
    });
  }

  /**
   * Adjusts anchor offsets in response to text deletion.
   */
  public static handleTextDeletion(anchors: DocumentAnchor[], targetNodeId: string, deleteOffset: number, deleteLength: number): void {
    anchors.forEach(anchor => {
      // Adjust start boundary
      if (anchor.startNodeId === targetNodeId) {
        if (anchor.startOffset >= deleteOffset + deleteLength) {
          anchor.startOffset -= deleteLength;
        } else if (anchor.startOffset > deleteOffset) {
          anchor.startOffset = deleteOffset; 
        }
      }
      
      // Adjust end boundary
      if (anchor.endNodeId === targetNodeId) {
        if (anchor.endOffset >= deleteOffset + deleteLength) {
          anchor.endOffset -= deleteLength;
        } else if (anchor.endOffset > deleteOffset) {
          anchor.endOffset = deleteOffset; 
        }
      }
    });
  }
}
