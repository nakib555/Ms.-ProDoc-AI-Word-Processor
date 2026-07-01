
import React from 'react';
import { StructureDropdown } from '../../common/EquationTools';

const FractionIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <rect x="8" y="4" width="8" height="6" strokeDasharray="2 2" opacity="0.5" />
    <rect x="8" y="14" width="8" height="6" strokeDasharray="2 2" opacity="0.5" />
  </svg>
);

export const FractionTool: React.FC = () => {
  const sections = [
    {
  title: "Fraction",
  cols: 4,
  items: [
    {
      label: "Stacked Fraction",
      latex: "\\frac{\\placeholder{}}{\\placeholder{}}",
      insertValue: "\\frac{\\placeholder{}}{\\placeholder{}}"
    },
    { label: "Skewed Fraction", latex: " {}^{\\displaystyle \\placeholder{}}/_{\\displaystyle \\placeholder{}}", 
      insertValue: "{ {}^{\\displaystyle \\placeholder{}}/_{\\displaystyle \\placeholder{}}}" },
    {
      label: "Linear Fraction",
      latex: "{\\placeholder{}}/{\\placeholder{}}",
      insertValue: "{\\placeholder{}}/{\\placeholder{}}"
    },
    {
      label: "Small Fraction",
      latex: "\\tfrac{\\placeholder{}}{\\placeholder{}}",
      insertValue: "\\tfrac{\\placeholder{}}{\\placeholder{}}"
    }
  ]
}
,
    {
      title: "Common Fraction",
      cols: 4,
      items: [
        { label: "dy over dx", latex: "\\frac{dy}{dx}", insertValue: "\\frac{dy}{dx}" },
        { label: "Delta y over Delta x", latex: "\\frac{\\Delta y}{\\Delta x}", insertValue: "\\frac{\\Delta y}{\\Delta x}" },
        { label: "Partial y over Partial x", latex: "\\frac{\\partial y}{\\partial x}", insertValue: "\\frac{\\partial y}{\\partial x}" },
        { label: "delta y over delta x", latex: "\\frac{\\delta y}{\\delta x}", insertValue: "\\frac{\\delta y}{\\delta x}" },
        { label: "Pi over 2", latex: "\\frac{\\pi}{2}", insertValue: "\\frac{\\pi}{2}" }
      ]
    }
  ];

  return (
    <StructureDropdown 
        id="struct-fraction"
        icon={FractionIcon} 
        label="Fraction" 
        sections={sections}
    />
  );
};
