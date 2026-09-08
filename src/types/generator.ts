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

export interface GenerationRequest {
  brandId: BrandId;
  prompt: string;
  contentType: ContentType;
  format: ImageFormat;
  referenceAssetIds: string[];
  advanced: AdvancedSettings;
}

export interface GenerationResult {
  id: string;
  imageUrl: string;
  request: GenerationRequest;
  createdAt: string;
  isFavorite: boolean;
}
