"use client";

import { Download, Star, Sparkles } from "lucide-react";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { useBrand } from "@/lib/brand-context";
import { cn } from "@/lib/utils";
import { CAMPAIGN_CHANNELS, type GenerationResult, type ImageFormat } from "@/types/generator";

const ASPECT_RATIO: Record<ImageFormat, string> = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "9:16": "aspect-[9/16]",
  "16:9": "aspect-[16/9]",
};

export function ResultCard({
  result,
  format,
  onToggleFavorite,
  onGenerateVariation,
  onUseAsReference,
  onDelete,
  onDownload,
}: {
  result: GenerationResult | null;
  format: ImageFormat;
  onToggleFavorite?: () => void;
  onGenerateVariation?: () => void;
  onUseAsReference?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
}) {
  const { brand } = useBrand();

  if (!result) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-subtle bg-surface-card",
          ASPECT_RATIO[format]
        )}
      >
        <Sparkles size={18} className="text-text-tertiary" />
        <p className="px-4 text-center text-xs text-text-tertiary">
          Aguardando geração
        </p>
      </div>
    );
  }

  // No Modo Campanha, cada resultado tem seu próprio formato de canal —
  // o card sempre reflete o formato real do resultado, não o formato global.
  const resultFormat = result.request.format;
  const channelLabel = result.request.campaignChannel
    ? CAMPAIGN_CHANNELS.find((c) => c.id === result.request.campaignChannel)?.label
    : null;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface-card">
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden",
          ASPECT_RATIO[resultFormat]
        )}
        style={{
          background: `linear-gradient(150deg, ${brand.primaryColor}55 0%, ${brand.secondaryColor}55 55%, #0b0e14 100%)`,
        }}
      >
        <Sparkles size={22} style={{ color: brand.accentColor }} />
        {channelLabel && (
          <span className="absolute left-2 top-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80">
            {channelLabel}
          </span>
        )}
        <span className="absolute bottom-2 left-2 right-2 truncate rounded bg-black/40 px-2 py-1 text-[10px] text-white/80">
          {result.request.prompt || "Sem descrição"}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 p-2.5">
        <button
          type="button"
          onClick={onDownload}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:bg-surface-card-hover hover:text-text-primary"
        >
          <Download size={13} />
          Baixar
        </button>
        <button
          type="button"
          onClick={onToggleFavorite}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-colors hover:bg-surface-card-hover",
            result.isFavorite ? "text-yellow-400" : "text-text-secondary hover:text-text-primary"
          )}
        >
          <Star size={13} fill={result.isFavorite ? "currentColor" : "none"} />
          Favoritar
        </button>
        <DropdownMenu
          items={[
            { label: "Baixar", onSelect: () => onDownload?.() },
            { label: "Favoritar", onSelect: () => onToggleFavorite?.() },
            { label: "Gerar variação", onSelect: () => onGenerateVariation?.() },
            { label: "Usar como referência", onSelect: () => onUseAsReference?.() },
            { label: "Excluir", onSelect: () => onDelete?.(), destructive: true },
          ]}
        />
      </div>
    </div>
  );
}
