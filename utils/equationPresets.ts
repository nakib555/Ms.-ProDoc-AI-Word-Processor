export interface EquationPreset {
  id: string;
  title: string;
  latex: string;
  preview: string;
  description: string;
}

export const BUILTIN_EQUATION_PRESETS: EquationPreset[] = [
  {
    id: 'area-of-circle',
    title: 'Area of Circle',
    latex: 'A = \\pi r^2',
    preview: 'A = πr²',
    description: 'Standard geometry circle area formula',
  },
  {
    id: 'quadratic-formula',
    title: 'Quadratic Formula',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    preview: 'x = (-b ± √(b² - 4ac)) / 2a',
    description: 'Roots of a quadratic equation ax² + bx + c = 0',
  },
  {
    id: 'pythagorean-theorem',
    title: 'Pythagorean Theorem',
    latex: 'a^2 + b^2 = c^2',
    preview: 'a² + b² = c²',
    description: 'Right triangle hypotenuse relationship',
  },
  {
    id: 'binomial-theorem',
    title: 'Binomial Theorem',
    latex: '(x + a)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^k a^{n-k}',
    preview: '(x + a)ⁿ = ∑ C(n,k) xᵏ aⁿ⁻ᵏ',
    description: 'Algebraic power expansion of a binomial',
  },
  {
    id: 'expansion-of-sum',
    title: 'Expansion of a Sum',
    latex: '(1 + x)^n = 1 + \\frac{nx}{1!} + \\frac{n(n-1)x^2}{2!} + \\cdots',
    preview: '(1 + x)ⁿ = 1 + nx/1! + n(n-1)x²/2! + …',
    description: 'Infinite series expansion for real exponents',
  },
  {
    id: 'fourier-series',
    title: 'Fourier Series',
    latex: 'f(x) = a_0 + \\sum_{n=1}^{\\infty} \\left(a_n \\cos\\frac{n\\pi x}{L} + b_n \\sin\\frac{n\\pi x}{L}\\right)',
    preview: 'f(x) = a₀ + ∑ (aₙ cos(nπx/L) + bₙ sin(nπx/L))',
    description: 'Periodic function decomposition into harmonics',
  },
  {
    id: 'taylor-expansion',
    title: 'Taylor Expansion of eˣ',
    latex: 'e^x = 1 + \\frac{x}{1!} + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots',
    preview: 'eˣ = 1 + x/1! + x²/2! + x³/3! + …',
    description: 'Maclaurin expansion of the exponential function',
  },
  {
    id: 'trig-identity',
    title: 'Trig Angle Sum',
    latex: '\\sin(\\alpha \\pm \\beta) = \\sin\\alpha\\cos\\beta \\pm \\cos\\alpha\\sin\\beta',
    preview: 'sin(α ± β) = sin α cos β ± cos α sin β',
    description: 'Trigonometric angle addition & subtraction identity',
  },
];

export type SymbolCategoryName =
  | 'Common'
  | 'Currency & Legal'
  | 'Greek'
  | 'Math & Logic'
  | 'Arrows'
  | 'Technical & UI';

export interface SymbolEntry {
  char: string;
  name: string;
  codepoint: string;
  category: SymbolCategoryName;
}

const makeEntry = (char: string, name: string, category: SymbolCategoryName): SymbolEntry => {
  const cp = char.codePointAt(0) ?? 0;
  return {
    char,
    name,
    codepoint: `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`,
    category,
  };
};

export const SYMBOL_CATALOG: SymbolEntry[] = [
  // Common
  makeEntry('©', 'Copyright Sign', 'Common'),
  makeEntry('®', 'Registered Sign', 'Common'),
  makeEntry('™', 'Trade Mark Sign', 'Common'),
  makeEntry('§', 'Section Sign', 'Common'),
  makeEntry('¶', 'Pilcrow / Paragraph Sign', 'Common'),
  makeEntry('•', 'Bullet', 'Common'),
  makeEntry('◦', 'White Bullet', 'Common'),
  makeEntry('…', 'Horizontal Ellipsis', 'Common'),
  makeEntry('—', 'Em Dash', 'Common'),
  makeEntry('–', 'En Dash', 'Common'),
  makeEntry('†', 'Dagger', 'Common'),
  makeEntry('‡', 'Double Dagger', 'Common'),
  makeEntry('‰', 'Per Mille Sign', 'Common'),
  makeEntry('°', 'Degree Sign', 'Common'),
  makeEntry('′', 'Prime (Feet / Minutes)', 'Common'),
  makeEntry('″', 'Double Prime (Inches / Seconds)', 'Common'),
  makeEntry('№', 'Numero Sign', 'Common'),
  makeEntry('✓', 'Check Mark', 'Common'),
  makeEntry('✔', 'Heavy Check Mark', 'Common'),
  makeEntry('✕', 'Multiplication X / Cross', 'Common'),

  // Currency & Legal
  makeEntry('$', 'Dollar Sign', 'Currency & Legal'),
  makeEntry('¢', 'Cent Sign', 'Currency & Legal'),
  makeEntry('€', 'Euro Sign', 'Currency & Legal'),
  makeEntry('£', 'Pound Sterling Sign', 'Currency & Legal'),
  makeEntry('¥', 'Yen / Yuan Sign', 'Currency & Legal'),
  makeEntry('₹', 'Indian Rupee Sign', 'Currency & Legal'),
  makeEntry('₩', 'Won Sign', 'Currency & Legal'),
  makeEntry('CHF', 'Swiss Franc', 'Currency & Legal'),
  makeEntry('₿', 'Bitcoin Sign', 'Currency & Legal'),
  makeEntry('℗', 'Sound Recording Copyright', 'Currency & Legal'),
  makeEntry('℠', 'Service Mark', 'Currency & Legal'),
  makeEntry('ª', 'Feminine Ordinal Indicator', 'Currency & Legal'),
  makeEntry('º', 'Masculine Ordinal Indicator', 'Currency & Legal'),

  // Greek
  makeEntry('α', 'Greek Small Letter Alpha', 'Greek'),
  makeEntry('β', 'Greek Small Letter Beta', 'Greek'),
  makeEntry('γ', 'Greek Small Letter Gamma', 'Greek'),
  makeEntry('δ', 'Greek Small Letter Delta', 'Greek'),
  makeEntry('ε', 'Greek Small Letter Epsilon', 'Greek'),
  makeEntry('ζ', 'Greek Small Letter Zeta', 'Greek'),
  makeEntry('η', 'Greek Small Letter Eta', 'Greek'),
  makeEntry('θ', 'Greek Small Letter Theta', 'Greek'),
  makeEntry('λ', 'Greek Small Letter Lambda', 'Greek'),
  makeEntry('μ', 'Greek Small Letter Mu (Micro)', 'Greek'),
  makeEntry('π', 'Greek Small Letter Pi', 'Greek'),
  makeEntry('ρ', 'Greek Small Letter Rho', 'Greek'),
  makeEntry('σ', 'Greek Small Letter Sigma', 'Greek'),
  makeEntry('τ', 'Greek Small Letter Tau', 'Greek'),
  makeEntry('φ', 'Greek Small Letter Phi', 'Greek'),
  makeEntry('ω', 'Greek Small Letter Omega', 'Greek'),
  makeEntry('Δ', 'Greek Capital Letter Delta', 'Greek'),
  makeEntry('Θ', 'Greek Capital Letter Theta', 'Greek'),
  makeEntry('Λ', 'Greek Capital Letter Lambda', 'Greek'),
  makeEntry('Π', 'Greek Capital Letter Pi', 'Greek'),
  makeEntry('Σ', 'Greek Capital Letter Sigma', 'Greek'),
  makeEntry('Φ', 'Greek Capital Letter Phi', 'Greek'),
  makeEntry('Ψ', 'Greek Capital Letter Psi', 'Greek'),
  makeEntry('Ω', 'Greek Capital Letter Omega', 'Greek'),

  // Math & Logic
  makeEntry('±', 'Plus-Minus Sign', 'Math & Logic'),
  makeEntry('∓', 'Minus-or-Plus Sign', 'Math & Logic'),
  makeEntry('×', 'Multiplication Sign', 'Math & Logic'),
  makeEntry('÷', 'Division Sign', 'Math & Logic'),
  makeEntry('≠', 'Not Equal To', 'Math & Logic'),
  makeEntry('≈', 'Almost Equal To', 'Math & Logic'),
  makeEntry('≡', 'Identical To', 'Math & Logic'),
  makeEntry('≤', 'Less-Than or Equal To', 'Math & Logic'),
  makeEntry('≥', 'Greater-Than or Equal To', 'Math & Logic'),
  makeEntry('≪', 'Much Less-Than', 'Math & Logic'),
  makeEntry('≫', 'Much Greater-Than', 'Math & Logic'),
  makeEntry('∝', 'Proportional To', 'Math & Logic'),
  makeEntry('∞', 'Infinity', 'Math & Logic'),
  makeEntry('√', 'Square Root', 'Math & Logic'),
  makeEntry('∛', 'Cube Root', 'Math & Logic'),
  makeEntry('∑', 'N-Ary Summation', 'Math & Logic'),
  makeEntry('∏', 'N-Ary Product', 'Math & Logic'),
  makeEntry('∫', 'Integral', 'Math & Logic'),
  makeEntry('∮', 'Contour Integral', 'Math & Logic'),
  makeEntry('∂', 'Partial Differential', 'Math & Logic'),
  makeEntry('∇', 'Nabla / Del Operator', 'Math & Logic'),
  makeEntry('∀', 'For All', 'Math & Logic'),
  makeEntry('∃', 'There Exists', 'Math & Logic'),
  makeEntry('∈', 'Element Of', 'Math & Logic'),
  makeEntry('∉', 'Not an Element Of', 'Math & Logic'),
  makeEntry('⊂', 'Subset Of', 'Math & Logic'),
  makeEntry('⊆', 'Subset of or Equal To', 'Math & Logic'),
  makeEntry('∪', 'Union', 'Math & Logic'),
  makeEntry('∩', 'Intersection', 'Math & Logic'),
  makeEntry('∅', 'Empty Set', 'Math & Logic'),
  makeEntry('∧', 'Logical And', 'Math & Logic'),
  makeEntry('∨', 'Logical Or', 'Math & Logic'),
  makeEntry('¬', 'Not Sign', 'Math & Logic'),
  makeEntry('∴', 'Therefore', 'Math & Logic'),
  makeEntry('∵', 'Because', 'Math & Logic'),
  makeEntry('∠', 'Angle', 'Math & Logic'),
  makeEntry('⊥', 'Perpendicular / Up Tack', 'Math & Logic'),
  makeEntry('∥', 'Parallel To', 'Math & Logic'),
  makeEntry('½', 'Vulgar Fraction One Half', 'Math & Logic'),
  makeEntry('⅓', 'Vulgar Fraction One Third', 'Math & Logic'),
  makeEntry('¼', 'Vulgar Fraction One Quarter', 'Math & Logic'),
  makeEntry('¾', 'Vulgar Fraction Three Quarters', 'Math & Logic'),

  // Arrows
  makeEntry('←', 'Leftwards Arrow', 'Arrows'),
  makeEntry('→', 'Rightwards Arrow', 'Arrows'),
  makeEntry('↑', 'Upwards Arrow', 'Arrows'),
  makeEntry('↓', 'Downwards Arrow', 'Arrows'),
  makeEntry('↔', 'Left Right Arrow', 'Arrows'),
  makeEntry('↕', 'Up Down Arrow', 'Arrows'),
  makeEntry('⇐', 'Leftwards Double Arrow', 'Arrows'),
  makeEntry('⇒', 'Rightwards Double Arrow', 'Arrows'),
  makeEntry('⇔', 'Left Right Double Arrow', 'Arrows'),
  makeEntry('↗', 'North East Arrow', 'Arrows'),
  makeEntry('↘', 'South East Arrow', 'Arrows'),
  makeEntry('↵', 'Carriage Return / Enter Arrow', 'Arrows'),
  makeEntry('↺', 'Anticlockwise Open Circle Arrow', 'Arrows'),
  makeEntry('↻', 'Clockwise Open Circle Arrow', 'Arrows'),

  // Technical & UI
  makeEntry('⌘', 'Command Key / Place of Interest', 'Technical & UI'),
  makeEntry('⌥', 'Option Key', 'Technical & UI'),
  makeEntry('⇧', 'Upwards White Arrow (Shift)', 'Technical & UI'),
  makeEntry('⌃', 'Up Arrowhead (Ctrl)', 'Technical & UI'),
  makeEntry('⌫', 'Erase to the Left (Backspace)', 'Technical & UI'),
  makeEntry('℃', 'Degree Celsius', 'Technical & UI'),
  makeEntry('℉', 'Degree Fahrenheit', 'Technical & UI'),
  makeEntry('Ω', 'Ohm Sign', 'Technical & UI'),
  makeEntry('★', 'Black Star', 'Technical & UI'),
  makeEntry('☆', 'White Star', 'Technical & UI'),
  makeEntry('☐', 'Ballot Box', 'Technical & UI'),
  makeEntry('☑', 'Ballot Box with Check', 'Technical & UI'),
];

export const DEFAULT_RECENT_SYMBOLS = [
  '©', '®', '™', '€', '£', '¥', '₹', '°',
  '±', '≠', '≤', '≥', '÷', '×', '∞', '√',
  '∑', 'π', 'α', '→',
];

const RECENT_SYMBOLS_KEY = 'prodoc_recent_symbols';

export function getRecentSymbols(): string[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [...DEFAULT_RECENT_SYMBOLS];
  }
  try {
    const raw = window.localStorage.getItem(RECENT_SYMBOLS_KEY);
    if (!raw) return [...DEFAULT_RECENT_SYMBOLS];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.filter((s) => typeof s === 'string').slice(0, 20);
    }
  } catch {
    // ignore storage errors
  }
  return [...DEFAULT_RECENT_SYMBOLS];
}

export function recordRecentSymbol(symbol: string): string[] {
  const current = getRecentSymbols().filter((s) => s !== symbol);
  const next = [symbol, ...current].slice(0, 20);
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(RECENT_SYMBOLS_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  }
  return next;
}

export function filterSymbols(query: string, category: string = 'All'): SymbolEntry[] {
  const q = query.trim().toLowerCase();
  return SYMBOL_CATALOG.filter((entry) => {
    if (category !== 'All' && entry.category !== category) return false;
    if (!q) return true;
    return (
      entry.char.toLowerCase().includes(q) ||
      entry.name.toLowerCase().includes(q) ||
      entry.codepoint.toLowerCase().includes(q)
    );
  });
}

const SUPERSCRIPT_MAP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', 'n': 'ⁿ', 'i': 'ⁱ', 'x': 'ˣ',
};

const SUBSCRIPT_MAP: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
  'a': 'ₐ', 'e': 'ₑ', 'i': 'ᵢ', 'k': 'ₖ', 'n': 'ₙ', 'o': 'ₒ', 'x': 'ₓ',
};

const LATEX_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\\pm\b/g, '±'],
  [/\\mp\b/g, '∓'],
  [/\\times\b/g, '×'],
  [/\\div\b/g, '÷'],
  [/\\cdot\b/g, '·'],
  [/\\neq\b/g, '≠'],
  [/\\approx\b/g, '≈'],
  [/\\equiv\b/g, '≡'],
  [/\\leq\b|\\le\b/g, '≤'],
  [/\\geq\b|\\ge\b/g, '≥'],
  [/\\infty\b/g, '∞'],
  [/\\sum\b/g, '∑'],
  [/\\prod\b/g, '∏'],
  [/\\int\b/g, '∫'],
  [/\\oint\b/g, '∮'],
  [/\\partial\b/g, '∂'],
  [/\\nabla\b/g, '∇'],
  [/\\forall\b/g, '∀'],
  [/\\exists\b/g, '∃'],
  [/\\in\b/g, '∈'],
  [/\\notin\b/g, '∉'],
  [/\\subset\b/g, '⊂'],
  [/\\subseteq\b/g, '⊆'],
  [/\\cup\b/g, '∪'],
  [/\\cap\b/g, '∩'],
  [/\\emptyset\b/g, '∅'],
  [/\\rightarrow\b|\\to\b/g, '→'],
  [/\\leftarrow\b/g, '←'],
  [/\\leftrightarrow\b/g, '↔'],
  [/\\Rightarrow\b/g, '⇒'],
  [/\\Leftarrow\b/g, '⇐'],
  [/\\Leftrightarrow\b/g, '⇔'],
  [/\\cdots\b/g, '⋯'],
  [/\\ldots\b/g, '…'],
  [/\\alpha\b/g, 'α'],
  [/\\beta\b/g, 'β'],
  [/\\gamma\b/g, 'γ'],
  [/\\delta\b/g, 'δ'],
  [/\\epsilon\b/g, 'ε'],
  [/\\theta\b/g, 'θ'],
  [/\\lambda\b/g, 'λ'],
  [/\\mu\b/g, 'μ'],
  [/\\pi\b/g, 'π'],
  [/\\rho\b/g, 'ρ'],
  [/\\sigma\b/g, 'σ'],
  [/\\tau\b/g, 'τ'],
  [/\\phi\b/g, 'φ'],
  [/\\psi\b/g, 'ψ'],
  [/\\omega\b/g, 'ω'],
  [/\\Delta\b/g, 'Δ'],
  [/\\Theta\b/g, 'Θ'],
  [/\\Lambda\b/g, 'Λ'],
  [/\\Pi\b/g, 'Π'],
  [/\\Sigma\b/g, 'Σ'],
  [/\\Phi\b/g, 'Φ'],
  [/\\Omega\b/g, 'Ω'],
  [/\\left\(/g, '('],
  [/\\right\)/g, ')'],
  [/\\left\[/g, '['],
  [/\\right\]/g, ']'],
  [/\\sin\b/g, 'sin'],
  [/\\cos\b/g, 'cos'],
  [/\\tan\b/g, 'tan'],
  [/\\log\b/g, 'log'],
  [/\\ln\b/g, 'ln'],
  [/\\lim\b/g, 'lim'],
];

/**
 * Converts common LaTeX expressions into clean Unicode linear notation.
 */
export function latexToLinearUnicode(latex: string): string {
  if (!latex) return '';
  let out = latex.trim();

  // Unwrap \text{...}
  out = out.replace(/\\text\{([^}]*)\}/g, '$1');

  // Iteratively expand simple nested \frac{a}{b} and \sqrt{x}
  for (let i = 0; i < 4; i++) {
    out = out.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (_, num, den) => {
      const n = num.includes(' ') || num.includes('+') || num.includes('-') ? `(${num})` : num;
      const d = den.includes(' ') || den.includes('+') || den.includes('-') ? `(${den})` : den;
      return `${n}/${d}`;
    });
    out = out.replace(/\\sqrt\{([^{}]+)\}/g, (_, inner) => `√(${inner})`);
  }

  // Convert superscripts and subscripts where Unicode glyphs exist
  out = out.replace(/\^\{([^{}]+)\}|\^([a-zA-Z0-9])/g, (_, braced, single) => {
    const val = braced || single || '';
    const mapped = val.split('').map((ch: string) => SUPERSCRIPT_MAP[ch] || null);
    return mapped.every(Boolean) ? mapped.join('') : `^(${val})`;
  });

  out = out.replace(/_\{([^{}]+)\}|_([a-zA-Z0-9])/g, (_, braced, single) => {
    const val = braced || single || '';
    const mapped = val.split('').map((ch: string) => SUBSCRIPT_MAP[ch] || null);
    return mapped.every(Boolean) ? mapped.join('') : `_(${val})`;
  });

  for (const [pattern, replacement] of LATEX_REPLACEMENTS) {
    out = out.replace(pattern, replacement);
  }

  return out.replace(/\s+/g, ' ').trim();
}

/**
 * Converts basic linear Unicode math back into clean LaTeX for MathLive.
 */
export function linearUnicodeToLatex(text: string): string {
  if (!text) return '';
  let out = text.trim();

  const reverseSuper = Object.entries(SUPERSCRIPT_MAP).reduce<Record<string, string>>((acc, [k, v]) => {
    acc[v] = k;
    return acc;
  }, {});
  const reverseSub = Object.entries(SUBSCRIPT_MAP).reduce<Record<string, string>>((acc, [k, v]) => {
    acc[v] = k;
    return acc;
  }, {});

  // Convert runs of superscript glyphs into ^{...}
  out = out.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿⁱˣ]+/g, (match) => {
    const plain = match.split('').map((c) => reverseSuper[c] || c).join('');
    return plain.length === 1 ? `^${plain}` : `^{${plain}}`;
  });

  // Convert runs of subscript glyphs into _{...}
  out = out.replace(/[₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₐₑᵢₖₙₒₓ]+/g, (match) => {
    const plain = match.split('').map((c) => reverseSub[c] || c).join('');
    return plain.length === 1 ? `_${plain}` : `_{${plain}}`;
  });

  const glyphToLatex: Array<[string, string]> = [
    ['±', '\\pm '], ['∓', '\\mp '], ['×', '\\times '], ['÷', '\\div '],
    ['≠', '\\neq '], ['≈', '\\approx '], ['≡', '\\equiv '], ['≤', '\\leq '],
    ['≥', '\\geq '], ['∞', '\\infty '], ['∑', '\\sum '], ['∏', '\\prod '],
    ['∫', '\\int '], ['∂', '\\partial '], ['∇', '\\nabla '], ['∀', '\\forall '],
    ['∃', '\\exists '], ['∈', '\\in '], ['∉', '\\notin '], ['∪', '\\cup '],
    ['∩', '\\cap '], ['∅', '\\emptyset '], ['→', '\\rightarrow '], ['←', '\\leftarrow '],
    ['↔', '\\leftrightarrow '], ['⇒', '\\Rightarrow '], ['⇐', '\\Leftarrow '],
    ['α', '\\alpha '], ['β', '\\beta '], ['γ', '\\gamma '], ['δ', '\\delta '],
    ['ε', '\\epsilon '], ['θ', '\\theta '], ['λ', '\\lambda '], ['μ', '\\mu '],
    ['π', '\\pi '], ['ρ', '\\rho '], ['σ', '\\sigma '], ['τ', '\\tau '],
    ['φ', '\\phi '], ['ψ', '\\psi '], ['ω', '\\omega '],
    ['Δ', '\\Delta '], ['Θ', '\\Theta '], ['Σ', '\\Sigma '], ['Ω', '\\Omega '],
  ];

  for (const [glyph, cmd] of glyphToLatex) {
    out = out.split(glyph).join(cmd);
  }

  out = out.replace(/√\(([^)]+)\)/g, '\\sqrt{$1}');
  return out.replace(/\s+/g, ' ').trim();
}
