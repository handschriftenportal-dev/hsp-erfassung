import fs from 'node:fs'
import path from 'node:path'

import { AnalyserReport } from './utility/AnalyserReport'
import { BeschreibungenAnalyse } from './utility/BeschreibungenAnalyse'
import { CSVStream } from './utility/CSVStream'
import { SkriptExport } from './utility/SkriptExport'
import { XMLFileAnalyser } from './utility/XMLFileAnalyser'

const RAW_FILE_NAME = 'raw-report.json'
const CSV_FILE_NAME = 'report.csv'

function printUsage() {
  console.log('USAGE: npm run analyse path/to/folder\n')
  console.log('       Parses all files with .xml suffix and creates')
  console.log('       two reports, one of the parsing results and one')
  console.log('       csv-file of all characters used in texts in the')
  console.log('       xml files, whitespaces excluded')
}

function printPreamble() {
  console.warn('> In this analyses we assume that there are no usage of')
  console.warn('> <!Entity and <!CDATA inside the xml files, as this')
  console.warn("> simplifies parsing and weren't used in descriptions")
  console.warn('> on August 30th 2024')
}

function raw_export(report: any, file: string): void {
  const stream = SkriptExport.writeStream(file)
  stream.write(JSON.stringify(report, null, 2))
  stream.end()
}

function csv_export(report: AnalyserReport, file: string): void {
  const stream = SkriptExport.writeStream(file, { writeBOM: true })
  const csv = CSVStream(stream, BeschreibungenAnalyse.fields())
  csv.addRow(BeschreibungenAnalyse.header())
  BeschreibungenAnalyse.iterateCodepointRows(report, csv.addRow)
  csv.end()
}

function run(): number {
  const folder = process.argv[2]
  if (folder === undefined) {
    printUsage()
    return 1
  }
  const folderPath = path.resolve(folder)
  if (!fs.existsSync(folderPath)) {
    console.error(`Folder ${folderPath} does not exist`)
    return 1
  }
  printPreamble()

  const report = XMLFileAnalyser(folderPath)
  if (!report) {
    console.error('Could not create report')
    return 1
  }

  raw_export(report, RAW_FILE_NAME)
  csv_export(report, CSV_FILE_NAME)
  return 0
}

run()
