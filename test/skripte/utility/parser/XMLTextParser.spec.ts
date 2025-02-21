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
  Parser,
  ParserCallbackInput,
} from '../../../../skripte/utility/parser/Parser'
import { XMLTextParser } from '../../../../skripte/utility/parser/XMLTextParser'

describe('XMLTextParser', () => {
  it('simple string gets traversed and ignores whitespaces', () => {
    let collect = ''
    const callback = ({ type, content }: ParserCallbackInput) => {
      expect(type).toBe('found')
      collect += content
    }
    Parser.traverse(XMLTextParser(callback), 'Hello World\nGoodbye\tMars')
    expect(collect).toBe('HelloWorldGoodbyeMars')
  })

  it.each([
    ['\uabcd', 0xabcd],
    ['\u{1ceef}', 0x1ceef],
    ['\ud83d\udca9', 0x1f4a9],
  ])('correctly handles unicode sign %s as codepoint %i', (char, codepoint) => {
    let result = 0
    const callback = (input: ParserCallbackInput) => {
      const { type, codepoint } = input as any
      expect(type).toBe('found')
      result = codepoint
    }
    Parser.traverse(XMLTextParser(callback), char)
    expect(result).toBe(codepoint)
  })
})
