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
import { v4 as uuid } from 'uuid'

import { InvertibleTransformation } from '../../../domain/erfassung/transformation/InvertibleTransformation'
import { SerializationError } from '../../../domain/erfassung/transformation/SerializationError'
import { WithErrors } from '../../../domain/erfassung/transformation/WithErrors'
import { XML_ATTRIBUTE_PREFIX, XML_TAG_ORIGIN } from '../../Constants'
import { DiagnosticMessage } from '../../nachweis/ValidationResponse'
import { ErfassungsRules } from '../ErfassungsRules'
import { TEIElement } from '../TEI'
import { TeiStripSpace } from '../TeiStripSpace'
import { XMLElement, XMLNode, XMLText } from './XMLNode'

export const TEITransformation: InvertibleTransformation<
  WithErrors<XMLNode[]>,
  WithErrors<Node[]>
> = {
  transform({ data: nodes }) {
    return { data: nodes.flatMap(transformNode(1, 'TEI', '#document')) }
  },
  invert({ data: nodes, serializationErrors = [] }) {
    const data: XMLNode[] = []
    nodes.forEach((node) => {
      try {
        data.push(invertNode(node))
      } catch (error) {
        console.error(error, node)
        serializationErrors.push({
          level: SerializationError.level.error,
          detail: error instanceof Error ? error.message : node,
          tag: Element.isElement(node) ? node.data_origin : 'text',
          errorCode: SerializationError.errorCode.TEITransformationError,
        })
      }
    })
    return { data, serializationErrors }
  },
}

function transformNode(
  level: number,
  region: string,
  path: string,
  preserveSpace: boolean = false
) {
  return (node: XMLNode, index: number, siblings: XMLNode[]): Node | Node[] => {
    if (XMLNode.isText(node)) {
      return preserveSpace
        ? node
        : transformText(node, {
            start: index === 0,
            end: index === siblings.length - 1,
          })
    } else if (XMLNode.isCharacterData(node)) {
      return { text: node.data }
    } else if (!XMLNode.isElement(node)) {
      // Remove comments and document types
      return []
    } else {
      return transformElement(node, level, region, path)
    }
  }
}

const duplicatedWhitespaces = /\s\s+/g
function transformText(
  node: XMLText,
  option: { start: boolean; end: boolean }
): Text | Text[] {
  let text = node.text.replace(duplicatedWhitespaces, ' ')
  if (option.start) {
    text = text.trimStart()
  }
  if (option.end) {
    text = text.trimEnd()
  }
  return { text }
}

type BaseElement = {
  data_origin: string
  id: string
  component: string
  region: string
  path: string
  level: number
  children: Node[]
  error?: DiagnosticMessage[]
}

function transformElement(
  element: XMLElement,
  level: number,
  region: string,
  path: string
): Element {
  const { tag, attributes, error } = element
  const component = generateComponent(element)
  region = generateRegion(element, region)
  path = generatePath(element, path)
  const children = generateChildren(element).flatMap(
    transformNode(
      level + 1,
      region,
      path,
      attributes['xml:space'] === 'preserve'
    )
  )
  const baseElement: BaseElement = {
    data_origin: tag,
    id: uuid(),
    region,
    path,
    component,
    level,
    children,
  }
  if (error) {
    baseElement.error = error
  }
  return Object.assign(baseElement, transformAttributes(attributes))
}

function transformAttributes(
  attributes: Record<string, string>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(attributes).map(([key, value]) => [
      XML_ATTRIBUTE_PREFIX + key,
      value,
    ])
  )
}

function generateRegion(element: XMLElement, region: string): string {
  const {
    tag,
    attributes: { type = '' },
  } = element
  return ErfassungsRules['medieval'].regionsSet.includes(tag)
    ? tag + type
    : region
}

function generatePath(element: XMLElement, path: string): string {
  const {
    tag,
    attributes: { type },
  } = element
  return path === ''
    ? tag
    : (tag !== 'msPart' ? [path, tag] : [path, tag, type]).join('-')
}

function generateComponent(element: XMLElement): string {
  const {
    tag,
    attributes: { type = '' },
  } = element
  const withType = tag + type
  return TEIElement.components.has(withType)
    ? withType
    : TEIElement.components.has(tag)
      ? tag
      : ''
}

function generateChildren(element: XMLElement): XMLNode[] {
  const { tag, children } = element
  if (!TeiStripSpace.has(tag)) {
    return children
  }
  const result = children.filter((child) => !XMLNode.isText(child))
  return result.length === 0 ? [{ text: '' }] : result
}

function invertNode(node: Node): XMLNode {
  if (Text.isText(node)) {
    return node
  }
  const { data_origin, children } = node
  return {
    tag: data_origin,
    attributes: invertAttributes(node as any),
    children: children.map(invertNode),
  }
}

function invertAttributes(
  node: Record<string, string>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(node)
      .filter(
        ([key, _]) =>
          key !== XML_TAG_ORIGIN && key.startsWith(XML_ATTRIBUTE_PREFIX)
      )
      .map(([key, value]) => [
        key.substring(XML_ATTRIBUTE_PREFIX.length),
        value,
      ])
  )
}
