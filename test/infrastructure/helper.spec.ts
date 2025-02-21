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

import { splitIntoWords, toPairs } from '../../src/infrastructure/helper'

describe('Helper functions', () => {
  describe('split into words', () => {
    it('handles whitespace', () => {
      expect(splitIntoWords('  a\nb\t\t\n  c  ')).toEqual(['a', 'b', 'c'])
    })
    it('handles special characters', () => {
      expect(splitIntoWords("a'b c.d")).toEqual(["a'b", 'c.d'])
    })
  })

  describe('to pairs', () => {
    it.each([
      [[], []],
      [[1], []],
      [[1, 2], [[1, 2]]],
      [
        [1, 2, 3],
        [
          [1, 2],
          [2, 3],
        ],
      ],
      [
        [1, 2, 3, 4],
        [
          [1, 2],
          [2, 3],
          [3, 4],
        ],
      ],
    ])('%p becomes %p', (input, pairs) => {
      expect(toPairs(input)).toEqual(pairs)
    })
  })
})
