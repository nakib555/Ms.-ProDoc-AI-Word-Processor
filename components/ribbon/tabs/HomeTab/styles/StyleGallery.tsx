import React from 'react';
import { useEditor } from '../../../../../contexts/EditorContext';

export const StyleGallery: React.FC = () => {
  const {
    executeCommand,
    applyBlockStyle,
    applyAdvancedStyle,
    customStyles,
    applyCustomStyle,
  } = useEditor();

  const applyBuiltInStyle = (styleName: string) => {
    switch (styleName) {
      case 'Normal':
        executeCommand('formatBlock', 'P');
        applyBlockStyle({ marginTop: '0pt', marginBottom: '8pt', lineHeight: '1.15' });
        applyAdvancedStyle({ fontSize: '11pt', fontWeight: '400', fontStyle: 'normal', color: '' });
        break;
      case 'No Spacing':
        executeCommand('formatBlock', 'P');
        applyBlockStyle({ marginTop: '0pt', marginBottom: '0pt', lineHeight: '1.0' });
        applyAdvancedStyle({ fontSize: '11pt', fontWeight: '400', fontStyle: 'normal', color: '' });
        break;
      case 'Heading 1':
        executeCommand('formatBlock', 'H1');
        applyBlockStyle({ marginTop: '12pt', marginBottom: '4pt', lineHeight: '1.15' });
        applyAdvancedStyle({ fontSize: '20pt', fontWeight: '300', fontStyle: 'normal', color: '#2563eb' });
        break;
      case 'Heading 2':
        executeCommand('formatBlock', 'H2');
        applyBlockStyle({ marginTop: '10pt', marginBottom: '4pt', lineHeight: '1.15' });
        applyAdvancedStyle({ fontSize: '16pt', fontWeight: '600', fontStyle: 'normal', color: '#2563eb' });
        break;
      case 'Title':
        executeCommand('formatBlock', 'H1');
        applyBlockStyle({ marginTop: '0pt', marginBottom: '6pt', lineHeight: '1.1' });
        applyAdvancedStyle({ fontSize: '28pt', fontWeight: '600', fontStyle: 'normal', color: '#0f172a' });
        break;
      case 'Subtitle':
        executeCommand('formatBlock', 'H3');
        applyBlockStyle({ marginTop: '0pt', marginBottom: '8pt', lineHeight: '1.15' });
        applyAdvancedStyle({ fontSize: '13pt', fontWeight: '400', fontStyle: 'italic', color: '#64748b' });
        break;
      case 'Quote':
        executeCommand('formatBlock', 'BLOCKQUOTE');
        applyBlockStyle({
          marginTop: '8pt',
          marginBottom: '8pt',
          paddingLeft: '12px',
          borderLeft: '3px solid #cbd5e1',
        });
        applyAdvancedStyle({ fontStyle: 'italic', color: '#475569' });
        break;
      case 'Emphasis':
        executeCommand('italic');
        applyAdvancedStyle({ fontStyle: 'italic', color: '#334155' });
        break;
    }
  };

  return (
    <div className="grid grid-rows-2 grid-flow-col gap-1 h-full overflow-x-auto max-w-[280px] px-1 no-scrollbar">
        {[
          { name: 'Normal', className: 'font-sans text-slate-800 dark:text-slate-200' },
          { name: 'No Spacing', className: 'font-sans leading-tight text-slate-800 dark:text-slate-200' },
          { name: 'Heading 1', className: 'text-blue-600 dark:text-blue-400 font-light text-lg' },
          { name: 'Heading 2', className: 'text-blue-600 dark:text-blue-400 font-semibold' },
          { name: 'Title', className: 'text-slate-900 dark:text-white text-xl font-medium' },
          { name: 'Subtitle', className: 'text-slate-500 dark:text-slate-400 font-normal italic' },
          { name: 'Quote', className: 'text-slate-600 dark:text-slate-300 border-l-2 border-slate-300 dark:border-slate-600 pl-2 italic' },
          { name: 'Emphasis', className: 'italic text-slate-700 dark:text-slate-300' },
        ].map((style) => (
            <button
                key={style.name}
                onClick={() => applyBuiltInStyle(style.name)}
                className="flex items-center px-3 min-w-[100px] h-[28px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm rounded-sm transition-all group overflow-hidden text-left"
            >
                <span className={`text-[11px] whitespace-nowrap overflow-hidden text-ellipsis ${style.className}`}>
                    {style.name}
                </span>
            </button>
        ))}
        
        {/* Render Custom Styles */}
        {customStyles.map((style) => (
             <button
                key={style.id}
                onClick={() => applyCustomStyle(style)}
                className="flex items-center px-3 min-w-[100px] h-[28px] bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/60 hover:bg-white dark:hover:bg-slate-700/60 hover:border-purple-400 hover:shadow-sm rounded-sm transition-all group overflow-hidden text-left"
            >
                <span 
                    className="text-[11px] whitespace-nowrap overflow-hidden text-ellipsis text-slate-800 dark:text-slate-100"
                    style={{ 
                        fontWeight: (style.styles as any).fontWeight,
                        fontStyle: (style.styles as any).fontStyle,
                        color: (style.styles as any).color,
                        textDecoration: (style.styles as any).textDecoration
                    }}
                >
                    {style.name}
                </span>
            </button>
        ))}
    </div>
  );
};