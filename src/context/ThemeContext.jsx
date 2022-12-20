import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, [theme]);

  const themeToggle = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.theme = "dark";
    } else {
      setTheme("light");
      localStorage.theme = "light";
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
