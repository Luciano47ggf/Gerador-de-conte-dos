"use client";

import { useCallback, useEffect, useState } from "react";
import type { GenerationResult } from "@/types/generator";
import { loadGenerations, saveGenerations } from "./generations-store";

export function useGenerations() {
  const [generations, setGenerations] = useState<GenerationResult[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Hidratação client-only: localStorage não existe no servidor, então o
    // estado inicial precisa ficar vazio no SSR e ser preenchido aqui, após
    // a montagem, para não gerar mismatch de hidratação.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGenerations(loadGenerations());
    setIsLoaded(true);
  }, []);

  const addGenerations = useCallback((newOnes: GenerationResult[]) => {
    setGenerations((prev) => {
      const updated = [...newOnes, ...prev];
      saveGenerations(updated);
      return updated;
    });
  }, []);

  const updateGeneration = useCallback(
    (id: string, updater: (g: GenerationResult) => GenerationResult) => {
      setGenerations((prev) => {
        const updated = prev.map((g) => (g.id === id ? updater(g) : g));
        saveGenerations(updated);
        return updated;
      });
    },
    []
  );

  const removeGeneration = useCallback((id: string) => {
    setGenerations((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      saveGenerations(updated);
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      updateGeneration(id, (g) => ({ ...g, isFavorite: !g.isFavorite }));
    },
    [updateGeneration]
  );

  return {
    generations,
    isLoaded,
    addGenerations,
    updateGeneration,
    removeGeneration,
    toggleFavorite,
  };
}
