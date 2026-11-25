import React, { useState, useEffect, useCallback } from 'react';
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

const LINE_SPACING_OPTIONS = [
  { id: '1.0', label: 'Single (1.0)', value: '1' },
  { id: '1.15', label: '1.15 Spacing', value: '1.15' },
  { id: '1.5', label: '1.5 Spacing', value: '1.5' },
  { id: '2.0', label: 'Double (2.0)', value: '2' },
];

export const FormatTray: React.FC = () => {
  const { executeCommand, applyBlockStyle, editor } = useEditor();
  const [currentFont, setCurrentFont] = useState('Inter');
  const [currentFontSize, setCurrentFontSize] = useState('11');
  const [activeBlockTag, setActiveBlockTag] = useState('p');
  const [activeLineSpacing, setActiveLineSpacing] = useState('1.15');
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
    bulletList: false,
    orderedList: false,
  });

  const checkFormats = useCallback(() => {
    try {
      const safeState = (cmd: string) => {
        try {
          return document.queryCommandState(cmd);
        } catch {
          return false;
        }
      };

      const isAlignCenter = editor ? editor.isActive({ textAlign: 'center' }) : safeState('justifyCenter');
      const isAlignRight = editor ? editor.isActive({ textAlign: 'right' }) : safeState('justifyRight');
      const isAlignJustify = editor ? editor.isActive({ textAlign: 'justify' }) : safeState('justifyFull');
      const isAlignLeft = editor
        ? editor.isActive({ textAlign: 'left' }) || (!isAlignCenter && !isAlignRight && !isAlignJustify)
        : safeState('justifyLeft') || (!isAlignCenter && !isAlignRight && !isAlignJustify);

      setActiveFormats({
        bold: editor ? editor.isActive('bold') : safeState('bold'),
        italic: editor ? editor.isActive('italic') : safeState('italic'),
        underline: editor ? editor.isActive('underline') : safeState('underline'),
        strikethrough: editor ? editor.isActive('strike') : safeState('strikeThrough'),
        subscript: editor ? editor.isActive('subscript') : safeState('subscript'),
        superscript: editor ? editor.isActive('superscript') : safeState('superscript'),
        alignLeft: isAlignLeft,
        alignCenter: isAlignCenter,
        alignRight: isAlignRight,
        alignJustify: isAlignJustify,
        bulletList: editor ? editor.isActive('bulletList') : safeState('insertUnorderedList'),
        orderedList: editor ? editor.isActive('orderedList') : safeState('insertOrderedList'),
      });

      if (editor) {
        if (editor.isActive('heading', { level: 1 })) setActiveBlockTag('h1');
        else if (editor.isActive('heading', { level: 2 })) setActiveBlockTag('h2');
        else if (editor.isActive('heading', { level: 3 })) setActiveBlockTag('h3');
        else if (editor.isActive('codeBlock')) setActiveBlockTag('pre');
        else if (editor.isActive('blockquote')) setActiveBlockTag('blockquote');
        else setActiveBlockTag('p');

        const attrs = editor.getAttributes('textStyle');
        if (attrs?.fontFamily) {
          const clean = String(attrs.fontFamily).replace(/['"]/g, '').split(',')[0].trim();
          if (FONTS.includes(clean)) setCurrentFont(clean);
        }
        if (attrs?.fontSize) {
          const parsed = String(attrs.fontSize).replace(/pt|px/gi, '').trim();
          if (parsed) setCurrentFontSize(parsed);
        }
      } else {
        const font = document.queryCommandValue('fontName')?.replace(/['"]/g, '');
        if (font && FONTS.includes(font)) setCurrentFont(font);
      }

      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const anchorNode = sel.anchorNode;
        const el = anchorNode?.nodeType === Node.ELEMENT_NODE
          ? (anchorNode as HTMLElement)
          : anchorNode?.parentElement;
        const block = el?.closest('p, h1, h2, h3, li, blockquote, pre') as HTMLElement | null;
        if (block?.style.lineHeight) {
          setActiveLineSpacing(block.style.lineHeight);
        }
      }
    } catch {
      // ignore
    }
  }, [editor]);

  useEffect(() => {
    document.addEventListener('selectionchange', checkFormats);
    document.addEventListener('mouseup', checkFormats);
    document.addEventListener('keyup', checkFormats);
    editor?.on('selectionUpdate', checkFormats);
    editor?.on('transaction', checkFormats);
    checkFormats();
    return () => {
      document.removeEventListener('selectionchange', checkFormats);
      document.removeEventListener('mouseup', checkFormats);
      document.removeEventListener('keyup', checkFormats);
      editor?.off('selectionUpdate', checkFormats);
      editor?.off('transaction', checkFormats);
    };
  }, [checkFormats, editor]);

  const handleFontChange = (font: string) => {
    setCurrentFont(font);
    executeCommand('fontName', font);
  };

  const handleFontSizeChange = (size: string) => {
    setCurrentFontSize(size);
    if (editor) {
      editor.chain().focus().run();
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        document.execCommand('fontSize', false, '7');
        const fontElements = document.querySelectorAll('font[size="7"]');
        fontElements.forEach(el => {
          el.removeAttribute('size');
          (el as HTMLElement).style.fontSize = `${size}pt`;
        });
      }
    } else {
      executeCommand('fontSize', size);
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
    active: currentFont === font,
    onClick: () => handleFontChange(font),
  }));

  const fontSizeItems: StudioDropdownItem[] = FONT_SIZES.map(sz => ({
    id: String(sz),
    label: `${sz} pt`,
    active: String(sz) === String(currentFontSize),
    onClick: () => handleFontSizeChange(String(sz)),
  }));

  const headingItems: StudioDropdownItem[] = [
    {
      id: 'p',
      label: 'Normal Text',
      active: activeBlockTag === 'p',
      onClick: () => { setActiveBlockTag('p'); executeCommand('formatBlock', '<p>'); }
    },
    {
      id: 'h1',
      label: 'Heading 1',
      active: activeBlockTag === 'h1',
      onClick: () => { setActiveBlockTag('h1'); executeCommand('formatBlock', '<h1>'); }
    },
    {
      id: 'h2',
      label: 'Heading 2',
      active: activeBlockTag === 'h2',
      onClick: () => { setActiveBlockTag('h2'); executeCommand('formatBlock', '<h2>'); }
    },
    {
      id: 'h3',
      label: 'Heading 3',
      active: activeBlockTag === 'h3',
      onClick: () => { setActiveBlockTag('h3'); executeCommand('formatBlock', '<h3>'); }
    },
    {
      id: 'pre',
      label: 'Code Block',
      active: activeBlockTag === 'pre',
      onClick: () => { setActiveBlockTag('pre'); executeCommand('formatBlock', '<pre>'); }
    },
    {
      id: 'blockquote',
      label: 'Quote Block',
      active: activeBlockTag === 'blockquote',
      onClick: () => { setActiveBlockTag('blockquote'); executeCommand('formatBlock', '<blockquote>'); }
    }
  ];

  const activeHeadingLabel = headingItems.find(h => h.id === activeBlockTag)?.label || 'Normal Text';

  const lineSpacingItems: StudioDropdownItem[] = LINE_SPACING_OPTIONS.map(opt => ({
    id: opt.id,
    label: opt.label,
    active: activeLineSpacing === opt.value || activeLineSpacing === opt.id,
    onClick: () => {
      setActiveLineSpacing(opt.value);
      applyBlockStyle({ lineHeight: opt.value });
    },
  }));

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 overflow-x-auto no-scrollbar w-full">
      {/* Font Family Selector */}
      <StudioDropdown
        label={currentFont}
        items={fontItems}
        searchable
        searchPlaceholder="Search fonts..."
        size="sm"
        title="Font Family"
        className="min-w-[126px]"
        triggerClassName="w-full justify-between font-normal bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
      />

      {/* Font Size & Stepper */}
      <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-md bg-white dark:bg-slate-900 overflow-hidden flex-shrink-0">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => adjustFontSize(-1)}
          className="w-6 h-7 flex items-center justify-center text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Decrease Font Size"
          aria-label="Decrease Font Size"
        >
          -
        </button>
        <StudioDropdown
          label={currentFontSize}
          items={fontSizeItems}
          size="sm"
          title="Font Size"
          menuClassName="min-w-[110px]"
          triggerClassName="border-x border-slate-200 dark:border-slate-800 rounded-none px-1.5 min-w-[46px] justify-center font-medium"
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => adjustFontSize(1)}
          className="w-6 h-7 flex items-center justify-center text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Increase Font Size"
          aria-label="Increase Font Size"
        >
          +
        </button>
      </div>

      {/* Paragraph Style Dropdown */}
      <StudioDropdown
        label={activeHeadingLabel}
        items={headingItems}
        size="sm"
        title="Heading / Paragraph Style"
        triggerClassName="font-normal border border-slate-200 dark:border-slate-800 min-w-[104px] justify-between"
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
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    executeCommand('foreColor', color);
                    close();
                  }}
                  className="w-6 h-6 rounded-md border border-slate-200/60 dark:border-slate-700 hover:scale-110 transition-transform cursor-pointer shadow-xs"
                  style={{ backgroundColor: color }}
                  title={color}
                  aria-label={`Set font color ${color}`}
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
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    executeCommand('hiliteColor', color);
                    close();
                  }}
                  className={`w-6 h-6 rounded-md border border-slate-300 dark:border-slate-700 hover:scale-110 transition-transform cursor-pointer shadow-xs ${color === 'transparent' ? 'relative bg-white text-[9px] text-slate-400 flex items-center justify-center font-bold' : ''}`}
                  style={{ backgroundColor: color }}
                  title={color === 'transparent' ? 'None' : color}
                  aria-label={color === 'transparent' ? 'Clear highlight' : `Set highlight ${color}`}
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
        label={`Spacing (${activeLineSpacing})`}
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
          onClick={() => { executeCommand('insertUnorderedList'); checkFormats(); }}
          active={activeFormats.bulletList}
          title="Bullet List"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={ListOrdered}
          onClick={() => { executeCommand('insertOrderedList'); checkFormats(); }}
          active={activeFormats.orderedList}
          title="Numbered List"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Outdent}
          onClick={() => { executeCommand('outdent'); checkFormats(); }}
          title="Decrease Indent"
          size="sm"
          variant="segmented"
        />
        <StudioButton
          icon={Indent}
          onClick={() => { executeCommand('indent'); checkFormats(); }}
          title="Increase Indent"
          size="sm"
          variant="segmented"
        />
      </StudioButtonGroup>
    </div>
  );
};
