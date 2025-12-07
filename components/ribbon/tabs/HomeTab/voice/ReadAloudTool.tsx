import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Square } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const ReadAloudTool: React.FC = () => {
  const { content } = useEditor();
  const [isReading, setIsReading] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check content presence for disabled state
  useEffect(() => {
    // Strip HTML tags to check if there is actual text
    const text = content.replace(/<[^>]*>/g, ' ').trim();
    setHasContent(text.length > 0);
  }, [content]);

  // Monitor speech synthesis state to sync UI if it stops externally
  useEffect(() => {
     const interval = setInterval(() => {
         if (!window.speechSynthesis.speaking && isReading) {
             setIsReading(false);
         }
     }, 500);
     return () => clearInterval(interval);
  }, [isReading]);

  // Cleanup on unmount
  useEffect(() => {
      return () => {
          if (window.speechSynthesis) {
              window.speechSynthesis.cancel();
          }
      }
  }, []);

  const handleReadAloud = () => {
    if (isReading) {
        window.speechSynthesis.cancel();
        setIsReading(false);
        return;
    }

    // Create a temporary element to extract clean text from HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Get text content, replacing multiple spaces/newlines with single space
    // This provides a smoother reading experience than raw innerText
    const textToRead = (tempDiv.innerText || '').replace(/\s+/g, ' ').trim();

    if (textToRead.length > 0) {
        window.speechSynthesis.cancel(); // Cancel any existing speech

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utteranceRef.current = utterance;
        
        // Attempt to set a preferred voice (English)
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            // Prefer a high quality Google voice or standard English
            const preferredVoice = voices.find(v => v.name.includes('Google US English')) || 
                                   voices.find(v => v.lang.startsWith('en-US')) ||
                                   voices.find(v => v.lang.startsWith('en'));
            
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }
        };

        loadVoices();
        // If voices aren't loaded yet (Chrome behavior), listen for event
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
             window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        utterance.onstart = () => setIsReading(true);
        utterance.onend = () => setIsReading(false);
        utterance.onerror = (e) => {
            // Check for interruption vs actual error
            if (e.error !== 'interrupted' && e.error !== 'canceled') {
                console.error("TTS Error:", e.error); 
            }
            setIsReading(false);
        };

        window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <RibbonButton 
        icon={isReading ? Square : Volume2} 
        label={isReading ? "Stop" : "Read Aloud"} 
        onClick={handleReadAloud} 
        disabled={!hasContent}
        className={isReading ? "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200" : ""}
        title={!hasContent ? "No content to read" : isReading ? "Stop Reading" : "Read document aloud"}
    />
  );
};
