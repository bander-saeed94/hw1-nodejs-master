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

module.exports = handlers