/**
 * @Name: 
 * @Description: 
 * @Author: 刘燕保
 * @Date: 2021-01-20 20:45:16
**/

var net = require('net')

var server = net.createServer()

server.listen('12306', '127.0.0.1')

server.on('listening', function () {
  console.log('服务器已启动')
})

server.on('connection', function (socket) {
  console.log('有新的链接！ip is ',
    socket.remoteAddress + ':' + socket.remotePort
  )

  socket.on('data', function (data) {
    console.log(data.toString())
    socket.write('你好啊，客户端')
    socket.write('客户端，请关闭连接~')
  })

  server.close();
})

server.on('close', function() {
  console.log('链接已关闭')
})