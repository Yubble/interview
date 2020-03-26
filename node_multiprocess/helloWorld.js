const childProcess = require("child_process")
const os = require("os")
const cpus = os.cpus()
console.log('os is ', os)

for (let i = 0; i < cpus.length; ++i) {
  childProcess.fork('./worker.js')
}

console.log('Master - hello world')
