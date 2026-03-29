
import { Node, mergeAttributes } from '@tiptap/core';

export const PageBreakExtension = Node.create({
  name: 'pageBreak',
  group: 'block',
  atom: true,
  draggable: true,
  
  parseHTML() {
    return [
      { tag: 'div', getAttrs: (node) => (node as HTMLElement).classList.contains('prodoc-page-break') && null },
      { tag: 'hr', getAttrs: (node) => (node as HTMLElement).style.pageBreakAfter === 'always' && null }
    ];
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'prodoc-page-break', 'data-type': 'page-break' })];
  },
  
  addCommands() {
    return {
      setPageBreak: () => ({ chain }) => {
        return chain().insertContent({ type: this.name }).run();
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => this.editor.commands.setPageBreak(),
    }
  },
});
