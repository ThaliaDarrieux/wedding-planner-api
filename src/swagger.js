// src/swagger.js
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Carrega o arquivo principal de documentação
const swaggerDocument = YAML.load(path.join(__dirname, '..', 'resources', 'swagger.yaml'));

// Configuração opcional de tema e layout
const swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: '💒 API de Casamento - Thalia Darrieux',
  explorer: true
};

module.exports = {
  swaggerUi,
  swaggerDocument,
  swaggerOptions
};
