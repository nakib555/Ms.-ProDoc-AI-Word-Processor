
export const insertMathStructure = (latex: string) => {
  const activeEl = document.activeElement;
  const isMathField = activeEl?.tagName.toLowerCase() === 'math-field';

  if (isMathField) {
    // Insert into existing math field
    (activeEl as any).executeCommand(['insert', latex, { focus: true }]);
  } else {
    // Create new equation wrapper with the latex content
    // Escape any HTML special characters in latex if necessary, though simpler is usually better for innerHTML
    const safeLatex = latex.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // Use zero-width spaces (&#8203;) around the wrapper to ensure a cursor position exists without extra visual space
    const html = `&#8203;<span class="equation-wrapper" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field>${safeLatex}</math-field><span class="equation-dropdown">▼</span></span>&#8203;`;
    document.execCommand('insertHTML', false, html);
  }
};
