export enum PaginationAction {
  Place,
  Split,
  MoveNextPage,
  ForceOverflow,
  Atomic
}

export enum OverflowReason {
  Oversized,
  Atomic,
  Deferred,
  KeepTogether
}

export interface PaginationDecision {
  action: PaginationAction;
  keep: HTMLElement | null;
  move: HTMLElement | null;
  reason?: OverflowReason;
}
