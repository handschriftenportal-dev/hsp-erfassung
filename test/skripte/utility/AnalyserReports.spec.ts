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

import { AnalyserReport } from '../../../skripte/utility/AnalyserReport'

describe('AnalyserReport', () => {
  it('can create empty report', () => {
    expect(AnalyserReport.empty()).toMatchObject({
      codepoints: {},
      unknown_entities: {},
      parsing_errors: {},
    })
  })

  it('can add codepoint by mutating report', () => {
    const report = AnalyserReport.empty()
    AnalyserReport.addCodepoint(report, 1)
    AnalyserReport.addCodepoint(report, 2)
    AnalyserReport.addCodepoint(report, 1)
    expect(report).toMatchObject({
      codepoints: {
        1: 2,
        2: 1,
      },
    })
  })

  it('can add unknown entities by mutating report', () => {
    const report = AnalyserReport.empty()
    AnalyserReport.addUnknownEntity(report, 'x', 'a')
    AnalyserReport.addUnknownEntity(report, 'y', 'a')
    AnalyserReport.addUnknownEntity(report, 'x', 'a')
    AnalyserReport.addUnknownEntity(report, 'x', 'b')
    expect(report).toMatchObject({
      unknown_entities: {
        x: {
          a: 2,
          b: 1,
        },
        y: {
          a: 1,
        },
      },
    })
  })

  it('can add errors by mutating report', () => {
    const report = AnalyserReport.empty()
    AnalyserReport.addParsingError(report, 'x', 'a')
    AnalyserReport.addParsingError(report, 'y', 'a')
    AnalyserReport.addParsingError(report, 'x', 'a')
    AnalyserReport.addParsingError(report, 'x', 'b')
    expect(report).toMatchObject({
      parsing_errors: {
        x: {
          a: 2,
          b: 1,
        },
        y: {
          a: 1,
        },
      },
    })
  })
})
