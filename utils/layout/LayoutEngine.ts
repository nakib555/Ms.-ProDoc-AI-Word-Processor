import { LayoutEngineConfiguration } from './LayoutEngineConfiguration';
import { SplitStrategyRegistry } from './SplitStrategyRegistry';
import { PolicyRegistry, PolicyRule } from './PolicyRegistry';
import { SplitStrategy } from './SplitStrategy';
import { AtomicSplitStrategy } from './strategies/AtomicSplitStrategy';
import { TableSplitStrategy } from './strategies/TableSplitStrategy';
import { ParagraphSplitStrategy } from './strategies/ParagraphSplitStrategy';

export class LayoutEngine {
  readonly configuration: LayoutEngineConfiguration;
  readonly strategyRegistry: SplitStrategyRegistry;
  readonly policyRegistry: PolicyRegistry;

  constructor(options: {
    configuration: LayoutEngineConfiguration;
    strategies?: SplitStrategy[];
    policies?: PolicyRule[];
  }) {
    this.configuration = options.configuration;
    this.strategyRegistry = new SplitStrategyRegistry();
    this.policyRegistry = new PolicyRegistry(this.strategyRegistry);

    const atomic = new AtomicSplitStrategy();
    const table = new TableSplitStrategy();
    const paragraph = new ParagraphSplitStrategy();

    const strategies = options.strategies || [atomic, table, paragraph];

    strategies.forEach(s => {
      this.strategyRegistry.register(s);
      if (s.priority === 1) { // Paragraph default
        this.strategyRegistry.setDefault(s);
      }
    });

    const policies = options.policies || [
      {
        selector: 'img, video, iframe, hr, math-field, .equation-wrapper, .prodoc-page-break, .prodoc-section-break',
        priority: 10,
        splitMode: 'atomic',
        oversizedMode: 'move',
        strategy: strategies.find(s => s.priority === 10) || atomic
      },
      {
        selector: 'table',
        priority: 5,
        splitMode: 'segment',
        oversizedMode: 'partition',
        strategy: strategies.find(s => s.priority === 5) || table
      },
      {
        selector: 'p, div, h1, h2, h3, h4, h5, h6, ul, ol, li, blockquote',
        priority: 1,
        splitMode: 'fragment',
        oversizedMode: 'overflow',
        strategy: strategies.find(s => s.priority === 1) || paragraph
      }
    ];

    policies.forEach(p => this.policyRegistry.register(p));
  }
}
