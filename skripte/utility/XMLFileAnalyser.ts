import fs from 'node:fs'
import path from 'node:path'

import { XMLParser } from 'fast-xml-parser'

import { Analyser } from './Analyser'
import { AnalyserReport } from './AnalyserReport'

const parser = new XMLParser({
  ignoreAttributes: true,
  processEntities: false,
  htmlEntities: false,
  ignoreDeclaration: true,
})

export const XMLFileAnalyser = Object.freeze(function AnalyseFolder(
  folderPath: string
): AnalyserReport {
  const result = AnalyserReport.empty()
  const filenames = fs.readdirSync(folderPath)

  filenames.forEach((file) => {
    if (!file.endsWith('.xml')) {
      return
    }
    const filePath = path.resolve(folderPath, file)
    const fileContents = fs.readFileSync(filePath).toString()
    const tree = parser.parse(fileContents)
    Analyser.createAnalyser(tree, file, result)
  })

  return result
})
