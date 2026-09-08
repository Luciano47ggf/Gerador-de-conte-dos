"use client";

import { CAMPAIGN_CHANNELS } from "@/types/generator";
import type { CampaignChannelId } from "@/types/generator";
import { useBrand } from "@/lib/brand-context";
import { cn } from "@/lib/utils";

export function CampaignChannelSelector({
  value,
  onChange,
}: {
  value: CampaignChannelId[];
  onChange: (value: CampaignChannelId[]) => void;
}) {
  const { brand } = useBrand();

  function toggle(id: CampaignChannelId) {
    onChange(
      value.includes(id) ? value.filter((c) => c !== id) : [...value, id]
    );
  }

  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-text-primary">
        Canais da campanha
      </p>
      <div className="flex flex-wrap gap-2">
        {CAMPAIGN_CHANNELS.map((channel) => {
          const isSelected = value.includes(channel.id);
          return (
            <button
              key={channel.id}
              type="button"
              onClick={() => toggle(channel.id)}
              aria-pressed={isSelected}
              className={cn(
                "flex flex-col items-start gap-0.5 rounded-lg border px-3.5 py-2 text-left text-xs transition-colors",
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
              <span className="font-medium">{channel.label}</span>
              <span className="text-text-tertiary">{channel.format}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-text-tertiary">
        Todos os canais selecionados seguem a mesma direção criativa (o
        prompt digitado acima).
      </p>
    </div>
  );
}
