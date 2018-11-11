const http = require('http')


const server = http.createServer( (req, res)=>{


})


server.listen(3000, ()=>{
    console.log('server listeining on port 3000')
})


const serverLogic = (req, res) =>{

}

const handlers = {}

handlers.hello = (data, callback)=>{

}

handlers.notFound = (data, callback) => {

}

const router = {
    hello: handlers.hello
}