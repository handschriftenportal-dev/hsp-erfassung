import { cloneDeep } from 'lodash'
import type { Descendant } from 'slate'
import { Element, Node, Text } from 'slate'
import { TEI_ELEMENT_QUOTE } from 'src/domain/editor/semantischeAuszeichnungen/SemantischeZitate'
import {
  BESCHREIBSTOFF_NORMDATUM,
  ENTSTEHUNGSORT_NORMDATUM,
  GRUNDSPRACHE_NORMDATUM,
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
} from 'src/domain/erfassung/TEIConstants'
import type { Komponente } from 'src/infrastructure/slate/ErfassungsRegeln'

import type {
  BeschreibstoffTermElement,
  GrundspracheTermElement,
  LbElement,
  NormdatumElement,
  OrigPlaceNormTermElement,
  TermElement,
  VoidElement,
} from './HSPElement'
import { HSPElement } from './HSPElement'
import type { EmptyText } from './HSPText'

function findFirstText(node: Descendant): Text {
  if (Text.isText(node)) {
    return node
  }
  return findFirstText(node.children[0])
}

function extractFirstText(node: Node): string {
  if (Text.isText(node)) {
    return node.text
  }
  const [firstChild] = node.children
  return extractFirstText(firstChild)
}

type ExtractTextOptions = {
  trim: boolean
}

function extractText(
  node: Node,
  options: ExtractTextOptions = { trim: true }
): string {
  if (Text.isText(node)) {
    return node.text
  }
  return node.children
    .map((child) => extractText(child, options))
    .map((s) => (options.trim ? s.trim() : s))
    .join('')
}

const komponenten = new Set([
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
])

function isBeschreibungsKomponente(
  komponente: string
): komponente is Komponente {
  return komponenten.has(komponente)
}

function isEmptyElement(element: unknown): element is Element {
  return (
    Element.isElement(element) &&
    element.children.length === 1 &&
    isEmptyText(element.children[0])
  )
}

function isEmptyText(e: unknown): e is EmptyText {
  return Text.isText(e) && e.text === ''
}

function isEntstehungsortTermElement(element: unknown): element is TermElement {
  return (
    isTermElement(element) && element.data_type === ENTSTEHUNGSORT_NORMDATUM
  )
}

function isGrundspracheTermElement(
  element: unknown
): element is GrundspracheTermElement {
  return isTermElement(element) && element.data_type === GRUNDSPRACHE_NORMDATUM
}

function isBeschreibstoffTermElement(
  element: unknown
): element is BeschreibstoffTermElement {
  return (
    isTermElement(element) && element.data_type === BESCHREIBSTOFF_NORMDATUM
  )
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
  const { data_origin, data_ref } = e
  return (
    typeof data_ref === 'string' &&
    (data_origin === TEI_ELEMENT_PERSNAME ||
      data_origin === TEI_ELEMENT_PLACENAME ||
      data_origin === TEI_ELEMENT_ORGNAME)
  )
}

function isOrigPlaceNormElement(e: unknown): e is OrigPlaceNormTermElement {
  return isTermElement(e) && e.data_type === 'origPlace_norm'
}

function isTermElement(e: unknown): e is TermElement {
  return (
    Element.isElement(e) &&
    e.data_origin === 'term' &&
    'data_type' in e &&
    typeof e.data_type === 'string' &&
    (!('data_ref' in e) || typeof e.data_ref === 'string') &&
    (!('data_key' in e) || typeof e.data_key === 'string')
  )
}

const voidElements = new Set([TEI_ELEMENT_LINEBREAK])

function isVoidElement(element: unknown): element is VoidElement {
  return isEmptyElement(element) && voidElements.has(element.data_origin)
}

function findFirstElement(
  node: Descendant,
  dataOriginPath: string[]
): Element | undefined {
  if (Text.isText(node)) {
    return undefined
  }
  const [dataOrigin, ...rest] = dataOriginPath
  if (dataOrigin === undefined) {
    return node
  }
  const element = node.children.find(
    (child) => Element.isElement(child) && child.data_origin === dataOrigin
  )
  return element && findFirstElement(element, rest)
}

function copy<T extends Descendant>(node: T): T {
  if (HSPElement.isElement(node)) {
    return HSPElement.copy(node) as T
  } else {
    return cloneDeep(node)
  }
}

export const HSPNode = Object.freeze({
  ...Node,
  copy,
  extractFirstText,
  extractText,
  isBeschreibungsKomponente,
  isEmptyElement,
  isEmptyText,
  isEntstehungsortTermElement,
  isGrundspracheTermElement,
  isBeschreibstoffTermElement,
  isInlineElement,
  isLbElement,
  isNormdatumElement,
  isOrigPlaceNormElement,
  isTermElement,
  isVoidElement,
  findFirstElement,
  findFirstText,
})
