import React from 'react';
import { Key } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';

export const ApiKeyTool: React.FC = () => {
  const handleSelectKey = async () => {
    // Use type assertion to avoid conflict with global AIStudio type definition
    const aistudio = (window as any).aistudio;

    if (aistudio?.openSelectKey) {
      try {
        await aistudio.openSelectKey();
        // We rely on the environment to inject the new key into process.env.API_KEY
        // immediately after selection.
      } catch (e) {
        console.error("API Key selection failed", e);
        alert("Failed to update API Key. Please try again.");
      }
    } else {
        alert("API Key management is not available in this environment.");
    }
  };

  return (
    <RibbonButton
      icon={Key}
      label="API Key"
      onClick={handleSelectKey}
      title="Manage Gemini API Key"
    />
  );
};