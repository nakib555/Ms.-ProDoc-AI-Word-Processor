import { useState, useRef, useCallback } from 'react';
import { SaveStatus, PageConfig } from '../types';
import { htmlToJSONDocument } from '../utils/documentModel';

export const useAutoSave = () => {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerAutoSave = useCallback((title: string, content: string, pageConfig: PageConfig) => {
    setSaveStatus('unsaved');
    
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    
    // Debounce save
    autoSaveTimerRef.current = setTimeout(() => {
      setSaveStatus('saving');
      
      try {
        // Convert to Structured JSON document model
        const docModel = htmlToJSONDocument(content, title, pageConfig);
        
        // Save to localStorage
        const savedDocs = JSON.parse(localStorage.getItem('saved_documents') || '{}');
        savedDocs[title] = {
          documentModel: docModel,
          content, // Fallback content
          lastModified: new Date().toISOString(),
        };
        localStorage.setItem('saved_documents', JSON.stringify(savedDocs));
        
        // Update recent_documents
        let recents = JSON.parse(localStorage.getItem('recent_documents') || '[]');
        recents = recents.filter((r: any) => r.name !== title);
        recents.unshift({
          name: title,
          date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          path: 'Local Storage'
        });
        localStorage.setItem('recent_documents', JSON.stringify(recents.slice(0, 10)));
      } catch (err) {
        console.error('Failed to auto-save to localStorage:', err);
      }

      setTimeout(() => {
        setSaveStatus('saved');
      }, 500);
    }, 1500);
  }, []);

  const manualSave = useCallback((title: string, content: string, pageConfig: PageConfig) => {
    setSaveStatus('saving');
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    
    try {
      const docModel = htmlToJSONDocument(content, title, pageConfig);
      const savedDocs = JSON.parse(localStorage.getItem('saved_documents') || '{}');
      savedDocs[title] = {
        documentModel: docModel,
        content,
        lastModified: new Date().toISOString(),
      };
      localStorage.setItem('saved_documents', JSON.stringify(savedDocs));
      
      let recents = JSON.parse(localStorage.getItem('recent_documents') || '[]');
      recents = recents.filter((r: any) => r.name !== title);
      recents.unshift({
        name: title,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        path: 'Local Storage'
      });
      localStorage.setItem('recent_documents', JSON.stringify(recents.slice(0, 10)));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }

    setTimeout(() => setSaveStatus('saved'), 500);
  }, []);

  return { saveStatus, triggerAutoSave, manualSave, setSaveStatus };
};
