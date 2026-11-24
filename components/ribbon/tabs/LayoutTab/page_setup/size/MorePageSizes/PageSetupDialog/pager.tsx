import React, { useState } from 'react';
import { CompactUnitInput, CompactSelect, ApplyToSection, RenderSubTabs } from '../../../common/DialogHelpers';
import { PageConfig, PageSize } from '../../../../../../../../types';
import { PAPER_FORMATS } from '../../../../../../../../constants';
import { getPhysicalDimensions } from '../../../../../../../../utils/measurement';
import { useEditor } from '../../../../../../../../contexts/EditorContext';

interface PaperTabProps {
    localConfig: PageConfig;
    setLocalConfig: React.Dispatch<React.SetStateAction<PageConfig>>;
}

type PaperSubTab = 'size' | 'source' | 'apply';

export const PaperTab: React.FC<PaperTabProps> = ({ localConfig, setLocalConfig }) => {
    const [paperSubTab, setPaperSubTab] = useState<PaperSubTab>('size');
    const { measurementUnit } = useEditor();

    const activePhys = getPhysicalDimensions(
        localConfig.size as string,
        localConfig.orientation,
        localConfig.customWidth,
        localConfig.customHeight
    );

    const handlePaperSizeChange = (size: PageSize) => {
        if (size === 'Custom') {
            setLocalConfig(prev => ({
                ...prev,
                size: 'Custom',
                customWidth: prev.customWidth || (prev.orientation === 'landscape' ? activePhys.heightInches : activePhys.widthInches),
                customHeight: prev.customHeight || (prev.orientation === 'landscape' ? activePhys.widthInches : activePhys.heightInches),
            }));
            return;
        }

        setLocalConfig(prev => ({
            ...prev,
            size,
            customWidth: undefined,
            customHeight: undefined,
        }));
    };

    const handleDimensionEdit = (axis: 'width' | 'height', nextDisplayInches: number) => {
        const currentW = activePhys.widthInches;
        const currentH = activePhys.heightInches;
        const nextDisplayW = axis === 'width' ? nextDisplayInches : currentW;
        const nextDisplayH = axis === 'height' ? nextDisplayInches : currentH;

        const nextOrientation = nextDisplayW > nextDisplayH ? 'landscape' : 'portrait';
        const basePortraitW = nextOrientation === 'landscape' ? nextDisplayH : nextDisplayW;
        const basePortraitH = nextOrientation === 'landscape' ? nextDisplayW : nextDisplayH;

        setLocalConfig(prev => ({
            ...prev,
            size: 'Custom',
            orientation: nextOrientation,
            customWidth: Math.max(0.5, basePortraitW),
            customHeight: Math.max(0.5, basePortraitH),
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
                                    label: `${f.label} (${f.width} × ${f.height})` 
                                })),
                                { value: 'Custom', label: 'Custom Size' },
                            ]}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <CompactUnitInput
                                label="Width"
                                inchesValue={activePhys.widthInches}
                                unit={measurementUnit}
                                minInches={0.5}
                                maxInches={100}
                                onChangeInches={(v) => handleDimensionEdit('width', v)}
                            />
                            <CompactUnitInput
                                label="Height"
                                inchesValue={activePhys.heightInches}
                                unit={measurementUnit}
                                minInches={0.5}
                                maxInches={100}
                                onChangeInches={(v) => handleDimensionEdit('height', v)}
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
