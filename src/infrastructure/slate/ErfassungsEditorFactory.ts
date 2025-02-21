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

import { pipe } from 'lodash/fp'
import {
  BaseEditor,
  BaseElement,
  createEditor,
  Editor,
  Element,
  Text,
  Transforms,
} from 'slate'
import { HistoryEditor, withHistory } from 'slate-history'
import { ReactEditor, withReact } from 'slate-react'

import {
  ErfassungsEditor,
  ErfassungsElement,
} from '../../domain/erfassung/ErfassungsEditor'
import {
  TEI_ELEMENT_ITEM,
  TEI_ELEMENT_MSCONTENTS,
  TEI_ELEMENT_TEXT_LANG_ELEMENT,
} from '../../domain/erfassung/TEIConstants'

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & ErfassungsEditor
    Element: BaseElement & ErfassungsElement
  }
}
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
