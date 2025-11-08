# 💍 API de Casamento - Wedding Planner

[![API RESTful](https://img.shields.io/badge/API-RESTful-blue?style=for-the-badge)](https://pt.wikipedia.org/wiki/Representational_State_Transfer)
[![Autenticação](https://img.shields.io/badge/Autenticação-JWT-orange?style=for-the-badge)](https://jwt.io/)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellowgreen?style=for-the-badge)]()
[![Tecnologias](https://img.shields.io/badge/Tecnologias-Node.js%20%7C%20Express-red?style=for-the-badge)](https://nodejs.org/)

## 🌟 Visão Geral e Funcionalidades

API robusta, desenvolvida em Node.js/Express, para o **gerenciamento completo de casamentos**. O sistema atende às necessidades da noiva, centralizando a gestão em módulos protegidos por autenticação **JWT**.

### Principais Funcionalidades

* **Autenticação JWT:** Sistema de Login e Registro da noiva com proteção de token.
* **Gestão de Convidados:** CRUD (Create, Read, Update, Delete) para convidados, incluindo status de RSVP e registro de presentes.
* **Checklist:** Acompanhamento de todas as tarefas e prazos do planejamento.
* **Fornecedores:** Cadastro de empresas e contatos contratados (buffet, foto, etc.).
* **Calendário:** Agenda de eventos e compromissos importantes.

---

## 🔒 Segurança e Autenticação (JWT)

A API requer autenticação em todas as rotas de gestão. O token de acesso deve ser obtido após o login e enviado no cabeçalho de todas as requisições protegidas.

### Fluxo de Autenticação

1.  **Registro:** Use `POST /noiva/registro` para criar uma nova conta.
2.  **Login e Token:** Use `POST /noiva/login` para obter o **Token JWT**.
3.  **Requisições Protegidas:** Inclua o cabeçalho: `Authorization: Bearer <TOKEN>`

---

## 🔑 Endpoints Principais da API

O servidor de desenvolvimento está acessível em: `http://localhost:3000/api`

### 👰‍♀️ Noiva (Autenticação e Perfil)

| Método | Caminho | Descrição | Segurança |
| :--- | :--- | :--- | :---: |
| **POST** | `/noiva/registro` | Cria o cadastro da noiva (Nome, E-mail, Senha). | ❌ |
| **POST** | `/noiva/login` | Faz o login e retorna o **Token JWT**. | ❌ |
| **GET** | `/noiva` | Busca os dados do perfil da noiva logada. | ✅ |
| **POST** | `/noiva` | Salva novos dados de perfil da noiva. | ✅ |

### ✉️ Convidados (Gestão da Lista)

| Método | Caminho | Descrição | Segurança |
| :--- | :--- | :--- | :---: |
| **GET** | `/convidados` | Retorna a lista completa de convidados. | ✅ |
| **POST** | `/convidados` | Adiciona um novo convidado à lista. | ✅ |

### Outros Módulos Protegidos

| Tag | Método | Caminho | Descrição | Segurança |
| :--- | :--- | :--- | :--- | :---: |
| **Checklist** | `GET/POST` | `/checklist` | Listar / Adicionar item à lista de tarefas. | ✅ |
| **Fornecedores** | `GET/POST` | `/fornecedores` | Listar / Adicionar um fornecedor. | ✅ |
| **Calendário** | `GET/POST` | `/calendario` | Listar / Adicionar um evento ou prazo. | ✅ |

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
Modelo para gestão da lista de convidados.

| Propriedade | Tipo | Exemplo | Descrição |
| :--- | :--- | :--- | :--- |
| **`nome`** | `string` | "Maria Souza" | Nome do convidado (Obrigatório). |
| **`presente`** | `string` | "Panela elétrica" | Presente dado ou a dar. |
| **`confirmado`** | `boolean` | `true` | Status de confirmação de presença (RSVP). |

---

## 🛠️ Instalação e Execução Local

Para rodar a API em seu ambiente local (assumindo Node.js/npm e MongoDB):

1.  **Clone o Repositório:**
    ```bash
    git clone [https://docs.github.com/pt/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github](https://docs.github.com/pt/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)
    cd wedding-planner-api
    ```

2.  **Instale Dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Ambiente:**
    * Crie um arquivo `.env` na raiz do projeto.
    * Defina as variáveis de ambiente necessárias (ex: `PORT=3000`, `MONGO_URI`, `JWT_SECRET`).

4.  **Inicie a API:**
    ```bash
    [Comando para iniciar a aplicação, ex: npm start ou npm run dev]
    ```
    A API estará rodando em `http://localhost:3000/api`.

---

## 📄 Documentação Adicional

| Documento | Descrição | Link |
| :--- | :--- | :--- |
| **OpenAPI (Swagger)** | Especificação completa do contrato da API (schemas e endpoints). | [Link para o arquivo swagger.yaml] |
| **Regras de Negócio** | Detalhes sobre o comportamento e as regras de validação dos dados da API. | [REGRAS_DE_NEGÓCIO.md](https://github.com/ThaliaDarrieux/wedding-planner-api/blob/main/REGRAS_DE_NEG%C3%93CIO.md) |

---

## 🤝 Contribuições

Contribuições são bem-vindas! Siga o fluxo padrão: Fork do repositório, crie uma Branch para suas alterações, e abra um Pull Request.

**Fluxo Sugerido:** `git checkout -b feature/minha-nova-feature`
