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

import { Element } from 'slate'
import { Editor } from 'slate'
import { ReactEditor } from 'slate-react'

import { GlobalModalInterface } from '../../../../infrastructure/modal/GlobalModalInterface'
import {
  deleteReferenz,
  findPath,
  insertSlateNodes,
  selectedText,
  updateNodes,
} from '../../../../infrastructure/slate/SlateBoundary'
import { VolltextThemenbereich } from '../../../../infrastructure/slate/volltext/VolltextElement'
import { DialogStrategy } from '../DialogStrategy'
import { ThemenbereichDialog } from './ThemenbereichDialog'
import { ThemenbereichDialogState } from './ThemenbereichDialogState'

type SubmitAction = (
  content: string,
  auswahl: { id: string; uri: string }[]
) => void

function editSubmitAction(
  editor: Editor,
  element: Element,
  { hideModal }: GlobalModalInterface
): SubmitAction {
  const path = findPath(editor, element)
  return (content: string, auswahl: { id: string; uri: string }[]) => {
    hideModal()
    if (path) {
      updateNodes(
        editor,
        {
          content,
          auswahl,
        } as any,
        path
      )
    }
  }
}

const editDialog: DialogStrategy<VolltextThemenbereich>['editDialog'] = (
  editor,
  modalContext,
  element,
  readOnly
) => {
  const { hideModal } = modalContext
  ReactEditor.blur(editor as any)
  const initialState = ThemenbereichDialogState.fromElement(element, readOnly)
  modalContext.showModal(
    readOnly ? (
      <ThemenbereichDialog initialState={initialState} />
    ) : (
      <ThemenbereichDialog
        initialState={initialState}
        onSave={editSubmitAction(editor, element, modalContext)}
        onAbort={hideModal}
        onDelete={() => {
          deleteReferenz(editor, element)
          hideModal()
        }}
      />
    )
  )
}

function createSubmitAction(
  type: string,
  editor: Editor,
  { hideModal }: GlobalModalInterface
): SubmitAction {
  return (content, auswahl) => {
    const { selection } = editor
    if (selection) {
      const element: any = {
        data_origin: type,
        auswahl,
        content,
        children: [{ text: '' }],
      }
      insertSlateNodes(editor, element, selection)
    }
    hideModal()
  }
}

const createDialog: DialogStrategy['createDialog'] = (
  editor,
  modalContext,
  type
) => {
  const { hideModal } = modalContext
  const initialState = ThemenbereichDialogState.forType(
    type,
    selectedText(editor)
  )
  modalContext.showModal(
    <ThemenbereichDialog
      initialState={initialState}
      onSave={createSubmitAction(type, editor, modalContext)}
      onAbort={hideModal}
    />
  )
}

export const ThemenbereichDialogStrategy = Object.freeze({
  createDialog,
  editDialog,
})
