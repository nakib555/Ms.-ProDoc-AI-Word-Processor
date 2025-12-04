
import React, { useState } from 'react';
import { FileText, FileType, Printer, Settings2, ChevronDown, Loader2 } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useFileTab } from '../FileTabContext';
import { paginateContent } from '../../../../../utils/layoutEngine';
import { PAGE_SIZES } from '../../../../../constants';

export const PrintModal: React.FC = () => {
  const { content, pageConfig, headerContent, footerContent, documentTitle } = useEditor();
  const { closeModal } = useFileTab();
  const [isPreparing, setIsPreparing] = useState(false);

  const handlePrint = () => {
    setIsPreparing(true);

    // 1. Generate Pages based on layout engine
    // Using a small timeout to allow UI to show "Preparing..." state
    setTimeout(() => {
        const { pages } = paginateContent(content, pageConfig);

        // 2. Open Print Window
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert("Please allow popups to print");
            setIsPreparing(false);
            return;
        }

        // 3. Construct HTML
        const htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>${documentTitle || 'Document'} - Print</title>
            <style>
                /* Reset & Base */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap');
                
                body { 
                    margin: 0; 
                    padding: 0; 
                    background: #eee; 
                    font-family: 'Inter', sans-serif; 
                }
                
                /* Page Wrapper */
                .print-page {
                    position: relative;
                    overflow: hidden;
                    page-break-after: always;
                    margin: 0 auto;
                    background: white;
                    box-sizing: border-box;
                    box-shadow: none;
                }

                /* Header/Footer */
                .print-header { position: absolute; top: 0; left: 0; right: 0; overflow: hidden; }
                .print-footer { position: absolute; bottom: 0; left: 0; right: 0; overflow: hidden; }
                .print-content { position: absolute; overflow: hidden; }

                /* Editor Content Styles - Mirroring App.css/Index.css */
                .prodoc-editor { 
                    font-size: 11pt; 
                    line-height: 1.5;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    color: #000;
                }
                .prodoc-editor p { margin-bottom: 0.5em; }
                .prodoc-editor h1 { font-size: 2em; font-weight: bold; margin-top: 0.67em; margin-bottom: 0.67em; }
                .prodoc-editor h2 { font-size: 1.5em; font-weight: bold; margin-top: 0.83em; margin-bottom: 0.83em; }
                .prodoc-editor ul, .prodoc-editor ol { padding-left: 2em; }
                
                /* Tables */
                table { border-collapse: collapse; width: 100%; }
                td, th { border: 1px solid #000; padding: 4px; }
                
                /* Math & Images */
                img { max-width: 100%; }
                math-field { display: inline-block; border: none; background: transparent; }
                .equation-wrapper { display: inline-flex; border: none; }
                .equation-handle, .equation-dropdown { display: none; }
                
                /* Print Media Query */
                @media print {
                    body { background: none; }
                    .print-page { box-shadow: none; margin: 0; }
                    @page { margin: 0; } /* Use zero margins and control via CSS dimensions */
                }
            </style>
            <script defer src="//unpkg.com/mathlive"></script>
          </head>
          <body>
            ${pages.map((page, index) => {
                const cfg = page.config;
                const baseSize = PAGE_SIZES[cfg.size as string] || PAGE_SIZES['Letter'];
                
                let widthPt = baseSize.width; 
                let heightPt = baseSize.height;

                if (cfg.size === 'Custom' && cfg.customWidth && cfg.customHeight) {
                    widthPt = cfg.customWidth * 96;
                    heightPt = cfg.customHeight * 96;
                }

                if (cfg.orientation === 'landscape' && cfg.size !== 'Custom') {
                     const temp = widthPt; widthPt = heightPt; heightPt = temp;
                }

                // Margins (convert inches to px)
                const mt = (cfg.margins.top || 1) * 96;
                const mb = (cfg.margins.bottom || 1) * 96;
                const ml = (cfg.margins.left || 1) * 96;
                const mr = (cfg.margins.right || 1) * 96;
                
                const gutter = (cfg.margins.gutter || 0) * 96;
                const gutterLeft = cfg.gutterPosition === 'left' ? gutter : 0;
                const gutterTop = cfg.gutterPosition === 'top' ? gutter : 0;

                const hd = (cfg.headerDistance || 0.5) * 96;
                const fd = (cfg.footerDistance || 0.5) * 96;

                // Process placeholders
                const currentHeader = (headerContent || '').replace(/<div/g, '<div style="height:100%; display:flex; align-items:flex-end;"');
                const currentFooter = (footerContent || '').replace(/\[Page \d+\]/g, `[Page ${index + 1}]`)
                                                          .replace(/<span class="page-number-placeholder">.*?<\/span>/g, `${index + 1}`);

                return `
                    <div class="print-page" style="width: ${widthPt}px; height: ${heightPt}px;">
                        <!-- Header -->
                        <div class="print-header" style="height: ${mt}px; padding-top: ${hd}px; padding-left: ${ml + gutterLeft}px; padding-right: ${mr}px;">
                            <div style="width: 100%; height: 100%; position: relative;">${headerContent || ''}</div>
                        </div>
                        
                        <!-- Body Content -->
                        <div class="print-content" style="top: ${mt + gutterTop}px; bottom: ${mb}px; left: ${ml + gutterLeft}px; right: ${mr}px;">
                            <div class="prodoc-editor">${page.html}</div>
                        </div>
                        
                        <!-- Footer -->
                        <div class="print-footer" style="height: ${mb}px; padding-bottom: ${fd}px; padding-left: ${ml + gutterLeft}px; padding-right: ${mr}px; display: flex; flex-direction: column; justify-content: flex-end;">
                            <div style="width: 100%;">${currentFooter}</div>
                        </div>
                    </div>
                `;
            }).join('')}
            <script>
                window.onload = function() {
                    // Allow images/fonts to load
                    setTimeout(function() {
                        window.print();
                        // Auto-close behavior optional, usually better to leave open for user to verify
                    }, 800);
                };
            </script>
          </body>
          </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();
        setIsPreparing(false);
        closeModal();
    }, 100);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full lg:h-[70vh]">
      {/* Controls Column */}
      <div className="w-full lg:w-[320px] space-y-6 flex flex-col order-2 lg:order-1">
        
        {/* Print Button */}
        <button 
          onClick={handlePrint}
          disabled={isPreparing}
          className="w-full py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-200 hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPreparing ? (
             <Loader2 size={20} className="text-white animate-spin" />
          ) : (
              <div className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                 <Printer size={20} className="text-white" />
              </div>
          )}
          <div className="flex flex-col items-start leading-tight">
             <span>{isPreparing ? 'Preparing...' : 'Print'}</span>
             <span className="text-[10px] font-normal opacity-80">Default Printer</span>
          </div>
        </button>

        {/* Settings Panel */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
             <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Settings</span>
             <Settings2 size={14} className="text-slate-400"/>
          </div>
          
          <div className="p-4 space-y-4">
             <div className="space-y-1">
                 <label className="text-[11px] font-semibold text-slate-500">Printer</label>
                 <button className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-lg hover:border-blue-400 transition-colors text-sm font-medium text-slate-700 shadow-sm">
                     <div className="flex items-center gap-2">
                         <Printer size={16} className="text-slate-400"/>
                         <span>System Default</span>
                     </div>
                     <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Ready</span>
                 </button>
             </div>

             <div className="space-y-1">
                 <label className="text-[11px] font-semibold text-slate-500">Pages</label>
                 <button className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-lg hover:border-blue-400 transition-colors text-sm font-medium text-slate-700 shadow-sm group">
                     <div className="flex items-center gap-2">
                         <FileText size={16} className="text-slate-400"/>
                         <span>Print All Pages</span>
                     </div>
                     <ChevronDown size={14} className="text-slate-300 group-hover:text-slate-500"/>
                 </button>
             </div>

             <div className="grid grid-cols-2 gap-3">
                 <button className="flex flex-col items-start gap-1.5 px-3 py-2.5 bg-white border border-slate-200 rounded-lg hover:border-blue-400 transition-colors text-sm font-medium text-slate-700 shadow-sm">
                     <FileType size={16} className="text-slate-400"/>
                     <span className="text-xs capitalize">{pageConfig.orientation}</span>
                 </button>
                 <button className="flex flex-col items-start gap-1.5 px-3 py-2.5 bg-white border border-slate-200 rounded-lg hover:border-blue-400 transition-colors text-sm font-medium text-slate-700 shadow-sm">
                     <FileText size={16} className="text-slate-400"/>
                     <span className="text-xs capitalize">{pageConfig.size}</span>
                 </button>
             </div>
             
             <div className="space-y-1 pt-2 border-t border-slate-100">
                 <label className="text-[11px] font-semibold text-slate-500">Copies</label>
                 <div className="flex items-center gap-2">
                     <input type="number" defaultValue="1" min="1" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"/>
                     <span className="text-xs text-slate-400">copy</span>
                 </div>
             </div>
          </div>
        </div>
      </div>

      {/* Preview Area - Premium Skeumorphic Look */}
      <div className="flex-1 bg-[#525659] rounded-xl p-6 lg:p-10 flex items-center justify-center overflow-hidden relative shadow-inner order-1 lg:order-2 min-h-[400px] group perspective-1000 border border-[#404446]">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
        
        {/* Paper Preview */}
        <div 
            className="bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden select-none pointer-events-none transition-all duration-500 origin-center group-hover:scale-[1.02] group-hover:-translate-y-2 relative"
            style={{
                aspectRatio: pageConfig.orientation === 'portrait' ? '8.5/11' : '11/8.5',
                width: pageConfig.orientation === 'portrait' ? '65%' : '85%',
                maxWidth: '400px'
            }}
        >
          <div className="absolute inset-0 p-8 md:p-12 opacity-90 transform scale-[0.3] origin-top-left w-[333%] h-[333%]">
             <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          {/* Lighting Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
        </div>

        {/* Page Indicator */}
        <div className="absolute bottom-6 flex items-center gap-4 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 text-white text-xs font-medium shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Preview Mode</span>
        </div>
      </div>
    </div>
  );
};
