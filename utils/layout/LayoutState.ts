export class LayoutState {
  currentPageIndex = 0;
  currentHeight = 0;
  currentColumnIndex = 0;
  oversizedHandled: Set<string> = new Set();

  reset(): void {
    this.currentPageIndex = 0;
    this.currentHeight = 0;
    this.currentColumnIndex = 0;
    this.oversizedHandled.clear();
  }
}
