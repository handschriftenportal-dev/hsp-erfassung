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

import { Beschreibung } from '../../../src/infrastructure/nachweis/Beschreibung'
import Loader from '../../LoadPublic'

describe('Create Beschreibung from Editor', () => {
  const description = Loader.loremIpsumXML()

  const beschreibung = Beschreibung.create(description)
  test('Signature can be extracted', () => {
    expect(beschreibung.signature).toBe('Cod. ms. Bord. 1')
  })
  test('Subtype can be extracted', () => {
    expect(beschreibung.subtype).toBe('medieval')
  })
  test('Type can be extracted', () => {
    expect(beschreibung.type).toBe('hsp:description')
  })

  it('msDesc can be extracted', () => {
    const msDesc = Beschreibung.getMsDesc(description)
    expect(msDesc).toBeDefined()
  })
  it('msDesc can be from lorem ipsum', () => {
    const xmlRepresentation = Loader.loremIpsumXML()
    const msDesc = Beschreibung.getMsDesc(xmlRepresentation)
    expect(msDesc).toBeDefined()
  })
})
