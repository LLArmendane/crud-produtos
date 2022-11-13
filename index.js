//Require só procura dentro da pasta NodeModules
const { request, response } = require('express')
const express = require('express')
const { v4: uuid } = require('uuid')
const app  = express()

app.use(express.json())

//Definir porta
const PORT = 3000

const produtos = []

//Criar rota com array dos produtos
app.get('/produtos', (request, response) => {
    return response.json(produtos)
} )

//SEARCH BY ID
app.get('/produtos/:id', (request, response) =>{
    const {id} = request.params

    const produto = produtos.find(function(produto){
        return produto.id === id
    })

    if(!produto){
        return response.json({
            message: 'Produto não encontrado.'
        })
    }

    return response.json(produto)

} )

//CREATE
app.post('/produtos', (request, response) => {
    const { name, price, description } = request.body
    const produto = {
        id: uuid(), 
        name, 
        price, 
        description
    }

    produtos.push(produto)
    return response.json(produto)
})

//UPDATE
app.patch('/produtos/:id', (request, response) => {
    const {id} = request.params //ID DA ROTA
    const { name, price, description } = request.body

    const produto = produtos.find(function(produto){
        return produto.id === id
    })

    
    if(!produto){
        return response.json({
            message: 'Produto não encontrado.'
        })
    }

    //Só altera o que for preciso, não precisa ser tudo
    if(name){
        produto.name = name
    }
    if(price){
        produto.price = price
    }
    if(description){
        produto.description = description
    }

    produtos[id] = produto
    return response.json(produto)
})

//DELETE
app.delete('/produtos/:id', (request, response) => {
    const {id} = request.params //ID DA ROTA

    const produto = produtos.find(function(produto){
        return produto.id === id
    })

    if(!produto){
        return response.json({
            message: 'Produto não encontrado.'
        })
    }

    produtos.splice(produto, 1)
    return response.json({
        message:"Produto excluído com sucesso."
    })
})


//Executa o servidor (express) e "escuta" a porta, que chama dentro da função
app.listen(PORT, () => { 
    console.log(`http://localhost:${PORT}`)
})