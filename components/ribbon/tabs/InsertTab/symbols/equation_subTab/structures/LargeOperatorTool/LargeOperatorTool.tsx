import React from 'react';
import { StructureDropdown } from '../../common/EquationTools';

const LargeOpIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M18 7V4H6v3l5 5-5 5v3h12v-3" />
  </svg>
);

export const LargeOperatorTool: React.FC = () => {
  const sections = [
    {
      title: "Summations",
      items: [
        { label: "Summation", latex: "\\sum \\placeholder{}", insertValue: "\\sum \\placeholder{}" },
        { label: "Summation with Subscript", latex: "\\sum_{\\placeholder{}} \\placeholder{}", insertValue: "\\sum_{\\placeholder{}} \\placeholder{}" },
        { label: "Summation with Sub/Superscript", latex: "\\sum_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\sum_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        { label: "Summation Stacked Subscript", latex: "\\sum\\limits_{\\placeholder{}} \\placeholder{}", insertValue: "\\sum\\limits_{\\placeholder{}} \\placeholder{}" },
        { label: "Summation Stacked Sub/Superscript", latex: "\\sum\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\sum\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" }
      ]
    },
    {
      title: "Products and Co-Products",
      items: [
        // Products
        { label: "Product", latex: "\\prod \\placeholder{}", insertValue: "\\prod \\placeholder{}" },
        { label: "Product with Subscript", latex: "\\prod_{\\placeholder{}} \\placeholder{}", insertValue: "\\prod_{\\placeholder{}} \\placeholder{}" },
        { label: "Product with Sub/Superscript", latex: "\\prod_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\prod_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        { label: "Product Stacked Subscript", latex: "\\prod\\limits_{\\placeholder{}} \\placeholder{}", insertValue: "\\prod\\limits_{\\placeholder{}} \\placeholder{}" },
        { label: "Product Stacked Sub/Superscript", latex: "\\prod\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\prod\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        // Co-Products
        { label: "Co-Product", latex: "\\coprod \\placeholder{}", insertValue: "\\coprod \\placeholder{}" },
        { label: "Co-Product with Subscript", latex: "\\coprod_{\\placeholder{}} \\placeholder{}", insertValue: "\\coprod_{\\placeholder{}} \\placeholder{}" },
        { label: "Co-Product with Sub/Superscript", latex: "\\coprod_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\coprod_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        { label: "Co-Product Stacked Subscript", latex: "\\coprod\\limits_{\\placeholder{}} \\placeholder{}", insertValue: "\\coprod\\limits_{\\placeholder{}} \\placeholder{}" },
        { label: "Co-Product Stacked Sub/Superscript", latex: "\\coprod\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\coprod\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" }
      ]
    },
    {
      title: "Unions and Intersections",
      items: [
        // Unions
        { label: "Union", latex: "\\bigcup \\placeholder{}", insertValue: "\\bigcup \\placeholder{}" },
        { label: "Union with Subscript", latex: "\\bigcup_{\\placeholder{}} \\placeholder{}", insertValue: "\\bigcup_{\\placeholder{}} \\placeholder{}" },
        { label: "Union with Sub/Superscript", latex: "\\bigcup_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\bigcup_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        { label: "Union Stacked Subscript", latex: "\\bigcup\\limits_{\\placeholder{}} \\placeholder{}", insertValue: "\\bigcup\\limits_{\\placeholder{}} \\placeholder{}" },
        { label: "Union Stacked Sub/Superscript", latex: "\\bigcup\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\bigcup\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        // Intersections
        { label: "Intersection", latex: "\\bigcap \\placeholder{}", insertValue: "\\bigcap \\placeholder{}" },
        { label: "Intersection with Subscript", latex: "\\bigcap_{\\placeholder{}} \\placeholder{}", insertValue: "\\bigcap_{\\placeholder{}} \\placeholder{}" },
        { label: "Intersection with Sub/Superscript", latex: "\\bigcap_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\bigcap_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
        { label: "Intersection Stacked Subscript", latex: "\\bigcap\\limits_{\\placeholder{}} \\placeholder{}", insertValue: "\\bigcap\\limits_{\\placeholder{}} \\placeholder{}" },
        { label: "Intersection Stacked Sub/Superscript", latex: "\\bigcap\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\bigcap\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" }
      ]
    },
    {
        title: "Other Large Operators",
        items: [
            // Wedge (Big Vee / OR)
            { label: "Wedge", latex: "\\bigvee \\placeholder{}", insertValue: "\\bigvee \\placeholder{}" },
            { label: "Wedge with Subscript", latex: "\\bigvee_{\\placeholder{}} \\placeholder{}", insertValue: "\\bigvee_{\\placeholder{}} \\placeholder{}" },
            { label: "Wedge with Sub/Superscript", latex: "\\bigvee_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\bigvee_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
            { label: "Wedge Stacked Subscript", latex: "\\bigvee\\limits_{\\placeholder{}} \\placeholder{}", insertValue: "\\bigvee\\limits_{\\placeholder{}} \\placeholder{}" },
            { label: "Wedge Stacked Sub/Superscript", latex: "\\bigvee\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\bigvee\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
            // Vee (Big Wedge / AND)
            { label: "Vee", latex: "\\bigwedge \\placeholder{}", insertValue: "\\bigwedge \\placeholder{}" },
            { label: "Vee with Subscript", latex: "\\bigwedge_{\\placeholder{}} \\placeholder{}", insertValue: "\\bigwedge_{\\placeholder{}} \\placeholder{}" },
            { label: "Vee with Sub/Superscript", latex: "\\bigwedge_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\bigwedge_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" },
            { label: "Vee Stacked Subscript", latex: "\\bigwedge\\limits_{\\placeholder{}} \\placeholder{}", insertValue: "\\bigwedge\\limits_{\\placeholder{}} \\placeholder{}" },
            { label: "Vee Stacked Sub/Superscript", latex: "\\bigwedge\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}", insertValue: "\\bigwedge\\limits_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}" }
        ]
    },
    {
        title: "Common Large Operators",
        items: [
            { label: "Sum Binomial", latex: "\\sum_{k} \\binom{n}{k}", insertValue: "\\sum_{k} \\binom{n}{k}" },
            { label: "Sum Range", latex: "\\sum_{i=0}^{n} \\placeholder{}", insertValue: "\\sum_{i=0}^{n} \\placeholder{}" },
            { label: "Sum Complex Range", latex: "\\sum_{\\substack{0\\le i\\le m\\\\ 0< j< n}} P(i,j)", insertValue: "\\sum_{\\substack{0\\le i\\le m\\\\ 0< j< n}} P(i,j)" },
            { label: "Product Range", latex: "\\prod_{k=1}^{n} A_k", insertValue: "\\prod_{k=1}^{n} A_k" },
            { label: "Union Range", latex: "\\bigcup_{n=1}^{m} (X_n \\cap Y_n)", insertValue: "\\bigcup_{n=1}^{m} (X_n \\cap Y_n)" }
        ]
    }
  ];

  return (
    <StructureDropdown 
        id="struct-largeop"
        icon={LargeOpIcon} 
        label="Large Operator" 
        sections={sections}
    />
  );
};