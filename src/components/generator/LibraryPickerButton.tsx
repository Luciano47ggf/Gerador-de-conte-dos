"use client";

import { Plus } from "lucide-react";

export function LibraryPickerButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border border-dashed border-border-strong px-4 py-2.5 text-sm text-text-secondary transition-colors hover:border-text-tertiary hover:text-text-primary"
    >
      <Plus size={15} />
      Selecionar do acervo
      <span className="text-text-tertiary">(produto, embalagem, etc.)</span>
    </button>
  );
}
