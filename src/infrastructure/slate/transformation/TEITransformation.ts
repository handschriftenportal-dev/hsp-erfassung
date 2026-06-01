import type { Descendant, Node } from 'slate'
import { Element, Text } from 'slate'
import type { DataAttributes } from 'src/domain/erfassung/ErfassungsEditor'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import { SerializationError } from 'src/domain/erfassung/transformation/SerializationError'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import {
  XML_ATTRIBUTE_PREFIX,
  XML_TAG_ORIGIN,
} from 'src/infrastructure/Constants'
import type { DiagnosticMessage } from 'src/infrastructure/nachweis/ValidationResponse'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { TeiStripSpace } from 'src/infrastructure/slate/TeiStripSpace'
import { v4 as uuid } from 'uuid'

import type { XMLElement, XMLText } from './XMLNode'
import { XMLNode } from './XMLNode'

export const TEITransformation: InvertibleTransformation<
  WithErrors<XMLNode[]>,
  WithErrors<Descendant[]>
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
  return (
    node: XMLNode,
    index: number,
    siblings: XMLNode[]
  ): Descendant | Descendant[] => {
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
  return Object.assign(baseElement, transformAttributes(attributes)) as Element
}

function transformAttributes(
  attributes: Record<string, string>
): DataAttributes {
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
  return ErfassungsRegeln.isRegion(tag) ? tag + type : region
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
  return HSPNode.isBeschreibungsKomponente(withType)
    ? withType
    : HSPNode.isBeschreibungsKomponente(tag)
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

function invertNode(node: Descendant): XMLNode {
  if (Text.isText(node)) {
    return node
  }
  const { data_origin, children } = node
  return {
    tag: data_origin,
    attributes: invertAttributes(node),
    children: children.map(invertNode),
  }
}

function invertAttributes(node: Element): Record<string, string> {
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
