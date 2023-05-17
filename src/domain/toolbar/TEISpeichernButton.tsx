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

import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveDocument, selectStandalone } from '../erfassung/ErfassungsState'
import { downloadBlob, serialize } from '../../infrastructure/XMLConverter'
import { speichern } from '../../infrastructure/nachweis/NachweisServiceAdapter'
import { NachweisErfassungResponse } from '../../infrastructure/nachweis/NachweisErfassungResponse'
import { SaveWhiteIcon } from './icons/SaveWhiteIcon'
import { HSPRightToolbarButton } from './styles/HSPRightToolbarButton'
import ConfigureReduxStore from '../../infrastructure/ConfigureReduxStore'

interface TEISpeichernButton {
  title: string
  url: string
  saveAllowed: boolean

  setNachweisResponse(nachweisErfassungResponse: NachweisErfassungResponse): void

  setOpenMessage(openMessage: boolean): void
}

export const TEISpeichernButton = React.memo(({
  title,
  url,
  saveAllowed,
  setNachweisResponse,
  setOpenMessage,
}: TEISpeichernButton) => {

  const standalone = useSelector(selectStandalone)
  const dispatch = useDispatch()

  const callbackNachweis = useCallback((response: NachweisErfassungResponse) => {
    setNachweisResponse(response)
    if (response.success) {
      dispatch(saveDocument(true))
    }
    setOpenMessage(true)
  }, [])

  const callbackDownload = useCallback((response: NachweisErfassungResponse) => {
    setNachweisResponse(response)
    dispatch(saveDocument(true))
    setOpenMessage(true)
  }, [])

  const documentSpeichern = useCallback((event: any) => {
    event.preventDefault()
    if (!standalone) {
      speichern(url, serialize(ConfigureReduxStore.getState().erfassung.slateValue[0]), callbackNachweis)
    } else {
      downloadBlob(serialize(ConfigureReduxStore.getState().erfassung.slateValue[0]), 'tei.xml')
      callbackDownload({
        'success': true,
        'message': 'Speichern wurde erfolgreich durchgeführt.',
        'level': 'info',
        'content': {}
      } as NachweisErfassungResponse)
    }
  }, [])

  return (
      <HSPRightToolbarButton id='speichernButton'
                             title={title}
                             disabled={!saveAllowed}
                             onMouseDown={documentSpeichern}>
        <SaveWhiteIcon/>
      </HSPRightToolbarButton>)
})
