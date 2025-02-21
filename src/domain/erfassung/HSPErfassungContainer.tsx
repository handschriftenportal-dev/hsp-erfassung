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

import { Box } from '@mui/material'
import { FC, memo, useCallback, useEffect, useMemo } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import { useDispatch, useSelector } from 'react-redux'
import { BaseEditor, BaseElement } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'

import { NachweisEvents } from '../../infrastructure/nachweis/NachweisEvents'
import {
  useFetchBeschreibung,
  useFindKODSignaturen,
} from '../../infrastructure/nachweis/NachweisServiceAdapter'
import { createErfassungsEditor } from '../../infrastructure/slate/ErfassungsEditorFactory'
import { HSP_EDITOR_CONTAINER_ID, HSPEditor } from '../editor/HSPEditor'
import {
  sendDocumentSpeichernEvent,
  sendValidateTEIEvent,
} from '../editor/HSPEditorDomainEvents'
import { HSPSidebar } from '../sidebar/HSPSidebar'
import { HSPToolbar } from '../toolbar/HSPToolbar'
import { BearbeitungsStatus } from './BearbeitungsStatus'
import { ErfassungsEditor, ErfassungsElement } from './ErfassungsEditor'
import {
  readDocument,
  selectConfiguration,
  selectSlateState,
  selectUnsavedDocument,
  writeDocument,
} from './ErfassungsState'
import { ScrollContainer } from './ScrollContainer'

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & ErfassungsEditor
    Element: BaseElement & ErfassungsElement
  }
}

interface Props {}

export const HSPErfassungContainer: FC<Props> = memo(() => {
  const { beschreibungsUrl, normdatenUrl, startInReadOnly } =
    useSelector(selectConfiguration)
  const slateValue = useSelector(selectSlateState)
  const dispatch = useDispatch()
  const editor = useMemo(createErfassungsEditor, [])
  const unsavedChanges = useSelector(selectUnsavedDocument)
  const fetchBeschreibung = useFetchBeschreibung()
  const findKODSignaturen = useFindKODSignaturen()

  useBeforeunload((event: BeforeUnloadEvent): void => {
    if (unsavedChanges) {
      event.preventDefault()
    }
    NachweisEvents.beschreibungLesen()
  })

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 's' && event.ctrlKey) {
      event.preventDefault()
      sendDocumentSpeichernEvent()
    }
    if (event.key === 'v' && event.altKey) {
      event.preventDefault()
      sendValidateTEIEvent()
    }
  }, [])

  useEffect(() => {
    fetchBeschreibung()
    findKODSignaturen()
    dispatch(startInReadOnly ? readDocument() : writeDocument())
  }, [beschreibungsUrl, normdatenUrl])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  })

  editor.children = slateValue

  return (
    <Box className="hsp-grid-layout">
      <BearbeitungsStatus />
      <HSPToolbar editor={editor} />
      <HSPSidebar editor={editor} />
      <ScrollContainer containerId={HSP_EDITOR_CONTAINER_ID}>
        <HSPEditor editor={editor} value={slateValue} />
      </ScrollContainer>
    </Box>
  )
})
