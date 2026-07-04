// utils/templateEngine.ts

import { JSONDocumentModel } from './documentModel';
import { PageConfig } from '../types';

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: 'Company' | 'Academic' | 'Legal' | 'Report' | 'Resume' | 'Invoice';
  lockedRegions?: string[]; // element IDs that cannot be edited
  pageConfig: PageConfig;
  htmlContent: string;
}

/**
 * Enterprise-grade Template Engine.
 * Houses default skeletons for corporate, academic, legal, and report layouts.
 * Supports locking section regions to maintain structural governance.
 */
export class TemplateEngine {
  private templates = new Map<string, DocumentTemplate>();

  constructor() {
    this.loadDefaultTemplates();
  }

  private loadDefaultTemplates(): void {
    // 1. Company Executive Briefing
    this.templates.set('company-brief', {
      id: 'company-brief',
      name: 'Company Executive Brief',
      description: 'Polished company executive briefing template with standard corporate spacing.',
      category: 'Company',
      pageConfig: {
        size: 'Letter',
        orientation: 'portrait',
        margins: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0 }
      },
      htmlContent: `
        <h1 id="brief-title">EXECUTIVE BRIEFING: ANNUAL STRATEGY</h1>
        <p><strong>Prepared by:</strong> Global Planning Committee<br/><strong>Date:</strong> 2026</p>
        <hr class="prodoc-page-break" style="page-break-after: always;"/>
        <h2>1. Executive Summary</h2>
        <p>This report delineates strategic vectors across digital platforms, expanding on cascaded styles and unified platform designs.</p>
        <h2>2. Market Positioning</h2>
        <p>Analysis confirms that modular document automation yields massive cost savings and increases enterprise authoring velocity.</p>
      `
    });

    // 2. Academic Research Paper
    this.templates.set('academic-paper', {
      id: 'academic-paper',
      name: 'Academic Paper (IEEE / APA Style)',
      description: 'Standard research report with 0.75-inch margins and structured sections.',
      category: 'Academic',
      pageConfig: {
        size: 'Letter',
        orientation: 'portrait',
        margins: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75 }
      },
      htmlContent: `
        <h1 style="text-align: center;">On the Algorithmic Pagination of Flowable Rich Text Elements</h1>
        <p style="text-align: center; font-style: italic;">Dr. Antigravity Agent, DeepMind Labs</p>
        <h2>Abstract</h2>
        <p>We present a novel approach to cross-compiling AST layouts to discrete standard print dimensions using binary string splits.</p>
        <h2>I. Introduction</h2>
        <p>Page-oriented formats remain a central paradigm of business. Resolving these in a browser sandbox is discussed.</p>
      `
    });

    // 3. Legal Contract Template
    this.templates.set('legal-contract', {
      id: 'legal-contract',
      name: 'Legal NDA & Service Contract',
      description: 'Standard legal template with double spacing, margin numbering, and lock sections.',
      category: 'Legal',
      lockedRegions: ['legal-header'],
      pageConfig: {
        size: 'Letter',
        orientation: 'portrait',
        margins: { top: 1.25, bottom: 1.25, left: 1.25, right: 1.25 }
      },
      htmlContent: `
        <h1 id="legal-header" style="text-align: center;">MUTUAL NON-DISCLOSURE AGREEMENT</h1>
        <p>This Agreement is entered into on this day between Party A and Party B.</p>
        <h2>Section 1: Confidentiality Terms</h2>
        <p>All source files, engine structures, and layout nodes compiled by the RenderingPipelineManager are proprietary assets.</p>
      `
    });
  }

  public getTemplate(id: string): DocumentTemplate | undefined {
    return this.templates.get(id);
  }

  public getTemplates(): DocumentTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * Compiles a template into a standard JSONDocumentModel structure.
   */
  public compileTemplateToModel(templateId: string): JSONDocumentModel {
    const template = this.templates.get(templateId);
    if (!template) throw new Error(`Template with ID ${templateId} not found.`);

    return {
      id: `doc-templated-${templateId}`,
      metadata: {
        title: template.name,
        creationDate: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        author: 'Template System'
      },
      pageConfig: template.pageConfig,
      pages: [
        {
          sections: [
            {
              elements: [
                {
                  id: 'paragraph-templated-base',
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: `Generated from template: ${template.name}`
                    }
                  ]
                }
              ],
              pageSettings: template.pageConfig
            }
          ]
        }
      ]
    };
  }
}

export const globalTemplateEngine = new TemplateEngine();
