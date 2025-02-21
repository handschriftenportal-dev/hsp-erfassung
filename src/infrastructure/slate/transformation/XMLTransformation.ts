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

import escapeHtml from 'escape-html'

import { DetailError } from '../../../domain/erfassung/transformation/DetailError'
import { InvertibleTransformation } from '../../../domain/erfassung/transformation/InvertibleTransformation'
import { WithErrors } from '../../../domain/erfassung/transformation/WithErrors'
import {
  DiagnosticMessage,
  ValidationResponse,
} from '../../nachweis/ValidationResponse'
import { XPath } from '../XPath'
import { XMLElement, XMLNode } from './XMLNode'

export const XMLTransformation: InvertibleTransformation<
  WithErrors<string>,
  WithErrors<XMLNode[]>
> = {
  transform({ data: xml, detailErrors = [] }) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, 'text/xml')
    return { data: addDetailErrors(deserializeNode(doc), detailErrors) }
  },
  invert({ data: nodes, serializationErrors }) {
    const data = nodes.map(invertNode).join('')
    return { data, serializationErrors }
  },
}

function addDetailErrors(
  nodes: XMLNode[],
  detailErrors: DetailError[]
): XMLNode[] {
  return detailErrors.reduce(addDetailError, nodes)
}

function addErrorMessageToElement(
  element: XMLElement,
  message: DiagnosticMessage
): void {
  if (element.error) {
    element.error.push(message)
  } else {
    element.error = [message]
  }
}

function addDetailError(nodes: XMLNode[], error: DetailError): XMLNode[] {
  const { xpath, diagnostics } = error
  const element = XPath.parse(xpath).reduce(findElementForXPair, {
    tag: 'root',
    attributes: {},
    children: nodes,
  })
  if (element) {
    addErrorMessageToElement(
      element,
      ValidationResponse.diagnosticsToDiagnosticMessage(diagnostics)
    )
  }
  return nodes
}

function findElementForXPair(
  element: XMLElement | undefined,
  [tag, index]: [string, number]
): XMLElement | undefined {
  if (!element) {
    return
  }
  let counter = 0
  return element.children.find(
    (node) => XMLNode.isElement(node) && node.tag === tag && ++counter === index
  ) as XMLElement | undefined
}

function deserializeNode(node: Node): XMLNode[] {
  const { nodeType: typ } = node
  if (typ === Node.TEXT_NODE) {
    return [{ text: node.textContent ?? '' }]
  }
  if (typ === Node.COMMENT_NODE) {
    return [{ comment: node.textContent ?? '' }]
  }
  if (typ === Node.CDATA_SECTION_NODE) {
    return [{ data: node.textContent ?? '' }]
  }
  if (typ === Node.DOCUMENT_TYPE_NODE) {
    const { name, publicId, systemId } = node as DocumentType
    return [{ doctype: { name, publicId, systemId } }]
  }
  const children: XMLNode[] = node.hasChildNodes()
    ? Array.from(node.childNodes).flatMap((child) => deserializeNode(child))
    : [{ text: '' }]
  if (typ !== Node.ELEMENT_NODE) {
    return children
  }
  const { nodeName: tag } = node
  const attributes = extractAttributes(node as Element)
  return [{ tag, attributes, children }]
}

function extractAttributes(element: Element): Record<string, string> {
  const result: Record<string, string> = {}
  if (element.hasAttributes()) {
    for (const attr of element.attributes) {
      result[attr.name] = attr.value
    }
  }
  return result
}

function invertNode(node: XMLNode): string {
  if (XMLNode.isText(node)) {
    return escapeHtml(node.text)
  }
  if (XMLNode.isComment(node)) {
    return `<!--${escapeHtml(node.comment)}-->`
  }
  if (XMLNode.isCharacterData(node)) {
    return `<![CDATA[${node.data}]]>`
  }
  if (XMLNode.isDocumentType(node)) {
    const { publicId, systemId, name } = node.doctype
    return publicId === ''
      ? `<!DOCTYPE ${name} SYSTEM "${systemId}">`
      : `<!DOCTYPE ${name} PUBLIC "${publicId}" "${systemId}">`
  }
  const { children, tag, attributes } = node
  const attr = attributesToString(attributes)
  return XMLNode.isEmptyElement(node)
    ? `<${[tag, ...attr].join(' ')} />`
    : `<${[tag, ...attr].join(' ')}>${children.map(invertNode).join('')}</${tag}>`
}

function attributesToString(attributes: Record<string, string>): string[] {
  return Object.entries(attributes).map(
    ([key, value]) => `${key}="${escapeHtml(value)}"`
  )
}
