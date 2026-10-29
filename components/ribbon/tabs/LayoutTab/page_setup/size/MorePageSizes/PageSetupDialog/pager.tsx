
import React, { useState } from 'react';
import { CompactInput, CompactSelect, ApplyToSection, RenderSubTabs } from '../../../common/DialogHelpers';
import { PageConfig, PageSize } from '../../../../../../../../types';
import { PAGE_SIZES, PAPER_FORMATS } from '../../../../../../../../constants';

interface PaperTabProps {
    localConfig: PageConfig;
    setLocalConfig: React.Dispatch<React.SetStateAction<PageConfig>>;
}

type PaperSubTab = 'size' | 'source' | 'apply';

export const PaperTab: React.FC<PaperTabProps> = ({ localConfig, setLocalConfig }) => {
    const [paperSubTab, setPaperSubTab] = useState<PaperSubTab>('size');

    const handlePaperSizeChange = (size: PageSize) => {
        let w = 0, h = 0;
        if (size !== 'Custom') {
            const base = PAGE_SIZES[size as string] || PAGE_SIZES.Letter;
            w = base.width / 96;
            h = base.height / 96;
        } else {
            w = localConfig.customWidth || PAGE_SIZES.Letter.width / 96;
            h = localConfig.customHeight || PAGE_SIZES.Letter.height / 96;
        }
        
        if (localConfig.orientation === 'landscape' && size !== 'Custom') {
            const temp = w; w = h; h = temp;
        }
  
        setLocalConfig(prev => ({
            ...prev,
            size,
            customWidth: w,
            customHeight: h
        }));
    };

    return (
        <>
            <RenderSubTabs tabs={['size', 'source', 'apply']} active={paperSubTab} setActive={setPaperSubTab} />
            <div className="animate-in slide-in-from-right-4 duration-300 fade-in pt-2">
                {paperSubTab === 'size' && (
                    <div className="flex flex-col gap-5">
                        <CompactSelect 
                            label="Paper size" 
                            value={localConfig.size} 
                            onChange={(e: any) => handlePaperSizeChange(e.target.value as PageSize)}
                            options={[
                                ...PAPER_FORMATS.map(f => ({ 
                                    value: f.id, 
                                    label: `${f.label} (${f.width} x ${f.height})` 
                                })),
                                { value: 'Custom', label: 'Custom Size' },
                            ]}
                        />

                        <div className="grid grid-cols-2 gap-3">
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
