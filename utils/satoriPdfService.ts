
import satori from 'satori';
import { html } from 'satori-html';
import { jsPDF } from 'jspdf';
import { svg2pdf } from 'svg2pdf.js';
import { PageConfig } from '../types';
import { PAGE_SIZES } from '../constants';

// Load fonts for Satori (Inter)
const loadFonts = async () => {
    const regular = await fetch('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.18/files/inter-latin-400-normal.woff').then(res => res.arrayBuffer());
    const bold = await fetch('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.18/files/inter-latin-700-normal.woff').then(res => res.arrayBuffer());
    return [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: bold, weight: 700, style: 'normal' },
    ];
};

export const generateVectorPdf = async (
    pages: { html: string; config: PageConfig }[],
    documentTitle: string,
    onProgress?: (msg: string) => void
) => {
    try {
        if (onProgress) onProgress("Loading fonts...");
        // Load fonts once
        const fonts = await loadFonts();

        // Initialize PDF
        // We use the config of the first page to determine initial orientation, 
        // but we will add pages dynamically.
        const firstPage = pages[0].config;
        const orientation = firstPage.orientation === 'landscape' ? 'l' : 'p';
        const format = firstPage.size === 'Custom' 
            ? [firstPage.customWidth || 8.5, firstPage.customHeight || 11] 
            : firstPage.size.toLowerCase();

        const doc = new jsPDF({
            orientation: orientation,
            unit: 'in',
            format: format
        });

        // We delete the initial page because we'll add pages in the loop with specific dimensions
        doc.deletePage(1);

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            if (onProgress) onProgress(`Rendering page ${i + 1} of ${pages.length}...`);

            const config = page.config;
            const isLandscape = config.orientation === 'landscape';

            // Determine dimensions in pixels (Satori works in px)
            // 96 DPI is standard for screen/web metrics
            let widthPx = 0;
            let heightPx = 0;
            let widthIn = 0;
            let heightIn = 0;

            if (config.size === 'Custom' && config.customWidth && config.customHeight) {
                widthIn = config.customWidth;
                heightIn = config.customHeight;
            } else {
                const base = PAGE_SIZES[config.size as string] || PAGE_SIZES['Letter'];
                widthIn = base.width / 96;
                heightIn = base.height / 96;
            }

            if (isLandscape) {
                [widthIn, heightIn] = [heightIn, widthIn];
            }
            
            widthPx = widthIn * 96;
            heightPx = heightIn * 96;

            // Prepare Content for Satori
            // We wrap it in a div that mimics the page structure
            // Satori supports flexbox mostly. We try to map block layout to flex-col.
            
            // Margins
            const mt = config.margins.top * 96;
            const mb = config.margins.bottom * 96;
            const ml = config.margins.left * 96;
            const mr = config.margins.right * 96;
            const gutter = (config.margins.gutter || 0) * 96;
            
            const effectiveMl = ml + (config.gutterPosition === 'left' ? gutter : 0);
            const effectiveMt = mt + (config.gutterPosition === 'top' ? gutter : 0);

            // Clean content for Satori (Satori is strict about some HTML/CSS)
            // We use satori-html to convert string -> VNode
            
            const contentHtml = `
                <div style="display: flex; flex-direction: column; width: 100%; height: 100%; bg-white;">
                    <div style="display: flex; flex-direction: column; flex: 1; padding: ${effectiveMt}px ${mr}px ${mb}px ${effectiveMl}px;">
                        ${page.html}
                    </div>
                </div>
            `;

            // Convert to Satori VDOM
            // @ts-ignore
            const vdom = html(contentHtml);

            // Generate SVG
            const svgString = await satori(vdom, {
                width: widthPx,
                height: heightPx,
                fonts: fonts as any,
                // Debug: false
            });

            // Add new page to PDF
            doc.addPage([widthIn, heightIn], isLandscape ? 'l' : 'p');

            // Render SVG into PDF
            // svg2pdf expects a DOM element
            const parser = new DOMParser();
            const svgElement = parser.parseFromString(svgString, "image/svg+xml").documentElement;

            await svg2pdf(svgElement as any, doc, {
                x: 0,
                y: 0,
                width: widthIn,
                height: heightIn,
            });
        }

        if (onProgress) onProgress("Saving PDF...");
        doc.save(`${documentTitle || 'document'}.pdf`);

    } catch (error) {
        console.error("Vector PDF Generation Failed:", error);
        throw error;
    }
};
