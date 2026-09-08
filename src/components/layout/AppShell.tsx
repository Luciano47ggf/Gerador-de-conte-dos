"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { SECTION_PATHS, sectionFromPathname } from "@/lib/routes";
import type { AssetCategory } from "@/types/brand";

const SECTION_LABELS: Record<string, string> = {
  gerador: "Gerador de Conteúdo",
  acervo: "Acervo",
  historico: "Histórico",
  favoritos: "Favoritos",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const active = sectionFromPathname(pathname);

  function goToSection(section: keyof typeof SECTION_PATHS) {
    router.push(SECTION_PATHS[section]);
    setMobileMenuOpen(false);
  }

  function goToLibraryCategory(category: AssetCategory) {
    router.push(`/acervo?categoria=${category}`);
    setMobileMenuOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-bg-base">
      <Sidebar
        active={active}
        onSelectSection={goToSection}
        onSelectLibraryCategory={goToLibraryCategory}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu"
            className="rounded-md p-1.5 text-text-secondary hover:bg-surface-card hover:text-text-primary"
          >
            <Menu size={18} />
          </button>
          <span className="text-sm font-medium text-text-primary">
            {SECTION_LABELS[active]}
          </span>
        </div>

        <main className="flex-1 overflow-y-auto p-5 sm:p-7 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
