import type { WriteStream } from 'node:fs'
import type { PassThrough } from 'node:stream'

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
  stream: WriteStream | PassThrough,
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
