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

## Geração de imagem (gratuita)

A geração de imagem já está conectada e funciona sem nenhuma configuração,
usando a [Pollinations.ai](https://pollinations.ai) (gratuita, sem chave).

Pra uma qualidade bem melhor, recomendado, configure a **Cloudflare Workers
AI** (também gratuita — até 10.000 "neurons"/dia, ~230 imagens/dia, sem
cartão de crédito):

1. Copie `.env.local.example` para `.env.local`
2. Siga as instruções dentro do arquivo pra pegar seu `CLOUDFLARE_ACCOUNT_ID`
   e `CLOUDFLARE_API_TOKEN`
3. Preencha as duas variáveis e reinicie `npm run dev`

Com as variáveis configuradas, o sistema passa a gerar as imagens com o
modelo FLUX.1 [schnell] automaticamente — nenhuma outra mudança é
necessária. Sem elas, continua funcionando normalmente com a Pollinations.

## Status — Fase 1 e Fase 2 (concluídas)

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
- [x] Seção Resultados (grid de 4, favoritar, menu de ações, "Baixar todas")
- [x] Seção Modelos da marca (troca automaticamente com a marca selecionada)
- [x] Responsividade (desktop / tablet / mobile)
- [x] Rotas reais: `/`, `/acervo`, `/historico`, `/favoritos`
- [x] Persistência via `localStorage` (histórico e favoritos)
- [x] Modo Campanha (Feed Instagram, Story, WhatsApp, Banner — mesma
      direção criativa, formatos diferentes)
- [x] Geração de imagem conectada (Cloudflare Workers AI, com fallback
      automático para Pollinations.ai)

## Próximos passos possíveis

- Fidelidade de embalagem: hoje a IA gera a cena inteira a partir do texto,
  então o rótulo da embalagem não sai idêntico ao arquivo real. Para
  fidelidade 100%, o próximo passo é compor a embalagem real por cima da
  cena gerada (Canvas/Sharp no backend) em vez de pedir pra IA desenhá-la.
- Trocar de provedor de imagem por um pago (OpenAI, Gemini) quando a
  qualidade da Cloudflare/Pollinations não for mais suficiente — só é
  necessário editar `generateWithCloudflare` em
  `src/app/api/generate/route.ts`.
- Expandir o Acervo com mais produtos (Filé 400g, 5kg, produtos Vinuta).

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
