import React from 'react';
import { StructureDropdown } from '../../common/EquationTools';

const FunctionIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <text x="2" y="16" fontSize="10" fontFamily="serif" fill="currentColor">sin</text>
    <rect x="15" y="7" width="8" height="10" strokeDasharray="2 2" opacity="0.5" />
  </svg>
);

export const FunctionTool: React.FC = () => {
  const sections = [
    {
      title: "Trigonometric Functions",
      items: [
        { label: "sin", latex: "\\sin\\placeholder{}", insertValue: "\\sin\\placeholder{}" },
        { label: "cos", latex: "\\cos\\placeholder{}", insertValue: "\\cos\\placeholder{}" },
        { label: "tan", latex: "\\tan\\placeholder{}", insertValue: "\\tan\\placeholder{}" },
        { label: "csc", latex: "\\csc\\placeholder{}", insertValue: "\\csc\\placeholder{}" },
        { label: "sec", latex: "\\sec\\placeholder{}", insertValue: "\\sec\\placeholder{}" },
        { label: "cot", latex: "\\cot\\placeholder{}", insertValue: "\\cot\\placeholder{}" }
      ]
    },
    {
      title: "Inverse Functions",
      items: [
        { label: "arcsin", latex: "\\sin^{-1}\\placeholder{}", insertValue: "\\sin^{-1}\\placeholder{}" },
        { label: "arccos", latex: "\\cos^{-1}\\placeholder{}", insertValue: "\\cos^{-1}\\placeholder{}" },
        { label: "arctan", latex: "\\tan^{-1}\\placeholder{}", insertValue: "\\tan^{-1}\\placeholder{}" },
        { label: "arccsc", latex: "\\csc^{-1}\\placeholder{}", insertValue: "\\csc^{-1}\\placeholder{}" },
        { label: "arcsec", latex: "\\sec^{-1}\\placeholder{}", insertValue: "\\sec^{-1}\\placeholder{}" },
        { label: "arccot", latex: "\\cot^{-1}\\placeholder{}", insertValue: "\\cot^{-1}\\placeholder{}" }
      ]
    },
    {
      title: "Hyperbolic Functions",
      items: [
        { label: "sinh", latex: "\\sinh\\placeholder{}", insertValue: "\\sinh\\placeholder{}" },
        { label: "cosh", latex: "\\cosh\\placeholder{}", insertValue: "\\cosh\\placeholder{}" },
        { label: "tanh", latex: "\\tanh\\placeholder{}", insertValue: "\\tanh\\placeholder{}" },
        { label: "csch", latex: "\\operatorname{csch}\\placeholder{}", insertValue: "\\csch\\placeholder{}" },
        { label: "sech", latex: "\\operatorname{sech}\\placeholder{}", insertValue: "\\operatorname{sech}\\placeholder{}" },
        { label: "coth", latex: "\\coth\\placeholder{}", insertValue: "\\coth\\placeholder{}" }
      ]
    },
    {
      title: "Inverse Hyperbolic Functions",
      items: [
        { label: "arsinh", latex: "\\sinh^{-1}\\placeholder{}", insertValue: "\\sinh^{-1}\\placeholder{}" },
        { label: "arcosh", latex: "\\cosh^{-1}\\placeholder{}", insertValue: "\\cosh^{-1}\\placeholder{}" },
        { label: "artanh", latex: "\\tanh^{-1}\\placeholder{}", insertValue: "\\tanh^{-1}\\placeholder{}" },
        { label: "arcsch", latex: "\\operatorname{csch}^{-1}\\placeholder{}", insertValue: "\\operatorname{csch}^{-1}\\placeholder{}" },
        { label: "arsech", latex: "\\operatorname{sech}^{-1}\\placeholder{}", insertValue: "\\operatorname{sech}^{-1}\\placeholder{}" },
        { label: "arcoth", latex: "\\coth^{-1}\\placeholder{}", insertValue: "\\coth^{-1}\\placeholder{}" }
      ]
    },
    {
      title: "Common Functions",
      items: [
        { label: "sin theta", latex: "\\sin \\theta", insertValue: "\\sin \\theta" },
        { label: "cos 2x", latex: "\\cos 2x", insertValue: "\\cos 2x" },
        { label: "tan identity", latex: "\\tan \\theta = \\frac{\\sin \\theta}{\\cos \\theta}", insertValue: "\\tan \\theta = \\frac{\\sin \\theta}{\\cos \\theta}" }
      ]
    }
  ];

  return (
    <StructureDropdown 
      id="struct-function"
      icon={FunctionIcon} 
      label="Function" 
      sections={sections}
    />
  );
};