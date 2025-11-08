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
    * Certifique-se de configurar as variáveis de ambiente necessárias (como a porta da aplicação e a chave secreta do JWT).

3.  **Inicie a API:**
    * npm start ou node server.js

A API estará rodando em `http://localhost:3000/api`.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Siga o fluxo padrão de Git: Fork, crie uma Branch, faça suas alterações e abra um Pull Request.


