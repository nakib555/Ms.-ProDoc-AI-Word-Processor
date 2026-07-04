// utils/numberingEngine.ts

export type ListNumberFormatType = 'decimal' | 'lowerLetter' | 'upperLetter' | 'lowerRoman' | 'upperRoman' | 'bullet' | 'legal' | 'custom';

export interface NumberingLevel {
  level: number;
  format: ListNumberFormatType;
  levelText: string; // e.g. "%1." or "%1.%2."
  start: number;
  indent: number; // in pt or px
  suffix: 'tab' | 'space' | 'nothing';
  bulletGlyph?: string;
}

export interface AbstractNumbering {
  id: string;
  levels: Record<number, NumberingLevel>;
  type: 'bullet' | 'numbered' | 'multilevel';
}

export interface NumberingInstance {
  id: string;
  abstractId: string;
  lvlOverrides: Record<number, { startAt?: number }>;
}

export class NumberingFormatter {
  /**
   * Translates an integer index (1-based) into a formatted string based on list type.
   */
  public static formatNumber(num: number, format: ListNumberFormatType): string {
    if (num <= 0) return '0';
    switch (format) {
      case 'lowerLetter':
        return this.toLetter(num).toLowerCase();
      case 'upperLetter':
        return this.toLetter(num).toUpperCase();
      case 'lowerRoman':
        return this.toRoman(num).toLowerCase();
      case 'upperRoman':
        return this.toRoman(num).toUpperCase();
      case 'bullet':
        return '•';
      case 'decimal':
      default:
        return num.toString();
    }
  }

  private static toLetter(num: number): string {
    let temp = num;
    let letter = '';
    while (temp > 0) {
      const remainder = (temp - 1) % 26;
      letter = String.fromCharCode(65 + remainder) + letter;
      temp = Math.floor((temp - remainder) / 26);
    }
    return letter;
  }

  private static toRoman(num: number): string {
    const lookup: Record<string, number> = {
      M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90,
      L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
    };
    let roman = '';
    let temp = num;
    for (const key in lookup) {
      while (temp >= lookup[key]) {
        roman += key;
        temp -= lookup[key];
      }
    }
    return roman;
  }
}

/**
 * Enterprise-grade Numbering Engine for abstract numbering resolution.
 * Automatically handles hierarchy levels, state tracking, and sequential formatting.
 */
export class NumberingEngine {
  private abstracts = new Map<string, AbstractNumbering>();
  private instances = new Map<string, NumberingInstance>();
  // Tracks active counters: instanceId -> levelIndex -> currentValue
  private counters = new Map<string, Map<number, number>>();

  constructor() {
    this.setupBuiltinNumbering();
  }

  public registerAbstract(num: AbstractNumbering): void {
    this.abstracts.set(num.id, num);
  }

  public registerInstance(inst: NumberingInstance): void {
    this.instances.set(inst.id, inst);
    this.counters.set(inst.id, new Map<number, number>());
  }

  /**
   * Reset counters for a numbering instance (e.g. restarting a list).
   */
  public restartInstance(instanceId: string): void {
    const instanceCounter = this.counters.get(instanceId);
    if (instanceCounter) {
      instanceCounter.clear();
    }
  }

  /**
   * Generates the list indicator string (e.g. "1.1.2" or "a.") and updates counter state.
   */
  public incrementAndFormat(instanceId: string, level: number): { text: string; indent: number } {
    const inst = this.instances.get(instanceId);
    if (!inst) return { text: '•', indent: level * 20 };

    const abs = this.abstracts.get(inst.abstractId);
    if (!abs) return { text: '•', indent: level * 20 };

    const levelConf = abs.levels[level];
    if (!levelConf) return { text: '•', indent: level * 20 };

    let instanceCounter = this.counters.get(instanceId);
    if (!instanceCounter) {
      instanceCounter = new Map<number, number>();
      this.counters.set(instanceId, instanceCounter);
    }

    // Reset subordinate levels (e.g., when level 1 increments, level 2, 3... should reset)
    for (const k of Array.from(instanceCounter.keys())) {
      if (k > level) {
        instanceCounter.delete(k);
      }
    }

    // Get current counter, fallback to level config start (usually 1)
    const currentVal = instanceCounter.get(level);
    const startVal = inst.lvlOverrides[level]?.startAt ?? levelConf.start;
    const nextVal = currentVal === undefined ? startVal : currentVal + 1;
    instanceCounter.set(level, nextVal);

    // Resolve hierarchical numbering string (e.g., "%1.%2." -> "1.1.")
    let formattedText = levelConf.levelText;
    for (let l = 0; l <= level; l++) {
      const val = instanceCounter.get(l) ?? (inst.lvlOverrides[l]?.startAt ?? abs.levels[l]?.start ?? 1);
      const levelFormat = abs.levels[l]?.format ?? 'decimal';
      const formattedSubVal = NumberingFormatter.formatNumber(val, levelFormat);
      formattedText = formattedText.replace(`%${l + 1}`, formattedSubVal);
    }

    return {
      text: formattedText,
      indent: levelConf.indent
    };
  }

  /**
   * Resolves the indent property for list rendering without incrementing counters.
   */
  public getIndent(instanceId: string, level: number): number {
    const inst = this.instances.get(instanceId);
    if (!inst) return level * 20;
    const abs = this.abstracts.get(inst.abstractId);
    return abs?.levels[level]?.indent ?? (level * 20);
  }

  private setupBuiltinNumbering() {
    // Standard Decimals (1., 1.1., 1.1.1.)
    this.registerAbstract({
      id: 'abs-decimal-multilevel',
      type: 'multilevel',
      levels: {
        0: { level: 0, format: 'decimal', levelText: '%1.', start: 1, indent: 24, suffix: 'tab' },
        1: { level: 1, format: 'decimal', levelText: '%1.%2.', start: 1, indent: 48, suffix: 'tab' },
        2: { level: 2, format: 'decimal', levelText: '%1.%2.%3.', start: 1, indent: 72, suffix: 'tab' }
      }
    });
    this.registerInstance({
      id: 'inst-decimal-multilevel',
      abstractId: 'abs-decimal-multilevel',
      lvlOverrides: {}
    });

    // Standard Bullet
    this.registerAbstract({
      id: 'abs-bullet-standard',
      type: 'bullet',
      levels: {
        0: { level: 0, format: 'bullet', levelText: '•', start: 1, indent: 24, suffix: 'space' },
        1: { level: 1, format: 'bullet', levelText: '◦', start: 1, indent: 48, suffix: 'space' },
        2: { level: 2, format: 'bullet', levelText: '▪', start: 1, indent: 72, suffix: 'space' }
      }
    });
    this.registerInstance({
      id: 'inst-bullet-standard',
      abstractId: 'abs-bullet-standard',
      lvlOverrides: {}
    });

    // Legal Outlining (1., A., a., i.)
    this.registerAbstract({
      id: 'abs-legal-outline',
      type: 'multilevel',
      levels: {
        0: { level: 0, format: 'upperRoman', levelText: '%1.', start: 1, indent: 24, suffix: 'tab' },
        1: { level: 1, format: 'upperLetter', levelText: '%2.', start: 1, indent: 48, suffix: 'tab' },
        2: { level: 2, format: 'decimal', levelText: '%3.', start: 1, indent: 72, suffix: 'tab' },
        3: { level: 3, format: 'lowerLetter', levelText: '%4.', start: 1, indent: 96, suffix: 'tab' }
      }
    });
    this.registerInstance({
      id: 'inst-legal-outline',
      abstractId: 'abs-legal-outline',
      lvlOverrides: {}
    });
  }
}
