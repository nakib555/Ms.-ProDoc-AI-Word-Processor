// utils/identityService.ts

export class DocumentIdentityService {
  /**
   * Generates a new stable node ID.
   */
  public static generateId(prefix: string = 'node'): string {
    return `${prefix}-${Math.random().toString(36).substring(2, 11)}-${Date.now().toString(36)}`;
  }

  /**
   * Handles ID logic when a node is split.
   * Typically, the original node retains its ID for the first half,
   * and a new ID is generated for the second half.
   */
  public static splitId(originalId: string): { retainedId: string; newId: string } {
    return {
      retainedId: originalId,
      newId: this.generateId('node')
    };
  }

  /**
   * Handles ID logic when two nodes are merged.
   * Returns the ID that should be retained (usually the primary/first node).
   */
  public static mergeIds(primaryId: string, _secondaryId: string): string {
    return primaryId;
  }

  /**
   * Generates a new ID for a duplicated node to prevent collisions.
   */
  public static duplicateId(_originalId: string): string {
    return this.generateId('node');
  }

  /**
   * Validates a collection of IDs for missing or duplicate IDs.
   */
  public static validateIds(ids: string[]): { duplicates: string[]; missingCount: number } {
    const seen = new Set<string>();
    const duplicates = new Set<string>();
    let missingCount = 0;

    ids.forEach(id => {
      if (!id) {
        missingCount++;
      } else if (seen.has(id)) {
        duplicates.add(id);
      } else {
        seen.add(id);
      }
    });

    return { duplicates: Array.from(duplicates), missingCount };
  }
}
