// src/utils/validators.js

/**
 * 🔍 Valida dados da Noiva
 * @param {Object} data
 * @returns {Object|null} Retorna um objeto de erro ou null se estiver válido
 */
function validateNoiva(data) {
    if (!data || typeof data !== 'object') {
        return { message: 'Os dados da noiva devem ser enviados em formato JSON.' };
    }

    if (!data.nome || typeof data.nome !== 'string') {
        return { message: 'O campo "nome" é obrigatório e deve ser uma string.' };
    }

    if (data.idade !== undefined && (isNaN(data.idade) || Number(data.idade) <= 0)) {
        return { message: 'O campo "idade" deve ser um número positivo.' };
    }

    if (data.vestido && typeof data.vestido !== 'string') {
        return { message: 'O campo "vestido" deve ser uma string.' };
    }

    return null; // ✅ Dados válidos
}

/**
 * 🧾 Valida dados de Convidado
 * @param {Object} convidado
 * @returns {Object|null}
 */
function validateConvidado(convidado) {
    if (!convidado || typeof convidado !== 'object') {
        return { message: 'Os dados do convidado devem ser enviados em formato JSON.' };
    }

    if (!convidado.nome || typeof convidado.nome !== 'string') {
        return { message: 'O campo "nome" do convidado é obrigatório e deve ser uma string.' };
    }

    if (convidado.confirmado !== undefined && typeof convidado.confirmado !== 'boolean') {
        return { message: 'O campo "confirmado" deve ser um booleano (true ou false).' };
    }

    if (convidado.presente && typeof convidado.presente !== 'string') {
        return { message: 'O campo "presente" deve ser uma string, se fornecido.' };
    }

    return null;
}

/**
 * 💍 Valida informações do casamento (data, local, tema)
 * @param {Object} info
 * @returns {Object|null}
 */
function validateInfo(info) {
    if (!info || typeof info !== 'object') {
        return { message: 'Os dados de informações do casamento devem ser enviados em formato JSON.' };
    }

    if (!info.data || !/^\d{4}-\d{2}-\d{2}$/.test(info.data)) {
        return { message: 'A "data" do casamento deve estar no formato YYYY-MM-DD.' };
    }

    if (!info.local || typeof info.local !== 'string') {
        return { message: 'O campo "local" é obrigatório e deve ser uma string.' };
    }

    if (info.tema && typeof info.tema !== 'string') {
        return { message: 'O campo "tema" deve ser uma string.' };
    }

    return null;
}

module.exports = {
    validateNoiva,
    validateConvidado,
    validateInfo
};
