import type { TranslatedText } from 'src/domain/erfassung/TranslatedText'

export type Initium = {
  id: string
  text: string
  uri: string
  alternativeText: string[]
  languages: Array<{
    id: string
    variantName: TranslatedText
  }>
}

export const Initium = Object.freeze({
  isInitium(x: unknown): x is Initium {
    return (
      typeof x === 'object' &&
      x !== null &&
      'id' in x &&
      'text' in x &&
      'uri' in x &&
      'alternativeText' in x &&
      'languages' in x &&
      typeof x.id === 'string' &&
      typeof x.text === 'string' &&
      typeof x.uri === 'string' &&
      Array.isArray(x.alternativeText) &&
      Array.isArray(x.languages)
    )
  },
})
