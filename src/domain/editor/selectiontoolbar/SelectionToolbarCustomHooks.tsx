import type { FocusEventHandler, MouseEventHandler } from 'react'
import type { Descendant, Editor, Selection } from 'slate'
import { Path, Range, Text } from 'slate'
import { ReactEditor } from 'slate-react'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { wrapFormatierungAuszeichnung } from 'src/infrastructure/slate/SlateBoundary'
import type { VolltextFormatierung } from 'src/infrastructure/slate/volltext/VolltextElement'
import { VolltextElement } from 'src/infrastructure/slate/volltext/VolltextElement'

import { SelectionToolbar } from './SelectionToolbar'

export type AuszeichnungsArten =
  | 'referenz'
  | 'formatierung'
  | 'andere'
  | 'formatierungLoeschen'

const isReferenzAllowed = (selection: Range): boolean => {
  return Path.equals(selection.focus.path, selection.anchor.path)
}

const isDeleteFormatierungAllowed = (editor: Editor): boolean => {
  function walkRecursivly(nodes: Descendant[]): boolean {
    return nodes.some(
      (node) =>
        !Text.isText(node) &&
        (VolltextElement.isVolltextFormatierung(node) ||
          (VolltextElement.isVolltextBlock(node) &&
            walkRecursivly(node.children)))
    )
  }
  return walkRecursivly(editor.getFragment())
}

const isFormatierungAllowed = (editor: Editor): boolean => {
  function walkRecursivly(nodes: Descendant[]): boolean {
    return nodes.every(
      (node) =>
        Text.isText(node) ||
        (!editor.isInline(node) && walkRecursivly(node.children)) ||
        VolltextElement.isVolltextReferenz(node)
    )
  }
  return walkRecursivly(editor.getFragment())
}

function isMultiBlockSelection(editor: Editor, at: Range): boolean {
  const above = editor.above({ at })
  return above?.[1].length === 0
}

export const allowedTaggings = (
  editor: Editor
): Record<AuszeichnungsArten, boolean> => {
  const { selection } = editor
  if (selection === null || isMultiBlockSelection(editor, selection)) {
    return {
      referenz: false,
      formatierung: false,
      andere: false,
      formatierungLoeschen: false,
    }
  }
  const referenz = isReferenzAllowed(selection)
  const formatierung = isFormatierungAllowed(editor)
  const formatierungLoeschen = isDeleteFormatierungAllowed(editor)
  const andere = referenz || formatierung
  return {
    referenz,
    formatierung,
    andere,
    formatierungLoeschen,
  }
}

export const someTaggingAllowed = (
  map: Record<AuszeichnungsArten, boolean>
): boolean => {
  return Object.entries(map).some(([_key, value]) => value)
}

export const showSelectionToolbar = (editor: Editor): boolean => {
  const { selection } = editor
  return (
    selection !== null &&
    ReactEditor.isFocused(editor) &&
    !Range.isCollapsed(selection) &&
    someTaggingAllowed(allowedTaggings(editor))
  )
}

interface SelectionHandler {
  handleSelection: (selection: Selection) => void
  handleBlur: FocusEventHandler<HTMLDivElement>
}

export const useSelectionToolbar = (editor: Editor): SelectionHandler => {
  const { showModal, hideModal } = useGlobalModalContext()
  return {
    handleSelection() {
      if (showSelectionToolbar(editor)) {
        showModal(<SelectionToolbar editor={editor} />)
      } else {
        hideModal()
      }
    },
    handleBlur(e) {
      if (e.relatedTarget === null) {
        hideModal()
      }
    },
  }
}

export const useHandleFormatierungTagging = (editor: Editor) => {
  const { hideModal } = useGlobalModalContext()
  return (
      auszeichnung: VolltextFormatierung['data_origin']
    ): MouseEventHandler =>
    () => {
      if (wrapFormatierungAuszeichnung(editor, auszeichnung)) {
        hideModal()
        ReactEditor.focus(editor)
      } else {
        console.error(
          `Auswahl konnte nicht Auszeichnung "${auszeichnung}" erhalten`
        )
      }
    }
}
