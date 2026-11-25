import React, { useState, useEffect, useRef } from 'react';
import { Link, Globe } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useInsertTab } from '../InsertTabContext';
import { DropdownButton } from '../common/InsertTools';
import { MenuPortal } from '../../../common/MenuPortal';

export const LinkTool: React.FC = () => {
  const { executeCommand } = useEditor();
  const { activeMenu, menuPos, triggerElement, closeMenu } = useInsertTab();
  const [url, setUrl] = useState('https://');
  const [linkText, setLinkText] = useState('');
  const savedRangeRef = useRef<Range | null>(null);
  const menuId = 'link_menu';

  useEffect(() => {
    if (activeMenu === menuId) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        savedRangeRef.current = sel.getRangeAt(0).cloneRange();
        setLinkText(sel.toString());
      } else {
        savedRangeRef.current = null;
        setLinkText('');
      }
      setUrl('https://');
    }
  }, [activeMenu]);

  const handleApplyLink = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = url.trim();
    if (!cleanUrl || cleanUrl === 'https://') return;

    const sel = window.getSelection();
    if (savedRangeRef.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }

    if (linkText.trim() && (!sel || sel.isCollapsed)) {
      const safeHref = cleanUrl.replace(/"/g, '&quot;');
      const safeLabel = linkText.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
      executeCommand('insertHTML', `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${safeLabel}</a>`);
    } else {
      executeCommand('createLink', cleanUrl);
    }
    closeMenu();
  };

  return (
    <>
         <DropdownButton 
             id={menuId} 
             icon={Link} 
             label="Link" 
             iconClassName="text-blue-600 dark:text-blue-400"
         />
         <MenuPortal id={menuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={260}>
             <form onSubmit={handleApplyLink} className="p-2.5 space-y-2">
                 <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                     <Globe size={13} className="text-blue-500" />
                     <span>Insert Hyperlink</span>
                 </div>
                 <div>
                     <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">Text to display</label>
                     <input
                       type="text"
                       value={linkText}
                       onChange={(e) => setLinkText(e.target.value)}
                       placeholder="Optional display text"
                       className="w-full px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-1 focus:ring-blue-500"
                     />
                 </div>
                 <div>
                     <label className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">Address (URL)</label>
                     <input
                       type="url"
                       value={url}
                       onChange={(e) => setUrl(e.target.value)}
                       placeholder="https://example.com"
                       autoFocus
                       className="w-full px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-1 focus:ring-blue-500"
                     />
                 </div>
                 <div className="flex justify-end gap-1.5 pt-1">
                     <button type="button" onClick={closeMenu} className="px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded">Cancel</button>
                     <button type="submit" className="px-2.5 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">Insert</button>
                 </div>
             </form>
         </MenuPortal>
    </>
  );
};
