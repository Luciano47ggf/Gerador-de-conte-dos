"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import type { SidebarSection } from "@/components/layout/SidebarNav";
import { GeneratorView } from "@/components/generator/GeneratorView";

export default function Home() {
  const [section, setSection] = useState<SidebarSection>("gerador");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-base">
      <Sidebar
        active={section}
        onSelectSection={(s) => {
          setSection(s);
          setMobileMenuOpen(false);
        }}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Barra superior — visível apenas em telas menores que md (mobile) */}
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
            Gerador de Conteúdo
          </span>
        </div>

        <main className="flex-1 overflow-y-auto p-5 sm:p-7 lg:p-10">
          {section === "gerador" ? (
            <GeneratorView />
          ) : (
            <p className="text-sm text-text-secondary">
              Seção &ldquo;{section}&rdquo; será construída na Fase 2.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
