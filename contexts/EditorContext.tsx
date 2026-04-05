
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

import { SaveStatus, ViewMode, PageConfig, CustomStyle, ReadModeConfig, ActiveElementType, PageMovement, EditingArea } from '../types';
import { useAutoSave } from '../hooks/useAutoSave';
import { DEFAULT_CONTENT, PAGE_SIZES, MARGIN_PRESETS } from '../constants';

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
  showCopilot: boolean;
  setShowCopilot: React.Dispatch<React.SetStateAction<boolean>>;
  
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
  setIsKeyboardLocked: React.Dispatch<React.SetStateAction<boolean>>;

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
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
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
  const [showCopilot, setShowCopilot] = useState(false);
  const [aiState, setAiState] = useState<'idle' | 'thinking' | 'writing'>('idle');
  
  const [activeEditingArea, setActiveEditingArea] = useState<EditingArea>('body');
  
  // Default Header/Footer content
  const [headerContent, setHeaderContent] = useState('<p style="color:#94a3b8">Header</p>');
  const [footerContent, setFooterContent] = useState('<p style="color:#94a3b8">Footer - [Page <span class="page-number-placeholder">1</span>]</p>');
  
  // First Page Header/Footer content
  const [firstHeaderContent, setFirstHeaderContent] = useState('<p style="color:#94a3b8">First Page Header</p>');
  const [firstFooterContent, setFirstFooterContent] = useState('<p style="color:#94a3b8">First Page Footer</p>');
  
  const [isKeyboardLocked, setIsKeyboardLocked] = useState(false);
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
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder: 'Start typing...' }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      PageBreakExtension,
    ],
    content: DEFAULT_CONTENT,
    onUpdate: ({ editor }) => {
      setWordCount(editor.storage.characterCount?.words?.() || 0);
      setLastModified(new Date());
      triggerAutoSave();
    },
    onSelectionUpdate: ({ editor }) => {
        setHasActiveSelection(!editor.state.selection.empty);
        if (editor.isActive('table')) setActiveElementType('table');
        else if (editor.isActive('image')) setActiveElementType('image');
        else setActiveElementType('text');
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
        case 'save': manualSave(); break;
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

  const pageDimensions = useMemo(() => ({ width: 816, height: 1056 }), []); // Default Letter
  
  const addCustomStyle = useCallback((name: string) => {}, []);
  const applyCustomStyle = useCallback((style: CustomStyle) => {}, []);
  const applyAdvancedStyleCallback = useCallback((styles: React.CSSProperties) => applyAdvancedStyle(styles), []);
  const applyBlockStyleCallback = useCallback((styles: React.CSSProperties) => applyBlockStyle(styles), []);
  const setIsAIProcessing = useCallback((v: boolean) => setAiState(v ? 'thinking' : 'idle'), []);
  const registerContainer = useCallback((node: HTMLDivElement | null) => { containerRef.current = node; }, []);

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
    showCopilot,
    setShowCopilot,
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
    setIsKeyboardLocked,
    selectionMode,
    setSelectionMode,
    hasActiveSelection,
    selectionAction,
    setSelectionAction
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
    showCopilot,
    aiState,
    setIsAIProcessing,
    activeEditingArea,
    headerContent,
    footerContent,
    firstHeaderContent,
    firstFooterContent,
    isKeyboardLocked,
    selectionMode,
    hasActiveSelection,
    selectionAction
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
