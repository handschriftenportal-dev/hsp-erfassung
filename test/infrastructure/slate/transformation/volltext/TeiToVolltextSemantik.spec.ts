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

import { teiToVolltextSemantik } from '../../../../../src/infrastructure/slate/transformation/volltext/TeiToVolltextSemantik'

describe('TeiToVolltextSemantik', () => {
  it('Unknown elements get recognized as box', () => {
    const element = {
      data_origin: 'unknown',
      children: [{ text: 'Text' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('box')
  })

  it('recognizes "persName" with ref as person', () => {
    const element = {
      data_origin: 'persName',
      data_ref: 'ref',
      data_role: 'some roles and author',
      children: [{ text: 'Person' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('person')
  })

  it('recognizes "persName" with role author as autor', () => {
    const element = {
      data_origin: 'persName',
      data_role: 'some roles and author',
      children: [{ text: 'Person' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('autor')
  })

  it('recognizes "orgName"', () => {
    const element = {
      data_origin: 'orgName',
      data_ref: 'ref',
      children: [{ text: 'Koerperschaft' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('koerperschaft')
  })

  it('recognizes "ref" with target as externer link', () => {
    const element = {
      data_origin: 'ref',
      data_target: 'uri',
      children: [{ text: 'Link' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('externerLink')
  })

  it('recognizes "quote" of type incipit as incipit', () => {
    const element = {
      data_origin: 'quote',
      data_type: 'incipit',
      children: [{ text: 'Zitat' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('incipit')
  })

  it('recognizes "quote" of type explicit as explicit', () => {
    const element = {
      data_origin: 'quote',
      data_type: 'explicit',
      children: [{ text: 'Zitat' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('explicit')
  })

  it('recognizes "quote" without type as zitat', () => {
    const element = {
      data_origin: 'quote',
      children: [{ text: 'Zitat' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('zitat')
  })

  it('recognizes "quote" with different type as zitat', () => {
    const element = {
      data_origin: 'quote',
      data_type: 'unknown',
      children: [{ text: 'Zitat' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('zitat')
  })
})
