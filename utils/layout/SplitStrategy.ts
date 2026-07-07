import { LayoutContext } from './LayoutContext';

export enum SplitStatus {
  Success,
  Deferred,
  Oversized,
  Atomic
}

export interface SplitResult {
  readonly status: SplitStatus;
  readonly keep: HTMLElement | null;
  readonly move: HTMLElement | null;
  readonly splitIndex?: number;
  readonly reason?: string;
  readonly metrics?: {
    readonly originalHeight: number;
    readonly remainingSpace: number;
    readonly overflow: number;
  };
}

export type SplitMode = "fragment" | "segment" | "atomic";
export type OversizedMode = "overflow" | "partition" | "move";

export interface BlockPolicy {
  splitMode: SplitMode;
  oversizedMode: OversizedMode;
}

export interface LayoutSandbox {
  el: HTMLElement;
  setWidth(width: number): void;
  measure(node: Node, cache?: any, width?: number): number;
}

export interface SplitContext {
  readonly remainingSpace: number;
  readonly layoutContext: LayoutContext;
  readonly pageHeight: number;
  readonly pageWidth: number;
  readonly documentVersion: number;
  readonly pageIndex: number;
  readonly columnIndex: number;
  readonly debug: boolean;
  readonly measure: (node: Node) => number;
}

export interface SplitStrategy {
  readonly priority: number;
  supports(node: HTMLElement): boolean;
  split(
    node: HTMLElement,
    context: SplitContext
  ): SplitResult;
}
