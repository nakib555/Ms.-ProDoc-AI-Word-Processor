import { useState, useEffect } from 'react';
import { ViewMode } from '../types';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const getDeviceType = (width: number): DeviceType => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const useResponsive = (initialViewMode: ViewMode) => {
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [viewportHeight, setViewportHeight] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerHeight : 768
  );
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);

  useEffect(() => {
    const updateSize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    window.addEventListener('orientationchange', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('orientationchange', updateSize);
    };
  }, []);

  const deviceType = getDeviceType(viewportWidth);
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  return {
    isMobile,
    isTablet,
    isDesktop,
    deviceType,
    viewportWidth,
    viewportHeight,
    viewMode,
    setViewMode,
  };
};