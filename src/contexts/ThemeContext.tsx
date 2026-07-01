import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'ocean';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark' || saved === 'ocean') return saved as Theme;
    
    // Default to light mode as requested
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'theme-ocean');
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'ocean') {
      root.classList.add('theme-ocean');
      root.classList.add('dark'); // Ocean is a dark theme, so we can reuse some dark mode text colors if needed, but let's just use theme-ocean
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'ocean';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};