"use client";

const MAX_LENGTH = 1000;

export function PromptBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative rounded-xl border border-border-subtle bg-surface-card focus-within:border-border-strong">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        placeholder="Descreva a imagem que deseja criar..."
        rows={4}
        maxLength={MAX_LENGTH}
        className="w-full resize-none bg-transparent px-5 pt-5 pb-9 text-[15px] text-text-primary placeholder:text-text-tertiary outline-none"
      />
      <span className="pointer-events-none absolute bottom-3.5 right-5 text-xs text-text-tertiary">
        {value.length} / {MAX_LENGTH}
      </span>
    </div>
  );
}
