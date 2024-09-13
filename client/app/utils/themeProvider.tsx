"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvides } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function themeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvides {...props}>{children}</NextThemesProvides>;
}
