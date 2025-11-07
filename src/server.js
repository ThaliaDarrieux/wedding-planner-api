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
const NOIVA_TOKEN = 'noiva-super-secreta-token';

const authNoiva = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === `Bearer ${NOIVA_TOKEN}`) {
        next(); // Autorizado
    } else {
        res.status(401).json({ status: 401, message: 'Não Autorizado. Token da Noiva inválido ou ausente.' });
    }
};
// ----------------------------------------------------

// Importar as Rotas da API
const noivaRoutes = require('./routes/noivaRoutes');

// Rotas da API (Rodando na porta 3000)
app.use('/api', noivaRoutes(authNoiva));

// ----------------------------------------------------
// ✅ SWAGGER DOCUMENTATION (Documentação da API)

// Importa o Swagger UI e o arquivo YAML
const { swaggerUi, swaggerDocument } = require('./swagger');

// Expor a documentação em http://localhost:3000/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log('\n📘 Documentação Swagger disponível em: http://localhost:3000/api-docs');
// ----------------------------------------------------

// FRONTEND (Servindo a Aplicação Web na porta 4000)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ----------------------------------------------------
// Tratamento de Erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 500,
        message: 'Ocorreu um erro interno no servidor da API.',
        error: err.message
    });
});

// Inicialização da API
app.listen(apiPort, () => {
    console.log(`✅ API de Casamento rodando em: http://localhost:${apiPort}/`);
    console.log(`🔗 Swagger UI: http://localhost:${apiPort}/api-docs`);
});

// Inicialização da Aplicação Web
const webApp = express();
webApp.use(express.static(path.join(__dirname, '..', 'public')));

webApp.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

webApp.listen(webPort, () => {
    console.log(`💒 Aplicação Web (Frontend) rodando em: http://localhost:${webPort}/`);
});

console.log(`\n🔐 TOKEN DE AUTORIZAÇÃO DA NOIVA (para testes): Bearer ${NOIVA_TOKEN}`);
console.log('Use este token no cabeçalho "Authorization" ao testar endpoints protegidos.');
