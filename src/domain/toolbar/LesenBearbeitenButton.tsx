/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import React, { useCallback, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { readDocument, saveDocument, selectReadOnly, selectStandalone, selectUnsavedDocument, updateComponentChangedHistory, writeDocument } from '../erfassung/ErfassungsState'
import { sendDocumentSpeichernEvent, sendReloadEvent } from '../editor/HSPEditorDomainEvents'
import { useTranslation } from 'react-i18next'
import { EditWhiteIcon } from './icons/EditWhiteIcon'
import { CancelWhiteIcon } from './icons/CancelWhiteIcon'
import { HSPRightToolbarButton } from './styles/HSPRightToolbarButton'
import { BeschreibungAktualisierenEvent, findBeschreibungSperren, NachweisSperren, sendNachweisEventToDocument } from '../../infrastructure/nachweis/NachweisServiceAdapter'
import { ChangedComponent, HANDLE_NO_SAVE_DIALOG, HANDLE_YES_SAVE_DIALOG } from '../erfassung/ChangedComponent'

interface LesenBearbeitenButtonProps {
  titleRead: string
  titleWrite: string
  disabled: boolean
  setNachweisResponse: any
  setOpenMessage: any
  url: string
}

export const LesenBearbeitenButton = React.memo(({
  titleRead,
  titleWrite,
  disabled,
  setNachweisResponse,
  setOpenMessage,
  url
}: LesenBearbeitenButtonProps) => {

  const readOnly = useSelector(selectReadOnly)
  const unsavedChanges = useSelector(selectUnsavedDocument)
  const standalone = useSelector(selectStandalone)
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)
  const [readWriteDisabled, setreadWriteDisabled] = useState(disabled)
  const { t } = useTranslation()

  const switchModus = useCallback((event: any) => {
    event.preventDefault()
    console.log('Switch from read only to write mode ...')
    console.log(readOnly)
    console.log(standalone)
    if (readOnly) {
      if (!standalone) {
        findBeschreibungSperren(url, (sperren: Array<NachweisSperren>) => {
          console.log('Check Sperren For Beschreibung')
          console.log(sperren)
          if (sperren && sperren.length > 0) {
            setNachweisResponse({
              success: false,
              message: t('toolbar.beschreibunglocked'),
              level: 'error',
              content: ''
            })
            setOpenMessage(true)
            setreadWriteDisabled(true)
            sendNachweisEventToDocument(BeschreibungAktualisierenEvent, {})
          } else {
            dispatch(writeDocument(readOnly))
          }
        })
      } else {
        dispatch(writeDocument(readOnly))
      }
    } else {
      dispatch(readDocument(readOnly))
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
    }

    setOpenDialog(false)
  }, [readOnly, standalone])

  const checkUnsavedDocument = useCallback((event: any) => {
    if (unsavedChanges && !readOnly) {
      event.preventDefault()
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
      setOpenDialog(true)
    } else {
      switchModus(event)
    }
  }, [unsavedChanges, openDialog, readOnly, standalone])

  const handleCancel = useCallback((event: any) => {
    setOpenDialog(false)
  }, [openDialog])

  const handleNo = useCallback((event: any) => {
    event.preventDefault()
    sendReloadEvent()
    readOnly ? dispatch(writeDocument(readOnly)) : dispatch(readDocument(readOnly))
    setOpenDialog(false)
    dispatch(saveDocument(true))
    dispatch(updateComponentChangedHistory({ method: HANDLE_NO_SAVE_DIALOG, id: 'handleNo' }as ChangedComponent))
  }, [openDialog])

  const handleYes = useCallback((event: any) => {
    sendDocumentSpeichernEvent()
    switchModus(event)
    dispatch(updateComponentChangedHistory({ method: HANDLE_YES_SAVE_DIALOG, id: 'handleYes' }as ChangedComponent))
  }, [openDialog])

  return (
      <>
        <HSPRightToolbarButton id='readWriteButton' title={readOnly ? titleRead : titleWrite}
                               disabled={readWriteDisabled}
                               onMouseDown={checkUnsavedDocument}>
          {
            readOnly ? <EditWhiteIcon/> : <CancelWhiteIcon/>
          }
        </HSPRightToolbarButton>
        <div id='saveDialog'>
          <Dialog aria-labelledby="simple-dialog-title" open={openDialog}>
            <DialogTitle id="simple-dialog-title">{t('toolbar.unsavedquestion')}</DialogTitle>
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
        </div>
      </>
  )
})
