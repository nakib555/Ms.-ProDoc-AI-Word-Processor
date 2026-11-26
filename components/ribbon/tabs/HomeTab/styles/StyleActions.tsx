import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, MoreHorizontal, Eraser } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useHomeTab } from '../HomeTabContext';
import { MenuPortal } from '../../../common/MenuPortal';

const BUILTIN_STYLES = ['Normal', 'No Spacing', 'Heading 1', 'Heading 2', 'Title', 'Subtitle', 'Quote', 'Emphasis'];

export const StyleActions: React.FC = () => {
  const { addCustomStyle, customStyles, applyCustomStyle, executeCommand, applyBlockStyle, applyAdvancedStyle } = useEditor();
  const { activeMenu, toggleMenu, closeMenu, menuPos, triggerElement, registerTrigger } = useHomeTab();
  const [showStyleDialog, setShowStyleDialog] = useState(false);
  const [newStyleName, setNewStyleName] = useState('');
  const menuId = 'styles_more';

  const handleCreateStyle = () => {
    if (newStyleName.trim()) {
        addCustomStyle(newStyleName);
        setNewStyleName('');
        setShowStyleDialog(false);
    }
  };

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
        applyBlockStyle({ marginTop: '8pt', marginBottom: '8pt', paddingLeft: '12px', borderLeft: '3px solid #cbd5e1' });
        applyAdvancedStyle({ fontStyle: 'italic', color: '#475569' });
        break;
      case 'Emphasis':
        executeCommand('italic');
        applyAdvancedStyle({ fontStyle: 'italic', color: '#334155' });
        break;
    }
    closeMenu();
  };

  return (
    <>
        <div className="flex flex-col gap-1 h-full border-l border-slate-200 dark:border-slate-700 pl-1">
             <button 
                className="h-6 w-6 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 rounded-sm transition-colors"
                title="Create New Style"
                onClick={() => setShowStyleDialog(true)}
             >
                <Plus size={12} />
             </button>
             <button
                ref={(el) => registerTrigger(menuId, el)}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => { e.stopPropagation(); toggleMenu(menuId); }}
                title="More Styles & Actions"
                className={`h-6 w-6 flex items-center justify-center rounded-sm transition-colors ${activeMenu === menuId ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/60'}`}
             >
                <MoreHorizontal size={12} />
             </button>
        </div>

        <MenuPortal id={menuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={220}>
          <div className="p-1.5 max-h-[62dvh] overflow-y-auto">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 py-1">Quick Styles</div>
            <div className="grid grid-cols-2 gap-1 mb-1.5">
              {BUILTIN_STYLES.map((name) => (
                <button
                  key={name}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applyBuiltInStyle(name)}
                  className="text-left px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700/60 text-xs text-slate-700 dark:text-slate-200 truncate border border-slate-100 dark:border-slate-700/60"
                >
                  {name}
                </button>
              ))}
            </div>
            {customStyles.length > 0 && (
              <>
                <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 py-1">Custom Styles</div>
                {customStyles.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => { applyCustomStyle(st); closeMenu(); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-purple-50 dark:hover:bg-purple-900/30 text-xs text-slate-700 dark:text-slate-200 truncate"
                  >
                    {st.name}
                  </button>
                ))}
              </>
            )}
            <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { executeCommand('removeFormat'); closeMenu(); }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700/60 text-xs text-slate-600 dark:text-slate-300"
            >
              <Eraser size={12} /> Clear Formatting
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { closeMenu(); setShowStyleDialog(true); }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs text-blue-600 dark:text-blue-400 font-medium"
            >
              <Plus size={12} /> Create a Style...
            </button>
          </div>
        </MenuPortal>

        {/* Create Style Dialog */}
        {showStyleDialog && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in overscroll-contain"
          role="dialog"
          aria-modal="true"
          data-modal-backdrop="true"
          onClick={() => setShowStyleDialog(false)}
        >
             <div
               className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-xs max-h-[90dvh] overflow-y-auto animate-in zoom-in-95 border border-slate-200 dark:border-slate-700"
               onClick={(e) => e.stopPropagation()}
             >
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Create New Style</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Name</label>
                        <input 
                            type="text" 
                            value={newStyleName}
                            onChange={(e) => setNewStyleName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCreateStyle()}
                            className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="My Custom Style"
                            autoFocus
                        />
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-md border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                        This will save the current font, size, color, and style properties of your selection as a reusable style.
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <button onClick={() => setShowStyleDialog(false)} className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">Cancel</button>
                        <button onClick={handleCreateStyle} className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors">Create</button>
                    </div>
                </div>
             </div>
        </div>,
        document.body
        )}
    </>
  );
};
