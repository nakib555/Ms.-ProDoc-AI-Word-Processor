import React, { useState, useMemo } from 'react';
import { Volume2 } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

// Animated Visualizer Component
const WaveformIcon = ({ className }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-[2px] ${className}`}>
      <style>{`
        @keyframes waveform {
            0%, 100% { height: 20%; }
            50% { height: 100%; }
        }
      `}</style>
      {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="w-[2.5px] bg-current rounded-full"
            style={{ 
                height: '40%',
                animation: 'waveform 0.6s ease-in-out infinite', 
                animationDelay: `${i * 0.1}s` 
            }} 
          />
      ))}
  </div>
);

export const ReadAloudTool: React.FC = () => {
  const { content } = useEditor();
  const [isPlaying, setIsPlaying] = useState(false);

  // Derive content presence for disabled state
  const hasContent = useMemo(() => {
    if (!content) return false;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const text = (tempDiv.innerText || '').trim();
    return text.length > 0;
  }, [content]);

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const handleReadAloud = () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    // Get text to read
    let textToRead = "";
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      textToRead = selection.toString();
    } else {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      textToRead = tempDiv.innerText || "";
    }

    textToRead = textToRead.trim();
    if (!textToRead) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.error("Speech synthesis error:", e);
      }
      setIsPlaying(false);
    };

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const Icon: React.ElementType = isPlaying ? WaveformIcon : Volume2;

  return (
    <RibbonButton 
        icon={Icon} 
        label={isPlaying ? "Stop" : "Read Aloud"} 
        onClick={handleReadAloud} 
        disabled={!hasContent && !isPlaying}
        className={isPlaying ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 border-indigo-200" : ""}
        iconClassName={!isPlaying ? "text-cyan-500" : ""}
        title={!hasContent ? "No content to read" : isPlaying ? "Stop Reading" : "Read document aloud"}
    />
  );
};
