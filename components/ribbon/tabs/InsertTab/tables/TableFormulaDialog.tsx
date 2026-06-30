import React, { useState, useEffect } from 'react';
import { Parser } from 'hot-formula-parser';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Calculator, ArrowRight } from 'lucide-react';

interface TableFormulaDialogProps {
    isOpen: boolean;
    onClose: () => void;
    table: HTMLTableElement | null;
    activeCell: HTMLTableCellElement | null;
}

export const TableFormulaDialog: React.FC<TableFormulaDialogProps> = ({ isOpen, onClose, table, activeCell }) => {
    const [formula, setFormula] = useState('=SUM(ABOVE)');
    const [numberFormat, setNumberFormat] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setFormula('=SUM(ABOVE)');
            setError(null);
        }
    }, [isOpen]);

    const getColumnName = (colIndex: number) => {
        let name = '';
        let num = colIndex;
        while (num >= 0) {
            name = String.fromCharCode(65 + (num % 26)) + name;
            num = Math.floor(num / 26) - 1;
        }
        return name;
    };

    const parseCellAddress = (address: string) => {
        const match = address.match(/^([A-Za-z]+)([0-9]+)$/);
        if (!match) return null;
        
        const colStr = match[1].toUpperCase();
        let col = 0;
        for (let i = 0; i < colStr.length; i++) {
            col = col * 26 + (colStr.charCodeAt(i) - 64);
        }
        col -= 1; // 0-indexed
        
        const row = parseInt(match[2], 10) - 1; // 0-indexed
        return { row, col };
    };

    const extractTableData = (tableEl: HTMLTableElement) => {
        const data: number[][] = [];
        const rows = tableEl.rows;
        for (let r = 0; r < rows.length; r++) {
            const rowData: number[] = [];
            const cells = rows[r].cells;
            for (let c = 0; c < cells.length; c++) {
                const valStr = cells[c].innerText.replace(/[^0-9.-]/g, '');
                const val = parseFloat(valStr);
                rowData.push(isNaN(val) ? 0 : val);
            }
            data.push(rowData);
        }
        return data;
    };

    const handleApply = () => {
        if (!table || !activeCell) {
            setError("No table or cell selected.");
            return;
        }

        const data = extractTableData(table);
        const parser = new Parser();
        
        // Define a function to get cell value
        parser.on('callCellValue', (cellCoord: any, done: any) => {
            const r = cellCoord.row.index;
            const c = cellCoord.column.index;
            if (r >= 0 && r < data.length && c >= 0 && c < data[r].length) {
                done(data[r][c]);
            } else {
                done(null);
            }
        });

        parser.on('callRangeValue', (startCellCoord: any, endCellCoord: any, done: any) => {
            const fragment: any[] = [];
            for (let r = startCellCoord.row.index; r <= endCellCoord.row.index; r++) {
                const rowFragment: any[] = [];
                for (let c = startCellCoord.column.index; c <= endCellCoord.column.index; c++) {
                    if (r >= 0 && r < data.length && c >= 0 && c < data[r].length) {
                        rowFragment.push(data[r][c]);
                    } else {
                        rowFragment.push(null);
                    }
                }
                fragment.push(rowFragment);
            }
            done(fragment);
        });

        // Handle special words like ABOVE, LEFT, BELOW, RIGHT (Common in word processors)
        let formulaStr = formula.toUpperCase();
        if (formulaStr.startsWith('=')) {
            formulaStr = formulaStr.substring(1);
        }

        const activeRowIndex = (activeCell.parentNode as HTMLTableRowElement).rowIndex;
        const activeColIndex = activeCell.cellIndex;

        formulaStr = formulaStr.replace(/ABOVE/g, () => {
            if (activeRowIndex === 0) return '0';
            const colName = getColumnName(activeColIndex);
            return `${colName}1:${colName}${activeRowIndex}`;
        });

        formulaStr = formulaStr.replace(/BELOW/g, () => {
            if (activeRowIndex >= data.length - 1) return '0';
            const colName = getColumnName(activeColIndex);
            return `${colName}${activeRowIndex + 2}:${colName}${data.length}`;
        });

        formulaStr = formulaStr.replace(/LEFT/g, () => {
            if (activeColIndex === 0) return '0';
            const startCol = getColumnName(0);
            const endCol = getColumnName(activeColIndex - 1);
            const rowStr = activeRowIndex + 1;
            return `${startCol}${rowStr}:${endCol}${rowStr}`;
        });

        formulaStr = formulaStr.replace(/RIGHT/g, () => {
            if (activeColIndex >= data[activeRowIndex].length - 1) return '0';
            const startCol = getColumnName(activeColIndex + 1);
            const endCol = getColumnName(data[activeRowIndex].length - 1);
            const rowStr = activeRowIndex + 1;
            return `${startCol}${rowStr}:${endCol}${rowStr}`;
        });

        const result = parser.parse(formulaStr);

        if (result.error) {
            setError(`Error: ${result.error}`);
            return;
        }

        let formattedResult = result.result;
        
        // Basic number formatting
        if (numberFormat && typeof result.result === 'number') {
            if (numberFormat.includes('%')) {
                formattedResult = (result.result * 100).toFixed(2) + '%';
            } else if (numberFormat.includes('$')) {
                formattedResult = '$' + result.result.toFixed(2);
            } else if (numberFormat === '0.00') {
                formattedResult = result.result.toFixed(2);
            } else if (numberFormat === '0') {
                formattedResult = Math.round(result.result).toString();
            }
        }

        // eslint-disable-next-line
        activeCell.innerText = String(formattedResult);
        
        // Trigger editor update
        const editorEl = activeCell.closest('.prodoc-editor');
        if (editorEl) {
            editorEl.dispatchEvent(new Event('input', { bubbles: true }));
        }

        onClose();
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 z-[100]" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-[101] max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-5 shadow-2xl focus:outline-none dark:bg-slate-800 border dark:border-slate-700">
                    <Dialog.Title className="flex items-center justify-between mb-4 text-base font-semibold text-slate-800 dark:text-slate-100">
                        <div className="flex items-center gap-2">
                            <Calculator size={18} className="text-blue-600" />
                            Formula
                        </div>
                        <Dialog.Close asChild>
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                <X size={18} />
                            </button>
                        </Dialog.Close>
                    </Dialog.Title>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                                Formula
                            </label>
                            <input
                                type="text"
                                value={formula}
                                onChange={(e) => setFormula(e.target.value)}
                                className="w-full px-3 py-2 text-sm border rounded bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="=SUM(ABOVE)"
                            />
                            <p className="text-[10px] text-slate-500 mt-1">
                                Try =SUM(ABOVE), =AVERAGE(LEFT), or =A1+B2
                            </p>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                                Number format
                            </label>
                            <select
                                value={numberFormat}
                                onChange={(e) => setNumberFormat(e.target.value)}
                                className="w-full px-3 py-2 text-sm border rounded bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">(none)</option>
                                <option value="0">0</option>
                                <option value="0.00">0.00</option>
                                <option value="$#,##0.00">$#,##0.00</option>
                                <option value="0.00%">0.00%</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                                Paste function
                            </label>
                            <select
                                onChange={(e) => {
                                    if (e.target.value) {
                                        setFormula(`=${e.target.value}()`);
                                    }
                                }}
                                className="w-full px-3 py-2 text-sm border rounded bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Paste a function...</option>
                                <option value="SUM">SUM</option>
                                <option value="AVERAGE">AVERAGE</option>
                                <option value="COUNT">COUNT</option>
                                <option value="MAX">MAX</option>
                                <option value="MIN">MIN</option>
                                <option value="PRODUCT">PRODUCT</option>
                            </select>
                        </div>

                        {error && (
                            <div className="text-red-500 text-xs bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-2">
                        <Dialog.Close asChild>
                            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded dark:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                                Cancel
                            </button>
                        </Dialog.Close>
                        <button
                            onClick={handleApply}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors flex items-center gap-2"
                        >
                            Apply <ArrowRight size={14} />
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
