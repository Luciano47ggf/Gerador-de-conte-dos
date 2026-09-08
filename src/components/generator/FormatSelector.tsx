"use client";

import type { ImageFormat } from "@/types/generator";
import { useBrand } from "@/lib/brand-context";
import { cn } from "@/lib/utils";

// Dimensões visuais (em px) que representam a proporção de cada formato,
// mantendo uma altura máxima comum para comparação visual.
const FORMAT_SHAPES: Record<ImageFormat, { w: number; h: number }> = {
  "1:1": { w: 18, h: 18 },
  "4:5": { w: 16, h: 20 },
  "9:16": { w: 12, h: 20 },
  "16:9": { w: 24, h: 13.5 },
};

const FORMATS: ImageFormat[] = ["1:1", "4:5", "9:16", "16:9"];

export function FormatSelector({
  value,
  onChange,
}: {
  value: ImageFormat;
  onChange: (value: ImageFormat) => void;
}) {
  const { brand } = useBrand();

  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-text-primary">Formato</p>
      <div className="flex gap-2">
        {FORMATS.map((format) => {
          const isSelected = format === value;
          const shape = FORMAT_SHAPES[format];
          return (
            <button
              key={format}
              type="button"
              onClick={() => onChange(format)}
              aria-pressed={isSelected}
              className={cn(
                "flex h-16 w-16 flex-col items-center justify-center gap-1.5 rounded-lg border text-xs font-medium transition-colors",
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
              <span
                className="rounded-[2px] border-[1.5px]"
                style={{
                  width: shape.w,
                  height: shape.h,
                  borderColor: isSelected ? brand.accentColor : "var(--text-tertiary)",
                }}
              />
              {format}
            </button>
          );
        })}
      </div>
    </div>
  );
}
