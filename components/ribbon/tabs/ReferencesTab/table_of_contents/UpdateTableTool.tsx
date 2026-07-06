
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReferencesTools';
import { useEditor } from '../../../../../contexts/EditorContext';
import { globalTocEngine } from '../../../../../utils/tocEngine';

export const UpdateTableTool: React.FC = () => {
  const { executeCommand, content, editor } = useEditor();

  const handleUpdate = () => {
    if (!editor) return;
    
    // Check if TOC exists
    const hasToc = content.includes('data-type="toc"');
    if (!hasToc) {
      alert("No Table of Contents found in document to update.");
      return;
    }

    const items = globalTocEngine.scanHeadings(content);
    const tocHtml = globalTocEngine.generateTocHtml(items);

    // Replace existing TOC using TipTap
    // To do this simply, we'll try to find the TOC node and replace it.
    // If we're working via HTML, we can parse the HTML, replace the TOC div, and set content.
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const existingToc = doc.querySelector('.prodoc-toc');
    
    if (existingToc) {
      existingToc.outerHTML = tocHtml;
      // We use setContent to completely replace it
      editor.commands.setContent(doc.body.innerHTML);
    }
  };

  return (
    <SmallRibbonButton icon={RefreshCw} label="Update Table" onClick={handleUpdate} />
  );
};
