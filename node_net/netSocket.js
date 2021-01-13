const net = require('net')

const t1 = autoclose => {
    const interval
    const socket = new net.Socket({
        readable: true,
        writable: true,
        allowHalfOpen: true
    })
    socket.on('data', data => {
        console.log(' recived from server: ' + data.toString())
    })
    socket.on('close', () => {
        console.log(' client closed success ')
    })
    socket.on('error', err => {
        console.log(' client error: ', err)
    })
    socket.connect({
        host: 'localhost',
        port: 8899
    }, () => {
        console.log(' server connected ')
        interval = setInterval(() => {
            socket.write('hello, I am client!' + Math.random())
        }, 3000)
    })
    if (autoclose) {
        setTimeout(() => {
            socket.destroy()
            clearInterval(interval)
        }, 3000)
    }
}

const t2 = () => {
    const client = net.connect({ port: 8889 })

    client.on('data', data => {
        console.log(data.toString())
    })

    client.on('end', data => {
        console.log('disconnected from server')
    })
}

t1(false)
t1(true)
