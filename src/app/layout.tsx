import type { Metadata } from "next";
import { BrandProvider } from "@/lib/brand-context";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gerador de Conteúdo | Saciatta + Vinuta",
  description:
    "Plataforma interna de geração de conteúdo por IA para Saciatta e Vinuta.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary">
        <BrandProvider>
          <AppShell>{children}</AppShell>
        </BrandProvider>
      </body>
    </html>
  );
}
