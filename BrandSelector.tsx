"use client";

import Image from "next/image";
import { brandList } from "@/brands";
import { useBrand } from "@/lib/brand-context";
import { cn } from "@/lib/utils";

export function BrandSelector() {
  const { brandId, setBrandId } = useBrand();

  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-text-primary">Marca</p>
      <div className="grid grid-cols-2 gap-3">
        {brandList.map((b) => {
          const isSelected = b.id === brandId;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => setBrandId(b.id)}
              aria-pressed={isSelected}
              className={cn(
                "relative flex h-24 items-center justify-center rounded-xl border bg-surface-card px-6 transition-colors",
                isSelected
                  ? "border-2"
                  : "border border-border-subtle hover:border-border-strong"
              )}
              style={
                isSelected
                  ? { borderColor: b.primaryColor, backgroundColor: `${b.primaryColor}14` }
                  : undefined
              }
            >
              <span
                className={cn(
                  "absolute right-3 top-3 h-2.5 w-2.5 rounded-full border",
                  isSelected ? "border-transparent" : "border-border-strong"
                )}
                style={isSelected ? { backgroundColor: b.primaryColor } : undefined}
              />
              <Image
                src={b.logo}
                alt={b.name}
                width={160}
                height={64}
                className="h-10 w-auto object-contain"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
