import { Box } from '@mui/material'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import { useDispatch, useSelector } from 'react-redux'
import { HSP_EDITOR_CONTAINER_ID, HSPEditor } from 'src/domain/editor/HSPEditor'
import {
  sendDocumentSpeichernEvent,
  sendValidateTEIEvent,
} from 'src/domain/editor/HSPEditorDomainEvents'
import { HSPSidebar } from 'src/domain/sidebar/HSPSidebar'
import { HSPToolbar } from 'src/domain/toolbar/HSPToolbar'
import {
  useFetchBeschreibung,
  useFindKODSignaturen,
} from 'src/infrastructure/nachweis/NachweisServiceHooks'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'

import { BearbeitungsStatus } from './BearbeitungsStatus'
import {
  readDocument,
  selectConfiguration,
  selectSlateState,
  selectUnsavedDocument,
  writeDocument,
} from './ErfassungsState'
import { ScrollContainer } from './ScrollContainer'

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
