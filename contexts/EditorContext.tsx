
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

import { SaveStatus, ViewMode, PageConfig, CustomStyle, ReadModeConfig, ActiveElementType, PageMovement, EditingArea, DocumentFootnote, DocumentEndnote } from '../types';
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

// Define custom types for TipTap integration
export interface EditorContextType {
  editor: Editor | null;
  content: string;
  setContent: (content: string, emitUpdate?: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  wordCount: number;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
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
  pageDimensions: any;
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
  showAssistant: boolean;
  setShowAssistant: React.Dispatch<React.SetStateAction<boolean>>;
  showJsonInspector: boolean;
  setShowJsonInspector: React.Dispatch<React.SetStateAction<boolean>>;
  
  // AI State
  aiState: 'idle' | 'thinking' | 'writing';
  setAiState: React.Dispatch<React.SetStateAction<'idle' | 'thinking' | 'writing'>>;
  isAIProcessing: boolean;
  setIsAIProcessing: (isProcessing: boolean) => void;
  
  // Header/Footer & Editing Area
  activeEditingArea: EditingArea;
  setActiveEditingArea: React.Dispatch<React.SetStateAction<EditingArea>>;
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

  // Viewport Base Zoom (for relative zoom)
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

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    try {
      document.execCommand('enableObjectResizing', false, 'false');
      document.execCommand('enableInlineTableEditing', false, 'false');
    } catch (e) {
      // Ignored if not supported
    }
  }, []);

  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
  const documentTitleRef = useRef(documentTitle);
  useEffect(() => {
    documentTitleRef.current = documentTitle;
  }, [documentTitle]);

  const [creationDate] = useState(() => new Date());
  const [lastModified, setLastModified] = useState(() => new Date());
  const [wordCount, setWordCount] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [zoomMode, setZoomMode] = useState<'custom' | 'fit-width' | 'fit-page'>('custom');
  const [viewMode, setViewMode] = useState<ViewMode>('print');
  const [pageMovement, setPageMovement] = useState<PageMovement>('vertical');

  const [showRuler, setShowRuler] = useState(true);
  const [showFormattingMarks, setShowFormattingMarks] = useState(false);
  const [activeElementType, setActiveElementType] = useState<ActiveElementType>('text');
  const [showPageSetup, setShowPageSetup] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showJsonInspector, setShowJsonInspector] = useState(false);
  const [aiState, setAiState] = useState<'idle' | 'thinking' | 'writing'>('idle');
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
  
  // Default Header/Footer content
  const [headerContent, setHeaderContent] = useState('<p style="color:#94a3b8">Header</p>');
  const [footerContent, setFooterContent] = useState('<p style="color:#94a3b8">Footer - [Page <span class="page-number-placeholder">1</span>]</p>');
  
  // First Page Header/Footer content
  const [firstHeaderContent, setFirstHeaderContent] = useState('<p style="color:#94a3b8">First Page Header</p>');
  const [firstFooterContent, setFirstFooterContent] = useState('<p style="color:#94a3b8">First Page Footer</p>');
  
  const [isKeyboardLocked, setIsKeyboardLocked] = useState(false);
  const [isTableResizerEnabled, setIsTableResizerEnabled] = useState(false);
  const [isTableResizing, setIsTableResizing] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [hasActiveSelection, setHasActiveSelection] = useState(false);
  const [selectionAction, setSelectionAction] = useState<any | null>(null);

  const [pageConfig, setPageConfig] = useState<PageConfig>({
    size: 'Letter',
    orientation: 'portrait',
    marginPreset: 'normal',
    margins: MARGIN_PRESETS.normal,
    background: 'none',
    headerDistance: 0.5,
    footerDistance: 0.5,
    verticalAlign: 'top',
    sectionStart: 'newpage',
    differentOddEven: false,
    differentFirstPage: false,
    gutterPosition: 'left',
    multiplePages: 'normal',
    applyTo: 'wholeDocument',
    sheetsPerBooklet: 'all'
  });

  const pageConfigRef = useRef(pageConfig);
  useEffect(() => {
    pageConfigRef.current = pageConfig;
  }, [pageConfig]);

  const [readConfig, setReadConfig] = useState<ReadModeConfig>({
    theme: 'light',
    columns: 1,
    textScale: 1.2
  });

  const editorRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { saveStatus, triggerAutoSave, manualSave } = useAutoSave();

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
            for (let i = 0; i < paragraphs.length; i += CHUNK_SIZE) {
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
              // Fallback
              try {
                (view as any).editor?.commands.insertContent(chunk);
              } catch (e2) {}
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
      setWordCount(editor.storage.characterCount?.words?.() || 0);
      setLastModified(new Date());

      // Chronological relabeling of footnotes and endnotes
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
          const expectedLabel = String.fromCharCode(96 + endnoteCount); // 'a', 'b', 'c'...
          if (node.attrs.label !== expectedLabel) {
            tr.setNodeMarkup(pos, undefined, { ...node.attrs, label: expectedLabel });
            relabelChanged = true;
          }
        }
      });
      
      if (relabelChanged) {
        editor.view.dispatch(tr);
      }

      triggerAutoSave(documentTitleRef.current, editor.getHTML(), pageConfigRef.current, footnotesRef.current, endnotesRef.current);
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

  const setContent = useCallback((content: string, emitUpdate = true) => {
    if (editor && emitUpdate) {
        editor.commands.setContent(content);
    }
  }, [editor]);

  const executeCommand = useCallback((command: string, value?: string) => {
    let nativeCommandExecuted = false;

    // Focus the editorRef if it's not already focused
    if (editorRef.current && document.activeElement !== editorRef.current && !editorRef.current.contains(document.activeElement)) {
        editorRef.current.focus();
    }

    switch (command) {
        case 'bold': document.execCommand('bold'); nativeCommandExecuted = true; break;
        case 'italic': document.execCommand('italic'); nativeCommandExecuted = true; break;
        case 'underline': document.execCommand('underline'); nativeCommandExecuted = true; break;
        case 'strikeThrough': document.execCommand('strikeThrough'); nativeCommandExecuted = true; break;
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
        case 'undo': document.execCommand('undo'); nativeCommandExecuted = true; break;
        case 'redo': document.execCommand('redo'); nativeCommandExecuted = true; break;
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
                
                // Switch to table design tab after a short delay to allow selection to update
                setTimeout(() => {
                    const event = new CustomEvent('prodoc:switchTab', { detail: 'table-design' });
                    window.dispatchEvent(event);
                }, 100);
            }
            break;
        case 'insertHTML': 
            document.execCommand('insertHTML', false, value!); 
            nativeCommandExecuted = true;
            break;
        case 'insertText': document.execCommand('insertText', false, value!); nativeCommandExecuted = true; break;
        case 'selectAll': document.execCommand('selectAll'); nativeCommandExecuted = true; break;
        case 'removeFormat': document.execCommand('removeFormat'); nativeCommandExecuted = true; break;
        case 'zoomReset': 
            setZoomMode('fit-page');
            break;
        case 'fitPage': setZoomMode('fit-page'); break;
        case 'fitWidth': setZoomMode('fit-width'); break;
        case 'save': 
            if (editor) {
                manualSave(documentTitleRef.current, editor.getHTML(), pageConfigRef.current, footnotesRef.current, endnotesRef.current); 
            }
            break;
        case 'pageBreak': 
            document.execCommand('insertHTML', false, '<div class="prodoc-page-break" data-type="page-break" style="page-break-after: always;"><hr></div><p><br></p>');
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
        case 'formatPainter':
             // Placeholder for format painter state logic
             break;
        default: console.warn(`Command ${command} not implemented`);
    }

    if (nativeCommandExecuted && editorRef.current) {
        const newHtml = editorRef.current.innerHTML;
        if (editor) {
            editor.commands.setContent(newHtml);
        }
        const event = new Event('input', { bubbles: true });
        editorRef.current.dispatchEvent(event);
    }
  }, [editor, manualSave, editorRef]);

  // Legacy style compatibility functions
  const applyAdvancedStyle = (styles: React.CSSProperties) => {
      if (styles.fontFamily) {
          document.execCommand('fontName', false, styles.fontFamily);
      }
      if (styles.fontSize) {
          // Fallback trick for exact font sizes in contentEditable
          document.execCommand('fontSize', false, '7');
          const fonts = document.querySelectorAll('font[size="7"]');
          fonts.forEach(f => {
              f.removeAttribute('size');
              f.style.fontSize = styles.fontSize as string;
          });
      }
      
      if (editorRef.current) {
          const event = new Event('input', { bubbles: true });
          editorRef.current.dispatchEvent(event);
      }
  };

  const applyBlockStyle = (styles: React.CSSProperties) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      
      let node = selection.anchorNode;
      if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
      
      while (node && node !== editorRef.current) {
          const el = node as HTMLElement;
          if (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DIV', 'LI', 'TD', 'TH'].includes(el.tagName)) {
              Object.assign(el.style, styles);
              break;
          }
          node = node.parentElement;
      }
      
      if (editorRef.current) {
          const event = new Event('input', { bubbles: true });
          editorRef.current.dispatchEvent(event);
      }
  };
  
  const handlePasteSpecial = useCallback(async (type: 'keep-source' | 'merge' | 'text-only') => {}, []); // TipTap handles paste

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
          } catch (e) {
            htmlContent = `<p>${textContent}</p>`;
          }
        } else {
          setImportState({ active: true, percent: 50, status: 'Processing plain text...' });
          htmlContent = textContent.split('\n').map(line => `<p>${line}</p>`).join('');
        }
      }

      setImportState({ active: true, percent: 90, status: 'Injecting content into editor...' });
      
      if (editor) {
        editor.commands.setContent(htmlContent);
      }
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
      alert("Could not open this file: " + (error?.message || "Unknown error"));
    }
  }, [editor, setDocumentTitle, pageConfig, setPageConfig, setImportState]);

  const pageDimensions = useMemo(() => ({ width: 816, height: 1056 }), []); // Default Letter
  
  const addCustomStyle = useCallback((name: string) => {}, []);
  const applyCustomStyle = useCallback((style: CustomStyle) => {}, []);
  const applyAdvancedStyleCallback = useCallback((styles: React.CSSProperties) => applyAdvancedStyle(styles), []);
  const applyBlockStyleCallback = useCallback((styles: React.CSSProperties) => applyBlockStyle(styles), []);
  const setIsAIProcessing = useCallback((v: boolean) => setAiState(v ? 'thinking' : 'idle'), []);
  const registerContainer = useCallback((node: HTMLDivElement | null) => { containerRef.current = node; }, []);

  const addComment = useCallback((text: string) => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    if (from === to) {
      alert("Please select some text to comment on.");
      return;
    }
    const id = `comment-${Date.now()}`;
    const anchorId = `anchor-${Date.now()}`;
    editor.chain().focus().setMark('comment', { commentId: id }).run();
    setComments(prev => [...prev, {
      id,
      anchorId,
      author: 'Current User', // Stub, we can wire up identity later
      content: text,
      createdAt: new Date().toISOString(),
      resolved: false
    }]);
    setShowComments(true);
  }, [editor]);

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
    content: editor?.getHTML() || '',
    setContent,
    undo: () => editor?.chain().focus().undo().run(),
    redo: () => editor?.chain().focus().redo().run(),
    canUndo: editor?.can().undo() || false,
    canRedo: editor?.can().redo() || false,
    wordCount,
    zoom,
    setZoom,
    zoomMode,
    setZoomMode,
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
    customStyles: [] as CustomStyle[],
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
    showAssistant,
    setShowAssistant,
    showJsonInspector,
    setShowJsonInspector,
    aiState,
    setAiState,
    isAIProcessing: aiState !== 'idle',
    setIsAIProcessing,
    activeEditingArea,
    setActiveEditingArea,
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
    setContent,
    wordCount,
    zoom,
    zoomMode,
    viewMode,
    pageMovement,
    readConfig,
    saveStatus,
    executeCommand,
    pageConfig,
    showPageSetup,
    pageDimensions,
    registerContainer,
    showRuler,
    documentTitle,
    lastModified,
    creationDate,
    showFormattingMarks,
    addCustomStyle,
    applyCustomStyle,
    applyAdvancedStyleCallback,
    applyBlockStyleCallback,
    handlePasteSpecial,
    activeElementType,
    setActiveElementType,
    currentPage,
    totalPages,
    showAssistant,
    showJsonInspector,
    aiState,
    setIsAIProcessing,
    activeEditingArea,
    headerContent,
    footerContent,
    firstHeaderContent,
    firstFooterContent,
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
