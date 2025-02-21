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
