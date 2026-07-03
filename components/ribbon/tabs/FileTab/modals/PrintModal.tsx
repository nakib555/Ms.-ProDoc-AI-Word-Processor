
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  FileText, FileType, Printer, ChevronDown, 
  LayoutTemplate, Check, ArrowLeft, Sliders, Eye, Ruler, Download,
  Image as ImageIcon,
  Monitor
} from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useFileTab } from '../FileTabContext';
import { paginateContent } from '../../../../../utils/layoutEngine';
import { PAGE_SIZES, MARGIN_PRESETS, PAPER_FORMATS } from '../../../../../constants';
import { PageConfig, ExportType } from '../../../../../types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { generatePdfPrint } from '../../../../../utils/printUtils';
import TurndownService from 'turndown';

// --- UI Components ---

const PrintSelect = ({ label, value, onChange, options, icon: Icon, disabled, className = "" }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
    const [animateClass, setAnimateClass] = useState('');

    const updateLayout = React.useCallback(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const margin = 8;

            const availableSpaceBelow = viewportHeight - rect.bottom - margin;
            const availableSpaceAbove = rect.top - margin;
            
            const contentHeight = options.length * 40 + 16;
            const idealMaxHeight = 300;
            const actualRequiredHeight = Math.min(contentHeight, idealMaxHeight);

            let top: number | string = rect.bottom + 4;
            let bottom: number | string = 'auto';
            let maxHeight = actualRequiredHeight;
            let animation = 'zoom-in-95 origin-top';

            // Smart dropdown logic: flip up if there's not enough space below AND there is more space above
            if (availableSpaceBelow < actualRequiredHeight && availableSpaceAbove > availableSpaceBelow) {
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
    }, [options.length]);

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
    }, [isOpen, updateLayout]);

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        setIsOpen(!isOpen);
    };

    const close = () => setIsOpen(false);

    useEffect(() => {
        if (!isOpen) return;
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as Node;
            if (triggerRef.current?.contains(target)) return;
            if (dropdownRef.current?.contains(target)) return;
            close();
        };
        window.addEventListener('mousedown', handleOutsideClick);
        return () => window.removeEventListener('mousedown', handleOutsideClick);
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
                    ref={dropdownRef}
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
                            fontFamily: 'Inter, sans-serif',
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
                     <LoadingSpinner className="w-8 h-8" />
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
                         <LoadingSpinner className="w-8 h-8" />
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
                    {isPreparing ? <LoadingSpinner className="w-6 h-6 text-white"/> : <Download size={24} />}
                 </button>
             </div>
        </div>
    );
};

const PrintSettingsPanel: React.FC<{
    localConfig: PageConfig;
    setLocalConfig: (fn: (prev: PageConfig) => PageConfig) => void;
    copies: number;
    setCopies: (c: number) => void;
    onPrint: () => void;
    isPreparing: boolean;
    closeModal: () => void;
    isMobile?: boolean;
    printRange: 'all' | 'current' | 'custom';
    setPrintRange: (range: 'all' | 'current' | 'custom') => void;
    customPages: string;
    setCustomPages: (pages: string) => void;
    exportType: ExportType;
    setExportType: (type: ExportType) => void;
}> = ({ localConfig, setLocalConfig, onPrint, isPreparing, closeModal, isMobile, printRange, setPrintRange, customPages, setCustomPages, exportType, setExportType }) => {
    
    const { documentTitle, setDocumentTitle } = useEditor();

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
        if (preset === 'classic') return 'Classic Default';
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
                          Print & Export
                     </h2>
                </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar">
                {/* File Details Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">File Details</h3>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">File Name</label>
                        <input 
                            type="text" 
                            value={documentTitle}
                            onChange={(e) => setDocumentTitle(e.target.value)}
                            placeholder="Document Title"
                            className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 shadow-sm"
                        />
                    </div>
                    
                    <PrintSelect
                        label="Save as Type"
                        value={exportType}
                        onChange={(v: any) => setExportType(v)}
                        options={[
                            { value: 'pdf', label: 'PDF Document (.pdf)' },
                            { value: 'doc', label: 'Word Document (.doc)' },
                            { value: 'rtf', label: 'Rich Text Format (.rtf)' },
                            { value: 'html', label: 'Web Page (.html)' },
                            { value: 'txt', label: 'Plain Text (.txt)' },
                            { value: 'md', label: 'Markdown (.md)' },
                            { value: 'json', label: 'JSON Data (.json)' }
                        ]}
                        icon={Download}
                    />
                </div>

                <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>

                {exportType === 'pdf' ? (
                    <>
                        {/* Pages section - PDF only */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pages</h3>
                            <PrintSelect
                                label="Print Range"
                                value={printRange}
                                onChange={(v: any) => setPrintRange(v)}
                                options={[
                                    { value: 'all', label: 'Print All Pages' },
                                    { value: 'current', label: 'Print Current Page' },
                                    { value: 'custom', label: 'Custom Range' }
                                ]}
                                icon={FileText}
                            />
                            
                            {printRange === 'custom' && (
                                <div className="animate-in slide-in-from-top-2 duration-200">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Pages (e.g., 1-3, 5)</label>
                                    <input 
                                        type="text" 
                                        value={customPages}
                                        onChange={(e) => setCustomPages(e.target.value)}
                                        placeholder="e.g. 1-5, 8, 11-13"
                                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>

                        {/* Page Settings section - PDF only */}
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
                    </>
                ) : (
                    <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-xl space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                        <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">Flowable Format Info</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            Formats like <strong>{exportType.toUpperCase()}</strong> do not have pagination, margins, or orientation parameters. They will export your document text and structure directly to your computer.
                        </p>
                    </div>
                )}
                
                {isMobile && <div className="h-20"></div>}
            </div>

            {!isMobile && (
                <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0 flex flex-col gap-3">
                    <button 
                        onClick={onPrint}
                        disabled={isPreparing}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-200/50 dark:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98]"
                    >
                        {isPreparing ? (
                            <LoadingSpinner className="w-5 h-5 text-white"/>
                        ) : (
                            <Download size={20}/>
                        )}
                        <span>
                            {isPreparing ? (
                                exportType === 'pdf' ? 'Preparing PDF...' : 'Preparing Export...'
                            ) : exportType === 'pdf' ? (
                                'Print / Save as PDF'
                            ) : exportType === 'doc' ? (
                                'Export Word Document (.doc)'
                            ) : exportType === 'rtf' ? (
                                'Export Rich Text Format (.rtf)'
                            ) : exportType === 'html' ? (
                                'Export Web Page (.html)'
                            ) : exportType === 'txt' ? (
                                'Export Plain Text (.txt)'
                            ) : exportType === 'md' ? (
                                'Export Markdown (.md)'
                            ) : (
                                'Export JSON (.json)'
                            )}
                        </span>
                    </button>
                    <p className="text-[10px] text-center text-slate-400">
                        {exportType === 'pdf' ? 'Uses high-fidelity vector printing' : 'Downloads directly to your system'}
                    </p>
                </div>
            )}
        </div>
    );
};

export const PrintModal: React.FC = () => {
  const { content, pageConfig: globalConfig, headerContent, footerContent, documentTitle, setPageConfig, currentPage, viewMode, setViewMode } = useEditor();
  const { closeModal } = useFileTab();
  
  const [mobileTab, setMobileTab] = useState<'settings' | 'preview'>('settings');
  const [localConfig, setLocalConfig] = useState<PageConfig>({ ...globalConfig });
  const [previewPages, setPreviewPages] = useState<{ html: string, config: PageConfig }[]>([]);
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);
  const [copies, setCopies] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  
  // Print Range State
  const [printRange, setPrintRange] = useState<'all' | 'current' | 'custom'>('all');
  const [customPages, setCustomPages] = useState('');
  const [exportType, setExportType] = useState<ExportType>('pdf');

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
          if (exportType === 'pdf') {
              // Ensure we are in print layout mode for correct DOM structure
              if (viewMode !== 'print') {
                  setViewMode('print');
                  // Wait for view transition
                  await new Promise(resolve => setTimeout(resolve, 500));
              }
              
              // Update global config to match local print settings so the editor reflects the print layout
              setPageConfig(localConfig);
              
              // Wait for editor to re-render with new config
              // Increased delay to ensure pagination and layout are fully updated before print dialog opens
              await new Promise(resolve => setTimeout(resolve, 800));

              await generatePdfPrint(
                  content, 
                  localConfig, 
                  headerContent, 
                  footerContent, 
                  { 
                      range: printRange, 
                      pages: customPages,
                      currentPage: currentPage
                  }
              );
              closeModal();
          } else {
              let data = content;
              let mime = 'text/html';
              let ext = 'html';
              if (exportType === 'html') {
                  data = `<!DOCTYPE html><html><head>    <meta charset="utf-8">    <title>${documentTitle}</title>    <style>        body { font-family: Inter, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }        table { border-collapse: collapse; width: 100%; margin-bottom: 1rem; }        th, td { border: 1px solid #ddd; padding: 8px; }        img { max-width: 100%; height: auto; }        blockquote { border-left: 4px solid #ccc; margin: 0; padding-left: 16px; color: #666; }    </style></head><body>    ${content}</body></html>`;
              } else if (exportType === 'doc') {
                  data = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>${documentTitle}</title></head><body>${content}</body></html>`;
                  mime = 'application/msword';
                  ext = 'doc';
              } else if (exportType === 'txt') {
                  const temp = document.createElement('div');
                  temp.innerHTML = content;
                  data = temp.innerText;
                  mime = 'text/plain';
                  ext = 'txt';
              } else if (exportType === 'md') {
                  const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
                  data = turndownService.turndown(content);
                  mime = 'text/markdown';
                  ext = 'md';
              } else if (exportType === 'json') {
                  data = JSON.stringify({
                      title: documentTitle,
                      content: content,
                      date: new Date().toISOString()
                  }, null, 2);
                  mime = 'application/json';
                  ext = 'json';
              } else if (exportType === 'rtf') {
                  // A very basic RTF representation (Fallback, though typically requires a library for complex styling)
                  const temp = document.createElement('div');
                  temp.innerHTML = content;
                  data = `{\\rtf1\\ansi\\ansicpg1252\\deff0{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}\r\n\\viewkind4\\uc1\\pard\\lang1033\\f0\\fs22 ${temp.innerText.replace(/\n/g, '\\par\r\n')}}`;
                  mime = 'application/rtf';
                  ext = 'rtf';
              }
              const blob = new Blob([data], { type: mime });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${documentTitle || 'document'}.${ext}`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              closeModal();
          }
      } catch (e) {
          console.error("Export error:", e);
      } finally {
          setIsPreparingPrint(false);
      }
  };

  // Filter pages for preview
  const getFilteredPages = () => {
      if (printRange === 'all') return previewPages;
      
      if (printRange === 'current') {
          // currentPage is 1-based
          const pageIndex = (currentPage || 1) - 1;
          return previewPages.filter((_, i) => i === pageIndex);
      }
      
      if (printRange === 'custom') {
          const pagesToShow = new Set<number>();
          const parts = customPages.split(',').map(p => p.trim());
          
          parts.forEach(part => {
              if (part.includes('-')) {
                  const [start, end] = part.split('-').map(n => parseInt(n, 10));
                  if (!isNaN(start) && !isNaN(end)) {
                      for (let i = start; i <= end; i++) pagesToShow.add(i - 1);
                  }
              } else {
                  const page = parseInt(part, 10);
                  if (!isNaN(page)) pagesToShow.add(page - 1);
              }
          });
          
          return previewPages.filter((_, i) => pagesToShow.has(i));
      }
      
      return previewPages;
  };

  const filteredPreviewPages = getFilteredPages();

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
                onPrint={handleDownloadPDF}
                isPreparing={isPreparingPrint}
                closeModal={closeModal}
                isMobile={isMobile}
                printRange={printRange}
                setPrintRange={setPrintRange}
                customPages={customPages}
                setCustomPages={setCustomPages}
                exportType={exportType}
                setExportType={setExportType}
            />
        </div>

        <div className={`
            flex-1 bg-[#525659] dark:bg-slate-950 relative overflow-hidden flex flex-col
            ${isMobile ? (mobileTab === 'preview' ? 'flex' : 'hidden') : 'flex'}
        `}>
            {isMobile ? (
                <MobilePrintPreview 
                    pages={filteredPreviewPages}
                    headerContent={headerContent}
                    footerContent={footerContent}
                    isPreparing={isPreparingPrint}
                    onPrint={handleDownloadPDF}
                    isVisible={mobileTab === 'preview'}
                />
            ) : (
                <DesktopPrintPreview 
                    pages={filteredPreviewPages}
                    headerContent={headerContent}
                    footerContent={footerContent}
                    isPreparing={isPreparingPrint}
                />
            )}
        </div>
    </div>
  );
};
