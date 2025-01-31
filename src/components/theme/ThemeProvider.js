"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props} defaultTheme="light">
      {children}
    </NextThemesProvider>
  );
}
