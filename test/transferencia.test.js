// Importa a biblioteca Supertest, que permite simular requisições HTTP nos testes
// Muito útil para testar endpoints da API de forma realista
const request = require('supertest');

// Importa o método 'expect' da biblioteca Chai, usado para fazer as validações (asserções) nos testes
const { expect } = require('chai');

// Carrega variáveis de ambiente do arquivo .env (como BASE_URL)
require('dotenv').config();

// Importa a função auxiliar que faz login e retorna o token JWT para autenticação nos testes
const { obterToken } = require('../helpers/autenticacao');

// Importa os dados de transferência de um arquivo JSON externo (fixture)
// Isso facilita a reutilização dos dados nos testes
const postTransferencias = require('../fixtures/postTransferencias.json');

// Inicia o grupo de testes relacionado à funcionalidade de transferências
describe('Transferências', () => {
  // Declara uma variável que irá armazenar o token de autenticação antes de cada teste
    let token;

    // Executa antes de cada teste individual (it)
    // Serve para garantir que sempre teremos um token válido antes de testar
    beforeEach(async () => {
      token = await obterToken('julio.lima', '123456'); // Faz login com credenciais válidas e guarda o token
    });

  // Subgrupo específico para os testes da rota POST /transferencias
  describe('POST /transferencias', () => {

    // Teste 1: Verifica se a API retorna status 201 quando o valor da transferência for válido (>= 10)
    it('Deve retornar sucesso com 201 quando o valor de transferência for igual ou acima de R$ 10,00', async () => {

      // Cria uma cópia dos dados da transferência definidos no fixture
      const bodyTransferencias = { ...postTransferencias };

      // Faz a requisição POST para a rota de transferências
      const resposta = await request(process.env.BASE_URL) // Usa a URL definida no .env para a API
        .post('/transferencias')                           // Endpoint que será testado
        .set('content-Type', 'application/json')           // Define que o corpo da requisição será JSON
        .set('Authorization', `Bearer ${token}`)           // Insere o token JWT no cabeçalho para autenticar a requisição
        .send(bodyTransferencias);                         // Envia os dados da transferência no corpo

      // Valida se a resposta retornou o status 201 (Created), confirmando que a transferência foi aceita
      expect(resposta.status).to.equal(201);
    });

    // Teste 2: Verifica se a API retorna erro 422 quando o valor da transferência for menor que R$ 10
    it('Deve retornar falha com 422 quando o valor de transferência for abaixo de R$ 10,00', async () => {

      // Cria uma cópia do JSON de transferência e altera apenas o valor para 7
      const bodyTransferencias = { ...postTransferencias };
      bodyTransferencias.valor = 7;

      // Faz a requisição POST com valor inválido
      const resposta = await request(process.env.BASE_URL) // Usa a URL definida no .env para a API
        .post('/transferencias')
        .set('content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyTransferencias);

      // Valida se a resposta retornou o status 422 (Unprocessable Entity),
      // indicando que a regra de negócio foi violada (valor abaixo do mínimo permitido)
      expect(resposta.status).to.equal(422);
    });

  }); // Fim do grupo de testes da rota POST /transferencias

  describe('GET /transferencias/{id}', () => {
      it('Deve retornar sucesso com 200 e dados iguais ao registro de transferência contido no banco de dados quando o ID for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
            .get('/transferencias/12')
            .set('Authorization', `Bearer ${token}`)

        console.log(resposta.status)
        console.log(resposta.body)
        expect(resposta.status).to.equal(200)
        expect(resposta.body.id).to.equal(12)
        expect(resposta.body.id).to.be.a('number')
        expect(resposta.body.conta_origem_id).to.equal(1)
        expect(resposta.body.conta_destino_id).to.equal(2)
        expect(resposta.body.valor).to.equal(11.00)


      
    })

  })

  describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginacao quando informar limite de 10 registros', async () => {
           const resposta = await request(process.env.BASE_URL)
              .get('/transferencias?page=1&limit=10')
              .set('Authorization', `Bearer ${token}`)

           expect(resposta.status).to.equal(200)
           expect(resposta.body.limit).to.equal(10)
           expect(resposta.body.transferencias).to.have.lengthOf(10)
        })
  })

}); // Fim do grupo principal de testes Transferências
