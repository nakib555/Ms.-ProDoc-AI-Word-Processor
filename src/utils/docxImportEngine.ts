import JSZip from 'jszip';
import mammoth from 'mammoth';

/**
 * Recursively converts an Office MathML (OMML) element to LaTeX format.
 * Uses localName to remain namespace-agnostic.
 */
function parseOmmlElement(element: Element): string {
    const localName = element.localName;

    // Helper to get text from direct text nodes
    const getDirectText = (el: Element): string => {
        let text = "";
        for (let i = 0; i < el.childNodes.length; i++) {
            const child = el.childNodes[i];
            if (child.nodeType === Node.TEXT_NODE) {
                text += child.nodeValue;
            }
        }
        return text;
    };

    // Helper to process all children recursively
    const processChildren = (el: Element): string => {
        let result = "";
        for (let i = 0; i < el.children.length; i++) {
            result += parseOmmlElement(el.children[i]);
        }
        return result;
    };

    // Helper to find first child by localName
    const findChildByLocalName = (el: Element, name: string): Element | null => {
        for (let i = 0; i < el.children.length; i++) {
            if (el.children[i].localName === name) {
                return el.children[i];
            }
        }
        return null;
    };

    switch (localName) {
        case 'oMath':
        case 'oMathPara':
            return processChildren(element);

        case 'r': // Math Run
            return processChildren(element);

        case 't': // Math Text
            return getDirectText(element) || processChildren(element);

        case 'f': { // Fraction
            const num = findChildByLocalName(element, 'num');
            const den = findChildByLocalName(element, 'den');
            const numText = num ? parseOmmlElement(num) : "";
            const denText = den ? parseOmmlElement(den) : "";
            return `\\frac{${numText}}{${denText}}`;
        }

        case 'num':
        case 'den':
        case 'e': // Base / element container
            return processChildren(element);

        case 'sup': { // Superscript
            const base = findChildByLocalName(element, 'e');
            const supNode = findChildByLocalName(element, 'sup');
            const baseText = base ? parseOmmlElement(base) : "";
            const supText = supNode ? parseOmmlElement(supNode) : "";
            return `{${baseText}}^{${supText}}`;
        }

        case 'sub': { // Subscript
            const base = findChildByLocalName(element, 'e');
            const subNode = findChildByLocalName(element, 'sub');
            const baseText = base ? parseOmmlElement(base) : "";
            const subText = subNode ? parseOmmlElement(subNode) : "";
            return `{${baseText}}_{${subText}}`;
        }

        case 'subSup':
        case 'sSubSup': { // Subscript Superscript
            const base = findChildByLocalName(element, 'e');
            const subNode = findChildByLocalName(element, 'sub');
            const supNode = findChildByLocalName(element, 'sup');
            const baseText = base ? parseOmmlElement(base) : "";
            const subText = subNode ? parseOmmlElement(subNode) : "";
            const supText = supNode ? parseOmmlElement(supNode) : "";
            return `{${baseText}}_{${subText}}^{${supText}}`;
        }

        case 'rad': { // Radical (root)
            const deg = findChildByLocalName(element, 'deg');
            const base = findChildByLocalName(element, 'e');
            const baseText = base ? parseOmmlElement(base) : "";
            const degText = deg ? parseOmmlElement(deg).trim() : "";
            if (degText) {
                return `\\sqrt[${degText}]{${baseText}}`;
            }
            return `\\sqrt{${baseText}}`;
        }

        case 'deg':
            return processChildren(element);

        case 'nary': { // N-ary operator (integrals, sums, products)
            const naryPr = findChildByLocalName(element, 'naryPr');
            const subNode = findChildByLocalName(element, 'sub');
            const supNode = findChildByLocalName(element, 'sup');
            const base = findChildByLocalName(element, 'e');

            let op = "\\int"; // Default
            if (naryPr) {
                const chrNode = findChildByLocalName(naryPr, 'chr');
                const chrVal = chrNode ? chrNode.getAttribute('m:val') || chrNode.getAttribute('val') || getDirectText(chrNode) : "";
                if (chrVal === "∑" || chrVal === "sum") op = "\\sum";
                else if (chrVal === "∏" || chrVal === "prod") op = "\\prod";
                else if (chrVal === "∫" || chrVal === "int") op = "\\int";
            }

            const subText = subNode ? parseOmmlElement(subNode) : "";
            const supText = supNode ? parseOmmlElement(supNode) : "";
            const baseText = base ? parseOmmlElement(base) : "";

            const subStr = subText ? `_{${subText}}` : "";
            const supStr = supText ? `^{${supText}}` : "";
            return `${op}${subStr}${supStr} {${baseText}}`;
        }

        case 'd': { // Delimiter (parentheses / brackets)
            const base = findChildByLocalName(element, 'e');
            const baseText = base ? parseOmmlElement(base) : "";
            return `\\left(${baseText}\\right)`;
        }

        case 'limLow': { // Limit Lower
            const base = findChildByLocalName(element, 'e');
            const lim = findChildByLocalName(element, 'lim');
            const baseText = base ? parseOmmlElement(base) : "";
            const limText = lim ? parseOmmlElement(lim) : "";
            return `\\lim_{${limText}} {${baseText}}`;
        }

        case 'limUpp': { // Limit Upper
            const base = findChildByLocalName(element, 'e');
            const lim = findChildByLocalName(element, 'lim');
            const baseText = base ? parseOmmlElement(base) : "";
            const limText = lim ? parseOmmlElement(lim) : "";
            return `\\lim^{${limText}} {${baseText}}`;
        }

        case 'bar': { // Bar accent
            const base = findChildByLocalName(element, 'e');
            const baseText = base ? parseOmmlElement(base) : "";
            return `\\bar{${baseText}}`;
        }

        case 'box': { // Box
            const base = findChildByLocalName(element, 'e');
            const baseText = base ? parseOmmlElement(base) : "";
            return `\\boxed{${baseText}}`;
        }

        default:
            return processChildren(element);
    }
}

/**
 * Main DOCX import engine with math extraction and conversion.
 */
export async function importDocxToEditor(arrayBuffer: ArrayBuffer, onProgress?: (percent: number, status: string) => void): Promise<string> {
    onProgress?.(10, 'Unzipping DOCX document structures...');
    
    // 1. Unzip .docx to access internal XML
    const zip = await JSZip.loadAsync(arrayBuffer);
    const documentXmlFile = zip.file('word/document.xml');
    if (!documentXmlFile) {
        throw new Error('Invalid .docx file: word/document.xml is missing.');
    }

    onProgress?.(30, 'Reading document markup...');
    const originalXmlText = await documentXmlFile.async('text');

    onProgress?.(45, 'Extracting mathematical equations...');
    // 2. Parse XML and find math nodes
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(originalXmlText, 'application/xml');

    // Handle namespaced elements properly
    const oMathNodes = Array.from(xmlDoc.getElementsByTagNameNS('http://schemas.openxmlformats.org/officeDocument/2006/math', 'oMath'));
    const formulas: string[] = [];

    // Replace equations with placeholders
    for (let i = 0; i < oMathNodes.length; i++) {
        const mathNode = oMathNodes[i];
        try {
            const latex = parseOmmlElement(mathNode);
            formulas.push(latex);

            // Create a text replacement run
            const replacementRun = xmlDoc.createElementNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 'w:r');
            const replacementText = xmlDoc.createElementNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 'w:t');
            replacementText.textContent = `[[MATH_EQUATION_PLACEHOLDER_${i}]]`;
            replacementRun.appendChild(replacementText);

            // Replace mathNode's parent paragraph or run
            mathNode.parentNode?.replaceChild(replacementRun, mathNode);
        } catch (err) {
            console.error('Failed to parse a math node:', err);
        }
    }

    onProgress?.(60, 'Re-assembling clean document...');
    // 3. Serialize back and update zip
    const serializer = new XMLSerializer();
    const modifiedXmlText = serializer.serializeToString(xmlDoc);
    zip.file('word/document.xml', modifiedXmlText);

    // Generate modified .docx file
    const modifiedDocxBuffer = await zip.generateAsync({ type: 'arraybuffer' });

    onProgress?.(80, 'Converting styled elements with Mammoth...');
    // 4. Pass the clean, placeholder-infused .docx to Mammoth
    const result = await mammoth.convertToHtml({ arrayBuffer: modifiedDocxBuffer });
    let convertedHtml = result.value;

    onProgress?.(95, 'Restoring equations...');
    // 5. Post-process to restore equations with complete interactive markup
    for (let i = 0; i < formulas.length; i++) {
        const latex = formulas[i];
        const placeholder = `[[MATH_EQUATION_PLACEHOLDER_${i}]]`;
        
        // Wrap formula inside our exact editor-supported standard equation-wrapper
        const equationWrapperHtml = `&#8203;<span class="equation-wrapper" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field>${latex}</math-field><span class="equation-dropdown">▼</span></span>&#8203;`;
        
        // Replace occurrences in the generated HTML
        convertedHtml = convertedHtml.replace(placeholder, equationWrapperHtml);
    }

    // Clean up empty paragraphs and format tables with borders nicely
    convertedHtml = convertedHtml.replace(/<table/g, '<table class="is-resizing" style="width:100%; border-collapse:collapse; margin:12pt 0;"');
    convertedHtml = convertedHtml.replace(/<td/g, '<td style="border: 1px solid #cbd5e1; padding: 6px 10px;"');
    convertedHtml = convertedHtml.replace(/<th/g, '<th style="border: 1px solid #cbd5e1; padding: 6px 10px; background-color: #f1f5f9; font-weight: bold;"');

    onProgress?.(100, 'Import Completed successfully!');
    return convertedHtml;
}
