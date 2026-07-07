import { LayoutSession } from './LayoutSession';
import { PageBuilder } from './PageBuilder';
import { PageConfig } from '../../types';
import { GeometryCalculator } from './GeometryCalculator';
import { LayoutEnvironmentImpl } from './LayoutEnvironment';
import { PaginationDecisionService } from './PaginationDecisionService';
import { PaginationAction } from './PaginationDecision';
import { ContinuationManager } from './ContinuationManager';
import { getLayoutId } from './MeasurementCache';

export class PaginationLoop {
  static run(
    nodes: HTMLElement[],
    session: LayoutSession,
    builder: PageBuilder,
    DPI = 96,
    SAFETY_BUFFER = 15,
    MIN_LINE_HEIGHT = 20
  ): void {
    let lastWasBreak = false;

    const getEffectiveDimensions = (frame: any, config: PageConfig) => {
      const cols = config.columns || 1;
      const gap = (config.columnGap || 0.5) * DPI;
      const effectiveWidth = (frame.bodyWidth - (cols - 1) * gap) / cols;
      const effectiveHeight = frame.bodyHeight * cols;
      return { effectiveWidth, effectiveHeight };
    };

    const dims = getEffectiveDimensions(session.pageFrame, session.pageConfig);
    let effectiveWidth = dims.effectiveWidth;
    let effectiveHeight = dims.effectiveHeight;
    session.measurementService.setWidth(effectiveWidth);

    for (let i = 0; i < nodes.length; i++) {
      session.checkCancelled();

      const node = nodes[i];

      // 1. Handle Section Breaks
      if (node.classList?.contains('prodoc-section-break')) {
        const configData = node.getAttribute('data-config');
        if (configData) {
          try {
            const newSettings = JSON.parse(decodeURIComponent(configData));
            const newConfig = { ...session.pageConfig, ...newSettings };
            session.pageConfig = newConfig;
            session.pageFrame = GeometryCalculator.calculate(newConfig, DPI);
            
            const newDims = getEffectiveDimensions(session.pageFrame, newConfig);
            effectiveWidth = newDims.effectiveWidth;
            effectiveHeight = newDims.effectiveHeight;
            session.measurementService.setWidth(effectiveWidth);

            builder.updateConfig(newConfig);
            session.environment = new LayoutEnvironmentImpl(newConfig, session.environment.debug);
          } catch (e) {
            console.error("Failed to parse section break", e);
          }
        }
        if (builder.getCurrentNodes().length > 0) {
          builder.finishPage();
          session.currentPageIndex++;
          session.currentHeight = 0;
        } else if (builder.getPages().length === 0) {
          builder.forcePage('<p><br/></p>');
        }
        lastWasBreak = true;
        continue;
      }

      lastWasBreak = false;

      // Check if we need to flush page before we start measuring the next block
      const remainingForStart = Math.max(0, effectiveHeight - session.currentHeight - SAFETY_BUFFER);
      if (session.currentHeight > 0 && remainingForStart < MIN_LINE_HEIGHT) {
        builder.finishPage();
        session.currentPageIndex++;
        session.currentHeight = 0;
        i--;
        continue;
      }

      // Measure using caches
      const nodeH = session.measurementService.measure(node, effectiveWidth);

      // Decision
      const decision = PaginationDecisionService.decide(
        node,
        nodeH,
        session.currentHeight,
        effectiveHeight,
        session,
        effectiveWidth,
        session.currentPageIndex,
        session.currentColumnIndex,
        0 // doc version is managed by engine
      );

      session.diagnostics.log(`Decision for node ${getLayoutId(node)}: Action=${PaginationAction[decision.action]}, NodeHeight=${nodeH}, CurrentHeight=${session.currentHeight}`);

      switch (decision.action) {
        case PaginationAction.Place:
          builder.append(node);
          session.currentHeight += nodeH;
          break;

        case PaginationAction.MoveNextPage:
          if (builder.getCurrentNodes().length > 0) {
            builder.finishPage();
            session.currentPageIndex++;
            session.currentHeight = 0;
            i--; // retry on next page
          } else {
            builder.append(node);
            session.currentHeight += nodeH;
          }
          break;

        case PaginationAction.ForceOverflow:
          builder.append(node);
          session.currentHeight += nodeH;
          builder.finishPage();
          session.currentPageIndex++;
          session.currentHeight = 0;
          break;

        case PaginationAction.Split:
          if (decision.keep && (decision.keep.hasChildNodes() || decision.keep.tagName === 'IMG' || decision.keep.tagName === 'TABLE')) {
            builder.append(decision.keep);
            builder.finishPage();
            session.currentPageIndex++;
            session.currentHeight = 0;
            if (decision.move && (decision.move.hasChildNodes() || decision.move.tagName === 'IMG' || decision.move.tagName === 'TABLE')) {
              const cleanedMove = ContinuationManager.prepareContinuation(decision.move);
              nodes[i] = cleanedMove;
              i--; // retry on next page with remaining part
            }
          } else {
            if (builder.getCurrentNodes().length > 0) {
              builder.finishPage();
              session.currentPageIndex++;
              session.currentHeight = 0;
              i--; // retry entire node on empty page
            } else {
              builder.append(node);
              session.currentHeight += nodeH;
            }
          }
          break;

        case PaginationAction.Atomic:
          if (builder.getCurrentNodes().length > 0) {
            builder.finishPage();
            session.currentPageIndex++;
            session.currentHeight = 0;
            i--; // retry on next page
          } else {
            builder.append(node);
            session.currentHeight += nodeH;
            builder.finishPage();
            session.currentPageIndex++;
            session.currentHeight = 0;
          }
          break;
      }
    }

    if (builder.getCurrentNodes().length > 0) {
      builder.finishPage();
    } else if (lastWasBreak || builder.getPages().length === 0) {
      builder.forcePage('<p><br></p>');
    }
  }
}
export default PaginationLoop;
