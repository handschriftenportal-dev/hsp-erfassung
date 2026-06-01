import type { Editor } from 'slate'
import { ReactEditor } from 'slate-react'
import type { DialogStrategy } from 'src/domain/editor/dialoge/DialogStrategy'
import { InitiumDialog } from 'src/domain/editor/dialoge/InitiumDialog'
import { InitiumDialogState } from 'src/domain/editor/dialoge/initiumDialog/InitiumDialogState'
import { Initium } from 'src/domain/erfassung/Initium'
import {
  deleteReferenz,
  findPath,
  insertSlateNodes,
  selectedText,
  updateNodes,
} from 'src/infrastructure/slate/SlateBoundary'
import type { VolltextInitium } from 'src/infrastructure/slate/volltext/VolltextElement'

const createDialog: DialogStrategy<VolltextInitium>['createDialog'] = (
  _,
  { editor, modalContext: { showModal } }
) => {
  showModal(
    <InitiumDialog
      initialState={InitiumDialogState.new({ text: selectedText(editor) })}
      onSave={(text, initium) => {
        const { selection } = editor
        if (selection) {
          const initiumElement: VolltextInitium = {
            data_origin: 'initium',
            initium,
            content: text,
            children: [{ text: '' }],
          }
          insertSlateNodes(editor, initiumElement, selection)
        }
      }}
    />
  )
}

function createEditDialogSaveHandler(
  editor: Editor,
  element: VolltextInitium
): (text: string, initium: Initium) => void {
  const path = findPath(editor, element)
  return (text, initium) => {
    if (path) {
      updateNodes(
        editor,
        {
          content: text,
          initium,
        } as Partial<VolltextInitium>,
        path
      )
    }
  }
}

const editDialog: DialogStrategy<VolltextInitium>['editDialog'] = (
  element,
  { editor, modalContext: { showModal }, readOnly }
) => {
  ReactEditor.blur(editor)
  const initialState = Initium.isInitium(element.initium)
    ? InitiumDialogState.new({
        text: element.content,
        initium: element.initium,
        readOnly,
      })
    : InitiumDialogState.new({
        id: element.initium.id,
        uri: element.initium.uri,
        text: element.content,
        readOnly,
      })

  showModal(
    <InitiumDialog
      initialState={initialState}
      onSave={createEditDialogSaveHandler(editor, element)}
      onDelete={() => {
        deleteReferenz(editor, element)
      }}
    />
  )
}

export const InitiumDialogStrategy = Object.freeze({
  createDialog,
  editDialog,
})
