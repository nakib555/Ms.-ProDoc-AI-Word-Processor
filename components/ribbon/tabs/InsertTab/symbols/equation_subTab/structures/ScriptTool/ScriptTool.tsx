import React from 'react';
import { StructureDropdown } from '../../common/EquationTools';

const ScriptIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <rect x="4" y="10" width="10" height="10" strokeDasharray="2 2" opacity="0.5" />
    <rect x="16" y="4" width="6" height="6" strokeDasharray="2 2" opacity="0.5" />
  </svg>
);

export const ScriptTool: React.FC = () => {
  const sections = [
    {
      title: "Subscripts and Superscripts",
      items: [
        { label: "Superscript", latex: "\\placeholder{}^{\\placeholder{}}", insertValue: "\\placeholder{}^{\\placeholder{}}" },
        { label: "Subscript", latex: "\\placeholder{}_{\\placeholder{}}", insertValue: "\\placeholder{}_{\\placeholder{}}" },
        { label: "Subscript-Superscript", latex: "\\placeholder{}_{\\placeholder{}}^{\\placeholder{}}", insertValue: "\\placeholder{}_{\\placeholder{}}^{\\placeholder{}}" },
        { label: "Left Sub-Superscript", latex: "{}_{\\placeholder{}}^{\\placeholder{}}\\placeholder{}", insertValue: "{}_{\\placeholder{}}^{\\placeholder{}}\\placeholder{}" }
      ]
    },
    {
      title: "Common Subscripts and Superscripts",
      items: [
        { label: "Subscript Expression", latex: "x_{y^2}", insertValue: "x_{y^2}" },
        { label: "Exponential", latex: "e^{-i\\omega t}", insertValue: "e^{-i\\omega t}" },
        { label: "Squared", latex: "x^2", insertValue: "x^2" },
        { label: "Prescript Tensor", latex: "{}_{1}^{n}Y", insertValue: "{}_{1}^{n}Y" }
      ]
    }
  ];

  return (
    <StructureDropdown 
        id="struct-script"
        icon={ScriptIcon} 
        label="Script" 
        sections={sections}
    />
  );
};