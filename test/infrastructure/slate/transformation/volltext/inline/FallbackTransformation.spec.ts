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

import { SerializationError } from '../../../../../../src/domain/erfassung/transformation/SerializationError'
import { FallbackTransformation } from '../../../../../../src/infrastructure/slate/transformation/volltext/inline/FallbackTransformation'

describe('BoxTransformation', () => {
  const { transform, invert } = FallbackTransformation
  const content = 'Content'
  const input = {
    data: {
      data_origin: 'tei',
      children: [{ text: content }],
    },
  }
  const box = transform(input)
  it('transforms element to box', () => {
    expect(box.data_origin).toBe('box')
  })
  it('inverts boxes proberly', () => {
    expect(invert(box)).toMatchObject(input)
  })

  it('inverts themenbereich element with error message', () => {
    expect(
      invert({
        data_origin: 'einband',
        auswahl: [],
        content: 'preserve me',
        children: [{ text: '' }],
      })
    ).toMatchObject({
      data: {
        data_origin: 'span',
        children: [{ text: 'preserve me' }],
      },
      serializationErrors: [
        {
          level: SerializationError.level.error,
          errorCode: SerializationError.errorCode.unknownVolltextElement,
        },
      ],
    })
  })

  it('prefers children text over content attribute', () => {
    expect(
      invert({
        data_origin: 'nothing',
        auswahl: [],
        content: 'ignore me',
        children: [{ text: 'preserve me' }],
      })
    ).toMatchObject({
      data: {
        data_origin: 'span',
        children: [{ text: 'preserve me' }],
      },
    })
  })
})
