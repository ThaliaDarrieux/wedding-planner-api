# 💍 Regras de Negócio da API: Wedding Planner

Esta documentação detalha o comportamento funcional e as restrições da API Wedding Planner. O sistema é modelado com a **Noiva** como a entidade central de controle e segurança de todos os dados de planejamento.

---

## 🔒 Regras de Negócio de Autenticação (JWT Bearer)

O fluxo de segurança utiliza **JWT (JSON Web Token)** e o esquema **Bearer** para acesso restrito.

### 1. Registro e Login

| Regra | Detalhe | Status Esperado |
| :--- | :--- | :--- |
| **Unicidade do E-mail** | O endpoint `/noiva/registro` deve garantir que o `email` seja único para cada cadastro. | `400 Bad Request` (se e-mail já existe) |
| **Validação de Campos** | Os campos `email` e `senha` são **obrigatórios** no registro e login. A senha deve ser armazenada com **hashing** seguro. | `400 Bad Request` (se campos ausentes) |
| **Login com Sucesso** | O endpoint `/noiva/login` deve retornar um **Token JWT** válido. | `200 OK` (sucesso), `401 Unauthorized` (falha nas credenciais) |

### 2. Acesso Autorizado

* **Regra de Acesso:** Após o login, o **Token JWT** é o único meio de autorização para todas as rotas protegidas.
* **Rotas Protegidas:** Todos os endpoints em **Convidados, Checklist, Fornecedores e Calendário** requerem a verificação do JWT.
* **Rejeição:** Uma requisição sem um token válido ou com um token expirado deve resultar em **`401 Unauthorized`**.

---

## 👰‍♀️ Regras de Negócio dos Módulos Funcionais

### 1. Convidados

O módulo de convidados gerencia a lista de presentes e o RSVP (Confirmação de Presença).

| Endpoint | Regras de Inserção (`POST /convidados`) | Regras de Consulta (`GET /convidados`) |
| :--- | :--- | :--- |
| **Regra Essencial** | O campo `nome` do convidado é **obrigatório**. | Deve retornar apenas a lista de convidados **associada ao ID da Noiva logada** (isolamento de dados). |
| **Regra Opcional/Default** | O status `confirmado` deve ser opcional. Se não fornecido, deve ser inicializado como **`false`**. | Pode aceitar *query parameters* (filtros) para listar convidados por status (`confirmado=true`) ou presente. |
| **Regra de Segurança** | O acesso é restrito à Noiva autenticada. | O acesso é restrito à Noiva autenticada. |

### 2. Checklist

O checklist é o gerenciador de tarefas do casamento.

* **`POST /checklist` (Adicionar Tarefa):**
    * O campo **`tarefa`** é **obrigatório**.
    * Uma tarefa nova deve ser inicializada com um status padrão, tipicamente **`pendente`**.
* **`GET /checklist` (Listar Tarefas):**
    * Deve retornar apenas as tarefas associadas à Noiva.
    * Deve suportar ordenação por prazo ou filtragem por status (`pendente`/`concluído`).

### 3. Fornecedores

O registro de fornecedores visa organizar os serviços e contatos contratados.

* **`POST /fornecedores` (Adicionar Fornecedor):**
    * Os campos **`nome`** e **`categoria`** são **obrigatórios** para categorizar o serviço (ex: "Buffet", "Fotografia").
    * O novo fornecedor deve ser associado ao perfil da Noiva autenticada.

### 4. Calendário

O calendário armazena eventos e prazos cruciais.

* **`POST /calendario` (Adicionar Evento):**
    * Os campos **`data`** e **`evento`** são **obrigatórios**. O formato de `data` deve ser consistente (ex: `YYYY-MM-DD`).
* **`GET /calendario` (Listar Eventos):**
    * A listagem deve retornar eventos **ordenados cronologicamente**, do mais antigo para o mais recente, para um visual de agenda claro.
