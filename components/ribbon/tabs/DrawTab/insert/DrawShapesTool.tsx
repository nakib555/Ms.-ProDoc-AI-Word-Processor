import React, { useCallback } from 'react';
import { Shapes } from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';
import { useDrawTab } from '../DrawTabContext';
import { DropdownRibbonButton } from '../common/DrawTools';
import { MenuPortal } from '@/components/ribbon/common/MenuPortal';
import { ShapesMenu, getShapeHtml, ShapeDef } from '@/components/ribbon/tabs/InsertTab/illustrations/ShapesTool';

export const DrawShapesTool: React.FC = () => {
  const { executeCommand } = useEditor();
  const { activeMenu, menuPos, closeMenu } = useDrawTab();
  const menuId = 'draw_shapes_menu';

  const insertShape = useCallback((shape: ShapeDef) => {
      const html = getShapeHtml(shape);
      executeCommand('insertHTML', html);
      closeMenu();
  }, [executeCommand, closeMenu]);

  return (
    <>
        <DropdownRibbonButton 
            id={menuId} 
            icon={Shapes} 
            label="Shapes" 
        />
        <MenuPortal id={menuId} activeMenu={activeMenu} menuPos={menuPos} closeMenu={closeMenu} width={340}>
            <ShapesMenu onInsert={insertShape} />
        </MenuPortal>
    </>
  );
};
