import { useContext, createContext, useState, useEffect } from "react";

const ThemeContext = createContext();
const lightMode = "light", darkMode = "dark";

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || lightMode;
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === lightMode ? darkMode : lightMode;
      localStorage.setItem("theme", next);
      return next;
    });
  };

  useEffect(() => {
    document.body.className = `app-${theme}`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
