"use client";

import { Modal } from "@/components/ui/Modal";
import { OptionPillGroup } from "@/components/ui/OptionPillGroup";
import { useBrand } from "@/lib/brand-context";
import type {
  AdvancedSettings,
  CreativityLevel,
  GenerationQuality,
  GenerationQuantity,
} from "@/types/generator";
import type { VisualStyleKey } from "@/types/brand";

const STYLE_OPTIONS: { value: VisualStyleKey; label: string }[] = [
  { value: "fotografico", label: "Fotográfico" },
  { value: "publicitario", label: "Publicitário" },
  { value: "gourmet", label: "Gourmet" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "minimalista", label: "Minimalista" },
  { value: "institucional", label: "Institucional" },
];

const QUANTITY_OPTIONS: { value: GenerationQuantity; label: string }[] = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 4, label: "4" },
];

const QUALITY_OPTIONS: { value: GenerationQuality; label: string }[] = [
  { value: "padrao", label: "Padrão" },
  { value: "alta", label: "Alta" },
];

const CREATIVITY_OPTIONS: { value: CreativityLevel; label: string }[] = [
  { value: "baixa", label: "Baixa" },
  { value: "media", label: "Média" },
  { value: "alta", label: "Alta" },
];

export function AdvancedSettingsModal({
  settings,
  onChange,
  onClose,
}: {
  settings: AdvancedSettings;
  onChange: (settings: AdvancedSettings) => void;
  onClose: () => void;
}) {
  const { brand } = useBrand();

  return (
    <Modal title="Configurações avançadas" onClose={onClose} widthClassName="max-w-lg">
      <div className="flex flex-col gap-6">
        <OptionPillGroup
          label="Estilo"
          options={STYLE_OPTIONS}
          value={settings.style}
          onChange={(style) => onChange({ ...settings, style })}
        />
        <OptionPillGroup
          label="Quantidade"
          options={QUANTITY_OPTIONS}
          value={settings.quantity}
          onChange={(quantity) => onChange({ ...settings, quantity })}
        />
        <OptionPillGroup
          label="Qualidade"
          options={QUALITY_OPTIONS}
          value={settings.quality}
          onChange={(quality) => onChange({ ...settings, quality })}
        />
        <OptionPillGroup
          label="Criatividade"
          options={CREATIVITY_OPTIONS}
          value={settings.creativity}
          onChange={(creativity) => onChange({ ...settings, creativity })}
        />

        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.06em] text-text-tertiary">
            IDENTIDADE VISUAL
          </p>
          <label className="flex cursor-pointer items-center gap-2.5 rounded-md border border-border-subtle bg-surface-card px-3.5 py-2.5 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={settings.applyBrandIdentity}
              onChange={(e) =>
                onChange({ ...settings, applyBrandIdentity: e.target.checked })
              }
              className="h-4 w-4 rounded accent-current"
              style={{ accentColor: brand.primaryColor }}
            />
            Aplicar identidade visual da marca ({brand.name})
          </label>
        </div>
      </div>
    </Modal>
  );
}
