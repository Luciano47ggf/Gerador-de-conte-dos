export type BrandId = "saciatta" | "vinuta";

export type AssetCategory =
  | "produtos"
  | "embalagens"
  | "logos"
  | "elementos"
  | "fundos"
  | "imagens-aprovadas";

export interface BrandAsset {
  id: string;
  name: string;
  category: AssetCategory;
  /** Caminho real do arquivo em /public. Nunca gerado ou inventado. */
  image: string;
  /** Metadados livres, ex: peso, categoria de produto etc. */
  meta?: Record<string, string>;
}

export interface BrandProduct {
  id: string;
  name: string;
  category: string;
  /** Caminho real da embalagem/produto em /public. */
  image: string;
  weight?: string;
}

export type ContentTemplateKind =
  | "oferta-produto"
  | "receita"
  | "institucional"
  | "dia-a-dia"
  | "campanha";

export interface BrandTemplate {
  id: string;
  kind: ContentTemplateKind;
  name: string;
  /** Imagem de capa do card de modelo. Pode ser um asset real ou um mock de estilo de vida. */
  coverImage: string;
}

export type VisualStyleKey =
  | "fotografico"
  | "publicitario"
  | "gourmet"
  | "lifestyle"
  | "minimalista"
  | "institucional";

export interface BrandVisualStyle {
  /** Estilos de imagem disponíveis para esta marca, em ordem de preferência. */
  preferredStyles: VisualStyleKey[];
  /** Descrição curta usada para orientar a geração (tom visual da marca). */
  moodDescription: string;
}

export interface BrandConfig {
  id: BrandId;
  name: string;
  tagline: string;
  /** Logo completo (símbolo + wordmark), arquivo real fornecido pela marca. */
  logo: string;
  /** Símbolo isolado (sem wordmark), arquivo real fornecido pela marca. */
  symbol: string;

  /** Cores extraídas diretamente dos arquivos oficiais da marca. */
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  /** Tom de texto sobre superfícies com a cor primária (geralmente branco). */
  onPrimaryColor: string;

  products: BrandProduct[];
  assets: BrandAsset[];
  templates: BrandTemplate[];
  visualStyle: BrandVisualStyle;

  /** Instruções de prompt injetadas automaticamente na geração para manter a identidade da marca. */
  promptInstructions: string;
}
