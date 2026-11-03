import { describe, it, expect, vi } from 'vitest';
import { 
  mapFontFamily, 
  mapFontStyle, 
  parseCssColor, 
  generateVectorPdfFromPages, 
  renderVectorPage 
} from '../../utils/vectorPdfEngine';
import { PageConfig } from '../../types';
import { jsPDF } from 'jspdf';
import { getPhysicalDimensions } from '../../utils/measurement';

describe('MS Word-Grade Pure Vector PDF Engine', () => {
  const baseConfig: PageConfig = {
    size: 'A4',
    orientation: 'portrait',
    margins: { top: 1, bottom: 1, left: 1, right: 1, gutter: 0 },
    marginPreset: 'normal',
    background: 'none',
    headerDistance: 0.5,
    footerDistance: 0.5,
    verticalAlign: 'top',
  };

  describe('CSS Color and Typography Mapping', () => {
    it('correctly parses hex, rgb, rgba, and named colors', () => {
      expect(parseCssColor('#ffffff')).toEqual({ r: 255, g: 255, b: 255, a: 1 });
      expect(parseCssColor('#000000')).toEqual({ r: 0, g: 0, b: 0, a: 1 });
      expect(parseCssColor('#3b82f6')).toEqual({ r: 59, g: 130, b: 246, a: 1 });
      expect(parseCssColor('rgb(100, 150, 200)')).toEqual({ r: 100, g: 150, b: 200, a: 1 });
      expect(parseCssColor('rgba(100, 150, 200, 0.8)')).toEqual({ r: 100, g: 150, b: 200, a: 0.8 });
      expect(parseCssColor('transparent')).toBeNull();
      expect(parseCssColor('rgba(0, 0, 0, 0)')).toBeNull();
    });

    it('maps font families to standard PDF Type 1 / vector font representations', () => {
      expect(mapFontFamily('Calibri, Inter, sans-serif')).toBe('helvetica');
      expect(mapFontFamily('Times New Roman, Georgia, serif')).toBe('times');
      expect(mapFontFamily('Courier New, monospace, Consolas')).toBe('courier');
    });

    it('maps font weights and styles to PDF standard variants', () => {
      expect(mapFontStyle('normal', 'normal')).toBe('normal');
      expect(mapFontStyle('bold', 'normal')).toBe('bold');
      expect(mapFontStyle(700, 'normal')).toBe('bold');
      expect(mapFontStyle(400, 'italic')).toBe('italic');
      expect(mapFontStyle(800, 'italic')).toBe('bolditalic');
    });
  });

  describe('Physical Page Sizing and Geometry', () => {
    it('generates exact ISO 216 dimensions matching MS Word A4 format', () => {
      const phys = getPhysicalDimensions('A4', 'portrait');
      const widthPt = phys.widthInches * 72;
      const heightPt = phys.heightInches * 72;

      expect(widthPt).toBeCloseTo(595.28, 1);
      expect(heightPt).toBeCloseTo(841.89, 1);
    });

    it('generates exact US Letter physical dimensions', () => {
      const phys = getPhysicalDimensions('Letter', 'portrait');
      const widthPt = phys.widthInches * 72;
      const heightPt = phys.heightInches * 72;

      expect(widthPt).toBe(612); // 8.5 * 72
      expect(heightPt).toBe(792); // 11 * 72
    });
  });

  describe('DOM-to-Vector PDF Generation', () => {
    it('creates vector pages with headers, footers, and body content without html2canvas rasterization', async () => {
      const container = document.createElement('div');
      container.className = 'prodoc-print-page-wrapper';
      container.style.width = '8.27in';
      container.style.height = '11.69in';

      const header = document.createElement('div');
      header.className = 'prodoc-print-header';
      header.textContent = 'Confidential Report';
      container.appendChild(header);

      const body = document.createElement('div');
      body.className = 'prodoc-print-body';
      body.innerHTML = `
        <h1>Quarterly Business Review</h1>
        <p>This is a pure vector paragraph with crisp typography.</p>
        <table style="width: 100%; border: 1px solid #000;">
          <tr>
            <th style="border: 1px solid #000; background-color: #f1f5f9;">Category</th>
            <th style="border: 1px solid #000; background-color: #f1f5f9;">Score</th>
          </tr>
          <tr>
            <td style="border: 1px solid #000;">Performance</td>
            <td style="border: 1px solid #000;">100%</td>
          </tr>
        </table>
      `;
      container.appendChild(body);

      const footer = document.createElement('div');
      footer.className = 'prodoc-print-footer';
      footer.textContent = 'Page 1 of 1';
      container.appendChild(footer);

      document.body.appendChild(container);

      const onProgress = vi.fn();
      const { pdf } = await generateVectorPdfFromPages([container], baseConfig, {
        documentTitle: 'Test_Vector_Doc',
        autoDownload: false,
        returnBlob: true,
        onProgress,
      });

      expect(typeof pdf.getNumberOfPages).toBe('function');
      expect(pdf.getNumberOfPages()).toBe(1);
      expect(onProgress).toHaveBeenCalledWith(100, 1, 1);

      document.body.removeChild(container);
    });

    it('renders watermark as vector text with rotation', async () => {
      const container = document.createElement('div');
      container.className = 'prodoc-print-page-wrapper';

      const configWithWatermark: PageConfig = {
        ...baseConfig,
        watermark: 'DRAFT',
      };

      const pdf = new jsPDF({ unit: 'pt', format: [595.28, 841.89] });
      const textSpy = vi.spyOn(pdf, 'text');

      await renderVectorPage(pdf, container, 595.28, 841.89, configWithWatermark, 0, 1);

      expect(textSpy).toHaveBeenCalledWith(
        'DRAFT',
        expect.any(Number),
        expect.any(Number),
        expect.objectContaining({ angle: -45, align: 'center' })
      );
    });

    it('correctly handles multi-page vector generation with progress updates', async () => {
      const page1 = document.createElement('div');
      page1.className = 'prodoc-print-page-wrapper';
      page1.innerHTML = '<div class="prodoc-print-body"><p>Page 1 Content</p></div>';

      const page2 = document.createElement('div');
      page2.className = 'prodoc-print-page-wrapper';
      page2.innerHTML = '<div class="prodoc-print-body"><p>Page 2 Content</p></div>';

      document.body.appendChild(page1);
      document.body.appendChild(page2);

      const progressHistory: number[] = [];
      const { pdf } = await generateVectorPdfFromPages([page1, page2], baseConfig, {
        documentTitle: 'MultiPage_Test',
        autoDownload: false,
        onProgress: (percent) => progressHistory.push(percent),
      });

      expect(pdf.getNumberOfPages()).toBe(2);
      expect(progressHistory).toContain(50);
      expect(progressHistory).toContain(100);

      document.body.removeChild(page1);
      document.body.removeChild(page2);
    });
  });
});
