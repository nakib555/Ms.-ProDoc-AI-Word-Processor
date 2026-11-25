import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check, Search } from 'lucide-react';

export interface StudioDropdownItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ElementType;
  shortcut?: string;
  badge?: string;
  active?: boolean;
  danger?: boolean;
  divider?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface StudioDropdownProps {
  label?: string;
  icon?: React.ElementType;
  items?: StudioDropdownItem[];
  customContent?: (close: () => void) => React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  align?: 'left' | 'right';
  variant?: 'ghost' | 'segmented' | 'primary' | 'subtle';
  size?: 'sm' | 'md';
}

export const StudioDropdown: React.FC<StudioDropdownProps> = ({
  label,
  icon: Icon,
  items,
  customContent,
  active = false,
  disabled = false,
  title,
  searchable = false,
  searchPlaceholder = 'Search...',
  className = '',
  triggerClassName = '',
  menuClassName = '',
  align = 'left',
  variant = 'ghost',
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightedIdx, setHighlightedIdx] = useState<number>(-1);
  const [coords, setCoords] = useState<{ top: number; left: number; maxHeight: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const visibleItems = useMemo(() => {
    if (!items) return [];
    const q = query.trim().toLowerCase();
    if (!searchable || !q) return items;
    return items.filter(
      (item) =>
        !item.divider &&
        (item.label.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q)))
    );
  }, [items, query, searchable]);

  const actionableIndices = useMemo(
    () =>
      visibleItems
        .map((item, idx) => (!item.divider && !item.disabled ? idx : -1))
        .filter((idx) => idx !== -1),
    [visibleItems]
  );

  const updateCoords = useCallback(() => {
    if (!containerRef.current) return;
    const triggerRect = containerRef.current.getBoundingClientRect();
    const menuWidth = menuRef.current?.offsetWidth || 210;
    const menuHeight = menuRef.current?.offsetHeight || 240;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = align === 'right' ? triggerRect.right - menuWidth : triggerRect.left;
    if (left + menuWidth > vw - 8) left = Math.max(8, vw - menuWidth - 8);
    if (left < 8) left = 8;

    const spaceBelow = vh - triggerRect.bottom - 10;
    const spaceAbove = triggerRect.top - 10;
    let top = triggerRect.bottom + 4;
    let maxHeight = `${Math.max(140, spaceBelow)}px`;

    if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
      top = Math.max(8, triggerRect.top - menuHeight - 4);
      maxHeight = `${Math.max(140, spaceAbove)}px`;
    }

    setCoords({ top, left, maxHeight });
  }, [align]);

  useLayoutEffect(() => {
    if (isOpen) {
      updateCoords();
    } else {
      setCoords(null);
      setQuery('');
      setHighlightedIdx(-1);
    }
  }, [isOpen, updateCoords]);

  useEffect(() => {
    if (!isOpen) return;
    const activeIdx = visibleItems.findIndex((i) => i.active && !i.disabled && !i.divider);
    setHighlightedIdx(activeIdx >= 0 ? activeIdx : actionableIndices[0] ?? -1);

    if (searchable) {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
    const activeEl = menuRef.current?.querySelector<HTMLElement>('[aria-checked="true"], [data-active="true"]');
    if (activeEl && typeof activeEl.scrollIntoView === 'function') {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        (!menuRef.current || !menuRef.current.contains(target))
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (customContent || actionableIndices.length === 0) return;

      const activeEl = document.activeElement as HTMLElement | null;
      const inSearch = activeEl === searchInputRef.current;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const pos = actionableIndices.indexOf(highlightedIdx);
        const nextIdx = pos >= 0 && pos < actionableIndices.length - 1 ? actionableIndices[pos + 1] : actionableIndices[0];
        setHighlightedIdx(nextIdx);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const pos = actionableIndices.indexOf(highlightedIdx);
        const prevIdx = pos > 0 ? actionableIndices[pos - 1] : actionableIndices[actionableIndices.length - 1];
        setHighlightedIdx(prevIdx);
      } else if (e.key === 'Home' && !inSearch) {
        e.preventDefault();
        setHighlightedIdx(actionableIndices[0]);
      } else if (e.key === 'End' && !inSearch) {
        e.preventDefault();
        setHighlightedIdx(actionableIndices[actionableIndices.length - 1]);
      } else if (e.key === 'Enter' && highlightedIdx >= 0) {
        const chosen = visibleItems[highlightedIdx];
        if (chosen && !chosen.disabled && !chosen.divider) {
          e.preventDefault();
          chosen.onClick?.();
          setIsOpen(false);
        }
      } else if (!inSearch && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const ch = e.key.toLowerCase();
        const match = actionableIndices.find(
          (idx) => idx > highlightedIdx && visibleItems[idx].label.toLowerCase().startsWith(ch)
        ) ?? actionableIndices.find((idx) => visibleItems[idx].label.toLowerCase().startsWith(ch));
        if (match !== undefined) setHighlightedIdx(match);
      }
    };

    const handleReposition = () => {
      requestAnimationFrame(updateCoords);
    };

    let resizeObserver: ResizeObserver | null = null;
    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleReposition);
      window.addEventListener('scroll', handleReposition, true);
      if (menuRef.current && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(handleReposition);
        resizeObserver.observe(menuRef.current);
      }
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
      resizeObserver?.disconnect();
    };
  }, [isOpen, updateCoords, customContent, actionableIndices, highlightedIdx, visibleItems]);

  const sizeClasses = size === 'sm'
    ? 'h-7 px-2 text-xs gap-1.5'
    : 'h-8 px-2.5 text-xs font-medium gap-1.5';

  const variantClasses = {
    ghost: (active || isOpen)
      ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 font-semibold'
      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100',
    segmented: (active || isOpen)
      ? 'bg-white text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 font-semibold shadow-xs'
      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200',
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 font-medium',
    subtle: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
  }[variant];

  return (
    <div ref={containerRef} className={`relative inline-block text-left flex-shrink-0 ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onMouseDown={(e) => e.preventDefault()}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        title={title || label}
        className={`
          inline-flex items-center justify-center rounded-md transition-all duration-150 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
          ${sizeClasses}
          ${variantClasses}
          ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
          ${triggerClassName}
        `}
      >
        {Icon && <Icon size={15} strokeWidth={1.8} className="flex-shrink-0" />}
        {label && <span className="whitespace-nowrap tracking-tight truncate">{label}</span>}
        <ChevronDown size={12} className={`opacity-60 transition-transform duration-150 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && createPortal(
        <div
          ref={menuRef}
          role="menu"
          aria-label={title || label || 'Menu'}
          style={{
            position: 'fixed',
            top: coords?.top ?? 0,
            left: coords?.left ?? 0,
            maxHeight: coords?.maxHeight ?? '75vh',
            opacity: coords ? 1 : 0,
            zIndex: 9999,
          }}
          className={`
            min-w-[205px] overflow-y-auto rounded-lg bg-white dark:bg-slate-900 
            border border-slate-200 dark:border-slate-800 shadow-xl py-1 focus:outline-none animate-in fade-in zoom-in-95
            ${menuClassName}
          `}
        >
          {customContent ? (
            customContent(() => setIsOpen(false))
          ) : (
            <div className="py-1">
              {searchable && (
                <div className="px-2 pb-1.5 mb-1 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-indigo-500">
                    <Search size={12} className="text-slate-400 shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setHighlightedIdx(0);
                      }}
                      placeholder={searchPlaceholder}
                      className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none"
                    />
                  </div>
                </div>
              )}

              {visibleItems.length === 0 ? (
                <div className="px-3 py-2 text-xs text-slate-400 text-center">No matching options</div>
              ) : (
                visibleItems.map((item, idx) => {
                  if (item.divider) {
                    return <div key={item.id} className="h-[1px] bg-slate-100 dark:bg-slate-800 my-1" />;
                  }
                  const ItemIcon = item.icon;
                  const isHighlighted = idx === highlightedIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="menuitemcheckbox"
                      aria-checked={!!item.active}
                      data-active={item.active ? 'true' : undefined}
                      disabled={item.disabled}
                      onMouseEnter={() => setHighlightedIdx(idx)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        if (!item.disabled) {
                          item.onClick?.();
                          setIsOpen(false);
                        }
                      }}
                      className={`
                        w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors
                        ${item.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                        ${item.danger
                          ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                          : item.active
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                          : isHighlighted
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {ItemIcon && <ItemIcon size={14} className="opacity-75 flex-shrink-0" />}
                        <div className="min-w-0">
                          <div className="truncate">{item.label}</div>
                          {item.description && (
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{item.description}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-3 shrink-0">
                        {item.shortcut && (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                            {item.shortcut}
                          </span>
                        )}
                        {item.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium">
                            {item.badge}
                          </span>
                        )}
                        {item.active && <Check size={12} className="text-indigo-600 dark:text-indigo-400" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};
