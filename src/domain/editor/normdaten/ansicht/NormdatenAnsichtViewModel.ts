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

import { VolltextSemantik } from '../../../erfassung/VolltextSemantik'

interface BaseLink {
  type: VolltextSemantik
  text: string
  id: string
  ref: string
  roles: string[]
}
interface OrtLink extends BaseLink {
  type: 'ort'
}
interface PersonLink extends BaseLink {
  type: 'person'
}
interface KoerperschaftLink extends BaseLink {
  type: 'koerperschaft'
}

export type NormdatenAnsichtViewModel = PersonLink | OrtLink | KoerperschaftLink

export function isNormdatumAnsichtViewModel(
  value: unknown
): value is NormdatenAnsichtViewModel {
  if (!value) return false
  if (typeof value !== 'object') return false
  if (
    !(
      'text' in value &&
      'id' in value &&
      'ref' in value &&
      'type' in value &&
      'roles' in value
    )
  )
    return false
  const { text, id, ref, type, roles } = value
  return (
    typeof text === 'string' &&
    typeof id === 'string' &&
    typeof ref === 'string' &&
    typeof type === 'string' &&
    Array.isArray(roles) &&
    roles.every((role) => typeof role === 'string')
  )
}
