
import React, { useState } from 'react';
import { FileType, FileText, ChevronRight, FileDown, FileCode } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useFileTab } from '../FileTabContext';
import { generatePdfPrint } from '../../../../../utils/printUtils';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import TurndownService from 'turndown';

export const SaveAsModal: React.FC = () => {
  const { content, documentTitle, setDocumentTitle, pageConfig, headerContent, footerContent } = useEditor();
  const { closeModal } = useFileTab();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (type: 'html' | 'txt' | 'pdf' | 'md') => {
    if (type === 'pdf') {
        setIsExporting(true);
        await generatePdfPrint(content, pageConfig, headerContent, footerContent);
        setIsExporting(false);
        closeModal();
        return;
    }

    let data = content;
    let mime = 'text/html';
    let ext = 'html';

    if (type === 'html') {
      data = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${documentTitle}</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 1rem; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        img { max-width: 100%; height: auto; }
        blockquote { border-left: 4px solid #ccc; margin: 0; padding-left: 16px; color: #666; }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
    } else if (type === 'txt') {
      const temp = document.createElement('div');
      temp.innerHTML = content;
      data = temp.innerText;
      mime = 'text/plain';
      ext = 'txt';
    } else if (type === 'md') {
      const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
      data = turndownService.turndown(content);
      mime = 'text/markdown';
      ext = 'md';
    }

    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTitle}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    closeModal();
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto relative">
      {isExporting && (
          <div className="absolute inset-0 z-10 bg-white/80 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm">
              <LoadingSpinner className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium text-slate-600">Generating PDF...</span>
          </div>
      )}

      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">File Name</label>
        <input 
          type="text" 
          value={documentTitle} 
          onChange={(e) => setDocumentTitle(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Save as Type</label>
        
        <button onClick={() => handleExport('pdf')} className="w-full flex items-center p-3 bg-white border border-slate-200 hover:border-red-400 hover:ring-1 hover:ring-red-400 rounded-lg text-left transition-all group">
          <div className="p-2 bg-red-100 text-red-600 rounded-md mr-3 group-hover:bg-red-200 shrink-0">
            <FileDown size={20} />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-800">PDF Document (.pdf)</div>
            <div className="text-xs text-slate-500">Best for printing. Preserves layout and fonts.</div>
          </div>
          <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-red-500 shrink-0" />
        </button>

        <button onClick={() => handleExport('html')} className="w-full flex items-center p-3 bg-white border border-slate-200 hover:border-blue-400 hover:ring-1 hover:ring-blue-400 rounded-lg text-left transition-all group">
          <div className="p-2 bg-orange-100 text-orange-600 rounded-md mr-3 group-hover:bg-orange-200 shrink-0">
            <FileType size={20} />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-800">Web Page (.html)</div>
            <div className="text-xs text-slate-500">Preserves formatting for web browsers.</div>
          </div>
          <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-blue-500 shrink-0" />
        </button>

        <button onClick={() => handleExport('txt')} className="w-full flex items-center p-3 bg-white border border-slate-200 hover:border-blue-400 hover:ring-1 hover:ring-blue-400 rounded-lg text-left transition-all group">
          <div className="p-2 bg-slate-100 text-slate-600 rounded-md mr-3 group-hover:bg-slate-200 shrink-0">
            <FileText size={20} />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-800">Plain Text (.txt)</div>
            <div className="text-xs text-slate-500">No formatting, just text content.</div>
          </div>
          <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-blue-500 shrink-0" />
        </button>

        <button onClick={() => handleExport('md')} className="w-full flex items-center p-3 bg-white border border-slate-200 hover:border-purple-400 hover:ring-1 hover:ring-purple-400 rounded-lg text-left transition-all group">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-md mr-3 group-hover:bg-purple-200 shrink-0">
            <FileCode size={20} />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-800">Markdown (.md)</div>
            <div className="text-xs text-slate-500">Lightweight markup language formatting.</div>
          </div>
          <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-purple-500 shrink-0" />
        </button>
      </div>
    </div>
  );
};
