<<<<<<< HEAD
# 💍 API de Casamento - Wedding Planner

[![API RESTful](https://img.shields.io/badge/API-RESTful-blue?style=for-the-badge)](https://pt.wikipedia.org/wiki/Representational_State_Transfer)
[![Autenticação](https://img.shields.io/badge/Autenticação-JWT-orange?style=for-the-badge)](https://jwt.io/)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellowgreen?style=for-the-badge)]()

**Descrição:** API robusta para gerenciamento completo de casamentos. Ela atende às necessidades da **noiva**, permitindo o controle de convidados, checklist, fornecedores, calendário e lista de presentes. **Toda a gestão é protegida por autenticação JWT** (Login e Cadastro).

---

## 🗺️ Visão Geral e Documentação

Esta API utiliza o padrão **OpenAPI 3.0.0** (Swagger) para garantir uma documentação precisa e interativa.

### Endpoints Base
O servidor de desenvolvimento está acessível em:
`http://localhost:3000/api`

### 🔒 Autenticação (JWT)
Todas as rotas de gestão (Convidados, Checklist, Fornecedores e Calendário) requerem autenticação.

1.  Use o endpoint **`/noiva/registro`** para criar uma nova conta.
2.  Use o endpoint **`/noiva/login`** para obter o **Token JWT**.
3.  Este token deve ser enviado no cabeçalho de autorização (**`Authorization: Bearer <TOKEN>`**) em todas as requisições protegidas.

---

## 🔑 Endpoints Principais da API

Abaixo está um resumo das principais funcionalidades da API, agrupadas por Tag:

### 👰‍♀️ Noiva (Autenticação e Perfil)

| Método | Caminho | Descrição | Segurança |
| :--- | :--- | :--- | :---: |
| **POST** | `/noiva/registro` | Cria o cadastro da noiva (Nome, E-mail, Senha). | ❌ |
| **POST** | `/noiva/login` | Faz o login e retorna o **Token JWT**. | ❌ |
| **GET** | `/noiva` | Busca os dados da noiva logada. | ✅ |
| **POST** | `/noiva` | Salva novos dados de perfil da noiva. | ✅ |

### ✉️ Convidados (Gestão da Lista)

| Método | Caminho | Descrição | Segurança |
| :--- | :--- | :--- | :---: |
| **GET** | `/convidados` | Retorna a lista completa de convidados. | ✅ |
| **POST** | `/convidados` | Adiciona um novo convidado à lista. | ✅ |

### 📋 Checklist (Organização de Tarefas)

| Método | Caminho | Descrição | Segurança |
| :--- | :--- | :--- | :---: |
| **GET** | `/checklist` | Retorna a lista de tarefas pendentes e concluídas. | ✅ |
| **POST** | `/checklist` | Adiciona um novo item ao checklist. | ✅ |

### 📅 Calendário (Prazos e Eventos)

| Método | Caminho | Descrição | Segurança |
| :--- | :--- | :--- | :---: |
| **GET** | `/calendario` | Lista todos os eventos e datas importantes. | ✅ |
| **POST** | `/calendario` | Adiciona um novo evento ou compromisso (ex: prova do vestido). | ✅ |

### 💼 Fornecedores (Contratação)

| Método | Caminho | Descrição | Segurança |
| :--- | :--- | :--- | :---: |
| **GET** | `/fornecedores` | Lista todos os fornecedores cadastrados. | ✅ |
| **POST** | `/fornecedores` | Adiciona um novo fornecedor (Buffet, Fotógrafo, etc.). | ✅ |

---

## 📦 Modelos de Dados Principais (`Schemas`)

### `Noiva`
Modelo usado para registro e atualização de perfil.

| Propriedade | Tipo | Exemplo | Descrição |
| :--- | :--- | :--- | :--- |
| **`nome`** | `string` | "Thalia Darrieux" | Nome completo da noiva. |
| **`email`** | `string` | "thalia@example.com" | E-mail, usado para login. |
| **`senha`** | `string` | "123456" | Senha (apenas no Registro/Login). |

### `Convidado`
Modelo para gestão da lista de convidados e presentes.

| Propriedade | Tipo | Exemplo | Descrição |
| :--- | :--- | :--- | :--- |
| **`nome`** | `string` | "Maria Souza" | Nome do convidado. |
| **`presente`** | `string` | "Panela elétrica" | Presente dado ou a dar. |
| **`confirmado`** | `boolean` | `true` | Status de confirmação de presença. |

---

## 🚀 Instalação e Execução Local

*(Aqui você deve preencher as etapas para clonar e rodar o seu código real.)*

1.  **Clone o Repositório:**
    ```bash
    git clone [https://www.youtube.com/shorts/3mMG25WHLkU](https://www.youtube.com/shorts/3mMG25WHLkU)
    cd nome-do-projeto
    ```

2.  **Instale Dependências e Configure o Ambiente:**
    * `[Comandos de instalação, ex: npm install]`
    * Certifique-se de configurar as variáveis de ambiente necessárias (como a porta da aplicação e a chave secreta do JWT).

3.  **Inicie a API:**
    * `[Comando para iniciar a aplicação, ex: npm run dev]`

A API estará rodando em `http://localhost:3000/api`.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Siga o fluxo padrão de Git: Fork, crie uma Branch, faça suas alterações e abra um Pull Request.

---
=======
# 💍 API de Casamento - Wedding Planner

API RESTful completa para gerenciamento de eventos de casamento. Este sistema oferece módulos para controle de convidados, checklist de tarefas, registro de fornecedores, calendário de eventos e gestão de perfil da noiva.

## 🌟 Principais Funcionalidades

* **Autenticação JWT:** Login e Registro da noiva (usuário principal) com proteção de token.
* **Gestão de Convidados:** Adicionar, listar e gerenciar o status de RSVP e presentes.
* **Checklist:** Acompanhamento de todas as tarefas e prazos do planejamento.
* **Fornecedores:** Cadastro de empresas e contatos contratados (buffet, foto, etc.).
* **Calendário:** Agenda de eventos e compromissos importantes.

## 🔑 Segurança e Acesso

A API utiliza autenticação **JSON Web Token (JWT)**. Para acessar as rotas protegidas (todas as rotas de gestão), o usuário deve primeiro fazer o login e enviar o token no cabeçalho `Authorization: Bearer <token>`.

### Endpoints de Autenticação
* `POST /noiva/registro` - Criação de uma nova conta.
* `POST /noiva/login` - Retorna o token de acesso.

## 🗺️ Mapeamento de Rotas

| Tag | Método | Caminho | Descrição | Requer JWT |
| :--- | :--- | :--- | :--- | :---: |
| **Noiva** | `GET/POST` | `/noiva` | Busca/Atualiza o perfil da noiva. | Sim |
| **Convidados** | `GET/POST` | `/convidados` | Listar / Adicionar um novo convidado. | Sim |
| **Checklist** | `GET/POST` | `/checklist` | Listar / Adicionar item à lista de tarefas. | Sim |
| **Fornecedores** | `GET/POST` | `/fornecedores` | Listar / Adicionar um fornecedor. | Sim |
| **Calendário** | `GET/POST` | `/calendario` | Listar / Adicionar um evento ou prazo. | Sim |

## 🛠️ Tecnologias e Setup

*(Preencha esta seção com sua stack, ex: Node.js/Express, Python/Django, e os passos essenciais para rodar o projeto localmente.)*

* **Servidor Base:** `http://localhost:3000/api`
* **Tecnologias:** [Node.js, Express, MongoDB, etc.]
* **Setup:**
    1.  Clonar o repositório.
    2.  Instalar dependências (`npm install` ou equivalente).
    3.  Configurar as variáveis de ambiente (DB e JWT Secret).
    4.  Rodar o servidor (`npm start` ou equivalente).

## 📄 Documentação OpenAPI

O contrato completo da API (incluindo schemas e responses) pode ser consultado no arquivo [OpenAPI Specification](https://github.com/ThaliaDarrieux/wedding-planner-api/blob/main/resources/swagger.yaml).

## 🧐 Detalhes Técnicos e Regras de Negócio

Para uma descrição completa do comportamento e das regras de validação dos dados da API, consulte a documentação detalhada:

[Regras de Negócio da API (BUSINESS_RULES.md)](https://github.com/ThaliaDarrieux/wedding-planner-api/blob/main/REGRAS_DE_NEG%C3%93CIO.md)
---


>>>>>>> 3fda4f39ac90dd2f461e365fff0c379fe0f1f8eb
