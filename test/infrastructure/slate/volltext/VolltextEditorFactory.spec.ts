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

import { createVolltextEditor } from '../../../../src/infrastructure/slate/volltext/VolltextEditorFactory'

describe('Volltext Editor', () => {
  const baseElement = {
    children: [{ text: '' }],
  }
  const box = { ...baseElement, data_origin: 'box' }
  const block = { ...baseElement, data_origin: 'paragraph' }
  const formatierung = { ...baseElement, data_origin: 'autor' }
  const referenz = { ...baseElement, data_origin: 'person' }
  const sonstiges = { ...baseElement, data_origin: 'xxxx' }
  const editor = createVolltextEditor()

  it('can be created', () => {
    expect(editor).toBeTruthy()
  })

  describe('isInline', () => {
    it.each([box, formatierung, referenz])(
      '%p is an inline element',
      (element) => {
        expect(editor.isInline(element)).toBe(true)
      }
    )
    it.each([block, sonstiges])('%p is not an inline element', (element) => {
      expect(editor.isInline(element)).toBe(false)
    })
  })

  describe('isVoid', () => {
    it.each([box, referenz])('%p is a void element', (element) => {
      expect(editor.isVoid(element)).toBe(true)
    })
    it.each([block, formatierung, sonstiges])(
      '%p is not a void element',
      (element) => {
        expect(editor.isVoid(element)).toBe(false)
      }
    )
  })

  describe('markableVoid', () => {
    it.each([box, referenz])('%p is markable void', (element) => {
      expect(editor.markableVoid(element)).toBe(true)
    })
    it.each([block, formatierung, sonstiges])(
      '%p is markable void',
      (element) => {
        expect(editor.markableVoid(element)).toBe(false)
      }
    )
  })
})
