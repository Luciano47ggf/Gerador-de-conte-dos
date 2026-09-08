import { Lightbulb } from "lucide-react";

export function GeneratorHeader() {
  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">
          Criar nova imagem
        </h1>
        <p className="mt-1.5 text-sm text-text-secondary">
          Descreva o que você deseja e a IA gera imagens com a identidade da
          marca escolhida.
        </p>
      </div>
      <button
        type="button"
        className="flex shrink-0 items-center gap-2 rounded-lg border border-border-subtle bg-surface-card px-3.5 py-2 text-sm text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
      >
        <Lightbulb size={15} />
        Dicas de uso
      </button>
    </div>
  );
}
