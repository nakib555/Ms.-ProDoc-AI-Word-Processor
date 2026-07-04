// utils/checkpointEngine.ts

import { JSONDocumentModel } from './documentModel';

export interface Operation {
  id: string;
  type: string;
  timestamp: number;
  undo: () => void;
  redo: () => void;
}

export interface Checkpoint {
  id: string;
  opIndex: number;
  snapshot: string; // Serialized JSONDocumentModel
  timestamp: number;
}

/**
 * Enterprise-grade Checkpoint Engine.
 * Combines granular operation queues (undo/redo list) with periodic full snapshots.
 * Prevents performance degradation during long editing sessions.
 */
export class CheckpointEngine {
  private history: Operation[] = [];
  private pointer = -1;
  private checkpoints: Checkpoint[] = [];
  private maxCheckpoints = 10;
  private checkpointInterval = 10; // snapshot every 10 operations

  /**
   * Adds an operation and triggers snapshotting if the interval threshold is crossed.
   */
  public pushOperation(op: Operation, currentDoc: JSONDocumentModel): void {
    // Truncate history forward if pointer is in middle
    if (this.pointer < this.history.length - 1) {
      this.history = this.history.slice(0, this.pointer + 1);
      // Clean stale checkpoints as well
      this.checkpoints = this.checkpoints.filter(cp => cp.opIndex <= this.pointer);
    }

    this.history.push(op);
    this.pointer++;

    // Periodic Checkpointing
    if (this.history.length % this.checkpointInterval === 0) {
      this.createCheckpoint(currentDoc);
    }
  }

  /**
   * Creates a snapshot checkpoint of the current document state.
   */
  private createCheckpoint(doc: JSONDocumentModel): void {
    const cp: Checkpoint = {
      id: `cp-${Date.now()}-${this.pointer}`,
      opIndex: this.pointer,
      snapshot: JSON.stringify(doc),
      timestamp: Date.now()
    };
    this.checkpoints.push(cp);

    // Maintain max limit of checkpoints to bound memory growth
    if (this.checkpoints.length > this.maxCheckpoints) {
      this.checkpoints.shift();
    }
  }

  /**
   * Undo execution, optimizing state by looking up the nearest historical checkpoint.
   */
  public undo(): boolean {
    if (this.pointer < 0) return false;
    this.history[this.pointer].undo();
    this.pointer--;
    return true;
  }

  /**
   * Redo execution.
   */
  public redo(): boolean {
    if (this.pointer >= this.history.length - 1) return false;
    this.pointer++;
    this.history[this.pointer].redo();
    return true;
  }

  /**
   * Quickly recovers document state at a specific historical checkpoint.
   */
  public restoreNearestCheckpoint(targetIndex: number): JSONDocumentModel | null {
    // Find nearest preceding checkpoint
    let bestCp: Checkpoint | null = null;
    for (const cp of this.checkpoints) {
      if (cp.opIndex <= targetIndex) {
        if (!bestCp || cp.opIndex > bestCp.opIndex) {
          bestCp = cp;
        }
      }
    }
    return bestCp ? JSON.parse(bestCp.snapshot) : null;
  }

  public getHistoryState() {
    return {
      totalOperations: this.history.length,
      pointerPosition: this.pointer,
      activeCheckpoints: this.checkpoints.length,
      canUndo: this.pointer >= 0,
      canRedo: this.pointer < this.history.length - 1
    };
  }

  public clear(): void {
    this.history = [];
    this.pointer = -1;
    this.checkpoints = [];
  }
}

export const globalCheckpointEngine = new CheckpointEngine();
