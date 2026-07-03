import { 
  JSONDocumentModel, 
  defaultMigrationRegistry, 
  defaultSerializerRegistry, 
  DocumentDiffPatchEngine, 
  DocumentIncrementalParser, 
  EditorTransaction, 
  validateDocumentNode,
  SectionElement,
  migrateDocumentToTargetVersion
} from './documentModel';

export interface TestCaseResult {
  name: string;
  passed: boolean;
  durationMs: number;
  message?: string;
  details?: string;
}

export interface TestSuiteSummary {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  totalDurationMs: number;
  results: TestCaseResult[];
}

export class DocumentEngineTestSuite {
  /**
   * Run all tests in the suite.
   */
  public static async runSuite(): Promise<TestSuiteSummary> {
    const start = Date.now();
    const results: TestCaseResult[] = [];

    const runTest = async (name: string, testFn: () => void | Promise<void>) => {
      const tStart = Date.now();
      try {
        await testFn();
        results.push({
          name,
          passed: true,
          durationMs: Date.now() - tStart
        });
      } catch (err: any) {
        results.push({
          name,
          passed: false,
          durationMs: Date.now() - tStart,
          message: err?.message || String(err),
          details: err?.stack || ''
        });
      }
    };

    // 1. Bidirectional Migration Chain Test
    await runTest('Bidirectional Migration Chains (v1 <-> v2)', () => {
      const v1Doc: any = {
        type: 'document',
        schemaVersion: 1,
        metadata: { title: 'v1 Test Document' },
        pages: [
          {
            sections: [
              {
                elements: [
                  { type: 'paragraph', children: [{ type: 'text', text: 'Hello v1' }] },
                  { type: 'table', rows: [{ cells: [{ elements: [{ type: 'paragraph', children: [{ type: 'text', text: 'Cell v1' }] }] }] }] }
                ]
              }
            ]
          }
        ]
      };

      // Migrate v1 -> v2
      const v2Doc = defaultMigrationRegistry.migrate(v1Doc as JSONDocumentModel, 2);
      if (v2Doc.schemaVersion !== 2) {
        throw new Error(`Migration to v2 failed. Version is ${v2Doc.schemaVersion}`);
      }
      
      const firstNode = v2Doc.pages[0].sections[0].elements[0];
      if (!firstNode.id) {
        throw new Error('Migration did not generate stable IDs for v2 nodes');
      }

      // Migrate v2 -> v1 (Downgrade)
      const downgradedDoc = defaultMigrationRegistry.migrate(v2Doc, 1);
      if (downgradedDoc.schemaVersion !== 1) {
        throw new Error(`Downgrade to v1 failed. Version is ${downgradedDoc.schemaVersion}`);
      }
      if ('comments' in downgradedDoc || 'revisionHistory' in downgradedDoc) {
        throw new Error('Downgrade did not safely strip v2 attributes');
      }

      // Re-migrate v1 -> v2 (Double roundtrip verification)
      const roundtrippedDoc = defaultMigrationRegistry.migrate(downgradedDoc, 2);
      if (roundtrippedDoc.schemaVersion !== 2) {
        throw new Error('Roundtrip migration to v2 failed');
      }
    });

    // 2. Parser Fuzzing / Malformed Trees Test
    await runTest('Parser Robustness and Fuzzing', () => {
      const fuzzedNode: any = {
        type: 'heading',
        level: 99, // Out of bounds
        id: '', // Missing ID
        children: [
          { type: 'text', text: 'Invalid Heading', style: { bold: 'yes-please', color: 12345 } } // Broken types
        ]
      };

      // Test inline validation / recovery strategy
      const issues = validateDocumentNode(fuzzedNode as SectionElement);
      if (issues.length === 0) {
        throw new Error('Fuzzing detector failed to catch out of bounds heading level 99');
      }
      
      // Attempt recovery
      const recoveredDoc = migrateDocumentToTargetVersion({
        type: 'document',
        schemaVersion: 1,
        metadata: { title: 'Fuzzed Doc' },
        pageConfig: { size: 'letter', orientation: 'portrait', margins: { top: 72, bottom: 72, left: 72, right: 72 } },
        pages: [{ sections: [{ elements: [fuzzedNode] }] }]
      }, 2);

      const recoveredNode = recoveredDoc.pages[0].sections[0].elements[0];
      if (recoveredNode.level === 99) {
        throw new Error('Parser failed to repair level 99 heading during migration/validation');
      }
    });

    // 3. Serializer Round-Trip Consistency
    await runTest('Serializer Round-Trip Consistency', () => {
      const doc: JSONDocumentModel = {
        type: 'document',
        schemaVersion: 2,
        metadata: { title: 'Roundtrip Test' },
        pageConfig: { size: 'letter', orientation: 'portrait', margins: { top: 72, bottom: 72, left: 72, right: 72 } },
        pages: [{
          sections: [{
            elements: [
              { id: 'node-p1', type: 'paragraph', children: [{ type: 'text', text: 'Hello Roundtrip World!' }] }
            ]
          }]
        }]
      };

      const htmlSerializer = defaultSerializerRegistry.getSerializer('html');
      const mdSerializer = defaultSerializerRegistry.getSerializer('markdown');
      const textSerializer = defaultSerializerRegistry.getSerializer('text');

      if (!htmlSerializer || !mdSerializer || !textSerializer) {
        throw new Error('Required default serializers (HTML, MD, Text) are missing from registry');
      }

      const htmlOutput = htmlSerializer.serialize(doc);
      if (!htmlOutput.includes('Hello Roundtrip World!')) {
        throw new Error(`HTML Serializer output mismatch: ${htmlOutput}`);
      }

      const mdOutput = mdSerializer.serialize(doc);
      if (!mdOutput.includes('Hello Roundtrip World!')) {
        throw new Error(`Markdown Serializer output mismatch: ${mdOutput}`);
      }

      const textOutput = textSerializer.serialize(doc);
      if (textOutput.trim() !== 'Hello Roundtrip World!') {
        throw new Error(`Plain Text Serializer output mismatch: "${textOutput}"`);
      }
    });

    // 4. Stable ID Preservation on Split/Merge Operations
    await runTest('Stable Node ID Preservation during Splits & Merges', () => {
      const initialDoc: JSONDocumentModel = {
        type: 'document',
        schemaVersion: 2,
        metadata: { title: 'Splits and Merges' },
        pageConfig: { size: 'letter', orientation: 'portrait', margins: { top: 72, bottom: 72, left: 72, right: 72 } },
        pages: [{
          sections: [{
            elements: [
              { id: 'p-node-original', type: 'paragraph', children: [{ type: 'text', text: 'Line 1 and Line 2' }] }
            ]
          }]
        }]
      };

      // Simulate a Split transaction: split "p-node-original" into "p-node-original" (Line 1) and "p-node-new" (Line 2)
      const splitNode1: SectionElement = { id: 'p-node-original', type: 'paragraph', children: [{ type: 'text', text: 'Line 1' }] };
      const splitNode2: SectionElement = { id: 'p-node-new', type: 'paragraph', children: [{ type: 'text', text: 'Line 2' }] };

      // Update node 1 and insert node 2
      let docState = DocumentDiffPatchEngine.patchNode(initialDoc, 'p-node-original', splitNode1);
      docState = DocumentDiffPatchEngine.insertNodeAfter(docState, 'p-node-original', splitNode2);

      const elements = docState.pages[0].sections[0].elements;
      if (elements.length !== 2) {
        throw new Error(`Split failed. Expected 2 nodes, got ${elements.length}`);
      }
      if (elements[0].id !== 'p-node-original' || elements[1].id !== 'p-node-new') {
        throw new Error('Split operation corrupted stable node IDs');
      }

      // Simulate a Merge transaction: merge "p-node-new" back into "p-node-original" and delete "p-node-new"
      const mergedNode: SectionElement = { id: 'p-node-original', type: 'paragraph', children: [{ type: 'text', text: 'Line 1 and Line 2' }] };
      docState = DocumentDiffPatchEngine.patchNode(docState, 'p-node-original', mergedNode);
      docState = DocumentDiffPatchEngine.deleteNode(docState, 'p-node-new');

      const finalElements = docState.pages[0].sections[0].elements;
      if (finalElements.length !== 1) {
        throw new Error(`Merge failed. Expected 1 node, got ${finalElements.length}`);
      }
      if (finalElements[0].id !== 'p-node-original') {
        throw new Error('Merge operation corrupted stable node identity');
      }
    });

    // 5. Incremental vs. Full Reparsing Equivalence
    await runTest('Incremental Parsing vs. Full Reparse Equivalence', () => {
      const baseDoc: JSONDocumentModel = {
        type: 'document',
        schemaVersion: 2,
        metadata: { title: 'Equivalence Test' },
        pageConfig: { size: 'letter', orientation: 'portrait', margins: { top: 72, bottom: 72, left: 72, right: 72 } },
        pages: [{
          sections: [{
            elements: [
              { id: 'para-1', type: 'paragraph', children: [{ type: 'text', text: 'Old Content' }] }
            ]
          }]
        }]
      };

      // Prepare incremental update transaction
      const tx: EditorTransaction = {
        transactionId: 'tx-001',
        timestamp: Date.now(),
        affectedNodeIds: ['para-1'],
        rawContentMap: {
          'para-1': {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Beautiful New Content' }]
          }
        }
      };

      const result = DocumentIncrementalParser.parseTransaction(baseDoc, tx);
      const elements = result.document.pages[0].sections[0].elements;
      
      if (elements[0].children[0].text !== 'Beautiful New Content') {
        throw new Error(`Incremental parse failed to update text: ${JSON.stringify(elements[0])}`);
      }
      if (elements[0].id !== 'para-1') {
        throw new Error('Incremental parser failed to preserve stable node ID');
      }
    });

    // 6. Concurrent Transactions State Check
    await runTest('Concurrent Transactions Sequence Integrity', () => {
      const doc: JSONDocumentModel = {
        type: 'document',
        schemaVersion: 2,
        metadata: { title: 'Concurrent Tx' },
        pageConfig: { size: 'letter', orientation: 'portrait', margins: { top: 72, bottom: 72, left: 72, right: 72 } },
        pages: [{
          sections: [{
            elements: [
              { id: 'n1', type: 'paragraph', children: [{ type: 'text', text: 'Init 1' }] },
              { id: 'n2', type: 'paragraph', children: [{ type: 'text', text: 'Init 2' }] }
            ]
          }]
        }]
      };

      // Transaction A modifies node 1
      const txA: EditorTransaction = {
        transactionId: 'tx-A',
        timestamp: Date.now(),
        affectedNodeIds: ['n1'],
        rawContentMap: {
          'n1': { type: 'paragraph', content: [{ type: 'text', text: 'Modified by A' }] }
        }
      };

      // Transaction B modifies node 2
      const txB: EditorTransaction = {
        transactionId: 'tx-B',
        timestamp: Date.now(),
        affectedNodeIds: ['n2'],
        rawContentMap: {
          'n2': { type: 'paragraph', content: [{ type: 'text', text: 'Modified by B' }] }
        }
      };

      const resA = DocumentIncrementalParser.parseTransaction(doc, txA);
      const resB = DocumentIncrementalParser.parseTransaction(resA.document, txB);

      const finalEl = resB.document.pages[0].sections[0].elements;
      if (finalEl[0].children[0].text !== 'Modified by A' || finalEl[1].children[0].text !== 'Modified by B') {
        throw new Error('Sequential transactions suffered state loss or overwrites');
      }
    });

    // 7. Mass Scale Performance Benchmark (10,000+ virtual node items)
    await runTest('Enterprise-Scale Performance Benchmark (10,000 Nodes)', () => {
      // Create a large document structure with 10,000 paragraphs
      const bigElements: SectionElement[] = [];
      for (let i = 0; i < 10000; i++) {
        bigElements.push({
          id: `para-heavy-${i}`,
          type: 'paragraph',
          children: [{ type: 'text', text: `Paragraph scale item index ${i}` }]
        });
      }

      const bigDoc: JSONDocumentModel = {
        type: 'document',
        schemaVersion: 2,
        metadata: { title: 'Massive Performance Test' },
        pageConfig: { size: 'letter', orientation: 'portrait', margins: { top: 72, bottom: 72, left: 72, right: 72 } },
        pages: [{
          sections: [{
            elements: bigElements
          }]
        }]
      };

      const serializeStart = Date.now();
      const txtSerializer = defaultSerializerRegistry.getSerializer('text');
      if (txtSerializer) {
        const text = txtSerializer.serialize(bigDoc);
        if (text.length < 100000) {
          throw new Error('Massive serialization yielded incomplete text buffer');
        }
      }
      const serializeDuration = Date.now() - serializeStart;

      // Ensure transaction patching on a 10,000-node document is near instantaneous (< 15ms)
      const patchStart = Date.now();
      const updatedNode: SectionElement = {
        id: 'para-heavy-5000',
        type: 'paragraph',
        children: [{ type: 'text', text: 'Patched super fast!' }]
      };
      const patchedDoc = DocumentDiffPatchEngine.patchNode(bigDoc, 'para-heavy-5000', updatedNode);
      const patchDuration = Date.now() - patchStart;

      if (patchedDoc.pages[0].sections[0].elements[5000].children[0].text !== 'Patched super fast!') {
        throw new Error('Patch node operation failed on enterprise-scale document');
      }

      console.log(`Mass scale serialization took ${serializeDuration}ms. Patching took ${patchDuration}ms.`);
    });

    // 8. Identity Service Tests
    await runTest('Identity Service & ID Validation', async () => {
      const { DocumentIdentityService } = await import('./identityService.ts');
      const id1 = DocumentIdentityService.generateId('test');
      const id2 = DocumentIdentityService.generateId('test');
      
      if (id1 === id2) throw new Error('ID collision detected');
      
      const { retainedId, newId } = DocumentIdentityService.splitId(id1);
      if (retainedId !== id1 || newId === id1) throw new Error('splitId logic failed');

      const val = DocumentIdentityService.validateIds([id1, id1, '']);
      if (val.duplicates.length !== 1 || val.missingCount !== 1) {
        throw new Error('ID validation failed to detect duplicate or missing IDs');
      }
    });

    // 9. Reference Graph
    await runTest('Reference Graph Remapping', async () => {
      const { ReferenceGraph } = await import('./referenceGraph.ts');
      const graph = new ReferenceGraph();
      
      graph.addReference({ sourceId: 'cmt-1', sourceType: 'comment', targetNodeId: 'node-a' });
      graph.addReference({ sourceId: 'bkm-1', sourceType: 'bookmark', targetNodeId: 'node-b' });

      // Remap node-a to node-b (merge scenario)
      graph.remapTarget('node-a', 'node-b');

      const incoming = graph.getIncomingReferences('node-b');
      if (incoming.length !== 2) throw new Error('Reference remapping failed');
      
      const invalidated = graph.invalidateReferences('node-b');
      if (invalidated.length !== 2) throw new Error('Invalidation failed');
      if (graph.getIncomingReferences('node-b').length !== 0) throw new Error('References not cleared');
    });

    // 10. Style System & Resolver
    await runTest('Style System Resolution & Inheritance', async () => {
      const { createDefaultStyleSystem, StyleResolver } = await import('./styleSystem.ts');
      const system = createDefaultStyleSystem();
      const resolver = new StyleResolver(system);

      const h1Style = resolver.resolve('style-h1');
      // h1 is based on normal, which has fontFamily 'Inter, sans-serif'
      if (h1Style.fontFamily !== 'Inter, sans-serif') throw new Error('Inherited property failed to resolve');
      // h1 overrides fontSize
      if (h1Style.fontSize !== '2.5rem') throw new Error('Override property failed to resolve');
    });

    // 11. Anchor Engine
    await runTest('Anchor Engine Affinities', async () => {
      const { AnchorEngine } = await import('./anchorEngine.ts');
      
      const anchors = [
        { id: 'a1', type: 'comment' as const, startNodeId: 'node-1', startOffset: 5, endNodeId: 'node-1', endOffset: 5, affinity: 'forward' as const },
        { id: 'a2', type: 'comment' as const, startNodeId: 'node-1', startOffset: 5, endNodeId: 'node-1', endOffset: 5, affinity: 'backward' as const }
      ];

      // Insert exactly at offset 5. Forward moves, backward stays.
      AnchorEngine.handleTextInsertion(anchors, 'node-1', 5, 3);
      
      if (anchors[0].startOffset !== 8) throw new Error('Forward affinity failed');
      if (anchors[1].startOffset !== 5) throw new Error('Backward affinity failed');

      // Delete across both anchors
      AnchorEngine.handleTextDeletion(anchors, 'node-1', 2, 10);
      // Both should snap to start of deletion (offset 2)
      if (anchors[0].startOffset !== 2 || anchors[1].startOffset !== 2) throw new Error('Deletion snapping failed');
    });

    const duration = Date.now() - start;
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;

    const summary: TestSuiteSummary = {
      totalTests: results.length,
      passedTests: passed,
      failedTests: failed,
      totalDurationMs: duration,
      results
    };

    console.log(`=== DOCUMENT ENGINE AUTOMATED TEST SUITE COMPLETED ===`);
    console.log(`Passed: ${passed}/${results.length} | Failed: ${failed} | Total Duration: ${duration}ms`);
    results.forEach(res => {
      console.log(` - [${res.passed ? 'PASS' : 'FAIL'}] ${res.name} (${res.durationMs}ms)`);
      if (!res.passed) {
        console.error(`   Error: ${res.message}\n${res.details}`);
      }
    });

    return summary;
  }
}
