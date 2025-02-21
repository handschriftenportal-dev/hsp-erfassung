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

import { Element } from 'slate'

import { Komponente } from '../../../src/infrastructure/slate/Komponente'
import { findFirstElements } from '../../../src/infrastructure/slate/SlateBoundary'
import Loader from '../../LoadPublic'

function emptyElement(props: Record<string, string>) {
  return {
    data_origin: 'UNDEFINED',
    children: [{ text: '' }],
    ...props,
  }
}

describe('Komponente.type', () => {
  it("recognizes 'history' as Geschichte", () => {
    const history = emptyElement({ data_origin: 'history' })
    expect(Komponente.type(history)).toBe('geschichte')
  })
  it("recognizes 'additional' as Literatur", () => {
    const additional = emptyElement({ data_origin: 'additional' })
    expect(Komponente.type(additional)).toBe('literatur')
  })
  it("recognizes 'physDesc' as Äußeres", () => {
    const physDesc = emptyElement({ data_origin: 'physDesc' })
    expect(Komponente.type(physDesc)).toBe('aeusseres')
  })
  it("recognizes 'mspart.type=other' as Sonstiges", () => {
    const msPart = emptyElement({
      data_origin: 'msPart',
      data_type: 'other',
    })
    expect(Komponente.type(msPart)).toBe('sonstiges')
  })
  it("doesn't recognize 'mspart' without type", () => {
    const msPart = emptyElement({ data_origin: 'msPart' })
    expect(Komponente.type(msPart)).toBeFalsy()
  })
})

describe('Lorem Ipsum: msDesc has only Komponenten as direct children', () => {
  const loremIpsum = Loader.loremIpsumXML()
  const msDesc: Element = findFirstElements(loremIpsum[0], [
    'text',
    'body',
    'msDesc',
  ])!
  it('msDesc is in lorem ipsum', () => {
    expect(msDesc).not.toBeFalsy()
  })
  it.each(msDesc.children)('%o is Komponente', (child: any) => {
    expect(Komponente.type(child)).not.toBeFalsy()
  })
})
