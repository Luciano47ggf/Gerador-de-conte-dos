"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useBrand } from "@/lib/brand-context";
import type { AssetCategory, BrandAsset } from "@/types/brand";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: AssetCategory; label: string }[] = [
  { id: "produtos", label: "Produtos" },
  { id: "embalagens", label: "Embalagens" },
  { id: "logos", label: "Logos" },
  { id: "elementos", label: "Elementos" },
  { id: "fundos", label: "Fundos" },
  { id: "imagens-aprovadas", label: "Imagens aprovadas" },
];

export function AssetPickerModal({
  onClose,
  selectedIds,
  onToggleAsset,
  initialCategory = "embalagens",
}: {
  onClose: () => void;
  selectedIds: string[];
  onToggleAsset: (asset: BrandAsset) => void;
  initialCategory?: AssetCategory;
}) {
  const { brand } = useBrand();
  const [category, setCategory] = useState<AssetCategory>(initialCategory);

  const assets = useMemo(
    () => brand.assets.filter((a) => a.category === category),
    [brand, category]
  );

  return (
    <Modal title="Selecionar do acervo" onClose={onClose} widthClassName="max-w-3xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
        <nav className="sm:w-44 sm:shrink-0">
          <p className="mb-2 px-1 text-[11px] font-semibold tracking-[0.1em] text-text-tertiary">
            CATEGORIAS
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:flex-col sm:gap-0.5 sm:overflow-visible sm:pb-0">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-md px-3 py-2 text-left text-sm transition-colors",
                  c.id === category
                    ? "bg-surface-card-hover text-text-primary"
                    : "text-text-secondary hover:bg-surface-card hover:text-text-primary"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="min-h-[280px] flex-1">
          {assets.length === 0 ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-lg border border-dashed border-border-subtle text-center">
              <p className="text-sm text-text-secondary">
                Nenhum item cadastrado nesta categoria ainda.
              </p>
              <p className="mt-1 text-xs text-text-tertiary">
                Novos assets de {brand.name} podem ser adicionados ao acervo.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {assets.map((asset) => {
                const isSelected = selectedIds.includes(asset.id);
                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => onToggleAsset(asset)}
                    className={cn(
                      "group relative flex flex-col overflow-hidden rounded-lg border bg-surface-card text-left transition-colors",
                      isSelected
                        ? "border-2"
                        : "border-border-subtle hover:border-border-strong"
                    )}
                    style={isSelected ? { borderColor: brand.primaryColor } : undefined}
                  >
                    <div className="relative flex h-28 items-center justify-center bg-bg-base p-3">
                      <Image
                        src={asset.image}
                        alt={asset.name}
                        width={160}
                        height={160}
                        className="h-full w-full object-contain"
                      />
                      {isSelected && (
                        <span
                          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-white"
                          style={{ backgroundColor: brand.primaryColor }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                      )}
                    </div>
                    <div className="px-2.5 py-2">
                      <p className="truncate text-xs font-medium text-text-primary">
                        {asset.name}
                      </p>
                      <p className="truncate text-[11px] text-text-tertiary">
                        {brand.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
