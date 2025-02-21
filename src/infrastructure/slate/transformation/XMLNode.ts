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

import { DiagnosticMessage } from '../../nachweis/ValidationResponse'

export type XMLNode =
  | XMLText
  | XMLElement
  | XMLComment
  | XMLCharacterData
  | XMLDocumentType
export type XMLText = { text: string }
export type XMLElement = {
  tag: string
  error?: DiagnosticMessage[]
  attributes: Record<string, string>
  children: XMLNode[]
}
export type XMLComment = { comment: string }
export type XMLCharacterData = { data: string }
export type XMLDocumentType = {
  doctype: { name: string; systemId: string; publicId: string }
}

function isDocumentType(node: XMLNode): node is XMLDocumentType {
  return 'doctype' in node
}
function isText(node: XMLNode): node is XMLText {
  return 'text' in node
}
function isComment(node: XMLNode): node is XMLComment {
  return 'comment' in node
}
function isCharacterData(node: XMLNode): node is XMLCharacterData {
  return 'data' in node
}
function isElement(node: XMLNode): node is XMLElement {
  return 'tag' in node
}

export const XMLNode = Object.freeze({
  isDocumentType,
  isText,
  isComment,
  isElement,
  isCharacterData,
  isEmptyElement({ children }: XMLElement) {
    return (
      children.length === 0 ||
      (children.length === 1 &&
        XMLNode.isText(children[0]) &&
        children[0].text.trim() === '')
    )
  },
})
