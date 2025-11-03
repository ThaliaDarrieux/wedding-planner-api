// src/routes/noivaRoutes.js
const express = require('express');
const noivaController = require('../controllers/noivaController');
const convidadoController = require('../controllers/convidadoController');

module.exports = (authNoiva) => {
    const router = express.Router();
    
    // -----------------------------------------------
    // Rotas de Convidado (Acesso sem autenticação, apenas com hash)
    // Acesso à lista de presentes e confirmação.
    // -----------------------------------------------
    
    // GET /api/convidado/lista-presentes/:hash
    router.get('/convidado/lista-presentes/:hash', convidadoController.getListaPresentesConvidado);
    
    // POST /api/convidado/confirmar-presenca
    router.post('/convidado/confirmar-presenca', convidadoController.confirmarPresenca);
    
    // POST /api/convidado/comprar-presente
    router.post('/convidado/comprar-presente', convidadoController.comprarPresente);
    
    // -----------------------------------------------
    // Rotas da Noiva (Acesso com authNoiva)
    // -----------------------------------------------
    
    // Rotas de Configuração
    router.post('/configuracao', authNoiva, noivaController.configurarCasamento);
    
    // Rotas de Calendário
    router.get('/calendario', authNoiva, noivaController.getCalendario);
    router.post('/calendario', authNoiva, noivaController.addCompromisso);
    
    // Rotas de Fornecedores
    router.get('/fornecedores', authNoiva, noivaController.getFornecedores);
    router.post('/fornecedores', authNoiva, noivaController.setFornecedor);
    
    // Rotas de Checklist
    router.get('/checklist', authNoiva, noivaController.getChecklist);
    router.put('/checklist/:id/concluir', authNoiva, noivaController.concluirItemChecklist);
    
    // Rotas de Lista de Presentes (Gestão)
    router.get('/presentes', authNoiva, noivaController.getListaPresentesNoiva);
    router.post('/presentes', authNoiva, noivaController.addPresente);
    
    // Rotas de Convidados (Gestão)
    router.get('/convidados', authNoiva, noivaController.getConvidados);
    router.post('/convidados/gerar-link', authNoiva, noivaController.gerarLinkConvidado);

    // Rota de Locais (Simulação de filtro)
    router.get('/locais', authNoiva, (req, res) => {
        const { regiao, estilo } = req.query;
        // Mock de dados para simular filtro
        const locaisMock = [
            { nome: 'Chácara do Lago', regiao: 'Interior', estilo: 'Rústico', capacidade: 300 },
            { nome: 'Salão Majestic', regiao: 'Capital', estilo: 'Clássico', capacidade: 150 },
            { nome: 'Praia do Amor', regiao: 'Litoral', estilo: 'Praia', capacidade: 100 },
        ];

        let locaisFiltrados = locaisMock;
        if (regiao) {
            locaisFiltrados = locaisFiltrados.filter(l => l.regiao.toLowerCase() === regiao.toLowerCase());
        }
        if (estilo) {
            locaisFiltrados = locaisFiltrados.filter(l => l.estilo.toLowerCase() === estilo.toLowerCase());
        }
        
        // HTTP 200: OK
        res.status(200).json(locaisFiltrados);
    });

    return router;
};