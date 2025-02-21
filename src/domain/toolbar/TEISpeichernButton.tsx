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

import { FC, memo, MouseEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import ConfigureReduxStore from '../../infrastructure/ConfigureReduxStore'
import { downloadXML } from '../../infrastructure/DownloadXML'
import { useGlobalModalContext } from '../../infrastructure/modal/GlobalModal'
import { useSpeichern } from '../../infrastructure/nachweis/NachweisServiceAdapter'
import { XMLPipeline } from '../../infrastructure/slate/transformation/XMLPipeline'
import { AlertMessage } from '../erfassung/AlertMessage'
import {
  saveDocument,
  selectConfiguration,
  selectSaveAllowed,
  updateAlertMessage,
} from '../erfassung/ErfassungsState'
import { SerializationError } from '../erfassung/transformation/SerializationError'
import { SaveWhiteIcon } from './icons/SaveWhiteIcon'
import { SerialisierungsFehlerAnzeige } from './SerialisierungsFehlerAnzeige'
import { HSPToolbarButton } from './styles/HSPToolbarButton'

interface Props {}

export const TEISpeichernButton: FC<Props> = memo(() => {
  const { standalone } = useSelector(selectConfiguration)
  const dispatch = useDispatch()
  const saveAllowed = useSelector(selectSaveAllowed)
  const { showModal } = useGlobalModalContext()

  const { t } = useTranslation()
  const title = t('toolbar.save')
  const speichern = useSpeichern()

  const callbackNachweis = useCallback(
    (alertMessage: AlertMessage, success: boolean) => {
      dispatch(updateAlertMessage(alertMessage))

      if (success) {
        dispatch(saveDocument())
      }
    },
    [dispatch]
  )

  const documentSpeichern = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const { data: xml, serializationErrors = [] } = XMLPipeline.serialize({
        data: ConfigureReduxStore.getState().erfassung.slateValue,
      })
      if (!standalone) {
        speichern(xml)
          .catch((error) => {
            return {
              success: false,
              message: error,
              level: 'error',
            }
          })
          .then((response) => {
            const { success, ...alertMessage } = response as any
            callbackNachweis({ ...alertMessage, hideAfter: 4000 }, success)
          })
      } else {
        downloadXML(xml, 'tei.xml')
        callbackNachweis(
          {
            message: t('toolbar.successful_save_message'),
            level: 'info',
            hideAfter: 4000,
          },
          true
        )
      }
      const filteredErrors = serializationErrors.filter(
        (error) => error.level !== SerializationError.level.info
      )
      if (filteredErrors.length > 0) {
        showModal(
          <SerialisierungsFehlerAnzeige serializationError={filteredErrors} />
        )
      }
    },
    [standalone, speichern, callbackNachweis, t, showModal]
  )

  return (
    <HSPToolbarButton
      id="speichernButton"
      title={title}
      disabled={!saveAllowed.allowed}
      onMouseDown={documentSpeichern}
    >
      <SaveWhiteIcon />
    </HSPToolbarButton>
  )
})
