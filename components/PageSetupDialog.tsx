
import React, { useState, useEffect } from 'react';
import { X, LayoutTemplate, FileText, ChevronDown, Monitor } from 'lucide-react';
import { 
  PageConfig, PageSize, PageOrientation, VerticalAlignment,
  MultiplePagesType, ApplyToType, SheetsPerBookletType
} from '../types';
import { PAGE_SIZES } from '../constants';

interface PageSetupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  config: PageConfig;
  onSave: (config: PageConfig) => void;
}

type Tab = 'margins' | 'paper' | 'layout';

export const PageSetupDialog: React.FC<PageSetupDialogProps> = ({
  isOpen,
  onClose,
  config,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('margins');
  const [localConfig, setLocalConfig] = useState<PageConfig>(config);

  useEffect(() => {
    if (isOpen) {
      // Deep copy to ensure no direct mutation of parent config
      setLocalConfig(JSON.parse(JSON.stringify(config)));
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleMarginInputChange = (section: keyof PageConfig['margins'], value: string) => {
    let numVal = parseFloat(value);
    if (isNaN(numVal)) numVal = 0;
    if (numVal < 0) numVal = 0; // Prevent negative margins
    
    setLocalConfig(prev => ({
      ...prev,
      marginPreset: 'custom',
      margins: {
        ...prev.margins,
        [section]: numVal
      }
    }));
  };

  const handleGutterPositionChange = (position: 'left' | 'top') => {
    setLocalConfig(prev => ({
        ...prev,
        gutterPosition: position
    }));
  };

  const handleMultiplePagesChange = (type: MultiplePagesType) => {
    setLocalConfig(prev => ({
        ...prev,
        multiplePages: type,
        mirrorMargins: type === 'mirrorMargins' || type === 'bookFold'
    }));
  };

  const handleSheetsPerBookletChange = (sheets: SheetsPerBookletType) => {
      setLocalConfig(prev => ({ ...prev, sheetsPerBooklet: sheets }));
  };

  const handleApplyToChange = (applyTo: ApplyToType) => {
      setLocalConfig(prev => ({ ...prev, applyTo }));
  };

  const handleOrientationChange = (orientation: PageOrientation) => {
    if (orientation !== localConfig.orientation) {
        let currentWidth = localConfig.customWidth;
        let currentHeight = localConfig.customHeight;
        
        // If not a custom size, derive dimensions from standard PAGE_SIZES
        if (localConfig.size !== 'Custom' || !currentWidth || !currentHeight) {
             const base = PAGE_SIZES[localConfig.size as keyof typeof PAGE_SIZES] || PAGE_SIZES.Letter;
             currentWidth = base.width / 96; // Convert pixels to inches
             currentHeight = base.height / 96; // Convert pixels to inches
        }

        // Swap dimensions
        const newWidth = currentHeight;
        const newHeight = currentWidth;

        setLocalConfig(prev => ({
            ...prev,
            orientation,
            // Update custom width/height based on new orientation
            customWidth: newWidth,
            customHeight: newHeight,
            // If changing orientation, it's effectively a custom size change
            size: 'Custom' 
        }));
    }
  };

  const handlePaperSizeChange = (size: PageSize) => {
      let w = 0, h = 0;
      if (size !== 'Custom') {
          const base = PAGE_SIZES[size as keyof typeof PAGE_SIZES] || PAGE_SIZES.Letter;
          w = base.width / 96;
          h = base.height / 96;
      } else {
          // If switching to Custom, retain previous custom values or default to Letter
          w = localConfig.customWidth || PAGE_SIZES.Letter.width / 96;
          h = localConfig.customHeight || PAGE_SIZES.Letter.height / 96;
      }
      
      // Apply orientation to width/height for display
      if (localConfig.orientation === 'landscape' && size !== 'Custom') { // Don't swap if already swapped for custom
          const temp = w; w = h; h = temp;
      }

      setLocalConfig(prev => ({
          ...prev,
          size,
          customWidth: w,
          customHeight: h
      }));
  };

  // Helper Components
  const CompactInput = ({ label, value, onChange, suffix = '"' }: any) => (
    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 px-2.5 py-1.5 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-500/20 dark:focus-within:ring-blue-800/50 transition-all group">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">{label}</span>
        <div className="flex items-center gap-0.5">
            <input 
                type="number" 
                step="0.05" // Allow finer control
                className="w-12 text-right bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none p-0"
                value={value}
                onChange={onChange}
                onBlur={(e) => { 
                    const val = parseFloat(e.target.value);
                    if (isNaN(val) || val < 0) onChange({target: {value: '0'}});
                }}
            />
            <span className="text-[10px] text-slate-400 font-medium">{suffix}</span>
        </div>
    </div>
  );

  const CompactSelect = ({ label, value, onChange, options, disabled = false }: any) => (
    <div className={`space-y-1 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</span>
        <div className="relative">
            <select 
                value={value} 
                onChange={onChange}
                disabled={disabled}
                className="w-full appearance-none bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-md pl-2.5 pr-8 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-1 focus:ring-blue-500/20 dark:focus:ring-blue-800/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all cursor-pointer"
            >
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
    </div>
  );

  const renderPreview = () => {
    const { orientation, multiplePages, margins, gutterPosition } = localConfig;
    const isPortrait = orientation === 'portrait';
    const isMirroredOrBookFold = ['mirrorMargins', 'bookFold'].includes(multiplePages || '');
    // Fix: Access gutter from config.margins
    const hasGutter = (margins.gutter || 0) > 0;

    // Base page dimensions (small representation for preview)
    const baseWidth = isPortrait ? 60 : 80;
    const baseHeight = isPortrait ? 80 : 60;
    
    // Convert margins and gutter to preview scale (e.g., 1 inch = 5px)
    const marginScale = 5; 
    const previewMargins = {
      top: margins.top * marginScale,
      bottom: margins.bottom * marginScale,
      left: margins.left * marginScale,
      right: margins.right * marginScale,
      gutter: (margins.gutter || 0) * marginScale // Access from margins
    };

    // Calculate effective text area for a single page
    let effectiveLeft = previewMargins.left;
    let effectiveRight = previewMargins.right;
    let effectiveTop = previewMargins.top;

    if (!isMirroredOrBookFold && hasGutter) {
        if (gutterPosition === 'left') {
            effectiveLeft += previewMargins.gutter;
        } else { // 'top'
            effectiveTop += previewMargins.gutter;
        }
    }

    const textWidth = baseWidth - effectiveLeft - effectiveRight;
    const textHeight = baseHeight - effectiveTop - previewMargins.bottom;

    const SinglePagePreview = (
        <div 
            className="bg-white border border-slate-300 shadow-sm relative flex items-center justify-center p-0.5"
            style={{
                width: `${baseWidth}px`,
                height: `${baseHeight}px`,
                borderRadius: '3px',
                borderColor: '#94a3b8'
            }}
        >
            {/* Text Area / Margins */}
            <div 
                className="absolute border border-dashed border-slate-300 bg-slate-50/50 flex flex-col justify-evenly px-1"
                style={{
                    top: `${effectiveTop}px`,
                    bottom: `${previewMargins.bottom}px`,
                    left: `${effectiveLeft}px`,
                    right: `${effectiveRight}px`,
                    width: `${Math.max(0, textWidth)}px`,
                    height: `${Math.max(0, textHeight)}px`,
                }}
            >
                <div className="w-full h-0.5 bg-slate-200 rounded-full"></div>
                <div className="w-1/2 h-0.5 bg-slate-200 rounded-full"></div>
                <div className="w-3/4 h-0.5 bg-slate-200 rounded-full"></div>
            </div>
            {hasGutter && gutterPosition === 'left' && !isMirroredOrBookFold && (
                <div className="absolute top-0 bottom-0 left-0 bg-blue-100/50 w-[5px] border-r border-blue-200" style={{width: `${previewMargins.gutter}px`}}></div>
            )}
            {hasGutter && gutterPosition === 'top' && !isMirroredOrBookFold && (
                <div className="absolute left-0 right-0 top-0 bg-blue-100/50 h-[5px] border-b border-blue-200" style={{height: `${previewMargins.gutter}px`}}></div>
            )}
        </div>
    );

    const TwoPagePreview = (
        <div className="flex -space-x-1">
            {/* Left Page */}
            <div 
                className="bg-white border border-slate-300 shadow-sm relative flex items-center justify-center p-0.5"
                style={{
                    width: `${baseWidth}px`,
                    height: `${baseHeight}px`,
                    borderRadius: '3px',
                    borderColor: '#94a3b8'
                }}
            >
                {/* Text Area / Margins */}
                <div 
                    className="absolute border border-dashed border-slate-300 bg-slate-50/50 flex flex-col justify-evenly px-1"
                    style={{
                        top: `${previewMargins.top}px`,
                        bottom: `${previewMargins.bottom}px`,
                        left: `${previewMargins.right}px`, // Outside margin on left side of left page
                        right: `${previewMargins.left + (hasGutter && gutterPosition === 'left' ? previewMargins.gutter : 0)}px`, // Inside margin on right side of left page + gutter
                        width: `${Math.max(0, baseWidth - previewMargins.right - (previewMargins.left + (hasGutter && gutterPosition === 'left' ? previewMargins.gutter : 0)))}px`,
                        height: `${Math.max(0, baseHeight - previewMargins.top - previewMargins.bottom)}px`,
                    }}
                >
                    <div className="w-full h-0.5 bg-slate-200 rounded-full"></div>
                    <div className="w-1/2 h-0.5 bg-slate-200 rounded-full"></div>
                    <div className="w-3/4 h-0.5 bg-slate-200 rounded-full"></div>
                </div>
                 {hasGutter && gutterPosition === 'left' && (
                    <div className="absolute top-0 bottom-0 right-0 bg-blue-100/50 w-[5px] border-l border-blue-200" style={{width: `${previewMargins.gutter}px`, right: `${previewMargins.left}px`}}></div>
                )}
            </div>

            {/* Right Page */}
            <div 
                className="bg-white border border-slate-300 shadow-sm relative flex items-center justify-center p-0.5"
                style={{
                    width: `${baseWidth}px`,
                    height: `${baseHeight}px`,
                    borderRadius: '3px',
                    borderColor: '#94a3b8'
                }}
            >
                {/* Text Area / Margins */}
                <div 
                    className="absolute border border-dashed border-slate-300 bg-slate-50/50 flex flex-col justify-evenly px-1"
                    style={{
                        top: `${previewMargins.top}px`,
                        bottom: `${previewMargins.bottom}px`,
                        left: `${previewMargins.left + (hasGutter && gutterPosition === 'left' ? previewMargins.gutter : 0)}px`, // Inside margin on left side of right page + gutter
                        right: `${previewMargins.right}px`, // Outside margin on right side of right page
                        width: `${Math.max(0, baseWidth - (previewMargins.left + (hasGutter && gutterPosition === 'left' ? previewMargins.gutter : 0)) - previewMargins.right)}px`,
                        height: `${Math.max(0, baseHeight - previewMargins.top - previewMargins.bottom)}px`,
                    }}
                >
                    <div className="w-full h-0.5 bg-slate-200 rounded-full"></div>
                    <div className="w-1/2 h-0.5 bg-slate-200 rounded-full"></div>
                    <div className="w-3/4 h-0.5 bg-slate-200 rounded-full"></div>
                </div>
                 {hasGutter && gutterPosition === 'left' && (
                    <div className="absolute top-0 bottom-0 left-0 bg-blue-100/50 w-[5px] border-r border-blue-200" style={{width: `${previewMargins.gutter}px`, left: `${previewMargins.left}px`}}></div>
                )}
            </div>
        </div>
    );

    if (['mirrorMargins', 'bookFold', 'twoPagesPerSheet'].includes(multiplePages || '')) {
        return TwoPagePreview;
    }
    return SinglePagePreview;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/10 backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-[340px] rounded-xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-black/5"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h2 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide flex items-center gap-2">
                <LayoutTemplate size={14} className="text-blue-600 dark:text-blue-400"/> Page Setup
            </h2>
            <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
            >
                <X size={16} />
            </button>
        </div>

        {/* Tabs */}
        <div className="px-4 pt-4 pb-1 bg-white dark:bg-slate-900">
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {['margins', 'paper', 'layout'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as Tab)}
                        className={`flex-1 py-1 text-[10px] font-bold uppercase tracking-wide rounded-md transition-all duration-200 ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-sm scale-100' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 scale-95'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Content */}
        <div className="p-4 min-h-[300px] bg-white dark:bg-slate-900 flex-1 flex flex-col">
            {activeTab === 'margins' && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Margins</div>
                    <div className="grid grid-cols-2 gap-2">
                        <CompactInput label="Top" value={localConfig.margins.top} onChange={(e: any) => handleMarginInputChange('top', e.target.value)} />
                        <CompactInput label="Bottom" value={localConfig.margins.bottom} onChange={(e: any) => handleMarginInputChange('bottom', e.target.value)} />
                        <CompactInput label={localConfig.multiplePages === 'mirrorMargins' || localConfig.multiplePages === 'bookFold' ? 'Inside' : 'Left'} value={localConfig.margins.left} onChange={(e: any) => handleMarginInputChange('left', e.target.value)} />
                        <CompactInput label={localConfig.multiplePages === 'mirrorMargins' || localConfig.multiplePages === 'bookFold' ? 'Outside' : 'Right'} value={localConfig.margins.right} onChange={(e: any) => handleMarginInputChange('right', e.target.value)} />
                        <CompactInput label="Gutter" value={localConfig.margins.gutter} onChange={(e: any) => handleMarginInputChange('gutter', e.target.value)} />
                        <CompactSelect
                            label="Gutter position"
                            value={localConfig.gutterPosition}
                            onChange={(e: any) => handleGutterPositionChange(e.target.value)}
                            options={[
                                { value: 'left', label: 'Left' },
                                { value: 'top', label: 'Top' },
                            ]}
                        />
                    </div>
                    
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mt-4">Orientation</div>
                    <div className="flex gap-2">
                         <button 
                            onClick={() => handleOrientationChange('portrait')}
                            className={`flex-1 flex flex-col items-center justify-center py-2 rounded-lg border transition-all ${localConfig.orientation === 'portrait' ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-600 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-600'}`}
                         >
                            <FileText size={16} />
                            <span className="text-[10px] font-bold mt-1 uppercase tracking-wide">Portrait</span>
                         </button>
                         <button 
                            onClick={() => handleOrientationChange('landscape')}
                            className={`flex-1 flex flex-col items-center justify-center py-2 rounded-lg border transition-all ${localConfig.orientation === 'landscape' ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-600 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-600'}`}
                         >
                            <FileText size={16} className="rotate-90"/>
                            <span className="text-[10px] font-bold mt-1 uppercase tracking-wide">Landscape</span>
                         </button>
                    </div>

                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mt-4">Pages</div>
                    <div className="grid grid-cols-2 gap-2">
                        <CompactSelect
                            label="Multiple pages"
                            value={localConfig.multiplePages}
                            onChange={(e: any) => handleMultiplePagesChange(e.target.value)}
                            options={[
                                { value: 'normal', label: 'Normal' },
                                { value: 'mirrorMargins', label: 'Mirror margins' },
                                { value: 'bookFold', label: 'Book fold' },
                                { value: 'twoPagesPerSheet', label: '2 pages per sheet' },
                            ]}
                        />
                        <CompactSelect
                            label="Sheets per booklet"
                            value={localConfig.sheetsPerBooklet}
                            onChange={(e: any) => handleSheetsPerBookletChange(e.target.value)}
                            options={[
                                { value: 'all', label: 'All' },
                                { value: '16', label: '16' },
                                { value: '8', label: '8' },
                                { value: '4', label: '4' },
                                { value: '2', label: '2' },
                            ]}
                            disabled={localConfig.multiplePages !== 'bookFold'}
                        />
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center pt-4 justify-between">
                         <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2 self-start">Preview</div>
                         <div className="flex-1 flex items-center justify-center min-h-[100px] w-full bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                             {renderPreview()}
                         </div>
                    </div>
                </div>
            )}

            {activeTab === 'paper' && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
                    <CompactSelect 
                        label="Paper size" 
                        value={localConfig.size} 
                        onChange={(e: any) => handlePaperSizeChange(e.target.value as PageSize)}
                        options={[
                            { value: 'Letter', label: 'Letter (8.5" x 11")' },
                            { value: 'Legal', label: 'Legal (8.5" x 14")' },
                            { value: 'Executive', label: 'Executive (7.25" x 10.5")' },
                            { value: 'A3', label: 'A3 (11.69" x 16.54")' },
                            { value: 'A4', label: 'A4 (8.27" x 11.69")' },
                            { value: 'A5', label: 'A5 (5.83" x 8.27")' },
                            { value: 'B4 (JIS)', label: 'B4 JIS (9.84" x 13.90")' },
                            { value: 'B5 (JIS)', label: 'B5 JIS (6.93" x 9.84")' },
                            { value: 'Statement', label: 'Statement (5.5" x 8.5")' },
                            { value: 'Tabloid', label: 'Tabloid (11" x 17")' },
                            { value: 'Note', label: 'Note (8.5" x 11")' },
                            { value: 'Envelope #10', label: 'Envelope #10 (4.125" x 9.5")' },
                            { value: 'Envelope DL', label: 'Envelope DL (4.33" x 8.66")' },
                            { value: 'Custom', label: 'Custom Size' },
                        ]}
                    />

                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 space-y-2">
                        <CompactInput 
                            label="Width" 
                            value={localConfig.customWidth || (PAGE_SIZES.Letter.width / 96)} 
                            onChange={(e: any) => setLocalConfig(prev => ({...prev, size: 'Custom', customWidth: parseFloat(e.target.value)}))} 
                        />
                        <CompactInput 
                            label="Height" 
                            value={localConfig.customHeight || (PAGE_SIZES.Letter.height / 96)} 
                            onChange={(e: any) => setLocalConfig(prev => ({...prev, size: 'Custom', customHeight: parseFloat(e.target.value)}))} 
                        />
                    </div>

                    <div className="flex-1 flex flex-col justify-between pt-2">
                        <CompactSelect 
                            label="Paper source: First page" 
                            value={localConfig.paperSourceFirstPage || 'Default tray'} 
                            onChange={(e: any) => setLocalConfig({...localConfig, paperSourceFirstPage: e.target.value})}
                            options={[
                                { value: 'Default tray', label: 'Default tray (Auto Select)' },
                                { value: 'Manual Feed', label: 'Manual Feed' },
                            ]}
                        />
                        <CompactSelect 
                            label="Paper source: Other pages" 
                            value={localConfig.paperSourceOtherPages || 'Default tray'} 
                            onChange={(e: any) => setLocalConfig({...localConfig, paperSourceOtherPages: e.target.value})}
                            options={[
                                { value: 'Default tray', label: 'Default tray (Auto Select)' },
                                { value: 'Manual Feed', label: 'Manual Feed' },
                            ]}
                        />
                         <div className="flex-1 flex items-center justify-center min-h-[80px] w-full bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 mt-4">
                             {renderPreview()}
                         </div>
                    </div>
                </div>
            )}

            {activeTab === 'layout' && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
                    <CompactSelect 
                        label="Section Start" 
                        value={localConfig.sectionStart} 
                        onChange={(e: any) => setLocalConfig({...localConfig, sectionStart: e.target.value})}
                        options={[
                            { value: 'newpage', label: 'New Page' },
                            { value: 'continuous', label: 'Continuous' },
                            { value: 'even', label: 'Even Page' },
                            { value: 'odd', label: 'Odd Page' },
                        ]}
                    />

                    <div className="grid grid-cols-2 gap-2 pt-1">
                        <CompactInput label="Header" value={localConfig.headerDistance} onChange={(e: any) => setLocalConfig({...localConfig, headerDistance: parseFloat(e.target.value)})} />
                        <CompactInput label="Footer" value={localConfig.footerDistance} onChange={(e: any) => setLocalConfig({...localConfig, footerDistance: parseFloat(e.target.value)})} />
                    </div>

                    <CompactSelect 
                        label="Vertical Alignment" 
                        value={localConfig.verticalAlign} 
                        onChange={(e: any) => setLocalConfig({...localConfig, verticalAlign: e.target.value})}
                        options={[
                            { value: 'top', label: 'Top' },
                            { value: 'center', label: 'Center' },
                            { value: 'justify', label: 'Justified' },
                            { value: 'bottom', label: 'Bottom' },
                        ]}
                    />
                    
                    <div className="pt-1 space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" checked={localConfig.differentFirstPage} onChange={(e) => setLocalConfig({...localConfig, differentFirstPage: e.target.checked})} className="rounded border-slate-300 dark:border-slate-600 text-blue-600 dark:text-blue-400 focus:ring-blue-500 w-3.5 h-3.5" />
                            <span className="text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 select-none">Different first page</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" checked={localConfig.differentOddEven} onChange={(e) => setLocalConfig({...localConfig, differentOddEven: e.target.checked})} className="rounded border-slate-300 dark:border-slate-600 text-blue-600 dark:text-blue-400 focus:ring-blue-500 w-3.5 h-3.5" />
                            <span className="text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 select-none">Different odd & even pages</span>
                        </label>
                    </div>

                    <div className="flex-1 flex flex-col items-center pt-4 justify-between">
                         <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2 self-start">Preview</div>
                         <div className="flex-1 flex items-center justify-center min-h-[100px] w-full bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                             {renderPreview()}
                         </div>
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 backdrop-blur-sm">
            <button 
                onClick={() => alert("Defaults not yet implemented.")}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors flex items-center gap-1.5"
            >
                <Monitor size={12} /> Set As Default
            </button>
            <button 
                onClick={onClose} 
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={() => { onSave(localConfig); onClose(); }} 
                className="px-4 py-1.5 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs font-bold rounded shadow-sm hover:shadow transition-all active:scale-95"
            >
                OK
            </button>
        </div>
      </div>
    </div>
  );
};
