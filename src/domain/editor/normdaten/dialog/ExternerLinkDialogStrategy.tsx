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

import { Editor, Element } from 'slate'
import { ReactEditor } from 'slate-react'

import {
  findPath,
  insertSlateNodes,
  selectedText,
  updateNodes,
} from '../../../../infrastructure/slate/SlateBoundary'
import {
  VolltextLink,
  VolltextReferenz,
} from '../../../../infrastructure/slate/volltext/VolltextElement'
import { DialogStrategy } from '../DialogStrategy'
import { ExternerLinkDialog } from './ExternerLinkDialog'

type Value = {
  text: string
  url: string
}

function refFromValue(value: Value): Element {
  const { text, url } = value
  return {
    data_origin: 'ref',
    data_target: url,
    children: [{ text }],
  } as unknown as Element
}

function createOnSave(editor: Editor): (value: Value) => void {
  return (value) => {
    const { text: content } = value
    const { selection } = editor
    if (selection) {
      const element: VolltextReferenz = {
        data_origin: 'externerLink',
        box: refFromValue(value),
        content,
        children: [{ text: '' }],
      }
      insertSlateNodes(editor, element, selection)
    }
  }
}

const createDialog: DialogStrategy<VolltextLink>['createDialog'] = (
  editor,
  { showModal },
  _
) => {
  showModal(
    <ExternerLinkDialog
      initialValue={{ text: selectedText(editor), url: '' }}
      onSave={createOnSave(editor)}
    />
  )
}

function valueFromElement(element: VolltextLink): Value {
  const { box } = element
  const { data_target } = box as any
  return {
    text: element.content,
    url: data_target ?? '',
  }
}

function editOnSave(
  editor: Editor,
  element: VolltextLink
): (value: Value) => void {
  const path = findPath(editor, element)
  return (value) => {
    const { box } = element
    const { text, url } = value
    if (path) {
      updateNodes(
        editor,
        {
          content: text,
          box: {
            ...box,
            children: [{ text }],
            data_target: url,
          },
        } as Partial<Element>,
        path
      )
    }
  }
}

const editDialog: DialogStrategy<VolltextLink>['editDialog'] = (
  editor,
  { showModal },
  element,
  readOnly
) => {
  ReactEditor.blur(editor)
  showModal(
    <ExternerLinkDialog
      initialValue={valueFromElement(element)}
      onSave={editOnSave(editor, element)}
      readOnly={readOnly}
    />
  )
}

export const ExternerLinkDialogStrategy = Object.freeze({
  createDialog,
  editDialog,
})
