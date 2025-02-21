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

export type AnalyserReport = {
  codepoints: Record<string, number>
  unknown_entities: Record<string, Record<string, number>>
  parsing_errors: Record<string, Record<string, number>>
}

export const AnalyserReport = {
  empty(): AnalyserReport {
    return {
      codepoints: {},
      unknown_entities: {},
      parsing_errors: {},
    }
  },
  addCodepoint(report: AnalyserReport, codepoint: number): void {
    if (codepoint in report.codepoints) {
      report.codepoints[codepoint] += 1
    } else {
      report.codepoints[codepoint] = 1
    }
  },
  addUnknownEntity(report: AnalyserReport, entity: string, identifier: string) {
    if (entity in report.unknown_entities) {
      if (identifier in report.unknown_entities[entity]) {
        report.unknown_entities[entity][identifier] += 1
      } else {
        report.unknown_entities[entity][identifier] = 1
      }
    } else {
      report.unknown_entities[entity] = { [identifier]: 1 }
    }
  },
  addParsingError(report: AnalyserReport, error: string, identifier: string) {
    if (error in report.parsing_errors) {
      if (identifier in report.parsing_errors[error]) {
        report.parsing_errors[error][identifier] += 1
      } else {
        report.parsing_errors[error][identifier] = 1
      }
    } else {
      report.parsing_errors[error] = { [identifier]: 1 }
    }
  },
}
