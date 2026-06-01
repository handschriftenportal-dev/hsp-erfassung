import type { FC } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Descendant, Editor } from 'slate'
import type { RenderElementProps } from 'slate-react'
import { Editable, Slate } from 'slate-react'
import { RetroDisclaimer } from 'src/domain/editor/RetroDisclaimer'
import {
  selectMode,
  updateContentChanged,
  updateSlate,
} from 'src/domain/erfassung/ErfassungsState'
import { NachweisEvents } from 'src/infrastructure/nachweis/NachweisEvents'

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
      NachweisEvents.beschreibungSessionAktualisieren()
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
    <>
      <RetroDisclaimer />
      <Slate editor={editor} initialValue={value} onChange={updateDocument}>
        <Editable
          id={HSP_EDITOR_ID}
          className={textEditorStyle}
          renderElement={renderElement}
          readOnly
        />
      </Slate>
    </>
  )
}
