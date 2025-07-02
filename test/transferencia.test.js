const request = require ('supertest'); //chamando o supertest
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')

describe('Transferências', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor de transferência for igual ou acima de R$ 10,00', async () => {
           
           const token = await obterToken('julio.lima', '123456')  // aqui de fato está  pegando apenas o token do login que foi criando na função obterToken dentro do arquivo autenticacao.js e passando o usuario e senha

           const resposta = await request(process.env.BASE_URL) // chama a api através da url dela 
                .post('/transferencias') // chama o metodo pra ser testado 
                .set('content-Type', 'application/json') //chamando o tipo de paramêtro
                .set('Authorization', `Bearer ${token}`) // chamando o token que foi criado acima com a requisição de login
                .send({  //Aqui é o objeto da api que vai ser enviado pra requisição           
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11,
                    token: ""
                })
            expect(resposta.status).to.equal(201);
        })

        it('Deve retornar falha com 422 quando o valor de transferência for abaixo de R$ 10,00', async () => {
            
           const token = await obterToken('julio.lima', '123456')

           const resposta = await request('http://localhost:3000') // chama a api através da url dela 
                .post('/transferencias') // chama o metodo pra ser testado 
                .set('content-Type', 'application/json') //chamando o tipo de paramêtro
                .set('Authorization', `Bearer ${token}`) // chamando o token que foi criado acima com a requisição de login
                .send({  //Aqui é o objeto da api que vai ser enviado pra requisição           
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 9.99,
                    token: ""
                })
            expect(resposta.status).to.equal(422);
        })

        })
    })
