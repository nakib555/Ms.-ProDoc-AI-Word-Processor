import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PageConfig } from '../types';
import { paginateContent } from './layoutEngine';
import { getPhysicalDimensions, inToMm } from './unitConversion';

export interface PdfExportProgress {
  current: number;
  total: number;
  stage: string;
  percent: number;
}

export interface PdfExportOptions {
  fileName?: string;
  config: PageConfig;
  headerContent?: string;
  footerContent?: string;
  firstHeaderContent?: string;
  firstFooterContent?: string;
  range?: 'all' | 'current' | 'custom';
  pages?: string;
  currentPage?: number;
  onProgress?: (progress: PdfExportProgress) => void;
}

/**
 * Creates a sandbox DOM element configured with exact physical paper dimensions
 * and styling matching Microsoft Word and ProDoc editor standards.
 */
function createPageSandbox(
  pageHtml: string,
  pageIndex: number,
  totalPages: number,
  config: PageConfig,
  headerContent: string,
  footerContent: string,
  firstHeaderContent: string,
  firstFooterContent: string,
  dims: { widthPt: number; heightPt: number; widthPx: number; heightPx: number; widthIn: number; heightIn: number }
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'prodoc-pdf-page-sandbox';

  // Apply physical dimensions in pixels (at 96 DPI base) for canvas rasterizer
  const widthPx = dims.widthPx;
  const heightPx = dims.heightPx;

  container.style.position = 'fixed';
  container.style.left = '-99999px';
  container.style.top = '0';
  container.style.width = `${widthPx}px`;
  container.style.height = `${heightPx}px`;
  container.style.backgroundColor = config.pageColor || '#ffffff';
  container.style.color = '#000000';
  container.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  container.style.boxSizing = 'border-box';
  container.style.overflow = 'hidden';
  container.style.zIndex = '-9999';

  // Margins in px (96 DPI)
  const margins = config.margins;
  const marginTopPx = Math.max(0, margins.top * 96);
  const marginBottomPx = Math.max(0, margins.bottom * 96);
  const marginLeftPx = Math.max(0, margins.left * 96);
  const marginRightPx = Math.max(0, margins.right * 96);

  container.style.paddingTop = `${marginTopPx}px`;
  container.style.paddingBottom = `${marginBottomPx}px`;
  container.style.paddingLeft = `${marginLeftPx}px`;
  container.style.paddingRight = `${marginRightPx}px`;

  // Determine active header / footer
  const isFirstPage = pageIndex === 0;
  const useDifferentFirst = config.differentFirstPage;

  let activeHeader = (useDifferentFirst && isFirstPage ? firstHeaderContent : headerContent) || '';
  let activeFooter = (useDifferentFirst && isFirstPage ? firstFooterContent : footerContent) || '';

  // Process dynamic page number tags
  activeHeader = activeHeader
    .replace(/\[Header\]/g, '')
    .replace(/\[Page \d+\]/g, `Page ${pageIndex + 1}`)
    .replace(/<span class="page-number-placeholder">.*?<\/span>/g, `${pageIndex + 1}`);

  activeFooter = activeFooter
    .replace(/\[Page \d+\]/g, `Page ${pageIndex + 1}`)
    .replace(/<span class="page-number-placeholder">.*?<\/span>/g, `${pageIndex + 1}`)
    .replace(/Page\s*#01/gi, `Page ${pageIndex + 1}`)
    .replace(/Page\s*\d+\s*of\s*\d+/gi, `Page ${pageIndex + 1} of ${totalPages}`);

  // Header element
  if (activeHeader.trim()) {
    const headerEl = document.createElement('div');
    headerEl.className = 'prodoc-pdf-header';
    headerEl.style.position = 'absolute';
    headerEl.style.top = '0';
    headerEl.style.left = '0';
    headerEl.style.right = '0';
    headerEl.style.height = `${marginTopPx}px`;
    headerEl.style.paddingTop = `${Math.min(config.headerDistance * 96, marginTopPx / 2)}px`;
    headerEl.style.paddingLeft = `${marginLeftPx}px`;
    headerEl.style.paddingRight = `${marginRightPx}px`;
    headerEl.style.fontSize = '10pt';
    headerEl.style.color = '#64748b';
    headerEl.style.overflow = 'hidden';
    headerEl.innerHTML = activeHeader;
    container.appendChild(headerEl);
  }

  // Body content wrapper
  const bodyEl = document.createElement('div');
  bodyEl.className = 'prodoc-pdf-body';
  bodyEl.style.width = '100%';
  bodyEl.style.height = '100%';
  bodyEl.style.overflow = 'hidden';
  bodyEl.style.lineHeight = '1.6';
  bodyEl.style.fontSize = '11pt';
  bodyEl.innerHTML = pageHtml;

  // Enhance tables for print / PDF output (ensure crisp borders and proper cell padding)
  const tables = bodyEl.querySelectorAll('table');
  tables.forEach((table) => {
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.pageBreakInside = 'avoid';
    const cells = table.querySelectorAll('td, th');
    cells.forEach((cell) => {
      const c = cell as HTMLElement;
      if (!c.style.padding) c.style.padding = '6px 10px';
      if (!c.style.borderColor) c.style.borderColor = '#cbd5e1';
    });
  });

  container.appendChild(bodyEl);

  // Footer element
  if (activeFooter.trim()) {
    const footerEl = document.createElement('div');
    footerEl.className = 'prodoc-pdf-footer';
    footerEl.style.position = 'absolute';
    footerEl.style.bottom = '0';
    footerEl.style.left = '0';
    footerEl.style.right = '0';
    footerEl.style.height = `${marginBottomPx}px`;
    footerEl.style.paddingBottom = `${Math.min(config.footerDistance * 96, marginBottomPx / 2)}px`;
    footerEl.style.paddingLeft = `${marginLeftPx}px`;
    footerEl.style.paddingRight = `${marginRightPx}px`;
    footerEl.style.fontSize = '10pt';
    footerEl.style.color = '#64748b';
    footerEl.style.display = 'flex';
    footerEl.style.flexDirection = 'column';
    footerEl.style.justifyContent = 'flex-end';
    footerEl.style.overflow = 'hidden';
    footerEl.innerHTML = activeFooter;
    container.appendChild(footerEl);
  }

  return container;
}

/**
 * Parses user-specified page range string (e.g., "1-3, 5")
 */
function parsePageRange(rangeStr: string, totalPages: number): number[] {
  const result = new Set<number>();
  const parts = rangeStr.split(',').map((p) => p.trim());
  for (const part of parts) {
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-').map((s) => parseInt(s.trim(), 10));
      if (!isNaN(startStr) && !isNaN(endStr)) {
        const start = Math.max(1, startStr);
        const end = Math.min(totalPages, endStr);
        for (let i = start; i <= end; i++) {
          result.add(i - 1);
        }
      }
    } else {
      const p = parseInt(part, 10);
      if (!isNaN(p) && p >= 1 && p <= totalPages) {
        result.add(p - 1);
      }
    }
  }
  return Array.from(result).sort((a, b) => a - b);
}

/**
 * Primary Client-Side PDF Generation Engine.
 * 
 * Generates an accurate, physical-dimensioned PDF directly without opening the browser's print dialog.
 * Supports A4 (595.28 x 841.89 pt), A5, Letter, Legal, and custom sizes.
 */
export async function generateDocumentPdf(
  rawContent: string,
  options: PdfExportOptions
): Promise<Blob> {
  const {
    config,
    headerContent = '',
    footerContent = '',
    firstHeaderContent = '',
    firstFooterContent = '',
    range = 'all',
    pages: rangePagesStr,
    currentPage = 1,
    onProgress
  } = options;

  onProgress?.({ current: 0, total: 100, stage: 'Paginating document...', percent: 5 });

  // 1. Paginate content using ProDoc layout engine
  const paginatedResult = paginateContent(rawContent, config);
  const allPages = paginatedResult.pages;
  const totalDocPages = allPages.length;

  if (totalDocPages === 0) {
    throw new Error('Cannot export empty document to PDF.');
  }

  // 2. Determine target pages to render
  let targetIndices: number[] = [];
  if (range === 'current') {
    const curIdx = Math.max(0, Math.min(totalDocPages - 1, currentPage - 1));
    targetIndices = [curIdx];
  } else if (range === 'custom' && rangePagesStr) {
    targetIndices = parsePageRange(rangePagesStr, totalDocPages);
    if (targetIndices.length === 0) {
      targetIndices = allPages.map((_, i) => i);
    }
  } else {
    targetIndices = allPages.map((_, i) => i);
  }

  // 3. Compute exact physical dimensions
  let customWidthMm: number | undefined;
  let customHeightMm: number | undefined;

  if (config.size === 'Custom' && config.customWidth && config.customHeight) {
    const isMm = config.customWidth > 50;
    customWidthMm = isMm ? config.customWidth : inToMm(config.customWidth);
    customHeightMm = isMm ? config.customHeight : inToMm(config.customHeight);
  }

  const dims = getPhysicalDimensions(
    config.size as string,
    config.orientation,
    customWidthMm,
    customHeightMm
  );

  // 4. Initialize jsPDF instance with exact points format
  // For A4: widthPt = 595.28 pt, heightPt = 841.89 pt
  const pdf = new jsPDF({
    orientation: config.orientation,
    unit: 'pt',
    format: [dims.widthPt, dims.heightPt],
    compress: true
  });

  const totalPagesToRender = targetIndices.length;

  for (let i = 0; i < totalPagesToRender; i++) {
    const pageIndex = targetIndices[i];
    const pageData = allPages[pageIndex];

    const currentStep = i + 1;
    const progressPercent = Math.round(10 + (currentStep / totalPagesToRender) * 80);
    onProgress?.({
      current: currentStep,
      total: totalPagesToRender,
      stage: `Rendering Page ${currentStep} of ${totalPagesToRender}...`,
      percent: progressPercent
    });

    // Create isolated sandbox element for this page
    const sandbox = createPageSandbox(
      pageData.html,
      pageIndex,
      totalDocPages,
      config,
      headerContent,
      footerContent,
      firstHeaderContent,
      firstFooterContent,
      dims
    );

    document.body.appendChild(sandbox);

    try {
      // Rasterize with html2canvas at scale 2 (192 DPI) for crisp high-resolution typography and borders
      const canvas = await html2canvas(sandbox, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: config.pageColor || '#ffffff',
        windowWidth: dims.widthPx,
        windowHeight: dims.heightPx
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (i > 0) {
        pdf.addPage([dims.widthPt, dims.heightPt], config.orientation);
      }

      // Place raster image exactly onto the page points
      pdf.addImage(imgData, 'JPEG', 0, 0, dims.widthPt, dims.heightPt, undefined, 'FAST');

      // Add selectable text overlay extracted from DOM nodes
      // This provides copy/paste and searchability inside PDF viewers while maintaining 100% visual fidelity
      const walker = document.createTreeWalker(sandbox, NodeFilter.SHOW_TEXT);
      let textNode: Node | null = walker.nextNode();

      const sandboxRect = sandbox.getBoundingClientRect();
      const scaleX = dims.widthPt / dims.widthPx;
      const scaleY = dims.heightPt / dims.heightPx;

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);

      while (textNode) {
        const textVal = textNode.nodeValue?.trim();
        if (textVal && textVal.length > 0 && textNode.parentElement) {
          const range = document.createRange();
          range.selectNodeContents(textNode);
          const rect = range.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            const relX = (rect.left - sandboxRect.left) * scaleX;
            const relY = (rect.top - sandboxRect.top + rect.height * 0.8) * scaleY;
            if (relX >= 0 && relX <= dims.widthPt && relY >= 0 && relY <= dims.heightPt) {
              try {
                // Render text invisibly so user can select and search without disturbing visuals
                pdf.text(textVal, relX, relY, {
                  renderingMode: 'invisible',
                  maxWidth: rect.width * scaleX
                });
              } catch {
                // If special characters fail invisible encoding, omit safely
              }
            }
          }
        }
        textNode = walker.nextNode();
      }
    } finally {
      if (sandbox.parentElement) {
        sandbox.parentElement.removeChild(sandbox);
      }
    }
  }

  onProgress?.({
    current: totalPagesToRender,
    total: totalPagesToRender,
    stage: 'Finalizing PDF output...',
    percent: 95
  });

  const blob = pdf.output('blob');

  onProgress?.({
    current: totalPagesToRender,
    total: totalPagesToRender,
    stage: 'Completed',
    percent: 100
  });

  return blob;
}

/**
 * Direct file download trigger for generated PDF
 */
export async function downloadDocumentPdf(
  rawContent: string,
  fileName: string,
  options: PdfExportOptions
): Promise<void> {
  const blob = await generateDocumentPdf(rawContent, options);
  const cleanName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = cleanName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
