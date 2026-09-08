"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { GeneratorHeader } from "./GeneratorHeader";
import { PromptBox } from "./PromptBox";
import { BrandSelector } from "./BrandSelector";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { FormatSelector } from "./FormatSelector";
import { LibraryPickerButton } from "./LibraryPickerButton";
import { GeneratorActions } from "./GeneratorActions";
import { AdvancedSettingsModal } from "./AdvancedSettingsModal";
import { ResultsSection } from "./ResultsSection";
import { BrandTemplatesSection } from "./BrandTemplatesSection";
import { AssetPickerModal } from "@/components/library/AssetPickerModal";
import { useBrand } from "@/lib/brand-context";
import type {
  ContentType,
  ImageFormat,
  AdvancedSettings,
  GenerationResult,
} from "@/types/generator";
import type { BrandAsset } from "@/types/brand";

const DEFAULT_ADVANCED: AdvancedSettings = {
  style: "fotografico",
  quantity: 1,
  quality: "alta",
  creativity: "media",
  applyBrandIdentity: true,
};

export function GeneratorView() {
  const { brand } = useBrand();
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState<ContentType>("produto");
  const [format, setFormat] = useState<ImageFormat>("1:1");
  const [advanced, setAdvanced] = useState<AdvancedSettings>(DEFAULT_ADVANCED);
  const [selectedAssets, setSelectedAssets] = useState<BrandAsset[]>([]);
  const [isAssetModalOpen, setAssetModalOpen] = useState(false);
  const [isAdvancedModalOpen, setAdvancedModalOpen] = useState(false);
  const [results, setResults] = useState<(GenerationResult | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const selectedIds = useMemo(() => selectedAssets.map((a) => a.id), [selectedAssets]);

  function handleGenerate() {
    const filled: GenerationResult[] = Array.from({ length: advanced.quantity }).map(
      (_, i) => ({
        id: `${Date.now()}-${i}`,
        imageUrl: "",
        request: {
          brandId: brand.id,
          prompt,
          contentType,
          format,
          referenceAssetIds: selectedIds,
          advanced,
        },
        createdAt: new Date().toISOString(),
        isFavorite: false,
      })
    );
    setResults([...filled, ...Array(4 - filled.length).fill(null)]);
  }

  function updateResult(id: string, updater: (r: GenerationResult) => GenerationResult) {
    setResults((prev) => prev.map((r) => (r?.id === id ? updater(r) : r)));
  }

  function removeResult(id: string) {
    setResults((prev) => prev.map((r) => (r?.id === id ? null : r)));
  }

  function toggleAsset(asset: BrandAsset) {
    setSelectedAssets((prev) =>
      prev.some((a) => a.id === asset.id)
        ? prev.filter((a) => a.id !== asset.id)
        : [...prev, asset]
    );
  }

  function removeAsset(id: string) {
    setSelectedAssets((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-7">
      <GeneratorHeader />
      <PromptBox value={prompt} onChange={setPrompt} />

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-8">
        <BrandSelector />
        <ContentTypeSelector value={contentType} onChange={setContentType} />
        <FormatSelector value={format} onChange={setFormat} />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <LibraryPickerButton onClick={() => setAssetModalOpen(true)} />
          {selectedAssets.map((asset) => (
            <span
              key={asset.id}
              className="flex items-center gap-2 rounded-lg border border-border-subtle bg-surface-card py-1 pl-1 pr-2 text-xs text-text-secondary"
            >
              <Image
                src={asset.image}
                alt={asset.name}
                width={24}
                height={24}
                className="h-6 w-6 rounded object-contain"
              />
              {asset.name}
              <button
                type="button"
                onClick={() => removeAsset(asset.id)}
                aria-label={`Remover ${asset.name}`}
                className="text-text-tertiary hover:text-text-primary"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-tertiary">
            {advanced.quantity} imagem{advanced.quantity > 1 ? "ns" : ""} ·{" "}
            {advanced.quality === "alta" ? "Alta qualidade" : "Qualidade padrão"} ·
            Identidade {brand.name}{advanced.applyBrandIdentity ? " aplicada" : " desativada"}
          </p>
          <GeneratorActions
            onOpenAdvanced={() => setAdvancedModalOpen(true)}
            onGenerate={handleGenerate}
          />
        </div>
      </div>

      <ResultsSection
        results={results}
        format={format}
        onToggleFavorite={(id) =>
          updateResult(id, (r) => ({ ...r, isFavorite: !r.isFavorite }))
        }
        onGenerateVariation={handleGenerate}
        onUseAsReference={() => {}}
        onDelete={removeResult}
        onDownload={() => {}}
        onDownloadAll={() => {}}
      />

      <BrandTemplatesSection />

      {isAssetModalOpen && (
        <AssetPickerModal
          onClose={() => setAssetModalOpen(false)}
          selectedIds={selectedIds}
          onToggleAsset={toggleAsset}
        />
      )}

      {isAdvancedModalOpen && (
        <AdvancedSettingsModal
          settings={advanced}
          onChange={setAdvanced}
          onClose={() => setAdvancedModalOpen(false)}
        />
      )}
    </div>
  );
}
