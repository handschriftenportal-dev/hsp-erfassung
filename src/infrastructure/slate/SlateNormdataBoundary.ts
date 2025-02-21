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

import { flatMap } from 'lodash'
import { Node, Text } from 'slate'

import {
  isNormdatumAnsichtViewModel,
  NormdatenAnsichtViewModel,
} from '../../domain/editor/normdaten/ansicht/NormdatenAnsichtViewModel'
import {
  getGndIdFromUrl,
  getUrlForGndId,
} from '../../domain/editor/normdaten/dialog/NormdatenDialogUtilities'
import { VolltextSemantik } from '../../domain/erfassung/VolltextSemantik'
import { splitIntoWords } from '../helper'
import { VolltextEditorElement } from './volltext/VolltextEditorElement'

export function extractText(node: Node): string {
  if (Text.isText(node)) {
    return node.text
  }
  return node.children
    .map(extractText)
    .map((s) => s.trim())
    .join('')
}

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

function identifierNormdatumFromNode(node: Node): NormdatenAnsichtViewModel {
  const { data_key, data_origin } = node as any
  const result = {
    type:
      dataOriginToNormdatenAuszeichnung(data_origin) ??
      `INVALID_TYPE:${data_origin}`,
    roles: [],
    id: data_key,
    ref: getUrlForGndId(data_key),
    text: extractText(node),
  }
  if (isNormdatumAnsichtViewModel(result)) {
    return result
  }
  throw new TypeError(`Invalid normdatum ${JSON.stringify(result)}`, {
    cause: result,
  })
}

function freeTextNormdatumFromNode(node: Node): NormdatenAnsichtViewModel {
  const {
    data_origin = '',
    content = '',
    box: { data_ref = '', data_role = '' },
  } = node as any
  const result = {
    type:
      dataOriginToNormdatenAuszeichnung(data_origin) ??
      `INVALID_TYPE:${data_origin}`,
    roles: splitIntoWords(data_role),
    id: getGndIdFromUrl(data_ref),
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

export function extractNormdatumLinks(node: Node): NormdatenAnsichtViewModel[] {
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
