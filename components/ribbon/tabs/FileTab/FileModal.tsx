
import React, { Suspense } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useFileTab } from './FileTabContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Lazy Load Modals
const InfoModal = React.lazy(() => import('./modals/InfoModal').then(m => ({ default: m.InfoModal })));
const NewModal = React.lazy(() => import('./modals/NewModal').then(m => ({ default: m.NewModal })));
const OpenModal = React.lazy(() => import('./modals/OpenModal').then(m => ({ default: m.OpenModal })));
const PrintModal = React.lazy(() => import('./modals/PrintModal').then(m => ({ default: m.PrintModal })));
const ShareModal = React.lazy(() => import('./modals/ShareModal').then(m => ({ default: m.ShareModal })));

const ModalLoading = () => (
  <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-2">
    <LoadingSpinner className="w-8 h-8" />
    <span className="text-sm">Loading...</span>
  </div>
);

export const FileModal: React.FC = () => {
  const { activeModal, closeModal } = useFileTab();

  if (!activeModal) return null;

  const renderModalContent = () => {
    return (
      <Suspense fallback={<ModalLoading />}>
        {(() => {
          switch (activeModal) {
            case 'info': return <InfoModal />;
            case 'new': return <NewModal />;
            case 'open': return <OpenModal />;
            case 'save_as': return <PrintModal />;
            case 'print': return <PrintModal />;
            case 'share': return <ShareModal />;
            default: return null;
          }
        })()}
      </Suspense>
    );
  };

  const getTitle = () => {
      switch(activeModal) {
          case 'save_as': return 'Print & Export';
          case 'print': return 'Print & Export';
          default: return activeModal;
      }
  };

  const isPrint = activeModal === 'print' || activeModal === 'save_as';

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 no-print overscroll-contain"
      role="dialog"
      aria-modal="true"
      data-modal-backdrop="true"
      onClick={closeModal}
    >
      <div 
         className={`
             bg-white dark:bg-slate-900 w-full rounded-2xl sm:rounded-xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 border border-white/20 dark:border-slate-700 overflow-hidden
             ${isPrint ? 'h-[85dvh] max-h-[92dvh] max-w-[1600px]' : 'h-[82dvh] sm:h-auto max-h-[90dvh] sm:max-w-5xl'}
         `}
         onClick={e => e.stopPropagation()}
      >
        {/* Modal Header - Hide for Print as it has its own internal header if needed, or we allow full custom layout */}
        {!isPrint && (
            <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 capitalize flex items-center gap-2">
                {getTitle()}
            </h2>
            <button onClick={closeModal} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={20} />
            </button>
            </div>
        )}
        
        {/* Modal Content */}
        <div className={`min-h-0 bg-[#f8fafc] dark:bg-slate-950 scrollbar-thin scrollbar-thumb-slate-200 flex-1 ${isPrint ? 'p-0 overflow-hidden flex flex-col' : 'overflow-y-auto overscroll-contain p-3 sm:p-4 md:p-6 lg:p-8'}`}>
           {renderModalContent()}
        </div>
      </div>
    </div>,
    document.body
  );
};
