
import { PageConfig } from '../types';
import { PAGE_SIZES } from '../constants';

export interface PrintOptions {
    range: 'all' | 'current' | 'custom';
    pages?: string;
    currentPage?: number;
    batchPrintContainerId?: string;
}

import { PageConfig } from '../types';
import { PAGE_SIZES } from '../constants';
import { paginateContent } from './layoutEngine';

export interface PrintOptions {
    range: 'all' | 'current' | 'custom';
    pages?: string;
    currentPage?: number;
    batchPrintContainerId?: string;
}

export const generatePdfPrint = (
    content: string, 
    config: PageConfig, 
    headerContent: string, 
    footerContent: string,
    options: PrintOptions = { range: 'all' }
): Promise<void> => {
    return new Promise((resolve, reject) => {
        let portalEl: HTMLDivElement | null = null;
        let styleEl: HTMLStyleElement | null = null;

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

        // Determine which pages to render
        const paginated = paginateContent(content, config);
        const allPages = paginated.pages;
        const totalPages = allPages.length;

        const pagesToInclude: number[] = []; // 0-indexed
        if (options.range === 'current' && options.currentPage !== undefined) {
            const pIdx = options.currentPage - 1;
            if (pIdx >= 0 && pIdx < totalPages) pagesToInclude.push(pIdx);
        } else if (options.range === 'custom' && options.pages) {
            const parts = options.pages.split(',').map(p => p.trim());
            parts.forEach(part => {
                if (part.includes('-')) {
                    const [start, end] = part.split('-').map(n => parseInt(n, 10));
                    if (!isNaN(start) && !isNaN(end)) {
                        for (let i = start; i <= end; i++) {
                            if (i >= 1 && i <= totalPages) pagesToInclude.push(i - 1);
                        }
                    }
                } else {
                    const page = parseInt(part, 10);
                    if (!isNaN(page) && page >= 1 && page <= totalPages) {
                        pagesToInclude.push(page - 1);
                    }
                }
            });
        } else {
            // 'all'
            for (let i = 0; i < totalPages; i++) {
                pagesToInclude.push(i);
            }
        }

        if (pagesToInclude.length === 0) {
            for (let i = 0; i < totalPages; i++) pagesToInclude.push(i);
        }

        // Mount a dedicated offscreen print portal containing the exact vector pages
        portalEl = document.createElement('div');
        portalEl.id = 'prodoc-print-render-portal';
        portalEl.style.position = 'absolute';
        portalEl.style.left = '0';
        portalEl.style.top = '0';
        portalEl.style.width = '100%';
        portalEl.style.zIndex = '99999';
        portalEl.style.background = '#ffffff';

        // Render target pages
        pagesToInclude.forEach((pIdx) => {
            const pageData = allPages[pIdx];
            const pNum = pIdx + 1;
            const pConfig = pageData.config || config;
            const pMargins = pConfig.margins || margins;

            const pageWrapper = document.createElement('div');
            pageWrapper.className = 'prodoc-print-page-wrapper';
            pageWrapper.setAttribute('data-page-number', String(pNum));
            pageWrapper.style.boxSizing = 'border-box';
            pageWrapper.style.width = `${widthIn}in`;
            pageWrapper.style.minHeight = `${heightIn}in`;
            pageWrapper.style.height = `${heightIn}in`;
            pageWrapper.style.pageBreakAfter = 'always';
            pageWrapper.style.breakAfter = 'page';
            pageWrapper.style.padding = `${pMargins.top}in ${pMargins.right}in ${pMargins.bottom}in ${pMargins.left}in`;
            pageWrapper.style.position = 'relative';
            pageWrapper.style.background = '#ffffff';
            pageWrapper.style.color = '#000000';
            pageWrapper.style.fontFamily = 'Calibri, Inter, sans-serif';
            pageWrapper.style.overflow = 'hidden';

            // Optional Header
            if (headerContent && (!pConfig.differentFirstPage || pNum > 1)) {
                const headerDiv = document.createElement('div');
                headerDiv.className = 'prodoc-print-header';
                headerDiv.style.position = 'absolute';
                headerDiv.style.top = `${pConfig.headerDistance || 0.4}in`;
                headerDiv.style.left = `${pMargins.left}in`;
                headerDiv.style.right = `${pMargins.right}in`;
                headerDiv.style.fontSize = '9pt';
                headerDiv.style.color = '#64748b';
                headerDiv.innerHTML = headerContent;
                pageWrapper.appendChild(headerDiv);
            }

            // Body Content
            const bodyDiv = document.createElement('div');
            bodyDiv.className = 'prodoc-editor prodoc-print-body';
            bodyDiv.style.width = '100%';
            bodyDiv.style.height = '100%';
            bodyDiv.style.color = '#000000';
            bodyDiv.style.backgroundColor = 'transparent';
            bodyDiv.style.lineHeight = '1.35';
            bodyDiv.style.fontSize = '11pt';
            bodyDiv.innerHTML = pageData.html;
            pageWrapper.appendChild(bodyDiv);

            // Optional Footer
            const footerDiv = document.createElement('div');
            footerDiv.className = 'prodoc-print-footer';
            footerDiv.style.position = 'absolute';
            footerDiv.style.bottom = `${pConfig.footerDistance || 0.4}in`;
            footerDiv.style.left = `${pMargins.left}in`;
            footerDiv.style.right = `${pMargins.right}in`;
            footerDiv.style.fontSize = '9pt';
            footerDiv.style.color = '#64748b';
            footerDiv.style.display = 'flex';
            footerDiv.style.justifyContent = 'space-between';
            footerDiv.style.alignItems = 'center';

            let footerHtml = footerContent || '';
            footerHtml = footerHtml.replace(/#pageNumber/g, String(pNum)).replace(/#totalPages/g, String(totalPages));
            footerDiv.innerHTML = footerHtml || `<span style="margin-left: auto;">Page ${pNum} of ${totalPages}</span>`;
            pageWrapper.appendChild(footerDiv);

            portalEl.appendChild(pageWrapper);
        });

        document.body.appendChild(portalEl);

        // Inject print-specific styles targeting only the print portal
        styleEl = document.createElement('style');
        styleEl.id = 'native-print-style';
        styleEl.innerHTML = `
            @page {
                size: ${sizeCss};
                margin: 0;
            }
            
            @media screen {
                #prodoc-print-render-portal {
                    display: none !important;
                }
            }

            @media print {
                html, body {
                    background: white !important;
                    color: black !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }

                body > * {
                    display: none !important;
                }

                body > #prodoc-print-render-portal {
                    display: block !important;
                    position: static !important;
                    width: 100% !important;
                    height: auto !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }

                .prodoc-print-page-wrapper {
                    display: block !important;
                    width: ${widthIn}in !important;
                    height: ${heightIn}in !important;
                    page-break-after: always !important;
                    break-after: page !important;
                    box-sizing: border-box !important;
                    overflow: hidden !important;
                    background: white !important;
                    color: black !important;
                }

                .prodoc-editor, .prodoc-editor * {
                    color: black !important;
                    background-color: transparent !important;
                    text-shadow: none !important;
                    box-shadow: none !important;
                }

                img, svg {
                    max-width: 100% !important;
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
            }
        `;

        const existingStyle = document.getElementById('native-print-style');
        if (existingStyle) existingStyle.remove();
        document.head.appendChild(styleEl);

        // Allow microtask to ensure elements and styles are mounted
        setTimeout(() => {
            try {
                window.print();
            } finally {
                resolve();
            }

            // Safe cleanup
            setTimeout(() => {
                if (portalEl && portalEl.parentNode) portalEl.parentNode.removeChild(portalEl);
                if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
            }, 500);
        }, 150);

    } catch (e) {
        console.error("Print Error:", e);
        if (portalEl && portalEl.parentNode) portalEl.parentNode.removeChild(portalEl);
        if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
        alert("Failed to print document. Please try again.");
        reject(e);
    }
  });
};


