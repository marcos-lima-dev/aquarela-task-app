// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"; // ← NOVA IMPORT AQUI

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task List - Aquarela Test",
  description: "Teste técnico React/Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-gray-50 dark:bg-gray-950 antialiased transition-colors duration-300",
          inter.className
        )}
      >
        {children}
        <Toaster /> {/* ← ESSA LINHA AQUI! Renderiza toasts globais, com posição default no topo */}
      </body>
    </html>
  );
}