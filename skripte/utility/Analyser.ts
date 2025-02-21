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

import { AnalyserReport } from './AnalyserReport'
import { Parser, ParserCallbackInput } from './parser/Parser'
import { XMLTextParser } from './parser/XMLTextParser'

const parserCallback =
  (report: AnalyserReport, identifier: string) =>
  (input: ParserCallbackInput): void => {
    const lookup = {
      found(input: ParserCallbackInput) {
        const codepoint: number = (input as any).codepoint
        AnalyserReport.addCodepoint(report, codepoint)
      },
      error(input: ParserCallbackInput) {
        AnalyserReport.addParsingError(report, input.content, identifier)
      },
      unknown_name(input: ParserCallbackInput) {
        AnalyserReport.addUnknownEntity(report, input.content, identifier)
      },
    }
    lookup[input.type](input as any)
  }

function analyseTree(
  tree: unknown,
  identifier: string,
  report: AnalyserReport
): void {
  function analyseNode(node: unknown): void {
    if (typeof node === 'string') {
      Parser.traverse(XMLTextParser(parserCallback(report, identifier)), node)
    } else if (node === null) {
      console.error(`received null node in ${identifier}`)
    } else if (typeof node === 'object') {
      Object.values(node).forEach(analyseNode)
    }
  }
  analyseNode(tree)
}

export const Analyser = Object.freeze({
  createAnalyser(
    tree: unknown,
    identifier: string,
    report: AnalyserReport
  ): AnalyserReport {
    analyseTree(tree, identifier, report)
    return report
  },
})
