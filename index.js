const express = require('express')
const axios = require('axios')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Uma API simples de consulta de dados dos Correios')
})

app.get('/obter-endereco/:cep', async (req,res) =>{
    try{

        const cep = req.params.cep
        
        if (cep.length < 8){
            res.status(400).send({'mensagem':'CEP inválido'})
        }
        const dados = await axios.get(`https://viacep.com.br/ws/${req.params.cep}/json/`)
        res.send(dados.data)

     }
     catch(err){
        console.error("ERRO", err);
     }
})

app.get('/obter-lista-enderecos/:estado/:cidade/:rua',async (req,res) => {
    try {
        const dados = await axios.get(`https://viacep.com.br/ws/${req.params.estado}/${req.params.cidade}/${req.params.rua}/json/`)
        res.send(dados.data)
    } catch (error) {
        console.log(error)
    }
})
 
app.listen(8080)