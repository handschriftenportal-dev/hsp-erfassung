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

import { XMLFileAnalyser } from '../../../skripte/utility/XMLFileAnalyser'

describe('XMLFileAnalyser', () => {
  it('parses test-file', () => {
    const report = XMLFileAnalyser('./test/skripte/utility/fixture')
    expect(report).toMatchObject({
      codepoints: {
        101: 1,
        108: 3,
        111: 1,
        116: 1,
        72: 1,
        87: 1,
        97: 1,
        13: 1,
      },
      unknown_entities: {
        '&unknownTwo;': {
          'test.xml': 1,
        },
        '&unknown;': {
          'test.xml': 2,
        },
      },
      parsing_errors: {
        '& ': {
          'test.xml': 1,
        },
        '&invalid': {
          'test.xml': 1,
        },
      },
    })
  })
})
