
import React from 'react';
import { StructureDropdown } from '../../common/EquationTools';

const MatrixIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <rect x="4" y="4" width="6" height="6" strokeDasharray="2 2" opacity="0.5" />
    <rect x="14" y="4" width="6" height="6" strokeDasharray="2 2" opacity="0.5" />
    <rect x="4" y="14" width="6" height="6" strokeDasharray="2 2" opacity="0.5" />
    <rect x="14" y="14" width="6" height="6" strokeDasharray="2 2" opacity="0.5" />
  </svg>
);

export const MatrixTool: React.FC = () => {
  const sections = [
    {
      title: "Empty Matrices",
      items: [
        { label: "1x2 Matrix", latex: "\\begin{matrix} \\placeholder & \\placeholder \\end{matrix}", insertValue: "\\begin{matrix} \\placeholder & \\placeholder \\end{matrix}" },
        { label: "2x1 Matrix", latex: "\\begin{matrix} \\placeholder \\\\ \\placeholder \\end{matrix}", insertValue: "\\begin{matrix} \\placeholder \\\\ \\placeholder \\end{matrix}" },
        { label: "2x2 Matrix", latex: "\\begin{matrix} \\placeholder & \\placeholder \\\\ \\placeholder & \\placeholder \\end{matrix}", insertValue: "\\begin{matrix} \\placeholder & \\placeholder \\\\ \\placeholder & \\placeholder \\end{matrix}" },
        { label: "3x3 Matrix", latex: "\\begin{matrix} \\placeholder & \\placeholder & \\placeholder \\\\ \\placeholder & \\placeholder & \\placeholder \\\\ \\placeholder & \\placeholder & \\placeholder \\end{matrix}", insertValue: "\\begin{matrix} \\placeholder & \\placeholder & \\placeholder \\\\ \\placeholder & \\placeholder & \\placeholder \\\\ \\placeholder & \\placeholder & \\placeholder \\end{matrix}" }
      ]
    },
    {
      title: "Matrices with Brackets",
      items: [
        { label: "Parentheses Matrix", latex: "\\begin{pmatrix} \\placeholder & \\placeholder \\\\ \\placeholder & \\placeholder \\end{pmatrix}", insertValue: "\\begin{pmatrix} \\placeholder & \\placeholder \\\\ \\placeholder & \\placeholder \\end{pmatrix}" },
        { label: "Square Brackets Matrix", latex: "\\begin{bmatrix} \\placeholder & \\placeholder \\\\ \\placeholder & \\placeholder \\end{bmatrix}", insertValue: "\\begin{bmatrix} \\placeholder & \\placeholder \\\\ \\placeholder & \\placeholder \\end{bmatrix}" }
      ]
    },
    {
        title: "Dots",
        items: [
            { label: "Dots", latex: "\\dots", insertValue: "\\dots" },
            { label: "Vertical Dots", latex: "\\vdots", insertValue: "\\vdots" },
            { label: "Diagonal Dots", latex: "\\ddots", insertValue: "\\ddots" }
        ]
    },
    {
        title: "Identity Matrices",
        items: [
            { label: "2x2 Identity", latex: "\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}", insertValue: "\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}" },
            { label: "3x3 Identity", latex: "\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}", insertValue: "\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}" }
        ]
    },
    {
        title: "Sparse Matrices",
        items: [
            { label: "Sparse", latex: "\\begin{pmatrix} 1 & & \\\\ & 1 & \\\\ & & 1 \\end{pmatrix}", insertValue: "\\begin{pmatrix} 1 & & \\\\ & 1 & \\\\ & & 1 \\end{pmatrix}" }
        ]
    }
  ];

  return (
    <StructureDropdown 
        id="struct-matrix"
        icon={MatrixIcon} 
        label="Matrix" 
        sections={sections}
    />
  );
};
