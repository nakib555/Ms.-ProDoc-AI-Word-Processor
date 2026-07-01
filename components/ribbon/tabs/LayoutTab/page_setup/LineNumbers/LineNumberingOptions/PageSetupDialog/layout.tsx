
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { CompactInput, CompactSelect, ApplyToSection, RenderSubTabs } from '../../../common/DialogHelpers';
import { PageConfig } from '../../../../../../../../types';

interface LayoutTabProps {
    localConfig: PageConfig;
    setLocalConfig: React.Dispatch<React.SetStateAction<PageConfig>>;
}

type LayoutSubTab = 'section' | 'headers' | 'page' | 'apply';

export const LayoutTab: React.FC<LayoutTabProps> = ({ localConfig, setLocalConfig }) => {
    const [layoutSubTab, setLayoutSubTab] = useState<LayoutSubTab>('section');

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
                            <CompactInput label="Header" value={localConfig.headerDistance} onChange={(e: any) => setLocalConfig(prev => ({...prev, headerDistance: parseFloat(e.target.value)}))} />
                            <CompactInput label="Footer" value={localConfig.footerDistance} onChange={(e: any) => setLocalConfig(prev => ({...prev, footerDistance: parseFloat(e.target.value)}))} />
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
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Different odd & even pages</span>
                            </label>
                        </div>
                    </div>
                )}

                {layoutSubTab === 'page' && (
                    <div className="flex flex-col gap-5">
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
                    </div>
                )}

                {layoutSubTab === 'apply' && <ApplyToSection localConfig={localConfig} setLocalConfig={setLocalConfig} />}
            </div>
        </>
    );
};
