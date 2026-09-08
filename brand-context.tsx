"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BrandConfig, BrandId } from "@/types/brand";
import { getBrand } from "@/brands";

interface BrandContextValue {
  brandId: BrandId;
  brand: BrandConfig;
  setBrandId: (id: BrandId) => void;
}

const BrandContext = createContext<BrandContextValue | null>(null);

/**
 * Fonte única da identidade visual ativa.
 * Trocar a marca aqui propaga para toda a árvore de componentes,
 * incluindo as variáveis CSS usadas pelos elementos "ativos" da UI
 * (botões, bordas de seleção, indicadores).
 */
export function BrandProvider({
  children,
  defaultBrandId = "saciatta",
}: {
  children: ReactNode;
  defaultBrandId?: BrandId;
}) {
  const [brandId, setBrandId] = useState<BrandId>(defaultBrandId);
  const brand = useMemo(() => getBrand(brandId), [brandId]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--brand-primary", brand.primaryColor);
    root.style.setProperty("--brand-secondary", brand.secondaryColor);
    root.style.setProperty("--brand-accent", brand.accentColor);
    root.style.setProperty("--brand-on-primary", brand.onPrimaryColor);
  }, [brand]);

  const value = useMemo(
    () => ({ brandId, brand, setBrandId }),
    [brandId, brand]
  );

  return (
    <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error("useBrand deve ser usado dentro de um BrandProvider");
  }
  return ctx;
}
