import React from 'react';
import { StructureDropdown } from '../../common/EquationTools';

const OperatorIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M12 18h-7l3.5-7 3.5-7 3.5 7 3.5 7z" fill="none" /> 
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

export const OperatorTool: React.FC = () => {
  const sections = [
    {
      title: "Basic Operators",
      items: [
        // Row 1
        { label: "Definition", latex: ":=", insertValue: ":=" },
        { label: "Equality Check", latex: "==", insertValue: "==" },
        { label: "Increment", latex: "+=", insertValue: "+=" },
        { label: "Decrement", latex: "-=", insertValue: "-=" },
        // Row 2
        { label: "Defined Equal", latex: "\\overset{\\text{def}}{=}", insertValue: "\\overset{\\text{def}}{=}" },
        { label: "Measured Equal", latex: "\\overset{m}{=}", insertValue: "\\overset{m}{=}" },
        { label: "Delta Equal", latex: "\\triangleq", insertValue: "\\triangleq" }
      ]
    },
    {
      title: "Operator Structures",
      items: [
        // Row 1: Single Arrows
        { label: "Left Arrow Under", latex: "\\xleftarrow[\\placeholder{}]", insertValue: "\\xleftarrow[\\placeholder{}]{}" },
        { label: "Right Arrow Under", latex: "\\xrightarrow[\\placeholder{}]", insertValue: "\\xrightarrow[\\placeholder{}]{}" },
        { label: "Left Arrow Over", latex: "\\xleftarrow{\\placeholder{}}", insertValue: "\\xleftarrow{\\placeholder{}}" },
        { label: "Right Arrow Over", latex: "\\xrightarrow{\\placeholder{}}", insertValue: "\\xrightarrow{\\placeholder{}}" },
        
        // Row 2: Double Arrows
        { label: "Double Left Arrow Under", latex: "\\xLeftarrow[\\placeholder{}]", insertValue: "\\xLeftarrow[\\placeholder{}]{}" },
        { label: "Double Right Arrow Under", latex: "\\xRightarrow[\\placeholder{}]", insertValue: "\\xRightarrow[\\placeholder{}]{}" },
        { label: "Double Left Arrow Over", latex: "\\xLeftarrow{\\placeholder{}}", insertValue: "\\xLeftarrow{\\placeholder{}}" },
        { label: "Double Right Arrow Over", latex: "\\xRightarrow{\\placeholder{}}", insertValue: "\\xRightarrow{\\placeholder{}}" },
        
        // Row 3: Bi-directional Arrows
        { label: "Left-Right Arrow Under", latex: "\\xleftrightarrow[\\placeholder{}]", insertValue: "\\xleftrightarrow[\\placeholder{}]{}" },
        { label: "Left-Right Arrow Over", latex: "\\xleftrightarrow{\\placeholder{}}", insertValue: "\\xleftrightarrow{\\placeholder{}}" },
        { label: "Double Left-Right Arrow Under", latex: "\\xLeftrightarrow[\\placeholder{}]", insertValue: "\\xLeftrightarrow[\\placeholder{}]{}" },
        { label: "Double Left-Right Arrow Over", latex: "\\xLeftrightarrow{\\placeholder{}}", insertValue: "\\xLeftrightarrow{\\placeholder{}}" }
      ]
    },
    {
        title: "Common Operator Structures",
        items: [
            { label: "Yields", latex: "\\xrightarrow{\\text{yields}}", insertValue: "\\xrightarrow{\\text{yields}}" },
            { label: "Delta Transformation", latex: "\\xrightarrow{\\Delta}", insertValue: "\\xrightarrow{\\Delta}" }
        ]
    }
  ];

  return (
    <StructureDropdown 
        id="struct-operator"
        icon={OperatorIcon} 
        label="Operator" 
        sections={sections}
    />
  );
};