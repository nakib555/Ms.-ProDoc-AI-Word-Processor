
import React from 'react';
import { ChevronDown } from 'lucide-react';

export const SmallRibbonButton: React.FC<{ 
  icon: any, 
  label: string, 
  onClick: () => void, 
  className?: string,
  hasArrow?: boolean
}> = React.memo(({ icon: Icon, label, onClick, className, hasArrow }) => (
  <button 
    onClick={onClick}
    onMouseDown={(e) => e.preventDefault()}
    className={`flex items-center w-full px-2 py-[1px] text-left hover:bg-slate-100 dark:hover:bg-transparent rounded-sm group transition-colors ${className || ''}`}
    title={label}
  >
    <Icon size={14} className="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 mr-2 shrink-0" />
    <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white truncate leading-tight flex-1">{label}</span>
    {hasArrow && <ChevronDown size={8} className="text-slate-400 group-hover:text-slate-600 shrink-0 ml-1" />}
  </button>
));
