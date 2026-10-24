import { 
  Bold, Italic, Underline, Strikethrough, Subscript, Superscript,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Outdent, Indent,
  RemoveFormatting, CaseSensitive, Palette, Highlighter
} from 'lucide-react';
import { useEditor } from '../../../contexts/EditorContext';
import { StudioButton } from '../common/StudioButton';
import { StudioButtonGroup } from '../common/StudioButtonGroup';
import { StudioDivider } from '../common/StudioDivider';
import { StudioDropdown, StudioDropdownItem } from '../common/StudioDropdown';
import { FONTS, FONT_SIZES } from '../../../constants';

const PALETTE_COLORS = [
  '#000000', '#475569', '#dc2626', '#ea580c', '#d97706', 
  '#16a34a', '#0284c7', '#4f46e5', '#7c3aed', '#db2777'
];

const HIGHLIGHT_COLORS = [
  'transparent', '#fef08a', '#bbf7d0', '#bae6fd', '#fbcfe8', '#fed7aa', '#e2e8f0'
];

export const FormatTray: React.FC = () => {
  const { executeCommand, editor } = useEditor();
  const [currentFont, setCurrentFont] = useState('Inter');
  const [currentFontSize, setCurrentFontSize] = useState('11');
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    subscript: false,
    superscript: false,
    alignLeft: true,
    alignCenter: false,
    alignRight: false,
    alignJustify: false,
  });

  const checkFormats = () => {
    try {
      setActiveFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikethrough: document.queryCommandState('strikeThrough'),
        subscript: document.queryCommandState('subscript'),
        superscript: document.queryCommandState('superscript'),
        alignLeft: document.queryCommandState('justifyLeft'),
        alignCenter: document.queryCommandState('justifyCenter'),
        alignRight: document.queryCommandState('justifyRight'),
        alignJustify: document.queryCommandState('justifyFull'),
      });

      const font = document.queryCommandValue('fontName')?.replace(/['"]/g, '');
      if (font && FONTS.includes(font)) setCurrentFont(font);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.addEventListener('selectionchange', checkFormats);
    document.addEventListener('mouseup', checkFormats);
    document.addEventListener('keyup', checkFormats);
    return () => {
      document.removeEventListener('selectionchange', checkFormats);
      document.removeEventListener('mouseup', checkFormats);
      document.removeEventListener('keyup', checkFormats);
    };
  }, []);

  const handleFontChange = (font: string) => {
    setCurrentFont(font);
    document.execCommand('fontName', false, font);
  };

  const handleFontSizeChange = (size: string) => {
    setCurrentFontSize(size);
    // TipTap / Rich Text size
    if (editor) {
      editor.chain().focus().run();
      // Apply size via inline styling
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        document.execCommand('fontSize', false, '7');
        const fontElements = document.querySelectorAll('font[size="7"]');
        fontElements.forEach(el => {
          el.removeAttribute('size');
          (el as HTMLElement).style.fontSize = `${size}pt`;
        });
      }
    }
  };

  const adjustFontSize = (delta: number) => {
    const current = parseInt(currentFontSize, 10) || 11;
    const next = Math.max(6, Math.min(96, current + delta));
    handleFontSizeChange(String(next));
  };

  const transformCase = (type: 'upper' | 'lower' | 'capitalize' | 'sentence') => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const text = selection.toString();
    if (!text) return;

    let res = text;
    if (type === 'upper') res = text.toUpperCase();
    else if (type === 'lower') res = text.toLowerCase();
    else if (type === 'capitalize') res = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    else if (type === 'sentence') res = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());

    document.execCommand('insertText', false, res);
  };

  const fontItems: StudioDropdownItem[] = FONTS.map(font => ({
    id: font,
    label: font,
    onClick: () => handleFontChange(font),
  }));

  const headingItems: StudioDropdownItem[] = [
    {
      id: 'p',
      label: 'Normal Text',
      onClick: () => executeCommand('formatBlock', '<p>')
    },
    {
      id: 'h1',
      label: 'Heading 1',
      onClick: () => executeCommand('formatBlock', '<h1>')
    },
    {
      id: 'h2',
      label: 'Heading 2',
      onClick: () => executeCommand('formatBlock', '<h2>')
    },
    {
      id: 'h3',
      label: 'Heading 3',
      onClick: () => executeCommand('formatBlock', '<h3>')
    },
    {
      id: 'pre',
      label: 'Code Block',
      onClick: () => executeCommand('formatBlock', '<pre>')
    },
    {
      id: 'blockquote',
      label: 'Quote Block',
      onClick: () => executeCommand('formatBlock', '<blockquote>')
    }
  ];

  const lineSpacingItems: StudioDropdownItem[] = [
    { id: '1.0', label: 'Single (1.0)', onClick: () => editor?.commands.setContent(editor.getHTML()) },
    { id: '1.15', label: '1.15 Spacing', onClick: () => {} },
    { id: '1.5', label: '1.5 Spacing', onClick: () => {} },
    { id: '2.0', label: 'Double (2.0)', onClick: () => {} },
  ];

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 overflow-x-auto no-scrollbar w-full">
      {/* Font Family Selector */}
      <StudioDropdown
        label={currentFont}
        items={fontItems}
        size="sm"
        title="Font Family"
        className="min-w-[120px]"
        triggerClassName="w-full justify-between font-normal bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
      />

      {/* Font Size & Stepper */}
      <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-md bg-white dark:bg-slate-900 overflow-hidden flex-shrink-0">
        <button
          type="button"
          onClick={() => adjustFontSize(-1)}
          className="w-5 h-7 flex items-center justify-center text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Decrease Font Size"
        >
          -
        </button>
        <select
          value={currentFontSize}
          onChange={(e) => handleFontSizeChange(e.target.value)}
          className="h-7 text-xs font-medium px-1 bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer text-center"
        >
          {FONT_SIZES.map(sz => (
            <option key={sz} value={sz}>{sz}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => adjustFontSize(1)}
          className="w-5 h-7 flex items-center justify-center text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Increase Font Size"
        >
          +
        </button>
      </div>

      {/* Paragraph Style Dropdown */}
      <StudioDropdown
        label="Style"
        items={headingItems}
        size="sm"
        title="Heading / Paragraph Style"
        triggerClassName="font-normal border border-slate-200 dark:border-slate-800"
      />

      <StudioDivider />

      {/* Inline Formatting Segmented Group */}
      <StudioButtonGroup ariaLabel="Text formatting">
        <StudioButton
          icon={Bold}
          onClick={() => { executeCommand('bold'); checkFormats(); }}
          active={activeFormats.bold}
          title="Bold"
          shortcut="Ctrl+B"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Italic}
          onClick={() => { executeCommand('italic'); checkFormats(); }}
          active={activeFormats.italic}
          title="Italic"
          shortcut="Ctrl+I"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Underline}
          onClick={() => { executeCommand('underline'); checkFormats(); }}
          active={activeFormats.underline}
          title="Underline"
          shortcut="Ctrl+U"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Strikethrough}
          onClick={() => { executeCommand('strikeThrough'); checkFormats(); }}
          active={activeFormats.strikethrough}
          title="Strikethrough"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Subscript}
          onClick={() => { executeCommand('subscript'); checkFormats(); }}
          active={activeFormats.subscript}
          title="Subscript"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Superscript}
          onClick={() => { executeCommand('superscript'); checkFormats(); }}
          active={activeFormats.superscript}
          title="Superscript"
          size="sm"
          variant="segmented"
        />
      </StudioButtonGroup>

      <StudioDivider />

      {/* Text Color Popover */}
      <StudioDropdown
        icon={Palette}
        size="sm"
        title="Font Color"
        customContent={(close) => (
          <div className="p-2 w-48">
            <div className="text-[11px] font-semibold text-slate-500 mb-1.5">Color Palette</div>
            <div className="grid grid-cols-5 gap-1.5">
              {PALETTE_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => {
                    executeCommand('foreColor', color);
                    close();
                  }}
                  className="w-6 h-6 rounded-md border border-slate-200/60 dark:border-slate-700 hover:scale-110 transition-transform cursor-pointer shadow-xs"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      />

      {/* Highlight Color Popover */}
      <StudioDropdown
        icon={Highlighter}
        size="sm"
        title="Highlight Color"
        customContent={(close) => (
          <div className="p-2 w-44">
            <div className="text-[11px] font-semibold text-slate-500 mb-1.5">Highlight</div>
            <div className="grid grid-cols-4 gap-1.5">
              {HIGHLIGHT_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => {
                    executeCommand('hiliteColor', color);
                    close();
                  }}
                  className={`w-6 h-6 rounded-md border border-slate-300 dark:border-slate-700 hover:scale-110 transition-transform cursor-pointer shadow-xs ${color === 'transparent' ? 'relative bg-white text-[9px] text-slate-400 flex items-center justify-center font-bold' : ''}`}
                  style={{ backgroundColor: color }}
                  title={color === 'transparent' ? 'None' : color}
                >
                  {color === 'transparent' && '∅'}
                </button>
              ))}
            </div>
          </div>
        )}
      />

      {/* Text Case Menu */}
      <StudioDropdown
        icon={CaseSensitive}
        size="sm"
        title="Change Case"
        items={[
          { id: 'sentence', label: 'Sentence case', onClick: () => transformCase('sentence') },
          { id: 'lower', label: 'lowercase', onClick: () => transformCase('lower') },
          { id: 'upper', label: 'UPPERCASE', onClick: () => transformCase('upper') },
          { id: 'cap', label: 'Capitalize Each Word', onClick: () => transformCase('capitalize') },
        ]}
      />

      {/* Clear Formatting */}
      <StudioButton
        icon={RemoveFormatting}
        onClick={() => executeCommand('removeFormat')}
        title="Clear Formatting"
        size="sm"
      />

      <StudioDivider />

      {/* Paragraph Alignment Segmented Group */}
      <StudioButtonGroup ariaLabel="Text alignment">
        <StudioButton
          icon={AlignLeft}
          onClick={() => { executeCommand('justifyLeft'); checkFormats(); }}
          active={activeFormats.alignLeft}
          title="Align Left"
          shortcut="Ctrl+L"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={AlignCenter}
          onClick={() => { executeCommand('justifyCenter'); checkFormats(); }}
          active={activeFormats.alignCenter}
          title="Align Center"
          shortcut="Ctrl+E"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={AlignRight}
          onClick={() => { executeCommand('justifyRight'); checkFormats(); }}
          active={activeFormats.alignRight}
          title="Align Right"
          shortcut="Ctrl+R"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={AlignJustify}
          onClick={() => { executeCommand('justifyFull'); checkFormats(); }}
          active={activeFormats.alignJustify}
          title="Justify"
          shortcut="Ctrl+J"
          size="sm"
          variant="segmented"
        />
      </StudioButtonGroup>

      {/* Line Spacing Dropdown */}
      <StudioDropdown
        label="Spacing"
        items={lineSpacingItems}
        size="sm"
        title="Line Spacing"
        triggerClassName="border border-slate-200 dark:border-slate-800"
      />

      <StudioDivider />

      {/* Lists & Indent */}
      <StudioButtonGroup ariaLabel="Lists and indent">
        <StudioButton
          icon={List}
          onClick={() => executeCommand('insertUnorderedList')}
          title="Bullet List"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={ListOrdered}
          onClick={() => executeCommand('insertOrderedList')}
          title="Numbered List"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Outdent}
          onClick={() => executeCommand('outdent')}
          title="Decrease Indent"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Indent}
          onClick={() => executeCommand('indent')}
          title="Increase Indent"
          size="sm"
          variant="segmented"
        />
      </StudioButtonGroup>
    </div>
  );
};
