import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useHomeTab } from '../HomeTabContext';

export interface DropdownButtonProps {
  id: string;
  icon: any;
  title: string;
  className?: string;
  color?: string;
  iconClass?: string;
}

export const DropdownToolBtn: React.FC<DropdownButtonProps> = React.memo(({
  id, icon: Icon, title, className, color, iconClass
}) => {
  const { activeMenu, toggleMenu, registerTrigger } = useHomeTab();
  const isOpen = activeMenu === id;

  return (
    <button
      ref={(el) => registerTrigger(id, el)}
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => { e.stopPropagation(); toggleMenu(id); }}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      className={`
        px-1 sm:px-1.5 rounded-md flex items-center justify-center gap-0.5 transition-all h-[26px] sm:h-[28px] lg:h-[30px] min-w-[30px] sm:min-w-[34px] relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40
        ${isOpen
          ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 ring-1 ring-blue-300 dark:ring-blue-700'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-slate-100'}
        ${className || ''}
      `}
      title={title}
    >
      <Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0 ${iconClass || ''}`} strokeWidth={2} />
      {color && (
        <div
          className="h-[2.5px] lg:h-[3px] w-[14px] lg:w-[16px] absolute bottom-0.5 left-1 sm:left-1.5 rounded-full ring-1 ring-white dark:ring-slate-800"
          style={{ backgroundColor: color }}
        />
      )}
      <ChevronDown
        size={9}
        className={`text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-150 ${isOpen ? 'rotate-180 text-blue-600 dark:text-blue-300' : ''}`}
      />
    </button>
  );
});

export const ToolBtn: React.FC<{
  icon: any;
  onClick: () => void;
  title: string;
  active?: boolean;
  color?: string;
  className?: string;
  disabled?: boolean;
  iconClass?: string;
}> = React.memo(({ icon: Icon, onClick, title, active, color, className, disabled, iconClass }) => (
  <button
    type="button"
    onClick={onClick}
    onMouseDown={(e) => e.preventDefault()}
    disabled={disabled}
    aria-pressed={active !== undefined ? active : undefined}
    className={`
      p-1 rounded-md flex items-center justify-center transition-all w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] lg:w-[30px] lg:h-[30px] relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40
      ${active
        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 ring-1 ring-blue-300 dark:ring-blue-700 shadow-xs'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-slate-100'}
      ${disabled ? 'opacity-40 cursor-not-allowed hover:bg-transparent hover:text-slate-600 dark:hover:text-slate-300' : ''}
      ${className || ''}
    `}
    title={title}
  >
    <Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${iconClass || ''}`} strokeWidth={2} />
    {color && (
      <div
        className="h-[2.5px] lg:h-[3px] w-[14px] lg:w-[16px] absolute bottom-0.5 rounded-full ring-1 ring-white dark:ring-slate-800"
        style={{ backgroundColor: color }}
      />
    )}
  </button>
));

export const GroupRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-1 sm:gap-1.5">{children}</div>
);
