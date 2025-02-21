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

import { VolltextSemantik } from '../../../../src/domain/erfassung/VolltextSemantik'
import { VolltextElement } from '../../../../src/infrastructure/slate/volltext/VolltextElement'

describe('VolltextElement', () => {
  const baseElement = {
    children: [{ text: '' }],
  }
  const { boxen, bloecke, formatierungen, referenzen } = VolltextSemantik
  const tei = ['note', 'decoNote', 'index', 'term', 'msDesc', 'TEI', 'p', 'lb']

  describe('Typ', () => {
    it.each([
      [tei, undefined],
      [boxen, 'box'],
      [bloecke, 'block'],
      [formatierungen, 'formatierung'],
      [referenzen, 'referenz'],
    ])('von Elementen mit Origin %p ist %s', (origins, typ) => {
      origins.forEach((data_origin) => {
        expect(VolltextElement.typ({ ...baseElement, data_origin })).toBe(typ)
      })
    })
  })

  describe('Type Guards', () => {
    const {
      isVolltextBlock,
      isVolltextBox,
      isVolltextFormatierung,
      isVolltextReferenz,
    } = VolltextElement
    it.each([
      [
        'sind nicht für TEI Elemente erfüllt',
        tei,
        {
          isBox: false,
          isBlock: false,
          isReferenz: false,
          isFormatierung: false,
        },
      ],
      [
        'für Box Elemente erfüllen nur isVolltextBox',
        boxen,
        {
          isBox: true,
          isBlock: false,
          isReferenz: false,
          isFormatierung: false,
        },
      ],
      [
        'für Block Elemente erfüllen nur isVolltextBlock',
        bloecke,
        {
          isBox: false,
          isBlock: true,
          isReferenz: false,
          isFormatierung: false,
        },
      ],
      [
        'für Formatierung Elemente erfüllen nur isVolltextFormatierung',
        formatierungen,
        {
          isBox: false,
          isBlock: false,
          isReferenz: false,
          isFormatierung: true,
        },
      ],
      [
        'für Referenz Elemente erfüllen nur isVolltextReferenz',
        referenzen,
        {
          isBox: false,
          isBlock: false,
          isReferenz: true,
          isFormatierung: false,
        },
      ],
    ])('%s', (_, origins, expected) => {
      origins.forEach((data_origin: string) => {
        const element = { ...baseElement, data_origin }
        expect({
          isBox: isVolltextBox(element),
          isBlock: isVolltextBlock(element),
          isReferenz: isVolltextReferenz(element),
          isFormatierung: isVolltextFormatierung(element),
        }).toEqual(expected)
      })
    })
  })
})
