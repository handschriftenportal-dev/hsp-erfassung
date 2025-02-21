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

import { KomponentenTransformation } from '../../../../src/infrastructure/slate/transformation/KomponentenTransformation'

describe('Komponenten Transformation', () => {
  const { transform, invert } = KomponentenTransformation
  it('transforms Geschichte', () => {
    const input = {
      data: [
        {
          data_origin: 'history',
          children: [
            {
              data_origin: 'p',
              children: [{ text: 'hello world' }],
            },
          ],
        },
      ],
    }
    const output: any = transform(input)
    const {
      data: [
        {
          children: [p],
        },
      ],
    } = output
    const {
      children: [volltext],
    } = p
    expect(p).toMatchObject({ data_origin: 'p' })
    expect(volltext).toMatchObject({ data_origin: 'volltext' })
    expect(invert(output)).toMatchObject(input)
  })

  it('transforms Literatur', () => {
    const input = {
      data: [
        {
          data_origin: 'additional',
          children: [
            {
              data_origin: 'listBibl',
              children: [
                {
                  data_origin: 'bibl',
                  children: [{ text: 'hello world' }],
                },
              ],
            },
          ],
        },
      ],
    }
    const output: any = transform(input)
    const {
      data: [
        {
          children: [listBibl],
        },
      ],
    } = output
    const {
      children: [bibl],
    } = listBibl
    const {
      children: [volltext],
    } = bibl
    expect(listBibl).toMatchObject({ data_origin: 'listBibl' })
    expect(bibl).toMatchObject({ data_origin: 'bibl' })
    expect(volltext).toMatchObject({ data_origin: 'volltext' })
    expect(invert(output)).toMatchObject(input)
  })
})
