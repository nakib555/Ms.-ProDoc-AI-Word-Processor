
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FileText, FileType, Printer, Settings2, ChevronDown, Loader2, ChevronLeft, ChevronRight, LayoutTemplate, Check } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useFileTab } from '../FileTabContext';
import { paginateContent } from '../../../../../utils/layoutEngine';
import { PAGE_SIZES, MARGIN_PRESETS } from '../../../../../constants';
import { PageConfig, PageSize, PageOrientation, MarginPreset } from '../../../../../types';

export const PrintModal: React.FC = () => {
  const { content, pageConfig: globalConfig, headerContent, footerContent, documentTitle } = useEditor();
  const { closeModal } = useFileTab();
  
  // Local state for print settings (isolated from editor until printed/applied)
  const [localConfig, setLocalConfig] = useState<PageConfig>({ ...globalConfig });
  
  // Pagination State
  const [paginatedPages, setPaginatedPages] = useState<{ html: string, config: PageConfig }[]>([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [isPaginationReady, setIsPaginationReady] = useState(false);
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);

  // UI State for Dropdowns
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Pagination Effect: Re-run whenever config changes
  useEffect(() => {
    setIsPaginationReady(false);
    const timer = setTimeout(() => {
        const result = paginateContent(content, localConfig);
        setPaginatedPages(result.pages);
        setIsPaginationReady(true);
        // Reset to page 1 if out of bounds (e.g. content flow changed)
        if (currentPreviewIndex >= result.pages.length) {
            setCurrentPreviewIndex(0);
        }
    }, 100); // Debounce layout calculation
    return () => clearTimeout(timer);
  }, [content, localConfig]); // Removed currentPreviewIndex from dependency to avoid loop

  const handlePrint = () => {
    setIsPreparingPrint(true);

    // Wait slightly to ensure UI updates before blocking thread
    setTimeout(() => {
        // Re-calculate one last time to be sure (or use existing state)
        const pagesToPrint = paginatedPages.length > 0 ? paginatedPages : paginateContent(content, localConfig).pages;

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert("Please allow popups to print");
            setIsPreparingPrint(false);
            return;
        }

        const htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>${documentTitle || 'Document'}</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap');
                
                @page { margin: 0; size: auto; }
                
                body { 
                    margin: 0; 
                    padding: 0; 
                    background: #eee; 
                    font-family: 'Calibri', 'Inter', sans-serif;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                .print-page {
                    position: relative;
                    overflow: hidden;
                    margin: 0 auto;
                    background: white;
                    page-break-after: always;
                    break-after: page;
                }

                .print-header, .print-footer { 
                    position: absolute; left: 0; right: 0; overflow: hidden; z-index: 10;
                }
                .print-header { top: 0; }
                .print-footer { bottom: 0; }
                
                .print-content { 
                    position: absolute; overflow: hidden; z-index: 5;
                }

                /* Editor Styles Replication */
                .prodoc-editor { 
                    font-size: 11pt; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; color: #000;
                }
                .prodoc-editor p { margin-bottom: 0.5em; margin-top: 0; }
                .prodoc-editor h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
                .prodoc-editor h2 { font-size: 1.5em; font-weight: bold; margin: 0.83em 0; }
                .prodoc-editor ul, .prodoc-editor ol { padding-left: 2em; margin: 1em 0; }
                
                table { border-collapse: collapse; width: 100%; margin-bottom: 1em; }
                td, th { border: 1px solid #000; padding: 4px 8px; vertical-align: top; }
                img { max-width: 100%; display: block; }
                
                /* MathLive Static */
                math-field { display: inline-block; border: none; background: transparent; font-size: 1.1em; color: black; }
                math-field::part(menu-toggle), math-field::part(virtual-keyboard-toggle) { display: none; }
                .equation-wrapper { display: inline-flex; vertical-align: middle; }
                .equation-handle, .equation-dropdown { display: none !important; }
                
                @media print {
                    body { background: none; }
                }
            </style>
            <script defer src="//unpkg.com/mathlive"></script>
          </head>
          <body>
            ${pagesToPrint.map((page, index) => {
                const cfg = page.config;
                const baseSize = PAGE_SIZES[cfg.size as string] || PAGE_SIZES['Letter'];
                
                let widthPt = baseSize.width; 
                let heightPt = baseSize.height;

                if (cfg.orientation === 'landscape') {
                     const temp = widthPt; widthPt = heightPt; heightPt = temp;
                }

                const mt = cfg.margins.top * 96;
                const mb = cfg.margins.bottom * 96;
                const ml = cfg.margins.left * 96;
                const mr = cfg.margins.right * 96;
                const hd = (cfg.headerDistance || 0.5) * 96;
                const fd = (cfg.footerDistance || 0.5) * 96;

                const safeHtml = page.html.replace(/<math-field/g, '<math-field read-only');
                const currentHeader = (headerContent || '').replace(/<div/g, '<div style="height:100%; display:flex; align-items:flex-end;"');
                const currentFooter = (footerContent || '').replace(/\[Page \d+\]/g, `[Page ${index + 1}]`)
                                                          .replace(/<span class="page-number-placeholder">.*?<\/span>/g, `${index + 1}`);

                return `
                    <div class="print-page" style="width: ${widthPt}px; height: ${heightPt}px;">
                        <div class="print-header" style="height: ${mt}px; padding-top: ${hd}px; padding-left: ${ml}px; padding-right: ${mr}px;">
                            <div style="width: 100%; height: 100%;">${headerContent ? currentHeader : ''}</div>
                        </div>
                        <div class="print-content" style="top: ${mt}px; bottom: ${mb}px; left: ${ml}px; right: ${mr}px;">
                            <div class="prodoc-editor">${safeHtml}</div>
                        </div>
                        <div class="print-footer" style="height: ${mb}px; padding-bottom: ${fd}px; padding-left: ${ml}px; padding-right: ${mr}px; display: flex; flex-direction: column; justify-content: flex-end;">
                            <div style="width: 100%;">${currentFooter}</div>
                        </div>
                    </div>
                `;
            }).join('')}
            <script>
                window.onload = function() { setTimeout(() => { window.print(); }, 1000); };
            </script>
          </body>
          </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();
        setIsPreparingPrint(false);
        // Optional: closeModal() if you want to close after printing, 
        // but usually print dialogs stay open in case user cancels and wants to adjust
    }, 100);
  };

  // Setting Handlers
  const setOrientation = (o: PageOrientation) => {
      setLocalConfig(prev => ({ ...prev, orientation: o }));
      setActiveDropdown(null);
  };

  const setSize = (s: PageSize) => {
      setLocalConfig(prev => ({ ...prev, size: s }));
      setActiveDropdown(null);
  };

  const setMargins = (preset: MarginPreset) => {
      if (preset !== 'custom') {
          setLocalConfig(prev => ({ 
              ...prev, 
              marginPreset: preset, 
              margins: MARGIN_PRESETS[preset as string] 
          }));
      }
      setActiveDropdown(null);
  };

  // Helpers for visual scaling in preview
  const getPageDimensions = () => {
      const base = PAGE_SIZES[localConfig.size as string] || PAGE_SIZES['Letter'];
      return localConfig.orientation === 'portrait' 
        ? { w: base.width, h: base.height } 
        : { w: base.height, h: base.width };
  };

  const { w, h } = getPageDimensions();
  const aspectRatio = w / h;

  return (
    <div className="flex flex-col lg:flex-row gap-0 lg:gap-0 h-full lg:h-[80vh] -m-4 md:-m-6 lg:-m-8">
      {/* Controls Column */}
      <div className="w-full lg:w-[300px] bg-[#f8f9fa] border-r border-slate-200 p-6 flex flex-col gap-6 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] order-2 lg:order-1 overflow-y-auto">
        
        <div className="flex items-center gap-3 mb-2">
            <button 
                onClick={closeModal}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
            >
                <ChevronLeft size={20} className="text-slate-500"/>
            </button>
            <h2 className="text-xl font-semibold text-slate-800">Print</h2>
        </div>

        {/* Print Button Block */}
        <div className="space-y-4">
            <button 
            onClick={handlePrint}
            disabled={!isPaginationReady || isPreparingPrint}
            className="w-full py-3 bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md text-slate-800 rounded-lg font-semibold text-base transition-all flex items-center justify-start px-4 gap-4 group relative overflow-hidden"
            >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>
            {isPreparingPrint ? (
                <Loader2 size={24} className="text-blue-600 animate-spin" />
            ) : (
                <Printer size={24} className="text-blue-600" />
            )}
            <div className="flex flex-col items-start">
                <span>{isPreparingPrint ? 'Generating...' : 'Print'}</span>
                <span className="text-xs text-slate-400 font-normal">Default Printer</span>
            </div>
            </button>

            <div className="flex items-center gap-3 px-1">
                <span className="text-sm font-medium text-slate-600">Copies:</span>
                <input 
                    type="number" 
                    min="1" 
                    defaultValue="1" 
                    className="w-20 px-3 py-1.5 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500"
                />
            </div>
        </div>

        {/* Settings List */}
        <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Settings</div>
            
            {/* Pages Range (Mock) */}
            <button className="w-full text-left px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex flex-col gap-0.5">
                 <span className="text-sm font-medium text-slate-700">Print All Pages</span>
                 <span className="text-xs text-slate-400">The whole document</span>
            </button>

            {/* Orientation Dropdown */}
            <div className="relative">
                <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'orientation' ? null : 'orientation')}
                    className="w-full text-left px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <FileType size={18} className="text-slate-500"/>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-700 capitalize">{localConfig.orientation} Orientation</span>
                        </div>
                    </div>
                    <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600"/>
                </button>
                
                {activeDropdown === 'orientation' && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 animate-in fade-in zoom-in-95 duration-100">
                        <button onClick={() => setOrientation('portrait')} className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-slate-700 flex items-center gap-2">
                            {localConfig.orientation === 'portrait' && <Check size={14} className="text-blue-600"/>} <span className={localConfig.orientation === 'portrait' ? 'ml-0 font-medium text-blue-700' : 'ml-6'}>Portrait</span>
                        </button>
                        <button onClick={() => setOrientation('landscape')} className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-slate-700 flex items-center gap-2">
                            {localConfig.orientation === 'landscape' && <Check size={14} className="text-blue-600"/>} <span className={localConfig.orientation === 'landscape' ? 'ml-0 font-medium text-blue-700' : 'ml-6'}>Landscape</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Size Dropdown */}
            <div className="relative">
                <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'size' ? null : 'size')}
                    className="w-full text-left px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <FileText size={18} className="text-slate-500"/>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-700 capitalize">{localConfig.size}</span>
                            <span className="text-xs text-slate-400">{PAGE_SIZES[localConfig.size as string] ? `${PAGE_SIZES[localConfig.size as string].width / 96}" x ${PAGE_SIZES[localConfig.size as string].height / 96}"` : 'Custom'}</span>
                        </div>
                    </div>
                    <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600"/>
                </button>

                {activeDropdown === 'size' && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 animate-in fade-in zoom-in-95 duration-100">
                        {Object.keys(PAGE_SIZES).map(size => (
                             <button key={size} onClick={() => setSize(size as PageSize)} className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-slate-700 flex items-center gap-2">
                                {localConfig.size === size && <Check size={14} className="text-blue-600"/>} 
                                <span className={localConfig.size === size ? 'ml-0 font-medium text-blue-700' : 'ml-6'}>{size}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Margins Dropdown */}
            <div className="relative">
                <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'margins' ? null : 'margins')}
                    className="w-full text-left px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <LayoutTemplate size={18} className="text-slate-500"/>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-700 capitalize">{localConfig.marginPreset === 'custom' ? 'Custom Margins' : `${localConfig.marginPreset} Margins`}</span>
                        </div>
                    </div>
                    <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600"/>
                </button>
                
                {activeDropdown === 'margins' && (
                    <div className="absolute top-full bottom-0 left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                         {Object.keys(MARGIN_PRESETS).map(preset => (
                             <button key={preset} onClick={() => setMargins(preset as MarginPreset)} className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-slate-700 flex items-center gap-2 capitalize">
                                {localConfig.marginPreset === preset && <Check size={14} className="text-blue-600"/>} 
                                <span className={localConfig.marginPreset === preset ? 'ml-0 font-medium text-blue-700' : 'ml-6'}>{preset}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button className="w-full text-left px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-3 text-sm font-medium text-slate-700">
                 <Settings2 size={18} className="text-slate-500"/>
                 Page Setup
            </button>
        </div>
      </div>

      {/* Preview Area - Interactive */}
      <div className="flex-1 bg-[#525659] flex flex-col items-center justify-center relative shadow-inner order-1 lg:order-2 min-h-[500px] overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Loading State */}
        {!isPaginationReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20 backdrop-blur-sm">
                <div className="bg-white px-4 py-2 rounded-full flex items-center gap-3 shadow-lg">
                    <Loader2 size={18} className="animate-spin text-blue-600"/>
                    <span className="text-sm font-medium">Updating Preview...</span>
                </div>
            </div>
        )}

        {/* Paper Preview */}
        <div 
            className="relative bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out origin-center"
            style={{
                // Scale logic: fit within available space
                height: '85%',
                aspectRatio: `${aspectRatio}`,
            }}
        >
            {paginatedPages.length > 0 ? (
                <div className="w-full h-full relative overflow-hidden">
                    {/* Mini Header */}
                    <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: `${(localConfig.margins.top) * 100 / (h/96)}%`, padding: '4%' }}>
                         <div className="opacity-50 scale-50 origin-top-left w-[200%] h-[200%]" dangerouslySetInnerHTML={{ __html: headerContent || '' }} />
                    </div>

                    {/* Mini Content - Scaled Down Body */}
                    <div className="absolute inset-0 flex flex-col" style={{ padding: `${(localConfig.margins.top) * 100 / (h/96)}% ${(localConfig.margins.right) * 100 / (w/96)}% ${(localConfig.margins.bottom) * 100 / (h/96)}% ${(localConfig.margins.left) * 100 / (w/96)}%` }}>
                         <div className="w-full h-full overflow-hidden relative">
                             {/* We scale the HTML content to fit the preview box perfectly */}
                             <div 
                                className="origin-top-left transform"
                                style={{ 
                                    transform: 'scale(0.4)', // Fixed visual scale for preview to look like "print view"
                                    width: '250%', // Compensate for scale
                                    height: '250%'
                                }}
                                dangerouslySetInnerHTML={{ __html: paginatedPages[currentPreviewIndex]?.html || '' }}
                             />
                         </div>
                    </div>

                    {/* Mini Footer */}
                    <div className="absolute bottom-0 left-0 right-0 pointer-events-none flex flex-col justify-end" style={{ height: `${(localConfig.margins.bottom) * 100 / (h/96)}%`, padding: '4%' }}>
                         <div className="opacity-50 scale-50 origin-bottom-left w-[200%] h-[200%]" dangerouslySetInnerHTML={{ 
                             __html: (footerContent || '').replace(/\[Page \d+\]/g, `[Page ${currentPreviewIndex + 1}]`) 
                         }} />
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                    Generating Preview...
                </div>
            )}
        </div>

        {/* Page Navigation Controls */}
        <div className="absolute bottom-6 flex items-center gap-4 bg-[#3a3d3f] rounded-lg px-2 py-1.5 shadow-lg border border-white/10 text-slate-200">
            <button 
                onClick={() => setCurrentPreviewIndex(Math.max(0, currentPreviewIndex - 1))}
                disabled={currentPreviewIndex === 0}
                className="p-1 hover:bg-white/10 rounded disabled:opacity-30 transition-colors"
            >
                <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-medium min-w-[60px] text-center select-none">
                {paginatedPages.length > 0 ? `${currentPreviewIndex + 1} of ${paginatedPages.length}` : '1 of 1'}
            </span>
            <button 
                onClick={() => setCurrentPreviewIndex(Math.min(paginatedPages.length - 1, currentPreviewIndex + 1))}
                disabled={currentPreviewIndex >= paginatedPages.length - 1}
                className="p-1 hover:bg-white/10 rounded disabled:opacity-30 transition-colors"
            >
                <ChevronRight size={16} />
            </button>
        </div>
      </div>
    </div>
  );
};
