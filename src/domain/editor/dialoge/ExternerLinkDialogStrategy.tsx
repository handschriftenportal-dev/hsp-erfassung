import type { Editor, Element } from 'slate'
import { ReactEditor } from 'slate-react'
import type { DialogStrategy } from 'src/domain/editor/dialoge/DialogStrategy'
import {
  findPath,
  insertSlateNodes,
  selectedText,
  updateNodes,
} from 'src/infrastructure/slate/SlateBoundary'
import type {
  VolltextLink,
  VolltextReferenz,
} from 'src/infrastructure/slate/volltext/VolltextElement'
import type { Link } from 'src/types/Link'

import { ExternerLinkDialog } from './ExternerLinkDialog'

function refFromLink(link: Link): Element {
  const { text, href } = link
  return {
    data_origin: 'ref',
    data_target: href,
    children: [{ text }],
  } as unknown as Element
}

function createOnSave(editor: Editor): (value: Link) => void {
  return (value) => {
    const { text: content } = value
    const { selection } = editor
    if (selection) {
      const element: VolltextReferenz = {
        data_origin: 'externerLink',
        box: refFromLink(value),
        content,
        children: [{ text: '' }],
      }
      insertSlateNodes(editor, element, selection)
    }
  }
}

const createDialog: DialogStrategy<VolltextLink>['createDialog'] = (
  _,
  { editor, modalContext: { showModal } }
) => {
  showModal(
    <ExternerLinkDialog
      initialValue={{ text: selectedText(editor), href: '' }}
      onSave={createOnSave(editor)}
    />
  )
}

function linkFromElement(element: VolltextLink): Link {
  const { box } = element
  const { data_target } = box
  return {
    text: element.content,
    href: data_target ?? '',
  }
}

function editOnSave(
  editor: Editor,
  element: VolltextLink
): (value: Link) => void {
  const path = findPath(editor, element)
  return (value) => {
    const { box } = element
    const { text, href } = value
    if (path) {
      updateNodes(
        editor,
        {
          content: text,
          box: {
            ...box,
            children: [{ text }],
            data_target: href,
          },
        } as Partial<Element>,
        path
      )
    }
  }
}

const editDialog: DialogStrategy<VolltextLink>['editDialog'] = (
  element,
  { editor, modalContext: { showModal }, readOnly }
) => {
  ReactEditor.blur(editor)
  showModal(
    <ExternerLinkDialog
      initialValue={linkFromElement(element)}
      onSave={editOnSave(editor, element)}
      readOnly={readOnly}
    />
  )
}

export const ExternerLinkDialogStrategy = Object.freeze({
  createDialog,
  editDialog,
})
