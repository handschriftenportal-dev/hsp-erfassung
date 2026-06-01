import type { Element } from 'slate'
import type { Editor } from 'slate'
import { ReactEditor } from 'slate-react'
import type { DialogStrategy } from 'src/domain/editor/dialoge/DialogStrategy'
import type { GlobalModalInterface } from 'src/infrastructure/modal/GlobalModalInterface'
import {
  deleteReferenz,
  findPath,
  insertSlateNodes,
  selectedText,
  updateNodes,
} from 'src/infrastructure/slate/SlateBoundary'
import type {
  VolltextReferenz,
  VolltextThemenbereich,
} from 'src/infrastructure/slate/volltext/VolltextElement'

import { ThemenbereichDialog } from './ThemenbereichDialog'
import { ThemenbereichDialogState } from './themenbereichDialog/ThemenbereichDialogState'

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
      updateNodes<VolltextThemenbereich>(
        editor,
        {
          content,
          auswahl,
        },
        path
      )
    }
  }
}

const editDialog: DialogStrategy<VolltextThemenbereich>['editDialog'] = (
  element,
  { editor, modalContext, readOnly }
) => {
  const { hideModal } = modalContext
  ReactEditor.blur(editor)
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
  type: VolltextThemenbereich['data_origin'],
  editor: Editor,
  { hideModal }: GlobalModalInterface
): SubmitAction {
  return (content, auswahl) => {
    const { selection } = editor
    if (selection) {
      const element: VolltextThemenbereich = {
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

const createDialog: DialogStrategy<
  VolltextReferenz,
  VolltextThemenbereich['data_origin']
>['createDialog'] = (type, { editor, modalContext }) => {
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
