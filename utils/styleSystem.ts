// utils/styleSystem.ts
export type StyleType = 'paragraph' | 'character' | 'table';

export interface DocumentStyle {
  id: string; // UUID internally
  displayName: string;
  type: StyleType;
  
  // Style locking properties
  locked: boolean; // Cannot be deleted or modified
  hidden: boolean; // Not shown in user-facing style pickers
  builtin: boolean; // Ships with the editor core

  basedOnId?: string; // Inheritance parent
  nextStyleId?: string; // What style to use when pressing Enter

  formatting: Record<string, any>;
}

/**
 * Manages the collection of document styles.
 */
export class DocumentStyleSystem {
  private styles = new Map<string, DocumentStyle>();

  public addStyle(style: DocumentStyle): void {
    if (this.styles.has(style.id) && this.styles.get(style.id)?.locked) {
      throw new Error(`Cannot overwrite locked style: ${style.id}`);
    }
    this.styles.set(style.id, style);
  }

  public getStyle(id: string): DocumentStyle | undefined {
    return this.styles.get(id);
  }
  
  public getStyles(): DocumentStyle[] {
    return Array.from(this.styles.values());
  }

  public removeStyle(id: string): boolean {
    const style = this.styles.get(id);
    if (style && !style.locked && !style.builtin) {
      this.styles.delete(id);
      return true;
    }
    return false;
  }
}

/**
 * Resolves inherited properties for styles.
 */
export class StyleResolver {
  private styleSystem: DocumentStyleSystem;
  private computedCache = new Map<string, Record<string, any>>();

  constructor(styleSystem: DocumentStyleSystem) {
    this.styleSystem = styleSystem;
  }

  /**
   * Resolves the fully computed formatting for a style, caching the result.
   */
  public resolve(styleId: string): Record<string, any> {
    if (this.computedCache.has(styleId)) {
      return this.computedCache.get(styleId)!;
    }

    const computed = this.resolveInherited(styleId, new Set());
    this.computedCache.set(styleId, computed);
    return computed;
  }

  /**
   * Internal recursive resolver to handle inheritance chains.
   */
  private resolveInherited(styleId: string, visited: Set<string>): Record<string, any> {
    if (visited.has(styleId)) {
      console.warn(`Circular style dependency detected at style ID: ${styleId}`);
      return {}; 
    }
    visited.add(styleId);

    const style = this.styleSystem.getStyle(styleId);
    if (!style) return {};

    const baseFormatting = style.basedOnId ? this.resolveInherited(style.basedOnId, visited) : {};
    
    // Merge base formatting with current style formatting, allowing overrides
    return { ...baseFormatting, ...style.formatting };
  }

  /**
   * Flushes the resolution cache. Call this when styles are modified.
   */
  public invalidateCache(): void {
    this.computedCache.clear();
  }
}

// Default styles
export function createDefaultStyleSystem(): DocumentStyleSystem {
  const system = new DocumentStyleSystem();
  
  system.addStyle({
    id: 'style-normal',
    displayName: 'Normal',
    type: 'paragraph',
    locked: true,
    builtin: true,
    hidden: false,
    formatting: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      lineHeight: '1.5',
      marginBottom: '1rem',
    }
  });

  system.addStyle({
    id: 'style-h1',
    displayName: 'Heading 1',
    type: 'paragraph',
    locked: true,
    builtin: true,
    hidden: false,
    basedOnId: 'style-normal',
    nextStyleId: 'style-normal',
    formatting: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      lineHeight: '1.2',
      marginTop: '2rem',
      marginBottom: '1rem',
    }
  });

  return system;
}
