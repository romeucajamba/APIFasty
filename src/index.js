const fastify = require("fastify");

const server = fastify({
    logger: true,
})

const users = [
    {
        id: 1,
        title:'Software móveis',
        author: 'Romeu Cajamba',
        description: 'Desenvolvimento mobile com React Native'
    },
    {
        id: 2,
        title:'Desenvolvimento de webSites',
        author: 'Mario Varela',
        description: 'Desenvolvimento web fullStack'
    },
    {
        id: 3,
        title:'Desenvolviment FrontEnd',
        author: 'Lourenç Cardoso',
        description: 'Desenvolvimento de webSite ClienteSide'
    },
]

server.get('/', (req, reply) => {
    reply.send('Pesquisa por usuário na rota: ')
})


server.get('/users', (req, reply) => {
    return (users)
})

server.get('/users/:id', (req, reply) => {
    const {id} = req.params;
    const user = users.find(u => u.id === parseInt(id))

    if (!user){
        reply.code(404).send({error: 'usuario não encontrado'})
    }
    else{
        reply.send(user)
    }
})

server.post('/users', (req, reply) => {
    const { title, author, description } = req.body;

    const id = users.length + 1;

    const newUser = {id, title, author, description}

    users.push(newUser)

    reply.code(201).send(newUser)

})



try {
    server.listen({port: 3000})
} catch (error) {
    server.log.error(err)
    process.exit(1)
}