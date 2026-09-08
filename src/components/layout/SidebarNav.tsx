"use client";

import { Sparkles, Image as ImageIcon, History, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarSection = "gerador" | "acervo" | "historico" | "favoritos";

const NAV_ITEMS: { id: SidebarSection; label: string; icon: typeof Sparkles }[] = [
  { id: "gerador", label: "Gerador", icon: Sparkles },
  { id: "acervo", label: "Acervo", icon: ImageIcon },
  { id: "historico", label: "Histórico", icon: History },
  { id: "favoritos", label: "Favoritos", icon: Star },
];

export function SidebarNav({
  active,
  onSelect,
  collapsed = false,
}: {
  active: SidebarSection;
  onSelect: (section: SidebarSection) => void;
  collapsed?: boolean;
}) {
  return (
    <nav className={cn("flex flex-col gap-1", collapsed ? "px-2" : "px-4")}>
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            title={collapsed ? label : undefined}
            onClick={() => onSelect(id)}
            className={cn(
              "group flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium border border-transparent transition-colors",
              collapsed ? "justify-center px-2.5" : "px-3.5",
              isActive
                ? "bg-brand-primary/15 border-brand-primary/40 text-text-primary"
                : "text-text-secondary hover:bg-surface-card hover:text-text-primary"
            )}
          >
            <Icon
              size={17}
              strokeWidth={2}
              className={cn(isActive ? "text-brand-accent" : "text-text-tertiary group-hover:text-text-secondary")}
            />
            {!collapsed && label}
          </button>
        );
      })}
    </nav>
  );
}
