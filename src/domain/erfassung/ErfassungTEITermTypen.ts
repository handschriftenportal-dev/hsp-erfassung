const elemente = [
  'title',
  'measure',
  'material',
  'dimensions',
  'format',
  'origPlace',
  'origDate',
  'textLang',
  'form',
  'status',
  'decoration',
  'musicNotation',
] as const

const lookup = new Set<string>(elemente)

export const ErfassungTEITermTypen = Object.freeze({
  isTermTyp(x: string) {
    return lookup.has(x)
  },
})
