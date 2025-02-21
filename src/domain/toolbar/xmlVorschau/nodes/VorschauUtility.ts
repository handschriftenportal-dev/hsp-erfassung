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

const indention = '  '
const MAX_LINE_LENGTH = 80
const MIN_TEXT_WIDTH = 40

function indent(level: number): string {
  return indention.repeat(level)
}

const split = /\S+/g

function formatText(level: number, text: string): string {
  const indentation = indent(level)
  const columns = Math.max(MIN_TEXT_WIDTH, MAX_LINE_LENGTH - indentation.length)
  const matches = text.matchAll(split)

  let result = indentation
  let column = 0
  for (const match of matches) {
    const word = match[0]
    if (word === '') {
      continue
    } else if (word.length + column + 1 > columns && column !== 0) {
      result += `\n${indentation}${word}`
      column = word.length
    } else if (word.length + column + 1 > columns && column === 0) {
      result += word
      column += word.length
    } else if (column === 0) {
      result += word
      column += word.length
    } else {
      result += ` ${word}`
      column += word.length + 1
    }
  }

  return result
}

export const VorschauUtility = Object.freeze({
  indent,
  formatText,
})
