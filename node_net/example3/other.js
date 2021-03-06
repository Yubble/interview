// const net = require('net')
const readline = require('readline')

let rl = readline.createInterface(process.stdin, process.stdout)

rl.setPrompt('请输入聊天内容 >> ')
rl.prompt()

rl.on('line', mes => {
    console.log('mes is ', mes)
    rl.prompt()
})
