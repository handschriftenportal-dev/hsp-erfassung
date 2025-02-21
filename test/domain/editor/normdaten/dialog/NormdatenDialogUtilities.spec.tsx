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
  DNB_INFO_GND_URL,
  elementToNormdatenTEIElement,
  getGndIdFromUrl,
  getUrlForGndId,
} from '../../../../../src/domain/editor/normdaten/dialog/NormdatenDialogUtilities'
import { VolltextReferenz } from '../../../../../src/infrastructure/slate/volltext/VolltextElement'

describe('Extracting a gnd identifier from a gnd url', () => {
  it('works expected at the happy path', () => {
    const identifier = '12345678'
    const url = DNB_INFO_GND_URL + identifier
    expect(getGndIdFromUrl(url)).toBe(identifier)
  })

  it('trims the result', () => {
    const identifier = '12345678'
    const url = `   ${DNB_INFO_GND_URL}      ${identifier}   `
    expect(getGndIdFromUrl(url)).toBe(identifier)
  })

  it('extracts from different urls', () => {
    const identifier = '12345678'
    const baseUrl = 'https://some/other/url/'
    const url = baseUrl + identifier
    expect(getGndIdFromUrl(url)).toBe(identifier)
  })
})

describe('Converting gnd identifier to url', () => {
  test.each([['123'], [''], ['inv/\\lid'], [' whitespaces allowed  ']])(
    'converting identifier %s to a gnd-url',
    (identifier) => {
      const url = getUrlForGndId(identifier)
      expect(url.startsWith(DNB_INFO_GND_URL)).toBeTruthy()
      expect(url.endsWith(identifier)).toBeTruthy()
    }
  )
})

describe('Extracting NormdatenTEIElement from Element', () => {
  const text = { text: 'hello world' }
  const wrapper: VolltextReferenz = {
    data_origin: 'ort',
    box: {
      data_origin: 'placeName',
      children: [text],
      data_ref: 'http://some/ref',
      data_role: 'role',
      data_key: 'key',
    } as any,
    content: text.text,
    children: [{ text: '' }],
  }

  it('contains trimed data_role', () => {
    const result = elementToNormdatenTEIElement(wrapper)
    expect(result.role).toBe('role')
  })
  it('contains extracted gnd identifier', () => {
    const result = elementToNormdatenTEIElement(wrapper)
    expect(result.gndIdentifierOption).toBe('ref')
  })
  it('contains text with reduced whitespaces', () => {
    const result = elementToNormdatenTEIElement(wrapper)
    expect(result.normdatenText).toBe('hello world')
  })
  it('contains data_origin', () => {
    const result = elementToNormdatenTEIElement(wrapper)
    expect(result.dataOrigin).toBe(wrapper.data_origin)
  })
  it('contains key', () => {
    const result = elementToNormdatenTEIElement(wrapper)
    expect(result.identifier).toBe('key')
  })
})
