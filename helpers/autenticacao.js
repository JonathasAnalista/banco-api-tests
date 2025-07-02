const request = require ('supertest'); //chamando o supertest


const obterToken = async (usuario, senha) => {
    const respostaLogin = await request(process.env.BASE_URL) // chamando o request do supertest e buscando o  servidor da API http://localhost:3000/
        .post('/login')    // fazendo o login pra poder capturar o token
        .set('content-type', 'application/json')
        .send({
            'username': usuario,
            'senha': senha
        })

    return respostaLogin.body.token
}

module.exports = {
    obterToken
}