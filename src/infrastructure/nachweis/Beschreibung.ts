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

import { Element, Node } from 'slate'

import {
  extractText,
  findFirstElements,
} from '../../../src/infrastructure/slate/SlateBoundary'
import {
  BESCHREIBUNG_DEFAULT_SUBTYPE,
  CreateBeschreibung,
} from '../../domain/erfassung/Erfassung'

function getMsDesc(description: Node[]): Element | undefined {
  if (description.length === 0) {
    return undefined
  }
  return findFirstElements(description[0], ['text', 'body', 'msDesc'])
}

const create: CreateBeschreibung = (description) => {
  const msDesc = getMsDesc(description)
  if (msDesc === undefined) {
    throw new Error(
      'Invalid description: missing element at path "text.body.msDesc"',
      { cause: description }
    )
  }
  const {
    'data_xml:id': id = '',
    data_subtype: subtype = BESCHREIBUNG_DEFAULT_SUBTYPE,
    data_type: type = '',
  } = msDesc as any
  const signatureElement = findFirstElements(msDesc, ['msIdentifier', 'idno'])
  return {
    id,
    subtype,
    type,
    signature: signatureElement ? extractText(signatureElement) : '',
    kodsignaturen: [],
    kodid: '',
  }
}

export const Beschreibung = Object.freeze({
  getMsDesc,
  create,
})
