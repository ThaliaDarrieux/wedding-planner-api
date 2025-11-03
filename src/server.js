// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const apiPort = 3000;
const webPort = 4000;

// Middleware para fazer o parse do corpo das requisições como JSON
app.use(bodyParser.json());

// ⚠️ MOCK DE DADOS (Substitua por um Banco de Dados real em produção)
// Usaremos objetos globais para simular o armazenamento de dados.
global.weddingData = {
    noiva: null,
    calendario: [],
    fornecedores: {},
    checklist: [],
    listaPresentes: [],
    convidados: {} // { 'convidado_hash': { nome: 'Nome', presente: null, confirmado: false } }
};

// ----------------------------------------------------
// Middleware de Autenticação (Simples)
// Apenas para simular o login da noiva.
// Em um cenário real, usaria JWT ou sessions.
const NOIVA_TOKEN = 'noiva-super-secreta-token';

const authNoiva = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === `Bearer ${NOIVA_TOKEN}`) {
        next(); // Autorizado
    } else {
        // HTTP 401: Não Autorizado (para falhas de autenticação)
        res.status(401).json({ status: 401, message: 'Não Autorizado. Token da Noiva inválido ou ausente.' });
    }
};
// ----------------------------------------------------

// Importar as Rotas da API
const noivaRoutes = require('./routes/noivaRoutes');

// Rotas da API (Rodando na porta 3000)
app.use('/api', noivaRoutes(authNoiva));

// ----------------------------------------------------
// FRONTEND (Servindo a Aplicação Web na porta 4000)

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rota para a página inicial da aplicação web
app.get('/', (req, res) => {
    // Redireciona para o arquivo index.html na pasta 'public'
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ----------------------------------------------------
// Tratamento de Erros (Para status code fora de 200)
app.use((err, req, res, next) => {
    console.error(err.stack);
    // Erro genérico do servidor
    res.status(500).json({ 
        status: 500, 
        message: 'Ocorreu um erro interno no servidor da API.',
        error: err.message 
    });
});

// Inicialização da API
app.listen(apiPort, () => {
    console.log(`API de Casamento rodando em http://localhost:${apiPort}/`);
});

// Inicialização da Aplicação Web
const webApp = express();
webApp.use(express.static(path.join(__dirname, '..', 'public')));

// Servir a aplicação web
webApp.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

webApp.listen(webPort, () => {
    console.log(`Aplicação Web (Frontend) rodando em http://localhost:${webPort}/`);
});

// Exemplo de como usar o token da Noiva:
console.log(`\nTOKEN DE AUTORIZAÇÃO DA NOIVA (para testes): Bearer ${NOIVA_TOKEN}`);
console.log('Para acessar a API como noiva, use este token no cabeçalho "Authorization".');