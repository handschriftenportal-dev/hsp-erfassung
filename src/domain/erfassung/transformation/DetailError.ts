import type { Diagnostics } from 'src/infrastructure/nachweis/ValidationResponse'

export interface DetailError {
  xpath: string
  error: string
  diagnostics: Diagnostics
}

function isDiagnosticsElement(data: unknown): boolean {
  return (
    typeof data === 'object' &&
    data !== null &&
    'languageCode' in data &&
    typeof data.languageCode === 'string' &&
    ['en', 'de'].includes(data.languageCode) &&
    'message' in data &&
    typeof data.message === 'string'
  )
}

function isDetailError(data: unknown): data is DetailError {
  return (
    typeof data === 'object' &&
    data !== null &&
    'xpath' in data &&
    typeof data.xpath === 'string' &&
    'error' in data &&
    typeof data.error === 'string' &&
    'diagnostics' in data &&
    Array.isArray(data.diagnostics) &&
    data.diagnostics.every(isDiagnosticsElement)
  )
}

export const DetailError = Object.freeze({
  isDetailError,
})
