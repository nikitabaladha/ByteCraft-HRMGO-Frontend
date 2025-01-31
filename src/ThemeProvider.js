import React, { createContext, useState, useEffect } from "react";
 
export const ThemeContext = createContext();
 
export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem("activeTheme") || "theme-3";
const savedLayout = localStorage.getItem("isDarkLayout") === "true";
 
const [isDarkLayout, setIsDarkLayout] = useState(savedLayout);
const [activeTheme, setActiveTheme] = useState(savedTheme);
 
useEffect(() => {
  document.body.className = savedTheme;
  const themeStylesheet = document.getElementById("theme-stylesheet");
  themeStylesheet.href = savedLayout
    ? "/assets/css/style-dark.css"
    : "/assets/css/style.css";
}, [savedTheme, savedLayout]);
 
useEffect(() => {
  localStorage.setItem("activeTheme", activeTheme);
  localStorage.setItem("isDarkLayout", isDarkLayout);
 
  document.body.className = activeTheme;
  const themeStylesheet = document.getElementById("theme-stylesheet");
  themeStylesheet.href = isDarkLayout
    ? "/assets/css/style-dark.css"
    : "/assets/css/style.css";
}, [activeTheme, isDarkLayout]);
 
const toggleDarkLayout = () => {
  setIsDarkLayout((prev) => !prev);
};
 
const changeTheme = (theme) => {
  setActiveTheme(theme);
};
 
 
  return (
<ThemeContext.Provider
      value={{ isDarkLayout, activeTheme, toggleDarkLayout, changeTheme }}
>
      {children}
</ThemeContext.Provider>
  );
};