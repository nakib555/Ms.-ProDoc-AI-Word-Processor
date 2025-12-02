
import React, { useState, useEffect } from 'react';
import { Key, CheckCircle2, AlertTriangle, X, Loader2, Save, ExternalLink, Cpu, ChevronRight, RefreshCw } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { GoogleGenAI } from "@google/genai";

const DEFAULT_MODELS = [
    { id: 'gemini-3-pro-preview', name: 'Gemini 3.0 Pro (Preview)' },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
    { id: 'gemini-2.0-flash-lite-preview-02-05', name: 'Gemini 2.0 Flash Lite' },
];

export const ApiKeyTool: React.FC = () => {
  const [hasKey, setHasKey] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  
  // Dialog State
  const [inputKey, setInputKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-3-pro-preview');
  const [verifying, setVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [availableModels, setAvailableModels] = useState(DEFAULT_MODELS);
  const [loadingModels, setLoadingModels] = useState(false);

  const fetchModels = async (key: string) => {
      if (!key) return;
      setLoadingModels(true);
      try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
          if (response.ok) {
              const data = await response.json();
              if (data.models) {
                  const models = data.models
                      .filter((m: any) => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"))
                      .map((m: any) => ({
                          id: m.name.replace('models/', ''),
                          name: m.displayName || m.name
                      }))
                      .sort((a: any, b: any) => {
                          // Prioritize 3.0, then 2.5
                          const getScore = (id: string) => {
                              if (id.includes('gemini-3')) return 4;
                              if (id.includes('gemini-2.5')) return 3;
                              if (id.includes('gemini-2.0')) return 2;
                              if (id.includes('gemini-1.5')) return 1;
                              return 0;
                          }
                          const scoreA = getScore(a.id);
                          const scoreB = getScore(b.id);
                          if (scoreA !== scoreB) return scoreB - scoreA;
                          return a.name.localeCompare(b.name);
                      });
                  
                  if (models.length > 0) {
                      setAvailableModels(models);
                  }
              }
          }
      } catch (e) {
          console.warn("Could not fetch models dynamically, using defaults.", e);
      } finally {
          setLoadingModels(false);
      }
  };

  useEffect(() => {
    // Check if key and model exist on mount (localStorage or env)
    const localKey = localStorage.getItem('gemini_api_key');
    const localModel = localStorage.getItem('gemini_model');
    const envKey = process.env.API_KEY;
    
    const effectiveKey = localKey || envKey;

    setHasKey(!!effectiveKey);
    if (localKey) setInputKey(localKey);
    if (localModel) setSelectedModel(localModel);
    
    if (effectiveKey) {
        fetchModels(effectiveKey);
    }
  }, []);

  const verifyKey = async () => {
    if (!inputKey.trim()) {
        setErrorMessage("Please enter an API key");
        return;
    }
    
    setVerifying(true);
    setErrorMessage('');
    setVerifyStatus('idle');

    try {
        const client = new GoogleGenAI({ apiKey: inputKey });
        // Simple test call to verify validity using the selected model
        await client.models.generateContent({
            model: selectedModel,
            contents: [{ role: "user", parts: [{ text: "Ping" }] }],
        });
        setVerifyStatus('valid');
        // Refresh models list on valid key
        await fetchModels(inputKey);
    } catch (e: any) {
        console.error("API Verification Failed:", e);
        setVerifyStatus('invalid');
        setErrorMessage("Invalid API Key or Model not available.");
    } finally {
        setVerifying(false);
    }
  };

  const saveAndClose = () => {
      localStorage.setItem('gemini_api_key', inputKey);
      localStorage.setItem('gemini_model', selectedModel);
      setHasKey(true);
      setShowDialog(false);
      setVerifyStatus('idle');
  };

  const clearKey = () => {
      localStorage.removeItem('gemini_api_key');
      localStorage.removeItem('gemini_model');
      setInputKey('');
      setSelectedModel('gemini-3-pro-preview');
      setHasKey(!!process.env.API_KEY);
      setVerifyStatus('idle');
      setErrorMessage('');
      setAvailableModels(DEFAULT_MODELS);
  };

  return (
    <>
        <div className="relative h-full">
          <RibbonButton
            icon={Key}
            label="API Key"
            onClick={() => setShowDialog(true)}
            title={hasKey ? "Configure API Key & Model" : "Set API Key"}
            className={hasKey ? "bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800" : "bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"}
          />
          <div className="absolute top-1 right-1 pointer-events-none">
            {hasKey ? (
              <CheckCircle2 size={10} className="text-green-600 fill-white" />
            ) : (
              <AlertTriangle size={10} className="text-amber-600 fill-white animate-pulse" />
            )}
          </div>
        </div>

        {showDialog && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowDialog(false)}>
                <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md m-4 overflow-hidden animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Key size={18} className="text-blue-600"/> AI Configuration
                        </h3>
                        <button onClick={() => setShowDialog(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                            <X size={18} />
                        </button>
                    </div>
                    
                    <div className="p-6 space-y-5">
                        <div className="text-sm text-slate-600 leading-relaxed">
                            Configure your Google Gemini API connection details below.
                        </div>
                        
                        {/* API Key Input */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Gemini API Key</label>
                            <div className="relative">
                                <input 
                                    type="password" 
                                    value={inputKey}
                                    onChange={(e) => {
                                        setInputKey(e.target.value);
                                        setVerifyStatus('idle');
                                        setErrorMessage('');
                                    }}
                                    placeholder="Enter your key (AIzaSy...)"
                                    className={`w-full pl-3 pr-10 py-2.5 border rounded-lg text-sm outline-none transition-all font-mono ${verifyStatus === 'invalid' ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50' : verifyStatus === 'valid' ? 'border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-green-50' : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white'}`}
                                />
                                <div className="absolute right-3 top-3">
                                    {verifying ? <Loader2 size={16} className="animate-spin text-blue-500"/> : 
                                     verifyStatus === 'valid' ? <CheckCircle2 size={16} className="text-green-500"/> :
                                     verifyStatus === 'invalid' ? <AlertTriangle size={16} className="text-red-500"/> : null}
                                </div>
                            </div>
                            
                            {errorMessage && (
                                <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1 animate-in slide-in-from-top-1">
                                    <AlertTriangle size={12} /> {errorMessage}
                                </div>
                            )}
                            
                            {verifyStatus === 'valid' && (
                                <div className="flex items-center gap-1.5 text-xs text-green-600 mt-1 animate-in slide-in-from-top-1">
                                    <CheckCircle2 size={12} /> Key verified successfully!
                                </div>
                            )}
                        </div>

                        {/* Model Selection */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">AI Model</label>
                                <button 
                                    onClick={() => fetchModels(inputKey || process.env.API_KEY || '')} 
                                    disabled={loadingModels}
                                    className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-1 disabled:opacity-50"
                                >
                                    <RefreshCw size={10} className={loadingModels ? "animate-spin" : ""} /> Refresh List
                                </button>
                            </div>
                            <div className="relative group">
                                <Cpu size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                <select 
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                    className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-8 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer hover:border-blue-400 shadow-sm"
                                >
                                    {availableModels.map(model => (
                                        <option key={model.id} value={model.id}>{model.name}</option>
                                    ))}
                                </select>
                                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={14} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                             <a 
                                href="https://aistudio.google.com/app/apikey" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-xs text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 font-medium"
                             >
                                Get API Key <ExternalLink size={10} />
                             </a>
                             
                             {(inputKey || localStorage.getItem('gemini_api_key')) && (
                                 <button onClick={clearKey} className="text-xs text-slate-400 hover:text-red-600 transition-colors">
                                     Clear Settings
                                 </button>
                             )}
                        </div>
                    </div>

                    <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                        <button 
                            onClick={verifyKey}
                            disabled={verifying || !inputKey}
                            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-slate-200 transition-all disabled:opacity-50 shadow-sm"
                        >
                            Verify
                        </button>
                        <button 
                            onClick={saveAndClose}
                            disabled={verifyStatus !== 'valid'}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                        >
                            <Save size={16} /> Save Settings
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};
