
import { PageConfig } from '../types';
import { PAGE_SIZES } from '../constants';

export interface PrintOptions {
    range: 'all' | 'current' | 'custom';
    pages?: string;
    currentPage?: number;
}

export const generatePdfPrint = async (
    content: string, 
    config: PageConfig, 
    headerContent: string, 
    footerContent: string,
    options: PrintOptions = { range: 'all' }
): Promise<void> => {
    try {
        const { size, orientation, margins } = config;
        
        let widthIn = 0;
        let heightIn = 0;

        if (size === 'Custom' && config.customWidth && config.customHeight) {
            widthIn = config.customWidth;
            heightIn = config.customHeight;
        } else {
            const baseSize = PAGE_SIZES[size as string] || PAGE_SIZES['Letter'];
            widthIn = baseSize.width / 96;
            heightIn = baseSize.height / 96;
        }

        if (orientation === 'landscape') {
            const temp = widthIn;
            widthIn = heightIn;
            heightIn = temp;
        }

        const sizeCss = `${widthIn}in ${heightIn}in`;

        // Generate page visibility CSS
        let pageVisibilityCss = '';
        
        if (options.range === 'current' && options.currentPage !== undefined) {
            // Show only current page (0-based index)
            const pageIndex = options.currentPage - 1;
            pageVisibilityCss = `
                .prodoc-page-wrapper { display: none !important; }
                .prodoc-page-wrapper[data-page-index="${pageIndex}"] { display: block !important; }
            `;
        } else if (options.range === 'custom' && options.pages) {
            // Parse custom range (e.g., "1-3, 5")
            const pagesToShow = new Set<number>();
            const parts = options.pages.split(',').map(p => p.trim());
            
            parts.forEach(part => {
                if (part.includes('-')) {
                    const [start, end] = part.split('-').map(n => parseInt(n, 10));
                    if (!isNaN(start) && !isNaN(end)) {
                        for (let i = start; i <= end; i++) pagesToShow.add(i - 1);
                    }
                } else {
                    const page = parseInt(part, 10);
                    if (!isNaN(page)) pagesToShow.add(page - 1);
                }
            });

            if (pagesToShow.size > 0) {
                const selectors = Array.from(pagesToShow)
                    .map(i => `.prodoc-page-wrapper[data-page-index="${i}"]`)
                    .join(',\n');
                
                pageVisibilityCss = `
                    .prodoc-page-wrapper { display: none !important; }
                    ${selectors} { display: block !important; }
                `;
            }
        }

        // Create a style element for print-specific overrides
        const styleEl = document.createElement('style');
        styleEl.id = 'native-print-style';
        styleEl.innerHTML = `
            @page {
                size: ${sizeCss};
                margin: 0; /* We use the editor's internal padding for margins */
            }
            
            @media print {
                /* Hide everything by default */
                body > * {
                    display: none !important;
                }

                /* Show the root app container but hide its non-editor children via no-print class */
                body > #root {
                    display: flex !important;
                    height: auto !important;
                    overflow: visible !important;
                }

                /* Ensure the editor container is visible */
                #root .print-layout-mode {
                    display: block !important;
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    height: auto !important;
                    overflow: visible !important;
                    background: white !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }

                /* Hide UI elements explicitly */
                .no-print, .ribbon-container, .status-bar, .ruler-container, .mini-toolbar, .copilot-sidebar, .mobile-selection-toolbar {
                    display: none !important;
                }
                
                /* Target the scroll container and flex layouts */
                .print-layout-mode,
                .print-layout-mode * {
                    overflow: visible !important;
                    height: auto !important;
                }

                /* Remove gaps and padding from the page container */
                .print-layout-mode .flex {
                    gap: 0 !important;
                    padding: 0 !important;
                    display: block !important; /* Stack pages vertically */
                }
                
                /* Target the page wrapper */
                .prodoc-page-wrapper {
                    break-after: page;
                    page-break-after: always;
                    margin: 0 !important;
                    padding: 0 !important;
                    box-shadow: none !important;
                    transform: none !important; /* Reset zoom transform */
                    width: 100% !important;
                    height: auto !important;
                    display: block !important;
                    float: none !important;
                    
                    /* Disable virtualization for print */
                    content-visibility: visible !important;
                    contain-intrinsic-size: auto !important;
                }

                /* Apply page visibility rules */
                ${pageVisibilityCss}
                
                /* Target the page sheet */
                .prodoc-page-sheet {
                    transform: none !important; /* Reset zoom transform */
                    width: 100% !important;
                    height: 100% !important; /* Fill the page */
                    margin: 0 !important;
                    box-shadow: none !important;
                    border: none !important;
                    overflow: visible !important;
                    background: white !important;
                }

                /* Ensure text colors are black for print */
                .prodoc-editor {
                    color: black !important;
                    column-count: ${config.columns || 1} !important;
                    column-gap: ${config.columnGap || 0.5}in !important;
                    column-fill: auto !important;
                    hyphens: ${config.hyphenation ? 'auto' : 'none'} !important;
                    -webkit-hyphens: ${config.hyphenation ? 'auto' : 'none'} !important;
                }
                
                /* Hide placeholders in print */
                .is-editor-empty:before {
                    content: none !important;
                }
            }
        `;
        
        document.head.appendChild(styleEl);
        
        // Give time for styles to apply
        setTimeout(() => {
            window.print();
        }, 100);
        
        const cleanup = () => {
            if (document.head.contains(styleEl)) {
                document.head.removeChild(styleEl);
            }
            window.removeEventListener('afterprint', cleanup);
        };
        
        window.addEventListener('afterprint', cleanup);
        
        // Fallback cleanup
        setTimeout(cleanup, 5000); 

    } catch (e) {
        console.error("Print Error:", e);
        alert("Failed to print document. Please try again.");
    }
};
