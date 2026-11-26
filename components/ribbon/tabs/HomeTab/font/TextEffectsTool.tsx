import React, { useState } from 'react';
import { Type, ChevronRight } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useHomeTab } from '../HomeTabContext';
import { MenuPortal } from '../../../common/MenuPortal';
import { DropdownToolBtn } from '../common/HomeTools';

const SUB_EFFECTS: Record<string, { name: string; style: React.CSSProperties }[]> = {
  outline: [
    { name: 'Blue', style: { color: '#ffffff', WebkitTextStroke: '1px #3b82f6' } as React.CSSProperties },
    { name: 'Orange', style: { color: '#ffffff', WebkitTextStroke: '1px #f97316' } as React.CSSProperties },
    { name: 'Dark', style: { color: 'transparent', WebkitTextStroke: '1.2px #0f172a' } as React.CSSProperties },
    { name: 'Gold', style: { color: '#ffffff', WebkitTextStroke: '1px #eab308' } as React.CSSProperties },
  ],
  shadow: [
    { name: 'Outer', style: { textShadow: '2px 2px 3px rgba(15, 23, 42, 0.35)' } },
    { name: 'Soft', style: { textShadow: '1px 2px 6px rgba(59, 130, 246, 0.45)' } },
    { name: 'Drop', style: { textShadow: '0 4px 4px rgba(0, 0, 0, 0.35)' } },
    { name: 'Crisp', style: { textShadow: '1px 1px 0px #94a3b8' } },
  ],
  reflection: [
    { name: 'Tight', style: { WebkitBoxReflect: 'below -2px linear-gradient(transparent, rgba(0,0,0,0.22))' } as React.CSSProperties },
    { name: 'Half', style: { WebkitBoxReflect: 'below 1px linear-gradient(transparent, rgba(0,0,0,0.3))' } as React.CSSProperties },
    { name: 'Subtle', style: { WebkitBoxReflect: 'below -4px linear-gradient(transparent, rgba(0,0,0,0.14))' } as React.CSSProperties },
    { name: 'None', style: { WebkitBoxReflect: 'none' } as React.CSSProperties },
  ],
  glow: [
    { name: 'Blue', style: { textShadow: '0 0 6px #3b82f6, 0 0 12px rgba(59,130,246,0.6)' } },
    { name: 'Gold', style: { textShadow: '0 0 6px #eab308, 0 0 12px rgba(234,179,8,0.6)' } },
    { name: 'Emerald', style: { textShadow: '0 0 6px #10b981, 0 0 12px rgba(16,185,129,0.6)' } },
    { name: 'Pink', style: { textShadow: '0 0 6px #ec4899, 0 0 12px rgba(236,72,153,0.6)' } },
  ],
};

export const TextEffectsTool: React.FC = () => {
  const { applyAdvancedStyle } = useEditor();
  const { activeMenu, closeMenu, menuPos, triggerElement } = useHomeTab();
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const menuId = 'text_effects';

  const PRESETS = [
      { name: 'Outline Blue', style: { color: 'white', WebkitTextStroke: '1px #3b82f6' } },
      { name: 'Outline Orange', style: { color: 'white', WebkitTextStroke: '1px #f97316' } },
      { name: 'Shadow', style: { textShadow: '2px 2px 2px #94a3b8' } },
      { name: 'Reflection', style: { WebkitBoxReflect: 'below -4px linear-gradient(transparent, rgba(0,0,0,0.2))' } },
      { name: 'Glow Blue', style: { textShadow: '0 0 5px #3b82f6, 0 0 10px #3b82f6' } },
      { name: 'Glow Gold', style: { textShadow: '0 0 5px #eab308, 0 0 10px #eab308' } },
      { name: 'Soft Blue', style: { color: '#3b82f6', textShadow: '1px 1px 1px #93c5fd' } },
      { name: 'Vintage', style: { color: '#78350f', textShadow: '2px 2px 0px #fbbf24' } },
      { name: '3D', style: { textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25)' } },
      { name: 'Neon', style: { color: 'white', textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff00de, 0 0 30px #ff00de' } },
      { name: 'Inset', style: { color: '#e0e0e0', textShadow: '1px 1px 1px #fff, -1px -1px 1px #666' } },
      { name: 'Gradient', style: { background: 'linear-gradient(to right, #30CFD0 0%, #330867 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } },
      { name: 'Gradient Red', style: { background: 'linear-gradient(to right, #f43f5e, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } },
      { name: 'Gradient Blue', style: { background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } },
      { name: 'Heavy Outline', style: { color: 'transparent', WebkitTextStroke: '1px #000' } },
  ];

  const handleApply = (style: any) => {
      applyAdvancedStyle(style);
      closeMenu();
  };

  return (
    <>
       <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
       <DropdownToolBtn 
          id={menuId}
          icon={Type}
          title="Text Effects & Typography"
          className="text-blue-500 shadow-sm border border-transparent hover:border-slate-300 dark:hover:border-slate-600"
       />
       <MenuPortal id={menuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={236}>
          <div className="p-2 max-h-[65dvh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-1.5 mb-2">
                  {PRESETS.map((effect, i) => (
                      <button 
                          key={i}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleApply(effect.style)}
                          className="h-9 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 rounded hover:bg-slate-50 dark:hover:bg-slate-700/60 hover:border-blue-400 flex items-center justify-center text-lg font-bold overflow-hidden transition-colors"
                          style={effect.style}
                          title={effect.name}
                      >
                          A
                      </button>
                  ))}
              </div>
              <div className="border-t border-slate-100 dark:border-slate-700 pt-1.5 space-y-0.5">
                  {(['outline', 'shadow', 'reflection', 'glow'] as const).map((cat) => {
                    const isOpen = expandedCat === cat;
                    return (
                      <div key={cat}>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setExpandedCat(isOpen ? null : cat)}
                          className={`w-full text-left text-[11px] px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded flex items-center justify-between text-slate-700 dark:text-slate-200 capitalize transition-colors ${isOpen ? 'bg-slate-100 dark:bg-slate-700/60 font-semibold' : ''}`}
                        >
                          <span>{cat}</span>
                          <ChevronRight size={12} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="grid grid-cols-4 gap-1 px-2 py-1.5 bg-slate-50 dark:bg-slate-800/70 rounded my-0.5 border border-slate-100 dark:border-slate-700">
                            {SUB_EFFECTS[cat].map((item) => (
                              <button
                                key={item.name}
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleApply(item.style)}
                                title={`${cat}: ${item.name}`}
                                className="h-7 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 hover:border-blue-400 flex items-center justify-center text-sm font-bold text-slate-800 dark:text-slate-100"
                                style={item.style}
                              >
                                A
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <button 
                    className="w-full text-left text-[11px] text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 p-1.5 rounded mt-1 transition-colors"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => { 
                        applyAdvancedStyle({ 
                            textShadow: 'none', 
                            WebkitTextStroke: '0', 
                            WebkitBackgroundClip: 'border-box',
                            WebkitTextFillColor: 'currentcolor',
                            background: 'none'
                        }); 
                        closeMenu(); 
                    }}
                  >
                      Clear Text Effects
                  </button>
              </div>
          </div>
       </MenuPortal>
    </>
  );
};
