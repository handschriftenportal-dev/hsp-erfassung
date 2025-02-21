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

import { render, screen } from '@testing-library/react'
import { Element } from 'slate'

import { SemantischeZitate } from '../../../../src/domain/editor/semantischeAuszeichnungen/SemantischeZitate'

describe('Quote', () => {
  const other: Element = { data_origin: 'quote', children: [{ text: 'Zitat' }] }
  const incipit = { ...other, data_type: 'incipit' } as Element
  const explizit = { ...other, data_type: 'explizit' } as Element
  const attributes: any = []

  describe.each([
    ['Incipit', incipit],
    ['Explizit', explizit],
    ['Anderes Zitat', other],
  ])('of type %s', (_title, element) => {
    it("has semantic html, i.e. get's rendered as <q>", () => {
      render(
        <SemantischeZitate element={element} attributes={attributes}>
          Zitat
        </SemantischeZitate>
      )
      expect(screen.getByText('Zitat').tagName).toBe('Q')
    })

    it('is rendered italic without quotation marks', () => {
      render(
        <SemantischeZitate element={element} attributes={attributes}>
          Zitat
        </SemantischeZitate>
      )
      expect(screen.getByText('Zitat')).toHaveStyle(
        'font-style: italic; quotes: none'
      )
    })
  })
})
