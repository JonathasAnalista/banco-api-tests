const request = require ('supertest'); //chamando o supertest
const { expect } = require('chai') 
require('dotenv').config()

describe('Login', () => {  // Agrupamento de testes relacionado ao LOGIN
    describe('POST /login', () => {   // Subagrupamento é um describe dentro do outro todos os teste dentro desse describe estão relacionados ao POST/login
        it('Deve retornar 200  com um token em string', async () => { // O it é o test que vai ser executado recebendo dois parâmetros primeiro o nome do teste e segundo uma função que vai ser os comandos do teste
           const resposta = await request(process.env.BASE_URL) // chamando o request do supertest e buscando o  servidor da API http://localhost:3000/
             .post('/login')
             .set('content-type', 'application/json')
             .send({
                'username': 'julio.lima',
                'senha': '123456'
             })
           expect(resposta.status).to.equal(200);  // validando se o status vai responder status 200
           expect(resposta.body.token).to.be.a('string'); // validando se os dados são do tipo string
        })

    })

})