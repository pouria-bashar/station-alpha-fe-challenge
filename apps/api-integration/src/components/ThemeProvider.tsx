import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

type Props = {
  children: React.ReactNode;
  defaultTheme?: "system" | "light" | "dark";
};

export function ThemeProvider({ children, defaultTheme = "system" }: Props) {
  return (
    <NextThemesProvider
      attribute="class" // toggles 'dark' class on <html>
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
