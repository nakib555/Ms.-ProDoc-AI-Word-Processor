import React, { useState, useMemo } from 'react';
import { X, Search, FileText, Trash2, ArrowUpRight, HelpCircle } from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';

export const NotesSidebar: React.FC = () => {
  const { 
    footnotes, 
    endnotes, 
    showNotes, 
    setShowNotes, 
    updateFootnote, 
    updateEndnote, 
    removeFootnote, 
    removeEndnote 
  } = useEditor();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'footnotes' | 'endnotes'>('all');

  const filteredFootnotes = useMemo(() => {
    return footnotes.filter(f => 
      f.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [footnotes, searchQuery]);

  const filteredEndnotes = useMemo(() => {
    return endnotes.filter(e => 
      e.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [endnotes, searchQuery]);

  const handleJumpToNote = (noteId: string) => {
    const el = document.querySelector(`[data-note-id="${noteId}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('animate-bounce', 'ring-2', 'ring-indigo-500', 'bg-indigo-100', 'dark:bg-indigo-950');
      setTimeout(() => {
        el.classList.remove('animate-bounce', 'ring-2', 'ring-indigo-500', 'bg-indigo-100', 'dark:bg-indigo-950');
      }, 2000);
    }
  };

  if (!showNotes) return null;

  return (
    <div className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex flex-col h-full absolute right-0 top-0 bottom-0 z-50 shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <h2 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 text-sm uppercase tracking-wider">
          <FileText className="w-4 h-4 text-indigo-500" />
          Document Notes ({footnotes.length + endnotes.length})
        </h2>
        <button 
          onClick={() => setShowNotes(false)} 
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-900/50 p-1 gap-1">
        {(['all', 'footnotes', 'endnotes'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-xs py-1.5 rounded font-medium capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/30'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-800 shrink-0 relative flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-6" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes content..."
          className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-slate-200"
        />
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50/50 dark:bg-slate-950/20">
        {activeTab !== 'endnotes' && filteredFootnotes.length > 0 && (
          <div>
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 px-1">Footnotes</div>
            <div className="space-y-2">
              {filteredFootnotes.map((fn, idx) => (
                <div 
                  key={fn.id} 
                  className="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/50 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">
                      Footnote {idx + 1}
                    </span>
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleJumpToNote(fn.id)}
                        className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer"
                        title="Jump to Reference"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => removeFootnote(fn.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer"
                        title="Delete Footnote"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={fn.content}
                    onChange={(e) => updateFootnote(fn.id, e.target.value)}
                    rows={2}
                    className="w-full text-xs bg-transparent border-0 resize-none focus:ring-1 focus:ring-indigo-100 dark:focus:ring-indigo-950 p-1 rounded font-normal text-slate-600 dark:text-slate-300 outline-none"
                    placeholder="Enter footnote text..."
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab !== 'footnotes' && filteredEndnotes.length > 0 && (
          <div className={activeTab === 'all' && filteredFootnotes.length > 0 ? 'mt-4' : ''}>
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 px-1">Endnotes</div>
            <div className="space-y-2">
              {filteredEndnotes.map((en, idx) => (
                <div 
                  key={en.id} 
                  className="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/50 shadow-sm hover:border-emerald-200 dark:hover:border-emerald-900 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded uppercase">
                      Endnote {String.fromCharCode(idx + 97)}
                    </span>
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleJumpToNote(en.id)}
                        className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer"
                        title="Jump to Reference"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => removeEndnote(en.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer"
                        title="Delete Endnote"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={en.content}
                    onChange={(e) => updateEndnote(en.id, e.target.value)}
                    rows={2}
                    className="w-full text-xs bg-transparent border-0 resize-none focus:ring-1 focus:ring-emerald-100 dark:focus:ring-emerald-950 p-1 rounded font-normal text-slate-600 dark:text-slate-300 outline-none"
                    placeholder="Enter endnote text..."
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {((activeTab === 'all' && filteredFootnotes.length === 0 && filteredEndnotes.length === 0) ||
          (activeTab === 'footnotes' && filteredFootnotes.length === 0) ||
          (activeTab === 'endnotes' && filteredEndnotes.length === 0)) && (
          <div className="text-center py-12 flex flex-col items-center justify-center">
            <HelpCircle className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-xs text-slate-400 dark:text-slate-500">No matching notes found.</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 max-w-[200px] leading-relaxed">
              Insert notes using the References tab in the ribbon toolbar above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
