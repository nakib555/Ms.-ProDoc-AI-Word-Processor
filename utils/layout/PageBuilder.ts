import { PageConfig } from '../../types';

export interface BuiltPage {
  html: string;
  config: PageConfig;
}

export class PageBuilder {
  private pages: BuiltPage[] = [];
  private currentNodes: HTMLElement[] = [];
  private currentConfig: PageConfig;

  constructor(initialConfig: PageConfig) {
    this.currentConfig = initialConfig;
  }

  append(node: HTMLElement): void {
    this.currentNodes.push(node);
  }

  updateConfig(config: PageConfig): void {
    this.currentConfig = config;
  }

  getCurrentNodes(): HTMLElement[] {
    return this.currentNodes;
  }

  clearCurrentNodes(): void {
    this.currentNodes = [];
  }

  finishPage(): void {
    if (typeof document === 'undefined') return;
    const div = document.createElement('div');
    this.currentNodes.forEach(n => div.appendChild(n));
    this.pages.push({
      html: div.innerHTML,
      config: { ...this.currentConfig }
    });
    this.currentNodes = [];
  }

  forcePage(html: string): void {
    this.pages.push({
      html,
      config: { ...this.currentConfig }
    });
  }

  getPages(): BuiltPage[] {
    return this.pages;
  }
}
