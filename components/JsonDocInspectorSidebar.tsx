import React, { useState, useEffect, useMemo } from 'react';
import { Braces, X, Copy, Check, ChevronDown, ChevronRight, List, HelpCircle, Code, Award, BarChart4, FileJson } from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';
import { htmlToJSONDocument } from '../utils/documentModel';

export const JsonDocInspectorSidebar: React.FC = () => {
  const { showJsonInspector, setShowJsonInspector, content, documentTitle, pageConfig } = useEditor();
  const [activeTab, setActiveTab] = useState<'tree' | 'raw' | 'stats'>('tree');
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
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

  // Compute the live JSON document model on content or config change
  const docModel = useMemo(() => {
    try {
      return htmlToJSONDocument(content, documentTitle, pageConfig);
    } catch (e) {
      console.error("Failed to parse document to model:", e);
      return null;
    }
  }, [content, documentTitle, pageConfig]);

  const handleCopy = () => {
    if (!docModel) return;
    navigator.clipboard.writeText(JSON.stringify(docModel, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!showJsonInspector) return null;

  // Generate some summary stats from the model
  const stats = (() => {
    if (!docModel) return { pages: 0, sections: 0, paragraphs: 0, headings: 0, textRuns: 0, tables: 0, images: 0, equations: 0 };
    let sections = 0;
    let paragraphs = 0;
    let headings = 0;
    let textRuns = 0;
    let tables = 0;
    let images = 0;
    let equations = 0;

    docModel.pages.forEach(page => {
      sections += page.sections.length;
      page.sections.forEach(sec => {
        sec.elements.forEach(el => {
          if (el.type === 'paragraph') {
            paragraphs++;
            el.children.forEach(c => {
              if (c.type === 'text') textRuns++;
              if (c.type === 'image') images++;
              if (c.type === 'equation') equations++;
            });
          } else if (el.type === 'heading') {
            headings++;
            textRuns += el.children.length;
          } else if (el.type === 'table') {
            tables++;
            el.rows.forEach(r => {
              r.cells.forEach(c => {
                c.elements.forEach(sub => {
                  if (sub.type === 'paragraph') paragraphs++;
                  else if (sub.type === 'heading') headings++;
                });
              });
            });
          } else if (el.type === 'image') {
            images++;
          } else if (el.type === 'equation') {
            equations++;
          }
        });
      });
    });

    return {
      pages: docModel.pages.length,
      sections,
      paragraphs,
      headings,
      textRuns,
      tables,
      images,
      equations
    };
  })();

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
    <div className="h-full w-[380px] bg-white dark:bg-[#0f172a] border-l border-slate-200 dark:border-slate-800/80 flex flex-col shadow-2xl z-20 transition-all duration-300 no-print">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-100 font-bold">
          <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Braces size={18} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Document Model</span>
            <span className="text-[10px] text-slate-400 font-normal">JSON architecture view</span>
          </div>
        </div>
        <button 
          onClick={() => setShowJsonInspector(false)} 
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/20 dark:bg-slate-900/10 p-1 shrink-0 gap-1">
        <button
          onClick={() => setActiveTab('tree')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'tree'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
          }`}
        >
          <List size={14} />
          Tree Explorer
        </button>
        <button
          onClick={() => setActiveTab('raw')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'raw'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
          }`}
        >
          <Code size={14} />
          Raw JSON
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'stats'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
          }`}
        >
          <BarChart4 size={14} />
          Model Stats
        </button>
      </div>

      {/* Main Panel View */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50/30 dark:bg-slate-950/30">
        {activeTab === 'tree' && (
          <div className="space-y-3">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Root Document Structure</div>
            <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl space-y-1 shadow-sm max-h-[calc(100vh-210px)] overflow-y-auto">
              {docModel ? (
                renderTreeNode('document', docModel, 'doc', 0)
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">Failed to load document model</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'raw' && (
          <div className="space-y-3 h-full flex flex-col">
            <div className="flex justify-between items-center shrink-0">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Standard Document Model Schema</span>
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

        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Structure Statistics (Derived)</div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-xl shadow-sm">
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Pages</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.pages}</div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-xl shadow-sm">
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Sections</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.sections}</div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-xl shadow-sm">
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Paragraphs</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.paragraphs}</div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-xl shadow-sm">
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Headings</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.headings}</div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-xl shadow-sm">
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Text Runs</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.textRuns}</div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-xl shadow-sm">
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Tables</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.tables}</div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-xl shadow-sm col-span-2">
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide flex justify-between">
                  <span>Special Objects</span>
                </div>
                <div className="flex gap-6 mt-2 font-mono text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="text-slate-500">Equations:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{stats.equations}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span className="text-slate-500">Images:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{stats.images}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/30 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                <FileJson size={13} /> Why JSON Model?
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                By decoupling document storage from raw HTML, we avoid browser compatibility issues, achieve pixel-perfect page-break rendering, and enable instant exporter accuracy for PDF, DOCX, and Markdown formats.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
