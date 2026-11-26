
import React, { useEffect } from 'react';
import {
  setLastActiveMathField,
  setLastActiveEditor,
  configureMathFieldElement,
  MathFieldEl,
} from '../components/ribbon/tabs/InsertTab/symbols/equation_subTab/common/mathUtils';

export const useMathLive = (content: string, containerRef: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const configureAllMathFields = () => {
      const fields = container.querySelectorAll('math-field');
      fields.forEach((node) => configureMathFieldElement(node as MathFieldEl));
    };
    configureAllMathFields();

    const observer = new MutationObserver(() => {
      configureAllMathFields();
    });
    observer.observe(container, { childList: true, subtree: true });

    const clearSelectedWrappers = () => {
      container.querySelectorAll('.equation-wrapper[data-selected="true"]').forEach((el) => {
        el.removeAttribute('data-selected');
      });
    };

    // Track focus so Equation ribbon tools always know which math-field/editor page was last active
    const handleFocusIn = (e: FocusEvent) => {
      setLastActiveEditor(container);
      const target = e.target as HTMLElement | null;
      if (target && target.tagName?.toLowerCase() === 'math-field') {
        configureMathFieldElement(target as MathFieldEl);
        setLastActiveMathField(target as MathFieldEl);
        clearSelectedWrappers();
      }
    };

    // 1. Sync value from math-field to DOM attribute for saving/exporting
    const handleInput = (e: Event) => {
      const target = e.target as MathFieldEl;
      if (target.tagName?.toLowerCase() === 'math-field') {
        if (target.value !== undefined) {
          target.setAttribute('value', target.value);
        }
        setLastActiveMathField(target);
      }
    };

    // 2. Navigation & Selected-Equation Deletion
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          clearSelectedWrappers();
          return;
        }

        if (e.key === 'Backspace' || e.key === 'Delete') {
          const selectedWrapper = container.querySelector('.equation-wrapper[data-selected="true"]') as HTMLElement | null;
          if (selectedWrapper && document.activeElement?.tagName?.toLowerCase() !== 'math-field') {
            e.preventDefault();
            e.stopPropagation();
            selectedWrapper.remove();
            setLastActiveMathField(null);
            container.dataset.commitImmediate = 'true';
            container.dispatchEvent(new Event('input', { bubbles: true }));
            return;
          }
        }

        if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
        
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        if (!range.collapsed) return;

        let targetWrapper: HTMLElement | null = null;
        const isRight = e.key === 'ArrowRight';

        const isWrapper = (node: Node | null): node is HTMLElement => {
            return !!(node && node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).classList.contains('equation-wrapper'));
        };

        if (range.endContainer.nodeType === Node.TEXT_NODE) {
            const textNode = range.endContainer;
            const offset = range.endOffset;
            const len = textNode.textContent?.length || 0;
            const textContent = textNode.textContent || '';

            if (isRight) {
                if (offset === len) {
                    if (isWrapper(textNode.nextSibling)) targetWrapper = textNode.nextSibling as HTMLElement;
                } else if (offset === len - 1 && textContent[len - 1] === '\u200B') {
                    if (isWrapper(textNode.nextSibling)) targetWrapper = textNode.nextSibling as HTMLElement;
                }
            } else {
                if (offset === 0) {
                    if (isWrapper(textNode.previousSibling)) targetWrapper = textNode.previousSibling as HTMLElement;
                } else if (offset === 1 && textContent[0] === '\u200B') {
                    if (isWrapper(textNode.previousSibling)) targetWrapper = textNode.previousSibling as HTMLElement;
                }
            }
        } else if (range.endContainer.nodeType === Node.ELEMENT_NODE) {
            const containerNode = range.endContainer;
            const offset = range.endOffset;
            
            if (isRight) {
                const nextNode = containerNode.childNodes[offset];
                if (isWrapper(nextNode)) targetWrapper = nextNode as HTMLElement;
            } else if (offset > 0) {
                const prevNode = containerNode.childNodes[offset - 1];
                if (isWrapper(prevNode)) targetWrapper = prevNode as HTMLElement;
            }
        }

        if (targetWrapper) {
            const mathField = targetWrapper.querySelector('math-field') as MathFieldEl | null;
            if (mathField) {
                e.preventDefault();
                mathField.focus();
                setLastActiveMathField(mathField);
                if (isRight) {
                    mathField.executeCommand?.('moveToMathfieldStart');
                } else {
                    mathField.executeCommand?.('moveToMathfieldEnd');
                }
            }
        }
    };

    // 3. Navigation: Exit MathField to Editor (move-out event from MathLive)
    const handleMoveOut = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.tagName?.toLowerCase() !== 'math-field') return;
        
        const detail = (e as CustomEvent).detail;
        const direction = detail.direction;
        const wrapper = target.closest('.equation-wrapper');
        
        if (wrapper && container.contains(wrapper)) {
            const selection = window.getSelection();
            const range = document.createRange();
            
            if (direction === 'forward' || direction === 'right') {
                const nextNode = wrapper.nextSibling;
                if (nextNode && nextNode.nodeType === Node.TEXT_NODE && nextNode.textContent?.startsWith('\u200B')) {
                    range.setStart(nextNode, 1);
                    range.setEnd(nextNode, 1);
                } else {
                    range.setStartAfter(wrapper);
                    range.setEndAfter(wrapper);
                }
            } else if (direction === 'backward' || direction === 'left') {
                const prevNode = wrapper.previousSibling;
                if (prevNode && prevNode.nodeType === Node.TEXT_NODE && prevNode.textContent?.endsWith('\u200B')) {
                    const len = prevNode.textContent!.length;
                    const safeOffset = Math.max(0, len - 1);
                    range.setStart(prevNode, safeOffset);
                    range.setEnd(prevNode, safeOffset);
                } else {
                    range.setStartBefore(wrapper);
                    range.setEndBefore(wrapper);
                }
            } else {
                return;
            }
            
            selection?.removeAllRanges();
            selection?.addRange(range);
            container.focus();
        }
    };

    // 4. Interaction: Equation handle selects box; dropdown (▼) opens action menu; wrapper click focuses math-field
    const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const handleBtn = target.closest('.equation-handle') as HTMLElement | null;
        if (handleBtn) {
          const wrapper = handleBtn.closest('.equation-wrapper') as HTMLElement | null;
          const mathField = wrapper?.querySelector('math-field') as MathFieldEl | null;
          if (wrapper && mathField) {
            e.preventDefault();
            e.stopPropagation();
            const wasSelected = wrapper.getAttribute('data-selected') === 'true';
            clearSelectedWrappers();
            if (!wasSelected) {
              wrapper.setAttribute('data-selected', 'true');
            }
            setLastActiveMathField(mathField);
            container.focus({ preventScroll: true });
            return;
          }
        }

        const dropdownBtn = target.closest('.equation-dropdown') as HTMLElement | null;
        if (dropdownBtn) {
          const wrapper = dropdownBtn.closest('.equation-wrapper') as HTMLElement | null;
          const mathField = wrapper?.querySelector('math-field') as MathFieldEl | null;
          if (wrapper && mathField) {
            e.preventDefault();
            e.stopPropagation();
            clearSelectedWrappers();
            wrapper.setAttribute('data-selected', 'true');
            setLastActiveMathField(mathField);
            window.dispatchEvent(
              new CustomEvent('prodoc:equation-menu', {
                detail: {
                  wrapper,
                  mathField,
                  rect: dropdownBtn.getBoundingClientRect(),
                },
              })
            );
            return;
          }
        }

        const wrapper = target.closest('.equation-wrapper');
        if (wrapper && target.tagName.toLowerCase() !== 'math-field') {
             clearSelectedWrappers();
             const mathField = wrapper.querySelector('math-field') as MathFieldEl | null;
             if (mathField) {
                 e.preventDefault();
                 e.stopPropagation();
                 setLastActiveMathField(mathField);
                 mathField.focus();
             }
        } else if (!wrapper) {
             clearSelectedWrappers();
        }
    };

    container.addEventListener('focusin', handleFocusIn);
    container.addEventListener('input', handleInput);
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('move-out', handleMoveOut);
    container.addEventListener('click', handleClick);
    
    return () => {
      observer.disconnect();
      container.removeEventListener('focusin', handleFocusIn);
      container.removeEventListener('input', handleInput);
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('move-out', handleMoveOut);
      container.removeEventListener('click', handleClick);
    };
  }, [containerRef, content]); 
};
