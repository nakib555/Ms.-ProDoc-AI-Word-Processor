import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { CompactUnitInput, CompactSelect, ApplyToSection, RenderSubTabs } from '../../../common/DialogHelpers';
import { PageConfig } from '../../../../../../../../types';
import { useEditor } from '../../../../../../../../contexts/EditorContext';

interface LayoutTabProps {
    localConfig: PageConfig;
    setLocalConfig: React.Dispatch<React.SetStateAction<PageConfig>>;
}

type LayoutSubTab = 'section' | 'headers' | 'page' | 'apply';

export const LayoutTab: React.FC<LayoutTabProps> = ({ localConfig, setLocalConfig }) => {
    const [layoutSubTab, setLayoutSubTab] = useState<LayoutSubTab>('section');
    const { measurementUnit } = useEditor();

    const lineNumbers = localConfig.lineNumbers || {
        enabled: false,
        startAt: 1,
        countBy: 1,
        restartEachPage: true,
    };

    const updateLineNumbers = (patch: Partial<NonNullable<PageConfig['lineNumbers']>>) => {
        setLocalConfig(prev => ({
            ...prev,
            lineNumbers: {
                enabled: prev.lineNumbers?.enabled ?? false,
                startAt: prev.lineNumbers?.startAt ?? 1,
                countBy: prev.lineNumbers?.countBy ?? 1,
                restartEachPage: prev.lineNumbers?.restartEachPage ?? true,
                ...patch,
            },
        }));
    };

    return (
        <>
            <RenderSubTabs tabs={['section', 'headers', 'page', 'apply']} active={layoutSubTab} setActive={setLayoutSubTab} />
            <div className="animate-in slide-in-from-right-4 duration-300 fade-in pt-2">
                {layoutSubTab === 'section' && (
                    <div className="flex flex-col gap-5">
                        <CompactSelect 
                            label="Section Start" 
                            value={localConfig.sectionStart} 
                            onChange={(e: any) => setLocalConfig(prev => ({...prev, sectionStart: e.target.value}))}
                            options={[
                                { value: 'newpage', label: 'New Page' },
                                { value: 'continuous', label: 'Continuous' },
                                { value: 'even', label: 'Even Page' },
                                { value: 'odd', label: 'Odd Page' },
                            ]}
                        />
                    </div>
                )}

                {layoutSubTab === 'headers' && (
                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-3">
                            <CompactUnitInput label="Header" inchesValue={localConfig.headerDistance} unit={measurementUnit} onChangeInches={(v) => setLocalConfig(prev => ({ ...prev, headerDistance: v }))} />
                            <CompactUnitInput label="Footer" inchesValue={localConfig.footerDistance} unit={measurementUnit} onChangeInches={(v) => setLocalConfig(prev => ({ ...prev, footerDistance: v }))} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${localConfig.differentFirstPage ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
                                    {localConfig.differentFirstPage && <Check size={12} className="text-white" strokeWidth={3} />}
                                </div>
                                <input type="checkbox" checked={localConfig.differentFirstPage || false} onChange={(e) => setLocalConfig(prev => ({...prev, differentFirstPage: e.target.checked}))} className="hidden" />
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Different first page</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${localConfig.differentOddEven ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
                                    {localConfig.differentOddEven && <Check size={12} className="text-white" strokeWidth={3} />}
                                </div>
                                <input type="checkbox" checked={localConfig.differentOddEven || false} onChange={(e) => setLocalConfig(prev => ({...prev, differentOddEven: e.target.checked}))} className="hidden" />
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Different odd &amp; even pages</span>
                            </label>
                        </div>
                    </div>
                )}

                {layoutSubTab === 'page' && (
                    <div className="flex flex-col gap-4">
                        <CompactSelect 
                            label="Vertical Alignment" 
                            value={localConfig.verticalAlign} 
                            onChange={(e: any) => setLocalConfig(prev => ({...prev, verticalAlign: e.target.value}))}
                            options={[
                                { value: 'top', label: 'Top' },
                                { value: 'center', label: 'Center' },
                                { value: 'justify', label: 'Justified' },
                                { value: 'bottom', label: 'Bottom' },
                            ]}
                        />

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${lineNumbers.enabled ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
                                    {lineNumbers.enabled && <Check size={12} className="text-white" strokeWidth={3} />}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={lineNumbers.enabled}
                                    onChange={(e) => updateLineNumbers({ enabled: e.target.checked })}
                                    className="hidden"
                                />
                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Add line numbering</span>
                            </label>

                            {lineNumbers.enabled && (
                                <div className="grid grid-cols-2 gap-3 pl-1">
                                    <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2">
                                        <span className="text-[11px] font-bold text-slate-500 uppercase">Start at</span>
                                        <input
                                            type="number"
                                            min={1}
                                            value={lineNumbers.startAt ?? 1}
                                            onChange={(e) => updateLineNumbers({ startAt: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                                            className="w-12 text-right bg-transparent text-xs font-mono tabular-nums font-semibold outline-none"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2">
                                        <span className="text-[11px] font-bold text-slate-500 uppercase">Count by</span>
                                        <input
                                            type="number"
                                            min={1}
                                            value={lineNumbers.countBy ?? 1}
                                            onChange={(e) => updateLineNumbers({ countBy: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                                            className="w-12 text-right bg-transparent text-xs font-mono tabular-nums font-semibold outline-none"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <CompactSelect
                                            label="Numbering"
                                            value={lineNumbers.restartEachPage !== false ? 'restart' : 'continuous'}
                                            onChange={(e: any) => updateLineNumbers({ restartEachPage: e.target.value === 'restart' })}
                                            options={[
                                                { value: 'restart', label: 'Restart each page' },
                                                { value: 'continuous', label: 'Continuous' },
                                            ]}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {layoutSubTab === 'apply' && <ApplyToSection localConfig={localConfig} setLocalConfig={setLocalConfig} />}
            </div>
        </>
    );
};
