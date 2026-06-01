import { flatMap } from 'lodash'
import type { Descendant, Element } from 'slate'
import { Text } from 'slate'
import type { NormdatenAnsichtViewModel } from 'src/domain/editor/normdaten/ansicht/NormdatenAnsichtViewModel'
import { isNormdatumAnsichtViewModel } from 'src/domain/editor/normdaten/ansicht/NormdatenAnsichtViewModel'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import { splitIntoWords } from 'src/infrastructure/helper'
import type { VolltextBox } from 'src/infrastructure/slate/volltext/VolltextElement'

import { HSPNode } from './HSPNode'
import { VolltextEditorElement } from './volltext/VolltextEditorElement'

const identifierNormdataTags: Record<string, VolltextSemantik> = {
  settlement: 'ort',
  repository: 'koerperschaft',
}
const freeTextNormdataTags: Record<string, VolltextSemantik> = {
  person: 'person',
  ort: 'ort',
  koerperschaft: 'koerperschaft',
}

function dataOriginToNormdatenAuszeichnung(
  data_origin: string
): VolltextSemantik | undefined {
  return (
    identifierNormdataTags[data_origin] || freeTextNormdataTags[data_origin]
  )
}

function identifierNormdatumFromNode(node: Element): NormdatenAnsichtViewModel {
  const { data_key = '', data_origin } = node
  const result = {
    type:
      dataOriginToNormdatenAuszeichnung(data_origin) ??
      `INVALID_TYPE:${data_origin}`,
    roles: [],
    id: data_key,
    ref: NormdatenUtilities.idToUrl(data_key),
    text: HSPNode.extractText(node),
  }
  if (isNormdatumAnsichtViewModel(result)) {
    return result
  }
  throw new TypeError(`Invalid normdatum ${JSON.stringify(result)}`, {
    cause: result,
  })
}

function freeTextNormdatumFromNode(node: Element): NormdatenAnsichtViewModel {
  const {
    data_origin = '',
    content = '',
    box: { data_ref = '', data_role = '' },
  } = node as VolltextBox
  const result = {
    type:
      dataOriginToNormdatenAuszeichnung(data_origin) ??
      `INVALID_TYPE:${data_origin}`,
    roles: splitIntoWords(data_role),
    id: NormdatenUtilities.urlToId(data_ref),
    ref: data_ref,
    text: content,
  }
  if (isNormdatumAnsichtViewModel(result)) {
    return result
  }
  throw new TypeError(`Invalid normdatum ${JSON.stringify(result)}`, {
    cause: result,
  })
}
export function extractNormdatumLinksFromVolltextEditorElement(
  element: VolltextEditorElement
): NormdatenAnsichtViewModel[] {
  return element.content.flatMap((paragraph) =>
    paragraph.children.flatMap(extractNormdatumLinks)
  )
}

export function extractNormdatumLinks(
  node: Descendant
): NormdatenAnsichtViewModel[] {
  if (Text.isText(node)) {
    return []
  }
  if (VolltextEditorElement.isVolltextEditorElement(node)) {
    return flatMap(node.content, extractNormdatumLinks)
  }
  const tag = node.data_origin
  try {
    if (tag in freeTextNormdataTags) {
      return [freeTextNormdatumFromNode(node)]
    }
    if (tag in identifierNormdataTags) {
      return [identifierNormdatumFromNode(node)]
    }
  } catch (error) {
    console.error('TEI contains invalid normdatum', { node, error })
    return []
  }
  return flatMap(node.children, extractNormdatumLinks)
}
