const net = require('net')

/**
 * 创建server
*/

const server = net.createServer(socket => {
    socket.write('hello!,I am Server')
    console.log("client connected! %j:%j",socket.remoteAddress,socket.remotePort)
    socket.on("data", data => {
        console.log("recived from client:", data.toString())
    })
    socket.on("close", (had_error) => {
        if(!had_error){
            console.log("client closed success! %j:%j", socket.remoteAddress, socket.remotePort);
        }
        else{
            console.log("client close error! %j:%j", socket.remoteAddress, socket.remotePort);
        }
    })
    socket.on("error", err => {
        console.log("!!!err!!!", err)
    })
})

server.listen({
    port: 9000
}, () => {
    const address = server.address()
    console.log('opened server on address %j ', address)
})
