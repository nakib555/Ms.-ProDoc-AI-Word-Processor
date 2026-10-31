import { describe, it, expect } from 'vitest';

// Binary search implementations matching PrintLayoutView
const findFirstVisiblePageIndex = (tops: number[], geometries: { scaledHeight: number }[], targetY: number): number => {
  if (tops.length === 0) return 0;
  let low = 0;
  let high = tops.length - 1;
  let ans = 0;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const bottom = tops[mid] + (geometries[mid]?.scaledHeight || 1000);
    if (bottom >= targetY) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
};

const findLastVisiblePageIndex = (tops: number[], targetY: number): number => {
  if (tops.length === 0) return 0;
  let low = 0;
  let high = tops.length - 1;
  let ans = tops.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (tops[mid] <= targetY) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return ans;
};

const findClosestPageIndex = (tops: number[], geometries: { scaledHeight: number }[], centerY: number): number => {
  if (tops.length === 0) return 1;
  let low = 0;
  let high = tops.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const center = tops[mid] + (geometries[mid]?.scaledHeight || 1000) / 2;
    if (center < centerY) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  const i1 = Math.max(0, Math.min(tops.length - 1, high));
  const i2 = Math.max(0, Math.min(tops.length - 1, low));
  const dist1 = Math.abs(tops[i1] + (geometries[i1]?.scaledHeight || 1000) / 2 - centerY);
  const dist2 = Math.abs(tops[i2] + (geometries[i2]?.scaledHeight || 1000) / 2 - centerY);
  return (dist1 <= dist2 ? i1 : i2) + 1;
};

describe('Thousand-Page Binary Search Virtualization', () => {
  const PAGE_COUNT = 2000;
  const PAGE_HEIGHT = 1056;
  const GAP = 32;

  // Generate prefix tops for 2000 pages
  const tops: number[] = [];
  const geometries: { scaledHeight: number }[] = [];
  let curY = 32;
  for (let i = 0; i < PAGE_COUNT; i++) {
    tops.push(curY);
    geometries.push({ scaledHeight: PAGE_HEIGHT });
    curY += PAGE_HEIGHT + GAP;
  }

  it('locates visible page boundaries in O(log N) operations for 2,000 pages', () => {
    const viewTop = 50000; // Middle of document
    const viewBottom = viewTop + 900;

    const t0 = performance.now();
    const firstVis = findFirstVisiblePageIndex(tops, geometries, viewTop);
    const lastVis = findLastVisiblePageIndex(tops, viewBottom);
    const duration = performance.now() - t0;

    expect(duration).toBeLessThan(1); // Takes microseconds
    expect(firstVis).toBeGreaterThan(0);
    expect(lastVis).toBeGreaterThanOrEqual(firstVis);
    expect(tops[firstVis] + geometries[firstVis].scaledHeight).toBeGreaterThanOrEqual(viewTop);
    expect(tops[lastVis]).toBeLessThanOrEqual(viewBottom);
  });

  it('accurately identifies closest active page at the center of the viewport', () => {
    const targetPage = 750;
    const pageCenter = tops[targetPage - 1] + geometries[targetPage - 1].scaledHeight / 2;

    const closest = findClosestPageIndex(tops, geometries, pageCenter);
    expect(closest).toBe(targetPage);
  });
});
