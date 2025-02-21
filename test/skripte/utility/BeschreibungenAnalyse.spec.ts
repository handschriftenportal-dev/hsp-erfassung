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

import { uniq } from 'lodash'

import { BeschreibungenAnalyse } from '../../../skripte/utility/BeschreibungenAnalyse'

describe('BeschreibungenAnalyse', () => {
  it('has non-empty list of (unique) fields', () => {
    const fields = BeschreibungenAnalyse.fields()
    expect(fields).not.toHaveLength(0)
    expect(fields).toMatchObject(uniq(fields))
  })

  it('can show header which has a description for each field', () => {
    const fields = BeschreibungenAnalyse.fields()
    const header = BeschreibungenAnalyse.header()
    fields.forEach((field) => expect(header[field]).not.toBeUndefined())
  })

  describe('iterates over report', () => {
    const report = {
      codepoints: {
        [0x2022]: 1,
        [0xbeef]: 3,
        [0xfffd]: 2,
        [0x12ab]: 2,
        [0x1ceef]: 4,
      },
      parsing_errors: {},
      unknown_entities: {},
    }

    it('calls the callback #codepoints times', () => {
      const callback = jest.fn()
      BeschreibungenAnalyse.iterateCodepointRows(report, callback)
      expect(callback).toHaveBeenCalledTimes(
        Object.keys(report.codepoints).length
      )
    })

    it('anzahl is increasing sequence', () => {
      const callback = jest.fn()
      BeschreibungenAnalyse.iterateCodepointRows(report, callback)
      const calls = callback.mock.calls
      let vorhergehende_anzahl = 0
      calls.forEach(([{ anzahl }]) => {
        expect(anzahl >= vorhergehende_anzahl).toBeTruthy()
        vorhergehende_anzahl = anzahl
      })
    })

    it('calls match format', () => {
      const callback = jest.fn()
      BeschreibungenAnalyse.iterateCodepointRows(report, callback)
      const calls = callback.mock.calls
      calls.forEach(([row]) => {
        expect(row).toMatchObject({
          codepoint: expect.stringMatching(/^U\+[\dA-F]+$/),
          codepoint_dez: expect.stringMatching(/^\d+$/),
          anzahl: expect.stringMatching(/^\d+$/),
          im_editor: expect.stringMatching(/^(Ja|Nein)$/),
          zeichen: expect.stringMatching(/^..?$/), // Maximal two char codes
        })
      })
    })
  })
})
