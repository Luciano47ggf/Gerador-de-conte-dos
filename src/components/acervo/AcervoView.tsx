"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { brandList } from "@/brands";
import type { AssetCategory, BrandAsset, BrandId } from "@/types/brand";
import { cn } from "@/lib/utils";

const CATEGORY_OPTIONS: { id: AssetCategory | "todas"; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "produtos", label: "Produtos" },
  { id: "embalagens", label: "Embalagens" },
  { id: "logos", label: "Logos" },
  { id: "elementos", label: "Elementos" },
  { id: "fundos", label: "Fundos" },
  { id: "imagens-aprovadas", label: "Imagens aprovadas" },
];

const BRAND_OPTIONS: { id: BrandId | "todas"; label: string }[] = [
  { id: "todas", label: "Ambas" },
  { id: "saciatta", label: "Saciatta" },
  { id: "vinuta", label: "Vinuta" },
];

type SortOrder = "recentes" | "az";

export function AcervoView() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("categoria") as AssetCategory | null) ?? "todas";

  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState<BrandId | "todas">("todas");
  const [categoryFilter, setCategoryFilter] = useState<AssetCategory | "todas">(
    initialCategory
  );
  const [sort, setSort] = useState<SortOrder>("recentes");

  const allAssets = useMemo(
    () =>
      brandList.flatMap((brand) =>
        brand.assets.map((asset) => ({ asset, brandId: brand.id }))
      ),
    []
  );

  const filtered = useMemo(() => {
    let list = allAssets;
    if (brandFilter !== "todas") {
      list = list.filter((item) => item.brandId === brandFilter);
    }
    if (categoryFilter !== "todas") {
      list = list.filter((item) => item.asset.category === categoryFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((item) => item.asset.name.toLowerCase().includes(q));
    }
    if (sort === "az") {
      list = [...list].sort((a, b) => a.asset.name.localeCompare(b.asset.name, "pt-BR"));
    }
    return list;
  }, [allAssets, brandFilter, categoryFilter, search, sort]);

  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Acervo</h1>
        <p className="mt-1.5 text-sm text-text-secondary">
          Biblioteca de produtos, embalagens, logos e demais materiais oficiais
          das marcas.
        </p>
      </div>

      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar produtos, embalagens, logos..."
          className="w-full rounded-lg border border-border-subtle bg-surface-card py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-strong"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_OPTIONS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoryFilter(c.id)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                categoryFilter === c.id
                  ? "border-border-strong bg-surface-card-hover text-text-primary"
                  : "border-border-subtle bg-surface-card text-text-secondary hover:text-text-primary"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value as BrandId | "todas")}
            className="rounded-md border border-border-subtle bg-surface-card px-2.5 py-1.5 text-xs text-text-secondary outline-none"
          >
            {BRAND_OPTIONS.map((b) => (
              <option key={b.id} value={b.id}>
                Marca: {b.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOrder)}
            className="rounded-md border border-border-subtle bg-surface-card px-2.5 py-1.5 text-xs text-text-secondary outline-none"
          >
            <option value="recentes">Data: mais recentes</option>
            <option value="az">Data: A–Z</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle py-16 text-center">
          <p className="text-sm text-text-secondary">
            Nenhum item encontrado com esses filtros.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map(({ asset, brandId }) => (
            <AcervoCard key={`${brandId}-${asset.id}`} asset={asset} brandId={brandId} />
          ))}
        </div>
      )}
    </div>
  );
}

function AcervoCard({ asset, brandId }: { asset: BrandAsset; brandId: BrandId }) {
  const brandLabel = brandId === "saciatta" ? "Saciatta" : "Vinuta";
  const categoryLabel =
    CATEGORY_OPTIONS.find((c) => c.id === asset.category)?.label ?? asset.category;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface-card">
      <div className="flex h-32 items-center justify-center bg-bg-base p-4">
        <Image
          src={asset.image}
          alt={asset.name}
          width={160}
          height={160}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="px-3 py-2.5">
        <p className="truncate text-sm font-medium text-text-primary">{asset.name}</p>
        <p className="mt-0.5 truncate text-xs text-text-tertiary">
          {brandLabel} · {categoryLabel}
        </p>
      </div>
    </div>
  );
}
