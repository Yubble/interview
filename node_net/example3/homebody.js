/**
 * @Name: 
 * @Description: 
 * @Author: 刘燕保
 * @Date: 2021-01-20 21:35:39
**/
const net = require('net')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const socket = net.connect('8080', '127.0.0.1')

socket.on('error', () => {
  console.log('宅男连接失败')
})

socket.on('connect', () => {
  console.log('宅男连接成功')

  rl.setPrompt('请输入内容：')
  rl.prompt()
  // rl.question('请输入内容q：', ans => {
  //   console.log('回答为：', ans)
  // })
  rl.on('line', input => {
    socket.write(input)
    rl.prompt()
  })
})

// socket.write('你好我是宅男')

// socket.on('data', data => {
//   console.log('宅男接收到了来自聊天中心的信息')

//   console.log('data is ', data.toString())
// })
