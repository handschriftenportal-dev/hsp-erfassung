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

import { InlineTransformation } from '../../../../../src/infrastructure/slate/transformation/volltext/InlineTransformation'

describe('InlineTransformation', () => {
  const base = {
    children: [{ text: 'Base element' }],
  }

  it.each([
    [{ ...base, data_origin: 'tei' }, 'box'],
    [
      { ...base, data_origin: 'persName', data_ref: 'xxx', data_role: 'xxx' },
      'person',
    ],
    [{ ...base, data_origin: 'persName', data_role: 'author' }, 'autor'],
    [
      {
        ...base,
        data_origin: 'ref',
        data_target: 'http://handschriftenportal.de',
      },
      'externerLink',
    ],
    [{ ...base, data_origin: 'ref' }, 'box'],
  ])('Element %p is transformed to %s', (node, origin) => {
    const {
      data: { data_origin },
    } = InlineTransformation.transform({ data: node }) as any
    expect(data_origin).toBe(origin)
  })

  it('Texts are invariant under transformation and inversion', () => {
    const text = { data: { text: 'Fixpoint' } }
    expect(InlineTransformation.transform(text)).toEqual(text)
    expect(InlineTransformation.invert(text)).toEqual(text)
  })
})
