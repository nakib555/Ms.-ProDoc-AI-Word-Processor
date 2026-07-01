/* eslint-disable react-hooks/immutability, @typescript-eslint/no-explicit-any */
import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PageConfig, EditingArea } from '../../types';
import { PAGE_SIZES } from '../../constants';
import { useMathLive } from '../../hooks/useMathLive';
import { useEditor } from '../../contexts/EditorContext';
import { ResizerOverlay } from './ResizerOverlay';
import { TableResizerOverlay } from './TableResizerOverlay';
import { TableContextMenu } from './TableContextMenu';
import { TablePropertiesModal } from './TablePropertiesModal';
import { SortModal } from './SortModal';
import { useTableInteractions } from './useTableInteractions';
import { useSmartSelection } from './useSmartSelection';

import { useEditorSync } from './useEditorSync';
import { useEditorKeyDown } from './useEditorKeyDown';

interface EditorPageProps {
  content: string;
  pageNumber: number;
  totalPages: number;
  config: PageConfig;
  zoom: number;
  readOnly?: boolean;
  onContentChange?: (html: string, pageIndex: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  showFormattingMarks: boolean;
  
  // Header/Footer Props
  activeEditingArea?: EditingArea;
  setActiveEditingArea?: (area: EditingArea) => void;
  headerContent?: string;
  setHeaderContent?: (html: string) => void;
  footerContent?: string;
  setFooterContent?: (html: string) => void;
  
  // Different First Page Support
  firstHeaderContent?: string;
  setFirstHeaderContent?: (html: string) => void;
  firstFooterContent?: string;
  setFirstFooterContent?: (html: string) => void;
}

const EditorPageComponent: React.FC<EditorPageProps> = ({
  content,
  pageNumber,
  totalPages,
  config,
  zoom,
  readOnly,
  onContentChange,
  onFocus,
  showFormattingMarks,
  activeEditingArea = 'body',
  setActiveEditingArea,
  headerContent = '',
  setHeaderContent,
  footerContent = '',
  setFooterContent,
  firstHeaderContent = '',
  setFirstHeaderContent,
  firstFooterContent = '',
  setFirstFooterContent,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorElement, setEditorElement] = useState<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const scale = zoom / 100;
  const { isKeyboardLocked, selectionMode, undo, redo, setActiveElementType } = useEditor();

  const [selectedImage, setSelectedImage] = useState<HTMLElement | null>(null);
  const [selectedTable, setSelectedTable] = useState<HTMLTableElement | null>(null);
  const [tables, setTables] = useState<HTMLTableElement[]>([]);

  const {
    contextMenu,
    contextMenuRef,
    focusedIndex,
    isSortModalOpen,
    sortColIndex,
    sortDirection,
    sortExcludeHeader,
    sortType,
    isTablePropertiesOpen,
    propertiesTable,
    tableWidth,
    cellPadding,
    tableAlign,
    borderColor,
    borderWidth,
    zebraStriping,
    headerColor,
    repeatHeader,
    keepTogether,
    cantSplit,
    customCellPadding,
    padTopBottom,
    padLeftRight,
    verticalAlign,
    specifyRowHeight,
    rowHeightVal,
    rowHeightMode,
    specifyColWidth,
    colWidthVal,
    colWidthUnit,
    textWrapping,

    setContextMenu,
    setIsSortModalOpen,
    setSortColIndex,
    setSortDirection,
    setSortExcludeHeader,
    setSortType,
    setIsTablePropertiesOpen,
    setTableWidth,
    setCellPadding,
    setTableAlign,
    setBorderColor,
    setBorderWidth,
    setZebraStriping,
    setHeaderColor,
    setRepeatHeader,
    setKeepTogether,
    setCantSplit,
    setCustomCellPadding,
    setPadTopBottom,
    setPadLeftRight,
    setVerticalAlign,
    setSpecifyRowHeight,
    setRowHeightVal,
    setRowHeightMode,
    setSpecifyColWidth,
    setColWidthVal,
    setColWidthUnit,
    setTextWrapping,

    handleContextMenu,
    handleMenuKeyDown,
    handleContextAction,
    applyProperties,
    applySortColumn,
  } = useTableInteractions({ editorRef, pageNumber, onContentChange });


  const isHeaderFooterMode = activeEditingArea === 'header' || activeEditingArea === 'footer';

  const {
    handleSmartPointerDown,
    handleSmartPointerMove,
    handleSmartPointerUp,
    handleSmartClick,
  } = useSmartSelection({
    selectionMode,
    isHeaderFooterMode,
    editorRef,
    handleContextMenu,
  });

  const isFirstPage = pageNumber === 1;
  const useDifferentFirstPage = config.differentFirstPage;

  // Determine active header/footer content based on page number and config
  const activeHeaderContent = useDifferentFirstPage && isFirstPage ? firstHeaderContent : headerContent;
  const activeFooterContent = useDifferentFirstPage && isFirstPage ? firstFooterContent : footerContent;
  
  // Determine setter for header/footer
  const handleHeaderInput = (e: React.FormEvent<HTMLDivElement>) => {
    const val = e.currentTarget.innerHTML;
    if (useDifferentFirstPage && isFirstPage) {
      if (setFirstHeaderContent) setFirstHeaderContent(val);
    } else {
      if (setHeaderContent) setHeaderContent(val);
    }
  };

  const handleFooterInput = (e: React.FormEvent<HTMLDivElement>) => {
    const val = e.currentTarget.innerHTML;
    if (useDifferentFirstPage && isFirstPage) {
      if (setFirstFooterContent) setFirstFooterContent(val);
    } else {
      if (setFooterContent) setFooterContent(val);
    }
  };
  
  // Dimensions in Inches
  let widthIn = 0;
  let heightIn = 0;
  
  if (config.size === 'Custom' && config.customWidth && config.customHeight) {
    widthIn = config.customWidth;
    heightIn = config.customHeight;
  } else {
    const base = PAGE_SIZES[config.size as keyof typeof PAGE_SIZES] || PAGE_SIZES['Letter'];
    widthIn = config.orientation === 'portrait' ? base.width / 96 : base.height / 96;
    heightIn = config.orientation === 'portrait' ? base.height / 96 : base.width / 96;
  }

  // Minimum body gap (approx 2 inches) used for safe header/footer max height calculation
  const MIN_BODY_GAP_IN = 2; 

  useMathLive(content, editorRef);

  // --- Image Handling ---
  const handleEditorClick = (e: React.MouseEvent) => {
    if (selectionMode) handleSmartClick(e);
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      setSelectedImage(target);
      e.stopPropagation();
    } else {
      setSelectedImage(null);
    }
    
    const table = target.closest('table');
    if (table) {
      setSelectedTable(table as HTMLTableElement);
    } else {
      setSelectedTable(null);
    }
  };

  const handleImageUpdate = () => {
    if (editorRef.current && onContentChange) {
      onContentChange(editorRef.current.innerHTML, pageNumber - 1);
    }
  };

  useEditorSync({
    content,
    editorRef,
    pageNumber,
    totalPages,
    selectedImage,
  });

  const handleKeyDown = useEditorKeyDown({
    editorRef,
    pageNumber,
    totalPages,
    readOnly,
    isKeyboardLocked,
    selectionMode,
    onContentChange,
  });

  // Track selection to update active element type (e.g., for showing Table tabs)
  useEffect(() => {
    const handleSelectionChange = () => {
      if (!editorRef.current) return;
      
      const activeEl = document.activeElement;
      if (activeEl && activeEl.tagName.toLowerCase() === 'math-field' && editorRef.current.contains(activeEl)) {
        setActiveElementType('equation');
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      
      const node = selection.anchorNode;
      if (!node) return;
      
      // Only process if the selection is inside THIS page's editor
      if (!editorRef.current.contains(node)) return;
      
      const element = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
      if (!element) return;
      
      if (element.closest('table')) {
        setActiveElementType('table');
      } else if (element.tagName === 'IMG' || element.closest('img')) {
        setActiveElementType('image');
      } else if (element.closest('math-field') || element.closest('.math-inline') || element.closest('.math-display')) {
        setActiveElementType('equation');
      } else {
        setActiveElementType('text');
      }
    };
    
    document.addEventListener('selectionchange', handleSelectionChange);
    
    // Also listen for focusin/focusout to catch math-field focus which might not trigger selectionchange
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName && target.tagName.toLowerCase() === 'math-field' && editorRef.current?.contains(target)) {
        setActiveElementType('equation');
      }
    };
    
    document.addEventListener('focusin', handleFocusIn);
    
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [setActiveElementType]);

  // Sync Header
  useEffect(() => {
    if (headerRef.current) {
      const isFocused = document.activeElement === headerRef.current;
      if (!isFocused && headerRef.current.innerHTML !== activeHeaderContent) {
        headerRef.current.innerHTML = activeHeaderContent;
      }
    }
  }, [activeHeaderContent]);

  // Sync Footer
  useEffect(() => {
    if (footerRef.current) {
      const displayHtml = activeFooterContent
        .replace(/\[Page \d+\]/g, `[Page ${pageNumber}]`)
        .replace(/<span class="page-number-placeholder">\d+<\/span>/g, `<span class="page-number-placeholder">${pageNumber}</span>`);
      
      const isFocused = document.activeElement === footerRef.current;
      if (!isFocused && footerRef.current.innerHTML !== displayHtml) {
        footerRef.current.innerHTML = displayHtml;
      }
    }
  }, [activeFooterContent, pageNumber]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (onContentChange) onContentChange(e.currentTarget.innerHTML, pageNumber - 1);
  };

  const handlePageClick = (e: React.MouseEvent) => {
    if (e.target !== selectedImage) setSelectedImage(null);
    if (!(e.target as HTMLElement).closest('table')) setSelectedTable(null);
    if (selectionMode) return;
    if (editorRef.current && !editorRef.current.contains(e.target as Node) && !isHeaderFooterMode) {
      editorRef.current.focus();
      const rect = editorRef.current.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      range.collapse(e.clientY > rect.bottom ? false : true);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
  };

  const getMarginsInches = () => {
    const m = config.margins;
    let top = m.top;
    const bottom = m.bottom;
    let left = m.left;
    let right = m.right;
    const gutter = m.gutter || 0;
    const isMirroredOrBookFold = ['mirrorMargins', 'bookFold'].includes(config.multiplePages || '');
    if (isMirroredOrBookFold) {
      const inside = m.left;
      const outside = m.right;
      const isOdd = pageNumber % 2 !== 0; 
      if (isOdd) {
        left = inside + (config.gutterPosition === 'left' ? gutter : 0);
        right = outside;
      } else {
        left = outside;
        right = inside + (config.gutterPosition === 'left' ? gutter : 0);
      }
    } else {
      if (config.gutterPosition === 'top') top += gutter;
      else left += gutter;
    }
    return { top, right, bottom, left };
  };
  const margins = getMarginsInches();

  const defaultHeaderDist = config.headerDistance || 0.5;
  const effectiveHeaderDist = Math.min(defaultHeaderDist, margins.top / 2);

  const defaultFooterDist = config.footerDistance || 0.5;
  const effectiveFooterDist = Math.min(defaultFooterDist, margins.bottom / 2);

  const getBackgroundStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = { backgroundColor: config.pageColor || '#ffffff' };
    if (config.background === 'ruled') {
      return { ...base, backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '100% 0.33in' };
    } else if (config.background === 'grid') {
      return { ...base, backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '0.2in 0.2in' };
    }
    return base;
  };

  const getVerticalAlignStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = { display: 'flex', flexDirection: 'column' };
    let justifyContent: 'center' | 'flex-end' | 'space-between' | 'flex-start' = 'flex-start';
    if (config.verticalAlign === 'center') justifyContent = 'center';
    else if (config.verticalAlign === 'bottom') justifyContent = 'flex-end';
    else if (config.verticalAlign === 'justify') justifyContent = 'space-between';
    return { ...style, justifyContent };
  };

  const onHeaderDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setActiveEditingArea && !isKeyboardLocked && !selectionMode) {
      setActiveEditingArea('header');
      setTimeout(() => {
        if (headerRef.current) {
          headerRef.current.focus();
          document.execCommand('selectAll', false, '');
        }
      }, 10);
    }
  };

  const onFooterDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setActiveEditingArea && !isKeyboardLocked && !selectionMode) {
      setActiveEditingArea('footer');
      setTimeout(() => {
        if (footerRef.current) {
          footerRef.current.focus();
          document.execCommand('selectAll', false, '');
        }
      }, 10);
    }
  };

  const onBodyDoubleClick = (e: React.MouseEvent) => {
    if (activeEditingArea !== 'body' && setActiveEditingArea && !isKeyboardLocked && !selectionMode) {
      e.stopPropagation();
      setActiveEditingArea('body');
      setTimeout(() => {
        if (editorRef.current) editorRef.current.focus();
      }, 10);
    }
  };

  const safeMaxHeaderHeight = (heightIn - MIN_BODY_GAP_IN) / 2;
  const safeMaxFooterHeight = (heightIn - MIN_BODY_GAP_IN) / 2;
  const isBodyEditable = true; 
  const isHeaderFooterEditable = true;
  let cursorStyle = 'cursor-text';
  if (selectionMode) cursorStyle = 'cursor-crosshair';
  else if (isKeyboardLocked) cursorStyle = 'cursor-default';

  return (
    <div 
      ref={containerRef}
      className="prodoc-page-container relative group mx-auto origin-top"
      style={{ width: `${widthIn * scale}in`, height: `${heightIn * scale}in` }}
    >
      <div 
        className={`prodoc-page-sheet absolute inset-0 bg-white overflow-clip ${cursorStyle} ${selectionMode ? 'smart-selection-active' : ''}`}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${widthIn}in`,
          height: `${heightIn}in`,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)',
          paddingTop: `${margins.top}in`,
          paddingBottom: `${margins.bottom}in`,
          paddingLeft: `${margins.left}in`,
          paddingRight: `${margins.right}in`,
          boxSizing: 'border-box',
          ...getBackgroundStyle(),
        }}
        onMouseDown={handlePageClick}
      >
        {/* Header Area */}
        <div 
          className={`absolute left-0 right-0 z-30 ${isHeaderFooterMode ? 'z-50' : ''}`}
          style={{
            top: 0,
            height: `${margins.top}in`,
            maxHeight: `${safeMaxHeaderHeight}in`,
            paddingTop: `${effectiveHeaderDist}in`,
            paddingLeft: `${margins.left}in`,
            paddingRight: `${margins.right}in`,
          }}
          onDoubleClick={onHeaderDoubleClick}
          onMouseDown={(e) => e.stopPropagation()} 
        >
          <div className={`w-full h-full relative ${isHeaderFooterMode ? 'border-b-2 border-dashed border-indigo-500 print:border-none' : 'hover:bg-slate-50/50'}`}>
            {isHeaderFooterMode && (
              <div className="header-footer-label bg-indigo-600 text-white print:hidden" style={{ left: 0, bottom: -2, transform: 'translateY(100%)' }}>
                {isFirstPage && useDifferentFirstPage ? "First Page Header" : "Header"}
              </div>
            )}
            <div 
              ref={headerRef}
              className={`prodoc-header w-full min-h-full outline-none ${isHeaderFooterEditable ? 'cursor-text pointer-events-auto' : 'cursor-default pointer-events-none'}`}
              contentEditable={isHeaderFooterEditable}
              inputMode={isKeyboardLocked || selectionMode ? "none" : "text"}
              suppressContentEditableWarning
              onInput={handleHeaderInput}
              onFocus={() => setActiveEditingArea && setActiveEditingArea('header')}
              style={{ minHeight: '1em' }}
            />
          </div>
        </div>

        {config.watermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-clip z-0">
            <div className="transform -rotate-45 text-slate-300/40 font-bold text-[8rem] whitespace-nowrap select-none" style={{ color: 'rgba(0,0,0,0.08)' }}>
              {config.watermark}
            </div>
          </div>
        )}

        {/* Body */}
        <div 
          className={`relative w-full h-full overflow-clip transition-opacity duration-300 ${isHeaderFooterMode ? 'opacity-50' : 'opacity-100'}`}
          style={{ ...getVerticalAlignStyle() }}
          onDoubleClick={onBodyDoubleClick}
          onMouseDown={(e) => e.stopPropagation()} 
        >
          <div
            id={`prodoc-editor-${pageNumber}`}
            ref={(el) => {
              editorRef.current = el;
              if (el && el !== editorElement) {
                setEditorElement(el);
              }
            }}
            className={`prodoc-editor w-full outline-none text-lg leading-loose break-words z-10 ${showFormattingMarks ? 'show-formatting-marks' : ''} ${isHeaderFooterMode ? 'pointer-events-none select-none' : ''}`}
            contentEditable={isBodyEditable}
            inputMode={isKeyboardLocked || selectionMode ? "none" : "text"}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            onClick={handleEditorClick}
            onContextMenu={handleContextMenu}
            onPointerDown={handleSmartPointerDown}
            onPointerMove={handleSmartPointerMove}
            onPointerUp={handleSmartPointerUp}
            onPointerCancel={handleSmartPointerUp}
            suppressContentEditableWarning={true}
            style={{ 
              fontFamily: 'Calibri, Inter, sans-serif', 
              color: '#000000', 
              flex: config.verticalAlign === 'justify' ? '1 1 auto' : undefined, 
              minHeight: '100%',
              columnCount: config.columns || 1,
              columnGap: `${config.columnGap || 0.5}in`,
              columnFill: 'auto',
              hyphens: config.hyphenation ? 'auto' : 'none',
              WebkitHyphens: config.hyphenation ? 'auto' : 'none',
            }}
          />
          {selectedImage && editorElement && (
            <ResizerOverlay target={selectedImage} container={editorElement} scale={scale} onUpdate={handleImageUpdate} onClear={() => setSelectedImage(null)} />
          )}
          {editorElement && tables.map((t, i) => (
            <TableResizerOverlay key={`table-resizer-${i}`} target={t} container={editorElement} scale={scale} onUpdate={handleImageUpdate} />
          ))}
        </div>

        {/* Footer Area */}
        <div 
          className={`absolute left-0 right-0 z-30 ${isHeaderFooterMode ? 'z-50' : ''}`}
          style={{
            bottom: 0,
            height: `${margins.bottom}in`,
            maxHeight: `${safeMaxFooterHeight}in`,
            paddingBottom: `${effectiveFooterDist}in`,
            paddingLeft: `${margins.left}in`,
            paddingRight: `${margins.right}in`,
          }}
          onDoubleClick={onFooterDoubleClick}
          onMouseDown={(e) => e.stopPropagation()} 
        >
          <div className={`w-full h-full relative flex flex-col justify-end ${isHeaderFooterMode ? 'border-t-2 border-dashed border-indigo-500 print:border-none' : 'hover:bg-slate-50/50'}`}>
            {isHeaderFooterMode && (
              <div className="header-footer-label footer-tag bg-indigo-600 text-white print:hidden" style={{ left: 0, top: -2, transform: 'translateY(-100%)' }}>
                {isFirstPage && useDifferentFirstPage ? "First Page Footer" : "Footer"}
              </div>
            )}
            <div 
              ref={footerRef}
              className={`prodoc-footer w-full min-h-full outline-none ${isHeaderFooterEditable ? 'cursor-text pointer-events-auto' : 'cursor-default pointer-events-none'}`}
              contentEditable={isHeaderFooterEditable}
              inputMode={isKeyboardLocked || selectionMode ? "none" : "text"}
              suppressContentEditableWarning
              onInput={handleFooterInput}
              onFocus={() => setActiveEditingArea && setActiveEditingArea('footer')}
              style={{ minHeight: '1em' }}
            />
          </div>
        </div>
      </div>
      
      {/* Context Menu Overlay */}
      <TableContextMenu
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        cell={contextMenu.cell}
        table={contextMenu.table}
        contextMenuRef={contextMenuRef}
        onClose={() => setContextMenu((prev) => ({ ...prev, visible: false }))}
        onAction={handleContextAction}
        onKeyDown={handleMenuKeyDown}
      />

      {/* Beautiful Table Properties Dialog Modal */}
      <TablePropertiesModal
        isOpen={isTablePropertiesOpen}
        onClose={() => setIsTablePropertiesOpen(false)}
        propertiesTable={propertiesTable}
        applyProperties={applyProperties}
        tableWidth={tableWidth}
        setTableWidth={setTableWidth}
        tableAlign={tableAlign}
        setTableAlign={setTableAlign}
        textWrapping={textWrapping}
        setTextWrapping={setTextWrapping}
        customCellPadding={customCellPadding}
        setCustomCellPadding={setCustomCellPadding}
        cellPadding={cellPadding}
        setCellPadding={setCellPadding}
        padTopBottom={padTopBottom}
        setPadTopBottom={setPadTopBottom}
        padLeftRight={padLeftRight}
        setPadLeftRight={setPadLeftRight}
        verticalAlign={verticalAlign}
        setVerticalAlign={setVerticalAlign}
        specifyRowHeight={specifyRowHeight}
        setSpecifyRowHeight={setSpecifyRowHeight}
        rowHeightVal={rowHeightVal}
        setRowHeightVal={setRowHeightVal}
        rowHeightMode={rowHeightMode}
        setRowHeightMode={setRowHeightMode}
        specifyColWidth={specifyColWidth}
        setSpecifyColWidth={setSpecifyColWidth}
        colWidthVal={colWidthVal}
        setColWidthVal={setColWidthVal}
        colWidthUnit={colWidthUnit}
        setColWidthUnit={setColWidthUnit}
        headerColor={headerColor}
        setHeaderColor={setHeaderColor}
        borderColor={borderColor}
        setBorderColor={setBorderColor}
        borderWidth={borderWidth}
        setBorderWidth={setBorderWidth}
        zebraStriping={zebraStriping}
        setZebraStriping={setZebraStriping}
        cantSplit={cantSplit}
        setCantSplit={setCantSplit}
        repeatHeader={repeatHeader}
        setRepeatHeader={setRepeatHeader}
        keepTogether={keepTogether}
        setKeepTogether={setKeepTogether}
      />

      {/* Beautiful Table Column Sort Modal */}
      <SortModal
        isOpen={isSortModalOpen}
        sortColIndex={sortColIndex}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortExcludeHeader={sortExcludeHeader}
        setSortExcludeHeader={setSortExcludeHeader}
        sortType={sortType}
        setSortType={setSortType}
        onClose={() => setIsSortModalOpen(false)}
        onApply={applySortColumn}
      />
    </div>
  );
};

const arePropsEqual = (prev: EditorPageProps, next: EditorPageProps) => {
  return (
    prev.content === next.content &&
    prev.pageNumber === next.pageNumber &&
    prev.totalPages === next.totalPages &&
    prev.zoom === next.zoom &&
    prev.readOnly === next.readOnly &&
    prev.showFormattingMarks === next.showFormattingMarks &&
    prev.activeEditingArea === next.activeEditingArea &&
    prev.headerContent === next.headerContent &&
    prev.footerContent === next.footerContent &&
    prev.firstHeaderContent === next.firstHeaderContent &&
    prev.firstFooterContent === next.firstFooterContent &&
    prev.config.size === next.config.size &&
    prev.config.orientation === next.config.orientation &&
    prev.config.margins.top === next.config.margins.top &&
    prev.config.margins.bottom === next.config.margins.bottom &&
    prev.config.margins.left === next.config.margins.left &&
    prev.config.margins.right === next.config.margins.right &&
    prev.config.differentFirstPage === next.config.differentFirstPage &&
    prev.config.headerDistance === next.config.headerDistance &&
    prev.config.footerDistance === next.config.footerDistance &&
    prev.config.pageColor === next.config.pageColor &&
    prev.config.watermark === next.config.watermark &&
    prev.config.background === next.config.background &&
    prev.config.columns === next.config.columns &&
    prev.config.columnGap === next.config.columnGap &&
    prev.config.hyphenation === next.config.hyphenation
  );
};

export const EditorPage = React.memo(EditorPageComponent, arePropsEqual);
