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

import { Element } from 'slate'

import { ThemenbereichNotationen } from '../../../../domain/erfassung/ThemenbereicheAPI'
import { VolltextSemantik } from '../../../../domain/erfassung/VolltextSemantik'
import { findFirstElements } from '../../SlateBoundary'

type Interpreter = (element: any) => VolltextSemantik | undefined
const lookup: Record<string, Interpreter> = {
  persName: ({ data_ref, data_role }) => {
    if (data_ref) {
      return 'person'
    } else if (data_role?.includes('author')) {
      return 'autor'
    }
  },
  orgName: ({ data_ref }) => {
    if (data_ref) {
      return 'koerperschaft'
    }
  },
  placeName: ({ data_ref }) => {
    if (data_ref) {
      return 'ort'
    }
  },
  quote: ({ data_type }) => {
    if (data_type === 'incipit') {
      return 'incipit'
    }
    if (data_type === 'explicit') {
      return 'explicit'
    }
    return 'zitat'
  },
  ref: (element) => {
    const { data_target, data_type } = element
    if (data_type === 'subjectArea') {
      const indexTerm = findFirstElements(element, ['index'])
      if (indexTerm === undefined) {
        return 'box'
      }
      const { data_indexName } = indexTerm as any
      return data_indexName === ThemenbereichNotationen.einband
        ? 'einband'
        : 'box'
    } else if (data_target !== undefined) {
      return 'externerLink'
    }
    return 'box'
  },
}

export const teiToVolltextSemantik = (element: Element): VolltextSemantik => {
  const { data_origin: origin } = element
  return (origin in lookup && lookup[origin](element)) || 'box'
}
