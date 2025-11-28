import React from 'react';
import { StructureDropdown } from '../../common/EquationTools';

const BracketIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M8 4H6v16h2" />
    <path d="M16 4h2v16h-2" />
    <rect x="9" y="7" width="6" height="10" strokeDasharray="2 2" opacity="0.5" />
  </svg>
);

export const BracketTool: React.FC = () => {
  const sections = [
    {
      title: "Brackets",
      items: [
        // Row 1
        { label: "Parentheses", latex: "\\left(\\placeholder{}\\right)", insertValue: "\\left(\\placeholder{}\\right)" },
        { label: "Square Brackets", latex: "\\left[\\placeholder{}\\right]", insertValue: "\\left[\\placeholder{}\\right]" },
        { label: "Curly Braces", latex: "\\left\\{\\placeholder{}\\right\\}", insertValue: "\\left\\{\\placeholder{}\\right\\}" },
        { label: "Angle Brackets", latex: "\\left\\langle\\placeholder{}\\right\\rangle", insertValue: "\\left\\langle\\placeholder{}\\right\\rangle" },
        // Row 2
        { label: "Floor", latex: "\\left\\lfloor\\placeholder{}\\right\\rfloor", insertValue: "\\left\\lfloor\\placeholder{}\\right\\rfloor" },
        { label: "Ceiling", latex: "\\left\\lceil\\placeholder{}\\right\\rceil", insertValue: "\\left\\lceil\\placeholder{}\\right\\rceil" },
        { label: "Absolute Value", latex: "\\left|\\placeholder{}\\right|", insertValue: "\\left|\\placeholder{}\\right|" },
        { label: "Norm", latex: "\\left\\|\\placeholder{}\\right\\|", insertValue: "\\left\\|\\placeholder{}\\right\\|" },
        // Row 3 (Common Semantic Brackets)
        { label: "Double Brackets", latex: "\\left\\llbracket\\placeholder{}\\right\\rrbracket", insertValue: "\\left\\llbracket\\placeholder{}\\right\\rrbracket" },
        { label: "Open-Closed", latex: "\\left(\\placeholder{}\\right]", insertValue: "\\left(\\placeholder{}\\right]" },
        { label: "Closed-Open", latex: "\\left[\\placeholder{}\\right)", insertValue: "\\left[\\placeholder{}\\right)" },
        { label: "Inverted Brackets", latex: "\\left]\\placeholder{}\\right[", insertValue: "\\left]\\placeholder{}\\right[" }
      ]
    },
    {
      title: "Brackets with Separators",
      items: [
        { label: "Parentheses with Separator", latex: "\\left(\\placeholder{}\\middle|\\placeholder{}\\right)", insertValue: "\\left(\\placeholder{}\\middle|\\placeholder{}\\right)" },
        { label: "Curly Braces with Separator", latex: "\\left\\{\\placeholder{}\\middle|\\placeholder{}\\right\\}", insertValue: "\\left\\{\\placeholder{}\\middle|\\placeholder{}\\right\\}" },
        { label: "Angle with Separator", latex: "\\left\\langle\\placeholder{}\\middle|\\placeholder{}\\right\\rangle", insertValue: "\\left\\langle\\placeholder{}\\middle|\\placeholder{}\\right\\rangle" },
        { label: "Bra-Ket / Double Separator", latex: "\\left\\langle\\placeholder{}\\middle|\\placeholder{}\\middle|\\placeholder{}\\right\\rangle", insertValue: "\\left\\langle\\placeholder{}\\middle|\\placeholder{}\\middle|\\placeholder{}\\right\\rangle" }
      ]
    },
    {
      title: "Single Brackets",
      items: [
        { label: "Left Parenthesis", latex: "(", insertValue: "(" },
        { label: "Right Parenthesis", latex: ")", insertValue: ")" },
        { label: "Left Square Bracket", latex: "[", insertValue: "[" },
        { label: "Right Square Bracket", latex: "]", insertValue: "]" },
        { label: "Left Curly Brace", latex: "\\{", insertValue: "\\{" },
        { label: "Right Curly Brace", latex: "\\}", insertValue: "\\}" },
        { label: "Vertical Bar", latex: "|", insertValue: "|" },
        { label: "Double Vertical Bar", latex: "\\|", insertValue: "\\|" }
      ]
    },
    {
        title: "Cases and Stacks",
        items: [
            { label: "Two Cases", latex: "\\begin{cases} \\placeholder{} \\\\ \\placeholder{} \\end{cases}", insertValue: "\\begin{cases} \\placeholder{} \\\\ \\placeholder{} \\end{cases}" },
            { label: "Three Cases", latex: "\\begin{cases} \\placeholder{} \\\\ \\placeholder{} \\\\ \\placeholder{} \\end{cases}", insertValue: "\\begin{cases} \\placeholder{} \\\\ \\placeholder{} \\\\ \\placeholder{} \\end{cases}" },
            { label: "Stack", latex: "\\begin{matrix} \\placeholder{} \\\\ \\placeholder{} \\end{matrix}", insertValue: "\\begin{matrix} \\placeholder{} \\\\ \\placeholder{} \\end{matrix}" },
            { label: "Binomial Stack", latex: "\\binom{\\placeholder{}}{\\placeholder{}}", insertValue: "\\binom{\\placeholder{}}{\\placeholder{}}" }
        ]
    },
    {
        title: "Common Brackets",
        items: [
            { label: "Piecewise Function", latex: "f(x) = \\begin{cases} -x & x < 0 \\\\ x & x \\ge 0 \\end{cases}", insertValue: "f(x) = \\begin{cases} -x & x < 0 \\\\ x & x \\ge 0 \\end{cases}" },
            { label: "Binomial Coefficient", latex: "\\binom{n}{k}", insertValue: "\\binom{n}{k}" },
            { label: "Eulerian Number", latex: "\\left\\langle {n \\atop k} \right\\rangle", insertValue: "\\left\\langle {n \\atop k} \right\\rangle" }
        ]
    }
  ];

  return (
    <StructureDropdown 
        id="struct-bracket"
        icon={BracketIcon} 
        label="Bracket" 
        sections={sections}
    />
  );
};