import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { DocumentIdentityService } from '../../../utils/identityService';
import { Node as ProseMirrorNode } from 'prosemirror-model';

export const IdentityExtension = Extension.create({
  name: 'identity',

  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading', 'table', 'image', 'equation', 'bulletList', 'orderedList', 'listItem', 'tableRow', 'tableCell', 'tableHeader'],
        attributes: {
          id: {
            default: null,
            parseHTML: element => element.getAttribute('data-id'),
            renderHTML: attributes => {
              if (!attributes.id) {
                return {};
              }
              return { 'data-id': attributes.id };
            },
          },
          styleId: {
            default: null,
            parseHTML: element => element.getAttribute('data-style-id'),
            renderHTML: attributes => {
              if (!attributes.styleId) return {};
              return { 'data-style-id': attributes.styleId };
            }
          }
        },
      },
    ];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('identity'),
        appendTransaction(transactions, oldState, newState) {
          const tr = newState.tr;
          let modified = false;

          if (!transactions.some((t) => t.docChanged)) {
            return null;
          }

          const seenIds = new Set<string>();
          const nodesToUpdate: { pos: number; node: ProseMirrorNode }[] = [];

          // Helper to check and assign IDs
          const checkNode = (node: ProseMirrorNode, pos: number) => {
            if (node.isText) return;

            const isIdentifiable = node.isBlock || node.type.name === 'image' || node.type.name === 'equation';
            if (isIdentifiable) {
              const id = node.attrs.id;
              if (!id || seenIds.has(id)) {
                nodesToUpdate.push({ pos, node });
              } else {
                seenIds.add(id);
              }
            }
          };

          // To ensure global uniqueness, we unfortunately need to track seen IDs for the whole doc,
          // but we can optimize by only setting new IDs on nodes within the changed ranges.
          // Wait, if a node is copy-pasted, it will have duplicate IDs.
          // A robust way that is still somewhat fast is to traverse the document, track seen IDs,
          // and if we see a duplicate or a missing ID, we update it.
          // Since `descendants` is fast (just walking the AST), for typical documents it's < 5ms.
          // Let's do a full pass for uniqueness, which is the standard ProseMirror way to ensure no duplicates.
          
          newState.doc.descendants((node, pos) => {
            checkNode(node, pos);
          });

          if (nodesToUpdate.length > 0) {
            nodesToUpdate.forEach(({ pos, node }) => {
              const newId = DocumentIdentityService.generateId(node.type.name);
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, id: newId });
              seenIds.add(newId);
              modified = true;
            });
          }

          return modified ? tr : null;
        }
      })
    ];
  }
});
