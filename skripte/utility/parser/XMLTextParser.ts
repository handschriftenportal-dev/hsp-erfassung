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

import { Parser, ParserGenerator } from './Parser'
import { XMLEntityParser } from './XMLEntityParser'

const is = {
  whitespace: /\s/,
}

export const XMLTextParser: ParserGenerator = Object.freeze((callback) => {
  let entity: undefined | Parser
  let finished = false
  return {
    process(codepoint: number, content: string) {
      if (finished) {
        return finished
      }
      if (entity !== undefined) {
        if (entity.process(codepoint, content)) {
          entity = undefined
        }
      } else if (content === '&') {
        entity = XMLEntityParser(callback)
        entity.process(codepoint, content)
      } else if (!is.whitespace.test(content)) {
        callback({ type: 'found', codepoint, content })
      }
      return false
    },
    finish() {
      if (finished) {
        return finished
      }
      finished = true
      if (entity !== undefined) {
        entity.finish()
      }
    },
  }
})
