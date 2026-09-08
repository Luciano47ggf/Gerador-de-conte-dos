import type { BrandConfig, BrandId } from "@/types/brand";
import { saciatta } from "./saciatta";
import { vinuta } from "./vinuta";

export const brands: Record<BrandId, BrandConfig> = {
  saciatta,
  vinuta,
};

export const brandList: BrandConfig[] = [saciatta, vinuta];

export function getBrand(id: BrandId): BrandConfig {
  return brands[id];
}
