
import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle2, History, User, Tag, Activity } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';

export const InfoModal: React.FC = () => {
  const { 
    content, 
    documentTitle, 
    setDocumentTitle,
    wordCount, 
    lastModified, 
    creationDate,
    author,
    setAuthor,
    keywords,
    setKeywords,
    status,
    setStatus
  } = useEditor();

  const [localKeywords, setLocalKeywords] = useState(keywords.join(', '));

  useEffect(() => {
    setLocalKeywords(keywords.join(', '));
  }, [keywords]);

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalKeywords(e.target.value);
  };

  const handleKeywordsBlur = () => {
    const newKeywords = localKeywords.split(',').map(k => k.trim()).filter(k => k);
    setKeywords(newKeywords);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
      <div className="flex-1 space-y-3 md:space-y-4">
        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm flex items-start gap-4 group hover:border-blue-300 transition-colors">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-full shrink-0">
            <Shield size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm md:text-base">Protect Document</h3>
            <p className="text-xs text-slate-500 mt-1">Control what types of changes people can make to this document.</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm flex items-start gap-4 group hover:border-blue-300 transition-colors">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-full shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm md:text-base">Inspect Document</h3>
            <p className="text-xs text-slate-500 mt-1">Check for hidden properties or personal information.</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm flex items-start gap-4 group hover:border-blue-300 transition-colors">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-full shrink-0">
            <History size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm md:text-base">Version History</h3>
            <p className="text-xs text-slate-500 mt-1">View and restore previous versions.</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 bg-slate-50 p-5 md:p-6 rounded-lg border border-slate-200 h-fit">
        <h3 className="font-bold text-slate-700 mb-4 text-xs uppercase tracking-wider">Properties</h3>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500">Size</dt>
            <dd className="font-medium text-slate-800">{Math.ceil(content.length / 1024)} KB</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Words</dt>
            <dd className="font-medium text-slate-800">{wordCount}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-slate-500">Title</dt>
            <dd className="font-medium text-slate-800 truncate max-w-[120px]">
                <input 
                    type="text" 
                    value={documentTitle} 
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-right w-full"
                />
            </dd>
          </div>
          
          <div className="flex justify-between items-center">
             <dt className="text-slate-500">Status</dt>
             <dd className="font-medium text-slate-800">
                <input 
                    type="text" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none text-right w-full"
                    placeholder="Add status"
                />
             </dd>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <dt className="text-slate-500 text-xs mb-1">Last Modified</dt>
            <dd className="font-medium text-slate-800">{lastModified.toLocaleTimeString()} {lastModified.toLocaleDateString()}</dd>
          </div>
          <div className="pt-2">
            <dt className="text-slate-500 text-xs mb-1">Created</dt>
            <dd className="font-medium text-slate-800">{creationDate.toLocaleDateString()}</dd>
          </div>
          
          <div className="pt-4 border-t border-slate-200">
            <dt className="text-slate-500 text-xs mb-1">Author</dt>
            <dd className="font-medium text-slate-800 flex items-center mt-1">
              <User size={14} className="mr-1.5 text-slate-400"/> 
              <input 
                type="text" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)}
                className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none w-full"
              />
            </dd>
          </div>

          <div className="pt-2">
            <dt className="text-slate-500 text-xs mb-1">Keywords</dt>
            <dd className="font-medium text-slate-800 flex items-center mt-1">
              <Tag size={14} className="mr-1.5 text-slate-400"/> 
              <input 
                type="text" 
                value={localKeywords} 
                onChange={handleKeywordsChange}
                onBlur={handleKeywordsBlur}
                className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none w-full"
                placeholder="Add keywords..."
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
