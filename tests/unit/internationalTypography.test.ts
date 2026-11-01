import { describe, it, expect, beforeEach } from 'vitest';
import { TypographyEngine } from '../../utils/typographyEngine';
import { paginateContent } from '../../utils/layoutEngine';
import { PageConfig } from '../../types';

describe('International Typography: Bengali, Arabic, English & Mixed Scripts', () => {
  const standardConfig: PageConfig = {
    size: 'A4',
    orientation: 'portrait',
    margins: { top: 1, bottom: 1, left: 1, right: 1, gutter: 0 },
    marginPreset: 'normal',
    background: 'none',
    headerDistance: 0.5,
    footerDistance: 0.5,
    verticalAlign: 'top',
  };

  beforeEach(() => {
    TypographyEngine.clearCaches();
  });

  it('accurately detects complex scripts requiring native DOM shaping', () => {
    // English Latin (simple)
    expect(TypographyEngine.isComplexScript('Hello world, this is a standard Latin string.')).toBe(false);

    // Bengali (complex Brahmic script with ligatures and conjuncts)
    expect(TypographyEngine.isComplexScript('আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।')).toBe(true);

    // Arabic (complex bidirectional cursive script)
    expect(TypographyEngine.isComplexScript('مرحبا بكم في محرر المستندات')).toBe(true);

    // Mixed English and Bengali
    expect(TypographyEngine.isComplexScript('Chapter 1: বাংলা সাহিত্যের ইতিহাস')).toBe(true);
  });

  it('paginates Bengali complex script text cleanly without character truncation or errors', () => {
    const bengaliHtml = `
      <h1>বাংলা সাহিত্যের ইতিবৃত্ত</h1>
      <p>বাংলা ভাষা ও সাহিত্যের ইতিহাস অত্যন্ত প্রাচীন ও সমৃদ্ধ। চর্যাপদ থেকে শুরু করে মধ্যযুগের মঙ্গলকাব্য এবং আধুনিক যুগের রবীন্দ্র-নজরুল সাহিত্য এক বিশাল ঐতিহ্য বহন করে।</p>
      <p>যুক্তাক্ষর ও যুক্তবর্ণের নির্ভুল বিন্যাস যেমন: ক্ষ, জ্ঞ, ষ্ণ, ঙ্গ, ঞ্ছ ইত্যাদি যেকোনো উচ্চমানের ডকুমেন্ট সম্পাদকের অন্যতম প্রধান বৈশিষ্ট্য।</p>
    `;

    const result = paginateContent(bengaliHtml, standardConfig);
    expect(result.pages.length).toBeGreaterThanOrEqual(1);
    expect(result.pages[0].html).toContain('বাংলা সাহিত্যের ইতিবৃত্ত');
    expect(result.pages[0].html).toContain('যুক্তাক্ষর ও যুক্তবর্ণের নির্ভুল বিন্যাস');
  });

  it('handles bidirectional Arabic text with dir="rtl" attributes intact', () => {
    const arabicHtml = `
      <div dir="rtl" style="text-align: right;">
        <h1>دليل المستخدم لمحرر النصوص</h1>
        <p>يدعم هذا النظام الكتابة باللغة العربية مع مراعاة اتجاه النص والتشكيل والخطوط المخصصة.</p>
      </div>
    `;

    const result = paginateContent(arabicHtml, standardConfig);
    expect(result.pages.length).toBeGreaterThanOrEqual(1);
    expect(result.pages[0].html).toContain('dir="rtl"');
    expect(result.pages[0].html).toContain('دليل المستخدم لمحرر النصوص');
  });

  it('flows mixed-language English and Bengali content across page breaks', () => {
    const mixedParts: string[] = [];
    for (let i = 1; i <= 45; i++) {
      mixedParts.push(
        `<p>Section ${i}: বাংলা ডকুমেন্ট প্যারাগ্রাফ নম্বর ${i} - Comprehensive multi-page bilingual text shaping and pagination test.</p>`
      );
    }
    const html = mixedParts.join('\n');

    const result = paginateContent(html, standardConfig);
    expect(result.pages.length).toBeGreaterThanOrEqual(2);
    // Page 1 and Page 2 both preserve bilingual characters
    expect(result.pages[0].html).toContain('বাংলা ডকুমেন্ট প্যারাগ্রাফ');
    expect(result.pages[1].html).toContain('বাংলা ডকুমেন্ট প্যারাগ্রাফ');
  });
});
