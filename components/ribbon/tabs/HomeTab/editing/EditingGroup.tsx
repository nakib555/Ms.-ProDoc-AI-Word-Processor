import React, { useState, Suspense } from 'react';
import { RibbonSection } from '../../../common/RibbonSection';
import { useEditor } from '../../../../../contexts/EditorContext';
import { FindTool } from './FindTool';
import { ReplaceTool } from './ReplaceTool';
import { SelectTool } from './SelectTool';

const FindReplaceDialog = React.lazy(() => import('./FindReplaceDialog').then(m => ({ default: m.FindReplaceDialog })));

export const EditingGroup: React.FC = () => {
  const { editorRef } = useEditor();
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findReplaceMode, setFindReplaceMode] = useState<'find' | 'replace'>('find');

  return (
    <>
        <RibbonSection title="Editing">
             <div className="flex flex-col h-full justify-between py-1">
                <FindTool onClick={() => {
                        setFindReplaceMode('find');
                        setShowFindReplace(true);
                    }} 
                />
                <ReplaceTool onClick={() => {
                        setFindReplaceMode('replace');
                        setShowFindReplace(true);
                    }} 
                />
                <SelectTool />
             </div>
        </RibbonSection>

        {showFindReplace && (
            <Suspense fallback={null}>
                <FindReplaceDialog 
                    isOpen={showFindReplace} 
                    onClose={() => setShowFindReplace(false)} 
                    editorRef={editorRef}
                    initialMode={findReplaceMode}
                />
            </Suspense>
        )}
    </>
  );
};