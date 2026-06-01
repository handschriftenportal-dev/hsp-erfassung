import { cloneDeep } from 'lodash'
import type { Node } from 'slate'
import { Element, Text } from 'slate'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import {
  FORM_KEY_FEATURE_NORMDATUM,
  FORM_NORMDATUM,
  FORMAT_NORMDATUM,
  FORMAT_TYPE_OF_INFORMATION,
  TEI_ELEMENT_LINEBREAK,
} from 'src/domain/erfassung/TEIConstants'
import type {
  Begriff,
  ThemenbereicheAPI,
} from 'src/domain/erfassung/ThemenbereicheAPI'
import { XML_ATTRIBUTE_PREFIX } from 'src/infrastructure/Constants'
import { v4 as uuid } from 'uuid'

import type { EmptyText } from './HSPText'
import { HSPText } from './HSPText'

export interface VoidElement extends Element {
  children: [EmptyText]
}

export interface NormdatumElement extends Element {
  data_ref: string
  data_role: string
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
  data_type: string
  data_ref?: string
  data_key?: string
}
export interface GrundspracheTermElement extends TermElement {
  data_type: 'textLang-ID'
}
export interface OrigPlaceNormTermElement extends TermElement {
  data_type: 'origPlace_norm'
}
export interface BeschreibstoffTermElement extends TermElement {
  data_type: 'material_type'
}

export interface TEIInitiumKodierung extends Element {
  data_origin: 'quote'
  data_type: 'incipit'
  children: [
    Text,
    {
      data_origin: 'index'
      data_indexName: 'initia'
      children: [
        {
          data_origin: 'term'
          data_ref?: string
          data_key?: string
          children: [EmptyText]
        },
      ]
    },
  ]
}

type Value = undefined | string | (undefined | string)[]

function checkAttribute(
  key: string,
  value: Value
): (element: Element) => boolean
function checkAttribute(key: string, value: Value, element: Element): boolean
function checkAttribute(key: string, value: Value, element?: Element) {
  key = XML_ATTRIBUTE_PREFIX + key
  if (Array.isArray(value)) {
    const lookup = new Set(value)
    return element === undefined
      ? (element: Element) =>
          lookup.has((element as unknown as Record<string, string>)[key])
      : lookup.has((element as unknown as Record<string, string>)[key])
  } else {
    return element === undefined
      ? (element: Element) =>
          (element as unknown as Record<string, string>)[key] === value
      : (element as unknown as Record<string, string>)[key] === value
  }
}

function checkAttributes(
  attributes: Record<string, Value>,
  element: Element
): boolean
function checkAttributes(
  attributes: Record<string, Value>
): (e: Element) => boolean
function checkAttributes(attributes: Record<string, Value>, element?: Element) {
  const checks = Object.entries(attributes).map(([key, value]) =>
    checkAttribute(key, value)
  )
  if (!element) {
    return (element: Element) => checks.every((check) => check(element))
  }
  return checks.every((check) => check(element))
}

function checkIndexName(value: Value): (element: Element) => boolean
function checkIndexName(value: Value, element: Element): boolean
function checkIndexName(value: Value, element?: Element) {
  return element === undefined
    ? checkAttribute('indexName', value)
    : checkAttribute('indexName', value, element)
}

function checkOrigin(value: Value): (element: Element) => boolean
function checkOrigin(value: Value, element: Element): boolean
function checkOrigin(value: Value, element?: Element) {
  return element === undefined
    ? checkAttribute('origin', value)
    : checkAttribute('origin', value, element)
}

function checkType(value: Value): (element: Element) => boolean
function checkType(value: Value, element: Element): boolean
function checkType(value: Value, element?: Element) {
  return element === undefined
    ? checkAttribute('type', value)
    : checkAttribute('type', value, element)
}

function lbElement(): LbElement {
  return {
    data_origin: TEI_ELEMENT_LINEBREAK,
    children: [HSPText.emptyText()],
  }
}

function copy(element: Element): Element {
  function deepEnrichId(node: Node): void {
    if (!Element.isElement(node)) {
      return
    }
    node.id = uuid()
    node.children.forEach(deepEnrichId)
  }
  const copy = cloneDeep(element)
  deepEnrichId(copy)
  return copy
}

function childElements(
  element: Element,
  filter: (e: Element) => boolean = (_) => true
): Element[] {
  const match = (node: Node): node is Element =>
    Element.isElement(node) && filter(node)
  return element.children.filter(match)
}

function termElement(type: string) {
  function createEmpty(): TermElement {
    return {
      data_origin: 'term',
      data_type: type,
      children: [{ text: '' }],
    }
  }

  function createWithText(text: string = ''): TermElement {
    return {
      data_origin: 'term',
      data_type: type,
      children: [{ text }],
    }
  }

  function fromGNDEntityFact(normdatum: GNDEntityFact): TermElement {
    return Object.assign(createEmpty(), {
      data_key: normdatum.id,
      data_ref: NormdatenUtilities.idToUrl(
        normdatum.gndIdentifier ?? normdatum.id
      ),
      children: [{ text: normdatum.preferredName }],
    })
  }

  type FromBegriffOptions = {
    withoutText: boolean
  }

  const defaultFromBegriffOptions: FromBegriffOptions = {
    withoutText: false,
  }

  function fromBegriff(
    begriff: Begriff,
    options?: Partial<FromBegriffOptions>
  ): TermElement {
    const { withoutText } = { ...defaultFromBegriffOptions, ...options }
    const text = withoutText ? '' : begriff.label || begriff.identifier.notation
    return Object.assign(createEmpty(), {
      data_key: begriff.identifier.id,
      data_ref: begriff.identifier.uri,
      children: [{ text }],
    })
  }

  return Object.freeze({
    createEmpty,
    createWithText,
    fromGNDEntityFact,
    fromBegriff,
  })
}

function formatElementFactory(
  begriff: Begriff | undefined,
  typeOfInformation: string
): TermElement[] {
  const newTerm = termElement(FORMAT_NORMDATUM)
  const formatElement =
    begriff === undefined ? newTerm.createEmpty() : newTerm.fromBegriff(begriff)
  const formatTypeOfInformationElement = termElement(
    FORMAT_TYPE_OF_INFORMATION
  ).createWithText(typeOfInformation)
  return [formatElement, formatTypeOfInformationElement]
}

function formElementFactory(
  begriff: Begriff | undefined,
  api: ThemenbereicheAPI
): TermElement[] {
  const newFachbegriffTerm = termElement(FORM_NORMDATUM)

  if (begriff === undefined) {
    return [newFachbegriffTerm.createEmpty()]
  }
  const newNotwendigerBegriffTerm = termElement(FORM_KEY_FEATURE_NORMDATUM)

  const verknuepfteBegriffe = begriff.notwendigeBegriffe
    .map((id) => api.begriff({ id }))
    .filter((b) => b !== undefined)
  return [
    newFachbegriffTerm.fromBegriff(begriff),
    ...verknuepfteBegriffe.map((b) =>
      newNotwendigerBegriffTerm.fromBegriff(b, { withoutText: true })
    ),
  ]
}

function isTEIInitiumKodierung(
  element: Element
): element is TEIInitiumKodierung {
  const [text, index] = element.children
  return (
    checkAttributes(
      {
        origin: 'quote',
        type: 'incipit',
      },
      element
    ) &&
    Text.isText(text) &&
    Element.isElement(index) &&
    checkAttributes({ origin: 'index', indexName: 'initia' }, index) &&
    Element.isElement(index.children[0]) &&
    checkAttributes({ origin: 'term' }, index.children[0])
  )
}

export const HSPElement = Object.freeze({
  ...Element,
  lbElement,
  termElement,
  isTEIInitiumKodierung,
  formatElementFactory,
  formElementFactory,
  checkAttribute,
  checkAttributes,
  checkIndexName,
  checkOrigin,
  checkType,
  childElements,
  copy,
})
