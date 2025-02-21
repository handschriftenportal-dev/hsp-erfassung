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

import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { FC, memo, MouseEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { NachweisEvents } from '../../infrastructure/nachweis/NachweisEvents'
import {
  NachweisSperren,
  useFindBeschreibungsSperren,
} from '../../infrastructure/nachweis/NachweisServiceAdapter'
import {
  sendDocumentSpeichernEvent,
  sendReloadEvent,
} from '../editor/HSPEditorDomainEvents'
import {
  ChangedComponent,
  HANDLE_NO_SAVE_DIALOG,
  HANDLE_YES_SAVE_DIALOG,
} from '../erfassung/ChangedComponent'
import {
  readDocument,
  saveDocument,
  selectConfiguration,
  selectReadOnly,
  selectUnsavedDocument,
  updateAlertMessage,
  updateApplicationBusy,
  updateComponentChangedHistory,
  updateIsFullscreen,
  writeDocument,
} from '../erfassung/ErfassungsState'
import { CancelWhiteIcon } from './icons/CancelWhiteIcon'
import { EditWhiteIcon } from './icons/EditWhiteIcon'
import { HSPToolbarButton } from './styles/HSPToolbarButton'

interface Props {}

export const LesenBearbeitenButton: FC<Props> = memo(() => {
  const readOnly = useSelector(selectReadOnly)
  const { isEditable, standalone } = useSelector(selectConfiguration)
  const unsavedChanges = useSelector(selectUnsavedDocument)
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)
  const [readWriteDisabled, setReadWriteDisabled] = useState(false)
  const { t } = useTranslation()
  const findBeschreibungsSperren = useFindBeschreibungsSperren()

  const switchModus = useCallback(() => {
    dispatch(updateApplicationBusy(true))
    setTimeout(() => {
      if (readOnly) {
        if (!standalone) {
          findBeschreibungsSperren().then(
            (sperren: NachweisSperren[]): void => {
              if (sperren.length > 0) {
                dispatch(
                  updateAlertMessage({
                    message: t('toolbar.description_already_locked'),
                    level: 'error',
                  })
                )
                setReadWriteDisabled(true)
                NachweisEvents.beschreibungAktualisieren()
              } else {
                dispatch(writeDocument())
              }
            }
          )
        } else {
          dispatch(writeDocument())
        }
      } else {
        dispatch(readDocument())
        dispatch(updateIsFullscreen(false))
      }
      setOpenDialog(false)
      dispatch(updateApplicationBusy(false))
    }, 0)
  }, [readOnly, standalone])

  const checkUnsavedDocument = useCallback(
    (event: MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault()
      if (unsavedChanges && !readOnly) {
        dispatch(updateIsFullscreen(false))
        setOpenDialog(true)
      } else {
        switchModus()
      }
    },
    [unsavedChanges, openDialog, readOnly, standalone]
  )

  const handleCancel = useCallback(() => setOpenDialog(false), [openDialog])

  const handleNo = useCallback(
    (event: MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault()
      sendReloadEvent()
      dispatch(readOnly ? writeDocument() : readDocument())
      setOpenDialog(false)
      dispatch(saveDocument())
      dispatch(
        updateComponentChangedHistory({
          method: HANDLE_NO_SAVE_DIALOG,
          id: 'handleNo',
        } as ChangedComponent)
      )
    },
    [openDialog]
  )

  const handleYes = useCallback(
    (event: MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault()
      sendDocumentSpeichernEvent()
      switchModus()
      dispatch(
        updateComponentChangedHistory({
          method: HANDLE_YES_SAVE_DIALOG,
          id: 'handleYes',
        } as ChangedComponent)
      )
    },
    [openDialog]
  )

  return (
    <>
      <HSPToolbarButton
        id="readWriteButton"
        title={readOnly ? t('toolbar.write') : t('toolbar.finish_writing')}
        disabled={!isEditable || readWriteDisabled}
        onMouseDown={checkUnsavedDocument}
      >
        {readOnly ? <EditWhiteIcon /> : <CancelWhiteIcon />}
      </HSPToolbarButton>
      <Dialog open={openDialog}>
        <DialogTitle>{t('toolbar.confirm_save')}</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleYes} color="primary">
            {t('toolbar.yes')}
          </Button>
          <Button onClick={handleNo} color="primary">
            {t('toolbar.no')}
          </Button>
          <Button onClick={handleCancel} color="primary">
            {t('toolbar.cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
})
