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

import { FC, KeyboardEventHandler, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Descendant, Editor } from 'slate'
import { Editable, Slate } from 'slate-react'

import { useGlobalerEinfuegeContext } from '../../../infrastructure/slate/einfuegeservice/GlobalerEinfuegeService'
import { createVolltextEditor } from '../../../infrastructure/slate/volltext/VolltextEditorFactory'
import {
  VolltextBlock,
  VolltextElement,
} from '../../../infrastructure/slate/volltext/VolltextElement'
import { selectReadOnly } from '../../erfassung/ErfassungsState'
import { useDialog } from '../normdaten/useDialog'
import { useSelectionToolbar } from '../selectiontoolbar/SelectionToolbarCustomHooks'
import { renderElement } from './VolltextElementRenderer'

interface Props {
  initialValue: VolltextBlock[]
  onChange?: (content: Descendant[]) => void
}

export const VolltextEditor: FC<Props> = ({
  initialValue,
  onChange = console.log,
}) => {
  const readOnly = useSelector(selectReadOnly)
  const editor = useMemo(createVolltextEditor, [])
  const { openEditDialogHandler } = useDialog(editor)

  const { handleSelection, handleBlur } = useSelectionToolbar(editor)
  const { setTargetToEditor } = useGlobalerEinfuegeContext()

  const handleKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      const entry = Editor.above(editor)
      if (!entry) {
        return
      }
      const [node, _] = entry
      if (event.key === 'Enter' && VolltextElement.isVolltextReferenz(node)) {
        event.preventDefault()
        openEditDialogHandler(node)()
      }
    },
    [editor, openEditDialogHandler]
  )

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={onChange}
      onSelectionChange={handleSelection}
    >
      <Editable
        onKeyDown={handleKeyDown}
        renderElement={renderElement}
        readOnly={readOnly}
        className={'rich-text-editor'}
        onBlur={(event) => {
          handleBlur(event)
          setTargetToEditor(editor)
        }}
      />
    </Slate>
  )
}
