"use client";

import { ThemeProvider } from "next-themes";

export function ThemeProviderWrapper({ children }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false}
      disableTransitionOnChange
      storageKey="app-theme"
    >
      {children}
    </ThemeProvider>
  );
}
