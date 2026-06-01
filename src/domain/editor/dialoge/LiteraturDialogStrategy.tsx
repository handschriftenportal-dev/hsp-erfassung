import type { Editor } from 'slate'
import { ReactEditor } from 'slate-react'
import type { DialogStrategy } from 'src/domain/editor/dialoge/DialogStrategy'
import { LiteraturDialog } from 'src/domain/editor/dialoge/LiteraturDialog'
import {
  deleteReferenz,
  findPath,
  insertLiteratur,
  selectedText,
  updateNodes,
} from 'src/infrastructure/slate/SlateBoundary'
import type { VolltextLiteratur } from 'src/infrastructure/slate/volltext/VolltextElement'
import type { Link } from 'src/types/Link'

function linkFromElement(element: VolltextLiteratur): Link {
  const { content, uri } = element
  return {
    text: content,
    href: uri,
  }
}

const createDialog: DialogStrategy<VolltextLiteratur>['createDialog'] = (
  _,
  { editor, modalContext: { showModal } }
) => {
  showModal(
    <LiteraturDialog
      initialValue={{ text: selectedText(editor), href: '' }}
      onSave={(value) => {
        const { selection } = editor
        if (selection) {
          insertLiteratur(editor, selection, {
            uri: value.href,
            title: value.text,
          })
        }
      }}
    />
  )
}

function editOnSave(
  editor: Editor,
  element: VolltextLiteratur
): (value: Link) => void {
  const path = findPath(editor, element)
  return (value) => {
    if (path) {
      updateNodes(
        editor,
        {
          content: value.text,
          uri: value.href,
        } as Partial<VolltextLiteratur>,
        path
      )
    }
  }
}

const editDialog: DialogStrategy<VolltextLiteratur>['editDialog'] = (
  element,
  { editor, modalContext: { showModal }, readOnly }
) => {
  ReactEditor.blur(editor)
  showModal(
    <LiteraturDialog
      initialValue={linkFromElement(element)}
      onSave={editOnSave(editor, element)}
      readOnly={readOnly}
      onDelete={() => {
        deleteReferenz(editor, element)
      }}
    />
  )
}

export const LiteraturDialogStrategy = Object.freeze({
  createDialog,
  editDialog,
})
