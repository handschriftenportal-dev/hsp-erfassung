import { AnalyserReport } from './AnalyserReport'
import type { ParserCallbackInput, ParserFound } from './parser/Parser'
import { Parser } from './parser/Parser'
import { XMLTextParser } from './parser/XMLTextParser'

const parserCallback =
  (report: AnalyserReport, identifier: string) =>
  (input: ParserCallbackInput): void => {
    const lookup = {
      found(input: ParserCallbackInput) {
        const codepoint: number = (input as ParserFound).codepoint
        AnalyserReport.addCodepoint(report, codepoint)
      },
      error(input: ParserCallbackInput) {
        AnalyserReport.addParsingError(report, input.content, identifier)
      },
      unknown_name(input: ParserCallbackInput) {
        AnalyserReport.addUnknownEntity(report, input.content, identifier)
      },
    }
    lookup[input.type](input)
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
