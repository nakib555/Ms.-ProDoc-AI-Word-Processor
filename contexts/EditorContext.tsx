
import React, { createContext, useContext, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useEditor as useTipTapEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { Node, mergeAttributes } from '@tiptap/core';

import { SaveStatus, ViewMode, PageConfig, CustomStyle, ReadModeConfig, ActiveElementType, PageMovement, EditingArea, DocumentFootnote, DocumentEndnote, MeasurementUnit, ZoomLayoutMode } from '../types';
import { useAutoSave } from '../hooks/useAutoSave';
import { DEFAULT_CONTENT, PAGE_SIZES, MARGIN_PRESETS } from '../constants';
import { jsonDocumentToHtml, htmlToJSONDocument, DocumentComment } from '../utils/documentModel';
import { importDocxToEditor } from '../utils/docxImportEngine';
import { importHtmlToEditor } from '../components/ribbon/tabs/FileTab/modals/htmlImportEngine';
import { marked } from 'marked';
import { IdentityExtension } from '../components/editor/extensions/IdentityExtension';
import { CommentExtension } from '../components/editor/extensions/CommentExtension';
import { FootnoteReferenceExtension } from '../components/editor/extensions/FootnoteReferenceExtension';
import { EndnoteReferenceExtension } from '../components/editor/extensions/EndnoteReferenceExtension';
import {
  DocumentHistoryEngine,
  DocumentSnapshot,
  HistoryEntry,
  HistoryCommitMode,
  clonePageConfig,
} from '../utils/historyManager';
import {
  getPhysicalDimensions,
  getScreenCalibration,
  setScreenCalibration,
  ScreenCalibration,
  loadMeasurementUnit,
  saveMeasurementUnit,
  loadDefaultPageConfig,
  getCalibrationScale,
} from '../utils/measurement';

const countWordsFromHtml = (html: string): number => {
  if (!html) return 0;
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').trim();
  return text ? text.split(/\s+/).length : 0;
};

const countCharsFromHtml = (html: string): number => {
  if (!html) return 0;
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').length;
};

const sanitizePastedHtml = (rawHtml: string, stripFormatting: boolean): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, 'text/html');
  doc.querySelectorAll('script, style, meta, link, iframe, object, embed').forEach((el) => el.remove());
  doc.body.querySelectorAll('*').forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase();
      if (name.startsWith('on') || (name === 'href' && attr.value.trim().toLowerCase().startsWith('javascript:'))) {
        el.removeAttribute(attr.name);
      } else if (stripFormatting && (name === 'style' || name === 'class' || name === 'color' || name === 'face' || name === 'size')) {
        el.removeAttribute(attr.name);
      }
    });
  });
  return doc.body.innerHTML;
};

const INITIAL_PAGE_CONFIG: PageConfig = {
  size: 'Letter',
  orientation: 'portrait',
  marginPreset: 'compactReport',
  margins: MARGIN_PRESETS.compactReport || { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75, gutter: 0 },
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
};

const getHydratedInitialPageConfig = (): PageConfig => {
  const saved = loadDefaultPageConfig();
  if (!saved) return clonePageConfig(INITIAL_PAGE_CONFIG);
  return clonePageConfig({
    ...INITIAL_PAGE_CONFIG,
    ...saved,
    margins: {
      ...INITIAL_PAGE_CONFIG.margins,
      ...(saved.margins || {}),
    },
  });
};

// Custom Paragraph Extension for Indent/Spacing
const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      indent: {
        default: 0,
        parseHTML: element => element.style.marginLeft ? parseInt(element.style.marginLeft) : 0,
        renderHTML: attributes => {
            if (!attributes.indent) return {};
            return { style: `margin-left: ${attributes.indent}px` };
        },
      },
      marginRight: {
        default: 0,
        parseHTML: element => element.style.marginRight ? parseInt(element.style.marginRight) : 0,
        renderHTML: attributes => {
            if (!attributes.marginRight) return {};
            return { style: `margin-right: ${attributes.marginRight}px` };
        },
      },
      spacingBefore: {
        default: 0,
        parseHTML: element => element.style.marginTop ? parseInt(element.style.marginTop) : 0,
        renderHTML: attributes => {
            if (!attributes.spacingBefore) return {};
            return { style: `margin-top: ${attributes.spacingBefore}px` };
        },
      },
      spacingAfter: {
        default: 0, // Default paragraph spacing
        parseHTML: element => element.style.marginBottom ? parseInt(element.style.marginBottom) : 0,
        renderHTML: attributes => {
            if (!attributes.spacingAfter) return {};
            return { style: `margin-bottom: ${attributes.spacingAfter}px` };
        },
      },
    };
  },
});

// Custom Page Break Extension
const PageBreakExtension = Node.create({
  name: 'pageBreak',
  group: 'block',
  atom: true,
  draggable: true,
  
  parseHTML() {
    return [
      { tag: 'div', getAttrs: (node) => (node as HTMLElement).classList.contains('prodoc-page-break') && null },
      { tag: 'hr', getAttrs: (node) => (node as HTMLElement).style.pageBreakAfter === 'always' && null }
    ];
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'prodoc-page-break', 'data-type': 'page-break' })];
  },
  
  addCommands() {
    return {
      setPageBreak: () => ({ chain }) => {
        return chain().insertContent({ type: this.name }).run();
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => this.editor.commands.setPageBreak(),
    }
  },
});

// Custom Math Extension to prevent TipTap from stripping equation boxes
const MathExtension = Node.create({
  name: 'mathEquation',
  group: 'inline',
  inline: true,
  atom: true,
  
  addAttributes() {
    return {
      latex: {
        default: '',
        parseHTML: element => {
          const mathField = element.querySelector('math-field');
          return mathField ? (mathField.getAttribute('value') || mathField.textContent || '') : '';
        },
      }
    };
  },

  parseHTML() {
    return [
      { tag: 'span.equation-wrapper' },
    ];
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { class: 'equation-wrapper', contenteditable: 'false' }), 
      ['span', { class: 'equation-handle' }, '⋮⋮'],
      ['math-field', { placeholder: 'Type equation here.', value: HTMLAttributes.latex || '' }, HTMLAttributes.latex || ''],
      ['span', { class: 'equation-dropdown' }, '▼']
    ];
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const dom = document.createElement('span');
      dom.classList.add('equation-wrapper');
      dom.contentEditable = 'false';
      
      const handle = document.createElement('span');
      handle.classList.add('equation-handle');
      handle.textContent = '⋮⋮';
      
      const mathField = document.createElement('math-field');
      mathField.setAttribute('placeholder', 'Type equation here.');
      const initialLatex = node.attrs.latex || '';
      (mathField as any).value = initialLatex;
      mathField.setAttribute('value', initialLatex);
      
      // Update node attribute when math-field value changes
      mathField.addEventListener('input', (e) => {
        const newValue = (e.target as any).value;
        mathField.setAttribute('value', newValue); // Ensure DOM serialization works
        if (typeof getPos === 'function') {
          const pos = getPos();
          if (pos !== undefined) {
             const tr = editor.state.tr.setNodeMarkup(pos, undefined, {
               ...node.attrs,
               latex: newValue
             });
             editor.view.dispatch(tr);
          }
        }
      });

      // Handle focus so clicking works properly
      mathField.addEventListener('focusin', () => {
         if (typeof getPos === 'function') {
            const pos = getPos();
            if (pos !== undefined) {
                // optional: select the node when focused
            }
         }
      });

      const dropdown = document.createElement('span');
      dropdown.classList.add('equation-dropdown');
      dropdown.textContent = '▼';

      dom.appendChild(handle);
      dom.appendChild(mathField);
      dom.appendChild(dropdown);

      return {
        dom,
        update: (updatedNode) => {
          if (updatedNode.type !== node.type) {
            return false;
          }
          if ((mathField as any).value !== updatedNode.attrs.latex) {
            const newLatex = updatedNode.attrs.latex || '';
            (mathField as any).value = newLatex;
            mathField.setAttribute('value', newLatex);
          }
          return true;
        },
        ignoreMutation: () => true,
        stopEvent: (event) => {
          const target = event.target as HTMLElement;
          if (target && (target.tagName?.toLowerCase() === 'math-field' || target.closest('math-field'))) {
             return true;
          }
          return false;
        }
      };
    };
  },
});

// Custom Table extensions to preserve styles
const CustomTableRow = TableRow.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
      height: {
        default: null,
        parseHTML: element => element.style.height || null,
        renderHTML: attributes => {
          if (!attributes.height) return {};
          return { style: `height: ${attributes.height}` };
        },
      }
    };
  }
});

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
      width: {
        default: null,
        parseHTML: element => element.style.width || null,
        renderHTML: attributes => {
          if (!attributes.width) return {};
          return { style: `width: ${attributes.width}` };
        },
      },
      verticalAlign: {
        default: null,
        parseHTML: element => element.style.verticalAlign || null,
        renderHTML: attributes => {
          if (!attributes.verticalAlign) return {};
          return { style: `vertical-align: ${attributes.verticalAlign}` };
        },
      }
    };
  }
});

const CustomTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
      width: {
        default: null,
        parseHTML: element => element.style.width || null,
        renderHTML: attributes => {
          if (!attributes.width) return {};
          return { style: `width: ${attributes.width}` };
        },
      },
      verticalAlign: {
        default: null,
        parseHTML: element => element.style.verticalAlign || null,
        renderHTML: attributes => {
          if (!attributes.verticalAlign) return {};
          return { style: `vertical-align: ${attributes.verticalAlign}` };
        },
      }
    };
  }
});

const CustomTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: 'width: 100%; border-collapse: collapse;',
        parseHTML: element => element.getAttribute('style') || 'width: 100%; border-collapse: collapse;',
        renderHTML: attributes => {
          if (!attributes.style) return { style: 'width: 100%; border-collapse: collapse;' };
          if (!attributes.style.includes('width')) {
             return { style: attributes.style + '; width: 100%; border-collapse: collapse;' };
          }
          return { style: attributes.style };
        },
      }
    };
  }
});

export interface ToastNotification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

// Define custom types for TipTap integration
export interface EditorContextType {
  editor: Editor | null;
  content: string;
  setContent: (content: string, emitUpdate?: boolean, options?: { historyMode?: HistoryCommitMode }) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  historyApplySeq: number;
  wordCount: number;
  charCount: number;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  zoomLayout: ZoomLayoutMode;
  setZoomLayout: React.Dispatch<React.SetStateAction<ZoomLayoutMode>>;
  measurementUnit: MeasurementUnit;
  setMeasurementUnit: (unit: MeasurementUnit) => void;
  screenCalibration: ScreenCalibration;
  updateScreenCalibration: (patch: Partial<ScreenCalibration>) => void;
  calibrationScale: number;
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  pageMovement: PageMovement;
  setPageMovement: React.Dispatch<React.SetStateAction<PageMovement>>;
  readConfig: ReadModeConfig;
  setReadConfig: React.Dispatch<React.SetStateAction<ReadModeConfig>>;
  saveStatus: SaveStatus;
  executeCommand: (command: string, value?: string) => void;
  editorRef: React.MutableRefObject<HTMLDivElement | null>;
  pageConfig: PageConfig;
  setPageConfig: React.Dispatch<React.SetStateAction<PageConfig>>;
  showPageSetup: boolean;
  setShowPageSetup: React.Dispatch<React.SetStateAction<boolean>>;
  pageSetupInitialTab: 'margins' | 'paper' | 'layout';
  openPageSetup: (tab?: 'margins' | 'paper' | 'layout') => void;
  showPageBordersDialog: boolean;
  setShowPageBordersDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showWordCountDialog: boolean;
  setShowWordCountDialog: React.Dispatch<React.SetStateAction<boolean>>;
  toast: ToastNotification | null;
  showToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  dismissToast: () => void;
  formatPainterStyles: Record<string, string> | null;
  applyFormatPainterToSelection: () => boolean;
  pageDimensions: { width: number; height: number; widthInches: number; heightInches: number; widthMm: number; heightMm: number };
  registerContainer: (node: HTMLDivElement | null) => void;
  showRuler: boolean;
  setShowRuler: React.Dispatch<React.SetStateAction<boolean>>;
  documentTitle: string;
  setDocumentTitle: React.Dispatch<React.SetStateAction<string>>;
  lastModified: Date;
  creationDate: Date;
  setLastModified: React.Dispatch<React.SetStateAction<Date>>;
  showFormattingMarks: boolean;
  setShowFormattingMarks: React.Dispatch<React.SetStateAction<boolean>>;
  customStyles: CustomStyle[];
  addCustomStyle: (name: string) => void;
  applyCustomStyle: (style: CustomStyle) => void;
  applyAdvancedStyle: (styles: React.CSSProperties) => void;
  applyBlockStyle: (styles: React.CSSProperties) => void;
  handlePasteSpecial: (type: 'keep-source' | 'merge' | 'text-only') => Promise<void>;
  activeElementType: ActiveElementType;
  setActiveElementType: React.Dispatch<React.SetStateAction<ActiveElementType>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  goToPage: (page: number, options?: { behavior?: 'smooth' | 'auto' }) => void;
  pageJumpTarget: { page: number; behavior: 'smooth' | 'auto'; seq: number } | null;
  showJsonInspector: boolean;
  setShowJsonInspector: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Header/Footer & Editing Area
  activeEditingArea: EditingArea;
  setActiveEditingArea: React.Dispatch<React.SetStateAction<EditingArea>>;
  showDocumentText: boolean;
  setShowDocumentText: React.Dispatch<React.SetStateAction<boolean>>;
  headerContent: string;
  setHeaderContent: React.Dispatch<React.SetStateAction<string>>;
  footerContent: string;
  setFooterContent: React.Dispatch<React.SetStateAction<string>>;
  
  // First Page Header/Footer (for Different First Page option)
  firstHeaderContent: string;
  setFirstHeaderContent: React.Dispatch<React.SetStateAction<string>>;
  firstFooterContent: string;
  setFirstFooterContent: React.Dispatch<React.SetStateAction<string>>;

  // Keyboard Lock
  isKeyboardLocked: boolean;
  isTableResizerEnabled: boolean;
  isTableResizing: boolean;
  setIsTableResizing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTableResizerEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsKeyboardLocked: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Comments
  comments: DocumentComment[];
  setComments: React.Dispatch<React.SetStateAction<DocumentComment[]>>;
  activeCommentId: string | null;
  setActiveCommentId: React.Dispatch<React.SetStateAction<string | null>>;
  showComments: boolean;
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
  addComment: (text: string) => void;
  resolveComment: (id: string) => void;
  removeComment: (id: string) => void;

  // Footnotes & Endnotes
  footnotes: DocumentFootnote[];
  setFootnotes: React.Dispatch<React.SetStateAction<DocumentFootnote[]>>;
  endnotes: DocumentEndnote[];
  setEndnotes: React.Dispatch<React.SetStateAction<DocumentEndnote[]>>;
  addFootnote: () => string;
  addEndnote: () => string;
  updateFootnote: (id: string, content: string) => void;
  updateEndnote: (id: string, content: string) => void;
  removeFootnote: (id: string) => void;
  removeEndnote: (id: string) => void;
  showNotes: boolean;
  setShowNotes: React.Dispatch<React.SetStateAction<boolean>>;

  // Zoom Mode
  zoomMode: 'custom' | 'fit-width' | 'fit-page';
  setZoomMode: React.Dispatch<React.SetStateAction<'custom' | 'fit-width' | 'fit-page'>>;

  // Selection Mode
  selectionMode: boolean;
  setSelectionMode: React.Dispatch<React.SetStateAction<boolean>>;
  hasActiveSelection: boolean;
  
  selectionAction: any | null;
  setSelectionAction: React.Dispatch<React.SetStateAction<any | null>>;
  
  importState: { active: boolean; percent: number; status: string };
  importFile: (file: File) => Promise<void>;
  loadDocument: (name: string) => void;
  pasteProgress: { active: boolean; totalChunks: number; currentChunk: number; percentage: number } | null;
  setPasteProgress: React.Dispatch<React.SetStateAction<{ active: boolean; totalChunks: number; currentChunk: number; percentage: number } | null>>;
}

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    try {
      document.execCommand('enableObjectResizing', false, 'false');
      document.execCommand('enableInlineTableEditing', false, 'false');
    } catch (e) {
      // Ignored if not supported
    }
  }, []);

  const [documentTitle, setDocumentTitle] = useState("National Technical Examination - IT Support & Systems Engineering Study Guide");
  const documentTitleRef = useRef(documentTitle);
  useEffect(() => {
    documentTitleRef.current = documentTitle;
  }, [documentTitle]);

  const [creationDate] = useState(() => new Date());
  const [lastModified, setLastModified] = useState(() => new Date());
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [zoomMode, setZoomMode] = useState<'custom' | 'fit-width' | 'fit-page'>('custom');
  const [zoomLayout, setZoomLayout] = useState<ZoomLayoutMode>('single');
  const [measurementUnit, setMeasurementUnitState] = useState<MeasurementUnit>(() => loadMeasurementUnit());
  const [screenCalibration, setScreenCalibrationState] = useState<ScreenCalibration>(() => getScreenCalibration());
  const [viewMode, setViewMode] = useState<ViewMode>('print');
  const [pageMovement, setPageMovement] = useState<PageMovement>('vertical');

  const [showRuler, setShowRuler] = useState(true);
  const [showFormattingMarks, setShowFormattingMarks] = useState(false);
  const [activeElementType, setActiveElementType] = useState<ActiveElementType>('text');
  const [showPageSetup, setShowPageSetup] = useState(false);
  const [pageSetupInitialTab, setPageSetupInitialTab] = useState<'margins' | 'paper' | 'layout'>('margins');
  const [showPageBordersDialog, setShowPageBordersDialog] = useState(false);
  const [showWordCountDialog, setShowWordCountDialog] = useState(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [customStyles, setCustomStyles] = useState<CustomStyle[]>([]);
  const [formatPainterStyles, setFormatPainterStyles] = useState<Record<string, string> | null>(null);
  const formatPainterStylesRef = useRef<Record<string, string> | null>(null);

  useEffect(() => {
    formatPainterStylesRef.current = formatPainterStyles;
  }, [formatPainterStyles]);

  const setMeasurementUnit = useCallback((unit: MeasurementUnit) => {
    saveMeasurementUnit(unit);
    setMeasurementUnitState(unit);
  }, []);

  const updateScreenCalibration = useCallback((patch: Partial<ScreenCalibration>) => {
    setScreenCalibration(patch);
    setScreenCalibrationState(getScreenCalibration());
  }, []);

  const calibrationScale = useMemo(() => getCalibrationScale(screenCalibration), [screenCalibration]);

  const openPageSetup = useCallback((tab: 'margins' | 'paper' | 'layout' = 'margins') => {
    setPageSetupInitialTab(tab);
    setShowPageSetup(true);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    const id = Date.now();
    setToast({ id, message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
      toastTimerRef.current = null;
    }, 3500);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageJumpTarget, setPageJumpTarget] = useState<{ page: number; behavior: 'smooth' | 'auto'; seq: number } | null>(null);

  const goToPage = useCallback((targetPage: number, options?: { behavior?: 'smooth' | 'auto' }) => {
    const page = Math.max(1, Math.min(totalPages, targetPage));
    setCurrentPage(page);
    setPageJumpTarget({ page, behavior: options?.behavior || 'smooth', seq: Date.now() });
  }, [totalPages]);

  const [showJsonInspector, setShowJsonInspector] = useState(false);
  const [comments, setComments] = useState<DocumentComment[]>([]);
  const [footnotes, setFootnotes] = useState<DocumentFootnote[]>([]);
  const [endnotes, setEndnotes] = useState<DocumentEndnote[]>([]);

  const footnotesRef = useRef<DocumentFootnote[]>([]);
  const endnotesRef = useRef<DocumentEndnote[]>([]);

  useEffect(() => {
    footnotesRef.current = footnotes;
  }, [footnotes]);

  useEffect(() => {
    endnotesRef.current = endnotes;
  }, [endnotes]);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [importState, setImportState] = useState<{ active: boolean; percent: number; status: string }>({
    active: false,
    percent: 0,
    status: ''
  });
  
  const [pasteProgress, setPasteProgress] = useState<{
    active: boolean;
    totalChunks: number;
    currentChunk: number;
    percentage: number;
  } | null>(null);
  
  const [activeEditingArea, setActiveEditingArea] = useState<EditingArea>('body');
  const [showDocumentText, setShowDocumentText] = useState(true);
  
  // Default Header/Footer content
  const [headerContent, setHeaderContentRaw] = useState('');
  const [footerContent, setFooterContentRaw] = useState('');
  
  // First Page Header/Footer content
  const [firstHeaderContent, setFirstHeaderContentRaw] = useState('');
  const [firstFooterContent, setFirstFooterContentRaw] = useState('');
  
  const [isKeyboardLocked, setIsKeyboardLocked] = useState(false);
  const [isTableResizerEnabled, setIsTableResizerEnabled] = useState(false);
  const [isTableResizing, setIsTableResizing] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [hasActiveSelection, setHasActiveSelection] = useState(false);
  const [selectionAction, setSelectionAction] = useState<any | null>(null);

  const initialHydratedPageConfig = useMemo(() => getHydratedInitialPageConfig(), []);
  const [pageConfig, setPageConfigRaw] = useState<PageConfig>(() => clonePageConfig(initialHydratedPageConfig));

  const contentRef = useRef<string>(DEFAULT_CONTENT);
  const pageConfigRef = useRef<PageConfig>(clonePageConfig(initialHydratedPageConfig));
  const headerContentRef = useRef<string>('');
  const footerContentRef = useRef<string>('');
  const firstHeaderContentRef = useRef<string>('');
  const firstFooterContentRef = useRef<string>('');

  const [readConfig, setReadConfig] = useState<ReadModeConfig>({
    theme: 'light',
    columns: 1,
    textScale: 1.2
  });

  const editorRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { saveStatus, triggerAutoSave, manualSave } = useAutoSave();

  const [contentState, setContentState] = useState<string>(DEFAULT_CONTENT);
  const autoSaveDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const footnoteRelabelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Absolute independent document history engine
  const isApplyingHistoryRef = useRef(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [historyApplySeq, setHistoryApplySeq] = useState(0);
  const historyEngineRef = useRef<DocumentHistoryEngine>(
    new DocumentHistoryEngine(
      {
        content: DEFAULT_CONTENT,
        pageConfig: clonePageConfig(initialHydratedPageConfig),
        headerContent: '',
        footerContent: '',
        firstHeaderContent: '',
        firstFooterContent: '',
      },
      { maxEntries: 150, debounceMs: 450 }
    )
  );

  useEffect(() => {
    setWordCount(countWordsFromHtml(DEFAULT_CONTENT));
    setCharCount(countCharsFromHtml(DEFAULT_CONTENT));
    const engine = historyEngineRef.current;
    return () => {
      engine.dispose();
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const buildSnapshot = useCallback((overrides?: Partial<DocumentSnapshot>): DocumentSnapshot => ({
    content: overrides?.content ?? contentRef.current,
    pageConfig: clonePageConfig(overrides?.pageConfig ?? pageConfigRef.current),
    headerContent: overrides?.headerContent ?? headerContentRef.current,
    footerContent: overrides?.footerContent ?? footerContentRef.current,
    firstHeaderContent: overrides?.firstHeaderContent ?? firstHeaderContentRef.current,
    firstFooterContent: overrides?.firstFooterContent ?? firstFooterContentRef.current,
  }), []);

  const syncHistoryState = useCallback(() => {
    setCanUndo(historyEngineRef.current.canUndo());
    setCanRedo(historyEngineRef.current.canRedo());
  }, []);

  const setPageConfig: React.Dispatch<React.SetStateAction<PageConfig>> = useCallback((action) => {
    const prev = pageConfigRef.current;
    const next = typeof action === 'function' ? action(prev) : action;
    const clonedNext = clonePageConfig(next);
    pageConfigRef.current = clonedNext;
    setPageConfigRaw(clonedNext);
    if (!isApplyingHistoryRef.current) {
      if (historyEngineRef.current.commit(buildSnapshot({ pageConfig: clonedNext }), 'immediate')) {
        syncHistoryState();
      }
    }
  }, [buildSnapshot, syncHistoryState]);

  const setHeaderContent: React.Dispatch<React.SetStateAction<string>> = useCallback((action) => {
    const next = typeof action === 'function' ? action(headerContentRef.current) : action;
    headerContentRef.current = next;
    setHeaderContentRaw(next);
    if (!isApplyingHistoryRef.current) {
      if (historyEngineRef.current.commit(buildSnapshot({ headerContent: next }), 'debounced', undefined, 'headerContent')) {
        syncHistoryState();
      }
    }
  }, [buildSnapshot, syncHistoryState]);

  const setFooterContent: React.Dispatch<React.SetStateAction<string>> = useCallback((action) => {
    const next = typeof action === 'function' ? action(footerContentRef.current) : action;
    footerContentRef.current = next;
    setFooterContentRaw(next);
    if (!isApplyingHistoryRef.current) {
      if (historyEngineRef.current.commit(buildSnapshot({ footerContent: next }), 'debounced', undefined, 'footerContent')) {
        syncHistoryState();
      }
    }
  }, [buildSnapshot, syncHistoryState]);

  const setFirstHeaderContent: React.Dispatch<React.SetStateAction<string>> = useCallback((action) => {
    const next = typeof action === 'function' ? action(firstHeaderContentRef.current) : action;
    firstHeaderContentRef.current = next;
    setFirstHeaderContentRaw(next);
    if (!isApplyingHistoryRef.current) {
      if (historyEngineRef.current.commit(buildSnapshot({ firstHeaderContent: next }), 'debounced', undefined, 'firstHeaderContent')) {
        syncHistoryState();
      }
    }
  }, [buildSnapshot, syncHistoryState]);

  const setFirstFooterContent: React.Dispatch<React.SetStateAction<string>> = useCallback((action) => {
    const next = typeof action === 'function' ? action(firstFooterContentRef.current) : action;
    firstFooterContentRef.current = next;
    setFirstFooterContentRaw(next);
    if (!isApplyingHistoryRef.current) {
      if (historyEngineRef.current.commit(buildSnapshot({ firstFooterContent: next }), 'debounced', undefined, 'firstFooterContent')) {
        syncHistoryState();
      }
    }
  }, [buildSnapshot, syncHistoryState]);

  // --- TipTap Initialization ---
  const editor = useTipTapEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
      }),
      CustomParagraph,
      Image.configure({ inline: true, allowBase64: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Link.configure({ openOnClick: false }),
      CustomTable.configure({ resizable: true }),
      CustomTableRow,
      CustomTableHeader,
      CustomTableCell,
      Placeholder.configure({ placeholder: 'Start typing...' }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      PageBreakExtension,
      MathExtension,
      IdentityExtension,
      CommentExtension,
      FootnoteReferenceExtension,
      EndnoteReferenceExtension,
    ],
    content: DEFAULT_CONTENT,
    editorProps: {
      handlePaste: (view, event) => {
        const text = event.clipboardData?.getData('text/plain') || '';
        const html = event.clipboardData?.getData('text/html') || '';
        
        const threshold = 30000;
        if (text.length > threshold || html.length > threshold) {
          event.preventDefault();
          
          setPasteProgress({
            active: true,
            totalChunks: 1,
            currentChunk: 0,
            percentage: 0
          });

          const chunks: string[] = [];

          if (html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const body = doc.body;
            
            const children = Array.from(body.children);
            if (children.length > 0) {
              const CHUNK_SIZE = 5;
              for (let i = 0; i < children.length; i += CHUNK_SIZE) {
                const group = children.slice(i, i + CHUNK_SIZE);
                const tempContainer = doc.createElement('div');
                group.forEach(node => tempContainer.appendChild(node.cloneNode(true)));
                chunks.push(tempContainer.innerHTML);
              }
            } else {
              const textLines = html.split('\n');
              const CHUNK_SIZE = 50;
              for (let i = 0; i < textLines.length; i += CHUNK_SIZE) {
                chunks.push(textLines.slice(i, i + CHUNK_SIZE).join('\n'));
              }
            }
          } else {
            const paragraphs = text.split(/\n+/);
            const CHUNK_SIZE = 30;
            for (let i = 0; i < paragraphs.slice(0, 500).length; i += CHUNK_SIZE) {
              const group = paragraphs.slice(i, i + CHUNK_SIZE);
              const htmlParagraphs = group.map(p => {
                const trimmed = p.trim();
                if (!trimmed) return '';
                const escaped = trimmed
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;");
                return `<p>${escaped}</p>`;
              }).filter(p => p !== '').join('');
              
              if (htmlParagraphs) {
                chunks.push(htmlParagraphs);
              }
            }
          }

          if (chunks.length === 0) {
            setPasteProgress(null);
            return true;
          }

          let currentChunkIdx = 0;
          const total = chunks.length;

          const insertNextChunk = () => {
            if (currentChunkIdx >= total) {
              setPasteProgress(null);
              return;
            }

            const chunk = chunks[currentChunkIdx];
            view.focus();
            
            try {
              const element = document.createElement('div');
              element.innerHTML = chunk;
              const domParser = view.state.schema.cached.domParser || (view.state.schema.cached as any).parser;
              const slice = domParser.parseSlice(element);
              const transaction = view.state.tr.replaceSelection(slice).scrollIntoView();
              view.dispatch(transaction);
            } catch (err) {
              console.error('ProseMirror chunk parse failed, fallback to insertContent', err);
              try {
                (view as any).editor?.commands.insertContent(chunk);
              } catch (err2) {
                // Ignore parse errors on fallback
              }
            }

            currentChunkIdx++;
            const percentage = Math.round((currentChunkIdx / total) * 100);
            setPasteProgress({
              active: true,
              totalChunks: total,
              currentChunk: currentChunkIdx,
              percentage
            });

            if (typeof window.requestIdleCallback === 'function') {
              window.requestIdleCallback(() => insertNextChunk(), { timeout: 100 });
            } else {
              setTimeout(insertNextChunk, 16);
            }
          };

          insertNextChunk();
          return true;
        }
        return false;
      }
    },
    onUpdate: ({ editor }) => {
      if (isApplyingHistoryRef.current) return;
      // Debounce heavy autosave serialization (1000ms idle)
      if (autoSaveDebounceRef.current) clearTimeout(autoSaveDebounceRef.current);
      autoSaveDebounceRef.current = setTimeout(() => {
        if (!editor.isDestroyed && !isApplyingHistoryRef.current) {
          const html = editor.getHTML();
          if (html !== contentRef.current) {
            contentRef.current = html;
            setContentState(html);
            setWordCount(editor.storage.characterCount?.words?.() || countWordsFromHtml(html));
            setCharCount(countCharsFromHtml(html));
            setLastModified(new Date());
            if (historyEngineRef.current.commit(buildSnapshot({ content: html }), 'immediate')) {
              syncHistoryState();
            }
          }
          triggerAutoSave(documentTitleRef.current, html, pageConfigRef.current, footnotesRef.current, endnotesRef.current);
        }
      }, 1000);

      // Debounce footnote/endnote relabeling
      if (footnoteRelabelTimeoutRef.current) clearTimeout(footnoteRelabelTimeoutRef.current);
      footnoteRelabelTimeoutRef.current = setTimeout(() => {
        if (!editor.isDestroyed) {
          let footnoteCount = 0;
          let endnoteCount = 0;
          let relabelChanged = false;
          const tr = editor.state.tr;
          editor.state.doc.descendants((node, pos) => {
            if (node.type.name === 'footnoteReference') {
              footnoteCount++;
              const expectedLabel = String(footnoteCount);
              if (node.attrs.label !== expectedLabel) {
                tr.setNodeMarkup(pos, undefined, { ...node.attrs, label: expectedLabel });
                relabelChanged = true;
              }
            } else if (node.type.name === 'endnoteReference') {
              endnoteCount++;
              const expectedLabel = String.fromCharCode(96 + endnoteCount);
              if (node.attrs.label !== expectedLabel) {
                tr.setNodeMarkup(pos, undefined, { ...node.attrs, label: expectedLabel });
                relabelChanged = true;
              }
            }
          });
          if (relabelChanged) {
            editor.view.dispatch(tr);
          }
        }
      }, 800);
    },
    onSelectionUpdate: ({ editor }) => {
        setHasActiveSelection(!editor.state.selection.empty);
        if (editor.isActive('table')) setActiveElementType('table');
        else if (editor.isActive('image')) setActiveElementType('image');
        else setActiveElementType('text');

        // Check for comment marks at selection
        if (editor.isActive('comment')) {
            const marks = editor.getAttributes('comment');
            if (marks && marks.commentId) {
                setActiveCommentId(marks.commentId);
            }
        } else {
            setActiveCommentId(null);
        }
    }
  });

  const setContent = useCallback((
    content: string,
    emitUpdate = true,
    options?: { historyMode?: HistoryCommitMode }
  ) => {
    const mode: HistoryCommitMode = isApplyingHistoryRef.current ? 'none' : (options?.historyMode ?? 'immediate');

    if (content !== contentRef.current) {
      contentRef.current = content;
      setContentState(content);
      setWordCount(countWordsFromHtml(content));
      setCharCount(countCharsFromHtml(content));
      setLastModified(new Date());
    }

    if (historyEngineRef.current.commit(buildSnapshot({ content }), mode)) {
      syncHistoryState();
    }

    if (editor && emitUpdate && !editor.isDestroyed) {
      editor.commands.setContent(content, false);
    }

    if (autoSaveDebounceRef.current) clearTimeout(autoSaveDebounceRef.current);
    autoSaveDebounceRef.current = setTimeout(() => {
      triggerAutoSave(documentTitleRef.current, contentRef.current, pageConfigRef.current, footnotesRef.current, endnotesRef.current);
    }, 1000);
  }, [editor, buildSnapshot, syncHistoryState, triggerAutoSave]);

  const applyHistoryEntry = useCallback((entry: HistoryEntry) => {
    isApplyingHistoryRef.current = true;
    try {
      const snap = entry.snapshot;
      const clonedConfig = clonePageConfig(snap.pageConfig);

      contentRef.current = snap.content;
      pageConfigRef.current = clonedConfig;
      headerContentRef.current = snap.headerContent;
      footerContentRef.current = snap.footerContent;
      firstHeaderContentRef.current = snap.firstHeaderContent;
      firstFooterContentRef.current = snap.firstFooterContent;

      setContentState(snap.content);
      setPageConfigRaw(clonedConfig);
      setHeaderContentRaw(snap.headerContent);
      setFooterContentRaw(snap.footerContent);
      setFirstHeaderContentRaw(snap.firstHeaderContent);
      setFirstFooterContentRaw(snap.firstFooterContent);
      setWordCount(countWordsFromHtml(snap.content));
      setCharCount(countCharsFromHtml(snap.content));
      setLastModified(new Date());

      if (editor && !editor.isDestroyed) {
        editor.commands.setContent(snap.content, false);
      }

      setHistoryApplySeq(s => s + 1);
      syncHistoryState();
      triggerAutoSave(documentTitleRef.current, snap.content, clonedConfig, footnotesRef.current, endnotesRef.current);
    } finally {
      isApplyingHistoryRef.current = false;
    }
  }, [editor, syncHistoryState, triggerAutoSave]);

  const undo = useCallback(() => {
    const entry = historyEngineRef.current.undo();
    if (entry) {
      applyHistoryEntry(entry);
    }
  }, [applyHistoryEntry]);

  const redo = useCallback(() => {
    const entry = historyEngineRef.current.redo();
    if (entry) {
      applyHistoryEntry(entry);
    }
  }, [applyHistoryEntry]);

  const applyAdvancedStyle = useCallback((styles: React.CSSProperties) => {
    historyEngineRef.current.flush();
    if (editorRef.current && document.activeElement !== editorRef.current && !editorRef.current.contains(document.activeElement)) {
      editorRef.current.focus();
    }

    if (styles.fontFamily) {
      document.execCommand('fontName', false, styles.fontFamily);
    }
    if (styles.fontSize) {
      document.execCommand('fontSize', false, '7');
      const fonts = document.querySelectorAll('font[size="7"]');
      fonts.forEach(f => {
        f.removeAttribute('size');
        (f as HTMLElement).style.fontSize = styles.fontSize as string;
      });
    }
    if (styles.color) {
      document.execCommand('foreColor', false, styles.color);
    }
    if (styles.backgroundColor) {
      document.execCommand('hiliteColor', false, styles.backgroundColor);
    }

    const extraEntries = Object.entries(styles).filter(
      ([k, v]) => v !== undefined && v !== '' && !['fontFamily', 'fontSize', 'color', 'backgroundColor'].includes(k)
    );
    if (extraEntries.length > 0) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
        const range = sel.getRangeAt(0);
        try {
          const span = document.createElement('span');
          extraEntries.forEach(([k, v]) => {
            (span.style as any)[k] = v;
          });
          const extracted = range.extractContents();
          span.appendChild(extracted);
          range.insertNode(span);
          sel.removeAllRanges();
          const afterRange = document.createRange();
          afterRange.selectNodeContents(span);
          sel.addRange(afterRange);
        } catch {
          // Fallback to anchor parent styling
          let node = sel.anchorNode;
          if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
          if (node && node instanceof HTMLElement && !node.classList.contains('prodoc-editor')) {
            extraEntries.forEach(([k, v]) => {
              (node!.style as any)[k] = v;
            });
          }
        }
      }
    }

    if (editorRef.current) {
      editorRef.current.dataset.commitImmediate = 'true';
      editorRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, []);

  const applyFormatPainterToSelection = useCallback(() => {
    const captured = formatPainterStylesRef.current;
    if (!captured) return false;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return false;

    const anchorEl = sel.anchorNode?.nodeType === Node.TEXT_NODE ? sel.anchorNode.parentElement : (sel.anchorNode as HTMLElement | null);
    if (!anchorEl || !anchorEl.closest('.prodoc-editor')) return false;

    const stylePatch: React.CSSProperties = {};
    if (captured.fontFamily) stylePatch.fontFamily = captured.fontFamily;
    if (captured.fontSize) stylePatch.fontSize = captured.fontSize;
    if (captured.color) stylePatch.color = captured.color;
    if (captured.backgroundColor && captured.backgroundColor !== 'rgba(0, 0, 0, 0)' && captured.backgroundColor !== 'transparent') {
      stylePatch.backgroundColor = captured.backgroundColor;
    }
    if (captured.fontWeight) stylePatch.fontWeight = captured.fontWeight as any;
    if (captured.fontStyle) stylePatch.fontStyle = captured.fontStyle as any;
    if (captured.textDecorationLine && captured.textDecorationLine !== 'none') {
      stylePatch.textDecorationLine = captured.textDecorationLine;
    }

    applyAdvancedStyle(stylePatch);
    setFormatPainterStyles(null);
    return true;
  }, [applyAdvancedStyle]);

  const executeCommand = useCallback((command: string, value?: string) => {
    if (command === 'undo') {
      undo();
      return;
    }
    if (command === 'redo') {
      redo();
      return;
    }

    let nativeCommandExecuted = false;

    // Seal any prior typing burst before executing an explicit command
    historyEngineRef.current.flush();

    if (command === 'zoomReset') {
      setZoomMode('custom');
      setZoomLayout('single');
      setZoom(100);
      return;
    }
    if (command === 'fitPage') {
      setZoomMode('fit-page');
      return;
    }
    if (command === 'fitWidth') {
      setZoomLayout('single');
      setZoomMode('fit-width');
      return;
    }
    if (command === 'save') {
      manualSave(documentTitleRef.current, contentRef.current, pageConfigRef.current, footnotesRef.current, endnotesRef.current);
      showToast('Document saved.', 'success');
      return;
    }
    if (command === 'formatPainter') {
      if (formatPainterStylesRef.current) {
        setFormatPainterStyles(null);
        showToast('Format Painter cleared.', 'info');
        return;
      }
      const sel = window.getSelection();
      let node: Node | null = sel && sel.rangeCount > 0 ? sel.anchorNode : null;
      if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
      if (node instanceof HTMLElement && node.closest('.prodoc-editor')) {
        const computed = window.getComputedStyle(node);
        setFormatPainterStyles({
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          fontStyle: computed.fontStyle,
          textDecorationLine: computed.textDecorationLine,
          color: computed.color,
          backgroundColor: computed.backgroundColor,
        });
        showToast('Format Painter active — select target text to apply formatting.', 'info');
      } else {
        showToast('Place your cursor inside formatted text before activating Format Painter.', 'warning');
      }
      return;
    }

    // Focus the editorRef if it's not already focused
    if (editorRef.current && document.activeElement !== editorRef.current && !editorRef.current.contains(document.activeElement)) {
      editorRef.current.focus();
    }

    switch (command) {
      case 'bold': document.execCommand('bold'); nativeCommandExecuted = true; break;
      case 'italic': document.execCommand('italic'); nativeCommandExecuted = true; break;
      case 'underline': document.execCommand('underline'); nativeCommandExecuted = true; break;
      case 'strikeThrough': document.execCommand('strikeThrough'); nativeCommandExecuted = true; break;
      case 'subscript': document.execCommand('subscript'); nativeCommandExecuted = true; break;
      case 'superscript': document.execCommand('superscript'); nativeCommandExecuted = true; break;
      case 'indent': document.execCommand('indent'); nativeCommandExecuted = true; break;
      case 'outdent': document.execCommand('outdent'); nativeCommandExecuted = true; break;
      case 'justifyLeft': document.execCommand('justifyLeft'); nativeCommandExecuted = true; break;
      case 'justifyCenter': document.execCommand('justifyCenter'); nativeCommandExecuted = true; break;
      case 'justifyRight': document.execCommand('justifyRight'); nativeCommandExecuted = true; break;
      case 'justifyFull': document.execCommand('justifyFull'); nativeCommandExecuted = true; break;
      case 'insertUnorderedList': document.execCommand('insertUnorderedList'); nativeCommandExecuted = true; break;
      case 'insertOrderedList': document.execCommand('insertOrderedList'); nativeCommandExecuted = true; break;
      case 'formatBlock':
        document.execCommand('formatBlock', false, value);
        nativeCommandExecuted = true;
        break;
      case 'insertImage': document.execCommand('insertImage', false, value); nativeCommandExecuted = true; break;
      case 'createLink': document.execCommand('createLink', false, value); nativeCommandExecuted = true; break;
      case 'foreColor': document.execCommand('foreColor', false, value); nativeCommandExecuted = true; break;
      case 'hiliteColor':
        if (value === 'transparent') document.execCommand('hiliteColor', false, 'transparent');
        else document.execCommand('hiliteColor', false, value);
        nativeCommandExecuted = true;
        break;
      case 'insertTable':
        if (value) {
          const { rows, cols } = JSON.parse(value);
          let tableHTML = '<table border="1" style="width: 100%; border-collapse: collapse;"><tbody>';
          for (let i = 0; i < rows; i++) {
            tableHTML += '<tr>';
            for (let j = 0; j < cols; j++) {
              tableHTML += '<td style="padding: 8px;"><br></td>';
            }
            tableHTML += '</tr>';
          }
          tableHTML += '</tbody></table><p><br></p>';
          document.execCommand('insertHTML', false, tableHTML);
          nativeCommandExecuted = true;

          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('prodoc:switchTab', { detail: 'table-design' }));
          }, 100);
        }
        break;
      case 'insertHTML':
        document.execCommand('insertHTML', false, value!);
        nativeCommandExecuted = true;
        break;
      case 'insertText': document.execCommand('insertText', false, value!); nativeCommandExecuted = true; break;
      case 'selectAll': document.execCommand('selectAll'); nativeCommandExecuted = true; break;
      case 'removeFormat': {
        document.execCommand('removeFormat');
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          const root = editorRef.current || document;
          const inlineCandidates = root.querySelectorAll('span, font, strong, em, b, i, u, s, strike, sub, sup');
          inlineCandidates.forEach((el) => {
            if (range.intersectsNode(el) && el instanceof HTMLElement && !el.classList.contains('prodoc-page-break') && !el.classList.contains('prodoc-column-break')) {
              el.removeAttribute('color');
              el.removeAttribute('face');
              el.removeAttribute('size');
              el.style.fontSize = '';
              el.style.fontFamily = '';
              el.style.color = '';
              el.style.backgroundColor = '';
              el.style.fontWeight = '';
              el.style.fontStyle = '';
              el.style.textDecoration = '';
              el.style.letterSpacing = '';
              el.style.textTransform = '';
              el.style.fontVariant = '';
            }
          });
        }
        nativeCommandExecuted = true;
        break;
      }
      case 'pageBreak':
        document.execCommand('insertHTML', false, '<div class="prodoc-page-break" data-type="page-break" style="page-break-after: always;"><hr></div><p><br></p>');
        nativeCommandExecuted = true;
        break;
      case 'columnBreak':
        document.execCommand('insertHTML', false, '<div class="prodoc-column-break" data-type="column-break" style="break-after: column; -webkit-column-break-after: always;"><hr></div><p><br></p>');
        nativeCommandExecuted = true;
        break;
      case 'textWrappingBreak':
        document.execCommand('insertHTML', false, '<br class="prodoc-text-wrapping-break" style="clear: both;" />');
        nativeCommandExecuted = true;
        break;
      case 'cut':
        document.execCommand('cut');
        nativeCommandExecuted = true;
        break;
      case 'copy':
        document.execCommand('copy');
        nativeCommandExecuted = true;
        break;
      default:
        console.warn(`Command ${command} not implemented`);
    }

    if (nativeCommandExecuted && editorRef.current) {
      editorRef.current.dataset.commitImmediate = 'true';
      editorRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, [undo, redo, manualSave, editorRef, showToast]);

  const applyBlockStyle = useCallback((styles: React.CSSProperties) => {
    historyEngineRef.current.flush();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const BLOCK_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DIV', 'LI', 'TD', 'TH', 'BLOCKQUOTE', 'PRE']);
    const appliedBlocks = new Set<HTMLElement>();
    const range = selection.getRangeAt(0);

    // Traverse all intersecting blocks across active editor containers
    const activeContainers = Array.from(document.querySelectorAll('.prodoc-editor')) as HTMLElement[];
    if (editorRef.current && !activeContainers.includes(editorRef.current)) {
      activeContainers.unshift(editorRef.current);
    }

    if (!range.collapsed) {
      activeContainers.forEach((container) => {
        if (!range.intersectsNode(container)) return;
        const candidates = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, blockquote, pre, td, th, div');
        candidates.forEach((candidate) => {
          if (
            candidate instanceof HTMLElement &&
            !candidate.classList.contains('prodoc-editor') &&
            !candidate.classList.contains('prodoc-page-break') &&
            !candidate.classList.contains('prodoc-column-break') &&
            BLOCK_TAGS.has(candidate.tagName) &&
            range.intersectsNode(candidate)
          ) {
            Object.assign(candidate.style, styles);
            appliedBlocks.add(candidate);
          }
        });
      });
    }

    // Fallback or collapsed caret: nearest enclosing block element
    if (appliedBlocks.size === 0) {
      let node: Node | null = selection.anchorNode;
      if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
      while (node && node instanceof HTMLElement && !node.classList.contains('prodoc-editor')) {
        if (BLOCK_TAGS.has(node.tagName)) {
          Object.assign(node.style, styles);
          appliedBlocks.add(node);
          break;
        }
        node = node.parentElement;
      }
    }

    const targetEditor = (selection.anchorNode instanceof HTMLElement
      ? selection.anchorNode.closest('.prodoc-editor')
      : selection.anchorNode?.parentElement?.closest('.prodoc-editor')) as HTMLElement | null || editorRef.current;

    if (targetEditor) {
      targetEditor.setAttribute('data-commit-immediate', 'true');
      targetEditor.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, []);

  const handlePasteSpecial = useCallback(async (type: 'keep-source' | 'merge' | 'text-only') => {
    historyEngineRef.current.flush();
    if (editorRef.current && document.activeElement !== editorRef.current && !editorRef.current.contains(document.activeElement)) {
      editorRef.current.focus();
    }

    let htmlData = '';
    let plainData = '';

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        if (typeof navigator.clipboard.read === 'function' && type !== 'text-only') {
          try {
            const items = await navigator.clipboard.read();
            for (const item of items) {
              if (item.types.includes('text/html') && !htmlData) {
                const blob = await item.getType('text/html');
                htmlData = await blob.text();
              }
              if (item.types.includes('text/plain') && !plainData) {
                const blob = await item.getType('text/plain');
                plainData = await blob.text();
              }
            }
          } catch {
            // Fallback to readText below
          }
        }
        if (!htmlData && !plainData && typeof navigator.clipboard.readText === 'function') {
          plainData = await navigator.clipboard.readText();
        }
      }
    } catch {
      showToast('Clipboard access was denied. Please use Ctrl+V / Cmd+V directly.', 'warning');
      return;
    }

    if (!htmlData && !plainData) {
      showToast('Clipboard is empty or cannot be read by the browser.', 'info');
      return;
    }

    if (type === 'text-only') {
      const textSource = plainData || htmlData.replace(/<[^>]+>/g, '');
      const escapedLines = textSource
        .split(/\r?\n/)
        .map((line) => {
          const escaped = line
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          return escaped ? `<p>${escaped}</p>` : '<p><br></p>';
        })
        .join('');
      document.execCommand('insertHTML', false, escapedLines);
    } else if (htmlData) {
      const cleaned = sanitizePastedHtml(htmlData, type === 'merge');
      document.execCommand('insertHTML', false, cleaned);
    } else {
      const escapedLines = plainData
        .split(/\r?\n/)
        .map((line) => `<p>${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || '<br>'}</p>`)
        .join('');
      document.execCommand('insertHTML', false, escapedLines);
    }

    if (editorRef.current) {
      editorRef.current.dataset.commitImmediate = 'true';
      editorRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, [showToast]);

  const importFile = useCallback(async (file: File) => {
    if (!file) return;
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    const extension = file.name.split('.').pop()?.toLowerCase();

    setImportState({ active: true, percent: 5, status: 'Initializing file read...' });

    try {
      let htmlContent = '';
      if (extension === 'docx') {
        const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as ArrayBuffer);
          reader.onerror = () => reject(new Error('Failed to read file as ArrayBuffer'));
          reader.readAsArrayBuffer(file);
        });

        htmlContent = await importDocxToEditor(arrayBuffer, (percent, status) => {
          setImportState({ active: true, percent, status });
        });
      } else {
        const textContent = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Failed to read file as text'));
          reader.readAsText(file);
        });

        if (extension === 'html' || extension === 'htm') {
          setImportState({ active: true, percent: 50, status: 'Parsing HTML content...' });
          htmlContent = importHtmlToEditor(textContent);
        } else if (extension === 'md') {
          setImportState({ active: true, percent: 50, status: 'Parsing Markdown content...' });
          htmlContent = await marked.parse(textContent);
        } else if (extension === 'json') {
          setImportState({ active: true, percent: 50, status: 'Parsing JSON Document Model...' });
          try {
            const parsed = JSON.parse(textContent);
            if (parsed.type === 'document' && parsed.pages) {
              htmlContent = jsonDocumentToHtml(parsed);
              if (parsed.pageConfig) {
                setPageConfig(parsed.pageConfig);
              }
            } else {
              htmlContent = `<p>${textContent}</p>`;
            }
          } catch {
            htmlContent = `<p>${textContent}</p>`;
          }
        } else {
          setImportState({ active: true, percent: 50, status: 'Processing plain text...' });
          htmlContent = textContent.split('\n').map(line => `<p>${line}</p>`).join('');
        }
      }

      setImportState({ active: true, percent: 90, status: 'Injecting content into editor...' });

      setContent(htmlContent, true, { historyMode: 'immediate' });
      setDocumentTitle(nameWithoutExt);

      try {
        const savedDocs = JSON.parse(localStorage.getItem('saved_documents') || '{}');
        savedDocs[nameWithoutExt] = {
          documentModel: htmlToJSONDocument(htmlContent, nameWithoutExt, pageConfig),
          content: htmlContent,
          lastModified: new Date().toISOString()
        };
        localStorage.setItem('saved_documents', JSON.stringify(savedDocs));

        let recents = JSON.parse(localStorage.getItem('recent_documents') || '[]');
        recents = recents.filter((r: any) => r.name !== nameWithoutExt);
        recents.unshift({
          name: nameWithoutExt,
          date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          path: 'Uploaded File'
        });
        localStorage.setItem('recent_documents', JSON.stringify(recents.slice(0, 10)));
      } catch (storageErr) {
        console.error('Failed to save imported document metadata:', storageErr);
      }

      setImportState({ active: false, percent: 100, status: 'Import completed!' });
    } catch (error: any) {
      console.error('Failed to import file:', error);
      setImportState({ active: false, percent: 0, status: '' });
      showToast("Could not open this file: " + (error?.message || "Unknown error"), 'error');
    }
  }, [setContent, setDocumentTitle, pageConfig, setPageConfig, setImportState, showToast]);

  const pageDimensions = useMemo(() => {
    const phys = getPhysicalDimensions(pageConfig.size, pageConfig.orientation, pageConfig.customWidth, pageConfig.customHeight);
    return {
      width: phys.widthPx,
      height: phys.heightPx,
      widthInches: phys.widthInches,
      heightInches: phys.heightInches,
      widthMm: phys.widthMm,
      heightMm: phys.heightMm,
    };
  }, [pageConfig.size, pageConfig.orientation, pageConfig.customWidth, pageConfig.customHeight]);

  const addCustomStyle = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    let capturedStyles: React.CSSProperties = { fontFamily: 'Calibri, sans-serif', fontSize: '14.6667px', color: '#0f172a' };
    let tagName = 'P';
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      let node: Node | null = sel.anchorNode;
      if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
      if (node instanceof HTMLElement) {
        const computed = window.getComputedStyle(node);
        capturedStyles = {
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight as any,
          fontStyle: computed.fontStyle as any,
          color: computed.color,
          textDecoration: computed.textDecorationLine !== 'none' ? computed.textDecorationLine : undefined,
        };
        const block = node.closest('h1, h2, h3, h4, h5, h6, p, blockquote');
        if (block) tagName = block.tagName;
      }
    }
    const newStyle: CustomStyle = {
      id: `custom-style-${Date.now()}`,
      name: trimmed,
      styles: capturedStyles,
      tagName,
    };
    setCustomStyles((prev) => [...prev, newStyle]);
    showToast(`Created custom style "${trimmed}".`, 'success');
  }, [showToast]);

  const applyCustomStyle = useCallback((style: CustomStyle) => {
    if (style.tagName && ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE'].includes(style.tagName)) {
      executeCommand('formatBlock', style.tagName);
    }
    if (style.styles) {
      applyAdvancedStyle(style.styles);
    }
  }, [executeCommand, applyAdvancedStyle]);

  const applyAdvancedStyleCallback = useCallback((styles: React.CSSProperties) => applyAdvancedStyle(styles), [applyAdvancedStyle]);
  const applyBlockStyleCallback = useCallback((styles: React.CSSProperties) => applyBlockStyle(styles), [applyBlockStyle]);
  const registerContainer = useCallback((node: HTMLDivElement | null) => { containerRef.current = node; }, []);

  const addComment = useCallback((text: string) => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    if (from === to) {
      showToast("Please select some text to comment on.", 'warning');
      return;
    }
    const id = `comment-${Date.now()}`;
    const anchorId = `anchor-${Date.now()}`;
    editor.chain().focus().setMark('comment', { commentId: id }).run();
    setComments(prev => [...prev, {
      id,
      anchorId,
      author: 'Current User',
      content: text,
      createdAt: new Date().toISOString(),
      resolved: false
    }]);
    setShowComments(true);
  }, [editor, showToast]);

  const resolveComment = useCallback((id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, resolved: true } : c));
  }, []);

  const removeComment = useCallback((id: string) => {
    if (!editor) return;
    setComments(prev => prev.filter(c => c.id !== id));
    
    // Optional: remove mark from the editor if we find it
    // For now, removing the mark requires traversing the document, which we can simplify:
    const tr = editor.state.tr;
    editor.state.doc.descendants((node, pos) => {
      if (node.marks) {
        node.marks.forEach(mark => {
          if (mark.type.name === 'comment' && mark.attrs.commentId === id) {
            tr.removeMark(pos, pos + node.nodeSize, mark.type);
          }
        });
      }
    });
    if (tr.docChanged) {
      editor.view.dispatch(tr);
    }
  }, [editor]);

  const addFootnote = useCallback(() => {
    if (!editor) return '';
    const id = `footnote-${Date.now()}`;
    editor.chain().focus().insertContent({
      type: 'footnoteReference',
      attrs: { noteId: id, label: '' }
    }).run();
    setFootnotes(prev => [...prev, { id, content: 'Footnote content' }]);
    return id;
  }, [editor]);

  const addEndnote = useCallback(() => {
    if (!editor) return '';
    const id = `endnote-${Date.now()}`;
    editor.chain().focus().insertContent({
      type: 'endnoteReference',
      attrs: { noteId: id, label: '' }
    }).run();
    setEndnotes(prev => [...prev, { id, content: 'Endnote content' }]);
    return id;
  }, [editor]);

  const updateFootnote = useCallback((id: string, content: string) => {
    setFootnotes(prev => prev.map(f => f.id === id ? { ...f, content } : f));
  }, []);

  const updateEndnote = useCallback((id: string, content: string) => {
    setEndnotes(prev => prev.map(e => e.id === id ? { ...e, content } : e));
  }, []);

  const removeFootnote = useCallback((id: string) => {
    setFootnotes(prev => prev.filter(f => f.id !== id));
    if (!editor) return;
    const tr = editor.state.tr;
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'footnoteReference' && node.attrs.noteId === id) {
        tr.delete(pos, pos + node.nodeSize);
      }
    });
    if (tr.docChanged) {
      editor.view.dispatch(tr);
    }
  }, [editor]);

  const removeEndnote = useCallback((id: string) => {
    setEndnotes(prev => prev.filter(e => e.id !== id));
    if (!editor) return;
    const tr = editor.state.tr;
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'endnoteReference' && node.attrs.noteId === id) {
        tr.delete(pos, pos + node.nodeSize);
      }
    });
    if (tr.docChanged) {
      editor.view.dispatch(tr);
    }
  }, [editor]);

  const loadDocument = useCallback((name: string) => {
    try {
      const savedDocs = JSON.parse(localStorage.getItem('saved_documents') || '{}');
      const doc = savedDocs[name];
      if (doc) {
        if (doc.documentModel) {
          const html = jsonDocumentToHtml(doc.documentModel);
          setContent(html);
          if (doc.documentModel.pageConfig) {
            setPageConfig(doc.documentModel.pageConfig);
          }
          if (doc.documentModel.footnotes) {
            setFootnotes(doc.documentModel.footnotes);
          } else {
            setFootnotes([]);
          }
          if (doc.documentModel.endnotes) {
            setEndnotes(doc.documentModel.endnotes);
          } else {
            setEndnotes([]);
          }
        } else {
          setContent(doc.content);
          setFootnotes([]);
          setEndnotes([]);
        }
        setDocumentTitle(name);
      }
    } catch (err) {
      console.error('Failed to load document:', err);
    }
  }, [setContent, setPageConfig, setDocumentTitle]);

  const contextValue = useMemo(() => ({
    editor,
    content: contentState,
    setContent,
    undo,
    redo,
    canUndo,
    canRedo,
    historyApplySeq,
    wordCount,
    charCount,
    zoom,
    setZoom,
    zoomMode,
    setZoomMode,
    zoomLayout,
    setZoomLayout,
    measurementUnit,
    setMeasurementUnit,
    screenCalibration,
    updateScreenCalibration,
    calibrationScale,
    viewMode,
    setViewMode,
    pageMovement,
    setPageMovement,
    readConfig,
    setReadConfig,
    saveStatus,
    executeCommand,
    editorRef,
    pageConfig,
    setPageConfig,
    showPageSetup,
    setShowPageSetup,
    pageSetupInitialTab,
    openPageSetup,
    showPageBordersDialog,
    setShowPageBordersDialog,
    showWordCountDialog,
    setShowWordCountDialog,
    toast,
    showToast,
    dismissToast,
    formatPainterStyles,
    applyFormatPainterToSelection,
    pageDimensions,
    registerContainer,
    showRuler,
    setShowRuler,
    documentTitle,
    setDocumentTitle,
    lastModified,
    setLastModified,
    creationDate,
    showFormattingMarks,
    setShowFormattingMarks,
    customStyles,
    addCustomStyle,
    applyCustomStyle,
    applyAdvancedStyle: applyAdvancedStyleCallback,
    applyBlockStyle: applyBlockStyleCallback,
    handlePasteSpecial,
    activeElementType,
    setActiveElementType,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    goToPage,
    pageJumpTarget,
    showJsonInspector,
    setShowJsonInspector,
    activeEditingArea,
    setActiveEditingArea,
    showDocumentText,
    setShowDocumentText,
    headerContent,
    setHeaderContent,
    footerContent,
    setFooterContent,
    firstHeaderContent,
    setFirstHeaderContent,
    firstFooterContent,
    setFirstFooterContent,
    isKeyboardLocked,
    isTableResizerEnabled,
    isTableResizing,
    setIsTableResizing,
    setIsTableResizerEnabled,
    setIsKeyboardLocked,
    selectionMode,
    setSelectionMode,
    hasActiveSelection,
    selectionAction,
    setSelectionAction,
    importState,
    importFile,
    comments,
    setComments,
    activeCommentId,
    setActiveCommentId,
    showComments,
    setShowComments,
    addComment,
    resolveComment,
    removeComment,
    footnotes,
    setFootnotes,
    endnotes,
    setEndnotes,
    addFootnote,
    addEndnote,
    updateFootnote,
    updateEndnote,
    removeFootnote,
    removeEndnote,
    loadDocument,
    showNotes,
    setShowNotes,
    pasteProgress,
    setPasteProgress
  }), [
    editor,
    contentState,
    setContent,
    undo,
    redo,
    canUndo,
    canRedo,
    historyApplySeq,
    wordCount,
    charCount,
    zoom,
    zoomMode,
    zoomLayout,
    measurementUnit,
    setMeasurementUnit,
    screenCalibration,
    updateScreenCalibration,
    calibrationScale,
    viewMode,
    pageMovement,
    readConfig,
    saveStatus,
    executeCommand,
    pageConfig,
    setPageConfig,
    showPageSetup,
    pageSetupInitialTab,
    openPageSetup,
    showPageBordersDialog,
    showWordCountDialog,
    toast,
    showToast,
    dismissToast,
    formatPainterStyles,
    applyFormatPainterToSelection,
    pageDimensions,
    registerContainer,
    showRuler,
    documentTitle,
    lastModified,
    creationDate,
    showFormattingMarks,
    customStyles,
    addCustomStyle,
    applyCustomStyle,
    applyAdvancedStyleCallback,
    applyBlockStyleCallback,
    handlePasteSpecial,
    activeElementType,
    setActiveElementType,
    currentPage,
    totalPages,
    goToPage,
    pageJumpTarget,
    showJsonInspector,
    activeEditingArea,
    showDocumentText,
    headerContent,
    setHeaderContent,
    footerContent,
    setFooterContent,
    firstHeaderContent,
    setFirstHeaderContent,
    firstFooterContent,
    setFirstFooterContent,
    isKeyboardLocked,
    isTableResizerEnabled,
    isTableResizing,
    selectionMode,
    hasActiveSelection,
    selectionAction,
    importState,
    importFile,
    comments,
    activeCommentId,
    showComments,
    addComment,
    resolveComment,
    removeComment,
    footnotes,
    endnotes,
    addFootnote,
    addEndnote,
    updateFootnote,
    updateEndnote,
    removeFootnote,
    removeEndnote,
    loadDocument,
    showNotes,
    setShowNotes,
    pasteProgress
  ]);

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
