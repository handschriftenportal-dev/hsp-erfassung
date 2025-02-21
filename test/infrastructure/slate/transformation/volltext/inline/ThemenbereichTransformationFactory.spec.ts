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

import { ThemenbereichTransformationFactory } from '../../../../../../src/infrastructure/slate/transformation/volltext/inline/ThemenbereichTransformationFactory'

describe('ThemenbereichTransformationFactory', () => {
  const { transform, invert } = ThemenbereichTransformationFactory('einband')
  const element = {
    data_origin: 'ref',
    data_type: 'subjectArea',
    children: [
      { text: 'content' },
      {
        data_origin: 'index',
        data_indexName: 'BNDG',
        children: [
          {
            data_origin: 'term',
            data_ref: 'uri_1',
            data_key: 'key_1',
            children: [{ text: '' }],
          },
          {
            data_origin: 'term',
            data_ref: 'uri_2',
            data_key: 'key_2',
            children: [{ text: '' }],
          },
        ],
      },
    ],
  }
  const input = { data: element }

  it('transforms to VolltextThemenbereich', () => {
    expect(transform(input)).toMatchObject({
      data_origin: 'einband',
      auswahl: [
        { id: 'key_1', uri: 'uri_1' },
        { id: 'key_2', uri: 'uri_2' },
      ],
      content: 'content',
      children: [{ text: '' }],
    })
  })

  it('invert is invariant', () => {
    expect(invert(transform(input))).toMatchObject(input)
  })
})
