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

/**
 * Splits a string into words, seperated by whitespace.
 * This function does currently not support different languages, but is
 * sufficient for XML attributes
 * @param {String}    s  XML attribute compliant string, i.e. mostly ASCII
 * @return {String[]}    Order preserving array of words
 */
export function splitIntoWords(s: string): string[] {
  return s.split(/\s+/).filter((s) => s !== '')
}

export function toPairs<T>(xs: T[]): [T, T][] {
  type Accumulator = {
    previous?: T
    result: [T, T][]
  }
  return xs.reduce(
    ({ previous, result }: Accumulator, next) => {
      if (previous) {
        result.push([previous, next])
      }
      return {
        previous: next,
        result,
      }
    },
    { result: [] }
  ).result
}
