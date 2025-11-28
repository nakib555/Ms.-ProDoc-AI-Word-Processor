import React from 'react';
import { StructureDropdown } from '../../common/EquationTools';

const RadicalIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M4 14h3l3 7L16 4h6" />
  </svg>
);

export const RadicalTool: React.FC = () => {
  const sections = [
    {
      title: "Radicals",
      items: [
        { label: "Square Root", latex: "\\sqrt{\\placeholder{}}", insertValue: "\\sqrt{\\placeholder{}}" },
        { label: "Radical with Degree", latex: "\\sqrt[\\placeholder{}]{\\placeholder{}}", insertValue: "\\sqrt[\\placeholder{}]{\\placeholder{}}" },
        { label: "Square Root with Degree 2", latex: "\\sqrt[2]{\\placeholder{}}", insertValue: "\\sqrt[2]{\\placeholder{}}" },
        { label: "Cubic Root", latex: "\\sqrt[3]{\\placeholder{}}", insertValue: "\\sqrt[3]{\\placeholder{}}" }
      ]
    },
    {
      title: "Common Radicals",
      items: [
        { label: "Quadratic Formula", latex: "\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", insertValue: "\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
        { label: "Pythagorean Theorem", latex: "\\sqrt{a^2 + b^2}", insertValue: "\\sqrt{a^2 + b^2}" }
      ]
    }
  ];

  return (
    <StructureDropdown 
        id="struct-radical"
        icon={RadicalIcon} 
        label="Radical" 
        sections={sections}
    />
  );
};