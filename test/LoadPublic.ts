/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import * as fs from 'fs'
import * as path from 'path'
import { Node } from 'slate'

import { XMLPipeline } from '../src/infrastructure/slate/transformation/XMLPipeline'

const fromPublic = (fileName: string): string => {
  const file = path.join(__dirname, '../public', fileName)
  return fs.readFileSync(file, 'utf8')
}

const fromPublicToXML = (fileName: string): Node[] => {
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
