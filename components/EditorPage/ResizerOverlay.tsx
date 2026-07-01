/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from 'react';

interface ResizerOverlayProps {
  target: HTMLElement;
  container: HTMLElement;
  scale: number;
  onUpdate: () => void;
  onClear: () => void;
}

export const ResizerOverlay: React.FC<ResizerOverlayProps> = ({
  target,
  container,
  scale,
  onUpdate,
}) => {
  const [rect, setRect] = useState(target.getBoundingClientRect());
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const updateRect = () => {
      const parentEl = container.parentElement;
      if (!parentEl) return;
      const containerRect = parentEl.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      
      setRect({
        top: (targetRect.top - containerRect.top) / scale,
        left: (targetRect.left - containerRect.left) / scale,
        width: targetRect.width / scale,
        height: targetRect.height / scale,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      });
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [target, container, scale, isResizing]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore
    }
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = target.clientWidth;
    const startHeight = target.clientHeight;
    const aspectRatio = startWidth / startHeight;

    const handlePointerMove = (ev: PointerEvent) => {
      const deltaX = (ev.clientX - startX) / scale;
      const deltaY = (ev.clientY - startY) / scale;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes('e')) newWidth = startWidth + deltaX;
      if (direction.includes('w')) newWidth = startWidth - deltaX;
      if (direction.includes('s')) newHeight = startHeight + deltaY;
      if (direction.includes('n')) newHeight = startHeight - deltaY;

      if (direction.length === 2) { 
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
      }

      const finalWidth = Math.max(20, newWidth);
      const finalHeight = Math.max(20, newHeight);

      target.style.width = `${finalWidth}px`;
      target.style.height = `${finalHeight}px`;
      setRect((prev) => ({
        ...prev,
        width: finalWidth,
        height: finalHeight,
      }));
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      onUpdate();
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <div 
      className="absolute border-2 border-blue-500 z-50 pointer-events-none"
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }}
    >
      {['nw', 'ne', 'sw', 'se'].map((dir) => (
        <div 
          key={dir}
          onPointerDown={(e) => handlePointerDown(e, dir)}
          className="absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full pointer-events-auto"
          style={{
            top: dir.includes('n') ? -8 : 'auto',
            bottom: dir.includes('s') ? -8 : 'auto',
            left: dir.includes('w') ? -8 : 'auto',
            right: dir.includes('e') ? -8 : 'auto',
            cursor: `${dir}-resize`,
            touchAction: 'none',
          }}
        />
      ))}
    </div>
  );
};
