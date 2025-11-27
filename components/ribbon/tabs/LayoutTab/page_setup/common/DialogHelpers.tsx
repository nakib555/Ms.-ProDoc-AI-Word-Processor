
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import { PageConfig, ApplyToType } from '../../../../../../types';

export const CompactInput = ({ label, value, onChange, suffix = '"' }: any) => (
    <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 px-3 py-2 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all group shadow-sm">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">{label}</span>
        <div className="flex items-center gap-1">
            <input 
                type="number" 
                step="0.1"
                className="w-12 text-right bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none p-0"
                value={value}
                onChange={onChange}
                onFocus={(e) => e.target.select()}
                onBlur={(e) => { 
                    const val = parseFloat(e.target.value);
                    if (isNaN(val) || val < 0) onChange({target: {value: '0'}});
                }}
            />
            <span className="text-[10px] text-slate-400 font-medium">{suffix}</span>
        </div>
    </div>
);

export const CompactSelect = ({ label, value, onChange, options, disabled = false }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [layout, setLayout] = useState<any>({ top: 0, left: 0, width: 0, maxHeight: 240 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const updateLayout = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const spaceBelow = viewportHeight - rect.bottom - 8;
            const spaceAbove = rect.top - 8;
            
            const neededHeight = Math.min(options.length * 32 + 8, 240);
            
            if (spaceBelow >= neededHeight || spaceBelow > spaceAbove) {
                setLayout({
                    top: rect.bottom + 4,
                    left: rect.left,
                    width: rect.width,
                    maxHeight: Math.min(240, spaceBelow),
                    isUpwards: false
                });
            } else {
                setLayout({
                    bottom: viewportHeight - rect.top + 4,
                    left: rect.left,
                    width: rect.width,
                    maxHeight: Math.min(240, spaceAbove),
                    isUpwards: true
                });
            }
        }
    };

    const toggleOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        
        if (!isOpen) {
            updateLayout();
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('resize', updateLayout);
            window.addEventListener('scroll', updateLayout, true);
        }
        return () => {
            window.removeEventListener('resize', updateLayout);
            window.removeEventListener('scroll', updateLayout, true);
        };
    }, [isOpen]);

    return (
        <div className={`flex flex-col gap-1.5 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide ml-1">{label}</span>
            <button
                ref={buttonRef}
                type="button"
                onClick={toggleOpen}
                className={`w-full flex items-center justify-between bg-white dark:bg-slate-800 border transition-all rounded-lg pl-3 pr-2 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 outline-none shadow-sm ${isOpen ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'}`}
            >
                <span className="truncate mr-2 text-left flex-1">{options.find((o: any) => o.value === value)?.label || value}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && createPortal(
                <>
                    <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
                    <div 
                        className={`fixed z-[9999] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-600 animate-in fade-in duration-100 flex flex-col py-1 ${layout.isUpwards ? 'slide-in-from-bottom-1 origin-bottom' : 'slide-in-from-top-1 origin-top'}`}
                        style={{ 
                            top: layout.top, 
                            bottom: layout.bottom,
                            left: layout.left, 
                            width: layout.width,
                            maxHeight: layout.maxHeight
                        }}
                    >
                        {options.map((opt: any) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange({ target: { value: opt.value } });
                                    setIsOpen(false);
                                }}
                                className={`text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors shrink-0 ${opt.value === value ? 'bg-blue-50 dark:bg-slate-700/50 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-200'}`}
                            >
                                <span className="truncate">{opt.label}</span>
                                {opt.value === value && <Check size={12} className="shrink-0 ml-2" />}
                            </button>
                        ))}
                    </div>
                </>,
                document.body
            )}
        </div>
    );
};

export const ApplyToSection = ({ localConfig, setLocalConfig }: { localConfig: PageConfig, setLocalConfig: (c: any) => void }) => (
    <div className="flex flex-col gap-4 pt-2">
        <CompactSelect 
            label="Apply to" 
            value={localConfig.applyTo || 'wholeDocument'} 
            onChange={(e: any) => setLocalConfig((prev: PageConfig) => ({ ...prev, applyTo: e.target.value as ApplyToType }))}
            options={[
                { value: 'wholeDocument', label: 'Whole document' },
                { value: 'thisSection', label: 'This section' },
                { value: 'thisPointForward', label: 'This point forward' },
            ]}
        />
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800 leading-relaxed">
            Apply changes to the entire document or from this point onward.
        </div>
    </div>
);

export const RenderSubTabs = ({ tabs, active, setActive }: { tabs: string[], active: string, setActive: (t: any) => void }) => (
    <div className="px-5 pb-2 shrink-0">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-1 overflow-x-auto no-scrollbar">
            {tabs.map((sub) => (
                <button
                    key={sub}
                    onClick={() => setActive(sub)}
                    className={`pb-2 px-1 text-xs font-medium transition-all relative capitalize whitespace-nowrap ${active === sub ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    {sub.replace(/([A-Z])/g, ' $1').trim()}
                    {active === sub && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full" />
                    )}
                </button>
            ))}
        </div>
    </div>
);
