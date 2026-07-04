// utils/eventBus.ts

export type EventType =
  | 'DocumentChanged'
  | 'LayoutInvalidated'
  | 'RevisionCreated'
  | 'CommentResolved'
  | 'FieldUpdated'
  | 'PageRebuilt'
  | 'TOCUpdated'
  | 'ExportStarted'
  | 'ExportCompleted'
  | 'SpellCheckFinished';

export type EventCallback<T = any> = (data: T) => void;

/**
 * Enterprise-grade Centralized Event Bus.
 * Enables loose coupling across style engines, pagination nodes, 
 * field evaluation layers, and front-end widgets.
 */
export class EventBus {
  private listeners = new Map<EventType, Set<EventCallback>>();
  private performanceLogs: { event: EventType; timestamp: number; duration?: number }[] = [];

  /**
   * Subscribes a listener to a given event type.
   * Returns an unsubscribe function.
   */
  public on<T = any>(event: EventType, callback: EventCallback<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      const set = this.listeners.get(event);
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          this.listeners.delete(event);
        }
      }
    };
  }

  /**
   * Publishes an event with optional payload data.
   */
  public emit<T = any>(event: EventType, data?: T): void {
    const start = performance.now();
    const set = this.listeners.get(event);
    if (set) {
      set.forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`Error executing event listener for ${event}:`, err);
        }
      });
    }
    const duration = performance.now() - start;
    this.performanceLogs.push({ event, timestamp: Date.now(), duration });
  }

  /**
   * Retrieves performance metrics for events to help diagnostic telemetries.
   */
  public getPerformanceLogs() {
    return this.performanceLogs;
  }

  /**
   * Resets all listeners.
   */
  public clear(): void {
    this.listeners.clear();
    this.performanceLogs = [];
  }
}

export const globalEventBus = new EventBus();
