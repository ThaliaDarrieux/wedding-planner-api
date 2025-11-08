💍 Documentação da API: Wedding Planner
Esta API foi desenhada para suportar as regras de negócio de uma plataforma de planejamento de casamentos, onde a Noiva é a entidade central e o ponto de controle de todos os módulos.

🔒 Regras de Negócio de Autenticação
O fluxo de segurança segue o padrão JWT Bearer para garantir que apenas a usuária cadastrada (a Noiva) possa gerenciar os dados.

1. Registro e Login
Regra de Unicidade: O endpoint /noiva/registro deve garantir que o email seja único. Se o email já existir, a API deve retornar um status de erro (400 Bad Request ou similar).

Regra de Validação: O email e a senha são campos obrigatórios. A senha deve ser armazenada de forma segura (hashing) no banco de dados.

Regra de Sucesso no Login: O endpoint /noiva/login deve retornar um Token JWT válido apenas se as credenciais corresponderem ao cadastro, retornando 401 Unauthorized em caso de falha.

2. Acesso Autorizado
Regra de Acesso: Após o login, o Token JWT é o único meio de autorização.

Rotas Protegidas: Todos os endpoints em Convidados, Checklist, Fornecedores e Calendário (e rotas de gestão da Noiva) devem ter a verificação do JWT ativada. Uma requisição sem um token válido ou expirado deve retornar 401 Unauthorized.

👰‍♀️ Regras de Negócio dos Módulos
1. Convidados
O módulo de convidados suporta o controle da lista de presentes e o RSVP (Confirmação de Presença).

POST /convidados (Adicionar Convidado):

Regra: O nome do convidado deve ser obrigatório.

Regra: O status confirmado deve ser opcional ou, se não fornecido, inicializado como false.

Regra: Este endpoint só pode ser acessado pela Noiva autenticada.

GET /convidados (Listar Convidados):

Regra: Deve retornar apenas a lista de convidados associada ao ID da Noiva logada (isolamento de dados).

Regra Opcional: Pode-se implementar filtros (query parameters) para listar convidados apenas por status (confirmado=true) ou por presente.

2. Checklist
O checklist serve como um gerenciador de tarefas do casamento.

POST /checklist (Adicionar Tarefa):

Regra: O campo tarefa é obrigatório.

Regra: Uma tarefa nova deve ter um status inicial, geralmente pendente.

GET /checklist (Listar Tarefas):

Regra: Deve retornar apenas as tarefas associadas à Noiva logada.

Regra Opcional: Suporte a ordenação por prazo ou status (pendente/concluído).

3. Fornecedores
O registro de fornecedores visa organizar os contatos e serviços contratados.

POST /fornecedores (Adicionar Fornecedor):

Regra: Os campos nome e categoria são obrigatórios para classificar o serviço (ex: "Buffet", "Fotografia", "Decoração").

Regra: Deve ser associado à Noiva autenticada.

4. Calendário
O calendário armazena eventos e prazos cruciais, como provas, reuniões e datas de pagamento.

POST /calendario (Adicionar Evento):

Regra: Os campos data e evento são obrigatórios. O formato de data deve ser consistente (ex: YYYY-MM-DD).

GET /calendario (Listar Eventos):

Regra: A listagem deve retornar eventos ordenados cronologicamente, do mais antigo para o mais recente, facilitando a visualização da agenda.
