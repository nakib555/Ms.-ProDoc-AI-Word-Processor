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

export {
  SYMBOL_CATEGORIES,
  SYMBOL_CATALOG,
  MS_WORD_SPECIAL_CHARACTERS,
  DEFAULT_RECENT_SYMBOLS,
  getRecentSymbols,
  recordRecentSymbol,
  filterSymbols,
  groupSymbolsBySubgroup,
  resolveUnicodeHexInput,
  type SymbolCategoryName,
  type SymbolEntry,
  type SpecialCharacterEntry,
} from './symbolCatalog';

const SAVED_EQUATIONS_KEY = 'prodoc_saved_equations';

export function getSavedEquations(): EquationPreset[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(SAVED_EQUATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is EquationPreset =>
          Boolean(item) &&
          typeof item.id === 'string' &&
          typeof item.title === 'string' &&
          typeof item.latex === 'string'
      );
    }
  } catch {
    // ignore storage errors
  }
  return [];
}

export function saveCustomEquation(title: string, latex: string): EquationPreset[] {
  const cleanTitle = title.trim() || 'Saved Equation';
  const cleanLatex = latex.trim();
  if (!cleanLatex) return getSavedEquations();
  const entry: EquationPreset = {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: cleanTitle,
    latex: cleanLatex,
    preview: latexToLinearUnicode(cleanLatex) || cleanLatex,
    description: 'User-saved custom equation',
  };
  const next = [entry, ...getSavedEquations().filter((e) => e.latex !== cleanLatex)].slice(0, 30);
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(SAVED_EQUATIONS_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('prodoc:saved-equations-updated'));
    } catch {
      // ignore storage errors
    }
  }
  return next;
}

export function deleteSavedEquation(id: string): EquationPreset[] {
  const next = getSavedEquations().filter((e) => e.id !== id);
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(SAVED_EQUATIONS_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('prodoc:saved-equations-updated'));
    } catch {
      // ignore storage errors
    }
  }
  return next;
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
  [/\\neq\b|\\ne\b/g, '≠'],
  [/\\approx\b/g, '≈'],
  [/\\equiv\b/g, '≡'],
  [/\\triangleq\b/g, '≜'],
  [/\\leq\b|\\le\b/g, '≤'],
  [/\\geq\b|\\ge\b/g, '≥'],
  [/\\ll\b/g, '≪'],
  [/\\gg\b/g, '≫'],
  [/\\propto\b/g, '∝'],
  [/\\infty\b/g, '∞'],
  [/\\sum\\limits\b|\\sum\b/g, '∑'],
  [/\\prod\\limits\b|\\prod\b/g, '∏'],
  [/\\coprod\\limits\b|\\coprod\b/g, '∐'],
  [/\\bigcup\\limits\b|\\bigcup\b/g, '⋃'],
  [/\\bigcap\\limits\b|\\bigcap\b/g, '⋂'],
  [/\\bigvee\\limits\b|\\bigvee\b/g, '⋁'],
  [/\\bigwedge\\limits\b|\\bigwedge\b/g, '⋀'],
  [/\\iiint\\limits\b|\\iiint\b/g, '∭'],
  [/\\iint\\limits\b|\\iint\b/g, '∬'],
  [/\\int\\limits\b|\\int\b/g, '∫'],
  [/\\oiiint\\limits\b|\\oiiint\b/g, '∰'],
  [/\\oiint\\limits\b|\\oiint\b/g, '∯'],
  [/\\oint\\limits\b|\\oint\b/g, '∮'],
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
  [/\\ldots\b|\\dots\b/g, '…'],
  [/\\vdots\b/g, '⋮'],
  [/\\ddots\b/g, '⋱'],
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
  [/\\left\\langle/g, '⟨'],
  [/\\right\\rangle/g, '⟩'],
  [/\\left\\lfloor/g, '⌊'],
  [/\\right\\rfloor/g, '⌋'],
  [/\\left\\lceil/g, '⌈'],
  [/\\right\\rceil/g, '⌉'],
  [/\\left\\\{/g, '{'],
  [/\\right\\\}/g, '}'],
  [/\\left\|/g, '‖'],
  [/\\right\|/g, '‖'],
  [/\\left\(/g, '('],
  [/\\right\)/g, ')'],
  [/\\left\[/g, '['],
  [/\\right\]/g, ']'],
  [/\\left\|/g, '|'],
  [/\\right\|/g, '|'],
  [/\\left\./g, ''],
  [/\\right\./g, ''],
  [/\\sin\b/g, 'sin'],
  [/\\cos\b/g, 'cos'],
  [/\\tan\b/g, 'tan'],
  [/\\csc\b/g, 'csc'],
  [/\\sec\b/g, 'sec'],
  [/\\cot\b/g, 'cot'],
  [/\\sinh\b/g, 'sinh'],
  [/\\cosh\b/g, 'cosh'],
  [/\\tanh\b/g, 'tanh'],
  [/\\coth\b/g, 'coth'],
  [/\\log\b/g, 'log'],
  [/\\ln\b/g, 'ln'],
  [/\\lim\b/g, 'lim'],
  [/\\min\b/g, 'min'],
  [/\\max\b/g, 'max'],
  [/\\operatorname\{([^}]+)\}/g, '$1'],
  [/\\placeholder\{\}/g, '⬚'],
  [/\\placeholder\b/g, '⬚'],
  [/\\,/g, ' '],
];

/**
 * Converts common LaTeX expressions into clean Unicode linear notation.
 */
export function latexToLinearUnicode(latex: string): string {
  if (!latex) return '';
  let out = latex.trim();

  // Unwrap \text{...}
  out = out.replace(/\\text\{([^}]*)\}/g, '$1');

  // Expand \binom{n}{k}
  out = out.replace(/\\binom\{([^{}]+)\}\{([^{}]+)\}/g, 'C($1, $2)');

  // Iteratively expand nested \frac, \tfrac, and \sqrt[n]{x} / \sqrt{x}
  for (let i = 0; i < 6; i++) {
    out = out.replace(/\\(?:frac|tfrac)\{([^{}]+)\}\{([^{}]+)\}/g, (_, num, den) => {
      const n = /[+\-\s]/.test(num) ? `(${num})` : num;
      const d = /[+\-\s]/.test(den) ? `(${den})` : den;
      return `${n}/${d}`;
    });
    out = out.replace(/\\sqrt\[([^{}\]]+)\]\{([^{}]+)\}/g, (_, deg, inner) => {
      if (deg.trim() === '3') return `∛(${inner})`;
      if (deg.trim() === '4') return `∜(${inner})`;
      return `${deg}√(${inner})`;
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
    ['∫', '\\int '], ['∬', '\\iint '], ['∭', '\\iiint '], ['∮', '\\oint '],
    ['∂', '\\partial '], ['∇', '\\nabla '], ['∀', '\\forall '], ['∃', '\\exists '],
    ['∈', '\\in '], ['∉', '\\notin '], ['∪', '\\cup '], ['∩', '\\cap '],
    ['∅', '\\emptyset '], ['→', '\\rightarrow '], ['←', '\\leftarrow '],
    ['↔', '\\leftrightarrow '], ['⇒', '\\Rightarrow '], ['⇐', '\\Leftarrow '],
    ['⇔', '\\Leftrightarrow '], ['α', '\\alpha '], ['β', '\\beta '],
    ['γ', '\\gamma '], ['δ', '\\delta '], ['ε', '\\epsilon '], ['θ', '\\theta '],
    ['λ', '\\lambda '], ['μ', '\\mu '], ['π', '\\pi '], ['ρ', '\\rho '],
    ['σ', '\\sigma '], ['τ', '\\tau '], ['φ', '\\phi '], ['ψ', '\\psi '],
    ['ω', '\\omega '], ['Δ', '\\Delta '], ['Θ', '\\Theta '], ['Σ', '\\Sigma '],
    ['Ω', '\\Omega '], ['⬚', '\\placeholder{}'],
  ];

  for (const [glyph, cmd] of glyphToLatex) {
    out = out.split(glyph).join(cmd);
  }

  out = out.replace(/∛\(([^)]+)\)/g, '\\sqrt[3]{$1}');
  out = out.replace(/∜\(([^)]+)\)/g, '\\sqrt[4]{$1}');
  out = out.replace(/√\(([^)]+)\)/g, '\\sqrt{$1}');
  out = out.replace(/√([a-zA-Z0-9]+)/g, '\\sqrt{$1}');
  out = out.replace(/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)/g, '\\frac{$1}{$2}');
  return out.replace(/\s+/g, ' ').trim();
}
