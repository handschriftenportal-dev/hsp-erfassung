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

import { SonderzeichenMap } from '../../../../src/domain/sonderzeichen/data/SonderzeichenMap'
import { isUnicodeKey } from '../../../regEx'

describe('SonderzeichenMap', () => {
  const entries = Object.entries(SonderzeichenMap)
  it('keys conforms to format U+{HEX}', () => {
    entries.forEach(([key, _value]) => {
      expect(key).toMatch(isUnicodeKey)
    })
  })

  it('keys describe value', () => {
    entries.forEach(([key, value]) => {
      const codepoint = Number.parseInt(key.slice(2), 16)
      expect(value.codepoint).toBe(codepoint)
      expect([...value.sign].map((char) => char.codePointAt(0))).toContain(
        codepoint
      )
    })
  })

  it('description texts are not empty', () => {
    entries.forEach(([_key, value]) => {
      expect(value.description).not.toBe('')
    })
  })

  it('description texts have no trailing whitespaces', () => {
    entries.forEach(([_key, value]) => {
      expect(value.description.trim()).toBe(value.description)
    })
  })
})
