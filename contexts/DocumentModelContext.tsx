import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  JSONDocumentModel, 
  prosemirrorNodeToJSONDocument, 
  computeDocumentState,
  DocumentStats,
  OutlineItem,
  ValidationItem,
  runParsingInWorker,
  computeLiveStats,
  computeComplexityScore
} from '../utils/documentModel';
import { useEditor } from './EditorContext';

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  blockIndex?: number;
}

export interface DocumentModelContextType {
  documentModel: JSONDocumentModel | null;
  docVersion: number;
  stats: DocumentStats | null;
  outline: OutlineItem[];
  validation: ValidationItem[];
  isDirty: boolean;
  lastSaved: string | null;
  comments: Comment[];
  isProcessingWorker: boolean;
  addComment: (text: string, blockIndex?: number) => void;
  removeComment: (id: string) => void;
  saveDocument: () => void;
  setUseWorker: (useWorker: boolean) => void;
  useWorker: boolean;
  complexityScore: number;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'comment-1',
    text: 'Consider adding a cover page for a professional document layout.',
    author: 'AI Reviewer',
    createdAt: '2026-07-03T07:36:00.000Z'
  }
];

const DocumentModelContext = createContext<DocumentModelContextType | undefined>(undefined);

export const DocumentModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { editor, documentTitle, pageConfig, lastModified, creationDate } = useEditor();
  
  const [documentModel, setDocumentModel] = useState<JSONDocumentModel | null>(null);
  const [docVersion, setDocVersion] = useState(0);
  const [stats, setStats] = useState<DocumentStats | null>(null);
  const [outline, setOutline] = useState<OutlineItem[]>([]);
  const [validation, setValidation] = useState<ValidationItem[]>([]);
  const [complexityScore, setComplexityScore] = useState(0);
  
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [useWorker, setUseWorker] = useState(false);
  const [isProcessingWorker, setIsProcessingWorker] = useState(false);
  
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);

  const addComment = useCallback((text: string, blockIndex?: number) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      text,
      author: 'User',
      createdAt: new Date().toISOString(),
      blockIndex
    };
    setComments(prev => [newComment, ...prev]);
  }, []);

  const removeComment = useCallback((id: string) => {
    setComments(prev => prev.filter(c => c.id !== id));
  }, []);

  const saveDocument = useCallback(() => {
    setIsDirty(false);
    setLastSaved(new Date().toISOString());
  }, []);

  // Debounced Effect: Calculate heavy analysis (deferred stats, validation diagnostics, outline tree, and complexity score)
  // after 600ms of typing silence to ensure typing remains perfectly responsive and butter-smooth.
  useEffect(() => {
    if (!documentModel) return;

    const timer = setTimeout(() => {
      const state = computeDocumentState(documentModel);
      const score = computeComplexityScore(documentModel);
      
      setStats(prev => ({
        ...state.stats,
        // Ensure live-computed values are preserved
        wordCount: prev?.wordCount ?? state.stats.wordCount,
        charCount: prev?.charCount ?? state.stats.charCount,
        paragraphCount: prev?.paragraphCount ?? state.stats.paragraphCount,
      }));
      setOutline(state.outline);
      setValidation(state.validation);
      setComplexityScore(score);
    }, 600);

    return () => clearTimeout(timer);
  }, [documentModel]);

  const generateModelFromProseMirror = useCallback((docNode: any) => {
    if (!docNode) return;
    
    if (useWorker) {
      setIsProcessingWorker(true);
      // To offload heavy parsing to Web Worker, we pass serializable Tiptap JSON.
      // This establishes our robust asynchronous background worker pipeline.
      const json = editor ? editor.getJSON() : docNode.toJSON();
      runParsingInWorker(json, documentTitle, pageConfig)
        .then((parsedModel) => {
          setDocumentModel(parsedModel);
          
          // Compute synchronous live statistics immediately for instant feedback
          const live = computeLiveStats(parsedModel);
          setStats(prev => ({
            wordCount: live.wordCount,
            charCount: live.charCount,
            paragraphCount: live.paragraphCount,
            headingCount: prev?.headingCount ?? 0,
            tableCount: prev?.tableCount ?? 0,
            imageCount: prev?.imageCount ?? 0,
            equationCount: prev?.equationCount ?? 0,
            pageCount: prev?.pageCount ?? 1,
            readTime: prev?.readTime ?? 1,
          }));
          
          setDocVersion(v => v + 1);
          setIsDirty(true);
        })
        .catch((err) => {
          console.error("Web Worker parsing failed, falling back to main thread:", err);
          // Fallback to main thread
          const fallbackModel = prosemirrorNodeToJSONDocument(docNode, documentTitle, pageConfig, lastModified, creationDate);
          setDocumentModel(fallbackModel);
          
          const live = computeLiveStats(fallbackModel);
          setStats(prev => ({
            wordCount: live.wordCount,
            charCount: live.charCount,
            paragraphCount: live.paragraphCount,
            headingCount: prev?.headingCount ?? 0,
            tableCount: prev?.tableCount ?? 0,
            imageCount: prev?.imageCount ?? 0,
            equationCount: prev?.equationCount ?? 0,
            pageCount: prev?.pageCount ?? 1,
            readTime: prev?.readTime ?? 1,
          }));
          
          setDocVersion(v => v + 1);
        })
        .finally(() => {
          setIsProcessingWorker(false);
        });
      return;
    }

    // Direct, ultra high-performance parsed model creation using immutability-aware WeakMap caching
    const model = prosemirrorNodeToJSONDocument(docNode, documentTitle, pageConfig, lastModified, creationDate);
    setDocumentModel(model);
    
    // Compute lightweight live statistics synchronously for 0ms visual latency
    const live = computeLiveStats(model);
    setStats(prev => ({
      wordCount: live.wordCount,
      charCount: live.charCount,
      paragraphCount: live.paragraphCount,
      headingCount: prev?.headingCount ?? 0,
      tableCount: prev?.tableCount ?? 0,
      imageCount: prev?.imageCount ?? 0,
      equationCount: prev?.equationCount ?? 0,
      pageCount: prev?.pageCount ?? 1,
      readTime: prev?.readTime ?? 1,
    }));
    
    setDocVersion(v => v + 1);
    setIsDirty(true);
  }, [editor, documentTitle, pageConfig, lastModified, creationDate, useWorker]);

  useEffect(() => {
    if (!editor) return;

    // Generate initial model from the loaded editor's document state asynchronously
    // to avoid triggering cascading synchronous renders in an effect.
    const initTimeout = setTimeout(() => {
      generateModelFromProseMirror(editor.state.doc);
    }, 0);

    // Listen to editor transactions for real-time document updates.
    // Instead of rebuilding the entire tree on every transaction, we pass the direct
    // ProseMirror document node to exploit immutability references.
    const handleTransaction = ({ transaction }: any) => {
      if (transaction.docChanged) {
        generateModelFromProseMirror(transaction.doc);
      }
    };

    editor.on('transaction', handleTransaction);

    return () => {
      clearTimeout(initTimeout);
      editor.off('transaction', handleTransaction);
    };
  }, [editor, generateModelFromProseMirror]);

  const value = useMemo(() => ({
    documentModel,
    docVersion,
    stats,
    outline,
    validation,
    isDirty,
    lastSaved,
    comments,
    isProcessingWorker,
    addComment,
    removeComment,
    saveDocument,
    setUseWorker,
    useWorker,
    complexityScore
  }), [
    documentModel,
    docVersion,
    stats,
    outline,
    validation,
    isDirty,
    lastSaved,
    comments,
    isProcessingWorker,
    addComment,
    removeComment,
    saveDocument,
    setUseWorker,
    useWorker,
    complexityScore
  ]);

  return (
    <DocumentModelContext.Provider value={value}>
      {children}
    </DocumentModelContext.Provider>
  );
};

export const useDocumentModel = () => {
  const context = useContext(DocumentModelContext);
  if (!context) {
    throw new Error('useDocumentModel must be used within a DocumentModelProvider');
  }
  return context;
};
