"use client";

import { Settings2, Sparkles, Loader2 } from "lucide-react";
import { useBrand } from "@/lib/brand-context";

export function GeneratorActions({
  onOpenAdvanced,
  onGenerate,
  disabled = false,
  isGenerating = false,
}: {
  onOpenAdvanced?: () => void;
  onGenerate?: () => void;
  disabled?: boolean;
  isGenerating?: boolean;
}) {
  const { brand } = useBrand();

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <button
        type="button"
        onClick={onOpenAdvanced}
        className="flex items-center gap-2 rounded-lg border border-border-subtle bg-surface-card px-4 py-2.5 text-sm text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
      >
        <Settings2 size={15} />
        Configurações avançadas
      </button>
      <button
        type="button"
        onClick={onGenerate}
        disabled={disabled}
        className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ backgroundColor: brand.primaryColor, color: brand.onPrimaryColor }}
      >
        {isGenerating ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
        {isGenerating ? "Gerando..." : "Gerar imagem"}
      </button>
    </div>
  );
}
