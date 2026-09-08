import type { SidebarSection } from "@/components/layout/SidebarNav";

export const SECTION_PATHS: Record<SidebarSection, string> = {
  gerador: "/",
  acervo: "/acervo",
  historico: "/historico",
  favoritos: "/favoritos",
};

export function sectionFromPathname(pathname: string): SidebarSection {
  if (pathname.startsWith("/acervo")) return "acervo";
  if (pathname.startsWith("/historico")) return "historico";
  if (pathname.startsWith("/favoritos")) return "favoritos";
  return "gerador";
}
