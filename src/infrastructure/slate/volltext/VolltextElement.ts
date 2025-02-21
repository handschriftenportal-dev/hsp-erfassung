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

import { Element, Text } from 'slate'

import { Identifier } from '../../../domain/erfassung/ThemenbereicheAPI'
import { VolltextSemantik } from '../../../domain/erfassung/VolltextSemantik'
import { EmptyText } from '../TEI'

export type VolltextElementTyp = 'box' | 'block' | 'formatierung' | 'referenz'
const typeDiscrimination: Record<VolltextSemantik, VolltextElementTyp> =
  Object.freeze({
    person: 'referenz',
    koerperschaft: 'referenz',
    ort: 'referenz',
    buchkunde: 'referenz',
    buchschmuck: 'referenz',
    einband: 'referenz',
    initium: 'referenz',
    musiknotation: 'referenz',
    schriftart: 'referenz',
    sprache: 'referenz',
    textgattung: 'referenz',
    externerLink: 'referenz',
    autor: 'formatierung',
    werktitel: 'formatierung',
    incipit: 'formatierung',
    explicit: 'formatierung',
    zitat: 'formatierung',
    superskript: 'formatierung',
    subskript: 'formatierung',
    box: 'box',
    paragraph: 'block',
  })

interface VolltextBaseElement extends Element {
  data_origin: VolltextSemantik
}

export interface VolltextBlock extends VolltextBaseElement {
  data_origin: 'paragraph'
  children: (VolltextFormatierung | VolltextBox | VolltextReferenz | Text)[]
}
export interface VolltextBox extends VolltextBaseElement {
  data_origin: 'box'
  content: string
  box: Element
  children: [EmptyText]
}
export interface VolltextNormdatum extends VolltextBaseElement {
  data_origin: 'person' | 'koerperschaft' | 'ort'
  box: Element
  content: string
  children: [EmptyText]
}
export interface VolltextThemenbereich extends VolltextBaseElement {
  data_origin: 'einband'
  auswahl: Pick<Identifier, 'id' | 'uri'>[]
  content: string
  children: [EmptyText]
}
export interface VolltextLink extends VolltextBaseElement {
  data_origin: 'externerLink'
  box: Element
  content: string
  children: [EmptyText]
}

export type VolltextReferenz =
  | VolltextLink
  | VolltextThemenbereich
  | VolltextNormdatum
export interface VolltextFormatierung extends VolltextBaseElement {
  data_origin:
    | 'autor'
    | 'werktitel'
    | 'incipit'
    | 'explicit'
    | 'zitat'
    | 'superskript'
    | 'subskript'
  box: Element
  children: (VolltextBox | VolltextReferenz | Text)[]
}

export type VolltextElement =
  | VolltextBox
  | VolltextReferenz
  | VolltextFormatierung
  | VolltextBlock

function typ(e: Element): VolltextElementTyp | undefined {
  const { data_origin } = e
  return typeDiscrimination[data_origin as VolltextSemantik]
}

function volltextTypeGuard<T extends Element>(
  elementType: VolltextElementTyp
): (e: Element) => e is T {
  return function typeGuard(e: Element): e is T {
    return typ(e) === elementType
  }
}

const isVolltextReferenz = volltextTypeGuard<VolltextReferenz>('referenz')
const isVolltextBlock = volltextTypeGuard<VolltextBlock>('block')
const isVolltextFormatierung =
  volltextTypeGuard<VolltextFormatierung>('formatierung')
const isVolltextBox = volltextTypeGuard<VolltextBox>('box')

function isVoid(element: Element): boolean {
  return (
    VolltextElement.isVolltextReferenz(element) ||
    VolltextElement.isVolltextBox(element)
  )
}

function isInline(element: Element): boolean {
  return isVoid(element) || VolltextElement.isVolltextFormatierung(element)
}

function isBlock(element: Element): boolean {
  return (
    VolltextElement.isVolltextBlock(element) &&
    element.children.every((child) => Text.isText(child) || isInline(child))
  )
}

export const VolltextElement = Object.freeze({
  isVolltextReferenz,
  isVolltextBlock,
  isVolltextFormatierung,
  isVolltextBox,
  typ,
  isVoid,
  isInline,
  isBlock,
})
