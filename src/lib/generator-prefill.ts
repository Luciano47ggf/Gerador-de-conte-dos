import type { GenerationResult } from "@/types/generator";

export function buildGeneratorPrefillUrl(generation: GenerationResult): string {
  const { request } = generation;
  const params = new URLSearchParams({
    brand: request.brandId,
    prompt: request.prompt,
    tipo: request.contentType,
    formato: request.format,
  });
  return `/?${params.toString()}`;
}
