
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Ribbon from './components/Ribbon';
import Editor from './components/Editor';
import StatusBar from './components/StatusBar';
import { ReadModeToolbar } from './components/ribbon/tabs/ViewTab/views/ReadMode/ReadModeToolbar';
import { MobileSelectionToolbar } from './components/MobileSelectionToolbar';
import { AIAssistantSidebar } from './components/AIAssistantSidebar';
import { JsonDocInspectorSidebar } from './components/JsonDocInspectorSidebar';
import { RibbonTab } from './types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { EditorProvider, useEditor } from './contexts/EditorContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PageSetupDialog } from './components/ribbon/tabs/LayoutTab/page_setup/Margins/CustomMargin/PageSetupDialog';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RibbonTab | null>(RibbonTab.HOME);
  const { aiState, viewMode, showPageSetup, setShowPageSetup, pageConfig, setPageConfig, importState } = useEditor();
  
  // Automatically switch away from AI Assistant tab if in Web Layout
  useEffect(() => {
    if (viewMode === 'web' && activeTab === RibbonTab.AI_ASSISTANT) {
        setTimeout(() => setActiveTab(RibbonTab.HOME), 0);
    }
  }, [viewMode, activeTab]);

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
            
            {/* AI Overlay Loading State - Only show when thinking, not when writing/streaming */}
            {aiState === 'thinking' && (
              <div className="absolute inset-0 bg-white/50 dark:bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-500 no-print">
                 <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col items-center animate-zoom-in mx-4 max-w-sm w-full border border-white/40 dark:border-slate-700 ring-1 ring-black/5">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 ring-4 ring-indigo-50 dark:ring-indigo-900/30 relative">
                      <LoadingSpinner className="w-10 h-10" />
                      <div className="absolute inset-0 rounded-full bg-indigo-400/30 animate-ping"></div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">AI is Thinking</h3>
                    <p className="text-slate-500 dark:text-slate-300 text-sm text-center leading-relaxed">Analyzing your text and generating intelligent suggestions...</p>
                 </div>
              </div>
            )}

            {/* File Import Loading State with Progress Bar and Percentage Indicator */}
            {importState?.active && (
              <div className="absolute inset-0 bg-white/50 dark:bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 no-print">
                 <div className="bg-white/95 dark:bg-slate-900 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col items-center animate-zoom-in mx-4 max-w-sm w-full border border-slate-100 dark:border-slate-800 ring-1 ring-black/5">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 ring-4 ring-blue-50 dark:ring-indigo-950 relative">
                      <LoadingSpinner className="w-10 h-10 text-white" />
                      <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping"></div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Importing Document</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm text-center leading-relaxed mb-4 min-h-[40px] flex items-center justify-center">
                      {importState.status || 'Processing file structures...'}
                    </p>
                    
                    {/* Progress Bar Track */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden relative border border-slate-200/50 dark:border-slate-700/50">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${Math.min(100, Math.max(0, importState.percent))}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold font-mono text-indigo-600 dark:text-indigo-400 mt-3">
                      {Math.round(importState.percent)}% Complete
                    </span>
                 </div>
              </div>
            )}
          </div>
          
          <div className="no-print flex-shrink-0 h-full">
            <AIAssistantSidebar />
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
            <AppContent />
          </EditorProvider>
        </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
