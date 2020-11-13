const { exec } = require('child_process')

const execFile = require('child_process').execFile

execFile('node', ['--version'], (error, stdout, stderr) => {
    console.log('node error is ', error)
    console.log('stdout is ', stdout)
    console.log('stderr is ', stderr)
})
