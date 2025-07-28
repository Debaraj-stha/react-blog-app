import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('isDark') === 'dark';
  });

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = !isDark ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    setIsDark(!isDark);
    localStorage.setItem('isDark', newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

export default ThemeProvider;
