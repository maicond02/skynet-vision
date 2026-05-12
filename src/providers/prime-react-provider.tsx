"use client";

import { PrimeReactProvider } from "primereact/api";
import type { ReactNode } from "react";

type PrimeReactProviderProps = {
  children: ReactNode;
};

export function AppPrimeReactProvider({
  children,
}: PrimeReactProviderProps) {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
}