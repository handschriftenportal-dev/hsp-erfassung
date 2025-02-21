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
  compose,
  InvertibleTransformation,
} from '../../../../src/domain/erfassung/transformation/InvertibleTransformation'

describe('Transformation', () => {
  it('composing isomorphism yields isomorphism', () => {
    const f: InvertibleTransformation<number, number> = {
      transform(x) {
        return x * 2
      },
      invert(x) {
        return x / 2
      },
    }
    const g: InvertibleTransformation<number, number> = {
      transform(x) {
        return x + 1
      },
      invert(x) {
        return x - 1
      },
    }
    const h = compose(f, g)
    const i = compose(g, f)
    const tests: number[] = [-10, 2, 0, 4, 42, 100]
    tests.forEach((x) => {
      expect(h.invert(h.transform(x))).toBe(x)
      expect(i.invert(i.transform(x))).toBe(x)
    })
  })

  it('on different domains compose to codomain', () => {
    const f: InvertibleTransformation<boolean, string> = {
      transform(b) {
        return b.toString()
      },
      invert(s) {
        return Boolean(s)
      },
    }
    const g: InvertibleTransformation<string, number> = {
      transform(s) {
        return s.length
      },
      invert(n) {
        return 'x'.repeat(n)
      },
    }
    const h = compose(f, g)
    expect(typeof h.transform(true)).toBe('number')
    expect(typeof h.transform(false)).toBe('number')
    expect(typeof h.invert(5)).toBe('boolean')
    expect(typeof h.invert(0)).toBe('boolean')
  })
})
