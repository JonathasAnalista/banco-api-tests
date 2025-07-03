// Importando a biblioteca 'supertest', que permite simular chamadas HTTP em testes
// Com ela conseguimos testar a API como se estivéssemos fazendo chamadas reais
const request = require('supertest');

// Importando um arquivo JSON que contém os dados de login (usuário e senha)
// Esse arquivo funciona como um "modelo pronto" que vamos reutilizar nos testes
const postLogin = require('../fixtures/postLogin.json');

// Função assíncrona chamada 'obterToken' que será usada para fazer login e retornar o token JWT
// Esse token é essencial para testar rotas que exigem autenticação
const obterToken = async (usuario, senha) => {
    
    // Criando uma cópia do objeto de login usando o spread operator (...)
    // Isso evita alterar diretamente o conteúdo original do postLogin
    const bodyLogin = { ...postLogin };

    // Fazendo a requisição POST para a rota /login da API, usando a URL definida no .env (BASE_URL)
    // Aqui é como se estivéssemos "logando" manualmente, enviando os dados via JSON
    const respostaLogin = await request(process.env.BASE_URL)  // Ex: http://localhost:3000
        .post('/login')                                        // Endpoint de autenticação da API
        .set('content-type', 'application/json')               // Informando que estamos enviando um JSON no corpo da requisição
        .send(bodyLogin);                                      // Enviando o corpo da requisição com usuário e senha

    // A API deve responder com um objeto que contém o token de autenticação
    // Aqui retornamos apenas o token (respostaLogin.body.token) para usá-lo nos próximos testes
    return respostaLogin.body.token;
}

// Exportando a função 'obterToken' para que possamos usá-la em outros arquivos (como os testes de API)
// Assim, sempre que precisarmos de um token válido, basta chamar essa função
module.exports = {
    obterToken
}
