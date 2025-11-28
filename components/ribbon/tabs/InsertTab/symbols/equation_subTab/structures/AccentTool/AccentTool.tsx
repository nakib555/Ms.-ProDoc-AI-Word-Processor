import React from 'react';
import { StructureDropdown } from '../../common/EquationTools';

const AccentIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <text x="8" y="18" fontSize="14" fontFamily="serif" fill="currentColor">a</text>
    <circle cx="12" cy="4" r="1" fill="currentColor" />
    <circle cx="15" cy="4" r="1" fill="currentColor" />
  </svg>
);

export const AccentTool: React.FC = () => {
  const sections = [
    {
      title: "Accents",
      items: [
        // Row 1
        { label: "Dot", latex: "\\dot{\\placeholder{}}", insertValue: "\\dot{\\placeholder{}}" },
        { label: "Double Dot", latex: "\\ddot{\\placeholder{}}", insertValue: "\\ddot{\\placeholder{}}" },
        { label: "Triple Dot", latex: "\\dddot{\\placeholder{}}", insertValue: "\\dddot{\\placeholder{}}" },
        { label: "Hat", latex: "\\hat{\\placeholder{}}", insertValue: "\\hat{\\placeholder{}}" },
        // Row 2
        { label: "Check", latex: "\\check{\\placeholder{}}", insertValue: "\\check{\\placeholder{}}" },
        { label: "Acute", latex: "\\acute{\\placeholder{}}", insertValue: "\\acute{\\placeholder{}}" },
        { label: "Grave", latex: "\\grave{\\placeholder{}}", insertValue: "\\grave{\\placeholder{}}" },
        { label: "Breve", latex: "\\breve{\\placeholder{}}", insertValue: "\\breve{\\placeholder{}}" },
        // Row 3
        { label: "Tilde", latex: "\\tilde{\\placeholder{}}", insertValue: "\\tilde{\\placeholder{}}" },
        { label: "Bar", latex: "\\bar{\\placeholder{}}", insertValue: "\\bar{\\placeholder{}}" },
        { label: "Vector", latex: "\\vec{\\placeholder{}}", insertValue: "\\vec{\\placeholder{}}" },
        { label: "Left Vector", latex: "\\overleftarrow{\\placeholder{}}", insertValue: "\\overleftarrow{\\placeholder{}}" },
        // Row 4
        { label: "Right Arrow", latex: "\\overrightarrow{\\placeholder{}}", insertValue: "\\overrightarrow{\\placeholder{}}" },
        { label: "Left Arrow", latex: "\\overleftarrow{\\placeholder{}}", insertValue: "\\overleftarrow{\\placeholder{}}" },
        { label: "Double Arrow", latex: "\\overleftrightarrow{\\placeholder{}}", insertValue: "\\overleftrightarrow{\\placeholder{}}" },
        { label: "Wide Hat", latex: "\\widehat{\\placeholder{}}", insertValue: "\\widehat{\\placeholder{}}" },
      ]
    },
    {
        title: "Boxed Formulas",
        items: [
            { label: "Boxed", latex: "\\boxed{\\placeholder{}}", insertValue: "\\boxed{\\placeholder{}}" }
        ]
    },
    {
        title: "Overbars and Underbars",
        items: [
            { label: "Overline", latex: "\\overline{\\placeholder{}}", insertValue: "\\overline{\\placeholder{}}" },
            { label: "Underline", latex: "\\underline{\\placeholder{}}", insertValue: "\\underline{\\placeholder{}}" },
            { label: "Overbrace", latex: "\\overbrace{\\placeholder{}}", insertValue: "\\overbrace{\\placeholder{}}" },
            { label: "Underbrace", latex: "\\underbrace{\\placeholder{}}", insertValue: "\\underbrace{\\placeholder{}}" }
        ]
    },
    {
        title: "Common Accent Objects",
        items: [
            // These items match the visuals in the screenshot but insert generic structures
            { label: "Bar A", latex: "\\bar{A}", insertValue: "\\bar{\\placeholder{}}" },
            { label: "Overline ABC", latex: "\\overline{ABC}", insertValue: "\\overline{\\placeholder{}}" },
            { label: "Overline Expression", latex: "\\overline{x \\oplus y}", insertValue: "\\overline{\\placeholder{} \\oplus \\placeholder{}}" }
        ]
    }
  ];

  return (
    <StructureDropdown 
        id="struct-accent"
        icon={AccentIcon} 
        label="Accent" 
        sections={sections}
    />
  );
};