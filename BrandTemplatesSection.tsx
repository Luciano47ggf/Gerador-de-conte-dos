"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useBrand } from "@/lib/brand-context";

export function BrandTemplatesSection() {
  const { brand } = useBrand();

  return (
    <section>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h2 className="text-base font-semibold text-text-primary">
            Modelos da marca
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Use nossos modelos prontos e personalize com novas informações.
          </p>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          Ver todos
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {brand.templates.map((template) => (
          <button
            key={template.id}
            type="button"
            className="group flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface-card text-left transition-colors hover:border-border-strong"
          >
            <div className="relative flex h-28 items-center justify-center overflow-hidden bg-bg-base">
              <Image
                src={template.coverImage}
                alt={template.name}
                width={160}
                height={160}
                className="h-full w-full object-contain p-3 transition-transform group-hover:scale-105"
              />
            </div>
            <div className="px-3 py-2.5">
              <p className="text-sm font-medium text-text-primary">
                {template.name}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
