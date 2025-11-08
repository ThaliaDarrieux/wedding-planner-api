// src/routes/convidadoRoutes.js
const express = require('express');
const { validarConvidado } = require('../middlewares/validators');

module.exports = (authNoiva) => {
    const router = express.Router();

    /**
     * 📋 GET /api/lista-convidados
     * Retorna a lista completa de convidados
     */
    router.get('/lista-convidados', authNoiva, (req, res) => {
        const convidados = Object.values(global.weddingData.convidados || {});
        res.json(convidados);
    });

    /**
     * ➕ POST /api/lista-convidados
     * Adiciona um novo convidado à lista
     */
    router.post('/lista-convidados', authNoiva, (req, res) => {
        const erro = validateConvidado(req.body);
        if (erro) {
            return res.status(400).json({ status: 400, message: erro.message });
        }

        // Cria um ID simples pro convidado
        const id = `convidado_${Date.now()}`;
        global.weddingData.convidados[id] = { ...req.body, id };

        res.status(201).json({
            status: 201,
            message: 'Convidado adicionado com sucesso!',
            convidado: global.weddingData.convidados[id]
        });
    });

    /**
     * 📝 PUT /api/lista-convidados/:id
     * Atualiza os dados de um convidado existente
     */
    router.put('/lista-convidados/:id', authNoiva, (req, res) => {
        const id = req.params.id;
        const convidadoExistente = global.weddingData.convidados[id];

        if (!convidadoExistente) {
            return res.status(404).json({ status: 404, message: 'Convidado não encontrado.' });
        }

        const erro = validateConvidado(req.body);
        if (erro) {
            return res.status(400).json({ status: 400, message: erro.message });
        }

        global.weddingData.convidados[id] = { ...req.body, id };

        res.json({
            status: 200,
            message: 'Convidado atualizado com sucesso!',
            convidado: global.weddingData.convidados[id]
        });
    });

    /**
     * ❌ DELETE /api/lista-convidados/:id
     * Remove um convidado da lista
     */
    router.delete('/lista-convidados/:id', authNoiva, (req, res) => {
        const id = req.params.id;
        if (!global.weddingData.convidados[id]) {
            return res.status(404).json({ status: 404, message: 'Convidado não encontrado.' });
        }

        delete global.weddingData.convidados[id];
        res.json({ status: 200, message: 'Convidado removido com sucesso!' });
    });

    return router;
};
