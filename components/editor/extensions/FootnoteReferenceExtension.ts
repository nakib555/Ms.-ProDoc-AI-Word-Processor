import { Node, mergeAttributes } from '@tiptap/core';

export const FootnoteReferenceExtension = Node.create({
  name: 'footnoteReference',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      noteId: {
        default: null,
        parseHTML: element => element.getAttribute('data-note-id'),
        renderHTML: attributes => {
          if (!attributes.noteId) return {};
          return { 'data-note-id': attributes.noteId };
        },
      },
      label: {
        default: '',
        parseHTML: element => element.getAttribute('data-label') || element.textContent,
        renderHTML: attributes => {
          return { 'data-label': attributes.label || '' };
        }
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span.prodoc-footnote-ref',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(
        {
          class: 'prodoc-footnote-ref font-bold text-xs select-none text-indigo-600 align-super hover:bg-indigo-100 px-0.5 rounded cursor-pointer transition-colors',
          'data-type': 'footnote-ref',
          contenteditable: 'false',
        },
        HTMLAttributes
      ),
      HTMLAttributes.label || '*'
    ];
  },
});
