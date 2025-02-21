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

import { flatMap } from 'lodash'

import * as de from '../../../src/infrastructure/i18n/translation_de.json'
import * as en from '../../../src/infrastructure/i18n/translation_en.json'

type TranslationMap = string | { [key: string]: TranslationMap }

function collectKeys(map: TranslationMap) {
  function prefixKeys(prefix: string, map: TranslationMap): string[] {
    return flatMap(Object.entries(map), ([key, value]) =>
      typeof value === 'string'
        ? [`${prefix}.${key}`]
        : prefixKeys(`${prefix}.${key}`, value)
    )
  }
  return prefixKeys('', map).sort()
}

describe('Translation keys are matching', () => {
  const deKeys = collectKeys(de)
  const enKeys = collectKeys(en)
  test('german and english keys are matching', () => {
    expect(deKeys).toEqual(enKeys)
  })
})
