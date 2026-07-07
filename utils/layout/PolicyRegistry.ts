import { SplitStrategy, SplitMode, OversizedMode } from './SplitStrategy';
import { SplitStrategyRegistry } from './SplitStrategyRegistry';

export interface PolicyRule {
  readonly selector: string;
  readonly priority: number;
  readonly splitMode: SplitMode;
  readonly oversizedMode: OversizedMode;
  readonly strategy: SplitStrategy;
  readonly predicate?: (node: HTMLElement) => boolean;
}

export class PolicyRegistry {
  private rules: PolicyRule[] = [];
  private strategyRegistry: SplitStrategyRegistry;

  constructor(strategyRegistry: SplitStrategyRegistry) {
    this.strategyRegistry = strategyRegistry;
  }

  register(rule: PolicyRule): void {
    if (!this.rules.some(r => r.selector === rule.selector)) {
      this.rules.push(rule);
      // Sort by priority descending so higher priority rules (more specific) are matched first
      this.rules.sort((a, b) => b.priority - a.priority);
    }
  }

  resolve(node: HTMLElement): PolicyRule {
    for (const rule of this.rules) {
      try {
        if (node.matches(rule.selector)) {
          if (!rule.predicate || rule.predicate(node)) {
            return rule;
          }
        }
      } catch {
        // Ignored, fallback if matches fails
      }
    }

    // Default Fallback Rule based on the strategy registry
    const fallbackStrategy = this.strategyRegistry.find(node);
    const isAtomic = fallbackStrategy.priority >= 10;
    const isTable = node.tagName === 'TABLE';

    return {
      selector: '*',
      priority: fallbackStrategy.priority,
      splitMode: isAtomic ? 'atomic' : (isTable ? 'segment' : 'fragment'),
      oversizedMode: isAtomic ? 'move' : (isTable ? 'partition' : 'overflow'),
      strategy: fallbackStrategy
    };
  }

  clear(): void {
    this.rules = [];
  }
}
