"use client";

import { PrimeReactProvider } from "primereact/api";
import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

type PrimeReactProviderProps = {
  children: ReactNode;
};

export function AppPrimeReactProvider({
  children,
}: PrimeReactProviderProps) {
  return (
    <ThemeProvider>
      <PrimeReactProvider>{children}</PrimeReactProvider>
    </ThemeProvider>
  );
}
