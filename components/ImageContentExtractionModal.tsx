import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, Table as TableIcon, AlignLeft, Sparkles, X, Check, 
  Upload, Globe, RefreshCw, AlertCircle, Copy
} from 'lucide-react';
import { extractContentFromImage, ExtractedDocumentContent, ExtractionOptions } from '../utils/imageContentExtractor';

interface ImageContentExtractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertContent: (html: string) => void;
  initialMode?: 'auto' | 'document' | 'table' | 'text';
}

export const ImageContentExtractionModal: React.FC<ImageContentExtractionModalProps> = ({
  isOpen,
  onClose,
  onInsertContent,
  initialMode = 'document',
}) => {
  const [sourceType, setSourceType] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractionMode, setExtractionMode] = useState<'document' | 'table' | 'text'>(initialMode === 'auto' ? 'document' : initialMode);
  const [extractedData, setExtractedData] = useState<ExtractedDocumentContent | null>(null);
  const [editedHtml, setEditedHtml] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      if (!imagePreview && !imageUrl) {
        // Provide sample preview option if no image loaded yet
        setImageUrl('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop');
      }
    }
  }, [isOpen]);

  const handleProcessImage = async (source: File | string, mode: 'document' | 'table' | 'text') => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const options: ExtractionOptions = {
        mode,
        enhanceContrast: true,
      };

      const result = await extractContentFromImage(source, options);
      setExtractedData(result);
      setEditedHtml(result.html);
    } catch (err: unknown) {
      console.error('Image transcription error:', err);
      setErrorMessage('Could not process this image directly. Please try a different image or format.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setImagePreview(dataUrl);
        handleProcessImage(file, extractionMode);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    setImagePreview(imageUrl);
    handleProcessImage(imageUrl, extractionMode);
  };

  const handleModeChange = (newMode: 'document' | 'table' | 'text') => {
    setExtractionMode(newMode);
    const source = imagePreview || imageUrl;
    if (source) {
      handleProcessImage(source, newMode);
    }
  };

  const handleInsert = () => {
    if (editedHtml) {
      onInsertContent(editedHtml);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-[#ffffff] dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#f8fafc] dark:bg-[#1e293b]/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/60 dark:border-indigo-800/60">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Transcribe Picture to Editable Content
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Zero Raw Image
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Extracts text, headings, and tables into native editable document blocks without inserting image pixels.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Source Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSourceType('upload')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  sourceType === 'upload'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs border border-slate-300 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Upload size={14} /> Upload Picture
              </button>
              <button
                type="button"
                onClick={() => setSourceType('url')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  sourceType === 'url'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs border border-slate-300 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Globe size={14} /> Picture URL
              </button>
            </div>

            {/* Target Content Type Toggles */}
            <div className="flex items-center gap-1.5 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => handleModeChange('document')}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                  extractionMode === 'document'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <FileText size={13} /> Full Document
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('table')}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                  extractionMode === 'table'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <TableIcon size={13} /> Table
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('text')}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                  extractionMode === 'text'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <AlignLeft size={13} /> Plain Text
              </button>
            </div>
          </div>

          {/* Source Input Area */}
          {sourceType === 'upload' ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/10 transition-all flex flex-col items-center justify-center gap-2"
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Upload size={22} />
              </div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Click to browse picture file from your device
              </div>
              <p className="text-xs text-slate-500">
                Supports PNG, JPEG, WEBP, screenshots, documents, and paper scans
              </p>
            </div>
          ) : (
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/document-image.png"
                className="flex-1 px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={isProcessing}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-all disabled:opacity-50"
              >
                {isProcessing ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                Transcribe Picture
              </button>
            </form>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Extracted Content Preview & Editor */}
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500">
              <RefreshCw size={28} className="animate-spin text-indigo-600" />
              <p className="text-sm font-medium">Transcribing image text & analyzing table structures...</p>
              <span className="text-xs text-slate-400">Processing pixel luminance and document hierarchy</span>
            </div>
          ) : extractedData ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Transcribed Editable Content Preview
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                    {extractedData.wordCount} words
                  </span>
                  {extractedData.detectedTable && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold">
                      Table: {extractedData.detectedTable.rows} rows × {extractedData.detectedTable.cols} cols
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(extractedData.rawText);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                >
                  <Copy size={12} /> Copy Text
                </button>
              </div>

              {/* Rendered HTML Preview with White Paper Styling */}
              <div 
                className="p-6 bg-white border border-slate-200 dark:border-slate-700 rounded-xl max-h-[300px] overflow-y-auto shadow-inner text-slate-900 select-text"
                dangerouslySetInnerHTML={{ __html: editedHtml }}
              />

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <Check size={13} className="text-emerald-600" />
                <span>Inserting this will place native editable text/tables in your document. The raw image will not be inserted.</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#f8fafc] dark:bg-[#1e293b]/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleInsert}
            disabled={!editedHtml || isProcessing}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Check size={15} />
            Insert as Editable Content into Document
          </button>
        </div>
      </div>
    </div>
  );
};
