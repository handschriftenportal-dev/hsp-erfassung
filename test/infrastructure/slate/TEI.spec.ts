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

import {
  interpose,
  TEIElement,
  TEIText,
} from '../../../src/infrastructure/slate/TEI'

describe('TEI', () => {
  describe('Text', () => {
    test.each([
      ['a      b', 'a b'],
      ['     a      b', ' a b'],
      ['a   \t\n  b\t', 'a b '],
      ['\t\n   a      b\n ', ' a b '],
    ])('"%j" becomes { text: "%s" }', (input, output) => {
      expect(TEIText.normalizedText(input)).toEqual({ text: output })
    })

    test('empty text', () => {
      expect(TEIText.emptyText()).toEqual({ text: '' })
    })

    test.each([
      [TEIText.emptyText(), true],
      [TEIText.normalizedText('x'), false],
      [TEIText.normalizedText(' '), false],
      [TEIElement.lbElement(), false],
    ])('is %o empty text == %p', (input, expected) => {
      expect(TEIText.isEmptyText(input)).toBe(expected)
    })

    describe('from plain text', () => {
      const a = { text: 'a' }
      const b = { text: ' b ' }
      const empty = TEIText.emptyText()
      const lb = TEIElement.lbElement()
      test.each([
        ['', [empty]],
        ['a', [a]],
        ['\t\tb  \t', [b]],
        ['a\n\tb\t', [a, lb, b]],
        ['a\n\na', [a, lb, empty, lb, a]],
      ])('"%j" yields %o', (input, output) => {
        expect(TEIText.fromPlainText(input)).toEqual(output)
      })
    })
  })

  describe('Element', () => {
    describe('lb', () => {
      test.each([
        [{ data_origin: 'lb', children: [{ text: '' }] }, true],
        [{ data_origin: 'lb', children: [{ text: 'invalid' }] }, false],
        [{ data_origin: 'invalid', children: [{ text: '' }] }, false],
        [{ text: 'invalid' }, false],
      ])('%o is lb element == %p', (input, expected) => {
        expect(TEIElement.isLbElement(input)).toBe(expected)
      })
      test('can be created', () => {
        expect(TEIElement.lbElement()).toEqual({
          data_origin: 'lb',
          children: [{ text: '' }],
        })
      })
    })

    describe('void elements', () => {
      test('lb is void', () => {
        expect(TEIElement.isVoidElement(TEIElement.lbElement())).toBe(true)
      })
      test('text is not void', () => {
        expect(TEIElement.isVoidElement(TEIText.emptyText())).toBe(false)
      })
    })

    describe('inline elements', () => {
      test('lb is inline', () => {
        expect(TEIElement.isInlineElement(TEIElement.lbElement())).toBe(true)
      })
    })

    describe('empty element', () => {
      test('lb is empty', () => {
        expect(TEIElement.isEmptyElement(TEIElement.lbElement())).toBe(true)
      })
    })

    describe('term elements', () => {
      const children = [TEIText.emptyText()]
      const term = {
        data_origin: 'term',
        id: 'abc',
        data_type: 'something',
        children,
      }
      test.each([
        [term, true],
        [{ ...term, data_type: 1 }, false],
        [{ ...term, id: 1 }, false],
        [{ data_origin: 'term', children }, false],
      ])('%o is term element == %p', (input, expected) => {
        expect(TEIElement.isTermElement(input)).toBe(expected)
      })

      test.each([
        [{ ...term, data_type: 'textLang-ID' }, true],
        [term, false],
      ])('language term element', (input, expected) => {
        expect(TEIElement.isLanguageTermElement(input)).toBe(expected)
      })

      test.each([
        [{ ...term, data_type: 'origPlace_norm' }, true],
        [term, false],
      ])('language term element', (input, expected) => {
        expect(TEIElement.isOrigPlaceNormElement(input)).toBe(expected)
      })
    })

    describe('normdatum elements', () => {
      const children = [{ text: 'content' }]
      const missingRef = {
        data_origin: 'persName',
        children,
      }
      const invalidDataOrigin = {
        data_origin: 'invalidKey',
        data_ref: '123',
        children,
      }
      const person = {
        data_origin: 'persName',
        data_ref: '123',
        children,
      }
      const organisation = {
        data_origin: 'orgName',
        data_ref: '123',
        children,
      }
      const place = {
        data_origin: 'placeName',
        data_ref: '123',
        children,
      }

      it.each([
        ['has no ref attribute', missingRef],
        ['has invalid tag', invalidDataOrigin],
      ])('recognizes element as not a normdatum, since it %s', (_, element) => {
        expect(TEIElement.isNormdatumElement(element)).toBe(false)
      })

      it.each([
        ['person', person],
        ['organisation', organisation],
        ['place', place],
      ])('recognizes %s element as a normdatum', (_, element) => {
        expect(TEIElement.isNormdatumElement(element)).toBe(true)
      })
    })
  })
})

describe('Utility functions', () => {
  describe('interpose', () => {
    test('does not change empty array', () => {
      expect(
        interpose([], () => {
          throw new Error('never called')
        })
      ).toEqual([])
    })
    test('does not change one element array', () => {
      expect(
        interpose([1], () => {
          throw new Error('never called')
        })
      ).toEqual([1])
    })
    test('interposes number array', () => {
      expect(interpose([0, 1, 2, 3], () => 4)).toEqual([0, 4, 1, 4, 2, 4, 3])
    })
    test('interpose with changing generator', () => {
      const generator = (start: number) => () => start++
      expect(interpose([0, 1, 2, 3, 4], generator(100))).toEqual([
        0, 100, 1, 101, 2, 102, 3, 103, 4,
      ])
    })
  })
})
