// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeProvider } from "next-themes";

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
        {/* ThemeProvider precisa envolver TUDO, inclusive o Toaster e o Toggle */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="top-center" richColors closeButton />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}