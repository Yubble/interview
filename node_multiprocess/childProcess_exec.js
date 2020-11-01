const { stdout, stderr } = require('process')

const exec = require('child_process').exec

exec('ls -al', (err, stdout, stderr) => {
    console.log('ls -all, err is ', err)
    console.log('stdout is ', stdout)
    console.log('stderr is ', stderr)
})

exec('ls hello.txt', (err, stdout, stderr) => {
    console.log('ls hello.txt, err is ', err)
    console.log('stdout is ', stdout)
    console.log('stderr is ', stderr)
})
