export type Sonderzeichen = {
  codepoint: number
  sign: string
  description: string
}

function toString(sonderzeichen: Sonderzeichen): string {
  return String.fromCodePoint(sonderzeichen.codepoint)
}

export const Sonderzeichen = Object.freeze({
  toString,
})
