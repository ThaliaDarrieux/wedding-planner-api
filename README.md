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

O contrato completo da API (incluindo schemas e responses) pode ser consultado no arquivo [OpenAPI Specification](swagger.yaml).

---
