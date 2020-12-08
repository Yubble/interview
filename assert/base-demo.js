/**
 * @Name: 
 * @Description: 
 * @Author: 刘燕保
 * @Date: 2020-11-13 19:06:28
**/
const assert = require('assert')

const testarr1 = [1, 2, '3']
const testarr2 = [1, 2, 3]
const testarr3 = [1, 2, 4]
const testarr4 = [1, 2, 4]
const testint1 = 5

// 判断是否为真
assert.ok([])

// 判断前后值是否相等
assert.strictEqual(1, 1)

// 判断是否不等
assert.notStrictEqual(1, 3)

// 判断是否深度相等
assert.deepStrictEqual(testarr1, testarr2)

// 判断是否深度不相等
assert.notDeepStrictEqual(testarr1, testarr3)

assert.throws(err => {
    throw new Error('throw error intentionally')
}, () => {
    return 1 === 3
})

assert.doesNotThrow(function(err) {
    console.log('不抛异常 err is ', err)
})

// assert.ifError(testarr3 !== testarr4)
