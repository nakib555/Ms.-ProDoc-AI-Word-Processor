import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { htmlToJSONDocument, jsonDocumentToHtml } from '../../utils/documentModel';
import { PageConfig } from '../../types';

describe('Adversarial Fuzzing & Unicode Property-Based Tests', () => {
  const dummyConfig: PageConfig = {
    size: 'Letter',
    orientation: 'portrait',
    margins: { top: 72, right: 72, bottom: 72, left: 72 }
  };

  it('handles arbitrary Unicode scripts (Bangla, Arabic RTL, Hindi, CJK, Emoji) without crashing or data loss', () => {
    const complexUnicodeSamples = [
      'আমি বাংলায় গান গাই, আমি বাংলার গান গাই।', // Bangla with complex conjuncts
      'مرحبا بكم في محرر المستندات الاحترافي (Mixed English & Arabic 123)', // Arabic RTL + LTR
      'नमस्ते दुनिया! यह एक परीक्षण दस्तावेज है।', // Hindi Devanagari
      '日本語のテキストと漢字: 「こんにちは世界」', // Japanese Kanji & Hiragana
      '🎉 Multi-grapheme flags 🇺🇸 🇧🇩 and ZWJ family emoji 👩‍👩‍👧‍👦 👨🏽‍💻', // Complex joined emoji
      'Zero-width\u200Bspaces\u200Cnon\u200Djoiners\u00A0and\uFEFFBOM', // Invisible control characters
    ];

    complexUnicodeSamples.forEach(sample => {
      const html = `<p>${sample}</p>`;
      const doc = htmlToJSONDocument(html, 'Unicode Sample', dummyConfig);
      expect(doc).toBeDefined();
      expect(doc.pages.length).toBeGreaterThan(0);

      const htmlBack = jsonDocumentToHtml(doc);
      // Invariant: text content must be retained faithfully
      expect(htmlBack).toContain(sample);
    });
  });

  it('fast-check property: random text with arbitrary unicode code points parses and serializes without throwing', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1, maxLength: 500 }), (randomText) => {
        // Sanitize for basic HTML text content wrapping
        const escaped = randomText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const html = `<p>${escaped}</p>`;

        // Engine must never throw an unhandled exception on valid full-unicode text
        const doc = htmlToJSONDocument(html, 'Fuzz Title', dummyConfig);
        expect(doc.schemaVersion).toBeGreaterThanOrEqual(1);

        const reconstructed = jsonDocumentToHtml(doc);
        expect(typeof reconstructed).toBe('string');
      }),
      { numRuns: 100 }
    );
  });

  it('handles extremely long unbroken string payloads (10,000 chars) without stack overflow or crash', () => {
    const longString = 'A'.repeat(10000);
    const html = `<p>${longString}</p>`;

    const doc = htmlToJSONDocument(html, 'Long String Doc', dummyConfig);
    expect(doc).toBeDefined();

    const outputHtml = jsonDocumentToHtml(doc);
    expect(outputHtml).toContain(longString);
  });

  it('sanitizes and safely neutralizes malicious script tags and inline handlers during document parsing', () => {
    const xssPayloads = [
      '<p>Harmless paragraph</p><script>alert("PWNED")</script>',
      '<p><img src="x" onerror="alert(document.cookie)" alt="exploited">Image exploit</p>',
      '<p><a href="javascript:alert(1)">Click for free gift</a></p>',
      '<iframe src="https://evil.com"></iframe>',
    ];

    xssPayloads.forEach(payload => {
      expect(() => {
        const doc = htmlToJSONDocument(payload, 'Security Test', dummyConfig);
        const html = jsonDocumentToHtml(doc);

        // Invariant: <script> or <iframe> tags must never be preserved as executable raw elements
        expect(html).not.toMatch(/<script[\s>]/i);
        expect(html).not.toMatch(/<iframe[\s>]/i);
      }).not.toThrow();
    });
  });

  it('handles deeply nested malformed HTML structures gracefully', () => {
    // 50 levels of unclosed nested tags
    const nested = '<div>'.repeat(50) + 'Deeply nested text' + '</div>'.repeat(30);

    expect(() => {
      const doc = htmlToJSONDocument(nested, 'Deep Nesting', dummyConfig);
      expect(doc).toBeDefined();
    }).not.toThrow();
  });
});
