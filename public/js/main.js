// 🚨 Verifica se a noiva está logada antes de carregar o site
const token = localStorage.getItem("tokenNoiva");

if (!token) {
  window.location.href = "login.html"; // Redireciona se não tiver token
}

// public/js/main.js

// =========================
// 💍 Funções de Autenticação
// =========================

// URL base da API (ajuste se necessário)
const API_BASE = "http://localhost:3000/api";

// Salva o token da noiva no navegador
function salvarToken(token) {
  localStorage.setItem("noivaToken", token);
}

// Recupera o token salvo
function obterToken() {
  return localStorage.getItem("noivaToken");
}

// Remove o token (logout)
function sair() {
  localStorage.removeItem("noivaToken");
  window.location.href = "/login.html";
}

// =========================
// 💌 Cadastro de Noiva
// =========================
async function cadastrarNoiva(event) {
  event.preventDefault();

  const nome = document.getElementById("cadastro-nome").value.trim();
  const email = document.getElementById("cadastro-email").value.trim();
  const senha = document.getElementById("cadastro-senha").value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const resposta = await fetch(`${API_BASE}/noiva/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });

    const data = await resposta.json();
    if (resposta.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "/login.html";
    } else {
      alert(data.message || "Erro ao cadastrar noiva.");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro de conexão com o servidor.");
  }
}

// =========================
// 🔐 Login da Noiva
// =========================
async function loginNoiva(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-senha").value.trim();

  if (!email || !senha) {
    alert("Preencha e-mail e senha!");
    return;
  }

  try {
    const resposta = await fetch(`${API_BASE}/noiva/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await resposta.json();
    if (resposta.ok && data.token) {
      salvarToken(data.token);
      alert("Login realizado com sucesso!");
      window.location.href = "/index.html";
    } else {
      alert(data.message || "E-mail ou senha incorretos.");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro de conexão com o servidor.");
  }
}

// =========================
// 🔎 Verificação Automática de Login
// =========================
function verificarLogin() {
  const token = obterToken();
  const pagina = window.location.pathname;

  // Se estiver em página protegida sem token → redireciona
  if (!token && pagina !== "/login.html" && pagina !== "/cadastro.html") {
    window.location.href = "/login.html";
  }

  // Se já estiver logado e tentar ir pro login → redireciona pra home
  if (token && (pagina === "/login.html" || pagina === "/cadastro.html")) {
    window.location.href = "/index.html";
  }
}

// Executa a verificação ao carregar qualquer página
document.addEventListener("DOMContentLoaded", verificarLogin);
