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

    const findWordBinarySplitIndex = (text: string, parent: HTMLElement): number => {
      // Find all whitespace boundary positions to prevent shaving/slicing words in half
      const wordBreakIndices: number[] = [0];
      const regex = /\s+/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        wordBreakIndices.push(match.index);
      }
      wordBreakIndices.push(text.length);

      let low = 0;
      let high = wordBreakIndices.length - 1;
      let bestBreakIdx = 0;

      while (low <= high) {
        const midIdx = Math.floor((low + high) / 2);
        const charPos = wordBreakIndices[midIdx];
        const sub = text.substring(0, charPos);
        const tempNode = document.createTextNode(sub);
        parent.appendChild(tempNode);
        const h = context.measure(keepNode);
        parent.removeChild(tempNode);
        if (h <= effectiveLimit) {
          bestBreakIdx = midIdx;
          low = midIdx + 1;
        } else {
          high = midIdx - 1;
        }
      }

      return wordBreakIndices[bestBreakIdx];
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
          const splitIndex = findWordBinarySplitIndex(text, parentKeep);
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

    // Orphan/Widow protection: If keepNode has less than 10 characters or no content,
    // defer entire paragraph to next page to prevent awkward single-word shaved lines
    const keepTextLength = keepNode.textContent?.trim().length || 0;
    if (keepTextLength < 10 && moveNode.hasChildNodes()) {
      const origHeight = context.measure(node);
      return {
        status: SplitStatus.Oversized,
        keep: null,
        move: node.cloneNode(true) as HTMLElement,
        metrics: {
          originalHeight: origHeight,
          remainingSpace,
          overflow: origHeight - remainingSpace
        }
      };
    }

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
