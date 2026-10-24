import { 
  Rows, Trash2, Merge, Split, 
  PaintBucket, Table as TableIcon, ArrowUp, ArrowDown, ArrowLeft, ArrowRight
} from 'lucide-react';
import { useEditor } from '../../../contexts/EditorContext';
import { StudioButton } from '../common/StudioButton';
import { StudioButtonGroup } from '../common/StudioButtonGroup';
import { StudioDivider } from '../common/StudioDivider';
import { StudioDropdown } from '../common/StudioDropdown';

const SHADING_COLORS = ['#f8fafc', '#f1f5f9', '#e2e8f0', '#fee2e2', '#fef3c7', '#dcfce7', '#e0e7ff', '#f3e8ff'];

export const TableStudioTray: React.FC = () => {
  const { editor } = useEditor();

  const addRowAbove = () => editor?.chain().focus().addRowBefore().run();
  const addRowBelow = () => editor?.chain().focus().addRowAfter().run();
  const addColLeft = () => editor?.chain().focus().addColumnBefore().run();
  const addColRight = () => editor?.chain().focus().addColumnAfter().run();
  const deleteRow = () => editor?.chain().focus().deleteRow().run();
  const deleteCol = () => editor?.chain().focus().deleteColumn().run();
  const deleteTable = () => editor?.chain().focus().deleteTable().run();
  const mergeCells = () => editor?.chain().focus().mergeCells().run();
  const splitCell = () => editor?.chain().focus().splitCell().run();
  const toggleHeaderRow = () => editor?.chain().focus().toggleHeaderRow().run();

  const setCellColor = (color: string) => {
    if (!editor) return;
    editor.chain().focus().setCellAttribute('style', `background-color: ${color}`).run();
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 overflow-x-auto no-scrollbar w-full bg-amber-50/20 dark:bg-amber-950/10">
      <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 mr-1 flex-shrink-0">
        <TableIcon size={14} />
        <span>Table Tools:</span>
      </div>

      {/* Row Operations */}
      <StudioButtonGroup ariaLabel="Row operations">
        <StudioButton
          icon={ArrowUp}
          label="Row Above"
          onClick={addRowAbove}
          title="Insert Row Above"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={ArrowDown}
          label="Row Below"
          onClick={addRowBelow}
          title="Insert Row Below"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Trash2}
          onClick={deleteRow}
          title="Delete Current Row"
          size="sm"
          variant="segmented"
          className="text-rose-600 hover:text-rose-700"
        />
      </StudioButtonGroup>

      <StudioDivider />

      {/* Column Operations */}
      <StudioButtonGroup ariaLabel="Column operations">
        <StudioButton
          icon={ArrowLeft}
          label="Col Left"
          onClick={addColLeft}
          title="Insert Column Left"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={ArrowRight}
          label="Col Right"
          onClick={addColRight}
          title="Insert Column Right"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Trash2}
          onClick={deleteCol}
          title="Delete Current Column"
          size="sm"
          variant="segmented"
          className="text-rose-600 hover:text-rose-700"
        />
      </StudioButtonGroup>

      <StudioDivider />

      {/* Cell Merging */}
      <StudioButtonGroup ariaLabel="Cell merge operations">
        <StudioButton
          icon={Merge}
          label="Merge"
          onClick={mergeCells}
          title="Merge Selected Cells"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Split}
          label="Split"
          onClick={splitCell}
          title="Split Merged Cell"
          size="sm"
          variant="segmented"
        />
      </StudioButtonGroup>

      <StudioDivider />

      {/* Shading Popover */}
      <StudioDropdown
        icon={PaintBucket}
        label="Cell Shading"
        size="sm"
        title="Background Color for Cell"
        customContent={(close) => (
          <div className="p-2 w-44">
            <div className="text-[11px] font-semibold text-slate-500 mb-1.5">Cell Color</div>
            <div className="grid grid-cols-4 gap-1.5">
              {SHADING_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => {
                    setCellColor(color);
                    close();
                  }}
                  className="w-6 h-6 rounded border border-slate-300 dark:border-slate-700 hover:scale-110 transition-transform cursor-pointer shadow-xs"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      />

      {/* Header Row Toggle */}
      <StudioButton
        icon={Rows}
        label="Header Row"
        onClick={toggleHeaderRow}
        title="Toggle Table Header Row"
        size="sm"
      />

      <StudioDivider />

      {/* Delete Entire Table */}
      <StudioButton
        icon={Trash2}
        label="Delete Table"
        onClick={deleteTable}
        title="Delete Entire Table"
        size="sm"
        className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
      />
    </div>
  );
};
