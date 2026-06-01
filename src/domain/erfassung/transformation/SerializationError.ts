import type { Path } from 'slate'

export type SerializationError = {
  path?: Path
  errorCode: number
  detail: unknown
  tag: string
  level: 'info' | 'warning' | 'error'
}

export const SerializationError = Object.freeze({
  errorCode: {
    unknownBeschreibungsKomponente: 0,
    unknownVolltextElement: 1,
    TEITransformationError: 2,
  },
  level: {
    info: 'info',
    warning: 'warning',
    error: 'error',
  },
} as const)
