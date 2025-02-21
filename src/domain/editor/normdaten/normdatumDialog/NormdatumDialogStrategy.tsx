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

import { GlobalModalInterface } from '../../../../infrastructure/modal/GlobalModalInterface'
import { normdatumElementForType } from '../../../../infrastructure/slate/ErfassungsRules'
import {
  deleteReferenz,
  findPath,
  insertSlateNodes,
  selectedText,
  updateNodes,
} from '../../../../infrastructure/slate/SlateBoundary'
import { VolltextNormdatum } from '../../../../infrastructure/slate/volltext/VolltextElement'
import { SelectionToolbar } from '../../selectiontoolbar/SelectionToolbar'
import { getUrlForGndId } from '../dialog/NormdatenDialogUtilities'
import { DialogStrategy } from '../DialogStrategy'
import { NormdatumDialog } from './NormdatumDialog'
import { NormdatumDialogAction } from './NormdatumDialogAction'
import { NormdatumDialogState } from './NormdatumDialogState'

type ActionLookup = Partial<
  Record<NormdatumDialogAction, (state: NormdatumDialogState) => void>
>

function createOnAction(lookup: ActionLookup) {
  return function onAction(
    actionType: NormdatumDialogAction,
    state: NormdatumDialogState
  ): void {
    const action = lookup[actionType]
    if (action) {
      action(state)
    }
  }
}

function createSubmitAction(
  type: NormdatumDialogState['type'],
  editor: Editor,
  { hideModal }: GlobalModalInterface
) {
  return (state: NormdatumDialogState) => {
    const { selection } = editor
    if (selection && 'normdatum' in state) {
      const { gndIdentifier, identifier } = state.normdatum!
      const normdatumElement = normdatumElementForType('medieval', type, {
        gndIdentifierOption: gndIdentifier,
        normdatenText: state.text,
        identifier: identifier ?? '',
        role: state.rollen.join(' '),
      })
      if (normdatumElement) {
        insertSlateNodes(editor, normdatumElement, selection)
      }
    }
    hideModal()
  }
}

function createNormdatumDialogActionLookup(
  type: NormdatumDialogState['type'],
  editor: Editor,
  modalInterface: GlobalModalInterface
): ActionLookup {
  const { showModal, hideModal } = modalInterface
  return {
    cancel: (_state) => {
      hideModal()
    },
    back: (_state) => {
      hideModal()
      setTimeout(() => {
        ReactEditor.focus(editor)
        showModal(<SelectionToolbar editor={editor} />)
      }, 0)
    },
    submit: createSubmitAction(type, editor, modalInterface),
  }
}

function setupCreateNormdatumDialog(
  editor: Editor,
  modalInterface: GlobalModalInterface,
  type: NormdatumDialogState['type']
): NormdatumDialogProps {
  return {
    initialState: NormdatumDialogState.new.create(type, selectedText(editor)),
    onAction: createOnAction(
      createNormdatumDialogActionLookup(type, editor, modalInterface)
    ),
  }
}

interface NormdatumDialogProps {
  initialState: NormdatumDialogState
  onAction: (action: NormdatumDialogAction, state: NormdatumDialogState) => void
}

function setupReadOnlyNormdatumDialog(
  editor: Editor,
  element: VolltextNormdatum,
  { hideModal }: GlobalModalInterface
): NormdatumDialogProps {
  const actionLookup: ActionLookup = {
    cancel: (_state) => {
      hideModal()
    },
    back: (_state) => {
      hideModal()
      setTimeout(() => {
        ReactEditor.focus(editor)
      }, 0)
    },
  }
  return {
    initialState: NormdatumDialogState.new.read(element),
    onAction: createOnAction(actionLookup),
  }
}

function editDialogSubmitAction(
  editor: Editor,
  element: VolltextNormdatum,
  { hideModal }: GlobalModalInterface
) {
  const path = findPath(editor, element)
  return (state: NormdatumDialogState) => {
    hideModal()
    if (path && 'normdatum' in state) {
      const { box } = element
      const { gndIdentifier, identifier } = state.normdatum!
      const attributes: Record<string, string> = {
        data_role: state.rollen.join(' '),
        data_ref: getUrlForGndId(gndIdentifier),
      }
      if (identifier) {
        attributes.data_key = identifier
      }
      updateNodes(
        editor,
        {
          content: state.text,
          box: {
            ...box,
            ...attributes,
          },
        } as Partial<Element>,
        path
      )
    }
  }
}

function editDialogActionLookup(
  editor: Editor,
  element: VolltextNormdatum,
  modalInterface: GlobalModalInterface
): ActionLookup {
  const { hideModal } = modalInterface
  return {
    cancel: hideModal,
    back: (_) => {
      hideModal()
      setTimeout(() => {
        ReactEditor.focus(editor)
      }, 0)
    },
    delete: (_) => {
      deleteReferenz(editor, element)
      hideModal()
    },
    submit: editDialogSubmitAction(editor, element, modalInterface),
  }
}

function setupEditNormdatumDialog(
  editor: Editor,
  element: VolltextNormdatum,
  modalInterface: GlobalModalInterface
): NormdatumDialogProps {
  return {
    initialState: NormdatumDialogState.new.edit(element),
    onAction: createOnAction(
      editDialogActionLookup(editor, element, modalInterface)
    ),
  }
}

const createDialog: DialogStrategy<VolltextNormdatum>['createDialog'] = (
  editor,
  modalContext,
  type
) => {
  const { initialState, onAction } = setupCreateNormdatumDialog(
    editor,
    modalContext,
    // We assume, that the type checking is done in useDialog
    type as NormdatumDialogState['type']
  )
  modalContext.showModal(
    <NormdatumDialog initialState={initialState} onAction={onAction} />
  )
}

const editDialog: DialogStrategy<VolltextNormdatum>['editDialog'] = (
  editor,
  modalContext,
  element,
  readOnly
) => {
  ReactEditor.blur(editor)
  const { initialState, onAction } = readOnly
    ? setupReadOnlyNormdatumDialog(editor, element, modalContext)
    : setupEditNormdatumDialog(editor, element, modalContext)
  modalContext.showModal(
    <NormdatumDialog initialState={initialState} onAction={onAction} />
  )
}

export const NormdatumDialogStrategy = Object.freeze({
  createDialog,
  editDialog,
})
