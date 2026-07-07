import { SplitStrategy, SplitResult, SplitStatus, SplitContext } from '../SplitStrategy';
import { isAtomicElement, containsPageBreak } from '../helpers';

export class ParagraphSplitStrategy implements SplitStrategy {
  readonly priority = 1;

  supports(node: HTMLElement): boolean {
    const tag = node.tagName.toUpperCase();
    return ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'BLOCKQUOTE'].includes(tag);
  }

  split(
    node: HTMLElement,
    context: SplitContext
  ): SplitResult {
    const remainingSpace = context.remainingSpace;
    const effectiveLimit = Math.max(0, remainingSpace - context.layoutContext.environment.safetyBuffer);

    const keepNode = node.cloneNode(false) as HTMLElement;
    const moveNode = node.cloneNode(false) as HTMLElement;

    const findBinarySplitIndex = (text: string, parent: HTMLElement): number => {
      let low = 0;
      let high = text.length;
      let best = 0;
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const sub = text.substring(0, mid);
        const tempNode = document.createTextNode(sub);
        parent.appendChild(tempNode);
        const h = context.measure(keepNode);
        parent.removeChild(tempNode);
        if (h <= effectiveLimit) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      return best;
    };

    const moveSiblings = (nodes: Node[], startIdx: number, target: HTMLElement) => {
      for (let i = startIdx; i < nodes.length; i++) {
        target.appendChild(nodes[i].cloneNode(true));
      }
    };

    const processNodes = (nodes: Node[], parentKeep: HTMLElement, parentMove: HTMLElement): boolean => {
      for (let i = 0; i < nodes.length; i++) {
        const child = nodes[i];

        // Check if this child forces a break
        if (containsPageBreak(child) || (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).classList.contains('prodoc-page-break'))) {
          parentMove.appendChild(child.cloneNode(true));
          moveSiblings(nodes, i + 1, parentMove);
          return true;
        }

        const childClone = child.cloneNode(true);
        parentKeep.appendChild(childClone);

        if (context.measure(keepNode) <= effectiveLimit) {
          continue;
        }

        parentKeep.removeChild(childClone);

        if (isAtomicElement(child)) {
          parentMove.appendChild(child.cloneNode(true));
          moveSiblings(nodes, i + 1, parentMove);
          return true;
        }

        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent || '';
          const splitIndex = findBinarySplitIndex(text, parentKeep);
          if (splitIndex > 0) {
            parentKeep.appendChild(document.createTextNode(text.substring(0, splitIndex)));
          }
          const remainder = text.substring(splitIndex);
          if (remainder || splitIndex === 0) {
            parentMove.appendChild(document.createTextNode(remainder));
          }
          moveSiblings(nodes, i + 1, parentMove);
          return true;
        }

        if (child.nodeType === Node.ELEMENT_NODE) {
          const el = child as HTMLElement;
          const childKeep = el.cloneNode(false) as HTMLElement;
          const childMove = el.cloneNode(false) as HTMLElement;
          parentKeep.appendChild(childKeep);
          if (context.measure(keepNode) > effectiveLimit) {
            parentKeep.removeChild(childKeep);
            parentMove.appendChild(el.cloneNode(true));
            moveSiblings(nodes, i + 1, parentMove);
            return true;
          }
          const childNodes = Array.from(el.childNodes);
          const didSplitInside = processNodes(childNodes, childKeep, childMove);
          parentMove.appendChild(childMove);
          if (didSplitInside) {
            moveSiblings(nodes, i + 1, parentMove);
            return true;
          }
        }
      }
      return false;
    };

    const originalChildren = Array.from(node.childNodes);
    processNodes(originalChildren, keepNode, moveNode);

    const hasKeepContent = keepNode.hasChildNodes();
    if (!hasKeepContent && moveNode.hasChildNodes()) {
      const origHeight = context.measure(node);
      return {
        status: SplitStatus.Oversized,
        keep: null,
        move: moveNode,
        metrics: {
          originalHeight: origHeight,
          remainingSpace,
          overflow: origHeight - remainingSpace
        }
      };
    }

    return {
      status: SplitStatus.Success,
      keep: keepNode,
      move: moveNode
    };
  }
}
