import { stdin as input, stdout as output } from 'node:process'
import * as readline from 'node:readline'

import { Markdown } from 'skripte/utility/Markdown'

function printUsage() {
  console.log('USAGE: npm run md2json')
  console.log('       Input markdown to transform')
  console.log('       Start transformation using Ctrl-D (EOT-Event)')
  console.log('USAGE: npm run mdjson < inputfile.md')
  console.log('USAGE: npm run mdjson < inputfile.md > outputfile.txt')
}

function run(): number {
  if (process.argv.length > 2) {
    printUsage()
    return 0
  }

  const rl = readline.createInterface({ input, output })
  let markdown = ''
  rl.on('line', (line) => {
    markdown = markdown + line + '\n'
  })
  rl.on('close', () => {
    try {
      output.write(Markdown.toJson(markdown))
    } catch (e) {
      console.error('Could not convert to markdown', e)
    }
  })
  return 0
}

run()
