import React from 'react';
import { 
  BookmarkPlus, ListTree, StickyNote, Hash
} from 'lucide-react';
import { useEditor } from '../../../contexts/EditorContext';
import { StudioButton } from '../common/StudioButton';
import { StudioDivider } from '../common/StudioDivider';

export const StructureTray: React.FC = () => {
  const { 
    addFootnote, 
    addEndnote, 
    showNotes, 
    setShowNotes, 
    executeCommand,
    editor 
  } = useEditor();

  const handleInsertTOC = () => {
    // Generate a simple Table of Contents from headings
    const headings: { text: string; level: number }[] = [];
    if (editor) {
      const doc = editor.state.doc;
      doc.descendants((node) => {
        if (node.type.name === 'heading') {
          headings.push({ text: node.textContent, level: node.attrs.level || 1 });
        }
      });
    }

    let tocHtml = '<div class="prodoc-toc p-4 my-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700" contenteditable="false"><h3 style="margin-top:0;font-weight:700;font-size:1.1rem;color:#4f46e5;">Table of Contents</h3><ul style="list-style:none;padding-left:0;margin:0.5rem 0;">';
    if (headings.length === 0) {
      tocHtml += '<li style="color:#94a3b8;font-size:0.875rem;">(Add Headings in your document to populate the Table of Contents)</li>';
    } else {
      headings.forEach((h, i) => {
        const indent = (h.level - 1) * 1.5;
        tocHtml += `<li style="padding-left:${indent}rem;padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.875rem;display:flex;justify-content:space-between;border-bottom:1px dotted #e2e8f0;"><span style="color:#1e293b;font-weight:${h.level === 1 ? 600 : 400};">${h.text}</span><span style="color:#94a3b8;">${i + 1}</span></li>`;
      });
    }
    tocHtml += '</ul></div><p><br></p>';

    executeCommand('insertHTML', tocHtml);
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 overflow-x-auto no-scrollbar w-full">
      {/* Table of Contents */}
      <StudioButton
        icon={ListTree}
        label="Table of Contents"
        onClick={handleInsertTOC}
        title="Generate and Insert Table of Contents"
        size="sm"
      />

      <StudioDivider />

      {/* Footnotes & Endnotes */}
      <StudioButton
        icon={BookmarkPlus}
        label="Insert Footnote"
        onClick={() => addFootnote()}
        title="Add Footnote at selection"
        size="sm"
      />
      <StudioButton
        icon={Hash}
        label="Insert Endnote"
        onClick={() => addEndnote()}
        title="Add Endnote at document end"
        size="sm"
      />

      <StudioDivider />

      {/* Notes Sidebar Toggle */}
      <StudioButton
        icon={StickyNote}
        label="Notes Panel"
        onClick={() => setShowNotes(prev => !prev)}
        active={showNotes}
        title="Toggle Footnotes & Endnotes Sidebar"
        size="sm"
      />
    </div>
  );
};
