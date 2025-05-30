"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const LandingThemeContext = createContext({
  theme: "dark",
  setTheme: () => null,
});

export const useLandingTheme = () => {
  const context = useContext(LandingThemeContext);
  if (context === undefined) {
    throw new Error("useLandingTheme must be used within a LandingThemeProvider");
  }
  return context;
};

export function LandingThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get saved theme from localStorage for landing page only
    const savedTheme = localStorage.getItem("landing-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("landing-theme", newTheme);
  };

  // Return a wrapper that applies the theme class without affecting global theme
  return (
    <LandingThemeContext.Provider
      value={{
        theme,
        setTheme: toggleTheme,
      }}
    >
      {mounted ? (
        <div className={theme === "dark" ? "dark" : ""} data-landing-theme={theme}>
          {children}
        </div>
      ) : (
        <div className="dark" data-landing-theme="dark">
          {children}
        </div>
      )}
    </LandingThemeContext.Provider>
  );
}
