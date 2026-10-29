import React, { useState, useRef } from 'react';
import { 
  FileText, FolderOpen, Save, Printer, Sliders, 
  RotateCcw, RotateCw, Sun, Moon, Download, 
  Eye, HardDrive, FileCode, FileDown
} from 'lucide-react';
import { useEditor } from '../../contexts/EditorContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useFileTab } from '../ribbon/tabs/FileTab/FileTabContext';
import { StudioButton } from './common/StudioButton';
import { StudioDivider } from './common/StudioDivider';
import { StudioDropdown, StudioDropdownItem } from './common/StudioDropdown';

export const StudioHeader: React.FC = () => {
  const { setActiveModal } = useFileTab();
  const { 
    documentTitle, 
    setDocumentTitle, 
    saveStatus, 
    executeCommand, 
    setShowPageSetup, 
    setShowJsonInspector,
    wordCount, 
    charCount, 
    zoom, 
    setZoom,
    editor,
    importFile
  } = useEditor();

  const { theme, toggleTheme } = useTheme();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(documentTitle);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleSubmit = () => {
    const trimmed = tempTitle.trim();
    if (trimmed) {
      setDocumentTitle(trimmed);
    } else {
      setTempTitle(documentTitle);
    }
    setIsEditingTitle(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await importFile(file);
      // Reset input so re-uploading the same file triggers change
      e.target.value = '';
    }
  };

  const handleDownload = (format: 'html' | 'json' | 'txt' | 'md') => {
    if (!editor) return;
    const title = documentTitle.toLowerCase().replace(/[^a-z0-9]/gi, '_') || 'document';
    let content = '';
    let mime = 'text/plain';
    let ext = 'txt';

    if (format === 'html') {
      content = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${documentTitle}</title><style>body{font-family:system-ui,-apple-system,sans-serif;max-width:800px;margin:2rem auto;padding:0 1rem;line-height:1.6;color:#1e293b;}</style></head><body>${editor.getHTML()}</body></html>`;
      mime = 'text/html';
      ext = 'html';
    } else if (format === 'json') {
      content = JSON.stringify(editor.getJSON(), null, 2);
      mime = 'application/json';
      ext = 'json';
    } else if (format === 'md') {
      // Basic markdown export from text
      content = `# ${documentTitle}\n\n${editor.getText()}`;
      mime = 'text/markdown';
      ext = 'md';
    } else {
      content = editor.getText();
      mime = 'text/plain';
      ext = 'txt';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const documentMenuItems: StudioDropdownItem[] = [
    {
      id: 'new',
      label: 'New Blank Document',
      icon: FileText,
      shortcut: 'Ctrl+N',
      onClick: () => {
        if (window.confirm('Create a new blank document? Any unsaved edits will be lost.')) {
          editor?.commands.setContent('<p></p>');
          setDocumentTitle('Untitled Document');
        }
      }
    },
    {
      id: 'open',
      label: 'Open Document...',
      icon: FolderOpen,
      shortcut: 'Ctrl+O',
      onClick: () => fileInputRef.current?.click()
    },
    {
      id: 'save',
      label: 'Save Snapshot',
      icon: Save,
      shortcut: 'Ctrl+S',
      onClick: () => {
        // Trigger save state
        window.dispatchEvent(new CustomEvent('prodoc:manual-save'));
      }
    },
    { id: 'div1', label: '', divider: true },
    {
      id: 'export-html',
      label: 'Download as HTML Webpage',
      icon: FileCode,
      onClick: () => handleDownload('html')
    },
    {
      id: 'export-md',
      label: 'Download as Markdown (.md)',
      icon: FileDown,
      onClick: () => handleDownload('md')
    },
    {
      id: 'export-json',
      label: 'Download as Document JSON',
      icon: HardDrive,
      onClick: () => handleDownload('json')
    },
    {
      id: 'export-txt',
      label: 'Download as Plain Text (.txt)',
      icon: FileText,
      onClick: () => handleDownload('txt')
    },
    { id: 'div2', label: '', divider: true },
    {
      id: 'page-setup',
      label: 'Page Setup & Margins...',
      icon: Sliders,
      onClick: () => setShowPageSetup(true)
    },
    {
      id: 'print',
      label: 'Print Document',
      icon: Printer,
      shortcut: 'Ctrl+P',
      onClick: () => setActiveModal('print')
    },
    {
      id: 'inspector',
      label: 'Document JSON Inspector',
      icon: Eye,
      onClick: () => setShowJsonInspector(prev => !prev)
    }
  ];

  return (
    <header className="relative flex items-center justify-between px-3 py-1.5 bg-white dark:bg-[#090d16] border-b border-slate-200/90 dark:border-slate-800/90 select-none flex-shrink-0 z-30">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".docx,.html,.htm,.txt,.json,.md" 
        className="hidden" 
      />

      {/* Left: Brand Identity & Document Menu */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-2 mr-1">
          {/* Distinctive ProDoc Studio mark */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xs">
            <span className="font-bold text-xs tracking-wider">P</span>
          </div>
          <div className="hidden sm:flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                ProDoc
              </span>
              <span className="text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
                Studio
              </span>
            </div>
          </div>
        </div>

        {/* Document Action Menu (replaces Office File ribbon) */}
        <StudioDropdown
          label="Document"
          items={documentMenuItems}
          variant="subtle"
          size="sm"
          className="font-medium"
        />

        <StudioDivider />

        {/* Inline Editable Document Title */}
        <div className="flex items-center gap-2 max-w-xs md:max-w-sm">
          {isEditingTitle ? (
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleTitleSubmit();
                if (e.key === 'Escape') {
                  setTempTitle(documentTitle);
                  setIsEditingTitle(false);
                }
              }}
              autoFocus
              className="text-xs font-semibold px-2 py-1 rounded border border-indigo-500 dark:border-indigo-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none ring-2 ring-indigo-500/20"
            />
          ) : (
            <button
              onClick={() => {
                setTempTitle(documentTitle);
                setIsEditingTitle(true);
              }}
              title="Click to rename document"
              className="text-xs font-semibold px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 truncate transition-colors text-left"
            >
              {documentTitle}
            </button>
          )}

          {/* Auto-save status (anti-pill, subtle typography) */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
            <span className={`w-1.5 h-1.5 rounded-full ${saveStatus === 'saved' ? 'bg-emerald-500' : saveStatus === 'saving' ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>{saveStatus === 'saved' ? 'Saved' : saveStatus === 'saving' ? 'Saving...' : 'Unsaved'}</span>
          </div>
        </div>
      </div>

      {/* Middle: Undo / Redo / Print Quick Tools */}
      <div className="hidden md:flex items-center gap-1">
        <StudioButton
          icon={RotateCcw}
          onClick={() => executeCommand('undo')}
          title="Undo"
          shortcut="Ctrl+Z"
          size="sm"
        />
        <StudioButton
          icon={RotateCw}
          onClick={() => executeCommand('redo')}
          title="Redo"
          shortcut="Ctrl+Y"
          size="sm"
        />
        <StudioButton
          icon={Printer}
          onClick={() => setActiveModal('print')}
          title="Print Document"
          shortcut="Ctrl+P"
          size="sm"
        />
      </div>

      {/* Right: Metrics, Zoom, Theme & Quick Export */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {/* Document Stats Counter */}
        <div className="hidden xl:flex items-center text-[11px] text-slate-500 dark:text-slate-400 px-2 font-mono">
          <span>{wordCount} words</span>
          <span className="mx-1.5 opacity-40">·</span>
          <span>{charCount} chars</span>
        </div>

        <StudioDivider className="hidden xl:block" />

        {/* Zoom Controls */}
        <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800/70 rounded-md p-0.5 border border-slate-200/80 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="w-5 h-6 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold cursor-pointer"
            title="Zoom Out"
          >
            -
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="px-1.5 text-[11px] font-mono font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            title="Reset Zoom (100%)"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            onClick={() => setZoom(Math.min(2.5, zoom + 0.1))}
            className="w-5 h-6 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold cursor-pointer"
            title="Zoom In"
          >
            +
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          title={`Current theme: ${theme}. Click to toggle.`}
          className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          {theme === 'dark' || theme === 'ocean' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Primary Action Button */}
        <StudioButton
          icon={Download}
          label="Export"
          onClick={() => handleDownload('html')}
          variant="primary"
          size="sm"
          title="Quick Export Document (HTML)"
        />
      </div>
    </header>
  );
};
