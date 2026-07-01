import React from 'react';
import { StructureDropdown } from '../../common/EquationTools';

const IntegralIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M12 4c-2 0-4 2-4 4v8c0 2 2 4 4 4" strokeLinecap="round" />
    <path d="M12 20c2 0 4-2 4-4V8c0-2-2-4-4-4" strokeLinecap="round" />
  </svg>
);

export const IntegralTool: React.FC = () => {
  const sections = [
    {
      title: "Integrals",
      items: [
        // Row 1: Single Integrals
        { label: "Integral", latex: "\\int \\placeholder{}", insertValue: "\\int \\placeholder{}" },
        { label: "Integral with Limits", latex: "\\int_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\int_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        { label: "Integral with Stacked Limits", latex: "\\int\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\int\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        
        // Row 2: Double Integrals
        { label: "Double Integral", latex: "\\iint \\placeholder{}", insertValue: "\\iint \\placeholder{}" },
        { label: "Double Integral with Limits", latex: "\\iint_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\iint_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        { label: "Double Integral with Stacked Limits", latex: "\\iint\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\iint\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        
        // Row 3: Triple Integrals
        { label: "Triple Integral", latex: "\\iiint \\placeholder{}", insertValue: "\\iiint \\placeholder{}" },
        { label: "Triple Integral with Limits", latex: "\\iiint_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\iiint_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        { label: "Triple Integral with Stacked Limits", latex: "\\iiint\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\iiint\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" }
      ]
    },
    {
      title: "Contour Integrals",
      items: [
        // Row 1: Single Contour
        { label: "Contour Integral", latex: "\\oint \\placeholder{}", insertValue: "\\oint \\placeholder{}" },
        { label: "Contour Integral with Limits", latex: "\\oint_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\oint_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        { label: "Contour Integral with Stacked Limits", latex: "\\oint\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\oint\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        
        // Row 2: Surface Contour (Double)
        { label: "Surface Contour Integral", latex: "\\oiint \\placeholder{}", insertValue: "\\oiint \\placeholder{}" },
        { label: "Surface Contour with Limits", latex: "\\oiint_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\oiint_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        { label: "Surface Contour with Stacked Limits", latex: "\\oiint\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\oiint\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        
        // Row 3: Volume Contour (Triple)
        { label: "Volume Contour Integral", latex: "\\oiiint \\placeholder{}", insertValue: "\\oiiint \\placeholder{}" },
        { label: "Volume Contour with Limits", latex: "\\oiiint_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\oiiint_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        { label: "Volume Contour with Stacked Limits", latex: "\\oiiint\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\oiiint\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" }
      ]
    },
    {
        title: "Differentials",
        items: [
            { label: "Differential x", latex: "dx", insertValue: "dx" },
            { label: "Differential y", latex: "dy", insertValue: "dy" },
            { label: "Differential theta", latex: "d\\theta", insertValue: "d\\theta" },
        ]
    }
  ];

  return (
    <StructureDropdown 
        id="struct-integral"
        icon={IntegralIcon} 
        label="Integral" 
        sections={sections}
    />
  );
};