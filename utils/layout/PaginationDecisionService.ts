import { PaginationDecision, PaginationAction, OverflowReason } from './PaginationDecision';
import { LayoutContext } from './LayoutContext';
import { SplitStatus, SplitContext } from './SplitStrategy';
import { getLayoutId } from './MeasurementCache';

const MIN_LINE_HEIGHT = 18;
const SAFETY_BUFFER = 20;

export class PaginationDecisionService {
  static decide(
    node: HTMLElement,
    nodeH: number,
    currentH: number,
    effectiveHeight: number,
    context: LayoutContext,
    pageWidth: number,
    pageIndex: number,
    columnIndex: number,
    documentVersion: number
  ): PaginationDecision {
    const remainingSpace = Math.max(0, effectiveHeight - currentH);

    // 1. Check for explicit page breaks
    const isPageBreak = node.classList?.contains('prodoc-page-break') || 
                        node.getAttribute('data-type') === 'page-break' || 
                        node.style?.pageBreakAfter === 'always' || 
                        node.style?.breakAfter === 'page';
    if (isPageBreak) {
      return {
        action: PaginationAction.MoveNextPage,
        keep: node,
        move: null
      };
    }

    // 2. Keep Together logic for tables
    const isTable = node.tagName === 'TABLE';
    const keepTogether = isTable && node.getAttribute('data-keep-together') === 'true';
    if (keepTogether && currentH > 0 && currentH + nodeH > effectiveHeight - SAFETY_BUFFER) {
      return {
        action: PaginationAction.MoveNextPage,
        keep: null,
        move: node,
        reason: OverflowReason.KeepTogether
      };
    }

    // 3. Simple fits-completely check
    if (currentH + nodeH <= effectiveHeight - SAFETY_BUFFER) {
      return {
        action: PaginationAction.Place,
        keep: node,
        move: null
      };
    }

    // 4. Element does not fit completely. We need to split or move.
    const id = getLayoutId(node);

    // Check if this node has already been handled as oversized in this session
    if (context.state.oversizedHandled.has(id)) {
      if (currentH < MIN_LINE_HEIGHT * 2) {
        context.diagnostics.log(`Node ${id} already handled as oversized. Forcing overflow at top of page.`);
        return {
          action: PaginationAction.ForceOverflow,
          keep: node,
          move: null,
          reason: OverflowReason.Oversized
        };
      } else {
        context.diagnostics.log(`Node ${id} already handled. Moving to next page.`);
        return {
          action: PaginationAction.MoveNextPage,
          keep: null,
          move: node,
          reason: OverflowReason.Deferred
        };
      }
    }

    // Fetch block policy from the instance policyRegistry
    const resolvedPolicy = context.engine.policyRegistry.resolve(node);

    // If it is atomic, it cannot be split
    if (resolvedPolicy.splitMode === "atomic") {
      if (currentH > 0) {
        return {
          action: PaginationAction.MoveNextPage,
          keep: null,
          move: node,
          reason: OverflowReason.Atomic
        };
      } else {
        context.state.oversizedHandled.add(id);
        return {
          action: PaginationAction.ForceOverflow,
          keep: node,
          move: null,
          reason: OverflowReason.Atomic
        };
      }
    }

    // Create the immutable SplitContext for the split strategy
    const splitContext: SplitContext = {
      remainingSpace,
      layoutContext: context,
      pageHeight: effectiveHeight,
      pageWidth,
      documentVersion,
      pageIndex,
      columnIndex,
      debug: false,
      measure: (n: Node) => {
        return context.measurementService.measure(n, pageWidth);
      }
    };

    // Run the split strategy
    const splitResult = resolvedPolicy.strategy.split(node, splitContext);

    // Trace diagnostics with the new strongly-typed event format
    context.diagnostics.logEvent({
      type: 'SPLIT',
      timestamp: typeof performance !== 'undefined' ? performance.now() : Date.now(),
      payload: {
        nodeId: id,
        policy: resolvedPolicy.selector,
        strategy: resolvedPolicy.strategy.constructor.name,
        status: SplitStatus[splitResult.status],
        remainingSpace
      }
    });

    if (splitResult.status === SplitStatus.Success && splitResult.keep) {
      return {
        action: PaginationAction.Split,
        keep: splitResult.keep,
        move: splitResult.move
      };
    }

    if (splitResult.status === SplitStatus.Oversized) {
      if (currentH > 0) {
        return {
          action: PaginationAction.MoveNextPage,
          keep: null,
          move: node,
          reason: OverflowReason.Deferred
        };
      } else {
        context.state.oversizedHandled.add(id);

        if (resolvedPolicy.oversizedMode === "partition" && splitResult.keep) {
          return {
            action: PaginationAction.Split,
            keep: splitResult.keep,
            move: splitResult.move
          };
        } else {
          return {
            action: PaginationAction.ForceOverflow,
            keep: node,
            move: null,
            reason: OverflowReason.Oversized
          };
        }
      }
    }

    // Default fallback
    if (currentH > 0) {
      return {
        action: PaginationAction.MoveNextPage,
        keep: null,
        move: node,
        reason: OverflowReason.Deferred
      };
    } else {
      context.state.oversizedHandled.add(id);
      return {
        action: PaginationAction.ForceOverflow,
        keep: node,
        move: null,
        reason: OverflowReason.Oversized
      };
    }
  }
}
