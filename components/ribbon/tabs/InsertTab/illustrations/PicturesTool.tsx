import React, { useRef, useState } from 'react';
import { Image, Laptop, Globe, Table as TableIcon, Sparkles, AlignLeft } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useInsertTab } from '../InsertTabContext';
import { DropdownButton } from '../common/InsertTools';
import { MenuPortal } from '../../../common/MenuPortal';
import { ImageContentExtractionModal } from '../../../../ImageContentExtractionModal';
import { extractContentFromImage } from '../../../../../utils/imageContentExtractor';

export const PicturesTool: React.FC = () => {
  const { executeCommand } = useEditor();
  const { activeMenu, menuPos, closeMenu } = useInsertTab();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'document' | 'table' | 'text'>('document');
  const [isTranscribing, setIsTranscribing] = useState(false);

  const openTranscriptionModal = (mode: 'document' | 'table' | 'text') => {
    setModalMode(mode);
    setModalOpen(true);
    closeMenu();
  };

  const handleQuickFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsTranscribing(true);
      try {
        // Extract content from image without inserting the raw image raster itself
        const result = await extractContentFromImage(file, { mode: modalMode });
        if (result.html) {
          executeCommand('insertHTML', result.html);
        }
      } catch (err) {
        console.error('Failed to transcribe picture directly:', err);
        // Fallback: open modal for user review
        setModalOpen(true);
      } finally {
        setIsTranscribing(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  const handleInsertExtractedContent = (html: string) => {
    executeCommand('insertHTML', html);
  };

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleQuickFileSelect} 
      />

      <DropdownButton 
        id="pictures_menu" 
        icon={Image} 
        label={isTranscribing ? "Transcribing..." : "Pictures"} 
        iconClassName="text-indigo-600 dark:text-indigo-400"
      />

      <MenuPortal id="pictures_menu" activeMenu={activeMenu} menuPos={menuPos} closeMenu={closeMenu}>
        <div className="p-1 min-w-[240px]">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Transcribe to Editable Content
          </div>

          <button 
            onClick={() => openTranscriptionModal('document')} 
            className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-center group transition-colors"
          >
            <Sparkles size={15} className="mr-2.5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform"/> 
            <span>Transcribe Picture to Document...</span>
          </button>

          <button 
            onClick={() => openTranscriptionModal('table')} 
            className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center group transition-colors"
          >
            <TableIcon size={15} className="mr-2.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform"/> 
            <span>Extract Table from Picture...</span>
          </button>

          <button 
            onClick={() => openTranscriptionModal('text')} 
            className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center group transition-colors"
          >
            <AlignLeft size={15} className="mr-2.5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"/> 
            <span>Extract Text Only from Picture...</span>
          </button>

          <div className="my-1 border-t border-slate-200 dark:border-slate-800" />

          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Quick Import Sources
          </div>

          <button 
            onClick={() => {
              setModalMode('document');
              fileInputRef.current?.click();
              closeMenu();
            }} 
            className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-300 flex items-center group transition-colors"
          >
            <Laptop size={14} className="mr-2.5 text-slate-500 group-hover:text-indigo-600"/> 
            <span>From Device (Auto Transcribe)</span>
          </button>

          <button 
            onClick={() => openTranscriptionModal('document')} 
            className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-300 flex items-center group transition-colors"
          >
            <Globe size={14} className="mr-2.5 text-slate-500 group-hover:text-emerald-600"/> 
            <span>Online Picture URL...</span>
          </button>
        </div>
      </MenuPortal>

      {/* Transcription & Extraction Modal */}
      <ImageContentExtractionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onInsertContent={handleInsertExtractedContent}
        initialMode={modalMode}
      />
    </>
  );
};

export default PicturesTool;
