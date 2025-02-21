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

import { WriteStream } from 'node:fs'

type CSVOptions = {
  delimiter: string
  rowEnd: string
}

const multipleWhiteSpaces = /\s+/g
const doubleQuotes = /"/g

const DEFAULT_DELIMITER = ','
const DEFAULT_ROW_END = '\n'

function csvEscapeText(s: string): string {
  return s.replace(multipleWhiteSpaces, ' ').replace(doubleQuotes, '""')
}
function csvWrapField(s: string): string {
  return `"${csvEscapeText(s)}"`
}

export const CSVStream = Object.freeze(function csvFile(
  stream: WriteStream,
  fields: readonly string[],
  options?: Partial<CSVOptions>
) {
  const delimiter = options?.delimiter ?? DEFAULT_DELIMITER
  const rowEnd = options?.rowEnd ?? DEFAULT_ROW_END
  fields = [...fields]

  return Object.freeze({
    addRow(row: Record<string, string>) {
      const content =
        fields
          .map((field) => csvWrapField(row[field] ?? field))
          .join(delimiter) + rowEnd
      stream.write(content)
      return content
    },
    end() {
      stream.end()
    },
  })
})
