// src/server.js
require('dotenv').config(); // Carrega variáveis do arquivo .env

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Cria a aplicação principal da API
const app = express();

// 🔧 Configurações de ambiente
const apiPort = process.env.API_PORT || 3000;
const webPort = process.env.WEB_PORT || 4000;
const NOIVA_TOKEN = process.env.NOIVA_TOKEN || 'noiva-super-secreta-token';

// Middleware para converter corpo de requisições em JSON
app.use(bodyParser.json());

// ⚙️ MOCK DE DADOS (simulação temporária de banco)
global.weddingData = {
    noiva: null,
    calendario: [],
    fornecedores: {},
    checklist: [],
    listaPresentes: [],
    convidados: {}, // { 'id': { nome, presente, confirmado } }
    info: {
        data: process.env.CASAMENTO_DATA || null,
        local: process.env.CASAMENTO_LOCAL || null,
        tema: process.env.CASAMENTO_TEMA || null
    }
};

// ----------------------------------------------------
// ----------------------------------------------------
// 🔐 Middleware de Autenticação JWT
const jwt = require('jsonwebtoken');
const SECRET = process.env.NOIVA_SECRET || 'segredo-da-noiva';

const authNoiva = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.noiva = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
};


// 📦 Importar Rotas
const noivaRoutes = require('./routes/noivaRoutes');
const convidadoRoutes = require('./routes/convidadoRoutes');

// 📍 Usar Rotas da API
app.use('/api', noivaRoutes(authNoiva));
app.use('/api', convidadoRoutes(authNoiva));

// ----------------------------------------------------
// 📘 Documentação Swagger (http://localhost:3000/api-docs)
const { swaggerUi, swaggerDocument } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log('\n📘 Documentação Swagger disponível em: http://localhost:3000/api-docs');
// ----------------------------------------------------

// 💒 FRONTEND (servido na porta 4000)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ----------------------------------------------------
// ⚠️ Tratamento de Erros Genérico
app.use((err, req, res, next) => {
    console.error('🔥 Erro interno:', err.stack);
    res.status(500).json({
        status: 500,
        message: 'Ocorreu um erro interno no servidor da API.',
        error: err.message
    });
});

// ----------------------------------------------------
// 🚀 Inicialização da API
app.listen(apiPort, () => {
    console.log(`✅ API de Casamento rodando em: http://localhost:${apiPort}/`);
    console.log(`🔗 Swagger UI: http://localhost:${apiPort}/api-docs`);
});

// 🌐 Inicialização da Aplicação Web (Frontend)
const webApp = express();
webApp.use(express.static(path.join(__dirname, '..', 'public')));

webApp.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

webApp.listen(webPort, () => {
    console.log(`💍 Aplicação Web (Frontend) rodando em: http://localhost:${webPort}/`);
});

// ----------------------------------------------------
// 🧾 Log informativo do token
console.log(`\n🔐 TOKEN DE AUTORIZAÇÃO DA NOIVA (para testes): Bearer ${NOIVA_TOKEN}`);
console.log('Use este token no cabeçalho "Authorization" ao testar endpoints protegidos.');
