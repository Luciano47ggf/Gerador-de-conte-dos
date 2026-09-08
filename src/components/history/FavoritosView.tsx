"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Download, Trash2, ImagePlus, Wand2 } from "lucide-react";
import { GenerationCard } from "@/components/library/GenerationCard";
import { useGenerations } from "@/lib/use-generations";
import { buildGeneratorPrefillUrl } from "@/lib/generator-prefill";

export function FavoritosView() {
  const router = useRouter();
  const { generations, isLoaded, removeGeneration, toggleFavorite } =
    useGenerations();

  const favorites = useMemo(
    () => generations.filter((g) => g.isFavorite),
    [generations]
  );

  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Favoritos</h1>
        <p className="mt-1.5 text-sm text-text-secondary">
          Conteúdos que você marcou como favorito no Gerador ou no Histórico.
        </p>
      </div>

      {!isLoaded ? null : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle py-16 text-center">
          <p className="text-sm text-text-secondary">
            Nenhum favorito ainda.
          </p>
          <p className="mt-1 text-xs text-text-tertiary">
            Toque na estrela de uma imagem gerada para salvá-la aqui.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {favorites.map((g) => (
            <GenerationCard
              key={g.id}
              generation={g}
              onToggleFavorite={() => toggleFavorite(g.id)}
              actions={[
                { label: "Baixar", icon: Download, onClick: () => {} },
                {
                  label: "Remover",
                  icon: Trash2,
                  onClick: () => removeGeneration(g.id),
                },
                {
                  label: "Usar como referência",
                  icon: ImagePlus,
                  onClick: () => router.push(buildGeneratorPrefillUrl(g)),
                },
                {
                  label: "Criar variação",
                  icon: Wand2,
                  onClick: () => router.push(buildGeneratorPrefillUrl(g)),
                },
              ]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
