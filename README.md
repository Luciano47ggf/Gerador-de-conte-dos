# Vinuta · Avaliação de Degustação

Este projeto tem 2 páginas:

- **`index.html`** — formulário que os convidados preenchem (link/QR code 1)
- **`admin.html`** — painel para você ver todas as avaliações (link/QR code 2, protegido por login)

As avaliações ficam guardadas no **Firebase** (banco de dados gratuito do Google), porque o GitHub Pages sozinho não guarda dados — ele só serve os arquivos.

---

## Passo 1 — Criar o projeto no Firebase (grátis)

1. Acesse **https://console.firebase.google.com** e faça login com uma conta Google.
2. Clique em **"Criar projeto"**, dê um nome (ex: `vinuta-avaliacoes`) e finalize a criação.
3. No menu lateral, clique em **"Compilação" → "Firestore Database"**.
   - Clique em **"Criar banco de dados"**.
   - Escolha a localização (qualquer uma próxima, ex: `southamerica-east1`).
   - Selecione **"Iniciar em modo de produção"**.
4. No menu lateral, clique em **"Compilação" → "Authentication"**.
   - Clique em **"Começar"**.
   - Ative o método **"E-mail/senha"**.
   - Vá em **"Users" → "Adicionar usuário"** e crie o seu login de administrador (o e-mail e senha que você vai usar para entrar no painel `admin.html`).

## Passo 2 — Pegar as chaves do projeto

1. No Firebase, clique na engrenagem (⚙) no topo → **"Configurações do projeto"**.
2. Role até **"Seus apps"** e clique no ícone **`</>`** (Web) para criar um app da Web.
3. Dê um apelido (ex: `vinuta-web`) e clique em **"Registrar app"**.
4. Vai aparecer um bloco de código com um objeto `firebaseConfig`. Copie esses valores.
5. Abra o arquivo **`firebase-config.js`** deste projeto e substitua os valores de exemplo pelos que você copiou:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

> Esse arquivo pode ficar público no GitHub sem problema — essas chaves não são "secretas", a segurança vem das regras do Firestore (próximo passo).

## Passo 3 — Configurar as regras de segurança do Firestore

Isso é importante: sem isso, qualquer pessoa poderia ler os dados dos convidados.

1. No Firebase, vá em **Firestore Database → Regras**.
2. Substitua o conteúdo por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /avaliacoes/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

3. Clique em **"Publicar"**.

Isso significa: **qualquer pessoa pode enviar uma avaliação**, mas **só quem estiver logado** (você, no painel admin) **pode ler** as avaliações.

## Passo 4 — Subir no GitHub

1. Crie um repositório novo no GitHub (pode ser público).
2. Suba estes 3 arquivos para a raiz do repositório:
   - `index.html`
   - `admin.html`
   - `firebase-config.js` (já com suas chaves preenchidas)
3. Vá em **Settings → Pages** do repositório.
4. Em "Source", selecione a branch `main` (ou `master`) e pasta `/root`, depois **Save**.
5. Aguarde 1–2 minutos. O GitHub vai te dar um link parecido com:
   `https://seu-usuario.github.io/nome-do-repositorio/`

## Passo 5 — Seus dois acessos

- **Convidados avaliarem** → `https://seu-usuario.github.io/nome-do-repositorio/index.html`
- **Você ver as avaliações** → `https://seu-usuario.github.io/nome-do-repositorio/admin.html`
  (peça login com o e-mail/senha que você criou no Passo 1)

Assim que você abrir o `admin.html` e fizer login, **os QR codes dos dois links já aparecem prontos** no topo do painel — é só printar a tela ou clicar em "Copiar link" para gerar seus impressos/convites.

---

## Dúvidas comuns

**"Meu link do GitHub Pages não abre"**
Espere alguns minutos após ativar o Pages — a primeira publicação demora um pouco.

**"O QR code do painel admin aparece mas dá erro de login"**
Confirme que criou o usuário em Authentication → Users (Passo 1) e que está digitando o e-mail e senha certos.

**"As avaliações não aparecem no painel"**
Confira se as regras do Firestore (Passo 3) foram publicadas e se o `firebase-config.js` está com as chaves certas nos dois arquivos (eles compartilham o mesmo arquivo).

**"Posso trocar a senha do admin depois?"**
Sim, no Firebase em Authentication → Users, clique nos três pontinhos ao lado do usuário → "Redefinir senha".
