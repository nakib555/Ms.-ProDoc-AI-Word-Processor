import { Node, mergeAttributes } from '@tiptap/core';

export const EndnoteReferenceExtension = Node.create({
  name: 'endnoteReference',
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
        tag: 'span.prodoc-endnote-ref',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(
        {
          class: 'prodoc-endnote-ref font-bold text-xs select-none text-emerald-600 align-super hover:bg-emerald-100 px-0.5 rounded cursor-pointer transition-colors',
          'data-type': 'endnote-ref',
          contenteditable: 'false',
        },
        HTMLAttributes
      ),
      HTMLAttributes.label || '*'
    ];
  },
});
