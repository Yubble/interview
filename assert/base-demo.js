const assert = require('assert')

const testarr1 = [1, 2, '3']
const testarr2 = [1, 2, 3]
const testarr3 = [1, 2, 4]
const testarr4 = [1, 2, 4]
const testint1 = 5

assert.ok([])

assert.strictEqual(1, 1)

assert.notStrictEqual(1, 3)

// assert.deepStrictEqual(testarr1, testarr2)

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
