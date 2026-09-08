"use client";

import {
  Box,
  UtensilsCrossed,
  Building2,
  Smartphone,
  Megaphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ContentType } from "@/types/generator";
import { useBrand } from "@/lib/brand-context";
import { cn } from "@/lib/utils";

const CONTENT_TYPES: { id: ContentType; label: string; icon: LucideIcon }[] = [
  { id: "produto", label: "Produto", icon: Box },
  { id: "receita", label: "Receita", icon: UtensilsCrossed },
  { id: "institucional", label: "Institucional", icon: Building2 },
  { id: "social", label: "Social", icon: Smartphone },
  { id: "campanha", label: "Campanha", icon: Megaphone },
  { id: "livre", label: "Livre", icon: Sparkles },
];

export function ContentTypeSelector({
  value,
  onChange,
}: {
  value: ContentType;
  onChange: (value: ContentType) => void;
}) {
  const { brand } = useBrand();

  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-text-primary">
        Tipo de conteúdo
      </p>
      <div className="flex flex-wrap gap-2">
        {CONTENT_TYPES.map(({ id, label, icon: Icon }) => {
          const isSelected = id === value;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={isSelected}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border px-4 py-2.5 text-xs font-medium transition-colors",
                isSelected
                  ? "border-2 text-text-primary"
                  : "border-border-subtle bg-surface-card text-text-secondary hover:border-border-strong hover:text-text-primary"
              )}
              style={
                isSelected
                  ? {
                      borderColor: brand.primaryColor,
                      backgroundColor: `${brand.primaryColor}14`,
                    }
                  : undefined
              }
            >
              <Icon
                size={17}
                className={isSelected ? "" : "text-text-tertiary"}
                style={isSelected ? { color: brand.accentColor } : undefined}
              />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
