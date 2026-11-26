
import React from 'react';
import { BookOpen, X, Columns, Layout, Sun, Moon, Coffee, Type, Minus, Plus } from 'lucide-react';
import { useEditor } from '../../../../../../contexts/EditorContext';

export const ReadModeToolbar: React.FC = () => {
  const { readConfig, setReadConfig, setViewMode } = useEditor();

  const handleZoom = (delta: number) => {
    setReadConfig(prev => ({
      ...prev,
      textScale: Math.max(0.8, Math.min(2.5, prev.textScale + delta))
    }));
  };

  const themes = [
    { id: 'light', icon: Sun, color: '#ffffff', text: '#000000' },
    { id: 'sepia', icon: Coffee, color: '#fdf6e3', text: '#5c4b37' },
    { id: 'dark', icon: Moon, color: '#1a1a1a', text: '#e5e5e5' },
  ];

  return (
    <div className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 sm:gap-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-1 sm:p-2 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-4 fade-in duration-300 max-w-[calc(100vw-16px)] overflow-x-auto no-scrollbar">
      
      <div className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 border-r border-slate-200 dark:border-slate-600 shrink-0">
        <button 
          onClick={() => setReadConfig(prev => ({...prev, columns: 1}))}
          className={`p-1.5 sm:p-2 rounded-full transition-colors ${readConfig.columns === 1 ? 'bg-slate-200 dark:bg-slate-600 text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          title="Single Column"
        >
          <Layout size={15} />
        </button>
        <button 
          onClick={() => setReadConfig(prev => ({...prev, columns: 2}))}
          className={`p-1.5 sm:p-2 rounded-full transition-colors hidden sm:flex ${readConfig.columns === 2 ? 'bg-slate-200 dark:bg-slate-600 text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          title="Two Columns"
        >
          <Columns size={15} />
        </button>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2 border-r border-slate-200 dark:border-slate-600 shrink-0">
        {themes.map((t) => {
            const Icon = t.icon;
            return (
                <button
                    key={t.id}
                    onClick={() => setReadConfig(prev => ({...prev, theme: t.id as any}))}
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ${readConfig.theme === t.id ? 'ring-2 ring-blue-500 scale-110 shadow-sm' : 'hover:scale-105 hover:shadow-sm opacity-70 hover:opacity-100'}`}
                    style={{ backgroundColor: t.color, color: t.text }}
                    title={t.id.charAt(0).toUpperCase() + t.id.slice(1)}
                >
                    <Icon size={13} />
                </button>
            )
        })}
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 border-r border-slate-200 dark:border-slate-600 shrink-0">
         <button onClick={() => handleZoom(-0.1)} className="p-1.5 sm:p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full active:bg-slate-200" aria-label="Decrease text size">
            <Minus size={14} />
         </button>
         <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 min-w-[34px] sm:min-w-[40px] justify-center font-mono text-[10px] sm:text-xs tabular-nums select-none">
            <Type size={12} />
            <span>{Math.round(readConfig.textScale * 100)}%</span>
         </div>
         <button onClick={() => handleZoom(0.1)} className="p-1.5 sm:p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full active:bg-slate-200" aria-label="Increase text size">
            <Plus size={14} />
         </button>
      </div>

      <button 
        onClick={() => setViewMode('print')}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full font-medium text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-slate-300 transition-all shadow-sm hover:shadow active:scale-95 shrink-0"
        aria-label="Exit Read Mode"
      >
        <X size={14} />
        <span className="hidden sm:inline">Exit</span>
      </button>
    </div>
  );
};
