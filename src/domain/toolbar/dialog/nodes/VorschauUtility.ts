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
      // Do nothing
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
