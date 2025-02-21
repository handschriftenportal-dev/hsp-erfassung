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

import {
  TEI_ELEMENT_ADDITIONAL,
  TEI_ELEMENT_HEAD,
  TEI_ELEMENT_HISTORY,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_ITEM,
  TEI_ELEMENT_MSCONTENTS,
  TEI_ELEMENT_MSPART,
  TEI_ELEMENT_NOTE,
  TEI_ELEMENT_PHYSICAL,
} from '../../domain/erfassung/TEIConstants'

export type KomponentenTyp =
  | 'identifikation'
  | 'kopf'
  | 'aeusseres'
  | 'inhalt'
  | 'abschnitt'
  | 'inhaltText'
  | 'inhaltMusik'
  | 'inhaltKunst'
  | 'aeusseresKunst'
  | 'geschichte'
  | 'literatur'
  | 'einband'
  | 'fragment'
  | 'faszikel'
  | 'beigabe'
  | 'sonstiges'

function type(element: Element): KomponentenTyp | undefined {
  const { data_origin, data_type } = element as any
  if (data_origin === TEI_ELEMENT_HISTORY) {
    return 'geschichte'
  } else if (data_origin === TEI_ELEMENT_ADDITIONAL) {
    return 'literatur'
  } else if (data_origin === TEI_ELEMENT_PHYSICAL) {
    return 'aeusseres'
  } else if (data_origin === TEI_ELEMENT_NOTE && data_type === 'text') {
    return 'inhaltText'
  } else if (data_origin === TEI_ELEMENT_NOTE && data_type === 'music') {
    return 'inhaltMusik'
  } else if (data_origin === 'decoNote' && data_type === 'content') {
    return 'inhaltKunst'
  } else if (data_origin === 'decoNote' && data_type === 'form') {
    return 'aeusseresKunst'
  } else if (data_origin === TEI_ELEMENT_IDENTIFICATION) {
    return 'identifikation'
  } else if (data_origin === TEI_ELEMENT_HEAD) {
    return 'kopf'
  } else if (data_origin === TEI_ELEMENT_MSCONTENTS) {
    return 'inhalt'
  } else if (data_origin === TEI_ELEMENT_ITEM) {
    return 'abschnitt'
  } else if (data_origin === TEI_ELEMENT_MSPART && data_type === 'binding') {
    return 'einband'
  } else if (data_origin === TEI_ELEMENT_MSPART && data_type === 'fragment') {
    return 'fragment'
  } else if (data_origin === TEI_ELEMENT_MSPART && data_type === 'accMat') {
    return 'beigabe'
  } else if (data_origin === TEI_ELEMENT_MSPART && data_type === 'booklet') {
    return 'faszikel'
  } else if (data_origin === TEI_ELEMENT_MSPART && data_type === 'other') {
    return 'sonstiges'
  }
}

export const Komponente = Object.freeze({
  type,
})
