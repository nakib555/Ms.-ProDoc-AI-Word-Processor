import React from 'react';
import { StructureDropdown } from '../../common/EquationTools';

const LimitIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <text x="4" y="12" fontSize="10" fontFamily="serif" fill="currentColor">lim</text>
    <rect x="4" y="14" width="16" height="6" strokeDasharray="2 2" opacity="0.5" />
  </svg>
);

export const LimitLogTool: React.FC = () => {
  const sections = [
    {
      title: "Functions",
      items: [
        // Row 1
        { label: "Log with Base", latex: "\\log_{\\placeholder{}} \\placeholder{}", insertValue: "\\log_{\\placeholder{}} \\placeholder{}" },
        { label: "Log", latex: "\\log \\placeholder{}", insertValue: "\\log \\placeholder{}" },
        { label: "Limit", latex: "\\lim_{\\placeholder{}} \\placeholder{}", insertValue: "\\lim_{\\placeholder{}} \\placeholder{}" },
        // Row 2
        { label: "Minimum", latex: "\\min_{\\placeholder{}} \\placeholder{}", insertValue: "\\min_{\\placeholder{}} \\placeholder{}" },
        { label: "Maximum", latex: "\\max_{\\placeholder{}} \\placeholder{}", insertValue: "\\max_{\\placeholder{}} \\placeholder{}" },
        { label: "Natural Log", latex: "\\ln \\placeholder{}", insertValue: "\\ln \\placeholder{}" }
      ]
    },
    {
        title: "Common Functions",
        items: [
            { label: "Euler's Limit", latex: "\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^{n}", insertValue: "\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^{n}" },
            { label: "Max Example", latex: "\\max_{0 \\le x \\le 1} x e^{-x^2}", insertValue: "\\max_{0 \\le x \\le 1} x e^{-x^2}" }
        ]
    }
  ];

  return (
    <StructureDropdown 
        id="struct-limitlog"
        icon={LimitIcon} 
        label="Limit and Log" 
        sections={sections}
    />
  );
};