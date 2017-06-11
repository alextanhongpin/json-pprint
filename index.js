#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const chalk = require('chalk')

const chalkError = chalk.bold.red
const chalkInfo = chalk.cyan
const chalkSuccess = chalk.bold.green

program
.arguments('<file>')
.option('-o, --output <output>', 'Optional. Save the pretty printed output as a json file.')
.action((file) => {
  fs.readFile(file, 'utf-8', (error, data) => {
    if (error) {
  		console.log(chalkError(error.message))
      	process.exit(1)
    }
    const output = JSON.stringify(JSON.parse(data), null, 2)
    console.log(chalkSuccess('pprint ' + file))
    console.log(output)

    if (program.output) {
    	fs.writeFile(program.output, output, 'utf-8', (error) => {
    		if (error) {
    			console.log(chalkError(error.message))
    			process.exit(1)
    		}
    		console.log('Write output to file', chalkInfo(program.output))
    		process.exit(0)
    	})
    } else {
    	process.exit(0)
    }
  })
}).parse(process.argv)

