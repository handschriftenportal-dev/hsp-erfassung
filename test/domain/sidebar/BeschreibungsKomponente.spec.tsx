/*
 * MIT License
 *
 * Copyright (c) 2022 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 */

import BeschreibungsKomponenteFactory from '../../../src/domain/sidebar/BeschreibungsKomponenteFactory'

test('BeschreibungsKomponente Test Creation', () => {

  const beschreibungskomponente = BeschreibungsKomponenteFactory('1', 'teiHeader', [0, 0, 0], false, 'TEI-text', 0, 'msDesc', 'wrapper')

  expect(beschreibungskomponente.id).toEqual('1')
  expect(beschreibungskomponente.teiElement).toEqual('teiHeader')
  expect(beschreibungskomponente.label).toEqual('teiHeader')
  expect(beschreibungskomponente.path).toEqual([0, 0, 0])
  expect(beschreibungskomponente.copied).toEqual(false)
  expect(beschreibungskomponente.xmlpath).toEqual('TEI-text')
  expect(beschreibungskomponente.level).toEqual(0)
  expect(beschreibungskomponente.parent).toEqual('msDesc')
  expect(beschreibungskomponente.wrapperID).toEqual('wrapper')
})
