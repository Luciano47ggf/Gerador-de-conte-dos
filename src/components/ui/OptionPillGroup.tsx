"use client";

import { useBrand } from "@/lib/brand-context";
import { cn } from "@/lib/utils";

export function OptionPillGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  const { brand } = useBrand();

  return (
    <div>
      <p className="mb-2 text-xs font-semibold tracking-[0.06em] text-text-tertiary">
        {label.toUpperCase()}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={isSelected}
              className={cn(
                "rounded-md border px-3.5 py-1.5 text-sm transition-colors",
                isSelected
                  ? "border-2 text-text-primary"
                  : "border-border-subtle bg-surface-card text-text-secondary hover:border-border-strong hover:text-text-primary"
              )}
              style={
                isSelected
                  ? {
                      borderColor: brand.primaryColor,
                      backgroundColor: `${brand.primaryColor}14`,
                    }
                  : undefined
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
