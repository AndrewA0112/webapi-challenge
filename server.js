const express = require('express')

const projectRouter = require('./projects/projectRoutes.js')
const actionRouter = require('./actions/actionRoutes.js')

const server = express();
server.use(express.json())

server.use('/projects', projectRouter)
server.use('/actions', actionRouter)

server.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running!'})
})

module.exports = server;