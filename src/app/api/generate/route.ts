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
 * Provedor gratuito de fallback (Pollinations.ai) — sem chave de API,
 * sem custo, mas sem controle de qualidade/modelo. Usado automaticamente
 * quando as credenciais da Cloudflare não estão configuradas, para que
 * o projeto funcione "out of the box".
 */
function buildPollinationsUrl(prompt: string, format: ImageFormat): string {
  const { width, height } = FORMAT_DIMENSIONS[format];
  const seed = Math.floor(Math.random() * 1_000_000);
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;
}

/**
 * Provedor principal (Cloudflare Workers AI — FLUX.1 [schnell]).
 * Gratuito até 10.000 neurons/dia (~230 imagens/dia), sem cartão de
 * crédito. Requer conta grátis na Cloudflare + token de API.
 * Ver README para o passo a passo de configuração.
 *
 * Docs: https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/
 */
async function generateWithCloudflare(
  prompt: string
): Promise<{ imageUrl: string } | null> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) return null;

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-1-schnell`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, steps: 4 }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const base64Image: string | undefined = data?.result?.image;
    if (!base64Image) return null;

    return { imageUrl: `data:image/jpeg;base64,${base64Image}` };
  } catch {
    return null;
  }
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

  const cloudflareResult = await generateWithCloudflare(finalPrompt);
  if (cloudflareResult) {
    return NextResponse.json({
      imageUrl: cloudflareResult.imageUrl,
      promptUsed: finalPrompt,
      provider: "cloudflare",
    });
  }

  // Fallback automático caso CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN
  // não estejam configurados, ou a chamada à Cloudflare tenha falhado.
  const imageUrl = buildPollinationsUrl(finalPrompt, format);
  return NextResponse.json({
    imageUrl,
    promptUsed: finalPrompt,
    provider: "pollinations",
  });
}
