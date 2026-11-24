import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { CompactUnitInput, CompactSelect, ApplyToSection, RenderSubTabs } from '../../../common/DialogHelpers';
import { PageConfig, PageOrientation, MultiplePagesType, SheetsPerBookletType } from '../../../../../../../../types';
import { useEditor } from '../../../../../../../../contexts/EditorContext';

interface MarginTabProps {
    localConfig: PageConfig;
    setLocalConfig: React.Dispatch<React.SetStateAction<PageConfig>>;
}

type MarginSubTab = 'margins' | 'orientation' | 'pages' | 'apply';

export const MarginTab: React.FC<MarginTabProps> = ({ localConfig, setLocalConfig }) => {
    const [marginSubTab, setMarginSubTab] = useState<MarginSubTab>('margins');
    const { measurementUnit } = useEditor();

    const handleMarginInputChange = (section: keyof PageConfig['margins'], nextInches: number) => {
        const clamped = Math.max(0, nextInches);
        setLocalConfig(prev => ({
          ...prev,
          marginPreset: 'custom',
          margins: {
            ...prev.margins,
            [section]: clamped
          }
        }));
    };

    const handleOrientationChange = (orientation: PageOrientation) => {
        if (orientation === localConfig.orientation) return;

        setLocalConfig(prev => {
            // For named paper sizes (Letter, A4, Legal, etc.), preserve the named size!
            // getPhysicalDimensions() handles rotating portrait<->landscape cleanly.
            if (prev.size !== 'Custom') {
                return {
                    ...prev,
                    orientation,
                };
            }

            // For Custom sizes, swap portrait base customWidth/customHeight only if explicit
            return {
                ...prev,
                orientation,
            };
        });
    };

    const handleMultiplePagesChange = (type: MultiplePagesType) => {
        setLocalConfig(prev => ({
            ...prev,
            multiplePages: type,
            mirrorMargins: type === 'mirrorMargins' || type === 'bookFold'
        }));
    };

    return (
        <>
            <RenderSubTabs tabs={['margins', 'orientation', 'pages', 'apply']} active={marginSubTab} setActive={setMarginSubTab} />
            <div className="animate-in slide-in-from-right-4 duration-300 fade-in pt-2">
                {marginSubTab === 'margins' && (
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            <CompactUnitInput label="Top" inchesValue={localConfig.margins.top} unit={measurementUnit} onChangeInches={(v) => handleMarginInputChange('top', v)} />
                            <CompactUnitInput label="Bottom" inchesValue={localConfig.margins.bottom} unit={measurementUnit} onChangeInches={(v) => handleMarginInputChange('bottom', v)} />
                            <CompactUnitInput label={localConfig.multiplePages === 'mirrorMargins' || localConfig.multiplePages === 'bookFold' ? 'Inside' : 'Left'} inchesValue={localConfig.margins.left} unit={measurementUnit} onChangeInches={(v) => handleMarginInputChange('left', v)} />
                            <CompactUnitInput label={localConfig.multiplePages === 'mirrorMargins' || localConfig.multiplePages === 'bookFold' ? 'Outside' : 'Right'} inchesValue={localConfig.margins.right} unit={measurementUnit} onChangeInches={(v) => handleMarginInputChange('right', v)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <CompactUnitInput label="Gutter" inchesValue={localConfig.margins.gutter || 0} unit={measurementUnit} onChangeInches={(v) => handleMarginInputChange('gutter', v)} />
                            <CompactSelect
                                label="Position"
                                value={localConfig.gutterPosition}
                                onChange={(e: any) => setLocalConfig(prev => ({ ...prev, gutterPosition: e.target.value }))}
                                options={[
                                    { value: 'left', label: 'Left' },
                                    { value: 'top', label: 'Top' },
                                ]}
                            />
                        </div>
                    </div>
                )}

                {marginSubTab === 'orientation' && (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 flex gap-4 items-center justify-center min-h-[200px]">
                                <button 
                                type="button"
                                onClick={() => handleOrientationChange('portrait')}
                                className={`flex-1 min-w-0 h-full max-h-[240px] flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-200 group relative overflow-hidden ${localConfig.orientation === 'portrait' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-300 shadow-md' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-slate-50 hover:shadow-sm'}`}
                                >
                                <div className={`mb-4 p-5 rounded-full transition-transform duration-200 group-hover:scale-110 shadow-sm ${localConfig.orientation === 'portrait' ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:text-blue-600'}`}>
                                    <FileText size={32} strokeWidth={1.5} />
                                </div>
                                <span className="text-base font-bold tracking-tight">Portrait</span>
                                {localConfig.orientation === 'portrait' && <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                                </button>
                                
                                <button 
                                type="button"
                                onClick={() => handleOrientationChange('landscape')}
                                className={`flex-1 min-w-0 h-full max-h-[240px] flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-200 group relative overflow-hidden ${localConfig.orientation === 'landscape' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-300 shadow-md' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-slate-50 hover:shadow-sm'}`}
                                >
                                <div className={`mb-4 p-5 rounded-full transition-transform duration-200 group-hover:scale-110 shadow-sm ${localConfig.orientation === 'landscape' ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:text-blue-600'}`}>
                                    <FileText size={32} className="rotate-90" strokeWidth={1.5} />
                                </div>
                                <span className="text-base font-bold tracking-tight">Landscape</span>
                                {localConfig.orientation === 'landscape' && <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                                </button>
                        </div>
                        <div className="mt-4 text-center text-xs text-slate-400 font-medium">
                            {localConfig.orientation === 'portrait' ? 'Standard vertical orientation.' : 'Wide horizontal orientation.'}
                        </div>
                    </div>
                )}

                {marginSubTab === 'pages' && (
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4">
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
                            {localConfig.multiplePages === 'bookFold' && (
                                <div className="animate-in slide-in-from-top-2 fade-in">
                                    <CompactSelect
                                        label="Sheets per booklet"
                                        value={localConfig.sheetsPerBooklet}
                                        onChange={(e: any) => setLocalConfig(prev => ({ ...prev, sheetsPerBooklet: e.target.value as SheetsPerBookletType }))}
                                        options={[
                                            { value: 'all', label: 'All' },
                                            { value: '16', label: '16' },
                                            { value: '8', label: '8' },
                                            { value: '4', label: '4' },
                                            { value: '2', label: '2' },
                                        ]}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {marginSubTab === 'apply' && <ApplyToSection localConfig={localConfig} setLocalConfig={setLocalConfig} />}
            </div>
        </>
    );
};
