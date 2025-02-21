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

import { VorschauUtility } from '../../../../../src/domain/toolbar/xmlVorschau/nodes/VorschauUtility'

describe('Vorschau', () => {
  describe('indent', () => {
    it.each([
      [0, ''],
      [1, '  '],
      [3, '      '],
    ])('level %d produces "%s"', (level, expected) => {
      expect(VorschauUtility.indent(level)).toBe(expected)
    })
  })

  describe('format', () => {
    const veryLong = '_'.repeat(90)
    const long = '_'.repeat(50)
    const filler = VorschauUtility.indent(20)
    it.each([
      [' hallo    welt    ', 'hallo welt'],
      [
        ` hallo ${filler}\nwelt ${filler}${filler}goodbye\t\n${filler}\t mars. `,
        'hallo welt goodbye mars.',
      ],
      [veryLong, veryLong],
      [long + ' ' + long, long + '\n' + long],
      [veryLong + ' ' + long, veryLong + '\n' + long],
    ])('of level 0 makes "%s" to "%s"', (input, expected) => {
      expect(VorschauUtility.formatText(0, input)).toBe(expected)
    })

    it.each([
      [0, [20, 20, 20, 17], 1],
      [0, [20, 20, 20, 18], 2],
      [30, [10, 10, 10], 1],
      [30, [20, 19, 20], 2],
      [30, [50, 20, 20], 3],
    ])(
      'level %d with words of length %p has %d lines',
      (level, words, lines) => {
        const result = VorschauUtility.formatText(
          level,
          words.map((length) => 'a'.repeat(length)).join(' ')
        )
        expect(result.split('\n')).toHaveLength(lines)
      }
    )
  })
})
