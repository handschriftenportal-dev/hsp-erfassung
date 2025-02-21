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

import { TranslatedText } from '../../../src/domain/erfassung/TranslatedText'

describe('TranslatedText', () => {
  it('yields empty string if no translation available', () => {
    expect(TranslatedText.forLanguage([], 'de')).toBe('')
  })

  const example = [
    { isoCode: 'de', text: 'deutsch' },
    { isoCode: 'en', text: 'english' },
  ]
  it.each([
    ['de', 'deutsch'],
    ['en', 'english'],
  ])('finds language "%s" in example', (isoCode, text) => {
    expect(TranslatedText.forLanguage(example, isoCode)).toBe(text)
  })

  it('falls back to first item if language not available', () => {
    expect(TranslatedText.forLanguage(example, 'jp')).toBe('deutsch')
  })
})
