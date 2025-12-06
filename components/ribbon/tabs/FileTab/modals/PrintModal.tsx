
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  FileText, FileType, Printer, ChevronDown, Loader2, 
  LayoutTemplate, Check, ArrowLeft, Sliders, Eye, Ruler, Download,
  Image as ImageIcon
} from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useFileTab } from '../FileTabContext';
import { paginateContent } from '../../../../../utils/layoutEngine';
import { PAGE_SIZES, MARGIN_PRESETS, PAPER_FORMATS } from '../../../../../constants';
import { PageConfig } from '../../../../../types';
// @ts-ignore
import { Previewer } from 'pagedjs';

declare global {
    interface Window {
        PDFDocument: any;
    }
}

/**
 * A robust writable stream implementation to collect PDFKit chunks.
 */
class BlobStreamShim {
    private chunks: any[] = [];
    private callbacks: Record<string, Function[]> = {};
    public writable = true;

    constructor() {
        this.write = this.write.bind(this);
        this.end = this.end.bind(this);
        this.on = this.on.bind(this);
        this.once = this.once.bind(this);
        this.removeListener = this.removeListener.bind(this);
        this.emit = this.emit.bind(this);
    }

    write(chunk: any) {
        this.chunks.push(chunk);
    }
    
    end() {
        this.emit('finish');
    }
    
    on(event: string, callback: Function) {
        if (!this.callbacks[event]) this.callbacks[event] = [];
        this.callbacks[event].push(callback);
        return this;
    }
    
    once(event: string, callback: Function) {
        const wrapper = (...args: any[]) => {
            callback(...args);
            this.removeListener(event, wrapper);
        };
        this.on(event, wrapper);
        return this;
    }

    removeListener(event: string, callback: Function) {
        if (this.callbacks[event]) {
            this.callbacks[event] = this.callbacks[event].filter(cb => cb !== callback);
        }
        return this;
    }
    
    emit(event: string, ...args: any[]) {
        if (this.callbacks[event]) {
            [...this.callbacks[event]].forEach(cb => cb(...args));
        }
    }
    
    toBlobURL(mimeType: string) {
        const blob = new Blob(this.chunks, { type: mimeType });
        return URL.createObjectURL(blob);
    }
}

// --- Vector PDF Generation Helpers ---

const PX_TO_PT = 0.75; // 96 DPI (Screen) -> 72 DPI (PDF)

const mapFont = (style: CSSStyleDeclaration): string => {
    const family = style.fontFamily.toLowerCase();
    const weight = parseInt(style.fontWeight) || 400;
    const isBold = weight >= 700 || style.fontWeight === 'bold';
    const isItalic = style.fontStyle === 'italic';

    let base = 'Helvetica';
    if (family.includes('serif') || family.includes('times')) base = 'Times';
    if (family.includes('mono') || family.includes('courier')) base = 'Courier';

    if (base === 'Times') {
        if (isBold && isItalic) return 'Times-BoldItalic';
        if (isBold) return 'Times-Bold';
        if (isItalic) return 'Times-Italic';
        return 'Times-Roman';
    } else {
        // Helvetica & Courier format: Base-Bold, Base-Oblique, Base-BoldOblique
        let suffix = '';
        if (isBold) suffix += 'Bold';
        if (isItalic) suffix += 'Oblique'; // PDFKit uses Oblique for these
        
        if (suffix) return `${base}-${suffix}`;
        return base;
    }
};

const getRgbColor = (colorStr: string): [number, number, number] | string => {
    if (colorStr.startsWith('rgb')) {
        const match = colorStr.match(/\d+/g);
        if (match && match.length >= 3) {
            return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
        }
    }
    return colorStr;
};

/**
 * Recursively traverses the DOM element and issues PDFKit commands to render content.
 * This creates selectable text and vectors instead of a raster image.
 */
const renderDOMToPDF = async (doc: any, node: Node, pageRect: DOMRect) => {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.replace(/\s+/g, ' '); // Collapse whitespace similar to browser
        if (!text || !text.trim()) return;

        // Create a range to get precise bounding box of this text node
        const range = document.createRange();
        range.selectNode(node);
        const rects = range.getClientRects();

        if (rects.length === 0) return;
        
        const parent = node.parentElement;
        if (!parent) return;
        
        const style = window.getComputedStyle(parent);
        const isHidden = style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0;
        if (isHidden) return;

        const fontName = mapFont(style);
        const fontSize = parseFloat(style.fontSize) * PX_TO_PT;
        const color = getRgbColor(style.color);

        // Render each line rect separately (handles wrapping somewhat)
        // Note: This paints text "where it is".
        for (let i = 0; i < rects.length; i++) {
            const rect = rects[i];
            const x = (rect.left - pageRect.left) * PX_TO_PT;
            // PDFKit draws text from baseline-ish or top-left depending on options.
            // Standard .text() acts like a block. .text(str, x, y) places it.
            // To align with HTML baseline is tricky, but top-alignment usually works okay for visual approximation.
            // Adjusting y by a small factor might help align baseline.
            const y = (rect.top - pageRect.top) * PX_TO_PT;
            
            doc.fillColor(color)
               .font(fontName)
               .fontSize(fontSize)
               .text(text, x, y + (fontSize * 0.15), { // Slight nudge for baseline
                   width: rect.width * PX_TO_PT,
                   lineBreak: false,
                   ellipsis: false
               });
               
            // Since we iterate rects of a single text node, usually a text node is one line unless wrapped.
            // If wrapped, getClientRects returns multiple boxes. We'd ideally need to know WHICH text goes in WHICH box.
            // Range.getClientRects gives boxes for the *whole* content.
            // Splitting the text string per box is hard without a range-walker.
            // APPROXIMATION: If multiple rects exist for one text node, we print the whole text in the first rect
            // with the width of the union? No, that causes overlap.
            // FALLBACK: For complex wrapping text nodes, just printing at the first rect is the safest "simple" vector approach.
            // Browser engines wrap text nodes into multiple line boxes.
            // For 100% accuracy, we'd need to bisect the text range to find line breaks.
            // For this implementation, we assume the text node mostly fits in the primary rect.
            break; 
        }

    } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const style = window.getComputedStyle(el);
        const isHidden = style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0;

        if (isHidden) return;

        // Background Colors
        if (style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent') {
            const rect = el.getBoundingClientRect();
            const x = (rect.left - pageRect.left) * PX_TO_PT;
            const y = (rect.top - pageRect.top) * PX_TO_PT;
            const w = rect.width * PX_TO_PT;
            const h = rect.height * PX_TO_PT;

            doc.save()
               .rect(x, y, w, h)
               .fillColor(getRgbColor(style.backgroundColor))
               .fill()
               .restore();
        }

        // Borders (Simplified: solid borders only)
        if (style.borderStyle !== 'none' && parseFloat(style.borderWidth) > 0) {
             const rect = el.getBoundingClientRect();
             const x = (rect.left - pageRect.left) * PX_TO_PT;
             const y = (rect.top - pageRect.top) * PX_TO_PT;
             const w = rect.width * PX_TO_PT;
             const h = rect.height * PX_TO_PT;
             const bWidth = parseFloat(style.borderWidth) * PX_TO_PT;
             
             doc.save()
                .rect(x, y, w, h)
                .lineWidth(bWidth)
                .strokeColor(getRgbColor(style.borderColor))
                .stroke()
                .restore();
        }

        // Images
        if (el.tagName === 'IMG') {
            const img = el as HTMLImageElement;
            if (img.src && img.complete && img.naturalWidth > 0) {
                const rect = el.getBoundingClientRect();
                const x = (rect.left - pageRect.left) * PX_TO_PT;
                const y = (rect.top - pageRect.top) * PX_TO_PT;
                const w = rect.width * PX_TO_PT;
                const h = rect.height * PX_TO_PT;

                try {
                    // Need to fetch blob for PDFKit
                    const resp = await fetch(img.src);
                    const blob = await resp.blob();
                    const buffer = await blob.arrayBuffer();
                    doc.image(buffer, x, y, { width: w, height: h });
                } catch (e) {
                    console.warn("Could not embed image in PDF", img.src);
                }
            }
        }

        // Recursively render children
        const children = Array.from(el.childNodes);
        for (const child of children) {
            await renderDOMToPDF(doc, child, pageRect);
        }
    }
};

// --- UI Components ---

const PrintSelect = ({ label, value, onChange, options, icon: Icon, disabled, className = "" }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
    const [animateClass, setAnimateClass] = useState('');

    const updateLayout = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const margin = 8;

            const availableSpaceBelow = viewportHeight - rect.bottom - margin;
            const availableSpaceAbove = rect.top - margin;
            
            const contentHeight = options.length * 40 + 16;
            const idealMaxHeight = 300;

            let top: number | string = rect.bottom + 4;
            let bottom: number | string = 'auto';
            let maxHeight = Math.min(contentHeight, idealMaxHeight);
            let animation = 'zoom-in-95 origin-top';

            if (availableSpaceBelow < 220 && availableSpaceAbove > availableSpaceBelow) {
                top = 'auto';
                bottom = viewportHeight - rect.top + 4;
                maxHeight = Math.min(contentHeight, availableSpaceAbove, idealMaxHeight);
                animation = 'zoom-in-95 origin-bottom';
            } else {
                maxHeight = Math.min(maxHeight, Math.max(150, availableSpaceBelow));
            }

            let left = rect.left;
            if (left + rect.width > viewportWidth - margin) {
                left = viewportWidth - rect.width - margin;
            }
            if (left < margin) left = margin;

            setDropdownStyle({
                top,
                bottom,
                left,
                width: rect.width,
                maxHeight,
                opacity: 1
            });
            setAnimateClass(animation);
        }
    };

    useLayoutEffect(() => {
        if (isOpen) {
            updateLayout();
            window.addEventListener('scroll', updateLayout, true); 
            window.addEventListener('resize', updateLayout);
            return () => {
                window.removeEventListener('scroll', updateLayout, true);
                window.removeEventListener('resize', updateLayout);
            };
        }
    }, [isOpen, options.length]);

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        setIsOpen(!isOpen);
    };

    const close = () => setIsOpen(false);

    useEffect(() => {
        if (!isOpen) return;
        window.addEventListener('click', close);
        return () => window.removeEventListener('click', close);
    }, [isOpen]);

    const selectedLabel = options.find((o: any) => o.value === value)?.label || value;

    return (
        <div className={`relative ${className}`}>
            <button
                ref={triggerRef}
                onClick={toggle}
                disabled={disabled}
                className={`w-full text-left px-4 py-3 bg-white dark:bg-slate-800 border rounded-xl transition-all shadow-sm flex items-center justify-between group ${isOpen ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    {Icon && <Icon size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0"/>}
                    <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{selectedLabel}</span>
                    </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}/>
            </button>

            {isOpen && createPortal(
                <div 
                    className={`fixed z-[9999] bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in duration-100 flex flex-col ${animateClass}`}
                    style={{ 
                        ...dropdownStyle,
                        opacity: dropdownStyle.top || dropdownStyle.bottom ? 1 : 0
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                        {options.map((opt: any) => (
                            <button
                                key={opt.value}
                                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                                className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors flex items-center justify-between ${opt.value === value ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                            >
                                <span className="truncate">{opt.label}</span>
                                {opt.value === value && <Check size={14} className="shrink-0 text-blue-600 dark:text-blue-400"/>}
                            </button>
                        ))}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

const getVerticalAlignStyle = (align: string): React.CSSProperties => {
  const style: React.CSSProperties = { display: 'flex', flexDirection: 'column' };
  let justifyContent: 'center' | 'flex-end' | 'space-between' | 'flex-start' = 'flex-start';
  if (align === 'center') justifyContent = 'center';
  else if (align === 'bottom') justifyContent = 'flex-end';
  else if (align === 'justify') justifyContent = 'space-between';
  return { ...style, justifyContent };
};

const renderPageContent = (
    index: number, 
    page: { html: string, config: PageConfig }, 
    headerContent: string, 
    footerContent: string, 
    scale: number
) => {
    const cfg = page.config;
    
    let widthIn = 0;
    let heightIn = 0;
    
    if (cfg.size === 'Custom' && cfg.customWidth && cfg.customHeight) {
        widthIn = cfg.customWidth;
        heightIn = cfg.customHeight;
    } else {
        const base = PAGE_SIZES[cfg.size as string] || PAGE_SIZES['Letter'];
        widthIn = cfg.orientation === 'landscape' ? base.height / 96 : base.width / 96;
        heightIn = cfg.orientation === 'landscape' ? base.width / 96 : base.height / 96;
    }

    const margins = {
        top: cfg.margins.top,
        bottom: cfg.margins.bottom,
        left: cfg.margins.left,
        right: cfg.margins.right,
        gutter: cfg.margins.gutter || 0
    };
    
    if (cfg.gutterPosition === 'top' && !['mirrorMargins', 'bookFold'].includes(cfg.multiplePages || '')) {
         margins.top += margins.gutter;
    } else {
         margins.left += margins.gutter;
    }
    
    const headerDistIn = cfg.headerDistance || 0.5;
    const footerDistIn = cfg.footerDistance || 0.5;

    let printHeader = headerContent;
    if (printHeader.includes('[Header]')) {
        printHeader = printHeader.replace('[Header]', '');
    }
    
    let printFooter = footerContent;
    printFooter = printFooter.replace(/\[Page \d+\]/g, `[Page ${index + 1}]`)
                             .replace(/<span class="page-number-placeholder">.*?<\/span>/g, `${index + 1}`);

    const scaledWidth = widthIn * 96 * scale;
    const scaledHeight = heightIn * 96 * scale;
    const verticalAlignStyle = getVerticalAlignStyle(cfg.verticalAlign);

    return (
        <div 
            key={index}
            style={{ 
                width: scaledWidth, 
                height: scaledHeight,
            }}
            className="relative shrink-0 select-none shadow-lg"
        >
            <div 
                className="prodoc-page-sheet bg-white transition-transform duration-200 origin-top-left absolute top-0 left-0 overflow-hidden"
                style={{
                    width: `${widthIn}in`,
                    height: `${heightIn}in`,
                    transform: `scale(${scale})`,
                    paddingTop: `${margins.top}in`,
                    paddingBottom: `${margins.bottom}in`,
                    paddingLeft: `${margins.left}in`,
                    paddingRight: `${margins.right}in`,
                    boxSizing: 'border-box'
                }}
            >
                <div 
                    className="absolute left-0 right-0 z-30"
                    style={{ 
                        top: 0, 
                        height: `${margins.top}in`, 
                        paddingTop: `${headerDistIn}in`, 
                        paddingLeft: `${margins.left}in`, 
                        paddingRight: `${margins.right}in` 
                    }}
                >
                    <div 
                        className="prodoc-header w-full h-full"
                        dangerouslySetInnerHTML={{__html: printHeader || ''}}
                    />
                </div>
                
                <div 
                    className="relative w-full h-full overflow-hidden z-10"
                    style={{ ...verticalAlignStyle }}
                >
                    <div 
                        className="prodoc-editor w-full h-full outline-none text-lg leading-loose break-words"
                        style={{
                            fontFamily: 'Calibri, Inter, sans-serif',
                            color: '#000000',
                            flex: cfg.verticalAlign === 'justify' ? '1 1 auto' : undefined
                        }}
                        dangerouslySetInnerHTML={{__html: page.html}}
                    />
                </div>

                <div 
                    className="absolute left-0 right-0 z-30"
                    style={{ 
                        bottom: 0, 
                        height: `${margins.bottom}in`, 
                        paddingBottom: `${footerDistIn}in`, 
                        paddingLeft: `${margins.left}in`, 
                        paddingRight: `${margins.right}in`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                    }}
                >
                    <div 
                        className="prodoc-footer w-full"
                        dangerouslySetInnerHTML={{__html: printFooter}}
                    />
                </div>
            </div>
        </div>
    );
};

const DesktopPrintPreview: React.FC<{
    pages: { html: string, config: PageConfig }[];
    headerContent: string;
    footerContent: string;
    isPreparing: boolean;
}> = ({ pages, headerContent, footerContent, isPreparing }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useLayoutEffect(() => {
        const updateScale = () => {
            if (containerRef.current && pages.length > 0) {
                const containerWidth = containerRef.current.clientWidth;
                const padding = 64; 
                const availableWidth = containerWidth - padding;
                
                const firstPageConfig = pages[0].config;
                const baseSize = PAGE_SIZES[firstPageConfig.size as string] || PAGE_SIZES['Letter'];
                const widthPx = firstPageConfig.orientation === 'landscape' ? baseSize.height : baseSize.width;
                
                const newScale = Math.min(1.2, Math.max(0.5, availableWidth / widthPx));
                setScale(newScale);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, [pages]);

    return (
        <div 
            ref={containerRef}
            className="flex-1 bg-[#525659] dark:bg-slate-950/50 relative overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 flex flex-col items-center p-8"
        >
             {pages.length === 0 || isPreparing ? (
                 <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                     <Loader2 className="animate-spin" size={32} />
                     <span className="text-sm font-medium">{isPreparing ? 'Preparing document...' : 'Generating Preview...'}</span>
                 </div>
             ) : (
                 <div className="flex flex-col gap-8 items-center w-full pb-24">
                     {pages.map((page, index) => renderPageContent(index, page, headerContent, footerContent, scale))}
                 </div>
             )}
        </div>
    );
};

const MobilePrintPreview: React.FC<{
    pages: { html: string, config: PageConfig }[];
    headerContent: string;
    footerContent: string;
    isPreparing: boolean;
    onPrint: () => void;
    isVisible: boolean;
}> = ({ pages, headerContent, footerContent, isPreparing, onPrint, isVisible }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);

    useLayoutEffect(() => {
        if (!isVisible) return;

        const updateScale = () => {
            if (containerRef.current && pages.length > 0) {
                const containerWidth = containerRef.current.clientWidth;
                if (containerWidth === 0) return;

                const padding = 32; 
                const availableWidth = Math.max(0, containerWidth - padding);
                
                const firstPageConfig = pages[0].config;
                const baseSize = PAGE_SIZES[firstPageConfig.size as string] || PAGE_SIZES['Letter'];
                const widthPx = firstPageConfig.orientation === 'landscape' ? baseSize.height : baseSize.width;
                const docWidthPx = widthPx || 816;
                
                const newScale = Math.min(0.85, availableWidth / docWidthPx);
                if (newScale > 0) setScale(newScale);
            }
        };

        updateScale();
        const t1 = setTimeout(updateScale, 50);
        window.addEventListener('resize', updateScale);
        return () => {
            window.removeEventListener('resize', updateScale);
            clearTimeout(t1);
        };
    }, [pages, isVisible]);

    return (
        <div className="flex-1 relative overflow-hidden flex flex-col bg-[#f0f2f5] dark:bg-slate-950">
            <div 
                ref={containerRef}
                className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center p-4 pb-32"
            >
                {pages.length === 0 || isPreparing ? (
                     <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                         <Loader2 className="animate-spin" size={28} />
                         <span className="text-xs font-medium">{isPreparing ? 'Preparing...' : 'Loading...'}</span>
                     </div>
                 ) : (
                     <div className="flex flex-col gap-4 items-center w-full transition-opacity duration-300" style={{ opacity: scale > 0 ? 1 : 0 }}>
                         {pages.map((page, index) => renderPageContent(index, page, headerContent, footerContent, scale))}
                     </div>
                 )}
            </div>
            
            <div className="absolute bottom-6 right-6 z-30 flex flex-col gap-3">
                 <button 
                    onClick={onPrint}
                    disabled={isPreparing}
                    className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-[0_8px_20px_rgba(37,99,235,0.4)] flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-all border-2 border-white/20 backdrop-blur-sm"
                 >
                    {isPreparing ? <Loader2 size={24} className="animate-spin"/> : <Download size={24} />}
                 </button>
             </div>
        </div>
    );
};

const DPI_OPTIONS = [
    { value: 72, label: '72 DPI (Draft/Screen)' },
    { value: 96, label: '96 DPI (Standard Web)' },
    { value: 150, label: '150 DPI (Low Quality Print)' },
    { value: 300, label: '300 DPI (High Quality Print)' },
    { value: 600, label: '600 DPI (Ultra High Quality)' }
];

const PrintSettingsPanel: React.FC<{
    localConfig: PageConfig;
    setLocalConfig: (fn: (prev: PageConfig) => PageConfig) => void;
    copies: number;
    setCopies: (c: number) => void;
    dpi: number;
    setDpi: (dpi: number) => void;
    onPrint: () => void;
    isPreparing: boolean;
    closeModal: () => void;
    isMobile?: boolean;
}> = ({ localConfig, setLocalConfig, copies, setCopies, dpi, setDpi, onPrint, isPreparing, closeModal, isMobile }) => {
    
    const handleSettingChange = (key: keyof PageConfig | 'marginPreset', value: any) => {
      setLocalConfig(prev => {
          const next = { ...prev, [key]: value };
          if (key === 'marginPreset' && value !== 'custom') {
              next.margins = MARGIN_PRESETS[value as string];
          }
          return next;
      });
    };

    const formatPresetLabel = (preset: string) => {
        if (preset === 'office2003') return 'Office 2003 Default';
        if (preset === 'apa') return 'APA Style';
        if (preset === 'mla') return 'MLA Style';
        if (preset === 'chicago') return 'Chicago Style';
        const label = preset.replace(/([A-Z])/g, ' $1').trim();
        return label.charAt(0).toUpperCase() + label.slice(1) + " Margins";
    };

    const getDimensionsDisplay = () => {
        if (localConfig.size === 'Custom') {
             return `${localConfig.customWidth || 0} x ${localConfig.customHeight || 0} in`;
        }
        const format = PAPER_FORMATS.find(f => f.id === localConfig.size);
        if (format) {
            if (localConfig.orientation === 'landscape') {
                return `${format.height} x ${format.width}`;
            }
            return `${format.width} x ${format.height}`;
        }
        return "";
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900">
            {!isMobile && (
                <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
                     <button 
                        onClick={closeModal}
                        className="p-2 -ml-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                     >
                         <ArrowLeft size={20} />
                     </button>
                     <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                         Print / Download
                     </h2>
                </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar">
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Printer</h3>
                    <PrintSelect
                        label="Destination"
                        value="default"
                        onChange={() => {}}
                        options={[{ value: 'default', label: 'Save as PDF' }]}
                        icon={Printer}
                        disabled
                    />
                </div>

                <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Page Settings</h3>
                        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            <Ruler size={10} /> {getDimensionsDisplay()}
                        </span>
                    </div>
                    
                    <PrintSelect
                        label="Orientation"
                        value={localConfig.orientation}
                        onChange={(v: any) => handleSettingChange('orientation', v)}
                        options={[
                            { value: 'portrait', label: 'Portrait Orientation' },
                            { value: 'landscape', label: 'Landscape Orientation' }
                        ]}
                        icon={FileType}
                    />

                    <PrintSelect
                        label="Paper Size"
                        value={localConfig.size}
                        onChange={(v: any) => handleSettingChange('size', v)}
                        options={PAPER_FORMATS.map(f => ({ 
                            value: f.id, 
                            label: `${f.label} (${f.width} x ${f.height})` 
                        }))}
                        icon={FileText}
                    />

                    <PrintSelect
                        label="Margins"
                        value={localConfig.marginPreset}
                        onChange={(v: any) => handleSettingChange('marginPreset', v)}
                        options={Object.keys(MARGIN_PRESETS).map(m => ({ 
                            value: m, 
                            label: formatPresetLabel(m) 
                        }))}
                        icon={LayoutTemplate}
                    />
                </div>
                
                {isMobile && <div className="h-20"></div>}
            </div>

            {!isMobile && (
                <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0 flex flex-col gap-3">
                    <button 
                        onClick={onPrint}
                        disabled={isPreparing}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-200/50 dark:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98]"
                    >
                        {isPreparing ? <Loader2 className="animate-spin" size={20}/> : <Download size={20}/>}
                        <span>{isPreparing ? 'Generating PDF...' : 'Download PDF'}</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export const PrintModal: React.FC = () => {
  const { content, pageConfig: globalConfig, headerContent, footerContent, documentTitle } = useEditor();
  const { closeModal } = useFileTab();
  
  const [mobileTab, setMobileTab] = useState<'settings' | 'preview'>('settings');
  const [localConfig, setLocalConfig] = useState<PageConfig>({ ...globalConfig });
  const [previewPages, setPreviewPages] = useState<{ html: string, config: PageConfig }[]>([]);
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);
  const [copies, setCopies] = useState(1);
  const [dpi, setDpi] = useState(300);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
        const result = paginateContent(content, localConfig);
        setPreviewPages(result.pages);
    }, 50); 
    return () => clearTimeout(timer);
  }, [content, localConfig]);

  const handleDownloadPDF = async () => {
      setIsPreparingPrint(true);

      try {
          const oldContainer = document.getElementById('paged-print-container');
          if (oldContainer) document.body.removeChild(oldContainer);
          const oldStyle = document.getElementById('paged-print-style');
          if (oldStyle) document.head.removeChild(oldStyle);

          const printContainer = document.createElement('div');
          printContainer.id = 'paged-print-container';
          document.body.appendChild(printContainer);

          const { size, orientation, margins } = localConfig;
          
          let widthIn = 0;
          let heightIn = 0;

          if (size === 'Custom' && localConfig.customWidth && localConfig.customHeight) {
              widthIn = localConfig.customWidth;
              heightIn = localConfig.customHeight;
          } else {
              const baseSize = PAGE_SIZES[size as string] || PAGE_SIZES['Letter'];
              widthIn = baseSize.width / 96;
              heightIn = baseSize.height / 96;
          }

          if (orientation === 'landscape') {
              const temp = widthIn;
              widthIn = heightIn;
              heightIn = temp;
          }

          const widthPt = widthIn * 72;
          const heightPt = heightIn * 72;

          const sizeCss = `${widthIn}in ${heightIn}in`;

          const css = `
              @page {
                  size: ${sizeCss};
                  margin-top: ${margins.top}in;
                  margin-bottom: ${margins.bottom}in;
                  margin-left: ${margins.left}in;
                  margin-right: ${margins.right}in;
                  
                  @top-center {
                      content: element(header);
                  }
                  @bottom-center {
                      content: element(footer);
                  }
              }

              .pagedjs-header {
                  position: running(header);
                  width: 100%;
              }

              .pagedjs-footer {
                  position: running(footer);
                  width: 100%;
              }

              .paged-content {
                  font-family: 'Calibri, Inter, sans-serif',
                  font-size: 11pt;
                  line-height: 1.5;
                  color: black;
              }
              
              .paged-content table { 
                  border-collapse: collapse; 
                  width: 100%; 
                  margin: 1em 0;
              }
              .paged-content tr {
                  break-inside: avoid;
                  page-break-inside: avoid;
              }
              .paged-content td, .paged-content th { 
                  border: 1px solid #000; 
                  padding: 4px 8px; 
              }
              
              .paged-content img { max-width: 100%; }
              .equation-handle, .equation-dropdown { display: none !important; }
              .prodoc-page-break { break-after: page; height: 0; margin: 0; border: none; }
              
              .pagedjs_page {
                 background: white;
                 box-shadow: none !important;
                 margin: 0 !important;
              }
              
              #paged-print-container {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  z-index: -1000;
                  visibility: visible;
              }
          `;

          let cleanHeader = headerContent.replace('[Header]', '');
          let cleanFooter = footerContent; 
          if (cleanFooter.includes('page-number-placeholder')) {
               cleanFooter = cleanFooter.replace(/<span class="page-number-placeholder">.*?<\/span>/g, '<span class="pagedjs-page-number"></span>');
          }

          const pageNumCss = `
             .pagedjs-page-number::after {
                 content: counter(page);
             }
          `;

          const htmlContent = `
              <div class="pagedjs-header">${cleanHeader}</div>
              <div class="pagedjs-footer">${cleanFooter}</div>
              <div class="paged-content">
                  ${content}
              </div>
          `;

          const previewer = new Previewer();
          
          const styleEl = document.createElement('style');
          styleEl.id = 'paged-print-style';
          styleEl.innerHTML = css + pageNumCss;
          document.head.appendChild(styleEl);

          await previewer.preview(htmlContent, [], printContainer);

          const pagedPages = document.querySelectorAll('.pagedjs_page');
          if (pagedPages.length === 0) throw new Error("No pages generated by Paged.js");

          const doc = new window.PDFDocument({
             autoFirstPage: false
          });
          
          const stream = new BlobStreamShim();
          doc.pipe(stream);
          
          stream.on('finish', () => {
             const url = stream.toBlobURL('application/pdf');
             const a = document.createElement('a');
             a.href = url;
             a.download = `${documentTitle || 'document'}.pdf`;
             document.body.appendChild(a);
             a.click();
             document.body.removeChild(a);
             URL.revokeObjectURL(url);
          });

          for (let i = 0; i < pagedPages.length; i++) {
              const pageEl = pagedPages[i] as HTMLElement;
              
              doc.addPage({
                  size: [widthPt, heightPt],
                  margin: 0
              });
              
              // Vector PDF Generation: Traverse the DOM nodes and render them using PDFKit commands
              // This replaces html2canvas rasterization
              await renderDOMToPDF(doc, pageEl, pageEl.getBoundingClientRect());
          }
          
          doc.end();

      } catch (e) {
          console.error("PDF Generation Error:", e);
          alert("Failed to generate PDF. Please try again.");
      } finally {
          const container = document.getElementById('paged-print-container');
          if (container) document.body.removeChild(container);
          const style = document.getElementById('paged-print-style');
          if (style) document.head.removeChild(style);
          
          setIsPreparingPrint(false);
      }
  };

  return (
    <div 
        className="flex flex-col md:flex-row w-full h-full bg-white dark:bg-slate-950 overflow-hidden md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
    >
        {isMobile && (
            <div className="flex flex-col bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 z-30">
                <div className="flex items-center justify-between px-4 py-3">
                    <button 
                        onClick={closeModal}
                        className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Print / Download</h2>
                    <div className="w-8"></div>
                </div>
                <div className="px-4 pb-3">
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        <button 
                            onClick={() => setMobileTab('settings')}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${mobileTab === 'settings' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                        >
                            <Sliders size={14} /> Settings
                        </button>
                        <button 
                            onClick={() => setMobileTab('preview')}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${mobileTab === 'preview' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                        >
                            <Eye size={14} /> Preview
                        </button>
                    </div>
                </div>
            </div>
        )}

        <div className={`
            w-full md:w-[360px] flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] h-full
            ${isMobile ? (mobileTab === 'settings' ? 'flex' : 'hidden') : 'flex'}
        `}>
            <PrintSettingsPanel 
                localConfig={localConfig}
                setLocalConfig={setLocalConfig}
                copies={copies}
                setCopies={setCopies}
                dpi={dpi}
                setDpi={setDpi}
                onPrint={handleDownloadPDF}
                isPreparing={isPreparingPrint}
                closeModal={closeModal}
                isMobile={isMobile}
            />
        </div>

        <div className={`
            flex-1 bg-[#525659] dark:bg-slate-950 relative overflow-hidden flex flex-col
            ${isMobile ? (mobileTab === 'preview' ? 'flex' : 'hidden') : 'flex'}
        `}>
            {isMobile ? (
                <MobilePrintPreview 
                    pages={previewPages}
                    headerContent={headerContent}
                    footerContent={footerContent}
                    isPreparing={isPreparingPrint}
                    onPrint={handleDownloadPDF}
                    isVisible={mobileTab === 'preview'}
                />
            ) : (
                <DesktopPrintPreview 
                    pages={previewPages}
                    headerContent={headerContent}
                    footerContent={footerContent}
                    isPreparing={isPreparingPrint}
                />
            )}
        </div>
    </div>
  );
};
