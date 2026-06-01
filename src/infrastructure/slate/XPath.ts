const xPathPattern = /\/\*:([a-zA-Z]*)\[(\d*)\]/g
function parse(xPath: string): [string, number][] {
  const result: [string, number][] = []
  let tuple
  while ((tuple = xPathPattern.exec(xPath)) !== null) {
    const [_, tag, indexString] = tuple
    result.push([tag, parseInt(indexString, 10)])
  }
  return result
}

export const XPath = Object.freeze({ parse })
