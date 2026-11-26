import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check, Search } from 'lucide-react';
import { computeAnchoredPopover } from '../../utils/viewportPosition';

export interface SmartSelectOption {
  value: string;
  label: string;
  description?: string;
  colorSwatch?: string;
  disabled?: boolean;
}

export interface SmartSelectProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SmartSelectOption[];
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  triggerClassName?: string;
  menuWidth?: number;
  ariaLabel?: string;
}

export const SmartSelect: React.FC<SmartSelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  disabled = false,
  searchable = false,
  searchPlaceholder = 'Filter options...',
  placeholder = 'Select...',
  size = 'md',
  className = '',
  triggerClassName = '',
  menuWidth,
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; maxHeight: string } | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!searchable || !q) return options;
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.value.toLowerCase().includes(q) ||
        (opt.description && opt.description.toLowerCase().includes(q))
    );
  }, [options, query, searchable]);

  const updateCoords = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const { vw } = { vw: typeof window !== 'undefined' ? window.innerWidth : 1024 };
    const preferredW = Math.min(vw - 16, Math.max(rect.width, menuWidth || rect.width, 140));
    const computed = computeAnchoredPopover(rect, menuRef.current, {
      preferredWidth: preferredW,
      fallbackHeight: Math.min(300, options.length * 36 + 16),
      idealMaxHeight: 320,
      margin: 8,
      gap: 4,
    });

    setCoords({
      top: computed.top,
      left: computed.left,
      width: computed.width ?? preferredW,
      maxHeight: computed.maxHeight,
    });
  }, [menuWidth, options.length]);

  useLayoutEffect(() => {
    if (isOpen) {
      updateCoords();
      let observer: ResizeObserver | null = null;
      if (menuRef.current && typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(() => requestAnimationFrame(updateCoords));
        observer.observe(menuRef.current);
      }
      window.addEventListener('resize', updateCoords);
      window.visualViewport?.addEventListener('resize', updateCoords);
      return () => {
        observer?.disconnect();
        window.removeEventListener('resize', updateCoords);
        window.visualViewport?.removeEventListener('resize', updateCoords);
      };
    } else {
      setCoords(null);
      setQuery('');
    }
  }, [isOpen, updateCoords]);

  useEffect(() => {
    if (!isOpen) return;

    const selectedIdx = filteredOptions.findIndex((o) => o.value === value && !o.disabled);
    setHighlightedIndex(selectedIdx >= 0 ? selectedIdx : filteredOptions.findIndex((o) => !o.disabled));

    if (searchable) {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }

    const activeEl = menuRef.current?.querySelector('[data-selected="true"]') as HTMLElement | null;
    if (activeEl && typeof activeEl.scrollIntoView === 'function') {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        (!menuRef.current || !menuRef.current.contains(target))
      ) {
        setIsOpen(false);
      }
    };

    const handleReposition = () => requestAnimationFrame(updateCoords);

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    let observer: ResizeObserver | null = null;
    if (menuRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(handleReposition);
      observer.observe(menuRef.current);
    }

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
      observer?.disconnect();
    };
  }, [isOpen, updateCoords]);

  const commitOption = useCallback(
    (opt: SmartSelectOption) => {
      if (opt.disabled) return;
      onChange(opt.value);
      setIsOpen(false);
      triggerRef.current?.focus();
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      let next = highlightedIndex + 1;
      while (next < filteredOptions.length && filteredOptions[next].disabled) next++;
      if (next >= filteredOptions.length) {
        next = filteredOptions.findIndex((o) => !o.disabled);
      }
      if (next >= 0) setHighlightedIndex(next);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      let prev = highlightedIndex - 1;
      while (prev >= 0 && filteredOptions[prev].disabled) prev--;
      if (prev < 0) {
        for (let i = filteredOptions.length - 1; i >= 0; i--) {
          if (!filteredOptions[i].disabled) {
            prev = i;
            break;
          }
        }
      }
      if (prev >= 0) setHighlightedIndex(prev);
      return;
    }

    if (e.key === 'Home') {
      e.preventDefault();
      const first = filteredOptions.findIndex((o) => !o.disabled);
      if (first >= 0) setHighlightedIndex(first);
      return;
    }

    if (e.key === 'End') {
      e.preventDefault();
      for (let i = filteredOptions.length - 1; i >= 0; i--) {
        if (!filteredOptions[i].disabled) {
          setHighlightedIndex(i);
          break;
        }
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const candidate = filteredOptions[highlightedIndex];
      if (candidate && !candidate.disabled) {
        commitOption(candidate);
      }
      return;
    }

    // Type-ahead when search box is not active
    if (!searchable && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const ch = e.key.toLowerCase();
      const matchIdx = filteredOptions.findIndex(
        (o, idx) => idx > highlightedIndex && !o.disabled && o.label.toLowerCase().startsWith(ch)
      );
      const wrapIdx =
        matchIdx >= 0
          ? matchIdx
          : filteredOptions.findIndex((o) => !o.disabled && o.label.toLowerCase().startsWith(ch));
      if (wrapIdx >= 0) setHighlightedIndex(wrapIdx);
    }
  };

  const sizeClasses =
    size === 'xs'
      ? 'h-7 px-2 text-xs rounded-md'
      : size === 'sm'
      ? 'h-8 px-2.5 text-xs rounded-lg'
      : 'h-9 px-3 text-sm rounded-xl';

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-0.5"
        >
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || label || placeholder}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => {
          // Keep rich-text selection intact when used in ribbon
          if (e.currentTarget.closest('.prodoc-ribbon-section')) {
            e.preventDefault();
          }
        }}
        className={`
          w-full flex items-center justify-between gap-2 bg-white dark:bg-slate-800
          border transition-all text-left select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
          ${isOpen ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-slate-500'}
          ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
          ${sizeClasses}
          ${triggerClassName}
        `}
      >
        <span className="flex items-center gap-2 min-w-0 flex-1">
          {selectedOption?.colorSwatch && (
            <span
              className="w-3.5 h-3.5 rounded-sm border border-slate-300 dark:border-slate-600 shrink-0"
              style={{
                backgroundColor:
                  selectedOption.colorSwatch === 'none' ? 'transparent' : selectedOption.colorSwatch,
              }}
            />
          )}
          <span className="truncate font-medium text-slate-800 dark:text-slate-100">
            {selectedOption?.label ?? placeholder}
          </span>
        </span>
        <ChevronDown
          size={13}
          className={`shrink-0 text-slate-400 transition-transform duration-150 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            role="listbox"
            aria-label={ariaLabel || label || 'Options'}
            onKeyDown={handleKeyDown}
            style={{
              position: 'fixed',
              top: coords?.top ?? 0,
              left: coords?.left ?? 0,
              width: coords?.width ?? 200,
              maxHeight: coords?.maxHeight ?? '300px',
              opacity: coords ? 1 : 0,
              zIndex: 10050,
            }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100"
            onClick={(e) => e.stopPropagation()}
          >
            {searchable && (
              <div className="p-1.5 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-indigo-500">
                  <Search size={12} className="text-slate-400 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setHighlightedIndex(0);
                    }}
                    placeholder={searchPlaceholder}
                    className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none"
                  />
                </div>
              </div>
            )}

            <div className="overflow-y-auto p-1 space-y-0.5 overscroll-contain">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-xs text-slate-400 text-center">No matching options</div>
              ) : (
                filteredOptions.map((opt, idx) => {
                  const isSelected = opt.value === value;
                  const isHighlighted = idx === highlightedIndex;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      data-selected={isSelected ? 'true' : undefined}
                      disabled={opt.disabled}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => commitOption(opt)}
                      className={`
                        w-full flex items-center justify-between gap-2 px-2.5 py-1.5 text-left rounded-lg text-xs transition-colors
                        ${opt.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                        ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                            : isHighlighted
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        {opt.colorSwatch && (
                          <span
                            className="w-3.5 h-3.5 rounded-sm border border-slate-300 dark:border-slate-600 shrink-0"
                            style={{
                              backgroundColor: opt.colorSwatch === 'none' ? 'transparent' : opt.colorSwatch,
                            }}
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="truncate">{opt.label}</div>
                          {opt.description && (
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                              {opt.description}
                            </div>
                          )}
                        </div>
                      </div>
                      {isSelected && <Check size={13} className="shrink-0 text-indigo-600 dark:text-indigo-400" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
