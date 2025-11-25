
import { useState } from 'react';
import { AIOperation } from '../types';
import { generateAIContent, streamAIContent } from '../services/geminiService';
import { useEditor } from '../contexts/EditorContext';

export interface AIOptions {
  mode?: 'insert' | 'replace' | 'append';
  useSelection?: boolean;
}

export const useAI = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { executeCommand, editorRef, setContent } = useEditor();

  const performAIAction = async (
    operation: string, 
    customInput?: string, 
    options: AIOptions = { mode: 'insert' }
  ) => {
    const selection = window.getSelection();
    const hasSelection = selection && selection.rangeCount > 0 && !selection.isCollapsed;
    let textToProcess = hasSelection ? selection.toString() : "";

    // Context gathering
    if (operation === 'continue_writing' && !textToProcess) {
        if (editorRef.current) {
            const allText = editorRef.current.innerText;
            textToProcess = allText.slice(-2000);
        }
    }

    // For "generate_content", we rely on the prompt.
    // If "useSelection" is true (Edit Mode), we append the selection to the prompt context.
    if (operation === 'generate_content') {
        if (!customInput) {
            alert("Please provide a prompt.");
            return;
        }
        
        if (options.useSelection && hasSelection) {
             // We are editing the selection based on the prompt
             // The textToProcess is already set to selection.toString() above
        } else {
             // We are generating new content (either fresh or replacing doc)
             // We don't strictly need textToProcess unless we want to give full doc context?
             // For now, let's just send the prompt if it's a fresh generation.
             textToProcess = ""; 
        }
    } else if (!textToProcess && operation !== 'generate_content') {
        // For refine tools etc, we need text.
        alert("Please select some text or ensure the document has content to use the AI Assistant.");
        return;
    }

    const shouldStream = operation === 'generate_content' || operation === 'continue_writing' || operation === 'expand';

    setIsProcessing(true);

    if (shouldStream) {
        try {
            const stream = streamAIContent(operation as AIOperation, textToProcess, customInput);
            let isFirstChunk = true;
            let streamSpan: HTMLElement | null = null;
            let accumulatedContent = "";
            
            for await (const chunk of stream) {
                if (isFirstChunk) {
                    setIsProcessing(false); // Hide loading overlay once writing starts
                    
                    // Handle Replacement Mode
                    if (operation === 'generate_content' && options.mode === 'replace') {
                        if (editorRef.current) {
                            editorRef.current.innerHTML = ''; 
                            setContent(''); // Sync state
                            editorRef.current.focus(); 
                        }
                    }

                    const spanId = `ai-stream-${Date.now()}`;
                    // Insert a span with visual indicators that AI is writing
                    const html = `<span id="${spanId}" class="ai-streaming" style="background-color: rgba(59, 130, 246, 0.08); transition: all 0.2s ease;">&#8203;</span>`;
                    executeCommand('insertHTML', html);
                    streamSpan = document.getElementById(spanId);
                    isFirstChunk = false;
                }

                if (streamSpan && streamSpan.isConnected) {
                    accumulatedContent += chunk;
                    
                    // Basic Markdown code block stripping for the stream view
                    let cleanHTML = accumulatedContent;
                    if (cleanHTML.startsWith('```html')) cleanHTML = cleanHTML.substring(7);
                    if (cleanHTML.startsWith('```')) cleanHTML = cleanHTML.substring(3);
                    if (cleanHTML.endsWith('```')) cleanHTML = cleanHTML.substring(0, cleanHTML.length - 3);
                    
                    // Update the content of the span directly
                    streamSpan.innerHTML = cleanHTML;
                    
                    // Keep visible
                    streamSpan.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
            
            // Cleanup: Unwrap the span to merge content naturally into the document
            if (streamSpan) {
                const parent = streamSpan.parentNode;
                if (parent) {
                    while (streamSpan.firstChild) {
                        parent.insertBefore(streamSpan.firstChild, streamSpan);
                    }
                    parent.removeChild(streamSpan);
                }

                editorRef.current?.normalize();
                if (editorRef.current) {
                    setContent(editorRef.current.innerHTML);
                }
            }
        } catch (e) {
            console.error(e);
            alert("AI Stream Error: " + e);
        } finally {
            setIsProcessing(false);
        }
        return;
    }

    // Non-streaming operations
    try {
      const result = await generateAIContent(operation as AIOperation, textToProcess, customInput);
      
      if (result) {
         if (result.trim().startsWith('<') || operation === 'generate_outline') {
             executeCommand('insertHTML', result);
         } else {
             executeCommand('insertText', result);
         }
      }
    } catch (e) {
      console.error(e);
      alert("AI Error: " + e);
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, performAIAction };
};
