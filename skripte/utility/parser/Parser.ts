export type Parser = {
  process: (codepoint: number, char: string) => boolean
  finish: () => void
}

export type ParserFound = {
  type: 'found'
  content: string
  codepoint: number
}

export type ParserUnknownName = {
  type: 'unknown_name'
  content: string
}
export type ParserError = {
  type: 'error'
  content: string
}

export type ParserCallbackInput = ParserFound | ParserUnknownName | ParserError

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
