import React from 'react';
import { useEditor } from '../contexts/EditorContext';
import { RibbonTab } from '../types';
import { 
  Home, 
  PlusCircle, 
  Layout, 
  MessageSquare, 
  Eye, 
  MoreHorizontal, 
  Undo, 
  Redo, 
  Search,
  Smartphone,
  FileText
} from 'lucide-react';

interface MobileToolbarProps {
  activeTab: RibbonTab | null;
  onTabChange: (tab: RibbonTab | null) => void;
}

export const MobileToolbar: React.FC<MobileToolbarProps> = ({ activeTab, onTabChange }) => {
  const { undo, redo, canUndo, canRedo, viewMode, setViewMode } = useEditor();

  const tabs = [
    { id: RibbonTab.HOME, icon: Home, label: 'Home' },
    { id: RibbonTab.INSERT, icon: PlusCircle, label: 'Insert' },
    { id: RibbonTab.LAYOUT, icon: Layout, label: 'Layout' },
    { id: RibbonTab.REVIEW, icon: MessageSquare, label: 'Review' },
    { id: RibbonTab.VIEW, icon: Eye, label: 'View' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50 pt-safe">
      {/* Quick Actions Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-slate-800">
         <div className="flex items-center gap-4">
            <button 
                onClick={undo} 
                disabled={!canUndo}
                className={`p-2 rounded-full ${!canUndo ? 'opacity-30' : 'active:bg-slate-100 dark:active:bg-slate-800'}`}
            >
                <Undo className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            <button 
                onClick={redo} 
                disabled={!canRedo}
                className={`p-2 rounded-full ${!canRedo ? 'opacity-30' : 'active:bg-slate-100 dark:active:bg-slate-800'}`}
            >
                <Redo className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
         </div>

         <div className="flex items-center gap-4">
             <button 
                onClick={() => setViewMode(viewMode === 'print' ? 'web' : 'print')}
                className="p-2 rounded-full active:bg-slate-100 dark:active:bg-slate-800"
             >
                {viewMode === 'print' ? (
                    <Smartphone className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                ) : (
                    <FileText className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                )}
             </button>
             <button className="p-2 rounded-full active:bg-slate-100 dark:active:bg-slate-800">
                <Search className="w-5 h-5 text-slate-600 dark:text-slate-300" />
             </button>
         </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center justify-around py-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(activeTab === tab.id ? null : tab.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === tab.id 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <tab.icon className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
        <button 
            onClick={() => onTabChange(activeTab === RibbonTab.FILE ? null : RibbonTab.FILE)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === RibbonTab.FILE 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
        >
            <MoreHorizontal className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </div>
  );
};
