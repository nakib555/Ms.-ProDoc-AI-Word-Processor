# Graph Report - applet  (2026-11-26)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2272 nodes · 7416 edges · 108 communities (78 shown, 30 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 48 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- EquationTools.tsx
- StudioCommandBar.tsx
- SmallRibbonButton
- documentModel.ts
- InsertTools.tsx
- MenuPortal
- measurement.ts
- LayoutEngine.ts
- react
- types.ts
- RibbonSection
- SmallRibbonButton
- RibbonButton
- useDesignTab
- equationPresets.ts
- tableUtils.ts
- FontDialogLauncher.tsx
- useFileTab
- shapesTool.tsx
- useEditor
- WriteInsertFieldsGroup.tsx
- lucide-react
- dependencies
- EditorContext.tsx
- mathUtils.ts
- PageConfig
- JSONDocumentModel
- HomeTab.tsx
- devDependencies
- draft.ts
- ViewTab.tsx
- App.tsx
- package.json
- CustomMargin/PageSetupDialog.tsx
- documentTestSuite.ts
- EditorPage/EditorPage.tsx
- PrintModal.tsx
- Ribbon.tsx
- HTMLImportEngine
- historyManager.ts
- useDrawTab
- ReviewTab.tsx
- GestureContext.tsx
- DocumentModelContext.tsx
- Paginator.ts
- PaginationLoop.ts
- renderingPipelineManager.ts
- LayoutDiagnostics
- LayoutSession.ts
- PrintLayoutView.tsx
- ribbonAndPortal.test.tsx
- vectorPdfEngine.ts
- compilerOptions
- tiptapJSONToJSONDocument
- NumberingEngine
- TypographyEngine
- styleSystem.ts
- PaginationDecisionService.ts
- vite.config.ts
- PluginSDK
- htmlToJSONDocument
- Editor.tsx
- imageContentExtractor.ts
- pluginSDK.ts
- RibbonSeparator
- BenchmarkModal.tsx
- parseTiptapBlockNode
- CheckpointEngine
- DocumentTransactionManager
- ResourceManager
- IdentityExtension.ts
- eslint.config.js
- MeasurementService
- JsonDocInspectorSidebar.tsx
- CrossReferenceEngine
- wrangler.json
- scripts
- DocumentMigrationRegistry
- ParserRegistry
- formulaEngine.ts
- CommandRegistry
- serialize
- GhostPage.tsx
- anchorEngine.ts
- documentConverter.ts
- DocumentPluginRegistry
- CollaborationService
- CommentService
- ILayoutService
- IStyleService
- FieldsEngine
- ReferenceGraph
- TemplateEngine
- StylesGroup.tsx
- MockResizeObserver
- mergeContinuationTables
- RenderingPipelineManager
- DocumentParserRegistry
- DiagnosticsService
- mathAutoCorrect.ts
- marked
- motion@^12.42.1
- pagedjs@^0.4.3
- @tanstack/react-virtual
- @tiptap/pm@^2.2.4
- @tiptap/starter-kit

## God Nodes (most connected - your core abstractions)
1. `react` - 414 edges
2. `useEditor()` - 313 edges
3. `lucide-react` - 266 edges
4. `RibbonSection()` - 149 edges
5. `RibbonButton` - 147 edges
6. `MenuPortal()` - 91 edges
7. `PageConfig` - 83 edges
8. `JSONDocumentModel` - 38 edges
9. `react-dom` - 38 edges
10. `getPhysicalDimensions()` - 31 edges

## Surprising Connections (you probably didn't know these)
- `LayoutTabProps` --references--> `PageConfig`  [EXTRACTED]
  components/ribbon/tabs/LayoutTab/page_setup/LineNumbers/LineNumberingOptions/PageSetupDialog/layout.tsx → types.ts
- `MarginTabProps` --references--> `PageConfig`  [EXTRACTED]
  components/ribbon/tabs/LayoutTab/page_setup/Margins/CustomMargin/PageSetupDialog/margin.tsx → types.ts
- `PaperTabProps` --references--> `PageConfig`  [EXTRACTED]
  components/ribbon/tabs/LayoutTab/page_setup/size/MorePageSizes/PageSetupDialog/pager.tsx → types.ts
- `WebLayoutViewProps` --references--> `PageConfig`  [EXTRACTED]
  components/ribbon/tabs/ViewTab/views/WebLayoutView.tsx → types.ts
- `GhostPageProps` --references--> `PageConfig`  [EXTRACTED]
  components/ui/GhostPage.tsx → types.ts

## Import Cycles
- 3-file cycle: `utils/layout/LayoutContext.ts -> utils/layout/LayoutEngine.ts -> utils/layout/SplitStrategy.ts -> utils/layout/LayoutContext.ts`
- 3-file cycle: `utils/layout/LayoutContext.ts -> utils/layout/MeasurementService.ts -> utils/layout/SplitStrategy.ts -> utils/layout/LayoutContext.ts`
- 4-file cycle: `utils/layout/LayoutContext.ts -> utils/layout/LayoutEngine.ts -> utils/layout/strategies/TableSplitStrategy.ts -> utils/layout/SplitStrategy.ts -> utils/layout/LayoutContext.ts`
- 4-file cycle: `utils/layout/LayoutContext.ts -> utils/layout/LayoutEngine.ts -> utils/layout/SplitStrategyRegistry.ts -> utils/layout/SplitStrategy.ts -> utils/layout/LayoutContext.ts`
- 4-file cycle: `utils/layout/LayoutContext.ts -> utils/layout/LayoutEngine.ts -> utils/layout/PolicyRegistry.ts -> utils/layout/SplitStrategy.ts -> utils/layout/LayoutContext.ts`
- 4-file cycle: `utils/layout/LayoutContext.ts -> utils/layout/LayoutEngine.ts -> utils/layout/strategies/AtomicSplitStrategy.ts -> utils/layout/SplitStrategy.ts -> utils/layout/LayoutContext.ts`
- 4-file cycle: `utils/layout/LayoutContext.ts -> utils/layout/LayoutEngine.ts -> utils/layout/strategies/ParagraphSplitStrategy.ts -> utils/layout/SplitStrategy.ts -> utils/layout/LayoutContext.ts`
- 5-file cycle: `utils/layout/LayoutContext.ts -> utils/layout/LayoutEngine.ts -> utils/layout/PolicyRegistry.ts -> utils/layout/SplitStrategyRegistry.ts -> utils/layout/SplitStrategy.ts -> utils/layout/LayoutContext.ts`

## Communities (108 total, 30 thin omitted)

### Community 0 - "EquationTools.tsx"
Cohesion: 0.07
Nodes (39): HorizontalScrollContainer(), StaticMathPreview(), StructureDropdown(), StructureOption, StructureSection, SymbolBtn(), SymbolCategoryDropdown(), TabButton() (+31 more)

### Community 1 - "StudioCommandBar.tsx"
Cohesion: 0.08
Nodes (53): StudioButton, StudioButtonProps, StudioButtonGroup(), StudioButtonGroupProps, StudioDivider(), StudioDropdown(), StudioDropdownItem, StudioDropdownProps (+45 more)

### Community 2 - "SmallRibbonButton"
Cohesion: 0.07
Nodes (37): CaptionsGroup(), CrossReferenceTool(), InsertCaptionTool(), InsertTableFiguresTool(), UpdateTableFiguresTool(), BibliographyTool(), CitationsBibliographyGroup(), InsertCitationTool() (+29 more)

### Community 3 - "documentModel.ts"
Cohesion: 0.03
Nodes (53): AccessibilityAltTextRule, BlockParser, CommandContext, CommandResult, defaultCommandRegistry, defaultParserRegistry, defaultPluginRegistry, defaultTiptapRegistry (+45 more)

### Community 4 - "InsertTools.tsx"
Cohesion: 0.11
Nodes (32): ImageContentExtractionModal(), HeaderFooterTab(), DocumentInfoTool(), InsertGroup(), NavigationGroup(), OptionsGroup(), PositionGroup(), PositionInput() (+24 more)

### Community 5 - "MenuPortal"
Cohesion: 0.12
Nodes (34): MenuPortal(), MenuPortalProps, PasteTool(), DropdownButtonProps, DropdownToolBtn, GroupRow(), ToolBtn, ColorTools() (+26 more)

### Community 6 - "measurement.ts"
Cohesion: 0.07
Nodes (44): CompactUnitInputProps, DragTarget, Ruler, RulerProps, BASE_PAGE_CONFIG, MeasurementUnit, activeCalibration, CM_PER_INCH (+36 more)

### Community 7 - "LayoutEngine.ts"
Cohesion: 0.11
Nodes (20): containsPageBreak(), isAtomicElement(), PolicyRegistry, PolicyRule, OversizedMode, SplitContext, SplitMode, SplitResult (+12 more)

### Community 8 - "react"
Cohesion: 0.13
Nodes (23): AcceptTool(), ChangesGroup(), NextChangeTool(), PreviousChangeTool(), RejectTool(), CommentsGroup(), DeleteCommentTool(), NewCommentTool() (+15 more)

### Community 9 - "types.ts"
Cohesion: 0.07
Nodes (39): EditorPageProps, BORDER_WIDTH_OPTIONS, COLOR_PRESETS, DEFAULT_BORDER, PageBordersDialogProps, MarginSubTab, MarginTabProps, PrintLayoutViewProps (+31 more)

### Community 10 - "RibbonSection"
Cohesion: 0.10
Nodes (23): RibbonSection(), RibbonSectionProps, ConvertGroup(), InkToMathTool(), InkToShapeTool(), DrawTab(), DrawTabProvider(), EditGroup() (+15 more)

### Community 11 - "SmallRibbonButton"
Cohesion: 0.12
Nodes (21): SmallRibbonButton(), DraftTool(), OutlineTool(), PrintLayoutTool(), ReadModeTool(), ViewsGroup(), WebLayoutTool(), ArrangeAllTool() (+13 more)

### Community 12 - "RibbonButton"
Cohesion: 0.12
Nodes (21): RibbonButton, RibbonButtonProps, AddinsGroup(), GetAddinsTool(), MyAddinsTool(), CreateGroup(), EnvelopesTool(), LabelsTool() (+13 more)

### Community 13 - "useDesignTab"
Cohesion: 0.15
Nodes (24): DropdownButtonProps, DropdownRibbonButton, FormattingCard, DesignTab(), DesignTabContext, DesignTabContextType, DesignTabProvider(), useDesignTab() (+16 more)

### Community 14 - "equationPresets.ts"
Cohesion: 0.11
Nodes (30): insertSymbolAtSelection(), EquationBoxTool(), InkEquationTool(), MathField, QUICK_SNIPPETS, ToolsGroup(), EquationTool(), CATEGORIES (+22 more)

### Community 15 - "tableUtils.ts"
Cohesion: 0.18
Nodes (35): EditorPageComponent(), BORDER_LINE_STYLES, BORDER_WIDTHS, COLORS, TableDesignTab(), TableLayoutTab(), applyTableDesignOptions(), buildTableGrid() (+27 more)

### Community 16 - "FontDialogLauncher.tsx"
Cohesion: 0.10
Nodes (29): TablePropertiesModal(), TablePropertiesModalProps, FontDialogLauncher(), ModernCheckbox(), ModernSelect(), TabButton(), SelectionType, TableFormulaDialog() (+21 more)

### Community 17 - "useFileTab"
Cohesion: 0.12
Nodes (22): DocumentGroup(), InfoTool(), NewTool(), OpenTool(), OutputGroup(), OutputTool(), FileModal(), InfoModal (+14 more)

### Community 18 - "shapesTool.tsx"
Cohesion: 0.12
Nodes (23): DropdownButtonProps, DropdownRibbonButton(), FormatBackgroundTool(), DrawShapesTool(), BasicShapes, BlockArrowShapes, EquationShapes, FlowchartShapes (+15 more)

### Community 19 - "useEditor"
Cohesion: 0.18
Nodes (18): SmallRibbonButton, ChartTool(), IconsTool(), IllustrationsGroup(), ScreenshotTool(), SmartArtTool(), ThreeDModelsTool(), BlankPageTool() (+10 more)

### Community 20 - "WriteInsertFieldsGroup.tsx"
Cohesion: 0.14
Nodes (17): SmallRibbonButton, FinishGroup(), FinishMergeTool(), MailingsTab(), CheckErrorsTool(), FindRecipientTool(), PreviewResultsGroup(), PreviewResultsTool() (+9 more)

### Community 21 - "lucide-react"
Cohesion: 0.19
Nodes (18): DropdownButton, DropdownButtonProps, ParagraphInput, LayoutTabContext, LayoutTabContextType, useLayoutTab(), BreaksTool(), ColumnsTool() (+10 more)

### Community 22 - "dependencies"
Cohesion: 0.07
Nodes (33): dependencies, hot-formula-parser@^4.0.0, hyperformula@^3.3.0, jspdf@^4.2.1, lucide-react@^0.554.0, mammoth@^1.12.0, mathlive@^0.101.0, react@^19.2.0 (+25 more)

### Community 23 - "EditorContext.tsx"
Cohesion: 0.10
Nodes (25): CommentExtension, EndnoteReferenceExtension, FootnoteReferenceExtension, countCharsFromHtml(), countWordsFromHtml(), CustomParagraph, CustomTable, CustomTableCell (+17 more)

### Community 24 - "mathUtils.ts"
Cohesion: 0.20
Nodes (27): configureMathFieldElement(), convertActiveEquationToText(), convertAllEquations(), convertSelectionToEquation(), escapeLatexHtml(), getActiveEditorElement(), getActiveEquationWrapper(), getActiveMathField() (+19 more)

### Community 25 - "PageConfig"
Cohesion: 0.12
Nodes (18): PageConfig, IncrementalPaginator, PageEntry, LayoutEngineConfiguration, LayoutEnvironmentImpl, PaginatorResult, BlockPolicy, computeLayoutTree() (+10 more)

### Community 26 - "JSONDocumentModel"
Cohesion: 0.11
Nodes (11): JSONDocumentModel, DocumentService, DocumentServiceRegistry, ExportService, globalServices, IDocumentService, IExportService, INumberingService (+3 more)

### Community 27 - "HomeTab.tsx"
Cohesion: 0.13
Nodes (16): ClipboardGroup(), CutCopyTools(), EditingGroup(), FindReplaceDialog, FindReplaceDialog(), FindReplaceDialogProps, FindTool(), ReplaceTool() (+8 more)

### Community 28 - "devDependencies"
Cohesion: 0.07
Nodes (29): devDependencies, eslint@^9.39.3, fast-check@^4.10.2, jsdom@^30.1.3, @testing-library/dom@^10.4.2, @testing-library/react@^16.3.3, @types/html2canvas@^0.5.35, @types/jszip@^3.4.0 (+21 more)

### Community 29 - "draft.ts"
Cohesion: 0.09
Nodes (3): MASTER_STYLE_GUIDE, PRODOC_JSON_SCHEMA, MASTER_WORD_PROCESSOR_WITH_USER_INSTRUCTION

### Community 30 - "ViewTab.tsx"
Cohesion: 0.16
Nodes (16): CheckboxItem(), MacrosGroup(), MacrosTool(), DocumentPropertiesGroup(), PropertiesTool(), BenchmarkTool(), GridlinesCheckTool(), JsonInspectorCheckTool() (+8 more)

### Community 31 - "App.tsx"
Cohesion: 0.11
Nodes (16): AppContent(), ErrorBoundary, ErrorBoundaryProps, ErrorBoundaryState, MobileSelectionToolbar(), PageBordersDialog(), FileTabProvider(), ReadModeToolbar() (+8 more)

### Community 32 - "package.json"
Cohesion: 0.07
Nodes (26): clsx@^2.1.0, html2canvas@^1.4.1, jszip@^3.10.1, @radix-ui/react-dialog@^1.1.17, react-virtualized-auto-sizer@^1.0.24, tailwind-merge@^2.2.1, @tiptap/extension-highlight@^2.2.4, @tiptap/extension-table-cell@^2.2.4 (+18 more)

### Community 33 - "CustomMargin/PageSetupDialog.tsx"
Cohesion: 0.18
Nodes (17): ApplyToSection(), CompactSelect(), CompactUnitInput(), RenderSubTabs(), LayoutSubTab, LayoutTab(), LayoutTabProps, MarginTab() (+9 more)

### Community 34 - "documentTestSuite.ts"
Cohesion: 0.12
Nodes (15): defaultMigrationRegistry, defaultSerializerRegistry, DevelopmentImmutability, DocumentDiffPatchEngine, DocumentIncrementalParser, EditorTransaction, HeadingElement, ImageElement (+7 more)

### Community 35 - "EditorPage/EditorPage.tsx"
Cohesion: 0.14
Nodes (16): EditorEmptyState(), EditorEmptyStateProps, EditorPage, getTextLength(), ResizerOverlay(), ResizerOverlayProps, SortModal(), SortModalProps (+8 more)

### Community 36 - "PrintModal.tsx"
Cohesion: 0.18
Nodes (19): LoadingSpinner(), LoadingSpinnerProps, RibbonHeader(), RibbonHeaderProps, DesktopPrintPreview(), getVerticalAlignStyle(), MobilePrintPreview(), PrintModal() (+11 more)

### Community 37 - "Ribbon.tsx"
Cohesion: 0.16
Nodes (21): DesignTab, DrawTab, FileTab, HomeTab, InsertTab, LayoutTab, MailingsTab, ReferencesTab (+13 more)

### Community 39 - "historyManager.ts"
Cohesion: 0.17
Nodes (9): makePageConfig(), makeSnapshot(), areSnapshotsEqual(), cloneHistoryEntry(), cloneSnapshot(), DocumentHistoryEngine, DocumentSnapshot, HistoryCursorMeta (+1 more)

### Community 40 - "useDrawTab"
Cohesion: 0.18
Nodes (14): DrawingToolsGroup(), EraserTool(), LassoTool(), SelectTool(), DrawTabContext, DrawTabContextType, useDrawTab(), AddPenTool() (+6 more)

### Community 41 - "ReviewTab.tsx"
Cohesion: 0.18
Nodes (11): AccessibilityGroup(), CheckAccessibilityTool(), CompareGroup(), CompareTool(), HideInkTool(), InkGroup(), ProtectGroup(), RestrictEditingTool() (+3 more)

### Community 42 - "GestureContext.tsx"
Cohesion: 0.19
Nodes (17): PrintLayoutView, WebLayoutView(), WebLayoutViewProps, StatusBar(), StatusBarProps, defaultGestureState, fallbackContextValue, GestureContext (+9 more)

### Community 43 - "DocumentModelContext.tsx"
Cohesion: 0.11
Nodes (19): Comment, DocumentModelContext, DocumentModelContextType, INITIAL_COMMENTS, computeComplexityScore(), computeDocumentState(), computeLiveStats(), DocumentStats (+11 more)

### Community 44 - "Paginator.ts"
Cohesion: 0.20
Nodes (5): GeometryCacheEntry, LayoutVersion, getLayoutId(), hashString(), MeasurementCache

### Community 45 - "PaginationLoop.ts"
Cohesion: 0.15
Nodes (5): ContinuationManager, GeometryCalculator, BuiltPage, PageBuilder, PaginationLoop

### Community 46 - "renderingPipelineManager.ts"
Cohesion: 0.11
Nodes (11): EventBus, EventCallback, EventType, globalEventBus, globalRenderingPipelineManager, PipelineDiagnostics, PipelineStageMetrics, PipelineStageName (+3 more)

### Community 47 - "LayoutDiagnostics"
Cohesion: 0.10
Nodes (12): BlockMovedEvent, CacheHitEvent, CacheMissEvent, LayoutDiagnostics, LayoutEvent, LayoutEventListener, LayoutEventType, LogEvent (+4 more)

### Community 48 - "LayoutSession.ts"
Cohesion: 0.24
Nodes (7): GeometryCache, LayoutContext, LayoutEngine, LayoutEnvironment, LayoutSession, LayoutState, PageFrame

### Community 49 - "PrintLayoutView.tsx"
Cohesion: 0.22
Nodes (16): BLOCK_TAGS, CursorSnapshot, findClosestPageIndex(), findTargetPageForSnapshot(), findTargetPageForTableAnchor(), getCursorSnapshot(), getNodeTextLength(), getOffsetInNode() (+8 more)

### Community 50 - "ribbonAndPortal.test.tsx"
Cohesion: 0.21
Nodes (12): App(), DocumentModelProvider(), EditorContext, GestureProvider(), Theme, ThemeContext, ThemeContextType, ThemeProvider() (+4 more)

### Community 51 - "vectorPdfEngine.ts"
Cohesion: 0.29
Nodes (15): jspdf, pxToPt(), generateVectorPdfFromPages(), mapFontFamily(), mapFontStyle(), parseCssColor(), ParsedColor, renderComplexScriptElement() (+7 more)

### Community 52 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules, jsx, lib, module (+8 more)

### Community 53 - "tiptapJSONToJSONDocument"
Cohesion: 0.15
Nodes (8): ParserStage, TiptapFinalizationStage, tiptapJSONToJSONDocument(), TiptapNormalizationStage, TiptapValidationStage, traverseTiptapContent(), ValidationRegistry, ValidationRule

### Community 54 - "NumberingEngine"
Cohesion: 0.16
Nodes (6): AbstractNumbering, ListNumberFormatType, NumberingEngine, NumberingFormatter, NumberingInstance, NumberingLevel

### Community 55 - "TypographyEngine"
Cohesion: 0.22
Nodes (6): ptToPx(), FontMetrics, ParagraphTypographyConfig, TextMeasurementResult, TypographyEngine, WrappedLine

### Community 56 - "styleSystem.ts"
Cohesion: 0.18
Nodes (7): getStyleResolver(), resolveStyle(), createDefaultStyleSystem(), DocumentStyle, DocumentStyleSystem, StyleResolver, StyleType

### Community 57 - "PaginationDecisionService.ts"
Cohesion: 0.16
Nodes (13): OverflowReason, Atomic, Deferred, KeepTogether, Oversized, PaginationAction, Atomic, ForceOverflow (+5 more)

### Community 58 - "vite.config.ts"
Cohesion: 0.15
Nodes (8): vite@^6.2.0, @vitejs/plugin-react@^5.0.0, vite, @vitejs/plugin-react, __dirname, __filename, __dirname, __filename

### Community 60 - "htmlToJSONDocument"
Cohesion: 0.24
Nodes (8): CommentsSidebar(), NotesSidebar(), OpenModal(), EmptyState(), EmptyStateAction, EmptyStateProps, htmlToJSONDocument(), jsonDocumentToHtml()

### Community 61 - "Editor.tsx"
Cohesion: 0.27
Nodes (8): Editor(), ResponsiveContainer(), MiniToolbar(), ReadLayoutView(), GhostDocument(), GhostImage(), Skeleton(), useTheme()

### Community 62 - "imageContentExtractor.ts"
Cohesion: 0.30
Nodes (11): ImageContentExtractionModalProps, buildEditableDocumentHTML(), buildEditableTableHTML(), detectTableGrid(), extractContentFromImage(), ExtractedDocumentContent, ExtractionOptions, extractTextSegments() (+3 more)

### Community 63 - "pluginSDK.ts"
Cohesion: 0.16
Nodes (11): FieldService, IFieldService, FieldContext, CustomBlockPlugin, CustomFieldPlugin, CustomImporterPlugin, CustomRibbonGroupPlugin, CustomSerializerPlugin (+3 more)

### Community 64 - "RibbonSeparator"
Cohesion: 0.29
Nodes (8): RibbonSeparator(), AlignmentTools(), ArrangeGroup(), LayeringTools(), PositionTool(), WrapTextTool(), LayoutTab(), LayoutTabProvider()

### Community 65 - "BenchmarkModal.tsx"
Cohesion: 0.19
Nodes (4): BenchmarkModal(), BenchmarkModalProps, LayoutSandboxImpl, Paginator

### Community 66 - "parseTiptapBlockNode"
Cohesion: 0.23
Nodes (13): parseBlockElement(), parseInlineElements(), parseInlineStyle(), parseTiptapBlockNode(), parseTiptapEquationNode(), parseTiptapFallbackNode(), parseTiptapHeadingNode(), parseTiptapImageNode() (+5 more)

### Community 67 - "CheckpointEngine"
Cohesion: 0.18
Nodes (4): Checkpoint, CheckpointEngine, globalCheckpointEngine, Operation

### Community 69 - "ResourceManager"
Cohesion: 0.21
Nodes (3): AssetResource, globalResourceManager, ResourceManager

### Community 71 - "eslint.config.js"
Cohesion: 0.18
Nodes (10): @eslint/js@^9.14.0, eslint-plugin-react-hooks@^7.0.1, eslint-plugin-react-refresh@^0.5.2, globals@^17.4.0, typescript-eslint@^8.56.1, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+2 more)

### Community 73 - "JsonDocInspectorSidebar.tsx"
Cohesion: 0.29
Nodes (7): JsonDocInspectorSidebar(), useDocumentModel(), Bookmark, CrossReferenceSource, CrossReferenceTargetType, globalCrossReferenceEngine, globalFieldsEngine

### Community 75 - "wrangler.json"
Cohesion: 0.22
Nodes (8): assets, directory, not_found_handling, compatibility_date, name, preview_urls, $schema, workers_dev

### Community 76 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, deploy, dev, lint, preview, test, test:watch

### Community 77 - "DocumentMigrationRegistry"
Cohesion: 0.32
Nodes (3): DocumentMigration, DocumentMigrationRegistry, migrateDocumentToTargetVersion()

### Community 79 - "formulaEngine.ts"
Cohesion: 0.36
Nodes (3): TableElement, DocumentFormulaEngine, globalFormulaEngine

### Community 81 - "serialize"
Cohesion: 0.29
Nodes (4): jsonDocumentToMarkdown(), renderTextRunToMarkdown(), serialize(), SerializerRegistry

### Community 82 - "GhostPage.tsx"
Cohesion: 0.40
Nodes (4): GhostPage, GhostPageProps, PAGE_SIZES, mockConfig

### Community 83 - "anchorEngine.ts"
Cohesion: 0.33
Nodes (3): AnchorAffinity, AnchorEngine, DocumentAnchor

### Community 84 - "documentConverter.ts"
Cohesion: 0.60
Nodes (5): cleanJsonString(), jsonToHtml(), parseMarkdownToHtml(), renderBlock(), safeJsonParse()

### Community 93 - "StylesGroup.tsx"
Cohesion: 0.70
Nodes (3): StyleActions(), StyleGallery(), StylesGroup()

## Knowledge Gaps
- **25 isolated node(s):** `COLLABORATE`, `DESIGN`, `EQUATION`, `FORMAT`, `HEADER_FOOTER` (+20 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 545 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `EquationTools.tsx`, `StudioCommandBar.tsx`, `SmallRibbonButton`, `InsertTools.tsx`, `MenuPortal`, `measurement.ts`, `types.ts`, `RibbonSection`, `SmallRibbonButton`, `RibbonButton`, `useDesignTab`, `equationPresets.ts`, `tableUtils.ts`, `FontDialogLauncher.tsx`, `useFileTab`, `shapesTool.tsx`, `useEditor`, `WriteInsertFieldsGroup.tsx`, `lucide-react`, `dependencies`, `EditorContext.tsx`, `mathUtils.ts`, `HomeTab.tsx`, `ViewTab.tsx`, `App.tsx`, `package.json`, `CustomMargin/PageSetupDialog.tsx`, `EditorPage/EditorPage.tsx`, `PrintModal.tsx`, `Ribbon.tsx`, `useDrawTab`, `ReviewTab.tsx`, `GestureContext.tsx`, `DocumentModelContext.tsx`, `PrintLayoutView.tsx`, `ribbonAndPortal.test.tsx`, `htmlToJSONDocument`, `Editor.tsx`, `imageContentExtractor.ts`, `RibbonSeparator`, `BenchmarkModal.tsx`, `JsonDocInspectorSidebar.tsx`, `GhostPage.tsx`, `StylesGroup.tsx`?**
  _High betweenness centrality (0.313) - this node is a cross-community bridge._
- **What connects `COLLABORATE`, `DESIGN`, `EQUATION` to the rest of the system?**
  _25 weakly-connected nodes found - possible missing edges._
- **Should `EquationTools.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06978253813696851 - nodes in this community are weakly interconnected._
- **Why does `useEditor()` connect `useEditor` to `StudioCommandBar.tsx`, `SmallRibbonButton`, `InsertTools.tsx`, `MenuPortal`, `react`, `types.ts`, `RibbonSection`, `SmallRibbonButton`, `RibbonButton`, `useDesignTab`, `tableUtils.ts`, `FontDialogLauncher.tsx`, `useFileTab`, `shapesTool.tsx`, `lucide-react`, `EditorContext.tsx`, `HomeTab.tsx`, `ViewTab.tsx`, `App.tsx`, `CustomMargin/PageSetupDialog.tsx`, `EditorPage/EditorPage.tsx`, `PrintModal.tsx`, `Ribbon.tsx`, `useDrawTab`, `GestureContext.tsx`, `DocumentModelContext.tsx`, `PrintLayoutView.tsx`, `ribbonAndPortal.test.tsx`, `htmlToJSONDocument`, `Editor.tsx`, `BenchmarkModal.tsx`, `JsonDocInspectorSidebar.tsx`, `StylesGroup.tsx`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Should `StudioCommandBar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08289738430583501 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `lucide-react` to `EquationTools.tsx`, `StudioCommandBar.tsx`, `SmallRibbonButton`, `InsertTools.tsx`, `MenuPortal`, `react`, `types.ts`, `RibbonSection`, `SmallRibbonButton`, `RibbonButton`, `useDesignTab`, `equationPresets.ts`, `tableUtils.ts`, `FontDialogLauncher.tsx`, `useFileTab`, `shapesTool.tsx`, `useEditor`, `WriteInsertFieldsGroup.tsx`, `dependencies`, `mathUtils.ts`, `HomeTab.tsx`, `ViewTab.tsx`, `App.tsx`, `package.json`, `CustomMargin/PageSetupDialog.tsx`, `EditorPage/EditorPage.tsx`, `PrintModal.tsx`, `Ribbon.tsx`, `useDrawTab`, `ReviewTab.tsx`, `GestureContext.tsx`, `PrintLayoutView.tsx`, `htmlToJSONDocument`, `Editor.tsx`, `imageContentExtractor.ts`, `RibbonSeparator`, `BenchmarkModal.tsx`, `JsonDocInspectorSidebar.tsx`, `GhostPage.tsx`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Should `SmallRibbonButton` be split into smaller, more focused modules?**
  _Cohesion score 0.07459505541346974 - nodes in this community are weakly interconnected._