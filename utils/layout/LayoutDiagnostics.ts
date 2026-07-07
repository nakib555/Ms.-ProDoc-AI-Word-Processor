export type LayoutEventType = 
  | 'MEASURED'
  | 'SPLIT'
  | 'CACHE_HIT'
  | 'CACHE_MISS'
  | 'PAGE_CREATED'
  | 'BLOCK_MOVED'
  | 'OVERFLOW'
  | 'LOG';

export interface MeasureEvent {
  readonly type: 'MEASURED';
  readonly timestamp: number;
  readonly payload: {
    readonly nodeId: string;
    readonly height: number;
    readonly pageWidth: number;
  };
}

export interface SplitEvent {
  readonly type: 'SPLIT';
  readonly timestamp: number;
  readonly payload: {
    readonly nodeId: string;
    readonly policy: string;
    readonly strategy: string;
    readonly status: string;
    readonly remainingSpace: number;
  };
}

export interface CacheHitEvent {
  readonly type: 'CACHE_HIT';
  readonly timestamp: number;
  readonly payload: {
    readonly id: string;
    readonly height: number;
    readonly pageWidth: number;
  };
}

export interface CacheMissEvent {
  readonly type: 'CACHE_MISS';
  readonly timestamp: number;
  readonly payload: {
    readonly id: string;
    readonly pageWidth: number;
  };
}

export interface PageCreatedEvent {
  readonly type: 'PAGE_CREATED';
  readonly timestamp: number;
  readonly payload: {
    readonly pageIndex: number;
  };
}

export interface BlockMovedEvent {
  readonly type: 'BLOCK_MOVED';
  readonly timestamp: number;
  readonly payload: {
    readonly nodeId: string;
    readonly fromPage: number;
    readonly toPage: number;
  };
}

export interface OverflowEvent {
  readonly type: 'OVERFLOW';
  readonly timestamp: number;
  readonly payload: {
    readonly nodeId: string;
    readonly height: number;
    readonly remainingSpace: number;
  };
}

export interface LogEvent {
  readonly type: 'LOG';
  readonly timestamp: number;
  readonly payload: {
    readonly message: string;
  };
}

export type LayoutEvent =
  | MeasureEvent
  | SplitEvent
  | CacheHitEvent
  | CacheMissEvent
  | PageCreatedEvent
  | BlockMovedEvent
  | OverflowEvent
  | LogEvent;

export type LayoutEventListener = (event: LayoutEvent) => void;

export class LayoutDiagnostics {
  private logs: string[] = [];
  private debug: boolean;
  private static listeners: Set<LayoutEventListener> = new Set();
  private events: LayoutEvent[] = [];

  constructor(debug = false) {
    this.debug = debug;
  }

  static subscribe(listener: LayoutEventListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(event: LayoutEvent): void {
    this.events.push(event);

    if (event.type === 'LOG') {
      this.logs.push(`[Layout] ${event.payload.message}`);
    } else {
      this.logs.push(`[Layout Event: ${event.type}] ${JSON.stringify(event.payload)}`);
    }

    LayoutDiagnostics.listeners.forEach(listener => {
      try {
        listener(event);
      } catch (e) {
        console.error("Error in layout diagnostics listener", e);
      }
    });
  }

  log(message: string): void {
    if (this.debug) {
      this.emit({
        type: 'LOG',
        timestamp: typeof performance !== 'undefined' ? performance.now() : Date.now(),
        payload: { message }
      });
    }
  }

  logEvent(event: LayoutEvent): void {
    this.emit(event);
  }

  getLogs(): string[] {
    return this.logs;
  }

  getEvents(): LayoutEvent[] {
    return this.events;
  }

  clear(): void {
    this.logs = [];
    this.events = [];
  }
}
