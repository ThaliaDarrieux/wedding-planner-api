// src/routes/noivaRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validarNoiva } = require('../middlewares/validators');

const SECRET = process.env.NOIVA_SECRET || 'segredo-da-noiva';

module.exports = (authNoiva) => {
    const router = express.Router();

    // Simulação de "banco de dados" para as noivas cadastradas
    global.noivas = global.noivas || [];

    // 🧍‍♀️ Registro da Noiva (Cadastro)
    router.post('/noiva/registro', (req, res) => {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
        }

        const existe = global.noivas.find((n) => n.email === email);
        if (existe) {
            return res.status(400).json({ message: 'E-mail já cadastrado.' });
        }

        const senhaCriptografada = bcrypt.hashSync(senha, 10);
        const novaNoiva = { nome, email, senha: senhaCriptografada };
        global.noivas.push(novaNoiva);

        res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
    });

    // 🔐 Login da Noiva
    router.post('/noiva/login', (req, res) => {
        const { email, senha } = req.body;
        const noiva = global.noivas.find((n) => n.email === email);

        if (!noiva) {
            return res.status(404).json({ message: 'Noiva não encontrada.' });
        }

        const senhaValida = bcrypt.compareSync(senha, noiva.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        const token = jwt.sign({ email: noiva.email }, SECRET, { expiresIn: '2h' });
        res.json({ message: 'Login realizado com sucesso!', token });
    });

    // 📝 Salvar dados da Noiva (protegido)
    router.post('/noiva', authNoiva, (req, res) => {
        const erro = validarNoiva(req.body);
        if (erro) {
            return res.status(400).json({ status: 400, message: erro.message });
        }

        global.weddingData.noiva = req.body;
        res.json({
            status: 200,
            message: 'Dados da noiva salvos com sucesso!',
            noiva: global.weddingData.noiva
        });
    });

    // 👰 Obter dados da Noiva (protegido)
    router.get('/noiva', authNoiva, (req, res) => {
        if (!global.weddingData.noiva) {
            return res.status(404).json({ status: 404, message: 'Nenhuma noiva cadastrada.' });
        }
        res.json(global.weddingData.noiva);
    });

    return router;
};
