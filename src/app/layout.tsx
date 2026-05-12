import type { Metadata } from "next";
import { AppPrimeReactProvider } from "../providers/prime-react-provider";

import "primeicons/primeicons.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "SKYNET-VISION",
  description:
    "Plataforma de visão computacional para monitoramento inteligente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppPrimeReactProvider>{children}</AppPrimeReactProvider>
      </body>
    </html>
  );
}