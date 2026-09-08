# Gerador de Conteúdo — Saciatta + Vinuta

Plataforma interna de geração de conteúdo por IA para as marcas **Saciatta** e
**Vinuta**, construída com Next.js (App Router), TypeScript e Tailwind CSS.

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). O layout foi desenhado
para 1920×1080, mas é responsivo (sidebar recolhível em tablet, drawer em
mobile).

> Nota: se sua rede bloquear o Google Fonts, o Next.js usa uma fonte de
> fallback automaticamente — isso não acontece em produção/ambientes com
> acesso normal à internet.

## Status — Fase 1 (concluída)

- [x] Estrutura do projeto (`src/app`, `src/components`, `src/brands`,
      `src/types`, `src/lib`)
- [x] Identidade Saciatta e Vinuta centralizada em `src/brands/*.ts`, com
      cores extraídas dos arquivos oficiais das marcas
- [x] Sidebar (logos reais, menu, Acervo da marca, usuário) — recolhível em
      tablet, drawer em mobile
- [x] Gerador: prompt, seletor de Marca (React State), Tipo de conteúdo,
      Formato
- [x] Modal "Selecionar do acervo" (categorias + assets reais)
- [x] Modal de Configurações avançadas (Estilo, Quantidade, Qualidade,
      Criatividade, Identidade visual)
- [x] Seção Resultados (grid de 4, favoritar, menu de ações, "Baixar
      todas") — atualmente com placeholders visuais, prontos para receber
      URLs reais de imagem assim que a geração por IA for conectada
- [x] Seção Modelos da marca (troca automaticamente com a marca selecionada)
- [x] Responsividade (desktop / tablet / mobile)

## Próximos passos — Fase 2

- `/acervo` — biblioteca DAM completa com busca e filtros
- `/historico` — histórico de gerações (localStorage)
- `/favoritos` — conteúdos favoritados
- Modo Campanha (Feed, Story, WhatsApp, Banner na mesma direção criativa)
- Conectar a geração de imagem por IA de fato (hoje os resultados são
  placeholders visuais com a identidade da marca, sem nenhuma imagem
  inventada de produto/embalagem)

## Estrutura de assets

```
public/brands/
  saciatta/
    logos/            logo-completo.png, simbolo-peixe.webp
    products/          file-tilapia-800g.webp
    backgrounds/       (vazio — Fase 2)
    elements/          (vazio — Fase 2)
  vinuta/
    logos/             logo-completo.png, simbolo-v.png
    products/          (vazio — sem produtos Vinuta cadastrados ainda)
    backgrounds/       (vazio — Fase 2)
    elements/          (vazio — Fase 2)
```

Todos os arquivos de marca são os originais fornecidos — nenhum logo ou
embalagem foi redesenhado ou inventado.

## Arquitetura de marcas

Toda cor, logo, produto, asset e template de cada marca vive em
`src/brands/saciatta.ts` e `src/brands/vinuta.ts`, seguindo o tipo
`BrandConfig` (`src/types/brand.ts`). Nenhum componente tem cor ou caminho de
asset hardcoded — tudo lê da configuração da marca ativa via `useBrand()`
(`src/lib/brand-context.tsx`).
