
import { useState, useCallback, useRef } from 'react';

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export function useHistory<T>(initialPresent: T, debounceTime: number = 500) {
  const [state, setState] = useState<HistoryState<T>>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedValueRef = useRef<T>(initialPresent);

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    setState((currentState) => {
      if (currentState.past.length === 0) return currentState;

      const previous = currentState.past[currentState.past.length - 1];
      const newPast = currentState.past.slice(0, currentState.past.length - 1);

      // Update refs to sync with the undo action
      lastSavedValueRef.current = previous;

      return {
        past: newPast,
        present: previous,
        future: [currentState.present, ...currentState.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      if (currentState.future.length === 0) return currentState;

      const next = currentState.future[0];
      const newFuture = currentState.future.slice(1);

      // Update refs to sync with the redo action
      lastSavedValueRef.current = next;

      return {
        past: [...currentState.past, currentState.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  // Standard setter that debounces updates (good for typing)
  const set = useCallback((newPresent: T) => {
    if (newPresent === state.present) return;

    // Optimistically update present state for UI responsiveness
    setState((prev) => ({ ...prev, present: newPresent }));

    // Clear existing timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timer to commit to history
    timeoutRef.current = setTimeout(() => {
      setState((currentState) => {
        // If the value hasn't actually changed from what we last recorded in history, don't add a new entry
        // (This handles edge cases where multiple rapid state updates might resolve to the same value)
        if (currentState.present === lastSavedValueRef.current) {
            return currentState;
        }

        lastSavedValueRef.current = currentState.present;
        
        return {
            past: [...currentState.past, lastSavedValueRef.current], // Previous valid state
            present: newPresent,
            future: [], // Clear redo stack on new input
        };
      });
    }, debounceTime);
  }, [debounceTime, state.present]);

  // Immediate setter for actions like AI Insertion or Formatting buttons
  // This bypasses debounce to ensure the action is immediately undoable
  const setImmediate = useCallback((newPresent: T) => {
     if (timeoutRef.current) clearTimeout(timeoutRef.current);
     
     setState((currentState) => {
        lastSavedValueRef.current = newPresent;
        return {
            past: [...currentState.past, currentState.present],
            present: newPresent,
            future: [],
        };
     });
  }, []);

  return {
    state: state.present,
    set,
    setImmediate,
    undo,
    redo,
    canUndo,
    canRedo,
    historyState: state
  };
}
