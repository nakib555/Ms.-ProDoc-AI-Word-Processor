import { PageConfig, DocumentFootnote, DocumentEndnote } from '../types';
import { DocumentStyle, StyleResolver, DocumentStyleSystem } from './styleSystem';
import { DocumentAnchor } from './anchorEngine';

export interface TextStyle {
  fontFamily?: string;
  fontSize?: string | number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  color?: string;
  highlight?: string;
}

export interface TextRun {
  type: 'text';
  text: string;
  style?: TextStyle;
  styleId?: string;
}

export interface EquationElement {
  id: string;
  type: 'equation';
  latex: string;
}

export interface ImageElement {
  id: string;
  type: 'image';
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  style?: Record<string, string>;
}

export interface ParagraphSpacing {
  before?: number;
  after?: number;
}

export interface ParagraphElement {
  id: string;
  type: 'paragraph';
  styleId?: string;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  spacing?: ParagraphSpacing;
  indent?: number;
  bulletList?: boolean;
  orderedList?: boolean;
  listIndex?: number;
  children: (TextRun | EquationElement | ImageElement)[];
}

export interface HeadingElement {
  id: string;
  type: 'heading';
  styleId?: string;
  level: number;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  children: TextRun[];
}

export interface PageBreakElement {
  id: string;
  type: 'pageBreak';
}

export interface TiptapJSONNode {
  type?: string;
  attrs?: Record<string, any>;
  content?: TiptapJSONNode[];
  text?: string;
  marks?: any[];
  [key: string]: any;
}

export interface UnknownBlockElement {
  id: string;
  type: 'unknown';
  originalType: string;
  originalNode?: Record<string, unknown>;
  attrs?: Record<string, any>;
  marks?: any[];
  content?: any[];
  text?: string;
  raw?: TiptapJSONNode;
  warningId: string;
  children: (TextRun | EquationElement | ImageElement)[];
}

export type SectionElement = 
  | ParagraphElement 
  | HeadingElement 
  | TableElement 
  | ImageElement 
  | EquationElement 
  | PageBreakElement
  | UnknownBlockElement;

export interface TableCellElement {
  elements: (ParagraphElement | HeadingElement)[];
  style?: Record<string, string>;
}

export interface TableRowElement {
  cells: TableCellElement[];
  style?: Record<string, string>;
}

export interface TableElement {
  id: string;
  type: 'table';
  rows: TableRowElement[];
  style?: Record<string, string>;
}

export interface DocumentSection {
  elements: SectionElement[];
  pageSettings?: Record<string, any>;
}

export interface DocumentPage {
  sections: DocumentSection[];
  headers?: {
    body?: string;
    firstPage?: string;
  };
  footers?: {
    body?: string;
    firstPage?: string;
  };
}

export interface DocumentMetadata {
  title: string;
  lastModified: string;
  creationDate: string;
}

export interface DocumentComment {
  id: string;
  anchorId: string; // References a stable Anchor ID
  author: string;
  content: string;
  createdAt: string;
  resolved?: boolean;
}

export interface DocumentBookmark {
  id: string;
  name: string;
  nodeId: string; // References a stable node ID!
}

export type OperationType =
  | 'insert_node'
  | 'delete_node'
  | 'move_node'
  | 'update_node'
  | 'insert_text'
  | 'delete_text'
  | 'set_style'
  | 'set_metadata';

export interface DocumentOperation {
  type: OperationType;
  nodeId: string;
  path?: (string | number)[];
  payload: any;
  timestamp: number;
}

export interface DocumentRevision {
  revisionId: string;
  timestamp: string;
  author: string;
  description: string;
  operations: DocumentOperation[];
}

export interface Transaction {
  id: string;
  operations: DocumentOperation[];
  timestamp: number;
  author: string;
  isCommitted: boolean;
}

export interface JSONDocumentModel {
  type: 'document';
  schemaVersion?: number;
  modelVersion?: string;
  parserVersion?: string;
  metadata: DocumentMetadata;
  pageConfig: PageConfig;
  pages: DocumentPage[];
  styles?: DocumentStyle[];
  anchors?: DocumentAnchor[];
  theme?: Record<string, any>;
  comments?: DocumentComment[];
  bookmarks?: DocumentBookmark[];
  footnotes?: DocumentFootnote[];
  endnotes?: DocumentEndnote[];
  operations?: DocumentOperation[];
  revisionHistory?: DocumentRevision[];
}

const styleResolutionCache = new WeakMap<JSONDocumentModel, StyleResolver>();

export function getStyleResolver(document: JSONDocumentModel): StyleResolver {
  if (styleResolutionCache.has(document)) {
    return styleResolutionCache.get(document)!;
  }
  const system = new DocumentStyleSystem();
  if (document.styles) {
    document.styles.forEach(s => system.addStyle(s));
  }
  const resolver = new StyleResolver(system);
  styleResolutionCache.set(document, resolver);
  return resolver;
}

export function resolveStyle(document: JSONDocumentModel, styleId: string): Record<string, any> {
  const resolver = getStyleResolver(document);
  return resolver.resolve(styleId);
}

// -----------------------------------------------------------------------------
// TRANSACTION & OPERATION MANAGER
// -----------------------------------------------------------------------------
export class DocumentTransactionManager {
  private history: Transaction[] = [];
  private undone: Transaction[] = [];
  private document: JSONDocumentModel;

  constructor(doc: JSONDocumentModel) {
    this.document = doc;
    if (!this.document.operations) {
      this.document.operations = [];
    }
    if (!this.document.revisionHistory) {
      this.document.revisionHistory = [];
    }
  }

  public getDocument(): JSONDocumentModel {
    return this.document;
  }

  public getHistory(): Transaction[] {
    return this.history;
  }

  public commit(tx: Transaction): void {
    if (tx.isCommitted) return;
    
    tx.operations.forEach(op => {
      this.applyOperation(op);
    });
    
    tx.isCommitted = true;
    this.history.push(tx);
    this.undone = []; // Clear redo stack on new commit

    // Persist in the document's log
    if (!this.document.operations) {
      this.document.operations = [];
    }
    this.document.operations.push(...tx.operations);

    // Keep an audit/revision record
    const revision: DocumentRevision = {
      revisionId: tx.id,
      timestamp: new Date(tx.timestamp).toISOString(),
      author: tx.author,
      description: `Executed ${tx.operations.length} operations`,
      operations: tx.operations
    };
    this.document.revisionHistory!.push(revision);
  }

  public undo(): boolean {
    if (this.history.length === 0) return false;
    const tx = this.history.pop()!;
    
    // Reverse operations in reverse order
    for (let i = tx.operations.length - 1; i >= 0; i--) {
      const op = tx.operations[i];
      const inverse = this.invertOperation(op);
      if (inverse) {
        this.applyOperation(inverse);
      }
    }
    
    this.undone.push(tx);
    return true;
  }

  public redo(): boolean {
    if (this.undone.length === 0) return false;
    const tx = this.undone.pop()!;
    
    tx.operations.forEach(op => {
      this.applyOperation(op);
    });
    
    this.history.push(tx);
    return true;
  }

  private applyOperation(op: DocumentOperation): void {
    switch (op.type) {
      case 'set_metadata': {
        this.document.metadata = {
          ...this.document.metadata,
          ...op.payload
        };
        break;
      }
      case 'update_node': {
        this.findAndModifyNode(op.nodeId, (node) => {
          Object.assign(node, op.payload);
        });
        break;
      }
      case 'delete_node': {
        this.deleteNodeFromDocument(op.nodeId);
        break;
      }
      case 'insert_node': {
        const { node, pageIndex, sectionIndex, elementIndex } = op.payload;
        this.insertNodeIntoDocument(node, pageIndex ?? 0, sectionIndex ?? 0, elementIndex);
        break;
      }
      case 'set_style': {
        this.findAndModifyNode(op.nodeId, (node) => {
          if (node.type === 'paragraph' || node.type === 'heading') {
            node.alignment = op.payload.alignment ?? node.alignment;
            if (node.type === 'paragraph') {
              node.indent = op.payload.indent ?? node.indent;
              node.spacing = op.payload.spacing ?? node.spacing;
            }
          }
        });
        break;
      }
      default:
        console.warn(`Operation type "${op.type}" not fully implemented in TransactionManager`);
    }
  }

  private invertOperation(op: DocumentOperation): DocumentOperation | null {
    switch (op.type) {
      case 'set_metadata':
        // Return inverse by returning back to previous state (payload stores previous values if tracked, or basic override)
        return null; // For simplicity, return null or handle specific rollbacks
      case 'update_node':
        // Real systems store the previous node state in payload.prev. For demo we can restore previous properties.
        if (op.payload.prev) {
          return {
            type: 'update_node',
            nodeId: op.nodeId,
            payload: op.payload.prev,
            timestamp: Date.now()
          };
        }
        return null;
      case 'delete_node':
        if (op.payload.prevNode) {
          return {
            type: 'insert_node',
            nodeId: op.nodeId,
            payload: {
              node: op.payload.prevNode,
              pageIndex: op.payload.pageIndex ?? 0,
              sectionIndex: op.payload.sectionIndex ?? 0,
              elementIndex: op.payload.elementIndex ?? 0
            },
            timestamp: Date.now()
          };
        }
        return null;
      case 'insert_node':
        return {
          type: 'delete_node',
          nodeId: op.nodeId,
          payload: {
            pageIndex: op.payload.pageIndex ?? 0,
            sectionIndex: op.payload.sectionIndex ?? 0,
            elementIndex: op.payload.elementIndex ?? 0
          },
          timestamp: Date.now()
        };
      default:
        return null;
    }
  }

  private findAndModifyNode(nodeId: string, modifier: (node: SectionElement) => void): boolean {
    let found = false;
    this.document.pages.forEach(page => {
      page.sections.forEach(sec => {
        sec.elements.forEach(el => {
          if (el.id === nodeId) {
            modifier(el);
            found = true;
          }
        });
      });
    });
    return found;
  }

  private deleteNodeFromDocument(nodeId: string): boolean {
    let deleted = false;
    this.document.pages.forEach(page => {
      page.sections.forEach(sec => {
        const idx = sec.elements.findIndex(el => el.id === nodeId);
        if (idx !== -1) {
          sec.elements.splice(idx, 1);
          deleted = true;
        }
      });
    });
    return deleted;
  }

  private insertNodeIntoDocument(node: SectionElement, pageIdx: number, secIdx: number, elementIdx?: number): void {
    // Safeguard page
    while (this.document.pages.length <= pageIdx) {
      this.document.pages.push({ sections: [{ elements: [] }] });
    }
    const page = this.document.pages[pageIdx];
    // Safeguard section
    while (page.sections.length <= secIdx) {
      page.sections.push({ elements: [] });
    }
    const sec = page.sections[secIdx];
    
    if (elementIdx !== undefined && elementIdx >= 0 && elementIdx <= sec.elements.length) {
      sec.elements.splice(elementIdx, 0, node);
    } else {
      sec.elements.push(node);
    }
  }
}

// -----------------------------------------------------------------------------
// SCHEMA VERSIONING & MIGRATION LAYER
// -----------------------------------------------------------------------------
export const SCHEMA_VERSION = 2;

/**
 * Migrates older document models to the latest schema version (v2).
 * This ensures full backward compatibility and prevents data loss.
 */
export function migrateDocument(doc: any): JSONDocumentModel {
  if (!doc) {
    return {
      type: 'document',
      schemaVersion: SCHEMA_VERSION,
      metadata: {
        title: 'Untitled Document',
        creationDate: new Date().toISOString(),
        lastModified: new Date().toISOString()
      },
      pageConfig: {
        size: 'letter',
        orientation: 'portrait',
        margins: { top: 72, bottom: 72, left: 72, right: 72 }
      },
      pages: []
    };
  }

  // Handle version 1 (or no schema version) to version 2
  const currentVersion = doc.schemaVersion || 1;
  const migrated = JSON.parse(JSON.stringify(doc)) as JSONDocumentModel;

  if (currentVersion < 2) {
    // Migration v1 -> v2: Ensure every page and section is structured, elements have stable IDs, pageConfig has margins
    if (!migrated.pageConfig) {
      migrated.pageConfig = {
        size: 'letter',
        orientation: 'portrait',
        margins: { top: 72, bottom: 72, left: 72, right: 72 }
      };
    }
    if (!migrated.pages || !Array.isArray(migrated.pages)) {
      migrated.pages = [];
    }

    migrated.pages.forEach((page, pIdx) => {
      if (!page.sections || !Array.isArray(page.sections)) {
        page.sections = [{ elements: [] }];
      }
      page.sections.forEach((sec, sIdx) => {
        if (!sec.elements || !Array.isArray(sec.elements)) {
          sec.elements = [];
        }
        sec.elements = sec.elements.map((el, eIdx) => {
          if (!el.id) {
            el.id = `migrated-node-${el.type}-${pIdx}-${sIdx}-${eIdx}-${Math.random().toString(36).substr(2, 4)}`;
          }
          return el;
        });
      });
    });

    migrated.schemaVersion = SCHEMA_VERSION;
  }

  return migrated;
}

// -----------------------------------------------------------------------------
// PLUGGABLE PARSER REGISTRY & CONTEXT
// -----------------------------------------------------------------------------
export interface NodePath {
  page: number;
  section: number;
  offset: number;
}

export interface ParserWarning {
  code: string;
  nodeType: string;
  message: string;
  location?: NodePath;
}

export interface ParserContext {
  registry: DocumentParserRegistry;
  warnings: ParserWarning[];
  cache: WeakMap<object, SectionElement>;
  documentPath: NodePath;
  options?: {
    preserveUnknown?: boolean;
    [key: string]: unknown;
  };
}

export type BlockParser = (node: any, context: ParserContext) => SectionElement | null;

/**
 * Pluggable Registry for block parsers.
 * Version v1. Supported document schema: v2.
 */
export class DocumentParserRegistry {
  public readonly version = 'v1';
  private parsers = new Map<string, BlockParser>();

  registerParser(nodeType: string, parser: BlockParser): void {
    this.parsers.set(nodeType, parser);
  }

  unregisterParser(nodeType: string): void {
    this.parsers.delete(nodeType);
  }

  getParser(nodeType: string): BlockParser | undefined {
    return this.parsers.get(nodeType);
  }
}

// -----------------------------------------------------------------------------
// UNIFIED EXTENSION SYSTEM (PLUGINS API)
// -----------------------------------------------------------------------------
export interface DocumentPlugin<TNode = any, TOutput = any> {
  name: string;
  version: string;
  schema?: any; // Custom JSON schema definition
  parser?: {
    nodeType: string;
    parse: (node: TNode, context: TiptapParserContext) => TOutput | null;
  };
  serializer?: (element: TOutput) => any;
  validator?: (element: TOutput, context: TiptapParserContext) => void;
  commands?: Record<string, (doc: JSONDocumentModel, args: any) => JSONDocumentModel>;
  renderer?: (element: TOutput) => any; // Custom React component/HTML rendering hooks
  toolbar?: {
    icon: string;
    label: string;
    action: string;
  }[];
  layoutRules?: {
    keepWithNext?: boolean;
    avoidSplit?: boolean;
    pageBreakBefore?: boolean;
  };
  migrations?: Record<number, (node: any) => any>; // Version migrations (e.g. 1 -> 2)
}

export class DocumentPluginRegistry {
  private plugins = new Map<string, DocumentPlugin>();

  public register(plugin: DocumentPlugin): void {
    this.plugins.set(plugin.name, plugin);
    console.log(`DocumentPlugin "${plugin.name}" (v${plugin.version}) successfully registered.`);
  }

  public unregister(name: string): void {
    this.plugins.delete(name);
  }

  public getPlugin(name: string): DocumentPlugin | undefined {
    return this.plugins.get(name);
  }

  public listPlugins(): DocumentPlugin[] {
    return Array.from(this.plugins.values());
  }

  public getCommands(): Record<string, (doc: JSONDocumentModel, args: any) => JSONDocumentModel> {
    const commands: Record<string, (doc: JSONDocumentModel, args: any) => JSONDocumentModel> = {};
    this.plugins.forEach(p => {
      if (p.commands) {
        Object.assign(commands, p.commands);
      }
    });
    return commands;
  }
}

export const defaultPluginRegistry = new DocumentPluginRegistry();

// -----------------------------------------------------------------------------
// EXTENSIBLE VALIDATION PIPELINE (PLUGINS)
// -----------------------------------------------------------------------------
export interface ValidationIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  blockType?: string;
  location?: NodePath;
}

export type ValidatorPlugin = (model: JSONDocumentModel) => ValidationIssue[];

export class DocumentValidatorRegistry {
  private plugins: ValidatorPlugin[] = [];

  registerValidator(plugin: ValidatorPlugin): void {
    this.plugins.push(plugin);
  }

  validate(model: JSONDocumentModel): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    this.plugins.forEach(plugin => {
      try {
        issues.push(...plugin(model));
      } catch (err) {
        console.error('Validator plugin execution failed:', err);
      }
    });
    return issues;
  }
}

export const defaultValidatorRegistry = new DocumentValidatorRegistry();

// -----------------------------------------------------------------------------
// SEAMLESS COMMAND EXECUTION LAYER
// -----------------------------------------------------------------------------
export interface CommandResult {
  success: boolean;
  affectedNodeIds?: string[];
  diagnostics?: string[];
  error?: string;
}

export interface CommandContext {
  model: JSONDocumentModel;
  updateModel: (newModel: JSONDocumentModel) => void;
}

export interface Command {
  id: string;
  name: string;
  execute(context: CommandContext, params?: Record<string, any>): CommandResult;
}

export class CommandRegistry {
  private commands = new Map<string, Command>();

  registerCommand(cmd: Command): void {
    this.commands.set(cmd.id, cmd);
  }

  unregisterCommand(id: string): void {
    this.commands.delete(id);
  }

  getCommand(id: string): Command | undefined {
    return this.commands.get(id);
  }

  executeCommand(id: string, context: CommandContext, params?: Record<string, any>): CommandResult {
    const cmd = this.commands.get(id);
    if (!cmd) {
      return {
        success: false,
        error: `Command "${id}" not registered in CommandRegistry.`
      };
    }
    try {
      return cmd.execute(context, params);
    } catch (err: any) {
      return {
        success: false,
        error: `Command execution failed: ${err?.message || err}`
      };
    }
  }
}

export const defaultCommandRegistry = new CommandRegistry();

// Helper to convert CSS style string to a Record<string, string>
function parseInlineStyle(styleString: string | null): Record<string, string> {
  if (!styleString) return {};
  const styles: Record<string, string> = {};
  styleString.split(';').forEach(rule => {
    const parts = rule.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      const value = parts.slice(1).join(':').trim();
      if (key && value) {
        styles[key] = value;
      }
    }
  });
  return styles;
}

// Helper to convert style Record to inline style string
function styleRecordToString(style: Record<string, string> | undefined): string {
  if (!style) return '';
  return Object.entries(style)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v}`)
    .join('; ');
}

// Recursively parse inline styles and text nodes into TextRuns
function parseInlineElements(node: Node, parentStyle: TextStyle = {}): (TextRun | EquationElement | ImageElement)[] {
  const elements: (TextRun | EquationElement | ImageElement)[] = [];

  node.childNodes.forEach(child => {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.nodeValue;
      if (text) {
        elements.push({
          type: 'text',
          text,
          style: Object.keys(parentStyle).length > 0 ? { ...parentStyle } : undefined
        });
      }
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as HTMLElement;
      
      // Handle Image
      if (el.tagName === 'IMG') {
        const styleRecord = parseInlineStyle(el.getAttribute('style'));
        elements.push({
          type: 'image',
          src: el.getAttribute('src') || '',
          alt: el.getAttribute('alt') || '',
          width: el.getAttribute('width') || styleRecord.width || undefined,
          height: el.getAttribute('height') || styleRecord.height || undefined,
          style: styleRecord
        });
        return;
      }

      // Handle Footnote and Endnote references
      if (el.classList.contains('prodoc-footnote-ref') || el.classList.contains('prodoc-endnote-ref')) {
        const isFootnote = el.classList.contains('prodoc-footnote-ref');
        elements.push({
          type: isFootnote ? 'footnoteReference' : 'endnoteReference',
          noteId: el.getAttribute('data-note-id') || '',
          label: el.getAttribute('data-label') || el.textContent || ''
        } as any);
        return;
      }

      // Handle Math / Equations
      if (el.tagName === 'MATH-FIELD' || el.classList.contains('equation-wrapper')) {
        let latex = '';
        if (el.tagName === 'MATH-FIELD') {
          latex = el.getAttribute('value') || el.textContent || '';
        } else {
          const mathField = el.querySelector('math-field');
          latex = mathField ? (mathField.getAttribute('value') || mathField.textContent || '') : '';
        }
        elements.push({
          type: 'equation',
          latex
        });
        return;
      }

      // Inherit styles
      const childStyle: TextStyle = { ...parentStyle };
      const tagName = el.tagName.toUpperCase();

      if (tagName === 'STRONG' || tagName === 'B') childStyle.bold = true;
      if (tagName === 'EM' || tagName === 'I') childStyle.italic = true;
      if (tagName === 'U') childStyle.underline = true;
      if (tagName === 'STRIKE' || tagName === 'S' || tagName === 'DEL') childStyle.strikeThrough = true;

      // Extract SPAN styles
      if (el.style.fontFamily) childStyle.fontFamily = el.style.fontFamily;
      if (el.style.fontSize) childStyle.fontSize = el.style.fontSize;
      if (el.style.color) childStyle.color = el.style.color;
      if (el.style.backgroundColor) childStyle.highlight = el.style.backgroundColor;

      // Handle links: render as styled text
      if (tagName === 'A') {
        childStyle.underline = true;
        childStyle.color = '#2563eb';
      }

      const childRuns = parseInlineElements(child, childStyle);
      elements.push(...childRuns);
    }
  });

  return elements;
}

// Parse a single section block
function parseBlockElement(el: HTMLElement): SectionElement | null {
  const tagName = el.tagName.toUpperCase();

  // 1. Page Break
  if (el.classList.contains('prodoc-page-break') || el.style.pageBreakAfter === 'always') {
    return { type: 'pageBreak' };
  }

  // 2. Headings
  if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(tagName)) {
    const level = parseInt(tagName.substring(1));
    const alignment = (el.style.textAlign as any) || 'left';
    const runs = parseInlineElements(el).filter(r => r.type === 'text') as TextRun[];
    return {
      type: 'heading',
      level,
      alignment,
      children: runs
    };
  }

  // 3. Table
  if (tagName === 'TABLE') {
    const rows: TableRowElement[] = [];
    const trElements = el.querySelectorAll('tr');
    trElements.forEach(tr => {
      const cells: TableCellElement[] = [];
      const cellElements = tr.querySelectorAll('td, th');
      cellElements.forEach(cell => {
        const subElements: (ParagraphElement | HeadingElement)[] = [];
        cell.childNodes.forEach(child => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            const parsed = parseBlockElement(child as HTMLElement);
            if (parsed && (parsed.type === 'paragraph' || parsed.type === 'heading')) {
              subElements.push(parsed);
            }
          } else if (child.nodeType === Node.TEXT_NODE && child.nodeValue?.trim()) {
            // Text node in table cell gets wrapped in a paragraph
            subElements.push({
              type: 'paragraph',
              children: [{ type: 'text', text: child.nodeValue }]
            });
          }
        });
        
        // Ensure table cell has at least one element
        if (subElements.length === 0) {
          subElements.push({
            type: 'paragraph',
            children: [{ type: 'text', text: '' }]
          });
        }

        cells.push({
          elements: subElements,
          style: parseInlineStyle((cell as HTMLElement).getAttribute('style'))
        });
      });

      rows.push({
        cells,
        style: parseInlineStyle(tr.getAttribute('style'))
      });
    });

    return {
      type: 'table',
      rows,
      style: parseInlineStyle(el.getAttribute('style'))
    };
  }

  // 4. Unordered/Ordered Lists
  if (tagName === 'UL' || tagName === 'OL') {
    // Treat lists as a flat list of paragraph items for layout purposes
    const listItems: ParagraphElement[] = [];
    el.childNodes.forEach((li, index) => {
      if (li.nodeType === Node.ELEMENT_NODE && (li as HTMLElement).tagName === 'LI') {
        const runs = parseInlineElements(li);
        listItems.push({
          type: 'paragraph',
          bulletList: tagName === 'UL',
          orderedList: tagName === 'OL',
          listIndex: index + 1,
          children: runs as any
        });
      }
    });
    // For single element parse block, we'll return the first list paragraph item or join them.
    // Actually, it's cleaner to handle this in body parser where UL/OL children are flattened.
    return null;
  }

  // 5. Paragraph
  const alignment = (el.style.textAlign as any) || 'left';
  const spacing: ParagraphSpacing = {};
  if (el.style.marginTop) spacing.before = parseInt(el.style.marginTop);
  if (el.style.marginBottom) spacing.after = parseInt(el.style.marginBottom);
  const indent = el.style.marginLeft ? parseInt(el.style.marginLeft) : undefined;

  const children = parseInlineElements(el);

  return {
    type: 'paragraph',
    alignment,
    spacing,
    indent,
    children
  };
}

/**
 * Converts live HTML content from the editor into our custom Structured JSON Document Model
 */
export function htmlToJSONDocument(
  html: string,
  title: string,
  pageConfig: PageConfig,
  lastModifiedDate?: Date,
  creationDate?: Date,
  footnotes?: DocumentFootnote[],
  endnotes?: DocumentEndnote[]
): JSONDocumentModel {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html || '<p><br></p>', 'text/html');

  const pages: DocumentPage[] = [];
  let currentElements: SectionElement[] = [];

  const addPage = () => {
    pages.push({
      sections: [{
        elements: currentElements.length > 0 ? [...currentElements] : [{ type: 'paragraph', children: [{ type: 'text', text: '' }] }],
        pageSettings: {
          size: pageConfig.size,
          orientation: pageConfig.orientation,
          margins: pageConfig.margins
        }
      }]
    });
    currentElements = [];
  };

  // Flatten lists during HTML traversal
  doc.body.childNodes.forEach(child => {
    if (child.nodeType !== Node.ELEMENT_NODE) return;
    const el = child as HTMLElement;
    const tagName = el.tagName.toUpperCase();

    if (tagName === 'UL' || tagName === 'OL') {
      el.querySelectorAll('li').forEach((li, index) => {
        const runs = parseInlineElements(li);
        currentElements.push({
          type: 'paragraph',
          bulletList: tagName === 'UL',
          orderedList: tagName === 'OL',
          listIndex: index + 1,
          children: runs as any
        });
      });
    } else {
      const parsed = parseBlockElement(el);
      if (parsed) {
        if (parsed.type === 'pageBreak') {
          addPage();
        } else {
          currentElements.push(parsed);
        }
      }
    }
  });

  // Add the last page
  addPage();

  const nowStr = new Date().toISOString();
  return {
    type: 'document',
    metadata: {
      title,
      lastModified: lastModifiedDate ? lastModifiedDate.toISOString() : nowStr,
      creationDate: creationDate ? creationDate.toISOString() : nowStr
    },
    pageConfig,
    pages,
    footnotes,
    endnotes
  };
}

// Render a TextRun to HTML string
function renderTextRun(run: TextRun): string {
  if (!run.style || Object.keys(run.style).length === 0) {
    return run.text;
  }

  const s = run.style;
  let html = run.text;

  // Render text markers
  if (s.bold) html = `<strong>${html}</strong>`;
  if (s.italic) html = `<em>${html}</em>`;
  if (s.underline) html = `<u>${html}</u>`;
  if (s.strikeThrough) html = `<s>${html}</s>`;

  // Apply spans for visual properties
  const styles: string[] = [];
  if (s.fontFamily) styles.push(`font-family: ${s.fontFamily}`);
  if (s.fontSize) {
    const size = typeof s.fontSize === 'number' ? `${s.fontSize}px` : s.fontSize;
    styles.push(`font-size: ${size}`);
  }
  if (s.color) styles.push(`color: ${s.color}`);
  if (s.highlight) styles.push(`background-color: ${s.highlight}`);

  if (styles.length > 0) {
    html = `<span style="${styles.join('; ')}">${html}</span>`;
  }

  return html;
}

// Render a paragraph/heading/table element to HTML string
function renderSectionElement(el: SectionElement): string {
  switch (el.type) {
    case 'heading': {
      const styles: string[] = [];
      if (el.alignment) styles.push(`text-align: ${el.alignment}`);
      const styleAttr = styles.length > 0 ? ` style="${styles.join('; ')}"` : '';
      const idAttr = el.id ? ` data-id="${el.id}"` : '';
      const styleIdAttr = el.styleId ? ` data-style-id="${el.styleId}"` : '';
      const content = el.children.map(renderTextRun).join('');
      return `<h${el.level}${styleAttr}${idAttr}${styleIdAttr}>${content || '<br>'}</h${el.level}>`;
    }

    case 'paragraph': {
      const styles: string[] = [];
      if (el.alignment) styles.push(`text-align: ${el.alignment}`);
      if (el.spacing?.before) styles.push(`margin-top: ${el.spacing.before}px`);
      if (el.spacing?.after) styles.push(`margin-bottom: ${el.spacing.after}px`);
      if (el.indent) styles.push(`margin-left: ${el.indent}px`);

      const styleAttr = styles.length > 0 ? ` style="${styles.join('; ')}"` : '';
      const idAttr = el.id ? ` data-id="${el.id}"` : '';
      const styleIdAttr = el.styleId ? ` data-style-id="${el.styleId}"` : '';
      const content = el.children.map(child => {
        if (child.type === 'text') return renderTextRun(child);
        if (child.type === 'equation') {
          return `<span class="equation-wrapper" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field placeholder="Type equation here." value="${child.latex}">${child.latex}</math-field><span class="equation-dropdown">▼</span></span>`;
        }
        if (child.type === 'image') {
          const imgStyles = styleRecordToString(child.style);
          const styleAttr = imgStyles ? ` style="${imgStyles}"` : '';
          return `<img src="${child.src}" alt="${child.alt || ''}"${styleAttr}/>`;
        }
        if ((child as any).type === 'footnoteReference') {
          const attrs = child as any;
          return `<span class="prodoc-footnote-ref font-bold text-xs select-none text-indigo-600 align-super hover:bg-indigo-100 px-0.5 rounded cursor-pointer transition-colors" data-type="footnote-ref" data-note-id="${attrs.noteId}" data-label="${attrs.label || ''}" contenteditable="false">${attrs.label || '*'}</span>`;
        }
        if ((child as any).type === 'endnoteReference') {
          const attrs = child as any;
          return `<span class="prodoc-endnote-ref font-bold text-xs select-none text-emerald-600 align-super hover:bg-emerald-100 px-0.5 rounded cursor-pointer transition-colors" data-type="endnote-ref" data-note-id="${attrs.noteId}" data-label="${attrs.label || ''}" contenteditable="false">${attrs.label || '*'}</span>`;
        }
        return '';
      }).join('');

      if (el.bulletList) {
        return `<li${styleAttr}${idAttr}${styleIdAttr}>${content || '<br>'}</li>`;
      }
      if (el.orderedList) {
        return `<li${styleAttr}${idAttr}${styleIdAttr}>${content || '<br>'}</li>`;
      }

      return `<p${styleAttr}${idAttr}${styleIdAttr}>${content || '<br>'}</p>`;
    }

    case 'table': {
      const tableStyles = styleRecordToString(el.style);
      const tableStyleAttr = tableStyles ? ` style="${tableStyles}"` : ' style="width: 100%; border-collapse: collapse;"';
      const idAttr = el.id ? ` data-id="${el.id}"` : '';
      
      let html = `<table${tableStyleAttr}${idAttr}><tbody>`;
      el.rows.forEach(row => {
        const rowStyles = styleRecordToString(row.style);
        const rowStyleAttr = rowStyles ? ` style="${rowStyles}"` : '';
        html += `<tr${rowStyleAttr}>`;
        row.cells.forEach(cell => {
          const cellStyles = styleRecordToString(cell.style);
          const cellStyleAttr = cellStyles ? ` style="${cellStyles}"` : '';
          html += `<td${cellStyleAttr}>`;
          html += cell.elements.map(renderSectionElement).join('');
          html += `</td>`;
        });
        html += `</tr>`;
      });
      html += `</tbody></table>`;
      return html;
    }

    case 'image': {
      const styles = styleRecordToString(el.style);
      const styleAttr = styles ? ` style="${styles}"` : '';
      const idAttr = el.id ? ` data-id="${el.id}"` : '';
      return `<p style="text-align: center;"><img src="${el.src}" alt="${el.alt || ''}"${styleAttr}${idAttr}/></p>`;
    }

    case 'equation': {
      const idAttr = el.id ? ` data-id="${el.id}"` : '';
      return `<p style="text-align: center;"${idAttr}><span class="equation-wrapper" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field placeholder="Type equation here." value="${el.latex}">${el.latex}</math-field><span class="equation-dropdown">▼</span></span></p>`;
    }

    case 'pageBreak': {
      return `<div class="prodoc-page-break" data-type="page-break" style="page-break-after: always;"><hr></div><p><br></p>`;
    }

    default:
      return '';
  }
}

/**
 * Converts our custom Structured JSON Document Model back into standard HTML content for editor injection and rendering
 */
export function jsonDocumentToHtml(model: JSONDocumentModel | null): string {
  if (!model || !model.pages) return '<p><br></p>';

  const htmlParts: string[] = [];

  model.pages.forEach((page, pageIdx) => {
    // If it's not the first page, prepend a page break
    if (pageIdx > 0) {
      htmlParts.push(`<div class="prodoc-page-break" data-type="page-break" style="page-break-after: always;"><hr></div><p><br></p>`);
    }

    page.sections.forEach(section => {
      let activeListType: 'UL' | 'OL' | null = null;
      
      section.elements.forEach(element => {
        // Handle list wrapping to output semantic <ul> / <ol> blocks
        if (element.type === 'paragraph' && (element.bulletList || element.orderedList)) {
          const expectedListType = element.bulletList ? 'UL' : 'OL';
          if (activeListType !== expectedListType) {
            if (activeListType !== null) {
              htmlParts.push(`</${activeListType}>`);
            }
            htmlParts.push(`<${expectedListType}>`);
            activeListType = expectedListType;
          }
          htmlParts.push(renderSectionElement(element));
        } else {
          if (activeListType !== null) {
            htmlParts.push(`</${activeListType}>`);
            activeListType = null;
          }
          htmlParts.push(renderSectionElement(element));
        }
      });

      if (activeListType !== null) {
        htmlParts.push(`</${activeListType}>`);
      }
    });
  });

  return htmlParts.join('\n');
}

export function jsonDocumentToMarkdown(model: JSONDocumentModel | null): string {
  if (!model || !model.pages) return '';
  const mdParts: string[] = [];

  model.pages.forEach((page, pageIdx) => {
    if (pageIdx > 0) {
      mdParts.push('\n---\n'); // Page break in Markdown is a horizontal rule
    }

    page.sections.forEach(section => {
      section.elements.forEach(element => {
        switch (element.type) {
          case 'heading': {
            const hashes = '#'.repeat(Math.min(Math.max(element.level, 1), 6));
            const text = element.children.map(c => renderTextRunToMarkdown(c)).join('');
            mdParts.push(`${hashes} ${text}`);
            break;
          }
          case 'paragraph': {
            const prefix = element.bulletList ? '- ' : element.orderedList ? '1. ' : '';
            const text = element.children.map(child => {
              if (child.type === 'text') return renderTextRunToMarkdown(child);
              if (child.type === 'equation') return `$$${child.latex}$$`;
              if (child.type === 'image') return `![${child.alt || ''}](${child.src})`;
              return '';
            }).join('');
            mdParts.push(`${prefix}${text}`);
            break;
          }
          case 'table': {
            // Serialize to Markdown table
            const tableLines: string[] = [];
            element.rows.forEach((row, rIdx) => {
              const cells = row.cells.map(cell => {
                return cell.elements.map(el => {
                  if (el.type === 'paragraph' || el.type === 'heading') {
                    return el.children.map(c => {
                      if (c.type === 'text') return renderTextRunToMarkdown(c);
                      return '';
                    }).join('');
                  }
                  return '';
                }).join(' ');
              });
              tableLines.push(`| ${cells.join(' | ')} |`);
              if (rIdx === 0) {
                // Separator row
                const separators = row.cells.map(() => '---');
                tableLines.push(`| ${separators.join(' | ')} |`);
              }
            });
            mdParts.push(tableLines.join('\n'));
            break;
          }
          case 'image': {
            mdParts.push(`![${element.alt || ''}](${element.src})`);
            break;
          }
          case 'equation': {
            mdParts.push(`$$${element.latex}$$`);
            break;
          }
          case 'pageBreak': {
            mdParts.push('\n---\n');
            break;
          }
          default:
            break;
        }
      });
    });
  });

  return mdParts.join('\n\n');
}

function renderTextRunToMarkdown(run: TextRun): string {
  let text = run.text;
  if (run.style?.bold) text = `**${text}**`;
  if (run.style?.italic) text = `*${text}*`;
  if (run.style?.underline) text = `<u>${text}</u>`;
  if (run.style?.strikeThrough) text = `~~${text}~~`;
  return text;
}

// -----------------------------------------------------------------------------
// Advanced, Extensible TipTap AST -> JSON Document Model Parser Pipeline
// -----------------------------------------------------------------------------

export interface ParserIssue {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'fatal' | 'performance' | 'compatibility' | 'deprecated';
  category: 'schema' | 'structure' | 'accessibility' | 'validation' | 'generic';
  message: string;
  location: (string | number)[]; // Traversal path as an immutable array
  code: string;
  recoverable: boolean;
  suggestion?: string;
  relatedNodes?: string[];
}

export interface ParserMetrics {
  timeSpentMs: number;
  nodesParsed: number;
  warningsCount: number;
  unknownNodes: number;
  cacheHits: number;
  cacheMisses: number;
}

export type RecoveryStrategy = 'skip' | 'replace' | 'wrap' | 'preserve' | 'repair';

export interface ParserOptions {
  preserveUnknown?: boolean;
  enableDiagnostics?: boolean;
  enableCache?: boolean;
  enableValidation?: boolean;
  enableNormalization?: boolean;
  enableRecovery?: boolean;
  recoveryStrategy?: RecoveryStrategy;
}

export interface TiptapParserContext {
  registry: TiptapParserRegistry;
  issues: ParserIssue[];
  cache: WeakMap<object, SectionElement>;
  path: (string | number)[]; // Immutable array path
  signal?: AbortSignal;
  aborted?: boolean;
  idGenerator: () => string;
  options: ParserOptions;
  metrics: ParserMetrics;
}

export interface ParserLifecycleHooks<TNode, TOutput, TContext> {
  beforeParse?: (node: TNode, context: TContext) => void | TNode;
  afterParse?: (node: TNode, result: TOutput | null, context: TContext) => void | TOutput;
  onIssue?: (issue: ParserIssue, context: TContext) => void;
  onUnknownNode?: (node: TNode, context: TContext) => void;
}

export interface ParserPlugin<TNode, TOutput, TContext> {
  name: string;
  version: string;
  priority: number; // Highest priority wins
  supports: (node: TNode, context: TContext) => boolean;
  parse: (node: TNode, context: TContext) => TOutput | null;
  hooks?: ParserLifecycleHooks<TNode, TOutput, TContext>;
}

export class ParserRegistry<TNode, TOutput, TContext> {
  public readonly version = '1.0.0';
  public readonly schemaVersion = 1;
  private plugins: ParserPlugin<TNode, TOutput, TContext>[] = [];

  public register(plugin: ParserPlugin<TNode, TOutput, TContext>): void {
    this.plugins.push(plugin);
    // Sort descending by priority
    this.plugins.sort((a, b) => b.priority - a.priority);
  }

  public getParser(node: TNode, context: TContext): ParserPlugin<TNode, TOutput, TContext> | null {
    for (const plugin of this.plugins) {
      if (plugin.supports(node, context)) {
        return plugin;
      }
    }
    return null;
  }

  public list(): ParserPlugin<TNode, TOutput, TContext>[] {
    return [...this.plugins];
  }

  public describe(): string[] {
    return this.plugins.map(p => `${p.name} (v${p.version}) - Priority ${p.priority}`);
  }

  public capabilities(): string[] {
    return this.plugins.map(p => p.name);
  }

  public clear(): void {
    this.plugins = [];
  }
}

export class TiptapParserRegistry extends ParserRegistry<TiptapJSONNode, SectionElement, TiptapParserContext> {}

export const defaultTiptapRegistry = new TiptapParserRegistry();

// Standard mark parser
function parseTiptapMarks(marks?: any[]): TextStyle {
  if (!marks) return {};
  const style: TextStyle = {};
  marks.forEach(m => {
    if (m.type === 'bold') style.bold = true;
    if (m.type === 'italic') style.italic = true;
    if (m.type === 'underline') style.underline = true;
    if (m.type === 'strike') style.strikeThrough = true;
    if (m.type === 'textStyle' && m.attrs) {
      if (m.attrs.color) style.color = m.attrs.color;
      if (m.attrs.fontFamily) style.fontFamily = m.attrs.fontFamily;
      if (m.attrs.fontSize) style.fontSize = m.attrs.fontSize;
    }
    if (m.type === 'highlight' && m.attrs) {
      if (m.attrs.color) style.highlight = m.attrs.color;
    }
    if (m.type === 'link') {
      style.underline = true;
      style.color = '#2563eb';
    }
  });
  return style;
}

// Inline nodes parser
function parseTiptapInlineNodes(nodes?: TiptapJSONNode[], context?: TiptapParserContext): (TextRun | EquationElement | ImageElement)[] {
  if (!nodes) return [];
  const elements: (TextRun | EquationElement | ImageElement)[] = [];
  const nextId = () => context ? context.idGenerator() : Math.random().toString(36).substr(2, 9);
  
  nodes.forEach(n => {
    if (n.type === 'text') {
      elements.push({
        type: 'text',
        text: n.text || '',
        style: parseTiptapMarks(n.marks)
      });
    } else if (n.type === 'image') {
      const styleRecord = parseInlineStyle(n.attrs?.style || null);
      elements.push({
        id: `node-image-${nextId()}`,
        type: 'image',
        src: n.attrs?.src || '',
        alt: n.attrs?.alt || '',
        width: n.attrs?.width || styleRecord.width || undefined,
        height: n.attrs?.height || styleRecord.height || undefined,
        style: styleRecord
      });
    } else if (n.type === 'mathEquation') {
      elements.push({
        id: `node-equation-${nextId()}`,
        type: 'equation',
        latex: n.attrs?.latex || ''
      });
    }
  });
  return elements;
}

// Dedicated Parser Functions for Built-Ins
export function parseTiptapParagraphNode(node: TiptapJSONNode, context: TiptapParserContext): ParagraphElement | null {
  const spacing: ParagraphSpacing = {};
  if (node.attrs?.spacingBefore) spacing.before = node.attrs.spacingBefore;
  if (node.attrs?.spacingAfter) spacing.after = node.attrs.spacingAfter;
  
  return {
    id: node.attrs?.id || `node-paragraph-${context.idGenerator()}`,
    type: 'paragraph',
    styleId: node.attrs?.styleId || undefined,
    alignment: node.attrs?.textAlign || 'left',
    indent: node.attrs?.indent || undefined,
    spacing: Object.keys(spacing).length > 0 ? spacing : undefined,
    children: parseTiptapInlineNodes(node.content, context)
  };
}

export function parseTiptapHeadingNode(node: TiptapJSONNode, context: TiptapParserContext): HeadingElement | null {
  return {
    id: node.attrs?.id || `node-heading-${context.idGenerator()}`,
    type: 'heading',
    styleId: node.attrs?.styleId || undefined,
    level: node.attrs?.level || 1,
    alignment: node.attrs?.textAlign || 'left',
    children: parseTiptapInlineNodes(node.content, context) as TextRun[]
  };
}

export function parseTiptapTableNode(node: TiptapJSONNode, context: TiptapParserContext): TableElement | null {
  const rows: TableRowElement[] = [];
  
  const content = node.content || [];
  for (let rIdx = 0; rIdx < content.length; rIdx++) {
    const rowNode = content[rIdx];
    if (rowNode.type === 'tableRow') {
      const cells: TableCellElement[] = [];
      const rowContent = rowNode.content || [];
      for (let cIdx = 0; cIdx < rowContent.length; cIdx++) {
        const cellNode = rowContent[cIdx];
        if (cellNode.type === 'tableCell' || cellNode.type === 'tableHeader') {
          const subElements: (ParagraphElement | HeadingElement)[] = [];
          const cellContent = cellNode.content || [];
          for (let sIdx = 0; sIdx < cellContent.length; sIdx++) {
            const subNode = cellContent[sIdx];
            
            // Recurse using our immutable paths
            const childContext: TiptapParserContext = {
              ...context,
              path: [...context.path, 'content', rIdx, 'content', cIdx, 'content', sIdx]
            };
            const parsed = parseTiptapBlockNode(subNode, childContext);
            if (parsed && (parsed.type === 'paragraph' || parsed.type === 'heading')) {
              subElements.push(parsed);
            }
          }
          if (subElements.length === 0) {
            subElements.push({
              id: `node-paragraph-${context.idGenerator()}`,
              type: 'paragraph',
              children: [{ type: 'text', text: '' }]
            });
          }
          cells.push({
            elements: subElements,
            style: parseInlineStyle(cellNode.attrs?.style || null)
          });
        }
      }
      rows.push({
        cells,
        style: parseInlineStyle(rowNode.attrs?.style || null)
      });
    }
  }

  return {
    id: node.attrs?.id || `node-table-${context.idGenerator()}`,
    type: 'table',
    rows,
    style: parseInlineStyle(node.attrs?.style || null)
  };
}

export function parseTiptapImageNode(node: TiptapJSONNode, context: TiptapParserContext): ImageElement | null {
  const styleRecord = parseInlineStyle(node.attrs?.style || null);
  return {
    id: node.attrs?.id || `node-image-${context.idGenerator()}`,
    type: 'image',
    src: node.attrs?.src || '',
    alt: node.attrs?.alt || '',
    width: node.attrs?.width || styleRecord.width || undefined,
    height: node.attrs?.height || styleRecord.height || undefined,
    style: styleRecord
  };
}

export function parseTiptapEquationNode(node: TiptapJSONNode, context: TiptapParserContext): EquationElement | null {
  return {
    id: `node-equation-${context.idGenerator()}`,
    type: 'equation',
    latex: node.attrs?.latex || ''
  };
}

export function parseTiptapPageBreakNode(_node: TiptapJSONNode, context: TiptapParserContext): PageBreakElement | null {
  return {
    id: `node-pagebreak-${context.idGenerator()}`,
    type: 'pageBreak'
  };
}

export function parseTiptapFallbackNode(node: TiptapJSONNode, context: TiptapParserContext): SectionElement | null {
  context.metrics.unknownNodes++;
  const warningId = `warn-unknown-${context.idGenerator()}`;
  const strategy = context.options.recoveryStrategy || 'preserve';

  const issue: ParserIssue = {
    id: warningId,
    severity: strategy === 'skip' ? 'info' : 'warning',
    category: 'structure',
    message: `Encountered unknown Tiptap node type: "${node.type}". Recovery strategy applied: "${strategy}".`,
    location: context.path,
    code: 'UNKNOWN_TIPTAP_NODE',
    recoverable: true,
    suggestion: 'Verify that any custom Tiptap extension is correctly registered or loaded.'
  };
  context.issues.push(issue);
  context.metrics.warningsCount++;

  if (strategy === 'skip') {
    return null;
  }

  let children: (TextRun | EquationElement | ImageElement)[] = [];
  if (node.content && node.content.length > 0) {
    children = parseTiptapInlineNodes(node.content, context);
  } else if (node.text) {
    children = [{
      type: 'text',
      text: node.text,
      style: parseTiptapMarks(node.marks)
    }];
  }

  if (strategy === 'replace') {
    return {
      id: `node-paragraph-replaced-${context.idGenerator()}`,
      type: 'paragraph',
      children: [{
        type: 'text',
        text: `[Replaced Unknown Content: "${node.type || 'unknown'}"]`,
        style: { italic: true, color: '#9ca3af' }
      }]
    };
  }

  if (strategy === 'wrap' || (strategy === 'repair' && children.length > 0)) {
    return {
      id: `node-paragraph-wrapped-${context.idGenerator()}`,
      type: 'paragraph',
      children: children.length > 0 ? children : [{ type: 'text', text: '' }]
    };
  }

  return {
    id: `node-unknown-${context.idGenerator()}`,
    type: 'unknown',
    originalType: node.type || 'unknown',
    originalNode: typeof node === 'object' ? node as Record<string, unknown> : { rawValue: node },
    attrs: node.attrs,
    marks: node.marks,
    content: node.content,
    text: node.text,
    raw: node,
    warningId,
    children
  };
}

// Primary Dispatch Router with fast built-ins switch + pluggable fallback
export function parseTiptapBlockNode(node: TiptapJSONNode, context: TiptapParserContext): SectionElement | null {
  if (!node) return null;

  // Cancellation support
  if (context.signal?.aborted) {
    context.aborted = true;
    return null;
  }

  // Nesting depth limit safety
  if (context.path.length > 50) {
    const issue: ParserIssue = {
      id: `issue-depth-${context.idGenerator()}`,
      severity: 'fatal',
      category: 'structure',
      message: 'Nesting depth limit of 50 exceeded. Aborted deep nesting traversal.',
      location: context.path,
      code: 'DEPTH_LIMIT_EXCEEDED',
      recoverable: false
    };
    context.issues.push(issue);
    context.metrics.warningsCount++;
    return null;
  }

  context.metrics.nodesParsed++;

  // Cache lookup check
  if (context.options.enableCache !== false && context.cache.has(node)) {
    context.metrics.cacheHits++;
    return context.cache.get(node)!;
  }
  context.metrics.cacheMisses++;

  let result: SectionElement | null = null;

  // Determine built-in types vs pluggable plugins
  switch (node.type) {
    case 'paragraph':
      result = parseTiptapParagraphNode(node, context);
      break;
    case 'heading':
      result = parseTiptapHeadingNode(node, context);
      break;
    case 'table':
      result = parseTiptapTableNode(node, context);
      break;
    case 'image':
      result = parseTiptapImageNode(node, context);
      break;
    case 'mathEquation':
      result = parseTiptapEquationNode(node, context);
      break;
    case 'pageBreak':
      result = parseTiptapPageBreakNode(node, context);
      break;
    default: {
      const plugin = context.registry.getParser(node, context);
      if (plugin) {
        if (plugin.hooks?.beforeParse) {
          const modNode = plugin.hooks.beforeParse(node, context);
          if (modNode) node = modNode;
        }
        result = plugin.parse(node, context);
        if (plugin.hooks?.afterParse) {
          const modResult = plugin.hooks.afterParse(node, result, context);
          if (modResult) result = modResult;
        }
      } else {
        result = parseTiptapFallbackNode(node, context);
      }
      break;
    }
  }

  if (result) {
    if (!result.id) {
      result.id = `node-${result.type}-${context.idGenerator()}`;
    }
    if (context.options.enableCache !== false) {
      context.cache.set(node, result);
    }
  }

  return result;
}

function traverseTiptapContent(nodes: TiptapJSONNode[], target: SectionElement[], context: TiptapParserContext) {
  for (let idx = 0; idx < nodes.length; idx++) {
    const n = nodes[idx];
    
    // Check abort signal during iteration
    if (context.signal?.aborted) {
      context.aborted = true;
      break;
    }

    const itemContext = {
      ...context,
      path: [...context.path, 'content', idx]
    };

    if (n.type === 'bulletList' || n.type === 'orderedList') {
      const isBullet = n.type === 'bulletList';
      const items = n.content || [];
      for (let liIdx = 0; liIdx < items.length; liIdx++) {
        // Quick abort check during nested loops
        if (context.signal?.aborted) {
          context.aborted = true;
          break;
        }

        const li = items[liIdx];
        if (li.type === 'listItem') {
          const subNodes = li.content || [];
          for (let sIdx = 0; sIdx < subNodes.length; sIdx++) {
            if (context.signal?.aborted) {
              context.aborted = true;
              break;
            }

            const subNode = subNodes[sIdx];
            const subContext = {
              ...itemContext,
              path: [...itemContext.path, 'content', liIdx, 'content', sIdx]
            };
            const parsed = parseTiptapBlockNode(subNode, subContext);
            if (parsed && parsed.type === 'paragraph') {
              parsed.bulletList = isBullet;
              parsed.orderedList = !isBullet;
              parsed.listIndex = liIdx + 1;
              target.push(parsed);
            } else if (parsed) {
              target.push(parsed);
            }
          }
        }
      }
    } else {
      const parsed = parseTiptapBlockNode(n, itemContext);
      if (parsed) {
        target.push(parsed);
      }
    }

    if (context.aborted) {
      break;
    }
  }
}

// -----------------------------------------------------------------------------
// STAGE-BASED PIPELINE ARCHITECTURE (MODULAR, PLUGGABLE, INDEPENDENT STAGES)
// -----------------------------------------------------------------------------

export interface ParserStage<TInput, TOutput> {
  name: string;
  execute(input: TInput, context: TiptapParserContext): TOutput;
}

export class TiptapNormalizationStage implements ParserStage<SectionElement[], SectionElement[]> {
  public readonly name = 'Normalization';

  public execute(elements: SectionElement[], context: TiptapParserContext): SectionElement[] {
    if (context.options.enableNormalization === false) {
      return elements;
    }
    return elements.map((el, index) => {
      if (el.type === 'paragraph' && (!el.children || el.children.length === 0)) {
        return {
          ...el,
          children: [{ type: 'text', text: '' }]
        };
      }
      if (el.type === 'paragraph' && (el.bulletList || el.orderedList)) {
        if (!el.listIndex) {
          return {
            ...el,
            listIndex: index + 1
          };
        }
      }
      return el;
    });
  }
}

// Pluggable validation rules
export interface ValidationRule {
  name: string;
  code: string;
  validate(element: SectionElement, context: TiptapParserContext): void;
}

export class ValidationRegistry {
  private rules: ValidationRule[] = [];

  public register(rule: ValidationRule): void {
    this.rules.push(rule);
  }

  public getRules(): ValidationRule[] {
    return this.rules;
  }
}

export const defaultValidationRegistry = new ValidationRegistry();

export const HeadingLevelRule: ValidationRule = {
  name: 'Heading Level Rule',
  code: 'INVALID_HEADING_LEVEL',
  validate(el, context) {
    if (el.type === 'heading' && (el.level < 1 || el.level > 6)) {
      context.issues.push({
        id: `val-heading-level-${context.idGenerator()}`,
        severity: 'warning',
        category: 'validation',
        message: `Heading element has out-of-bounds level: ${el.level}. Resetting to standard.`,
        location: [...context.path, 'elements', el.id || ''],
        code: 'INVALID_HEADING_LEVEL',
        recoverable: true,
        suggestion: 'Heading levels must fall strictly in the range of 1 to 6.'
      });
      el.level = Math.max(1, Math.min(6, el.level));
      context.metrics.warningsCount++;
    }
  }
};

export const TableIntegrityRule: ValidationRule = {
  name: 'Table Integrity Rule',
  code: 'EMPTY_TABLE',
  validate(el, context) {
    if (el.type === 'table') {
      if (!el.rows || el.rows.length === 0) {
        context.issues.push({
          id: `val-table-empty-${context.idGenerator()}`,
          severity: 'warning',
          category: 'validation',
          message: 'Table has no rows. This is structurally invalid.',
          location: [...context.path, 'elements', el.id || ''],
          code: 'EMPTY_TABLE',
          recoverable: true,
          suggestion: 'Ensure tables contain at least one row and cell.'
        });
        context.metrics.warningsCount++;
      }
    }
  }
};

export const AccessibilityAltTextRule: ValidationRule = {
  name: 'Image Alt Text Accessibility Rule',
  code: 'MISSING_ALT_TEXT',
  validate(el, context) {
    if (el.type === 'image' && !el.alt) {
      context.issues.push({
        id: `val-img-alt-${context.idGenerator()}`,
        severity: 'info',
        category: 'accessibility',
        message: 'Image is missing alt text. Alt text is recommended for screen readers.',
        location: [...context.path, 'elements', el.id || ''],
        code: 'MISSING_ALT_TEXT',
        recoverable: true,
        suggestion: 'Add meaningful alt text explaining what the image depicts.'
      });
      context.metrics.warningsCount++;
    }
  }
};

defaultValidationRegistry.register(HeadingLevelRule);
defaultValidationRegistry.register(TableIntegrityRule);
defaultValidationRegistry.register(AccessibilityAltTextRule);

export class TiptapValidationStage implements ParserStage<SectionElement[], SectionElement[]> {
  public readonly name = 'Validation';
  private registry: ValidationRegistry;

  constructor(registry: ValidationRegistry = defaultValidationRegistry) {
    this.registry = registry;
  }

  public execute(elements: SectionElement[], context: TiptapParserContext): SectionElement[] {
    if (context.options.enableValidation === false) {
      return elements;
    }
    const rules = this.registry.getRules();
    elements.forEach(el => {
      rules.forEach(rule => {
        try {
          rule.validate(el, context);
        } catch (err) {
          console.error(`Error running validation rule ${rule.name}:`, err);
        }
      });
    });
    return elements;
  }
}

export class TiptapFinalizationStage implements ParserStage<SectionElement[], DocumentPage[]> {
  public readonly name = 'Finalization';
  private pageConfig: PageConfig;

  constructor(pageConfig: PageConfig) {
    this.pageConfig = pageConfig;
  }

  public execute(elements: SectionElement[], _context: TiptapParserContext): DocumentPage[] {
    const pages: DocumentPage[] = [];
    let currentElements: SectionElement[] = [];

    const addPage = () => {
      pages.push({
        sections: [{
          elements: currentElements.length > 0 ? [...currentElements] : [{ type: 'paragraph', children: [{ type: 'text', text: '' }] }],
          pageSettings: {
            size: this.pageConfig.size,
            orientation: this.pageConfig.orientation,
            margins: this.pageConfig.margins
          }
        }]
      });
      currentElements = [];
    };

    elements.forEach(el => {
      if (el.type === 'pageBreak') {
        addPage();
      } else {
        currentElements.push(el);
      }
    });

    addPage();
    return pages;
  }
}

export interface ParserCancelledResult {
  type: 'cancelled';
  reason: string;
  metrics: ParserMetrics;
}

/**
 * Converts a direct TipTap JSON AST into our custom Structured JSON Document Model.
 * Provides a massive performance boost over HTML parsing.
 */
export function tiptapJSONToJSONDocument(
  tiptapJson: any,
  title: string,
  pageConfig: PageConfig,
  lastModifiedDate?: Date,
  creationDate?: Date,
  options: ParserOptions = {}
): JSONDocumentModel | ParserCancelledResult {
  const startTime = performance.now();
  
  // 1. Pipeline Stage: Initialization & Dependency Injection
  const idGenerator = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const metrics: ParserMetrics = {
    timeSpentMs: 0,
    nodesParsed: 0,
    warningsCount: 0,
    unknownNodes: 0,
    cacheHits: 0,
    cacheMisses: 0
  };

  const context: TiptapParserContext = {
    registry: defaultTiptapRegistry,
    issues: [],
    cache: new WeakMap<object, SectionElement>(),
    path: ['document'],
    idGenerator,
    options,
    metrics
  };

  // 2. Pipeline Stage: Transform & Parse Traversal
  const allElements: SectionElement[] = [];
  if (tiptapJson && tiptapJson.content) {
    traverseTiptapContent(tiptapJson.content, allElements, context);
  }

  // Graceful Cancellation handling returning a structured result
  if (context.aborted) {
    metrics.timeSpentMs = performance.now() - startTime;
    return {
      type: 'cancelled',
      reason: 'Parsing aborted via AbortSignal',
      metrics
    };
  }

  // 3. Pipeline Stage: Normalization & Structural Recovery
  const normalizer = new TiptapNormalizationStage();
  const normalizedElements = normalizer.execute(allElements, context);

  // 4. Pipeline Stage: Schema Validation & Diagnostic Scoring
  const validator = new TiptapValidationStage();
  const validatedElements = validator.execute(normalizedElements, context);

  // 5. Pipeline Stage: Finalization & Document Compilation
  const finalizer = new TiptapFinalizationStage(pageConfig);
  const pages = finalizer.execute(validatedElements, context);

  metrics.timeSpentMs = performance.now() - startTime;
  
  // If options request logs, report metrics & diagnostics
  if (options.enableDiagnostics) {
    console.log(`TipTap Pipeline Parsed ${metrics.nodesParsed} nodes in ${metrics.timeSpentMs.toFixed(2)}ms (Cache hits: ${metrics.cacheHits}, Unknown: ${metrics.unknownNodes})`);
    if (context.issues.length > 0) {
      console.warn('TipTap Parser Diagnostics issues encountered:', context.issues);
    }
  }

  const nowStr = new Date().toISOString();
  return {
    type: 'document',
    schemaVersion: 2, // Modernized schema
    modelVersion: 'v2.1.0-alpha',
    parserVersion: 'v1.0.0-stage-based',
    metadata: {
      title,
      lastModified: lastModifiedDate ? lastModifiedDate.toISOString() : nowStr,
      creationDate: creationDate ? creationDate.toISOString() : nowStr
    },
    pageConfig,
    pages
  };
}

// -----------------------------------------------------------------------------
// DEVELOPMENT IMMUTABILITY SYSTEM
// -----------------------------------------------------------------------------
export class DevelopmentImmutability {
  /**
   * Freezes the root model object and its direct top-level arrays if in development mode.
   * This guarantees that unintended inline mutations do not slip through during development.
   */
  public static freeze<T extends object>(obj: T): T {
    if (process.env.NODE_ENV !== 'production' && typeof Object.freeze === 'function') {
      try {
        Object.freeze(obj);
        if ('pages' in obj && Array.isArray((obj as any).pages)) {
          Object.freeze((obj as any).pages);
          (obj as any).pages.forEach((page: any) => {
            if (page && typeof page === 'object') {
              Object.freeze(page);
              if (Array.isArray(page.sections)) {
                Object.freeze(page.sections);
                page.sections.forEach((sec: any) => {
                  if (sec && typeof sec === 'object') {
                    Object.freeze(sec);
                    if (Array.isArray(sec.elements)) {
                      Object.freeze(sec.elements);
                    }
                  }
                });
              }
            }
          });
        }
        if ('metadata' in obj && typeof (obj as any).metadata === 'object') {
          Object.freeze((obj as any).metadata);
        }
        if ('pageConfig' in obj && typeof (obj as any).pageConfig === 'object') {
          Object.freeze((obj as any).pageConfig);
        }
      } catch (err) {
        // Prevent crashes if some objects are already frozen or non-extensible
        console.warn('DevelopmentImmutability error:', err);
      }
    }
    return obj;
  }

  /**
   * Freezes a specific node subtree in development.
   */
  public static freezeSubtree<T extends object>(subtree: T): T {
    if (process.env.NODE_ENV !== 'production' && typeof Object.freeze === 'function') {
      try {
        Object.freeze(subtree);
      } catch (e) {
        // Safe fallback
      }
    }
    return subtree;
  }
}

// -----------------------------------------------------------------------------
// BIDIRECTIONAL SCHEMA MIGRATION ENGINE
// -----------------------------------------------------------------------------
export interface DocumentMigration {
  fromVersion: number;
  toVersion: number;
  migrate(model: JSONDocumentModel): JSONDocumentModel;
}

export class DocumentMigrationRegistry {
  private migrations = new Map<string, DocumentMigration>();

  public register(migration: DocumentMigration): void {
    this.migrations.set(`${migration.fromVersion}->${migration.toVersion}`, migration);
    console.log(`Registered bidirectional migration pathway: ${migration.fromVersion} <-> ${migration.toVersion}`);
  }

  public getMigration(from: number, to: number): DocumentMigration | undefined {
    return this.migrations.get(`${from}->${to}`);
  }

  /**
   * Translates the document from any start version to target targetVersion using BFS path-finding.
   */
  public migrate(model: JSONDocumentModel, targetVersion: number): JSONDocumentModel {
    const currentVersion = model.schemaVersion || 1;
    if (currentVersion === targetVersion) return model;

    const path = this.findMigrationPath(currentVersion, targetVersion);
    if (path.length === 0) {
      console.warn(`No bidirectional migration path found from v${currentVersion} to v${targetVersion}.`);
      return model;
    }

    let current = JSON.parse(JSON.stringify(model)) as JSONDocumentModel;
    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i];
      const to = path[i + 1];
      const migration = this.getMigration(from, to);
      if (migration) {
        current = migration.migrate(current);
        current.schemaVersion = to;
      } else {
        console.error(`Broken migration pathway from v${from} to v${to}`);
        break;
      }
    }

    return current;
  }

  private findMigrationPath(start: number, end: number): number[] {
    const queue: { version: number; path: number[] }[] = [{ version: start, path: [start] }];
    const visited = new Set<number>([start]);

    while (queue.length > 0) {
      const { version, path } = queue.shift()!;
      if (version === end) return path;

      for (const key of this.migrations.keys()) {
        const [fromStr, toStr] = key.split('->');
        const from = parseInt(fromStr, 10);
        const to = parseInt(toStr, 10);
        if (from === version && !visited.has(to)) {
          visited.add(to);
          queue.push({ version: to, path: [...path, to] });
        }
      }
    }
    return [];
  }
}

export const defaultMigrationRegistry = new DocumentMigrationRegistry();

// Default Upward v1 -> v2 migration
defaultMigrationRegistry.register({
  fromVersion: 1,
  toVersion: 2,
  migrate(model: JSONDocumentModel): JSONDocumentModel {
    const migrated = JSON.parse(JSON.stringify(model)) as JSONDocumentModel;
    if (!migrated.pageConfig) {
      migrated.pageConfig = {
        size: 'letter',
        orientation: 'portrait',
        margins: { top: 72, bottom: 72, left: 72, right: 72 }
      };
    }
    if (!migrated.pages) migrated.pages = [];
    let nodeCounter = 0;
    migrated.pages.forEach((page, pIdx) => {
      if (!page.sections) page.sections = [{ elements: [] }];
      page.sections.forEach((sec, sIdx) => {
        if (!sec.elements) sec.elements = [];
        sec.elements = sec.elements.map((el, eIdx) => {
          if (!el.id) {
            el.id = `migrated-node-${el.type}-${pIdx}-${sIdx}-${eIdx}-${++nodeCounter}`;
          }
          if (el.type === 'table') {
            el.rows = el.rows.map(row => ({
              ...row,
              cells: row.cells.map(cell => {
                const cellElements = cell.elements.map(cellEl => {
                  if (!cellEl.id) {
                    return { ...cellEl, id: `migrated-cell-node-${cellEl.type}-${++nodeCounter}` };
                  }
                  return cellEl;
                });
                return { ...cell, elements: cellElements };
              })
            }));
          }
          return el;
        });
      });
    });
    migrated.schemaVersion = 2;
    return migrated;
  }
});

// Default Downward v2 -> v1 migration
defaultMigrationRegistry.register({
  fromVersion: 2,
  toVersion: 1,
  migrate(model: JSONDocumentModel): JSONDocumentModel {
    const downgraded = JSON.parse(JSON.stringify(model)) as any;
    // Strip v2 elements/structures that are incompatible or irrelevant to v1
    delete downgraded.comments;
    delete downgraded.bookmarks;
    delete downgraded.operations;
    delete downgraded.revisionHistory;
    downgraded.schemaVersion = 1;
    return downgraded as JSONDocumentModel;
  }
});

/**
 * Migrates a JSONDocumentModel to a target version using the bidirectional engine.
 * Handles backward-compatibility and schema upgrades gracefully.
 */
export function migrateDocumentToTargetVersion(model: JSONDocumentModel, targetVersion: number): JSONDocumentModel {
  return defaultMigrationRegistry.migrate(model, targetVersion);
}

// -----------------------------------------------------------------------------
// PARSING SEPARATED FROM PATCHING: THE DIFF/PATCH ENGINE
// -----------------------------------------------------------------------------
export interface DocumentPatch {
  type: 'update_element' | 'delete_element' | 'insert_element' | 'update_metadata' | 'update_page_config';
  targetId?: string;
  path?: (string | number)[];
  payload: any;
}

export class DocumentDiffPatchEngine {
  /**
   * Replaces/patches a single node inside the document model immutably.
   */
  public static patchNode(model: JSONDocumentModel, nodeId: string, updatedElement: SectionElement): JSONDocumentModel {
    const copy = JSON.parse(JSON.stringify(model)) as JSONDocumentModel;
    let applied = false;

    for (let p = 0; p < copy.pages.length; p++) {
      const page = copy.pages[p];
      for (let s = 0; s < page.sections.length; s++) {
        const sec = page.sections[s];
        const idx = sec.elements.findIndex(el => el.id === nodeId);
        if (idx !== -1) {
          sec.elements[idx] = JSON.parse(JSON.stringify(updatedElement));
          applied = true;
          break;
        }
      }
      if (applied) break;
    }

    if (!applied) {
      console.warn(`Patch target node ID ${nodeId} was not found in the active document.`);
    }
    return copy;
  }

  /**
   * Inserts a new element after the referenced nodeId immutably.
   */
  public static insertNodeAfter(model: JSONDocumentModel, referenceNodeId: string, newNode: SectionElement): JSONDocumentModel {
    const copy = JSON.parse(JSON.stringify(model)) as JSONDocumentModel;
    let applied = false;

    for (let p = 0; p < copy.pages.length; p++) {
      const page = copy.pages[p];
      for (let s = 0; s < page.sections.length; s++) {
        const sec = page.sections[s];
        const idx = sec.elements.findIndex(el => el.id === referenceNodeId);
        if (idx !== -1) {
          sec.elements.splice(idx + 1, 0, JSON.parse(JSON.stringify(newNode)));
          applied = true;
          break;
        }
      }
      if (applied) break;
    }

    return copy;
  }

  /**
   * Deletes a node by its ID.
   */
  public static deleteNode(model: JSONDocumentModel, nodeId: string): JSONDocumentModel {
    const copy = JSON.parse(JSON.stringify(model)) as JSONDocumentModel;
    let applied = false;

    for (let p = 0; p < copy.pages.length; p++) {
      const page = copy.pages[p];
      for (let s = 0; s < page.sections.length; s++) {
        const sec = page.sections[s];
        const idx = sec.elements.findIndex(el => el.id === nodeId);
        if (idx !== -1) {
          sec.elements.splice(idx, 1);
          applied = true;
          break;
        }
      }
      if (applied) break;
    }

    return copy;
  }

  /**
   * Applies an array of structural patches immutably.
   */
  public static applyPatches(model: JSONDocumentModel, patches: DocumentPatch[]): JSONDocumentModel {
    let current = model;
    patches.forEach(patch => {
      switch (patch.type) {
        case 'update_element':
          if (patch.targetId) {
            current = this.patchNode(current, patch.targetId, patch.payload);
          }
          break;
        case 'insert_element':
          if (patch.targetId) {
            current = this.insertNodeAfter(current, patch.targetId, patch.payload);
          }
          break;
        case 'delete_element':
          if (patch.targetId) {
            current = this.deleteNode(current, patch.targetId);
          }
          break;
        case 'update_metadata': {
          const copy = JSON.parse(JSON.stringify(current)) as JSONDocumentModel;
          copy.metadata = { ...copy.metadata, ...patch.payload };
          current = copy;
          break;
        }
        case 'update_page_config': {
          const copy = JSON.parse(JSON.stringify(current)) as JSONDocumentModel;
          copy.pageConfig = { ...copy.pageConfig, ...patch.payload };
          current = copy;
          break;
        }
      }
    });
    return current;
  }
}

// Helper to run pluggable validation on an individual parsed node/element
export function validateDocumentNode(
  el: SectionElement,
  registry: ValidationRegistry = defaultValidationRegistry
): any[] {
  const issues: any[] = [];
  const mockContext: TiptapParserContext = {
    issues,
    metrics: { startTime: Date.now(), totalTime: 0, warningsCount: 0, errorsCount: 0 },
    idGenerator: () => Math.random().toString(36).substring(2, 9),
    path: ['root'],
    options: {}
  };

  registry.getRules().forEach(rule => {
    try {
      rule.validate(el, mockContext);
    } catch (err) {
      console.error(`Error running validation rule ${rule.name}:`, err);
    }
  });

  return issues;
}

// -----------------------------------------------------------------------------
// INCREMENTAL TRANSACTION-DRIVEN PARSER ENGINE
// -----------------------------------------------------------------------------
export interface EditorTransaction {
  transactionId: string;
  timestamp: number;
  affectedNodeIds: string[];
  rawContentMap?: Record<string, any>; // Maps nodeId -> raw JSON TipTap/ProseMirror block AST
  author?: string;
}

export class DocumentIncrementalParser {
  /**
   * Processes a structured transaction containing affected ranges, reparses only the modified nodes,
   * validates them, and produces an updated, validated document with the calculated patches applied.
   */
  public static parseTransaction(
    currentDoc: JSONDocumentModel,
    transaction: EditorTransaction,
    context?: ParserContext
  ): { document: JSONDocumentModel; patches: DocumentPatch[]; warnings: ParserWarning[] } {
    const warnings: ParserWarning[] = [];
    const patches: DocumentPatch[] = [];
    
    const ctx = context || {
      registry: defaultParserRegistry,
      warnings: [],
      cache: prosemirrorBlockCache,
      documentPath: { page: 1, section: 1, offset: 0 }
    };

    transaction.affectedNodeIds.forEach(nodeId => {
      const rawNode = transaction.rawContentMap?.[nodeId];
      if (!rawNode) {
        console.warn(`No raw block content provided for affected node ID: ${nodeId}`);
        return;
      }

      // Reparse individual node block (using ProseMirror AST helper)
      const parsedElement = parseProseMirrorBlockNode(rawNode, ctx);
      if (parsedElement) {
        // Enforce preservation of the stable node ID
        parsedElement.id = nodeId;

        // Run targeted validation on this specific node
        const validationIssues = validateDocumentNode(parsedElement);
        if (validationIssues.length > 0) {
          validationIssues.forEach(issue => {
            warnings.push({
              code: 'VALIDATION_ERROR',
              nodeType: parsedElement.type,
              message: `[${issue.severity.toUpperCase()}] ${issue.message}`
            });
          });
        }

        // Add to our patch stack
        patches.push({
          type: 'update_element',
          targetId: nodeId,
          payload: parsedElement
        });
      }
    });

    // Obtain patched document
    let updatedDoc = DocumentDiffPatchEngine.applyPatches(currentDoc, patches);

    // Development immutability enforcement
    updatedDoc = DevelopmentImmutability.freeze(updatedDoc);

    return {
      document: updatedDoc,
      patches,
      warnings: [...warnings, ...ctx.warnings]
    };
  }
}

// -----------------------------------------------------------------------------
// EXTENSIBLE SERIALIZER REGISTRY WITH CAPABILITY METADATA
// -----------------------------------------------------------------------------
export interface SerializerCapabilities {
  supportsTables: boolean;
  supportsMath: boolean;
  supportsComments: boolean;
  supportsImages: boolean;
  [key: string]: boolean;
}

export interface SerializerPlugin {
  id: string;
  name: string;
  version: string;
  capabilities: SerializerCapabilities;
  serialize(model: JSONDocumentModel): any;
}

export class SerializerRegistry {
  private serializers = new Map<string, SerializerPlugin>();

  public register(serializer: SerializerPlugin): void {
    this.serializers.set(serializer.id, serializer);
    console.log(`Registered serializer plugin: ${serializer.name} (v${serializer.version})`);
  }

  public getSerializer(id: string): SerializerPlugin | undefined {
    return this.serializers.get(id);
  }

  public listSerializers(): SerializerPlugin[] {
    return Array.from(this.serializers.values());
  }
}

export const defaultSerializerRegistry = new SerializerRegistry();

// 1. HTML Serializer
defaultSerializerRegistry.register({
  id: 'html',
  name: 'HTML Serializer',
  version: '1.0.0',
  capabilities: {
    supportsTables: true,
    supportsMath: true,
    supportsComments: true,
    supportsImages: true
  },
  serialize(model) {
    return jsonDocumentToHtml(model);
  }
});

// 2. Markdown Serializer
defaultSerializerRegistry.register({
  id: 'markdown',
  name: 'Markdown Serializer',
  version: '1.0.0',
  capabilities: {
    supportsTables: true,
    supportsMath: true,
    supportsComments: false,
    supportsImages: true
  },
  serialize(model) {
    return jsonDocumentToMarkdown(model);
  }
});

// 3. Plain Text Serializer
defaultSerializerRegistry.register({
  id: 'text',
  name: 'Plain Text Serializer',
  version: '1.0.0',
  capabilities: {
    supportsTables: false,
    supportsMath: false,
    supportsComments: false,
    supportsImages: false
  },
  serialize(model) {
    if (!model || !model.pages) return '';
    const lines: string[] = [];
    model.pages.forEach(page => {
      page.sections.forEach(sec => {
        sec.elements.forEach(el => {
          if (el.type === 'paragraph' || el.type === 'heading') {
            lines.push(el.children.map(c => c.type === 'text' ? c.text : '').join(''));
          } else if (el.type === 'table') {
            el.rows.forEach(r => {
              lines.push(r.cells.map(c => c.elements.map(e => e.type === 'paragraph' ? e.children.map(ch => ch.type === 'text' ? ch.text : '').join('') : '').join(' ')).join(' | '));
            });
          }
        });
      });
    });
    return lines.join('\n');
  }
});

// 4. DOCX Serializer (Future growth path)
defaultSerializerRegistry.register({
  id: 'docx',
  name: 'DOCX Document Serializer',
  version: '1.0.0',
  capabilities: {
    supportsTables: true,
    supportsMath: true,
    supportsComments: true,
    supportsImages: true
  },
  serialize() {
    return new Blob(['[DOCX Binary Representation Placeholder]'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  }
});

// 5. PDF Serializer (Future growth path)
defaultSerializerRegistry.register({
  id: 'pdf',
  name: 'PDF Document Serializer',
  version: '1.0.0',
  capabilities: {
    supportsTables: true,
    supportsMath: true,
    supportsComments: false,
    supportsImages: true
  },
  serialize() {
    return new Blob(['[PDF Binary Representation Placeholder]'], { type: 'application/pdf' });
  }
});

// 6. JSON Serializer
defaultSerializerRegistry.register({
  id: 'json',
  name: 'JSON Model Serializer',
  version: '1.0.0',
  capabilities: {
    supportsTables: true,
    supportsMath: true,
    supportsComments: true,
    supportsImages: true
  },
  serialize(model) {
    return JSON.stringify(model, null, 2);
  }
});

// 7. Clipboard HTML Serializer
defaultSerializerRegistry.register({
  id: 'clipboard_html',
  name: 'Clipboard HTML Serializer',
  version: '1.0.0',
  capabilities: {
    supportsTables: true,
    supportsMath: true,
    supportsComments: false,
    supportsImages: true
  },
  serialize(model) {
    return `<!-- prodoc-clipboard-start -->\n${jsonDocumentToHtml(model)}\n<!-- prodoc-clipboard-end -->`;
  }
});

// 8. Clipboard Plain Text Serializer
defaultSerializerRegistry.register({
  id: 'clipboard_text',
  name: 'Clipboard Plain Text Serializer',
  version: '1.0.0',
  capabilities: {
    supportsTables: false,
    supportsMath: false,
    supportsComments: false,
    supportsImages: false
  },
  serialize(model) {
    const txtSerializer = defaultSerializerRegistry.getSerializer('text');
    return txtSerializer ? txtSerializer.serialize(model) : '';
  }
});

// -----------------------------------------------------------------------------
// HIGH-PERFORMANCE DIRECT PROSEMIRROR PARSER & CACHING (Incremental Updates)
// -----------------------------------------------------------------------------

// WeakMap caches parsed ProseMirror Node references to their resulting SectionElement.
// Since ProseMirror state/node instances are immutable, unchanged nodes share exact references.
const prosemirrorBlockCache = new WeakMap<object, SectionElement>();

export function clearProseMirrorCache() {
  // WeakMaps garbage collect themselves automatically, but this serves as a manual lifecycle helper
}

function parseProseMirrorMarks(marks: any[] | null | undefined): TextStyle {
  if (!marks) return {};
  const style: TextStyle = {};
  marks.forEach(m => {
    const typeName = m.type?.name || m.type || '';
    if (typeName === 'bold') style.bold = true;
    if (typeName === 'italic') style.italic = true;
    if (typeName === 'underline') style.underline = true;
    if (typeName === 'strike') style.strikeThrough = true;
    if (typeName === 'textStyle' && m.attrs) {
      if (m.attrs.color) style.color = m.attrs.color;
      if (m.attrs.fontFamily) style.fontFamily = m.attrs.fontFamily;
      if (m.attrs.fontSize) style.fontSize = m.attrs.fontSize;
    }
    if (typeName === 'highlight' && m.attrs) {
      if (m.attrs.color) style.highlight = m.attrs.color;
    }
    if (typeName === 'link') {
      style.underline = true;
      style.color = '#2563eb';
    }
  });
  return style;
}

function parseProseMirrorInlineNodes(fragment: any): (TextRun | EquationElement | ImageElement)[] {
  if (!fragment) return [];
  const elements: (TextRun | EquationElement | ImageElement)[] = [];
  
  fragment.forEach((n: any) => {
    const typeName = n.type?.name || n.type || '';
    if (typeName === 'text') {
      elements.push({
        type: 'text',
        text: n.text || '',
        style: parseProseMirrorMarks(n.marks)
      });
    } else if (typeName === 'image') {
      const styleRecord = parseInlineStyle(n.attrs?.style || null);
      elements.push({
        type: 'image',
        src: n.attrs?.src || '',
        alt: n.attrs?.alt || '',
        width: n.attrs?.width || styleRecord.width || undefined,
        height: n.attrs?.height || styleRecord.height || undefined,
        style: styleRecord
      });
    } else if (typeName === 'mathEquation') {
      elements.push({
        type: 'equation',
        latex: n.attrs?.latex || ''
      });
    }
  });
  return elements;
}

export const defaultParserRegistry = new DocumentParserRegistry();

function parseProseMirrorBlockNode(n: any, context?: ParserContext): SectionElement | null {
  if (!n) return null;

  const ctx = context || {
    registry: defaultParserRegistry,
    warnings: [],
    cache: prosemirrorBlockCache,
    documentPath: { page: 1, section: 1, offset: 0 }
  };

  // 1. Incremental cache hit check (Fast $O(1)$)
  if (ctx.cache.has(n)) {
    return ctx.cache.get(n)!;
  }

  const typeName = n.type?.name || n.type || '';
  const parser = ctx.registry.getParser(typeName);
  let result: SectionElement | null = null;

  if (parser) {
    result = parser(n, ctx);
  } else {
    // Graceful fallback for unknown custom block types
    const warningId = `warn-unknown-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const stableId = `node-unknown-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    ctx.warnings.push({
      code: 'UNKNOWN_NODE',
      nodeType: typeName,
      message: `Encountered unknown ProseMirror node type: "${typeName}". Preserved block integrity via fallback layer.`,
      location: ctx.documentPath
    });

    // Fallback: Preserve the original node structure for complete round-tripping!
    result = {
      id: stableId,
      type: 'unknown',
      originalType: typeName,
      originalNode: typeof n === 'object' ? n as Record<string, unknown> : { rawValue: n },
      warningId,
      children: n.content ? parseProseMirrorInlineNodes(n.content) : []
    };
  }

  // Cache result for next execution
  if (result) {
    if (!result.id) {
      result.id = `node-${result.type}-${Math.random().toString(36).substr(2, 7)}`;
    }
    ctx.cache.set(n, result);
  }
  return result;
}

// Register default block parsers into the default registry
defaultParserRegistry.registerParser('pageBreak', (n) => ({
  id: `node-pagebreak-${Math.random().toString(36).substr(2, 7)}`,
  type: 'pageBreak'
}));

defaultParserRegistry.registerParser('heading', (n) => ({
  id: `node-heading-${Math.random().toString(36).substr(2, 7)}`,
  type: 'heading',
  level: n.attrs?.level || 1,
  alignment: n.attrs?.textAlign || 'left',
  children: parseProseMirrorInlineNodes(n.content) as TextRun[]
}));

defaultParserRegistry.registerParser('paragraph', (n) => {
  const spacing: ParagraphSpacing = {};
  if (n.attrs?.spacingBefore) spacing.before = n.attrs.spacingBefore;
  if (n.attrs?.spacingAfter) spacing.after = n.attrs.spacingAfter;
  return {
    id: `node-paragraph-${Math.random().toString(36).substr(2, 7)}`,
    type: 'paragraph',
    alignment: n.attrs?.textAlign || 'left',
    indent: n.attrs?.indent || undefined,
    spacing: Object.keys(spacing).length > 0 ? spacing : undefined,
    children: parseProseMirrorInlineNodes(n.content)
  };
});

defaultParserRegistry.registerParser('table', (n, context) => {
  const rows: TableRowElement[] = [];
  if (n.content) {
    n.content.forEach((rowNode: any) => {
      const rowTypeName = rowNode.type?.name || rowNode.type || '';
      if (rowTypeName === 'tableRow') {
        const cells: TableCellElement[] = [];
        if (rowNode.content) {
          rowNode.content.forEach((cellNode: any) => {
            const cellTypeName = cellNode.type?.name || cellNode.type || '';
            if (cellTypeName === 'tableCell' || cellTypeName === 'tableHeader') {
              const subElements: (ParagraphElement | HeadingElement)[] = [];
              if (cellNode.content) {
                cellNode.content.forEach((subNode: any) => {
                  const parsed = parseProseMirrorBlockNode(subNode, context);
                  if (parsed && (parsed.type === 'paragraph' || parsed.type === 'heading')) {
                    subElements.push(parsed);
                  }
                });
              }
              if (subElements.length === 0) {
                subElements.push({
                  id: `node-table-cell-p-auto-${Math.random().toString(36).substr(2, 7)}`,
                  type: 'paragraph',
                  children: [{ type: 'text', text: '' }]
                });
              }
              cells.push({
                elements: subElements,
                style: parseInlineStyle(cellNode.attrs?.style || null)
              });
            }
          });
        }
        rows.push({
          cells,
          style: parseInlineStyle(rowNode.attrs?.style || null)
        });
      }
    });
  }
  return {
    id: `node-table-${Math.random().toString(36).substr(2, 7)}`,
    type: 'table',
    rows,
    style: parseInlineStyle(n.attrs?.style || null)
  };
});

defaultParserRegistry.registerParser('image', (n) => {
  const styleRecord = parseInlineStyle(n.attrs?.style || null);
  return {
    id: `node-image-${Math.random().toString(36).substr(2, 7)}`,
    type: 'image',
    src: n.attrs?.src || '',
    alt: n.attrs?.alt || '',
    width: n.attrs?.width || styleRecord.width || undefined,
    height: n.attrs?.height || styleRecord.height || undefined,
    style: styleRecord
  };
});

defaultParserRegistry.registerParser('mathEquation', (n) => ({
  id: `node-equation-${Math.random().toString(36).substr(2, 7)}`,
  type: 'equation',
  latex: n.attrs?.latex || ''
}));

function traverseProseMirrorContent(fragment: any, target: SectionElement[], context?: ParserContext) {
  if (!fragment) return;
  fragment.forEach((n: any) => {
    const typeName = n.type?.name || n.type || '';
    if (typeName === 'bulletList' || typeName === 'orderedList') {
      const isBullet = typeName === 'bulletList';
      if (n.content) {
        let index = 0;
        n.content.forEach((li: any) => {
          const liTypeName = li.type?.name || li.type || '';
          if (liTypeName === 'listItem') {
            if (li.content) {
              li.content.forEach((subNode: any) => {
                const parsed = parseProseMirrorBlockNode(subNode, context);
                if (parsed && parsed.type === 'paragraph') {
                  // Create shallow copy to prevent dirtying the base cached node
                  const listParsed: ParagraphElement = {
                    ...parsed,
                    bulletList: isBullet,
                    orderedList: !isBullet,
                    listIndex: index + 1
                  };
                  target.push(listParsed);
                } else if (parsed) {
                  target.push(parsed);
                }
              });
            }
            index++;
          }
        });
      }
    } else {
      const parsed = parseProseMirrorBlockNode(n, context);
      if (parsed) {
        target.push(parsed);
      }
    }
  });
}

/**
 * Converts a ProseMirror Document Node DIRECTLY into our structured JSON document model,
 * leveraging WeakMap caching to only rebuild changed nodes.
 */
export function prosemirrorNodeToJSONDocument(
  docNode: any,
  title: string,
  pageConfig: PageConfig,
  lastModifiedDate?: Date,
  creationDate?: Date
): JSONDocumentModel {
  const pages: DocumentPage[] = [];
  let currentElements: SectionElement[] = [];

  const addPage = () => {
    pages.push({
      sections: [{
        elements: currentElements.length > 0 ? [...currentElements] : [{ id: `node-p-auto-${Math.random().toString(36).substr(2, 5)}`, type: 'paragraph', children: [{ type: 'text', text: '' }] }],
        pageSettings: {
          size: pageConfig.size,
          orientation: pageConfig.orientation,
          margins: pageConfig.margins
        }
      }]
    });
    currentElements = [];
  };

  const context: ParserContext = {
    registry: defaultParserRegistry,
    warnings: [],
    cache: prosemirrorBlockCache,
    documentPath: { page: 1, section: 1, offset: 0 }
  };

  const allElements: SectionElement[] = [];
  if (docNode && docNode.content) {
    traverseProseMirrorContent(docNode.content, allElements, context);
  }

  allElements.forEach(el => {
    if (el.type === 'pageBreak') {
      addPage();
    } else {
      currentElements.push(el);
    }
  });

  addPage();

  const nowStr = new Date().toISOString();
  const rawDoc: JSONDocumentModel = {
    type: 'document',
    schemaVersion: SCHEMA_VERSION,
    metadata: {
      title,
      lastModified: lastModifiedDate ? lastModifiedDate.toISOString() : nowStr,
      creationDate: creationDate ? creationDate.toISOString() : nowStr
    },
    pageConfig,
    pages
  };

  // Run the document model through our pure, idempotent Normalizer
  return normalizeDocument(rawDoc);
}

// -----------------------------------------------------------------------------
// RICH DOCUMENT STATE ANALYSIS & COMPUTATION ENGINE
// -----------------------------------------------------------------------------

export interface DocumentStats {
  wordCount: number;
  charCount: number;
  paragraphCount: number;
  headingCount: number;
  tableCount: number;
  imageCount: number;
  equationCount: number;
  pageCount: number;
  readTime: number; // in minutes
}

export interface OutlineItem {
  id: string;
  text: string;
  level: number;
}

export interface ValidationItem {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  blockType?: string;
}

/**
 * A pure, deterministic, idempotent normalizer.
 * Performs a single pass to ensure consistent structure across all documents.
 */
export function normalizeDocument(model: JSONDocumentModel): JSONDocumentModel {
  const copy: JSONDocumentModel = JSON.parse(JSON.stringify(model));
  copy.schemaVersion = SCHEMA_VERSION;

  copy.pages.forEach((page, pIdx) => {
    page.sections.forEach((sec, sIdx) => {
      sec.elements = sec.elements.map((el, eIdx) => {
        if (!el.id) {
          el.id = `node-${el.type}-${pIdx}-${sIdx}-${eIdx}-${Math.random().toString(36).substr(2, 4)}`;
        }
        
        if (el.type === 'paragraph') {
          if (!el.children) el.children = [];
          if (el.children.length === 0) {
            el.children = [{ type: 'text', text: '' }];
          }
        } else if (el.type === 'heading') {
          if (!el.children) el.children = [];
          if (el.children.length === 0) {
            el.children = [{ type: 'text', text: '' }];
          }
        } else if (el.type === 'table') {
          if (!el.rows) el.rows = [];
          let maxCells = 0;
          el.rows.forEach(row => {
            if (row.cells) {
              maxCells = Math.max(maxCells, row.cells.length);
            }
          });
          el.rows.forEach((row, rIdx) => {
            if (!row.cells) row.cells = [];
            while (row.cells.length < maxCells) {
              row.cells.push({
                elements: [{
                  id: `node-table-p-auto-${pIdx}-${sIdx}-${eIdx}-${rIdx}-${row.cells.length}`,
                  type: 'paragraph',
                  children: [{ type: 'text', text: '' }]
                }]
              });
            }
            row.cells.forEach((cell, cIdx) => {
              if (!cell.elements) cell.elements = [];
              if (cell.elements.length === 0) {
                cell.elements = [{
                  id: `node-table-p-cell-auto-${pIdx}-${sIdx}-${eIdx}-${rIdx}-${cIdx}`,
                  type: 'paragraph',
                  children: [{ type: 'text', text: '' }]
                }];
              }
            });
          });
        }
        return el;
      });
    });
  });

  return copy;
}

// Register standard commands
defaultCommandRegistry.registerCommand({
  id: 'insert-paragraph',
  name: 'Insert Paragraph',
  execute(context, params) {
    const { model, updateModel } = context;
    const text = params?.text || '';
    const sectionIndex = params?.sectionIndex || 0;
    const pageIndex = params?.pageIndex || 0;
    
    const newDoc = JSON.parse(JSON.stringify(model)) as JSONDocumentModel;
    if (newDoc.pages[pageIndex]?.sections[sectionIndex]) {
      const el: ParagraphElement = {
        id: `node-paragraph-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        type: 'paragraph',
        alignment: 'left',
        children: [{ type: 'text', text }]
      };
      newDoc.pages[pageIndex].sections[sectionIndex].elements.push(el);
      
      const normalized = normalizeDocument(newDoc);
      updateModel(normalized);
      return { success: true, affectedNodeIds: [el.id] };
    }
    return { success: false, error: 'Target section or page not found.' };
  }
});

defaultCommandRegistry.registerCommand({
  id: 'delete-node',
  name: 'Delete Node',
  execute(context, params) {
    const { model, updateModel } = context;
    const id = params?.id;
    if (!id) return { success: false, error: 'Node ID is required.' };
    
    let deleted = false;
    const newDoc = JSON.parse(JSON.stringify(model)) as JSONDocumentModel;
    newDoc.pages.forEach(page => {
      page.sections.forEach(sec => {
        const initialLength = sec.elements.length;
        sec.elements = sec.elements.filter(el => el.id !== id);
        if (sec.elements.length < initialLength) {
          deleted = true;
        }
      });
    });
    
    if (deleted) {
      const normalized = normalizeDocument(newDoc);
      updateModel(normalized);
      return { success: true, affectedNodeIds: [id] };
    }
    return { success: false, error: `Node with ID ${id} not found.` };
  }
});

defaultCommandRegistry.registerCommand({
  id: 'update-page-margins',
  name: 'Update Page Margins',
  execute(context, params) {
    const { model, updateModel } = context;
    const margins = params?.margins;
    if (!margins) return { success: false, error: 'Margins object is required.' };
    
    const newDoc = JSON.parse(JSON.stringify(model)) as JSONDocumentModel;
    newDoc.pageConfig.margins = margins;
    newDoc.pages.forEach(page => {
      page.sections.forEach(sec => {
        if (sec.pageSettings) {
          sec.pageSettings.margins = margins;
        }
      });
    });
    
    const normalized = normalizeDocument(newDoc);
    updateModel(normalized);
    return { success: true };
  }
});

// Define and register default validation plugins
export const headingValidator: ValidatorPlugin = (model) => {
  const issues: ValidationIssue[] = [];
  let lastHeadingLevel = 0;
  let elementIndex = 0;

  model.pages.forEach((page, pIdx) => {
    page.sections.forEach((section, sIdx) => {
      section.elements.forEach((el, eIdx) => {
        elementIndex++;
        if (el.type === 'heading') {
          let textContent = '';
          el.children.forEach(c => {
            if (c.type === 'text') textContent += c.text;
          });

          const location: NodePath = { page: pIdx + 1, section: sIdx + 1, offset: eIdx };

          // Skipped heading levels
          if (el.level > lastHeadingLevel + 1 && lastHeadingLevel > 0) {
            issues.push({
              id: `val-heading-skip-${elementIndex}`,
              type: 'warning',
              message: `Heading level skip detected: Heading level ${el.level} follows level ${lastHeadingLevel}.`,
              blockType: 'heading',
              location
            });
          }
          lastHeadingLevel = el.level;

          // Empty heading
          if (textContent.trim() === '') {
            issues.push({
              id: `val-empty-heading-${elementIndex}`,
              type: 'warning',
              message: `Empty Heading (Level ${el.level}) detected.`,
              blockType: 'heading',
              location
            });
          }
        }
      });
    });
  });
  return issues;
};

export const tableValidator: ValidatorPlugin = (model) => {
  const issues: ValidationIssue[] = [];
  let elementIndex = 0;

  model.pages.forEach((page, pIdx) => {
    page.sections.forEach((section, sIdx) => {
      section.elements.forEach((el, eIdx) => {
        elementIndex++;
        if (el.type === 'table') {
          const location: NodePath = { page: pIdx + 1, section: sIdx + 1, offset: eIdx };
          if (el.rows.length === 0) {
            issues.push({
              id: `val-empty-table-${elementIndex}`,
              type: 'error',
              message: 'Table has no rows.',
              blockType: 'table',
              location
            });
          } else {
            let emptyCells = 0;
            let totalCells = 0;
            el.rows.forEach(row => {
              row.cells.forEach(cell => {
                totalCells++;
                let cellText = '';
                cell.elements.forEach(sub => {
                  sub.children.forEach(c => {
                    if (c.type === 'text') cellText += c.text;
                  });
                });
                if (cellText.trim() === '') {
                  emptyCells++;
                }
              });
            });
            if (emptyCells === totalCells && totalCells > 0) {
              issues.push({
                id: `val-empty-table-cells-${elementIndex}`,
                type: 'warning',
                message: 'This table is entirely empty.',
                blockType: 'table',
                location
              });
            }
          }
        }
      });
    });
  });
  return issues;
};

export const imageValidator: ValidatorPlugin = (model) => {
  const issues: ValidationIssue[] = [];
  let elementIndex = 0;

  model.pages.forEach((page, pIdx) => {
    page.sections.forEach((section, sIdx) => {
      section.elements.forEach((el, eIdx) => {
        elementIndex++;
        const location: NodePath = { page: pIdx + 1, section: sIdx + 1, offset: eIdx };
        if (el.type === 'image') {
          if (!el.src) {
            issues.push({
              id: `val-empty-image-${elementIndex}`,
              type: 'error',
              message: 'Image has no source URL.',
              blockType: 'image',
              location
            });
          } else if (!el.alt) {
            issues.push({
              id: `val-img-alt-${elementIndex}`,
              type: 'warning',
              message: 'Image is missing an alternative description (alt text).',
              blockType: 'image',
              location
            });
          }
        } else if (el.type === 'paragraph') {
          el.children.forEach(c => {
            if (c.type === 'image' && !c.alt) {
              issues.push({
                id: `val-img-alt-${elementIndex}`,
                type: 'warning',
                message: 'Inline image is missing an alternative description (alt text).',
                blockType: 'image',
                location
              });
            }
          });
        }
      });
    });
  });
  return issues;
};

export const accessibilityValidator: ValidatorPlugin = (model) => {
  const issues: ValidationIssue[] = [];
  let elementIndex = 0;

  model.pages.forEach((page, pIdx) => {
    page.sections.forEach((section, sIdx) => {
      section.elements.forEach((el, eIdx) => {
        elementIndex++;
        const location: NodePath = { page: pIdx + 1, section: sIdx + 1, offset: eIdx };
        
        if (el.type === 'paragraph') {
          let textContent = '';
          el.children.forEach(c => {
            if (c.type === 'text') textContent += c.text;
          });
          
          // Paragraph length warning
          const words = textContent.trim().split(/\s+/).filter(Boolean);
          if (words.length > 150) {
            issues.push({
              id: `val-long-p-${elementIndex}`,
              type: 'info',
              message: `This paragraph is quite long (${words.length} words). Consider dividing it up for better reader comprehension.`,
              blockType: 'paragraph',
              location
            });
          }

          // Placeholder / TODO check
          const lowerText = textContent.toLowerCase();
          if (lowerText.includes('todo') || lowerText.includes('lorem ipsum') || lowerText.includes('[insert')) {
            issues.push({
              id: `val-placeholder-${elementIndex}`,
              type: 'warning',
              message: `Placeholder or 'TODO' text detected: "${textContent.substring(0, 30)}..."`,
              blockType: 'paragraph',
              location
            });
          }
        } else if (el.type === 'equation') {
          if (!el.latex || el.latex.trim() === '') {
            issues.push({
              id: `val-empty-eq-${elementIndex}`,
              type: 'warning',
              message: 'Math equation is empty.',
              blockType: 'equation',
              location
            });
          }
        }
      });
    });
  });
  return issues;
};

defaultValidatorRegistry.registerValidator(headingValidator);
defaultValidatorRegistry.registerValidator(tableValidator);
defaultValidatorRegistry.registerValidator(imageValidator);
defaultValidatorRegistry.registerValidator(accessibilityValidator);

/**
 * Highly optimized, synchronous live statistics parser for immediate keyboard responsiveness.
 * Focuses purely on basic node typing metrics (words, chars, paragraphs).
 */
export function computeLiveStats(model: JSONDocumentModel): { wordCount: number; charCount: number; paragraphCount: number } {
  let wordCount = 0;
  let charCount = 0;
  let paragraphCount = 0;

  model.pages.forEach((page) => {
    page.sections.forEach((section) => {
      section.elements.forEach((el) => {
        if (el.type === 'paragraph') {
          paragraphCount++;
          let textContent = '';
          el.children.forEach((child) => {
            if (child.type === 'text') {
              textContent += child.text;
            }
          });
          charCount += textContent.length;
          const words = textContent.trim().split(/\s+/).filter(Boolean);
          wordCount += words.length;
        } else if (el.type === 'heading') {
          let textContent = '';
          el.children.forEach((child) => {
            if (child.type === 'text') {
              textContent += child.text;
            }
          });
          charCount += textContent.length;
          const words = textContent.trim().split(/\s+/).filter(Boolean);
          wordCount += words.length;
        }
      });
    });
  });

  return { wordCount, charCount, paragraphCount };
}

/**
 * Computes a weighted document complexity score based on structural node count & depth.
 * Used for dynamic worker triggering recommendations.
 */
export function computeComplexityScore(model: JSONDocumentModel): number {
  let score = 0;
  model.pages.forEach((page) => {
    page.sections.forEach((section) => {
      section.elements.forEach((el) => {
        score += 1; // Base score per element
        if (el.type === 'table') {
          score += 10; // Tables add major rendering weight
          el.rows.forEach(row => {
            score += row.cells.length * 2; // Nested cell blocks
          });
        } else if (el.type === 'equation') {
          score += 5; // LaTeX equation rendering complexity
        } else if (el.type === 'image') {
          score += 4; // Asset resource complexity
        } else if (el.type === 'heading') {
          score += 2; // Outlining complexity
        }
      });
    });
  });
  return score;
}

export function computeDocumentState(model: JSONDocumentModel) {
  // 1. Normalize the document structure (idempotent, pure)
  const normalizedModel = normalizeDocument(model);
  
  // 2. Compute stats on the normalized model
  const liveStats = computeLiveStats(normalizedModel);
  
  let headingCount = 0;
  let tableCount = 0;
  let imageCount = 0;
  let equationCount = 0;
  const outline: OutlineItem[] = [];
  
  let elementIndex = 0;
  
  normalizedModel.pages.forEach((page) => {
    page.sections.forEach((section) => {
      section.elements.forEach((el) => {
        elementIndex++;
        if (el.type === 'paragraph') {
          el.children.forEach((child) => {
            if (child.type === 'image') imageCount++;
            else if (child.type === 'equation') equationCount++;
          });
        } else if (el.type === 'heading') {
          headingCount++;
          let textContent = '';
          el.children.forEach((child) => {
            if (child.type === 'text') textContent += child.text;
          });
          outline.push({
            id: `heading-${elementIndex}`,
            text: textContent || `Heading ${el.level}`,
            level: el.level
          });
        } else if (el.type === 'table') {
          tableCount++;
        } else if (el.type === 'image') {
          imageCount++;
        } else if (el.type === 'equation') {
          equationCount++;
        }
      });
    });
  });
  
  // 3. Delegate validation to the pluggable validator registry
  const issues = defaultValidatorRegistry.validate(normalizedModel);
  const validation: ValidationItem[] = issues.map(issue => ({
    id: issue.id,
    type: issue.type,
    message: issue.message,
    blockType: issue.blockType
  }));

  const pageCount = normalizedModel.pages.length;
  const readTime = Math.max(1, Math.ceil(liveStats.wordCount / 200));

  const stats: DocumentStats = {
    wordCount: liveStats.wordCount,
    charCount: liveStats.charCount,
    paragraphCount: liveStats.paragraphCount,
    headingCount,
    tableCount,
    imageCount,
    equationCount,
    pageCount,
    readTime
  };

  return {
    stats,
    outline,
    validation
  };
}

// -----------------------------------------------------------------------------
// WEB WORKER FUTURE PATH HOOK / INITIALIZATION FOR EXTRA LARGE DOCUMENTS
// -----------------------------------------------------------------------------

export function runParsingInWorker(
  tiptapJson: any,
  title: string,
  pageConfig: PageConfig
): Promise<JSONDocumentModel> {
  return new Promise((resolve, reject) => {
    try {
      // In-line Web Worker representation using Object URLs for effortless deployment.
      // Structured cloning handles passing serializable JSON payload off the main thread.
      const workerBlob = new Blob([`
        self.onmessage = function(e) {
          const { tiptapJson, title, pageConfig } = e.data;
          
          // Simple local parser clone inside Web Worker scope
          function parseTiptapMarks(marks) {
            if (!marks) return {};
            const style = {};
            marks.forEach(m => {
              if (m.type === 'bold') style.bold = true;
              if (m.type === 'italic') style.italic = true;
              if (m.type === 'underline') style.underline = true;
              if (m.type === 'strike') style.strikeThrough = true;
              if (m.type === 'textStyle' && m.attrs) {
                if (m.attrs.color) style.color = m.attrs.color;
                if (m.attrs.fontFamily) style.fontFamily = m.attrs.fontFamily;
                if (m.attrs.fontSize) style.fontSize = m.attrs.fontSize;
              }
              if (m.type === 'highlight' && m.attrs) {
                if (m.attrs.color) style.highlight = m.attrs.color;
              }
              if (m.type === 'link') {
                style.underline = true;
                style.color = '#2563eb';
              }
            });
            return style;
          }

          function parseTiptapInlineNodes(nodes) {
            if (!nodes) return [];
            const elements = [];
            nodes.forEach(n => {
              if (n.type === 'text') {
                elements.push({
                  type: 'text',
                  text: n.text || '',
                  style: parseTiptapMarks(n.marks)
                });
              } else if (n.type === 'image') {
                elements.push({
                  type: 'image',
                  src: n.attrs?.src || '',
                  alt: n.attrs?.alt || '',
                  width: n.attrs?.width || undefined,
                  height: n.attrs?.height || undefined
                });
              } else if (n.type === 'mathEquation') {
                elements.push({
                  type: 'equation',
                  latex: n.attrs?.latex || ''
                });
              }
            });
            return elements;
          }

          function parseTiptapBlockNode(n) {
            if (n.type === 'pageBreak') return { type: 'pageBreak' };
            if (n.type === 'heading') {
              return {
                type: 'heading',
                level: n.attrs?.level || 1,
                alignment: n.attrs?.textAlign || 'left',
                children: parseTiptapInlineNodes(n.content)
              };
            }
            if (n.type === 'paragraph') {
              return {
                type: 'paragraph',
                alignment: n.attrs?.textAlign || 'left',
                indent: n.attrs?.indent || undefined,
                children: parseTiptapInlineNodes(n.content)
              };
            }
            if (n.type === 'table') {
              const rows = [];
              (n.content || []).forEach(rowNode => {
                if (rowNode.type === 'tableRow') {
                  const cells = [];
                  (rowNode.content || []).forEach(cellNode => {
                    const subElements = [];
                    (cellNode.content || []).forEach(subNode => {
                      const parsed = parseTiptapBlockNode(subNode);
                      if (parsed && (parsed.type === 'paragraph' || parsed.type === 'heading')) {
                        subElements.push(parsed);
                      }
                    });
                    cells.push({ elements: subElements });
                  });
                  rows.push({ cells });
                }
              });
              return { type: 'table', rows };
            }
            return null;
          }

          const allElements = [];
          function traverse(nodes) {
            nodes.forEach(n => {
              if (n.type === 'bulletList' || n.type === 'orderedList') {
                const isBullet = n.type === 'bulletList';
                (n.content || []).forEach((li, idx) => {
                  (li.content || []).forEach(subNode => {
                    const parsed = parseTiptapBlockNode(subNode);
                    if (parsed && parsed.type === 'paragraph') {
                      parsed.bulletList = isBullet;
                      parsed.orderedList = !isBullet;
                      parsed.listIndex = idx + 1;
                      allElements.push(parsed);
                    } else if (parsed) {
                      allElements.push(parsed);
                    }
                  });
                });
              } else {
                const parsed = parseTiptapBlockNode(n);
                if (parsed) allElements.push(parsed);
              }
            });
          }

          if (tiptapJson && tiptapJson.content) {
            traverse(tiptapJson.content);
          }

          const pages = [];
          let currentElements = [];
          allElements.forEach(el => {
            if (el.type === 'pageBreak') {
              pages.push({
                sections: [{
                  elements: currentElements.length > 0 ? currentElements : [{ type: 'paragraph', children: [{ type: 'text', text: '' }] }],
                  pageSettings: pageConfig
                }]
              });
              currentElements = [];
            } else {
              currentElements.push(el);
            }
          });
          pages.push({
            sections: [{
              elements: currentElements.length > 0 ? currentElements : [{ type: 'paragraph', children: [{ type: 'text', text: '' }] }],
              pageSettings: pageConfig
            }]
          });

          const now = new Date().toISOString();
          self.postMessage({
            type: 'document',
            metadata: { title, lastModified: now, creationDate: now },
            pageConfig,
            pages
          });
        };
      `], { type: 'application/javascript' });
      
      const workerUrl = URL.createObjectURL(workerBlob);
      const worker = new Worker(workerUrl);
      
      worker.onmessage = (e) => {
        resolve(e.data);
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
      };
      
      worker.onerror = (err) => {
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
        reject(err);
      };
      
      worker.postMessage({ tiptapJson, title, pageConfig });
    } catch (err) {
      reject(err);
    }
  });
}


