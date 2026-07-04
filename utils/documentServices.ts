// utils/documentServices.ts

import { JSONDocumentModel } from './documentModel';
import { PageConfig } from '../types';
import { globalEventBus } from './eventBus';
import { globalFieldsEngine, FieldContext } from './fieldsEngine';

// --- SERVICE INTERFACES ---

export interface IDocumentService {
  loadDocument(id: string): Promise<JSONDocumentModel>;
  saveDocument(doc: JSONDocumentModel): Promise<{ success: boolean; timestamp: string }>;
  autoRecoverBackup(): Promise<JSONDocumentModel | null>;
}

export interface ILayoutService {
  computeGutterOffset(config: PageConfig): number;
  formatSectionHeader(sectionNum: number): string;
}

export interface IStyleService {
  applyThemeColors(themeName: string): Record<string, string>;
  resolveCascadedProperties(styleId: string, overrides: Record<string, any>): Record<string, any>;
}

export interface INumberingService {
  getFormattedPrefix(schemeId: string, level: number, indices: number[]): string;
}

export interface IFieldService {
  evaluateDocField(expr: string, context: FieldContext): string;
}

export interface IRevisionService {
  createSnapshot(doc: JSONDocumentModel): string;
  restoreSnapshot(snapshotId: string): JSONDocumentModel;
  getRevisions(): { id: string; timestamp: string }[];
}

export interface ICommentService {
  addComment(text: string, author: string, blockId?: string): void;
  resolveComment(id: string): void;
}

export interface IExportService {
  exportToMarkdown(doc: JSONDocumentModel): string;
  exportToPlainText(doc: JSONDocumentModel): string;
}

export interface IDiagnosticsService {
  getSystemHealthReport(): { status: string; memoryUsedMb: number; latencyMs: number };
}

export interface ICollaborationService {
  broadcastOperation(op: any): void;
  syncPeerState(peerId: string): void;
}

// --- CORE SERVICE IMPLEMENTATIONS ---

export class DocumentService implements IDocumentService {
  public async loadDocument(id: string): Promise<JSONDocumentModel> {
    // Standard mock storage fetching
    const raw = localStorage.getItem(`prodoc_doc_${id}`);
    if (raw) return JSON.parse(raw);
    
    return {
      id,
      metadata: { title: 'Untitled Document', creationDate: new Date().toISOString(), lastModified: new Date().toISOString() },
      pageConfig: {
        size: 'Letter',
        orientation: 'portrait',
        margins: { top: 1, bottom: 1, left: 1, right: 1 }
      },
      pages: []
    };
  }

  public async saveDocument(doc: JSONDocumentModel): Promise<{ success: boolean; timestamp: string }> {
    localStorage.setItem(`prodoc_doc_${doc.id}`, JSON.stringify(doc));
    globalEventBus.emit('DocumentChanged', doc);
    return { success: true, timestamp: new Date().toISOString() };
  }

  public async autoRecoverBackup(): Promise<JSONDocumentModel | null> {
    const backup = localStorage.getItem('prodoc_autorecover_backup');
    return backup ? JSON.parse(backup) : null;
  }
}

export class LayoutService implements ILayoutService {
  public computeGutterOffset(config: PageConfig): number {
    const gutter = config.margins.gutter || 0;
    return gutter * 96; // convert inches to pixels
  }

  public formatSectionHeader(sectionNum: number): string {
    return `Section ${sectionNum}`;
  }
}

export class StyleService implements IStyleService {
  public applyThemeColors(themeName: string): Record<string, string> {
    switch (themeName.toLowerCase()) {
      case 'warm-editorial':
        return { background: '#FAF6F0', text: '#2C2A29', primary: '#A64B2A' };
      case 'modern-swiss':
        return { background: '#FFFFFF', text: '#1A1A1A', primary: '#E30613' };
      case 'cosmic-slate':
        return { background: '#0F172A', text: '#F8FAFC', primary: '#6366F1' };
      default:
        return { background: '#FFFFFF', text: '#0F172A', primary: '#4F46E5' };
    }
  }

  public resolveCascadedProperties(styleId: string, overrides: Record<string, any>): Record<string, any> {
    // Cascade base settings and merge local properties
    const defaultStyles: Record<string, any> = {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      lineHeight: '1.5'
    };
    return { ...defaultStyles, ...overrides };
  }
}

export class NumberingService implements INumberingService {
  public getFormattedPrefix(schemeId: string, level: number, indices: number[]): string {
    if (schemeId === 'legal') {
      const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
      if (level === 0) return `${numerals[indices[0] - 1]}.`;
      if (level === 1) return `${String.fromCharCode(64 + indices[1])}.`;
      return `${indices[2]}.`;
    }
    // Standard decimal list prefix: e.g. "1.2.3"
    return indices.slice(0, level + 1).join('.') + '.';
  }
}

export class FieldService implements IFieldService {
  public evaluateDocField(expr: string, context: FieldContext): string {
    return globalFieldsEngine.evaluate(expr, context);
  }
}

export class RevisionService implements IRevisionService {
  private snapshots = new Map<string, string>();

  public createSnapshot(doc: JSONDocumentModel): string {
    const id = `snapshot-${Date.now()}`;
    this.snapshots.set(id, JSON.stringify(doc));
    globalEventBus.emit('RevisionCreated', { id, timestamp: new Date().toISOString() });
    return id;
  }

  public restoreSnapshot(snapshotId: string): JSONDocumentModel {
    const raw = this.snapshots.get(snapshotId);
    if (!raw) throw new Error(`Snapshot ${snapshotId} not found`);
    return JSON.parse(raw);
  }

  public getRevisions(): { id: string; timestamp: string }[] {
    return Array.from(this.snapshots.keys()).map(id => ({
      id,
      timestamp: new Date(parseInt(id.split('-')[1], 10)).toISOString()
    }));
  }
}

export class CommentService implements ICommentService {
  public addComment(text: string, author: string, blockId?: string): void {
    globalEventBus.emit('CommentResolved', { action: 'add', text, author, blockId });
  }

  public resolveComment(id: string): void {
    globalEventBus.emit('CommentResolved', { action: 'resolve', id });
  }
}

export class ExportService implements IExportService {
  public exportToMarkdown(doc: JSONDocumentModel): string {
    let md = `# ${doc.metadata.title}\n\n`;
    doc.pages.forEach(page => {
      page.sections.forEach(sec => {
        sec.elements.forEach(el => {
          if (el.type === 'heading') {
            md += `${'#'.repeat(el.level)} ${el.children.map(c => c.text).join('')}\n\n`;
          } else if (el.type === 'paragraph') {
            md += `${el.children.map(c => c.text).join('')}\n\n`;
          }
        });
      });
    });
    return md;
  }

  public exportToPlainText(doc: JSONDocumentModel): string {
    let text = `${doc.metadata.title}\n\n`;
    doc.pages.forEach(page => {
      page.sections.forEach(sec => {
        sec.elements.forEach(el => {
          if (el.type === 'heading' || el.type === 'paragraph') {
            text += `${el.children.map(c => c.text).join('')}\n\n`;
          }
        });
      });
    });
    return text;
  }
}

export class DiagnosticsService implements IDiagnosticsService {
  public getSystemHealthReport(): { status: string; memoryUsedMb: number; latencyMs: number } {
    return {
      status: 'Healthy',
      memoryUsedMb: Math.round(((window.performance as any)?.memory?.usedJSHeapSize || 0) / 1048576) || 45,
      latencyMs: 1.2
    };
  }
}

export class CollaborationService implements ICollaborationService {
  public broadcastOperation(op: any): void {
    console.log('[CollabService] Broadcasting operation:', op);
  }

  public syncPeerState(peerId: string): void {
    console.log('[CollabService] Synchronizing with peer:', peerId);
  }
}

// --- CENTRAL SERVICE LOCATOR REGISTER ---

export class DocumentServiceRegistry {
  public readonly document = new DocumentService();
  public readonly layout = new LayoutService();
  public readonly style = new StyleService();
  public readonly numbering = new NumberingService();
  public readonly fields = new FieldService();
  public readonly revision = new RevisionService();
  public readonly comment = new CommentService();
  public readonly export = new ExportService();
  public readonly diagnostics = new DiagnosticsService();
  public readonly collab = new CollaborationService();
}

export const globalServices = new DocumentServiceRegistry();
