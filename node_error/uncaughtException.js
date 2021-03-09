/**
 * @Name: 用于测试uncaughtException对node的错误捕获
 * @Description: 用于测试uncaughtException对node的错误捕获
 * @Author: 刘燕保
 * @Date: 2021-03-09 19:52:38
**/

process.on('uncaughtException', err => {
  console.log('--- 触发错误 err is ---', err)
})

window()

console.log('触发接下来动作')
