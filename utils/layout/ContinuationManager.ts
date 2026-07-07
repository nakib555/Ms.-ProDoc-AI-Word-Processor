export class ContinuationManager {
  static prepareContinuation(moveNode: HTMLElement): HTMLElement {
    // Clear layout ID of the move-part to allow fresh processing
    moveNode.removeAttribute('data-layout-id');
    // Recursively clear internal nested layout IDs to prevent cache conflicts
    moveNode.querySelectorAll('[data-layout-id]').forEach(child => {
      child.removeAttribute('data-layout-id');
    });
    return moveNode;
  }
}
