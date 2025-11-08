# 💍 API de Casamento - Wedding Planner

[![API RESTful](https://img.shields.io/badge/API-RESTful-blue?style=for-the-badge)](https://pt.wikipedia.org/wiki/Representational_State_Transfer)
[![Autenticação](https://img.shields.io/badge/Segurança-JWT_Bearer-orange?style=for-the-badge)](https://jwt.io/)
[![OpenAPI Spec](https://img.shields.io/badge/Specification-OpenAPI_3.0-green)](https://swagger.io/specification/)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellowgreen?style=for-the-badge)]()

**Descrição:** Core API para a plataforma Wedding Planner. Implementa a lógica de negócios para gerenciamento completo de eventos de casamento, incluindo gestão da noiva (usuário principal), convidados, checklists, fornecedores e agenda. A API segue o padrão RESTful e utiliza **JSON Web Tokens (JWT)** para controle de acesso baseado em Bearer Token.

---

## 🌐 Documentação Interativa (Swagger UI)

A especificação completa do contrato da API (OpenAPI 3.0) está disponível através da interface interativa do Swagger UI:

### Servidor Base
O servidor de desenvolvimento está acessível em:
`http://localhost:3000/api`

---

## 🔒 Autenticação e Autorização (JWT Bearer)

A segurança da API é implementada via **Bearer Token (JWT)**. Todas as rotas de gestão, exceto `/noiva/registro` e `/noiva/login`, requerem o envio de um token válido no cabeçalho `Authorization`.

### 1. Registro do Usuário (Noiva)
Cria um novo usuário e prepara a conta para o primeiro login.

```bash
curl -X POST 'http://localhost:3000/api/noiva/registro' \
-H 'Content-Type: application/json' \
-d '{
    "nome": "Thalia Darrieux",
    "email": "thalia@example.com",
    "senha": "123456"
}'
# Resposta esperada: 201 Created


