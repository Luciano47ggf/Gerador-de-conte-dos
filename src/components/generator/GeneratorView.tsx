"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { GeneratorHeader } from "./GeneratorHeader";
import { PromptBox } from "./PromptBox";
import { BrandSelector } from "./BrandSelector";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { FormatSelector } from "./FormatSelector";
import { CampaignChannelSelector } from "./CampaignChannelSelector";
import { LibraryPickerButton } from "./LibraryPickerButton";
import { GeneratorActions } from "./GeneratorActions";
import { AdvancedSettingsModal } from "./AdvancedSettingsModal";
import { ResultsSection } from "./ResultsSection";
import { BrandTemplatesSection } from "./BrandTemplatesSection";
import { AssetPickerModal } from "@/components/library/AssetPickerModal";
import { useBrand } from "@/lib/brand-context";
import { useGenerations } from "@/lib/use-generations";
import {
  CAMPAIGN_CHANNELS,
  type ContentType,
  type ImageFormat,
  type AdvancedSettings,
  type GenerationResult,
  type CampaignChannelId,
} from "@/types/generator";
import type { BrandAsset, BrandId } from "@/types/brand";

const DEFAULT_ADVANCED: AdvancedSettings = {
  style: "fotografico",
  quantity: 1,
  quality: "alta",
  creativity: "media",
  applyBrandIdentity: true,
};

function isBrandId(value: string | null): value is BrandId {
  return value === "saciatta" || value === "vinuta";
}
function isContentType(value: string | null): value is ContentType {
  return !!value && ["produto", "receita", "institucional", "social", "campanha", "livre"].includes(value);
}
function isImageFormat(value: string | null): value is ImageFormat {
  return !!value && ["1:1", "4:5", "9:16", "16:9"].includes(value);
}

export function GeneratorView() {
  const { brand, setBrandId } = useBrand();
  const searchParams = useSearchParams();
  const { generations, addGenerations, removeGeneration, toggleFavorite } =
    useGenerations();
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState<ContentType>("produto");
  const [format, setFormat] = useState<ImageFormat>("1:1");
  const [advanced, setAdvanced] = useState<AdvancedSettings>(DEFAULT_ADVANCED);
  const [selectedAssets, setSelectedAssets] = useState<BrandAsset[]>([]);
  const [isAssetModalOpen, setAssetModalOpen] = useState(false);
  const [isAdvancedModalOpen, setAdvancedModalOpen] = useState(false);
  const [lastBatchIds, setLastBatchIds] = useState<string[]>([]);
  const [campaignChannels, setCampaignChannels] = useState<CampaignChannelId[]>(
    CAMPAIGN_CHANNELS.map((c) => c.id)
  );
  const isCampaignMode = contentType === "campanha";

  // Pré-preenche o formulário quando chega do Histórico/Favoritos
  // ("Editar prompt", "Gerar novamente", "Criar variação", "Usar como referência").
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    const promptParam = searchParams.get("prompt");
    const tipoParam = searchParams.get("tipo");
    const formatoParam = searchParams.get("formato");

    if (isBrandId(brandParam)) setBrandId(brandParam);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (promptParam) setPrompt(promptParam);
    if (isContentType(tipoParam)) setContentType(tipoParam);
    if (isImageFormat(formatoParam)) setFormat(formatoParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedIds = useMemo(() => selectedAssets.map((a) => a.id), [selectedAssets]);

  const results: (GenerationResult | null)[] = useMemo(() => {
    const byId = new Map(generations.map((g) => [g.id, g]));
    const slots = lastBatchIds.map((id) => byId.get(id) ?? null);
    return [...slots, ...Array(4 - slots.length).fill(null)].slice(0, 4);
  }, [generations, lastBatchIds]);

  function handleGenerate() {
    if (isCampaignMode) {
      const campaignId = `campaign-${Date.now()}`;
      const channels = CAMPAIGN_CHANNELS.filter((c) => campaignChannels.includes(c.id));
      const filled: GenerationResult[] = channels.map((channel, i) => ({
        id: `${Date.now()}-${i}`,
        imageUrl: "",
        request: {
          brandId: brand.id,
          prompt,
          contentType,
          format: channel.format,
          referenceAssetIds: selectedIds,
          advanced,
          campaignId,
          campaignChannel: channel.id,
        },
        createdAt: new Date().toISOString(),
        isFavorite: false,
      }));
      addGenerations(filled);
      setLastBatchIds(filled.map((r) => r.id));
      return;
    }

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
    addGenerations(filled);
    setLastBatchIds(filled.map((r) => r.id));
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
        {isCampaignMode ? (
          <CampaignChannelSelector value={campaignChannels} onChange={setCampaignChannels} />
        ) : (
          <FormatSelector value={format} onChange={setFormat} />
        )}
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
            {isCampaignMode
              ? `${campaignChannels.length} canal${campaignChannels.length !== 1 ? "is" : ""} · mesma direção criativa`
              : `${advanced.quantity} imagem${advanced.quantity > 1 ? "ns" : ""} · ${advanced.quality === "alta" ? "Alta qualidade" : "Qualidade padrão"}`}
            {" · "}Identidade {brand.name}{advanced.applyBrandIdentity ? " aplicada" : " desativada"}
          </p>
          <GeneratorActions
            onOpenAdvanced={() => setAdvancedModalOpen(true)}
            onGenerate={handleGenerate}
            disabled={isCampaignMode && campaignChannels.length === 0}
          />
        </div>
      </div>

      <ResultsSection
        results={results}
        format={isCampaignMode ? "1:1" : format}
        onToggleFavorite={toggleFavorite}
        onGenerateVariation={handleGenerate}
        onUseAsReference={() => {}}
        onDelete={removeGeneration}
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
