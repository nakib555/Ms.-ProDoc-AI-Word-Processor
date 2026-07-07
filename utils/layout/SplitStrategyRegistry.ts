import { SplitStrategy } from './SplitStrategy';

export class SplitStrategyRegistry {
  private strategies: SplitStrategy[] = [];
  private defaultStrategy: SplitStrategy | null = null;

  register(strategy: SplitStrategy): void {
    if (!this.strategies.includes(strategy)) {
      this.strategies.push(strategy);
      // Sort by descending priority so that the highest priority is evaluated first.
      this.strategies.sort((a, b) => b.priority - a.priority);
    }
  }

  unregister(strategy: SplitStrategy): void {
    const idx = this.strategies.indexOf(strategy);
    if (idx !== -1) {
      this.strategies.splice(idx, 1);
    }
    if (this.defaultStrategy === strategy) {
      this.defaultStrategy = null;
    }
  }

  setDefault(strategy: SplitStrategy): void {
    this.defaultStrategy = strategy;
  }

  find(node: HTMLElement): SplitStrategy {
    for (const strategy of this.strategies) {
      if (strategy.supports(node)) {
        return strategy;
      }
    }
    if (!this.defaultStrategy) {
      throw new Error("No default split strategy configured");
    }
    return this.defaultStrategy;
  }

  clear(): void {
    this.strategies = [];
    this.defaultStrategy = null;
  }
}
