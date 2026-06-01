import { pipe } from 'lodash/fp'
import type { Editor } from 'slate'
import { createEditor, Element, Text, Transforms } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'
import {
  TEI_ELEMENT_ITEM,
  TEI_ELEMENT_MSCONTENTS,
  TEI_ELEMENT_TEXT_LANG_ELEMENT,
} from 'src/domain/erfassung/TEIConstants'

type CreateErfassungsEditor = () => Editor
type Decorator<T> = (toBeDecorated: T) => T

const withMSContentsAndMSItemNormalization: Decorator<Editor> = (editor) => {
  const { normalizeNode } = editor

  editor.normalizeNode = (entry) => {
    const [node, path] = entry
    if (
      Element.isElement(node) &&
      [TEI_ELEMENT_MSCONTENTS, TEI_ELEMENT_ITEM].includes(node.data_origin) &&
      node.children.filter(
        (element) =>
          !Text.isText(element) &&
          element.data_origin !== TEI_ELEMENT_TEXT_LANG_ELEMENT
      ).length === 0
    ) {
      Transforms.delete(editor, { at: path })
      return
    }
    normalizeNode(entry)
  }

  return editor
}

export const createErfassungsEditor: CreateErfassungsEditor = () =>
  pipe(
    withMSContentsAndMSItemNormalization,
    withHistory,
    withReact
  )(createEditor())
