import React, { useRef, useState, useEffect } from 'react';
import { FolderOpen, FileText, Loader2, Trash2, Clock, Database } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useFileTab } from '../FileTabContext';

export const OpenModal: React.FC = () => {
  const { setContent, setDocumentTitle, importFile, importState } = useEditor();
  const { closeModal } = useFileTab();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [recentDocs, setRecentDocs] = useState<any[]>([]);

  // Load and seed recent documents on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recent_documents');
      if (stored) {
        setRecentDocs(JSON.parse(stored));
      } else {
        // Seed default items for a premium out-of-the-box experience
        const defaultDocs = [
          { name: 'Quarterly Report', path: 'Local Storage', date: 'Just Now', type: 'html' },
          { name: 'Meeting Notes', path: 'Local Storage', date: 'Yesterday', type: 'txt' }
        ];
        
        const savedDocs = JSON.parse(localStorage.getItem('saved_documents') || '{}');
        if (!savedDocs['Quarterly Report']) {
          savedDocs['Quarterly Report'] = {
            content: `<h1>Quarterly Report</h1><p>Welcome to your <strong>Quarterly Report</strong>. This document was generated automatically to showcase your offline storage capability.</p><table style="width:100%; border-collapse:collapse; margin:12pt 0;"><tr style="background-color: #f1f5f9;"><th style="border: 1px solid #cbd5e1; padding: 6px 10px;">Quarter</th><th style="border: 1px solid #cbd5e1; padding: 6px 10px;">Performance</th></tr><tr><td style="border: 1px solid #cbd5e1; padding: 6px 10px;">Q1</td><td style="border: 1px solid #cbd5e1; padding: 6px 10px;">Excellent (+12%)</td></tr><tr><td style="border: 1px solid #cbd5e1; padding: 6px 10px;">Q2</td><td style="border: 1px solid #cbd5e1; padding: 6px 10px;">Strong (+8%)</td></tr></table><p>Feel free to edit this report or import your own documents!</p>`,
            lastModified: new Date().toISOString()
          };
        }
        if (!savedDocs['Meeting Notes']) {
          savedDocs['Meeting Notes'] = {
            content: `<h3>Meeting Notes</h3><p>- Discussed Q3 product strategy.</p><p>- Aligned on marketing targets.</p><p>- Next steps: finalize implementation details and test local persistence.</p>`,
            lastModified: new Date().toISOString()
          };
        }
        
        localStorage.setItem('saved_documents', JSON.stringify(savedDocs));
        localStorage.setItem('recent_documents', JSON.stringify(defaultDocs));
        setRecentDocs(defaultDocs);
      }
    } catch (e) {
      console.error('Failed to load recent documents:', e);
    }
  }, []);

  const handleOpenFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Close modal first so the user sees the global sleek import progress loader overlay!
    closeModal();

    // Start import process
    await importFile(file);

    // Reset input value so the same file can be selected again
    e.target.value = '';
  };

  const handleOpenDoc = (name: string) => {
    try {
      const savedDocs = JSON.parse(localStorage.getItem('saved_documents') || '{}');
      const doc = savedDocs[name];
      if (doc) {
        setContent(doc.content);
        setDocumentTitle(name);
        closeModal();
      } else {
        alert("Could not load the selected document.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDoc = (name: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering open
    try {
      const updatedRecents = recentDocs.filter(doc => doc.name !== name);
      setRecentDocs(updatedRecents);
      localStorage.setItem('recent_documents', JSON.stringify(updatedRecents));
      
      const savedDocs = JSON.parse(localStorage.getItem('saved_documents') || '{}');
      delete savedDocs[name];
      localStorage.setItem('saved_documents', JSON.stringify(savedDocs));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <div 
         className="bg-slate-50 p-6 md:p-8 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer group" 
         onClick={() => fileInputRef.current?.click()}
      >
        <FolderOpen size={40} className="text-slate-400 group-hover:text-blue-500 mb-3 transition-colors" strokeWidth={1.5} />
        <h3 className="text-base font-semibold text-slate-700 group-hover:text-blue-700">Browse Files</h3>
        <p className="text-slate-500 text-xs mt-1 text-center">Support for .docx, .txt, .html, .md</p>
        <input 
           type="file" 
           ref={fileInputRef} 
           className="hidden" 
           accept=".docx,.txt,.html,.md" 
           onChange={handleOpenFile} 
        />
      </div>

      {/* Recent documents list */}
      {recentDocs.length > 0 && (
        <div className="pt-2">
          <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Clock size={14} className="text-slate-400" />
            Recent Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recentDocs.map((doc, i) => (
              <div 
                key={i} 
                onClick={() => handleOpenDoc(doc.name)}
                className="p-3 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl cursor-pointer flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-slate-100 group-hover:bg-blue-100 rounded-lg text-slate-500 group-hover:text-blue-600 transition-colors shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-800 truncate">{doc.name}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                        <Database size={10} />
                        {doc.path}
                      </span>
                      <span className="text-slate-300 text-[10px]">•</span>
                      <span className="text-[10px] text-slate-400">{doc.date}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => handleDeleteDoc(doc.name, e)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove from recents"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
