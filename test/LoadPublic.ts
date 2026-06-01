import * as fs from 'fs'
import * as path from 'path'
import type { Descendant } from 'slate'
import { XMLPipeline } from 'src/infrastructure/slate/transformation/XMLPipeline'

const fromPublic = (fileName: string): string => {
  const file = path.join(__dirname, '../public', fileName)
  return fs.readFileSync(file, 'utf8')
}

const fromPublicToXML = (fileName: string): Descendant[] => {
  return XMLPipeline.deserialize({ data: fromPublic(fileName) }).data
}

const loremIpsumFileName = 'loremIpsum_beschreibung.xml'
const loremIpsum = () => fromPublic(loremIpsumFileName)
const loremIpsumXML = () => fromPublicToXML(loremIpsumFileName)

export default Object.freeze({
  fromPublic,
  fromPublicToXML,
  loremIpsum,
  loremIpsumXML,
})
