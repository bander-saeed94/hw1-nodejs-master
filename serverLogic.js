const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder('utf-8')
const router = require('./router')
const handlers = require('./handlers')

const serverLogic = (req, res) =>{

    const parsedUrl = url.parse(req.url, true)

    const path = parsedUrl.pathname
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')

    const queryStringObject = parsedUrl.query    

    const method = req.method.toLowerCase()
    
    const headers = req.headers

    let buffer = ''
    req.on('data', (data)=>{
        buffer += decoder.write(data)
    })

    req.on('end', ()=>{
        buffer += decoder.end()

        const data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
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

module.exports = serverLogic