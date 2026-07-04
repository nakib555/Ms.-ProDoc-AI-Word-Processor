// utils/fieldsEngine.ts

export interface FieldContext {
  pageIndex: number;
  totalPages: number;
  sectionIndex: number;
  totalSections: number;
  documentTitle: string;
  documentAuthor: string;
  currentDate?: Date;
  customVariables?: Record<string, string>;
}

/**
 * Enterprise-grade Fields Engine.
 * Parses and evaluates dynamic, MS Word-compliant document fields.
 * Includes support for PAGE, NUMPAGES, DATE, TIME, AUTHOR, TITLE, SEQ, and custom variables.
 */
export class FieldsEngine {
  private seqCounters = new Map<string, number>();

  /**
   * Resets all sequence counters (SEQ fields).
   */
  public resetSequences(): void {
    this.seqCounters.clear();
  }

  /**
   * Evaluates a SEQ counter, automatically incrementing it.
   */
  public evaluateSequence(identifier: string): number {
    const cleanId = identifier.trim().toUpperCase();
    const current = this.seqCounters.get(cleanId) || 0;
    const next = current + 1;
    this.seqCounters.set(cleanId, next);
    return next;
  }

  /**
   * Evaluates any MS Word standard field expression.
   * Format supports plain words or dynamic complex parameters: e.g. "PAGE", "NUMPAGES", "DATE \@ 'yyyy-MM-dd'", "SEQ Figure"
   */
  public evaluate(fieldInstruction: string, context: FieldContext): string {
    const trimmed = fieldInstruction.trim();
    const parts = trimmed.split(/\s+/);
    if (parts.length === 0) return '';

    const command = parts[0].toUpperCase();

    switch (command) {
      case 'PAGE':
        // 1-based index for pages
        return (context.pageIndex + 1).toString();

      case 'NUMPAGES':
        return context.totalPages.toString();

      case 'SECTION':
        return (context.sectionIndex + 1).toString();

      case 'TITLE':
        return context.documentTitle || 'Untitled Document';

      case 'AUTHOR':
        return context.documentAuthor || 'System Author';

      case 'DATE': {
        const date = context.currentDate || new Date();
        // Support custom formats or fallback
        if (parts.join(' ').includes('\\@')) {
          const match = trimmed.match(/\\@\s*["']?([^"']+)["']?/);
          if (match && match[1]) {
            return this.formatDate(date, match[1]);
          }
        }
        return date.toLocaleDateString();
      }

      case 'TIME': {
        const date = context.currentDate || new Date();
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }

      case 'SEQ': {
        if (parts.length < 2) return '1';
        const identifier = parts[1];
        return this.evaluateSequence(identifier).toString();
      }

      case 'MERGEFIELD': {
        if (parts.length < 2) return '';
        const varName = parts[1];
        return context.customVariables?.[varName] || `«${varName}»`;
      }

      case 'IF': {
        // Simple evaluation support: IF "arg1" == "arg2" "true_val" "false_val"
        const regex = /IF\s+["']?([^"']+)["']?\s*(==|!=|>=|<=|>|<)\s*["']?([^"']+)["']?\s+["']?([^"']+)["']?\s+["']?([^"']+)["']?/i;
        const match = trimmed.match(regex);
        if (match) {
          const [, arg1, op, arg2, trueVal, falseVal] = match;
          let comparison = false;
          switch (op) {
            case '==': comparison = arg1 === arg2; break;
            case '!=': comparison = arg1 !== arg2; break;
            case '>=': comparison = Number(arg1) >= Number(arg2); break;
            case '<=': comparison = Number(arg1) <= Number(arg2); break;
            case '>': comparison = Number(arg1) > Number(arg2); break;
            case '<': comparison = Number(arg1) < Number(arg2); break;
          }
          return comparison ? trueVal : falseVal;
        }
        return '[IF Field Error]';
      }

      default:
        // Try fallback to custom variable lookup
        return context.customVariables?.[command] || `/* Field Error: ${command} */`;
    }
  }

  /**
   * Simple Date custom formatter.
   */
  private formatDate(date: Date, pattern: string): string {
    const yyyy = date.getFullYear().toString();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const HH = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return pattern
      .replace(/yyyy/g, yyyy)
      .replace(/MM/g, MM)
      .replace(/dd/g, dd)
      .replace(/HH/g, HH)
      .replace(/mm/g, mm)
      .replace(/ss/g, ss);
  }

  /**
   * Scans an HTML string, compiles and replaces `<span class="prodoc-field" data-field-expr="EXPR">VALUE</span>` blocks
   * with evaluated fields.
   */
  public compileHtmlFields(html: string, context: FieldContext): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const fields = tempDiv.querySelectorAll('.prodoc-field, [data-field-expr]');
    fields.forEach(field => {
      const expr = field.getAttribute('data-field-expr') || field.textContent || '';
      const evaluated = this.evaluate(expr, context);
      field.textContent = evaluated;
    });

    return tempDiv.innerHTML;
  }
}
export const globalFieldsEngine = new FieldsEngine();
