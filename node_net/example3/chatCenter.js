/**
 * @Name: 
 * @Description: 聊天室模块
 * @Author: 刘燕保
 * @Date: 2021-01-20 21:06:06
**/

const net = require('net')
let users = {}
const server = net.createServer(function (socket) {
  const id = socket.remoteAddress + ':' + socket.remotePort;
  console.log('id is ', id)
  users[id] = {
    nickname: '匿名',
    socket
  }
  server.getConnections((err, count) => {
    console.log('获得链接')
    socket.write(`你好，当前在线用户${count}人\r\n`)
  })
  socket.setEncoding('utf-8')
  socket.on('data', function (data) {
    console.log('resouse data is ', data)
    data = data.replace(/\r\n/, '')
    let flag = data.slice(0, 1)
    console.log('flag is ', flag)
    switch (flag) {
      case 'b': {
        let text = data.slice(2)
        boardCast(text)
        break
      }
      case 'c': {
        let t = data.split(':')
        let text = t[2]
        let toUser = t[1]
        sentToUser(toUser, text)
        break
      }
      case 'l': {
        let s = '';
        for (let v_id in users) {
          s += (users[v_id].nickname + "   ")
        }
        s += "\r\n"
        socket.write(`当前用户表：${s}`)
        break;
      }
      case 'n': {
        let text = data.slice(2)
        users[id].nickname = text
        socket.write(`修改成功！\r\n`)
        break;
      }
    }
  })
  function sentToUser(toUser, text) {
    let toSocket = null
    for (let v_id in users) {
      if (users[v_id].nickname === toUser) {
        toSocket = users[v_id]
        break
      }
    }
    if (toSocket) {
      toSocket.socket.write(`${users[id].nickname}：${text}\r\n`)
    } else {
      socket.write('对不起，你输入的用户名不存在！\r\n')
    }
  }
  function boardCast(text) {
    for (let v_id in users) {
      if (v_id !== id) {
        users[v_id].socket.write(`${users[id].nickname}: ${text}\r\n`)
      }
    }
  }
})

server.listen(8080, function () {
  console.log('服务器已经启动！！！')
})
server.on('connection', socket => {
  console.log('有链接啦，ip is ', socket.remoteAddress + ':' + socket.remotePort)
})
server.on('close', function () {
  console.log('服务器已经关闭')
})
