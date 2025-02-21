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

import { XPath } from '../../../src/infrastructure/slate/XPath'

describe('XPath utilities', () => {
  const xPath =
    '/*:TEI[1]/*:text[1]/*:body[1]/*:msDesc[1]/*:head[1]/*:index[2]/*:term[2]'

  test('parsing multiple times yields same result', () => {
    /* Since parseXPath relies on a RegEx, which has inner state and is not
     * pure, we have to test that it successfully resets the RegEx after each
     * invocation */
    expect(XPath.parse(xPath)).toEqual(XPath.parse(xPath))
  })

  test('parsing splits into components', () => {
    expect(XPath.parse(xPath)).toEqual([
      ['TEI', 1],
      ['text', 1],
      ['body', 1],
      ['msDesc', 1],
      ['head', 1],
      ['index', 2],
      ['term', 2],
    ])
  })
})
