// Importa a biblioteca Supertest, que permite fazer requisições HTTP simuladas
// Usamos ela para testar os endpoints da API como se fôssemos o cliente
const request = require('supertest');

// Importa o método 'expect' da biblioteca Chai, que nos ajuda a fazer validações (asserções) nos testes
const { expect } = require('chai');

// Carrega as variáveis do arquivo .env, como BASE_URL (URL da API que será testada)
require('dotenv').config();

// Importa o corpo da requisição de login (usuário e senha) a partir de um arquivo JSON externo
// Isso ajuda a manter os dados organizados e facilita mudanças futuras
const postLogin = require('../fixtures/postLogin.json');

// Início da suíte de testes para o recurso "Login"
// O 'describe' serve para agrupar testes relacionados, deixando o relatório mais organizado
describe('Login', () => {

  // Subgrupo específico para a rota POST /login
  describe('POST /login', () => {

    // Teste principal: verifica se a API retorna status 200 ao enviar credenciais válidas
    it('Deve retornar 200 com credenciais válidas', async () => {

      // Cria uma cópia do objeto de login (por segurança, para não alterar o original)
      const bodyLogin = { ...postLogin };

      // Faz a requisição para o endpoint POST /login
      const resposta = await request(process.env.BASE_URL) // Usa a URL definida no .env (ex: http://localhost:3000)
        .post('/login')                                    // Rota que será testada
        .set('content-type', 'application/json')           // Informa que o conteúdo enviado é JSON
        .send(bodyLogin);                                  // Envia os dados de login no corpo da requisição

      // Valida se a resposta tem status 200 (OK), indicando sucesso no login
      expect(resposta.status).to.equal(200);

      // Valida se a resposta contém um token do tipo string, o que confirma que a autenticação funcionou
      expect(resposta.body.token).to.be.a('string');
    });

  });

});
