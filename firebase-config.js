// =====================================================================
// CONFIGURAÇÃO DO FIREBASE — VINUTA
// =====================================================================
// 1. Crie um projeto gratuito em https://console.firebase.google.com
// 2. Dentro do projeto, ative o "Firestore Database" (modo produção)
// 3. Ative "Authentication" > método "E-mail/Senha" e crie 1 usuário
//    (esse será o login do painel de avaliações)
// 4. Em "Configurações do projeto" > "Seus apps" > crie um "App da Web"
// 5. Copie o objeto firebaseConfig que aparece e cole substituindo
//    os valores de exemplo abaixo.
// 6. Suba este arquivo junto com index.html e admin.html no GitHub.
//
// Veja o passo a passo completo no arquivo README.md
// =====================================================================

const firebaseConfig = {
  apiKey: "COLE_AQUI_SUA_API_KEY",
  authDomain: "SEU-PROJETO.firebaseapp.com",
  projectId: "SEU-PROJETO",
  storageBucket: "SEU-PROJETO.appspot.com",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
