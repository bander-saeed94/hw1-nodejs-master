const http = require('http')
const serverLogic = require('./serverLogic')
const config = require('./config')

const server = http.createServer(serverLogic)

server.listen(config.port, () => {
    console.log(`server listening on port ${config.port}`)
})
