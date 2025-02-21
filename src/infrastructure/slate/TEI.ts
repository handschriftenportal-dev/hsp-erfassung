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

import { Element, Node, Text } from 'slate'

import { TEI_ELEMENT_QUOTE } from '../../domain/editor/semantischeAuszeichnungen/SemantischeZitate'
import {
  TEI_ELEMENT_ADDITIONAL,
  TEI_ELEMENT_DECONOTE_CONTENT,
  TEI_ELEMENT_DECONOTE_FORM,
  TEI_ELEMENT_HEAD,
  TEI_ELEMENT_HISTORY,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_ITEM,
  TEI_ELEMENT_LINEBREAK,
  TEI_ELEMENT_MSCONTENTS,
  TEI_ELEMENT_NOTE_MUSIC,
  TEI_ELEMENT_NOTE_REGISTER,
  TEI_ELEMENT_NOTE_TEXT,
  TEI_ELEMENT_ORGNAME,
  TEI_ELEMENT_PART_ACCMAT,
  TEI_ELEMENT_PART_BINDING,
  TEI_ELEMENT_PART_BOOKLET,
  TEI_ELEMENT_PART_FRAGMENT,
  TEI_ELEMENT_PART_OTHER,
  TEI_ELEMENT_PERSNAME,
  TEI_ELEMENT_PHYSICAL,
  TEI_ELEMENT_PLACENAME,
} from '../../domain/erfassung/TEIConstants'

export interface NormdatumElement extends Element {
  data_ref: string
  data_role: string
}
export interface EmptyText extends Text {
  text: ''
}
export interface VoidElement extends Element {
  children: [EmptyText]
}
export interface PlaceNameElement extends NormdatumElement {
  data_origin: 'placeName'
}
export interface PersNameElement extends NormdatumElement {
  data_origin: 'persName'
}
export interface CollectionElement extends Element {
  data_origin: 'collection'
  region: string
  path: string
  children: Text[]
}
export interface LbElement extends VoidElement {
  data_origin: 'lb'
}
export interface TermElement extends Element {
  data_origin: 'term'
  id: string
  data_type: string
  data_ref?: string
  data_key?: string
}
export interface LanguageTermElement extends TermElement {
  data_type: 'textLang-ID'
}
export interface OrigPlaceNormTermElement extends TermElement {
  data_type: 'origPlace_norm'
}

const voidElements = [TEI_ELEMENT_LINEBREAK]

function isEmptyElement(element: unknown): element is Element {
  return (
    Element.isElement(element) &&
    element.children.length === 1 &&
    isEmptyText(element.children[0])
  )
}

function isVoidElement(element: unknown): element is VoidElement {
  return isEmptyElement(element) && voidElements.includes(element.data_origin)
}

const inlineElements = new Set([
  TEI_ELEMENT_LINEBREAK,
  TEI_ELEMENT_PERSNAME,
  TEI_ELEMENT_PLACENAME,
  TEI_ELEMENT_ORGNAME,
  'locus',
  TEI_ELEMENT_QUOTE,
  'title',
  'note',
  'index',
  'term',
])

function isInlineElement(element: unknown): element is Element {
  return Element.isElement(element) && inlineElements.has(element.data_origin)
}

function isTermElement(e: unknown): e is TermElement {
  return (
    Element.isElement(e) &&
    e.data_origin === 'term' &&
    'id' in e &&
    'data_type' in e &&
    typeof e.id === 'string' &&
    typeof e.data_type === 'string' &&
    (!('data_ref' in e) || typeof e.data_ref === 'string') &&
    (!('data_key' in e) || typeof e.data_key === 'string')
  )
}
function isLanguageTermElement(e: unknown): e is LanguageTermElement {
  return isTermElement(e) && e.data_type === 'textLang-ID'
}
function isOrigPlaceNormElement(e: unknown): e is OrigPlaceNormTermElement {
  return isTermElement(e) && e.data_type === 'origPlace_norm'
}
function isLbElement(e: unknown): e is LbElement {
  return (
    Element.isElement(e) &&
    e.data_origin === 'lb' &&
    e.children.length === 1 &&
    isEmptyText(e.children[0])
  )
}

function isNormdatumElement(e: unknown): e is NormdatumElement {
  if (!Element.isElement(e)) {
    return false
  }
  const { data_origin, data_ref } = e as any
  return (
    typeof data_ref === 'string' &&
    (data_origin === TEI_ELEMENT_PERSNAME ||
      data_origin === TEI_ELEMENT_PLACENAME ||
      data_origin === TEI_ELEMENT_ORGNAME)
  )
}

function isEmptyText(e: unknown): e is EmptyText {
  return Text.isText(e) && e.text === ''
}
function emptyText(): EmptyText {
  return { text: '' }
}
function normalizedText(s: string): Text {
  return {
    text: s.replace(/\s+/g, ' '),
  }
}

function fromPlainText(plainText: string): Node[] {
  const lines = plainText.split('\n').map(normalizedText)
  return interpose<Node>(lines, lbElement)
}

function lbElement(): LbElement {
  return {
    data_origin: TEI_ELEMENT_LINEBREAK,
    children: [emptyText()],
  }
}

export const TEIElement = {
  ...Element,
  // Factory
  lbElement,
  // Type Guards
  isTermElement,
  isLanguageTermElement,
  isOrigPlaceNormElement,
  isLbElement,
  // Not guards, but identifies group of elements
  isVoidElement,
  isInlineElement,
  isEmptyElement,
  isNormdatumElement,
  components: new Set([
    TEI_ELEMENT_IDENTIFICATION,
    TEI_ELEMENT_HEAD,
    TEI_ELEMENT_NOTE_TEXT,
    TEI_ELEMENT_NOTE_REGISTER,
    TEI_ELEMENT_ITEM,
    TEI_ELEMENT_DECONOTE_CONTENT,
    TEI_ELEMENT_NOTE_MUSIC,
    TEI_ELEMENT_PART_FRAGMENT,
    TEI_ELEMENT_PART_BOOKLET,
    TEI_ELEMENT_PART_OTHER,
    TEI_ELEMENT_HISTORY,
    TEI_ELEMENT_PHYSICAL,
    TEI_ELEMENT_PART_BINDING,
    TEI_ELEMENT_DECONOTE_FORM,
    TEI_ELEMENT_PART_ACCMAT,
    TEI_ELEMENT_ADDITIONAL,
    TEI_ELEMENT_MSCONTENTS,
  ]),
}
export const TEIText = {
  ...Text,
  // Factory
  fromPlainText,
  normalizedText,
  emptyText,
  // Type Guards
  isEmptyText,
}

export function interpose<T>(elements: T[], separator: () => T): T[] {
  return elements.flatMap((element, index) =>
    index === 0 ? [element] : [separator(), element]
  )
}
