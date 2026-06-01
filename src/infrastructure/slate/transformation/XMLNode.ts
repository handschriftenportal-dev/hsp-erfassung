import type { DiagnosticMessage } from 'src/infrastructure/nachweis/ValidationResponse'

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
