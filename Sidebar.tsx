"use client";

import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { SidebarBrandHeader } from "./SidebarBrandHeader";
import { SidebarNav, type SidebarSection } from "./SidebarNav";
import { SidebarBrandLibrary } from "./SidebarBrandLibrary";
import { SidebarUserFooter } from "./SidebarUserFooter";
import type { AssetCategory } from "@/types/brand";
import { cn } from "@/lib/utils";

export function Sidebar({
  active,
  onSelectSection,
  onSelectLibraryCategory,
  isMobileOpen = false,
  onCloseMobile,
}: {
  active: SidebarSection;
  onSelectSection: (section: SidebarSection) => void;
  onSelectLibraryCategory?: (category: AssetCategory) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Backdrop — apenas mobile, quando o drawer está aberto */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={onCloseMobile}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "flex h-screen shrink-0 flex-col border-r border-border-subtle bg-bg-elevated transition-[width,transform] duration-200",
          // Mobile: drawer fixo, some ou aparece por transform
          "fixed inset-y-0 left-0 z-40 w-[288px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          // Tablet/Desktop: sempre visível, posição estática, largura conforme colapso
          "md:static md:translate-x-0",
          collapsed ? "md:w-[84px]" : "md:w-[336px]"
        )}
      >
        <div className="flex items-center justify-end px-2 pt-2 md:hidden">
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Fechar menu"
            className="rounded-md p-1.5 text-text-tertiary hover:bg-surface-card hover:text-text-primary"
          >
            <X size={16} />
          </button>
        </div>

        <SidebarBrandHeader collapsed={collapsed} />

        <div className="flex-1 overflow-y-auto pb-4">
          <SidebarNav active={active} onSelect={onSelectSection} collapsed={collapsed} />
          <div className={cn("my-5 h-px bg-border-subtle", collapsed ? "mx-2" : "mx-4")} />
          <SidebarBrandLibrary onSelect={onSelectLibraryCategory} collapsed={collapsed} />
        </div>

        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="hidden items-center justify-center gap-2 border-t border-border-subtle py-2.5 text-xs text-text-tertiary transition-colors hover:bg-surface-card hover:text-text-secondary md:flex"
        >
          {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          {!collapsed && "Recolher"}
        </button>

        <SidebarUserFooter collapsed={collapsed} />
      </aside>
    </>
  );
}
