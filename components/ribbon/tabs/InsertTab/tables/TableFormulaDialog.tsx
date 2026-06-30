import React, { useState, useEffect, useRef } from 'react';
import { HyperFormula } from 'hyperformula';
import { 
    X, Calculator, MousePointer2, Check, ArrowRight, 
    Layers, Grid, Undo2, HelpCircle, Info
} from 'lucide-react';

interface TableFormulaDialogProps {
    isOpen: boolean;
    onClose: () => void;
    table: HTMLTableElement | null;
    activeCell: HTMLTableCellElement | null;
}

type SelectionType = 'individual' | 'range';
type WizardStep = 'setup' | 'source_selection' | 'target_selection';

export const TableFormulaDialog: React.FC<TableFormulaDialogProps> = ({ isOpen, onClose, table, activeCell }) => {
    // Wizard States
    const [step, setStep] = useState<WizardStep>('setup');
    const [selType, setSelType] = useState<SelectionType>('range');
    const [funcName, setFuncName] = useState<string>('SUM');
    const [numberFormat, setNumberFormat] = useState<string>('');
    const [customFormula, setCustomFormula] = useState<string>('');
    const [isCustom, setIsCustom] = useState<boolean>(false);

    // Selected items
    const [selectedCells, setSelectedCells] = useState<{r: number, c: number}[]>([]);
    const [rangeStart, setRangeStart] = useState<{r: number, c: number} | null>(null);
    const [rangeEnd, setRangeEnd] = useState<{r: number, c: number} | null>(null);
    const [targetCell, setTargetCell] = useState<{r: number, c: number} | null>(null);

    // UI/Interaction States
    const [isDragging, setIsDragging] = useState(false);
    const [liveResult, setLiveResult] = useState<string | number>('-');
    const [error, setError] = useState<string | null>(null);

    const dragStartRef = useRef<{r: number, c: number} | null>(null);

    // Reset wizard when opening
    useEffect(() => {
        if (isOpen) {
            setStep('setup');
            setSelType('range');
            setFuncName('SUM');
            setIsCustom(false);
            setCustomFormula('');
            setSelectedCells([]);
            setRangeStart(null);
            setRangeEnd(null);
            setError(null);
            setLiveResult('-');
            
            if (activeCell) {
                const r = (activeCell.parentNode as HTMLTableRowElement).rowIndex;
                const c = activeCell.cellIndex;
                setTargetCell({ r, c });
            } else {
                setTargetCell(null);
            }
        }
    }, [isOpen, activeCell]);

    // Format helper for display values
    const getColumnName = (colIndex: number) => {
        let name = '';
        let num = colIndex;
        while (num >= 0) {
            name = String.fromCharCode(65 + (num % 26)) + name;
            num = Math.floor(num / 26) - 1;
        }
        return name;
    };

    const getCellAddress = (r: number, c: number) => {
        return `${getColumnName(c)}${r + 1}`;
    };

    // Calculate live formula using HyperFormula
    const calculateLiveValue = (
        currentSelType: SelectionType, 
        cells: {r: number, c: number}[], 
        rStart: {r: number, c: number} | null, 
        rEnd: {r: number, c: number} | null
    ) => {
        if (!table) return;

        // Extract full table data
        const rows = table.rows;
        const data: any[][] = [];
        for (let r = 0; r < rows.length; r++) {
            const rowData: any[] = [];
            const cellsEl = rows[r].cells;
            for (let c = 0; c < cellsEl.length; c++) {
                // If this is the target/answer cell, ignore its old value during preview evaluation
                if (targetCell && r === targetCell.r && c === targetCell.c) {
                    rowData.push("");
                    continue;
                }
                const valStr = cellsEl[c].innerText.trim();
                const num = parseFloat(valStr.replace(/[^0-9.-]/g, ''));
                rowData.push(!isNaN(num) && valStr !== '' ? num : valStr);
            }
            data.push(rowData);
        }

        // Generate Formula string
        let formulaStr = '';
        if (isCustom) {
            formulaStr = customFormula.startsWith('=') ? customFormula : `=${customFormula}`;
        } else {
            if (currentSelType === 'individual') {
                if (cells.length === 0) {
                    setLiveResult('-');
                    return;
                }
                const addrList = cells.map(cell => getCellAddress(cell.r, cell.c)).join(',');
                formulaStr = `=${funcName}(${addrList})`;
            } else {
                if (!rStart || !rEnd) {
                    setLiveResult('-');
                    return;
                }
                const startAddr = getCellAddress(rStart.r, rStart.c);
                const endAddr = getCellAddress(rEnd.r, rEnd.c);
                formulaStr = `=${funcName}(${startAddr}:${endAddr})`;
            }
        }

        try {
            const hf = HyperFormula.buildEmpty({ licenseKey: 'gpl-v3' });
            const sheetId = hf.addSheet('PreviewSheet');
            hf.setSheetContent(sheetId, data);
            
            // Set cell to compute formula
            const tempRow = targetCell ? targetCell.r : 0;
            const tempCol = targetCell ? targetCell.c : 0;
            
            hf.setCellContents({ sheet: sheetId, row: tempRow, col: tempCol }, [[formulaStr]]);
            const val = hf.getCellValue({ sheet: sheetId, row: tempRow, col: tempCol });

            if (val !== null && val !== undefined) {
                if (typeof val === 'object' && 'type' in val && val.type === 'ERROR') {
                    setLiveResult('Error');
                    setError(`Formula result: ${val.value}`);
                } else {
                    let finalVal: string | number = val;
                    if (typeof val === 'number') {
                        if (numberFormat === '%') {
                            finalVal = (val * 100).toFixed(2) + '%';
                        } else if (numberFormat === '$') {
                            finalVal = '$' + val.toFixed(2);
                        } else if (numberFormat === '0.00') {
                            finalVal = val.toFixed(2);
                        } else if (numberFormat === '0') {
                            finalVal = Math.round(val);
                        } else {
                            finalVal = Number(val.toFixed(4)); // Limit floating decimals nicely
                        }
                    }
                    setLiveResult(finalVal);
                    setError(null);
                }
            } else {
                setLiveResult('-');
            }
        } catch (err: any) {
            setLiveResult('Error');
            setError(err.message || "Calculation Error");
        }
    };

    // Trigger preview recalculations on state changes
    useEffect(() => {
        if (isOpen && table && step !== 'setup') {
            calculateLiveValue(selType, selectedCells, rangeStart, rangeEnd);
        }
    }, [isOpen, table, step, selType, selectedCells, rangeStart, rangeEnd, funcName, isCustom, customFormula, numberFormat]);

    // Cell Outline and Background Highlight Effects
    useEffect(() => {
        if (!table || !isOpen) return;

        const allCells = table.querySelectorAll('td, th');

        // Backup styling helper
        const restoreStyles = (c: HTMLElement) => {
            const origBg = c.getAttribute('data-formula-bg');
            const origOutline = c.getAttribute('data-formula-outline');
            if (origBg !== null) {
                c.style.backgroundColor = origBg;
                c.removeAttribute('data-formula-bg');
            } else {
                c.style.backgroundColor = '';
            }
            if (origOutline !== null) {
                c.style.outline = origOutline;
                c.removeAttribute('data-formula-outline');
            } else {
                c.style.outline = '';
            }
            c.classList.remove('animate-pulse', 'transition-all', 'duration-300');
        };

        const applyHighlight = (c: HTMLElement, bg: string, outline: string) => {
            if (!c.hasAttribute('data-formula-bg')) {
                c.setAttribute('data-formula-bg', c.style.backgroundColor);
            }
            if (!c.hasAttribute('data-formula-outline')) {
                c.setAttribute('data-formula-outline', c.style.outline);
            }
            c.style.backgroundColor = bg;
            c.style.outline = outline;
            c.classList.add('animate-pulse', 'transition-all', 'duration-300');
        };

        // Reset previous highlights
        allCells.forEach(c => restoreStyles(c as HTMLElement));

        // Highlight Target Cell (Emerald color)
        if (targetCell) {
            const rowEl = table.rows[targetCell.r];
            if (rowEl && rowEl.cells[targetCell.c]) {
                applyHighlight(rowEl.cells[targetCell.c], 'rgba(16, 185, 129, 0.15)', '2px solid #10b981');
            }
        }

        // Highlight source cells in Selection Steps
        if (step === 'source_selection') {
            if (selType === 'individual') {
                selectedCells.forEach(cell => {
                    const rowEl = table.rows[cell.r];
                    if (rowEl && rowEl.cells[cell.c]) {
                        // Skip highlighting if it is also the target cell to keep target prominent
                        if (targetCell && cell.r === targetCell.r && cell.c === targetCell.c) return;
                        applyHighlight(rowEl.cells[cell.c], 'rgba(59, 130, 246, 0.2)', '2px dashed #3b82f6');
                    }
                });
            } else if (rangeStart && rangeEnd) {
                const r1 = Math.min(rangeStart.r, rangeEnd.r);
                const r2 = Math.max(rangeStart.r, rangeEnd.r);
                const c1 = Math.min(rangeStart.c, rangeEnd.c);
                const c2 = Math.max(rangeStart.c, rangeEnd.c);

                for (let r = r1; r <= r2; r++) {
                    const rowEl = table.rows[r];
                    if (rowEl) {
                        for (let c = c1; c <= c2; c++) {
                            const cellEl = rowEl.cells[c];
                            if (cellEl) {
                                if (targetCell && r === targetCell.r && c === targetCell.c) continue;
                                applyHighlight(cellEl, 'rgba(59, 130, 246, 0.2)', '2px dashed #3b82f6');
                            }
                        }
                    }
                }
            }
        }

        return () => {
            allCells.forEach(c => restoreStyles(c as HTMLElement));
        };
    }, [isOpen, table, step, selType, selectedCells, rangeStart, rangeEnd, targetCell]);

    // Handle Table Selection Mouse Actions
    useEffect(() => {
        if (!isOpen || !table) return;

        const handleMouseDown = (e: MouseEvent) => {
            const cell = (e.target as HTMLElement).closest('td, th') as HTMLTableCellElement;
            if (!cell || !table.contains(cell)) return;

            e.preventDefault();
            const r = (cell.parentNode as HTMLTableRowElement).rowIndex;
            const c = cell.cellIndex;

            if (step === 'target_selection') {
                // User is picking the empty target cell to write the answer
                const isEmpty = cell.innerText.trim() === '';
                if (!isEmpty) {
                    setError("Notice: Cell contains data. Choose an empty cell to avoid overwriting, or Apply to overwrite.");
                } else {
                    setError(null);
                }
                setTargetCell({ r, c });
                return;
            }

            if (step === 'source_selection') {
                if (selType === 'individual') {
                    // Check if already selected, if so toggle it off
                    const index = selectedCells.findIndex(cell => cell.r === r && cell.c === c);
                    if (index > -1) {
                        setSelectedCells(prev => prev.filter((_, idx) => idx !== index));
                    } else {
                        setSelectedCells(prev => [...prev, { r, c }]);
                    }
                } else {
                    // Range Selection Start
                    setIsDragging(true);
                    dragStartRef.current = { r, c };
                    setRangeStart({ r, c });
                    setRangeEnd({ r, c });
                }
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            if (!isDragging || step !== 'source_selection' || selType !== 'range' || !dragStartRef.current) return;
            const cell = (e.target as HTMLElement).closest('td, th') as HTMLTableCellElement;
            if (!cell || !table.contains(cell)) return;

            const r = (cell.parentNode as HTMLTableRowElement).rowIndex;
            const c = cell.cellIndex;

            setRangeEnd({ r, c });
        };

        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                dragStartRef.current = null;
            }
        };

        table.addEventListener('mousedown', handleMouseDown);
        table.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            table.removeEventListener('mousedown', handleMouseDown);
            table.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isOpen, table, step, selType, selectedCells, isDragging]);

    const handleApplyFinalValue = () => {
        if (!table || !targetCell) {
            setError("Please select an answer cell to output the formula.");
            setStep('target_selection');
            return;
        }

        try {
            const rows = table.rows;
            const targetCellEl = rows[targetCell.r]?.cells[targetCell.c];
            if (!targetCellEl) {
                setError("Target cell could not be found.");
                return;
            }

            // Apply computed value to innerText
            // eslint-disable-next-line
            targetCellEl.innerText = String(liveResult);

            // Trigger document update/input events so editor state is synced
            const editorEl = targetCellEl.closest('.prodoc-editor');
            if (editorEl) {
                editorEl.dispatchEvent(new Event('input', { bubbles: true }));
            }

            onClose();
        } catch (err: any) {
            setError("Failed to apply final formula value.");
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Minimal Single-Line Floating Bar View for selection steps */}
            {step !== 'setup' && (
                <div className="fixed bottom-[17px] left-1/2 -translate-x-1/2 z-[100] w-full max-w-[360px] h-[41px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-2xl rounded-full px-2 py-1.5 sm:px-3 sm:py-2 flex items-center gap-2 sm:gap-3 animate-in slide-in-from-bottom-5 duration-300">
                    
                    {/* Function Badge (Fixed) */}
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        <div className="p-1.5 sm:p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                            <Calculator size={14} className="sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 hidden sm:block">
                            {isCustom ? 'Custom' : funcName}
                        </span>
                    </div>

                    <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 shrink-0" />

                    {/* Scrollable Center Section */}
                    <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar flex-1 min-w-0">
                        {/* Selection Info */}
                        <div className="flex items-center shrink-0 whitespace-nowrap">
                            {step === 'source_selection' ? (
                                selType === 'individual' ? (
                                    <span className="text-xs text-slate-600 dark:text-slate-400">
                                        {selectedCells.length > 0 ? (
                                            <><strong className="text-blue-600 dark:text-blue-400">{selectedCells.length} cells</strong> selected</>
                                        ) : (
                                            "Select cells..."
                                        )}
                                    </span>
                                ) : (
                                    <span className="text-xs text-slate-600 dark:text-slate-400">
                                        {rangeStart && rangeEnd ? (
                                            <>Range: <strong className="text-blue-600 dark:text-blue-400 font-mono">{getCellAddress(rangeStart.r, rangeStart.c)}:{getCellAddress(rangeEnd.r, rangeEnd.c)}</strong></>
                                        ) : (
                                            "Select range..."
                                        )}
                                    </span>
                                )
                            ) : (
                                <span className="text-xs text-slate-600 dark:text-slate-400">
                                    {targetCell ? (
                                        <>Target: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{getCellAddress(targetCell.r, targetCell.c)}</strong></>
                                    ) : (
                                        "Select empty cell..."
                                    )}
                                </span>
                            )}
                        </div>

                        {/* Live Result */}
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 bg-slate-50 dark:bg-slate-800 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-slate-100 dark:border-slate-700/50">
                            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">=</span>
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 max-w-[80px] sm:max-w-[120px] truncate" title={String(liveResult)}>
                                {liveResult}
                            </span>
                            {error && (
                                <span className="text-[10px] text-amber-500 max-w-[100px] truncate" title={error}>
                                    ({error})
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 shrink-0" />

                    {/* Actions (Fixed) */}
                    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                        <button
                            onClick={() => setStep('setup')}
                            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                            title="Back to settings"
                        >
                            <Undo2 size={14} />
                        </button>

                        {step === 'source_selection' ? (
                            <button
                                onClick={() => setStep('target_selection')}
                                disabled={selType === 'individual' ? selectedCells.length === 0 : (!rangeStart || !rangeEnd)}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 rounded-full flex items-center gap-1 shadow-sm transition-all shrink-0"
                            >
                                OK
                            </button>
                        ) : (
                            <button
                                onClick={handleApplyFinalValue}
                                disabled={!targetCell}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 rounded-full flex items-center gap-1 shadow-sm transition-all shrink-0"
                            >
                                Apply
                            </button>
                        )}

                        <button 
                            onClick={onClose} 
                            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* Step 1: Beautiful Initial Setup Dialog Box */}
            {step === 'setup' && (
                <>
                    {/* Standard Dialog backdrop */}
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[99]" onClick={onClose} />
                    
                    <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[100] w-[92vw] max-w-[420px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Title Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-md">
                                    <Calculator size={18} />
                                </div>
                                <div>
                                    <span className="font-bold text-slate-800 dark:text-slate-100 text-base block">Formula Engine</span>
                                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Excel-like operations on your table</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content Body */}
                        <div className="p-5 space-y-5">
                            {/* Choose Selection Type */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">1. Selection Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setSelType('range')}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 text-center transition-all ${selType === 'range' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300' : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'}`}
                                    >
                                        <Grid size={24} className="mb-2 text-blue-500" />
                                        <span className="text-xs font-bold block">Range Selection</span>
                                        <span className="text-[10px] text-slate-400 block mt-0.5">Click & drag cell blocks</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelType('individual')}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 text-center transition-all ${selType === 'individual' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300' : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'}`}
                                    >
                                        <Layers size={24} className="mb-2 text-indigo-500" />
                                        <span className="text-xs font-bold block">Individual Cells</span>
                                        <span className="text-[10px] text-slate-400 block mt-0.5">Pick specific cells</span>
                                    </button>
                                </div>
                            </div>

                            {/* Choose Math Operation */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">2. Function / Formula</label>
                                    <button 
                                        onClick={() => setIsCustom(!isCustom)}
                                        className="text-[11px] text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                        {isCustom ? "Select Function" : "Custom formula"}
                                    </button>
                                </div>

                                {isCustom ? (
                                    <input
                                        type="text"
                                        value={customFormula}
                                        onChange={(e) => setCustomFormula(e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="=A1*B2+100"
                                    />
                                ) : (
                                    <select
                                        value={funcName}
                                        onChange={(e) => setFuncName(e.target.value)}
                                        className="w-full px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                                    >
                                        <option value="SUM">SUM (Add numbers)</option>
                                        <option value="AVERAGE">AVERAGE (Mean value)</option>
                                        <option value="COUNT">COUNT (Count non-empty)</option>
                                        <option value="MAX">MAX (Maximum value)</option>
                                        <option value="MIN">MIN (Minimum value)</option>
                                        <option value="PRODUCT">PRODUCT (Multiply numbers)</option>
                                    </select>
                                )}
                            </div>

                            {/* Format results option */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">3. Formatting</label>
                                <select
                                    value={numberFormat}
                                    onChange={(e) => setNumberFormat(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-slate-100 focus:outline-none"
                                >
                                    <option value="">No Formatting (Standard decimal)</option>
                                    <option value="0">Integer (Whole number)</option>
                                    <option value="0.00">Two Decimal Places (0.00)</option>
                                    <option value="$">Currency Symbol ($)</option>
                                    <option value="%">Percentage Format (%)</option>
                                </select>
                            </div>
                        </div>

                        {/* Actions footer */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                            <button 
                                onClick={onClose} 
                                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setStep('source_selection')}
                                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-500/10 transition-all"
                            >
                                Start Cell Selection <MousePointer2 size={14} />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
