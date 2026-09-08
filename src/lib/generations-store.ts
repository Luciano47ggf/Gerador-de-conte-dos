import type { GenerationResult } from "@/types/generator";

const STORAGE_KEY = "saciatta-vinuta:generations";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadGenerations(): GenerationResult[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveGenerations(generations: GenerationResult[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(generations));
  } catch {
    // Armazenamento indisponível (modo privado, cota excedida, etc.) — falha
    // silenciosamente; a sessão atual continua funcionando em memória.
  }
}

export function prependGenerations(
  existing: GenerationResult[],
  newOnes: GenerationResult[]
): GenerationResult[] {
  const updated = [...newOnes, ...existing];
  saveGenerations(updated);
  return updated;
}
