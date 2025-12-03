
import React, { useState } from 'react';
import { ImagePlus, Sparkles, X, Loader2, Download, Check, RefreshCw } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';
import { generateAIImage } from '../../../../../services/geminiService';

export const GenerateImageTool: React.FC = () => {
  const { executeCommand } = useEditor();
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Image = await generateAIImage(prompt);
      if (base64Image) {
        setGeneratedImage(base64Image);
      } else {
        setError("No image data received from the model.");
      }
    } catch (e: any) {
      setError(e.message || "Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInsert = () => {
    if (generatedImage) {
      executeCommand('insertImage', generatedImage);
      setIsOpen(false);
      setPrompt('');
      setGeneratedImage(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <>
      <RibbonButton 
        icon={ImagePlus} 
        label="Generate Image" 
        onClick={() => setIsOpen(true)} 
        title="Create images from text descriptions using Gemini AI"
        className="text-purple-600 hover:bg-purple-50 hover:text-purple-700"
      />

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-lg h-[75vh] md:h-auto md:max-h-[85vh] rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 m-4 flex flex-col"
            role="dialog"
            aria-modal="true"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 flex justify-between items-center shrink-0">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <Sparkles size={20} className="text-yellow-300"/> 
                    Generate Image
                </h3>
                <button 
                    onClick={() => setIsOpen(false)} 
                    className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-4 flex-1 overflow-y-auto min-h-0">
                {/* Image Preview Area */}
                <div className="w-full aspect-square bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative group shadow-inner shrink-0">
                    {isGenerating ? (
                        <div className="flex flex-col items-center gap-3 text-slate-400 animate-pulse">
                            <Loader2 size={48} className="animate-spin text-purple-500"/>
                            <span className="text-sm font-medium">Creating your masterpiece...</span>
                        </div>
                    ) : generatedImage ? (
                        <div className="relative w-full h-full flex items-center justify-center bg-[#f0f0f0]">
                            <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain shadow-md" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                            <ImagePlus size={48} className="opacity-50"/>
                            <span className="text-sm text-center px-8">Describe an image below and let AI create it for you.</span>
                        </div>
                    )}
                    
                    {/* Error Overlay */}
                    {error && (
                        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-6 text-center text-red-600 animate-in fade-in">
                            <p className="font-medium mb-2">Generation Failed</p>
                            <p className="text-xs text-slate-600">{error}</p>
                            <button 
                                onClick={() => setError(null)}
                                className="mt-4 text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md text-slate-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="space-y-3 shrink-0">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Description</label>
                    <div className="relative">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="A futuristic city with flying cars, neon lights, cyberpunk style..."
                            className="w-full h-24 border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none shadow-sm pr-12"
                            disabled={isGenerating}
                            autoFocus
                        />
                        <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-medium bg-white px-1 rounded">
                            {prompt.length} chars
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0">
                <div className="text-xs text-slate-500 italic hidden sm:block">
                    Powered by Gemini
                </div>
                <div className="flex gap-3 w-full sm:w-auto justify-end">
                    {generatedImage ? (
                        <>
                            <button 
                                onClick={handleGenerate}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white border border-transparent hover:border-slate-300 rounded-lg transition-all flex items-center gap-2"
                                disabled={isGenerating}
                            >
                                <RefreshCw size={14} className={isGenerating ? "animate-spin" : ""} /> Regenerate
                            </button>
                            <button 
                                onClick={handleInsert}
                                className="px-5 py-2 text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
                            >
                                <Check size={16} /> Insert
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={handleGenerate}
                            disabled={!prompt.trim() || isGenerating}
                            className="px-6 py-2 text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
                        >
                            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                            Generate
                        </button>
                    )}
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
