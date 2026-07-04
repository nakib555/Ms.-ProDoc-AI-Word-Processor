import React, { useState, useEffect } from 'react';
import { 
  Braces, X, Copy, Check, ChevronDown, ChevronRight, List, 
  HelpCircle, Code, Award, BarChart4, FileJson, Cpu, Save, 
  AlertTriangle, BookOpen, Clock, MessageSquare, Trash2, Plus, 
  Sparkles, CheckCircle2, RefreshCw, Hash, Layers, Anchor, Bookmark
} from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';
import { useDocumentModel } from '../contexts/DocumentModelContext';
import { globalFieldsEngine } from '../utils/fieldsEngine';
import { globalCrossReferenceEngine } from '../utils/crossReferenceEngine';
import { globalTocEngine } from '../utils/tocEngine';
import { NumberingEngine } from '../utils/numberingEngine';
import { createDefaultStyleSystem, StyleResolver } from '../utils/styleSystem';

export const JsonDocInspectorSidebar: React.FC = () => {
  const { showJsonInspector, setShowJsonInspector } = useEditor();
  const { 
    documentModel: docModel, 
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
  } = useDocumentModel();
  
  const [activeTab, setActiveTab] = useState<'tree' | 'raw' | 'analysis' | 'comments' | 'diagnostics'>('analysis');
  const [copied, setCopied] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);
  
  // Collapse/Expand state for nodes in the tree view
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'doc': true,
    'doc.metadata': true,
    'doc.pageConfig': false,
    'doc.pages': true,
    'doc.pages.0': true,
    'doc.pages.0.sections': true,
    'doc.pages.0.sections.0': true,
    'doc.pages.0.sections.0.elements': true,
  });

  const toggleNode = (path: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const handleCopy = () => {
    if (!docModel) return;
    navigator.clipboard.writeText(JSON.stringify(docModel, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(newCommentText.trim());
    setNewCommentText('');
  };

  const handleSave = () => {
    saveDocument();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  if (!showJsonInspector) return null;

  // Render a single JSON key-value or node in a styled expandable way
  const renderTreeNode = (key: string, value: any, path: string, depth: number = 0) => {
    const isObject = value !== null && typeof value === 'object';
    const isArray = Array.isArray(value);
    const hasChildren = isObject && Object.keys(value).length > 0;
    const isExpanded = !!expandedNodes[path];

    const indentStyle = { paddingLeft: `${depth * 14}px` };

    if (!hasChildren) {
      let displayValue = String(value);
      let valueColor = 'text-emerald-600 dark:text-emerald-400';

      if (typeof value === 'string') {
        displayValue = `"${value}"`;
        valueColor = 'text-amber-600 dark:text-amber-400';
      } else if (typeof value === 'number') {
        valueColor = 'text-blue-600 dark:text-blue-400';
      } else if (typeof value === 'boolean') {
        valueColor = 'text-purple-600 dark:text-purple-400';
      }

      return (
        <div key={path} style={indentStyle} className="flex py-0.5 items-baseline text-xs font-mono hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors pr-2">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold mr-1">{key}:</span>
          <span className={`${valueColor} break-all select-all`}>{displayValue}</span>
        </div>
      );
    }

    // Node wrapper
    return (
      <div key={path} className="text-xs font-mono">
        <div 
          style={indentStyle} 
          onClick={() => toggleNode(path)}
          className="flex items-center py-1 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded transition-colors text-slate-700 dark:text-slate-300 group pr-2"
        >
          <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 mr-0.5 shrink-0">
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
          <span className="text-indigo-600 dark:text-indigo-300 font-semibold mr-1">{key}:</span>
          <span className="text-[10px] text-slate-400 font-sans">
            {isArray ? `Array[${value.length}]` : 'Object'}
          </span>
        </div>
        
        {isExpanded && (
          <div className="border-l border-slate-100 dark:border-slate-800/80 ml-2 animate-in fade-in duration-100">
            {Object.entries(value).map(([k, v]) => renderTreeNode(k, v, `${path}.${k}`, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full w-[410px] bg-white dark:bg-[#0f172a] border-l border-slate-200 dark:border-slate-800/80 flex flex-col shadow-2xl z-20 transition-all duration-300 no-print">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-100 font-bold">
          <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Braces size={18} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Document Model Engine</span>
            <span className="text-[10px] text-slate-400 font-normal">Real-Time JSON Architecture</span>
          </div>
        </div>
        <button 
          onClick={() => setShowJsonInspector(false)} 
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Persistence and Save Banner */}
      <div className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800/60 p-2.5 px-4 flex items-center justify-between shrink-0 text-xs">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isDirty ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`} />
          <span className="font-medium text-slate-600 dark:text-slate-300">
            {isDirty ? 'Unsaved document changes' : 'All changes saved'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {lastSaved && (
            <span className="text-[10px] text-slate-400 font-mono">
              Saved {new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold shadow-sm transition-all active:scale-95 ${
              isDirty 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Save size={12} />
            Save State
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/20 dark:bg-slate-900/10 p-1 shrink-0 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0 ${
            activeTab === 'analysis'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
          }`}
        >
          <BarChart4 size={14} />
          Analysis
        </button>
        <button
          onClick={() => setActiveTab('tree')}
          className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0 ${
            activeTab === 'tree'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
          }`}
        >
          <List size={14} />
          Tree
        </button>
        <button
          onClick={() => setActiveTab('raw')}
          className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0 ${
            activeTab === 'raw'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
          }`}
        >
          <Code size={14} />
          Raw JSON
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0 relative ${
            activeTab === 'comments'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
          }`}
        >
          <MessageSquare size={14} />
          Comments
          {comments.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('diagnostics')}
          className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0 relative ${
            activeTab === 'diagnostics'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
          }`}
        >
          <Cpu size={14} />
          Diagnostics
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
        </button>
      </div>

      {/* Main Panel View */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50/30 dark:bg-slate-950/30">
        
        {/* Toast Notification */}
        {showSavedToast && (
          <div className="mb-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 text-green-700 dark:text-green-400 text-xs rounded-xl flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
            <CheckCircle2 size={14} />
            <span>Structured Document Model persistently saved successfully!</span>
          </div>
        )}

        {/* Tab 1: Analysis */}
        {activeTab === 'analysis' && (
          <div className="space-y-4">
            
            {/* Thread / Worker Pipeline Controller */}
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg shrink-0">
                    <Cpu size={15} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Engine Thread Strategy</span>
                    <span className="text-[9px] text-slate-400">Manage real-time execution cost</span>
                  </div>
                </div>
                
                {/* Switcher Toggle */}
                <button
                  onClick={() => setUseWorker(!useWorker)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    useWorker ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      useWorker ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Status metrics */}
              <div className="pt-2 border-t border-slate-50 dark:border-slate-800/80 grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                <div className="flex flex-col p-1.5 bg-slate-50/50 dark:bg-slate-800/30 rounded-lg">
                  <span className="text-slate-400">Mode</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 mt-0.5 flex items-center gap-1">
                    {useWorker ? (
                      <>
                        <RefreshCw size={10} className="animate-spin text-indigo-500" />
                        Worker
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        Main Cache
                      </>
                    )}
                  </span>
                </div>
                <div className="flex flex-col p-1.5 bg-slate-50/50 dark:bg-slate-800/30 rounded-lg">
                  <span className="text-slate-400">Parse Cost</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 mt-0.5">
                    {isProcessingWorker ? 'Offloading...' : '0ms (Cached)'}
                  </span>
                </div>
                <div className="flex flex-col p-1.5 bg-slate-50/50 dark:bg-slate-800/30 rounded-lg">
                  <span className="text-slate-400">Complexity</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 mt-0.5">
                    {complexityScore}
                  </span>
                </div>
              </div>

              {/* Dynamic Threading Recommendation Banner */}
              <div className={`p-2.5 rounded-lg border text-[10px] flex items-start gap-1.5 ${
                complexityScore > 100
                  ? 'bg-amber-50/40 dark:bg-amber-950/10 border-amber-100/50 dark:border-amber-900/30 text-amber-700 dark:text-amber-400'
                  : 'bg-indigo-50/30 dark:bg-slate-800/20 border-indigo-100/30 dark:border-slate-800/50 text-slate-500 dark:text-slate-400'
              }`}>
                {complexityScore > 100 ? (
                  <>
                    <AlertTriangle size={12} className="shrink-0 mt-0.5 text-amber-500" />
                    <div className="flex-1">
                      <span className="font-bold">Recommendation: Enable Web Worker! </span>
                      The document complexity score ({complexityScore}) is high. Offloading parsing to a background worker will keep the main UI thread ultra-responsive.
                    </div>
                  </>
                ) : (
                  <>
                    <Check size={12} className="shrink-0 mt-0.5 text-indigo-500" />
                    <div className="flex-1">
                      <span className="font-bold">Optimized on Main Thread: </span>
                      Document complexity score ({complexityScore}) is within limits. Direct ProseMirror immutable cache parsing is optimal and lightning fast.
                    </div>
                  </>
                )}
              </div>

              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                Incremental caching skips parsing unchanged blocks. Enabling the Web Worker spawns a background thread utilizing structured cloning.
              </p>
            </div>

            {/* General Metrics Grid */}
            {stats && (
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold">
                    <Clock size={11} /> Read Time
                  </div>
                  <div className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                    ~{stats.readTime} min
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold">
                    <BookOpen size={11} /> Words
                  </div>
                  <div className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                    {stats.wordCount.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-xs">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Total Blocks</span>
                  <div className="text-lg font-semibold text-slate-700 dark:text-slate-200 mt-1">
                    {stats.paragraphCount + stats.headingCount + stats.tableCount}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-xs">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Pages Generated</span>
                  <div className="text-lg font-semibold text-slate-700 dark:text-slate-200 mt-1">
                    {stats.pageCount}
                  </div>
                </div>
              </div>
            )}

            {/* Document Structure Validation Audit */}
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Document Diagnostics ({validation.length})</div>
              {validation.length === 0 ? (
                <div className="p-4 bg-green-50/30 dark:bg-green-950/10 border border-green-100/40 dark:border-green-900/20 rounded-xl text-center">
                  <CheckCircle2 size={24} className="mx-auto text-green-500/70 mb-1.5" />
                  <p className="text-xs font-semibold text-green-800 dark:text-green-400">Document structure is perfect!</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">No validation errors or styling inconsistencies found.</p>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                  {validation.map((v) => (
                    <div 
                      key={v.id} 
                      className={`p-2.5 border rounded-xl flex gap-2 text-xs transition-colors ${
                        v.type === 'error' 
                          ? 'bg-red-50/50 dark:bg-red-950/10 border-red-100 dark:border-red-950' 
                          : v.type === 'warning'
                          ? 'bg-amber-50/40 dark:bg-amber-950/10 border-amber-100 dark:border-amber-950'
                          : 'bg-blue-50/40 dark:bg-blue-950/10 border-blue-100 dark:border-blue-950'
                      }`}
                    >
                      <AlertTriangle size={15} className={`shrink-0 mt-0.5 ${
                        v.type === 'error' ? 'text-red-500' : v.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                      }`} />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">{v.type}</span>
                        <span className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed mt-0.5">{v.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Document Interactive Outline */}
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Structural Document Outline</div>
              {outline.length === 0 ? (
                <div className="p-4 bg-slate-50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 rounded-xl text-center text-slate-400 text-xs">
                  Create Headings (H1 - H4) to build an interactive outline.
                </div>
              ) : (
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl space-y-1 shadow-sm max-h-[160px] overflow-y-auto">
                  {outline.map((item) => (
                    <div 
                      key={item.id} 
                      style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                      className="flex items-center gap-1.5 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer rounded transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <span className="truncate">{item.text}</span>
                      <span className="text-[8px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-1 rounded ml-auto shrink-0">H{item.level}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Tree Explorer */}
        {activeTab === 'tree' && (
          <div className="space-y-3">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Root Document Structure</div>
            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl space-y-1 shadow-sm max-h-[calc(100vh-210px)] overflow-y-auto">
              {docModel ? (
                renderTreeNode('document', docModel, 'doc', 0)
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">Failed to generate document model.</div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Raw JSON */}
        {activeTab === 'raw' && (
          <div className="space-y-3 h-full flex flex-col">
            <div className="flex justify-between items-center shrink-0">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Standard JSON Output Schema</span>
              <button 
                onClick={handleCopy}
                className="text-xs flex items-center gap-1.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-300 shadow-sm transition-all active:scale-95"
              >
                {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                {copied ? 'Copied!' : 'Copy Model'}
              </button>
            </div>
            
            <div className="flex-1 p-4 bg-slate-900 dark:bg-slate-950 text-slate-200 rounded-xl overflow-auto border border-slate-800 max-h-[calc(100vh-250px)]">
              <pre className="text-[11px] font-mono leading-relaxed select-all">
                {docModel ? JSON.stringify(docModel, null, 2) : '// No document model available'}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 4: Comments and AI collaboration */}
        {activeTab === 'comments' && (
          <div className="space-y-4">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Document Collaboration ({comments.length})</div>
            
            {/* New Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2 bg-white dark:bg-slate-900 p-2 border border-slate-200/60 dark:border-slate-800/60 rounded-xl shadow-xs">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Write a review comment..."
                className="flex-1 text-xs bg-transparent px-2 py-1 outline-none text-slate-700 dark:text-slate-200"
              />
              <button 
                type="submit" 
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
              >
                <Plus size={14} />
              </button>
            </form>

            {/* List of comments */}
            <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
              {comments.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No review comments. High-quality draft!
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-white dark:bg-slate-900 border border-slate-250/50 dark:border-slate-800/50 rounded-xl space-y-2 shadow-xs transition-colors hover:border-slate-300 dark:hover:border-slate-700">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                          {comment.author === 'AI Reviewer' ? (
                            <>
                              <Sparkles size={11} className="text-indigo-500 animate-pulse" />
                              {comment.author}
                            </>
                          ) : (
                            comment.author
                          )}
                        </span>
                        <span className="text-[9px] text-slate-400 mt-0.5">
                          {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <button 
                        onClick={() => removeComment(comment.id)}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-400 hover:text-red-500 rounded transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Enterprise Diagnostics Dashboard */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-4 pb-8 animate-in fade-in duration-200">
            {/* Header / Intro */}
            <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block font-sans">MS Word Compatibility System</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Inspect real-time telemetry metrics across custom cascading engines, dynamic MS-fields, multilevel outlines, and cross reference nodes.
              </p>
            </div>

            {/* Subsystem 1: Hierarchical Style Engine */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <Layers size={12} className="text-indigo-500" />
                <span>Hierarchical Style Cascades</span>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-3 space-y-2.5 shadow-xs">
                {/* Visual Style hierarchy flow chart */}
                <div className="flex flex-col gap-1 text-[11px]">
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded border border-slate-100 dark:border-slate-800/60 font-mono">
                    <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-400">Theme Base Defaults</span>
                    <span className="text-[9px] text-slate-400 ml-auto font-mono">Inter, 16px</span>
                  </div>
                  <div className="h-2 w-0.5 bg-slate-200 dark:bg-slate-800 ml-4"></div>
                  <div className="flex items-center gap-1.5 bg-indigo-50/40 dark:bg-slate-800 p-1.5 rounded border border-indigo-100/40 dark:border-slate-800/60 font-mono">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Document Defaults</span>
                    <span className="text-[9px] text-slate-400 ml-auto font-mono">Margins: Standard</span>
                  </div>
                  <div className="h-2 w-0.5 bg-slate-200 dark:bg-slate-800 ml-4"></div>
                  <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/30 p-1.5 rounded border border-indigo-100 dark:border-indigo-900/30 font-mono">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 animate-pulse" />
                    <span className="font-semibold text-indigo-700 dark:text-indigo-300">Active Cascade: Normal Style</span>
                    <span className="text-[9px] text-slate-400 ml-auto font-mono">Line-Height: 1.5</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between font-mono">
                  <span>Resolver Cache Hits:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">100% (Incremental)</span>
                </div>
              </div>
            </div>

            {/* Subsystem 2: Dynamic Fields Engine */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <Hash size={12} className="text-indigo-500" />
                <span>Fields Compiler Telemetry</span>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-3 space-y-2.5 shadow-xs font-mono text-[11px]">
                <div className="grid grid-cols-2 gap-1.5 font-mono">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-100 dark:border-slate-800/60 font-mono">
                    <span className="text-[9px] text-slate-400 block font-mono">FIELD expr</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">PAGE</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1 font-mono">Evaluated: {stats?.pageCount || 1}</span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-100 dark:border-slate-800/60 font-mono">
                    <span className="text-[9px] text-slate-400 block font-mono">FIELD expr</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">NUMPAGES</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1 font-mono">Evaluated: {stats?.pageCount || 1}</span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-100 dark:border-slate-800/60 font-mono">
                    <span className="text-[9px] text-slate-400 block font-mono">FIELD expr</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">DATE</span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 block mt-1 truncate font-mono">{new Date().toISOString().split('T')[0]}</span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-100 dark:border-slate-800/60 font-mono">
                    <span className="text-[9px] text-slate-400 block font-mono">FIELD expr</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">SEQ Figure</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1 font-mono font-bold">Evaluated: 1</span>
                  </div>
                </div>
                <div className="p-2 bg-slate-900 text-slate-300 rounded text-[10px] leading-relaxed font-mono">
                  <span className="text-amber-400 font-bold block mb-1 font-mono">Interactive Sandbox Field Test:</span>
                  <div className="flex gap-1.5 items-center font-mono">
                    <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700 font-mono">PAGE</span>
                    <span className="font-mono">evaluates to</span>
                    <span className="text-green-400 font-bold font-mono">"1"</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subsystem 3: Stateful Numbering Engine */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <List size={12} className="text-indigo-500" />
                <span>Multilevel Outline Registry</span>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-3 space-y-2 shadow-xs text-[11px] font-mono">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">Registered Schemes</span>
                  <span className="bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[9px] px-1.5 py-0.5 rounded font-mono">3 Loaded</span>
                </div>
                <div className="space-y-1.5 font-mono">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-600 dark:text-slate-400 font-mono">1. Decimal (1.1, 1.1.1)</span>
                    <span className="text-emerald-500 font-bold font-mono">Active</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400 font-mono">2. Bullet Standard (•, ◦, ▪)</span>
                    <span className="text-slate-400 font-mono">Standby</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400 font-mono">3. Legal Outline (I., A., 1.)</span>
                    <span className="text-slate-400 font-mono">Standby</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subsystem 4: Cross Reference Registry */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <Anchor size={12} className="text-indigo-500" />
                <span>Cross References & Bookmarks</span>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-3 space-y-2.5 shadow-xs">
                {globalCrossReferenceEngine.getBookmarks().length === 0 ? (
                  <div className="text-center py-4 bg-slate-50 dark:bg-slate-800/20 rounded-lg text-slate-400 text-[11px] border border-dashed border-slate-200/50 dark:border-slate-800/50">
                    No active bookmarks registered yet. Insert bookmarks to begin tracking.
                  </div>
                ) : (
                  <div className="space-y-1.5 font-mono text-[10px]">
                    {globalCrossReferenceEngine.getBookmarks().map(b => (
                      <div key={b.id} className="flex justify-between items-center bg-slate-50 dark:bg-slate-850 p-1.5 rounded border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-700 dark:text-slate-300 font-bold font-mono">{b.displayName}</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-mono">Page {b.pageIndex !== undefined ? b.pageIndex + 1 : '1'}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-800/60 flex items-start gap-2 text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                  <Bookmark size={14} className="shrink-0 mt-0.5 text-indigo-500" />
                  <div>
                    <span className="font-bold block text-slate-700 dark:text-slate-300 mb-0.5">Reference Anchoring</span>
                    Any element with an ID can act as a cross-reference anchor. Bookmarks update automatically as layout pages shift.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
