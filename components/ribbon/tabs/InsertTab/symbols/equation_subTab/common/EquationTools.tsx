
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useEquationTab } from '../EquationTabContext';
import { MenuPortal } from '../../../../../common/MenuPortal';
import { insertMathStructure, insertSymbolAtSelection, renderEquationPreviewMarkup } from './mathUtils';
import { isAnyModalOpen, isEventInsideModal } from '../../../../../../../utils/modalScroll';

const StaticMathPreview: React.FC<{ latex: string }> = ({ latex }) => {
    const markup = useMemo(() => renderEquationPreviewMarkup(latex), [latex]);
    const isDense = latex.includes('\\\\') || latex.includes('\\begin{') || latex.length > 46;
    const isVeryDense = latex.includes('3') || (latex.match(/\\\\/g)?.length ?? 0) >= 2 || latex.length > 90;

    return (
        <span
            className={`prodoc-struct-preview select-none ${
                isVeryDense
                    ? 'text-[11px] leading-tight'
                    : isDense
                    ? 'text-[12.5px] leading-tight'
                    : 'text-[15px]'
            }`}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: markup }}
        />
    );
};

export const StructureButton: React.FC<{
  icon: any;
  label: string;
  onClick: () => void;
  className?: string;
  hasArrow?: boolean;
}> = ({ icon: Icon, label, onClick, className, hasArrow }) => (
  <button
    type="button"
    className={`flex flex-col items-center justify-center px-2 py-1 min-w-[64px] h-full rounded-lg transition-all duration-200 group relative text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex-shrink-0 ${className || ''}`}
    onClick={onClick}
    onMouseDown={(e) => e.preventDefault()}
    title={label}
  >
    <div className="p-1.5 rounded-md transition-all mb-1 bg-transparent">
        <Icon className="w-6 h-6 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" strokeWidth={1.5} />
    </div>
    <div className="flex items-center justify-center w-full px-0.5">
        <span className="text-xs font-medium leading-tight text-center text-slate-500 dark:text-slate-400 group-hover:text-blue-700 dark:group-hover:text-blue-400 truncate w-full">{label}</span>
        {hasArrow && <ChevronDown size={12} className="ml-0.5 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0" />}
    </div>
  </button>
);

const SymbolBtn: React.FC<{ symbol: string, onClick: () => void }> = ({ symbol, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        onMouseDown={(e) => e.preventDefault()}
        className="h-9 w-9 flex items-center justify-center text-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-sm rounded border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all font-serif select-none"
        title={symbol}
    >
        {symbol}
    </button>
);

const TabButton: React.FC<{ label: string, active: boolean, onClick: () => void, className?: string }> = ({ label, active, onClick, className = '' }) => (
    <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onMouseDown={(e) => e.preventDefault()}
        className={`px-3 py-1.5 text-[11px] font-bold tracking-wide transition-all whitespace-nowrap rounded-lg flex-shrink-0 outline-none select-none border ${
            active 
            ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border-slate-200 dark:border-slate-600 ring-1 ring-black/[0.02]' 
            : 'text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-200/50 dark:hover:bg-slate-700/60 hover:text-slate-700 dark:hover:text-slate-200'
        } ${className}`}
    >
        {label}
    </button>
);

const HorizontalScrollContainer: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const el = ref.current;
        if (el) {
            const onWheel = (e: WheelEvent) => {
                if (isEventInsideModal(e.target) || isAnyModalOpen()) return;
                if (e.deltaY === 0) return;
                if (el.scrollWidth > el.clientWidth) {
                    e.preventDefault();
                    el.scrollLeft += e.deltaY;
                }
            };
            el.addEventListener('wheel', onWheel, { passive: false });
            return () => el.removeEventListener('wheel', onWheel);
        }
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
};

export const SymbolCategoryDropdown: React.FC<{ category: string, icon: any, symbols: string[] }> = ({ category, icon: Icon, symbols }) => {
    const { activeMenu, toggleMenu, registerTrigger, closeMenu, menuPos, triggerElement } = useEquationTab();
    
    const [greekTab, setGreekTab] = useState<'Lowercase' | 'Uppercase'>('Lowercase');
    const [scriptTab, setScriptTab] = useState<'Scripts' | 'Frakturs' | 'Double-Struck'>('Scripts');
    const [opTab, setOpTab] = useState<'Binary' | 'Relational' | 'N-ary' | 'Adv. Binary' | 'Adv. Relational'>('Binary');

    const menuId = `sym-${category}`;
    const isOpen = activeMenu === menuId;
    const isGreek = category === 'Greek Letters';
    const isScripts = category === 'Scripts';
    const isOperators = category === 'Operators';

    const getMenuWidth = () => {
        if (isOperators || isScripts || isGreek) return 'min(460px, 95vw)';
        return 'min(320px, 95vw)';
    };

    const insertSymbol = (symbol: string) => {
        insertSymbolAtSelection(symbol);
    };

    return (
        <>
            <button
                type="button"
                ref={(el) => registerTrigger(menuId, el)}
                onClick={(e) => { e.stopPropagation(); toggleMenu(menuId); }}
                aria-expanded={isOpen}
                className={`flex items-center gap-1.5 px-2 py-1 text-[11px] rounded-md hover:bg-slate-200 dark:hover:bg-slate-700/50 border border-transparent transition-all w-full text-left group ${isOpen ? 'bg-slate-200 dark:bg-slate-700 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'}`}
                title={category}
                onMouseDown={(e) => e.preventDefault()}
            >
                <Icon size={13} className={`shrink-0 ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}/>
                <span className="whitespace-nowrap font-medium truncate flex-1">{category}</span>
                <ChevronDown size={10} className={`shrink-0 transition-transform text-slate-400 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
            </button>

            <MenuPortal 
                id={menuId}
                activeMenu={activeMenu}
                triggerElement={triggerElement}
                menuPos={menuPos}
                closeMenu={closeMenu}
                width={getMenuWidth()}
            >
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1 flex justify-between items-center">
                        <span>{category}</span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[9px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-300">{symbols.length}</span>
                            <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={closeMenu}
                                className="p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                title="Close Symbol Gallery"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    </div>
                    
                    {isOperators ? (
                        <div className="flex flex-col h-full max-h-[400px]">
                            <HorizontalScrollContainer className="flex bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg overflow-x-auto no-scrollbar mb-2 gap-1">
                                {['Binary', 'Relational', 'N-ary', 'Adv. Binary', 'Adv. Relational'].map(tab => (
                                    <TabButton 
                                        key={tab} 
                                        label={tab} 
                                        active={opTab === tab} 
                                        onClick={() => setOpTab(tab as any)} 
                                        className="grow"
                                    />
                                ))}
                            </HorizontalScrollContainer>
                            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-600 max-h-[250px] p-1">
                                <div className="grid grid-cols-[repeat(auto-fill,minmax(2.25rem,1fr))] gap-1">
                                    {opTab === 'Binary' && symbols.slice(0, 18).map((s, i) => <SymbolBtn key={i} symbol={s} onClick={() => insertSymbol(s)} />)}
                                    {opTab === 'Relational' && symbols.slice(18, 61).map((s, i) => <SymbolBtn key={i} symbol={s} onClick={() => insertSymbol(s)} />)}
                                    {opTab === 'N-ary' && symbols.slice(61, 82).map((s, i) => <SymbolBtn key={i} symbol={s} onClick={() => insertSymbol(s)} />)}
                                    {opTab === 'Adv. Binary' && symbols.slice(82, 114).map((s, i) => <SymbolBtn key={i} symbol={s} onClick={() => insertSymbol(s)} />)}
                                    {opTab === 'Adv. Relational' && symbols.slice(114).map((s, i) => <SymbolBtn key={i} symbol={s} onClick={() => insertSymbol(s)} />)}
                                </div>
                            </div>
                        </div>
                    ) : isGreek ? (
                        <div className="flex flex-col h-full max-h-[400px]">
                            <HorizontalScrollContainer className="flex bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg overflow-x-auto no-scrollbar mb-2 gap-1">
                                <TabButton label="Lowercase" active={greekTab === 'Lowercase'} onClick={() => setGreekTab('Lowercase')} className="flex-1 min-w-[80px]" />
                                <TabButton label="Uppercase" active={greekTab === 'Uppercase'} onClick={() => setGreekTab('Uppercase')} className="flex-1 min-w-[80px]" />
                            </HorizontalScrollContainer>
                            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-600 max-h-[250px] p-1">
                                <div className="grid grid-cols-[repeat(auto-fill,minmax(2.25rem,1fr))] gap-1">
                                    {(greekTab === 'Lowercase' ? symbols.slice(0, 30) : symbols.slice(30)).map((s, i) => (
                                        <SymbolBtn 
                                            key={i} 
                                            symbol={s} 
                                            onClick={() => insertSymbol(s)} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : isScripts ? (
                        <div className="flex flex-col h-full max-h-[400px]">
                            <HorizontalScrollContainer className="flex bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg overflow-x-auto no-scrollbar mb-2 gap-1">
                                <TabButton label="Scripts" active={scriptTab === 'Scripts'} onClick={() => setScriptTab('Scripts')} className="flex-1 min-w-[70px]" />
                                <TabButton label="Frakturs" active={scriptTab === 'Frakturs'} onClick={() => setScriptTab('Frakturs')} className="flex-1 min-w-[70px]" />
                                <TabButton label="Double-Struck" active={scriptTab === 'Double-Struck'} onClick={() => setScriptTab('Double-Struck')} className="flex-1 min-w-[90px]" />
                            </HorizontalScrollContainer>
                            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-600 max-h-[250px] p-1">
                                <div className="grid grid-cols-[repeat(auto-fill,minmax(2.25rem,1fr))] gap-1">
                                    {scriptTab === 'Scripts' && symbols.slice(0, 52).map((s, i) => <SymbolBtn key={i} symbol={s} onClick={() => insertSymbol(s)} />)}
                                    {scriptTab === 'Frakturs' && symbols.slice(52, 104).map((s, i) => <SymbolBtn key={i} symbol={s} onClick={() => insertSymbol(s)} />)}
                                    {scriptTab === 'Double-Struck' && symbols.slice(104, 156).map((s, i) => <SymbolBtn key={i} symbol={s} onClick={() => insertSymbol(s)} />)}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-600 max-h-[250px] p-1">
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(2.25rem,1fr))] gap-1">
                                {symbols.map((s, i) => (
                                    <SymbolBtn key={i} symbol={s} onClick={() => insertSymbol(s)} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </MenuPortal>
        </>
    );
};

export interface StructureOption {
    label?: string;
    latex: string;
    insertValue: string;
}

export interface StructureSection {
    title?: string;
    items: StructureOption[];
    cols?: number; 
}

export const StructureDropdown: React.FC<{
    id: string;
    icon: any;
    label: string;
    sections: StructureSection[];
    width?: string | number;
}> = ({ id, icon: Icon, label, sections, width = 'min(520px, 96vw)' }) => {
    const { activeMenu, toggleMenu, closeMenu, registerTrigger, menuPos, triggerElement } = useEquationTab();
    const isOpen = activeMenu === id;
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const safeSectionIndex = activeSectionIndex < sections.length ? activeSectionIndex : 0;

    return (
        <>
            <button
                type="button"
                ref={(el) => registerTrigger(id, el)}
                onClick={(e) => { e.stopPropagation(); toggleMenu(id); }}
                onMouseDown={(e) => e.preventDefault()}
                aria-expanded={isOpen}
                className={`flex flex-col items-center justify-center px-2 py-1 min-w-[64px] h-full rounded-lg transition-all duration-200 group relative text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex-shrink-0 ${isOpen ? 'bg-slate-100 dark:bg-slate-700 text-blue-700 dark:text-blue-400' : ''}`}
                title={label}
            >
                <div className="p-1.5 rounded-md transition-all mb-1 bg-transparent">
                    <Icon className={`w-6 h-6 transition-colors ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`} strokeWidth={1.5} />
                </div>
                <div className="flex items-center justify-center w-full px-0.5">
                    <span className="text-xs font-medium leading-tight text-center text-slate-500 dark:text-slate-400 group-hover:text-blue-700 dark:group-hover:text-blue-400 truncate w-full">{label}</span>
                    <ChevronDown size={12} className={`ml-0.5 transition-transform ${isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400'} shrink-0`} />
                </div>
            </button>

            <MenuPortal
                id={id}
                activeMenu={activeMenu}
                triggerElement={triggerElement}
                menuPos={menuPos}
                closeMenu={closeMenu}
                width={width}
            >
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden flex flex-col h-full max-h-[520px]">
                    {sections.length > 1 && (
                        <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-2 shrink-0">
                            <HorizontalScrollContainer className="flex overflow-x-auto no-scrollbar gap-1.5">
                                {sections.map((section, i) => (
                                    <TabButton 
                                        key={`${id}-sec-${i}`}
                                        label={section.title || `Set ${i + 1}`}
                                        active={safeSectionIndex === i}
                                        onClick={() => setActiveSectionIndex(i)}
                                        className="flex-1"
                                    />
                                ))}
                            </HorizontalScrollContainer>
                        </div>
                    )}

                    <div className="overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 flex-1 bg-white dark:bg-slate-900">
                        {(() => {
                            const section = sections[safeSectionIndex];
                            if (!section) return null;
                            return (
                                <div>
                                    {sections.length === 1 && section.title && (
                                        <div className="px-1 mb-2 pb-1 border-b border-slate-100 dark:border-slate-800">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{section.title}</span>
                                        </div>
                                    )}
                                    <div 
                                        className="grid gap-2 p-1.5" 
                                        style={{ 
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))' 
                                        }}
                                    >
                                        {section.items.map((item, j) => (
                                            <button 
                                                type="button"
                                                key={`${id}-${safeSectionIndex}-${j}-${item.latex}`}
                                                onClick={(e) => { 
                                                    e.stopPropagation(); 
                                                    insertMathStructure(item.insertValue); 
                                                    closeMenu(); 
                                                }}
                                                onMouseDown={(e) => e.preventDefault()}
                                                className="
                                                    group relative flex flex-col items-center justify-center 
                                                    min-h-[76px] pt-2 pb-5 px-2 rounded-xl transition-all duration-150 ease-out
                                                    bg-white dark:bg-slate-800 
                                                    border border-slate-200 dark:border-slate-700
                                                    hover:border-blue-500 hover:ring-1 hover:ring-blue-500
                                                    hover:shadow-md
                                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                                                    overflow-hidden
                                                    text-slate-800 dark:text-slate-100 hover:text-slate-950 dark:hover:text-white
                                                "
                                                title={item.label}
                                                aria-label={item.label || item.latex}
                                            >
                                                <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                                                    <StaticMathPreview latex={item.latex} />
                                                </div>
                                                
                                                {item.label && (
                                                    <div className="absolute bottom-0 left-0 right-0 py-0.5 px-1 bg-slate-50/90 dark:bg-slate-800/90 border-t border-slate-100 dark:border-slate-700/70 flex justify-center pointer-events-none">
                                                        <span className="text-[9.5px] font-medium text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate max-w-full">
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </MenuPortal>
        </>
    );
};
