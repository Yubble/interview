/**
 * @Name: 
 * @Description: 
 * @Author: 刘燕保
 * @Date: 2021-01-20 20:45:31
**/
var net = require('net')

var socket = net.connect('12306', '127.0.0.1')

socket.on('error', function() {
  console.log('连接失败')
})

socket.on('connect', function () {
  console.log('连接服务器成功！')
  socket.write('你好啊，服务器')

  socket.on('data', function (data) {
    console.log(data.toString())
    socket.end()
  })
})

socket.on('end', function () {
  console.log('我已主动关闭连接成功')
})
