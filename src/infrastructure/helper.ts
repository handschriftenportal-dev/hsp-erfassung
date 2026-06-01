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
