import { SplitStrategy, SplitResult, SplitStatus, SplitContext } from '../SplitStrategy';
import { isAtomicElement } from '../helpers';

export class AtomicSplitStrategy implements SplitStrategy {
  readonly priority = 10;

  supports(node: HTMLElement): boolean {
    return isAtomicElement(node);
  }

  split(
    node: HTMLElement,
    _context: SplitContext
  ): SplitResult {
    return {
      status: SplitStatus.Atomic,
      keep: null,
      move: node.cloneNode(true) as HTMLElement
    };
  }
}
