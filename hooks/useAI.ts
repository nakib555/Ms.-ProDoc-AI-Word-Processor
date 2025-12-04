
import { AIOperation, PageConfig } from '../types';
import { generateAIContent, streamAIContent } from '../services/geminiService';
import { useEditor } from '../contexts/EditorContext';
import { jsonToHtml } from '../utils/documentConverter';

export interface AIOptions {
  mode?: 'insert' | 'replace' | 'edit';
  useSelection?: boolean;
}

// Helper to convert units (cm, mm, in) to inches (number)
const parseDimension = (val: string | number | undefined): number => {
    if (val === undefined || val === null) return 1; // default
    if (typeof val === 'number') return val;
    
    const str = val.toLowerCase().trim();
    const num = parseFloat(str);
    if (isNaN(num)) return 1;

    if (str.endsWith('cm')) return num / 2.54;
    if (str.endsWith('mm')) return num / 25.4;
    if (str.endsWith('in') || str.endsWith('"')) return num;
    if (str.endsWith('pt')) return num / 72;
    if (str.endsWith('px')) return num / 96;

    return num; // assume inches if no unit
};

export const useAI = () => {
  const { 
      executeCommand, 
      editorRef, 
      setContent, 
      isAIProcessing, 
      setIsAIProcessing, 
      setAiState, 
      content,
      setHeaderContent,
      setFooterContent,
      setPageConfig
  } = useEditor();

  const performAIAction = async (
    operation: string, 
    customInput?: string, 
    options: AIOptions = { mode: 'insert' },
    restoreRange?: Range | null
  ) => {
    console.log(`[useAI] performAIAction started. Operation: ${operation}, Mode: ${options.mode}`);
    
    // 1. Capture valid range to restore later (either passed in or current)
    let activeRange: Range | null = restoreRange || null;

    if (!activeRange && options.mode !== 'replace') {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            activeRange = sel.getRangeAt(0).cloneRange();
        }
    }

    // 2. Restore Selection/Focus temporarily to extract text context (only if not replacing)
    if (options.mode !== 'replace') {
        if (activeRange) {
            try {
                const sel = window.getSelection();
                if (sel) {
                    sel.removeAllRanges();
                    sel.addRange(activeRange);
                }
            } catch (e) {
                console.warn("[useAI] Could not restore selection range", e);
            }
        } else {
            if (editorRef.current && document.activeElement !== editorRef.current && !editorRef.current.contains(document.activeElement)) {
                 editorRef.current.focus();
            }
        }
    }

    const selection = window.getSelection();
    const hasSelection = selection && selection.rangeCount > 0 && !selection.isCollapsed;
    let textToProcess = hasSelection ? selection.toString() : "";

    if (operation === 'continue_writing' && !textToProcess) {
        if (editorRef.current) {
            const allText = editorRef.current.innerText;
            textToProcess = allText.slice(-5000); // Use last 5k chars for context
        }
    }

    // Special logic for generation vs editing
    if (operation === 'generate_content') {
        if (!customInput) {
            alert("Please provide a prompt.");
            return;
        }
        
        if (options.useSelection) {
             // Edit mode on specific selection - textToProcess is already set
        } else if (options.mode === 'insert') {
             // Insert mode - Provide document context so AI knows what it's contributing to
             textToProcess = content || "";
        } else if (options.mode === 'replace') {
             // Replace mode (New Doc) - Fresh start, no context needed
             textToProcess = "";
        }
    } 
    else if (operation === 'edit_content') {
        if (!textToProcess) {
            alert("Please select text to refine or edit.");
            return;
        }
        if (!customInput) {
            alert("Please provide instructions for editing.");
            return;
        }
    }
    else if (!textToProcess && operation !== 'generate_content') {
        alert("Please select some text to use the AI Assistant.");
        return;
    }

    // Determine if we should treat the response as JSON (Structured Document)
    const expectsJson = 
        operation === 'generate_content' || 
        operation === 'edit_content' ||
        operation === 'continue_writing' || 
        operation === 'expand' || 
        operation === 'shorten' ||
        operation === 'simplify' ||
        operation === 'fix_grammar' ||
        operation === 'make_professional' ||
        operation === 'generate_outline' ||
        operation.startsWith('tone_');

    console.log(`[useAI] Text to process length: ${textToProcess.length}, Expects JSON: ${expectsJson}`);
    setAiState('thinking');

    try {
        // If we expect JSON, we don't stream visualization because we need the full valid JSON to parse
        if (expectsJson) {
            console.log("[useAI] Calling generateAIContent...");
            let jsonString = await generateAIContent(operation as AIOperation, textToProcess, customInput);
            console.log("[useAI] Response received. Raw length:", jsonString.length);
            
            // Brief "writing" state before insertion to update UI
            setAiState('writing');

            // Robust JSON Extraction & Cleaning
            // 1. Trim whitespace
            jsonString = jsonString.trim();
            
            // 2. Extract from markdown code blocks if present
            const codeBlockMatch = jsonString.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            if (codeBlockMatch) {
                jsonString = codeBlockMatch[1].trim();
            } 
            
            // 3. Find balanced JSON structure (Handling extra trailing characters)
            const findBalancedJSON = (str: string): string => {
                const start = str.indexOf('{');
                if (start === -1) return str;
                
                let bracketCount = 0;
                let inString = false;
                let escape = false;
                
                for (let i = start; i < str.length; i++) {
                    const char = str[i];
                    
                    if (!escape && char === '"') {
                        inString = !inString;
                    }
                    
                    if (!inString && !escape) {
                        if (char === '{') bracketCount++;
                        else if (char === '}') bracketCount--;
                    }
                    
                    if (!escape && char === '\\') escape = true;
                    else escape = false;
                    
                    // If we are balanced, we found the end of the object
                    if (bracketCount === 0 && i > start) {
                        return str.substring(start, i + 1);
                    }
                }
                
                // If not perfectly balanced, fallback to last '}' which might include garbage but is better than nothing
                const end = str.lastIndexOf('}');
                if (end !== -1 && end > start) return str.substring(start, end + 1);
                
                return str;
            };
            
            jsonString = findBalancedJSON(jsonString);

            let parsedData;
            try {
                parsedData = JSON.parse(jsonString);
                console.log("[useAI] JSON parsed successfully");
            } catch (jsonError) {
                console.error("[useAI] JSON Parse Error:", jsonError, "Raw Output:", jsonString);
                // Fallback: If it's not JSON, it might be an error message or plain text. 
                if (jsonString.length < 500 && !jsonString.trim().startsWith('{')) {
                     if (editorRef.current && options.mode !== 'replace') editorRef.current.focus();
                     
                     if (options.mode === 'replace') {
                        if (editorRef.current) {
                            editorRef.current.focus();
                            executeCommand('selectAll');
                            executeCommand('insertHTML', jsonString);
                        } else {
                            setContent(jsonString);
                        }
                     } else {
                        executeCommand('insertText', jsonString);
                     }
                } else {
                     alert("The AI response was not in the expected format. Please try again.");
                }
                setAiState('idle');
                return;
            }

            if (parsedData.error) {
                alert("AI Error: " + parsedData.error);
                setAiState('idle');
                return;
            }

            // Logic to handle full document replacement including Header/Footer
            if (options.mode === 'replace') {
                console.log("[useAI] Executing REPLACE mode");
                
                let blocks = parsedData.document?.blocks || parsedData.blocks || [];
                // If extracted as single object from root, arrayify it
                if (!Array.isArray(blocks)) blocks = [];

                // Find and extract page settings from blocks if present (to override settings)
                const settingsBlockIndex = blocks.findIndex((b: any) => b.type === 'page_settings');
                let extractedSettings = null;
                if (settingsBlockIndex !== -1) {
                    extractedSettings = blocks[settingsBlockIndex];
                    // Remove it from blocks so it doesn't render as an element
                    blocks.splice(settingsBlockIndex, 1);
                }

                // Merge existing global doc settings with any block-level override
                const s = { ...parsedData.document?.settings, ...extractedSettings };
                
                if (Object.keys(s).length > 0) {
                    setPageConfig((prev: PageConfig) => {
                        const newMargins = s.margins ? {
                            ...prev.margins,
                            top: parseDimension(s.margins.top),
                            bottom: parseDimension(s.margins.bottom),
                            left: parseDimension(s.margins.left),
                            right: parseDimension(s.margins.right)
                        } : prev.margins;

                        return {
                            ...prev,
                            size: s.size || s.pageSize || prev.size,
                            orientation: s.orientation || prev.orientation,
                            margins: newMargins,
                            pageColor: s.backgroundColor && s.backgroundColor !== '#FFFFFF' ? s.backgroundColor : undefined
                        };
                    });
                }

                if (parsedData.document) {
                    // Handle Header
                    if (parsedData.document.header) {
                        const headerHtml = jsonToHtml(parsedData.document.header);
                        setHeaderContent(headerHtml);
                    } else {
                        // Reset header if replacing document and no header provided
                        setHeaderContent('<div style="color: #94a3b8;">[Header]</div>');
                    }

                    // Handle Footer
                    if (parsedData.document.footer) {
                        const footerHtml = jsonToHtml(parsedData.document.footer);
                        setFooterContent(footerHtml);
                    } else {
                        // Reset footer if replacing document and no footer provided
                        setFooterContent('<div style="color: #94a3b8;">[Page <span class="page-number-placeholder">1</span>]</div>');
                    }

                    // Handle Body Content
                    // Use the modified blocks array (without page_settings)
                    const generatedHtml = jsonToHtml({ blocks: blocks }); 
                    
                    console.log("[useAI] Generated HTML for REPLACE:", generatedHtml);
                    
                    // Use execCommand to preserve Undo stack for main body replacement
                    if (editorRef.current) {
                        editorRef.current.focus();
                        executeCommand('selectAll');
                        // Slight timeout to ensure browser processes the selectAll before insert
                        // though usually sync execution works.
                        executeCommand('insertHTML', generatedHtml);
                        
                        // Cleanup selection and scroll to top
                        window.getSelection()?.removeAllRanges();
                        editorRef.current.scrollTop = 0;
                    } else {
                        // Fallback if ref not available for some reason
                        setContent(generatedHtml);
                    }
                    
                } else {
                    // Legacy format or simple content
                    const generatedHtml = jsonToHtml(parsedData);
                    console.log("[useAI] Generated HTML for REPLACE (Legacy):", generatedHtml);
                    
                    if (editorRef.current) {
                        editorRef.current.focus();
                        executeCommand('selectAll');
                        executeCommand('insertHTML', generatedHtml);
                        window.getSelection()?.removeAllRanges();
                        editorRef.current.scrollTop = 0;
                    } else {
                        setContent(generatedHtml);
                    }
                }
                
            } else {
                // Insert / Edit Mode
                console.log("[useAI] Executing INSERT/EDIT mode");
                
                // Even in insert mode, check for page_settings block and apply if found (though rare for insertion)
                // We need to do this before jsonToHtml
                let contentData = parsedData;
                
                // Check if it's a complex object with blocks
                if (contentData.blocks || contentData.document?.blocks) {
                    let blocks = contentData.document?.blocks || contentData.blocks;
                    const settingsBlockIndex = blocks.findIndex((b: any) => b.type === 'page_settings');
                    if (settingsBlockIndex !== -1) {
                        const s = blocks[settingsBlockIndex];
                        // Apply settings
                        setPageConfig((prev: PageConfig) => {
                            const newMargins = s.margins ? {
                                ...prev.margins,
                                top: parseDimension(s.margins.top),
                                bottom: parseDimension(s.margins.bottom),
                                left: parseDimension(s.margins.left),
                                right: parseDimension(s.margins.right)
                            } : prev.margins;

                            return {
                                ...prev,
                                size: s.size || prev.size,
                                orientation: s.orientation || prev.orientation,
                                margins: newMargins
                            };
                        });
                        // Remove from array
                        blocks.splice(settingsBlockIndex, 1);
                    }
                }

                const generatedHtml = jsonToHtml(contentData);
                
                console.log("[useAI] Generated HTML for INSERT:", generatedHtml);

                if (activeRange) {
                    try {
                        console.log("[useAI] Restoring active range for insertion");
                        const sel = window.getSelection();
                        if (sel) {
                            sel.removeAllRanges();
                            sel.addRange(activeRange);
                        }
                    } catch(e) {
                        console.warn("[useAI] Failed to restore range for insertion", e);
                        // Fallback focus
                        if(editorRef.current) editorRef.current.focus();
                    }
                } else if (editorRef.current) {
                    console.log("[useAI] No range found, focusing editor as fallback");
                    editorRef.current.focus();
                }

                if (generatedHtml) {
                    console.log("[useAI] executing insertHTML command. Length: " + generatedHtml.length);
                    executeCommand('insertHTML', generatedHtml);
                    console.log("[useAI] insertHTML executed.");
                } else {
                    console.warn("[useAI] Generated HTML is empty, skipping insertion");
                }
            }

        } else {
            // Legacy/Simple streaming for other tasks
            console.log("[useAI] Starting Stream Mode");
            
            // For streaming, we also need to ensure focus is on editor initially
            if (activeRange) {
                 const sel = window.getSelection();
                 if (sel) {
                     sel.removeAllRanges();
                     sel.addRange(activeRange);
                 }
            }

            const stream = streamAIContent(operation as AIOperation, textToProcess, customInput);
            let isFirstChunk = true;
            
            for await (const chunk of stream) {
                if (isFirstChunk) {
                    setAiState('writing');
                    document.execCommand('insertText', false, chunk);
                    isFirstChunk = false;
                } else {
                    document.execCommand('insertText', false, chunk);
                }
            }
            console.log("[useAI] Streaming complete");
        }

    } catch (e) {
        console.error("[useAI] Error performing AI action:", e);
        alert("AI processing failed. Please check your API key and network connection.");
    } finally {
        setAiState('idle');
        console.log("[useAI] Action finished. State reset to IDLE.");
    }
  };

  return { isProcessing: isAIProcessing, performAIAction };
};
