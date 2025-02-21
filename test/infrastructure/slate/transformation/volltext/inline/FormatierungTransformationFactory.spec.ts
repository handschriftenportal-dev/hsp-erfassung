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

import { VolltextSemantik } from '../../../../../../src/domain/erfassung/VolltextSemantik'
import { FormatierungTransformationFactory } from '../../../../../../src/infrastructure/slate/transformation/volltext/inline/FormatierungTransformationFactory'

describe('FormatierungTransformationFactory', () => {
  const { formatierungen } = VolltextSemantik
  const subReferenz = {
    data_origin: 'persName',
    data_role: 'author',
    data_ref: 'http://some-normdatum',
    children: [{ text: 'wrap to Person' }],
  }
  const subFormatierung = {
    data_origin: 'persName',
    data_role: 'author',
    children: [{ text: 'wrap to Box' }],
  }
  const input = {
    data: {
      data_origin: '123',
      other_attribute: 5,
      children: [
        { text: 'Content' },
        subFormatierung,
        { text: '' },
        subReferenz,
        { text: '' },
      ],
    },
  }
  describe.each(formatierungen)('%s transformation', (formatierung) => {
    const { transform, invert } =
      FormatierungTransformationFactory(formatierung)
    const transformedElement = transform(input)

    it(`transformed element has data_origin ${formatierung}`, () => {
      expect(transformedElement.data_origin).toEqual(formatierung)
    })
    it(`transformed element is not void element`, () => {
      expect(transformedElement.children).not.toEqual([{ text: '' }])
    })
    it('satisfies invariance', () => {
      expect(invert(transformedElement)).toMatchObject(input)
    })
    it('subElement becomes box', () => {
      const boxElement = transformedElement.children[1]
      expect(boxElement).toMatchObject({
        data_origin: 'box',
        content: 'wrap to Box',
        children: [{ text: '' }],
      })
    })
    it('subReferenz becomes Referenz', () => {
      const boxElement = transformedElement.children[3]
      expect(boxElement).toMatchObject({
        data_origin: 'person',
        content: 'wrap to Person',
        children: [{ text: '' }],
      })
    })
  })
})
