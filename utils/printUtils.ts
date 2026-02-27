
import { PageConfig } from '../types';
import { PAGE_SIZES } from '../constants';

export const generatePdfPrint = async (
    content: string, 
    config: PageConfig, 
    headerContent: string, 
    footerContent: string
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
                
                /* Target the scroll container inside PrintLayoutView */
                .print-layout-mode > div {
                    overflow: visible !important;
                    height: auto !important;
                    display: block !important;
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
                }
                
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
