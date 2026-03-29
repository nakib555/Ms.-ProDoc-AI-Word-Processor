
import Paragraph from '@tiptap/extension-paragraph';

export const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      indent: {
        default: 0,
        parseHTML: element => element.style.marginLeft ? parseInt(element.style.marginLeft) : 0,
        renderHTML: attributes => {
            if (!attributes.indent) return {};
            return { style: `margin-left: ${attributes.indent}px` };
        },
      },
      marginRight: {
        default: 0,
        parseHTML: element => element.style.marginRight ? parseInt(element.style.marginRight) : 0,
        renderHTML: attributes => {
            if (!attributes.marginRight) return {};
            return { style: `margin-right: ${attributes.marginRight}px` };
        },
      },
      spacingBefore: {
        default: 0,
        parseHTML: element => element.style.marginTop ? parseInt(element.style.marginTop) : 0,
        renderHTML: attributes => {
            if (!attributes.spacingBefore) return {};
            return { style: `margin-top: ${attributes.spacingBefore}px` };
        },
      },
      spacingAfter: {
        default: 0, // Default paragraph spacing
        parseHTML: element => element.style.marginBottom ? parseInt(element.style.marginBottom) : 0,
        renderHTML: attributes => {
            if (!attributes.spacingAfter) return {};
            return { style: `margin-bottom: ${attributes.spacingAfter}px` };
        },
      },
    };
  },
});
