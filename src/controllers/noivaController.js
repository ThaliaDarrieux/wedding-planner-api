// src/controllers/noivaController.js
// Os dados estão no global.weddingData (MOCK)

const noivaController = {
    // --------------------------------------------------------------------------
    // ROTAS DE CONFIGURAÇÃO (POST /api/configuracao)
    configurarCasamento: (req, res) => {
        const { dataCasamento } = req.body;
        if (!dataCasamento) {
            return res.status(400).json({ status: 400, message: 'Data do casamento é obrigatória.' });
        }
        
        global.weddingData.noiva = { dataCasamento };
        
        // Simular a criação inicial do calendário e checklist
        global.weddingData.calendario = [];
        global.weddingData.checklist = [
            { id: 1, item: 'Escolher e enviar Save the Date', concluido: false },
            { id: 2, item: 'Contratar Cerimonialista', concluido: false },
            { id: 3, item: 'Procurar Local da Festa/Cerimônia', concluido: false },
            { id: 4, item: 'Criar Lista de Presentes', concluido: false },
            { id: 5, item: 'Escolher a Playlist', concluido: false },
            // ... outros itens
        ];

        // HTTP 201: Criado
        res.status(201).json({ 
            message: 'Casamento configurado com sucesso!', 
            data: global.weddingData.noiva
        });
    },

    // --------------------------------------------------------------------------
    // ROTAS DE CALENDÁRIO

    // GET /api/calendario
    getCalendario: (req, res) => {
        const dataCasamento = global.weddingData.noiva ? global.weddingData.noiva.dataCasamento : null;
        if (!dataCasamento) {
            return res.status(404).json({ status: 404, message: 'Casamento não configurado. Defina a data primeiro.' });
        }

        const hoje = new Date();
        const dataC = new Date(dataCasamento);
        const diffTempo = dataC.getTime() - hoje.getTime();
        const diasRestantes = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));
        
        // HTTP 200: OK
        res.status(200).json({ 
            dataCasamento: dataCasamento,
            diasRestantes: diasRestantes,
            compromissos: global.weddingData.calendario
        });
    },

    // POST /api/calendario
    addCompromisso: (req, res) => {
        const { data, descricao, tipo } = req.body;
        if (!data || !descricao) {
            return res.status(400).json({ status: 400, message: 'Data e descrição do compromisso são obrigatórias.' });
        }

        const novoCompromisso = { 
            id: global.weddingData.calendario.length + 1, 
            data, 
            descricao, 
            tipo: tipo || 'Geral' 
        };
        global.weddingData.calendario.push(novoCompromisso);
        
        // HTTP 201: Criado
        res.status(201).json({ 
            message: 'Compromisso adicionado!', 
            compromisso: novoCompromisso 
        });
    },

    // --------------------------------------------------------------------------
    // ROTAS DE FORNECEDORES (Ex: fotografo, localFesta, decoracao, playlist)

    // POST /api/fornecedores
    setFornecedor: (req, res) => {
        const { tipo, nome, contato } = req.body;
        if (!tipo || !nome) {
            return res.status(400).json({ status: 400, message: 'Tipo e nome do fornecedor são obrigatórios.' });
        }

        // Tipo é a chave: fotografo, localFesta, decoracao, playlist...
        global.weddingData.fornecedores[tipo] = { nome, contato: contato || 'Não informado' };

        // HTTP 200: OK (atualização)
        res.status(200).json({ 
            message: `Fornecedor (${tipo}) atualizado com sucesso.`, 
            fornecedores: global.weddingData.fornecedores 
        });
    },

    // GET /api/fornecedores
    getFornecedores: (req, res) => {
        // HTTP 200: OK
        res.status(200).json(global.weddingData.fornecedores);
    },

    // --------------------------------------------------------------------------
    // ROTAS DE CHECKLIST

    // GET /api/checklist
    getChecklist: (req, res) => {
        // HTTP 200: OK
        res.status(200).json(global.weddingData.checklist);
    },

    // PUT /api/checklist/:id/concluir
    concluirItemChecklist: (req, res) => {
        const id = parseInt(req.params.id);
        const item = global.weddingData.checklist.find(i => i.id === id);

        if (!item) {
            return res.status(404).json({ status: 404, message: 'Item do checklist não encontrado.' });
        }

        item.concluido = true;
        
        // HTTP 200: OK
        res.status(200).json({ 
            message: 'Item marcado como concluído!', 
            item: item 
        });
    },
    
    // --------------------------------------------------------------------------
    // ROTAS DE LISTA DE PRESENTES (Noiva)

    // GET /api/presentes (Noiva)
    getListaPresentesNoiva: (req, res) => {
        // HTTP 200: OK
        res.status(200).json(global.weddingData.listaPresentes);
    },

    // POST /api/presentes (Noiva)
    addPresente: (req, res) => {
        const { nome, valorPix } = req.body;
        if (!nome || !valorPix) {
            return res.status(400).json({ status: 400, message: 'Nome e valor PIX do presente são obrigatórios.' });
        }

        const novoPresente = {
            id: global.weddingData.listaPresentes.length + 1,
            nome,
            valorPix: parseFloat(valorPix),
            compradoPor: null // nome/hash do convidado
        };
        global.weddingData.listaPresentes.push(novoPresente);

        // HTTP 201: Criado
        res.status(201).json({ 
            message: 'Presente adicionado à lista!', 
            presente: novoPresente 
        });
    },

    // --------------------------------------------------------------------------
    // ROTAS DE CONVIDADOS (Noiva - Opcional)

    // POST /api/convidados/gerar-link (Simulação de geração de link)
    gerarLinkConvidado: (req, res) => {
        const { nomeConvidado } = req.body;
        if (!nomeConvidado) {
            return res.status(400).json({ status: 400, message: 'Nome do convidado é obrigatório para gerar o link.' });
        }
        
        // Cria um hash simples para o convidado
        const convidadoHash = Buffer.from(nomeConvidado).toString('base64');
        global.weddingData.convidados[convidadoHash] = { nome: nomeConvidado, presente: null, confirmado: false };
        
        const linkConvite = `http://localhost:4000/convite.html?hash=${convidadoHash}`;

        // HTTP 201: Criado
        res.status(201).json({ 
            message: 'Link de convite gerado com sucesso.', 
            convidado: nomeConvidado,
            linkConvite: linkConvite
        });
    },

    // GET /api/convidados (Noiva)
    getConvidados: (req, res) => {
         // HTTP 200: OK
         res.status(200).json(global.weddingData.convidados);
    }
};

module.exports = noivaController;