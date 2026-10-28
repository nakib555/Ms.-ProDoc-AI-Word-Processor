import { vi } from 'vitest';

// Polyfill window.speechSynthesis for audio testing
if (typeof window !== 'undefined') {
  if (!('speechSynthesis' in window)) {
    (window as any).speechSynthesis = {
      speak: vi.fn(),
      cancel: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
      getVoices: vi.fn().mockReturnValue([]),
    };
  }

  if (!('SpeechSynthesisUtterance' in window)) {
    (window as any).SpeechSynthesisUtterance = class {
      text: string;
      rate: number = 1.0;
      pitch: number = 1.0;
      lang: string = 'en-US';
      onend: (() => void) | null = null;
      onerror: ((e: any) => void) | null = null;
      constructor(text: string = '') {
        this.text = text;
      }
    };
  }

  // ResizeObserver mock
  if (!('ResizeObserver' in window)) {
    (window as any).ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
}
