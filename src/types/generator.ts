import type { BrandId, VisualStyleKey } from "./brand";

export type ContentType =
  | "produto"
  | "receita"
  | "institucional"
  | "social"
  | "campanha"
  | "livre";

export type ImageFormat = "1:1" | "4:5" | "9:16" | "16:9";

export type GenerationQuantity = 1 | 2 | 4;
export type GenerationQuality = "padrao" | "alta";
export type CreativityLevel = "baixa" | "media" | "alta";

export interface AdvancedSettings {
  style: VisualStyleKey;
  quantity: GenerationQuantity;
  quality: GenerationQuality;
  creativity: CreativityLevel;
  applyBrandIdentity: boolean;
}

/**
 * Modo Campanha: a partir de UM prompt (a direção criativa), o sistema gera
 * uma peça por canal, cada uma no formato correto daquele canal — mas todas
 * compartilhando a mesma direção criativa (mesmo prompt/estilo/marca).
 */
export type CampaignChannelId = "feed-instagram" | "story-instagram" | "whatsapp" | "banner";

export interface CampaignChannel {
  id: CampaignChannelId;
  label: string;
  format: ImageFormat;
}

export const CAMPAIGN_CHANNELS: CampaignChannel[] = [
  { id: "feed-instagram", label: "Feed Instagram", format: "4:5" },
  { id: "story-instagram", label: "Story Instagram", format: "9:16" },
  { id: "whatsapp", label: "WhatsApp", format: "1:1" },
  { id: "banner", label: "Banner", format: "16:9" },
];

export interface GenerationRequest {
  brandId: BrandId;
  prompt: string;
  contentType: ContentType;
  format: ImageFormat;
  referenceAssetIds: string[];
  advanced: AdvancedSettings;
  /** Presente apenas quando a geração faz parte de uma campanha multi-canal. */
  campaignId?: string;
  campaignChannel?: CampaignChannelId;
}

export interface GenerationResult {
  id: string;
  imageUrl: string;
  request: GenerationRequest;
  createdAt: string;
  isFavorite: boolean;
}
