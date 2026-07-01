export class HTMLImportEngine {
    private doc: Document;
    private cssRules: Array<{ selector: string, style: string, specificity: number }> = [];

    constructor(htmlString: string) {
        // Phase 1: HTML Parser
        const parser = new DOMParser();
        this.doc = parser.parseFromString(htmlString, 'text/html');
        this.sanitizeDOM();
    }

    /**
     * Phase 1: Sanitize and clean HTML structure
     */
    private sanitizeDOM() {
        // Remove unsafe/unnecessary elements (leaving style tags to be parsed in Phase 2)
        this.doc.querySelectorAll('script, iframe, object, embed, applet, noscript, link').forEach(el => el.remove());
        
        // Remove document level elements
        this.doc.querySelectorAll('base, meta, title').forEach(el => el.remove());

        // Standardize legacy tags for our OOXML-like model
        this.doc.querySelectorAll('b').forEach(el => this.replaceTag(el as HTMLElement, 'strong'));
        this.doc.querySelectorAll('i').forEach(el => this.replaceTag(el as HTMLElement, 'em'));
        this.doc.querySelectorAll('center').forEach(el => {
            el.setAttribute('style', (el.getAttribute('style') || '') + '; text-align: center;');
            this.replaceTag(el as HTMLElement, 'div');
        });
        this.doc.querySelectorAll('strike').forEach(el => {
            el.setAttribute('style', (el.getAttribute('style') || '') + '; text-decoration: line-through;');
            this.replaceTag(el as HTMLElement, 'span');
        });
        
        // Remove wrapping html/head/body structure if it was parsed as a full document
        // Our editor expects flow content.
    }

    private replaceTag(el: HTMLElement, newTagName: string) {
        const newEl = this.doc.createElement(newTagName);
        // Copy attributes
        Array.from(el.attributes).forEach(attr => {
            newEl.setAttribute(attr.name, attr.value);
        });
        // Copy children
        while (el.firstChild) {
            newEl.appendChild(el.firstChild);
        }
        el.parentNode?.replaceChild(newEl, el);
    }

    /**
     * Phase 2: CSS Parser & Style Computation
     */
    public processStyles() {
        this.extractStyles();
        this.computeAndApplyStyles();
        return this.doc.body.innerHTML;
    }

    private extractStyles() {
        const styleTags = this.doc.querySelectorAll('style');
        styleTags.forEach(styleTag => {
            const cssText = styleTag.textContent || '';
            this.parseCSS(cssText);
            styleTag.remove();
        });

        // Also fetch styles from linked stylesheets? 
        // We only have the HTML string, external stylesheets are hard to fetch synchronously.
        // We'll focus on embedded styles.
    }

    private parseCSS(cssText: string) {
        // Remove comments
        const cleanCSS = cssText.replace(/\/\*[\s\S]*?\*\//g, '');
        
        // Match rule blocks: selector { styles }
        const ruleRegex = /([^{]+)\s*\{\s*([^}]+)\s*\}/g;
        let match;

        while ((match = ruleRegex.exec(cleanCSS)) !== null) {
            const selectors = match[1].split(',').map(s => s.trim());
            const styles = match[2].trim();

            selectors.forEach(selector => {
                if (selector && !selector.startsWith('@')) { // Ignore media queries and at-rules for basic version
                    this.cssRules.push({
                        selector,
                        style: styles,
                        specificity: this.calculateSpecificity(selector)
                    });
                }
            });
        }

        // Sort rules by specificity (ascending) so later rules override earlier ones
        this.cssRules.sort((a, b) => a.specificity - b.specificity);
    }

    private calculateSpecificity(selector: string): number {
        let specificity = 0;
        // Basic specificity heuristic
        const idMatches = selector.match(/#/g);
        if (idMatches) specificity += idMatches.length * 100;
        
        const classMatches = selector.match(/\./g);
        if (classMatches) specificity += classMatches.length * 10;
        
        const tagMatches = selector.match(/^[a-zA-Z]/g);
        if (tagMatches) specificity += tagMatches.length * 1;

        return specificity;
    }

    private computeAndApplyStyles() {
        this.cssRules.forEach(rule => {
            try {
                const elements = this.doc.querySelectorAll(rule.selector);
                elements.forEach(el => {
                    const htmlEl = el as HTMLElement;
                    // Apply styles inline. Inline styles already present will naturally override 
                    // because we assign to htmlEl.style.cssText but wait, if it already has inline styles, 
                    // we need to preserve them.
                    const existingStyles = htmlEl.getAttribute('style') || '';
                    
                    // Parse rule.style into object
                    const newStylesObj = this.styleStringToObject(rule.style);
                    const existingStylesObj = this.styleStringToObject(existingStyles);
                    
                    // Merge (existing inline styles take precedence over CSS block)
                    const mergedStyles = { ...newStylesObj, ...existingStylesObj };
                    
                    htmlEl.setAttribute('style', this.objectToStyleString(mergedStyles));
                });
            } catch {
                // Ignore invalid selectors
                console.warn("Invalid selector in HTML import:", rule.selector);
            }
        });
        
        // Clean up classes as styles are now inline
        // this.doc.querySelectorAll('*').forEach(el => el.removeAttribute('class'));
    }

    private styleStringToObject(styleStr: string): Record<string, string> {
        const obj: Record<string, string> = {};
        styleStr.split(';').forEach(declaration => {
            const [prop, ...valParts] = declaration.split(':');
            if (prop && valParts.length > 0) {
                obj[prop.trim()] = valParts.join(':').trim();
            }
        });
        return obj;
    }

    private objectToStyleString(obj: Record<string, string>): string {
        return Object.entries(obj).map(([prop, val]) => `${prop}: ${val}`).join('; ');
    }

    /**
     * Phase 3: HTML + CSS Mapping Engine
     * Converts the DOM into a standardized format resembling OOXML structural elements
     * (Paragraphs, Runs, Tables) suitable for our contenteditable editor.
     */
    public convertToEditorModel(): string {
        // Run Phase 2
        this.processStyles();

        // Phase 3 Mapping
        this.mapToOOXMLModel();

        return this.doc.body.innerHTML;
    }

    private mapToOOXMLModel() {
        this.normalizeBlocks();
        this.normalizeTypography();
        this.normalizeTables();
        this.normalizeLists();
        this.normalizeMedia();
        this.normalizeLinks();
        this.normalizeForms();
        this.cleanEmptyElements();
    }

    private normalizeBlocks() {
        // Convert block-like semantic tags to simple divs or paragraphs to avoid styling quirks
        const semanticTags = ['article', 'section', 'main', 'aside', 'header', 'footer', 'figure', 'figcaption'];
        semanticTags.forEach(tag => {
            this.doc.querySelectorAll(tag).forEach(el => this.replaceTag(el as HTMLElement, 'div'));
        });

        // Wrap loose text nodes directly in body with <p>
        const childNodes = Array.from(this.doc.body.childNodes);
        childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
                const p = this.doc.createElement('p');
                p.textContent = node.textContent;
                node.parentNode?.replaceChild(p, node);
            }
        });

        // Page break / Section break parsing from HTML page-break styling properties
        this.doc.querySelectorAll('*').forEach(el => {
            const htmlEl = el as HTMLElement;
            const style = htmlEl.getAttribute('style') || '';
            if (style.includes('page-break-after: always') || style.includes('page-break-before: always') || style.includes('break-after: page') || style.includes('break-before: page')) {
                const pageBreak = this.doc.createElement('div');
                pageBreak.className = 'prodoc-section-break';
                pageBreak.setAttribute('data-type', 'nextPage');
                pageBreak.setAttribute('contenteditable', 'false');
                pageBreak.style.borderTop = '2px dashed #94a3b8';
                pageBreak.style.margin = '1.5em 0';
                pageBreak.style.color = '#64748b';
                pageBreak.style.fontSize = '10px';
                pageBreak.style.textAlign = 'center';
                pageBreak.style.userSelect = 'none';
                pageBreak.textContent = '::: Section Break (Next Page) :::';
                htmlEl.parentNode?.insertBefore(pageBreak, htmlEl.nextSibling);
            }
        });

        // Standardize margins for paragraphs
        this.doc.querySelectorAll('p').forEach(p => {
            const htmlP = p as HTMLElement;
            if (!htmlP.style.margin && !htmlP.style.marginTop && !htmlP.style.marginBottom) {
                // Apply a default OOXML-like spacing if no margins are set
                htmlP.style.marginBottom = '8pt';
            }
            if (!htmlP.style.lineHeight) {
                htmlP.style.lineHeight = '1.25';
            }
        });
    }

    private normalizeTypography() {
        // Convert rem/em to standard pt sizes for document consistency
        const allElements = this.doc.querySelectorAll('*');
        allElements.forEach(el => {
            const htmlEl = el as HTMLElement;
            
            // Map common font-family styles or set defaults
            const font = htmlEl.style.fontFamily;
            if (!font) {
                htmlEl.style.fontFamily = 'Inter, system-ui, sans-serif';
            }

            // Convert rem/em/percent to px/pt
            const fontSize = htmlEl.style.fontSize;
            if (fontSize) {
                if (fontSize.endsWith('rem')) {
                    const val = parseFloat(fontSize) * 12; // 1rem = 12pt approx
                    htmlEl.style.fontSize = `${val}pt`;
                } else if (fontSize.endsWith('em')) {
                    const val = parseFloat(fontSize) * 11; // 1em = 11pt approx
                    htmlEl.style.fontSize = `${val}pt`;
                } else if (fontSize === 'xx-large') {
                    htmlEl.style.fontSize = '24pt';
                } else if (fontSize === 'x-large') {
                    htmlEl.style.fontSize = '18pt';
                } else if (fontSize === 'large') {
                    htmlEl.style.fontSize = '14pt';
                } else if (fontSize === 'medium') {
                    htmlEl.style.fontSize = '11pt';
                } else if (fontSize === 'small') {
                    htmlEl.style.fontSize = '9pt';
                }
            } else {
                // If it's a heading, give standard Word-like sizes
                if (htmlEl.tagName === 'H1') {
                    htmlEl.style.fontSize = '22pt';
                    htmlEl.style.fontWeight = 'bold';
                    htmlEl.style.marginTop = '12pt';
                    htmlEl.style.marginBottom = '6pt';
                    htmlEl.style.color = '#1e3a8a'; // Deep blue slate for titles
                } else if (htmlEl.tagName === 'H2') {
                    htmlEl.style.fontSize = '16pt';
                    htmlEl.style.fontWeight = 'bold';
                    htmlEl.style.marginTop = '12pt';
                    htmlEl.style.marginBottom = '4pt';
                    htmlEl.style.color = '#1e40af';
                } else if (htmlEl.tagName === 'H3') {
                    htmlEl.style.fontSize = '13pt';
                    htmlEl.style.fontWeight = 'bold';
                    htmlEl.style.marginTop = '8pt';
                    htmlEl.style.marginBottom = '2pt';
                    htmlEl.style.color = '#1e40af';
                }
            }

            // Standardize line height
            if (!htmlEl.style.lineHeight) {
                htmlEl.style.lineHeight = '1.25';
            }
        });
    }

    private normalizeTables() {
        const tables = this.doc.querySelectorAll('table');
        tables.forEach(table => {
            // Ensure tables have standard OOXML-like borders if they lack them
            table.style.borderCollapse = 'collapse';
            table.style.width = table.style.width || '100%';
            table.style.marginTop = table.style.marginTop || '12pt';
            table.style.marginBottom = table.style.marginBottom || '12pt';
            
            const cells = table.querySelectorAll('td, th');
            cells.forEach(cell => {
                const htmlCell = cell as HTMLElement;
                if (!htmlCell.style.border) {
                    htmlCell.style.border = '1px solid #cbd5e1'; // Word-like slate border
                }
                if (!htmlCell.style.padding) {
                    htmlCell.style.padding = '6px 10px'; // Professional margins
                }
                if (htmlCell.tagName === 'TH') {
                    if (!htmlCell.style.backgroundColor) {
                        htmlCell.style.backgroundColor = '#f1f5f9'; // Clean header shade
                    }
                    htmlCell.style.fontWeight = 'bold';
                }
            });
        });
    }

    private normalizeLists() {
        // Ensure lists have proper indentation compatible with our editor
        const lists = this.doc.querySelectorAll('ul, ol');
        lists.forEach(list => {
            const htmlList = list as HTMLElement;
            if (!htmlList.style.paddingLeft) {
                htmlList.style.paddingLeft = '40px';
            }
            if (!htmlList.style.marginTop) htmlList.style.marginTop = '0';
            if (!htmlList.style.marginBottom) htmlList.style.marginBottom = '0';
        });
    }

    private normalizeMedia() {
        const images = this.doc.querySelectorAll('img');
        images.forEach(img => {
            const htmlImg = img as HTMLImageElement;
            // Ensure images have a default max-width for document boundaries
            if (!htmlImg.style.maxWidth) {
                htmlImg.style.maxWidth = '100%';
            }
            if (!htmlImg.style.height && !htmlImg.getAttribute('height')) {
                htmlImg.style.height = 'auto';
            }
            // Add a class or attribute if needed by our editor for resize handles
        });
    }

    private normalizeLinks() {
        const links = this.doc.querySelectorAll('a');
        links.forEach(link => {
            const htmlLink = link as HTMLAnchorElement;
            if (!htmlLink.style.color) {
                htmlLink.style.color = '#0563C1'; // Standard Word hyperlink color
            }
            if (!htmlLink.style.textDecoration) {
                htmlLink.style.textDecoration = 'underline';
            }
            // Ensure links open in new tab when clicked in editor? 
            // In Word they are Ctrl+Clicked, we can just preserve them
        });
    }

    private normalizeForms() {
        // Convert checkboxes to Wingdings/symbol boxes
        const checkboxes = this.doc.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(input => {
            const htmlInput = input as HTMLInputElement;
            const span = this.doc.createElement('span');
            span.innerHTML = htmlInput.checked ? '☒' : '☐';
            span.style.fontFamily = 'Segoe UI Symbol, sans-serif';
            span.style.fontSize = '1.2em';
            span.style.marginRight = '4px';
            span.style.verticalAlign = 'middle';
            input.parentNode?.replaceChild(span, input);
        });

        // Convert radio buttons
        const radios = this.doc.querySelectorAll('input[type="radio"]');
        radios.forEach(input => {
            const htmlInput = input as HTMLInputElement;
            const span = this.doc.createElement('span');
            span.innerHTML = htmlInput.checked ? '🔘' : '⚪';
            span.style.fontSize = '1.1em';
            span.style.marginRight = '4px';
            span.style.verticalAlign = 'middle';
            input.parentNode?.replaceChild(span, input);
        });

        // Convert text inputs & textareas into elegant inline spans with standard placeholders/underlines
        const textFields = this.doc.querySelectorAll('input[type="text"], input:not([type]), textarea');
        textFields.forEach(input => {
            const htmlInput = input as HTMLInputElement;
            const span = this.doc.createElement('span');
            const valueText = htmlInput.value || htmlInput.placeholder || '_______________________';
            span.textContent = valueText;
            span.style.borderBottom = '1px solid #94a3b8';
            span.style.paddingBottom = '1px';
            span.style.color = htmlInput.value ? '#334155' : '#94a3b8';
            span.style.fontStyle = htmlInput.value ? 'normal' : 'italic';
            span.style.margin = '0 4px';
            input.parentNode?.replaceChild(span, input);
        });

        // Convert selects into dropdown styling representation
        const selects = this.doc.querySelectorAll('select');
        selects.forEach(select => {
            const htmlSelect = select as HTMLSelectElement;
            const span = this.doc.createElement('span');
            const activeOption = htmlSelect.options[htmlSelect.selectedIndex]?.text || htmlSelect.options[0]?.text || 'Select...';
            span.textContent = `${activeOption} ▾`;
            span.style.border = '1px solid #cbd5e1';
            span.style.padding = '2px 8px';
            span.style.borderRadius = '4px';
            span.style.backgroundColor = '#f8fafc';
            span.style.fontSize = '0.9em';
            span.style.margin = '0 4px';
            select.parentNode?.replaceChild(span, select);
        });

        // Convert buttons into elegant Word-like button borders
        const buttons = this.doc.querySelectorAll('button');
        buttons.forEach(button => {
            const htmlButton = button as HTMLButtonElement;
            const span = this.doc.createElement('span');
            span.textContent = htmlButton.textContent || 'Button';
            span.style.border = '1px solid #94a3b8';
            span.style.padding = '4px 12px';
            span.style.borderRadius = '4px';
            span.style.backgroundColor = '#f1f5f9';
            span.style.fontWeight = '500';
            span.style.fontSize = '0.95em';
            span.style.margin = '0 4px';
            span.style.display = 'inline-block';
            button.parentNode?.replaceChild(span, button);
        });
        
        // Disable other remaining inputs so they don't break contenteditable behavior
        this.doc.querySelectorAll('input, select, textarea, button').forEach(el => {
            (el as HTMLElement).setAttribute('contenteditable', 'false');
        });
    }

    private cleanEmptyElements() {
        // Remove empty paragraphs that might have been created by poor HTML
        this.doc.querySelectorAll('p, span, div').forEach(el => {
            if (el.innerHTML.trim() === '' && !el.querySelector('img') && !el.querySelector('br')) {
                // If it's a completely empty block without replaced elements, remove it
                // Actually, empty paragraphs are used for spacing in Word sometimes.
                // We will leave them if they have a height, otherwise let's just keep them for safety
                // but if it's an empty span, remove it.
                if (el.tagName === 'SPAN') {
                    el.remove();
                }
            }
        });
    }
}

export const importHtmlToEditor = (htmlString: string): string => {
    const engine = new HTMLImportEngine(htmlString);
    return engine.convertToEditorModel();
};
