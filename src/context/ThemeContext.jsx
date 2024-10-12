import { createContext, useState } from "react";

//I did not end up implementing this

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [isDark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark((isDark) => !isDark);
  };

  useEffect(() => {
    const theme = localStorage.getItem("isDark");
    if (theme) setTheme(theme);
  });

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
