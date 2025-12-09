

import React, { useState, useRef } from 'react';
import { Send, Sparkles, ChevronDown, Zap, Smile, Coffee, Bot } from 'lucide-react';
import { useAI } from '../../../../../hooks/useAI';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAIAssistantTab } from '../AIAssistantTabContext';
import { MenuPortal } from '../../../common/MenuPortal';

const TONES = [
    { id: 'professional', label: 'Professional', icon: Zap },
    { id: 'friendly', label: 'Friendly', icon: Smile },
    { id: 'confident', label: 'Confident', icon: Bot },
    { id: 'casual', label: 'Casual', icon: Coffee },
];

const ToneSelector: React.FC<{ tone: string, setTone: (t: string) => void }> = ({ tone, setTone }) => {
    const { activeMenu, toggleMenu, closeMenu, menuPos, registerTrigger } = useAIAssistantTab();
    const menuId = 'quick_prompt_tone';

    const currentTone = TONES.find(t => t.id === tone) || TONES[0];
    const Icon = currentTone.icon;

    return (
        <>
            <button
                ref={(el) => registerTrigger(menuId, el)}
                onClick={(e) => { e.stopPropagation(); toggleMenu(menuId); }}
                onMouseDown={(e) => e.preventDefault()}
                className="p-1.5 m-0.5 rounded-md hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 transition-colors flex items-center justify-center"
                title={`Current tone: ${currentTone.label}`}
            >
                <Icon size={14} />
                <ChevronDown size={10} className="ml-1" />
            </button>
            <MenuPortal id={menuId} activeMenu={activeMenu} menuPos={menuPos} closeMenu={closeMenu} width={180}>
                 <div className="p-1">
                     {TONES.map(t => (
                         <button key={t.id} onClick={() => { setTone(t.id); closeMenu(); }} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <t.icon size={14} className="text-slate-500 dark:text-slate-400"/> {t.label}
                         </button>
                     ))}
                 </div>
            </MenuPortal>
        </>
    );
};

export const QuickPromptTool: React.FC = () => {
  const { performAIAction, isProcessing } = useAI();
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('professional');
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim() || isProcessing) return;
    const finalPrompt = `[Tone: ${tone}] ${prompt}`;
    performAIAction('generate_content', finalPrompt, { mode: 'insert' }, savedRange);
    setPrompt('');
    setSavedRange(null);
  };

  const handleFocus = () => {
      // Capture the current selection from the editor before the input steals focus
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
          setSavedRange(sel.getRangeAt(0).cloneRange());
      }
  };

  return (
    <div className="flex flex-col h-full justify-center gap-1.5 px-2 min-w-[320px] max-w-[420px]">
        <label className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide flex items-center gap-1.5">
            <Sparkles size={10} className="fill-indigo-100 dark:fill-indigo-900/30"/> Write with AI
        </label>
        <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-sm h-8 group">
            <ToneSelector tone={tone} setTone={setTone} />
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                onFocus={handleFocus}
                placeholder="Describe what to write..."
                className="flex-1 min-w-0 border-none outline-none text-xs px-2.5 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 bg-transparent h-full"
                disabled={isProcessing}
            />
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
            <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isProcessing}
                className="p-1.5 m-0.5 rounded-md hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 disabled:opacity-40 disabled:hover:bg-transparent transition-colors flex-shrink-0 w-8 flex items-center justify-center"
                title="Generate Content"
            >
                {isProcessing ? <LoadingSpinner className="w-3.5 h-3.5" /> : <Send size={14} />}
            </button>
        </div>
    </div>
  );
};