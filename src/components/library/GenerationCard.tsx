"use client";

import Image from "next/image";
import { Sparkles, Star } from "lucide-react";
import { getBrand } from "@/brands";
import { cn } from "@/lib/utils";
import { CAMPAIGN_CHANNELS, type GenerationResult } from "@/types/generator";

export interface GenerationCardAction {
  label: string;
  onClick: () => void;
  icon: React.ComponentType<{ size?: number }>;
}

const CONTENT_TYPE_LABELS: Record<string, string> = {
  produto: "Produto",
  receita: "Receita",
  institucional: "Institucional",
  social: "Social",
  campanha: "Campanha",
  livre: "Livre",
};

export function GenerationCard({
  generation,
  actions,
  onToggleFavorite,
}: {
  generation: GenerationResult;
  actions: GenerationCardAction[];
  onToggleFavorite?: () => void;
}) {
  const brand = getBrand(generation.request.brandId);
  const date = new Date(generation.createdAt);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface-card">
      <div
        className="relative flex aspect-square items-center justify-center overflow-hidden"
        style={
          generation.imageUrl
            ? undefined
            : {
                background: `linear-gradient(150deg, ${brand.primaryColor}55 0%, ${brand.secondaryColor}55 55%, #0b0e14 100%)`,
              }
        }
      >
        {generation.imageUrl ? (
          <Image
            src={generation.imageUrl}
            alt={generation.request.prompt || "Imagem gerada"}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <Sparkles size={20} style={{ color: brand.accentColor }} />
        )}
        {onToggleFavorite && (
          <button
            type="button"
            onClick={onToggleFavorite}
            aria-label="Favoritar"
            className={cn(
              "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors",
              generation.isFavorite ? "text-yellow-400" : "text-white/80 hover:text-white"
            )}
          >
            <Star size={14} fill={generation.isFavorite ? "currentColor" : "none"} />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="line-clamp-2 text-xs text-text-secondary">
          {generation.request.prompt || "Sem descrição"}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary">
          <span className="rounded bg-bg-base px-1.5 py-0.5">{brand.name}</span>
          <span className="rounded bg-bg-base px-1.5 py-0.5">
            {CONTENT_TYPE_LABELS[generation.request.contentType]}
          </span>
          {generation.request.campaignChannel ? (
            <span className="rounded bg-bg-base px-1.5 py-0.5">
              {CAMPAIGN_CHANNELS.find((c) => c.id === generation.request.campaignChannel)?.label}
            </span>
          ) : (
            <span className="rounded bg-bg-base px-1.5 py-0.5">
              {generation.request.format}
            </span>
          )}
          <span>{date.toLocaleDateString("pt-BR")}</span>
        </div>

        <div className="mt-auto flex flex-wrap gap-1 pt-1">
          {actions.map(({ label, onClick, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-text-secondary transition-colors hover:bg-surface-card-hover hover:text-text-primary"
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
