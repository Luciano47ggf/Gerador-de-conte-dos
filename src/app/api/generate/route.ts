import { NextResponse } from "next/server";
import { getBrand } from "@/brands";
import { buildImagePrompt, FORMAT_DIMENSIONS } from "@/lib/build-image-prompt";
import type { BrandId } from "@/types/brand";
import type { AdvancedSettings, ContentType, ImageFormat } from "@/types/generator";

export interface GenerateImageRequestBody {
  brandId: BrandId;
  prompt: string;
  contentType: ContentType;
  format: ImageFormat;
  advanced: AdvancedSettings;
}

/**
 * Provedor gratuito (Pollinations.ai) — sem chave de API, sem custo.
 * A imagem é gerada sob demanda a partir de uma URL; não é preciso
 * baixar/reenviar os bytes aqui, só devolver a URL final pro cliente.
 *
 * Para trocar de provedor no futuro (ex.: OpenAI, Gemini), esta é a
 * única função que precisa mudar — o resto da aplicação já consome
 * apenas `{ imageUrl }`.
 */
function buildPollinationsUrl(prompt: string, format: ImageFormat): string {
  const { width, height } = FORMAT_DIMENSIONS[format];
  const seed = Math.floor(Math.random() * 1_000_000);
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;
}

export async function POST(request: Request) {
  let body: GenerateImageRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { brandId, prompt, contentType, format, advanced } = body;

  if (!brandId || !contentType || !format || !advanced) {
    return NextResponse.json(
      { error: "Campos obrigatórios ausentes" },
      { status: 400 }
    );
  }

  const brand = getBrand(brandId);
  const finalPrompt = buildImagePrompt({
    brand,
    userPrompt: prompt ?? "",
    contentType,
    style: advanced.style,
    applyBrandIdentity: advanced.applyBrandIdentity,
  });

  const imageUrl = buildPollinationsUrl(finalPrompt, format);

  return NextResponse.json({ imageUrl, promptUsed: finalPrompt });
}
