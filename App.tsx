
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Ribbon from './components/Ribbon';
import Editor from './components/Editor';
import StatusBar from './components/StatusBar';
import { ReadModeToolbar } from './components/ribbon/tabs/ViewTab/views/ReadMode/ReadModeToolbar';
import { MobileSelectionToolbar } from './components/MobileSelectionToolbar';
import { CommentsSidebar } from './components/CommentsSidebar';
import { NotesSidebar } from './components/NotesSidebar';
import { JsonDocInspectorSidebar } from './components/JsonDocInspectorSidebar';
import { RibbonTab } from './types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { EditorProvider, useEditor } from './contexts/EditorContext';
import { DocumentModelProvider } from './contexts/DocumentModelContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PageSetupDialog } from './components/ribbon/tabs/LayoutTab/page_setup/Margins/CustomMargin/PageSetupDialog';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RibbonTab | null>(RibbonTab.HOME);
  const { viewMode, showPageSetup, setShowPageSetup, pageConfig, setPageConfig, importState, importFile } = useEditor();

  const handleTabChange = useCallback((tab: RibbonTab) => {
    setActiveTab(prev => prev === tab ? null : tab);
  }, []);

  useEffect(() => {
      const handleSwitchTab = (e: Event) => {
          const customEvent = e as CustomEvent;
          if (customEvent.detail) {
              setActiveTab(customEvent.detail as RibbonTab);
          }
      };
      window.addEventListener('prodoc:switchTab', handleSwitchTab);
      return () => window.removeEventListener('prodoc:switchTab', handleSwitchTab);
  }, []);

  useEffect(() => {
      const handleOpenFile = (e: Event) => {
          const customEvent = e as CustomEvent;
          if (customEvent.detail) {
              importFile(customEvent.detail);
          }
      };
      window.addEventListener('prodoc:open-file', handleOpenFile);
      return () => window.removeEventListener('prodoc:open-file', handleOpenFile);
  }, [importFile]);

  const isReadMode = viewMode === 'read';

  return (
    <div className="fixed inset-0 flex flex-col bg-white dark:bg-[#020617] overflow-hidden text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {isReadMode && <ReadModeToolbar />}

      <div className="flex flex-col flex-1 overflow-hidden relative">
        {!isReadMode && (
            <ErrorBoundary>
                <div className="no-print">
                    <Ribbon 
                        activeTab={activeTab} 
                        onTabChange={handleTabChange} 
                    />
                </div>
            </ErrorBoundary>
        )}
        
        <div className="flex-1 flex overflow-hidden relative z-0 w-full">
          <div className="flex-1 flex flex-col overflow-hidden relative bg-[#f1f5f9] dark:bg-[#020617] transition-colors duration-300">
            <ErrorBoundary>
                <Editor />
            </ErrorBoundary>
            


            {/* File Import Loading State with Progress Bar and Percentage Indicator */}
            {importState?.active && (
              <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 z-50 flex items-center justify-center backdrop-blur-md transition-all duration-300 no-print">
                 <div className="flex flex-col items-center w-full max-w-3xl animate-pulse">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 mb-8 animate-pulse">Importing Document...</h3>
                    
                    {/* Ghost Document Effect for Import */}
                    <div className="w-full bg-white/50 dark:bg-slate-800/50 p-8 rounded-2xl shadow-2xl border border-blue-100/50 dark:border-blue-900/30">
                      <div className="space-y-6">
                        <div className="h-8 bg-slate-200/60 dark:bg-slate-700/60 rounded-md w-2/3"></div>
                        <div className="space-y-3">
                          <div className="h-4 bg-slate-200/60 dark:bg-slate-700/60 rounded w-full overflow-hidden relative">
                             {/* Skeleton progress scanning effect */}
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                          </div>
                          <div className="h-4 bg-slate-200/60 dark:bg-slate-700/60 rounded w-full overflow-hidden relative">
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite_0.5s]"></div>
                          </div>
                          <div className="h-4 bg-slate-200/60 dark:bg-slate-700/60 rounded w-4/5 overflow-hidden relative">
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite_1s]"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-12 w-full max-w-md mx-auto">
                        <p className="text-slate-500 dark:text-slate-400 text-sm text-center leading-relaxed mb-4 min-h-[40px] flex items-center justify-center font-medium">
                          {importState.status || 'Processing file structures...'}
                        </p>
                        
                        {/* Progress Bar Track */}
                        <div className="w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full h-3 overflow-hidden relative border border-white/50 dark:border-slate-600/50 shadow-inner">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                            style={{ width: `${Math.min(100, Math.max(0, importState.percent))}%` }}
                          >
                             <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                          </div>
                        </div>
                        <div className="text-center mt-3">
                           <span className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400">
                             {Math.round(importState.percent)}% Complete
                           </span>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
          
          <div className="no-print flex-shrink-0 h-full">
            <CommentsSidebar />
          </div>
          <div className="no-print flex-shrink-0 h-full">
            <NotesSidebar />
          </div>
          <div className="no-print flex-shrink-0 h-full">
            <JsonDocInspectorSidebar />
          </div>
        </div>
      </div>

      <div className="no-print flex-shrink-0">
        <MobileSelectionToolbar />
      </div>
      {!isReadMode && (
        <div className="no-print flex-shrink-0">
            <StatusBar />
        </div>
      )}

      {/* Global Page Setup Dialog */}
      {showPageSetup && (
        <PageSetupDialog 
            isOpen={showPageSetup}
            onClose={() => setShowPageSetup(false)}
            config={pageConfig}
            onSave={(newConfig) => {
                setPageConfig(newConfig);
                setShowPageSetup(false);
            }}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
        <ThemeProvider>
          <EditorProvider>
            <DocumentModelProvider>
              <AppContent />
            </DocumentModelProvider>
          </EditorProvider>
        </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
