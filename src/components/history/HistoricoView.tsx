"use client";

import { useRouter } from "next/navigation";
import { Download, Star, Pencil, RefreshCw, Wand2 } from "lucide-react";
import { GenerationCard } from "@/components/library/GenerationCard";
import { useGenerations } from "@/lib/use-generations";
import { buildGeneratorPrefillUrl } from "@/lib/generator-prefill";

export function HistoricoView() {
  const router = useRouter();
  const { generations, isLoaded, toggleFavorite } = useGenerations();

  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Histórico</h1>
        <p className="mt-1.5 text-sm text-text-secondary">
          Suas gerações anteriores, com o prompt, a marca e as configurações
          usadas em cada uma.
        </p>
      </div>

      {!isLoaded ? null : generations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle py-16 text-center">
          <p className="text-sm text-text-secondary">
            Nenhuma geração ainda.
          </p>
          <p className="mt-1 text-xs text-text-tertiary">
            As imagens que você gerar no Gerador aparecem aqui automaticamente.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {generations.map((g) => (
            <GenerationCard
              key={g.id}
              generation={g}
              onToggleFavorite={() => toggleFavorite(g.id)}
              actions={[
                {
                  label: "Baixar",
                  icon: Download,
                  onClick: () => g.imageUrl && window.open(g.imageUrl, "_blank"),
                },
                {
                  label: "Favoritar",
                  icon: Star,
                  onClick: () => toggleFavorite(g.id),
                },
                {
                  label: "Editar prompt",
                  icon: Pencil,
                  onClick: () => router.push(buildGeneratorPrefillUrl(g)),
                },
                {
                  label: "Gerar novamente",
                  icon: RefreshCw,
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
