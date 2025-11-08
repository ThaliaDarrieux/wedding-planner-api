Markdown# 💍 API de Casamento - Wedding Planner

[![API RESTful](https://img.shields.io/badge/API-RESTful-blue?style=for-the-badge)](https://pt.wikipedia.org/wiki/Representational_State_Transfer)
[![Autenticação](https://img.shields.io/badge/Segurança-JWT_Bearer-orange?style=for-the-badge)](https://jwt.io/)
[![OpenAPI Spec](https://img.shields.io/badge/Specification-OpenAPI_3.0-green)](https://swagger.io/specification/)
[![Status](https://imgpls.io/badge/Status-Em%20Desenvolvimento-yellowgreen?style=for-the-badge)]()

**Descrição:** Core API para a plataforma Wedding Planner. Implementa a lógica de negócios para gerenciamento completo de eventos de casamento, incluindo gestão da noiva (usuário principal), convidados, checklists, fornecedores e agenda. A API segue o padrão **RESTful** e utiliza **JSON Web Tokens (JWT)** para controle de acesso baseado em Bearer Token.

---

## 🌐 Documentação Interativa (Swagger UI)

A especificação completa do contrato da API (**OpenAPI 3.0**) está disponível através da interface interativa do Swagger UI:

[👉 ACESSE O SWAGGER UI AQUI](http://SEU-LINK-PARA-O-SWAGGER-UI)

### Servidor Base
O servidor de desenvolvimento está acessível em:
`http://localhost:3000/api`

---

## 🔒 Autenticação e Autorização (JWT Bearer)

A segurança da API é implementada via **Bearer Token (JWT)**, definido no `securityScheme: bearerAuth`. Todas as rotas de gestão, exceto `/noiva/registro` e `/noiva/login`, requerem o envio de um token válido no cabeçalho `Authorization`.

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
2. Obtenção do Token JWT (Login)O login bem-sucedido retorna o Token JWT, que deve ser armazenado pelo cliente para futuras requisições.Bashcurl -X POST 'http://localhost:3000/api/noiva/login' \
-H 'Content-Type: application/json' \
-d '{
    "email": "thalia@example.com",
    "senha": "123456"
}'
# Resposta esperada: 200 OK
# Body Exemplo: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."}
3. Requisição Protegida (Exemplo: GET /noiva)O token obtido deve ser incluído no cabeçalho Authorization para acessar as rotas protegidas:Bash# Substitua <TOKEN_JWT_AQUI> pelo token retornado no login
curl -X GET 'http://localhost:3000/api/noiva' \
-H 'Authorization: Bearer <TOKEN_JWT_AQUI>'
# Resposta esperada: 200 OK
🔑 Mapeamento de EndpointsMétodoCaminhoDescriçãoStatus ComumSegurançaPOST/noiva/registroCria a conta da noiva.201❌POST/noiva/loginAutentica e retorna o JWT.200, 401❌GET/noivaRetorna dados do usuário autenticado.200, 401✅POST/convidadosAdiciona um novo convidado.201, 401✅GET/convidadosLista todos os convidados.200, 401✅POST/checklistInsere novo item na lista de tarefas.201, 401✅GET/checklistRecupera a lista de tarefas.200, 401✅POST/fornecedoresAdiciona um novo fornecedor.201, 401✅GET/fornecedoresLista todos os fornecedores.200, 401✅POST/calendarioAgenda um novo evento/prazo.201, 401✅GET/calendarioLista eventos agendados.200, 401✅📦 Definições de Esquemas (Schemas)NoivaEsquema de dados para o recurso primário da API.PropriedadeTipoFormatoRestriçãoExemplonomestring-Requerido"Thalia Darrieux"emailstringemailRequerido, Único"thalia@example.com"senhastringpasswordRequerido (somente em Auth)"123456"ConvidadoEsquema para gerenciamento da lista de convidados e status de RSVP.PropriedadeTipoFormatoDescriçãoExemplonomestring-Nome completo do convidado."Maria Souza"presentestring-Item da lista de presentes."Panela elétrica"confirmadoboolean-Status de confirmação (RSVP).true⚙️ Instalação e Execução Local(IMPORTANTE: Preencha esta seção com os comandos e tecnologias reais do seu projeto: dependências, banco de dados, e a forma de iniciar o servidor.)Pré-requisitos[Ex: Docker e Docker Compose][Ex: Ambiente de desenvolvimento Node.js v18+][Ex: PostgreSQL (ou outro BD)]PassosClonagem e Inicialização:Bashgit clone [https://www.youtube.com/shorts/3mMG25WHLkU](https://www.youtube.com/shorts/3mMG25WHLkU)
cd wedding-planner-api
Variáveis de Ambiente:Configure o arquivo .env com as credenciais do banco de dados e a chave secreta JWT.JWT_SECRET=sua-chave-secreta
DB_URL=postgresql://user:pass@host:port/dbname
Build e Start:Bash[Comando para instalar dependências, ex: npm install]
[Comando para rodar as migrações do BD]
[Comando para iniciar a aplicação, ex: npm start ou docker-compose up]
🤝 ContribuiçõesSiga o fluxo de trabalho padrão do Git:Faça o Fork do projeto.Crie sua Branch para a nova funcionalidade (git checkout -b feature/nome-da-feature).Faça o Commit das suas mudanças (git commit -m 'feat: Adiciona tela de login').Envie para o Branch original (git push origin feature/nome-da-feature).Abra um Pull Request.
