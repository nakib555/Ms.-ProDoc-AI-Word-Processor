// utils/referenceGraph.ts

export type ReferenceSourceType = 'comment' | 'bookmark' | 'anchor' | 'cross_reference' | 'selection' | 'cursor' | 'footnote' | 'revision';

export interface ReferenceEdge {
  sourceId: string; // ID of the referring entity (e.g., comment ID)
  sourceType: ReferenceSourceType;
  targetNodeId: string; // ID of the referenced document node
  metadata?: Record<string, any>;
}

/**
 * Maintains a graph of all external or internal references pointing to document nodes.
 * Allows safely managing operations like node deletion or merging without leaving dangling references.
 */
export class ReferenceGraph {
  // Map of targetNodeId -> List of incoming ReferenceEdges
  private incomingRefs = new Map<string, ReferenceEdge[]>();

  /**
   * Adds a new incoming reference to a node.
   */
  public addReference(ref: ReferenceEdge): void {
    const refs = this.incomingRefs.get(ref.targetNodeId) || [];
    refs.push(ref);
    this.incomingRefs.set(ref.targetNodeId, refs);
  }

  /**
   * Removes a specific reference from a node.
   */
  public removeReference(sourceId: string, targetNodeId: string): void {
    const refs = this.incomingRefs.get(targetNodeId);
    if (refs) {
      this.incomingRefs.set(targetNodeId, refs.filter(r => r.sourceId !== sourceId));
    }
  }

  /**
   * Retrieves all incoming references for a given node.
   */
  public getIncomingReferences(targetNodeId: string): ReferenceEdge[] {
    return this.incomingRefs.get(targetNodeId) || [];
  }

  /**
   * Remaps all incoming references from an old node ID to a new node ID.
   * Crucial for merge operations.
   */
  public remapTarget(oldTargetNodeId: string, newTargetNodeId: string): void {
    const refs = this.incomingRefs.get(oldTargetNodeId);
    if (refs && refs.length > 0) {
      const newRefs = this.incomingRefs.get(newTargetNodeId) || [];
      const updatedRefs = refs.map(r => ({ ...r, targetNodeId: newTargetNodeId }));
      this.incomingRefs.set(newTargetNodeId, [...newRefs, ...updatedRefs]);
      this.incomingRefs.delete(oldTargetNodeId);
    }
  }

  /**
   * Invalidates all references to a node (useful when a node is permanently deleted).
   * In a complete implementation, this might trigger callbacks to delete attached comments, etc.
   */
  public invalidateReferences(targetNodeId: string): ReferenceEdge[] {
    const refs = this.incomingRefs.get(targetNodeId) || [];
    this.incomingRefs.delete(targetNodeId);
    return refs; // Return the invalidated refs so subsystems can handle them (e.g. resolve comments)
  }
}
