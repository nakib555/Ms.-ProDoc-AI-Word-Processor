
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';
import { AdvancedSummarizeDialog } from './AdvancedSummarizeDialog';

export const SummarizeTool: React.FC = () => {
  const { editorRef, executeCommand } = useEditor();
  const [showDialog, setShowDialog] = useState(false);
  const [initialText, setInitialText] = useState('');

  const handleOpen = () => {
    const selection = window.getSelection();
    let textToProcess = '';

    if (selection && selection.toString().trim().length > 0) {
        textToProcess = selection.toString();
    } else if (editorRef.current) {
        // Fallback to whole document if no selection
        textToProcess = editorRef.current.innerText;
    }

    if (!textToProcess.trim()) {
        alert("Please add some content to the document first.");
        return;
    }

    setInitialText(textToProcess);
    setShowDialog(true);
  };

  const handleInsert = (summaryHtml: string) => {
      // If we summarized a specific selection, we might want to replace it or append.
      // For now, let's append the summary after the selection or at cursor position.
      // Ideally, in a "summarize" workflow, people often want to see it *above* or *below*.
      // We will insert it at the current cursor position.
      executeCommand('insertHTML', summaryHtml);
  };

  return (
    <>
        <RibbonButton 
            icon={FileText} 
            label="Summarize" 
            onClick={handleOpen} 
            title="Generate a custom summary with AI"
        />

        {showDialog && (
            <AdvancedSummarizeDialog 
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                initialText={initialText}
                onInsert={handleInsert}
            />
        )}
    </>
  );
};
