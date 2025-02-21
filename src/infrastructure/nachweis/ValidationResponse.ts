/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { Path } from 'slate'

import { Configuration } from '../../domain/erfassung/Configuration'
import { DetailError } from '../../domain/erfassung/transformation/DetailError'

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
