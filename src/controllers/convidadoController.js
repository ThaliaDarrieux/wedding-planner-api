// src/controllers/convidadoController.js
// Os dados estão no global.weddingData (MOCK)

const convidadoController = {

    // GET /api/convidado/lista-presentes/:hash
    getListaPresentesConvidado: (req, res) => {
        const convidadoHash = req.params.hash;

        if (!global.weddingData.convidados[convidadoHash]) {
            return res.status(404).json({ status: 404, message: 'Link de convidado inválido.' });
        }

        const presentesDisponiveis = global.weddingData.listaPresentes.filter(p => !p.compradoPor);
        const nomeConvidado = global.weddingData.convidados[convidadoHash].nome;

        // HTTP 200: OK
        res.status(200).json({ 
            convidado: nomeConvidado,
            listaPresentes: presentesDisponiveis
        });
    },

    // POST /api/convidado/confirmar-presenca
    confirmarPresenca: (req, res) => {
        const { convidadoHash, confirmacao } = req.body; // 'sim' ou 'nao'

        const convidado = global.weddingData.convidados[convidadoHash];

        if (!convidado) {
            return res.status(404).json({ status: 404, message: 'Convidado não encontrado.' });
        }

        convidado.confirmado = (confirmacao.toLowerCase() === 'sim');
        
        // Retorna a URL da lista de presentes após a confirmação
        const listaUrl = `http://localhost:4000/lista-presentes.html?hash=${convidadoHash}`;
        
        // HTTP 200: OK
        res.status(200).json({ 
            message: `Confirmação de ${convidado.nome} registrada. Presença: ${convidado.confirmado ? 'Sim' : 'Não'}`,
            proximoPasso: 'Redirecionar para a Lista de Presentes',
            urlLista: listaUrl
        });
    },

    // POST /api/convidado/comprar-presente
    comprarPresente: (req, res) => {
        const { convidadoHash, presenteId } = req.body;

        const convidado = global.weddingData.convidados[convidadoHash];
        if (!convidado) {
            return res.status(404).json({ status: 404, message: 'Convidado inválido.' });
        }

        const presente = global.weddingData.listaPresentes.find(p => p.id === presenteId);
        if (!presente) {
            return res.status(404).json({ status: 404, message: 'Presente não encontrado.' });
        }
        
        if (presente.compradoPor) {
            // HTTP 409: Conflito
            return res.status(409).json({ status: 409, message: `O presente '${presente.nome}' já foi comprado.` });
        }

        // Simula a compra, convertendo o produto em PIX para os noivos
        presente.compradoPor = convidado.nome;
        
        // HTTP 200: OK
        res.status(200).json({
            message: `Você 'comprou' o presente '${presente.nome}'. O valor de R$ ${presente.valorPix.toFixed(2)} foi convertido em PIX para os noivos.`,
            detalhesPix: `PIX: ${presente.valorPix.toFixed(2)} - Chave Aleatória (Simulação)`
        });
    }
};

module.exports = convidadoController;