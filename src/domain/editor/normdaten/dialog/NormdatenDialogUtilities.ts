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

import { last } from 'lodash'

import { VolltextNormdatum } from '../../../../infrastructure/slate/volltext/VolltextElement'
import { NormdatenTEIElement } from '../NormdatenTEIElement'

export const DNB_INFO_GND_URL = 'http://d-nb.info/gnd/'

export function getGndIdFromUrl(ref: string): string {
  const id = last(ref.split('/')) ?? ''
  return id.trim()
}

export function getUrlForGndId(id: string): string {
  return DNB_INFO_GND_URL + id
}

export function elementToNormdatenTEIElement(
  element: VolltextNormdatum
): NormdatenTEIElement {
  const { data_origin: dataOrigin, content: normdatenText, box } = element
  const { data_ref = '', data_role: role = '', data_key } = box as any
  const result: NormdatenTEIElement = {
    dataOrigin,
    role,
    normdatenText,
    gndIdentifierOption: getGndIdFromUrl(data_ref),
  }
  if (data_key) {
    result.identifier = data_key
  }
  return result
}
