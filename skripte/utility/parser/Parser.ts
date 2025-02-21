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

export type Parser = {
  process: (codepoint: number, char: string) => boolean
  finish: () => void
}

export type ParserCallbackInput =
  | {
      type: 'found'
      content: string
      codepoint: number
    }
  | {
      type: 'unknown_name'
      content: string
    }
  | {
      type: 'error'
      content: string
    }

export type ParserGenerator = (
  callback: (input: ParserCallbackInput) => void
) => Parser

// In Unicode every Plane has 2^16 bytes. JavaScript encodes strings internally
// in UTF-16, hence every codepoint bigger than the Basic Multilingual Plane is
// represented using two code units, one high surrogate and one low surrogate.
// JavaScripts String.prototype.codePointAt will return the correct codepoint,
// if the index points at a high surrogate
const BMP_MAX_CODEPOINT = Math.pow(2, 16)

export const Parser = Object.freeze({
  traverse(parser: Parser, s: string) {
    for (let i = 0; i < s.length; i++) {
      const codepoint = s.codePointAt(i)!
      const char = codepoint > BMP_MAX_CODEPOINT ? s[i] + s[++i] : s[i]
      parser.process(codepoint, char)
    }
    parser.finish()
  },
})
