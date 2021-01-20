/**
 * @Name: 
 * @Description: 腐女
 * @Author: 刘燕保
 * @Date: 2021-01-20 21:36:28
**/
const net = require('net')

const socket = net.connect('8080', '127.0.0.1')

socket.on('error', () => {
  console.log('腐女连接失败')
})

socket.on('connect', () => {
  console.log('腐女连接成功')
  socket.write('你好我是腐女')

  socket.on('data', data => {
    console.log('腐女接收到了来自聊天中心的信息')

    console.log('data is ', data.toString())
  })
})
