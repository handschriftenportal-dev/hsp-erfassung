import { CSVStream } from './utility/CSVStream'
import { SkriptExport } from './utility/SkriptExport'
import { SonderzeichenExport } from './utility/SonderzeichenExport'

const FILE_NAME = 'sonderzeichen.csv'

function sonderzeichen_export(file: string): void {
  const stream = SkriptExport.writeStream(file, { writeBOM: true })
  const csv = CSVStream(stream, SonderzeichenExport.fields())
  csv.addRow(SonderzeichenExport.header())
  SonderzeichenExport.iterateSonderzeichen(csv.addRow)
  csv.end()
}

sonderzeichen_export(FILE_NAME)
