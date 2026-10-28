import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAutoSave } from '../../hooks/useAutoSave';
import { PageConfig } from '../../types';

describe('Document Persistence & Auto-Save Integration', () => {
  const dummyConfig: PageConfig = {
    size: 'Letter',
    orientation: 'portrait',
    margins: { top: 72, right: 72, bottom: 72, left: 72 }
  };

  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debounces auto-save operations and updates localStorage after delay', () => {
    const { result } = renderHook(() => useAutoSave());

    expect(result.current.saveStatus).toBe('saved');

    // Trigger auto-save
    act(() => {
      result.current.triggerAutoSave('Quarterly Report', '<p>Confidential numbers</p>', dummyConfig);
    });

    expect(result.current.saveStatus).toBe('unsaved');

    // Fast-forward 1500ms debounce
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.saveStatus).toBe('saving');

    // Fast-forward final status update
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.saveStatus).toBe('saved');

    // Verify localStorage has the document
    const savedDocs = JSON.parse(localStorage.getItem('saved_documents') || '{}');
    expect(savedDocs['Quarterly Report']).toBeDefined();
    expect(savedDocs['Quarterly Report'].content).toBe('<p>Confidential numbers</p>');
    expect(savedDocs['Quarterly Report'].documentModel).toBeDefined();

    // Verify recents list updated
    const recents = JSON.parse(localStorage.getItem('recent_documents') || '[]');
    expect(recents.some((r: any) => r.name === 'Quarterly Report')).toBe(true);
  });

  it('handles immediate manualSave without waiting for debounce timer', () => {
    const { result } = renderHook(() => useAutoSave());

    act(() => {
      result.current.manualSave('Immediate Doc', '<p>Instant save test</p>', dummyConfig);
    });

    const savedDocs = JSON.parse(localStorage.getItem('saved_documents') || '{}');
    expect(savedDocs['Immediate Doc']).toBeDefined();
    expect(savedDocs['Immediate Doc'].content).toBe('<p>Instant save test</p>');
  });

  it('gracefully handles corrupted localStorage content on save without crashing', () => {
    // Inject corrupt JSON into storage
    localStorage.setItem('saved_documents', '{"invalid_json: ... corrupt');

    const { result } = renderHook(() => useAutoSave());

    expect(() => {
      act(() => {
        result.current.manualSave('Recovery Doc', '<p>Safe fallback</p>', dummyConfig);
      });
    }).not.toThrow();
  });

  it('recovers from storage quota errors safely', () => {
    // Mock setItem to throw QuotaExceededError
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = vi.fn().mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    const { result } = renderHook(() => useAutoSave());

    expect(() => {
      act(() => {
        result.current.manualSave('Large Doc', '<p>Gigantic content</p>', dummyConfig);
      });
    }).not.toThrow();

    localStorage.setItem = originalSetItem;
  });
});
