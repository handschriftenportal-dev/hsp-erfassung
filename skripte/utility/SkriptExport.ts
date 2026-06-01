import fs from 'node:fs'
import path from 'node:path'

const RESULT_FOLDER = 'skript-results'
const bom = '\ufeff'

type ExportWriteStreamOptions = Partial<{
  encoding: BufferEncoding
  writeBOM: boolean
}>

export const SkriptExport = Object.freeze({
  writeStream(
    filename: string,
    options?: ExportWriteStreamOptions
  ): fs.WriteStream {
    const encoding = options?.encoding ?? 'utf-8'
    const writeBOM = options?.writeBOM ?? false
    const folderPath = path.resolve(RESULT_FOLDER)
    const filePath = path.resolve(folderPath, filename)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
    const result = fs.createWriteStream(filePath, {
      flags: 'w',
      encoding,
    })
    if (writeBOM) {
      result.write(bom)
    }
    return result
  },
})
