import type { Path } from 'slate'
import type { Configuration } from 'src/domain/erfassung/Configuration'
import type { DetailError } from 'src/domain/erfassung/transformation/DetailError'

export interface NachweisValidationResponse {
  success: boolean
  message: string
  level: 'info' | 'warning' | 'error'
  content: {
    column: string
    line: string
    message: string
    valid: boolean
  }
}

export type Diagnostics = Array<{
  languageCode: Configuration['language']
  message: string
}>

export type DiagnosticMessage = {
  [key in Configuration['language']]?: string
}

export interface ImportValidationResponse {
  column: string
  line: string
  message: string
  valid: boolean
  details: DetailError[]
}

export interface ValidationError {
  id: string
  error: string
  path: Path
  diagnostics: DiagnosticMessage
}

export const ValidationResponse = Object.freeze({
  diagnosticsToDiagnosticMessage(diagnostics: Diagnostics): DiagnosticMessage {
    return Object.fromEntries(
      diagnostics.map(({ languageCode, message }) => [languageCode, message])
    )
  },
})
