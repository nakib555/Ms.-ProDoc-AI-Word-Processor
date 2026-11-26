import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Video } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const OnlineVideoTool: React.FC = () => {
  const { executeCommand, showToast } = useEditor();
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const savedRangeRef = useRef<Range | null>(null);

  const openModal = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    } else {
      savedRangeRef.current = null;
    }
    setUrl('');
    setShowModal(true);
  };

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    let videoId = '';
    if (trimmed.includes('watch?v=')) videoId = trimmed.split('watch?v=')[1].split('&')[0];
    else if (trimmed.includes('youtu.be/')) videoId = trimmed.split('youtu.be/')[1].split('?')[0];

    if (!videoId || !/^[a-zA-Z0-9_-]{6,20}$/.test(videoId)) {
      showToast('Please enter a valid YouTube video URL.', 'warning');
      return;
    }

    const sel = window.getSelection();
    if (savedRangeRef.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }

    const html = `<div style="margin: 1em 0;"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><p><br/></p>`;
    executeCommand('insertHTML', html);
    setShowModal(false);
  };

  return (
    <>
     <RibbonButton 
         icon={Video} 
         label="Online Video" 
         onClick={openModal} 
         title="Embed YouTube Video"
     />
     {showModal && createPortal(
       <div
         className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in overscroll-contain"
         role="dialog"
         aria-modal="true"
         data-modal-backdrop="true"
         onClick={() => setShowModal(false)}
       >
         <form
           onSubmit={handleInsert}
           onClick={(e) => e.stopPropagation()}
           className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl p-4 sm:p-5 w-full max-w-sm max-h-[90dvh] overflow-y-auto space-y-3"
         >
           <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Insert Online Video</h3>
           <div>
             <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">YouTube URL</label>
             <input
               type="url"
               value={url}
               onChange={(e) => setUrl(e.target.value)}
               placeholder="https://www.youtube.com/watch?v=..."
               autoFocus
               className="w-full px-3 py-1.5 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
             />
           </div>
           <div className="flex justify-end gap-2 pt-1">
             <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
               Cancel
             </button>
             <button type="submit" className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
               Embed Video
             </button>
           </div>
         </form>
       </div>,
       document.body
     )}
    </>
  );
};
