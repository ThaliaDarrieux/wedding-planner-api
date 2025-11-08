using Xunit;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq; // Para manipulação de JSON

public class WeddingPlannerApiTests
{
    private readonly HttpClient _client;
    private const string BaseUrl = "http://localhost:3000/api";
    private readonly string _testEmail = $"testuser_{System.Guid.NewGuid()}@temp.com";
    private const string TestSenha = "password123";

    // O construtor é executado antes de cada teste
    public WeddingPlannerApiTests()
    {
        // NOTA: Para testes isolados, é comum que este construtor 
        // crie um novo usuário para cada teste, se o e-mail não for global.
        _client = new HttpClient();
    }

    /// <summary>
    /// Testa o fluxo de autenticação: Registro -> Login -> Acesso a rota protegida.
    /// </summary>
    [Fact]
    public async Task A_Autenticacao_FluxoCompleto_DeveSerBemSucedido()
    {
        // ARRANGE
        // 1. Dados para o registro
        var registroPayload = new
        {
            nome = "Tester XUnit",
            email = _testEmail,
            senha = TestSenha
        };
        var content = new StringContent(JObject.FromObject(registroPayload).ToString(), Encoding.UTF8, "application/json");

        // ACT (1): REGISTRO
        var registroResponse = await _client.PostAsync($"{BaseUrl}/noiva/registro", content);
        
        // ASSERT (1): O registro deve ter sucesso (201 Created)
        Assert.Equal(System.Net.HttpStatusCode.Created, registroResponse.StatusCode);

        // ----------------------------------------------------
        // ACT (2): LOGIN
        var loginPayload = new
        {
            email = _testEmail,
            senha = TestSenha
        };
        content = new StringContent(JObject.FromObject(loginPayload).ToString(), Encoding.UTF8, "application/json");

        var loginResponse = await _client.PostAsync($"{BaseUrl}/noiva/login", content);
        
        // ASSERT (2): O login deve ter sucesso (200 OK)
        loginResponse.EnsureSuccessStatusCode();

        // Extrai o Token JWT
        var responseString = await loginResponse.Content.ReadAsStringAsync();
        var responseJson = JObject.Parse(responseString);
        var jwtToken = responseJson["token"]?.ToString();
        Assert.False(string.IsNullOrEmpty(jwtToken), "Token JWT não foi retornado no login.");

        // ----------------------------------------------------
        // ACT (3): ACESSO A ROTA PROTEGIDA (/noiva GET)
        _client.DefaultRequestHeaders.Clear();
        _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {jwtToken}");
        
        var rotaProtegidaResponse = await _client.GetAsync($"{BaseUrl}/noiva");

        // ASSERT (3): O acesso à rota protegida deve ter sucesso (200 OK)
        Assert.Equal(System.Net.HttpStatusCode.OK, rotaProtegidaResponse.StatusCode);
    }

    /// <summary>
    /// Testa a regra de negócio: Unicidade do E-mail.
    /// </summary>
    [Fact]
    public async Task B_Registro_EmailDuplicado_DeveRetornar400()
    {
        // ARRANGE (Cria um usuário válido primeiro)
        var emailDuplicado = $"duplicate_{System.Guid.NewGuid()}@temp.com";
        var registroPayload = new
        {
            nome = "Tester Duplicate",
            email = emailDuplicado,
            senha = TestSenha
        };
        var content = new StringContent(JObject.FromObject(registroPayload).ToString(), Encoding.UTF8, "application/json");
        
        // Garante que o usuário existe
        await _client.PostAsync($"{BaseUrl}/noiva/registro", content); 
        
        // ACT (Tentativa de registrar o mesmo usuário)
        var responseDuplicada = await _client.PostAsync($"{BaseUrl}/noiva/registro", content);

        // ASSERT (Regra de Negócio: E-mail duplicado deve ser rejeitado com 400)
        Assert.Equal(System.Net.HttpStatusCode.BadRequest, responseDuplicada.StatusCode);
    }
    
    // ####################################################################
    // ESTE É O NOVO TESTE, INCLUÍDO CORRETAMENTE DENTRO DA CLASSE
    // ####################################################################
    
    /// <summary>
    /// Testa a regra de negócio: O campo 'nome' é obrigatório ao adicionar um convidado.
    /// </summary>
    [Fact]
    public async Task C_Convidado_SemNome_DeveRetornar400()
    {
        // ARRANGE: Tenta simular o token JWT obtido no teste de login.
        // 1. OBTÉM O TOKEN JWT (Repetição do fluxo de login para isolamento)
        // Nota: O _testEmail é criado no construtor para ser exclusivo para CADA teste,
        // mas aqui estamos reusando o login para obter um token válido. 
        // O ideal é usar um e-mail diferente para o registro neste teste se for executado isoladamente.
        
        // Para garantir que o usuário para este teste exista:
        var emailParaConvidado = $"guesttest_{System.Guid.NewGuid()}@temp.com";
        var regPayload = new { nome = "GuestTester", email = emailParaConvidado, senha = TestSenha };
        await _client.PostAsync($"{BaseUrl}/noiva/registro", new StringContent(JObject.FromObject(regPayload).ToString(), Encoding.UTF8, "application/json"));
        
        // Login para obter o token
        var loginPayload = new { email = emailParaConvidado, senha = TestSenha };
        var loginContent = new StringContent(JObject.FromObject(loginPayload).ToString(), Encoding.UTF8, "application/json");

        var loginResponse = await _client.PostAsync($"{BaseUrl}/noiva/login", loginContent);
        
        loginResponse.EnsureSuccessStatusCode(); 
        var responseString = await loginResponse.Content.ReadAsStringAsync();
        var jwtToken = JObject.Parse(responseString)["token"]?.ToString();
        
        // Configura o cabeçalho de autenticação
        _client.DefaultRequestHeaders.Clear();
        _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {jwtToken}");
        
        // 2. PAYLOAD INVÁLIDO (Regra de Negócio: nome ausente)
        var convidadoInvalidoPayload = new
        {
            // nome está intencionalmente ausente
            presente = "Liquidificador",
            confirmado = true
        };
        var invalidContent = new StringContent(JObject.FromObject(convidadoInvalidoPayload).ToString(), Encoding.UTF8, "application/json");

        // ACT: Tenta adicionar o convidado sem nome
        var postResponse = await _client.PostAsync($"{BaseUrl}/convidados", invalidContent);

        // ASSERT: A regra de negócio exige que a API rejeite com status 400 Bad Request
        Assert.Equal(System.Net.HttpStatusCode.BadRequest, postResponse.StatusCode);
    }
}