import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { GhostPage } from '../../components/ui/GhostPage';

const mockConfig = {
  size: 'Letter',
  orientation: 'portrait' as const,
  margins: { top: 1, bottom: 1, left: 1, right: 1 }
};

describe('GhostPage Component', () => {
  it('renders document-accurate skeleton with page number and total pages', () => {
    const { container, getByText } = render(
      <GhostPage
        pageNumber={42}
        totalPages={1000}
        config={mockConfig}
        zoom={100}
      />
    );

    // Verify page number indicator badge
    expect(getByText(/Page 42 of 1000/i)).toBeDefined();

    // Verify root container has prodoc-ghost-page class and aria-hidden
    const ghostEl = container.querySelector('.prodoc-ghost-page');
    expect(ghostEl).not.toBeNull();
    expect(ghostEl?.getAttribute('aria-hidden')).toBe('true');

    // Verify shimmer sweep element exists
    const shimmerEl = container.querySelector('.ghost-shimmer-sweep');
    expect(shimmerEl).not.toBeNull();
  });

  it('adapts scale proportionally with zoom factor', () => {
    const { container } = render(
      <GhostPage
        pageNumber={1}
        totalPages={10}
        config={mockConfig}
        zoom={150}
      />
    );

    const sheet = container.querySelector('.prodoc-page-sheet') as HTMLElement;
    expect(sheet).not.toBeNull();
    expect(sheet.style.transform).toBe('scale(1.5)');
  });
});
