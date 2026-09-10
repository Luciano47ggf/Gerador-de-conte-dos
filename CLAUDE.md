# Projeto Vinuta · Avaliação NPS

## O que é
Site estático (GitHub Pages) para coleta de NPS (Net Promoter Score) dos convidados
da "Vinuta · Vino Atelier" no evento Iguaçu Golf Experience. Estilo visual elegante,
tema vinho/dourado, com animações nas taças de avaliação.

## Arquivos

- **`index.html`** — formulário público que os convidados preenchem (acessado via
  QR code / link 1). Pergunta clássica de NPS: "O quanto você recomendaria a
  Vinuta?" numa escala de 0 a 10, representada por 11 taças de vinho animadas em
  linha reta e centralizada. Sem campos de nome/telefone/comentário — é só a nota.
  Ao enviar, grava no Firestore (coleção `avaliacoes`) e mostra uma tela de
  conclusão com mensagem que varia conforme a categoria da nota (detrator/
  passivo/promotor).

- **`admin.html`** — painel interno (acessado via QR code / link 2), protegido por
  login (Firebase Authentication e-mail/senha). Mostra em tempo real
  (`onSnapshot`):
  - Cards de acesso com QR code + link de cada uma das 2 páginas (gerados
    automaticamente a partir da URL atual)
  - Estatísticas: total de respostas, NPS calculado, respostas de hoje
  - Barra de classificação NPS (% detratores / neutros / promotores)
  - Histograma "Votos por nota" (quantas pessoas deram cada nota de 0 a 10)
  - Lista das últimas avaliações (nota + selo de categoria + data)
  - Card "Resumo do desempenho" no final, com texto interpretativo automático
    (ex: "NPS considerado excelente/muito bom/razoável/de atenção") + grid com
    nota média, % promotores, % neutros, % detratores

- **`firebase-config.js`** — configuração compartilhada do Firebase (chaves do
  projeto). Não é secreto (a segurança vem das regras do Firestore, não das
  chaves).

- **`README.md`** — passo a passo completo de configuração do Firebase e
  publicação no GitHub Pages.

## Banco de dados (Firestore)

Coleção `avaliacoes`, cada documento tem:
```
{
  nota: number (0–10),
  categoria: "detrator" | "passivo" | "promotor",  // 0-6 / 7-8 / 9-10
  criadoEm: timestamp (serverTimestamp)
}
```

Regras de segurança (já configuradas no console do Firebase pelo usuário):
- `create`: qualquer um pode enviar uma avaliação (convidados não fazem login)
- `read/update/delete`: só usuários autenticados (o admin logado em `admin.html`)

## Paleta e estilo

```css
--wine-900: #3a0d17;   /* vinho escuro - fundo do header, botões */
--wine-800: #4c1220;
--gold:     #b8935a;   /* dourado - detalhes, hover */
--gold-light: #d4b483;
--cream:    #f4ede2;   /* fundo geral */
```
Fontes: Cormorant Garamond (títulos), Cinzel (marca/botões), EB Garamond (corpo).
Logo real da marca embutida em base64 (recortada do arquivo oficial da Vinuta).

## Histórico de decisões (para não repetir perguntas)

1. Começou como avaliação 1–5 taças (nota de degustação de vinho) → convertido
   para NPS 0–10 a pedido do usuário, mantendo o tema visual das taças.
2. Campos de nome/telefone e campo de comentário livre foram removidos —
   avaliação é 100% anônima, só a nota.
3. As 11 taças ficam em **uma única linha reta centralizada** (já tentamos em
   duas fileiras e o usuário pediu para voltar para uma linha só).
4. Cada taça preenche individualmente ao ser selecionada (seleção única, não
   cumulativa como um rating de estrelas).

## Convenções ao editar

- Manter os 3 arquivos (`index.html`, `admin.html`, `firebase-config.js`) na
  raiz do repositório — GitHub Pages serve a partir daí.
- CSS e JS ficam inline em cada HTML (sem build step, é publicado direto no
  GitHub Pages).
- Sempre validar balanceamento de chaves `{}` do `<style>` e de cada `<script>`
  depois de editar (esses arquivos são grandes e um erro de sintaxe quebra a
  página inteira).
- Ao alterar `index.html`, verificar se `admin.html` precisa de ajuste
  correspondente (e vice-versa) — os dois compartilham o schema do Firestore.
