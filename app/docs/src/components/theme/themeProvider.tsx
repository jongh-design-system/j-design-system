"use client"
import {
  ThemeProvider as NextThemeProvider,
  type ThemeProviderProps,
} from "next-themes"

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemeProvider
      attribute="data-color-mode"
      defaultTheme="system"
      {...props}
    >
      {children}
    </NextThemeProvider>
  )
}
