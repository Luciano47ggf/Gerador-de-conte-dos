import type { BrandConfig } from "@/types/brand";

const BASE = "/brands/saciatta";

export const saciatta: BrandConfig = {
  id: "saciatta",
  name: "Saciatta",
  tagline: "Sabor que move o amanhã",
  logo: `${BASE}/logos/logo-completo.png`,
  symbol: `${BASE}/logos/simbolo-peixe.webp`,

  // Extraídas diretamente do logo e da embalagem oficiais.
  primaryColor: "#960636", // bordô do wordmark
  secondaryColor: "#7b0003", // vermelho profundo da embalagem
  accentColor: "#fac7ab", // tom claro (peixe) do símbolo
  onPrimaryColor: "#ffffff",

  products: [
    {
      id: "file-tilapia-800g",
      name: "Filé de Tilápia 800g",
      category: "Filé de Tilápia",
      image: `${BASE}/products/file-tilapia-800g.webp`,
      weight: "800g",
    },
    // Estrutura pronta para expansão futura:
    // { id: "file-tilapia-400g", name: "Filé de Tilápia 400g", category: "Filé de Tilápia", image: `${BASE}/products/file-tilapia-400g.webp`, weight: "400g" },
    // { id: "file-tilapia-5kg", name: "Filé de Tilápia 5kg", category: "Filé de Tilápia", image: `${BASE}/products/file-tilapia-5kg.webp`, weight: "5kg" },
  ],

  assets: [
    {
      id: "embalagem-file-tilapia-800g",
      name: "Filé de Tilápia 800g",
      category: "embalagens",
      image: `${BASE}/products/file-tilapia-800g.webp`,
      meta: { categoria: "Filé de Tilápia" },
    },
    {
      id: "logo-saciatta-completo",
      name: "Logo Saciatta",
      category: "logos",
      image: `${BASE}/logos/logo-completo.png`,
    },
    {
      id: "simbolo-saciatta-peixe",
      name: "Símbolo Saciatta (peixe)",
      category: "logos",
      image: `${BASE}/logos/simbolo-peixe.webp`,
    },
  ],

  templates: [
    {
      id: "saciatta-oferta-produto",
      kind: "oferta-produto",
      name: "Oferta de produto",
      coverImage: `${BASE}/products/file-tilapia-800g.webp`,
    },
    {
      id: "saciatta-receita",
      kind: "receita",
      name: "Receita",
      coverImage: `${BASE}/products/file-tilapia-800g.webp`,
    },
    {
      id: "saciatta-institucional",
      kind: "institucional",
      name: "Institucional",
      coverImage: `${BASE}/logos/logo-completo.png`,
    },
    {
      id: "saciatta-dia-a-dia",
      kind: "dia-a-dia",
      name: "Dia a dia",
      coverImage: `${BASE}/products/file-tilapia-800g.webp`,
    },
    {
      id: "saciatta-campanha",
      kind: "campanha",
      name: "Campanha",
      coverImage: `${BASE}/logos/logo-completo.png`,
    },
  ],

  visualStyle: {
    preferredStyles: ["fotografico", "gourmet", "publicitario", "lifestyle"],
    moodDescription:
      "Indústria de alimentos congelados com apelo caseiro e nutritivo: filé de tilápia, mesa de domingo em família, praticidade do dia a dia.",
  },

  promptInstructions:
    "Utilize a identidade visual da Saciatta: bordô/vermelho profundo, branco e os tons claros do símbolo do peixe. Utilize o logo real da Saciatta e, ao representar embalagens, utilize exclusivamente o asset real fornecido (Filé de Tilápia 800g) — nunca redesenhar ou inventar embalagens.",
};
