/**
 * @Name: 调用java方法
 * @Description: 测试java-caller使用
 * @Author: 刘燕保
 * @Date: 2020-11-01 10:52:43
**/
const { JavaCaller } = require('java-caller')

const java = new JavaCaller({
  jar: './jars/test1.jar'
})

// java.run().then()

// const { status, stdout, stderr } = await java.run()

// console.log('status is ', status)
// console.log('stdout is ', stdout)
// console.log('stderr is ', stderr)

const javaRes = java.run()
// console.log('javaRes is ', javaRes)
javaRes.then(({status, stdout, stderr}) => {
  console.log('status is ', status)
  console.log('stdout is ', stdout)
  console.log('stderr is ', stderr)
})
