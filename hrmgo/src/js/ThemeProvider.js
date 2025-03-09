import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem("activeTheme") || "theme-3";
  const savedLayout = localStorage.getItem("isDarkLayout") === "true";

  const [isDarkLayout, setIsDarkLayout] = useState(savedLayout);
  const [activeTheme, setActiveTheme] = useState(savedTheme);

  const loadStylesheets = (isDark) => {
    const themeStylesheet = document.getElementById("theme-stylesheet");
    const darkModeStylesheet = document.getElementById("dark-mode-stylesheet");
    const lightModeStylesheet = document.getElementById("light-mode-stylesheet");

    if (darkModeStylesheet) darkModeStylesheet.remove();
    if (lightModeStylesheet) lightModeStylesheet.remove();

    if (isDark) {
      themeStylesheet.href = "/assets/css/style-dark.css";
      const newDarkModeStylesheet = document.createElement("link");
      newDarkModeStylesheet.id = "dark-mode-stylesheet";
      newDarkModeStylesheet.rel = "stylesheet";
      newDarkModeStylesheet.href = "/assets/css/dark-mode.css";
      document.head.appendChild(newDarkModeStylesheet);
    } else {
      themeStylesheet.href = "/assets/css/style.css";
      const newLightModeStylesheet = document.createElement("link");
      newLightModeStylesheet.id = "light-mode-stylesheet";
      newLightModeStylesheet.rel = "stylesheet";
      newLightModeStylesheet.href = "/assets/css/light-mode.css";
      document.head.appendChild(newLightModeStylesheet);
    }
  };

  useEffect(() => {
    document.body.className = savedTheme;
    loadStylesheets(savedLayout);
  }, [savedTheme, savedLayout]);

  useEffect(() => {
    localStorage.setItem("activeTheme", activeTheme);
    localStorage.setItem("isDarkLayout", isDarkLayout);

    document.body.className = activeTheme;
    loadStylesheets(isDarkLayout);
  }, [activeTheme, isDarkLayout]);

  const toggleDarkLayout = () => {
    setIsDarkLayout((prev) => !prev);
  };

  const changeTheme = (theme) => {
    setActiveTheme(theme);
  };

  const setDarkLayout = (value) => {
    setIsDarkLayout(value);
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkLayout, activeTheme, toggleDarkLayout, changeTheme, setDarkLayout }}
    >
      {children}
    </ThemeContext.Provider>
  );
};