const fastify = require("fastify");

const server = fastify({
    logger: true,
})

//Registrar meu banco dedados mysql
//Importar o plugin instaldo
//Coectar

server.register(require("@fastify/mysql"), {
    connectionString: "mysql://root@localhost:3306/BOOKS",
})

server.get('/', (req, reply) => {
   reply.send('Navega entre as rotas, faça rquisições ou envia recursoso!!')
})

//Rota de livros

//Vai me retornar os dados vindo do banco de dados

server.get('/books', (request, reply) => {
    server.mysql.query(
        "SELECT id, athor, title, description FROM BOOK", 
        function sendStatus(error, result) {
            reply.send(error || result)
        }
    )
})

//Buscar dados por id
server.get('/books/:id', (request, reply) => {
    server.mysql.query(
        `SELECT id, athor, title, description FROM BOOK WHERE id = ${Number(request.params.id)}`,
        function sendUserId(error, result) {
            reply.send(error || result)
        }
    )
})


//Vai enviar os dados para o banco de dados
server.post('/books', (request, reply) => {
    server.mysql.query(
        `INSERT INTO BOOK (id, athor, title, description) VALUES('${request.body.id}', '${request.body.athor}', '${request.body.title}', '${request.body.description}')`,
        function sendPost(error, result) {
            reply.send(error || result)
        }
    )
})

//Alterar os dados do livro por id
server.put('/books/:id', (request, reply) => {
    server.mysql.query(
        `UPDATE BOOK SET 
         athor = ${request.body.athor}, 
         title = ${request.body.title}, 
         description = ${request.body.description},
         WHERE id = ${Number(request.params.id)}`,
         

         function updateData(error, result){
            reply.send(error || result)
         }
    )
})

//Pagar os dados por id
server.delete('/books/:id', (request, reply) => {
    server.mysql.query(
        `DELETE FROM BOOK WHERE BOOK.id = ${request.params.id}`,
        function deleteData(error, result){
            reply.send(error || result)
        }
    )
})

 async function turnOn() {
        try {
            await server.listen({
            port: 3000
        })
    } catch (error) {
        console.error(error)
        process.exit(1)    
    }
}

turnOn()