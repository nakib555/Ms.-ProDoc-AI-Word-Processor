
import { AIOperation, PageConfig } from '../types';
import { generateAIContent, streamAIContent } from '../services/geminiService';
import { useEditor } from '../contexts/EditorContext';
import { jsonToHtml, safeJsonParse } from '../utils/documentConverter';

export interface AIOptions {
  mode?: 'insert' | 'replace' | 'edit';
  useSelection?: boolean;
}

// Helper to convert units
const parseDimension = (val: string | number | undefined): number => {
    if (val === undefined || val === null) return 1; 
    if (typeof val === 'number') return val;
    
    const str = val.toLowerCase().trim();
    const num = parseFloat(str);
    if (isNaN(num)) return 1;

    if (str.endsWith('cm')) return num / 2.54;
    if (str.endsWith('mm')) return num / 25.4;
    if (str.endsWith('in') || str.endsWith('"')) return num;
    if (str.endsWith('pt')) return num / 72;
    if (str.endsWith('px')) return num / 96;

    return num; 
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
    console.log(`[useAI] Action: ${operation}, Mode: ${options.mode}`);
    
    let activeRange: Range | null = restoreRange || null;
    
    // Auto-detect range if insert/edit mode
    if (!activeRange && options.mode !== 'replace') {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            activeRange = sel.getRangeAt(0).cloneRange();
        }
    }

    // Context Extraction
    const selection = window.getSelection();
    const hasSelection = selection && selection.rangeCount > 0 && !selection.isCollapsed;
    let textToProcess = hasSelection ? selection.toString() : "";

    // If 'Insert' and prompt provided, we might want context from doc or just blank
    if (operation === 'generate_content') {
        if (!customInput) {
            alert("Please provide a prompt.");
            return;
        }
        if (options.mode === 'insert') textToProcess = content || ""; 
        else if (options.mode === 'replace') textToProcess = "";
    } 
    
    // If 'Refine' (Edit) and no selection, fallback to full doc
    else if (operation === 'edit_content' && !textToProcess) {
        if (content && content.trim().length > 0) {
             textToProcess = editorRef.current?.innerText || ""; // Use text content for context
             // Select entire document for replacement
             if (editorRef.current) {
                 const range = document.createRange();
                 range.selectNodeContents(editorRef.current);
                 activeRange = range; // Update target range to full doc
             }
        } else {
             alert("Please select text or ensure document has content to refine.");
             return;
        }
    }

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

    setAiState('thinking');

    try {
        if (expectsJson) {
            let jsonString = await generateAIContent(operation as AIOperation, textToProcess, customInput);
            
            setAiState('writing');

            let parsedData;
            try {
                parsedData = safeJsonParse(jsonString);
            } catch (e) {
                console.error("JSON Parse Error:", e);
                alert("The AI response structure was invalid. Please try again or refine your prompt.");
                setAiState('idle');
                return;
            }

            if (parsedData.error) {
                alert("AI Error: " + parsedData.error);
                setAiState('idle');
                return;
            }

            if (options.mode === 'replace') {
                // Full Document Replacement - Clear Existing State
                
                // Handle Document Settings
                const docSettings = parsedData.document?.settings || {};
                let blocks = parsedData.document?.blocks || parsedData.blocks || [];
                if (!Array.isArray(blocks)) blocks = [];

                const settingsBlockIndex = blocks.findIndex((b: any) => b.type === 'page_settings');
                let blockSettings = {};
                if (settingsBlockIndex !== -1) {
                    blockSettings = blocks[settingsBlockIndex];
                    blocks.splice(settingsBlockIndex, 1);
                }

                const mergedSettings = { ...docSettings, ...blockSettings };
                
                if (Object.keys(mergedSettings).length > 0) {
                    setPageConfig((prev: PageConfig) => ({
                        ...prev,
                        size: mergedSettings.size || mergedSettings.pageSize || prev.size,
                        orientation: mergedSettings.orientation || prev.orientation,
                        margins: mergedSettings.margins ? {
                            ...prev.margins,
                            top: parseDimension(mergedSettings.margins.top),
                            bottom: parseDimension(mergedSettings.margins.bottom),
                            left: parseDimension(mergedSettings.margins.left),
                            right: parseDimension(mergedSettings.margins.right)
                        } : prev.margins,
                    }));
                }

                // Handle Headers/Footers - Reset if missing to ensure clean slate
                const headers = parsedData.document?.headers || parsedData.document?.header;
                if (headers) {
                    const defaultHeader = Array.isArray(headers) ? headers : (headers.default || headers.first);
                    if (defaultHeader) setHeaderContent(jsonToHtml({ blocks: defaultHeader }));
                } else {
                    setHeaderContent('<div style="color: #94a3b8;">[Header]</div>');
                }

                const footers = parsedData.document?.footers || parsedData.document?.footer;
                if (footers) {
                    const defaultFooter = Array.isArray(footers) ? footers : (footers.default || footers.first);
                    if (defaultFooter) setFooterContent(jsonToHtml({ blocks: defaultFooter }));
                } else {
                    setFooterContent('<div style="color: #94a3b8;">[Page <span class="page-number-placeholder">1</span>]</div>');
                }

                // Render Body - Completely Replace
                const bodyHtml = jsonToHtml({ blocks });
                
                // Use setContent to fully reset editor state/history
                setContent(bodyHtml, true);
                
                // If possible, focus start
                if (editorRef.current) {
                    editorRef.current.scrollTop = 0;
                }
                
            } else {
                // Insert/Edit Mode
                let contentData = parsedData;
                let blocks = contentData.document?.blocks || contentData.blocks || (Array.isArray(contentData) ? contentData : [contentData]);
                
                blocks = blocks.filter((b: any) => b.type !== 'page_settings');
                const html = jsonToHtml(blocks);
                
                // Restore range/cursor before insertion
                if (activeRange) {
                    const sel = window.getSelection();
                    if (sel) {
                        sel.removeAllRanges();
                        sel.addRange(activeRange);
                    }
                } else if (editorRef.current) {
                    editorRef.current.focus();
                }

                executeCommand('insertHTML', html);
            }

        } else {
            // Streaming Mode (Legacy/Simple)
            if (activeRange) {
                 const sel = window.getSelection();
                 if (sel) {
                     sel.removeAllRanges();
                     sel.addRange(activeRange);
                 }
            }

            const stream = streamAIContent(operation as AIOperation, textToProcess, customInput);
            let isFirst = true;
            
            for await (const chunk of stream) {
                if (isFirst) {
                    setAiState('writing');
                    document.execCommand('insertText', false, chunk);
                    isFirst = false;
                } else {
                    document.execCommand('insertText', false, chunk);
                }
            }
        }

    } catch (e) {
        console.error("[useAI] Error:", e);
        alert("AI processing failed. Please check your API key.");
    } finally {
        setAiState('idle');
    }
  };

  return { isProcessing: isAIProcessing, performAIAction };
};
