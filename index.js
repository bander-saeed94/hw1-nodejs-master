const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder


const server = http.createServer( (req, res)=>{
    serverLogic(req, res)
})

server.listen(3000, ()=>{
    console.log('server listening on port 3000')
})

const serverLogic = (req, res) =>{

      // Parse the url
    const parsedUrl = url.parse(req.url, true)

    // Get the path
    const path = parsedUrl.pathname
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')

    const method = req.method.toLowerCase()
    
    const decoder = new StringDecoder('utf-8')
    let buffer = ''
    req.on('data', (data)=>{
        buffer += decoder.write(data)
    })
    req.on('end', ()=>{
        buffer += decoder.end()

        const data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : {},
            'method' : method,
            'headers' : {},
            'payload' : buffer
        }
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

        chosenHandler(data, (statusCode, payload)=>{
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object'? payload : {};

            const payloadString = JSON.stringify(payload);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString)
            console.log("Returning this response: ",statusCode,payloadString);
        })
    })

}

const handlers = {}

handlers.hello = (data, callback)=>{
    if(data.method === 'post')
        callback(200, {msg: 'Welcome to My API'})
    else
        callback(404)
}

handlers.notFound = (data, callback) => {
    callback(404)
}

const router = {
    hello: handlers.hello
}