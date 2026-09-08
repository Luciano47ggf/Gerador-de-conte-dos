"use client";

import {
  Box,
  Package,
  Copyright,
  Shapes,
  Layers,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import type { AssetCategory } from "@/types/brand";
import { cn } from "@/lib/utils";

const LIBRARY_ITEMS: { id: AssetCategory; label: string; icon: LucideIcon }[] = [
  { id: "produtos", label: "Produtos", icon: Box },
  { id: "embalagens", label: "Embalagens", icon: Package },
  { id: "logos", label: "Logos", icon: Copyright },
  { id: "elementos", label: "Elementos", icon: Shapes },
  { id: "fundos", label: "Fundos", icon: Layers },
  { id: "imagens-aprovadas", label: "Imagens aprovadas", icon: CheckCircle2 },
];

export function SidebarBrandLibrary({
  onSelect,
  collapsed = false,
}: {
  onSelect?: (category: AssetCategory) => void;
  collapsed?: boolean;
}) {
  if (collapsed) {
    return (
      <div className="px-2">
        <div className="flex flex-col gap-0.5">
          {LIBRARY_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              title={label}
              onClick={() => onSelect?.(id)}
              className="flex items-center justify-center rounded-lg px-2.5 py-2 text-text-secondary transition-colors hover:bg-surface-card hover:text-text-primary"
            >
              <Icon size={16} strokeWidth={2} className="text-text-tertiary" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <p className="px-3.5 pt-6 pb-2 text-[11px] font-semibold tracking-[0.14em] text-text-tertiary">
        ACERVO DA MARCA
      </p>
      <div className="flex flex-col gap-0.5">
        {LIBRARY_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect?.(id)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3.5 py-2 text-sm text-text-secondary transition-colors",
              "hover:bg-surface-card hover:text-text-primary"
            )}
          >
            <Icon size={16} strokeWidth={2} className="text-text-tertiary" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
