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

import { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Descendant, Editor } from 'slate'
import { Editable, RenderElementProps, Slate } from 'slate-react'

import {
  selectMode,
  updateContentChanged,
  updateSlate,
} from '../erfassung/ErfassungsState'
import { selectRenderer } from './TEIElementRenderer'

interface Props {
  editor: Editor
  value: Descendant[]
}

/**
 * Erfassungseditor component for manual descriptions of the Handschriftenportal
 * based on Slate
 * This Component is the main part of the complex editor for xml based document.
 * @constructor
 */

export const HSP_EDITOR_ID = 'hspeditor'
export const HSP_EDITOR_CONTAINER_ID = 'hspeditorcontainer'
export const HSP_ERFASSUNGS_EDITOR_ID = 'hsp-erfassungseditor'

export const HSPEditor: FC<Props> = ({ editor, value }) => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)

  const textEditorStyle =
    mode === 'editMode' ? 'hsp-editor-edit-mode' : 'hsp-editor-preview-mode'

  const updateDocument = useCallback(
    (document: Descendant[]) => {
      dispatch(updateSlate(document))
      dispatch(updateContentChanged(true))
    },
    [dispatch]
  )

  const renderElement = useCallback(
    (props: RenderElementProps) => selectRenderer(mode)(props),
    [mode]
  )

  return (
    <Slate editor={editor} initialValue={value} onChange={updateDocument}>
      <Editable
        id={HSP_EDITOR_ID}
        className={textEditorStyle}
        renderElement={renderElement}
        readOnly={true}
      />
    </Slate>
  )
}
