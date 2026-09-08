import type { BrandConfig, VisualStyleKey } from "@/types/brand";
import type { ContentType, ImageFormat } from "@/types/generator";

const STYLE_HINTS: Record<VisualStyleKey, string> = {
  fotografico: "professional photography, natural lighting, high detail",
  publicitario: "advertising campaign photo, polished commercial look",
  gourmet: "gourmet food photography, appetizing, shallow depth of field",
  lifestyle: "lifestyle photography, candid, warm natural setting",
  minimalista: "minimalist composition, clean background, negative space",
  institucional: "institutional corporate photography, clean and trustworthy",
};

const CONTENT_TYPE_HINTS: Record<ContentType, string> = {
  produto: "product photography",
  receita: "recipe / dish presentation photography",
  institucional: "institutional / corporate photography",
  social: "social media post visual",
  campanha: "advertising campaign visual",
  livre: "",
};

/** Dimensões (px) aproximadas para cada proporção, mantendo a mesma área total. */
export const FORMAT_DIMENSIONS: Record<ImageFormat, { width: number; height: number }> = {
  "1:1": { width: 1024, height: 1024 },
  "4:5": { width: 896, height: 1120 },
  "9:16": { width: 768, height: 1365 },
  "16:9": { width: 1365, height: 768 },
};

export function buildImagePrompt({
  brand,
  userPrompt,
  contentType,
  style,
  applyBrandIdentity,
}: {
  brand: BrandConfig;
  userPrompt: string;
  contentType: ContentType;
  style: VisualStyleKey;
  applyBrandIdentity: boolean;
}): string {
  const parts = [
    userPrompt.trim(),
    CONTENT_TYPE_HINTS[contentType],
    STYLE_HINTS[style],
  ];

  if (applyBrandIdentity) {
    parts.push(brand.promptInstructions);
    parts.push(`brand color palette: ${brand.primaryColor}, ${brand.accentColor}`);
  }

  return parts.filter(Boolean).join(", ");
}
