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
 * Provedor principal (Cloudflare Workers AI — linha FLUX.2/FLUX.1).
 * Gratuito (10.000 neurons/dia, sem cartão de crédito), mas cada modelo
 * consome o orçamento diário de um jeito diferente. Tenta sempre o
 * melhor modelo primeiro e cai pro próximo se o orçamento do dia
 * já tiver acabado (ou se o modelo falhar por qualquer outro motivo):
 *
 *   1. FLUX.2 [klein] 9B  — melhor qualidade (pessoas/anatomia),
 *                           ~7 imagens/dia dentro do free tier
 *   2. FLUX.2 [klein] 4B  — ainda FLUX.2, ~96 imagens/dia
 *   3. FLUX.1 [schnell]   — mais básico, ~170 imagens/dia (nunca falta)
 *
 * Docs: https://developers.cloudflare.com/workers-ai/platform/pricing/
 */
const CLOUDFLARE_MODEL_CHAIN = [
  "@cf/black-forest-labs/flux-2-klein-9b",
  "@cf/black-forest-labs/flux-2-klein-4b",
  "@cf/black-forest-labs/flux-1-schnell",
] as const;

async function callCloudflareModel(
  model: string,
  prompt: string,
  accountId: string,
  apiToken: string
): Promise<string | null> {
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;
  // FLUX.1 [schnell] aceita/precisa de "steps"; os modelos FLUX.2 [klein]
  // têm o número de passos fixo internamente e não usam esse campo.
  const body =
    model === "@cf/black-forest-labs/flux-1-schnell"
      ? { prompt, steps: 4 }
      : { prompt };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const base64Image: string | undefined = data?.result?.image;
    return base64Image ? `data:image/jpeg;base64,${base64Image}` : null;
  } catch {
    return null;
  }
}

async function generateWithCloudflare(
  prompt: string
): Promise<{ imageUrl: string; model: string } | null> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) return null;

  for (const model of CLOUDFLARE_MODEL_CHAIN) {
    const imageUrl = await callCloudflareModel(model, prompt, accountId, apiToken);
    if (imageUrl) return { imageUrl, model };
  }
  return null;
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
      model: cloudflareResult.model,
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
