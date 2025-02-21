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

import { FocusEventHandler, MouseEventHandler } from 'react'
import { Editor, Node, Path, Range, Selection, Text } from 'slate'
import { ReactEditor } from 'slate-react'

import { useGlobalModalContext } from '../../../infrastructure/modal/GlobalModal'
import { wrapFormatierungAuszeichnung } from '../../../infrastructure/slate/SlateBoundary'
import {
  VolltextElement,
  VolltextFormatierung,
} from '../../../infrastructure/slate/volltext/VolltextElement'
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
  function walkRecursivly(nodes: Node[]): boolean {
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
  function walkRecursivly(nodes: Node[]): boolean {
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
  return above !== undefined && above[1].length === 0
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
    handleBlur(e: any) {
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
