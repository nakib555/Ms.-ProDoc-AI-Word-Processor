import { HyperFormula } from 'hyperformula';
import { JSONDocumentModel, TableElement } from './documentModel';

class DocumentFormulaEngine {
  public hf: HyperFormula;
  
  // Dirty-node tracking architecture
  // Tracks which TableElement references have already been loaded into HyperFormula
  private trackedTables = new WeakMap<TableElement, string>();
  private activeSheetNames = new Set<string>();

  constructor() {
    this.hf = HyperFormula.buildEmpty({ licenseKey: 'gpl-v3' });
  }

  public syncDocument(doc: JSONDocumentModel) {
    if (!doc) return;

    // Find all tables in the document
    const tables: TableElement[] = [];
    for (const page of doc.pages) {
      if (page.elements) {
        for (const element of page.elements) {
          if (element.type === 'table') {
            tables.push(element as TableElement);
          }
        }
      }
    }

    // Identify tables that need to be added or updated
    const currentSheetNames = new Set<string>();

    for (const table of tables) {
      if (!table.id) continue;
      
      // Use friendly names if they are defined, otherwise node ID
      // To allow users to reference tables, we strip dashes from UUIDs or use short IDs
      let sheetName = table.id;
      // Also allow users to set a custom 'data-sheet-name' on the table in Prosemirror if supported,
      // but here we just sanitize the ID for formula usage.
      sheetName = sheetName.replace(/[^a-zA-Z0-9_]/g, '_');

      currentSheetNames.add(sheetName);

      if (this.trackedTables.has(table)) {
        // Table element reference hasn't changed (dirty-node tracking hit)
        continue;
      }

      // It's a new or modified table (dirty-node tracking miss)
      const data = this.extractTableData(table);
      
      if (this.hf.doesSheetExist(sheetName)) {
        // Update existing sheet
        const sheetId = this.hf.getSheetId(sheetName);
        if (sheetId !== undefined) {
          this.hf.setSheetContent(sheetId, data);
        }
      } else {
        // Add new sheet
        const sheetId = this.hf.addSheet(sheetName);
        this.hf.setSheetContent(sheetId, data);
        this.activeSheetNames.add(sheetName);
      }

      this.trackedTables.set(table, sheetName);
    }
  }

  private extractTableData(table: TableElement): any[][] {
    const data: any[][] = [];
    if (!table.rows) return data;

    for (const row of table.rows) {
      const rowData: any[] = [];
      if (row.cells) {
        for (const cell of row.cells) {
          let text = '';
          if (cell.elements && cell.elements.length > 0) {
            text = cell.elements.map(block => this.extractTextFromBlock(block)).join(' ');
          }
          
          const num = parseFloat(text.replace(/[^0-9.-]/g, ''));
          rowData.push(!isNaN(num) && text.trim() !== '' ? num : text.trim());
        }
      }
      data.push(rowData);
    }
    return data;
  }

  private extractTextFromBlock(block: any): string {
    let text = '';
    if (typeof block.text === 'string') {
        text += block.text;
    } else if (Array.isArray(block.text)) {
        text += block.text.map((t: any) => {
            if (typeof t === 'string') return t;
            return t.text || '';
        }).join('');
    }
    if (block.children) {
      for (const child of block.children) {
        text += this.extractTextFromBlock(child);
      }
    }
    return text.trim();
  }
}

export const globalFormulaEngine = new DocumentFormulaEngine();
