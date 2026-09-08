import type { BrandConfig } from "@/types/brand";

const BASE = "/brands/vinuta";

export const vinuta: BrandConfig = {
  id: "vinuta",
  name: "Vinuta",
  tagline: "Vino Atelier",
  logo: `${BASE}/logos/logo-completo.png`,
  symbol: `${BASE}/logos/simbolo-v.png`,

  // Extraídas diretamente do logo e do símbolo oficiais.
  primaryColor: "#622929", // vinho escuro do wordmark
  secondaryColor: "#3a1818", // variação mais escura, para fundos/gradientes sutis
  accentColor: "#976641", // cobre/dourado do símbolo "V"
  onPrimaryColor: "#ffffff",

  products: [
    // Estrutura pronta para expansão futura de produtos Vinuta:
    // { id: "vinho-tinto-reserva", name: "Vinho Tinto Reserva", category: "Vinhos Tintos", image: `${BASE}/products/tinto-reserva.webp` },
  ],

  assets: [
    {
      id: "logo-vinuta-completo",
      name: "Logo Vinuta",
      category: "logos",
      image: `${BASE}/logos/logo-completo.png`,
    },
    {
      id: "simbolo-vinuta-v",
      name: "Símbolo Vinuta (V)",
      category: "logos",
      image: `${BASE}/logos/simbolo-v.png`,
    },
  ],

  templates: [
    {
      id: "vinuta-oferta-produto",
      kind: "oferta-produto",
      name: "Oferta de produto",
      coverImage: `${BASE}/logos/logo-completo.png`,
    },
    {
      id: "vinuta-receita",
      kind: "receita",
      name: "Receita",
      coverImage: `${BASE}/logos/simbolo-v.png`,
    },
    {
      id: "vinuta-institucional",
      kind: "institucional",
      name: "Institucional",
      coverImage: `${BASE}/logos/logo-completo.png`,
    },
    {
      id: "vinuta-dia-a-dia",
      kind: "dia-a-dia",
      name: "Dia a dia",
      coverImage: `${BASE}/logos/simbolo-v.png`,
    },
    {
      id: "vinuta-campanha",
      kind: "campanha",
      name: "Campanha",
      coverImage: `${BASE}/logos/logo-completo.png`,
    },
  ],

  visualStyle: {
    preferredStyles: ["gourmet", "lifestyle", "fotografico", "minimalista"],
    moodDescription:
      "Vino atelier sofisticado e premium: vinho, gastronomia, elegância, tons terrosos e cobre/dourado suave.",
  },

  promptInstructions:
    "Utilize a identidade visual da Vinuta: vinho, bordô escuro, tons terrosos e cobre/dourado suave — nunca verde. Utilize o logo e o símbolo reais da Vinuta.",
};
