import React, { useState } from 'react';
import { CompactInput, CompactSelect, ApplyToSection, RenderSubTabs } from '../../../common/DialogHelpers';
import { PageConfig, PageSize } from '../../../../../../../../types';
import { PAGE_SIZES, PAPER_FORMATS } from '../../../../../../../../constants';
import { PAPER_DIMENSIONS_MM, mmToIn, inToMm, getPhysicalDimensions } from '../../../../../../../../utils/unitConversion';

interface PaperTabProps {
    localConfig: PageConfig;
    setLocalConfig: React.Dispatch<React.SetStateAction<PageConfig>>;
}

type PaperSubTab = 'size' | 'source' | 'apply';

export const PaperTab: React.FC<PaperTabProps> = ({ localConfig, setLocalConfig }) => {
    const [paperSubTab, setPaperSubTab] = useState<PaperSubTab>('size');
    const [unit, setUnit] = useState<'mm' | 'in'>('mm');

    const handlePaperSizeChange = (size: PageSize) => {
        let wIn = 8.5;
        let hIn = 11;

        if (size !== 'Custom') {
            if (PAPER_DIMENSIONS_MM[size as string]) {
                const mm = PAPER_DIMENSIONS_MM[size as string];
                wIn = mmToIn(mm.width);
                hIn = mmToIn(mm.height);
            } else {
                const base = PAGE_SIZES[size as string] || PAGE_SIZES.Letter;
                wIn = base.width / 96;
                hIn = base.height / 96;
            }
        } else {
            wIn = localConfig.customWidth || 8.27;
            hIn = localConfig.customHeight || 11.69;
        }
        
        if (localConfig.orientation === 'landscape' && size !== 'Custom') {
            const temp = wIn; wIn = hIn; hIn = temp;
        }
  
        setLocalConfig(prev => ({
            ...prev,
            size,
            customWidth: Number(wIn.toFixed(3)),
            customHeight: Number(hIn.toFixed(3))
        }));
    };

    const handleDimensionChange = (dimension: 'width' | 'height', valStr: string) => {
        const numVal = parseFloat(valStr);
        if (isNaN(numVal) || numVal <= 0) return;

        const valInInches = unit === 'mm' ? mmToIn(numVal) : numVal;

        setLocalConfig(prev => ({
            ...prev,
            size: 'Custom',
            [dimension === 'width' ? 'customWidth' : 'customHeight']: Number(valInInches.toFixed(3))
        }));
    };

    const dims = getPhysicalDimensions(
      localConfig.size as string,
      localConfig.orientation,
      localConfig.customWidth ? (localConfig.customWidth > 50 ? localConfig.customWidth : inToMm(localConfig.customWidth)) : undefined,
      localConfig.customHeight ? (localConfig.customHeight > 50 ? localConfig.customHeight : inToMm(localConfig.customHeight)) : undefined
    );

    const displayWidth = unit === 'mm' ? Number(dims.widthMm.toFixed(1)) : Number(dims.widthIn.toFixed(2));
    const displayHeight = unit === 'mm' ? Number(dims.heightMm.toFixed(1)) : Number(dims.heightIn.toFixed(2));

    // Curated options prioritizing standard requested sizes
    const primaryOptions = [
        { value: 'A4', label: 'A4 (210 × 297 mm)' },
        { value: 'A5', label: 'A5 (148 × 210 mm)' },
        { value: 'Letter', label: 'Letter (215.9 × 279.4 mm / 8.5" × 11")' },
        { value: 'Legal', label: 'Legal (215.9 × 355.6 mm / 8.5" × 14")' },
        { value: 'A3', label: 'A3 (297 × 420 mm)' },
        { value: 'Executive', label: 'Executive (184.2 × 266.7 mm)' },
        { value: 'Tabloid', label: 'Tabloid (279.4 × 431.8 mm)' },
        ...PAPER_FORMATS.filter(f => !['A4', 'A5', 'Letter', 'Legal', 'A3', 'Executive', 'Tabloid'].includes(f.id)).map(f => ({
            value: f.id,
            label: `${f.label} (${f.width} × ${f.height})`
        })),
        { value: 'Custom', label: 'Custom Size...' },
    ];

    return (
        <>
            <RenderSubTabs tabs={['size', 'source', 'apply']} active={paperSubTab} setActive={setPaperSubTab} />
            <div className="animate-in slide-in-from-right-4 duration-300 fade-in pt-2">
                {paperSubTab === 'size' && (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between pb-1">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Measurement Unit:</span>
                            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
                                <button
                                    type="button"
                                    onClick={() => setUnit('mm')}
                                    className={`px-2.5 py-0.5 rounded font-medium transition-colors ${unit === 'mm' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    mm
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUnit('in')}
                                    className={`px-2.5 py-0.5 rounded font-medium transition-colors ${unit === 'in' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    inches
                                </button>
                            </div>
                        </div>

                        <CompactSelect 
                            label="Paper size" 
                            value={localConfig.size} 
                            onChange={(e: any) => handlePaperSizeChange(e.target.value as PageSize)}
                            options={primaryOptions}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <CompactInput 
                                label={`Width (${unit})`} 
                                value={displayWidth} 
                                onChange={(e: any) => handleDimensionChange('width', e.target.value)} 
                            />
                            <CompactInput 
                                label={`Height (${unit})`} 
                                value={displayHeight} 
                                onChange={(e: any) => handleDimensionChange('height', e.target.value)} 
                            />
                        </div>

                        <div className="text-[11px] text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 text-center">
                            Physical dimensions: <span className="font-semibold text-slate-700 dark:text-slate-200">{dims.widthMm.toFixed(1)} × {dims.heightMm.toFixed(1)} mm</span> ({dims.widthPt.toFixed(1)} × {dims.heightPt.toFixed(1)} pt)
                        </div>
                    </div>
                )}

                {paperSubTab === 'source' && (
                    <div className="flex flex-col gap-3">
                        <CompactSelect 
                            label="First page" 
                            value={localConfig.paperSourceFirstPage || 'Default tray'} 
                            onChange={(e: any) => setLocalConfig(prev => ({...prev, paperSourceFirstPage: e.target.value}))}
                            options={[
                                { value: 'Default tray', label: 'Default tray (Auto Select)' },
                                { value: 'Manual Feed', label: 'Manual Feed' },
                            ]}
                        />
                        <CompactSelect 
                            label="Other pages" 
                            value={localConfig.paperSourceOtherPages || 'Default tray'} 
                            onChange={(e: any) => setLocalConfig(prev => ({...prev, paperSourceOtherPages: e.target.value}))}
                            options={[
                                { value: 'Default tray', label: 'Default tray (Auto Select)' },
                                { value: 'Manual Feed', label: 'Manual Feed' },
                            ]}
                        />
                    </div>
                )}

                {paperSubTab === 'apply' && <ApplyToSection localConfig={localConfig} setLocalConfig={setLocalConfig} />}
            </div>
        </>
    );
};
