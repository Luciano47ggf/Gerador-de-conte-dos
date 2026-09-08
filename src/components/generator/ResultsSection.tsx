"use client";

import { Download } from "lucide-react";
import { ResultCard } from "./ResultCard";
import type { GenerationResult, ImageFormat } from "@/types/generator";

export function ResultsSection({
  results,
  format,
  onToggleFavorite,
  onGenerateVariation,
  onUseAsReference,
  onDelete,
  onDownload,
  onDownloadAll,
}: {
  results: (GenerationResult | null)[];
  format: ImageFormat;
  onToggleFavorite: (id: string) => void;
  onGenerateVariation: (id: string) => void;
  onUseAsReference: (id: string) => void;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  onDownloadAll: () => void;
}) {
  const hasAnyResult = results.some((r) => r !== null);

  return (
    <section>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h2 className="text-base font-semibold text-text-primary">
            Resultados
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Imagens geradas com base no seu pedido. Escolha, baixe ou salve
            nos favoritos.
          </p>
        </div>
        <button
          type="button"
          onClick={onDownloadAll}
          disabled={!hasAnyResult}
          className="flex shrink-0 items-center gap-2 rounded-lg border border-border-subtle bg-surface-card px-3.5 py-2 text-sm text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Download size={15} />
          Baixar todas
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {results.map((result, i) => (
          <ResultCard
            key={result?.id ?? `empty-${i}`}
            result={result}
            format={format}
            onToggleFavorite={() => result && onToggleFavorite(result.id)}
            onGenerateVariation={() => result && onGenerateVariation(result.id)}
            onUseAsReference={() => result && onUseAsReference(result.id)}
            onDelete={() => result && onDelete(result.id)}
            onDownload={() => result && onDownload(result.id)}
          />
        ))}
      </div>
    </section>
  );
}
